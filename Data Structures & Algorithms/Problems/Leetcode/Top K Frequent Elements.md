#neetcode150  #arrays #hashing  #heaps
#flashcards/dsa_revision

Problem Link: https://leetcode.com/problems/top-k-frequent-elements/description/

The first thing that comes to mind is frequency counting, we can count the frequencies of each elements and keep them in a map and return the k highest frequency by iterating at last on the frequency map.

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
       return list(x for x, y in sorted(Counter(nums).items(), key=lambda x:-x[1]))[0:k]
```

The other approach is similar but uses a priority queue and sorting, we can sort the array and then linearly do frequency count, as soon as the current number finishes we push this to the priority queue and return the top k next.

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        priority_queue<pair<int, int>, vector<pair<int, int>>> pq;
        sort(nums.begin(), nums.end());
        int curr = nums[0], curr_num_count{};
        for(auto i: nums){
            if(i == curr) curr_num_count++;
            else{
                pq.push({curr_num_count, curr});
                curr_num = 1;
                curr = i;
            }
        }
        pq.push({curr_num_count, curr});
        vector<int> res;
        while(k--){
            res.push_back(pq.top().second);
            pq.pop();
        }
        return res;
    }
};
```

The most optimal solution is to combine the both approaches:
Use map for frequency counting and use a min heap (instead of max heap above), we keep the size of the queue fixed at k and we keep popping the smallest frequency element if we get over k.

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
       unordered_map<int, int> m;
       for(int i = 0; i < nums.size(); i++){
        m[nums[i]]++;
       } 
       priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> min_heap;

       for(auto const &it: m){
        min_heap.push({it.second, it.first});
        if(min_heap.size() > k)
            min_heap.pop();
       }
       vector<int> result;
       while(!min_heap.empty()){
        result.push_back(min_heap.top().second);
        min_heap.pop();
       }
       return result;
    }
};
```

## Flashcards
Does the optimal solution of K most Frequent Elements use Min Heap?::Yes it uses min heap, we bind the size of the min_heap to k and keep popping if it exceeds that , this saves us space and time since heapify grows as the lenght grows. **top-k-approach**
<!--SR:!2026-03-31,11,270-->