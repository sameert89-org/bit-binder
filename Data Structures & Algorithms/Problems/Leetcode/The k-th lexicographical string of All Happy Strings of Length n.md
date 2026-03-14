#daily_challenge
2026-03-14

That is a mouthful.

![[The k-th lexicographical string of All Happy Strings of Length n 2026-03-14 14.12.51.excalidraw]]

Simple recursion, the space is short enough. 

```cpp
class Solution {
public:
    string getHappyString(int n, int k) {

        function<string(string, int&)> solve = [&](string curr, int &k) -> string {
            if(curr.size() == n) {
                k--;
                //cout << k << endl;
                if(k == 0)
                    return curr;
                return "";
            }

            // find what to place here
            string toPlace = "abc";
            switch(char back = curr.size() == 0 ? '\0' : curr.back(); back) {
                case 'a':
                    toPlace = "bc";
                    break;
                case 'b':
                    toPlace = "ac";
                    break;
                case 'c':
                    toPlace = "ab";
                    break;
                case '\0':
                    toPlace = "abc"; // not required
                    break; 
            }

            for(auto ch: toPlace) {
                auto result = solve(curr + ch, k);
                if(result.size() != 0)
                    return result;
            }

            return "";
        };
        
        return solve("", k);
    }
};
```

Since we only go till k times, this optimized recursion is $O(k\cdot n)$

There is an optimized Combinatorics approach to this problem

![[The k-th lexicographical string of All Happy Strings of Length n 2026-03-14 14.35.43.excalidraw]]