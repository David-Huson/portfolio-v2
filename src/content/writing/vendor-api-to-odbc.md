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
<!-- STUB: outline only — do not publish until TODOs are resolved and draft: false -->

## The Reliability Problem

- TODO: the failure modes observed in the vendor API (timeouts, partial responses, rate limits — record what actually happened)
- TODO: how those failures surfaced downstream
- TODO: what mitigation was attempted before replacing the integration

## The Alternative: ODBC via MSSQL Linked Servers

- Direct ODBC connection over MSSQL Linked Servers, reading the source database instead of the vendor's API layer
- TODO: how the connection was established and secured
- TODO: what the query path looks like end to end

## How Office-Partitioning Shaped the Design

- The source database is partitioned by office
- TODO: how that partitioning maps onto the query and connection strategy
- TODO: implications for parallelism and isolation between locations

## Config-Driven Onboarding

- New locations onboard through configuration alone — no new code
- TODO: what the configuration surface actually contains
- TODO: the onboarding steps and who performs them

## Tradeoffs

- TODO: coupling to the source schema — what breaks when the vendor changes it, and how that's detected
- TODO: operational concerns (connection management, credentials, read load on the source)
- TODO: what was lost relative to a supported API contract

## Outcome

- TODO: reliability before and after
- TODO: onboarding effort before and after
- TODO: what I'd do differently
