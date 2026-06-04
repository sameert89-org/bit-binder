Useful in problems that says:

> Count Numbers Between `L` and `R` such that their digits satisfy some condition.

```txt
count numbers <= N having at least one 7
count numbers <= N whose digits are strictly increasing
count numbers <= N with digit sum divisible by k
count numbers <= N having at least one 3, one 5, and one 7
```

In digit DB, you build the number digit by digit.

The core trick is:

> answer for `[L, R]` = `count(<= R) - count(<= L - 1)`

Now you only need to write the count function with dynamic programing.

