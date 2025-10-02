Yes these are the same ones you studied in *Operating Systems* class. Stack and Heap are 2 memory regions where data is stored during program execution. 

## Stack
Good old stack, below is the diagram which tells you "where" this stack is

![[Stack and Heap 2025-07-22 22.35.17.excalidraw]]

Like any other stack, this is also a LIFO structure. Very fast for allocation and deallocation.

In <mark style="background: #FFB86CA6;">Rust</mark> stack is used for storing:
- Scalar types (integers, booleans, characters)
- Fixed size arrays
- Structs and enums where all fields have known sizes
- Function parameters etc.

## Heap
The location of heap is also mentioned in the above drawing. This is used for data which is unknown or has variable type at compile time. Allocation is slower than the stack and <mark style="background: #FF5582A6;">pointers</mark> are required for data access.

<mark style="background: #FFB86CA6;">Rust</mark> stores the following in heap:
- Data types with dynamic or unknown size, such as `Vec<T>`
- Large data, only pointer to the data resides on the stack.
- If data needs to outlive the function or scope where it was created, heap allocation is often necessary.

> [!NOTE] Box pointer 📦
> All values in Rust are stack allocated by default. Values can be _boxed_ (allocated on the heap) by creating a `Box<T>`. A box is a smart pointer to a heap allocated value of type `T`. When a box goes out of scope, its destructor is called, the inner object is destroyed, and the memory on the heap is freed.

> [!NOTE] Memory safety without a Garbage Collector?
> Rust claims to be memory safe, but it does not have a garbage collector. Well there are a lot of tricks in the crabs claws, one of them is automatically calling the destructor of an allocated value once it goes out of scope.


See also: [[Traits#^1a31c0|Copy trait]]
