#daily_challenge 
2026-03-20

This problem is just bruteforce, it was just having to read the many details the questions has (Like I missed the unique part).

```cpp
class Solution {
public:
    vector<vector<int>> minAbsDiff(vector<vector<int>>& grid, int k) {
        const int R = grid.size(), C = grid[0].size();
        vector<vector<int>> result(R - k + 1, vector<int>(C - k + 1));

        auto findMinAbs = [&](const int &i, const int &j) -> int {
            //cout << i << ", " << j << endl;
            vector<int> flatSubMatrix;
            for(int x = i; x < i + k; x++) {
                for(int y = j; y < j + k; y++) {
                    flatSubMatrix.push_back(grid[x][y]);
                }
            }
            sort(flatSubMatrix.begin(), flatSubMatrix.end());
            flatSubMatrix.erase(unique(flatSubMatrix.begin(), flatSubMatrix.end()), flatSubMatrix.end());
            if(flatSubMatrix.size() == 1)
                return 0;
            int res = INT_MAX;
            for(int x = 0; x < flatSubMatrix.size() - 1; x++) {
                //cout << flatSubMatrix[x] << ", ";
                res = min(res, abs(flatSubMatrix[x + 1] - flatSubMatrix[x]));
            }
            //cout << endl;
            return res;
        };

        for(int i = 0; i < R - k + 1; i++) { 
            for(int j = 0; j < C - k + 1; j++) {
                result[i][j] = findMinAbs(i, j);
            }
        }
        return result;
    }
};
```