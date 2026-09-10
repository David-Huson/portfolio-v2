# DAV-17 current-site inventory and rollback record

Captured on September 7, 2026 CDT before the business-site cutover. Production and DNS were inspected without making changes.

## Source checkpoint

- Repository: [David-Huson/portfolio-v2](https://github.com/David-Huson/portfolio-v2)
- Production branch: `main`
- Deployed source checkpoint: [`2be70ca55f50d05407431395ea9346e06c385205`](https://github.com/David-Huson/portfolio-v2/commit/2be70ca55f50d05407431395ea9346e06c385205)
- Deployment: `dpl_12wGtavMCCeRmC7PNxjWDtycpAda`
- Immutable deployment URL: [portfolio-v2-bu2i2a49b-david-husons-projects.vercel.app](https://portfolio-v2-bu2i2a49b-david-husons-projects.vercel.app)

The local checkout was six commits behind production when discovery started. It was fetched and this inventory branch was created from `origin/main` at the deployed commit. The deployed commit already exists on GitHub, so restoration does not depend on this machine.

## Deployment

Vercel project `portfolio-v2` serves the site from the `david-husons-projects` account. It auto-detects Astro. No install, build, output, or root-directory override is set.

- Effective install command: `npm install`
- Effective build command: `npm run build`, which runs `astro build`
- Effective output directory: `dist`
- Node.js: `24.x`
- Production aliases: `davidhuson.dev`, `www.davidhuson.dev`, and the Vercel project aliases recorded in [deployment-and-dns.json](deployment-and-dns.json)
- Project environment variables: none

## DNS and certificates

Google-managed nameservers are authoritative for the zone. The relevant web records are:

| Name | Type | Value |
| --- | --- | --- |
| `davidhuson.dev` | A | `76.76.21.21` |
| `www.davidhuson.dev` | CNAME | `cname.vercel-dns.com` |
| `me.davidhuson.dev` | CNAME | `cname.vercel-dns.com` |

The apex redirects to `https://www.davidhuson.dev/` with HTTP 308. Vercel automatically manages separate Let's Encrypt certificates for the apex and `www` names. The certificates were valid during capture.

`me.davidhuson.dev` already points at Vercel, but the portfolio deployment does not have that alias and the TLS handshake fails. DAV-20 must add and verify the alias before relying on the subdomain. Preserve the Google Workspace MX records and SPF TXT record in [deployment-and-dns.json](deployment-and-dns.json) during any DNS edits.

## Routes and current content

The canonical site base in `astro.config.mjs` is `https://www.davidhuson.dev`. Individual HTML pages do not emit canonical link elements.

| Route | Current content | Source |
| --- | --- | --- |
| `/` | Current role, healthcare data-platform summary, selected projects, email CTA | `src/pages/index.astro` |
| `/about/` | Work history, skills, education, and personal introduction | `src/pages/about.astro` |
| `/projects/` | Five archived academic project entries | `src/pages/projects.astro` |
| `/writing/` | Empty published-writing state | `src/pages/writing.astro` |
| `/projects/image-classifier/` | Image-classifier project article | `src/content/projects/image-classifier.md` |
| `/projects/minesweeper/` | Minesweeper recursion project article | `src/content/projects/minesweeper.md` |
| `/projects/python-fsa-generator/` | Python FSA generator project article | `src/content/projects/python-fsa-generator.md` |
| `/projects/python-lisp-fsa/` | Python and Lisp FSA project article | `src/content/projects/python-lisp-fsa.md` |
| `/projects/recursive-descent-parser/` | C recursive-descent parser project article | `src/content/projects/recursive-descent-parser.md` |
| `/rss.xml` | RSS 2.0 feed with no items because all six writing entries are drafts | `src/pages/rss.xml.js` |
| unmatched path | Custom 404 page | `src/pages/404.astro` |

All listed live routes returned the expected 200 or 404 response during capture. The machine-readable route results, titles, content types, source mapping, and asset checksums are in [source-and-route-inventory.json](source-and-route-inventory.json).

There is no sitemap or `robots.txt`. Vercel redirects the apex to `www`; the application defines no other redirects. A trailing slash is the source convention. The site has 39 tracked public assets totaling 2,299,875 bytes. Downloads and media include:

- [Project_2_Report-compressed.pdf](https://www.davidhuson.dev/assets/files/Project_2_Report-compressed.pdf)
- [2D_convolution.mp4](https://www.davidhuson.dev/assets/2D_convolution.mp4)

## Analytics, consent, and integrations

The deployed pages load no analytics script and expose no analytics property ID or custom event names. There is no analytics consent UI. A Google Analytics property, `G-TJ3ZFBYY5C`, appears in repository history but is not present in the deployed commit.

The theme switch stores only the `theme` preference in browser local storage. The live site links to Google Fonts, GitHub, LinkedIn, Astro, and a `mailto:` address.

`@sendgrid/mail` remains in `package.json`, and the ignored local file `sendgrid.env` declares `SENDGRID_API_KEY`. No current source file imports SendGrid, no contact form exists, and Vercel has no project environment variables. The site contact path is `mailto:dhuson@davidhuson.dev`. Secret values were not copied into this inventory.

## Screenshots

Each visual route has a full-page capture at 1440 by 900 and 390 by 844. The files and their SHA-256 checksums are recorded in [source-and-route-inventory.json](source-and-route-inventory.json).

| Route | Desktop | Mobile |
| --- | --- | --- |
| `/` | [desktop](screenshots/home-desktop.jpg) | [mobile](screenshots/home-mobile.jpg) |
| `/about/` | [desktop](screenshots/about-desktop.jpg) | [mobile](screenshots/about-mobile.jpg) |
| `/projects/` | [desktop](screenshots/projects-desktop.jpg) | [mobile](screenshots/projects-mobile.jpg) |
| `/writing/` | [desktop](screenshots/writing-desktop.jpg) | [mobile](screenshots/writing-mobile.jpg) |
| `/projects/image-classifier/` | [desktop](screenshots/project-image-classifier-desktop.jpg) | [mobile](screenshots/project-image-classifier-mobile.jpg) |
| `/projects/minesweeper/` | [desktop](screenshots/project-minesweeper-desktop.jpg) | [mobile](screenshots/project-minesweeper-mobile.jpg) |
| `/projects/python-fsa-generator/` | [desktop](screenshots/project-python-fsa-generator-desktop.jpg) | [mobile](screenshots/project-python-fsa-generator-mobile.jpg) |
| `/projects/python-lisp-fsa/` | [desktop](screenshots/project-python-lisp-fsa-desktop.jpg) | [mobile](screenshots/project-python-lisp-fsa-mobile.jpg) |
| `/projects/recursive-descent-parser/` | [desktop](screenshots/project-recursive-descent-parser-desktop.jpg) | [mobile](screenshots/project-recursive-descent-parser-mobile.jpg) |

## Rollback procedure

Use the immutable Vercel deployment when a cutover must be reversed quickly:

1. Open Vercel project `portfolio-v2` and select deployment `dpl_12wGtavMCCeRmC7PNxjWDtycpAda`.
2. Promote `portfolio-v2-bu2i2a49b-david-husons-projects.vercel.app` to production.
3. Confirm both `davidhuson.dev` and `www.davidhuson.dev` are aliases on that deployment.
4. Restore the apex A and `www` CNAME values from [deployment-and-dns.json](deployment-and-dns.json) if the cutover changed DNS. Do not change the MX or SPF records.
5. Verify the apex 308 redirect, a 200 response from `www`, the nine visual routes, `/rss.xml`, the PDF download, and both TLS certificates.

If a fresh build is required, create a restoration branch from commit `2be70ca55f50d05407431395ea9346e06c385205`, run `npm install` and `npm run build`, then deploy that branch to the same Vercel project. Do not restore from the pre-fetch local `main` branch or from memory.

Rerun the machine inventory with:

```sh
node scripts/capture-current-site-inventory.mjs \
  --origin https://www.davidhuson.dev \
  --output docs/dav-17/source-and-route-inventory.json
```
