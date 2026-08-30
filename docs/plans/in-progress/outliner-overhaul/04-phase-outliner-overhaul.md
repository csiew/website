# Phase 4 — Disclosure behaviour and visual verification

Description: Implement accessible chevron disclosure, responsive sparse styling, external-link indicators, automated checks, and final route/SEO validation.

Status: Planned
Priority: P0
Depends on: Phase 3

## Goal

Make the server-rendered outliner pleasant and accessible in the browser without changing its route semantics. Add button-only disclosure, default-collapsed child branches, sparse single-column styling, visible external-link indicators, responsive behaviour, reduced-motion handling, and final integration verification.

## Scope

Touch:
- the outline component/script hooks created in Phase 3;
- `src/styles/home.css` and any outline stylesheet;
- `src/components/NavBar.astro`/navigation styles for the compact Back control if visual work remains;
- `src/styles/main.css` only where required for responsive integration;
- Playwright specs under `tests/outliner/`, `tests/integration/`, and final route/SEO checks;
- `package.json` scripts/config only if the test harness needs final wiring.

Do not change:
- the route/content model established in Phases 1–3;
- the Interest schema or rich page rendering except to expose the agreed indicator markup;
- the no-preview tree contract;
- browser history for disclosure interactions;
- RSS endpoints or the already-retired Feed page.

## Pre-implementation Check

- Confirm Phase 3 has stable `data-outline-*` hooks and all branches/links are present before enhancement.
- Confirm the intended default: top-level rows visible, About has no toggle, child lists collapsed only in the enhanced browser presentation, and no persistence.
- Confirm the external-link indicator has an accessible text equivalent and does not rely on an icon alone.
- Confirm existing light/dark CSS variables and the `900px`/`640px` responsive breakpoints.

## Current Behaviour

- The structural outliner exists but has no final disclosure interaction or sparse visual treatment.
- Child content is server-rendered and may be fully visible before enhancement.
- There is no tested guarantee that chevron clicks and title-link clicks remain independent.
- External URL leaves have no consistent visible indicator.
- Responsive, reduced-motion, keyboard, and URL-invariance behaviour are not yet verified.

## Target Behaviour

- Each expandable branch has a real button with `aria-expanded`, `aria-controls`, an accessible name, and a visible chevron state.
- About has no disclosure button because it is a leaf.
- With JavaScript enabled, child branches start collapsed; clicking a chevron reveals only its branch. The visitor initially sees five clear top-level choices.
- Clicking a section/item name follows its normal link and changes the URL only through browser navigation.
- Disclosure clicks do not change pathname, search, hash, history, storage, or sibling branch state.
- URL-only Interest and other external leaves show a visible external-link indicator with an accessible equivalent, while retaining `target="_blank"` and `rel="noreferrer"`.
- Styling is a sparse one-column outline: generous top-level spacing, smaller but comfortable leaf rows, moderate indentation, subtle connectors, no cards, no metadata columns, and no dense grid.
- Mobile remains readable without horizontal scrolling. `prefers-reduced-motion` disables or minimises disclosure animation.
- The no-JavaScript page remains a fully navigable server-rendered link tree; rich About content is verified separately at `/about`.

## Contract Gates

requirements_mode: explicit
graph_review_required: true

```yaml
gates:
  - gate: C1
    owned: true
    requirement: R3
    positive_tests:
      - 'tests/outliner/disclosure.test.ts::it("expands and collapses only the branch controlled by the clicked button")'
    negative_tests:
      - 'tests/outliner/disclosure.test.ts::it("does not toggle or navigate when the section title link is clicked")'
  - gate: C2
    owned: true
    requirement: R5
    positive_tests:
      - 'tests/outliner/disclosure.test.ts::it("keeps pathname, search, hash, and history unchanged when disclosure toggles")'
    negative_tests:
      - 'tests/outliner/disclosure.test.ts::it("does not write disclosure state to storage or URL parameters")'
  - gate: C3
    owned: true
    requirement: R12
    positive_tests:
      - 'tests/outliner/accessibility.test.ts::it("exposes named disclosure buttons and expanded state without treating the outline as an ARIA tree")'
    negative_tests:
      - 'tests/outliner/accessibility.test.ts::it("does not render a toggle for the About leaf")'
  - gate: C4
    owned: true
    requirement: R15
    positive_tests:
      - 'tests/outliner/responsive.test.ts::it("keeps the outline readable at mobile and desktop viewports")'
    negative_tests:
      - 'tests/outliner/responsive.test.ts::it("does not introduce horizontal overflow at the mobile viewport")'
  - gate: C5
    owned: true
    requirement: R16
    positive_tests:
      - 'tests/integration/build-and-routes.test.ts::it("builds and serves all retained canonical routes and auxiliary endpoints")'
    negative_tests:
      - 'tests/integration/build-and-routes.test.ts::it("does not emit the retired feed route or disclosure query/hash variants")'
```

## Surface Matrix

| Surface | Expected behaviour after this phase | Verification |
|---|---|---|
| Disclosure controls | Button-only toggles, correct ARIA state, no sibling side effects | `tests/outliner/disclosure.test.ts`, `tests/outliner/accessibility.test.ts` |
| Navigation | Title links navigate normally; disclosure does not alter URL/history | `tests/outliner/disclosure.test.ts` |
| External links | URL-only Interest leaves show visible indicator and target/rel semantics | `tests/outliner/external-links.test.ts` |
| Desktop layout | One-column sparse outline with moderate indentation and connectors | `tests/outliner/responsive.test.ts`, visual snapshots |
| Mobile layout | No horizontal overflow; controls remain usable | `tests/outliner/responsive.test.ts` |
| Reduced motion | Disclosure animation is disabled/minimised when requested | `tests/outliner/accessibility.test.ts` and CSS inspection |
| Static output | Retained routes, RSS, sitemap, 404, assets work; Feed is absent | `tests/integration/build-and-routes.test.ts`, `pnpm build` |

## Open Questions

None. Exact spacing values may be adjusted during visual review without changing the behavioural contract.

## Consequence Analysis

This phase introduces the only meaningful client-side behaviour in the new homepage, but it remains a small progressive enhancement rather than an application runtime. The server document remains authoritative. Default-collapsed presentation is applied only when JavaScript is available so no-JavaScript users retain the full link tree.

The visible external-link indicator improves recognition of URL-only Interest leaves, while its accessible text equivalent prevents the icon from becoming a semantic dependency. The sparse visual baseline keeps expanded branches readable without recreating the density of a metadata table.

## TDD Plan

### Step 1 — Red

Add interaction and accessibility assertions:

```ts
import { expect, test } from "@playwright/test";

test("keeps pathname, search, hash, and history unchanged when disclosure toggles", async ({ page }) => {
  await page.goto("/");
  const before = await page.evaluate(() => ({
    href: location.href,
    length: history.length
  }));
  const toggle = page.getByRole("button", { name: /expand projects/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(await page.evaluate(() => location.href)).toBe(before.href);
  expect(await page.evaluate(() => history.length)).toBe(before.length);
});

test("does not render a toggle for the About leaf", async ({ page }) => {
  await page.goto("/");
  const about = page.getByRole("link", { name: "About" });
  await expect(about.locator("xpath=preceding-sibling::button")).toHaveCount(0);
});
```

Add viewport and external-link assertions, including a no-horizontal-overflow check:

```ts
test("does not introduce horizontal overflow at the mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
```

### Step 2 — Green

Implement delegated disclosure with a per-button controlled ID and no history/storage calls:

```ts
outline.addEventListener("click", (event) => {
  const button = (event.target as Element).closest("[data-outline-toggle]");
  if (!(button instanceof HTMLButtonElement)) return;
  const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
  if (!panel) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  panel.toggleAttribute("hidden", expanded);
});
```

Add the sparse one-column CSS baseline, visible chevron state, external-link icon/text, mobile rules, focus styles, and reduced-motion override.

### Step 3 — Refactor

Keep the enhancement scoped to the outline root, remove duplicate event listeners, ensure nested branches retain their own state when a parent is toggled, and use CSS variables shared with the existing theme. Add final route/build assertions and visual snapshots only after functional assertions pass.

## Exit Criteria

- [ ] Chevron controls are real buttons with correct names, `aria-expanded`, and `aria-controls`.
- [ ] About remains a leaf without a toggle.
- [ ] Disclosure toggling affects only the intended branch and never changes URL/history/storage.
- [ ] Title links navigate normally and external Interest links show accessible indicators with target/rel semantics.
- [ ] Sparse desktop and mobile styles meet the visual-density baseline without horizontal overflow.
- [ ] Reduced-motion behaviour is covered.
- [ ] Retained routes, RSS, sitemap, 404, and assets pass final checks; `/feed` remains absent.
- [ ] `pnpm build`, `pnpm lint`, and the browser test suite pass.
- [ ] Contract gates C1–C5 have passing evidence.
