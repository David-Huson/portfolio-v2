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
<!-- DRAFT: bracketed [TODO: ...] placeholders need real facts before publishing; keep draft: true until resolved -->

## Pipeline shape

The pipeline is a chain of stages decoupled by SQS queues. No stage calls the next one directly; it finishes its work, drops a message, and stops caring. Each stage can fail, restart, scale, or fall behind independently, and the queue absorbs the difference.

[TODO: enumerate the stages and what each is responsible for — extract, transform, load, at whatever granularity is real.]
[TODO: what runs where — which stages are Lambda, which are ECS, and what pushed each one to that side (runtime limits, memory, connection lifetime).]

## Why idempotent loads are load-bearing

Everything else in this post depends on one property: processing the same message twice must produce the same result as processing it once.

SQS standard queues guarantee at-least-once delivery, which is a polite way of saying duplicates are a feature. But that's the small reason. The big reason is that idempotency turns "reprocess" from a dangerous operation into a boring one. Retries, redrives, and backfills all reduce to the same primitive — feed the message through again — and none of them require anyone to first reason about what state the earlier attempt left behind.

[TODO: how idempotency is actually enforced at the load step — natural-key upsert, dedupe table, conditional insert.]
[TODO: what the natural key / dedupe boundary is, described generically.]

## Retries and dead letters

Transient failures retry; persistent failures get out of the way. A message that keeps failing lands in a dead-letter queue instead of blocking the pipeline behind it.

[TODO: the retry policy — maxReceiveCount, visibility timeout, and how they relate to the stage's actual processing time.]
[TODO: what lands in the DLQ in practice — the real categories, e.g. malformed source records vs. downstream outages.]
[TODO: how DLQ contents get triaged and re-driven, and whether that's tooling or a runbook.]

## Replay-driven backfill

Backfill is not a separate code path. Because loads are idempotent, backfilling a window means replaying its messages through the same pipeline that handles live traffic — same code, same validation, same audit trail. There's no bespoke "backfill script" that's almost-but-not-quite the production logic, which is where backfill bugs usually live.

[TODO: how a replay is initiated and scoped — by time window, by source, by message range.]
[TODO: what replay relies on beyond idempotency — message retention, an archive of source events, ordering assumptions.]
[TODO: cost and runtime of a full replay.]

## The outage

We've had exactly one production outage on this pipeline. [TODO: what failed, how it was detected, and the rough timeline — keep it non-identifying.]

The recovery was the design working as intended: [TODO: the recovery steps in order.] Because every load was idempotent, recovery didn't require forensic reconstruction of which records had partially landed — we replayed the affected window and let the pipeline converge. Recovery was complete, with zero permanent data loss.

The thing idempotency let us skip is the thing that dominates most incident timelines: [TODO: confirm — the audit of partial state / manual reconciliation you didn't have to do.]

## What I'd change

[TODO: the gaps the outage exposed.]
[TODO: monitoring or alerting changes made after.]
[TODO: design changes worth making before the next incident.]

The takeaway I'd defend in any design review: make loads idempotent first, before retries, before DLQs, before backfill tooling. Every recovery mechanism you add afterward inherits its safety from that one property.
