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
> I was stuck for a long time with this issue wherein I passed 941/942 test cases, the last one was failing and I did not have confidence on either the code or the test cases so I spent a lot of time print debugging instead of blaming it on overflow like usual. But it was an overflow, turns out if you do int x = "A long long value"; this clearly works in c++ i don't know why 
