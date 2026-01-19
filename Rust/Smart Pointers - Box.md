
## Smart Pointers
A smart pointer is a type that behaves like a pointer, but it can store additional information and perform more actions compared to plain pointers/references. Most smart pointers are built with structs, structs grant he capability to store data and implement behavior through methods.

- Unlike normal references where the original owner of the data is responsible for deallocation, smart pointers often own and manage their own data, typically on the heap. A `String` is an example of a smart pointer, it stores a pointer to the heap, it also stores extra metadata like length and capacity.

### Box
The `Box<T>` is an owned type that is a container around the raw pointer that holds memory address of the allocated `T` data on the heap.

```rust
let b = Box::new(5);
println!("b = {}", *b);

let new_b = b; // ownership of the heap data is moved to new_b
```

#### Linked lists using Box smart pointers
A common use case for `Box<T>` is to create recursive data structures like linked lists.

```rust
#derive(Debug)]
enum LinkedList {
    Empty,
    Node{ value: i32, next: Box<LinkedList> }, // if you do LinkedList instead of Box<LinkedList> it will cause infinite size error
    // you can do a plain reference, but the reference does not own the data and that must live longer than the list, it becomes difficult to manage lifetimes
    
}
```
