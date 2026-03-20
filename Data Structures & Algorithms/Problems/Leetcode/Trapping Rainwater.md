#needcode150 #two-pointers #flashcards/dsa_revision 

This is not a stack problem lil bro. Why the fuck do you keep thinking that this & [[Container With Most Water]] is of stacks??

![[Pasted image 20260311180431.png]]

Basically visualizing this problem we can clearly see that we just need to find
*The amount of water stored at each index* then sum it.

Upon observation that turns out to be:

$$
i_{water} = \min(h_{largest\ tower\ towards\ left\ of\ i}, h_{largest\ tower\ towards\ right\ of\ i}) - h_i
$$

Finding this is easier said than done with bruteforce, for each index, run two pointers towards left and towards right and find both values. But that goes for $O(N^2)$

The optimal way is to realize that, we can get this in a linear time by traversing the array once from the left and once from the right:

We maintain an max and its index, if our current number is greater than max that means its greatest from 0 to here (talking about the left traversal case), that means no water stored on top of it, if it less than or equal to means some water can be stored, we save this max_idx in the left array.

We do the same for the right array.  Then by using both arrays we get to the answer.

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        vector<int> largestTowardsLeft(n, -1), largestTowardsRight(n, -1); // -1 if nothing larger than current exists
        int mx = -1, mx_idx = -1;
        for(int i = 0; i < n; i++){
            if(mx >= height[i]){
                largestTowardsLeft[i] = mx_idx;
            } else {
                mx = height[i];
                mx_idx = i;
            }
            // cout << format("i: {}, largestTowardsLeft: {} ", i, largestTowardsLeft[i]);
        }
        cout << endl; 
        mx = -1; mx_idx = -1;
        for(int i = n - 1; i >= 0; i--){
            if(mx >= height[i]){
                largestTowardsRight[i] = mx_idx;
            } else {
                mx = height[i];
                mx_idx = i;
            }
            // cout << format("i: {}, largestTowardsRight: {} ", i, largestTowardsRight[i]);
        }
        cout << endl;
        int totalWater = 0;
        for(int i = 0; i < n; i++){
            if(largestTowardsLeft[i] == -1 or largestTowardsRight[i] == -1)
                continue;
            int waterAtIndex = min(height[largestTowardsLeft[i]], height[largestTowardsRight[i]]) - height[i];
            // cout << format("water: {}, index: {} | ", waterAtIndex, i);
            totalWater += waterAtIndex;
        }
        return totalWater;
    }
};
```

## Flashcards
What is the core idea for Trapping Rainwater 1? ::  The core Idea is finding the *water collected on top of each tower* which is done b
