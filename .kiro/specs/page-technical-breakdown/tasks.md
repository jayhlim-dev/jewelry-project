# Implementation Plan: Page Technical Breakdown

## Overview

This plan produces one file, `PAGE_TECHNICAL_BREAKDOWN.md`, at the repository root. It proves the file complete through one check script, one Mermaid parse attempt, and a final `git status` comparison (validation steps V1 to V7 in the design). The tasks follow the design pipeline: baseline snapshot, Next.js docs and config reading, route inventory, shared layout, pages, route handlers and framework files, API map and diagrams, Existing_Doc verification, assembly, validation, and report.

Implementation language: Markdown for the deliverable, and Node.js (v22, JavaScript) for the two helper scripts.

Ground rules that apply to every task:

- Application_Source is never modified. No task edits files under `app/`, `components/`, `lib/`, `data/`, `config/`, `middleware.js`, `next.config.js`, `netlify/`, `netlify.toml`, `package.json`, or `package-lock.json`.
- All scratch material lives in a directory created with `mktemp -d` outside the repository (called `$SCRATCH`). Notes, ledgers, draft parts, scripts, and tooling installs go there. The only write into the repository is `PAGE_TECHNICAL_BREAKDOWN.md` (task 10.2 and later).
- Next.js 16 docs are read (task 2.1) before any rendering, caching, middleware, redirect, rewrite, `loading`, `error`, `not-found`, or route handler claim is written.
- The Author does not open `.env`. Take variable names from `.env.example` and `process.env` search hits. Never copy a value into the deliverable or into scratch notes. The only exception is the secret check in task 11.1, which reads `.env` into memory to test the deliverable and prints key names only.
- Draft sections are written to separate files under `$SCRATCH/parts/`, and each task writes its own ledger file at `$SCRATCH/ledger/<task-id>.tsv`. Task 10.1 merges the ledger files. This keeps tasks that run in parallel from writing the same file.
- A task that opens a Next_Docs file outside the list in task 2.1 appends its path to `$SCRATCH/notes/docs-consulted.txt`.
- The Existing_Doc (`docs/PAGES_AND_APIS.md`) is opened only in task 9.1, after all other research and drafting tasks are complete.
- A validation step is recorded `Passed` only after it was run and exited successfully. Otherwise it is `Failed`, `Not run`, or `Blocked` with a reason.
- `npm run lint` and `npm run build` are not part of this feature, because no application code changes. The final report says so.
- No task starts or stops a dev server.

## Tasks

- [x] 1. Baseline snapshot
  - [x] 1.1 Create the scratch workspace and record the baseline
    - Create `$SCRATCH` with `mktemp -d` and the subdirectories `parts/`, `ledger/`, `notes/`, `tools/`, `scripts/`.
    - Save `git rev-parse HEAD` and the ISO date to `$SCRATCH/baseline.meta`, and `git status --porcelain` to `$SCRATCH/baseline.status`.
    - Write `$SCRATCH/scripts/manifest.js`. It prints `git diff | shasum -a 256` for tracked changes and `shasum -a 256` for each untracked file outside `.kiro/` and outside `PAGE_TECHNICAL_BREAKDOWN.md`. Save its output as `$SCRATCH/baseline.manifest`.
    - Draft the "Source snapshot" text (short hash, date, dirty-tree note, first 12 characters of the manifest hash) to `$SCRATCH/parts/00-snapshot.md`.
    - _Requirements: 1.2, 1.3, 2.4, 14.6_

- [ ] 2. Read the Next.js docs, configuration, and root special files
  - [x] 2.1 Read the Next.js 16 docs (design Group A, items A1 to A16)
    - Read the files under `node_modules/next/dist/docs/01-app/` in the design's order. Rendering and data: glossary, rendering philosophy, layouts and pages, server and client components, server and client boundary, fetching data, caching, caching without cache components, revalidating, how revalidation works, incremental static regeneration, public static pages, streaming.
    - File conventions and functions: route segment config (`index.md` and `dynamicParams.md`), `generate-static-params.md`, `connection.md`, `cookies.md`, `headers.md`, `layout.md`, `template.md`, `loading.md`, `error.md`, `not-found.md`, `page.md`, `dynamic-routes.md`, `10-error-handling.md`, `15-route-handlers.md`, `route.md`, `next-response.md`.
    - Middleware, config, and environment: `middleware.md`, `proxy.md`, `16-proxy.md`, `redirecting.md`, `redirects.md`, `rewrites.md`, `cacheComponents.md`, `reactCompiler.md`, `images.md`, `07-edge.md`, `environment-variables.md`.
    - Record only files actually opened in `$SCRATCH/notes/docs-consulted.txt`, and deprecations, renames, and version changes (`version: draft`, "deprecated", "renamed", "removed", "v16") in `$SCRATCH/notes/docs-versions.md`.
    - Record the rule for how a layout-level `dynamic = 'force-dynamic'` export affects child routes, the trigger condition and scope of each Special_File, route handler caching and default status behavior, the `middleware.js` to `proxy.js` rename notice (both doc paths), the default status of `NextResponse.redirect`, the request-processing order of headers, redirects, middleware, and rewrites, and the default value of `cacheComponents`. Give the doc path for each.
    - Write ledger lines to `$SCRATCH/ledger/2.1.tsv`.
    - _Requirements: 3.4, 6.1, 6.6, 6.7, 6.8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 10.5_

  - [-] 2.2 Read the configuration, framework files, and root special files (design Groups B and C)
    - Read `package.json` (versions and scripts), `next.config.js`, `middleware.js`, `netlify.toml`, `netlify/edge-functions/rewrite.js`, `jsconfig.json`, `config/siteFeatures.js`, `lib/features.js`, and `.env.example`.
    - Read `app/layout.jsx`, `app/template.jsx`, `app/loading.jsx`, `app/error.jsx`, `app/not-found.jsx`, `app/shop/loading.jsx`, and `app/shop/[slug]/loading.jsx`.
    - Record the `cacheComponents` value, every redirect and rewrite entry, the middleware matcher and redirect, the edge function `config.path`, and whether `netlify.toml` has an edge function binding. Record environment variable names only.
    - For each special file record: Client or Server Component, route segments affected, trigger condition, exports such as `dynamic` and `metadata`, and providers that wrap children.
    - Write ledger lines to `$SCRATCH/ledger/2.2.tsv`.
    - _Requirements: 6.4, 7.3, 8.2, 8.3, 8.4, 8.5, 8.7, 13.6_

- [ ] 3. Route inventory, glossary, and rendering definitions
  - [~] 3.1 Compute the route set, search for auth pages, and draft the route inventory part
    - Write `$SCRATCH/scripts/routes.js` that lists `page.*`, `route.*`, and Special_Files under `app/`, root middleware or proxy files, `next.config.js` redirect and rewrite entries (read from the file, not executed), and files in `netlify/edge-functions` plus `[[edge_functions]]` blocks in `netlify.toml`. Save the result as `$SCRATCH/routes.computed.txt` with the shape `{ route, kind, group, file, status, searchedPath }`.
    - Compare with the scope list in the requirements. Mark computed routes outside the scope as "found outside original scope", and scope routes that are missing as `absent` with the searched path. Check whether `components/header.jsx` and `components/footer.jsx` are imported by any route.
    - Run `grep -rIl -E "(login|signin|sign-in|auth|admin|dashboard)" app middleware.js` and `find app -ipath '*admin*' -o -ipath '*login*' -o -ipath '*auth*'`. Open each hit and record whether it is a real auth or admin page. Strings such as "author" are expected false hits.
    - Write `$SCRATCH/parts/03-route-inventory.md` with the "Route inventory" table, an "Absent routes" table, the "found outside original scope" markers, and a "Scope findings" subsection that quotes the two commands and the finding.
    - _Requirements: 3.1, 3.4, 3.5, 3.6, 3.7, 8.3, 13.4, 13.5_

  - [-] 3.2 Draft the glossary and rendering definitions parts
    - Write `$SCRATCH/parts/01-glossary.md`: a `Term | Definition` table with all 13 terms from Requirement 2.2, each with one spelling used everywhere.
    - Write `$SCRATCH/parts/02-rendering-definitions.md`: SSR, CSR, SSG, and ISR in Next.js 16 App Router terms, each with its code signal and supporting Next_Docs path; the rendering label derivation rule; a "Next_Docs consulted" list from `docs-consulted.txt`; and a "Version differences and deprecations" list that includes the `middleware` to `proxy` notice.
    - _Requirements: 2.2, 2.5, 6.1, 6.7, 6.8, 8.6_

- [ ] 4. Shared layout
  - [~] 4.1 Read the Shared_Layout files and draft the Shared layout part (design Group E)
    - Read in order: `components/layout/ContentProvider.jsx`, `lib/content.js`, `lib/clientContent.js`, `components/layout/InquiryProvider.jsx`, `Navbar.jsx`, `MobileMenu.jsx`, `SearchDialog.jsx`, `lib/siteSearch.js`, `data/search.js`, `BagDrawer.jsx`, `Footer.jsx`, `MainShell.jsx`, `SmoothScroll.jsx`, `SplashScreen.jsx`, `PageTransition.jsx`, `useOverlay.js`.
    - For each Shared_Layout UI_Section (header, footer, navigation, search, inquiry bag, and any other block the code shows), record: Server or Client Component, data read, trigger, handlers, state kept, failure behavior, caching. Record where the inquiry bag state is stored and whether it survives a reload, and the data source of the navigation links and the search index.
    - Write `$SCRATCH/parts/04-shared-layout.md` with the H2 `Shared layout`, a "Shared layout summary" Summary_Table, a "Layout wrapping and providers" subsection, and one Row_Detail (H4) per UI_Section headed `Shared layout: <No.>. <UI Section>`. Follow the Per-Row Template: nine property fields in order, "How it works" with "Server HTML:" and "After hydration:" sentences for Client Components, API Details with five fields, User Interaction, Error Handling with four bullets, and a Sources line.
    - Apply the N/A and Unknown reason rules, the `None (local module)` rule, and the Authentication rule.
    - Write ledger lines to `$SCRATCH/ledger/4.1.tsv`.
    - _Requirements: 5.1 to 5.10, 6.3, 7.1, 7.2, 7.3, 7.4, 7.5, 11.5_

- [ ] 5. Pages and components
  - [~] 5.1 Document `/`, `/shop`, and `/shop/[slug]`
    - For each page, open `page.jsx`, list its imports, open each imported component and data helper, and note `"use client"`, event handlers, `fetch` calls, and storage access.
    - Run the rendering-signal searches from the design for each route: `dynamic`, `revalidate`, `fetchCache`, `dynamicParams`, dynamic APIs, `fetch` options, `generateStaticParams`, data helper behavior, middleware. Record present and absent signals in a "Rendering evidence" line.
    - For `/shop/[slug]`, record how `params` is resolved and whether `generateStaticParams` exists.
    - Write one part file per page under `$SCRATCH/parts/` (`05-page-home.md`, `05-page-shop.md`, `05-page-shop-slug.md`) using the Per-Page Template: page property table, Rendering evidence, `#### <Page> summary` table, and one Row_Detail per non-linking row. Use linking rows (Purpose starts with `Shared layout:`) for Shared_Layout sections.
    - Write ledger lines to `$SCRATCH/ledger/5.1.tsv`.
    - _Requirements: 3.2, 3.4, 4.1 to 4.6, 5.1 to 5.10, 6.2 to 6.5, 7.6, 11.5_

  - [~] 5.2 Document the remaining Jewelry_Pages
    - Cover `/collections/[slug]`, `/classics`, `/articles`, `/articles/[slug]`, `/contact`, `/size-guide`, `/d-color-diamond`, `/why-xxxx`, `/privacy`, and `/terms`, using the same reading, signal search, and drafting procedure as task 5.1.
    - For the two dynamic routes, record params resolution and `generateStaticParams`.
    - For `/contact`, read `components/contact/ContactForm.jsx`, `lib/contactDraft.js`, and the submit path to `/api/contact`, and cover validation, success, and failure states.
    - Record any scope-list route that does not exist as absent with the searched path. Do not draft a section for it beyond the Absent routes entry.
    - Write one part file per page under `$SCRATCH/parts/` and ledger lines to `$SCRATCH/ledger/5.2.tsv`.
    - _Requirements: 3.2, 3.4, 3.5, 4.1 to 4.6, 5.1 to 5.10, 6.2 to 6.5, 7.6, 11.5_

  - [~] 5.3 Document the Starter_Demo_Pages
    - Cover `/blobs` (with `app/blobs/actions.js` and related files), `/edge`, `/edge/australia`, `/edge/not-australia`, `/image-cdn`, `/middleware`, `/revalidation`, and `/routing`, at the same depth as the Jewelry_Pages.
    - Read `@netlify/blobs` usage, the edge function interplay, and the `revalidation` page's caching or revalidate exports. Record each Third_Party_API client.
    - Use the same Per-Page Template and signal search as task 5.1. Write one part file per page under `$SCRATCH/parts/` and ledger lines to `$SCRATCH/ledger/5.3.tsv`.
    - _Requirements: 3.3, 3.4, 3.5, 4.1 to 4.6, 5.1 to 5.10, 6.2 to 6.5, 7.6, 11.5_

- [ ] 6. Route handlers, special files, middleware, and configuration
  - [~] 6.1 Draft the Route_Handler breakdowns (design Group G)
    - Read `app/api/contact/route.js` with `lib/mail.js`, `lib/firebase-admin.js`, and `lib/contactDraft.js`; `app/api/products/route.js` with `lib/catalog.js`; `app/quotes/random/route.js` with `data/quotes.json`; and `lib/firebase.js`.
    - For each handler record: methods, request parameters, payload, response shape, validation, status codes, authentication, caching, error handling, and environment variable names only.
    - Write `$SCRATCH/parts/06-route-handlers.md` with H3 headings of the form `Route handler: <name> API`. Write ledger lines to `$SCRATCH/ledger/6.1.tsv`.
    - _Requirements: 8.1, 8.7, 13.6_

  - [~] 6.2 Draft the Special_File, middleware, redirect, rewrite, and edge function parts
    - Write `$SCRATCH/parts/07-special-files.md` with an H3 per file (`Special file: root layout`, `template`, `loading`, `error`, `not-found`, `shop loading`, `shop slug loading`). Give file location, route segments affected, Client or Server Component, and trigger condition, citing the Next_Docs file from tasks 2.1 and 2.2.
    - Write `$SCRATCH/parts/08-middleware-config.md` with H3 headings `Middleware`, `Redirects`, `Rewrites`, and `Netlify edge function`.
    - Middleware: file, matcher, `/admin` redirect target and status code, headers it sets, the finding that no `/admin` Page exists, and the `middleware` to `proxy` deprecation notice citing `middleware.md` and `proxy.md`.
    - Redirects and rewrites: source pattern, destination, permanence or status, and conditions for each entry.
    - Edge function: file location, route binding from its own `config` export, runtime, behavior added to the request, and the note on `netlify.toml`.
    - Record any other Next.js 16 deprecation notice that applies, with the doc path. Write ledger lines to `$SCRATCH/ledger/6.2.tsv`.
    - _Requirements: 6.8, 8.2, 8.3, 8.4, 8.5, 8.6_

- [~] 7. Checkpoint - Review drafted parts
  - Confirm each page in the route inventory has a part file, each Summary_Table row has a matching Row_Detail, and no file in the repository changed. Ask the user if questions arise.

- [ ] 8. API mapping and data flow diagrams
  - [~] 8.1 Build the call-site index and draft the API mapping part
    - Run the Step 1 searches from the design: handler files, `fetch(`, literal and template references to `/api/` and `/quotes/`, third-party client imports, `process.env.*` names, local module imports from `data/` and `lib/`, `next/font/google`, and `images.remotePatterns`.
    - Map each hit to its caller route and UI_Section by tracing the import chain, and assign a trigger of `server-render`, `mount`, or `user-action`. Count Shared_Layout sections once. Save `$SCRATCH/callsites.tsv` with columns: target, caller file, line, caller route, caller UI_Section, trigger. Record environment variable names only.
    - Classify each target by hand with the design rules for Duplicate_API, Shared_API, Interaction_Only_API, Unused_API, and Third_Party_API, using `None of the defined classes` where none applies. For each Unused_API, run and quote the literal path, template-string, last-segment, rewrite-alias, and `netlify.toml` and `netlify/` searches.
    - Build the Fallback_Path list starting from `lib/content.js`, `lib/catalog.js`, `lib/firebase.js`, `lib/firebase-admin.js`, `lib/mail.js`, `data/firebase-dummy.js`, and `config/siteFeatures.js`: primary source, fallback source, activating condition.
    - Write `$SCRATCH/parts/09-api-mapping.md` with H3 headings `API summary table`, `API classification`, `Fallback paths`, and `Counting rule`. The API_Summary_Table has exactly the columns `No. | API Endpoint | Method | Used By | Purpose | Authentication`, a kind marker (`[route handler]`, `[third party]`, `[local module]`) in each Purpose cell, and no blank Authentication cell. State the counting rule from the design and the separate local module count.
    - _Requirements: 9.1 to 9.8_

  - [~] 8.2 Draft the four data flow diagrams
    - Write `$SCRATCH/parts/10-data-flow.md` with the H2 `Data flow` and H3 headings `Catalog data path`, `Contact and inquiry submission path`, `Inquiry bag state path`, and `Request path`.
    - Use fenced blocks tagged `mermaid`, `flowchart` type, alphanumeric node ids, double-quoted labels, simple edge labels, no HTML or `%%{init}` directives, and no more than about 20 nodes per diagram.
    - Take the request-stage order from `redirects.md`, `rewrites.md`, and `proxy.md` as recorded in task 2.1, and the Fallback_Path conditions from task 8.1.
    - Mark any node for an Assumed_Reference with ` (assumed)` and a dashed `classDef`, and add a legend only to diagrams that have an assumed node. State "No assumed elements" under diagrams that have none.
    - _Requirements: 10.1 to 10.7_

- [ ] 9. Existing_Doc verification
  - [~] 9.1 Read the Existing_Doc, compare it with the ledger, and record source findings
    - Open `docs/PAGES_AND_APIS.md` only now, after tasks 1 to 8 are complete and their notes are saved.
    - Extract claims in four categories: pages, routes, rendering, APIs. Compare each with the ledger and `routes.computed.txt`, not with other claims in the Existing_Doc.
    - Compute both route set differences by hand (for example with `comm` on sorted lists): implemented and omitted, described and not implemented. Check in particular `/classics`, `app/loading.jsx`, `app/error.jsx`, `app/shop/loading.jsx`, `app/shop/[slug]/loading.jsx`, and the `/blog` and `/home` redirect or rewrite.
    - Write `$SCRATCH/parts/11-existing-doc.md` with the H2 `Existing doc verification` and H3 headings `Findings in the existing doc` (claim short quote, correct statement, evidence path), `Routes implemented and omitted by the existing doc`, `Routes described and not implemented`, `Categories checked and found consistent`, and `Findings in application source`. Quote only the words needed to identify a claim.
    - For `Findings in application source`, collect errors found in Application_Source (such as a comment or `DOCUMENTATION.md` claim that contradicts the code) from the ledger. Give file, line, the contradiction, and evidence. Do not edit the erroneous file.
    - _Requirements: 1.4, 12.1 to 12.6_

- [ ] 10. Assemble the deliverable
  - [~] 10.1 Re-check the baseline, merge the ledger, and draft the Codebase references part
    - Re-run `$SCRATCH/scripts/manifest.js` and compare with `baseline.manifest`. If a cited file changed since task 1.1, re-read it, update the affected part files and ledger lines, and update the fingerprint in `parts/00-snapshot.md`. Report a delta caused by a user edit as not attributable to this feature.
    - Merge `$SCRATCH/ledger/*.tsv` into `$SCRATCH/ledger.tsv`. Refresh the "Next_Docs consulted" list in `parts/02-rendering-definitions.md` from `docs-consulted.txt`, with each path relative to the repository root.
    - Write `$SCRATCH/parts/12-codebase-references.md` with the H2 `Codebase references`: one row per cited source file, labeled `Confirmed_Reference` or `Assumed_Reference`, with a reason for each Assumed_Reference. Include only paths that exist. Check by hand that every Row_Detail Sources line names a file listed in this table.
    - _Requirements: 1.3, 2.4, 11.1 to 11.5, 14.6_

  - [~] 10.2 Assemble `PAGE_TECHNICAL_BREAKDOWN.md`
    - Write `$SCRATCH/scripts/assemble.js`. It uses the GitHub slug function to build the table of contents from the H2 list, concatenates the parts in the Requirement 2.3 order, and writes `PAGE_TECHNICAL_BREAKDOWN.md` at the repository root with one H1.
    - H2 order: Table of contents (with the "Source snapshot" H3), Glossary, Rendering definitions and route inventory, Shared layout, Jewelry page breakdowns, Starter demo page breakdowns, Route handler and special file breakdowns, Middleware and configuration, API mapping, Data flow, Codebase references, Existing doc verification, Final validation, Final report.
    - Add short stubs for `Final validation` and `Final report`, written as plain sentences that state the section is filled after the checks run. Do not use the markers `TBD`, `TODO`, or `lorem ipsum`.
    - Confirm that this is the only file written into the repository.
    - _Requirements: 1.1, 1.2, 1.5, 2.1, 2.3, 13.1, 13.3, 13.4, 13.5_

- [ ] 11. Validation and final report
  - [~] 11.1 Write the check script (V1, V2, V4, V5, V6, V7)
    - Write one file, `$SCRATCH/scripts/check.js`, that reads the deliverable and the repository and prints a result and the failing elements for each check. Use the same slug function as `assemble.js`.
    - V1 route coverage: every route in `routes.computed.txt` is in the inventory table, every inventory Page has an H3 section, and each section's non-linking summary row count equals its Row_Detail (H4) count.
    - V2 path existence: every inline-code token that starts with a repository directory prefix or names a known root file exists, tested with bracket segments quoted and Absent routes excluded.
    - V4 secret scan: read `.env` into memory only, test the deliverable for each value (length 6 or more, shorter values as whole-word matches), apply the pattern pass (private key header, `AKIA`, `AIza`, credential assignments, `user:pass@` URLs, base64 or hex strings of 32 characters or more), and confirm environment variable names appear without values. Print key names only, never values.
    - V5 git status: compare `git status --porcelain` and the manifest with `baseline.status` and `baseline.manifest`, ignoring `.kiro/specs/` paths, and expect `?? PAGE_TECHNICAL_BREAKDOWN.md` as the only difference. Support a `--git` flag that runs only this check.
    - V6 placeholder scan: placeholder markers, `lorem ipsum` (case-insensitive), and empty table cells.
    - V7 totals: derive Jewelry_Page count, Starter_Demo_Page count, UI_Section count (Shared_Layout counted once), unique endpoint count by the counting rule, the local data module count, and the Existing_Doc error count from the tables, and compare them with the `Final report` numbers. Support a `--counts` flag that only prints the derived counts.
    - _Requirements: 3.1, 3.2, 3.3, 8.7, 9.7, 11.4, 13.6, 13.7, 14.2, 14.3, 14.5, 14.6, 14.7_

  - [~] 11.2 Set up the Mermaid parse attempt (V3)
    - In `$SCRATCH/tools`, try tier 1 (`npm install --prefix` for `@mermaid-js/mermaid-cli`, then `npx mmdc` per block), then tier 2 (`mermaid` and `jsdom` with `mermaid.parse()`).
    - Write `$SCRATCH/scripts/mermaid-check.js` that extracts every fenced `mermaid` block from the deliverable and reports a result per block.
    - Never touch `package.json`, `package-lock.json`, or `node_modules` in the repository. If both tiers fail to install or run, record the failure message so V3 can be marked `Blocked`.
    - _Requirements: 10.6, 14.4_

  - [~] 11.3 Fill the Final report and the Final validation section
    - Run `node $SCRATCH/scripts/check.js --counts`. Write the `Final report` part: file location, page totals (separate counts and their sum), UI_Section total, unique endpoint total with the counting rule restated in one sentence and the local module count, the `Item | Section | Missing evidence` table of every `Unknown` and unresolved question (collected by hand), and the Existing_Doc error count with a link to `Existing doc verification`. Keep the report as the last H2.
    - Write the `Final validation` part as a table `Step | Status | Command | Result | Blocked reason` for V1 to V7 (route coverage, path existence, Mermaid parse, secret scan, git status, placeholder scan, totals reconciliation) with every status set to `Not run`. Copy the exact commands so a reviewer can repeat them. Describe placeholder markers in words and do not write the literal markers.
    - State in the section that the checks are scripts over finite sets and that no property-based testing library was used. State that table shape, Row_Detail completeness, the local module rule, shared layout links, heading outline, reference ledger, API classification, Unknown ledger, Existing_Doc set differences, visual order, "How it works" accuracy, diagram accuracy, terminology consistency, and docs-before-claims order were reviewed manually. State that `npm run lint` and `npm run build` were not run and why.
    - Re-run `assemble.js`.
    - _Requirements: 9.7, 14.1, 14.8, 14.9, 15.1 to 15.7_

  - [~] 11.4 Run the checks once and record the results
    - Run `node $SCRATCH/scripts/check.js` and `node $SCRATCH/scripts/mermaid-check.js` on the assembled document.
    - Fix failures by correcting the document (edit the part file and re-run `assemble.js`), not the checks. If a check itself is wrong, fix the check and note it. Re-run only the failing check after a fix.
    - Replace the status words and result text in the `Final validation` part with the real results, using `Passed`, `Failed`, `Not run`, or `Blocked`. Mark V3 `Blocked` with the failure message when no parser ran, and add "manual rule review done on N diagrams, no parser run". Re-run `assemble.js`.
    - _Requirements: 14.2, 14.3, 14.4, 14.5, 14.7, 14.8, 14.9_

  - [~] 11.5 Run the final git status check and write the chat summary
    - Run `node $SCRATCH/scripts/check.js --git`. Confirm `git status` shows `PAGE_TECHNICAL_BREAKDOWN.md` as the only change attributable to this feature, apart from `.kiro/specs/` files. Update the V5 row in the `Final validation` part and re-run `assemble.js`.
    - In the chat reply, list which validation steps passed, failed, were not run, or were blocked, using the same words as the document. State that the Mermaid step is `Blocked` if no parser ran, that lint and build were not run, and that no Application_Source file was modified. Then stop.
    - _Requirements: 1.2, 1.3, 14.6, 14.9_

- [~] 12. Final checkpoint - Confirm the deliverable
  - Confirm `PAGE_TECHNICAL_BREAKDOWN.md` exists at the repository root, that it is the only new file in the repository from this feature, and that validation results match the document. Ask the user if questions arise.

## Notes

- All tasks are required. The optional script tasks from the earlier plan (the classification recompute script, the Existing_Doc set check, the Unknown ledger check, and the checker self-test) are removed.
- Requirement 14 checks done by script: route coverage (14.2), path existence (14.3), Mermaid parse (14.4, by `mermaid-check.js`), secret scan (14.5), git status (14.6), and totals (14.7). The placeholder scan (13.7) is also scripted.
- Checks done by hand instead of by script: table shape and column order (4.1 to 4.5, 9.1, 13.2); Row_Detail field completeness and the N/A and Unknown reason rules (5.2 to 5.10); the local module rule (5.7); shared layout linking (4.6, 7.6); heading levels, unique headings, and TOC anchors (2.1, 2.3, 13.4, 13.5); the codebase reference ledger (11.1 to 11.3, 11.5); API classification and the endpoint counting rule (9.2 to 9.5); the Unknown ledger in the final report (15.6); Existing_Doc set differences and quote limits (12.2 to 12.6); and validation record integrity (14.1, 14.8, 14.9). The Final validation section says these were reviewed manually.
- Validation runs once. The final report and validation section are written with every status `Not run` before the run, so the run covers the final text. Later edits change only status and result cells. The only re-run afterward is the V5 `git status` check in task 11.5.
- The checks do not test themselves. A pass means the checks found nothing, not that every defect would be caught.
- The Mermaid step may end `Blocked` if the sandbox blocks package installation. That is a valid outcome and is recorded as such.
- Each task references specific requirements for traceability.
- Parallel tasks write to separate files (`parts/*.md`, `ledger/<task-id>.tsv`, `notes/*`) so that no two tasks in a wave write the same file.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "3.2"] },
    { "id": 3, "tasks": ["3.1", "4.1", "6.1", "6.2"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3"] },
    { "id": 5, "tasks": ["8.1"] },
    { "id": 6, "tasks": ["8.2"] },
    { "id": 7, "tasks": ["9.1"] },
    { "id": 8, "tasks": ["10.1"] },
    { "id": 9, "tasks": ["10.2"] },
    { "id": 10, "tasks": ["11.1", "11.2"] },
    { "id": 11, "tasks": ["11.3"] },
    { "id": 12, "tasks": ["11.4"] },
    { "id": 13, "tasks": ["11.5"] }
  ]
}
```
