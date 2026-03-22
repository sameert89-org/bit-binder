***monotonic*** means *moving in one direction* either **always increasing** or always **decreasing**

## Monotonic Stack

If you want a **Strictly Increasing** stack, before pushing `x`, you must pop everything that is greater than or equal to `x`.

![[Monotonic Data Structures 2026-03-18 18.29.27.excalidraw]]

**When to use:** "Next Greater Element" or "Previous Smaller Element" problems.

## Monotonic Queue/Deque

Monotonic queue is always implemented using a *deque*.

**The Logic:** You push from the back, but you can pop from **both** ends.

1. **Back pop:** Remove elements smaller than the current one (they'll never be the max again).
2. **Front pop:** Remove elements that have "slid" out of the window range.

**When to use:** Sliding window maximum/minimum problems.