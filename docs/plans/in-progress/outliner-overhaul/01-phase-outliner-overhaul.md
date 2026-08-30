# Phase 1 — Foundation and route retirement

Description: Remove the obsolete Feed surface, establish the verification harness, and turn the existing navigation into compact utility navigation with a Back control.

Status: Planned
Priority: P0
Depends on: none

## Goal

Remove the `/feed` page and its browser-only Mastodon implementation without disturbing the independent RSS endpoints. Establish the browser-test harness needed by later phases, and update `NavBar.astro` so non-homepage pages expose a Back button implemented with `history.back()` and a `/` fallback.

## Scope

Touch:
- `package.json` and `pnpm-lock.yaml` for test tooling and removal of unused React/Feed dependencies after usage is confirmed;
- `astro.config.mjs` to remove the React integration if no React source remains;
- `src/pages/feed.astro` (delete);
- `src/components/Feed.tsx` (delete);
- `src/styles/feed.css` (delete);
- `src/layouts/BaseLayout.astro` to remove the feed stylesheet import;
- `src/components/NavBar.astro` to remove Feed and add Back markup/behaviour;
- `playwright.config.ts`, `tests/route-retirement.e2e.ts`, `tests/utility-navigation.e2e.ts`, and related test support;
- `package.json` test scripts, without overwriting unrelated existing dependency changes.

Do not change:
- homepage composition or outliner markup;
- post/project/interest content rendering;
- RSS endpoints (`src/pages/rss.xml.ts`, `src/pages/projects.xml.ts`);
- sitemap/private-post filtering except for verifying that removal of `/feed` does not affect it;
- the existing theme selector behaviour.

## Pre-implementation Check

- Record the baseline `pnpm build` result and generated routes.
- Confirm `Feed.tsx` is the only React import/use via `rg` and inspect `astro.config.mjs`, `package.json`, and `BaseLayout.astro` before removing React dependencies.
- Check the working-tree dependency updates in `package.json`/`pnpm-lock.yaml`; preserve them while changing only dependencies required by this phase.
- Confirm `/rss.xml` and `/projects.xml` are independent of `Feed.tsx`.

## Current Behaviour

- `/feed` renders `Feed.tsx` with `client:load` and fetches Mastodon RSS in the browser.
- `NavBar.astro` exposes Feed as an internal navigation link and has no Back control.
- `BaseLayout.astro` imports `src/styles/feed.css`.
- React and `@astrojs/react` are present because of the Feed island.
- There is no test script or browser-test configuration.

## Target Behaviour

- `/feed` is no longer generated; a direct request is a normal missing route/404.
- Feed navigation, component code, and feed-specific CSS are gone.
- `/rss.xml` and `/projects.xml` still build and remain accessible.
- If `rg` confirms there is no remaining React usage, `@astrojs/react`, `react`, `react-dom`, and unused React type/config dependencies are removed consistently from package configuration and the lockfile.
- `NavBar.astro` remains a compact utility layer, with no Feed link. On a non-homepage page it exposes a Back control whose enhanced action calls `history.back()`; the underlying link falls back to `/` when browser history cannot go back.
- A repeatable Playwright command can run route/navigation tests against the built site.

## Contract Gates

requirements_mode: explicit
graph_review_required: true

```yaml
gates:
  - gate: C1
    owned: true
    requirement: R9
    positive_tests:
      - 'tests/route-retirement.test.ts::it("preserves the blog and projects RSS endpoints after Feed removal")'
    negative_tests:
      - 'tests/route-retirement.test.ts::it("does not generate or link to the /feed page")'
  - gate: C2
    owned: true
    requirement: R10
    positive_tests:
      - 'tests/utility-navigation.test.ts::it("renders a Back control on a non-homepage route")'
    negative_tests:
      - 'tests/utility-navigation.test.ts::it("does not render the Feed navigation link")'
  - gate: C3
    owned: true
    requirement: R16
    positive_tests:
      - 'tests/route-retirement.test.ts::it("builds the static site and starts the browser-test server")'
    negative_tests:
      - 'tests/route-retirement.test.ts::it("does not leave an orphaned Feed import or stylesheet reference")'
```

## Surface Matrix

| Surface | Expected behaviour after this phase | Verification |
|---|---|---|
| Static routing | `/feed` is absent while `/rss.xml` and `/projects.xml` remain available | `tests/route-retirement.e2e.ts`, `pnpm build` |
| Utility navigation | Feed is absent; Back appears away from `/` and has a `/` fallback | `tests/utility-navigation.e2e.ts` |
| Package/runtime | No unused React runtime remains if Feed was the only consumer; Playwright command is available | `pnpm lint`, `pnpm build`, `pnpm test:e2e -- --list` |
| Document styles | `BaseLayout.astro` no longer imports feed-only CSS | `tests/route-retirement.test.ts::it("does not leave an orphaned Feed import or stylesheet reference")` |
| SEO/feeds | Existing RSS/project-feed output is unchanged | `tests/route-retirement.e2e.ts` and generated-file assertions |

## Open Questions

None. The only conditional is mechanical: remove React packages only after confirming no remaining source usage.

## Consequence Analysis

This phase removes a dynamic external fetch surface and may remove the React integration entirely, reducing runtime complexity. It also introduces a browser-test dependency and a small Back-control script. The Back control must preserve progressive enhancement: JavaScript improves history navigation, but a normal `/` link remains usable without JavaScript.

## TDD Plan

### Step 1 — Red

Add route-retirement and utility-navigation tests before deleting the implementation:

```ts
import { expect, test } from "@playwright/test";

test("does not generate or link to the /feed page", async ({ page }) => {
  const response = await page.goto("/feed");
  expect(response?.status()).toBe(404);
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Feed" })).toHaveCount(0);
});

test("preserves the blog and projects RSS endpoints after Feed removal", async ({ request }) => {
  expect((await request.get("/rss.xml")).ok()).toBeTruthy();
  expect((await request.get("/projects.xml")).ok()).toBeTruthy();
});
```

Add a Back test that visits `/projects`, then activates the control and asserts a return to the previous route; separately replace the history entry with `/projects` and assert the fallback reaches `/`.

### Step 2 — Green

Delete Feed files and references, update package/config integration, and add the utility markup with a progressive fallback:

```astro
<a href="/" data-nav-back>Back</a>
<script is:inline>
  document.querySelector("[data-nav-back]")?.addEventListener("click", (event) => {
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  });
</script>
```

The final implementation should also restrict this control to non-homepage pages and retain the current theme/menu scripts.

### Step 3 — Refactor

Centralise the navigation condition/helper, remove duplicate Feed route definitions, keep RSS routes untouched, and ensure the Playwright server/test command is documented in `package.json` without absorbing unrelated package changes.

## Exit Criteria

- [ ] `/feed`, `Feed.tsx`, and feed-specific CSS/imports are removed.
- [ ] Feed is absent from navigation and no orphaned imports/references remain.
- [ ] RSS/project-feed endpoints still build and respond successfully.
- [ ] Back control uses `history.back()` with `/` fallback and works without JavaScript as a normal link.
- [ ] Playwright tests can run against a built/preview site.
- [ ] `pnpm build` and `pnpm lint` pass.
- [ ] Contract gates C1–C3 have passing evidence.
