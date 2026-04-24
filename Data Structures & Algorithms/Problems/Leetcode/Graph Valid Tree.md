#needcode150 #graphs 

This is a classic cycle detection in a graph problem, a tree a graph where there are no cycles. This can be done by tracking parents while traversals.

Basically during traversal you are bound to come across a situation where an already visited index shows up, normally you'd ignore this with the help of a visited set. But in this case you need to check where this is originating from.

![[Graph Valid Tree 2026-04-24 15.46.50.excalidraw]]