import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Gera HTML/CSS/JS estáticos em out/, sem necessidade de Node em produção.
  // É o que permite publicar direto no public_html da HostGator.
  output: "export",

  // Cada rota vira uma pasta com index.html (ex.: out/index.html).
  // Evita surpresas de resolução de URL no Apache.
  trailingSlash: true,

  images: {
    // O otimizador do next/image roda no servidor, que não existe em export.
    // As imagens são servidas como estão — por isso todas já são comprimidas
    // na origem (fotos em public/images e o script instagram:sync).
    unoptimized: true,
  },
};

export default nextConfig;
