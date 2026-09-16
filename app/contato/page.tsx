import type { Metadata } from "next";

import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contato",
  description: "PLACEHOLDER — descrição da página Contato.",
};

export default function ContatoPage() {
  return (
    <Section id="contato" title="Contato" titleAs="h1" narrow>
      <p>PLACEHOLDER — texto introdutório da página de contato.</p>
      <p>
        E-mail:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
      </p>
      <p>
        <Button href={buildWhatsAppLink("Olá! Vim pelo site.")}>
          Falar no WhatsApp
        </Button>
      </p>
      {/* TODO: formulário de contato será implementado após a definição do design. */}
    </Section>
  );
}
