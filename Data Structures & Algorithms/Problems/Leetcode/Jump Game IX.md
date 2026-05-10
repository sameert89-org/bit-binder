#daily_challenge 
2026-05-07

Problem Link: https://leetcode.com/problems/jump-game-ix/description/?envType=daily-question&envId=2026-05-07 

This problem was really good, even though its marked medium and wrongly tagged I love :LiHeart: it!

I came close to solving this. Basically, the observation I made was:

- For the maximum number in the array, the answer is the number itself.

- For anything to the right of the maximum, the answer will also be the maximum, since you cannot do better than that.

- Now, if we go to the second maximum, the same logic applies to its bucket: the answer _should_ be the second maximum, _unless_ there exists a number in the previous maximum’s bucket that is smaller than a number in the current bucket. In that case, that number can happily jump to the previous maximum’s bucket.

This is where I got stuck. I got sidetracked thinking:

_How do I find the rightmost bucket where a number smaller than the current number exists?_

The actual idea to get around this problem is to realize that we can merge intervals.

Basically, any number in the current bucket can jump to the previous bucket if it is greater than some number in that bucket. The best chance we have is to compare it with the _smallest_ number in the previous bucket.

But that still does not solve the search problem.

Then we realize that any number in the current bucket can jump to the current bucket’s maximum, since it is the leftmost number in the current bucket, and everything else is smaller than it and lies to its right. From there, it has the best chance of establishing a path to the previous bucket.

So it is enough to check whether the current maximum is larger than the smallest value in the previous bucket. If this is true, these intervals can be considered one merged interval, and the answer becomes the maximum of the merged interval.

What happens when the third maximum comes into play?

In that case, we only need to try merging with the immediate previous bucket. If merging fails with the immediate previous bucket, that means the current maximum is smaller than the minimum of the previous bucket. Since the second previous bucket also exists, it means the previous two buckets must have failed to merge as well. Therefore, the maximum of the previous bucket was smaller than the minimum of the second previous bucket. That means the minimum of the second previous bucket is even larger, so merging with it is also impossible.

This way, we can perform interval merging in amortized `O(1)` time.

```cpp
class Solution {
public:
    vector<int> maxValue(vector<int>& nums) {
        const int N = nums.size();
        priority_queue<pair<int, int>> maxHeap;
        vector<bool> vis(N);

        for(int i = 0; i < N; i++) {
            maxHeap.push({nums[i], i});
        }

        vector<int> res(N);
        vector<pair<int, int>> intervals{{INT_MAX, -1}}; // [[smallest, largest]]

        while(!maxHeap.empty()) {
            auto [currMax, idx] = maxHeap.top();
            pair<int, int> &lastInterval = intervals.back();
            maxHeap.pop();

            if(vis[idx])
                continue;

            // if current interval can be merged into the next interval
            // then the answer will be previous max for all elements in the current bucket
            // otherwise the answer will be currMax

            bool canMerge = currMax > lastInterval.first;
            
            if(canMerge) {
                for(int i = idx; i < N and !vis[i]; i++) {
                    res[i] = lastInterval.second;
                    lastInterval.first = min(lastInterval.first, nums[i]);
                    vis[i] = true;
                }
            } else {
                int mini = INT_MAX;
                for(int i = idx; i < N and !vis[i]; i++) {
                    mini = min(mini, nums[i]);
                    res[i] = currMax;
                    vis[i] = true;
                }
                intervals.push_back({mini, currMax});
            }
        }

        return res;
    }
};
```