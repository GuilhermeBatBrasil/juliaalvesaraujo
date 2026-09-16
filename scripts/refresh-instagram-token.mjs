/**
 * Renova o token de acesso do Instagram por mais 60 dias.
 *
 * Uso: npm run instagram:refresh
 *
 * O token precisa ter pelo menos 24 horas de vida e não pode estar expirado.
 * Se já tiver expirado, é necessário gerar um novo pelo painel da Meta.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ENV_PATH = path.join(process.cwd(), ".env.local");
const REFRESH_URL = "https://graph.instagram.com/refresh_access_token";

const envFile = await readFile(ENV_PATH, "utf8").catch(() => {
  console.error("✖ Arquivo .env.local não encontrado.");
  console.error("  Crie-o a partir do .env.example antes de renovar o token.");
  process.exit(1);
});

const currentToken = envFile.match(/^INSTAGRAM_ACCESS_TOKEN=(.+)$/m)?.[1]?.trim();

if (!currentToken) {
  console.error("✖ INSTAGRAM_ACCESS_TOKEN não está definido no .env.local.");
  process.exit(1);
}

const response = await fetch(
  `${REFRESH_URL}?grant_type=ig_refresh_token&access_token=${currentToken}`,
);
const result = await response.json();

if (!response.ok || result.error) {
  console.error("✖ Falha ao renovar:", result.error?.message ?? response.statusText);
  console.error("  Se o token expirou, gere um novo no painel da Meta.");
  process.exit(1);
}

const days = Math.round(result.expires_in / 86400);
const updated = envFile.replace(
  /^INSTAGRAM_ACCESS_TOKEN=.*$/m,
  `INSTAGRAM_ACCESS_TOKEN=${result.access_token}`,
);

await writeFile(ENV_PATH, updated);

console.log(`✔ Token renovado. Válido por mais ${days} dias.`);
console.log("  Lembre-se de atualizar também a variável no ambiente de produção.");
