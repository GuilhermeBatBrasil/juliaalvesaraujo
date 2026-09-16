/**
 * Gera o favicon e os ícones do site a partir do logotipo oficial.
 * Uso: node scripts/generate-favicon.mjs
 *
 * Usa apenas a assinatura (parte superior do lockup), já que o texto menor
 * ficaria ilegível em tamanhos pequenos. A assinatura clara é aplicada sobre
 * um quadrado oliva, garantindo contraste em abas claras e escuras.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const SOURCE = path.join(process.cwd(), "public", "images", "logo", "logo-light.png");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const APP_DIR = path.join(process.cwd(), "app");

/** Cor da marca usada como fundo dos ícones. */
const BRAND_OLIVE = "#637351";

/** Altura da assinatura dentro do logotipo original (478x299). */
const SIGNATURE_HEIGHT = 258;

/** Proporção da largura do ícone ocupada pela assinatura. */
const PADDING_RATIO = 0.78;

/** Extrai a assinatura e a redimensiona para caber no ícone. */
async function buildSignature(size) {
  const target = Math.round(size * PADDING_RATIO);

  return sharp(SOURCE)
    .extract({ left: 0, top: 0, width: 478, height: SIGNATURE_HEIGHT })
    .trim({ threshold: 10 })
    .resize({ width: target, fit: "inside" })
    .toBuffer();
}

/** Monta um ícone quadrado com a assinatura centralizada sobre o oliva. */
async function buildIcon(size) {
  const signature = await buildSignature(size);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_OLIVE,
    },
  })
    .composite([{ input: signature, gravity: "center" }])
    .png()
    .toBuffer();
}

await mkdir(PUBLIC_DIR, { recursive: true });

// favicon.ico (multi-resolução) no diretório app/, conforme convenção do Next.
const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(icoSizes.map((size) => buildIcon(size)));
const { default: pngToIco } = await import("png-to-ico");
await writeFile(path.join(APP_DIR, "favicon.ico"), await pngToIco(icoBuffers));
console.log("✔ app/favicon.ico (16/32/48)");

// Ícones PNG para dispositivos e PWA.
const pngIcons = [
  { name: "icon.png", size: 192 },
  { name: "apple-icon.png", size: 180 },
];

for (const { name, size } of pngIcons) {
  await writeFile(path.join(APP_DIR, name), await buildIcon(size));
  console.log(`✔ app/${name} (${size}x${size})`);
}
