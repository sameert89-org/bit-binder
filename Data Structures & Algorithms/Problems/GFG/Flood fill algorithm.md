#graphs #implicit-bfs #implicit-dfs

# Problem Statement
An `image` is represented by a 2-D array of integers, each integer representing the pixel value of the image.

Given a coordinate **`(sr, sc)`** representing the starting pixel (row and column) of the flood fill, and a pixel value `newColor`, "flood fill" the image.

To perform a **"flood fill"**, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the **same color** as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the **same color** as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.

**Example 1:**

**Input:** image = {{1,1,1},{1,1,0},{1,0,1}},
sr = 1, sc = 1, newColor = 2.
**Output:** {{2,2,2},{2,2,0},{2,0,1}}
**Explanation:** From the center of the image 
(with position (sr, sc) = (1, 1)), all 
pixels connected by a path of the same color
as the starting pixel are colored with the new 
color.Note the bottom corner is not colored 2, 
because it is not 4-directionally connected to 
the starting pixel.

**Your Task:**  
You don't need to read or print anything. Your task is to complete the function **floodFill()** which takes image, sr, sc and newColor as input parameter and returns the image after flood filling.  
 

**Expected Time Compelxity:** O(n*m)  
**Expected Space Complexity:** O(n*m)  
 

**Constraints:**  
1 <= n <= m <= 100  
0 <= pixel values <= 10
0 <= sr <= (n-1)
0 <= sc <= (m-1)
# Approach
just use implicit bfs/dfs and keep track of colors for the thing. We are allowed to modify the matrix itself here, best practice is to not modify the source data.
# Solution
```python
from collections import deque
# Snippet created by sameer 21-08-2023
def valid_neighbors(x, y, graph):
    m, n = len(graph), len(graph[0])
    delta = [(-1,0),(0,-1),(0,1),(1,0)]
    neighbors = []
    for dx,dy in delta:
        r, c = x + dx, y + dy
        if 0<=r<m and 0<=c<n:
            neighbors.append((r,c))
    return neighbors

def bfs_impl(matrix, vertex, newColor):
    sr, sc = vertex
    source_color = matrix[sr][sc]
    matrix[sr][sc] = newColor
    q = deque()
    q.append(vertex)
    while q:
	    x, y = q.popleft()
	    for r, c in valid_neighbors(x, y, matrix):
	        if matrix[r][c] != newColor and matrix[r][c] == source_color:
	            q.append((r, c))
	            matrix[r][c] = newColor


class Solution:
	def floodFill(self, image, sr, sc, newColor):
		bfs_impl(image, (sr, sc), newColor)
		return image

```