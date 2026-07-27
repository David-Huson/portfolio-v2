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
<!-- STUB: outline only — do not publish until TODOs are resolved and draft: false -->

## The Integration Problem

- The vendor exposes a SOAP API with a rate limit
- TODO: what data is being pulled and on what cadence, described non-identifyingly
- TODO: the specific rate limit and how it's enforced by the vendor

## Why a Long-Running Service on ECS

- TODO: reasons a client-side integration wasn't chosen (credential handling, rate-limit accounting, session lifetime — record the real ones)
- TODO: why ECS rather than Lambda or a scheduled job
- TODO: what "long-running" buys in this context

## Coroutine Concurrency Model

- TODO: the structured concurrency shape — scope ownership, supervision, cancellation propagation
- TODO: how in-flight request concurrency is bounded against the rate limit
- TODO: code sample goes here — real snippet of the coroutine dispatch loop

## Jittered Polling at the Rate Limit

- TODO: the jitter strategy and why that distribution was picked
- TODO: how the polling interval relates to the vendor's limit and what headroom is left
- TODO: code sample goes here — real snippet of the jittered polling / delay calculation

## Failure Handling

- TODO: how rate-limit rejections are distinguished from real errors and handled
- TODO: retry and backoff behavior, and where it lives relative to the coroutine scope
- TODO: what happens on partial failure of a batch

## Outcome

- TODO: throughput and reliability after the change
- TODO: operational surprises
- TODO: what I'd change
