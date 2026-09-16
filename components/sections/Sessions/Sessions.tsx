import { CalendarClock, CreditCard, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container/Container";

import styles from "./Sessions.module.css";

interface SessionCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

const cards: SessionCard[] = [
  {
    icon: CalendarClock,
    title: "Duração e Frequência:",
    text: "Cada sessão tem 50 minutos dedicados exclusivamente a você. Recomendo uma sessão por semana para mantermos um ritmo eficaz, mas estou aqui para adaptar a frequência conforme suas preferências e necessidades.",
  },
  {
    icon: Video,
    title: "Formato Online:",
    text: "As sessões são realizadas via Google Meet, permitindo que você participe de onde se sentir mais confortável. Garanto um ambiente acolhedor e seguro, onde podemos conversar com tranquilidade.",
  },
  {
    icon: CreditCard,
    title: "Pagamento e Cancelamento:",
    text: "O pagamento é feito por PIX, antes de cada sessão. Se precisar cancelar, peço que me avise com pelo menos 24 horas de antecedência, para que possamos reorganizar a nossa agenda sem pressa.",
  },
];

export function Sessions() {
  return (
    <section id="sessoes" className={styles.sessions} aria-labelledby="sessions-title">
      <Container medium>
        <h2 id="sessions-title" className={styles.title}>
          Como Funcionam as Sessões
        </h2>

        <div className={styles.grid}>
          {cards.map(({ icon: Icon, title, text }) => (
            <article key={title} className={styles.card}>
              <div className={styles.cardIcon}>
                <Icon size={28} strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
