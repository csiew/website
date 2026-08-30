# Phase 3 — Server-rendered outliner

Description: Replace the homepage presentation with the five-node leaf-only outliner and ensure all navigation remains server-rendered and no-JavaScript discoverable.

Status: Planned
Priority: P0
Depends on: Phase 2

## Goal

Replace the current hero and selected-item lists on `/` with a server-rendered outliner containing About, Posts, Projects, Things of interest, and Contact. About is a leaf with no children; other sections expose only their child title links. Do not render page previews, excerpts, metadata, thumbnails, or full content in the tree.

## Scope

Touch:
- `src/pages/index.astro`;
- a new `src/components/Outline.astro` and recursive `src/components/OutlineNode.astro`, or an equivalent Astro-only implementation;
- a shared `src/lib/outline.ts` route/tree builder;
- `src/styles/home.css` and any new outline stylesheet for structural layout only;
- `src/components/PostList.astro`/`ProjectList.astro` only if shared leaf rendering is appropriate;
- tests under `tests/outliner/`.

Do not change:
- the full content bodies or presentation of Post, Project, Interest, About, or Contact destination pages;
- disclosure interaction implementation beyond the structural hooks needed by Phase 4;
- URLs, fragments, query parameters, or history state when rendering the tree;
- the compact NavBar implementation from Phase 1;
- Feed, which is removed.

## Pre-implementation Check

- Confirm Phase 2 provides valid Interest index data and local section routes.
- Confirm public/private filtering and ordering rules for Posts and Projects.
- Enumerate the expected top-level routes and leaf paths before changing `index.astro`.
- Confirm the homepage still emits Person/WebSite structured data through `BaseLayout.astro`.

## Current Behaviour

- `/` renders a hero, four selected projects, and three recent public posts.
- Posts and Projects are not represented as full leaf trees on the homepage.
- Things of interest and Contact are not represented in the homepage navigation.
- The homepage has no explicit five-node outliner or structural disclosure hooks.

## Target Behaviour

- `/` renders exactly these top-level nodes in the agreed order: About, Posts, Projects, Things of interest, Contact.
- About is a direct `/about` link with no disclosure button or child list.
- Posts, Projects, Things of interest, and Contact have child branches whose leaves are ordinary canonical links.
- The tree contains labels and links only. There are no page previews, excerpts, thumbnails, dates, tags, status fields, or inline Markdown bodies.
- Rich Interest leaves link to `/interests/<slug>`; URL-only Interest leaves link directly to their external URL with external-link semantics and an indicator hook.
- All tree nodes and links are present in server HTML. JavaScript is not required to discover or follow them.
- Clicking a title/link uses normal browser navigation; no client router or URL mutation is introduced.

## Contract Gates

requirements_mode: explicit
graph_review_required: true

```yaml
gates:
  - gate: C1
    owned: true
    requirement: R1
    positive_tests:
      - 'tests/outliner/structure.test.ts::it("renders the five top-level nodes in order")'
    negative_tests:
      - 'tests/outliner/structure.test.ts::it("does not render the former hero or selected-only homepage lists")'
  - gate: C2
    owned: true
    requirement: R2
    positive_tests:
      - 'tests/outliner/structure.test.ts::it("renders About as a leaf and exposes child branches for the other sections")'
    negative_tests:
      - 'tests/outliner/structure.test.ts::it("does not render a disclosure button or children under About")'
  - gate: C3
    owned: true
    requirement: R4
    positive_tests:
      - 'tests/outliner/links.test.ts::it("uses canonical local and external hrefs for every leaf")'
    negative_tests:
      - 'tests/outliner/links.test.ts::it("does not intercept title links or add query/hash route state")'
  - gate: C4
    owned: true
    requirement: R6
    positive_tests:
      - 'tests/outliner/structure.test.ts::it("renders leaf labels without page preview fields or content bodies")'
    negative_tests:
      - 'tests/outliner/structure.test.ts::it("does not render excerpts, thumbnails, tags, dates, or Markdown bodies in the tree")'
  - gate: C5
    owned: true
    requirement: R13
    positive_tests:
      - 'tests/outliner/no-js.test.ts::it("discovers all top-level and leaf links with JavaScript disabled")'
    negative_tests:
      - 'tests/outliner/no-js.test.ts::it("does not require a client fetch or hydration to render the tree")'
```

## Surface Matrix

| Surface | Expected behaviour after this phase | Verification |
|---|---|---|
| Homepage structure | Five ordered top-level nodes; About is leaf-only | `tests/outliner/structure.test.ts` |
| Posts/Projects branches | All eligible collection entries are canonical leaf links, not only selected/recent items | `tests/outliner/links.test.ts` |
| Interests branch | Rich entries use local routes; URL-only entries use external hrefs | `tests/outliner/links.test.ts` |
| Contact branch | Child links use shared contact data and external-link attributes | `tests/outliner/links.test.ts` |
| Server rendering | Full link tree exists before hydration and in JS-disabled context | `tests/outliner/no-js.test.ts` |
| URL behaviour | Initial render and disclosure hooks do not modify URL state | `tests/outliner/links.test.ts` |
| SEO | Homepage structured data remains present; no modal/query canonical changes appear | `pnpm build`, route assertions |

## Open Questions

None. Visual spacing and interactive collapsed state are owned by Phase 4.

## Consequence Analysis

The homepage becomes a directory rather than a content feed. All public leaf links are emitted into static HTML, increasing the number of links in the document but avoiding client fetches and preserving crawlability. The lack of inline previews keeps each row visually sparse and makes the tree's information architecture explicit.

## TDD Plan

### Step 1 — Red

Add structural and no-JavaScript tests against the built site:

```ts
import { expect, test } from "@playwright/test";

test("renders the five top-level nodes in order", async ({ page }) => {
  await page.goto("/");
  const labels = await page.locator("[data-outline-root] > [data-outline-node] > [data-outline-link]").allTextContents();
  expect(labels).toEqual(["About", "Posts", "Projects", "Things of interest", "Contact"]);
});

test("discovers all top-level and leaf links with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
  await expect(page.getByRole("link", { name: "Tab Shelf" }).first()).toHaveAttribute("href", /\/projects\/tab-shelf/);
  await context.close();
});
```

Add a negative assertion that the tree HTML contains no preview-specific selectors/fields and that About has no `[data-outline-toggle]` or child list.

### Step 2 — Green

Build the outline data from full public collections and render it with Astro. Keep links ordinary:

```astro
<OutlineNode label="Projects" href="/projects" children={projectNodes} />
```

The node renderer should emit a button hook only when `children.length > 0`; it should never render content from `render()` or metadata fields in the tree.

### Step 3 — Refactor

Centralise route construction and private filtering, remove the old selected/recent homepage rendering, and keep Person/WebSite JSON-LD and `BaseLayout` metadata unchanged. Ensure no tree code depends on client state or route interception.

## Exit Criteria

- [ ] `/` renders the five top-level nodes in the agreed order.
- [ ] About is a leaf with no chevron or child nodes.
- [ ] Posts, Projects, Interests, and Contact expose complete leaf-link branches.
- [ ] No page previews or content bodies appear in the tree.
- [ ] All links are ordinary server-rendered anchors with canonical local/external destinations.
- [ ] JavaScript-disabled browsing discovers the same tree links.
- [ ] Homepage structured data and canonical metadata remain intact.
- [ ] Contract gates C1–C5 have passing evidence.
