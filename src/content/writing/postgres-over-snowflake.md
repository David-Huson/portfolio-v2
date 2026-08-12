---
title: Right-Sizing a Warehouse - Why We Chose Postgres Over Snowflake
publishDate: 2026-07-27
description: |
  A decision record on picking PostgreSQL/Supabase instead of Snowflake or Databricks after sizing the workload at 53 GB, and the thresholds that would make me revisit it.
tags:
  - postgresql
  - data-warehousing
  - architecture
  - decision-records
draft: true
---

<!-- TODO: update publishDate when published -->
<!-- DRAFT: bracketed [TODO: ...] placeholders need real facts before publishing; keep draft: true until resolved -->

## The decision context

When we set out to build a warehouse, the default answer was already written for us. Every architecture blog, every vendor pitch, and most job postings assume the modern data stack: Snowflake or Databricks at the center, with everything else orbiting it. We evaluated both. [TODO: what prompted the evaluation — the reporting need or migration that kicked this off, and who the stakeholders were.]

The workload itself was [TODO: one-sentence, non-identifying description of what the warehouse serves — reporting, analytics, downstream apps].

## The sizing math

Before comparing features, I sized the actual workload. Everything in, historical data included, it came to 53 GB.

That number did most of the deciding. 53 GB is not big data. It is not even medium data. It fits in RAM on a mid-sized instance, and a well-indexed Postgres handles it without exotic tuning. The platforms we were evaluating are built for workloads two to four orders of magnitude larger.

[TODO: the growth arithmetic — how much the dataset adds per month/year and what the projection looked like over the horizon you used.]
[TODO: query volume and concurrency — how many consumers, what peak concurrent query load actually is.]

## What Snowflake or Databricks would have bought

To be fair to the road not taken: both platforms buy real things. Separation of storage and compute, so a heavy transform can't starve the BI dashboards. Elastic scaling for spiky loads. Zero-copy cloning for environments. Time travel. A managed service someone else patches.

The question was never whether those features are good. It was whether a 53 GB workload with [TODO: N] consumers would ever exercise them. [TODO: the cost-model comparison at this size — what the monthly estimate came to for each option versus Postgres/Supabase.]

## What we gave up

Choosing Postgres/Supabase meant giving up compute elasticity: a runaway query and a dashboard now share one box, and we manage that with [TODO: how — statement timeouts, read replicas, workload separation, whatever it actually is]. It meant capacity planning is our problem again, and so is [TODO: the operational burden that actually shifted onto the team — backups/tuning/upgrades, whichever applies].

Kimball-style star schemas turned out to be a good fit for plain Postgres anyway — dimensional models were designed for exactly this class of database, decades before columnar warehouses existed. [TODO: any workaround adopted in place of a platform feature, e.g. materialized views where a warehouse would auto-optimize.]

## When I'd flip the decision

This decision has an expiry condition, and writing it down is the point of this post. I'd revisit if:

- Data volume crossed [TODO: threshold — the point where working set no longer fits sensibly in memory on hardware you're willing to run].
- Concurrent analytical load made isolation a recurring incident rather than a tuning exercise. [TODO: the concrete signal — e.g. sustained lock contention, dashboard latency SLO misses.]
- The org shape changed: [TODO: number of consuming teams or headcount at which platform features start paying for themselves].

Until one of those trips, the boring answer holds: size the workload, then pick the smallest tool that does the job well.
