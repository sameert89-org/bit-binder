#neetcode150  #arrays #hashing 

Problem Link: https://leetcode.com/problems/product-of-array-except-self/description/

The simple bruteforce way is to calculate the product at every index and then outputting the answer, which lands at a complexity of $O(n^2)$ which is too slow.

A simple optimization would be to calculate the full product since its guaranteed to fit in a 32 bit integer, then divided each number while iterating, but the question prohibits division operation.

one approach comes to mind its better to draw it here:

![[Product of Array Except Itself 2026-03-08 12.09.24.excalidraw]]

If we could use 2 hashmaps (or 1 hashmap) one that stores the prefix products and one that stores the suffix products to and from each index respectively the problem becomes as simple as iterating over the index and finding the prefix and suffix product and then multiplying both to get the answer.

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
       int N = nums.size();
       vector<int> prefix_product(N), suffix_product(N), result(N);
       int i = 0, j = N - 1, prefix = 1, suffix = 1;
       while(i < N){
        prefix_product[i] = prefix;
        prefix *= nums[i++];
        suffix_product[j] = suffix;
        suffix *= nums[j--];
       }
       for(int i = 0; i < N; i++){
        result[i] = prefix_product[i] * suffix_product[i];
       }
       return result;
    }
};
```

 This costs us though, O(N) time but O(N) space as well. The last optimization here is to do it in *constant space*.

When you stare at the above code, you can see the optimization , why do we even need those 2 arrays, can't we just use the result itself?

We can fill the result with one type of products let's say prefix product then we can calculate the final result by traversing in reverse.

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
       int N = nums.size();
       vector<int> result(N);
       int i = 0, prefix = 1, suffix = 1;
       while(i < N){
        result[i] = prefix;
        prefix *= nums[i++];
       }
       for(int j = N -1 ; j > -1; j--){
        result[j] *= suffix;
        suffix *= nums[j];
       }
       return result;
    }
};
```