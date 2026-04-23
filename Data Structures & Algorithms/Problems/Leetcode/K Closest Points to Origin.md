Store the distance in an array, sort it and then return the first k elements, results in a time complexity of NLogN but also a space complexity of O(N)


We can do better by maintaining a min heap of only K elements then returning all of them at the end.

This reduces the complexity to NLogK and space to O(K)

```cpp
```