import type { NavLink, SiteConfig } from "@/types";

/**
 * Configuração central do site.
 * Campos marcados com TODO aguardam as informações reais.
 */
export const siteConfig: SiteConfig = {
  name: "Psicóloga Júlia Alves de Araújo",
  shortName: "Júlia Araújo",
  signature: "Júlia Araújo",
  role: "Psicóloga Clínica",
  crp: "CRP 06/208264",
  description:
    "Atendimento psicológico online com a psicóloga Júlia Alves de Araújo (CRP 06/208264). Terapia na Abordagem Centrada na Pessoa, em um espaço de acolhimento e escuta.",
  url: "https://example.com", // TODO: domínio real
  locale: "pt-BR",
  contact: {
    email: "", // TODO: e-mail real
    phone: "", // TODO: telefone real
    whatsappNumber: "", // TODO: apenas dígitos, com DDI e DDD
  },
  social: {
    instagram: "", // TODO: URL do perfil no Instagram
    linkedin: "", // TODO: URL do perfil no LinkedIn
  },
};

export const navLinks: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Mim", href: "#sobre-mim" },
  { label: "Sessões", href: "#sessoes" },
  { label: "Conteúdo", href: "#meu-instagram" },
  { label: "Contato", href: "#contato" },
];
