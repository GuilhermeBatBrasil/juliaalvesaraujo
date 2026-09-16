"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container/Container";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import styles from "./Navbar.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o menu com a tecla Escape.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="#inicio" className={styles.logo}>
          <span className={styles.logoName}>{siteConfig.signature}</span>
          <span className={styles.logoTag}>Psicologia</span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>

        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={cn(styles.nav, isOpen && styles.navOpen)}
        >
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
