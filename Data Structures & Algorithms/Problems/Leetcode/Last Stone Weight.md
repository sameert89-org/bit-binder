#neetcode150  #heaps 
The straightforward approach to this problem would be calculating the maximum 2 rocks every time in the array then smashing results in setting them to 0. This is results in O(N^2) algorithm which is certainly not good enough.

The optimized solution to this problem is by using a max-heap, which allows us to keep track of the heaviest 2 stones and then efficiently pop them out do the operation and push them back.

 We repeat this process until fewer than two stones remain, and the overall time complexity is O(N log N).