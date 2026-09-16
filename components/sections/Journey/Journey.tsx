import { Container } from "@/components/layout/Container/Container";

import styles from "./Journey.module.css";

export function Journey() {
  return (
    <section className={styles.journey} aria-labelledby="journey-title">
      <Container narrow className={styles.inner}>
        <h2 id="journey-title" className={styles.title}>
          Minha jornada
        </h2>

        <div className={styles.pathWrapper}>
          {/* Caminho sinuoso: representação gráfica da ideia de jornada. */}
          <svg
            className={styles.path}
            viewBox="0 0 100 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M 45,5 C 25,18 70,25 35,42 C 15,52 65,60 55,68" />
            <path
              d="M 55,5 C 35,18 80,25 45,42 C 25,52 75,60 65,68"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity="0.6"
            />
          </svg>
        </div>

        <p className={styles.text}>
          Minha própria jornada na psicologia foi moldada por profissionais que me
          ajudaram a superar desafios significativos. Agora, estou aqui para oferecer a
          mesma escuta atenta e apoio que recebi, com a esperança de que possamos,
          juntos, encontrar as melhores soluções para as questões que você enfrenta.
        </p>
      </Container>
    </section>
  );
}
