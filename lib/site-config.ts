import type { NavLink, SiteConfig } from "@/types";

/**
 * Configuração central do site.
 * Campos marcados com TODO aguardam as informações reais.
 */
export const siteConfig: SiteConfig = {
  name: "Psicóloga Júlia Alves de Araújo",
  shortName: "Júlia Araújo",
  role: "Psicóloga Clínica",
  crp: "CRP 06/208264",
  description:
    "Atendimento psicológico online com a psicóloga Júlia Alves de Araújo (CRP 06/208264). Terapia na Abordagem Centrada na Pessoa, em um espaço de acolhimento e escuta.",
  url: "https://juliaalvesaraujo.com",
  locale: "pt-BR",
  contact: {
    email: "julia081299@gmail.com",
    phone: "+55 12 99764-0273",
    whatsappNumber: "5512997640273",
  },
  social: {
    instagram: "https://www.instagram.com/psi.juaraujo/",
    linkedin: "https://www.linkedin.com/in/juliaalvesdearaujo/",
  },
};

export const navLinks: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Mim", href: "#sobre-mim" },
  { label: "Sessões", href: "#sessoes" },
  { label: "Conteúdo", href: "#meu-instagram" },
  { label: "Contato", href: "#contato" },
];
