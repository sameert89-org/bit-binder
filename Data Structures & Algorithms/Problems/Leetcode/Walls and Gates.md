#needcode150 #graphs 
Also known as islands and treasures. 

Problem Link: https://neetcode.io/problems/islands-and-treasure/question

The first approach that comes to mind is using a standard BFS/DFS and calculating the minima assuming that every adjacent cell has been visited, but this is a classic trap, because neighbor of a cell also has the cell as the neighbor so `ans[neighbor]` cannot be determined unless you know the `ans[cell]` which creates a circular dependency. 


The right approach of solving this problem is a Multi Source BFS from the treasure chests. Since it grows outward FROM the treasures you can be sure that the least distance is assigned to neighbors which can then propagate it up the chain.

Below is a C++ implementation of the idea:

```cpp
class Solution {
public:
    vector<pair<int,int>> validNeighbors(int x, int y, const vector<vector<int>> &grid) {
        int m = grid.size(), n = grid[0].size();
        vector<pair<int, int>> nbrs, delta{{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        for(auto [dx, dy]: delta) {
            int r = x + dx, c = y + dy;
            if(r >= 0 and r < m and c >= 0 and c < n) 
                nbrs.push_back({r, c});
        }

        return nbrs;
    }
    static constexpr int INF = 2147483647;
    
    void islandsAndTreasure(vector<vector<int>>& grid) {
        const int M = grid.size(), N = grid[0].size();
        vector<vector<bool>> vis(M, vector<bool>(N));
        // Multi Source BFS from Treasure Chests
        queue<pair<int, int>> q;
        for(int i = 0; i < M; i++) {
            for(int j = 0; j < N; j++) {
                if(grid[i][j] == 0) {
                    q.push({i, j});
                    vis[i][j] = true;
                }
            }
        }
        int dist = 1;
        while(!q.empty()) {
            int sz = q.size();

            for(int i = 0; i < sz; i++) {
                auto[x, y] = q.front();
                q.pop();

                for(auto[nx,ny]: validNeighbors(x, y, grid)) {
                    if(!vis[nx][ny] and grid[nx][ny] != -1) {
                        grid[nx][ny] = 1L + grid[x][y];
                        q.push({nx, ny});
                        vis[nx][ny] = true;
                    }
                }
            }
        }
    }
};

```