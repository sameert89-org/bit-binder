#daily_challenge 
2026-03-27

This problem is easy to undestand but very tedious to implement.

The thing it mentions about connectivity is a sham to throw you off.

I can remove the element from anywhere if the partition sizes are > 1 and the elements will stay connected.

in case of 1 as the partition size the problem becomes hairy, you can only remove first or last element or the elements just before and after the cut, anything in between will break connectivity.

![[3548 Equal Sum Grid Partition 2 2026-03-27 00.39.03.excalidraw]]