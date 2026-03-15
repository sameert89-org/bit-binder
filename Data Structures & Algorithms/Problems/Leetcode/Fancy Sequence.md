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