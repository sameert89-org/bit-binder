We rarely use arrays in modern C++
# Array

- **Compound data type or data structure**
    - Collection of elements
- **All elements are of the same type**
- **Each element can be accessed directly**
### Characteristics:

- Fixed size
- Stored contiguously in memory
- Individual elements can be accessed by their position/index
- No checking to see if you are out of bounds (`[0, last-1]`)
### Declaration of arrays:

```cpp
element_datatype array_name[constant_number_of_elements];
```
### Initialization of arrays:

```cpp
// General form
element_datatype array_name[number_of_elements] = { initializer_list };
```

- If the number of elements > number of values in the initializer list, then uninitialized members are set to `0`.
- You can omit the number of elements using `[]` — in that case, the number is inferred from the initializer list.
### Accessing and modifying array members:

- The name of the array represents the location of the first element (i.e., index = 0).
- Fun fact: If you just do `std::cout << array_name;`, you'll get a hexadecimal address (the pointer to the first element).
---

### Multidimensional arrays

#### Declaration:

```cpp
element_type array_name[dim_1_size][dim_2_size][dim_3_size];
```

#### Initialization:

- If it's a 2x2 array, think of it like a 2-element parent array where each element is a 2-element array:

```cpp
int array[2][2] = {{1, 2}, {3, 4}};
```

# Vectors
- Arrays are static & waste space; `arr[100]; 😉`
- A container in the C++ Standard Template Library.
- An array alternative that can grow and shrink in size during execution.
- Provides similar semantics and syntax on arrays.
- Very efficient
- Can provide bounds checking.
- Can use STL functions like sort, reverse, find and more.

### Declaring

```cpp
#include<vector>
using namespace std;
vector<char> vowels;
vector<int> test_scores;
/* OR */
vector<char> vowels(5);
vector<int> test_scores(10); // Unlike arrays where behavior depends on compiler, vectors always auto init to 0
/* OR */
vector<char> vowels { 'a', 'e', 'i', 'o', 'u' };
vector<double> hi_temps(365, 80.0); // Makes vector of length 365 and each element havign value 80.0
```

### Accessing Vector Elements

```cpp
my_vector[element_index];
/* OR */
my_vector.at(element_index); // Provides nice out-of-bound errors
my_vector.size() // returns the size of the vector
```

Vector dynamics
```cpp
my_vector.push_back(element); // adds element at the end, grows if exceeds size based on an algorithm
```

### Multi-dimensional Vectors

Below is how to declare a 3D vector, the initialization and access is similar to Arrays
```cpp
vector<vector<vector<int>>> my_3d_vector; // read as vector of vector of vector of integers
```