#neetcode150  #bitwise 

The easiest approach is to literally reverse the number

```cpp
class Solution {
public:
    int reverse(int x) {
        long long int res = 0;
        int temp = abs(x);
        while(temp!=0){
            res = res*10+(temp%10);
            if(res>INT_MAX||res<INT_MIN)
                return 0;
            temp/=10;
        }
        if(x<0)
            return -1*res;
        return res;
    }
};
```

Beware of weird python behavior with modulo and negative division `-123%10` is `7` and `-1//10` is `-1`

