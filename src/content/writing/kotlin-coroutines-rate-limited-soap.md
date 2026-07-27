---
title: Kotlin Coroutines Against a Rate-Limited SOAP API
publishDate: 2026-07-27
description: |
  A long-running Kotlin service on ECS that talks to a rate-limited vendor SOAP API - structured coroutine concurrency, jittered polling tuned to the rate limit, and why a client-side integration was the wrong shape.
tags:
  - kotlin
  - coroutines
  - ecs
  - integration
draft: true
---

<!-- TODO: update publishDate when published -->
<!-- DRAFT: bracketed [TODO: ...] placeholders need real facts before publishing. The two code blocks must be real project code, not reconstructions. Keep draft: true until resolved -->

## The integration problem

The source system exposes a SOAP API with a hard rate limit. We need [TODO: what data, described non-identifyingly] out of it on [TODO: cadence], for [TODO: N] locations, without tripping the limit — because the vendor's enforcement is [TODO: how the limit is enforced — throttling, errors, lockout — and what the actual limit is].

SOAP itself isn't the interesting part. The interesting part is that a rate limit turns an integration into a scheduling problem: the constraint isn't how fast we can call, it's how to spend a fixed request budget across competing work.

## Why a long-running service on ECS

The alternative shape was a client-side integration. We didn't do that because [TODO: the real reasons — credential custody, rate-limit accounting needing a single enforcement point, session lifetime, deployment surface].

The single-enforcement-point argument deserves the emphasis: a rate limit is global state. The moment two independent callers share one vendor budget, something has to coordinate them, and a single long-running service is the simplest thing that can own that coordination.

Within AWS, this also couldn't be a Lambda: [TODO: confirm the real reasons — execution-time limits vs. poll cycles, connection/session reuse, steady low-volume work being cheaper on a small always-on task]. So it runs as a long-running Kotlin service on ECS, which buys persistent sessions, in-memory rate-limit accounting, and a place for the poll loop to live.

## Coroutine concurrency model

The service is structured-concurrency Kotlin: one supervising scope owns the work, and [TODO: the real shape — a coroutine per location? a bounded worker pool consuming a channel?]. Cancellation propagates downward, so shutdown is "cancel the scope and wait," not a hand-rolled drain procedure.

Concurrency is bounded to respect the rate limit rather than to protect our own resources — the constraint comes from the vendor's budget, not our CPU. [TODO: how in-flight concurrency is actually bounded — Semaphore, limitedParallelism, channel capacity.]

```kotlin
// TODO: real snippet — the coroutine dispatch loop (scope setup, supervision, bounded dispatch)
```

## Jittered polling at the rate limit

Naive polling at a fixed interval synchronizes: every worker wakes at the same moment, the requests arrive as a burst, and a limit that the average rate respects still gets tripped at the peak. Jitter spreads the same request volume across the interval so the vendor sees a smooth arrival rate instead of a comb.

[TODO: the jitter strategy — uniform over what window, full jitter vs. equal jitter — and why that distribution.]
[TODO: how the polling interval relates to the vendor's limit and how much headroom is deliberately left.]

```kotlin
// TODO: real snippet — the jittered delay calculation
```

## Failure handling

A rate-limit rejection is not an error; it's backpressure, and treating it like a failure (log, alert, retry hot) makes everything worse. The service distinguishes the two: [TODO: how limit rejections are detected — fault code, HTTP status — and how the response differs from real-error handling.]

[TODO: retry and backoff behavior, and where it lives relative to the coroutine scope — per-request, per-worker, supervisor-level.]
[TODO: what happens on partial failure of a batch — does the batch complete, retry whole, or split?]

## Outcome

[TODO: throughput and reliability after the change — sustained utilization of the rate budget, incidents.]
[TODO: operational surprises.]
[TODO: what you'd change.]
