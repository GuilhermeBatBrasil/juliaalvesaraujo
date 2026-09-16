import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container/Container";
import { cn } from "@/lib/utils";

import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
  /** Texto pequeno acima do título. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Nível semântico do título. Padrão: h2. */
  titleAs?: "h1" | "h2" | "h3";
  id?: string;
  centered?: boolean;
  /** Aplica cor de fundo alternativa. */
  surface?: boolean;
  narrow?: boolean;
  className?: string;
}

export function Section({
  children,
  eyebrow,
  title,
  subtitle,
  titleAs: Title = "h2",
  id,
  centered = false,
  surface = false,
  narrow = false,
  className,
}: SectionProps) {
  const headingId = title && id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(styles.section, surface && styles.surface, centered && styles.centered, className)}
    >
      <Container narrow={narrow}>
        {(eyebrow || title || subtitle) && (
          <header className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && (
              <Title id={headingId} className={styles.title}>
                {title}
              </Title>
            )}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
