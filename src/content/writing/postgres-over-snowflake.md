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
<!-- STUB: outline only — do not publish until TODOs are resolved and draft: false -->

## The Decision Context

- TODO: what prompted the evaluation and who the stakeholders were
- TODO: the candidate options considered and the constraints they were judged against
- TODO: non-identifying framing of the workload's purpose

## The Sizing Math

- Total workload sized at 53 GB
- TODO: growth rate arithmetic — how much the dataset adds per period and the projection horizon used
- TODO: query volume and concurrency numbers that fed the sizing

## What Snowflake or Databricks Would Have Bought

- TODO: the capabilities that would have justified either platform (separation of storage/compute, elastic scaling, etc.)
- TODO: the cost model comparison at the sized workload
- TODO: which of those capabilities the workload actually needed

## What We Gave Up

- TODO: the specific capabilities forfeited by staying on Postgres/Supabase
- TODO: operational burden that shifted onto the team
- TODO: workarounds adopted in place of platform features

## When I'd Flip the Decision

- TODO: data volume threshold that changes the answer
- TODO: concurrency or query-latency threshold that changes the answer
- TODO: organizational signals (team size, number of consuming teams) that would trigger a revisit
