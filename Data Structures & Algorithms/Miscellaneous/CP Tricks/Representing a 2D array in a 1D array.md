This is super usefuly for matrix problems. There are 2 kinds of mappings possible:

### Row Major
In this mapping the traversal is done row-wise, this is most commonly used.

![[Representing a 2D array in a 1D array 2026-04-18 11.28.49.excalidraw]]

The index mapping is as follows

$i_{2D} = i_{flat} / C$
$j_{2D} = i_{flat}\mod{C}$

and reverse:

$i_{flat} = i_{2D}\cdot C + j_{2D}$

Where, $\{i_{2D}, j_{2D}\}$, represents the coordinates in the 2D matrix and $i_{flat}$ represents the index in 1D array and $C$ is the number of columns.


### Column Major
In this mapping the columnwise traversal is done.

![[Representing a 2D array in a 1D array 2026-04-18 11.39.19.excalidraw]]

The index mapping in this case is as follows:

$i_