import type { Metadata } from "next";

import { Section } from "@/components/ui/Section/Section";

export const metadata: Metadata = {
  title: "Conteúdo",
  description: "PLACEHOLDER — descrição da página Conteúdo.",
};

export default function ConteudoPage() {
  return (
    <Section id="conteudo-page" title="Conteúdo" titleAs="h1" narrow>
      <p>PLACEHOLDER — conteúdo da página Conteúdo.</p>
    </Section>
  );
}
