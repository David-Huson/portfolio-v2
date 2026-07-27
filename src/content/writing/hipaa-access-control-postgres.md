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
<!-- DRAFT: bracketed [TODO: ...] placeholders need real facts before publishing; keep draft: true until resolved -->
<!-- Patterns only. No real schemas, policies, identifiers, or PHI. Any example table/policy shown must be invented for illustration. -->

## Compliance requirements as engineering constraints

HIPAA is written for lawyers, but most of the Security Rule translates cleanly into system properties an engineer can build and test: access limited to what a role needs (minimum necessary), a record of who touched what and when, and authentication you can stand behind. The productive move is to do that translation early — turn each obligation into a property with an enforcement point and a test, instead of treating compliance as a document you write after the system exists.

[TODO: which constraints landed as technical controls vs. procedural ones, and where you drew that boundary.]
[TODO: what auditors/assessors actually asked to see — this shapes the whole post's credibility.]

## Row-level security design

The pattern: enforce access in the database, not in every application that connects to it. Postgres row-level security attaches a predicate to the table itself, so a query from any client — the app, an analyst's session, a misconfigured job — sees only the rows its role is entitled to. The application stops being a security boundary you have to trust and becomes just another client.

[TODO: the policy shape — what the predicate keys off (role membership, an office/tenant column, a session variable) and how role context is established per connection.]
[TODO: how policies coexist with connection pooling and service accounts — poolers reuse connections, so per-user context has to be re-established per transaction; describe how you handle it.]

An invented example to make the shape concrete (not a real schema):

```sql
-- TODO: replace with an illustrative (invented) table + policy that mirrors your actual pattern
```

## Audit logging on PHI field access

Row access is one question; "who looked at this field" is a harder one, because reads don't naturally leave marks. The design space is roughly: database triggers (writes only, reads are invisible to them), logging at a view/function choke point, or logging in the application layer. Each moves the trusted component somewhere different.

[TODO: which mechanism you chose and why — including the honest read-path story.]
[TODO: what a log record captures and how long it's retained.]
[TODO: measured performance cost on the read path, if any.]

## OAuth 2.0 integration

[TODO: the flow used and how token claims map onto database role context — the interesting engineering is in the identity → database-role handoff.]
[TODO: token lifetime, refresh, and revocation handling.]
[TODO: where authorization decisions are made relative to the database — what's in the token, what's in RLS, what's in app code.]

## What HIPAA requires vs. what we chose to do

It's worth separating the mandated floor from the choices above it, because conflating them makes every control look non-negotiable and stops the team from reasoning about cost. [TODO: which of the controls above were mandated.] [TODO: which were defense-in-depth beyond the requirement, and the reasoning for going past the baseline where you did.]

## Pitfalls

The ones with teeth, from the Postgres side:

- **RLS has bypass doors.** Superusers and roles with `BYPASSRLS` skip policies entirely, and table owners do too unless you set `FORCE ROW LEVEL SECURITY`. An RLS design is only as strong as its inventory of who holds those privileges. [TODO: how you closed these off.]
- **Poolers erase identity.** A connection pool that logs in as one service account turns every query into that account unless per-transaction context is scrupulously re-established — and a missed reset means one user reads with another's entitlements. [TODO: the failure mode you tested for here.]
- **Audit gaps hide in the corners.** [TODO: the gaps that are easy to miss in your setup — exports, replicas, backup restores, superuser sessions.]
- [TODO: failure modes actually discovered in testing or review — this is the section readers will trust most.]
