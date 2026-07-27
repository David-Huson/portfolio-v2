---
title: Python FSA Generator
publishDate: 2023-11-2 14:40:00
img: /assets/fsa-generator-thumbnail.webp
img_alt: Illustration of a monitor showing a colorful state-transition diagram flanked by code listings, with a Python logo on the desk.
description: |
  A Python and Tkinter tool that parses a finite state automaton description and draws its state diagram.
tags:
  - Python
  - Computation Theory
archived: true
---

## The problem

A finite state automaton is easy to write down as text and hard to read that way. For this course project I had to take an input string describing an FSA's state transitions, parse it into states and transitions, and draw the corresponding state diagram: circles for states, arrows for transitions.

The parsing half is mechanical. The drawing half is not, because the text description says nothing about where anything goes on screen.

## The decision

I used Python with Tkinter's canvas for the rendering. Tkinter ships with the standard library, so the program runs on any Python install without a package manager step, and the canvas gives you exactly the primitives a state diagram needs: ovals, lines, arrowheads, and text.

## The tradeoff

Tkinter is dated, and the canvas is a low-level drawing surface rather than a graph renderer. It has no notion of a node or an edge, so placing states and routing arrows between them is my code's problem. A real layout engine like graphviz solves that properly: it spaces nodes to avoid overlap and routes edges around them. My placement is crude by comparison, and it will look worse the more states you give it. In exchange the project has no dependencies to install and nothing to break.

## Outcome

The program reads an FSA description and opens a window with the diagram drawn from it. It does what the assignment asked, and the layout is the part I would replace first.

To learn more about this project, check out the <a href="https://github.com/David-Huson/COP4020-ProgrammingLanguages/tree/main/project3">GitHub Repo</a>
