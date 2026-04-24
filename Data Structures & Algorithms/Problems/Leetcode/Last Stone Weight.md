#neetcode150  #heaps 
The straightforward approach to this problem would be calculating the maximum 2 rocks every time in the array then smashing results in setting them to 0. This is results in O(N^2) algorithm which is certainly not good enough.

The optimized solution to this problem is by using a max-heap, which allows us to keep track of the heaviest 2 stones and then efficiently pop them out do the operation and push them back.

 We repeat this process until fewer than two stones remain, and the overall time complexity is O(N log N).
 
```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int, vector<int>> pq;

        for (auto const& stone : stones) {
            pq.push(stone);
        }

        while (pq.size() > 1) {
            int heaviest = pq.top();
            pq.pop();
            int secondHeaviest = pq.top();
            pq.pop();

            if (heaviest - secondHeaviest > 0)
                pq.push(heaviest - secondHeaviest);
        }

        return pq.empty() ? 0 : pq.top();
    }
};
```