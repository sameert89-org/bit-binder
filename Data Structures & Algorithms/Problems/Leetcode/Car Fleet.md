#needcode150  #stack #sorting

 Problem Link: [Car Fleet - LeetCode](https://leetcode.com/problems/car-fleet/)


![[Car Fleet 2026-03-19 19.18.31.excalidraw]]

There is no bruteforce for this problem, sorting works, and going from the back you can see, if two cars reach at the same time one behind the other they belong to the same fleet.

```cpp
#include<limits>
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int N = position.size();
        vector<pair<int, int>> posSpeed;
        for(int i = 0; i < N; i++) {
            posSpeed.push_back({position[i], speed[i]});
        }

        sort(posSpeed.begin(), posSpeed.end());
        // go from right
        int fleets = 0;
        float time = -numeric_limits<float>::infinity();
        for(int i = N - 1; i > -1; i--) {
            auto [pos, speed] = posSpeed[i];
            float currTime = (static_cast<float>(target) - pos) / speed;
            if(currTime > time) {
                time = currTime;
                fleets += 1;
            }
        }

        return fleets;
    }
};
```