graphs #bfs
Given an `m x n` integer matrix `heightMap` representing the height of each unit cell in a 2D elevation map, return _the volume of water it can trap after raining_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/08/trap1-3d.jpg)

**Input:** heightMap = `[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
**Output:** 4
**Explanation:** After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/08/trap2-3d.jpg)

**Input:** heightMap = `[[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]`
**Output:** 10

**Constraints:**

- `m == heightMap.length`
- `n == heightMap[i].length`
- `1 <= m, n <= 200`
- `0 <= heightMap[i][j] <= 2 * 104`

# Approach
The standard 2d approach does not work, in 2d approach, we simply use:

Water trapped on top of current cell = min(largest tower towards right, largest tower towards left) - height of current cell

These largest ones are easily calculated using stacks. In 3d you might think we can calculate the largest in all 4 directions. And simply take min of that - height.

But this does not work, see the below test case.

`vector<vector<int>> case2{{{12,13,1,12},{13,4,13,12},{13,8,10,12},{12,13,12,12},{13,13,13,13}}};`

This one forms a wierd L-shape, if you use the modified 2d you will get answer as 15, but because of the L shape and one of the boundaries being shorter the water will rise to atmost that since the L is touching that boundary.

![[Trapping Rainwater 2 2025-10-04 01.54.01.excalidraw]]
*So what to do in this case?*

After failing that test case, we realize that:

water at a cell = min (net height of 4 neighboring cells) - height of the cell.

 *What is net height?*
 Well its the height + water (if any) of a cell,  For the L case if we knew at the 4, that how much water was 8 holding then we could have found it correctly. Similarly for 8 we could have known how much water was 10 holding, we could have had it!

This seems like a recursive neighbor solution, for each of my neighbors calculate some value, but for each value all other neighbors must be known. It is also mouth watering to see that we have a base case as well i.e. the boundary always storing 0 water.

We jump into DFS!

*Why DFS does not work?*
For each iteration of DFS, you need to know the net height of all 4 neighbors, you can then return the correct answer.  But with all our "base-cases" do we have a single recursion level solved? lets start at the very corner with this guy, since this is the most supported one with base-cases.

![[Trapping Rainwater 2 2025-10-04 02.07.18.excalidraw]]

Seems like we only know 50-50, and as a result block x will be dependent on block y to be finished and block y will be dependent on block x to be finished, hence it is not possible to get a result. 

Hmm what other algorithm works with neighbors? We think of BFS, can plain bfs work?

We start at a random position traverse all 4 neighbors then their neighbors and so on, but what benefit does it have, when I get to touch the 4 neighbors they are not having the net-height so whatever result I get is useless.

This is a major pitstop and that's why this question is so ass.

I had to cheat at this point, but we can fake the intuition as (*I swear interviewer sama I haven't seen this problem in my life*)

I need to look for a base case, there has to be a way to calculate atleast one 1 other block leaving the boundaries.

Let's think about a cell touching a boundary, there are 2 possible cases with height:

- Height of the cell > height of the boundary cell
- Height of the cell < height of cell
- = is for morons, let me cook

If a cell has more height then water = 0
If a cell has less height then water = height of boundary cell - height of its own

This is always true for for the smallest boundary cell among all boundary cells.

Okay, first is understandable, but where did I pull the second one from (out my ass?) No (I am not into that)

I will say this, THERE IS ABSOLUTELY NO CONFIGURATION OF CELLS IN WHICH THE BOUNDARY TOUCHING CELL WHICH IS ALSO SHORTER HAS WATER != height of shortest  boundary cell - height of its own.

All possible configurations:

1. You have 3 big boy cells around the tiny cell => same result
2. You have even smaller cells around => since this boundary cell is the shortest no every other boundary cell is larger than this, hence these tiny cells around the current cell just drown.
3. Any other combo results in the same of 1,2 because water is governed by min(net_heights)

There we have it our base case, so it makes sense to start from the smallest boundary cell. But then what? 

You got 1 cell answer, but how to solve the whole matrix, what about other boundary cells? 

If I go to the next shortest boundary cell, if its tied in the race of being shortest boundary cell then it guarantees me 1 more answer. 

What if it doesn't? then what?
Well the reason we were not starting from any other cell was that this shortest cell could have influenced the water stored by the neighbor of that other cell, but now 

Since we have the answer to 1 more cell, it can also act as a boundary cell, since we know how much water it stores, if its smallest right now then it guarantees one more answer. 

So the thing is we need to move to next smallest boundary, process its non-boundary neighbor and get its answer.

This seems very much the job of a *min-heap*.

## Implementation
```cpp
vector<pair<int, int>> valid_neighbors(int x, int y, vector<vector<int>> &graph){
    vector<pair<int, int>> neighbors, delta{{{0,-1}, {-1, 0}, {0, 1}, {1, 0}}};
    int m = graph.size(), n = graph[0].size();
    for(auto const &[dx, dy]: delta){
        int r = x + dx, c = y + dy;
        if(r >=0 and r < m and c >= 0 and c < n) neighbors.push_back({r,c});
    }
    return neighbors;
}

class Solution {

public:
    int trapRainWater(vector<vector<int>>& heightMap) {
		int m = heightMap.size(), n = heightMap[0].size();
       	priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> pq; // value, abscissa, ordinate 
       	// pushing the boundary
		vector<vector<bool>> visited(m, vector<bool>(n));
		// first row and last row
		for(int j = 0; j < n; j++){
			pq.push(make_tuple(heightMap[0][j], 0, j));
			pq.push(make_tuple(heightMap[m-1][j], m-1, j));
			visited[0][j] = true;
			visited[m-1][j] = true;
		}
		// first column and last column
		for(int i = 1; i < m-1; i++){
			pq.push(make_tuple(heightMap[i][0], i, 0));
			pq.push(make_tuple(heightMap[i][n-1], i, n-1));
			visited[i][0] = true;
			visited[i][n-1] = true;
		}

		int totalWaterCollected = 0;

		// greedy bfs
		while(!pq.empty()){
			auto [val, x, y] = pq.top();

			pq.pop();
			for(auto const &[r,c]: valid_neighbors(x, y, heightMap)){
				if(!visited[r][c]){	
					if(heightMap[r][c] < val){ // shorter than current boundary cell's height, then answer has to be = boundary cell
						totalWaterCollected += val - heightMap[r][c];
						heightMap[r][c] = val; // updated height
					}
					pq.push(make_tuple(heightMap[r][c], r, c));
					visited[r][c] = true;
				}
			}
		}
		return totalWaterCollected;	
    }
};

```

# Read More
[[Breadth First Search (BFS)]], [[Depth First Search (DFS)]]