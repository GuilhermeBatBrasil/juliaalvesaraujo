"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import styles from "./Navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o menu ao navegar entre páginas.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        <Link href="/" className={styles.logo}>
          {siteConfig.shortName}
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>

        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={cn(styles.nav, isOpen && styles.navOpen)}
        >
          <ul className={styles.list}>
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(styles.link, isActive && styles.linkActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className={styles.action}>
              <Button href="/contato" size="sm">
                Entre em contato
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
