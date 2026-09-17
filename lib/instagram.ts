import type { InstagramMediaType, InstagramPost } from "@/types/instagram";

const API_URL = "https://graph.instagram.com/me/media";
const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

/** Quantidade de posts exibidos na grade da home. */
export const INSTAGRAM_POST_LIMIT = 8;

/** Resposta crua da Instagram Graph API. */
interface InstagramApiMedia {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
}

interface InstagramApiResponse {
  data?: InstagramApiMedia[];
  error?: { message: string };
}

/**
 * Posts locais usados enquanto a API não estiver configurada
 * ou caso a requisição falhe. Garante que a seção nunca quebre.
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

/** Normaliza a resposta da API: vídeos usam a thumbnail como imagem. */
function toPost(media: InstagramApiMedia): InstagramPost {
  return {
    id: media.id,
    imageUrl:
      media.media_type === "VIDEO" && media.thumbnail_url
        ? media.thumbnail_url
        : media.media_url,
    permalink: media.permalink,
    caption: media.caption,
    mediaType: media.media_type,
  };
}

/**
 * Busca as últimas publicações do Instagram.
 *
 * Requer INSTAGRAM_ACCESS_TOKEN no ambiente. Sem o token — ou em caso de
 * erro — retorna as imagens locais de fallback, sem quebrar a página.
 */
export async function getInstagramPosts(
  limit: number = INSTAGRAM_POST_LIMIT,
): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) return fallbackPosts;

  const url = `${API_URL}?fields=${FIELDS}&limit=${limit}&access_token=${accessToken}`;

  try {
    // Revalida a cada 1 hora: o feed atualiza sozinho, sem novo build.
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const result = (await response.json()) as InstagramApiResponse;

    if (!response.ok || result.error) {
      console.error(
        "[instagram] Falha ao buscar publicações:",
        result.error?.message ?? response.statusText,
      );
      return fallbackPosts;
    }

    if (!result.data?.length) return fallbackPosts;

    return result.data.slice(0, limit).map(toPost);
  } catch (error) {
    console.error("[instagram] Erro de rede:", error);
    return fallbackPosts;
  }
}
