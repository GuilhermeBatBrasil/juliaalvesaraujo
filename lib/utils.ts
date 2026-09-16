import { siteConfig } from "@/lib/site-config";

/** Junta classes condicionalmente, ignorando valores falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Monta um link do WhatsApp com mensagem opcional. */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Remove barra final de uma URL (útil para canonical/OG). */
export function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}
