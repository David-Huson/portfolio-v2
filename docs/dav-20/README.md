# DAV-20 portfolio migration

Verified September 9, 2026 CDT. The existing Astro portfolio is live at
[me.davidhuson.dev](https://me.davidhuson.dev), without a redesign or content rewrite.

## Deployment and verification

- Preview: `portfolio-v2-asiq87qtd-david-husons-projects.vercel.app`
- Production: `portfolio-v2-ntd0ppw3b-david-husons-projects.vercel.app`
- Production deployment: `dpl_5yXxYtBAPikufXCoWtHwzCA7CYLM`
- All nine visual routes, RSS, sitemap, robots.txt, and 39 original asset hashes pass.
- All nine pages have canonical and Open Graph URLs on `me.davidhuson.dev`.
- RSS uses the new host. The sitemap includes published routes only.
- Missing portfolio paths return 404. Mobile menu and contact mailto link work.
- HTTPS verification used normal certificate validation throughout.
- DNS and email records were not changed.

See [live checks](live-verification.json), [preview checks](preview-verification.json),
and [rollback checks](rollback-verification.json).

## Redirect map

The separate consultancy application's `next.config.ts` permanently redirects
these exact old paths on the apex and www domains to the same path on `me.davidhuson.dev`:

- `/about`
- `/projects`
- `/writing`
- `/projects/image-classifier`
- `/projects/minesweeper`
- `/projects/python-fsa-generator`
- `/projects/python-lisp-fsa`
- `/projects/recursive-descent-parser`
- `/rss.xml`
- `/assets/files/Project_2_Report-compressed.pdf`
- `/assets/2D_convolution.mp4`

Query parameters survive redirects. Trailing-slash URLs normalize through Next.js
before reaching the same destination. Unknown project and writing paths remain 404.
The root homepage remains the consulting waitlist. Its launch flag was not changed.

## Tested rollback

Original deployment `dpl_12wGtavMCCeRmC7PNxjWDtycpAda` remains available at
`portfolio-v2-bu2i2a49b-david-husons-projects.vercel.app`.
We assigned it to temporary alias `dav20-rollback-check-david-husons-projects.vercel.app`,
then verified all original routes and 39 asset hashes through that alias. This
tested alias restoration without interrupting either production site. The temporary
alias was removed after verification.

To restore only the portfolio deployment:

```sh
vercel alias set portfolio-v2-bu2i2a49b-david-husons-projects.vercel.app me.davidhuson.dev
node scripts/verify-portfolio-migration.mjs --original
```

This restores the old portfolio including its original RSS host and lack of canonical
tags. The consulting root and www aliases must remain on the consultancy project.
To undo the consultancy redirect release, promote its pre-change deployment
`consultancy-business-platform-fdkubm0k1-david-husons-projects.vercel.app`.
That restores the waitlist without the new redirects. Do not move the root aliases
back to the portfolio as part of a portfolio-only rollback.

To verify the current migration:

```sh
node scripts/verify-portfolio-migration.mjs --redirect-origin https://davidhuson.dev
node scripts/verify-portfolio-migration.mjs --redirect-origin https://www.davidhuson.dev
```
