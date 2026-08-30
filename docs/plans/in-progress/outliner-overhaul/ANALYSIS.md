# Outliner interface overhaul — analysis

**Status:** Revised direction after design feedback; implementation not started  
**Scope:** Replace the current page-oriented homepage presentation with a clean, collapsible outliner.  
**Interaction contract:** the chevron is a button that only expands/collapses a branch; the section or item name is an ordinary link to its actual route. Disclosure never changes the URL.

## Problem Statement

The original proposal was a homepage place-grid whose contents opened in movable, overlapping modals. That introduced a large amount of client state and an awkward relationship between multiple windows and URL paths.

The revised direction is a single outliner-style homepage. It should expose the site's main areas and their children in a collapsible hierarchy:

```text
Clarence Siew
├── About
├── Posts
│   ├── One Year of Tab Shelf
│   ├── Tab Shelf
│   └── ...
├── Projects
│   ├── Tab Shelf
│   ├── BiscuitWM
│   └── ...
├── Things of interest
│   ├── Some rich Markdown entry
│   └── A titled external link
└── Contact
    ├── GitHub
    ├── Mastodon
    └── ...
```

The default homepage state shows the top-level nodes: About, Posts, Projects, Things of interest, and Contact. The child branches are not part of the URL and do not need persistence.

The homepage is intentionally a navigation-focused outliner. The About section is a leaf with no children and links to `/about`; its rich content belongs on that dedicated route and should not be duplicated on the homepage. The homepage therefore does not need to contain substantive About prose for crawlers or visitors.

Each row has two distinct interactions:

1. The chevron/disclosure control is a real button. It expands or collapses that branch only.
2. The section or item name is a link. Clicking it navigates to the corresponding actual route, such as `/projects`, `/projects/tab-shelf`, `/posts`, or `/posts/tab-shelf`.

The tree stops at leaf nodes. It should not render page previews, excerpts, thumbnails, metadata cards, or full Markdown bodies inside the outline. A leaf is the page/link title itself; the full content is available after following its link. The exception is that an item under Things of interest may itself be either a rich Markdown entry or a titled external URL link.

The About page content is separate from the tree and is not rendered on the homepage. The outliner contains only route/link labels, with full content available after following a link.

Expanding/collapsing must not update `location.pathname`, `location.search`, `location.hash`, browser history, or any other route state. The URL changes only when a visitor follows a page or external link.

## Historical Context

The site recently moved from a React SPA to Astro (`3a3eb01`, “Migrate to Astro”). That migration removed the former `wouter` client router, React app context/cache, Vite configuration, and React page components. The current site is intentionally a static Astro site. React is currently used only for the Mastodon Feed island, which this revision proposes to remove.

The Git history contains older modal primitives and a previous React/Next interface, but those do not exist in the current source tree and are no longer a useful basis for the primary architecture. The outliner direction avoids recreating that client-side application model.

There are no active implementation plans and no formal requirement records were found. Before this analysis, the working tree already contained dependency-version changes in `package.json` and `pnpm-lock.yaml`; those changes are unrelated and must remain separate.

## Current Architecture

### Build, hosting, and routing

- `package.json` runs `astro check && astro build`; Netlify publishes `dist` from `netlify.toml`.
- `astro.config.mjs` currently uses static output defaults, `trailingSlash: "never"`, `@astrojs/react`, `@astrojs/sitemap`, and a Markdown external-link plugin. Removing the Feed island may allow the React integration and unused React packages to be removed as well.
- Static HTML routes currently include `/`, `/feed`, `/posts`, `/posts/<slug>`, `/projects`, `/projects/<slug>`, `/tags/<tag>`, and `/404`. `/feed` is slated for removal; RSS/project-feed and sitemap endpoints remain separate TypeScript routes.
- Existing generated static routes already support direct navigation and refresh on Netlify. The outliner does not require an SPA fallback or client router.

### Layout and navigation

- `src/layouts/BaseLayout.astro` owns the complete document, canonical/OG/Twitter metadata, JSON-LD, theme initialisation, `NavBar`, main content, and footer.
- `src/components/NavBar.astro` currently uses ordinary links for `/`, `/feed`, `/posts`, and `/projects`, plus inline browser scripts for the mobile menu and theme selector. It should retain a compact utility role, remove Feed, and expose a Back button on non-homepage pages.
- `src/styles/main.css` establishes a two-column desktop layout (`218px` navigation plus main content), normal document flow, and responsive single-column behaviour below `900px`. An outliner fits this flow and does not require a fixed viewport workspace.
- `src/components/LinkGrid.astro` is currently a flex-wrapped list of external social links. It is not the homepage's current primary interface and can be refactored into shared contact data/content.

### Content and rendering

- `src/content.config.ts` defines `posts` and `projects` Astro content collections loaded from Markdown.
- `src/pages/index.astro` currently queries four recent projects and three public posts, then renders a hero and ordinary list links.
- `src/pages/posts/index.astro` and `src/pages/projects/index.astro` render full collection lists through `PostList.astro` and `ProjectList.astro`.
- `src/pages/posts/[slug].astro` and `src/pages/projects/[slug].astro` use `getStaticPaths`, `render()`, and Astro components to render Markdown at build time. Project pages additionally render screenshots, tags, stack labels, and external links.
- `src/components/Feed.tsx` is the only current React island. It fetches and parses Mastodon RSS in the browser and has loading/error states. `src/pages/feed.astro` mounts it with `client:load`; both are candidates for deletion because the Feed page is being scrapped.
- There is no client router, URL-state manager, modal/window manager, or browser test suite.

### Existing content and missing requested sections

Projects and writing already have structured data and routes. “Things of interest” and “contact details” do not currently have first-class internal pages. Social contact links are duplicated between `LinkGrid.astro` and `NavBar.astro`; the outliner should use one shared typed source.

The content contains internal links to project/post routes and one historical `/now` link, but there is no `src/pages/now.astro`. The revised outliner should not introduce an unsupported `/now` link without deciding whether `/interests` replaces it.

## Relevant Requirements

These are proposed requirements derived from the revised request, not entries in a formal requirements registry.

| ID | Requirement | Observable acceptance behaviour |
| --- | --- | --- |
| R1 | Outliner homepage | `/` presents the primary site directory as a clean, minimal hierarchical outline. |
| R2 | Top-level branches | The initial visible tree contains About, Posts, Projects, Things of interest, and Contact. About is a leaf with no children. |
| R3 | Independent disclosure control | A separate chevron button expands/collapses only a branch that has children. The control is visually distinct from the page-name link. |
| R4 | Direct page navigation | Clicking a section/item name performs ordinary navigation to its actual route, such as `/projects` or `/projects/<slug>`. |
| R5 | No disclosure URL state | Expanding/collapsing never changes `location.pathname`, `location.search`, `location.hash`, or browser history. |
| R6 | Leaf-only outline | Branches stop at leaf names/links. No page previews, excerpts, thumbnails, metadata cards, or full Markdown bodies are rendered in the tree. |
| R7 | Things-of-interest content model | An interest entry has required post-like metadata and can contain rich Markdown or be a titled URL-only link, with appropriate internal or external navigation. |
| R8 | Section routes | About, Posts, Projects, Things of interest, and Contact have Astro route destinations. |
| R9 | Feed retirement | The `/feed` page and browser Feed island are removed. Blog/project RSS endpoints remain available. |
| R10 | Existing route preservation | Existing post, project, tag, RSS, sitemap, asset, and 404 routes continue to work directly and on refresh. |
| R11 | Content/SEO preservation | Markdown rendering, project media, external links, private-post filtering, canonical URLs, metadata, JSON-LD, RSS, and sitemap behaviour remain correct. |
| R12 | Accessibility | Disclosure controls and links have distinct names, visible focus, correct expanded state, keyboard support, and no misleading ARIA tree semantics. |
| R13 | No-JavaScript navigation | The server-rendered homepage contains the complete outliner and ordinary links. JavaScript is not required to discover or navigate to About, Posts, Projects, Interests, or Contact. |
| R14 | No persistence | Disclosure state resets on navigation/reload. It is not stored in the URL, local storage, or session storage. |
| R15 | Responsive presentation | The outline remains readable and operable on narrow screens without desktop-only positioning or modal behaviour. |
| R16 | Verification | Build output, navigation/disclosure separation, route retirement, route preservation, keyboard behaviour, no-JavaScript output, mobile layout, and regressions are covered by automated and visual/manual checks. |

## Requirement Impact

### Directly affected

- Homepage composition/data/styles: `src/pages/index.astro`, `src/styles/home.css`.
- Outline rendering and disclosure controls: likely a new `Outline.astro`/`OutlineNode.astro` component and a small enhancement script.
- Post/project leaf generation: `src/components/PostList.astro`, `src/components/ProjectList.astro`, or new compact outline-specific renderers.
- Things-of-interest content: `src/content.config.ts`, a new `src/content/interests/` collection, and new `/interests` route files.
- Contact/About destinations: new `src/pages/about.astro` and `src/pages/contact.astro`, or shared Astro components used by them.
- Contact/social data: `src/components/LinkGrid.astro`, `src/components/NavBar.astro`, and a shared typed data source.

### Indirectly affected

- `src/layouts/BaseLayout.astro` and `src/styles/main.css`: likely small structural/style adjustments, not a window-layer rewrite.
- `src/pages/posts/[slug].astro` and `src/pages/projects/[slug].astro`: remain full-page destinations for leaf links and can remain server-rendered.
- `src/components/Feed.tsx` and `src/pages/feed.astro`: should be deleted, along with `src/styles/feed.css` and the `BaseLayout.astro` import if no other feed styling remains.
- `NavBar.astro`: should become compact utility navigation with the Feed link removed and a Back button shown on non-homepage pages.
- Sitemap and metadata: new local routes must be included correctly; URL-only interest leaves should not be treated as local pages unless they have a generated route.
- Testing setup: there is no current test script or browser test suite, so the interaction separation and raw HTML output need explicit verification.

The requirements scan found no formal requirement IDs currently attached to these files. Evidence will need to be established by build, route, accessibility, and browser interaction checks.

## Requirement Gaps

The previously identified gaps are resolved as follows:

1. **Preview depth — resolved:** there are no page previews. The outline stops at leaf names/links. Full content is opened through the normal destination route.
2. **Branch ownership — resolved:** Things of interest should follow the blog-post architecture. Add an Astro content collection where entries can contain rich Markdown, or represent a titled URL-only link. Interest entries require rich metadata; the collection/index route owns the branch; rich entries get local detail routes; URL-only entries point directly to their external destination.
3. **Section link targets — resolved:** the top-level sections should have Astro routes: `/about`, `/posts`, `/projects`, `/interests`, and `/contact`.
4. **Initial disclosure state — resolved:** the server-rendered homepage always shows the five top-level nodes. About is a leaf with no children. Other child branches are collapsed by the enhanced UI by default, while their complete leaf links remain present in the raw HTML.
5. **Persistence — resolved:** disclosure state is ephemeral and resets on navigation/reload. No URL, local storage, or session storage state is needed.
6. **Icon/affordance — resolved:** the expand/collapse affordance is a real `<button>` with an accessible name and `aria-expanded`; the section/item title is a separate `<a>`.
7. **No-JavaScript content — resolved:** the complete outliner is server-rendered as ordinary links. No JavaScript is required to discover or navigate the site. The rich About content belongs only on `/about`; it is not duplicated on the homepage.
8. **Feed retirement — resolved:** remove `/feed`, its Feed island, feed-specific stylesheet, navigation link, and now-unused React integration/dependencies if no other React usage remains. Keep RSS endpoints.
9. **Interest metadata — resolved:** define required post-like metadata for every Interest entry, including URL-only entries.
10. **External URL convention — resolved:** URL-only Interest leaves use the existing external-link convention (`target="_blank"` and `rel="noreferrer"`).
11. **Utility navigation — resolved:** retain `NavBar` as compact utility navigation, remove Feed, and add a Back control on non-homepage pages.

Remaining implementation questions are intentionally limited to schema/detail choices rather than the primary architecture.

## Proposed Requirement Changes

Adopt the following defaults for implementation:

- The homepage remains `/` and contains the outliner. There is no fragment, query parameter, `history.state`, or client-side route update for branch expansion.
- The initial visible hierarchy contains About, Posts, Projects, Things of interest, and Contact. About is a leaf with no children; other child lists are rendered in the document but collapsed after the disclosure enhancement initialises.
- A section/item name is always a normal link when it represents a page. The chevron is a separate button and never shares the link's click target.
- Add `/about`, `/interests`, and `/contact` Astro pages alongside the existing `/posts` and `/projects` section pages. About content is rendered only on `/about`, not duplicated on the homepage. Remove `/feed` and keep `/tags/<tag>` as an existing route.
- Add an `interests` content collection with required post-like metadata and the post-style SEO/media fields, plus an optional external URL. A rich entry uses `/interests/<slug>`; a URL-only entry links directly to its supplied external URL using the external-link convention and a visible external-link indicator. The `/interests` index lists both kinds.
- Retain `NavBar` as compact utility navigation. Remove its Feed link and add a Back button on non-homepage pages, with a safe `/` fallback when browser history cannot go back.
- Use no page previews in the outline. Child nodes are title/link leaves only. Rich Markdown, excerpts, images, tags, dates, and project metadata remain on destination pages rather than being repeated in the tree.
- Do not implement internal-link interception. Native links provide the correct URL, browser history, refresh, accessibility, and no-JavaScript behaviour by default.
- Use a custom disclosure row composed of a real button and a real link. Native `<details>/<summary>` is attractive for simple disclosure, but putting a link inside a clickable `<summary>` creates an ambiguous interaction and nested interactive controls. A small delegated script can manage the button state without introducing React or a client router.
- Do not use `role="tree"` unless the project is prepared to implement the full tree keyboard interaction model. A nested list of disclosure buttons and links is sufficient and more robust.
- Do not render the child container with server-side `hidden` content if that would make the raw no-JavaScript document sparse. The full outline should exist in HTML; the enhanced script can apply collapsed state after load.

## Contract Ledger

| Contract | Current evidence | Required change / verification |
| --- | --- | --- |
| Static build and direct route generation | `package.json` build script; `astro.config.mjs`; `src/pages/**`; `netlify.toml` | Keep Astro static output. Build must emit every canonical route, including new section/interest routes, and direct navigation must return a document. |
| Homepage metadata and structured data | `src/pages/index.astro`; `BaseLayout.astro` JSON-LD and OG fields | Replace hero/list presentation with the outliner while retaining Person/WebSite structured data and homepage metadata. About body content is not duplicated on the homepage. |
| Initial tree structure | Current homepage only renders selected project/post lists | Render About, Posts, Projects, Things of interest, and Contact as server-generated top-level nodes. About has no children; verify all expected other leaf links exist in raw HTML. |
| About destination | No current `src/pages/about.astro` route | Add the full About page at `/about`. Keep its rich content out of the homepage. |
| Collection filtering and ordering | `src/content.config.ts`; `index.astro`; `posts/index.astro`; `projects/index.astro` | Reuse public filtering and sensible ordering for Posts, Projects, and Interests. Private posts must not appear in the public outline. |
| Interest entries | No current collection or routes | Add a post-like `interests` collection supporting rich Markdown and URL-only entries, required metadata, an `/interests` index, and detail routes only where appropriate. |
| Leaf rendering | `PostList.astro`, `ProjectList.astro`, collection schemas | Add compact leaf links without excerpts, thumbnails, metadata cards, or inline page content. Verify each title points to the canonical destination. |
| Markdown rendering | `posts/[slug].astro` and `projects/[slug].astro` call `render()` | Leave full Markdown rendering in destination routes. Add equivalent rendering for rich interest entries. |
| Private post policy | Posts list filters `private`; detail pages set `noindex`; sitemap filter in `astro.config.mjs` | Private posts must not appear in the outline. Preserve current direct-route/noindex policy unless explicitly changed. |
| Feed retirement | `feed.astro` mounts `Feed.tsx` with `client:load`; `Feed.tsx` is the only React island | Delete the Feed page/component/styles and remove the React integration/dependencies if no other usage remains. Keep RSS endpoints. |
| Navigation semantics | Current components use ordinary `<a>` elements | Keep ordinary same-origin and external anchors. No `pushState`, fragment updates, or link interception for disclosure. URL-only Interest links use the existing external-link convention. |
| Disclosure semantics | No current disclosure component | Add separate button/link controls. The button updates `aria-expanded` and visibility only; the title link navigates. Test that each click has only its intended effect. |
| No-JavaScript content | Current Astro pages server-render their content | Ensure the raw homepage includes all top-level and leaf labels/links. JavaScript may collapse the already-rendered tree visually but must not be required for discovery; no About body duplication is required. |
| Layout and responsive behaviour | `main.css` normal flow; `home.css` hero/list layout | Replace home-specific layout with indented, nested rows and connector/chevron styling. Test at existing mobile breakpoints and avoid fixed overlays. |
| Theme | Inline theme script in `BaseLayout.astro`; nav listens for `themechange` | Outliner rows, chevrons, links, focus outlines, and connector lines must use existing light/dark CSS variables. |
| Deployment and auxiliary endpoints | `netlify.toml`, RSS routes, sitemap integration | No SPA rewrite should be introduced. Verify RSS, projects XML, robots, sitemap, assets, 404, and new local routes. |

## Proposed Solution

### Architecture: keep Astro, use minimal enhancement

The outliner does not justify a React + Vite migration. It can be rendered almost entirely by Astro:

- Astro renders the complete tree and leaf links at build time.
- Existing Astro routes remain the destinations for full pages, including the rich About page at `/about`.
- New About, Interests, and Contact section routes are statically generated by Astro.
- A small inline or external browser script handles branch disclosure.
- The Feed page/island is removed. If no other React usage remains, remove the React integration and dependencies as cleanup.

This keeps the implementation close to the current architecture and avoids client-side content handoff, dynamic HTML fragment fetching, modal state, and SPA metadata problems.

### Outline data model

Introduce a shared typed description for the navigation tree, either in `src/lib/site.ts`, a new `src/lib/outline.ts`, or a dedicated component module. A node should distinguish at least:

- `label` — visible section or leaf name;
- `href` — local route or external URL;
- `kind` — section, post, project, interest, contact, or external link;
- `children` — nested nodes, when the branch is expandable;
- `defaultOpen` — the intended enhanced disclosure state.

It should not include a page-preview payload. The rendered tree needs only labels and links, with optional non-content affordance data such as whether a node has children. Rich About content belongs only to the `/about` route and is not part of this tree model or the homepage.

Posts and projects should be derived from the same `getCollection()` data used by their full list pages. Unlike the current homepage, the outline will likely need all public post/project entries so every leaf is discoverable. This adds metadata links to the homepage but does not duplicate Markdown bodies.

### Things-of-interest collection

Model Things of interest similarly to blog posts. A new `interests` collection could load Markdown files from `src/content/interests/` and support two entry forms:

- **Rich entry:** frontmatter plus Markdown body, rendered at `/interests/<slug>`.
- **URL-only entry:** title/slug plus an external `url`, with no required body; the leaf points directly to that URL.

Required shared fields should follow the Posts metadata contract: `title`, `slug`, `subtitle`, `publishedAt`, and `tags`. The Interest schema should also use the post-style SEO/media fields `keywords`, `image`, and `imageAlt`, rather than introducing a reduced metadata shape. A discriminated `kind`/`type` field or schema refinement should ensure that a URL-only entry has a valid `url`, while a rich entry has a local detail route and Markdown body. The `/interests` Astro index should list both forms. The outliner only needs the title/href for each leaf; the full rich entry is rendered on its destination page.

This preserves the flexibility requested without introducing a second ad hoc link registry for things of interest. It also allows future entries to start as a simple URL and become a full Markdown post without changing the top-level information architecture.

### Section routes

Add local Astro routes for the top-level navigable sections:

- `src/pages/about.astro` — the full About destination; its rich content is not rendered on the homepage;
- `src/pages/posts/index.astro` — existing Posts page;
- `src/pages/projects/index.astro` — existing Projects page;
- `src/pages/interests/index.astro` — the mixed rich-entry/URL-only Interests page;
- `src/pages/contact.astro` — contact/social details rendered from shared data.

The homepage outliner should link each top-level label to these routes. About is a leaf with no children. Other branches may expose leaf links. For example, clicking the Projects label navigates to `/projects`; clicking its chevron reveals project leaf links; clicking a project leaf navigates to `/projects/<slug>`.

Contact children can remain external URLs even though the Contact section itself has a local `/contact` route. URL-only Interest children follow the same rule and use `target="_blank"` with `rel="noreferrer"`. They should also display a visible external-link indicator, with an accessible text equivalent so the icon is not the only cue.

### Compact utility navigation

Keep `NavBar.astro` as a compact utility layer rather than the primary content directory. Remove its Feed entry. On non-homepage pages, render a Back control; the enhanced button should call `history.back()` and use `/` as its ordinary-link fallback when there is no usable previous page. The utility navigation must not become another source of disclosure or route-stack state.

### Visual density baseline

“Not too dense” should mean a sparse, single-column directory rather than a grid of cards or a metadata-heavy file browser:

- show only the five top-level rows by default; child lists become visible only after their button is activated;
- use one row per section/leaf, with no excerpts, dates, tags, thumbnails, or secondary metadata in the tree;
- give top-level rows generous vertical spacing (roughly `0.8–1rem` of row padding) and leaf rows comfortable but smaller spacing (roughly `0.45–0.65rem`);
- indent child lists by approximately `1.25–1.5rem` per level and use a subtle connector/chevron treatment rather than cards or boxed panels;
- keep the outline in one readable column with a sensible maximum text width, rather than placing branches side-by-side;
- use whitespace between top-level branches so an expanded Projects or Posts list still reads as a hierarchy instead of a dense table.

Because the browser-enhanced default keeps child lists collapsed, the visitor initially sees only five clear choices. The no-JavaScript version may show the complete link tree for discoverability, but it remains sparse because every node is only a labelled link.

### Split-control markup

A row should conceptually look like:

```html
<li class="outline-node">
  <div class="outline-row">
    <button
      type="button"
      class="outline-toggle"
      aria-label="Expand Projects"
      aria-expanded="false"
      aria-controls="outline-projects"
    >
      <span aria-hidden="true">›</span>
    </button>
    <a class="outline-link" href="/projects">Projects</a>
  </div>
  <div id="outline-projects" class="outline-children">
    <ul>
      <li><a href="/projects/tab-shelf">Tab Shelf</a></li>
      <li><a href="/projects/biscuitwm">BiscuitWM</a></li>
    </ul>
  </div>
</li>
```

The button is the only disclosure target. The anchor is the only navigation target. The chevron should rotate when expanded, but the icon itself should not be the sole source of meaning; the button's accessible name and `aria-expanded` state carry the semantics.

A leaf without children should omit the toggle rather than render a disabled-looking chevron. A node may have both a route and children: `/projects` navigates to the full Projects page, while the chevron reveals project leaf links.

The child container should use a stable ID and be associated with `aria-controls`. The enhancement script should toggle `aria-expanded`, a collapsed state/class, and visibility consistently. The server should still emit the child list as ordinary HTML so no-JavaScript users and crawlers can read it.

### Disclosure script

A small delegated script attached to the outliner root is sufficient:

- find the nearest `[data-outline-toggle]` button on click;
- find its controlled child container;
- toggle `aria-expanded` and the child container's visibility;
- update the chevron state/class;
- support Enter/Space through native button behaviour;
- do not call `history.pushState`, modify `location`, or intercept clicks on anchors;
- do not store the state in local storage or session storage.

To support no-JavaScript navigation, the server-rendered homepage must contain the complete outliner and its local/external links as ordinary HTML. The enhancement can add a root “JS available” marker and then apply the default collapsed presentation to child lists; without the marker/script, the page remains a readable, fully expanded, link-rich outline. The rich About content is intentionally available only at `/about` and is not required on the homepage.

If animated opening is desired, use a simple height/opacity transition only after the functional behaviour is correct. Respect `prefers-reduced-motion`.

### Route and refresh behaviour

The route model becomes conventional and predictable:

- `/` renders the outliner;
- `/about` renders the full About content as its dedicated page;
- `/posts` renders all Posts;
- `/posts/<slug>` renders a full post;
- `/projects` renders all Projects;
- `/projects/<slug>` renders a full project;
- `/interests` renders the mixed Interests index;
- `/interests/<slug>` renders a rich interest entry when the entry has a Markdown body;
- `/contact` renders Contact details;
- `/tags/<tag>` remains an existing auxiliary/content route; `/feed` is removed;
- expanding a branch leaves the URL completely unchanged;
- following a title link performs normal browser navigation and naturally supports Back, Forward, refresh, sharing, canonical metadata, and no JavaScript.

No URL restoration or disclosure persistence logic is required.

## Consequence Analysis

### Benefits

- Much smaller implementation and maintenance surface than a window manager.
- No ambiguity between a modal's visual state and its URL.
- Existing Astro routes remain the source of truth for full content.
- Native browser navigation, refresh, Back/Forward, SEO, and no-JavaScript behaviour continue to work.
- The homepage remains a deliberately compact navigation directory rather than duplicating the About page.
- The complete site structure is present as ordinary server-rendered links and discoverable without JavaScript.
- The outline can expose every post/project/interest title without duplicating long Markdown bodies.
- Mobile layout is naturally handled by normal document flow and indentation.
- No new router, React state architecture, fragment payloads, or SPA fallback is needed.

### Costs and complexity

- A split row must be designed carefully so the chevron and title link do not have overlapping click targets.
- A custom disclosure control needs a small amount of JavaScript because a normal `<summary>` makes the whole summary row the toggle target.
- The complete server-rendered tree can be long, even though the enhanced browser view starts with branches collapsed.
- The homepage HTML contains every leaf link, so collection ordering and private filtering must be correct.
- Things of interest needs a proper collection schema and two destination behaviours: local rich Markdown versus direct external URL.
- New About, Interests, and Contact routes require metadata and content decisions, although they are straightforward Astro pages.

### Consequences for React + Vite

A React + Vite migration is even less justified for this direction. The only interactive behaviour is a handful of disclosure buttons, and the current Astro pages already provide the required routing and content rendering. React could implement the outline, but doing so would add hydration and client-state complexity without solving an existing problem.

## Risk and Edge Case Inventory

- **Chevron/link separation:** clicking the chevron must not navigate; clicking the label must not toggle the branch. Test both independently.
- **Keyboard behaviour:** buttons must be reachable and operable with Tab, Enter, and Space; links must remain separate tab stops with distinct names.
- **ARIA semantics:** do not claim a full tree widget unless implementing tree keyboard navigation. Use nested lists, buttons, and links.
- **No JavaScript/crawlability:** the raw homepage must contain all top-level and leaf labels/links. Do not rely on JS to fetch or generate tree nodes. Do not use server-side `hidden` in a way that makes the no-JavaScript navigation document sparse; the rich About page is available at `/about`.
- **Nested branches:** toggling a parent should reveal or hide its children without changing the state of nested branches unless that behaviour is explicitly chosen.
- **No persistence:** reloads and normal page navigation reset disclosure state to the default. No storage or URL state should be introduced accidentally.
- **Private posts:** private posts are currently filtered from lists and sitemap but statically generated with `noindex`; they must not appear in the public outline.
- **Interest entry validation:** URL-only interest entries need valid external URLs; rich entries need a local slug/detail route. Invalid mixed entries should fail the build/schema check.
- **Interest route generation:** do not generate an empty or misleading rich detail page for URL-only entries unless that behaviour is explicitly selected.
- **Content size:** the outline should contain labels/links only. Full Markdown bodies, iframes, screenshots, and galleries remain on destination pages.
- **External links:** Contact and URL-only Interests may open external destinations; preserve `target`, `rel`, and normal browser semantics where currently configured. Use a visible external-link indicator with an accessible equivalent.
- **Feed retirement:** remove the dynamic Mastodon Feed route/island and its page-specific styles. Preserve only the independent RSS endpoints.
- **Empty branches:** a section with no children should still have a useful page link or should not be presented as expandable.
- **Missing routes:** the historical `/now` link has no current Astro route. Do not create outline links to unsupported paths without deciding whether `/now` or `/interests` replaces it.
- **Theme:** chevrons, links, focus outlines, and nested connector lines must work in both light and dark themes.
- **Reduced motion:** disclosure animations must be disabled or minimised under `prefers-reduced-motion`.
- **Responsive density:** indentation and nested lists must collapse cleanly on small screens; avoid horizontal scrolling.
- **URL invariants:** browser tests should assert that disclosure changes leave pathname, search, hash, and history untouched.
- **Raw HTML verification:** tests should inspect built HTML or use a no-JavaScript browser context to confirm that all branch/leaf links are discoverable without scripts, and separately verify the full About content at `/about`.
- **Deployment:** confirm static route files, RSS, sitemap, assets, 404, and new local routes after the change.
- **Unrelated worktree changes:** dependency updates already present in `package.json`/`pnpm-lock.yaml` must not be mixed into the outliner work.

## Suggested Implementation Sequence

1. **Confirm route/content contract:** create the top-level route map for `/about`, `/posts`, `/projects`, `/interests`, and `/contact`; confirm the compact NavBar and Back-button fallback behaviour.
2. **Retire Feed:** delete `/feed`, `Feed.tsx`, feed-specific styles, the NavBar Feed link, and unused React integration/dependencies if the rest of the site has no React usage. Preserve RSS endpoints.
3. **Add the Interests model:** define the post-like `interests` collection with required metadata and URL-only entries, add schema validation, index/detail routes, and shared ordering/filtering.
4. **Add About/Contact destinations:** create the full About page and Contact page with correct metadata. Do not render the About body on the homepage.
5. **Centralise outline data:** derive public Posts, Projects, and Interests leaf links from their collections. Ensure private posts are excluded and URL-only interests point to external URLs using the existing convention.
6. **Build the server-rendered homepage:** replace the current homepage hero/list navigation with the five top-level nodes and complete nested leaf lists. About is a leaf with no children; do not include page previews or full post/project bodies in the tree.
7. **Add disclosure enhancement:** implement the real button controls, accessible state updates, default collapsed child presentation, no-URL-change guarantee, no-persistence behaviour, and reduced-motion styling.
8. **Refine utility navigation and visuals:** retain compact NavBar, add Back on non-home pages, remove Feed, and refine indentation, branch connectors, chevron states, responsive styling, focus states, and light/dark theme treatment.
9. **Verify and clean up:** run build/route checks, keyboard/browser checks, no-JavaScript/raw-HTML checks, mobile visual checks, and regressions for posts, projects, interests, tags, RSS, sitemap, private content, 404, and Feed removal.

Likely touched areas include `src/pages/index.astro`, `src/styles/home.css`, `src/content.config.ts`, new `src/content/interests/*.md` content, new `/about`, `/interests`, and `/contact` pages, `src/components/PostList.astro`, `src/components/ProjectList.astro`, `src/components/LinkGrid.astro`, `src/components/NavBar.astro`, and a new outline data/component/script file. Feed retirement may delete `src/pages/feed.astro`, `src/components/Feed.tsx`, and `src/styles/feed.css`, plus remove the `BaseLayout.astro` stylesheet import and unused React integration/dependencies. `BaseLayout.astro`, `astro.config.mjs`, `netlify.toml`, RSS routes, and the full post/project page components should otherwise remain largely unchanged.

## Leftover Ambiguities

The major behavioural and information-architecture decisions have been resolved. The exact CSS values in the visual-density baseline can be tuned during implementation and visual review, but there are no remaining product-level ambiguities recorded for this analysis.
