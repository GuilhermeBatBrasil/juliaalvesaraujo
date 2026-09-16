import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";

export default function HomePage() {
  return (
    <Section
      id="inicio"
      eyebrow="PLACEHOLDER — categoria"
      title="PLACEHOLDER — título principal da home"
      subtitle="PLACEHOLDER — subtítulo/descrição. O conteúdo e o design definitivos serão construídos a partir das referências visuais."
      titleAs="h1"
    >
      <Button href="/contato">Entre em contato</Button>
    </Section>
  );
}
