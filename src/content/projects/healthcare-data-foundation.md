---
title: Starting with the data foundation
description: The hardest part of scaling an internal healthcare platform was the ETL pipeline. A study of ingestion boundaries, data ownership and a migration still in progress.
publishDate: 2026-09-09
tags:
  - Data engineering
  - System design
  - National Breathe Free
role: Product owner and lead engineer
diagram:
  title: Separate source data from human input
  caption: A conceptual ownership diagram for the evolving data foundation, not a deployment map or a claim that the migration is complete.
  steps:
    - label: Source observations
      detail: Ingest records with their source identity and provenance
    - label: Canonical entities
      detail: Resolve identities and relationships consistently
    - label: Workflow context
      detail: Combine source context with separately owned staff input
    - label: Application
      detail: Present the fields and actions required by the workflow
  annotation:
    title: Protect the work people have already done
    body: Incoming source updates and staff-entered information have separate ownership. The new design uses controlled commands and event history for workflow changes so ingestion does not overwrite human input.
---

## The problem behind the product

At National Breathe Free, I designed nearly the entire internal platform behind our reporting and verification work. Our CTO provided direction, and another developer supported implementation and contributed technical solutions.

As the platform grew, the hardest decision was how to scale its ETL pipeline efficiently. The live application needed timely source data, while historical loads, retries and changes to the data model had to coexist with daily use.

## Separating responsibilities

The earlier pipeline tightly coupled extraction, transformation and loading in a single service. Multiple offices shared that service's restart behavior. API rate limits and sequential requests complicated historical extraction and recovery after restarts.

The architecture work separated extraction from downstream processing. Extracted artifacts can be stored and passed through a queue by reference. That creates a boundary where transformation can retry against retained input, rather than requiring every stage to succeed together.

It also introduces work of its own. Queued delivery needs explicit retry behavior, durable inputs and enough provenance to explain what happened to an artifact. Splitting a service is useful only if those responsibilities become easier to operate.

## Getting identity and ownership right

The newer ingestion path maps source observations into canonical entities. Identity includes the source's office scope, so a source identifier is not assumed to be globally unique.

Related records can arrive out of order. The mapping contract defers unresolved relationships rather than creating placeholder entities just to complete a batch. Reprocessing the same input should converge on the same state without creating another revision unnecessarily.

Source data and staff-entered enrichment have separate ownership. The workflow design routes human changes through controlled commands with history, instead of putting those values in the path of source upserts.

## A stable contract for the interface

The definition compiler combines pinned workflow, field and template versions into an editor definition. The UI receives stable field keys and declared editing rules rather than binding directly to physical database columns.

This lets storage adapters absorb some schema changes and lets definition validation reject others before they silently produce an empty or incorrect report. It also requires explicit version management. A published definition must retain its meaning for the reports that depend on it.

## Proving the transition before activation

The migration work includes replay and reconciliation through isolated database and AWS staging environments. The checks compare identities, relationships, current state and revisions, and verify that canonical processing leaves the legacy path unchanged within a controlled validation window.

The rollout plan keeps the existing system current while the new path is introduced. Separate consumers can retry independently, and the application can retain a read fallback during observation. Legacy retirement is a later decision with its own acceptance criteria.

Keeping both paths running costs more and creates reconciliation work. It also avoids treating the first successful activation as proof that the old system can immediately be removed.

## Current status

As of September 2026, the definition compiler is recorded complete. Canonical ingestion and database validation have accepted engineering evidence. The new workflow runtime has an implementation behind a disabled read gate and is still in review.

Production activation and legacy retirement remain separate steps. This is an account of design and validated implementation in progress, not a completed migration or a production performance benchmark.

## What I would do differently

I would start with ingestion and spend more time on the data model before building the frontend.

The reporting interface was the visible part of the problem, but its behavior depends on less visible decisions: what identifies a record, how relationships resolve, who owns a value and what a replay is allowed to change. I would settle more of those decisions before using the interface to define the system.

For the live product context, see [Making healthcare operations easier to coordinate](/projects/healthcare-operations/).
