# Imagens da Júlia

Para trocar qualquer foto, basta substituir o arquivo mantendo o mesmo nome —
nenhum componente precisa ser alterado.

| Arquivo | Onde aparece | Proporção sugerida | Status |
| --- | --- | --- | --- |
| `hero.jpg` | Hero (foto circular) | 1:1 | ✅ foto real |
| `about.jpg` | Seção "Muito Prazer, Sou a Júlia" | 4:5 | ✅ foto real |
| `contact-1.jpg` | Contato — imagem grande da colagem | 3:4.2 | ✅ foto real |
| `contact-2.jpg` | Contato — colagem (superior) | retrato | ✅ foto real |
| `contact-3.jpg` | Contato — colagem (inferior) | retrato | ✅ foto real |
| `instagram-1..8.jpg` | Grade do Instagram | 1:1 | ⏳ placeholder |

O enquadramento (`object-position`) de cada imagem está definido no CSS Module da
respectiva seção e pode ser ajustado conforme a foto usada.

Para regerar os placeholders que ainda faltam:

```powershell
node scripts/generate-placeholders.mjs
```

O script **nunca sobrescreve** um arquivo existente — gera apenas os que faltam.
