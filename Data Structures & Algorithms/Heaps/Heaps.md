Heap is a tree base data structure in which the tree is a <mark style="background: #FFB86CA6;">complete binary tree</mark>. It follows a special <mark style="background: #FFB86CA6;">heap order property</mark>.

**Complete Binary Tree:** A binary tree in which all levels are filled except possibly the last one. The fill order is left to right.
**_A complete binary Tree is always a balanced binary tree, but the reverse may not be true_**

![[Drawing 2023-09-04 16.48.47.excalidraw]]

**Heap order property:** For a min heap the every node is smaller than all of its children. For a max heap every node is larger than all of its children.

![[Drawing 2023-09-04 16.52.05.excalidraw]]


# Representation of Heaps
Although heaps are binary trees, it is more convenient and useful to store them in arrays. It is possible only because it's a complete binary tree.

The above min heap can be represented in an array as follows:
```cpp
vector<int> myHeap = {10, 11, 12, 13, 14, 15, 16};
```

For every index `i` the children of `i` are present at `2*i + 1` & `2*i + 2`. For every child `c` its parent is at `(c-1)//2`. Keep it in mind that this is for 0 based indexing. For 1 based indexing the values are `2*i, 2*i + 1, c//2`.

# Heap Creation (Insertion in Heaps)

Insertion operation in a heap can be performed in O(log(N)) time.

```cpp
void heappush(vector<int> &heap, int val) {
	heap.push_back(val);
	int N = heap.size();
	int childIndex = N - 1, parIndex = (childIndex - 1) / 2;
	while(heap[parIndex] > heap[childIndex]) {
		swap(heap[parIndex], heap[childIndex]);
		childIndex = parIndex;
		parIndex = (childIndex - 1) / 2;
	}
}
void _heappush_max(vector<int> &heap, int val) {
	heap.push_back(val);
	int N = heap.size();
	int childIndex = N - 1, parIndex = (childIndex - 1) / 2;
	while(heap[parIndex] < heap[childIndex]) {  // This is the only difference.
		swap(heap[parIndex], heap[childIndex]);
		childIndex = parIndex;
		parIndex = (childIndex - 1) / 2;
	}
}
```

# Deletion from heap (Root Node Only)

Takes O(log(N)) time.

```cpp
// Program to perform deletion in a heap represented as an array
#include<bits/stdc++.h>
using namespace std;
auto start = chrono::steady_clock::now();
int main(){
    vector<int> heap = {60, 50, 40, 30, 20};
    //!deletion can only be performed at the root ie 60
    //=> copy the value of the last node into root node
    heap.at(0) = heap.at(heap.size()-1);
    //=> remove the last node
    heap.erase(heap.end()-1);
    //=> place the root node into its correct position (TOP to BOTTOM)
    int parent = 0;
    int left_child = parent*2 + 1; //for 0 based indexing
    int right_child = parent*2 + 2;
    bool complete = false;
    while(!complete){
        int temp = parent;
        left_child = parent*2 + 1;
        right_child = parent*2 + 2;
        if(left_child < heap.size() and heap.at(parent) < heap.at(left_child)){
            parent = left_child;
        }
        if(right_child < heap.size() and heap.at(parent) < heap.at(right_child)){
            parent = right_child;
        }
        if(parent == temp){
            //swap not done
            complete = true;
        }
        else{
            swap(heap.at(parent), heap.at(temp));
        }
    }
    //print the array
    for(auto i: heap){
        cout << i << " ";
    }
    auto end = chrono::steady_clock::now();
    auto diff = end-start;
    cout << "\nExecution Time: " << chrono::duration<double, milli>(diff).count() << "ms";
    return 0;
}
//* Time and Space Complexities: O(log(n)) and O(1) respectively
```

# Heapify Algorithm
Heapify is converting an array to a valid heap structure.
Takes O(N) average time.
Heapify is applied to a single element and it propels it to the right position in the heap. But when talking about heapify in modern programming we often mean building the heap from the array, means heapifying all the nodes that are required (leaf nodes are already heaps).

```cpp
// code for the heapify function with buildHeap
#include <bits/stdc++.h>
using namespace std;
void heapify(vector<int> &v, int i)
{               // heap and the position to be heapified
    int lg = i; // index showing the largest value
    int left_child = 2 * i + 1;
    int right_child = 2 * i + 2;
    // recursive strategy
    if (left_child < v.size() and v.at(lg) < v.at(left_child))
    {
        lg = left_child;
    }
    if (right_child < v.size() and v.at(lg) < v.at(right_child))
    {
        lg = right_child;
    }
    if (lg != i)
    {
        swap(v.at(lg), v.at(i));
        heapify(v, lg);
    }
}
//Function to build heap which calls heapify for each element necessary
void buildHeap(vector<int> &v){
    for(int i = v.size()/2 - 1 ; i >= 0 ;i--){ //leaf nodes don't need to be heapified
    //since they are already heaps
        heapify(v, i);
    }
}
auto start = chrono::steady_clock::now();
int main()
{
    vector<int> v = {20, 40, 10, 30, 50};
    buildHeap(v);
    //print the result
    for(auto i: v){
        cout<<i<<" ";
    }
    auto end = chrono::steady_clock::now();
    auto diff = end - start;
    cout << "\nExecution Time: " << chrono::duration<double, milli>(diff).count() << "ms";
    return 0;
}
//* Time and Space Complexities:
//* 1) Heapify O(log(n)) and O(1)
//* 2) build heap O(n)
//* overall O(nlog(n))
```

# Heap Sort
Efficient sorting algorithm that works in O(Nlog(N)) average complexity and O(1) space.

Simple logic, keep moving the first element of the max heap to the end and reheapifying the remaining array.

```cpp
// Heap sort is like insertion sort but instead of linearly finding the min max element
// it used heap data stucture to fetch the elements
#include <bits/stdc++.h>
using namespace std;
void heapify(vector<int> &v, int size, int i) // Size because as elements get sorted one by one the pool decreases
{               // heap and the position to be heapified
    int lg = i; // index showing the largest value
    int left_child = 2 * i + 1;
    int right_child = 2 * i + 2;
    // recursive strategy
    if (left_child < size and v.at(lg) < v.at(left_child)) //reverse sort ke liye bas ye less than ko greater than kar sakte hai
    {
        lg = left_child;
    }
    if (right_child < size and v.at(lg) < v.at(right_child))
    {
        lg = right_child;
    }
    if (lg != i)
    {
        swap(v.at(lg), v.at(i));
        heapify(v, size, lg);
    }
}
// Function to build heap which calls heapify for each element necessary
void buildHeap(vector<int> &v)
{
    for (int i = v.size() / 2 - 1; i >= 0; i--)
    { // leaf nodes don't need to be heapified
        // since they are already heaps
        heapify(v, v.size(), i);
    }
}
void heap_sort(vector<int> &v)
{
    // first build heap for the first time
    buildHeap(v);
    for (int i = v.size() - 1; i > 0; i--)
    { // size loop for each iteration the size of unsorted part decreases
        // 1) get the root which is maximum for maxHeap and swap it to the end
        swap(v.at(0), v.at(i)); // i = n-1 so we dont need to track the end element i will serve both purpose
        //2) heapify the one element as it is now out of order, the result of which will be a maxHeap again
        heapify(v, i, 0);       // vector size position
    }
}
auto start = chrono::steady_clock::now();
int main()
{
    vector<int> v = {-4,0,7,4,9,-5,-1,0,-7,-1};
    heap_sort(v);
    for(auto i: v){
        cout<<i<<" ";
    }
    auto end = chrono::steady_clock::now();
    auto diff = end - start;
    cout << "\nExecution Time: " << chrono::duration<double, milli>(diff).count() << "ms";
    return 0;
}
```