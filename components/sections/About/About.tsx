import Image from "next/image";

import { Container } from "@/components/layout/Container/Container";

import styles from "./About.module.css";

export function About() {
  return (
    <section id="sobre-mim" className={styles.about} aria-labelledby="about-title">
      <Container medium>
        <div className={styles.grid}>
          <div className={styles.photoWrapper}>
            <div className={styles.photo}>
              <Image
                src="/images/julia/about.jpg"
                alt="Júlia Araújo em seu consultório"
                fill
                sizes="(max-width: 768px) 100vw, 24rem"
                className={styles.photoImage}
              />
            </div>
          </div>

          <div className={styles.content}>
            <h2 id="about-title" className={styles.title}>
              Muito Prazer, Sou a Júlia,
            </h2>

            <div className={styles.text}>
              <p>
                Desde cedo, percebi que ouvir e compreender o outro era algo natural
                para mim. Sou mineira, tenho 24 anos, e moro no interior de São Paulo.
              </p>
              <p>
                Estou me especializando na{" "}
                <span className={styles.highlight}>
                  Abordagem Centrada na Pessoa (ACP)
                </span>
                , uma abordagem que respeita profundamente a sua história, suas
                experiências e sua sabedoria de vida.
              </p>
              <p>
                Meu objetivo é caminhar ao seu lado, ajudando você a lidar com os
                desafios que surgem, sempre respeitando seu ritmo e suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
