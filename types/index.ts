export interface NavLink {
  label: string;
  href: string;
  /** Link externo (abre em nova aba). */
  external?: boolean;
}

export interface SiteContact {
  email: string;
  phone: string;
  /** Somente dígitos: DDI + DDD + número. Ex.: 5511999999999 */
  whatsappNumber: string;
}

export interface SiteSocial {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  /** Cargo profissional. Ex.: "Psicóloga Clínica". */
  role: string;
  /** Registro profissional. Ex.: "CRP 06/208264". */
  crp: string;
  description: string;
  url: string;
  locale: string;
  contact: SiteContact;
  social: SiteSocial;
}
