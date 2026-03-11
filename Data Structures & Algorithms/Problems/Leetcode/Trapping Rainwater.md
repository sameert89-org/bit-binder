#needcode150 #two-pointers 

This is not a stack problem lil bro. Why the fuck do you keep thinking that this & [[Container With Most Water]] is of stacks??

![[Pasted image 20260311180431.png]]

Basically visualizing this problem we can clearly see that we just need to find
*The amount of water stored at each index* then sum it.

Upon observation that turns out to be:

$$
i_{water} = \min(h_{largest\ tower\ towards\ left\ of\ i}, h_{largest\ tower\ towards\ right\ of\ i}) - h_i
$$

Finding this is easier said than done with bruteforce, just iterate over each ind