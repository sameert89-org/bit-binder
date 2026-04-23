Store the distance in an array, sort it and then return the first k elements, results in a time complexity of NLogN but also a space complexity of O(N)


We can do better by maintaining a min heap of only K elements then returning all of them at the end.

This reduces the complexity to NLogK and space to O(K)

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        const int N = points.size();
        priority_queue<pair<int, int>, vector<pair<int, int>>>
            pq;

        auto dist = [](const vector<int>& point) -> int {
            int x = point[0], y = point[1];
            return x * x + y * y;
        };

        for (int i = 0; i < N; i++) {
            auto p = points[i];

            pq.push({dist(p), i});
            if (pq.size() > k)
                pq.pop();
        }
        vector<vector<int>> res;
        res.reserve(k);

        while (!pq.empty()) {
            res.push_back(points[pq.top().second]);
            pq.pop();
        }
        return res;
    }
};
```