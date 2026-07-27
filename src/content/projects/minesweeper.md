---
title: Mastering Recursion in Minesweeper
publishDate: 2022-04-21 18:48:00
img: /assets/minesweeper.webp
img_alt: Illustration of a desktop computer displaying a Minesweeper board with numbered cells, flags, and revealed mines, surrounded by code editor windows.
description: |
  A console Minesweeper game in C++ built around a recursive flood-fill reveal algorithm.
tags:
  - C++
  - Data Structures and Algorithms
  - Recursion
archived: true
---

## The problem

This was a console Minesweeper for a Data Structures and Algorithms course. Most of the game is bookkeeping: read a board from a file, print it, take a click or a flag command, check whether the player hit a mine. The one part that needs an actual algorithm is the reveal.

When a player clicks a cell with at least one adjacent mine, you show the count and stop. When they click a cell with zero adjacent mines, there is nothing to warn them about, so the whole contiguous region of zero-count cells should open at once, along with the numbered cells that border it. Opening one cell per click there would be busywork for the player.

Mid-game the board looks like this, with revealed counts, blanks for opened zero cells, and flags the player has placed:

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

## The key decision

I wrote the reveal as a recursive flood fill over the 8-neighborhood. Reveal the clicked cell; if its adjacent-mine count is zero, call the same function on all eight neighbors that are in bounds and not already revealed. Cells with a nonzero count get revealed but do not recurse, which is what makes the region stop growing at the numbered border.

Illustrative sketch of the shape of it (not the project's actual code):

```cpp
void reveal(Board& b, int r, int c) {
    if (!inBounds(b, r, c)) return;
    if (b.revealed[r][c] || b.flagged[r][c]) return;

    b.revealed[r][c] = true;
    if (b.adjacentMines[r][c] != 0) return;   // border of the region

    for (int dr = -1; dr <= 1; ++dr)
        for (int dc = -1; dc <= 1; ++dc)
            if (dr || dc) reveal(b, r + dr, c + dc);
}
```

The two guards at the top do the real work. Marking a cell revealed before recursing is what terminates the fill, since an already-revealed cell returns immediately and a region can't be re-entered.

## The tradeoff

Recursion here is call-stack recursion, so every pending cell is a stack frame. A large connected region of zero-count cells recurses to a depth proportional to the size of that region, and in the worst case (a board with very few mines) that is O(rows × cols) frames live at once. Each frame carries the board reference, the coordinates, and the loop counters. On a big enough board this overflows the stack, and it fails as a crash rather than as a wrong answer.

The standard fix is to keep an explicit stack or queue and run the fill iteratively as DFS or BFS. The frontier then lives on the heap, where you can grow it well past the thread's stack limit. I did not do that, because the assignment's boards were small enough that the recursive version never came close to the limit, and the recursive form is short enough to check by reading it.

## Outcome

The game works: it loads a board from a file, handles click and flag commands in either case, rejects bad input, and reveals contiguous safe regions in one move. The recursion is a handful of lines and the depth limit is the only thing about it I would change if the boards got larger.

To learn more about this project, check out the <a href="https://github.com/David-Huson/Minesweeper">GitHub Repo</a>
