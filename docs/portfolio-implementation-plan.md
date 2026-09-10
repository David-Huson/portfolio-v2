# Implementation plan

Branch: `codex/portfolio-journal-implementation`, based on committed discovery and four-direction exploration at `307d09a`.

1. Record the selected system and content contract before source edits.
2. Replace global styles and shared shell with Working journal. Implement the homepage slice and preview it.
3. Replace the project index, About, Writing and 404. Consolidate article layouts and derive contents from rendered Markdown headings.
4. Add an optional schema-validated semantic diagram to projects and use it for documented parser/FSA transformations. Preserve article bodies and legacy URLs.
5. Delete unused theme/pill/grid/icon/CTA/skills abstractions after migrating all callers. Keep legacy public files to protect cutover asset URLs. Remove the unused React integration and, after checking all callers, remove unused React, motion, modal and mail packages with npm while preserving the lockfile. Compare compiled assets before and after to catch unintended changes.
6. Validate production output: routes, metadata, draft exclusion, link/asset resolution, bytes and script requests; run responsive/browser/keyboard/no-JS/contrast checks and inspect screenshots. Correct actual defects.
7. Build a Vercel preview through existing project configuration if credentials/network allow, validate it, and present the reviewed implementation. Do not move production aliases or merge main as part of preview creation.

Content migration: existing projects gain optional diagram/role metadata; no article slugs change. Homepage uses published scope and explicitly earlier project evidence. Professional case-study facts requested while implementation proceeds. If none arrive, the professional flagship-evidence acceptance criterion remains a documented content limitation rather than an invented success.
