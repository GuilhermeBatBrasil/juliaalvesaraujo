import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";

export default function NotFound() {
  return (
    <Section title="Página não encontrada" titleAs="h1" narrow>
      <p>O endereço acessado não existe ou foi movido.</p>
      <p>
        <Button href="/">Voltar para o início</Button>
      </p>
    </Section>
  );
}
