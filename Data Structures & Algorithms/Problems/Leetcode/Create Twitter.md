#needcode150 #heaps 
This is a class design problem, the only complexity lies in the `newsFeed` part. You can maintain an array of all tweets and then do a lookup based on user id and their following but that is too slow.

The idea is to use a `minHeap`.

> [!TIP] Ask Min Take Max, Ask Max Take Min
> For problems involving heaps, whenever you are asked `k` smallest elements, a max heap of  k elements can be used and vice-versa.

Pushing every tweet from user and their followers in a minHeap of size 10 works for this problem but its too slow `O(T)log10`, the core idea is figuring out how to push t