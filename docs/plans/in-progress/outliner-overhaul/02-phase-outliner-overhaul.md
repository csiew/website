# Phase 2 — Interest content and section routes

Description: Add the post-like Interests collection with required metadata and URL-only entries, plus About, Interests, and Contact Astro destinations.

Status: Planned
Priority: P0
Depends on: Phase 1

## Goal

Establish the static content and route foundation used by the outliner. Add an `interests` collection with the required Post-style metadata and two entry types: rich Markdown articles and URL-only external links. Add local Astro routes for About, Interests, and Contact while preserving the existing Posts and Projects route families.

## Scope

Touch:
- `src/content.config.ts` to define the `interests` collection and validation;
- `src/content/interests/*.md` for approved initial rich/link entries or representative content fixtures;
- `src/pages/about.astro`;
- `src/pages/interests/index.astro`;
- `src/pages/interests/[slug].astro` for rich entries;
- `src/pages/contact.astro`;
- `src/components/InterestList.astro`;
- `src/components/AboutContent.astro`;
- `src/lib/interests.ts` for typed entry validation and route helpers;
- `src/lib/contact.ts` for shared contact data;
- `src/styles/about.css` and any relevant shared styles;
- `src/lib/site.ts` only if shared metadata helpers need extension;
- relevant `src/styles/*.css` for destination pages, without implementing the homepage outliner yet;
- content/route tests under `tests/interests/` and `tests/sections/`.

Do not change:
- homepage composition or disclosure script;
- the existing Posts/Projects collection schemas except for shared helper extraction;
- URL-only Interest entries into local detail pages unless they are rich entries;
- RSS route formats;
- Feed, which was retired in Phase 1.

## Pre-implementation Check

- Confirm Phase 1 completed and the working tree has no Feed route/component references.
- Re-read the Posts schema in `src/content.config.ts` and the rendering/metadata contracts in `src/pages/posts/[slug].astro`.
- Decide which approved Interest content entries are being added; do not invent external destinations without content approval.
- Confirm the desired URL-only external-link convention: `target="_blank"`, `rel="noreferrer"`, and a visible indicator to be styled in Phase 4.

## Current Behaviour

- Only `posts` and `projects` are defined as Astro content collections.
- There are no `/about`, `/interests`, or `/contact` routes.
- The homepage contains the current introduction, but no dedicated About route.
- There is no way to represent a Things-of-interest entry as either rich Markdown or a titled external URL.

## Target Behaviour

- `interests` entries validate required Post-style metadata: `title`, `slug`, `subtitle`, `publishedAt`, `tags`, `keywords`, `image`, and `imageAlt` according to the agreed required/optional normalization. The entry discriminator requires either a Markdown body/local route or a valid external `url`.
- Rich Interest entries render at `/interests/<slug>` with title, subtitle, publication metadata, SEO fields, tags, media, and Markdown body using the existing Astro content conventions.
- URL-only Interest entries appear in `/interests` and point directly to their external URL with `target="_blank"`, `rel="noreferrer"`, and a visible external-link indicator.
- `/interests` lists both rich and URL-only entries without rendering their full bodies.
- `/about` is a normal Astro page containing the full About content. That content is not rendered on `/`.
- `/contact` is a normal Astro page backed by shared contact data and external links.
- Existing Posts, Projects, tags, RSS, sitemap, and 404 behaviour remain intact.

## Contract Gates

requirements_mode: explicit
graph_review_required: true

```yaml
gates:
  - gate: C1
    owned: true
    requirement: R7
    positive_tests:
      - 'tests/interests/interests-content.test.ts::it("renders a rich Interest entry with required metadata")'
      - 'tests/interests/interests-content.test.ts::it("renders a URL-only Interest entry as an external link with its indicator")'
    negative_tests:
      - 'tests/interests/interests-content.test.ts::it("rejects an Interest entry missing required metadata")'
  - gate: C2
    owned: true
    requirement: R8
    positive_tests:
      - 'tests/sections/section-routes.test.ts::it("serves About, Interests, and Contact routes")'
    negative_tests:
      - 'tests/sections/section-routes.test.ts::it("does not expose a local detail route for a URL-only Interest entry")'
  - gate: C3
    owned: true
    requirement: R11
    positive_tests:
      - 'tests/interests/interest-metadata.test.ts::it("emits canonical and social metadata for a rich Interest page")'
    negative_tests:
      - 'tests/interests/interest-metadata.test.ts::it("does not leak URL-only Interest content into a rich Markdown page")'
```

## Surface Matrix

| Surface | Expected behaviour after this phase | Verification |
|---|---|---|
| Content schema | Rich and URL-only Interest entries validate their required metadata and mutually exclusive content shape | `tests/interests/interests-content.test.ts`, `pnpm build` |
| Rich Interest route | `/interests/<slug>` renders full Markdown and Post-style metadata/media | `tests/interests/interest-metadata.test.ts` |
| URL-only Interest | Index link goes to external URL with target/rel and indicator; no local article page is generated | `tests/interests/interests-content.test.ts` |
| About | `/about` is a complete normal Astro page; homepage is not used as its content source | `tests/sections/section-routes.test.ts` |
| Contact | `/contact` renders shared contact data and external links | `tests/sections/section-routes.test.ts` |
| Existing routes | Posts, Projects, tags, RSS, sitemap, and 404 remain available | `pnpm build`, route smoke tests |

## Open Questions

None. Initial Interest content may be supplied during implementation, but the schema and route contracts are fixed by this phase.

## Consequence Analysis

The Interests collection becomes a durable content model rather than a hard-coded list. Required metadata increases editorial discipline but makes entries searchable, shareable, and consistent with Posts. URL-only entries intentionally skip a local detail page, so the index and outline must clearly signal external navigation. About becomes independently addressable; the homepage no longer duplicates its prose.

## TDD Plan

### Step 1 — Red

Create schema/route tests using one rich and one URL-only fixture:

```ts
import { expect, test } from "@playwright/test";

test("renders a URL-only Interest entry as an external link with its indicator", async ({ page }) => {
  await page.goto("/interests");
  const link = page.getByRole("link", { name: /approved external interest/i });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noreferrer/);
  await expect(link.locator("[data-external-link-indicator]")).toBeVisible();
});

test("serves About, Interests, and Contact routes", async ({ page }) => {
  for (const path of ["/about", "/interests", "/contact"]) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
  }
});
```

Add a content-schema assertion that an entry without `subtitle`, `publishedAt`, or the normalized tag/SEO/media fields fails validation before build output is emitted.

### Step 2 — Green

Define the collection discriminator and route branching. Rich entries use `render(entry)`; URL-only entries render a direct external anchor and are excluded from `[slug]` static paths. Build About and Contact pages with `BaseLayout.astro` and existing metadata helpers.

Representative route selection:

```ts
export async function getStaticPaths() {
  const interests = await getCollection("interests");
  return interests
    .filter((interest) => interest.data.kind === "article")
    .map((interest) => ({
      params: { slug: interest.data.slug },
      props: { interest }
    }));
}
```

### Step 3 — Refactor

Share list/link formatting and metadata normalization with existing Post components where useful. Keep URL-only external-link behaviour in one component so the homepage outliner and `/interests` index cannot diverge later.

## Exit Criteria

- [ ] Interest schema validates rich and URL-only forms with required Post-style metadata and SEO/media fields.
- [ ] Rich Interest entries render full local pages; URL-only entries do not generate misleading local detail pages.
- [ ] `/about`, `/interests`, and `/contact` build and have correct metadata.
- [ ] URL-only Interest links use the external-link convention and an indicator hook.
- [ ] Existing Post/Project/tag/RSS/sitemap/404 routes remain functional.
- [ ] Contract gates C1–C3 have passing evidence.
