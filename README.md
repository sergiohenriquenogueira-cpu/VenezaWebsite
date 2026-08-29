# Veneza — Landing de Investimento

Landing page estática (sem build) da **Veneza Incorporadora e Construtora** —
cotas de investimento em imóveis a preço de custo em Ourinhos/SP.

## Estrutura

| Arquivo | O quê |
|---|---|
| `index.html` | Página principal |
| `style.css` | Estilos (design tokens + BEM) |
| `script.js` | Contadores, carrossel, "voltar ao topo" (JS puro, sem dependências) |
| `termos.html` · `obrigado.html` · `404.html` | Páginas auxiliares |
| `img/` | Imagens, vídeo do hero e ícones |
| `material/` | PDF do material completo (alvo do botão de download) |

## Rodar localmente

Qualquer servidor estático na raiz do projeto, por exemplo:

```bash
npx serve .
```

Depois abrir `http://localhost:3000`.

## Deploy

GitHub → Vercel (deploy estático, sem comando de build, output = raiz).
`spec.md` e `dados.md` são documentação interna e não são publicados
(ver `.vercelignore`).
