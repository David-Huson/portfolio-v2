---
title: C Recursive Descent Parser
publishDate: 2023-11-2 10:55:00
img: /assets/recursive-descent.webp
img_alt: Illustration of a parse tree drawn as branching circuit-like paths in a window titled Recursive Descent Parser and Intermediate Representation, with code and diagrams behind it.
description: |
  A lexer, recursive descent parser and symbol table in C, extended to emit intermediate code with simulated register allocation.
tags:
  - C
  - Parser
  - Static Analysis
archived: true
role: Course project author
diagram:
  title: From source text to intermediate representation
  caption: Simplified from the project account. Symbol-table lookup supports identifier handling. The IR stage was added in the follow-on assignment.
  steps:
    - label: Source
      detail: Small arithmetic language
    - label: Tokens
      detail: Identifiers and operators
    - label: Grammar
      detail: Recursive descent
    - label: IR
      detail: Virtual registers
  annotation:
    title: Why keep the grammar visible in the code?
    body: Each nonterminal has its own function. Expression, term and factor encode precedence through their nesting. This makes a small fixed language straightforward to inspect, at the cost of changing the C source whenever the grammar changes.
---

## The problem

For a programming languages course I had to build a front end for a small language: tokenize the input, check that the token sequence fits the grammar, track identifiers in a symbol table, and report whether the program is legal. A follow-on part of the same project extended the parser to emit an intermediate representation with simulated register allocation for the same grammar. The input could contain comments and statements that spanned multiple lines, and syntax errors had to be reported rather than silently skipped.

The constraint that shaped everything was the language: C, not C++. I had been writing C++, where the STL gives you `std::string`, `std::unordered_map`, and containers that manage their own memory. In C, identifiers are `char*` buffers I allocate with `malloc` and free myself, comparison is `strcmp`, and there is no map type at all.

## The grammar

The language is a block of assignment statements over integer arithmetic. In EBNF, one production per parser function:

```
program    → 'begin' statement { statement } 'end' '.'
statement  → identifier '=' expression ';'
expression → term { ('+' | '-') term }
term       → factor { ('*' | '/') factor }
factor     → identifier | number | '(' expression ')'
```

At the lexical level, numbers are unsigned integer literals, and an identifier starts with a letter followed by letters, digits, and underscores — with no consecutive underscores and no trailing underscore, so `a_b_7` is legal while `e__7` and `abc_` are not. Comments run from a tilde (`~`) to the end of the line, and statements can span lines or share one.

The nesting in the grammar is what encodes precedence: `expression` is built from `term`s joined by `+`/`-`, and `term` from `factor`s joined by `*`/`/`, so multiplication binds tighter than addition without any explicit precedence table. Parentheses re-enter `expression` from `factor` to override it.

## The key decision

I wrote the parser as recursive descent: one function per nonterminal, each responsible for consuming the tokens its production allows and calling the functions for the nonterminals on its right-hand side. The call stack does the work a parse tree would otherwise do, so the parser's control flow reads like the grammar itself. That matters when the grammar is small and hand-written, and it avoids pulling in a parser generator or building an explicit tree just to walk it once.

For the symbol table I hand-rolled a hash table: a hash function over the identifier string, an array of buckets, and chaining for collisions. This was not a design choice so much as a consequence of C having no standard associative container. Lookup happens on every identifier reference, so a linear scan over a list would have been the lazy alternative and a hash table was worth the extra code.

## The tradeoff

Recursive descent is easy to read and easy to step through in a debugger, and it costs you generality. It cannot parse a left-recursive production without rewriting the grammar, since the function would call itself before consuming a token. It commits to a decision using limited lookahead, so ambiguity in the grammar has to be resolved by hand rather than by the parsing algorithm. And every change to the grammar is a change to the C source, where a generated parser would just be regenerated. For a small fixed grammar in a course project, none of those bite; for a language that keeps growing, they would.

## Error recovery

Any recursive descent parser has to decide what to do when the current token doesn't match what the production expects. The two usual answers:

- **Report and halt.** Print the error with its line number and stop. Simple to implement, and the reported error is always the real one, but the user only ever sees the first mistake in their file.
- **Panic-mode synchronization.** Report the error, then discard tokens until reaching one in a synchronizing set (a statement terminator, a closing delimiter, a keyword that can only start a new statement), and resume parsing from there. The user sees more of their errors in one pass, at the cost of cascading false positives when the parser resynchronizes in the wrong place.

I chose report-and-halt. All error reporting funnels through the parser's single `match()` function: when the lookahead token doesn't match what the production expects, it prints a message specific to the expected token — a missing closing parenthesis, a missing `begin` or `end`, a statement without its terminating semicolon, an assignment without `=` — always with the line and column where the mismatch was detected, then frees the symbol table and exits. One error per run, but it is always a real error with a precise location, and there are no cascading false positives to explain. If the whole input parses, the program prints `Success!` and dumps every identifier recorded in the symbol table.

## Outcome

The result is a working lexer, parser, and hash-table symbol table in C, extended in the project's second part into an IR emitter with simulated register allocation (three-address statements over virtual registers `R0, R1, …`). It handles comments and multi-line statements and reports syntax errors with line and column. It is a coursework front end, not a compiler: there is no optimization pass and the register allocation is simulated rather than targeting real hardware.

To learn more about this project, check out the <a href="https://github.com/David-Huson/COP4020-ProgrammingLanguages/tree/main/project1">GitHub Repo</a>
