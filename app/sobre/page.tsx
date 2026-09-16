import type { Metadata } from "next";

import { Section } from "@/components/ui/Section/Section";

export const metadata: Metadata = {
  title: "Sobre",
  description: "PLACEHOLDER — descrição da página Sobre.",
};

export default function SobrePage() {
  return (
    <Section id="sobre" title="Sobre" titleAs="h1" narrow>
      <p>PLACEHOLDER — conteúdo da página Sobre.</p>
    </Section>
  );
}
