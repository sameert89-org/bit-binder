This is the simplest method of performing substring search, here we basically generate all substrings of the **haystack** and match one that is equal to the **needle**.

```cpp
bool containsSubstring(const std::string& haystack, const std::string& needle) {
    for (size_t i = 0; i < haystack.size(); ++i) {
        for (size_t j = i + 1; j <= haystack.size(); ++j) {
            if (haystack.substr(i, j - i) == needle) return true;
        }
    }
    return false;
}
```

This has a complexity of $O (n^2 \cdot m)$.

A slightly optimal way of doing this would be using a sliding windows, since in the current approach we are generating all substrings which are not all necessary, because we only need to compare substrings of length equal to the needle.

```cpp
bool containsSubstring(const std::string& haystack, const std::string& needle) {
    if (needle.empty()) return true;
    if (needle.size() > haystack.size()) return false;

    const size_t n = haystack.size();
    const size_t m = needle.size();

    for (size_t i = 0; i + m <= n; ++i) {
        if (haystack.compare(i, m, needle) == 0) return true;
    }
    return false;
}
```

This reduces the time complexity to $O(n \cdot m)$.