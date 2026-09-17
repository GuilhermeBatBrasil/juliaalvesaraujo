/** Tipos de mídia retornados pela Instagram Graph API. */
export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

/** Post já normalizado para consumo pelos componentes. */
export interface InstagramPost {
  id: string;
  /** URL da imagem exibida na grade. */
  imageUrl: string;
  /** Link para a publicação no Instagram. */
  permalink: string;
  /** Legenda da publicação, usada como texto alternativo. */
  caption?: string;
  mediaType: InstagramMediaType;
}
