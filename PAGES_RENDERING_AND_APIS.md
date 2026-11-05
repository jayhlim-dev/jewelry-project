# Jewelry Pages: Content, Data Source, and SSR / CSR

Based on reading the code, not on running the app.

## How data reaches every page

- There is one data source: Firestore, read on the server by `getContent()` in `lib/content.js`.
- `getContent()` reads 12 Firestore items in parallel: collections `products`, `collections`, `articles`, and documents `site/main`, `home/main`, `story/main`, `contact/main`, `diamond/main`, `sizeGuide/main`, `articlesPage/main`, `search/main`, `catalog/main`.
- The result is cached for 300 seconds (`unstable_cache`). `React.cache` shares it between the root layout and the page in one request, so a page adds no extra Firestore read.
- It is a server-side function call. **No page calls an HTTP API while rendering.**
- Only one browser-side HTTP call exists on the jewelry pages: `POST /api/contact`, from the contact form.
- `app/layout.jsx` sets `dynamic = 'force-dynamic'`, so every page is **SSR** (HTML built on the server for each request). That the layout setting reaches child pages is inferred. The Next.js docs do not say it in one sentence.
- **CSR** here means a `"use client"` component. It is still server-rendered to HTML first, then hydrates in the browser to become interactive.
- No page is SSG or ISR.

## Shared on every page (root layout)

| Part | What it shows | Data | Rendering |
|---|---|---|---|
| Navbar, mobile menu | Nav links, search button, bag count | `site.navigation` from `getContent()` | SSR + CSR |
| Search dialog | Quick links, popular articles | `search/main` from `getContent()`, filtered in the browser | SSR + CSR |
| Inquiry bag (drawer) | Saved pieces, WhatsApp link | Browser `localStorage`, no API | CSR |
| Splash screen, smooth scroll, page transition | Intro animation, scrolling | None | CSR |
| Footer | WhatsApp and email links | `site.contact` | SSR + CSR |

## Pages

### `/` Home

| Section | Content | Data | Rendering |
|---|---|---|---|
| Hero | Campaign headline and image | `home.hero` | SSR + CSR (client component, animated) |
| Home intro | Intro text | `getContent()` | SSR |
| Category showcase | Links to ring, necklace, earring, bracelet collections | `collections` | SSR |
| Popular products, Must have | Product cards from the `rings` collection | `products`, `collections` via `getProductsInCollection` | SSR + CSR (product cards are client components) |
| Signature story | Brand story block | Static copy | SSR + CSR |
| Diamond feature | Link to D-colour page, shown only if `site.features.showDColorDiamondPage` is true | `site.features` | SSR |

- API hit: none over HTTP. Firestore through `getContent()`.

### `/shop` Shop

| Section | Content | Data | Rendering |
|---|---|---|---|
| Shop header | Title and breadcrumb | `site.paths` | SSR |
| Shop browser | Product grid, filters, sort | All `products` passed as `initialProducts` | SSR + CSR |

- Filtering and sorting run in the browser, with no API call.
- Filters are written to the URL with `history.replaceState`, with no server round trip.

### `/shop/[slug]` Product detail

| Section | Content | Data | Rendering |
|---|---|---|---|
| Breadcrumb, JSON-LD | Home / Shop / Category / Product | `site.url`, `site.paths`, `collections` | SSR |
| Product stage | Image gallery, metal switch (state: `metal`) | `product` | SSR + CSR |
| Product summary | Name, price, metal and ring-size choice, "Add to bag", WhatsApp link | `product`, `site.contact.whatsapp` | SSR + CSR |
| Product detail panel | Specifications, size guide link, contact link | `product` | SSR |
| Other pieces | Related products grid | `getRelatedProducts(products, product)` | SSR + CSR |

- API hit: none over HTTP. The product comes from `getContent()` matched by slug. An unknown slug returns `notFound()`.
- "Add to bag" saves to `localStorage`. The WhatsApp button opens `wa.me` in a new tab, so it is a link and not an API call.

### `/collections/[slug]` Collection

| Section | Content | Data | Rendering |
|---|---|---|---|
| Header | Collection name, description, breadcrumb | `collections` | SSR |
| Product grid | Products in the collection | `getProductsInCollection(products, collection)` | SSR + CSR (cards) |

- API hit: none over HTTP. An unknown slug returns `notFound()`.

### `/articles` Articles list

| Section | Content | Data | Rendering |
|---|---|---|---|
| Articles experience | Category filter chips, article cards (featured first, then newest) | `articles`, `articlesPage` | SSR + CSR |

- The category filter runs in the browser (state: `category`), with no API call.

### `/articles/[slug]` Article

| Section | Content | Data | Rendering |
|---|---|---|---|
| Header | Category, date, read time, title, excerpt | `article` | SSR |
| Hero image | Article image | `article.image` | SSR + CSR (`ImageReveal`) |
| Key takeaways, body, next steps | Article text and links | `article` | SSR |
| Continue reading | Three related articles | `getRelatedArticles` | SSR + CSR (cards) |

- API hit: none over HTTP. An unknown slug returns `notFound()`.

### `/contact` Contact

| Section | Content | Data | Rendering |
|---|---|---|---|
| Header | Title, headline, intro | `contact` | SSR |
| Contact experience | Topic picker, WhatsApp button, email link, form | `contact.inquiryTopics` | SSR + CSR |
| Contact form | Name, email, topic, message | Sends `POST /api/contact` | CSR |
| FAQ | Questions and answers | `contact.faqs` | SSR + CSR (accordion) |

- **This is the only page that calls an HTTP API from the browser: `POST /api/contact`.**
- The route checks `name` (2+ characters), `email`, `topicId`, and `message` (10+ characters), then sends mail over SMTP.
- Success returns `{"ok":true}`. A bad field returns 400. An SMTP failure returns 500.
- The WhatsApp and email buttons are plain links (`wa.me`, `mailto:`).

### `/size-guide` Size guide

| Section | Content | Data | Rendering |
|---|---|---|---|
| Header | Eyebrow, title | `sizeGuide` | SSR |
| Size guide experience | Ring and bracelet size tables, a finger-circumference input that picks the nearest ring size, WhatsApp link | `sizeGuide.ringSizes`, `braceletSizes` | SSR + CSR |

- The size calculation runs in the browser (state: `aroundInput`), with no API call.

### `/d-color-diamond` D-colour diamond

| Section | Content | Data | Rendering |
|---|---|---|---|
| Hero, intro, colour scale, appearance, 4Cs, certification, FAQ | Educational content | `diamond` | SSR, with some animated blocks (`Reveal`, `ImageReveal`) as CSR |

- Returns `notFound()` when `site.features.showDColorDiamondPage` is not true.
- API hit: none over HTTP.

### `/why-xxxx` Why us / story

| Section | Content | Data | Rendering |
|---|---|---|---|
| Hero | Image and headline | `story.hero` | SSR + CSR (`ImageReveal`) |
| Page content | Pillars, shopping call to action, WhatsApp and contact links | `story` | SSR + CSR |

- API hit: none over HTTP.

### `/privacy` and `/terms`

- Static text plus a breadcrumb from `site.paths`.
- API hit: none over HTTP. Rendering: SSR.

## Summary

| Page | Data | HTTP API from the browser | Rendering |
|---|---|---|---|
| `/` | Firestore via `getContent()` | None | SSR + CSR |
| `/shop` | Firestore via `getContent()` | None | SSR + CSR |
| `/shop/[slug]` | Firestore via `getContent()` | None | SSR + CSR |
| `/collections/[slug]` | Firestore via `getContent()` | None | SSR + CSR |
| `/articles` | Firestore via `getContent()` | None | SSR + CSR |
| `/articles/[slug]` | Firestore via `getContent()` | None | SSR + CSR |
| `/contact` | Firestore via `getContent()` | `POST /api/contact` | SSR + CSR |
| `/size-guide` | Firestore via `getContent()` | None | SSR + CSR |
| `/d-color-diamond` | Firestore via `getContent()` | None | SSR |
| `/why-xxxx` | Firestore via `getContent()` | None | SSR + CSR |
| `/privacy`, `/terms` | Firestore via `getContent()` (only for `site.paths`) | None | SSR |

## curl

Local dev server on port 3000. Change the host for a deployed site.

### Check that a page is server-rendered

The content is already in the HTML that the server returns, before any browser JavaScript runs.

```bash
curl -s http://localhost:3000/            | grep -o "<h1[^>]*>[^<]*" | head -3
curl -s http://localhost:3000/shop        | head -c 800
curl -s http://localhost:3000/shop/<slug> | grep -o "<h1[^>]*>[^<]*"
curl -s http://localhost:3000/collections/rings | grep -o "<h1[^>]*>[^<]*"
curl -s http://localhost:3000/articles
curl -s http://localhost:3000/articles/<slug> | grep -o "<h1[^>]*>[^<]*"
curl -s http://localhost:3000/contact
curl -s http://localhost:3000/size-guide
curl -s http://localhost:3000/d-color-diamond
curl -s http://localhost:3000/why-xxxx
curl -s http://localhost:3000/privacy
curl -s http://localhost:3000/terms
```

Replace `<slug>` with a real product or article slug from Firestore. Check status codes with `curl -s -o /dev/null -w "%{http_code}\n" <url>`. An unknown slug should return 404.

### The one API the browser calls: `POST /api/contact`

`topicId` must be one of `stock`, `piece`, `order`, `shipping`, `partnership`, `return`.

```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "topicId": "stock",
    "message": "Is the D-colour ring available in size 6?"
  }'
```

- A valid request returns `200` and `{"ok":true}` and sends an email, so it needs the SMTP settings in `.env`.
- A bad field returns `400` and `{"error":"..."}`.
