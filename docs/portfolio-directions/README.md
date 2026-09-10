# Review the four directions

Open `index.html` for the comparison, then each concept's Home, Case study and Design system views. The comparison toggles between desktop and mobile frames. Open the full page to interact or judge real typography. The review bar is prototype navigation; it is not proposed production chrome.

Serve from the repository root so the reused portrait resolves:

```sh
python3 -m http.server 4327 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4327/docs/portfolio-directions/`.

The HTML also works directly from disk. The comparison frames show static previews; the full pages have working links and native disclosures. No application dependencies, remote fonts, production routes, analytics or client-side framework code were added.

## Files

- `a-*`: Working journal, editorial/architectural.
- `b-*`: Systems atlas, technical/systems.
- `c-*`: Quiet practice, premium minimal.
- `d-*`: Open structure, experimental contemporary.
- `screenshots/`: actual browser captures at 390px and 1440px.
- `verification.json`: browser checks for all twelve views at 320, 390, 768 and 1440px.
- `contrast-and-links.json`: token contrast and local-link checks.
- `../portfolio-redesign-discovery.md`: repository audit and evidence ledger.
- `../portfolio-design-brief.md`: visitor goals, narrative, actions and IA.
- `../portfolio-design-directions.md`: full concept definitions and weighted evaluation.

## Reproduce

`build-prototypes.py` generates the twelve concept pages from shared semantic elements and four separate composition/style definitions. The review hub is hand-authored and is not overwritten. Change the generator rather than generated pages.

```sh
python3 docs/portfolio-directions/build-prototypes.py
python3 docs/portfolio-directions/check-artifacts.py
node docs/portfolio-directions/verify-prototypes.mjs
```

The browser verifier uses Playwright already installed in the caller's environment. Set `PLAYWRIGHT_MODULE` to its absolute module path when not locally resolvable, and optionally set `CHROME_PATH` to an installed Chrome executable. It does not install dependencies. `PREVIEW_ORIGIN` defaults to `http://127.0.0.1:4327`.

## Verification scope

Checks cover horizontal overflow, one h1/main, image loads, unresolved template tokens, keyboard skip links, Enter-operated case-study disclosures, console/runtime and response errors, and the comparison's size toggle. Text token contrast includes the inverted panel in D. Rendered screenshots were inspected, including narrow case-study flow and all four desktop compositions. A tablet overflow in D's article was fixed before the final run.

These are design prototypes, not a production release. Automated checks are not a full accessibility audit. No assistive-technology session, cross-browser matrix, 200% text enlargement or field Core Web Vitals measurement is claimed. Those belong to the selected implementation's acceptance review.

## Selection and content

David requested a choice before implementation. A is recommended; B is the strongest alternative. Professional project summaries remain labeled proposed. The case-study specimens use the published parser account and explicitly identify it as coursework. The portrait's old source alt text did not match its visible crop; the prototype uses a corrected description.

The live Astro site and Vercel cutover remain unchanged. After selection, create an implementation branch from this exploration, finish the design specification and plan, and implement against the content evidence ledger.
