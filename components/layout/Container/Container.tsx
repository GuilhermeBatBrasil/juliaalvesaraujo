import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  /** Elemento HTML renderizado. Padrão: div. */
  as?: ElementType;
  /** Usa a largura reduzida (ideal para blocos de texto). */
  narrow?: boolean;
  className?: string;
}

export function Container({
  children,
  as: Tag = "div",
  narrow = false,
  className,
}: ContainerProps) {
  return (
    <Tag className={cn(styles.container, narrow && styles.narrow, className)}>
      {children}
    </Tag>
  );
}
