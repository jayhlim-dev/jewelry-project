# Requirements Document

## Introduction

This feature produces a single documentation deliverable, `PAGE_TECHNICAL_BREAKDOWN.md`, at the root of the jewelry-project repository (a Next.js 16 App Router site with React 19, JavaScript, and Tailwind CSS 4). The document gives a developer a page-by-page and UI-section-by-UI-section technical breakdown of the whole site: which component renders each section, where the file lives, how the section is rendered (SSR, CSR, SSG, ISR), which API or data source feeds it, how users interact with it, and how errors are handled.

The document covers all jewelry pages, all starter demo pages, the shared layout, route handlers, special files, middleware, `next.config.js` redirects and rewrites, and the Netlify edge function. The document also verifies the existing `docs/PAGES_AND_APIS.md` independently against source code.

The work is documentation only. Application source code is not modified. Rendering claims are checked against the Next.js 16 docs in `node_modules/next/dist/docs/` before they are asserted, and anything that cannot be confirmed is marked `Unknown`.

## Glossary

- **Breakdown_Document**: The file `PAGE_TECHNICAL_BREAKDOWN.md` located at the repository root. This is the only deliverable of the feature.
- **Author**: The agent or person who writes the Breakdown_Document.
- **Application_Source**: All files in the repository that implement the site, including `app/`, `components/`, `lib/`, `data/`, `config/`, `middleware.js`, `next.config.js`, `netlify/`, and `netlify.toml`.
- **Next_Docs**: The Next.js documentation shipped in `node_modules/next/dist/docs/`.
- **Existing_Doc**: The file `docs/PAGES_AND_APIS.md`, which pre-dates the Breakdown_Document.
- **Page**: A route that renders UI, defined by a `page.jsx` file under `app/`.
- **Jewelry_Page**: A Page that belongs to the jewelry catalog site. These are `/`, `/shop`, `/shop/[slug]`, `/collections/[slug]`, `/articles`, `/articles/[slug]`, `/classics`, `/contact`, `/privacy`, `/terms`, `/size-guide`, `/d-color-diamond`, and `/why-xxxx`.
- **Starter_Demo_Page**: A Page inherited from the starter template. These are `/blobs`, `/edge`, `/edge/australia`, `/edge/not-australia`, `/image-cdn`, `/middleware`, `/revalidation`, and `/routing`.
- **Route_Handler**: A server endpoint defined by a `route.js` file. These are `/api/contact`, `/api/products`, and `/quotes/random`.
- **Special_File**: A Next.js convention file such as `layout`, `template`, `loading`, `error`, or `not-found`. In scope are the root `layout`, `template`, `loading`, `error`, `not-found`, `shop/loading`, and `shop/[slug]/loading`.
- **Shared_Layout**: The UI that wraps every Page: header, footer, navigation, search, and inquiry bag.
- **UI_Section**: A distinct visual block on a Page or in the Shared_Layout, rendered by one component or one JSX block, and given one row in a summary table.
- **Summary_Table**: The per-page table with columns No., UI Section, Component / File, Rendering, API Called, Purpose.
- **Row_Detail**: The detailed block written for one UI_Section, as defined in Requirement 5.
- **API_Summary_Table**: The document-wide table with columns No., API Endpoint, Method, Used By, Purpose, Authentication.
- **SSR**: Server-Side Rendering. HTML is generated on the server for each request.
- **CSR**: Client-Side Rendering. UI is rendered in the browser by a Client Component.
- **SSG**: Static Site Generation. HTML is generated at build time.
- **ISR**: Incremental Static Regeneration. Static HTML is regenerated after build, on a revalidation trigger or interval.
- **Page_Level_Rendering**: The rendering strategy of the whole route, determined by route segment config, dynamic APIs, and data fetching.
- **Component_Level_Rendering**: The rendering strategy of a single component, determined by the `"use client"` directive and the component's position in the tree.
- **Hydration**: The browser process that attaches event handlers and state to server-rendered HTML of a Client Component.
- **Confirmed_Reference**: A code reference that the Author opened and read in Application_Source during this work.
- **Assumed_Reference**: A code reference inferred without opening the file, or a behavior inferred from convention.
- **Unknown**: The marker the Author writes when a fact cannot be confirmed from Application_Source or Next_Docs.
- **Duplicate_API**: An API endpoint or data source called from more than one UI_Section or Page.
- **Shared_API**: An API endpoint or data source used by the Shared_Layout and therefore by every Page.
- **Interaction_Only_API**: An API endpoint called only after a user action, not during initial render.
- **Unused_API**: A Route_Handler that no Application_Source file calls.
- **Third_Party_API**: An external service called by Application_Source, such as an SMTP provider or a hosted API.
- **Fallback_Path**: A code path that supplies data or behavior when the primary source is missing or fails.

## Requirements

### Requirement 1: Deliverable location and scope boundary

**User Story:** As a developer, I want one documentation file at a known location, so that I can find the breakdown without searching the repository.

#### Acceptance Criteria

1. THE Author SHALL write the Breakdown_Document at `PAGE_TECHNICAL_BREAKDOWN.md` in the repository root.
2. THE Author SHALL create no file in the repository other than the Breakdown_Document as a deliverable of this feature.
3. THE Author SHALL leave every file in Application_Source unmodified.
4. IF the Author finds an error in Application_Source or in the Existing_Doc, THEN THE Author SHALL record the error in the Breakdown_Document and leave the erroneous file unchanged.
5. THE Breakdown_Document SHALL be written in English using Markdown.

### Requirement 2: Document structure, table of contents, and glossary

**User Story:** As a reader, I want a table of contents and a glossary, so that I can navigate the document and understand its terms.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL begin with a table of contents whose entries link to every top-level section by anchor.
2. THE Breakdown_Document SHALL contain a glossary that defines SSR, CSR, SSG, ISR, Page_Level_Rendering, Component_Level_Rendering, Hydration, Duplicate_API, Shared_API, Interaction_Only_API, Unused_API, Third_Party_API, and Fallback_Path.
3. THE Breakdown_Document SHALL contain the following top-level sections in this order: table of contents, glossary, rendering definitions, Shared_Layout, Jewelry_Page breakdowns, Starter_Demo_Page breakdowns, Route_Handler and Special_File breakdowns, middleware and configuration, API mapping, data flow, codebase references, Existing_Doc verification, final validation, final report.
4. THE Breakdown_Document SHALL state the commit hash or the date on which the Author read Application_Source.
5. THE Breakdown_Document SHALL use each defined term with the same spelling and meaning throughout.

### Requirement 3: Page and route inventory

**User Story:** As a developer, I want every route listed, so that I can confirm nothing is missing from the breakdown.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL contain a route inventory table listing every Jewelry_Page, Starter_Demo_Page, Route_Handler, Special_File, middleware rule, `next.config.js` redirect, `next.config.js` rewrite, and Netlify edge function in scope.
2. THE Breakdown_Document SHALL give each Jewelry_Page its own section containing a Summary_Table and a Row_Detail for every UI_Section.
3. THE Breakdown_Document SHALL give each Starter_Demo_Page its own section containing a Summary_Table and a Row_Detail for every UI_Section, at the same depth as a Jewelry_Page.
4. WHEN the Author lists a route that is dynamic, THE Breakdown_Document SHALL state how the route's params are resolved and whether `generateStaticParams` or an equivalent is present.
5. IF a route listed in the scope does not exist in Application_Source, THEN THE Breakdown_Document SHALL record the route as absent and give the path searched.
6. IF Application_Source contains a Page or Route_Handler that is not in the scope list, THEN THE Breakdown_Document SHALL add the route to the inventory and mark it as found outside the original scope.
7. THE Breakdown_Document SHALL state that no authentication pages or admin pages exist in Application_Source, and SHALL cite the search the Author ran to reach that finding.

### Requirement 4: Per-page Summary_Table

**User Story:** As a developer, I want a one-glance table for each page, so that I can see every section and its data source before reading details.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL give every Page a Summary_Table with exactly these columns in this order: No., UI Section, Component / File, Rendering, API Called, Purpose.
2. THE Breakdown_Document SHALL give every UI_Section on a Page one row in the Summary_Table, numbered consecutively from 1 in top-to-bottom visual order.
3. THE Summary_Table SHALL state the Rendering value of each row as one of SSR, CSR, SSG, ISR, or Unknown.
4. WHERE a UI_Section receives no data from an API or data source, THE Summary_Table SHALL write `None` in the API Called column.
5. THE Summary_Table SHALL give the Component / File column as a file path relative to the repository root.
6. WHEN a UI_Section belongs to the Shared_Layout, THE Summary_Table SHALL contain one short row that names the Shared_Layout section and links to the matching Shared_Layout subsection.

### Requirement 5: Per-row Row_Detail

**User Story:** As a developer, I want a detailed block for each UI section, so that I can understand its rendering, data, interaction, and failure behavior without reading the code first.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL give every non-linking row of every Summary_Table a Row_Detail.
2. THE Row_Detail SHALL contain a property table with these fields: Component, File Location, Rendering Strategy, API Endpoint, HTTP Method, Trigger, Data Source, Authentication, Caching.
3. THE Row_Detail SHALL contain a "How it works" paragraph that describes the data path from source to rendered output in the order the code executes.
4. THE Row_Detail SHALL contain an API Details table with these fields: Request URL, Parameters, Payload, Response, Fields Used.
5. THE Row_Detail SHALL contain a "User Interaction" subsection that lists each click, input, submit, or navigation the UI_Section supports and the result of each.
6. THE Row_Detail SHALL contain an "Error Handling" subsection that describes the behavior for missing data, failed requests, invalid input, and empty results that apply to the UI_Section.
7. WHERE a UI_Section reads from a local module or static data file instead of a network API, THE Row_Detail SHALL write the module path in the Data Source field and `None (local module)` in the API Endpoint field.
8. WHERE a field in the Row_Detail does not apply to the UI_Section, THE Row_Detail SHALL write `N/A` and give a reason of at most one sentence.
9. IF the Author cannot confirm a field value from Application_Source or Next_Docs, THEN THE Row_Detail SHALL write `Unknown` in that field and name what evidence is missing.
10. THE Row_Detail SHALL write the Authentication field as `None` when the endpoint or data source requires no credentials from the caller, and SHALL name the mechanism when credentials are required.

### Requirement 6: Rendering definitions and consistent use

**User Story:** As a reader, I want clear rendering definitions applied consistently, so that I can trust every Rendering label in the document.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL contain a rendering definitions section that defines SSR, CSR, SSG, and ISR in terms of the Next.js 16 App Router, citing the Next_Docs file that supports each definition.
2. THE Breakdown_Document SHALL separate Page_Level_Rendering from Component_Level_Rendering and record both for every Page.
3. THE Breakdown_Document SHALL explain, for each Client Component documented, which part is rendered to HTML on the server and which part occurs only after Hydration.
4. WHEN a Page_Level_Rendering label is asserted, THE Author SHALL support the label with evidence from Application_Source such as route segment config, use of dynamic APIs, `fetch` cache options, `generateStaticParams`, `revalidate` exports, or the absence of each.
5. IF the Author cannot determine from Application_Source and Next_Docs whether a route is statically or dynamically rendered, THEN THE Breakdown_Document SHALL label the route's rendering `Unknown` and state the reason.
6. THE Author SHALL read the relevant Next_Docs guides before asserting any rendering, caching, middleware, redirect, rewrite, `loading`, `error`, `not-found`, or route handler behavior.
7. THE Breakdown_Document SHALL list the Next_Docs files the Author consulted, each with its path relative to the repository root.
8. WHERE Next.js 16 behavior differs from earlier Next.js versions for a documented feature, THE Breakdown_Document SHALL note the difference and cite the Next_Docs file.

### Requirement 7: Shared_Layout breakdown

**User Story:** As a developer, I want the shared layout documented once in full, so that I do not read the same header and footer breakdown on every page.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL document the Shared_Layout in one dedicated section placed before the Jewelry_Page breakdowns.
2. THE Shared_Layout section SHALL give the header, footer, navigation, search, and inquiry bag each a Summary_Table row and a full Row_Detail as defined in Requirement 5.
3. THE Shared_Layout section SHALL record how the root `layout`, `template`, and any providers wrap Page content, and which of these components are Client Components.
4. THE Shared_Layout section SHALL record the state that the inquiry bag holds, where the state is stored, and whether the state survives a page reload.
5. THE Shared_Layout section SHALL record the data source of the navigation links and the search index.
6. WHEN a Page or Starter_Demo_Page section lists Shared_Layout UI_Sections, THE Breakdown_Document SHALL use the short linking row defined in Requirement 4 criterion 6 and SHALL NOT repeat the Row_Detail.

### Requirement 8: Route_Handler, Special_File, middleware, and configuration breakdown

**User Story:** As a developer, I want server endpoints and framework files documented, so that I understand behavior that has no visible UI.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL document `/api/contact`, `/api/products`, and `/quotes/random` each with HTTP methods supported, request parameters, request payload, response shape, validation, status codes, authentication, caching, and error handling.
2. THE Breakdown_Document SHALL document the root `layout`, `template`, `loading`, `error`, `not-found`, `shop/loading`, and `shop/[slug]/loading` Special_Files each with file location, scope of the route segments affected, whether the file is a Client Component, and the condition that triggers the file.
3. THE Breakdown_Document SHALL document the `middleware.js` `/admin` redirect with the file location, matcher, redirect target, status code, and the finding that no `/admin` Page exists.
4. THE Breakdown_Document SHALL document each `next.config.js` redirect and rewrite with source pattern, destination, permanence or status, and any conditions.
5. THE Breakdown_Document SHALL document the Netlify edge function with file location, route binding in `netlify.toml` or in the function file, runtime, and the behavior it adds to a request.
6. WHEN the Next_Docs state that a convention listed in this requirement is deprecated or renamed in Next.js 16, THE Breakdown_Document SHALL record the deprecation notice and cite the Next_Docs file.
7. IF a Route_Handler reads an environment variable, THEN THE Breakdown_Document SHALL record the variable name and SHALL NOT record the variable value.

### Requirement 9: API mapping

**User Story:** As a developer, I want every API and data source mapped to the places that use it, so that I can assess the impact of changing one.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL contain an API_Summary_Table with exactly these columns in this order: No., API Endpoint, Method, Used By, Purpose, Authentication.
2. THE API_Summary_Table SHALL list every Route_Handler, every Third_Party_API, and every local data module that serves as a data source for a UI_Section.
3. THE Breakdown_Document SHALL classify each API_Summary_Table entry as one or more of: Duplicate_API, Shared_API, Interaction_Only_API, Unused_API, Third_Party_API.
4. WHERE an API entry is a Duplicate_API, THE API_Summary_Table SHALL list every Page and UI_Section that calls the entry in the Used By column.
5. WHERE an API entry is an Unused_API, THE Breakdown_Document SHALL state the search the Author ran to establish that no caller exists.
6. THE Breakdown_Document SHALL list each Fallback_Path, naming the primary source, the fallback source, and the condition that activates the fallback.
7. WHEN the Breakdown_Document reports a total number of unique API endpoints, THE Breakdown_Document SHALL state the counting rule, including whether local data modules and Third_Party_API entries are counted.
8. THE Breakdown_Document SHALL record, for every API entry, the Authentication mechanism or `None`.

### Requirement 10: Data flow diagrams

**User Story:** As a developer, I want diagrams of how data moves, so that I can understand the system without tracing every import.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL contain a data flow section with Mermaid diagrams in fenced code blocks tagged `mermaid`.
2. THE data flow section SHALL contain a diagram of the catalog data path from data source through `lib/` helpers to Pages and components.
3. THE data flow section SHALL contain a diagram of the contact and inquiry submission path from the browser through `/api/contact` to any Third_Party_API or Fallback_Path.
4. THE data flow section SHALL contain a diagram of the inquiry bag state path across Shared_Layout and Pages.
5. THE data flow section SHALL contain a diagram of the request path through middleware, `next.config.js` redirects and rewrites, the Netlify edge function, and the Page.
6. THE Author SHALL write each Mermaid diagram so that it parses without syntax errors.
7. WHEN a diagram element represents an Assumed_Reference, THE Breakdown_Document SHALL mark the element as assumed in the diagram legend or label.

### Requirement 11: Codebase references

**User Story:** As a reviewer, I want to know which references were read and which were inferred, so that I can judge how much to trust each claim.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL contain a codebase references section that lists each source file cited, with its path relative to the repository root.
2. THE codebase references section SHALL label each reference as Confirmed_Reference or Assumed_Reference.
3. WHERE a reference is an Assumed_Reference, THE codebase references section SHALL state the reason the Author did not confirm the reference.
4. WHEN a row, claim, or diagram cites a file, THE Breakdown_Document SHALL use a path that exists in the repository at the time of writing.
5. THE Breakdown_Document SHALL cite at least one source file for every Row_Detail.

### Requirement 12: Verification of the Existing_Doc

**User Story:** As a maintainer, I want the existing pages and APIs document checked against source, so that I know which of its claims to trust.

#### Acceptance Criteria

1. THE Author SHALL verify each claim in the Existing_Doc about pages, routes, rendering, and APIs independently against Application_Source and Next_Docs, and SHALL NOT rely on the Existing_Doc as evidence.
2. THE Breakdown_Document SHALL contain an Existing_Doc verification section that lists each wrong or outdated claim with the claim text, the correct statement, and the evidence file path.
3. THE Breakdown_Document SHALL list each route that Application_Source implements and the Existing_Doc omits.
4. THE Breakdown_Document SHALL list each route that the Existing_Doc describes and Application_Source does not implement.
5. IF the Existing_Doc contains no wrong or outdated claim in a checked category, THEN THE Breakdown_Document SHALL state that the category was checked and found consistent.
6. THE Breakdown_Document SHALL NOT reproduce the Existing_Doc text beyond the quoted claim needed to identify an error.

### Requirement 13: Formatting rules

**User Story:** As a reader, I want consistent formatting, so that I can scan the document quickly.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL use GitHub-flavored Markdown tables for every Summary_Table, property table, API Details table, and API_Summary_Table.
2. THE Breakdown_Document SHALL use the same column names and column order for every instance of a given table type.
3. THE Breakdown_Document SHALL write file paths and code identifiers in inline code formatting.
4. THE Breakdown_Document SHALL use Heading level 2 for each top-level section and Heading level 3 for each Page, and heading level 4 for each Row_Detail.
5. THE Breakdown_Document SHALL give every heading a unique text so that anchor links resolve without collision.
6. THE Breakdown_Document SHALL contain no secret value, credential, API key, or contents of `.env`.
7. THE Breakdown_Document SHALL contain no placeholder text such as `TBD`, `TODO`, or `lorem ipsum`, with `Unknown` as the only permitted marker for missing facts.

### Requirement 14: Final validation section

**User Story:** As a reviewer, I want the document to prove its own completeness, so that I can accept it without redoing the audit.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL contain a final validation section with a checklist of the validation steps the Author ran and the result of each as Passed, Failed, Not run, or Blocked.
2. THE final validation section SHALL include a step that confirms every route in the inventory has a Summary_Table and Row_Details, or a recorded reason that it does not.
3. THE final validation section SHALL include a step that confirms every file path cited in the Breakdown_Document exists in the repository.
4. THE final validation section SHALL include a step that confirms every Mermaid diagram parses.
5. THE final validation section SHALL include a step that confirms the Breakdown_Document contains no secret value.
6. THE final validation section SHALL include a step that confirms `git status` shows `PAGE_TECHNICAL_BREAKDOWN.md` as the only change attributable to this feature.
7. THE final validation section SHALL include a step that confirms the totals in the final report equal the counts derived from the tables in the Breakdown_Document.
8. IF a validation step cannot be run, THEN THE Breakdown_Document SHALL mark the step Blocked and give the reason.
9. THE Author SHALL NOT report a validation step as Passed unless the Author ran the step.

### Requirement 15: Final report

**User Story:** As a project owner, I want a closing report with totals and open questions, so that I can see the size and gaps of the deliverable at a glance.

#### Acceptance Criteria

1. THE Breakdown_Document SHALL end with a final report section.
2. THE final report SHALL state the file location of the Breakdown_Document.
3. THE final report SHALL state the total number of Pages documented, with the count of Jewelry_Page entries and Starter_Demo_Page entries given separately.
4. THE final report SHALL state the total number of UI_Sections documented, with the Shared_Layout UI_Sections counted once.
5. THE final report SHALL state the total number of unique API endpoints, using the counting rule from Requirement 9 criterion 7.
6. THE final report SHALL list each unresolved question and each field marked `Unknown`, with the section in which the field appears.
7. THE final report SHALL list the Existing_Doc errors found, by count and by reference to the verification section.
