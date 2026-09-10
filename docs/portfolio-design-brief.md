# Portfolio product brief and information architecture

## The job

A technical leader should see an engineer who makes systems understandable and recoverable. The portfolio must connect professional scope to inspectable decisions. A visual language cannot compensate for missing case-study facts.

Within five seconds: David Huson, lead software engineer, healthcare data platforms, Fort Worth. Within thirty seconds: his work connects ingestion, operational reliability and analytical models; he can explain a choice and its costs. Within three minutes: the visitor has read a concrete decision, understands David's responsibility, and can inspect source or continue a technical conversation.

Proposed central narrative: **Systems are only as useful as your ability to understand and operate them.** Published material supports reliability, modeling and clear reasoning. Do not imply this exact sentence is an existing quote from David.

## Ranked actions

1. Read an evidence-rich case study.
2. Understand David's current engineering scope and responsibility.
3. Inspect source code or a technical artifact.
4. Learn about David's background and working style.
5. Connect via LinkedIn or email.
6. Find consulting services at the business site.

A résumé is useful only after a real file is supplied. Writing becomes a primary action only when a finished article exists. No placeholder résumé, empty current-work page, technology wall or contact form.

## Compact architecture

| Page/section | Purpose and audience | Content and priority |
| --- | --- | --- |
| Home `/` | Fast orientation for all audiences | Name/role, a concise statement of scope, selected evidence, secondary biography link; one dominant case-study action |
| Work `/projects/` | Evidence index for managers and engineers | Professional scope first, then confirmed professional studies when available, then clearly labeled early work; preserve legacy route |
| Case study `/projects/<slug>/` | Deep assessment for engineers and hiring managers | One-sentence problem, role/context, constraints, architecture, decisions/tradeoffs, implementation evidence, outcome/limitations, source link |
| About `/about/` | Human and professional context | Role, responsibility, education, mentoring, interests, portrait, professional connections and secondary consulting link |
| Writing `/writing/` | Existing route retained for future writing | Only published articles. Footer access until there is enough content to deserve primary navigation |
| Footer | Low-priority exits | GitHub, LinkedIn, email, consulting; RSS available with Writing |

Keep all existing project slugs. No new Work alias needed. A case-study article should not become both a project and a duplicate blog post. A short summary can point to a deeper article when each has its own job.

## Content release strategy

The prototypes label proposed professional summaries. They do not publish the six drafts or their metrics. The parser provides a complete representative article using existing published evidence. Before final content release, fill at least one professional story from the discovery ledger. If David chooses to proceed without those facts, launch honest high-level professional scope with explicitly labeled earlier work, and record that the flagship-professional-evidence acceptance criterion remains unmet.

Professional story interview: what changed, who needed it, David's specific role, the real boundary diagram, one rejected alternative, recovery behavior, observable result and what would change the decision. Measured outcomes are useful but not mandatory if credible operational evidence is available. Never fabricate precision.

## Content-first composition

A case-study preview gets a problem-led title, domain, David's role if known, and a reason to read. Technology appears next to the decision it affected. Architecture visuals show boundaries or transformations; ornamental pseudo-infrastructure is excluded. Every diagram also has a readable text sequence.

## Shared interaction constraints

Ordinary links and native details elements. No scroll hijacking, hidden-on-scroll content, hover-only evidence or custom pointer. Navigation stays reachable without JavaScript. Diagrams become vertical reading sequences on narrow screens. Code can scroll within its own region. Body copy is at least 16px, links have visible keyboard focus and 44px navigation targets. Reduced motion removes transitions.

## Review artifact scope

Four independent layouts, each with Home, Case study and Design system pages. The system page shows actual tokens, type, link states and disclosure behavior. The review hub offers desktop and phone previews. All representative professional copy is marked proposed. The prototypes live in docs and are not copied into the Astro production build.
