# Website Feature Documentation

## 1. Project Overview

This is a Next.js jewelry storefront for the placeholder brand **XXXX**. Visitors browse a sample catalog, read editorial content, and inquire by WhatsApp or email. There is **no checkout or payment**. The catalog is local sample data, not a live commerce API.

**Main jewelry routes**

| Route | Page |
|---|---|
| `/` | Homepage |
| `/shop` | Full collection browser |
| `/shop/[slug]` | Product detail |
| `/collections/[slug]` | Category collection |
| `/why-xxxx` | Brand story |
| `/d-color-diamond` | Diamond color guide (feature-flagged; currently disabled) |
| `/contact` | Contact / inquiry |
| `/articles`, `/articles/[slug]` | Journal |
| `/size-guide` | Ring size guide |
| `/privacy`, `/terms` | Legal notes |
| Custom 404 | `app/not-found.jsx` |

The repo also retains **Netlify platform-starter demo routes** (`/blobs`, `/edge`, `/classics`, `/routing`, `/revalidation`, `/middleware`, `/image-cdn`, `/quotes/random`). Those are not part of the jewelry UX but remain reachable and share the jewelry root layout.

**Data sources and integrations**

- Local modules: `data/products.js`, `data/collections.js`, `data/articles.js`, `data/home.js`, `data/story.js`, `data/diamond.js`, `data/size-guide.js`, `data/contact.js`, `data/site.js`
- Contact email via Nodemailer SMTP (`lib/mail.js`, `POST /api/contact`)
- WhatsApp deep links (`wa.me` + site contact number)
- Inquiry bag in `localStorage` (`xxxx-inquiry-bag`)
- Optional Netlify Blobs / Edge demo features on starter pages

**Framework and libraries** (from `package.json`)

- Next.js 16, React 19, Tailwind CSS 4
- Framer Motion, Lenis (smooth scroll)
- Nodemailer, `@netlify/blobs`, `markdown-to-jsx`, `bright`
- React Compiler enabled (`next.config.js`)

**Shared layout**

- Root layout: `app/layout.jsx` — fonts (Cormorant Garamond, DM Sans), JSON-LD `WebSite`, `SmoothScroll`, `InquiryProvider`, `Navbar`, `MainShell`, `Footer`
- Page transitions: `app/template.jsx` → `PageTransition`
- Site-wide feature flag: `config/siteFeatures.js` → `showDColorDiamondPage` (currently `false`)

---

## 2. Page-by-Page Documentation

### Homepage (`/`)

**Purpose:**  
Introduce the brand, surface collections, and highlight curated product groups. No commerce checkout.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Hero | Full-bleed section `h-[72svh]` / `min-h-[26rem]`, charcoal overlay, parallax image when motion allowed | Same height rules; CTAs stack vertically below `sm` | Static `home.hero` in `data/home.js`; image `/images/hero/campaign.jpg` |
| Brand intro | Centered title + short copy on white | Same, slightly tighter vertical padding | `home.intro` |
| Collections grid | 4 columns (`md:grid-cols-4`), aspect `3/4` cards | 2 columns (`grid-cols-2`) | All entries in `data/collections.js` |
| Popular products | Up to 4 products in a 4-column grid at `md+` | 2-column grid | Hardcoded slugs in `app/page.jsx`: `pearl-strand`, `halo-ring`, `linea-bracelet`, `ivy-drops` |
| Signature carousel | Text + image side-by-side (`md` split); prev/next + dots | Stacked text then image | Hardcoded slides for `celeste-stack`, `orla-link`, `noor-collar` |
| Must have | Up to 8 products, 4 columns at `md+` | 2-column grid | Hardcoded slugs in `app/page.jsx` (8 slugs) |
| Series banner | Full-bleed `min-h-[78vh]` with product card overlay | Card stacks under copy; same height | Slugs `rosa-cushion`, `celeste-stack`, `orla-link` |
| D color feature | Two-column image + copy when enabled | Stacked | `home.diamond`; rendered only if `showDColorDiamondPage === true` |

**Interactions**

- Hero primary CTA → `/shop`; secondary → `/collections/rings`
- Collections “Show all” and product “Show all” links → `/shop`
- Product tiles → `/shop/[slug]`
- Signature / Series “See the piece” → current slide product
- Series and Signature use prev/next controls; Signature also has tab dots

**Data and Business Logic**

- Products resolved by slug from `data/products.js`. Missing slugs are filtered out; empty lists return `null` (section omitted).
- Homepage does **not** use `featured` flags or sorting helpers for Popular / Must have; selection is hardcoded.
- `DiamondFeature` is gated by `isDColorDiamondEnabled()`; with the current flag (`false`), it is not rendered.
- Several home data keys (`home.facts`, `home.campaign`, `home.more`, `home.introduction`, `home.featured`, `home.pillars`, `home.stories`, `home.closing`) exist in `data/home.js` but are **not used** by the current homepage composition.

**Responsive Behavior**

- Primary Tailwind breakpoints used: `sm` (~640px), `md` (~768px), `lg` (~1024px).
- Homepage has no top padding in `MainShell` (navbar overlays the hero). Other pages get `pt-[4.5rem]`.

**States and Edge Cases**

- If a configured slug is missing from the catalog, that tile is skipped.
- Respects `prefers-reduced-motion` in Hero parallax/animations.

**Relevant Source Files**

- `app/page.jsx` — section composition and product slug lists
- `components/sections/Hero.jsx`, `HomeIntro.jsx`, `CategoryShowcase.jsx`, `CampaignSelection.jsx`, `SignatureStory.jsx`, `SeriesBanner.jsx`, `DiamondFeature.jsx`
- `data/home.js`, `data/collections.js`, `data/products.js`
- `lib/features.js`, `config/siteFeatures.js`

---

### Shop / Collection Browser (`/shop`)

**Purpose:**  
Browse the full sample catalog with category tabs, filters, sort, and load-more pagination.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Header | Breadcrumb, “The Collection” title, intro copy | Same | Static copy in page |
| Category tabs | Horizontal wrap | Horizontal scroll (`overflow-x-auto`) | `All` + collection names from `data/collections.js` |
| Filters sidebar | Always visible sticky column (`lg`) | Collapsed behind “Filters” toggle | Client state + URL params |
| Product grid | 3 columns (`lg:grid-cols-3`) | 2 columns | Filtered slice of `products` |
| Load more | Button when more than visible count | Same | `PAGE_SIZE = 9` |

**Interactions**

- URL query params (via `router.replace`, no scroll): `category`, `metal`, `sort`, `stock`, `min`, `max`
- Shape filter is **client-only state** (not written to the URL)
- Availability checkboxes: default `stock` missing → treated as **in stock only** (`in`)
- Sort options: Most relevant (`featured`), price asc/desc, newest, name A–Z
- Load more adds another 9 products to the visible list
- Filters reset visible count when filter/sort inputs change

**Data and Business Logic**

- Source: all products in `data/products.js` (12 pieces)
- Filters: category name match, primary `metal` field match, `diamondShape` match, price range via `matchesPriceRange`, availability via `available`
- Default sort (`featured`): featured products first, then name A–Z (`sortProducts` in `lib/catalog.js`)
- Newest sort: descending trailing digits of `code` (e.g. `SLN-001`)
- Price bounds from catalog max (ceiled to nearest million); price UI section is **commented out** in `ProductFilters.jsx`, but `min`/`max` URL params and filtering logic still run if present
- Empty result message: “No pieces match these filters.”

**Responsive Behavior**

- `lg`: two-column layout (filters ~17–18rem + grid)
- Below `lg`: filters hidden until toggled; result count shown in the mobile filter bar

**States and Edge Cases**

- Suspense fallback: “Loading the collection…”
- Unchecking both availability boxes sets `stock=any` (shows all)
- Checking both in + out shows all

**Relevant Source Files**

- `app/shop/page.jsx`
- `components/products/ShopBrowser.jsx`
- `components/products/ProductFilters.jsx` (`CategoryTabs`, `ProductFilters`)
- `components/products/ProductGrid.jsx`, `ProductCard.jsx`
- `lib/catalog.js`, `data/products.js`

---

### Product Detail (`/shop/[slug]`)

**Purpose:**  
Show one piece’s photographs and known materials, then inquire via WhatsApp or save for a later inquiry.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Gallery | Vertical stack of full-width images; enlarge lightbox | Same | `product.images` or metal-specific `metalViews` |
| Summary panel | Sticky column (`lg:col-span-4`) | Full width below gallery | Product fields from catalog |
| Related products | Up to 4 same-category pieces in grid | 2-column grid | `getRelatedProducts(product)` default limit 4 |
| Sticky inquire bar | Hidden | Shown on viewports `max-width: 1023px` when main inquire CTA scrolls out of view | IntersectionObserver |

**Interactions**

- Metal radio choices switch gallery when `metalViews` (or primary + views) provide photos
- Enlarge opens modal; Esc / close / arrow keys for multi-image sets
- Rings: finger size grid (44–70 mm from `ringSizes`) or “I need help with the size”; Size guide link → `/size-guide`
- Inquire on WhatsApp opens `wa.me` with a prefilled draft (piece name/code, metal, size, gift, note)
- Save for inquiry writes to inquiry bag; disabled when same options already saved
- Gift checkbox + note textarea (max 140 chars)
- Unavailable products (`available: false`): inquiry controls hidden; message shown instead

**Data and Business Logic**

- Static params from all product slugs; unknown slug → `notFound()`
- Prices exist on product objects and are stored when saving, but **are not rendered** on the product page UI
- Description paragraph shown only when `addsDetail()` decides it adds new information beyond `summary`
- Stones formatted by `formatStoneLine`; materials cleaned into “Details” list
- Metals listed in `product.metals` without photos get a note: “Also made in … Shown here in …”
- Breadcrumb JSON-LD included

**Responsive Behavior**

- `lg` two-column stage (gallery 7 / summary 4 starting at column 9)
- Mobile sticky bottom bar with truncated name + Inquire / Choose a size
- When sticky bar visible, body gains `padding-bottom: 5.5rem`

**States and Edge Cases**

- Ring inquire without size: focuses size control and shows error; WhatsApp link not opened
- Multi-image cards elsewhere use hover chevrons; product page shows all images stacked

**Relevant Source Files**

- `app/shop/[slug]/page.jsx`
- `components/products/ProductStage.jsx`, `ProductGallery.jsx`, `ProductSummary.jsx`
- `components/products/ProductGrid.jsx`
- `lib/catalog.js`, `data/size-guide.js`, `data/site.js`

---

### Collection (`/collections/[slug]`)

**Purpose:**  
List all products in one category (Rings, Necklaces, Earrings, Bracelets and Bangles).

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Header | Breadcrumb, eyebrow, title, description | Same | `data/collections.js` |
| Product grid | Default grid → 4 cols at `lg` | 2 cols | `getProductsInCollection` matches `product.category === collection.name` |
| Empty state | “No pieces in this collection yet.” | Same | When filter returns none |

**Interactions**

- “All pieces” → `/shop`
- Product cards → `/shop/[slug]`

**Data and Business Logic**

- Slugs: `rings`, `necklaces`, `earrings`, `bracelets`
- Unknown slug → `notFound()`
- No filters, sort, or pagination on this page

**Relevant Source Files**

- `app/collections/[slug]/page.jsx`
- `data/collections.js`, `lib/catalog.js`
- `components/products/ProductGrid.jsx`

---

### Why XXXX (`/why-xxxx`)

**Purpose:**  
Brand philosophy, four standards (pillars), quality notes, and how shopping works online.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Hero | Full-bleed `min-h-[78svh]` with overlay copy | `min-h-[72svh]` | `story.hero` |
| Philosophy | 12-col text + image | Stacked | `story.philosophy` |
| Four standards | Alternating image/text rows | Stacked | `pillars` in `data/story.js` |
| Quality band | Bordered panel with points | Stacked | `story.quality`; D-color link only if feature enabled |
| Visit / shopping steps | Sticky left column + numbered steps | Stacked | `story.shopping` |
| Closing CTA | Title + Shop / Contact buttons | Stacked | `story.closing` |

**Interactions**

- Optional “Read the D color guide” → `/d-color-diamond` (only when flag enabled; currently off)
- “View full catalog” → `/shop`
- “Chat on WhatsApp” → `wa.me` without product-specific draft
- Closing Contact → `/contact`

**Data and Business Logic**

- All copy/images from `data/story.js`
- Copy in shopping steps mentions product page prices; current product UI does not display prices (see Known Limitations)

**Relevant Source Files**

- `app/why-xxxx/page.jsx`
- `components/sections/WhyPageContent.jsx`
- `data/story.js`

---

### D Color Diamonds (`/d-color-diamond`)

**Purpose:**  
Educational guide to diamond color grades and the Four Cs.

**Current status:** Feature flag `showDColorDiamondPage` is `false`. The page component calls `notFound()`, so visitors currently see the 404 page. Nav and search guide links omit this route while disabled.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Hero | `min-h-[78svh]` full-bleed | Same | `diamondPage.hero` |
| Intro / scale groups / appearance / 4Cs / certification / FAQ | Multi-section editorial layout | Stacked grids | `data/diamond.js` |
| Closing CTA | “Browse jewelry” → `/shop` | Same | Static button |

**Relevant Source Files**

- `app/d-color-diamond/page.jsx`
- `data/diamond.js`
- `lib/features.js`, `config/siteFeatures.js`

---

### Contact (`/contact`)

**Purpose:**  
Help visitors choose an inquiry topic and contact the house by WhatsApp or email form.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Hero / highlights | Headline + 3 highlight cards | Highlights stack / 3-col at `sm` | `contactPage` |
| Topic picker | Up to 4 columns (`xl`) | 1–3 columns | `inquiryTopics` (7 topics) |
| Channel guide | Sticky aside with recommended channel | Full width above form | Channel copy keyed by `whatsapp` / `email` / `both` |
| Email form | Name, email, message; topic from picker | Same | `POST /api/contact` → SMTP |
| FAQ | Sticky title + accordion list | Stacked | `contactFaqs` |

**Interactions**

- Topic buttons sync form topic (form topic select hidden when used inside `ContactExperience`)
- WhatsApp CTA uses draft: `Good day. I would like to enquire regarding: {topic.label}.`
- Send email validates client-side then server-side (name ≥ 2, valid email, known topic, message ≥ 10)
- Success state replaces form; “Edit the note” returns to form
- Sending overlay while request in flight

**Data and Business Logic**

- SMTP requires env: `SMTP_USER` (or typo alias `SMPT_USER`), `SMTP_APP_PASSWORD`, `CONTACT_EMAIL`; optional `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
- Email subject: `{topicLabel} — {name}`; Reply-To set to visitor email
- Contact details (email, WhatsApp number) from `data/site.js` (placeholders)

**States and Edge Cases**

- Field errors and submit errors shown inline
- Server 500 returns a message suggesting WhatsApp or direct email

**Relevant Source Files**

- `app/contact/page.jsx`
- `components/contact/ContactExperience.jsx`, `ContactForm.jsx`, `ContactSendingOverlay.jsx`
- `app/api/contact/route.js`, `lib/mail.js`
- `data/contact.js`, `data/site.js`
- `components/ui/FaqList.jsx`

---

### Articles Index (`/articles`)

**Purpose:**  
List journal articles.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Featured article | Large card (`aspect-[16/10]`) | Same structure | First item in `articles` array |
| Remaining grid | 3 columns at `lg` | 1 col → 2 at `md` | Remaining 4 articles |
| Category labels | Uppercase list under intro | Same | Unique `category` values (display only; not filters) |

**Data and Business Logic**

- 5 static articles in `data/articles.js`
- Categories are labels only; clicking them does not filter

**Relevant Source Files**

- `app/articles/page.jsx`
- `components/editorial/ArticleCard.jsx`, `ArticleGrid.jsx`
- `data/articles.js`

---

### Article Detail (`/articles/[slug]`)

**Purpose:**  
Render one editorial article and related reading.

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Header | Category, date, title, excerpt | Same | Article fields |
| Hero image | `aspect-[16/9]` | Same | `article.image` |
| Body | `h2`, paragraph, quote blocks | Same | `article.body[]` |
| Related | Up to 3 cards in 3 columns | Stacked → 3 at `md` | `getRelatedArticles` (first other articles, limit 3) |

**Interactions**

- “All articles” → `/articles`
- “Explore the Collection” → `/shop`

**Relevant Source Files**

- `app/articles/[slug]/page.jsx`
- `lib/catalog.js`, `data/articles.js`
- `components/editorial/ArticleCard.jsx`

---

### Size Guide (`/size-guide`)

**Purpose:**  
Home measuring instructions and millimetre ring chart (circumference 44–70).

| Feature | Desktop Behavior | Mobile Behavior | Data Source / Logic |
|---|---|---|---|
| Methods | Two columns | Stacked | `sizeGuide.methods` |
| Chart | Split into two columns of rows | Stacked columns | `ringSizes` (27 sizes) |
| CTAs | Shop rings / All pieces | Same | Links to `/collections/rings` and `/shop` |

**Relevant Source Files**

- `app/size-guide/page.jsx`
- `data/size-guide.js`

---

### Privacy (`/privacy`)

**Purpose:**  
Short privacy notes about saved pieces and contact.

**Verified content behavior**

- States saved pieces stay in the browser and clearing site data removes them — matches `InquiryProvider` + `localStorage`
- States the contact form “opens your email app” — **does not match** current implementation (form posts to `/api/contact` via SMTP)
- States the site does not run a mailing list — `NewsletterForm` exists but is unused; privacy claim matches that there is no live mailing list integration on rendered pages

**Relevant Source Files**

- `app/privacy/page.jsx`

---

### Terms (`/terms`)

**Purpose:**  
Short terms: inquiry-only site, prices in rupiah confirmed offline, saving does not reserve.

**Relevant Source Files**

- `app/terms/page.jsx`

---

### Not Found (`not-found`)

**Purpose:**  
Custom 404 for missing routes/products/articles and for disabled D-color page.

**Interactions**

- Link back to home branded with `site.name`

**Relevant Source Files**

- `app/not-found.jsx`

---

### Netlify Starter: Blobs (`/blobs`)

**Purpose:**  
Demo Netlify Blobs with uploadable random shapes.

**Behavior (verified from code)**

- Explains Blobs; renders `ShapeEditor`
- Upload can be disabled when `NEXT_PUBLIC_DISABLE_UPLOADS` is `"true"` (`uploadDisabled` in `utils.js`)
- Server actions in `app/blobs/actions.js` write JSON to Netlify Blobs store `shapes`
- Runtime success depends on Netlify Blobs context — **Not verified** outside a Netlify deploy / `netlify dev`

**Relevant Source Files**

- `app/blobs/page.jsx`, `actions.js`, `editor.jsx`, `list.jsx`, `generator.js`, `renderer.jsx`, `new-shape.jsx`

---

### Netlify Starter: Edge Geography (`/edge`, `/edge/australia`, `/edge/not-australia`)

**Purpose:**  
Demonstrate Netlify Edge Function rewrite by country.

**Behavior**

- Edge function `netlify/edge-functions/rewrite.js` maps `/edge` → `/edge/australia` if geo country is `AU`, else `/edge/not-australia`
- Fallback page content at `app/edge/page.jsx` explains the feature
- Requires Netlify Edge runtime — **Not verified** in plain `next dev` without Netlify

---

### Netlify Starter: Classics (`/classics`)

**Purpose:**  
Demo Netlify Forms via `FeedbackForm` and `public/__forms.html`.

**Also:** `/blog` rewrites to `/classics`; `/old-blog/:slug` permanently redirects to `/classics`.

---

### Netlify Starter: Routing (`/routing`)

**Purpose:**  
Document and link examples of redirects/rewrites from `next.config.js` (`/docs`, `/github`, `/home` → `/`, `/api/health` → `/quotes/random`).

---

### Netlify Starter: Revalidation (`/revalidation`)

**Purpose:**  
On-demand cache revalidation demo fetching a random Wikipedia summary (`revalidate: 60`, tag `randomWiki`).

**External dependency:** Wikipedia REST API — behavior depends on network availability at request time.

---

### Netlify Starter: Middleware Explainer (`/middleware`)

**Purpose:**  
Documents site middleware behavior (security headers, `/admin` redirect, API version header). Actual middleware lives in `middleware.js` and applies site-wide (including jewelry pages).

---

### Netlify Starter: Image CDN (`/image-cdn`)

**Purpose:**  
Compare original vs Netlify Image CDN URLs for `/images/corgi.jpg`.

---

### API: Random Quote (`/quotes/random`)

**Purpose:**  
`GET` returns a random quote from `data/quotes.json` as JSON (`force-dynamic`). Also aliased as `/api/health` via rewrite.

---

### API: Contact (`/api/contact`)

**Purpose:**  
`POST` JSON body `{ name, email, topicId, message }` → SMTP email. Used by the jewelry contact form.

---

## 3. Shared Components and Features

### Navbar and navigation

- Fixed header; transparent on homepage until scroll (`scrollY > 12`) or menu open; ivory solid elsewhere
- Desktop nav (`lg+`) from `site.navigation` (D Color link only if feature enabled)
- Actions: Search, Saved pieces (bag), Mobile menu (`lg:hidden`)
- Skip link to `#main`
- Used on every page via root layout

### Mobile menu

- Full-screen overlay with primary nav + collection shortcuts + contact link
- Body scroll locked while open

### Search dialog

- Client search over **available** products (name, code, category, metal, shape, summary) and all articles (title, category, excerpt)
- Empty query shows collection shortcuts + Size guide (+ D color guide if enabled)
- Not a server search; filters in memory

### Inquiry bag (Saved pieces)

- Context: `InquiryProvider`; storage key `xxxx-inquiry-bag`
- Add/update by product slug; remove; WhatsApp draft listing all saved pieces
- Badge count on bag icon
- Does not reserve inventory

### Footer

- Brand statement, Visit links (`site.navigation`), Collection links, Contact link
- Social links render only if `href` is set (currently both `null`, so hidden)
- Legal row: Size guide, Privacy, Terms

### Product card / grid

- `ProductCard`: square image, category, name, metal (± shape), unavailable label
- Multi-image hover carousel with chevrons + progress bar
- Prices are **not** shown on cards
- `ProductGrid`: 2 columns default, configurable `lg` columns; empty copy for filters

### Product gallery

- Stacked images with enlarge lightbox, focus trap, keyboard navigation

### Smooth scroll / motion

- Lenis smooth wheel scrolling site-wide; respects reduced motion; resets scroll on route change
- Framer Motion used in hero, overlays, reveals

### Unused jewelry components (present but not mounted on current pages)

These exist under `components/` but are not imported by current routes (verified by codebase search):

- `SplashScreen`, `NewsletterForm`
- `HomeFacts`, `HomeJournal`, `FeaturedProducts`, `BrandIntroduction`, `BrandPillars`, `ClosingCta`, `EditorialStories`, `SeriesRow`

---

## 4. Data Sources and Configuration

| Dependency | What it controls | Used by |
|---|---|---|
| `data/products.js` | 12 sample products, prices, metals, images, `featured`, `available` | Shop, product, collections, home selections, search, inquiry |
| `data/collections.js` | 4 category definitions + images/hrefs | Home, shop tabs, collections pages, nav shortcuts |
| `data/articles.js` | 5 journal articles | Articles pages, search |
| `data/home.js` | Homepage copy/images (partially unused keys remain) | Homepage sections |
| `data/story.js` | Why page copy + pillars | `/why-xxxx` |
| `data/diamond.js` | D-color page copy | `/d-color-diamond` (when enabled) |
| `data/size-guide.js` | Ring size chart + measuring copy | Size guide + product ring size UI |
| `data/contact.js` | Topics, FAQs, contact page copy | Contact page + API validation |
| `data/site.js` | Brand name, paths, nav, contact placeholders, SEO blurbs | Layout, metadata, WhatsApp, footer |
| `config/siteFeatures.js` | `showDColorDiamondPage` | Nav, home diamond block, diamond page access, search guides, why-page link |
| `NEXT_PUBLIC_SITE_URL` | Canonical/metadata base URL (fallback `https://xxxx.example`) | `site.url`, JSON-LD |
| SMTP env vars | Contact form delivery | `lib/mail.js` |
| `NEXT_PUBLIC_DISABLE_UPLOADS` | Disables Blobs uploads on demo page | `/blobs` |
| `CONTEXT` (Netlify) | Netlify runtime context helpers | Starter utils / some demo pages |
| `localStorage` `xxxx-inquiry-bag` | Saved inquiry pieces | Navbar bag, product save |
| Static `/public/images/**` | Product, hero, editorial assets | Image components |
| Wikipedia API | Random article for revalidation demo | `/revalidation` only |
| Netlify Blobs / Edge | Demo storage and geo rewrite | `/blobs`, `/edge` |

**Secrets:** Do not commit or document secret values. Contact delivery needs `SMTP_USER` / `SMTP_APP_PASSWORD` / `CONTACT_EMAIL` (and optional SMTP host/port/secure flags).

**No CMS, database, or Shopify client is wired.** Comments in `data/products.js` note a future Storefront API replacement.

---

## 5. Responsive Behavior Reference

Verified Tailwind breakpoints used throughout: `sm`, `md`, `lg`, `xl` (standard Tailwind defaults: 640 / 768 / 1024 / 1280).

| Area | Desktop | Mobile / narrow |
|---|---|---|
| Navbar | Full primary links at `lg+` | Hamburger menu; search + bag always available |
| Main padding | Non-home pages `pt-[4.5rem]` | Same |
| Home collections | 4 columns | 2 columns |
| Home product rows | 4 columns at `md+` | 2 columns |
| Shop filters | Sticky sidebar | Toggle panel |
| Shop / product / article grids | 3–4 columns at `lg` | 2 columns (products) or 1 (articles) |
| Product sticky inquire bar | Hidden at `lg+` | Active below 1024px when CTA off-screen |
| Container | `max-w-[90rem]` with `px-5` → `md:px-10` → `lg:px-14` | Same progression |
| Hero heights | Homepage `72svh`; Why/Diamond ~`78svh` | Why uses `72svh` on smaller screens |

**Image dimensions**

- Catalog entries include `width`/`height` for Next Image (e.g. many product PNGs `940×940`; some JPGs vary). These are declared asset dimensions in data, not CSS box sizes.
- UI often forces aspect ratios (`aspect-square`, `aspect-[3/4]`, `aspect-[16/9]`) via CSS; displayed crop may differ from source pixel size.

**Product counts**

- Popular: up to 4 (hardcoded list length)
- Must have: up to 8
- Shop initial page: 9, then +9
- Related products: up to 4
- Related articles: up to 3
- Signature / Series carousels: 3 slides each

---

## 6. Known Limitations and Unverified Details

- **Sample catalog only.** Prices, metals, photos, and WhatsApp/email contacts are placeholders (`data/products.js`, `data/site.js` notices).
- **No authentication / authorization** for jewelry pages. Middleware only demos `/admin` redirect and security headers.
- **No automated tests** found in the repository.
- **D Color page disabled** via `showDColorDiamondPage: false` → `notFound()`.
- **Price UI largely hidden:** product cards and product detail do not display prices; shop page intro mentions price filtering, but the Price filter section is commented out. Price data and URL `min`/`max` filtering still exist in code.
- **Shape filter** is not persisted in the URL (refresh loses it).
- **Privacy page text** still describes the contact form as opening the user’s email app; implementation sends through `/api/contact` SMTP instead.
- **Why-page shopping copy** says product pages name the price in rupiah; current product summary UI does not show price.
- **Unused section components** remain in the tree (listed in Shared Components).
- **Starter demo pages** still live under `app/` and inherit jewelry chrome (navbar/footer).
- **Contact email delivery** depends on runtime SMTP configuration — not verified without a working environment.
- **Edge geo rewrite and Blobs uploads** depend on Netlify runtime — not verified in plain Next.js alone.
- **Revalidation demo** depends on Wikipedia availability.
- **Actual rendered pixel sizes of hero/source images in browsers** — Not verified (only CSS heights / declared image metadata available).
- Social links are configured but `href: null`, so they do not render.

---

## 7. Quick Reference

| Page | Main Features | Main Data Sources | Important Configuration |
|---|---|---|---|
| `/` | Hero, intro, collections, popular, signature, must-have, series; optional diamond band | `data/home.js`, `products`, `collections`; hardcoded slugs | `showDColorDiamondPage` |
| `/shop` | Tabs, filters, sort, load more (9) | `data/products.js`, `lib/catalog.js` | URL params; price UI commented out |
| `/shop/[slug]` | Gallery, metal/size, WhatsApp inquire, save, related | Product record + `metalViews` | WhatsApp number in `site.contact` |
| `/collections/[slug]` | Category product grid | `collections` + category match | Static collection slugs |
| `/why-xxxx` | Hero, philosophy, pillars, quality, shopping steps | `data/story.js` | D-color CTA gated by feature flag |
| `/d-color-diamond` | Educational diamond guide | `data/diamond.js` | Disabled → 404 when flag false |
| `/contact` | Topics, WhatsApp, email form, FAQ | `data/contact.js`, SMTP API | SMTP + `CONTACT_EMAIL` env vars |
| `/articles` | Featured + grid | `data/articles.js` | First article treated as featured |
| `/articles/[slug]` | Body blocks + related | Article record | Static params from article slugs |
| `/size-guide` | Measuring methods + mm chart | `data/size-guide.js` | Chart 44–70 mm |
| `/privacy` | Short privacy copy | Static JSX | Text partially outdated vs SMTP form |
| `/terms` | Short terms copy | Static JSX | Inquiry-only commerce model |
| 404 | Not-found message | `site.name` | Also used for disabled diamond page |
| `/blobs` | Netlify Blobs shape demo | `@netlify/blobs` | `NEXT_PUBLIC_DISABLE_UPLOADS` |
| `/edge*` | Geo rewrite demo | Netlify Edge Function | Requires Netlify edge |
| `/classics` | Netlify Forms demo | `FeedbackForm`, `__forms.html` | Netlify Forms enablement |
| `/routing` | Redirect/rewrite explainer | `next.config.js` | Docs/GitHub/home redirects |
| `/revalidation` | Tagged Wikipedia fetch | Wikipedia API | Tag `randomWiki`, TTL 60s |
| `/middleware` | Middleware explainer | `middleware.js` | Site-wide headers / `/admin` block |
| `/image-cdn` | Image CDN comparison | `/images/corgi.jpg` | Netlify Image CDN |
| `/quotes/random` | Random JSON quote | `data/quotes.json` | Also `/api/health` rewrite |
| `/api/contact` | Contact email endpoint | Nodemailer | SMTP env configuration |
