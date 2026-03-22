#daily_challenge 
2026-03-15

This problem is tricky to say the least, after coming up with a solution within 5 minutes that got TLEd I had to spent 7 hours + trying to run against an ugly hint.


```python
M = 10**9 + 7
class Fancy:
    def __init__(self):
        self.store = []
        self.ops = []

    def append(self, val: int) -> None:
        self.store.append((val, len(self.ops)))

    def addAll(self, inc: int) -> None:
        self.ops.append(('+', inc))
        
    def multAll(self, m: int) -> None:
        self.ops.append(('*', m))
        
    def getIndex(self, idx: int) -> int:
        if idx >= len(self.store):
            return -1

        res, start = self.store[idx]
        for i in range(start, len(self.ops)):
            kind, operand = self.ops[i]
            if kind == '+':
                res = (res % M + operand % M) % M
            else:
                res = (res % M * operand % M) % M 

        return res

        


# Your Fancy object will be instantiated and called as such:
# obj = Fancy()
# obj.append(val)
# obj.addAll(inc)
# obj.multAll(m)
# param_4 = obj.getIndex(idx)
```
This doesn't work, we need something better

![[Fancy Sequence 2026-03-15 18.08.11.excalidraw]]
```python
MOD = 10**9 + 7
def modinv(x):
    # Fermat's little theorem since MOD is prime
    # modinv(x) = x^(m-2)mod(m)
    # use binary exponentiation
    result = 1
    n = MOD - 2
    while n > 0:
        if n & 1:
            result *= x
            result %= MOD
        x = x * x
        x %= MOD
        n //= 2
    return result
class Fancy:
    def __init__(self):
        self.nums = []
        self.m = 1
        self.a = 0

    def append(self, val: int) -> None:
        self.nums.append((val, self.a, self.m))

    def addAll(self, inc: int) -> None:
        self.a += inc
        self.a %= MOD
        
    def multAll(self, m: int) -> None:
        self.m *= m
        self.a *= m
        self.m %= MOD
        self.m %= MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.nums):
            return -1
        
        val, a, m = self.nums[idx]
        # print(self.nums, self.a, self.m)
        
        return int(val * (self.m * modinv(m)) + (self.a - (a*self.m * modinv(m)))) % MOD # cannot divide plain here
        
```