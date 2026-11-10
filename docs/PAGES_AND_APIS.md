# Pages and APIs

This file lists every reachable route in this Next.js app.

Two kinds of data exist. Do not mix them up:

- **Public HTTP route** — you can `curl` it. Lives under `app/api/**/route.js`, `app/quotes/random/route.js`, or a rewrite.
- **Server Firestore read** — the Node server talks to Firestore with the Firebase Admin SDK (`lib/firebase-admin.js` + `lib/content.js`). That is **not** a public REST API.

Local `data/*.js` files are seed input only (`scripts/seed-firestore.mjs`). Pages do not read those files at runtime.

Inspected: `app/**/page.jsx`, `app/layout.jsx`, `app/not-found.jsx`, `app/api/**/route.js`, `app/quotes/random/route.js`, `next.config.js`, `lib/content.js`, `lib/clientContent.js`, `lib/firebase-admin.js`, `components/contact/ContactForm.jsx`.

---

## 1. How rendering works

The root layout is a Server Component. It sets `export const dynamic = 'force-dynamic'`. Every request hits the server.

The layout calls `await getContent()`. That reads Firestore with Firebase Admin. React `cache()` shares one `getContent()` result per request.

The layout then calls `pickClientContent()`. That makes a smaller JSON object. It goes into `ContentProvider` (`'use client'`). The browser hydrates from that JSON. Nav, search, shop filters, and the inquiry bag use it. They do **not** call `GET /api/products`.

Jewelry pages are also async Server Components. They render HTML on the server (SSR / RSC). Interactive bits are `'use client'` islands (forms, drawers, filters, motion). That mix is **hybrid**: server HTML + client UI.

There is no checkout. There is no product write API.

**SSR** here means: HTML and data are built on the server for that request.

**CSR** here means: the browser runs React after hydrate (clicks, localStorage, `fetch`).

---

## 2. Shared layout

Every jewelry page (and the leftover starter pages) wrap in `app/layout.jsx`.

Also shared:

- `app/template.jsx` — client page transition
- `Footer` — Server Component, calls `getContent()` again (same request cache)
- `Navbar`, `SplashScreen`, `SmoothScroll`, `InquiryProvider` — client
- Inquiry bag key: `xxxx-inquiry-bag` in `localStorage`

### What the layout reads on the server (`getContent()`)

Firestore collections / documents, all required. Missing config or an empty required collection fails the request.

| Firestore | Kind |
|---|---|
| `products` | collection |
| `collections` | collection |
| `articles` | collection |
| `site/main` | document |
| `home/main` | document |
| `story/main` | document |
| `contact/main` | document |
| `diamond/main` | document |
| `sizeGuide/main` | document |
| `articlesPage/main` | document |
| `search/main` | document |
| `catalog/main` | document |

`quotes` is **not** in `getContent()`. Only `getQuotes()` reads `quotes`.

### What the browser gets (`pickClientContent`)

| Field | Notes |
|---|---|
| `site` | Name, paths, nav, contact numbers, `features` |
| `search` | Quick links, popular article slugs |
| `catalog` | Sort options, price bands |
| `collections` | Full collection records |
| `products` | Full product records (catalog in memory on the client) |
| `sizeGuide` | Size tables (WhatsApp-with-size field stripped on the server) |
| `articles` | Slim only: `slug`, `title`, `category`, `excerpt`, `searchHaystack` |
| `diamond` | Only if `site.features.showDColorDiamondPage === true` |

**Not** in the layout payload: `home`, `story`, `contact`, `articlesPage`, full article `body`. Some pages pass those into client UI with `ContentScope`.

Feature flags live on Firestore `site/main.features`: `showDColorDiamondPage`, `showCatalogPrices`. Seed defaults in `config/siteFeatures.js` are both `false`. Live values come from Firestore, not that file.

---

## 3. HTTP API table

These are **public HTTP routes**. No `PUT`, `PATCH`, or `DELETE` handlers exist in this repo.

| Method | Path | Who calls it | Source | Request body |
|---|---|---|---|---|
| GET | `/api/products` | Nothing in the jewelry UI. Curl / tools only. | Server `getContent()` → Firestore `products` | none |
| GET | `/api/products/:slug` | Curl / tools | Firestore `products/{slug}` | none |
| PATCH | `/api/products/:slug` | Curl / tools (admin) | Firestore merge update | JSON partial product fields; `Authorization: Bearer` or `x-api-key` = `PRODUCTS_ADMIN_SECRET` |
| POST | `/api/contact` | Jewelry `ContactForm` (`fetch` in the browser) | Firestore `contact/main.inquiryTopics` to validate `topicId`; then Nodemailer SMTP (`lib/mail.js`) | JSON `{ name, email, topicId, message }` |
| GET | `/quotes/random` | Starter `RandomQuote` component (`fetch`). That component is **not imported by any page** today. Curl still works. | Server `getQuotes()` → Firestore `quotes` | none |
| GET | `/api/health` | Ops / monitoring (`curl`, load balancers) | Firestore `site/main` via Admin SDK | none |

Jewelry catalog pages do **not** `fetch('/api/products')`.

`POST /api/contact` body rules in `app/api/contact/route.js`: name ≥ 2 chars, valid email, `topicId` must match a Firestore inquiry topic, message ≥ 10 chars.

---

## 4. Jewelry pages

### Summary table

| Route | Render | Data source | HTTP API | Client interactions |
|---|---|---|---|---|
| `/` | Hybrid | Server `getContent()`: `site`, `products`, `collections`, `home` | none — server `getContent()` | Hero / signature motion. Inquiry bag from layout. |
| `/shop` | Hybrid | Layout client payload: `products`, `catalog`, `site` | none — server `getContent()` | Filters, sort, load-more. URL query. No `fetch`. |
| `/shop/[slug]` | Hybrid | Server `getContent()`: `site`, `products`, `collections` | none — server `getContent()` | Save to inquiry bag (`localStorage`). WhatsApp link. Ring size picker. |
| `/collections/[slug]` | Hybrid | Server `getContent()`: `site`, `products`, `collections` | none — server `getContent()` | Product cards (client islands). Inquiry bag from layout. |
| `/why-xxxx` | Hybrid | Server `getContent()`: `site`, `story` | none — server `getContent()` | `ContentScope` + `WhyPageContent` client UI. |
| `/d-color-diamond` | Hybrid | Server `getContent()`: `site`, `diamond` | none — server `getContent()` | FAQ accordion. **404 if flag is off.** |
| `/contact` | Hybrid | Server `getContent()`: `site`, `contact` | **POST `/api/contact`** from `ContactForm` | Form `fetch`. WhatsApp link. No inquiry-bag write on this page. |
| `/articles` | Hybrid | Server `getContent()`: `site`, `articles`, `articlesPage` | none — server `getContent()` | Category UI via `ArticlesExperience`. |
| `/articles/[slug]` | Hybrid | Server `getContent()`: `site`, `articles`, `articlesPage` | none — server `getContent()` | Article cards / motion islands. Full `body` stays on the server. |
| `/size-guide` | Hybrid | Server `getContent()`: `site`, `sizeGuide` (also in layout payload) | none — server `getContent()` | mm input, nearest size, WhatsApp draft. No `fetch`. |
| `/privacy` | Hybrid | Server `getContent()`: `site` (copy is hardcoded in the page) | none | none beyond layout |
| `/terms` | Hybrid | Server `getContent()`: `site` (copy is hardcoded in the page) | none | none beyond layout |
| 404 (`app/not-found.jsx`) | Hybrid | Server `getContent()`: `site` | none | none beyond layout |

All of the above still inherit layout SSR Firestore + `ContentProvider` hydration.

---

### `/` — Homepage (`app/page.jsx`)

- **Render:** Hybrid. Async Server Component. Client islands: `Hero`, `SignatureStory`, cards.
- **Data source:** Firestore via `getContent()` — `home/main`, `products`, `collections`, `site/main`. Child sections (`HomeIntro`, `CategoryShowcase`, `CampaignSelection`, `DiamondFeature`) call `getContent()` too (same request cache).
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Motion / parallax. Layout inquiry bag and search. No catalog `fetch`.
- **Notes:** `DiamondFeature` only if `showDColorDiamondPage` is true. `SeriesBanner` is commented out. Popular / Must have use ring collection products, not `/api/products`.

### `/shop` — Collection browser (`app/shop/page.jsx`)

- **Render:** Hybrid. Server page shell + client `ShopBrowser`.
- **Data source:** `ShopBrowser` reads `products`, `catalog`, `site` from `ContentProvider` (layout `pickClientContent`).
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Category, metal, stock, price, shape, sort. Query params `category`, `metal`, `sort`, `stock`, `min`, `max`, `shape`. Load more (9 at a time). No `fetch`.
- **Notes:** `showCatalogPrices` hides prices and price sort when false.

### `/shop/[slug]` — Product (`app/shop/[slug]/page.jsx`)

- **Render:** Hybrid. Server looks up the product. `ProductStage` / `ProductSummary` are client. `ProductDetailPanel` is a Server Component.
- **Data source:** Firestore `products` and `collections` via `getContent()`. Unknown slug → `notFound()`.
- **HTTP API used:** none — server `getContent()`. There is **no** `GET /api/products/:slug`.
- **Client interactions:** Metal / size UI. `useInquiry().add` → `localStorage` `xxxx-inquiry-bag`. WhatsApp `wa.me` link. No product POST.
- **Notes:** Related products computed on the server.

### `/collections/[slug]` — Collection (`app/collections/[slug]/page.jsx`)

- **Render:** Hybrid. Server page + client product cards.
- **Data source:** Firestore `collections` + `products` via `getContent()`. Unknown slug → `notFound()`.
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Cards / inquiry bag from layout.
- **Notes:** Empty collection shows “No pieces in this collection yet.”

### `/why-xxxx` — Brand story (`app/why-xxxx/page.jsx`)

- **Render:** Hybrid. Hero HTML on the server. `WhyPageContent` is client, fed by `ContentScope { story }`.
- **Data source:** Firestore `story/main`, `site/main`.
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Story UI islands. No `fetch`.
- **Notes:** `story` is not in the layout client payload.

### `/d-color-diamond` — Diamond guide (`app/d-color-diamond/page.jsx`)

- **Render:** Hybrid. Mostly server HTML. `FaqList` is client.
- **Data source:** Firestore `diamond/main`, `site/main`.
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** FAQ open/close.
- **Notes:** If `site.features.showDColorDiamondPage` is not `true`, the page calls `notFound()`. Nav also hides the link. Seed default is off.

### `/contact` — Contact (`app/contact/page.jsx`)

- **Render:** Hybrid. Server copy + FAQ. `ContactExperience` / `ContactForm` are client, via `ContentScope { contact }`.
- **Data source:** Firestore `contact/main` (topics, FAQs, copy), `site/main`.
- **HTTP API used:** **POST `/api/contact`**. The only jewelry-page `fetch` to an app API.
- **Client interactions:** `fetch('/api/contact', { method: 'POST', ... })`. WhatsApp button. Sending overlay / success toast.
- **Notes:** `contact` is not in the layout client payload. `NewsletterForm` exists in the repo but nothing imports it, and it does not POST.

### `/articles` — Journal list (`app/articles/page.jsx`)

- **Render:** Hybrid. Server sorts articles. `ArticlesExperience` is client.
- **Data source:** Firestore `articles` collection, `articlesPage/main`, `site/main`.
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Category browsing. The server passes the full article list as props into `ArticlesExperience`. `ContentScope` only adds `articlesPage`. Layout slim articles are for search/nav, not this list.
- **Notes:** Featured articles sorted first on the server.

### `/articles/[slug]` — Article (`app/articles/[slug]/page.jsx`)

- **Render:** Hybrid. Body rendered on the server (`ArticleBody`). Cards are client.
- **Data source:** Firestore `articles` (full document including `body`), `articlesPage/main`, `site/main`. Unknown slug → `notFound()`.
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Motion / cards. No article API.
- **Notes:** Layout only hydrates slim article fields. This page uses the full server copy.

### `/size-guide` (`app/size-guide/page.jsx`)

- **Render:** Hybrid. Server title. `SizeGuideExperience` is client.
- **Data source:** Firestore `sizeGuide/main` (also sent in layout payload).
- **HTTP API used:** none — server `getContent()`.
- **Client interactions:** Circumference input, nearest ring row, WhatsApp draft. No `fetch`.
- **Notes:** Server strips `cta.whatsappWithSize` before `getContent()` returns.

### `/privacy` (`app/privacy/page.jsx`)

- **Render:** Hybrid (server page + shared client chrome).
- **Data source:** Firestore `site/main` for metadata and breadcrumbs. Body copy is **hardcoded** in the page file.
- **HTTP API used:** none.
- **Client interactions:** none beyond layout.
- **Notes:** The hardcoded sentence about the contact form opening an email app does **not** match `ContactForm` (which POSTs `/api/contact`). Documented as-is.

### `/terms` (`app/terms/page.jsx`)

- **Render:** Hybrid (server page + shared client chrome).
- **Data source:** Firestore `site/main` for metadata and breadcrumbs. Body copy is **hardcoded**.
- **HTTP API used:** none.
- **Client interactions:** none beyond layout.

### 404 (`app/not-found.jsx`)

- **Render:** Hybrid (async Server Component + layout).
- **Data source:** Firestore `site/main` for name and home path.
- **HTTP API used:** none.
- **Client interactions:** none beyond layout.
- **Notes:** Used for unknown URLs and for flagged-off `/d-color-diamond`, missing product slugs, missing collection slugs, missing article slugs.

---

## 5. Starter / demo routes

These are leftovers from the Netlify Next starter. They still use the jewelry root layout, so they still pay for `getContent()` on every request. They are **not** jewelry UX.

| Route | Render | Data source | HTTP API | Client interactions |
|---|---|---|---|---|
| `/blobs` | Hybrid | Netlify Blobs store `shapes` via Server Actions (`app/blobs/actions.js`) | none public REST. Server Actions `uploadShapeAction`, `listShapesAction`, `getShapeAction` | Editor UI. Uploads may be disabled. |
| `/edge` | Hybrid | None from Firestore except layout | none | Geo rewrite (see below) |
| `/edge/australia` | Hybrid | Layout only | none | none |
| `/edge/not-australia` | Hybrid | Layout only | none | none |
| `/classics` | Hybrid | Static explainer | Browser **POST `/__forms.html`** (Netlify Forms demo, not `app/api`) | `FeedbackForm` `fetch` |
| `/routing` | Hybrid | Static explainer | none (links to rewrites/redirects) | none |
| `/revalidation` | Hybrid | **Server `fetch`** to Wikipedia REST `https://en.wikipedia.org/api/rest_v1/page/random/summary` | none in this app | Server Action `revalidateTag('randomWiki')` |
| `/middleware` | Hybrid | Static explainer | none | none |
| `/image-cdn` | Hybrid | Static `/images/corgi.jpg` | none (may use `/.netlify/images` URLs) | overlay UI |
| `/quotes/random` | Route handler, not a page | Firestore `quotes` via `getQuotes()` | **GET** JSON | If you open it in a browser you get JSON, not a jewelry page |

### Extra starter paths (config, not `page.jsx`)

| Path | What it does |
|---|---|
| `/api/health` | **GET** health JSON (`app/api/health/route.js`) |
| `/blog` | Rewrite → `/classics` |
| `/home` | Redirect → `/` |
| `/old-blog/:slug` | Permanent redirect → `/classics` |
| `/docs` | Temporary redirect to Netlify Next.js docs |
| `/github` | Temporary redirect to the starter GitHub repo |
| `/admin` | `middleware.js` redirects to `/` |

### `/edge` geography

`netlify/edge-functions/rewrite.js` rewrites `/edge` to `/edge/australia` if geo country is `AU`, else `/edge/not-australia`. Needs Netlify Edge. `app/edge/page.jsx` is the fallback explainer.

### `/quotes/random` honesty

`components/random-quote.jsx` fetches `GET /quotes/random`. Nothing imports that component. The HTTP route still exists.

---

## 6. Does not exist

Confirmed by grepping `export async function GET/POST` and `app/api/**`:

- **POST `/api/products`** — no
- **PUT `/api/products`** — no
- **PATCH / DELETE** on any app route — no
- **GET `/api/products/:slug`** — no (slug lookup is server `getContent()` on `/shop/[slug]`)
- **GET `/api/articles`** or article-by-slug HTTP API — no
- **GET `/api/collections`** — no
- **GET `/api/contact`** — no (POST only)
- **POST `/api/contact` with product payload as a cart checkout** — no checkout
- **Public Firestore REST** — the browser does not call Firestore. Only the server Admin SDK does
- **Runtime read of `data/*.js`** — no; seed only
- **Payment / cart order API** — no

---

## Quick glossary

| Phrase | Meaning here |
|---|---|
| SSR / RSC | Async Server Component. HTML + Firestore on the server. |
| CSR island | `'use client'` component after hydrate. |
| Hybrid | Both on one URL. Almost every jewelry page. |
| `getContent()` | Server Firestore read. Not curl-able. |
| Public HTTP | `app/**/route.js` (or rewrite). Curl-able. |
