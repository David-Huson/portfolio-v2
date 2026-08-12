---
title: Automating a Report Told Us the Old One Was Wrong
publishDate: 2026-07-27
description: |
  Automating a manual clinical report surfaced an error rate above 70% in the legacy process - and what that says about trusting hand-assembled data.
tags:
  - automation
  - data-quality
  - healthcare
draft: true
---

<!-- TODO: update publishDate when published -->
<!-- DRAFT: bracketed [TODO: ...] placeholders need real facts before publishing; keep draft: true until resolved -->

## The manual process

There was a clinical report that people assembled by hand. [TODO: generic, non-identifying description — data gathered from which kinds of places, roughly how many steps, how long it took.] It ran [TODO: cadence] and went to [TODO: who consumed it, generically]. Nobody thought of it as a risk. It was just how the report got made, and it had been made that way for [TODO: how long].

## The automation

We automated it — [TODO: one or two sentences on what the automated version does and what it pulls from]. As part of the rollout we ran the two side by side and compared outputs line by line. [TODO: how the comparison was actually done and over what period.]

## The surprise

We expected the automation to save time. What it actually did first was grade the old process: more than 70% of the manually assembled report was wrong.

[TODO: what kinds of errors — transcription, stale data, missed records, arithmetic.]
[TODO: how long the errors had gone unnoticed, and why nobody caught them.]

Nobody had been careless. The process was simply the kind that hides its own failure rate: every number looked plausible, nothing downstream loudly broke, and no one had ever had a second copy to compare against.

## What that says about manual data work

A manual process has no error bars. It reports a number with the same confidence whether it's right or wrong, and checking it costs as much as producing it — so nobody checks. The error rate isn't zero; it's *unmeasured*, which feels the same until the day it doesn't.

That's the reframe I took away: automation isn't only a labor saver. It's a measurement instrument. The first thing an automated pipeline produces is a second, independent answer — and the disagreement between the two is data you have never had before.

## Takeaway

If a number matters and it's assembled by hand, its accuracy is unknown — not high, unknown. [TODO: one sentence on what happened after — whether the finding changed how other manual processes were treated.]
