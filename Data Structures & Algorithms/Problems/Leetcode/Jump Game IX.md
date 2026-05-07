#daily_challenge 
2026-05-07

Problem Link: https://leetcode.com/problems/jump-game-ix/description/?envType=daily-question&envId=2026-05-07 

This problem was really good, even though its marked medium and wrongly tagged I love :LiHeart: it!

I came close to solving this, basically the observation I made is this:

- For the maximum number in the array the answer is itself
- For anything right of the maximum, the answer will maximum as well, since you can't do better than that.
- Now we go to the second maximum, again same logic applies on its bucket the answer *should* be second maximum *unless* there exisits an number in the previous maximum's bucket which is smaller than the number in the current bucket then that number will happily jump to the previous maximum!


This became a problem for me, I got side tracked to think: *How do I find the rightmost bucket where a number which is smaller than current number exists?*

The actual idea to get around this problem is to realize that you could merge intervals,

Basically any number in the current bucket can jump to previous bucket iff they are greater than the any number in that bucket, best chance we have is to compare it with *smallest* number of previous bucket!

But that still doesnt solve the search problem?

We realize that any number in current bucket can jump to the current buckets maximum since its the leftmost number in the current bucket and everything else is smaller than it and towards right.  From there it is our best chance to establish a path to previous bucket.

So its enough to check if current maximum is larger than the smallest of previous bucket, if this is true these intervals can be considered as one, and the answer becomes the maximum.

What if the third max comes into play?

Well in that case we only need to merge to immediate last, if merge failed with immediate last that means currentMax was less than minima of last bucket