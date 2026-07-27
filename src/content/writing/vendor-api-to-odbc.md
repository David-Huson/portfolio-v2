---
title: Replacing an Unreliable Vendor API With Direct ODBC
publishDate: 2026-07-27
description: |
  Trading a flaky third-party API for direct ODBC over MSSQL Linked Servers against an office-partitioned source, so onboarding a new location became a configuration change instead of a code change.
tags:
  - integration
  - mssql
  - odbc
  - reliability
draft: true
---

<!-- TODO: update publishDate when published -->
<!-- DRAFT: bracketed [TODO: ...] placeholders need real facts before publishing; keep draft: true until resolved -->

## The reliability problem

Our ingestion originally went through the vendor's API, which is the arrangement everyone would recommend: a supported contract, an abstraction over their schema, no coupling to their internals. In practice the API was the least reliable component in the pipeline. [TODO: the failure modes you actually observed — timeouts, partial responses, silent gaps, rate limiting, whichever they were.]

Those failures didn't stay contained. [TODO: how they surfaced downstream — stalled loads, incomplete reports, manual re-pulls.] We tried working around it first: [TODO: mitigations attempted — retries, backoff, caching, vendor support tickets — and why they weren't enough.]

## The alternative: ODBC via MSSQL Linked Servers

The data behind the API lives in a SQL Server database we could reach. So we went underneath the API: direct ODBC connections through MSSQL Linked Servers, querying the source tables the API was reading anyway. The API's abstraction was costing more in reliability than it was buying in decoupling.

[TODO: how the connection is established and secured — network path, credentials handling, read-only account scope.]
[TODO: what the query path looks like end to end — linked server → source DB → staging, roughly.]

## How office-partitioning shaped the design

The source database is partitioned by office, which turned out to be the load-bearing fact of the whole design. Because every office looks structurally identical, one query pattern serves all of them — what varies per location is addressing, not logic. That symmetry is what made the next section possible.

[TODO: how partitioning maps onto the connection strategy — one linked server per office vs. one server with per-office databases/schemas.]
[TODO: what it means for isolation — whether one office's load or failure can affect another's.]

## Config-driven onboarding

The payoff: bringing a new location online is a configuration change, not a code change. [TODO: what the config surface actually contains — connection details, office identifier, schedule, whatever it is.] [TODO: the onboarding steps and who performs them — is this something ops can do without an engineer?]

Before, each new location meant [TODO: what onboarding used to require]. The difference in lead time is the metric I care about here: [TODO: rough before/after].

## Tradeoffs

We traded a supported contract for a dependency on someone else's schema. When the vendor changes a table, nothing negotiates on our behalf — the queries just break. We accept that with open eyes: [TODO: how schema drift is detected — monitoring, staged environments, release notes review.]

There are operational costs too: [TODO: connection management, credential rotation, read load imposed on the source system and whether the vendor has opinions about it.] And we gave up whatever the API layer was doing for us beyond passthrough — [TODO: anything it validated or enriched that you now handle yourself.]

## Outcome

[TODO: reliability before and after — failure frequency, data completeness.]
[TODO: onboarding effort before and after.]
[TODO: what you'd do differently — and whether you'd still make the same call if the API had been merely mediocre instead of unreliable.]

The general lesson survives the placeholders: an abstraction layer is only worth its coupling discount if it actually works. An unreliable abstraction is worse than honest coupling, because you carry the operational burden of both.
