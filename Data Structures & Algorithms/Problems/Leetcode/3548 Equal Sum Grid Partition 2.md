#daily_challenge 
2026-03-27

This problem is easy to undestand but very tedious to implement.

The thing it mentions about connectivity is a sham to throw you off.

I can remove the element from anywhere if the partition sizes are > 1 and the elements will stay connected.

in case of 1 as the partition size the problem becomes hairy, you can only remove first or last element or the elements just before and after the cut, anything in between will break connectivity.

![[3548 Equal Sum Grid Partition 2 2026-03-27 00.39.03.excalidraw]]
Below is my original solution, its very hard to read.

```cpp
class Solution {
public:
    bool canPartitionGrid(vector<vector<int>>& grid) {
        const int M = grid.size(), N = grid[0].size();
        long long sum = 0;
        unordered_map<long long, vector<pair<int, int>>> mp;

        for(int i = 0; i < M; i++) {
            for(int j = 0; j < N; j++) {
                sum += grid[i][j];
                mp[grid[i][j]].push_back({i, j});
            }
        }

        // check for vertical cut, fix column scan rows
        long long firstHalf = 0;
        for(int j = 0; j < N - 1; j++) { // this takes care of non empty sets
            for(int i = 0; i < M; i++) {
                firstHalf += grid[i][j];
            }
            auto secondHalf = sum - firstHalf;
            if(secondHalf == firstHalf) return true;
            // check if we can remove something from either firstHalf or secondHalf
            long long extra = abs(firstHalf - secondHalf);
            if(firstHalf > secondHalf) {
                // is removal from firstHalf possible?
                if(mp.contains(extra)) {
                    for(auto &[x, y]: mp[extra]) {
                        if(M == 1) {
                            if(j > y and y == 0 or j == y)
                                return true;
                        }
                        else if(y <= j and (j != 0 or x == 0 or x == M - 1))
                            return true;
                    }
                }
            } else {
                // is removal from secondHalf possible
                if(mp.contains(extra)) {
                    for(auto &[x, y]: mp[extra]) {
                        if(M == 1) {
                            if(j != N - 2 and (y == j + 1 or y == N - 1))
                                return true;
                        }
                        else if(y > j and (j != N - 2 or x == 0 or x == M - 1))
                            return true;
                    }
                }
            }
        }

        firstHalf = 0;
        // check for horizontal cut, fix row scan columns
        for(int i = 0; i < M - 1; i++) {
            for(int j = 0; j < N; j++) {
                firstHalf += grid[i][j];
            }

            auto secondHalf = sum - firstHalf;
            if(secondHalf == firstHalf) return true;
            auto extra = abs(firstHalf - secondHalf);
            if (firstHalf > secondHalf) {
                if(mp.contains(extra)) {
                    for(auto &[x, y]: mp[extra]) {
                        if(N == 1) {
                            if(i > x and x == 0 or x == i)
                                return true;
                        }
                        else if(x <= i and (i != 0 or y == 0 or y == N - 1))
                            return true;
                    }
                }
            } else {
                if(mp.contains(extra)) {
                    for(auto &[x,y]: mp[extra]) {
                        if(N == 1) {
                            if(x != M - 2 and (x == i + 1 or x == M- 1))
                                return true;
                        }
                        else if(x > i and (i != M - 2 or y == 0 or y == N - 1))
                            return true;
                    }
                }
            }
        }
        return false;
    }
};
```

4 if statements are never good. 


> [!danger] `std::unordered_map<long long>`
> I was stuck for a long time with this issue wherein I passed 941/942 test cases, the last one was failing and I did not have confidence on either the code or the test cases so I spent a lot of time print debugging instead of blaming it on overflow like usual. But it was an overflow, turns out if you do 
> ```cpp
> long long y = 3482934394892384394LL;
 >   int x = y; 
 >   cout << x; // this works for some gosh darn reason
> ```
> It just works same thing happens with map, it overflows rolls back and returns false presence of numbers.


A cleaner way to do this is to use a check function and transpose the original matrix and only use row-wise cuts.

```cpp
class Solution {
    // Helper to check for a valid vertical partition
    bool check(vector<vector<int>>& grid) {
        int M = grid.size(), N = grid[0].size();
        long long totalSum = 0;
        unordered_map<long long, vector<pair<int, int>>> valToPos;

        for (int i = 0; i < M; ++i) {
            for (int j = 0; j < N; ++j) {
                totalSum += grid[i][j];
                valToPos[grid[i][j]].push_back({i, j});
            }
        }

        long long leftSum = 0;
        // Try every vertical cut between column j and j+1
        for (int j = 0; j < N - 1; ++j) {
            for (int i = 0; i < M; ++i) leftSum += grid[i][j];
            
            long long rightSum = totalSum - leftSum;
            long long diff = abs(leftSum - rightSum);

            if (diff == 0) return true; 

            // If we need to remove 'diff' from the larger side
            if (valToPos.count(diff)) {
                for (auto& [r, c] : valToPos[diff]) {
                    bool inLeft = (c <= j);
                    bool inRight = (c > j);

                    // Check if removing this element from the heavier side balances them
                    if (leftSum > rightSum && inLeft) {
                        if (isRemovable(r, c, M, j + 1)) return true;
                    } 
                    else if (rightSum > leftSum && inRight) {
                        if (isRemovable(r, c - (j + 1), M, N - (j + 1))) return true;
                    }
                }
            }
        }
        return false;
    }

    // Connectivity logic: Can we remove element at (r, c) from an M x W subgrid?
    bool isRemovable(int r, int c, int M, int W) {
        // If width > 1 and height > 1, the piece remains connected regardless of where you pull from
        if (M > 1 && W > 1) return true;
        // If it's a single column (W=1), only top or bottom can be removed
        if (W == 1) return (r == 0 || r == M - 1);
        // If it's a single row (M=1), only left or right can be removed
        if (M == 1) return (c == 0 || c == W - 1);
        return false;
    }

public:
    bool canPartitionGrid(vector<vector<int>>& grid) {
        // 1. Check vertical cuts
        if (check(grid)) return true;

        // 2. Transpose the grid
        int M = grid.size(), N = grid[0].size();
        vector<vector<int>> transposed(N, vector<int>(M));
        for (int i = 0; i < M; ++i)
            for (int j = 0; j < N; ++j)
                transposed[j][i] = grid[i][j];

        // 3. Check horizontal cuts (as vertical cuts on transposed grid)
        return check(transposed);
    }
};
```