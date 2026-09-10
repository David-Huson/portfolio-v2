# Portfolio redesign discovery

Audited September 9, 2026. Repository `David-Huson/portfolio-v2`, local checkout `/Users/david/Development/portfolio/portfolio-v2`. Starting commit `cfcd3ea`. Exploration branch `codex/portfolio-redesign` starts from the completed DAV-20 cutover branch, not the older main branch. The working tree was clean before branching.

## Executive finding

The presentation promises a senior healthcare data engineer but supplies coursework as its primary evidence. Fix that mismatch before adding visual polish. Preserve the candid decisions and limitations in the project writing. Develop the professional case studies from facts David can substantiate. Their unpublished drafts are leads for an interview, not publication-ready evidence.

## Runtime and deployment

- Astro 3.6.4 installed, with Vite 4.5.1. Static output into `dist`. React 18 integration exists. No framework change justified.
- `npm run dev`, `npm run build`, `npm run preview`. Existing package-lock retained. TypeScript extends Astro's base preset; stricter flags such as noImplicitAny are commented out. No lint/test/check script declared.
- Dependencies include Astro RSS, React, SendGrid; development dependencies include Framer Motion and react-modal. No active motion-library use or hydrated React island found in source. Build emits a 142.13 kB React client artifact; its existence does not prove it is requested by pages.
- Vercel project `portfolio-v2`, production branch main in the prior inventory. Existing `.vercel/project.json` links the checkout. No Sites manifest. Preserve Vercel and static Astro. No Cloudflare migration or registration.
- `astro.config.mjs` explicitly sets `site: 'https://me.davidhuson.dev'`. This is the canonical origin and must survive the redesign.
- DAV-20 documentation records the portfolio live at the subdomain as of September 9, normal TLS validation, and no DNS/email changes. DAV-17's older domain and TLS inventory predates this cutover and is not the current configuration.
- The consultancy application redirects exact legacy paths from apex and www to the portfolio, including project routes, RSS, the PDF and video. Preserve those destinations. Do not move apex aliases or alter DNS, mail, consultancy launch flags, or its redirect configuration.
- DAV-20 includes a tested rollback deployment and migration verifier. Its asset-hash checks intentionally enforce the old presentation's assets, so keep it as cutover evidence rather than silently rewriting its expectations for a redesign.
- `npm run build` passed at baseline, generating ten HTML pages including 404, RSS and sitemap endpoints. No production release performed in this exploration.

## Current information architecture and routes

| Route | Current content | Disposition |
| --- | --- | --- |
| `/` | Greeting, role pills, portrait, skills, four archive tiles, large contact CTA | Replace with engineering profile and evidence hierarchy |
| `/projects/` | Five archived coursework projects | Preserve route, relabel Work; explicit archive |
| `/projects/recursive-descent-parser/` | Lexer, parser, symbols, IR and error handling | Preserve URL and detailed writing |
| `/projects/image-classifier/` | Small CNN, tuning and generalization limits | Preserve URL, partner attribution, report and caveats |
| `/projects/minesweeper/` | Recursive flood fill and stack-depth tradeoff | Preserve URL and algorithm explanation |
| `/projects/python-fsa-generator/` | Text-to-diagram using Tkinter | Preserve URL and layout-engine limitations |
| `/projects/python-lisp-fsa/` | Python generating Lisp source | Preserve URL and two-stage debugging tradeoff |
| `/about/` | Healthcare role, location, education, mentoring and interests | Preserve, rewrite for brevity |
| `/writing/` | Empty in production; six drafts in development | Preserve endpoint; omit primary-nav promotion until published |
| `/writing/[...slug]/` | Drafts appear only outside production | Preserve production draft filtering |
| `/rss.xml` | Published writing only, currently empty | Preserve on subdomain |
| `/sitemap.xml` | Home, indexes, About, projects, published writing | Preserve and update deliberately for any added pages |
| `/404` | Existing error page | Restyle with new navigation |

Astro file routing uses Markdown collections and dynamic `getStaticPaths`. Content schema requires project title, description, date, tags and image; `archived` defaults false. Writing has optional updated date and `draft` defaults true. Professional case studies need a content model for role, constraints, decisions, outcomes and publication readiness, not an obligatory thumbnail.

## Components and styling

`BaseLayout` composes MainHead, Nav, Footer and decorative backgrounds. MainHead imports global CSS. Hero, Grid, PortfolioPreview, Pill, Skills, CallToAction and ContactCTA supply the template. Icon/IconPaths and ThemeToggle are utilities. Page-local scoped CSS duplicates article styling across project and writing routes.

`src/styles/global.css` provides gray ramps, purple accents, gradients, layered shadows, typography sizes and spacing utilities, plus a reversed dark theme. Layout widths are 83rem; the major responsive breakpoint is 50em. The default body clips horizontal overflow, which can hide layout defects. The redesign should fix overflow at its source.

Fonts name Montserrat, Hind Madurai, Lora and Rubik with system fallbacks. MainHead preloads Google CSS URLs as if they were font files, without a corresponding stylesheet load. `font-display` is placed on html/body instead of an `@font-face` declaration. Actual rendering may therefore use fallbacks. Resolve font loading explicitly in implementation.

Nav is a JS-enhanced custom element with a no-JS menu fallback. The active-link `aria-current` is boolean instead of the preferred page token. Mobile menu lacks explicit aria-controls and Escape behavior. Theme choice uses localStorage and MutationObserver; storage access can throw in restricted contexts. ViewTransitions is imported but no component is rendered. No need to preserve these abstractions merely for continuity.

No active analytics SDK or event tracking found in portfolio source. Do not inherit consultancy PostHog by accident. Decide analytics separately if requested.

## Assets

`public/assets` is approximately 2.3 MB. DAV-20 records 39 original asset hashes. There are WebP portraits, a personal About photograph, project illustrations/thumbnails, ML diagrams, a PDF report and convolution MP4, plus light/dark gradient JPEG/SVG backgrounds and noise texture. No bundled font assets.

Keep the portrait for personal context, the report, source links and instructional diagrams. Project thumbnails often look like generic illustrations rather than actual software, so do not let them carry proof of implementation. Use semantic diagrams and real excerpts instead. Retain externally redirected PDF/video URLs even if the redesigned page no longer foregrounds them. Leave all original assets untouched during exploration.

## Metadata and accessibility

Canonical URLs and og:url already use Astro.site. Per-page titles/descriptions exist, but homepage defaults are generic. Description/og:description share one meta element; separate them in implementation. No social preview image or structured data found. RSS and sitemap exclude drafts in production. Robots points to the subdomain sitemap.

Semantic main regions exist but some page headers are outside main. Homepage hierarchy skips levels. No skip link found. Some article image width/height attributes are percentages, weakening intrinsic sizing. Several back links disappear on mobile. Global reduced-motion rules and systematic visible focus treatment are absent. Color contrast needs measurement rather than inference from the palette. Keyboard, zoom, touch targets, no-JS navigation and narrow code/diagram layouts need explicit checks.

## Content worth preserving

1. The healthcare platform scope in Home, Skills and About: AWS Lambda/SQS/ECS, Kotlin services, PostgreSQL/Supabase and Kimball models.
2. The expressed focus on auditable recovery and replacing fragile manual processes.
3. The parser article's exact grammar, error recovery choice and honest coursework boundary.
4. The classifier's distinction between validation score and generalization, plus Joel Ward's attribution.
5. The FSA and Minesweeper articles' explicit tradeoffs.
6. David's mentoring approach, Fort Worth location, UWF education and personal interests.
7. Professional profile and contact links already in the repository.

## Evidence ledger and publication gates

| Story | Evidence available | Missing before professional case-study publication |
| --- | --- | --- |
| Recoverable ingestion | Published role/Skills overview; unpublished SQS draft | Actual stages, ownership, idempotency key, retry policy, retention/replay mechanism, incident timeline and evidence for zero permanent loss |
| Right-sized warehouse | Published PostgreSQL/Supabase/Kimball overview; unpublished warehouse draft | Confirm 53 GB figure, workload/concurrency, growth, cost comparison, isolation controls and decision thresholds |
| Vendor integration | Unpublished ODBC and Kotlin drafts | Real topology, vendor constraints, access arrangement, onboarding mechanism, observed failures, throughput and David's individual role |
| Report automation | Unpublished report draft | Verify above-70% error claim, denominator, sampling period, error categories, comparison method and outcome |
| Access control | Published high-level role overview; unpublished technical draft | Actual enforcement and read-audit boundaries, role/pool behavior, examples and review evidence |
| Real-time collaboration/internal workflow | User brief names these areas | Named project, repository or sanitized system description, ownership and outcomes |

No résumé file or confirmed résumé URL found. Do not create a dead résumé CTA. No invented scale, tenure, client names or metrics. Concepts may use labeled proposed titles and explicitly illustrative diagrams. Publication must not expose TODO drafts. The case-study specimen uses the already-published parser story so the design can be tested against real depth without inventing healthcare details.

## Relationship to the business site

The consultancy uses warm paper, dark teal, Georgia, system sans and mono, with a services-led narrative. The personal site can share direct language, David's name, and a restrained serif/sans relationship while using a different composition. Consulting belongs in the footer or About as a secondary outward link to `https://davidhuson.dev`.

## Scope of this branch

The user elected to review four directions before selection. This branch contains discovery, product/IA reasoning, independent static prototypes and evaluation. No production source, dependencies, routes, infrastructure or content publication changes before selection. After selection, create an implementation branch from this exploration commit, write the final specification and plan, then implement and validate through the existing deployment workflow.
