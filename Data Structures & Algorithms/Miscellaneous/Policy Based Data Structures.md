The `g++` compiler supports a lot of additional functionality that is not the part of the official C++ standard. One of these is the **PBDS** short for the policy based data structures. 

These are designed for high performance and often times have useful features not available in the STL. They are designed to interface with the STL containers so that both of them can be used in conjunction.

```cpp
#include <ext/pb_ds/assoc_container.hpp> // Common file
// The data structure specific header file
using namespace __gnu_pbds;
```

## Ordered Set / Ordered Multiset
Ordered set is like the `std::set` but it supports additional features:
1. Getting the cardinal number of an element i.e. the index of the element in the set in $O(log(n))$ time. Normal sets need linear time to do this and there is no concept of index in the normal sets.
2. Getting the number of elements smaller than the current element in $O(log(n))$ time. 

Following code demonstrates the usage.

```cpp
// Program showing a policy-based data structure.
#include <ext/pb_ds/assoc_container.hpp> // Common file
#include <ext/pb_ds/tree_policy.hpp>
#include <functional> // for less and less_equal for multiset
#include <iostream>
using namespace __gnu_pbds;
using namespace std;

typedef tree<int, null_type, less<int>, rb_tree_tag,
			tree_order_statistics_node_update>
	ordered_set;

// Driver code
int main()
{
	ordered_set p;
	p.insert(5);
	p.insert(2);
	p.insert(6);
	p.insert(4);

	// value at 3rd index in sorted array.
	cout << "The value at 3rd index ::"
		<< *p.find_by_order(3) << endl;

	// index of number 6
	cout << "The index of number 6::" << p.order_of_key(6)
		<< endl;

	// number 7 not in the set but it will show the
	// index number if it was there in sorted array.
	cout << "The index of number seven ::"
		<< p.order_of_key(7) << endl;

	return 0;
}

```

