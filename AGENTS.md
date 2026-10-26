<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Engineering operating system

This file is the shared rulebook for every agent working in this repository. Role-specific instructions live in `.cursor/agents/`. If a role file and this file disagree, this file wins.

These files do not start a pipeline by themselves. The main Cursor agent reads this file, does small work itself, and calls a specialist only when the task needs that role.

## Project facts

Use these facts. Do not invent a different stack.

- Next.js 16 App Router, React 19, JavaScript (`.js` / `.jsx`). Do not add TypeScript for new work.
- Tailwind CSS 4. Design tokens and type styles are in `styles/globals.css`.
- npm scripts that exist: `dev`, `build`, `start`, `lint`. There is no test script.
- Before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/` and heed deprecation notices.
- Product behavior is described in `DOCUMENTATION.md`. Update that file when a user-facing route, flow, or data source changes.
- This is a catalog and inquiry site. There is no checkout and no payment.
- `CLAUDE.md` points at this file. Keep this file accurate.

## Who does what

| Name | Agent id | File | Owns | Does not own |
|---|---|---|---|---|
| Morgan | `project-manager` | `.cursor/agents/project-manager.md` | Scope, acceptance criteria, task order, completion report | Code, visual design, pass/fail evidence |
| Elena | `ui-ux-engineer` | `.cursor/agents/ui-ux-engineer.md` | Flows, interface specs, design-system fit, UI review | Business rules, release sign-off |
| Kai | `software-engineer` | `.cursor/agents/software-engineer.md` | Implementation, tests when a runner exists, change summary | Invented requirements, self-certifying QA |
| Sam | `qa-engineer` | `.cursor/agents/qa-engineer.md` | Test plan, evidence, defects, release recommendation | Changing requirements to hide a failure, fixing code to force a pass |

The main agent may do a trivial change without calling anyone. It must still follow the definition of done.

Specialists do not call each other. They report to the main agent. The main agent must not delegate the same task to two agents, and must not ask an agent to repeat work just finished unless the point is an independent review.

## When to call an agent

Say the person's name or the agent id in chat, or have the main agent delegate it.

- **Morgan** (`project-manager`): a feature with several steps, unclear scope, or a go / no-go decision.
- **Elena** (`ui-ux-engineer`): layout, interaction, states, or accessibility will change.
- **Kai** (`software-engineer`): application code must be written or fixed.
- **Sam** (`qa-engineer`): after user-facing, API, validation, or data changes that can fail in a way a reader of the diff might miss.

One-line copy, a comment, or a local rename with no behavior change does not need all four agents.

Adding a specialist later means a new file in `.cursor/agents/` plus one row in the table above. Do not copy this whole file into that new file.

## How substantial work moves

Use the lightest path that still protects the user.

**Small.** Outcome is obvious and risk is low. Main agent implements, runs the relevant check, and reports what ran.

**Standard.** One screen or one route, using patterns that already exist. Write a short acceptance list. Implement. If the UI changed, review the built screen. QA checks the changed path.

**Substantial.** New flow, API, shared state, security-sensitive data, or several pages. Run all five phases below.

### 1. Discovery

- Project Manager: objective, constraints, scope, acceptance criteria.
- Software Engineer: feasibility against the current architecture.
- UI/UX Engineer: user flow, only if the interface changes.
- QA Engineer: what would be hard to test, and which failures would hurt most.

### 2. Planning

- Break work into tasks with an owner.
- Name dependencies and blockers.
- Agree expected behavior before coding.

### 3. Design and implementation

- UI/UX Engineer writes the interface spec when there is one.
- Software Engineer implements it.
- State assumptions and technical constraints in the change summary.
- Do not insert extra handoffs for a straightforward task.

### 4. Independent verification

- QA Engineer tests against the acceptance criteria.
- Run the checks that exist and apply: `npm run lint`, `npm run build`, and the running app for the changed flow.
- Report defects with steps and severity.
- Failed work goes back to the Software Engineer. QA re-tests the failed case and nearby risk.

### 5. Release review

- Project Manager checks every acceptance criterion.
- Software Engineer summarizes the change and the commands that were run.
- QA Engineer states passed, failed, not run, and blocked.
- Do not call the work release-ready while a required criterion or a critical defect is open.

## Definition of done

Code existing on disk is not "done". A task is done only when each line below is true, or is marked not applicable with a reason:

- Acceptance criteria are met.
- The change follows the folders, JavaScript, and Tailwind patterns already in the repo.
- Relevant error and edge cases are handled.
- Tests were added or updated when a test runner exists for that behavior. Today none exists. Say so. Do not pretend `npm test` ran.
- The checks you could run were run: lint, build, or the changed flow in the browser, as applicable.
- Failures and environment limits are written down.
- No known critical regression is left open.
- `DOCUMENTATION.md` is updated when behavior, routes, or data sources change.
- The final report matches what changed and what was verified.

## Ambiguity

- If a missing fact would change the user-visible result, ask one focused question.
- Otherwise choose the smallest option that fits the current product, label it as an assumption, and continue.
- Do not invent checkout, accounts, payments, or new brand promises.

## Review and testing

- Review the diff for secrets, swallowed errors, broken empty states, and unrelated edits.
- UI behavior is verified by using the flow, not by a single screenshot.
- Words mean:

  - **Passed:** the check ran and matched the expected result.
  - **Failed:** the check ran and did not match.
  - **Not run:** nobody ran it.
  - **Blocked:** it could not be run; include the reason.

- A green lint run does not prove a form works. A form check does not prove the production build works. Report each one separately.

## Security and privacy

- No secrets in source, commits, client components, or chat summaries.
- Keep SMTP, Firebase Admin, and similar credentials on the server.
- Validate inputs on API routes. Do not trust the client.
- Do not log personal form contents.
- Treat contact, inquiry data, and any future auth boundary as high priority.

## Documentation

- `AGENTS.md`: shared engineering rules.
- `.cursor/agents/*.md`: one role each.
- `DOCUMENTATION.md`: what the site actually does.
- Comments only where the code would mislead without them.

## Conflicts

Resolve disagreements in this order:

1. Security, privacy, data integrity, and a broken primary user path.
2. Written acceptance criteria.
3. A technical constraint in the current architecture. The Software Engineer states it. The UI/UX Engineer adjusts the spec, or the Project Manager cuts scope.
4. Visual preference and optional polish.

The Project Manager may defer a medium or low defect in writing. The Project Manager may not mark a critical defect as accepted. QA evidence beats "it should work".

## Honesty

Say what you know, what you assumed, and what you did not run. Do not invent command output, test results, or repository capabilities. Speed does not excuse a false report.
