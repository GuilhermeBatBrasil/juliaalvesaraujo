import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // CDN de mídia do Instagram (feed da home).
      // Os hosts têm vários níveis (ex.: instagram.fsjk1-1.fna.fbcdn.net),
      // por isso o wildcard duplo.
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
