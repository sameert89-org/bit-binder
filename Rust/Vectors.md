Solves the problem of problem of having a fixed size of arrays. It stores data on the heap, hence this can grow and shrink at runtime.

```rust
// Declaring a vector
let natural_numbers: Vec<i32> = Vec::new(); // see the String like constructor
// if type annotation is done on the left side it is not needed on the right, but if not done on the left side then Vec::<i32>::new() is the way to do it on the right side.
let whole_numers = vec![0, 1, 2, 3]; // Using vec macro we can initialize this inline
let orange = String::from("Orange");
let fruits : Vec<String> = vec![orange]; // transfer of ownership since no Copy trait

// Adding & Removing elements
let mut numbers = vec![1,2,3,4];
numbers.push(1);
numbers.insert(0, 0);

let val = numbers.pop(); // Returns an option enum
numbers.remove(0); // by index

// Accessing elements
let three = numbers[2]; // This can cause a runtime panic if the index is out of bounds, this is caught during compile time in case of arrays because of fixed length
let three = numbers.get(2); // This addresses the above problem by returning an Option enum

numbers[1] = 56; // Of course the array needs to be mutable for this to work 

// Slicing
let subset = &numbers[0..2];
```

> [!Warning] A vector owns all of its contents
> You cannot assign the value of an element to another owner, a vector owns all of its contents, it is only possible if a full Copy is made or a reference is borrowed.

## Sorting
I will cover sorting of vectors and arrays in this section since the methods are the same for both.

```rust
let mut numbers = vec![5,3,8,1,2]; // must be mutable to sort
// check if numbers are sorted
let is_sorted = numbers.is_sorted(); // false
// sort in ascending order
numbers.sort();

// Sort by key (Takes a closure which returns the key, the key must implement Ord trait)
numbers.sort_by_key(|&num| num % 3); // sorts based on remainder when divided by 3

// custom comparator using sort_by
// descending order
numbers.sort_by(|a, b| b.cmp(a));

```

> *"For custom comparators, the closure must return an Ordering enum value which can be Less, Greater or Equal."*

Read More: [[Compound Types#^arrays |Arrays]], [[Closures]]
