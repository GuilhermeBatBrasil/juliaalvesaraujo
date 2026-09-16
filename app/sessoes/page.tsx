import type { Metadata } from "next";

import { Section } from "@/components/ui/Section/Section";

export const metadata: Metadata = {
  title: "Sessões",
  description: "PLACEHOLDER — descrição da página Sessões.",
};

export default function SessoesPage() {
  return (
    <Section id="sessoes" title="Sessões" titleAs="h1" narrow>
      <p>PLACEHOLDER — conteúdo da página Sessões.</p>
    </Section>
  );
}
