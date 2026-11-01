# UI design system & developer handoff

**Product:** XXXX fine jewelry website  
**Purpose:** Single source of truth for visual language, tokens, components, and implementation.  
**Code sources of truth:** `styles/globals.css`, `app/layout.jsx`, `components/ui/*`, `components/layout/*`.

---

## How to use this doc

| Audience | Use |
|----------|-----|
| **Design (Figma)** | Sections 1–7 → variables, text styles, components |
| **Engineering** | Sections 1–6 + §8 → map 1:1 to Tailwind classes and shared React components |
| **QA** | §4 states + §6 breakpoints for visual regression |

When design and code disagree, **code listed here reflects what ships today**. Flag deltas in Figma descriptions.

---

## 1. Color palette

### 1.1 Semantic brand colors

| Semantic name | HEX | RGB | Role |
|---------------|-----|-----|------|
| **Ivory** | `#F7F5F0` | 247, 245, 240 | Page canvas, light fills, text on dark buttons |
| **Charcoal** | `#20201E` | 32, 32, 30 | Primary text, primary actions, focus outline |
| **Taupe** | `#A69A89` | 166, 154, 137 | Eyebrows, spec labels, breadcrumb separators |
| **Champagne** | `#C5B08B` | 197, 176, 139 | Accent: selection, quotes, warm hero labels |
| **Ash** | `#777570` | 119, 117, 112 | Secondary copy, placeholders, de-emphasis |
| **White** | `#FFFFFF` | 255, 255, 255 | Elevated surfaces (cards, modals, tables) |

**Tailwind / CSS token:** `--color-{name}` in `@theme` → classes `bg-ivory`, `text-charcoal`, etc.

### 1.2 Derived & opacity tokens

Use **charcoal at opacity** for hairlines and depth (not separate hex values):

| Token name | Implementation | Typical use |
|------------|----------------|-------------|
| **Border subtle** | `border-charcoal/8`–`/10` | Dividers, table rows |
| **Border default** | `border-charcoal/12`–`/15` | Cards, panels |
| **Border strong** | `border-charcoal/18`–`/25` | Inputs, secondary buttons |
| **Border hover** | `border-charcoal/40` | Button secondary hover |
| **Fill muted** | `bg-charcoal/5` | Image placeholders |
| **Overlay scrim** | `bg-charcoal/40` | Search backdrop |
| **Nav glass** | `bg-ivory/90` + `backdrop-blur-md` | Scrolled header |
| **Sticky bar** | `bg-ivory/95` + `backdrop-blur-md` | Mobile PDP CTA |
| **Text primary muted** | `text-charcoal/80`–`/90` | Body, spec values |
| **Text on dark muted** | `text-ivory/70` | Hero eyebrow |

### 1.3 Functional colors

| Semantic | Value | Use |
|----------|-------|-----|
| **Focus ring** | `1px solid #20201E`, offset `3px` | Global `:focus-visible` |
| **Text selection** | BG `#C5B08B`, text `#20201E` | `::selection` |
| **Error / alert text** | `text-charcoal` (not red) | Form errors — quiet, on-brand |
| **Disabled** | `opacity-40`, `pointer-events-none` | Buttons, sending forms |

### 1.4 Product-only (metal swatches)

Not site-wide brand colors — UI for gold-tone picker only (`ProductSummary.jsx`):

| Name | HEX |
|------|-----|
| White Gold | `#E4E2DC` |
| Yellow Gold | `#C6A15B` |
| Rose Gold | `#C4897A` |
| Fallback | `#D8D4CC` |

### 1.5 Legacy / one-offs (consolidate over time)

| HEX | Where | Recommendation |
|-----|--------|----------------|
| `#F7F5F1` | Spec callouts, article takeaways | Treat as **Ivory tint** or merge to `#F7F5F0` |
| `#F3F3F3` | Product card image well | **Image placeholder gray** — optional token `surface/image` |

---

## 2. Typography

### 2.1 Font families

| Role | Family | Weights | Styles | CSS variable | Tailwind |
|------|--------|---------|--------|--------------|----------|
| **Display / editorial** | Cormorant Garamond | 400, 500, 600 | normal, italic | `--font-cormorant` | `font-serif` |
| **UI / body** | DM Sans | 400, 500, 600 | normal | `--font-dm` | `font-sans` (default on `body`) |

**Loading:** `next/font/google` in `app/layout.jsx` — `latin`, `display: swap`.

**Fallback stacks:**

- Serif: `var(--font-cormorant), 'Times New Roman', serif`
- Sans: `var(--font-dm), ui-sans-serif, system-ui, sans-serif`

**Body default:** DM Sans 400, `#20201E`, `antialiased`, `text-rendering: optimizeLegibility`.

### 2.2 Type scale (named utilities)

Defined in `styles/globals.css`. Prefer these over ad-hoc sizes for new work.

| Style name | Font | Weight | Size | Line height | Letter spacing | Color |
|------------|------|--------|------|-------------|----------------|-------|
| **type-display** | Serif | 400 | clamp(2.6rem → 4.75rem) | 1.02 | −0.02em | inherit |
| **type-headline** | Serif | 400 | clamp(2.1rem → 3.5rem) | 1.08 | −0.02em | inherit |
| **type-title** | Serif | 500 | clamp(1.7rem → 2.45rem) | 1.1 | — | inherit |
| **eyebrow** | Sans | 500 | 0.68rem (~11px) | — | 0.28em, uppercase | Taupe |

### 2.3 Component type styles (Figma text styles)

| Style name | Spec | Usage |
|------------|------|--------|
| **Nav wordmark** | Serif, uppercase, tracking 0.42em, 1.15rem → 1.35rem sm+ | Header logo |
| **Nav link** | Sans 11px, medium implied, tracking 0.16em, uppercase | Desktop nav |
| **Breadcrumb** | Sans 11px, tracking 0.16em, uppercase, Ash → Charcoal hover | Wayfinding |
| **Button label** | Sans 11px, medium 500, tracking 0.18em (0.22em link variant), uppercase | All `Button` |
| **Field label** | Sans 11px, tracking 0.18em, uppercase, Ash | Forms |
| **Spec label (dt)** | Sans 11px, tracking 0.16–0.18em, uppercase, Taupe | Product specs |
| **Micro table header** | Sans 10px, tracking 0.14em, uppercase, Ash | Spec tables |
| **Product card category** | Sans 10px, tracking 0.22em, uppercase, Taupe | Catalog |
| **Product card title** | Serif 1.05rem → 1.2rem md, normal, tight | Catalog |
| **Product name (PDP)** | Serif 2rem → 2.35rem md, leading none | Product page |
| **Product summary** | Serif lg, italic, charcoal/80 | PDP lead line |
| **Article body** | Sans 17px, leading 8 (32px), charcoal/90 | Longform |
| **Article H2** | Serif 1.65rem → 1.8rem md, medium | Article sections |
| **FAQ question** | Serif 1.55rem, medium, snug | Accordion |
| **Hero H1 (home)** | Serif 2.5rem → 3.1rem md, leading 1.1, Ivory | Home hero |
| **Hero eyebrow (dark)** | Sans 10px, tracking 0.28em, uppercase, ivory/70 | On photography |
| **Footer wordmark** | Serif 2xl, tracking 0.28em → 0.32em md, uppercase | Footer |

### 2.4 Hierarchy rules

1. **One display level per view** — `type-display` OR custom hero H1, not both competing.
2. **Page title** — `type-headline` (shop, contact, articles, size guide, collections).
3. **Section blocks** — `SectionHeading`: `eyebrow` + `type-headline`.
4. **Serif** — titles, product names, quotes, mobile menu links.
5. **Sans** — everything else, including uppercase micro-labels.

---

## 3. Spacing, grid, layout

### 3.1 Breakpoints (Tailwind defaults)

| Token | Min width | Project usage |
|-------|-----------|---------------|
| **default** | 0 | Mobile-first; 2-col product grids |
| **sm** | 640px | 2-col forms, footer columns, filter layout |
| **md** | 768px | Container padding ↑, 2–3 col editorial, category 4-col |
| **lg** | 1024px | Desktop nav, 4-col shop, PDP sticky bar hidden, 12-col footer |
| **xl** | 1280px | Wider nav link gap |
| **2xl** | 1536px | Rare; container still caps at 90rem |

**Device handoff shorthand:**

| Device | Range | Layout notes |
|--------|-------|--------------|
| **Mobile** | &lt; 640px | Hamburger nav, 2-col product grid, bottom PDP bar |
| **Tablet** | 640–1023px | More padding; mixed 2–3 columns |
| **Desktop** | ≥ 1024px | Full nav, 4-col catalog, side-by-side editorial |

### 3.2 Container

| Property | Value | Tailwind |
|----------|-------|----------|
| Max width | **90rem (1440px)** | `max-w-[90rem]` |
| Horizontal padding | 20px → 40px md → 56px lg | `px-5 md:px-10 lg:px-14` |
| Alignment | Center | `mx-auto w-full` |

**Component:** `components/ui/Container.jsx`

### 3.3 Spacing scale (in use)

Project uses Tailwind spacing (1 unit = **4px**). Common steps:

| Token | px | Examples |
|-------|-----|----------|
| 1 | 4 | Tight gaps (`gap-1`) |
| 2 | 8 | Icon gaps |
| 3 | 12 | Grid gaps mobile |
| 4 | 16 | Section inner |
| 5 | 20 | Card padding, `pt-5` |
| 6 | 24 | Form `space-y-6` |
| 7 | 28 | Form field stacks |
| 8 | 32 | Section gaps |
| 10 | 40 | Major section `pt-10`, `gap-10` |
| 12 | 48 | Article grids |
| 14 | 56 | Large vertical rhythm `lg:py-14` |

**Vertical section rhythm:** often `mt-8` / `mt-10` / `border-t border-charcoal/10 pt-10` between blocks.

### 3.4 Grid patterns

| Pattern | Columns | Gap | Use |
|---------|---------|-----|-----|
| **Product grid** | 2 → lg:4 | `gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5` | Shop (`ProductGrid`) |
| **Category showcase** | 2 → md:4 | `gap-2` / `md:gap-2.5` | Home collections |
| **Article grid** | 1 → md:2 → lg:3 | `gap-12` | Articles index |
| **Home journal** | 1 → md:3 | `gap-8 md:gap-5` | Home |
| **Footer** | 2 → sm:3 → lg:12 | `gap-x-6 gap-y-8 lg:gap-10` | Site footer |
| **Spec dl** | Fixed label **7.5rem** + 1fr | `gap-4`, `py-3`–`py-4` | PDP specs |
| **Contact topic chips** | 2 → lg:4 | `gap-1.5 sm:gap-2` | Contact |

### 3.5 Fixed chrome dimensions

| Element | Size |
|---------|------|
| **Header height** | 4.5rem (72px) |
| **Main offset (non-home)** | `pt-[4.5rem]` under fixed header |
| **Min tap target** | 44px — `min-h-11`, icon buttons `h-11 w-11` |
| **Home hero** | `85svh`, min-height 26rem |

---

## 4. Component library

Implement via **`components/ui/Button.jsx`** and patterns below. Corners are **mostly square**; softness comes from photography and occasional `rounded-lg` on media.

### 4.1 Buttons (`Button`)

**Anatomy:** min-height 44px, horizontal padding 24px (`px-6 py-3`), label 11px uppercase.

| Variant | Default | Hover | Disabled |
|---------|---------|-------|----------|
| **primary** | bg charcoal, text ivory | bg charcoal/85 | opacity 40, no pointer |
| **secondary** | border charcoal/25, transparent | border charcoal | same |
| **light** | bg ivory, text charcoal | bg white | same |
| **ghost** | border ivory/40, text ivory | border ivory | same |
| **link** | border-b charcoal/30 | border charcoal | same |
| **linkLight** | border-b ivory/50 | border ivory | same |

**Focus:** global `:focus-visible` outline (no custom ring on button).  
**Transition:** `transition-colors duration-300`.  
**Active:** not styled separately — rely on hover/darken.

### 4.2 Text links

- **Inline uppercase:** 11px, tracking 0.16em, ash → charcoal hover (e.g. “Browse shop”).
- **Editorial:** underline-offset-4, hover underline (`ProductSpecifications`, articles).

### 4.3 Form inputs (`ContactForm` pattern)

**Text field / textarea / select (`inputClass`):**

| State | Style |
|-------|--------|
| **Default** | Transparent bg, bottom border `charcoal/18`, py-12px, text 15px |
| **Placeholder** | ash/50 |
| **Focus** | border-bottom charcoal (full opacity) |
| **Error** | Message below: xs charcoal; `aria-invalid` on field |
| **Disabled / sending** | Form wrapper `opacity-60`, `pointer-events-none` |

**Labels:** 11px, tracking 0.18em, uppercase, ash.

**Checkbox:** native `h-4 w-4 accent-charcoal` when used for boolean options (e.g. filters).

**Ring size select (PDP):** bordered box `border-charcoal/20`, min-h-11, text sm.

### 4.4 Cards & surfaces

| Component | Surface | Border | Padding |
|-----------|---------|--------|---------|
| **Contact form card** | white | charcoal/12 | p-5 → p-9 md |
| **Article takeaways** | #f7f5f1 tint | charcoal/12 | p-5 sm:p-6 |
| **Product spec block** | white | charcoal/12 | p-5 sm:p-6 |
| **Search result panel** | white | charcoal/10 | p-5 |
| **Toast success** | white | charcoal/12 + shadow | px-4 py-3.5 |

**Product card:** image well `#f3f3f3`, **rounded-lg**, aspect-square; text below `pt-5`.

### 4.5 Navigation

| Piece | Behavior |
|-------|----------|
| **Header** | Fixed top; home transparent → solid after 12px scroll or menu open |
| **Solid header** | ivory/90, blur, border-b charcoal/10, charcoal text |
| **Desktop nav** | lg+; link hover opacity 60%; active = 1px underline offset below |
| **Icon buttons** | 44×44; search, bag (badge 10px count), menu (&lt; lg) |
| **Mobile menu** | Full-screen ivory; serif large links; collections 2-col small caps |
| **Skip link** | sr-only until focus; ivory bg, z-80 |
| **Breadcrumb** | See §2.3 |

**Search overlay:** z-70, scrim charcoal/40; panel ivory; ⌘K shortcut.

### 4.6 FAQ accordion (`FaqList`)

| State | Style |
|-------|--------|
| **Collapsed** | Serif question + “+” ash |
| **Expanded** | “–”; answer 15px relaxed ash, max-w-2xl |
| **Divider** | border-t/b charcoal/10; py-5 on trigger |

### 4.7 Filter / chip controls (`ArticlesExperience`, shop filters)

- **Selected:** bg charcoal, text ivory, border charcoal  
- **Default:** bg ivory, border charcoal/15, hover border/35  
- Min height 40px (`min-h-10`), 11px uppercase label

### 4.8 Product-specific

- **Metal swatch:** 14px circle, border charcoal/20; selected `ring-1 ring-charcoal ring-offset-2`
- **Ring size grid:** 6–7 columns, 1px gap via charcoal/10 grid trick; selected cell charcoal bg + ivory text
- **Mobile PDP bar:** fixed bottom, border-t, ivory/95 blur, primary CTA charcoal

---

## 5. Radius, borders, shadows, icons, images

### 5.1 Border radius

| Token | Value | Use |
|-------|-------|-----|
| **none / square** | 0 | Buttons, most UI chrome |
| **sm** | `rounded-sm` | Legacy starter components |
| **md** | `rounded-md` | Editorial inline images (Why page) |
| **lg** | `rounded-lg` | Product tiles, category blocks |
| **full** | `rounded-full` | Swatches, carousel controls, spinner, kbd chips |

**Design intent:** jewelry UI reads **architectural and flat**; roundness is for **media and small controls**, not primary buttons.

### 5.2 Borders

- **Weight:** almost always **1px**
- **Style:** solid; hairlines via low charcoal opacity
- **Underline links:** border-b on text links instead of box borders

### 5.3 Shadows (elevation)

No global shadow tokens — use these recurring values:

| Name | CSS | Use |
|------|-----|-----|
| **shadow-card-soft** | `0 16px 48px rgba(32,32,30,0.12)` | Toast |
| **shadow-modal** | `0 24px 80px rgba(32,32,30,0.08)` | Sending overlay |
| **shadow-float** | `0 8px 24px rgba(32,32,30,0.12)` | Product carousel arrows |
| **shadow-map** | `0 20px 60px rgba(32,32,30,0.28)` | Series banner tooltip |
| **shadow-sticky-header** | `0 1px 0 rgba(32,32,30,0.08)` | Sticky table head (size guide) |
| **Thumb shadow** | `0 1px 2px rgb(32 32 30 / 12%)` | Range slider (dual-range) |

### 5.4 Iconography

**Source:** inline SVG in `components/ui/Icons.jsx` (Search, Bag, Menu, Close).

| Property | Value |
|----------|--------|
| Default size | 20×20 (`h-5 w-5`) |
| Stroke | currentColor |
| Stroke width | 1.25 |
| Fill | none |
| Chevrons (product card) | 16×16, stroke 1.25 |

**Rule:** icons inherit text color; no filled icon set.

### 5.5 Image treatment

| Context | Treatment |
|---------|-----------|
| **Hero / campaign** | `object-cover`, gradient overlay charcoal/50→transparent |
| **Product grid** | Square aspect, cover; hover scale **1.12** over 700ms (respect `motion-reduce`) |
| **HoverImage** | Same zoom pattern for single-image cards |
| **Editorial** | Mixed aspect ratios: 4/5, 16/10, 21/9, 4/3 |
| **Placeholder** | `#f3f3f3` or `bg-charcoal/5` while loading |

**Next/Image:** always set appropriate `sizes` (e.g. `(min-width: 1024px) 25vw, 50vw` on catalog).

---

## 6. Responsive rules

### 6.1 Global

- **Mobile-first:** default styles = smallest viewport.
- **No horizontal scroll:** `body` `overflow-x-clip`.
- **Reduced motion:** use `motion-reduce:` variants; Framer checks `useReducedMotion`.
- **Safe areas:** mobile PDP bar uses `env(safe-area-inset-bottom)`.

### 6.2 Navigation

| Viewport | Behavior |
|----------|----------|
| &lt; lg | Hamburger; primary links in drawer |
| ≥ lg | Inline nav; hamburger hidden |
| Home top | Transparent header, ivory text until scroll |

### 6.3 Commerce

| Viewport | Behavior |
|----------|----------|
| All | 2-column product grid minimum |
| lg+ | 4-column shop grid |
| &lt; lg | PDP fixed “Choose a size” / inquire bar |
| lg+ | Inline inquire actions; no bottom bar |

### 6.4 Typography responsive

- Display/headline/title use **fluid clamp** — no manual breakpoint jumps required.
- Product and card titles bump one step at `md` where noted in §2.3.

### 6.5 Motion

| Token | Value |
|-------|--------|
| **ease-out editorial** | cubic-bezier(0.22, 1, 0.36, 1) — `lib/motion.js` |
| **UI transition** | 300ms colors |
| **Image hover** | 500–700ms transform |
| **Overlay fade** | 350ms |

---

## 7. Figma: tokens & components

### 7.1 Variable collections (recommended)

**Collection: Color / Light**

| Variable | Value |
|----------|-------|
| `color/bg/canvas` | #F7F5F0 |
| `color/bg/elevated` | #FFFFFF |
| `color/bg/inverse` | #20201E |
| `color/text/primary` | #20201E |
| `color/text/secondary` | #777570 |
| `color/text/label` | #A69A89 |
| `color/text/inverse` | #F7F5F0 |
| `color/accent/champagne` | #C5B08B |
| `color/border/subtle` | #20201E @ 10% |
| `color/border/default` | #20201E @ 12% |
| `color/scrim` | #20201E @ 40% |

**Collection: Typography**

Map each row in §2.2 and §2.3 as a **Text style** named `Type/Display`, `Type/Headline`, `Type/Eyebrow`, `Type/Button`, etc.

**Collection: Spacing**

Use 4px base: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 72 (header).

**Collection: Layout**

- `layout/max-width`: 1440  
- `layout/padding/mobile`: 20  
- `layout/padding/tablet`: 40  
- `layout/padding/desktop`: 56  

### 7.2 Figma components to maintain

| Component | Variants |
|-----------|----------|
| Button | primary, secondary, light, ghost, link × default/hover/disabled |
| Input | default, focus, error |
| Product card | single image, multi image |
| Nav bar | transparent, solid |
| Mobile menu | — |
| Breadcrumb | — |
| FAQ row | open / closed |
| Spec row | label + value |

Attach **dev notes** linking to React file paths in §8.

---

## 8. Developer handoff

### 8.1 Implementation checklist

- [ ] Colors only from `@theme` in `globals.css` — avoid new random hex except documented one-offs.
- [ ] Page layout wrapped in `<Container>` unless full-bleed hero/media.
- [ ] Headings use `type-*` or patterns in §2.3 — don’t introduce a third font.
- [ ] Actions use `<Button>` variants — don’t restyle one-off CTAs.
- [ ] Forms follow `ContactForm` field + `inputClass` pattern.
- [ ] Focus states must remain visible — don’t remove `:focus-visible` overrides.
- [ ] Interactive targets ≥ 44px height on touch routes.
- [ ] Images: Next/Image + `sizes`; product hover respects `prefers-reduced-motion`.

### 8.2 File map

| Concern | Path |
|---------|------|
| Color + type utilities | `styles/globals.css` |
| Fonts | `app/layout.jsx` |
| Container | `components/ui/Container.jsx` |
| Button | `components/ui/Button.jsx` |
| Section titles | `components/ui/SectionHeading.jsx` |
| Breadcrumb | `components/ui/Breadcrumb.jsx` |
| FAQ | `components/ui/FaqList.jsx` |
| Icons | `components/ui/Icons.jsx` |
| Header / overlays | `components/layout/Navbar.jsx`, `MobileMenu.jsx`, `SearchDialog.jsx` |
| Main offset | `components/layout/MainShell.jsx` |
| Contact form | `components/contact/ContactForm.jsx` |
| Product card / grid | `components/products/ProductCard.jsx`, `ProductGrid.jsx` |
| Motion easing | `lib/motion.js` |

### 8.3 Tailwind quick reference

```jsx
// Page shell
<Container className="mt-10">…</Container>

// Section header
<p className="eyebrow mb-4">Label</p>
<h2 className="type-headline">Title</h2>

// Primary CTA
<Button href="/shop">Explore the collection</Button>

// Divider section
<section className="border-t border-charcoal/10 pt-10">…</section>
```

### 8.4 Adding new pages

1. Pick **page title** level (`type-headline` typical).  
2. Use **eyebrow + headline** or `SectionHeading` for blocks.  
3. Keep **ivory canvas**; use **white cards** for dense content (forms, specs).  
4. Match **grid** to closest pattern in §3.4.  
5. Run keyboard pass: skip link, focus order, dialog escape (copy `useOverlay` patterns).

### 8.5 Brand export one-pager

**Colors:** Ivory · Charcoal · Taupe · Champagne · Ash · White  

**Fonts:** Cormorant Garamond (headlines) · DM Sans (UI/body)  

**Voice:** Quiet luxury — wide tracking on small caps, serif display, 1px borders, photography-led warmth.

---

*Last aligned to codebase: jewelry-project `styles/globals.css`, `app/layout.jsx`, shared UI components. Update this doc when tokens change in `globals.css`.*
