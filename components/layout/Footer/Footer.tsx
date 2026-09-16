import { Container } from "@/components/layout/Container/Container";
import { siteConfig } from "@/lib/site-config";

import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div>
          <span className={styles.signature}>{siteConfig.signature}</span>
          <span className={styles.role}>
            {siteConfig.role} • {siteConfig.crp}
          </span>
        </div>

        <div className={styles.legal}>
          <p>
            © {year} Júlia Alves de Araújo. Todos os direitos reservados.
          </p>
          <p className={styles.disclaimer}>
            Atendimento psicológico online em conformidade com o Código de Ética
            Profissional do CFP.
          </p>
        </div>
      </Container>
    </footer>
  );
}
