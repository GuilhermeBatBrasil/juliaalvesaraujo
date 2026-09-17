import feedData from "@/data/instagram.json";
import type { InstagramPost } from "@/types/instagram";

/** Quantidade de posts exibidos na grade da home. */
export const INSTAGRAM_POST_LIMIT = 8;

/** Formato de data/instagram.json, gerado por `npm run instagram:sync`. */
interface InstagramFeedData {
  syncedAt: string | null;
  posts: InstagramPost[];
}

const feed = feedData as InstagramFeedData;

/**
 * Posts locais usados enquanto o feed ainda não foi sincronizado.
 * Garante que a seção nunca apareça vazia.
 */
export const fallbackPosts: InstagramPost[] = Array.from(
  { length: INSTAGRAM_POST_LIMIT },
  (_, index) => ({
    id: `fallback-${index + 1}`,
    imageUrl: `/images/julia/instagram-${index + 1}.jpg`,
    permalink: "",
    mediaType: "IMAGE" as const,
  }),
);

/**
 * Retorna as publicações do Instagram já sincronizadas para o projeto.
 *
 * As imagens são baixadas e versionadas por `npm run instagram:sync`, então
 * aqui não há chamada de rede nem token envolvido — apenas leitura de um JSON.
 * Isso permite exportar o site como HTML estático e evita que as URLs
 * assinadas da CDN do Instagram expirem e quebrem o feed com o tempo.
 */
export function getInstagramPosts(
  limit: number = INSTAGRAM_POST_LIMIT,
): InstagramPost[] {
  if (!feed.posts.length) return fallbackPosts;

  return feed.posts.slice(0, limit);
}
