import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/utils";

import styles from "./Contact.module.css";

const WHATSAPP_MESSAGE = "Olá, gostaria de agendar uma sessão";

export function Contact() {
  const { instagram, linkedin } = siteConfig.social;

  return (
    <section id="contato" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.ribbon} aria-hidden />

      <Container medium className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 id="contact-title" className={styles.title}>
              Estou aqui para ouvir você
            </h2>

            <p className={styles.text}>
              Se sentir que esse é o momento certo para buscar apoio, estarei aqui para
              acolher você. Não hesite em entrar em contato, seja por e-mail ou
              WhatsApp. Estou aqui para ouvir e ajudar, sempre respeitando o seu tempo e
              espaço.
            </p>

            <div className={styles.actions}>
              <Button href={buildWhatsAppLink(WHATSAPP_MESSAGE)} size="sm">
                Agende sua sessão!
              </Button>

              <div className={styles.socials}>
                {instagram && (
                  <a
                    href={instagram}
                    className={styles.socialLink}
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={24} strokeWidth={1.75} aria-hidden />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    className={styles.socialLink}
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={24} strokeWidth={1.75} aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.collageWrapper}>
            <div className={styles.collage}>
              <div className={styles.collageMain}>
                <Image
                  src="/images/julia/contact-1.jpg"
                  alt="Psicóloga Júlia Araújo sentada em acolhimento"
                  fill
                  sizes="(max-width: 1024px) 60vw, 18rem"
                  className={styles.collageMainImage}
                />
              </div>

              <div className={styles.collageStack}>
                <div className={styles.collageSmall}>
                  <Image
                    src="/images/julia/contact-2.jpg"
                    alt="Momento de escuta e café"
                    fill
                    sizes="(max-width: 1024px) 40vw, 13rem"
                    className={styles.collageSmallImageTop}
                  />
                </div>
                <div className={styles.collageSmall}>
                  <Image
                    src="/images/julia/contact-3.jpg"
                    alt="Atendimento e suporte online acolhedor"
                    fill
                    sizes="(max-width: 1024px) 40vw, 13rem"
                    className={styles.collageSmallImageBottom}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
