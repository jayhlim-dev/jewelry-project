# Jewelry Website: Client Proposal

**Prepared by:** Project Management
**Purpose:** Explain what we are offering, why it fits a fine jewelry business, and what the client gets on every page.
**Brand name:** The site currently uses the placeholder **XXXX**. It is replaced with the client's real brand before launch.

---

## 1. Executive Summary

We are offering a **premium, inquiry-led jewelry website**. It presents the catalog the way a boutique presents its best pieces: large photography, calm typography, and a short path from "I like this" to a conversation with the jeweler on WhatsApp or email.

The site does not run a checkout. That is a deliberate decision for fine jewelry, and section 2 explains why.

**What the client receives**

| Area              | Result                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| Brand presence    | A luxury-feel homepage, brand story, and journal that build trust before the first message         |
| Catalog           | A browsable, filterable collection with product pages, galleries, and metal and ring-size options  |
| Lead capture      | WhatsApp inquiry with the product details pre-filled, an email form, and a "saved pieces" list     |
| Mobile experience | A layout designed for phone use first, since jewelry shoppers browse and message from their phones |
| Search visibility | Structured data, per-page metadata, and clean URLs to support Google discovery                     |
| Content control   | Catalog and page copy are stored in Cloud Firestore, not hard-coded in the pages                   |

---

## 2. Why the Client Needs This (the Business Reasoning)

### 2.1 Jewelry is a trust purchase, not a basket purchase

A buyer of a ring or necklace at this level usually wants to ask about the stone, the metal, the finger size, the delivery, or a custom change before paying. A standard "Add to cart" shop pushes the buyer to pay first and ask later. Many buyers will not do that.

**Our approach:** every product page leads to a conversation. The conversation is where the sale is made, and the site's job is to start it with a qualified, well-informed customer.

### 2.2 Why inquiry-based instead of checkout

| Concern                      | Checkout store                                                                  | This site                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| High-value items             | Buyers hesitate to pay online for an expensive item without speaking to someone | Buyers talk to the jeweler first, which is how they already prefer to buy                  |
| Custom sizes, metals, stones | Hard to represent with fixed variants                                           | Handled in conversation, with the chosen options pre-filled in the message                 |
| Pricing flexibility          | Public prices are fixed                                                         | The client keeps control of price discussion, and can show or hide prices with one setting |
| Payment fees and fraud risk  | Card fees, chargebacks, payment-provider approval                               | None. There is no payment handling, so there is no payment risk                            |
| Operating cost               | Payment gateway, tax, shipping and stock integrations                           | Lower build and maintenance cost                                                           |
| Existing sales habits        | Forces a new process                                                            | Fits how many jewelers already sell: a direct conversation on WhatsApp or email |

### 2.3 What a weak or missing website costs the client

- Prospects check a brand's website before they message or visit. A dated or sparse site lowers trust, and the sale is lost before it begins.
- Instagram and word of mouth bring attention, but they do not hold a full catalog, brand story, or size information in one place.
- Without a clear inquiry path, interested visitors leave instead of contacting the shop.
- Without search visibility, the client depends entirely on social platforms they do not control.

### 2.4 Why us

- **Proven build, not a template swap.** The site is built on a current stack (Next.js 16, React 19, Tailwind CSS 4) chosen for speed and long-term maintainability.
- **Designed around the inquiry.** The WhatsApp message, the saved-pieces list, the size picker, and the contact topics all exist to give the jeweler a complete, ready-to-answer inquiry.
- **Honest scope.** We state what is included, what is not, and what the client must provide. Section 7 lists these without padding.

---

## 3. The Visitor Journey

```
Discover (Home / Journal / Search)
        |
Browse (Shop, Collections, Filters)
        |
Evaluate (Product page: photos, metal, stones, size)
        |
Save or ask (Saved pieces / WhatsApp / Email)
        |
Conversation with the jeweler
        |
Sale completed by the client, offline or by their own process
```

Every page below supports one step of this path.

---

## 4. Page-by-Page: What the Client Gets

### 4.1 Homepage (`/`)

**Role:** First impression. It must make the brand feel established and move the visitor into the catalog within seconds.

| Section                 | What it does                                                                                                 | Why it matters to the client                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Full-screen hero        | Large campaign image with a gentle parallax effect and two buttons: browse the shop, or go straight to rings | The first screen sets the luxury tone and gives two clear next steps                  |
| Brand introduction      | A short statement of what the house stands for                                                               | Gives new visitors a reason to trust the brand                                        |
| Collections grid        | Cards for Rings, Necklaces, Earrings, Bracelets                                                              | Lets visitors enter by the category they came for                                     |
| Popular products        | A curated row of top pieces                                                                                  | Directs attention to the products the client most wants to sell                       |
| Signature carousel      | Highlighted pieces with large images, text, and "See the piece" links                                        | Tells the story behind hero pieces and increases time on site                         |
| Must-have selection     | A larger curated set of pieces                                                                               | Gives repeat visitors fresh reasons to scroll                                         |
| Series banner           | A full-width feature for a series, with a product card overlay                                               | Works like a boutique window display for a new or seasonal launch                     |
| D-color diamond feature | Optional section promoting the diamond guide                                                                 | Available when the client wants to lead with diamond quality (currently switched off) |

**Selling point:** the curated rows are chosen by the client. The homepage can be changed to promote whatever the shop wants to sell this month.

---

### 4.2 Shop / Full Collection (`/shop`)

**Role:** The catalog. Visitors can browse everything and narrow it down.

| Feature                                                    | Benefit                                                                                            |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Category tabs (All, Rings, Necklaces, Earrings, Bracelets) | One tap to the right category                                                                      |
| Filters: metal, diamond shape, availability                | Visitors find a suitable piece faster, so fewer abandon the page                                   |
| Sort: most relevant, price, newest, name A to Z            | Lets the visitor choose how to explore                                                             |
| Shareable URLs                                             | Filters are saved in the page address, so a filtered view can be sent to a friend or used in an ad |
| "Load more" (9 pieces at a time)                           | Keeps the page fast even with a large catalog                                                      |
| Desktop sidebar, mobile filter drawer                      | Comfortable on both a large screen and a phone                                                     |
| Clear empty-state message                                  | If nothing matches, the visitor is told, not left with a blank page                                |

**Selling point:** the "most relevant" sort puts the client's featured pieces first. The client decides what leads.

---

### 4.3 Product Detail (`/shop/[slug]`)

**Role:** The page that turns interest into an inquiry. It is the most important page on the site.

| Feature                                                               | Benefit                                                                              |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Large stacked photo gallery with full-screen enlarge                  | Buyers can inspect the piece closely, which supports confidence in a high-value item |
| Metal selection that changes the photos                               | The visitor sees the piece in each available metal                                   |
| Ring size picker (44 to 70 mm) and "I need help with the size" option | Reduces sizing mistakes and back-and-forth                                           |
| **Inquire on WhatsApp** button                                        | Opens WhatsApp with a message already filled in: piece name, code, metal, size       |
| **Save for inquiry**                                                  | Lets the visitor collect several pieces and ask about them together                  |
| Stones and materials details                                          | Answers common questions before they are asked                                       |
| Related pieces                                                        | Keeps the visitor browsing in the same category                                      |
| Sticky "Inquire" bar on mobile                                        | The contact button stays reachable while the visitor scrolls the photos              |
| Unavailable-piece handling                                            | Sold or unavailable items show a clear message instead of an inquiry button          |
| Product structured data (breadcrumbs)                                 | Supports better presentation in search results                                       |

**Selling point:** the jeweler receives a message that already says which piece, which metal, and which size. That saves time on every inquiry and shortens the path to a sale.

---

### 4.4 Collection Pages (`/collections/rings`, `/necklaces`, `/earrings`, `/bracelets`)

**Role:** Category landing pages.

- A breadcrumb, a title, and a short description for each category.
- A product grid of every piece in that category.
- A link back to the full shop.

**Why it matters:** each category has its own address. The client can link to "Rings" from an Instagram bio, an advertisement, or a printed card, and each category page can be found by search engines.

---

### 4.5 Why XXXX / Brand Story (`/why-xxxx`)

**Role:** Explains why a customer should choose this house over another.

| Section                | Purpose                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Full-screen hero       | Introduces the brand's point of view                                                                                                    |
| Philosophy             | The brand's beliefs, with supporting imagery                                                                                            |
| Four standards         | The brand's pillars (Diamond quality, Thoughtful design, Craftsmanship, Personal service), presented as alternating image and text rows |
| Quality band           | A summary of the points that back up the quality claim                                                                                  |
| How buying works | Three numbered steps (browse the shop, read each piece, chat on WhatsApp) that explain the inquiry process and state that the house is an online-only showroom |
| Closing call to action | Buttons to view the catalog, chat on WhatsApp, or contact the house                                                                     |

**Why it matters:** in jewelry, the brand story supports the price. This page is where the client explains it.

---

### 4.6 Journal / Articles (`/articles` and `/articles/[slug]`)

**Role:** Editorial content that builds authority and brings visitors from search engines.

- A featured article with a large image, followed by a grid of further articles.
- Category labels for each article.
- Article pages with headings, body text, quotations, and a hero image.
- Related articles at the end of each article, and a link back to the collection.

**Why it matters:**

- Articles such as "how to choose a diamond" or "caring for pearls" answer questions that people type into Google. They bring in visitors who are not yet looking for a specific brand.
- They show expertise, which supports trust and higher-value sales.
- The client can add new articles over time.

---

### 4.7 Size Guide (`/size-guide`)

**Role:** Removes one of the main causes of hesitation and returns for rings.

- Two home measuring methods.
- A full ring-size chart in millimetres (27 sizes, 44 to 70).
- Buttons to shop rings or browse all pieces.
- The product page links directly to this guide.

**Why it matters:** a buyer who knows their size is more willing to inquire. The jeweler spends less time on sizing questions.

---

### 4.8 Contact (`/contact`)

**Role:** Gives every kind of visitor the right way to reach the shop.

| Feature                                                                                     | Benefit                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Seven inquiry topics: Stock and availability, A specific piece, Order and payment, Shipping and delivery, Partnership or press, Return or exchange, Something else | The jeweler sees what the message is about before opening it |
| Three trust highlights: digital showroom, personal assistance, confirmed orders | States up front that there is no online checkout and that terms are agreed directly |
| Recommended channel guide (WhatsApp, email, or both)                                        | Points the visitor to the faster or more suitable channel    |
| WhatsApp button with a topic-specific opening message                                       | Starts the chat in one tap                                   |
| Email form with validation on both the page and the server                                  | Delivers clean, complete messages and blocks invalid entries |
| Message goes to the client's inbox through SMTP, with the visitor's address as the reply-to | The client replies directly from their normal email          |
| Success and error states                                                                    | The visitor always knows whether the message was sent        |
| FAQ accordion                                                                               | Answers common questions and reduces repeated messages       |

**Selling point:** nothing is lost. If email delivery has a problem, the visitor is told to use WhatsApp or direct email.

---

### 4.9 Diamond Color Guide (`/d-color-diamond`) — optional

**Role:** An educational page about diamond color grades and the Four Cs, with a certification section and FAQ.

**Status:** built, and **switched off by default**. The client can turn it on from the site settings when they want to promote diamond expertise.

**Why it matters:** buyers of diamond jewelry research before they buy. A clear guide positions the client as the knowledgeable choice.

---

### 4.10 Privacy, Terms, and 404

- **Privacy** and **Terms:** short notes explaining that the site is inquiry-only, that saving a piece does not reserve it, and how saved pieces are stored.
- **Custom 404 page:** a branded page with a link back home, so a broken link does not end the visit.

These need final review and approval by the client before launch (see section 7).

---

## 5. Site-Wide Features

| Feature                                     | What it does                                                                                                           | Why the client benefits                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Search**                                  | Instant search across available products and articles. With an empty search it suggests collections and the size guide | Visitors find a piece by name, code, metal, or shape without browsing                        |
| **Saved pieces (inquiry bag)**              | Visitors save several pieces and send one WhatsApp message listing them all. Stored in the visitor's own browser       | Turns browsing into a single, richer inquiry. It does not reserve stock and needs no account |
| **Responsive navigation**                   | A transparent header on the homepage that turns solid on scroll, and a full-screen menu on mobile                      | Looks premium and stays usable on any screen                                                 |
| **Smooth scrolling and page transitions**   | Gentle motion between pages, which respects "reduce motion" settings                                                   | Gives the site a polished feel without hurting accessibility                                 |
| **Accessibility basics**                    | Skip-to-content link, keyboard-friendly image viewer, reduced-motion support                                           | Reaches more customers and lowers risk                                                       |
| **Product cards**                           | Square images, hover through multiple photos, unavailable labels                                                       | Shows more of each piece in the same space                                                   |
| **Footer**                                  | Brand statement, navigation, collections, contact, legal links; social links appear once the client supplies them      | One consistent place for every important link                                                |
| **Search-engine setup**                     | Site-wide structured data, page titles and descriptions, clean URLs                                                    | Supports organic discovery                                                                   |
| **Content in a database (Cloud Firestore)** | Products, collections, articles, homepage text, and contact details are data, not code                                 | Content can change without rebuilding the pages                                              |
| **Feature switches**                        | The diamond page and catalog prices can be turned on or off from settings                                              | The client chooses how much to show                                                          |
| **Fast, current technology**                | Next.js 16, React 19, Tailwind CSS 4, Framer Motion                                                                    | Quick page loads and a platform that remains supported                                       |

---

## 6. What We Offer, and How We Work

### Included in the scope of this site

1. Full design and build of the pages listed in section 4.
2. Responsive layouts for mobile, tablet, and desktop.
3. WhatsApp and email inquiry flows.
4. Catalog structure with categories, metals, stones, shapes, availability, and ring sizes.
5. Journal and brand-story templates.
6. Search-engine foundations (metadata and structured data).
7. Deployment setup and a handover of how the content is managed.

### How we deliver

| Stage                    | What happens                                                                                          | What the client sees                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Discovery                | We confirm the brand, catalog size, contact channels, and which optional pages to enable              | A short, agreed scope                  |
| Design and content setup | We apply the client's brand name, photography, and copy                                               | A staging site to review               |
| Build and QA             | Implementation, then independent testing of every changed flow, plus lint and production-build checks | A tested release candidate             |
| Launch                   | Deployment, domain, email delivery check                                                              | A live site                            |
| Handover                 | Guidance on updating products, articles, and settings                                                 | The client can run the site day to day |

We report results plainly: what passed, what failed, what was not run, and what was blocked. We do not call a site ready while a required item or a serious defect is open.

---

## 7. What We Need From the Client, and What Is Not Included

We are straightforward about the following, so there are no surprises later.

**The client provides**

- Final brand name, logo, and brand colors (the site uses the placeholder "XXXX" and sample content today).
- Real product photography, descriptions, metals, stones, and availability. Current catalog entries are sample data.
- The real WhatsApp number and business email. Current values are placeholders.
- Social media links. The footer shows them only once they are supplied.
- An email account for the contact form (SMTP details), kept private and stored on the server only.
- Final text for Privacy and Terms. The current wording is a short draft and should be checked by the client, and by a lawyer if required. One line of the privacy note still describes the contact form as opening the visitor's email app, and it needs to be updated to match the form that sends email directly.
- A decision on whether to show prices. The setting exists, and the price display on cards and product pages is currently off.

**Not included in this version**

- Online checkout, payment, or customer accounts. The site is inquiry-only by design. If the client later wants online sales, that is a separate scope and we will quote it.
- A visual admin dashboard. Content is held in Cloud Firestore and is updated through the database or a seed process. A friendlier editing screen can be quoted as an add-on.
- Automated test suite. The project has no test runner today; we verify through lint, build, and manual flow testing.

**Cleanup before launch**

- The code base still contains demonstration pages from the starter template (for example `/blobs`, `/edge`, `/routing`). They are not part of the jewelry experience, and we recommend removing them before the site goes live. This is part of our launch checklist.
- A small number of built but unused sections exist in the code (for example a newsletter form). They can be enabled later if the client wants them.

---

## 8. Why Act Now

- Every week without a polished site is a week in which interested buyers check the brand, find little, and message a competitor.
- The foundation is already built. The client's remaining work is content: photos, copy, and contact details. That keeps the time to launch short.
- Journal articles and search visibility build up over time. An early launch starts that clock sooner.
- The inquiry model keeps cost and risk low. There is no payment processing to certify and no stock system to integrate.

---

## 9. Investment and Next Steps

**Investment:** to be quoted after the discovery call. The price depends on catalog size, the amount of content we prepare, and any add-ons (admin editing screen, checkout, extra languages).

**Proposed next steps**

1. **Discovery call.** Confirm brand name, catalog size, and which optional pages to switch on.
2. **Content collection.** The client sends photos, product details, contact channels, and legal text.
3. **Staging review.** The client reviews the site with their own content.
4. **Launch.** Go live, then confirm that WhatsApp and email inquiries arrive correctly.
5. **Handover.** Training on how to update products, articles, and settings.

---

## 10. Summary

| The client's need                          | Our answer                                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| Look as premium as the jewelry             | Editorial layouts, large photography, calm typography, smooth motion                |
| Turn visitors into conversations           | WhatsApp with pre-filled piece details, saved pieces list, topic-based contact form |
| Reduce sizing and questions back-and-forth | Ring size picker, size guide, FAQ, detailed product pages                           |
| Build trust                                | Brand story, quality standards, journal, optional diamond guide                     |
| Be found online                            | Structured data, clean URLs, a journal that targets real search questions           |
| Stay in control                            | Content in a database, feature switches, the choice to show or hide prices          |
| Keep cost and risk low                     | No payment processing, no stock integration, current and maintainable technology    |

**This is a website designed to start sales conversations, and that is how fine jewelry is sold.**
