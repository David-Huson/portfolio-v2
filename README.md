# David Huson's portfolio

A static Astro portfolio at [me.davidhuson.dev](https://me.davidhuson.dev). The personal portfolio documents David's work and engineering decisions; commercial services live at [davidhuson.dev](https://davidhuson.dev).

## Development

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The project uses Astro 3.6.4 and system fonts. Page rendering and navigation require no client JavaScript. `npm run check` syncs Astro's generated types and invokes the installed `astro-check` binary directly because Astro 3's dependency resolver does not recognize the current checker's exports-only package.

## Content

Projects are Markdown files in `src/content/projects`. Existing slugs are stable and are also redirect targets from the consulting site. `archived: true` identifies earlier coursework. Article headings generate the contents navigation. Optional `role` and `diagram` frontmatter provide context without requiring a project image.

A semantic diagram has a title, caption, ordered `steps` with `label` and `detail`, and an optional `annotation` with `title` and `body`. The schema validates this structure. Diagrams adapt to their own available width and remain readable without JavaScript. The parser and Python-to-Lisp studies show examples.

Writing lives in `src/content/writing`. Drafts are excluded from both development views and production pages, RSS and sitemap. The six existing drafts still need factual completion before publication. Do not promote their provisional metrics into homepage copy.

## Design and validation

The selected system is Working journal, with optional semantic diagrams from Systems atlas. See [the final specification](docs/portfolio-design-system.md), [discovery](docs/portfolio-redesign-discovery.md), and [implementation plan](docs/portfolio-implementation-plan.md). The four-direction comparison remains in `docs/portfolio-directions` as design history.

`node scripts/verify-redesign.mjs` verifies a production preview at `http://127.0.0.1:4329`. Set `PREVIEW_ORIGIN` to change the origin. It expects Playwright available locally or through `PLAYWRIGHT_MODULE`; `CHROME_PATH` selects an existing browser, and `AXE_PATH` enables WCAG-oriented axe checks. Validation output is written to `docs/portfolio-validation`. These tools are separate from the site's runtime.

## Deployment

Keep the existing Vercel project `portfolio-v2`. `astro.config.mjs` sets the canonical origin to `https://me.davidhuson.dev`; output is static `dist`. Preview deployments must not change production aliases, DNS, mail or the consultancy application's redirects. DAV-20's cutover/rollback documentation remains in `docs/dav-20`.

Legacy public assets, especially the externally linked PDF and MP4, remain available. The redesign no longer loads the old decorative backgrounds. The original site used Jeanine White's Astro portfolio theme; the current editorial layout replaces its presentation while retaining useful content and assets.
