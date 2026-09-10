# Working journal implementation validation

Branch: `codex/portfolio-journal-implementation`. Selected direction A with optional semantic diagrams from B. Production aliases and main were not changed.

## Verified implementation

- `npm run check`: 20 files, zero errors, warnings or hints. Strict Astro TypeScript configuration.
- `npm run build`: ten static HTML pages, including the custom 404, plus RSS and sitemap.
- Browser verification: all ten pages at 320, 390, 768, 1024 and 1440px, 50 configurations, zero failures.
- Axe: all ten pages at 390px, WCAG 2 A/AA and 2.1 AA rules, zero violations in the final run.
- Doubled computed text sizes at 390px and 1440px: no page overflow.
- Keyboard skip links, native diagram disclosures, navigation without JavaScript, missing-page and draft-route 404s all pass.
- Local links resolve; canonical and OG origins remain `me.davidhuson.dev`; draft content is absent from pages and feeds.
- Homepage HTML: 10,534 bytes raw, 3,226 bytes gzip. Shared emitted CSS: 7,733 bytes raw. No emitted JavaScript and no third-party requests in the checked pages.
- Removed unused React, motion, modal and mail dependencies after migrating callers. The entire compiled output is byte-identical before and after that dependency cleanup; see `dependency-cleanup.json`.
- Existing public assets and redirected PDF/video remain unchanged. Favicon intentionally replaces the old Astro logo.

The checks caught long-heading reflow at narrow/enlarged sizes and syntax colors calibrated for a dark background. Headings now wrap; syntax uses GitHub Light on its intended white code background. Diagrams now respond to their container width so their stage sequence never wraps into an ambiguous second row.

## Performance

Local Lighthouse mobile run: performance 100, accessibility 100, best practices 100, SEO 100. FCP 0.8s, LCP 0.9s, total blocking time 0ms, CLS 0, speed index 1.0s. See `lighthouse-home.json`.

This is a local lab run, not field Core Web Vitals or a guarantee of real-network timings. No INP field measurement or screen-reader certification is claimed. The final CSS correction after this homepage run only restored the default white background of code blocks on project articles; browser/axe checks ran against that final output.

## Remaining content and tooling work

The design and implementation are complete for the available publishable content. The portfolio still needs at least one confirmed professional case study to meet the original flagship-professional-evidence objective. David was asked for role, constraint, architectural decision and outcome; no new account was supplied during implementation. The site does not pretend that coursework is professional delivery and does not publish the six incomplete drafts or their unconfirmed metrics.

The retained Astro 3 toolchain does not have a clean npm audit: 26 package findings, including one critical package classification for Astro, remain after unused dependency removal. The audit includes server/image/SSR and development-server advisories; this deployment emits static files and no server runtime. Build and development tooling still require a deliberate supported-version upgrade. Do not interpret Lighthouse or static-output checks as resolving those advisories. No forced major-version upgrade was bundled into the visual redesign.

## Reproduce

Run `npm run check`, `npm run build`, and `npm run preview -- --host 127.0.0.1 --port 4329`.

Then run `scripts/verify-redesign.mjs` with the existing Playwright module and installed Chrome. Optional `AXE_PATH` points to axe-core. See the root README for environment variables. This script records checks and actual screenshots in this directory. It adds nothing to the site's shipped JavaScript.

Vercel preview details and hosted validation are recorded separately after deployment.

## Hosted preview

Preview: https://portfolio-v2-r8f2t519g-david-husons-projects.vercel.app

Deployment `dpl_2K8PvLVnM55K7RxsY4g9Kqtr7G8F` is READY in the existing `david-husons-projects/portfolio-v2` Vercel project, from application commit `4644fc2`. The installed CLI 34 was rejected by Vercel's endpoint; a temporary CLI 59 completed the preview without changing the global CLI installation.

All ten HTML routes, feeds, robots, PDF and video match the local build. Vercel appends its own preview-feedback script to the homepage and 404 response; the verifier records that exact addition and excludes only that known trailing script when comparing application bytes. The application still emits no JavaScript. Draft and missing routes return 404. The production subdomain still serves the previous design.

See `hosted-checks.json` and `scripts/verify-hosted-redesign.mjs`. No production promotion or main merge was performed.
