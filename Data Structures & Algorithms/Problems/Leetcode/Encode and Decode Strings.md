#neetcode150 #arrays #hashing 

Problem Link: https://neetcode.io/problems/string-encode-and-decode/question?list=neetcode150

A simple solution would be to think of a delimiter, and join and split as encode and decode, however the input can be a part of this delimiter, we can cheese this question easily using a larger 3 character delimiter but that would not be a correct solution, becasue if the input and diverse enough we would fail this.

```python
class Solution:

    def encode(self, strs: List[str]) -> str:
        strs.append("")
        return "|~|".join(strs)

    def decode(self, s: str) -> List[str]:
        return s.split("|~|")[0:-1]

```

The correct way to solve this is prefix the length of the string with the delimiter, then we iterate till we see our first delimiter, we know that we must have passed the numbers by now, we get our pref