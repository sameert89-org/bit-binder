Given an infinite sequence of integers return the nth digit of the sequence.
`1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12...`
from 1 to 9 the n itself is the digit but the 10th digit is 1 and 11th digit is 0 `1-0` and 12th digit is again 1 and so on.

# Approach
There is one careful observation to be made here about the number of x digit numbers present in the sequence

```
Number of 1 digit numbers = 9 {1 to 9}
Number of 2 digit numbers = 90 {10 to 99}
Number of 3 digit numbers = 900 {100 to 999}
.
.
.
Number of x digit numbers = 9 * (10 ^ (x - 1)) {10 ^ (x - 1) to 10 ^ x - 1}
```

```python
class Solution:

    def findNthDigit(self, n: int) -> int:

        if n < 10:

            return n

        n -= 1  # convert to 0 based index

        digit_length = 1

        start = 1

        while n >= 9 * digit_length * start:

            n -= 9 * digit_length * start

            digit_length += 1

            start *= 10

        num = start + n // digit_length

        digit_index = n % digit_length

        return int(str(num)[digit_index])
```