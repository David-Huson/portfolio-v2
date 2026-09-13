---
title: Making healthcare operations easier to coordinate
description: Designing an internal platform at National Breathe Free, now used across 50+ clinics by more than 300 users.
publishDate: 2026-09-09
tags:
  - Healthcare operations
  - Product design
  - National Breathe Free
role: Product owner and lead engineer
diagram:
  title: A shared daily workflow
  caption: A simplified view of the live enrichment workflow. Source appointment data and staff-entered information have different owners.
  steps:
    - label: Appointment activity
      detail: Bookings, changes and cancellations from the source system
    - label: Staff enrichment
      detail: Staff complete the remaining operational fields
    - label: Validation
      detail: Required fields and input rules checked before submission
    - label: Review
      detail: Submitted work moves to the reviewing team
  annotation:
    title: Who owns each value?
    body: Appointment information comes from the source system. Staff enter the additional information their workflow requires. Keeping that distinction visible helps people understand where a correction belongs.
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
