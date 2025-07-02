#binary-tree #prefix-sum
Given the `root` of a binary tree and an integer `targetSum`, return _the number of paths where the sum of the values along the path equals_ `targetSum`.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg)

**Input:** root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
**Output:** 3
**Explanation:** The paths that sum to 8 are shown.

**Example 2:**

**Input:** root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
**Output:** 3

**Constraints:**

- The number of nodes in the tree is in the range `[0, 1000]`.
- `-109 <= Node.val <= 109`
- `-1000 <= targetSum <= 1000`


# Approach

The logic is to use a prefix sum frequency map, that tracks the number of times we have found 
![[Drawing 2023-09-10 22.48.17.excalidraw]]
a particular running sum, for each currSum we need to remove some part to make it equal to targetSum.

`currSum - x = targetSum => x = currSum - targetSum` the frequency map tells us how many times this has occurred in the particular branch.

The initial value is `{0, 1}` because an empty tree has 0 sum.

```python
class Solution:

    def pathSum(self, root: Optional[TreeNode], targetSum: int, currSum = 0, prefixSum = defaultdict(int, [(0, 1)]) )-> int:

        if root is None:

            return 0

        currSum += root.val

        count = prefixSum[currSum - targetSum]  # branch sum, you reached upto current branch so your sum in currSum you try to subtract a previous branch  that is how many times you can get that exact subtraction value

        prefixSum[currSum] += 1

        count += self.pathSum(root.left, targetSum, currSum, prefixSum) + \

                 self.pathSum(root.right, targetSum, currSum, prefixSum)

        prefixSum[currSum] -= 1  # Backtrack to avoid affecting other paths

        return count
```