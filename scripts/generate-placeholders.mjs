/**
 * Script auxiliar: gera imagens placeholder em /public/images/julia.
 * Uso: node scripts/generate-placeholders.mjs
 *
 * Gera apenas os arquivos que ainda não existem, para nunca sobrescrever
 * uma foto real já adicionada à pasta.
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "julia");

/** @type {{ name: string; width: number; height: number; color: string; label: string }[]} */
const images = [
  { name: "hero", width: 800, height: 800, color: "#d9d9d4", label: "hero" },
  { name: "about", width: 800, height: 1000, color: "#cfd4c6", label: "about" },
  { name: "contact-1", width: 600, height: 840, color: "#d9d9d4", label: "contact-1" },
  { name: "contact-2", width: 600, height: 450, color: "#e0ded6", label: "contact-2" },
  { name: "contact-3", width: 600, height: 450, color: "#d5d8cc", label: "contact-3" },
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `instagram-${i + 1}`,
    width: 600,
    height: 600,
    color: i % 2 === 0 ? "#cdd3c2" : "#dcdfd3",
    label: `instagram-${i + 1}`,
  })),
];

await mkdir(OUTPUT_DIR, { recursive: true });

for (const { name, width, height, color, label } of images) {
  const filePath = path.join(OUTPUT_DIR, `${name}.jpg`);

  try {
    await access(filePath);
    console.log(`- ${name}.jpg já existe, mantido`);
    continue;
  } catch {
    // Arquivo não existe: segue para a geração.
  }

  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="sans-serif" font-size="${Math.round(width / 14)}" fill="#7d8273">${label}</text>
    </svg>`,
  );

  const buffer = await sharp(svg).jpeg({ quality: 70 }).toBuffer();
  await writeFile(filePath, buffer);
  console.log(`✔ ${name}.jpg gerado`);
}
