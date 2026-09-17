import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  /** Elemento HTML renderizado. Padrão: div. */
  as?: ElementType;
  /** Largura intermediária (1152px). */
  medium?: boolean;
  /** Usa a largura reduzida (ideal para blocos de texto). */
  narrow?: boolean;
  className?: string;
}

export function Container({
  children,
  as: Tag = "div",
  medium = false,
  narrow = false,
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        styles.container,
        medium && styles.medium,
        narrow && styles.narrow,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
