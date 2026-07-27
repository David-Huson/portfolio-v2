---
title: Idempotent Loads Are What Let You Replay
publishDate: 2026-07-27
description: |
  An SQS-decoupled pipeline where idempotent loads, a retry and dead-letter policy, and replay-driven backfill turned a production outage into a complete recovery with zero permanent data loss.
tags:
  - aws
  - sqs
  - data-pipelines
  - reliability
draft: true
---

<!-- TODO: update publishDate when published -->
<!-- STUB: outline only — do not publish until TODOs are resolved and draft: false -->

## Pipeline Shape

- Stages are decoupled by SQS queues rather than calling each other directly
- TODO: enumerate the stages and what each one is responsible for
- TODO: what runs where (Lambda vs. ECS) and why

## Why Idempotent Loads Are Load-Bearing

- Idempotency is the property that makes every other recovery mechanism safe to use
- TODO: how idempotency is actually enforced at the load step
- TODO: what the natural key / dedupe boundary is, described generically

## Retries and Dead Letters

- TODO: retry policy specifics — attempt counts, backoff, visibility timeout
- TODO: DLQ routing and what lands there in practice
- TODO: how DLQ contents get triaged and re-driven

## Replay-Driven Backfill

- TODO: how a replay is initiated and scoped
- TODO: what guarantees replay relies on beyond idempotency
- TODO: cost and runtime characteristics of a full replay

## The Outage

- There was one production outage
- Recovery was complete, with zero permanent data loss
- TODO: what failed, how it was detected, and the timeline
- TODO: the recovery steps taken, in order
- TODO: what the idempotency guarantee let us skip during recovery

## What I'd Change

- TODO: gaps the outage exposed
- TODO: monitoring or alerting changes
- TODO: design changes worth making before the next incident
