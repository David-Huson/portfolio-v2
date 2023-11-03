---
title: Mastering Recursion in Minesweeper
publishDate: 2022-04-21 18:48:00
img: /assets/minesweeper.webp
img_alt: Horse on the left and human on the right with a bright green and blue background. Text in the front that asks, horse or human?
description: |
  A project developed to explore the world of code generation and finite state automata.
tags:
  - C++
  - Data Structures and Algorithms
  - Recursion
---

## The Challenge

Developing a Minesweeper game is a classic exercise that tests the boundaries of logic and skill in programming. My latest project, part of a rigorous Data Structures and Algorithms (DSA) course, was no exception. The twist? It required a recursive algorithm, all implemented in the robust C++ language.

## The Requirements

The project had clear requirements:

1. **User Interaction**: The program starts by asking for an input file. This input file constructs the game board.
2. **Error Handling**: If the file can’t be read, an error message prompts a retry.
3. **Gameplay Mechanics**:
    - The current board status is displayed, and the user is asked for the next move.
    - Moves include clicking a cell (e.g., `c 2 3`) or toggling a flag (e.g., `f 6 0`).
    - Both upper and lower case commands are valid.
    - Error messages handle wrong commands or invalid cell interactions.

## Sample Board Display

Minesweeper's appeal partly lies in its simplicity. The board - a grid of cells, some hiding mines (indicated by an asterisk '*'), and others safe. Here’s a peek at how a board looks mid-game:

```lua
    0   1   2   3
  +---+---+---+---+
0 | ▢ | ▢ | 1 | 1 |
  +---+---+---+---+
1 | 1 | 1 | 2 |   |
  +---+---+---+---+
2 | ⚑ | 2 | 4 |   |
  +---+---+---+---+
3 | 2 | ⚑ | 3 |   |
  +---+---+---+---+
```

## The Recursive Twist

Recursive algorithms are at the heart of this project. When a cell is clicked, the program recursively reveals adjacent cells if they're free of mines, elegantly unfolding the safe areas of the board in a domino effect. This critical piece of logic not only adds efficiency to the code but also a satisfying reveal to the gameplay.

## The Learning Curve

Tackling this project sharpened my skills in several areas:

- **File I/O**: Reading from an input file taught me the importance of robust file handling.
- **Error Handling**: Implementing comprehensive error messages refined my approach to user experience.
- **Recursion**: The recursive reveal algorithm was a deep dive into efficiency and logic.
- **User Interface**: Crafting a clear and interactive console-based UI tested my design skills.

## Conclusion

From recursive algorithms to user interface design, this Minesweeper project has been a comprehensive exercise in applying DSA principles in C++. It has reinforced my understanding of recursion, while also challenging me to think about user interaction and program robustness. As I continue my journey in computer science, these skills are not just achievements, but also tools that will propel me toward more complex and fascinating challenges.

To learn more about this project, check out the <a href="https://github.com/David-Huson/Minesweeper">GitHub Repo</a>
