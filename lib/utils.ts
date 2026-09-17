import { siteConfig } from "@/lib/site-config";

/** Junta classes condicionalmente, ignorando valores falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Monta o link do WhatsApp com mensagem opcional.
 * Enquanto o número real não for configurado, aponta para a seção de contato.
 */
export function buildWhatsAppLink(message?: string): string {
  const { whatsappNumber } = siteConfig.contact;

  if (!whatsappNumber) return "#contato";

  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Remove barra final de uma URL (útil para canonical/OG). */
export function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}
