#neetcode150 #arrays #hashing 


Problem Link: https://leetcode.com/problems/group-anagrams/description/


The first approach that comes to my mind is to brute force this question, pick each element in the array and check every other element for whether they are an anagram of it or not, if they are we just put them in the resultant array, to avoid duplicate processing we can keep track of the strings which are already pushed into the result.

To optimize this solution, we can use sorting and hashmap, I will:
1. Create a copy of the strs
2. Sort each of the string in that vector
3. Maintain a hashmap of string vs their indices
4. Then build the result array at the end.

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
       vector<string> strs_cpy(strs);
       unordered_map<string, vector<int>> anagram_pos;
       for(int i = 0; i < strs_cpy.size(); i++){
            sort(strs_cpy[i].begin(), strs_cpy[i].end());
            anagram_pos[strs_cpy[i]].push_back(i);
       } 
       vector<vector<string>> result;
       for(auto itr = anagram_pos.begin(); itr != anagram_pos.end(); itr++){
        vector<string> curr_set;
        for(int i = 0; i < itr->second.size(); i++){
            curr_set.push_back(strs[itr->second[i]]);
        }
        result.push_back(curr_set);
       }
       return result;
    }
};
```

If we want to avoid using the hashmap, we can also use a vector, and sort the whole vector after inserting the sorted stringlets. But we also need to preserve the index in that case.

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<pair<string, int>> temp(strs.size());;
        for(int i=0;i<strs.size();i++){
            temp[i].first = strs[i];
            sort(temp[i].first.begin(), temp[i].first.end());
            temp[i].second = i;
        }
        sort(temp.begin(), temp.end());
        string current = temp[0].first;
        vector<vector<string>> res;
        vector<string> x;
        for(int i=0;i<temp.size();i++){
            if(current == temp[i].first){
                x.push_back(strs[temp[i].second]);
                if(i==temp.size()-1){
                    res.push_back(x);
                }
            }
            else{
                res.push_back(x);
                x.clear();
                current = temp[i].first;
                x.push_back(strs[temp[i].second]);
                if(i==temp.size()-1){
                    res.push_back(x);
                }
            }
        }
        
        return res;
    }
};
```

