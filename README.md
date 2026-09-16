# Site institucional — base inicial

Fundação de um site institucional em **Next.js (App Router) + TypeScript + CSS Modules**.
O design definitivo ainda **não** foi implementado: os textos são placeholders e serão
substituídos a partir dos prints e referências visuais.

## Stack

- Next.js (App Router)
- React + TypeScript
- CSS Modules / CSS puro (design tokens em `app/globals.css`)
- `lucide-react` para ícones

## Estrutura

| Pasta | Papel |
| --- | --- |
| `app/` | Rotas (App Router), layout global, `globals.css`, `sitemap.ts`, `robots.ts`, `not-found.tsx` |
| `components/layout/` | Estrutura da página: `Navbar`, `Footer`, `Container` |
| `components/ui/` | Blocos reutilizáveis de interface: `Button`, `Section` |
| `components/sections/` | Seções específicas de páginas (a criar conforme necessidade) |
| `lib/` | `site-config.ts` (dados centrais do site) e `utils.ts` (helpers: `cn`, WhatsApp, URLs) |
| `types/` | Tipos compartilhados |
| `public/images` `public/icons` `public/fonts` | Assets estáticos |

Cada componente visual fica em seu próprio diretório com o CSS Module ao lado
(ex.: `components/ui/Button/Button.tsx` + `Button.module.css`).

## Design system

Todos os tokens (cores, tipografia, espaçamentos, raios, sombras, largura de container,
transições) estão em `:root` no `app/globals.css`. Alterar o visual do site deve começar
por ali. Breakpoints de referência: `480px`, `768px`, `1024px`, `1280px` (mobile-first).

## Acessibilidade

- Estrutura semântica `header` / `main` / `footer`
- Skip link "Pular para o conteúdo"
- Navbar com `aria-expanded`, `aria-controls`, fechamento por `Escape` e `aria-current`
- Estados de foco visíveis globais e suporte a `prefers-reduced-motion`

## SEO

Metadata API do Next.js configurada em `app/layout.tsx` (title template, description,
Open Graph, Twitter card, robots, favicon). Ajustar `lib/site-config.ts` com os dados reais
e adicionar `public/images/og-image.jpg` (1200x630) e `public/favicon.ico`.

## Como executar

```powershell
npm install
npm run dev
```

Acesse http://localhost:3000

Outros comandos: `npm run build`, `npm start`, `npm run lint`.

## Próximo passo

Fornecer os prints do site antigo, textos e referências visuais para adaptar os
componentes e o CSS existentes ao design real.
