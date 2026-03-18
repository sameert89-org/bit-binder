***monotonic*** means *moving in one direction* either **always increasing** or always **decreasing**

## Monotonic Stack

If you want a **Strictly Increasing** stack, before pushing `x`, you must pop everything that is greater than or equal to `x`.

![[Monotonic Data Structures 2026-03-18 18.29.27.excalidraw]]

**When to use:** "Next Greater Element" or "Previous Smaller Element" problems.

## Monotonic Queue/Deque

Monotonic queue is always implemented using ``