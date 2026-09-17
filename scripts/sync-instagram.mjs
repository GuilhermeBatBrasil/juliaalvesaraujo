/**
 * Sincroniza as últimas publicações do Instagram para dentro do projeto.
 *
 * Uso: npm run instagram:sync
 *
 * O que faz:
 *   1. Busca os posts na Instagram Graph API usando o token do .env.local.
 *   2. Baixa cada imagem e salva em /public/images/instagram.
 *   3. Grava os metadados (legenda, permalink) em /data/instagram.json.
 *
 * Por que existe: as URLs da CDN do Instagram são assinadas e expiram em
 * poucas semanas. Como o site é publicado estaticamente, hospedar as imagens
 * localmente é a única forma de garantir que o feed não quebre com o tempo.
 *
 * O token nunca chega ao site publicado — ele é usado apenas aqui.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const API_URL = "https://graph.instagram.com/me/media";
const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
const POST_LIMIT = 8;

/** Lado do quadrado gerado. A grade exibe no máximo ~320px, 800 cobre telas 2x. */
const IMAGE_SIZE = 800;

const ENV_PATH = path.join(process.cwd(), ".env.local");
const IMAGES_DIR = path.join(process.cwd(), "public", "images", "instagram");
const DATA_PATH = path.join(process.cwd(), "data", "instagram.json");

function fail(message, hint) {
  console.error(`✖ ${message}`);
  if (hint) console.error(`  ${hint}`);
  process.exit(1);
}

// --- 1. Token -------------------------------------------------------------

const envFile = await readFile(ENV_PATH, "utf8").catch(() =>
  fail(
    "Arquivo .env.local não encontrado.",
    "Crie-o a partir do .env.example antes de sincronizar.",
  ),
);

const accessToken = envFile.match(/^INSTAGRAM_ACCESS_TOKEN=(.+)$/m)?.[1]?.trim();

if (!accessToken) {
  fail("INSTAGRAM_ACCESS_TOKEN não está definido no .env.local.");
}

// --- 2. Busca os posts ----------------------------------------------------

console.log("→ Buscando publicações...");

const response = await fetch(
  `${API_URL}?fields=${FIELDS}&limit=${POST_LIMIT}&access_token=${accessToken}`,
);
const result = await response.json();

if (!response.ok || result.error) {
  fail(
    `Falha ao buscar publicações: ${result.error?.message ?? response.statusText}`,
    "Se o token expirou, rode `npm run instagram:refresh` ou gere um novo na Meta.",
  );
}

const media = (result.data ?? []).slice(0, POST_LIMIT);

if (media.length === 0) {
  fail("A API não retornou nenhuma publicação.");
}

console.log(`✔ ${media.length} publicações encontradas.`);

// --- 3. Baixa as imagens --------------------------------------------------

// Limpa a pasta para não acumular imagens de posts que saíram do feed.
await rm(IMAGES_DIR, { recursive: true, force: true });
await mkdir(IMAGES_DIR, { recursive: true });

const posts = [];

for (const [index, item] of media.entries()) {
  const position = index + 1;

  // Vídeos e reels não têm imagem própria: usamos a miniatura.
  const sourceUrl =
    item.media_type === "VIDEO" && item.thumbnail_url
      ? item.thumbnail_url
      : item.media_url;

  if (!sourceUrl) {
    console.warn(`- post ${position} ignorado (sem imagem disponível)`);
    continue;
  }

  const fileName = `post-${position}.jpg`;

  try {
    const imageResponse = await fetch(sourceUrl);

    if (!imageResponse.ok) {
      throw new Error(`HTTP ${imageResponse.status}`);
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    // Recorta no centro em 1:1 para bater com a grade quadrada da home.
    const optimized = await sharp(buffer)
      .resize(IMAGE_SIZE, IMAGE_SIZE, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    await writeFile(path.join(IMAGES_DIR, fileName), optimized);

    const sizeKb = Math.round(optimized.length / 1024);
    console.log(`✔ ${fileName} (${sizeKb} kB)`);

    posts.push({
      id: item.id,
      imageUrl: `/images/instagram/${fileName}`,
      permalink: item.permalink ?? "",
      caption: item.caption,
      mediaType: item.media_type,
    });
  } catch (error) {
    console.warn(`- post ${position} ignorado (${error.message})`);
  }
}

if (posts.length === 0) {
  fail("Nenhuma imagem pôde ser baixada.", "O feed usará as imagens de fallback.");
}

// --- 4. Grava os metadados ------------------------------------------------

await mkdir(path.dirname(DATA_PATH), { recursive: true });
await writeFile(
  DATA_PATH,
  `${JSON.stringify({ syncedAt: new Date().toISOString(), posts }, null, 2)}\n`,
);

console.log(`\n✔ ${posts.length} publicações sincronizadas.`);
console.log("  Imagens: public/images/instagram/");
console.log("  Dados:   data/instagram.json");
console.log("\n  Commite os dois e rode `npm run build` para publicar.");
