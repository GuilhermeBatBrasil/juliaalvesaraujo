import type { NavLink, SiteConfig } from "@/types";

/**
 * Configuração central do site.
 * TODO: substituir os placeholders pelas informações reais do negócio.
 */
export const siteConfig: SiteConfig = {
  name: "PLACEHOLDER — Nome do site",
  shortName: "PLACEHOLDER",
  description:
    "PLACEHOLDER — descrição institucional do site (até ~160 caracteres) para SEO.",
  url: "https://example.com", // TODO: domínio real
  locale: "pt-BR",
  contact: {
    email: "contato@example.com", // TODO
    phone: "+55 00 00000-0000", // TODO
    whatsappNumber: "5500000000000", // TODO: apenas dígitos, com DDI e DDD
  },
  social: {
    instagram: "", // TODO
    linkedin: "", // TODO
  },
};

export const navLinks: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Sessões", href: "/sessoes" },
  { label: "Conteúdo", href: "/conteudo" },
  { label: "Contato", href: "/contato" },
];
