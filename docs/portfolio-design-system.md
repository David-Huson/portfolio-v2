# Working journal: final design system

Selected by David on September 9, 2026: direction A, with optional semantic diagrams from B. A owns the composition, typography and pacing. B contributes diagrams with readable sequences and explanations of boundaries, not its denser homepage.

## Foundations

| Token | Value | Use |
| --- | --- | --- |
| paper | #f5f2eb | Page background |
| surface | #fffdf8 | Diagram/code background |
| ink | #252724 | Primary text |
| muted | #65665f | Secondary text |
| accent | #823c31 | Links, focus, selected diagram boundaries |
| line | #c8c6bd | Decorative separators |

Text pairs exceed 4.5:1 on paper and surface. Borders do not convey an essential state alone. No shadows. Square corners. One-pixel separators and a four-pixel identity rule. No gradients, glow or automatic dark mode.

Display: Georgia, Times New Roman, serif, regular weight. Body: Avenir Next, Segoe UI, Arial, sans-serif. Code/metadata: SFMono-Regular, Consolas, Liberation Mono, monospace. System fonts preserve the selected specimen and eliminate external font requests. Explicit fallbacks require verification across available browsers.

Type sizes in rem: metadata .75, supporting .875, body 1, lead 1.125–1.25, heading 1.75–3.25, display 2.75–6.25. Display uses clamp with a rem base so browser text enlargement still applies. Paragraph line height 1.65; display 1.08. Tight display tracking -.045em, body normal. Metadata .06em. Reading width 65ch.

Spacing scale: .25, .5, .75, 1, 1.5, 2, 3, 4, 6rem. Outer width 82.5rem including 3.75rem side padding on wide screens. Mobile padding 1.25rem, tablet 2rem. Main splits use minmax(0, …) to permit shrinkage; never hide body overflow.

## Components

- BaseLayout: document, shared head, skip link, navigation, one main landmark, footer.
- MainHead: page-specific title/description, canonical subdomain URL, separate OG fields, Twitter summary, RSS and favicon. No generated social image or third-party trackers.
- Nav: identity, Work, About, GitHub. Always visible, 44px targets, correct aria-current. No mobile menu script needed for three links.
- Footer: name, email, professional profiles, Writing and secondary Consulting link.
- ProjectPreview: repeated problem-led summary with domain/date context, title and reason to read. No thumbnail required.
- ArticleLayout: title, metadata, real heading-derived contents navigation, readable prose, optional semantic diagram, source/content body. Shared between projects and writing.
- SystemDiagram: figure with caption, an ordered sequence of stages, and optional native disclosure explaining a decision. Reusable content data, not a slug-dependent drawing or screenshot. No interactive canvas or dependency.

Only these repeated needs become components. Individual homepage and About compositions remain page markup.

## Responsive composition

Small mobile, 320–374px: identity above three navigation links; title wraps naturally; context moves above narrative; diagrams become vertical sequences; captions retain body-sized readability. Long links wrap and code scrolls only within its region.

Mobile, 375–639px: the same intentional reading order with a little more white space. Portrait on About is compact and secondary. Case-study contents appear above the article, never hidden.

Tablet, 640–999px: two-column story summaries when text remains comfortable; article contents stay above the body. Do not squeeze prose beside a rail.

Laptop, 1000–1399px: contextual margin and main narrative, 1:1 feature/diagram composition, sticky case-study contents rail with ample gap.

Wide desktop, 1400px+: cap total width at 82.5rem and reading width at 65ch. Extra screen area becomes margins, not longer lines.

At 200% zoom/text enlargement, content remains present and navigable. No fixed-height text containers. Portrait has intrinsic width and height. Diagrams use text in HTML, not rasterized labels.

## Motion and accessibility

Link color/underline transitions: 120ms ease-out, hover/focus only. Native in-page smooth scroll, disabled under prefers-reduced-motion. No page fade, reveal, parallax, entry animation, loading fiction or scroll lock. Details expand natively and retain their label.

One h1 per page, ordered heading levels, descriptive links, keyboard skip link, visible 3px accent focus outline with 4px offset, semantic nav/figure/ol/details, and forced-colors-friendly borders. Navigation and reading work without JavaScript. No information relies on hover, motion or color alone. Diagram annotation is supplemental; essential architecture is always visible.

## Content contract

Preserve existing project slugs and actual article bodies. Mark archived projects as earlier coursework. Keep six incomplete professional writing drafts out of the production build. High-level current work uses previously published role/Skills copy; no proposed story cards, unconfirmed metrics or invented outcomes go live. A future professional study may supply optional role and diagram fields in its schema.

Keep original public assets and redirected PDF/video URLs available, although decorative backgrounds are no longer requested. Preserve Astro static generation, Vercel project linkage, site origin, RSS and sitemap. No main changes or production alias movement.
