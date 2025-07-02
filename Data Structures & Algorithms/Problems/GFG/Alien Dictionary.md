#toposort #graphs #bfs #dfs
# Problem Statement
Given a sorted dictionary of an alien language having N words and k starting alphabets of standard dictionary. Find the order of characters in the alien language.  
**Note:** Many orders may be possible for a particular test case, thus you may return any valid order and output will be 1 if the order of string returned by the function is correct else 0 denoting incorrect string returned.  
 

**Example 1:**

**Input:** 
N = 5, K = 4
dict = {"baa","abcd","abca","cab","cad"}
**Output:**
1
**Explanation:**
Here order of characters is 
'b', 'd', 'a', 'c' Note that words are sorted 
and in the given language "baa" comes before 
"abcd", therefore 'b' is before 'a' in output.
Similarly we can find other orders.

**Example 2:**

**Input:** 
N = 3, K = 3
dict = {"caa","aaa","aab"}
**Output:**
1
**Explanation:**
Here order of characters is
'c', 'a', 'b' Note that words are sorted
and in the given language "caa" comes before
"aaa", therefore 'c' is before 'a' in output.
Similarly we can find other orders.

**Your Task:**  
You don't need to read or print anything. Your task is to complete the function **findOrder()** which takes  the string array dict\[], its size N and the integer K as input parameter and returns a string denoting the order of characters in the alien language.

  
**Expected Time Complexity:** O(N * |S| + K) , where |S| denotes maximum length.  
**Expected Space Complexity:** O(K)

  
**Constraints:**  
1 ≤ N, M ≤ 300  
1 ≤ K ≤ 26  
1 ≤ Length of words ≤ 50

# Approach
This question seems impossible at first, but if you read the question like this, the intuition appears to be more clear.
**Find the ordering of the alphabets such that if a word w1 appears after the word w2 due to the alphabet x < y then x should come before y in the ordering.**
This seems oddly familiar to the topological sorting that we have done earlier.

**Building The Graph**
Now that we have thought that we may be able to use toposort to solve this problem, How exactly do I make the graph. It is also hidden in the above intuition line, There is an edge between `x` and `y` if two words w1 and w2 differ by x & y and w1 comes before w2 that means there is an edge from x to y.

## Solution
```python
def kahn_toposort(adj):
    # finding the indegrees
    indegrees = {v: 0 for v in adj.keys()}
    for nbrs in adj.values():
        for nbr in nbrs:
            indegrees[nbr] += 1
    q = deque()
    toposort = []
    for v, indegree in indegrees.items():
        if indegree == 0:
            q.append(v)   # kind of like a multi source bfs
    while q:
        curr = q.popleft()
        toposort.append(curr)
        for nbr in adj[curr]:
            indegrees[nbr] -= 1
            if indegrees[nbr] == 0:
                q.append(nbr)
    # print(toposort)
    return toposort

class Solution:
    def findOrder(self,alien_dict, N, K):
        # building the graph
        adj = {chr(ord('a') + i):[] for i in range(K)}  
        for w1, w2 in pairwise(alien_dict):
            for char1, char2 in zip(w1, w2):
                if char1 != char2:
                    adj[char1].append(char2)
                    break  # only first unequal letter is responsible for order
        return kahn_toposort(adj)

```