# Integração com o Instagram

O feed da home busca as últimas publicações pela **Instagram API with Instagram Login**
(API oficial da Meta). Enquanto o token não estiver configurado, a seção exibe as
imagens locais de `public/images/julia/instagram-*.jpg` — o site nunca quebra por
causa do feed.

## Pré-requisitos

- Conta do Instagram do tipo **Profissional** (Business ou Creator) ✅
- A conta precisa estar **pública** (contas privadas não são aceitas pela Meta)
- Conta no [Meta for Developers](https://developers.facebook.com)

> **Não é necessário App Review.** Como o app serve apenas uma conta que você
> mesmo gerencia, o **Standard Access** (padrão) já é suficiente.

## Passo a passo

Referência oficial:
[Create a Meta app for the Instagram API](https://developers.facebook.com/docs/instagram-platform/create-an-instagram-app)

### 1. Criar o app

Acesse https://developers.facebook.com/apps e clique em **Criar app**.

### 2. Conectar um portfólio empresarial

A Meta pede para vincular o app a um portfólio empresarial. Se ainda não tiver um,
é possível pular esta etapa agora e configurá-la depois em
*Configurações do app → Básico*.

### 3. Caso de uso

Selecione **Outro** (*Other*) → **Avançar**.

### 4. Tipo do app

Selecione **Empresa** (*Business*) → **Avançar**.

> Este passo é obrigatório: apenas apps do tipo Empresa podem adicionar o
> produto Instagram.

### 5. Detalhes do app

Informe um nome (ex.: `Site Julia Araujo`) e um e-mail de contato → **Avançar**.

### 6. Adicionar o produto Instagram

No painel do app, role a lista de produtos até **Instagram** e clique em
**Configurar** (*Set up*).

A opção **API setup with Instagram login** (*Configuração da API com login do
Instagram*) é adicionada **automaticamente** — não é preciso escolher nada.

### 7. Gerar o token

No menu lateral: **Instagram → API setup with Instagram login**.

Na seção **2. Generate access tokens** (*Gerar tokens de acesso*):

1. Clique em **Add account** (*Adicionar conta*)
2. Faça login com a conta da Júlia e autorize as permissões
3. Com a conta já listada, clique em **Generate token** (*Gerar token*)
4. Copie o token — ele aparece **uma única vez**

### 8. Configurar o projeto

Crie o arquivo `.env.local` na raiz (use o `.env.example` como base):

```env
INSTAGRAM_ACCESS_TOKEN=cole_o_token_aqui
```

Reinicie o servidor (`npm run dev`) e o feed real deve aparecer.

### 9. Configurar em produção

Adicione a mesma variável `INSTAGRAM_ACCESS_TOKEN` no painel do serviço de
hospedagem (Vercel: *Settings → Environment Variables*).

> **Não é necessário** configurar o *Business login* (passo 3 do painel) nem
> webhooks. Aquilo serve para apps que autenticam **outros** usuários — não é o
> nosso caso, já que usamos um token fixo da própria conta.

## Renovação do token ⚠️

O token expira em **60 dias**. Para renovar:

```powershell
npm run instagram:refresh
```

O script atualiza o `.env.local` automaticamente e informa a nova validade.
**Lembre-se de copiar o novo token para o ambiente de produção também.**

Regras da Meta:
- O token precisa ter no mínimo **24 horas** de vida para poder ser renovado
- Se expirar, não há renovação: é preciso gerar um novo pelo painel (passo 4)

> Sugestão: crie um lembrete recorrente a cada ~50 dias para rodar a renovação.

## Como funciona no código

| Arquivo | Papel |
| --- | --- |
| `lib/instagram.ts` | Busca e normaliza os posts; define o fallback |
| `types/instagram.ts` | Tipos `InstagramPost` e `InstagramMediaType` |
| `components/sections/InstagramFeed/` | Server Component que renderiza a grade |
| `scripts/refresh-instagram-token.mjs` | Renovação do token |

Detalhes:
- **Cache/ISR**: `revalidate: 3600` — o feed se atualiza sozinho de hora em hora,
  sem precisar de novo deploy
- **Vídeos/Reels**: usam automaticamente a `thumbnail_url`
- **Fallback**: qualquer falha (token ausente, expirado, rede) cai nas imagens
  locais e registra o erro no log do servidor
- **Links**: cada post abre a publicação original em nova aba

## Ajustes comuns

- **Quantidade de posts**: `INSTAGRAM_POST_LIMIT` em `lib/instagram.ts`
  (a grade é de 4 colunas — múltiplos de 4 ficam alinhados)
- **Frequência de atualização**: valor de `revalidate` em `lib/instagram.ts`
