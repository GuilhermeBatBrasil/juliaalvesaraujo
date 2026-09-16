import Image from "next/image";

import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { siteConfig } from "@/lib/site-config";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h1 id="hero-title" className={styles.name}>
              {siteConfig.name}
            </h1>
            <p className={styles.crp}>{siteConfig.crp}</p>

            <h2 className={styles.subtitle}>Atendimento psicológico</h2>

            <p className={styles.description}>
              Olá! Sou Júlia Araújo, psicóloga dedicada a oferecer um espaço de
              acolhimento e compreensão, tenho me dedicado a apoiar pessoas a
              encontrar equilíbrio e bem-estar. Sei que cada etapa da vida traz seus
              próprios desafios, e estou aqui para ouvir você para juntos encontrarmos
              caminhos que façam sentido para você.
            </p>

            <div className={styles.actions}>
              <Button href="#contato">Vamos conversar!</Button>
            </div>
          </div>

          <div className={styles.photoWrapper}>
            <div className={styles.photo}>
              <Image
                src="/images/julia/hero.jpg"
                alt="Psicóloga Júlia Alves de Araújo"
                fill
                priority
                sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, 24rem"
                className={styles.photoImage}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
