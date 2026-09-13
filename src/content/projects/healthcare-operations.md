---
title: Making healthcare operations easier to coordinate
description: Designing an internal platform at National Breathe Free, now used across 50+ clinics by more than 300 users.
publishDate: 2026-09-13
tags:
  - Healthcare operations
  - Product design
  - National Breathe Free
role: Product owner and lead engineer
diagram:
  title: One team's output becomes the next team's context
  caption: An example of the cross-team workflow the platform supports and is being developed to connect. Clinics supply context; remote teams enrich it through each stage; analysts use the resulting data. Appeals apply when needed.
  steps:
    - label: Procedure insurance verification
      detail: Establish coverage information for the scheduled procedure
    - label: Insurance criteria review
      detail: Review clinic documentation against insurance requirements
    - label: Claim submissions
      detail: Carry the reviewed information into submission work
    - label: Appeals
      detail: Use prior context and submission outcomes when an appeal is needed
  annotation:
    title: What travels between teams?
    body: Each team contributes information the next team needs. Clinic context, verification results, review decisions and submission outcomes form a connected record. Source-controlled fields remain distinct from staff-entered information, and each team remains responsible for its own review.
---

## The work

I joined National Breathe Free in May 2024, straight out of college. Since then, I have designed nearly the entire internal platform that supports this work, combining product ownership with engineering leadership.

The platform serves more than 50 clinics and has more than 300 users in total. The enrichment workflows went live in January 2026. Work on the insurance verification workflow began around July 2026, and it is now live too.

These figures describe the platform's overall reach. They are not separate adoption counts for each feature.

## A daily workflow built around source data

Clinic staff need appointment information and the additional details required by operations teams. Working across trackers and messages makes it harder to keep those details aligned.

The enrichment workflow starts with appointment activity from the source system. Bookings, moves and cancellations populate the relevant report tabs. Staff fill in the information the source does not provide, then submit their work for review.

That division shapes the interface. Source-controlled fields are distinct from staff-entered fields. Searchable choices and typed inputs guide entry, progress saves automatically, and submission checks catch invalid or incomplete fields across all report tabs.

The design has to account for corrections as well as the normal path. A moved appointment, a missing insurance option or an invalid value must give the user a clear next step.

## Verification without waiting for a separate message

The insurance verification workflow gives the verification team a working view of newly scheduled appointments. Staff can see the work that needs attention without relying on separate communication from each office.

The design process covered appointment urgency, clinic-local time, insurance selection and re-verification. It also exposed a practical tension: completed work should leave the active queue, but staff still need to find it when they make a mistake or receive new information.

Search and recovery belong in the workflow for that reason. So does the distinction between carrying information forward and verifying it again. A prefilled value can save entry without replacing the person's review.

## Enrichment across team boundaries

An enrichment workflow is part of a larger chain of work. Clinics provide the appointment context and supporting information. Remote teams add the details and decisions required for their stage, and that output becomes context for the next team. Analysts use the combined data to understand activity and outcomes across clinics.

One example is the path from procedure insurance verification to insurance criteria review, then claim submissions and, when needed, appeals. Verification establishes the coverage information. The criteria review team works with clinic documentation to assess what is needed for the next step. The submissions team carries the reviewed information forward, while an appeals team needs the earlier context and submission outcome to continue the work.

This also creates a feedback path to clinics. If a remote team needs more information, the workflow needs to make the missing information and next action clear. A handoff should preserve the work already done while showing what still needs attention.

That relationship shapes the design: each team needs a view of its own work, with access to the relevant context from earlier stages. Carrying information forward must not imply that the next team's review is already complete. Ownership, readiness and exceptions need to remain visible as the work changes hands.

For analysts, the value extends beyond the final submitted record. The combined source data and human enrichment provide the context for examining volumes, work waiting between teams and outcomes. Designing for those questions means capturing meaningful states and transitions as the work happens, rather than relying on someone to reconstruct the process from separate trackers later.

The full chain describes the broader workflow design. The live enrichment and insurance verification workflows are part of it; it does not mean every downstream stage has already migrated into the platform.

## My role and the team

I led the design of nearly the entire system and worked across product decisions and implementation. I translated stakeholder needs into requirements, prioritized the backlog, set technical patterns and reviewed code.

Our CTO provided direction. Another developer supported implementation and made valuable technical contributions along the way. The breadth of my design ownership reflects a small team, with product and engineering decisions often falling to the same person.

## The hardest decision was below the interface

The hardest decision was how to scale the extraction, transformation and loading pipeline efficiently. The application depends on source data arriving reliably; every reporting workflow inherits the consequences of the ingestion and data-model choices underneath it.

The earlier pipeline coupled extraction, transformation and loading. Processing for multiple offices shared a service, while API limits made large historical pulls and restarts harder to manage. Separating those responsibilities became a substantial engineering effort.

That work is covered in [the companion study on ingestion and data-model evolution](/projects/healthcare-data-foundation/).

## What I would change

I started with the frontend. If I were beginning again, I would start with data ingestion and spend more time on the data model before building the interface.

The source model determines what the product can reliably show, how updates reach a report and how staff-entered information survives those updates. Working through those questions earlier would give the interface a more stable foundation.

## Where the work stands

The enrichment and verification workflows are live. The platform now reaches 50+ clinics and 300+ total users, while its data foundation continues to evolve.

That establishes delivery and reach. I have not attached a percentage reduction in manual work or a time-savings figure to this account because those outcomes have not been measured here.

_Status and scale confirmed September 2026._
