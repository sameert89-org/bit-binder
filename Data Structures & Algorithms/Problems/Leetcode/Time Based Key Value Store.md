#needcode150  #binary-search 

Problem Link: leetcode.com/problems/time-based-key-value-store/

Looking at the constraints its clear we need something bettern than O(N) for each of the method calls, and the line that highlights the approach is that *timestamps* are in increasing order.

This gives somewhat of an idea ot use *binary search*, this can be done using binary search and a map.

```cpp
class TimeMap {
private:
    unordered_map<string, vector<pair<string, int>>> _base;
public:
    TimeMap() { }
    
    void set(string key, string value, int timestamp) {
        _base[key].push_back({value, timestamp});
    }
    
    string get(string key, int timestamp) {
        // upper bound - 1
        const auto& vals = _base[key];
        auto ub = upper_bound(vals.begin(), vals.end(), timestamp, [](const int &t, const pair<string, int> &p){ return p.second > t; }); // first element greater than timestamp, if we go to previous element we'll get less than or equal to,  if everything is greater in that this ub returns vals.begin()
        if(ub == vals.begin())
            return "";
        return (*--ub).first;
    }
};
```


The TestCases are pretty weak and you can cheat with python like I did in 2023 apparently:

```python
class TimeMap:
    time_map = None
    def __init__(self):
        self.time_map = defaultdict(lambda: OrderedDict())
    def set(self, key: str, value: str, timestamp: int) -> None:
        self.time_map[key][timestamp] = value

    def get(self, key: str, timestamp: int) -> str:
        for t in reversed(self.time_map[key].keys()):
            if t<=timestamp:
                return self.time_map[key][t]
        return ""
```

This is a Brute Force in any case.