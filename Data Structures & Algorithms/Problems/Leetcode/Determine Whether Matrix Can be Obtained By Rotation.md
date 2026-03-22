#daily_challenge 
2026-03-22

Problem Link: [Determine Whether Matrix Can Be Obtained By Rotation](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/)

This is a good problem, even though its marked easy. The two core things to learn out of this problem are how to do matrix rotations in place and how to check the rotations without actually doing rotation.

![[Determine Whether Matrix Can be Obtained By Rotation 2026-03-22 12.11.07.excalidraw|800]]

From the above image we can observe that rotation follows a pattern in i, j. The easiest to visualize is the $90\deg$ rotation,  Then other equations can be found by using again rotating by rotating the 90 degree coordinates by 90 degree.

Even though not needed for this question, an interesting thing about 90 degree rotation is its relation with *transpose*.


> [!INFO] Matrix Transpose
> Tranpose of a square matrix  is a matrix obtained by swapping its rows and columns, effectively flipping it over its main diagonal

The 90 degree rotation is just matrix transpose -> reveresed rows.

