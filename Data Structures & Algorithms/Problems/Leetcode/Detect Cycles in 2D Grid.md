#daily_challenge #graphs #bfs 
2026-04-26

This is a simple cycle detection problem, this can be done using any approach in the [[Cycle Detection]] algorithms mentioned here. In the below implementation I use the same parent idea used in the DFS algorithm in BFS.

 The idea is to run BFS from each node, keeping track of the parent of every visited node; if we encounter an already visited node that is not the current node’s parent, then a cycle exists.
 
```cpp
class Solution {
public:
    vector<pair<int, int>> validNeighbors(int i, int j,
                                          const vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<pair<int, int>> delta = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}}, nbrs;

        for (auto& [dx, dy] : delta) {
            int r = i + dx, c = j + dy;
            if (r >= 0 and r < m and c >= 0 and c < n) {
                nbrs.push_back({r, c});
            }
        }

        return nbrs;
    }

    bool containsCycle(vector<vector<char>>& grid) {
        const int M = grid.size(), N = grid[0].size();
        vector<vector<bool>> vis(M, vector<bool>(N));
        queue<vector<int>> q;

        for (int i = 0; i < M; i++) {
            for (int j = 0; j < N; j++) {
                if (vis[i][j])
                    continue;

                q.push({i, j, -1, -1});
                vis[i][j] = true;

                while (!q.empty()) {
                    int x = q.front()[0], y = q.front()[1], parx = q.front()[2],
                        pary = q.front()[3];
                    q.pop();

                    for (auto [nx, ny] : validNeighbors(x, y, grid)) {
                        if (!vis[nx][ny] and grid[nx][ny] == grid[x][y]) {
                            q.push({nx, ny, x, y});
                            vis[nx][ny] = true;
                        } else if(grid[nx][ny] == grid[x][y]) {
                            if (nx != parx or ny != pary)
                                return true;
                        }
                    }
                }
            }
        }

        return false;
    }
};
```