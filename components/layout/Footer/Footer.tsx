import Link from "next/link";

import { Container } from "@/components/layout/Container/Container";
import { navLinks, siteConfig } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/utils";

import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <p className={styles.brand}>{siteConfig.name}</p>
            <p className={styles.description}>{siteConfig.description}</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className={styles.title}>Navegação</h2>
            <ul className={styles.list}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.title}>Contato</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className={styles.link}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink()}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.bottom}>
          © {year} {siteConfig.name}. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
