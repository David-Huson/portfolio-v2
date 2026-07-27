---
title: Access Control Patterns for PHI in PostgreSQL
publishDate: 2026-07-27
description: |
  Row-level security, audit logging on PHI field access, and OAuth 2.0 in a HIPAA context - compliance requirements read as engineering constraints, and the pitfalls that come with them.
tags:
  - postgresql
  - security
  - hipaa
  - access-control
draft: true
---

<!-- TODO: update publishDate when published -->
<!-- STUB: outline only — do not publish until TODOs are resolved and draft: false -->

<!-- Patterns only. No real schemas, policies, identifiers, or PHI. -->

## Compliance Requirements as Engineering Constraints

- TODO: translate the relevant HIPAA obligations into concrete system properties
- TODO: which constraints are technical vs. procedural, and where the boundary sat
- TODO: what the auditors actually asked to see

## Row-Level Security Design

- TODO: policy shape — what the predicate keys off and how role context is established per connection
- TODO: how policies interact with connection pooling and service accounts
- TODO: illustrative (invented, non-employer) example table and policy to make the pattern concrete

## Audit Logging on PHI Field Access

- TODO: mechanism — trigger-based, view-based, or application-layer, and why
- TODO: what a log record captures and how long it's retained
- TODO: performance cost of logging on the read path

## OAuth 2.0 Integration

- TODO: the flow used and how token claims map onto database role context
- TODO: token lifetime, refresh, and revocation handling
- TODO: where authorization decisions are made relative to the database

## What HIPAA Requires vs. What We Chose to Do

- TODO: which controls were mandated
- TODO: which were defense-in-depth choices beyond the requirement
- TODO: the reasoning for going past the baseline where we did

## Pitfalls

- TODO: RLS bypass risks (superuser, table owner, BYPASSRLS) and how they were closed off
- TODO: audit log gaps that are easy to miss
- TODO: failure modes discovered in testing or review
