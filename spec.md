# SPEC — Veneza (Residencial Veneza — Cotas de Investimento)
> Projeto **sem CMS**. Entrega estática. Página única.
> Arquivo de referência completo. Leia inteiro antes de escrever qualquer código.
> Layout, composição, cores, espaçamento e a **escala tipográfica** (tamanhos, pesos, line-height, tracking) vêm **sempre do Figma** — abas ⟶ Dev e ⟶ Style guide.
> Exceção: a **tipografia** foi definida por decisão do cliente — **IBM Plex Sans (títulos) + Inter (corpo/UI)**, com a **escala do site de referência (Bolfe)** — ver seção 2.2.

---

## ESTRUTURA DO FIGMA
> Arquivo: **Veneza** — `VyY5Opt634GP6dvy3wFn0H`
> Link: https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza

Páginas existentes neste arquivo (as demais abas do template padrão não existem aqui):

| Página (aba) | Instrução |
|---|---|
| ⟶ General | Frame **SEO / Meta Share** (`94:326`) → Meta Title e Meta Description. Frames `Frame 1` e `Favicon` estão vazios/sem arte final. |
| ⟶ Style guide | Design system — cores `Color 01–06` + escala de cinza + tipografia. Ver seção 2. |
| ⟶ UI Design | Ignorar — uso interno |
| ⟶ Dev | **Arquivo de produção.** Frames `Desktop` (`96:423`, 1920px) e `Mobile` (`96:833`, 390px). Implementar as seções na ordem da seção 6. |

**Assets cover e favicon:**
Não há arte final de cover nem de favicon no Figma:
- `img/cover.jpg` (1200×630, JPG) → **[PENDENTE — pedir ao cliente/designer]**. O frame `SEO / Meta Share` é só um cartão de texto de referência, não serve como OG image.
- `img/favicon.png` (512×512, PNG) → **[PENDENTE]**. O frame `Favicon` (`115:1532`) é só um bloco 39×39 na cor `#01040C`. Exportar a partir da marca "V" da Veneza quando disponível.

**Nomenclatura:**
Os layers da aba ⟶ Dev seguem a convenção **BEM** (renomeação já aplicada em 28/08/2026).
Usar os nomes dos layers diretamente como classes CSS, sem renomear.
Blocos: `hero`, `investidor-tradicional`, `passo-a-passo`, `entregues-e-andamento`, `hub-regional`, `footer`.

---

## FONTES DE INFORMAÇÃO

| Fonte | O que vem dela |
|---|---|
| **Figma** — aba ⟶ Dev | Layout, design system aplicado, estrutura e ordem das seções, copy das seções |
| **Figma** — aba ⟶ Style guide | Tokens de cor e tipografia |
| **Figma** — aba ⟶ General | Meta title / meta description (frame SEO / Meta Share) |
| **`dados.md`** — raiz do projeto | Dados do projeto, contatos, links, meta tags, respostas do FAQ |

> **Estado atual do `dados.md` (28/08/2026):** parcialmente preenchido — WhatsApp, material em PDF,
> meta tags, cidade-base e a mensagem pré-preenchida do WhatsApp definidos. Continuam pendentes:
> URL de produção, e-mail, redes sociais, razão social/CNPJ e endereço — ver bloco "Pendências" no `dados.md`.
> Nunca preencher telefone, e-mail, URL de produção ou resposta de FAQ por suposição.

---

## 1. VISÃO GERAL

| Campo | Valor | Origem |
|---|---|---|
| Projeto | Veneza — Residencial Veneza / Cotas de Investimento e Rentabilidade | Figma |
| Cliente | Veneza Incorporadora e Construtora | Figma (rodapé) |
| URL de produção | `[PENDENTE — pedir ao cliente]` | 📄 `dados.md` |
| Figma | https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=96-423 | manual |
| Páginas | `index.html` (página única) + auxiliares `termos.html` / `obrigado.html` / `404.html` | Figma ⟶ Dev |
| Entregáveis | `index.html` + `style.css` + `script.js` + `img/` + `material/` | HTML renomeado de `indexveneza.html` → `index.html` p/ deploy na Vercel (29/08/2026) |
| Pasta de assets | `img/` | fixo |
| Deploy | GitHub → Vercel (estático, sem build). `.gitignore` (não versiona `Referencia/`, `.claude/`, `.DS_Store`) + `.vercelignore` (não publica `spec.md`, `dados.md`) | 29/08/2026 |

> **URL de produção:** usada apenas em `og:url`, `og:image` e `canonical`. Se o domínio ainda
> não existir, manter `[PENDENTE]` — publicar com canonical errado é pior que sem.

---

## 2. DESIGN SYSTEM
> Extraído da aba ⟶ Style guide (`94:347`) e confirmado pelo uso na aba ⟶ Dev.
> **Todo valor usado no CSS precisa existir aqui.** Nenhum número solto nas seções.

### 2.1 Cores

```css
:root {
  /* Cores do projeto — Style guide "Cores e Fontes" */
  --color-01: #050507;  /* preto da marca */
  --color-02: #FF8D28;  /* laranja — CTA / destaques */
  --color-03: #FFFFFF;  /* branco */
  --color-04: #909090;  /* cinza — texto secundário */
  --color-05: rgba(144, 144, 144, 0.30);  /* #909090 @ 30% — fundo de pílula/badge neutro */
  --color-06: rgba(177, 177, 177, 0.40);  /* #B1B1B1 @ 40% — bordas / divisores translúcidos */

  /* Escala de cinza — fixa em todos os projetos */
  --white:        #FFFFFF;
  --grayscale-01: #1C1C1C;
  --grayscale-02: #3D3D3D;
  --grayscale-03: #454545;
  --grayscale-04: #6D6D6D;
  --grayscale-05: #B0B0B0;
  --grayscale-06: #E7E7E7;
}
```

**Uso no projeto** (aba ⟶ Dev):

| Token | Uso |
|---|---|
| `--color-01` | Fundo escuro do hero (sobre foto), fundo do card "Investimento a Preço de Custo" (aplicado no Figma como `#151515` — usar `--color-01`), texto preto de títulos/corpo em fundo claro |
| `--color-02` | Botões "Baixar material completo", badge "Vantagens reais", nome dos empreendimentos, label de status dos cards, ícone/traço do eyebrow |
| `--color-03` | Texto sobre fundo escuro, fundo dos cards do "Passo a passo", fundo do card do "HUB regional", botões de paginação, card do rodapé |
| `--color-04` | Descrição dos passos, "N Unidades", descrição dos fatores do HUB |
| `--color-05` | Fundo da pílula de status dos empreendimentos (`entregues-e-andamento__card-status`) |
| `--color-06` | Divisores / bordas sutis (`--benefit-divider`, `--factor-divider`, borda 0.5px do badge de WhatsApp) |
| `--grayscale-01` | Equivalente ao `#151515` do card do Investidor, se preferir manter o token de cinza |
| `--grayscale-06` | Texto de apoio claro sobre fundo escuro (`#E6E6E6` observado ≈ `--grayscale-06`) |

> Observações de fidelidade ao Figma (não são novos tokens — são desvios do próprio arquivo):
> - Textos pretos usam `#000000` puro no Figma, não `#050507`. Padronizar em `--color-01`.
> - Card do Investidor usa `#151515`; card do HUB usa `#FFFFFF`. Ambos com raio 20px.
> - **`--color-03-dim: #E2E8F0`** (branco suave / slate-200 da ref) — cor do **subtítulo do hero** (`hero__description`); não é branco puro, dá respiro para o H1 branco.
> - **Barra do topo do hero (`hero__topbar`):** a linha divisória + o "vidro" ocupam a **largura total da página** (`width: 100%`, `border-bottom: 1px solid rgba(255,255,255,.1)`, `background: rgba(255,255,255,.06)`, `backdrop-filter: blur(10px)` — modelo da ref, que usa `.2` de fundo; suavizado p/ o fundo escuro). O conteúdo (logo + marca) fica alinhado ao container de 1920 via um wrapper interno `hero__topbar-inner` (`max-width: var(--wrap); margin-inline: auto; padding: 11px var(--gutter)`).
> - Badge de WhatsApp do rodapé: fundo `#122C2B` (verde escuro, cor pontual do componente `Badge/Mode=Primary`) — registrar como `--color-whatsapp: #122C2B` se for usada.
> - **Card de indicadores do hero (`hero__stats`):** "vidro" no estilo da ref (Bolfe `.framer-bp7cde`) — `padding: 16`, `border-radius: 12`, `border: 1px solid rgba(255,255,255,.2)`, `background: rgba(0,0,0,.1)`, `backdrop-filter: blur(5px)` (+ `-webkit-`) — em **layout HORIZONTAL** como o Figma dev: thumbnail 72×72 (r10) + as **3 estatísticas lado a lado** (`__stats-list` = row, gap 16; `__stat` = value sobre label). Largura pelo conteúdo (~730px). Textos brancos (`__stat-value` 600 / `__stat-label` 400, ambos `--fs-text-1` 20/lh 1.5) com `text-shadow: 0 1px 2px rgba(5,5,7,.55)` — **funcional** (fundo quase transparente). `@supports not (backdrop-filter…)` sobe o fundo p/ `rgba(5,5,7,.5)`. **Posição:** à direita da intro ≥ 1900px; abaixo dela (mesmo horizontal) entre 901–1900; **≤ 900px** o `__stats-list` volta a `column` (card compacto vertical). Nenhum ancestral pode ter `transform`/`filter`/`perspective`, senão o `backdrop-filter` quebra. Os tokens `--glass-dark` / `--glass-border` ficaram órfãos (efeito Vidro `96:549` do Figma substituído).

### 2.2 Tipografia
> **Decisão do projeto (28/08/2026, 3ª revisão): DUAS famílias + escala do site de referência (Bolfe).**
> - **IBM Plex Sans** → títulos / display (hero, títulos de seção, subtítulos, nº de estatística, eyebrow, "IDH 0,778", nomes de empreendimento).
> - **Inter** → corpo / UI (parágrafos, leads, botões, legendas, "N Unidades", selos, todo o rodapé, marca no topo).
> - **Escala** (tamanhos, line-height, letter-spacing) = a da ref (extraída do export Framer), **não mais do Figma**.
> - **Pesos** (boa prática de UI para IBM Plex em tamanhos grandes — a ref usa 400 na Bricolage, que é encorpada; IBM Plex precisa de mais peso): hero H1 = **700**; demais títulos/display = **600**; corpo Inter = **400**; botões/labels/UI Inter = **500**; selos/status Inter = **600**.
> - Google Fonts: `IBM Plex Sans` 400/600/700 + `Inter` 400/500/600 — uma requisição, não-bloqueante (§8).

```css
:root {
  --font-display: 'IBM Plex Sans', system-ui, -apple-system, sans-serif; /* títulos */
  --font-primary: 'Inter', system-ui, -apple-system, sans-serif;         /* corpo / UI */
  --font:         var(--font-primary); /* compat com o alias antigo */

  /* Escala da ref — Desktop */
  --fs-h1:          76px;  /* headline do hero — 700 — lh 1.25 (ajuste do cliente) */
  --fs-section:     48px;  /* título de seção — 600 — lh 1.1 (→ 38 ≤1199 → 36 ≤809) */
  --fs-title-lg:    40px;  /* título grande de card ("Investimento a Preço de Custo:") — 600 — lh 1.25 */
  --fs-step-title:  32px;  /* título médio: passo, nº de estatística — 600 — lh 1.25–1.3 */
  --fs-h2:          24px;  /* subtítulo: benefício, nome de empreendimento, "IDH 0,778" — 600 — lh 1.4 */
  --fs-text-1:      20px;  /* parágrafo de destaque: leads, corpo longo Investidor/HUB — 400 — lh 1.5 */
  --fs-text-2:      18px;
  --fs-h3:          18px;
  --fs-body:        16px;  /* corpo padrão / botões — 400/500 — lh 1.5 */
  --fs-eyebrow:     16px;  /* kicker / "CONTATO" — 600 — +0.05em */
  --fs-stat:        32px;  /* nº de estatística do hero — 600 — lh 1.1 */
  --fs-stat-label:  14px;  /* legendas, "N Unidades", marca do rodapé, linha legal — lh 1.5 */
  --fs-tag:         12px;  /* selos / status — 600 — +0.01em — uppercase */
}
/* `hub…__factor-title`: 28px / 24 mob (hardcoded) = `.passo-a-passo__step-title`. */

@media (max-width: 1199px) { :root { --fs-section: 38px; } }  /* ref */
@media (max-width: 809px)  { :root { --fs-section: 36px; } }  /* ref */
@media (max-width: 768px) {
  :root {
    --fs-h1:         44px;
    --fs-title-lg:   32px;
    --fs-step-title: 26px;
    --fs-h2:         22px;
    --fs-text-1:     18px;
    --fs-text-2:     16px;
  }
}
```

**Mapa elemento → token / família / peso / line-height** (aplicado no `style.css`):

| Elemento | Token | Web | Família | Peso | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| `hero__title` | `--fs-h1` | **76** (44 mob) | IBM Plex Sans | 700 | 1.25 | 0 |
| `hero__description` (lead) | `--fs-text-1` | 20 (18 mob) | **Inter** | 400 | 1.5 | 0 · cor `--color-03-dim` (#E2E8F0, ref) · **`max-width: 56ch`** → ~3 linhas no desktop, largura ≈ a do `hero__title` no 1920 (cliente 2026-08-29; era 679, passou por "sem cap") |
| `hero__eyebrow-text` | `--fs-text-1` | **20** (18 mob) | **Inter** | 600 | 1.5 | +0.05em |
| `hero__topbar-brand` | `--fs-stat-label` | **14** (12 mob) | **Inter** | 500 | 1.5 | 0 |
| `hero__stat-value` | `--fs-text-1` | **20** (18 mob) | **Inter** | 600 | 1.5 | 0 · tabular-nums |
| `hero__stat-label` | `--fs-text-1` | **20** (18 mob) | Inter | 400 | 1.5 | 0 |

> **Ajuste do cliente (hero):** headline **76px** (44 mobile); todo o resto do hero (eyebrow "EM OURINHOS DESDE 2009", lead e o card de estatísticas — `450+` / `Cotas Comercializadas` / `90 mil` / `M² construídos` / `300+` / `Investidores`) em **Inter 20px, line-height 150%**; marca no topo em **Inter 14px / 500 / branco**.
> `.hero__intro` = `flex: 1 1 900px; max-width: 900px; min-width: 0` (headline 76px em 4 linhas). O `.hero__stats` é um card **de vidro HORIZONTAL** (estilo ref + layout Figma dev — ver §2.1), ~730px. Cabem lado a lado só ≥ **1900px** (`.hero__content { flex-wrap: nowrap; justify-content: space-between }`), com o **card à direita**; entre 901 e 1900 o hero empilha (intro 100%, título 2–3 linhas, card horizontal embaixo); ≤ 900 o card vira vertical compacto. **Gap título → subtítulo reduzido de 64 → 24** (`.hero__headline`), a pedido do cliente, para compensar o card horizontal. Ver §3.
> **Mobile (≤ 768px, cliente 2026-08-29):** `.hero__stats { width: 100% }` — o card acompanha a largura do `hero__title` (e do lead). Continua **em linha** (imagem à esquerda): `.hero__stats-image` **72 → 88px** e cada estatística com **nº + rótulo na mesma linha** ao lado da imagem (`.hero__stat { flex-direction: row; align-items: baseline; flex-wrap: wrap }`, valor `--fs-text-1`/18, rótulo `--fs-stat-label`/14 p/ caber) — "450+ Cotas Comercializadas", "90 mil M² construídos", "300+ Investidores". No desktop o card segue horizontal com nº sobre rótulo (imagem 72, textos 20). O lead usa `max-width: 56ch` (~3 linhas).
| **títulos de seção** (`investidor…__title`, `passo…__subtitle`, `entregues…__title`, `hub…__title`) | `--fs-section` | 48 → 38 → 36 | IBM Plex Sans | 600 | 1.1 | 0 |
| `investidor…__description` · `hub…__card-description` | `--fs-text-1` | 20 (18 mob) | Inter | 400 | 1.5 | 0 |
| `investidor…__badge` ("Vantagens reais") | `--fs-stat-label` | 14 | Inter | 600 | 1 | 0 |
| `investidor…__card-title` | `--fs-title-lg` | 40 (32 mob) | IBM Plex Sans | 600 | 1.25 | 0 |
| `investidor…__benefit-title` ("Economia Real") | `--fs-h2` | 24 (22 mob) | IBM Plex Sans | 600 | 1.4 | 0 |
| `investidor…__benefit-description` | `--fs-text-1` | 20 | Inter | 400 | 1.5 | 0 · cor `--grayscale-06` (mesmo padrão do parágrafo da intro, só a cor muda p/ o card escuro) |
| descrições de passo / fator | `--fs-body` | 16 | Inter | 400 | 1.5 | 0 |
| `passo…__title` ("É um processo…") — **KICKER acima do título** (bullet 7px + uppercase) | `--fs-text-1` | 20 (18 mob) | IBM Plex Sans | 600 | 1.5 | +0.05em · `--color-02` (ref preset `jwnukh` era 16; cliente pediu 20) |
| `passo…__step-title` | — | **28** (24 mob) | IBM Plex Sans | 600 | 1.3 | 0 (um passo acima do `benefit-title`; sempre 1 linha) |
| `passo…__step-description` | `--fs-text-1` | 20 (18 mob) | Inter | 400 | 1.5 | 0 · `--color-04` (= `benefit-description`; copy encurtada p/ caber em **1–2 linhas** em qualquer largura) |
| `entregues…__card-name` | — | **28** (24 mob) | IBM Plex Sans | 600 | 1.3 | 0 · `--color-02` — **= título do card do "Passo a passo"** |
| `entregues…__card-units` ("N Unidades") | `--fs-text-1` | **20** (18 mob) | Inter | 400 | 1.5 | 0 · `--color-04` — **= texto do card do "Passo a passo"** |
| `entregues…__card-status-label` (selo — **sobreposto no topo da foto**) | `--fs-text-2` | **18** (16 mob) | Inter | 600 | 1 | +0.01em · uppercase · `--color-01` sobre pílula `--color-02` |
| `hub…__factor-title` ("IDH 0,778", "Crescimento habitacional acelerado", "Polo educacional") | — | **28** (24 mob) | IBM Plex Sans | 600 | 1.3 | 0 — **= `.passo-a-passo__step-title`** (título do card do "Passo a passo") (pedido do cliente 2026-08-29; passou por 48 → 24 → 28). |
| `hub…__factor-description` · `hub…__card-description` | `--fs-text-1` | **20** (18 mob) | Inter | 400 | 1.5 | 0 · `--color-04` / `--color-01` |
| botões "Baixar material completo" | `--fs-text-2` | **18** (16 mob) | Inter | 500 | 1.2 | 0 (pílula clara + chip da seta — spec §2.5) |
| `footer__contact-name` ("Veneza \| Cotas de Investimento e Rentabilidade") | `--fs-text-1` | 20 | Inter | 500 | 1.2 | 0 (Figma 96:1197) |
| `footer__contact-title` ("CONTATO") | `--fs-text-1` | 20 | Inter | 500 | 1 | +0.05em (Figma "Gray/50" resolve p/ branco; render usa branco) |
| `footer__whatsapp-number` | `--fs-body` | 16 | Inter | 500 | 1 | 0 |
| `footer__top` ("VOLTAR AO TOPO") | `--fs-text-2` | 18 | Inter | 600 | 1 | +0.02em (mesma pílula do `__whatsapp-badge`; ícone seta-p/-cima 20px; JS rola ao topo) |
| `footer__legal-text` | `--fs-body` | 16 | Inter | 400 | 1.5 | 0 (centralizado na coluna esq.) |
| `footer__legal-link` ("Política de Privacidade" · "Termos de Uso" → `termos.html`) | `--fs-tag` | 12 | Inter | 500 | 1 | 0 |

> **Escala completa presente na ref** (px): 64 · 48 · 40 · 32 · 24 · 20 · 18 · 16 · 14 · 12. line-heights da ref: hero 125% · seção 110% · médio 130% · subtítulo 140% · corpo 150%. Só o kicker (+0.05em) e o selo (+0.01em, uppercase) têm tracking.

> **Quebra de linha dos títulos:** `text-wrap: balance` em todos os títulos de seção e no hero. Com a escala nova, "Empreendimentos entregues e em andamento" cabe em **1 linha** a 48px (não há mais viúva).

> **Google Fonts:** `family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500;600&display=swap`, não-bloqueante (`media="print" onload=…`) — §8. Fallback imediato: `system-ui`.

### 2.3 Espaçamento
> Derivado dos frames da aba ⟶ Dev (auto-layout: paddings e `itemSpacing`).

```css
:root {
  --space-xs:  8px;
  --space-sm:  16px;
  --space-md:  24px;
  --space-lg:  32px;
  --space-xl:  64px;
  --space-2xl: 128px;
}
```

| Item | Valor | Origem no Figma |
|---|---|---|
| Largura máxima do container | `1640px` | `1920 − 140×2`; largura dos frames internos das seções |
| Padding lateral (desktop) | `140px` | `section` Investidor `padding: 128 140` |
| Padding lateral (mobile) | `16px` | frames internos do `Mobile` a `x=16` |
| Gutter do grid | `24px` | cards "Entregues" a cada `435px` (411 + 24); colunas do "Passo a passo" (531 + 24) |
| Espaçamento vertical entre seções | `128px` (topo/base de cada seção) | `section` Investidor `paddingTop/Bottom: 128`, `itemSpacing: 128`; headers de Passo/Entregues a `y=128` |
| Padding interno — card grande (Investidor) | `48px` (24 no mobile) | `investidor-tradicional__card` — margem interna maior/harmônica a pedido do cliente (era 24) |
| Card do HUB (`hub-regional__card`) | **639** de largura (ref `.framer-1phaccj`), `min-height: 737` (piso), `padding: 80px`, `border-radius: 16` (`--radius-md`), `card-content gap: 32` | ref Bolfe (largura era 693, raio 20, gap 40) |
| Coluna título+botão do HUB (`__intro-text`) | `max-width: 780` | alargada p/ o título quebrar em **2 linhas** (era 608) |
| Gap card do HUB — parágrafo → fatores | `40px` | Figma `96:644` dev: `gap-[40px]` |
| Gap coluna do HUB — título → botão | `32px` (`--space-lg`) | Figma `96:638` dev: `gap-[32px]` |
| Gap lista de fatores do HUB (fator ↔ divisor) | `32px` (`--space-lg`) | Figma `96:648` dev: `gap-[32px]` |
| Vão entre as colunas do HUB (Desktop) | `329px` (via `space-between`) | Figma `96:637` dev: `gap-[329px]` |
| Padding interno — card de passo | `32px` | `passo-a-passo__step-card` `padding: 32`, `itemSpacing: 32` |
| Padding — rodapé (`.footer`) | `80px` topo / `--gutter` lateral / `--space-xl` base | Figma 96:1197 `top-[80px]`; grade interna com `column-gap: 128` e `row-gap: 120` |
| Padding — pílula/badge/botão | `8px 16px` (badge/status) · `16px 24px` (botão) | componentes Badge / Button |
| Gap entre item de benefício e divisor | `24px` | benefício `y=0` → divisor `y=121` → próximo `y=145` |

### 2.4 Radius e sombras

```css
:root {
  --radius-xs:   8px;    /* botões "Baixar material completo" + badge "Vantagens reais" (modelo da ref) */
  --radius-sm:   14px;   /* thumb da estatística do hero */
  --radius-md:   16px;   /* card de passo, card de empreendimento, badge de WhatsApp */
  --radius-lg:   20px;   /* card "Investimento a Preço de Custo", card do HUB */
  --radius-pill: 999px;  /* botões de paginação, pílula de status */
}
```

**Sombras:** nenhuma sombra (`effects`) encontrada em nenhum nó da aba ⟶ Dev.
Não declarar `--shadow-*`. Se a homologação pedir profundidade, registrar aqui antes de usar.

### 2.5 Estados
> O componente `Button [1.0]` vem de uma **biblioteca externa** (roxo `#893DE7`); nas instâncias da Veneza
> o preenchimento é sobrescrito para o laranja `--color-02`. O comportamento de estados do componente da
> biblioteca é "Hover = clarear o fill um passo". Como **não há hover específico da Veneza no arquivo**, a
> regra abaixo é a **definição de implementação** (escurecer, mais previsível que clarear laranja) — confirmar
> tom exato com o designer.

```css
:root {
  --color-02-hover:  #E67E12;  /* --color-02 escurecido ~10% — estado hover */
  --color-02-active: #D9750B;  /* --color-02 escurecido ~16% — estado pressed */
  --color-whatsapp:  #122C2B;  /* fundo do badge de WhatsApp (instância Veneza) */
}
```

| Elemento | Default | Hover | Focus-visible | Active | Disabled |
|---|---|---|---|---|---|
| Botão "Baixar material completo" (`__button--secondary`) — `<a>` — **modelo do anexo (retângulo de cantos arredondados + chip da seta)** | **fundo `--color-03` (branco) + texto `--color-01`**, borda 1px `--color-06`, **`border-radius: --radius-md` (16px — = badge do WhatsApp; pedido do cliente 2026-08-29, era 8)**, `padding: 16px 24px` (cliente "24x16" — 24 lateral / 16 vertical; era `4 4 4 16` com o chip encostado), `gap: 16`, `font-size: --fs-text-2` (**18** / 16 mob). Seta dentro de um **chip 46×46 (ref `.framer-1xs96b9`), `border-radius: 6`, `background: --color-02`, seta branca**. `overflow: hidden`. `404.html` acompanha (retângulo r8, sem chip). | **inverte** → botão `background: --color-02` + `color: --color-03`; chip `background: --color-01` + micro-interação de rótulo/seta | `outline: 2px solid --color-02` (Investidor) / `--color-03` (HUB) | igual ao hover | `opacity: .5; pointer-events: none` |
| Botão de paginação prev/next | 48×48, fundo `--color-03`, raio pill, ícone 24px **`--color-02`** (laranja, pedido do cliente) | fundo `--grayscale-06` | `outline: 2px solid --color-01; outline-offset: 2px` | fundo `--grayscale-06` | sem mais slides na direção: `opacity: .35; pointer-events: none` |
| Links legais (rodapé → `termos.html`) — "Política de Privacidade" · "Termos de Uso" | texto `--color-03`, Inter 500 / 12, sem sublinhado | `text-decoration: underline` | `outline: 2px solid --color-03; outline-offset: 2px` | — | — |
| Badge de WhatsApp (`footer__whatsapp-badge`) — `<a>` · **`footer__top` ("VOLTAR AO TOPO") — `<button>` usa a mesma pílula** | fundo `--color-whatsapp`, borda `.5px --grayscale-06`, raio `--radius-md` (16), padding `16px 32px`, gap 8px (badge: ícone WhatsApp + número Inter 500/16 · top: rótulo Inter 600/18 + seta 20px) | `filter: brightness(1.12)` | `outline: 2px solid --color-03; outline-offset: 2px` | `filter: brightness(0.95)` | — |

**Referência da biblioteca `Button [1.0]`** (roxo — só para consulta; a Veneza usa `Type=Secundary`, `Radius=Rounded`):
`Secundary` Default `#893DE7` / borda `#9D57F4` → Hover `#9D57F4` / borda `#AE72F9` (um passo mais claro).
Radius: `Rounded` = 999px (pill, usado pela Veneza) · `Default` = 12/12/8px por Size.

> Focus visível é obrigatório em todos os interativos — ver seção 10. `@media (hover: none)` não aplica hover.

---

## 3. BREAKPOINTS
> **Desktop-first** — media queries com `max-width`. Figma tem só `Desktop` (1920) e `Mobile` (390).

| Nome | Media query | Observação |
|---|---|---|
| Desktop | padrão (sem media query) | referência 1920, container 1640 |
| Hero empilha | `@media (max-width: 1900px)` | **só o hero** (28/08/2026): abaixo de 1900 a intro (900) + o card de estatísticas **horizontal** (~730) não cabem lado a lado → hero vira 1 coluna (intro 100%, card horizontal embaixo). ≥ 1900, card à direita. ≤ 900 o card vira vertical compacto. |
| Desktop compacto | `@media (max-width: 1280px)` | **ponto extra registrado em 28/08/2026** (impl. hero + investidor). As seções de 2 colunas do Investidor empilham; entre 1280 e 1920 as colunas interpolam por `%`. |
| Tablet | `@media (max-width: 900px)` | ajustes de gutter / ritmo |
| Mobile | `@media (max-width: 768px)` | aplica o frame `Mobile` do Figma (390) — 1 coluna, padding lateral 16px |
| Mobile pequeno | `@media (max-width: 600px)` | ajustes finos |
| Mobile menor | `@media (max-width: 480px)` | ajustes finos |

> Não criar breakpoints fora desta lista.

### 3.1 Mobile — frame `Mobile` (`96:833`, 390px)
> Padding lateral **16px**, container ~358px, tudo em **1 coluna**. Os frames do `Mobile` **não** têm nomes
> BEM (a renomeação de 28/08 cobriu só o `Desktop`) — na implementação responsiva, reutilizar as mesmas
> classes do Desktop.

| Seção | Como fica no mobile | Situação |
|---|---|---|
| Hero (`97:1198`) | ⚠️ frame com dimensões inválidas (1105×586, x negativo) — **não finalizado**. Derivar do Hero Desktop: foto + overlay, eyebrow, H1 32px, parágrafo, 3 estatísticas empilhadas. | **[PENDENTE — validar com o designer]** |
| Investidor + "Preço de custo" (`97:1202` + `97:1204`) | Vira 2 blocos: intro (título + parágrafo empilhados) e o card. No card: imagem no topo (~333×300), depois badge, título, 3 benefícios e **botão em largura total** (`padding 8/16`). | OK — derivável |
| Passo a passo (`96:863`) | 5 cards empilhados (~359×116 cada): ícone à esquerda (~40–48px) + título 24px + descrição à direita. | OK |
| Entregues e Andamento (`96:953` / `96:959`) | Cards empilhados (~370 de largura, imagem ~311×511). Rolagem vertical — **confirmar** se mantém carrossel ou vira lista simples no mobile. | confirmar (ver 7.1) |
| HUB regional (`96:1020`) | Vazio no Figma — **não finalizado**. Derivar do HUB Desktop (foto + overlay, H1, botão, card com 3 fatores empilhados). | **[PENDENTE]** |
| Rodapé (`97:1208`, 390×640) | Card de contato + badge de WhatsApp em largura total + marca "V" + linha legal centralizada, tudo empilhado. | OK |

---

## 4. ASSETS
> Imagens são referências do Figma (fills do tipo IMAGE). Exportar em 2× e otimizar (WebP com fallback JPG/PNG).
> Exports crus já estão em `img/` (`Hero.png`, `HUB regional.png`, `entregues-e-andamento__card-image-photo*.png`,
> `footer__logo.png`, `Favicon.png`, ícones `.svg`, `whatsapp.svg`) — renomear para os nomes-alvo abaixo,
> converter para WebP/JPG e comprimir antes de usar.

| Arquivo | Uso | Nó no Figma |
|---|---|---|
| **`material/veneza-investimento-2026.pdf`** | **Material completo para download** — anexado aos botões "Baixar material completo" (Investidor e HUB). 33 páginas, ~3,2 MB. Já está no projeto. | fornecido pelo cliente |
| `img/cover.jpg` | OG image (1200×630) | Sem arte no Figma. **Receita:** `img/Hero.png` recortada 1200×630 + overlay preto ~45% + logo "V" + "Invista em imóveis na planta em Ourinhos/SP" (IBM Plex Sans 700). Alternativa mínima: fundo `--color-01` + logo centralizado. → **[PENDENTE — aprovar arte]** |
| `img/favicon.png` | Favicon (512×512) | **Receita:** derivar da marca "V" (`img/footer__logo.png`, nó `96:679` 489×640 — reexportar do Figma a 2×) sobre tile `--color-01` (`#050507`), com ~12% de margem de segurança. Gerar também `favicon.ico` (32/16) e `apple-touch-icon.png` (180). → **[PENDENTE — gerar/aprovar]** |
| `img/hero-bg.jpg` | Fundo do hero (foto de obra, escurecida) | fill IMAGE em `Hero` (`96:1196`), 1920×1018 |
| `img/logo-veneza.svg` | Marca "V" no topo do hero (`hero__topbar-logo`, 43×56) e no rodapé (`footer__logo`, 489×640) | `96:537`, `96:679` — pedir SVG ao cliente |
| `img/hero-eyebrow-icon.svg` | Ícone/traço ao lado de "EM OURINHOS DESDE 2009" (`hero__eyebrow-icon`, 32×42) | `96:542` |
| `img/hero-stat-thumb.jpg` | Mini-thumb dentro do bloco de estatísticas (`hero__stats-image`, 153×125, raio 14) | `96:550` |
| `img/investidor-card.jpg` | Foto no card "Investimento a Preço de Custo" (`__card-image-photo`, ~1012×819) | `96:435` |
| `img/emp-toscana.jpg` | Card 1 — Edifício Toscana (346×568) | `96:573` (`PH Academy 1`) |
| `img/emp-villa-di-capri.jpg` | Card 2 — Edifício Villa Di Capri | `96:585` (`Wireframe - 1 1`) |
| `img/emp-florenca.jpg` | Card 3 — Edifício Florença | `96:597` (`Conversao visual 1`) |
| `img/emp-monte-carlo.jpg` | Card 4 — Edifício Monte Carlo | `96:609` (`Caion 1`) |
| `img/emp-veneza.jpg` | Card 5 — Edifício Veneza | `96:621` (`HUB X 1`) |
| `img/hub-regional__bg.png` | Fundo da seção HUB regional (foto aérea da cidade). Export cru `HUB regional.png` **renomeado** → `hub-regional__bg.png` (tinha espaço no nome). Converter p/ WebP/JPG e comprimir (4 MB). | fill IMAGE em `HUB regional` (`96:636`), 1913×922 |

> Nomes de arquivo de imagem no Figma (`PH Academy 1`, `Caion 1`, `HUB X 1`, `Captura de tela 2026-08-02…`)
> são placeholders de layout — as fotos reais dos empreendimentos são **[PENDENTE — pedir ao cliente]**.

**Asset crítico do hero:** `img/hero-bg.jpg` — recebe `preload` na seção 8 (`fetchpriority="high"`).

---

## 5. LINKS

| Elemento | URL / href | Atributos | Situação |
|---|---|---|---|
| Botão "Baixar material completo" (Investidor) | `material/veneza-investimento-2026.pdf` | `download` + `target="_blank"` + `rel="noopener"` | **Definido** — baixa o PDF do investidor |
| Botão "Baixar material completo" (HUB regional) | `material/veneza-investimento-2026.pdf` | idem | **Definido** — mesmo PDF |
| WhatsApp (rodapé — badge `footer__whatsapp-badge`) | `https://wa.me/5511996948833?text=Ol%C3%A1%2C%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20investimentos%20em%20im%C3%B3veis%20na%20planta` | `target="_blank"` + `rel="noopener"` | **Definido pelo cliente** — número `(11) 99694-8833` → DDI 55 + 11 + 996948833. Abre direto no WhatsApp (app no mobile, WhatsApp Web no desktop) com a mensagem pré-preenchida: _"Olá, gostaria de obter mais informações sobre os investimentos em imóveis na planta"_. |
| E-mail (rodapé) | `[PENDENTE — pedir ao cliente]` | — | não há e-mail real no Figma (o `Info@homestead.com` é do rodapé placeholder) |
| Política de Privacidade + Termos de Uso (rodapé) | ambos → `termos.html` | `target="_blank"` + `rel="noopener"` | Figma 96:1197 mostra **dois** links; só existe uma página jurídica (`termos.html`), então os dois rótulos apontam para ela. Conteúdo jurídico é boilerplate genérico → **[PENDENTE — separar em `politica.html` + `termos.html` e revisar dados da empresa: razão social, CNPJ, contato]**. |
| Links de navegação do rodapé ("About Us", "Management"…) | — | — | pertencem ao **rodapé placeholder `96:516`**, que **não** vai para produção |
| Redes sociais | `[PENDENTE — pedir ao cliente]` | `_blank` | não há no Figma |

> Nenhum link `#` no resultado final. Nada de número/e-mail/domínio inventado.
> Páginas auxiliares (`termos.html`, `obrigado.html`, `404.html`): **alinhadas ao design system em 28/08/2026** —
> Google Fonts IBM Plex Sans (títulos) + Inter (corpo), `:root` com `--color-01/02/04` + `--grayscale-06`,
> body branco, títulos IBM Plex (h1 700 / h2 600), corpo Inter, back-links em `--color-04` → hover `--color-01`,
> botão do 404 trocado de verde `#3a9a6e` para a pílula laranja `--color-02` (hover `--color-02-hover`).

---

## 6. SEÇÕES — ORDEM E DESCRIÇÃO
> Ordem no HTML (o Figma tinha passo→entregues; **cliente inverteu para entregues→passo** em 29/08/2026).
> Rodapé `96:516` ("Homestead") é template antigo, fora do artboard — **não implementar**.

| # | ID / classe (bloco BEM) | Descrição | Nó no Figma |
|---|---|---|---|
| 1 | `#hero` / `.hero` | Fundo em foto de obra escurecida. Topo: marca "V" + "Veneza Incorporadora e Construtora". Eyebrow "EM OURINHOS DESDE 2009", H1, parágrafo de apoio e bloco de 3 estatísticas (450+ / 90 mil / 300+) com mini-thumb. | [96:1196](https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=96-1196) |
| 2 | `#investidor-tradicional` | Intro (título à esquerda + parágrafo à direita). Card escuro (raio 20, `padding: 48`) — a **foto (esquerda) acompanha a altura do corpo**: topo alinhado ao badge "Vantagens reais", base alinhada ao botão. À direita: badge, título "Investimento a Preço de Custo:", 3 benefícios (descrição 20px = padrão da intro), botão "Baixar material completo". | [96:424](https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=96-424) |
| 3 | `#entregues-e-andamento` | **(era a 4ª — trocada com passo a passo)** Título + **carrossel** de cards em 2 peças (foto **480×480** r40 + card de info branco r20; nome laranja, "N Unidades" com ícone, pílula de status). Dimensões alinhadas à ref (Bolfe): `padding-block 100`, caixa 1216, card 480, faixa 664, gap 40 — ver 7.1. Paginação prev/next circulares + dots. | [142:1926](https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=142-1926) + ref Bolfe |
| 4 | `#passo-a-passo` | **(era a 3ª — trocada com entregues)** Header: **kicker "· É UM PROCESSO DE APENAS 5 ETAPAS"** (bullet + uppercase, §2.2) **acima** do título "Passo a passo". 5 cards brancos com borda 1px preta (raio 16): ícone + título (IBM Plex Sans 600, **28px** / 24 mob) + descrição (Inter, **20px**, sempre 1–2 linhas). Layout: 3+2 no Desktop → grade responsiva (`auto-fit minmax(420px,1fr)`) 2-por-linha ≤1280 → 1-por-linha quando o card ficaria < 420px. | [96:459](https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=96-459) |
| 5 | `#hub-regional` | **Implementado — revisado pelo dev link 28/08/2026.** Fundo em foto aérea (`hub-regional__bg` `<img>` + overlay leve só p/ contraste, §10 — não existe no Figma). `hub-regional__intro` = linha (`96:637`, `px-138 py-128`, `space-between`): `hub-regional__intro-text` (`w-608`, `gap-32`) com H2 branco 64/700 + botão "Baixar material completo"; e `hub-regional__card` (**693 × 737**, `padding 80` nos 4 lados, `bg #fff`, raio 20) → `card-content` (`gap-40`): parágrafo (`w-495`, 22/400/lh36/−0.44px) + `factors` › `factors-inner` › `factors-list` (`gap-32`): 3 `factor` (ícone seta **`#050505`** `size-24` + `factor-text` [título 26/`590`→600 + descrição 16/`#909090`], `gap-16`) e 2 `factor-divider` (`#E6E6E6` 1px). Números do card **contam** como no hero (§7.4): "20" no parágrafo e "0,778" em "IDH 0,778". Parallax do `intro-text` no scroll (§7.6). | [96:636](https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=96-636) |
| 6 | `footer` / `.footer` | **Implementado.** `<footer>` fora do `<main>`, fundo `--color-01`. `footer__container` (padding `64 / 138`): bloco de contato ("CONTATO" / "Residencial Veneza" / "Cotas de Investimento e Rentabilidade" + badge de WhatsApp `--color-whatsapp`) à esquerda, marca "V" (`footer__logo.svg`) + nome à direita. `footer__legal` centralizado embaixo: linha legal + link discreto "Política de Privacidade" → `termos.html`. | [96:1197](https://www.figma.com/design/VyY5Opt634GP6dvy3wFn0H/Veneza?node-id=96-1197) |

> **Não há seção de FAQ nem de depoimentos no Figma.** Se o cliente pedir, viram novas seções e sobem para `[PENDENTE]`.

---

## 7. COMPONENTES JS DESTE PROJETO

### 7.1 Carrossel de empreendimentos (seção `entregues-e-andamento`) — implementado
> **Figma refez a seção em 28/08/2026** (nó `142:1926`) + pedidos do cliente: carrossel **horizontal com overflow**.
> **Dimensões alinhadas ao site de referência (Bolfe — "Section-empreendimentos") em 28/08/2026**,
> a pedido do cliente ("os cards e o tamanho da seção iguais à ref; nada mais altere"):
> | Item | Antes (Figma) | Agora (ref) | Origem na ref |
> |---|---|---|---|
> | `padding-block` da seção | 64 | **100px** | `.framer-rxa3cr` `padding: 100px 20px` |
> | caixa centrada (`--grid-edge`) | 1216 (ref) | **container 1640 + gutter** — o cliente pediu o título e o 1º card **na mesma margem das demais seções** (29/08); a largura da ref (1216) foi revertida | — |
> | título → carrossel | 60 | **60px** (igual) | `.framer-hpimvr` `gap: 60px` |
> | faixa do carrossel (`.__list { height }`) | auto | **664px** (só ≥900; `auto` abaixo) | `.framer-r36okt-container` `height: 664px` |
> | largura do card | 520 | **480px** | `.framer-1i5mxn3-container` `width: 480px` |
> | foto do card | `aspect-ratio: 13/15` (520×600) | **`aspect-ratio: 1`** (480×480) | `.framer-1ainbzh` `height: 480px` (container 480) |
> | gap entre cards | 40 | **40px** (igual) | `.framer-ud2n33` `gap: 40px` |
> **Mantidos (não são "tamanho"): card em 2 peças, raios (foto 40 / info 20), fundo `--color-06`,
> cores, tipografia, dots/setas laranja, barra de paginação própria, comportamento do carrossel.**

- **Estrutura:** `section` → `__inner` (header, `padding-inline: var(--grid-edge)`) → `__list` (viewport, `height: 664px`, `overflow: hidden`) → `__track` (flex, `height: 100%`, todos os cards) → `__card`. `--grid-edge = max(var(--gutter), (100% − var(--container))/2)` — **mesma margem das demais seções** (título e 1º card a `--gutter` da borda). O `__track` tem `padding-left: var(--grid-edge)` e **continua p/ fora à direita** — recortado na borda da tela.
- **Textos do card (ajuste 29/08 — padrão tipográfico):**
  - **nome do empreendimento:** IBM Plex Sans **28 / 600 / `--color-02`** (24 no mobile) — **igual ao título do card do "Passo a passo"** (29/08);
  - **"N Unidades":** Inter **20 / 400** / lh 1.5 / `--color-04` (18 no mobile) — **igual ao texto do card do "Passo a passo"**;
  - **selo de status ("ENTREGUE 100%" …):** **pílula sobreposta no canto superior-DIREITO da FOTO** (`__card-status` `position: absolute; top/right: 16px` dentro de `__card-image` `position: relative`). "Vidro" **transparente igual ao card do hero** — `background: rgba(0,0,0,.1)`, `border: 1px solid rgba(255,255,255,.2)`, `backdrop-filter: blur(5px)` — com **texto branco** (`--color-03`) + `text-shadow` funcional. Inter **18 / 600 / uppercase / +0.01em / lh 1** (16 no mobile). Não fica mais na linha de meta do card de info (que agora só tem nome + "N Unidades"). Cabe dentro da foto mesmo nos textos longos.
- **Movimento:** `translateX` no track, `transition: transform .6s cubic-bezier(.22,1,.36,1)` (~600ms ease-out). **Avança 1 card por passo.** `prefers-reduced-motion` → sem transição.
- **Espaçamentos:** título → cards **60px** (`.__list { margin-top }`); entre cards **40px** (`.__track { gap }`) — ambos batem com a ref.
- **Dots dinâmicos:** gerados no JS, 1 por posição navegável = `round(maxOffset / cardPitch) + 1` (`cardPitch = 480 + 40 = 520`; 5 cards → 3 dots no desktop). São `<button>`; clique navega direto pra posição; `aria-label="Ir para a posição N de M"`. Ativo = segmento alongado `--color-02`.
- **Navegação:** setas prev/next (laranja, `--color-02`; `:disabled` nos extremos), teclado ← → com o viewport focado, e **swipe** (pointer events + `setPointerCapture`).
- **Responsivo:** card 480 (desktop) / 420 (≤900) / `min(400px, 82vw)` (≤768); `.__list { height }` volta a `auto` ≤900. `ResizeObserver` recalcula os dots.
- **Card em 2 peças:** foto (largura toda, `aspect-ratio: 1` = 480×480, `border-radius: 40` = `--radius-xl`, `position: relative` — **selo de status sobreposto no topo**) + **card de info branco separado** (`border-radius: 20`, padding `30 16`), **24px** de respiro. Info-card = **nome (28px) + ícone cinza + "N Unidades" (20px)**; o selo saiu do info-card e virou pílula sobre a foto.
- **Nota:** a seção não tem botão "Ver todos os Empreendimentos" (a ref tem; mantido fora — "nada mais altere").
- **Sem autoplay** (decisão de projeto).
- Navegação: botões circulares `__pagination-prev` / `__pagination-next` (48px, fundo `--color-03`, **seta 24px `--color-02`** — laranja, pedido do cliente; hover `--grayscale-06`, `:disabled` → `opacity .35`) + **indicador de progresso** à direita (5 "dots" `--grayscale-05`; o ativo vira um segmento alongado **`--color-02`**) — layout conforme a **imagem anexa do cliente** (o Figma só tinha os 2 botões com chevron laranja, sem indicador).
- Modelo de posição: o índice (0–4) = `round(scrollLeft / maxScroll * 4)`. `goTo(i)` rola para `i/4 * maxScroll` — assim os 5 pontos ficam todos alcançáveis mesmo no Desktop, onde quase todos os cards já aparecem e o range de scroll é curto. `prev` desabilita em `scrollLeft ≤ 1`, `next` em `scrollLeft ≥ maxScroll − 1`.
- Desktop: rolagem **proporcional suave** (`scroll-behavior: smooth`), sem "encaixe" por card. Mobile (≤768): `scroll-snap-type: x proximity` + `scroll-snap-align: start` (aí cada ponto ≈ 1 card).
- Acessibilidade: `.entregues-e-andamento__list` com `role="region"`, `aria-roledescription="carrossel"`, `aria-label` e `tabindex="0"`; setas ← → quando o trilho tem foco; botões com `aria-label`. `prefers-reduced-motion` → `scroll-behavior: auto` e sem transição nos dots.
- Vanilla JS, sem bibliotecas.

### 7.5 Passo a passo — hover dos cards (só CSS)
- `.passo-a-passo__step-card:hover` → `transform: scale(1.02)` (pedido do cliente), `transition: transform .3s ease`.
- `prefers-reduced-motion: reduce` → sem transform/transição.

### 7.2 Botões "Baixar material completo" — implementado (Investidor e HUB)
- **Raio 8px** (`--radius-xs`, como o "Ghost-button" da ref), `border: 1px solid var(--color-02)`,
  `gap: 16`, `overflow: hidden`. **Cores invertidas no hover** (pedido do cliente):
  - **default:** fundo `--color-02` (laranja) + texto `--color-03` (branco);
  - **hover / active:** fundo `--color-01` (preto) + texto `--color-02` (laranja) — "só inverter".
  - `@media (hover: none)` e touch mantêm o estado default. O botão do `404.html` segue o mesmo.
- O badge **"Vantagens reais"** também passou de pílula para **raio 8px** (`--radius-xs`), "bordas iguais aos botões" — segue laranja sólido com texto branco.
- Aparecem em `investidor-tradicional` e `hub-regional`. Mesmo componente; classes próprias por bloco
  (BEM por bloco) — a micro-interação de hover (rótulo + seta) foi duplicada em
  `hub-regional__button-label` / `hub-regional__button-icon`.
- É uma tag `<a>` estilizada como botão, apontando para `material/veneza-investimento-2026.pdf`
  com `download target="_blank" rel="noopener"`. Sem JS — o atributo `download` força o salvamento do PDF.
- `aria-label` explícito, ex.: `aria-label="Baixar material completo (PDF, 3,2 MB)"`.
- **Micro-interação de hover (ref.: gravação enviada pelo cliente — botão da Bolfe), só CSS:**
  - **rótulo** "rola" verticalmente: o texto sobe e uma cópia idêntica entra por baixo
    (`overflow: hidden` no wrapper `__button-label` + `translateY(-100%)` nos dois `<span>`);
  - **seta** desliza: a seta atual sai pela direita e uma segunda entra pela esquerda
    (`__button-icon` com `overflow: hidden` e dois `<svg>` posicionados, `translateX`);
  - fundo escurece para `--color-02-hover` (já era o estado de hover do spec §2.5);
  - curva `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out, sem bounce), `380ms`;
  - `prefers-reduced-motion: reduce` → sem transição e sem transform (rótulo e seta ficam estáticos);
  - `@media (hover: none)` → sem hover (touch).
  - Estrutura nova (BEM, coerente com o bloco): `__button-label` (2 `<span>`) + `__button-icon` (2 `<svg>`).
    A 2ª cópia do rótulo leva `aria-hidden="true"`; o nome acessível vem do `aria-label` do `<a>`.
  - Custo: a caixa do rótulo usa `height: 1.1em` (uma linha) → o botão fica ~**50px** de altura vs. 48 do Figma (**+2px**, para não cortar as descidas de `p`/`ç`).

### 7.3 WhatsApp (badge do rodapé)
- `<a href="https://wa.me/5511996948833?text=Ol%C3%A1%2C%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20investimentos%20em%20im%C3%B3veis%20na%20planta" target="_blank" rel="noopener">` — sem JS.
- Abre a conversa direto no WhatsApp (app no celular, WhatsApp Web no desktop) já com a mensagem: _"Olá, gostaria de obter mais informações sobre os investimentos em imóveis na planta"_.
- Manter o texto e a codificação exatamente como acima; se editar a mensagem, re-encodar (espaço `%20`, `,` `%2C`, `á` `%C3%A1`, `ç` `%C3%A7`, `õ` `%C3%B5`, `ó` `%C3%B3`).

### 7.4 Contador crescente — hero (`hero__stats`) **e** card do HUB (`hub-regional__card`) — implementado
- Helper único em `script.js` (`setupCounterGroup(gate, els)` + `animateCount` / `renderCount`). Cada número tem `data-count-to`; opcionais `data-count-suffix` e `data-count-decimals`.
- **Hero:** 3 números (`hero__stat-value`) `450+` / `90 mil` / `300+` — gatilho `.hero__stats`.
- **HUB:** "20" no parágrafo (`hub-regional__count`) e "0,778" em "IDH 0,778" (`hub-regional__factor-value`, `data-count-decimals="3"`) — gatilho `.hub-regional__card` (pedido do cliente: "os números do card do HUB devem seguir a mesma forma dos números do hero"). Decimais formatados com **vírgula** (PT-BR); `data-count-to` aceita `.` ou `,`.
- Duração `1800ms`, curva `easeOutCubic` (`1 - (1-t)³`) — sem bounce.
- Dispara **uma única vez** por grupo, quando o gatilho entra no viewport: checagem imediata + `IntersectionObserver` (`threshold: 0.4`) + fallback de `scroll`.
- Anti-deslocamento horizontal: `font-variant-numeric: tabular-nums` no CSS **+** `min-width` medido do texto final (em JS) antes de zerar. Os spans do HUB são `display: inline-block` para o `min-width` valer dentro do parágrafo/título.
- `prefers-reduced-motion: reduce` → não anima; mantém os valores finais que já estão no HTML estático (`450+` / `90 mil` / `300+` / `20` / `0,778`).
- Vanilla JS puro (`requestAnimationFrame`), sem bibliotecas.

### 7.6 HUB regional — parallax do título ligado ao scroll — implementado
- Pedido do cliente: "quando a pessoa escrola nesta sessão o título e o botão se movimentam até a base do card… um movimento sutil na mesma velocidade que a pessoa scrola".
- `.hub-regional__intro-text` (título + botão) recebe `translateY` scrubado pelo scroll (sem transição CSS): `progress = clamp((vh − rectTop) / (alturaSeção + vh), 0, 1)`; `shift = progress × folga`, onde `folga = alturaCard − alturaIntroText` (tops alinhados → a base da coluna alcança a base do card em `progress = 1`).
- Recalculado em `scroll`/`resize` via `requestAnimationFrame` (1 frame por vez, `passive`).
- Só no layout de 2 colunas (`min-width: 1281px`); abaixo disso a intro fica estática (empilha acima do card). `prefers-reduced-motion: reduce` → sem parallax.
- `will-change: transform` em `.hub-regional__intro`.

> **Não usar** os padrões de slider de depoimentos, popup de vídeo e FAQ accordion do template — nenhum
> aparece neste projeto.

---

## 8. PERFORMANCE — REGRAS OBRIGATÓRIAS

```html
<!-- Preload do asset crítico do hero -->
<link rel="preload" href="img/hero-bg.jpg" as="image" fetchpriority="high">

<!-- Preload CSS -->
<link rel="preload" href="style.css" as="style">

<!-- Google Fonts não-bloqueante — IBM Plex Sans (títulos) + Inter (corpo/UI) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"></noscript>
```

- `loading="lazy"` + `decoding="async"` em toda imagem abaixo do fold (fotos dos empreendimentos, fundo do HUB, foto do card Investidor). **Nunca** no hero.
- `width` e `height` explícitos em todas as imagens (evita CLS) — usar as dimensões da seção 4.
- Fundos em foto (`hero`, `hub-regional`): preferir `<img>` posicionada + overlay, não `background-image`, para permitir `preload`/`lazy`.
- Nenhum recurso bloqueante no `<head>` além de `style.css`.
- Scripts (`script.js`) no final do `<body>`.

---

## 9. SEO / META
> 📄 Meta title/description já em `dados.md` (copiadas do Figma, frame **SEO / Meta Share** `94:326`).
> Página única.

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Imóveis a preço de custo em Ourinhos/SP | Invista direto na obra</title>
<meta name="description" content="Invista em imóveis na planta em Ourinhos/SP pelo modelo a preço de custo, com fluxo de caixa aberto, obra auditada e sem pagar a margem da incorporadora.">
<link rel="canonical" href="[URL de produção — PENDENTE]">
<link rel="icon" href="img/favicon.png">

<!-- Open Graph -->
<meta property="og:title" content="Imóveis a preço de custo em Ourinhos/SP | Invista direto na obra">
<meta property="og:description" content="Invista em imóveis na planta em Ourinhos/SP pelo modelo a preço de custo, com fluxo de caixa aberto, obra auditada e sem pagar a margem da incorporadora.">
<meta property="og:image" content="[URL de produção — PENDENTE]/img/cover.jpg">
<meta property="og:url" content="[URL de produção — PENDENTE]">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
```

---

## 10. ACESSIBILIDADE — MÍNIMO OBRIGATÓRIO

- HTML semântico: `<header>` (topo do hero), `<main>`, `<section>` por bloco, `<footer>`.
- Um único `<h1>` — o título do hero. Títulos das demais seções são `<h2>`; "Economia Real", "IDH 0,778", nome dos empreendimentos e títulos de passo são `<h3>`.
- `alt` descritivo nas fotos de conteúdo (empreendimentos, obra); `alt=""` em texturas/fundos decorativos.
- Foco visível em todos os interativos (botões de download, paginação, badge de WhatsApp, links de rodapé) — não remover outline sem substituir.
- Carrossel navegável por teclado (seção 7.1).
- Contraste — regras firmes:
  - Texto branco sobre foto (hero, HUB): overlay escuro (`--color-01` a ~45–55%) suficiente para AA 4.5:1 no ponto mais claro da imagem.
  - **`--color-02` (`#FF8D28`) sobre branco ≈ 2.3:1 — reprova AA.** Permitido só como AA para "texto grande" (≥24px bold / ≥18.66px), que é exatamente o caso de: nome do empreendimento (24px 600) e título de fator quando sobre branco. **Proibido** em: label de status (12px), "N Unidades" (16px) e qualquer corpo — nesses, usar `--color-04`/`--color-01`. A pílula de status usa `--color-05` de fundo → o texto laranja 12px nela também reprova; trocar o texto para `--color-01` **ou** aprovar exceção com o designer.
  - `--color-02` sobre `--color-01` (laranja no escuro) ≈ 8:1 — OK para qualquer tamanho (é o caso dos botões e do badge no card escuro).
- `prefers-reduced-motion` respeitado no deslize do carrossel e em qualquer parallax.

---

## 11. CONTEÚDO
> Copy transcrita da aba ⟶ Dev (Desktop). Não reescrever, não resumir. Onde o `dados.md` trouxer
> versão diferente, o `dados.md` vence. Onde faltar em ambos → `[COPY PENDENTE]`.

### Seção 1 — Hero
- **Marca (topo):** Veneza Incorporadora e Construtora
- **Eyebrow:** EM OURINHOS DESDE 2009
- **H1:** Invista em imóveis na planta em Ourinhos/SP sem pagar a margem da incorporadora
- **Parágrafo:** No modelo a preço de custo, você financia a obra diretamente e fica com o lucro que normalmente vai para a incorporadora, com fluxo de caixa aberto e auditado.
- **Estatísticas:**
  | Número | Legenda |
  |---|---|
  | 450+ | Cotas Comercializadas |
  | 90 mil | M² construídos |
  | 300+ | Investidores |
- **CTA:** nenhum botão no hero (apenas no Investidor e no HUB).

### Seção 2 — Investidor Tradicional
- **Título:** O investidor tradicional financia o lucro de outra pessoa
- **Parágrafo:** Comprar na planta a preço de tabela significa pagar, dentro do valor do imóvel, a margem de lucro da incorporadora. Fundos imobiliários e renda fixa entregam retorno previsível, mas limitado. Falta transparência sobre o que realmente acontece com o dinheiro investido durante a obra.
- **Badge:** Vantagens reais
- **Título do card:** Investimento a Preço de Custo:
- **Benefícios:**
  1. **Economia Real** — Imóvel adquirido por valor abaixo do preço final de mercado, sem a margem de lucro de uma incorporadora tradicional.
  2. **Transparência** — Fluxo de caixa e custos da obra abertos e auditados pela empresa e comissão de investidores.
  3. **Potencial de Valorização** — Histórico de valorização patrimonial ao longo da obra, com dados de empreendimentos já entregues disponíveis no material completo.
- **Botão:** Baixar material completo

### Seção 3 — Passo a passo
- **Subtítulo (grande):** Passo a passo
- **Linha de apoio:** É um processo de apenas 5 etapas
- **Etapas:**
  1. **Aquisição do Terreno** — Compra do local onde o empreendimento será erguido.
  2. **Formação do Grupo** — Investidores se unem para cotizar o projeto
  3. **Aprovação e Projetos** — Validação da planta e das licenças legais.
  4. **Aportes** — Parcelas mensais e balões anuais cobrem o custo real da obra.
  5. **Entrega das Chaves** — Divisão das unidades e realização do lucro.
  > Descrições encurtadas (29/08) p/ ficarem em 1–2 linhas em qualquer largura de card.

### Seção 4 — Empreendimentos entregues e em andamento
- **Título:** Empreendimentos entregues e em andamento
- **Cards:**
  | Nome | Unidades | Status |
  |---|---|---|
  | Edifício Toscana | 40 Unidades | ENTREGUE 100% |
  | Edifício Villa Di Capri | 128 Unidades | ENTREGUE 100% |
  | Edifício Florença | 80 Unidades | ENTREGUE 100% |
  | Edifício Monte Carlo | 80 Unidades | EM ACABAMENTO 90% |
  | Edifício Veneza | 72 Unidades | INÍCIO LAGE 1 20% |

### Seção 5 — HUB regional
- **Título:** O HUB regional que sustenta a tese de investimento ("HUB" sempre em caixa-alta no texto visível — pedido do cliente 2026-08-29)
- **Botão:** Baixar material completo
- **Parágrafo do card:** Ourinhos consolida-se como uma das cidades mais promissoras do interior paulista, com influência sobre mais de 20 municípios vizinhos.
- **Fatores:**
  1. **IDH 0,778** — qualidade de vida que atrai novas famílias e profissionais qualificados
  2. **Crescimento habitacional acelerado** — verticalização incipiente, curva demográfica em ascensão
  3. **Polo educacional** — UNESP, FATEC, Estácio e outras, atraindo milhares de jovens que movimentam locação e comércio

### Seção 6 — Rodapé  (Figma `96:1197` — revisado 2026-08-29)
Fundo `#101010`. Grade 2 col × 2 linhas: contato (col 1 / linha 1), marca + "Voltar ao topo" (col 2 / linha 1), linha legal (col 1 / linha 2). ≤ 900px vira 1 coluna centralizada.
- **Linha 1 do contato:** Veneza | Cotas de Investimento e Rentabilidade  (Inter 500 / 20)
- **Rótulo:** CONTATO  (Inter 500 / 20)
- **WhatsApp (badge):** (11) 99694-8833  → `https://wa.me/5511996948833?text=…` (abre direto no WhatsApp com a mensagem _"Olá, gostaria de obter mais informações sobre os investimentos em imóveis na planta"_)
- **Marca:** `img/footer__logo.svg` — `width: min(300px, 100%)` (aumentado de 200 a pedido do cliente 2026-08-29). A arte já traz "V" + assinatura — não há texto separado, igual ao Figma.
- **Voltar ao topo:** `<button class="footer__top">` "VOLTAR AO TOPO" + seta-p/-cima — mesma pílula do badge de WhatsApp; JS (`script.js`) faz `window.scrollTo({top:0})` respeitando `prefers-reduced-motion`.
- **Mobile:** CTA ("Baixar material completo"), badge de WhatsApp e "Voltar ao topo" **mantêm o tamanho do desktop** — largura intrínseca (não esticam 100%) e fonte travada em 18/16 (não caem p/ `--fs-text-2` mobile). Pedido do cliente 2026-08-29.
- **Linha legal:** Veneza Incorporadora e Construtora 2026 – Todos os direitos reservados.
- **Links legais:** "Política de Privacidade" · "Termos de Uso" — ambos → `termos.html` (só existe uma página jurídica; ver §12 pendências).

### FAQ
Não há FAQ neste projeto (nem no Figma, nem no `dados.md`). Se for solicitada → `[PENDENTE — pedir perguntas e respostas ao cliente]`.

---

## 12. NOTAS FINAIS

- Nenhum placeholder de imagem — usar assets reais da seção 4 (várias ainda `[PENDENTE]`).
- Nenhum link `#` solto — usar links reais da seção 5.
- Nenhum dado inventado — número, e-mail, URL e FAQ saem do `dados.md` ou viram `[PENDENTE]`.
- CSS em `style.css` separado, nunca inline. Sem `!important`. Scripts no final do `<body>`.
- Nenhuma cor, fonte, espaçamento ou radius fora dos tokens da seção 2. Tipografia: **IBM Plex Sans — família única** (decisão do cliente); hierarquia por peso/tamanho, que continuam do Figma.
- Botões "Baixar material completo" → `material/veneza-investimento-2026.pdf` com `download`. WhatsApp → `https://wa.me/5511996948833?text=…` (mensagem pré-preenchida definida).
- Rodapé `96:516` ("Homestead", telefone/e-mail dos EUA, fora do artboard) **não** vai para produção.
- Qualidade acima de velocidade — não simplificar elementos para terminar antes.

### Lista consolidada de PENDÊNCIAS

#### ✅ Resolvidas (28/08/2026)

| # | Item | Resolução |
|---|---|---|
| 5 | Decisão de fonte | **IBM Plex Sans (títulos) + Inter (corpo/UI)** + **escala do site de referência (Bolfe)** aplicada a todo o site (3ª revisão 28/08/2026; antes: família única IBM Plex; antes disso Space Grotesk + Geist). Títulos de seção 64→48px; pesos hero 700 / demais títulos 600 / corpo 400 / UI 500 / selos 600. Google Fonts: IBM Plex Sans 400/600/700 + Inter 400/500/600. Seções 2.2 / 8. |
| 10 | Destino dos botões "Baixar material completo" | Baixam `material/veneza-investimento-2026.pdf` (mesmo arquivo nos dois). PDF já no projeto. Seções 5 / 7.2. |
| 11 | WhatsApp completo | Número `(11) 99694-8833` + mensagem pré-preenchida _"Olá, gostaria de obter mais informações sobre os investimentos em imóveis na planta"_ → `https://wa.me/5511996948833?text=…` (encoded). Abre direto no app. Seções 5 / 7.3. |
| 13 | Página de Política/Termos | Usa `termos.html` (já existe). Link discreto no rodapé + back-link para `index.html`. **Tipografia/cores das 3 páginas auxiliares alinhadas ao design system (IBM Plex Sans + Inter, `--color-*`)** — 28/08/2026. Seção 5. |
| 14 | Estados do `Button` / paginação / badges | Regras definidas na seção 2.5 (hover = `--color-02-hover` escurecido, focus-visible 2px, disabled `.5`/`.35`) + padding responsivo do componente da biblioteca. |
| 16 | Frame `Mobile` (`96:833`) | Documentado na seção 3.1: Investidor, Passo a passo, Entregues e Rodapé são deriváveis; **Hero e HUB regional mobile não estão finalizados** (vira pendência 16b). |
| 17 | Autoplay do carrossel | **Não** terá autoplay (seção 7.1). |
| 18 | Implementação Desktop — HUB regional + footer | Feitas (28/08/2026). Footer: `<footer>` fora do `<main>`, contato + badge WhatsApp + marca "V" + linha legal + link "Política de Privacidade" → `termos.html`. HUB **revisado pelo dev link** (`get_design_context` de `96:636`): estrutura `intro`/`intro-text`/`card-content`/`factors*`; `w-608`/`w-693`/`w-495`/`w-419`; `p-80` no card; gaps `32`/`40`/`32`/`16`; **ícone do fator `#050505`** (era laranja); divisor `#E6E6E6`; padding da seção `px-138 py-128`. Mantidos (pedidos de turnos anteriores, não estão no Figma): overlay leve p/ contraste, micro-interação de hover do botão, contador dos números (§7.4), parallax do `intro-text` (§7.6). Fonte: IBM Plex Sans (o comp usa SF Pro) — "Crescimento habitacional acelerado" precisou de `factor-text` `max-width: 493` (vs `419` do Figma) p/ caber em 1 linha. |

#### ⛔ Bloqueadas — dependem de material do cliente (não dá para inventar)

| # | Pendência | Onde |
|---|---|---|
| 1 | **`dados.md`** — pré-preenchido com o que já se sabe; faltam: URL de produção, e-mail, redes sociais, razão social/CNPJ, endereço | raiz do projeto |
| 2 | **URL de produção** — para `canonical`, `og:url`, `og:image` | seções 1, 9 |
| 3 | **`img/cover.jpg`** (OG 1200×630) — sem arte no Figma; receita proposta na seção 4, falta aprovar | seção 4 |
| 4 | **`img/favicon.png`** + `favicon.ico` + `apple-touch-icon` — gerar a partir da marca "V"; receita na seção 4 | seção 4 |
| 6 | **Logo da Veneza em SVG** (topo do hero e rodapé) — hoje só raster | seção 4 |
| 7 | **Fotos reais dos 5 empreendimentos** — as do Figma são placeholders | seção 4 |
| 8 | **Foto de fundo do hero** e **aérea do HUB** em alta resolução final (os `.png` em `img/` são exports de comp, validar se são as definitivas) | seção 4 |
| 9 | **Foto do card "Investimento a Preço de Custo"** — placeholder no Figma | seção 4 |
| 12 | **E-mail e redes sociais** | seção 5 |
| 15 | **Contraste do laranja `#FF8D28`** — regra já definida na seção 10 (só ≥24px bold sobre branco); confirmar com o designer se aceita ou se ajusta o tom | seção 10 |
| 16b | **Layout mobile do Hero e do HUB regional** — frames não finalizados no Figma | seção 3.1 |
