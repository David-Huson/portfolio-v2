---
title: Python-Lisp FSA parser
publishDate: 2022-04-21 18:48:00
img: /assets/xlisp-fsa.webp
img_alt: Stylized illustration of an isometric state-machine diagram labeled xLisp, surrounded by Lisp code snippets and small transition graphs.
description: |
  A project developed to explore the world of code generation and finite state automata.
tags:
  - xLisp
  - Python
  - Computation Theory
archived: true
---

## The problem

This project had two parts. The first was an xLisp program that simulates a finite state automaton: it takes an input string describing the alphabet, the states, the transitions, the initial state, and the final states, then decides whether a given sequence of symbols is accepted. The second part was a Python program that, given an FSA description, produces that xLisp program as output.

## The decision

The interesting constraint is in the second part. Python could simulate the FSA directly in about the same amount of code. Instead the Python program is a code generator: its output is Lisp source text, and the answer only comes out when that text is run through the Lisp interpreter. Python never evaluates a transition itself. It decides what the Lisp program should say and writes it.

## The tradeoff

Generating source in another language means the two languages fail at different times. A Python bug in the generator shows up as a Lisp problem, and only once you run the output. A missing parenthesis or a wrong quote in the emitted code is perfectly valid Python string handling, so nothing goes wrong until the Lisp reader chokes on it. Writing the Lisp by hand puts syntax errors in front of you immediately; generating it defers them to the interpreter and leaves you reading machine-written parentheses to find the cause.

## Outcome

Both halves work: the xLisp simulator accepts an FSA description and tests strings against it, and the Python generator emits that simulator for a given FSA.

To learn more about this project, check out the <a href="https://github.com/David-Huson/COP4020-ProgrammingLanguages/tree/main/project4">GitHub Repo</a>
