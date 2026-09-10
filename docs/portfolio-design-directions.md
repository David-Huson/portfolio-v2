# Four portfolio directions

Status: ready for David's selection. No final direction selected. The prototype homepages, case studies and design-system specimens are in `docs/portfolio-directions`. All new professional narrative is proposed, with no draft metrics promoted into claims.

## A. Working journal

An engineering portfolio presented as a carefully edited journal. A stable margin holds context while the main column carries reasoning. This gives David's systems work a human reading rhythm and makes room for constraints rather than hiding them beneath a thumbnail.

The homepage opens with a small identity column and a large, two-line serif thesis. A selected study pairs a problem-led introduction with a diagram plate. Subsequent stories form a short editorial index. Navigation is name, Work, About and GitHub, with commercial contact in the footer. The article uses a left contents rail, a readable body column, numbered sections and full-width figures. The page alternates spacious introductions and denser technical passages.

Use a 12-column conceptual grid within 1,320px including 60px side padding, an approximately 1:3 opening split and 1:1 feature split. Body copy is 16–20px; serif display scales from 46–100px. Georgia supplies a familiar editorial voice; Avenir Next with Arial fallback supplies navigation/body; SFMono/Consolas supplies identifiers. These fonts are already available through system stacks and require no remote loading. If cross-platform font consistency becomes necessary, evaluate a self-hosted serif rather than introducing a runtime font service.

Palette: background `#f5f2eb`, surface `#fffdf8`, primary text `#252724`, secondary `#65665f`, oxblood accent `#823c31`, border `#c8c6bd`. Accent is reserved for links, focus and diagram edges. There is no decorative status palette.

Signature: the **reasoning margin**. Metadata, section numbers and figure captions align to a consistent secondary column. It should carry actual context, never dummy issue numbers or fake timestamps.

Imagery is evidence: diagrams, real outputs and an optional About portrait. Mobile converts the identity margin into a compact line, prioritizes the study's decision before its diagram, and makes the flow vertical. The diagram is not a desktop image shrunk to fit.

Motion: ordinary document navigation; link color changes immediately in the specimen. A final implementation may add a 120ms underline/color transition, no page fade. Scroll is native, optionally smooth for in-page anchors with reduced-motion disabling it. Case-study transitions retain normal browser history and position. Native disclosures add depth without blocking the reader.

Risks: without tight editing, this can become an academic journal. Georgia can feel conventional if spacing or headline wrapping is careless. The margin must earn its width; collapse it before it crowds the prose. Warm colors must not drift into an indistinct beige interface.

## B. Systems atlas

The system itself introduces the engineer. A diagram is the primary piece of evidence, accompanied by a short statement of scope and a specific decision. This direction suits David's interest in boundaries, data flow and operational behavior, provided the architecture has been confirmed.

The homepage splits a sans-serif statement from a compact role description, then presents a wide system diagram with a decision annotation. Below is a dense, ruled register of work. Navigation is compact and direct. Articles place the contents rail on the right, keeping the main sequence of explanation and figures aligned on the left. Data relationships establish the visual rhythm rather than cards.

Grid: 1,320px maximum with a 3:2 hero; one full-width diagram; evidence rows divided into identifier, decision and context. Density is the highest of the four. Avenir Next/Arial display and body distinguish this from the editorial serif directions; SFMono/Consolas marks system annotations. A self-hosted IBM Plex Sans/Mono pair is a coherent open-source option for final implementation, but not loaded in the current prototype. The specimen honestly displays its actual system fonts.

Palette: background `#f3f6f9`, surface `#ffffff`, text `#142b3e`, secondary `#526575`, blue accent `#245d91`, border `#bccbd6`. White diagrams against pale gray distinguish the system from its surrounding explanation without shadows. No health/status colors until a real state needs one.

Signature: a **decision attached to a boundary**. The diagram is followed immediately by why a boundary exists and what it costs. The current parser example shows source → tokens → grammar → IR with an expandable explanation of precedence and diagnostics. Arrows convey sequence, not decorative connectivity.

On mobile, the wide map becomes an ordered vertical sequence with full-size labels. The boundary explanation stays directly below it. Work metadata moves above each title; the secondary context follows. No horizontal canvas or mandatory zoom/pan.

Motion: no page transitions or scroll-triggered reveals. Hover/focus emphasizes a link or disclosure label. Opening a decision reveals content inline. Future diagram selection could synchronize an annotation only if keyboard and no-JS versions retain every explanation; that interaction is not required by this prototype. Reduced motion leaves the complete diagram visible.

Risks: can resemble engineering documentation or suggest detailed healthcare architecture exists before the facts are ready. Too many labels make the page hard to scan. Do not add fake service names, dashboard counters, green dots or a graph for every paragraph.

## C. Quiet practice

A personal portfolio with very little visual apparatus. A portrait identifies the person, and a short list of studies earns the attention after it. Dark charcoal, warm text and a copper accent give the photograph a restrained setting rather than coding a generic developer dark mode.

The homepage is an asymmetrical portrait-led composition. A serif headline and short introduction balance a single grayscale portrait. Work becomes a numbered list of large linked titles, without cards or thumbnails. The case study has a centered opening, a horizontal contents strip and a narrower reading column. The typography and pacing do most of the work.

Grid: 1,320px outer container, 1.6:1 hero columns, 950px study list and approximately 720px reading body. Georgia is display, Avenir Next/Arial body, SFMono/Consolas sparingly for indexes. Body remains 16–20px. The existing portrait is reused; CSS grayscale is an explicit art-direction choice for this concept, not a replacement image.

Palette: background `#191d1c`, surface `#232927`, text `#f1eee6`, secondary `#b0b8b2`, sand/copper accent `#d6b896`, border `#58635d`. The dark theme is a single intentional concept, not an automatic operating-system preference. Pale paragraph text and generous line height matter more than deep blacks.

Signature: an **annotated reading list**. Large question-led project titles are accompanied by exactly enough context to decide whether to read. The portrait stays secondary to the title on mobile, becoming a small identity image next to role/location rather than another full-screen panel.

Motion: standard links, no page entrance or image zoom. Underlines and accent color communicate interaction. Native scroll, no pinned photograph, no parallax. The case study can be read continuously with motion disabled. No transition is required to make the composition understandable.

Risks: the emotional tone is strong but engineering evidence arrives later. A weak portrait or too few completed studies exposes the emptiness. Long dark articles may not suit every reader; check sustained reading comfort before committing to a full site. It is the most dependent on exceptional copy and photography.

## D. Open structure

The portfolio becomes a series of bold, inspectable statements. Large typography introduces a question and numbered chapters immediately ground it in work. This is the most expressive direction, but the underlying reading order remains conventional and accessible.

The homepage uses offset headline lines followed by a compact three-column introduction. A contrasting featured chapter contains the actual parser flow. Further studies are full-width numbered sections, not tiles. Articles retain large typographic openings, strong section rules, a wider contents rail and high-contrast diagram plates. The hierarchy is deliberately graphic.

Grid: 1,320px outer container, an oversized fluid headline capped at 178px, a three-part introduction and 1:2 numbered chapters. Helvetica Neue/Arial display uses strong weight and tight but nonoverlapping tracking. Avenir Next/Arial provides body and SFMono/Consolas provides metadata. These are system choices in the prototype. Self-hosted Inter is a suitable open-source candidate if the final composition needs consistent weight metrics across devices.

Palette: background `#e8e9dd`, surface `#f7f7f0`, text `#20281e`, secondary `#555f4b`, olive accent `#405d32`, border `#b4bba9`. Inverted panels use text `#e8e9dd`, secondary `#c1c8b8`, highlight `#d0dcac` on `#20281e`. The panel changes reading emphasis, not system status.

Signature: **numbered arguments**. Each chapter is headed by an assertion and then immediately supported by a diagram or a decision. Numbers are sequence markers only, never manufactured metrics. This gives the site a distinctive silhouette while keeping evidence close.

Mobile recomposes the offset headline with a smaller offset and fluid type. The introduction becomes a short paragraph and action; repeated metadata recedes. The first chapter becomes a full-width reading panel. Subsequent chapter numbers shrink and sit beside their titles. No sideways text or horizontal page scrolling.

Motion: no kinetic text, marquees or scroll hijacking. Native scroll moves between chapters. Hover/focus changes link treatment. A future 160ms state-color transition is enough; do not animate chapter position. Case study navigation stays immediate. Reduced motion is visually complete.

Risks: the statement can dominate the work. Oversized text needs testing at 320px and with increased text size. Inverted panels and tighter tracking demand more accessibility care. Repeating huge numbers throughout a long article would become mannered, so reserve them for navigation.

## Comparative evaluation

Scores are design judgments on a 0–10 scale, weighted by the supplied criteria. They are not user research, measured Core Web Vitals or an accessibility certification. Performance and accessibility scores represent implementation risk, supported only in part by the prototype checks.

| Criterion | Weight | A | B | C | D |
| --- | ---: | ---: | ---: | ---: | ---: |
| Engineering maturity | 20% | 9 | 10 | 8 | 9 |
| Distinctiveness | 15% | 9 | 9 | 7 | 10 |
| Sophistication | 15% | 9 | 8 | 10 | 9 |
| Information clarity | 15% | 10 | 9 | 9 | 8 |
| Case-study storytelling | 10% | 10 | 10 | 8 | 9 |
| Mobile quality | 10% | 9 | 8 | 9 | 8 |
| Maintainability | 5% | 9 | 9 | 9 | 8 |
| Performance | 5% | 9 | 10 | 9 | 9 |
| Accessibility | 5% | 8 | 9 | 9 | 7 |
| Weighted total / 100 | | **92** | **91** | **85.5** | **87.5** |

A wins because technical depth and fast comprehension reinforce one another. Its strongest advantage is the relationship between contextual margin, narrative and diagrams. B is the strongest alternative: choose it if the portfolio should feel like direct inspection of an engineer's systems. Its score would improve with confirmed professional architectures and usable concise summaries.

C offers the best personal presence, but the least differentiation through engineering evidence. D is the most memorable silhouette, with more risk that presentation competes with the content. The score gap is not a substitute for David's preference.

Useful combination: A's editorial composition with B's semantic diagram conventions and explicit boundary annotations. A small portrait belongs on About regardless of direction. Each can use C's restraint about the number of studies.

Do not combine D's oversized headline system, C's dark photographic hero and A's margin grid on one homepage. Do not add B's metadata density to C's reading list. Do not let a dark diagram panel turn into an automatic dark-theme requirement. Select one primary grid, one typographic hierarchy and one reading rhythm.

## External reference checks

Vitsœ's account of Dieter Rams emphasizes usefulness, understandability, restraint and longevity. Those principles support the evaluation standard; no visual assets or layout are copied. [Vitsœ: good design](https://www.vitsoe.com/us/about/good-design).

Inter provides text/display optical sizes and an open-source license, making it a practical candidate if D needs a self-hosted cross-platform family. [Inter official site](https://rsms.me/inter/).

IBM Plex provides related sans, serif and mono families under the Open Font License, a plausible coherent foundation for B. [IBM Plex repository](https://github.com/IBM/plex).

## After selection

Create a separate implementation branch from the committed exploration. Write the final tokens, component responsibilities, responsive rules, motion and accessibility specification for that direction. Confirm the content release scope against the evidence ledger. Identify template components and backgrounds to remove, consolidate article layouts, preserve canonical origin and legacy URLs, then implement and verify. Production deployment remains on Vercel and requires validation of the selected implementation, not these design specimens.
