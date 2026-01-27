## Raw Pointers and References
A variable that stores a memory address without any safety guarantees. Common in languages like C and C++ (called references interchangeably). But in Rust references are safe and have strict borrowing rules. Rust offers raw pointers but they are generally not recommended unless absolutely necessary.

```rust
let mut password = String::from("test-123");

let password_ptr = &raw const password; // immutable raw pointer

let password_ptr2: *const String = &password;// immutable raw pointer

let password_mut_ptr = &raw mut password; // mutable raw pointer, allowed

let password_mut_ptr2: *mut String = &mut password; // allowed
```

The compiler is fine with above, it still refuses to compile when we try to dereference raw pointers directly.

```rust
println!("Password is: {}", *password_ptr); // error
```

This is where `unsafe` block comes into play.

```rust
unsafe{
    println!("Password is: {}", *password_ptr); // works fine as long as the memory is valid
}
```

```rust
struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

pub struct LinkedList<T> {
    head: Option<Box<Node<T>>>,
}

impl<T> LinkedList<T> {
    pub fn new() -> Self {
        LinkedList { head: None }
    }

    pub fn push_front(&mut self, value: T) {
        let new_node = Box::new(Node {
            value,
            next: self.head.take(), // .take() on Option replaces it with None and gives ownership of the original value
        });
        self.head = Some(new_node);
    }

    pub fn append(&mut self, value: T) {
        let mut curr = &mut self.head;
        // Traverse until we find the None slot
        while let Some(node) = curr {
            curr = &mut node.next;
        }
        *curr = Some(Box::new(Node { value, next: None }));
    }
}

fn main() {
    let mut my_list = LinkedList::<i32>::new(); // Must be mut
    my_list.push_front(0);
    my_list.append(1);
    
    // Use as_ref() to borrow the value instead of moving it
    if let Some(node) = my_list.head.as_ref() {
        println!("{}", node.value);
    }
}
```

> *Vectors are smart pointers as well.*

### Binary Search Trees
A binary tree where in order traversal is sorted. Each node has at most two children. Left child is less than parent, right child is greater than parent.

```rust
use std::fmt::Display;

struct TreeNode<T> {
    value: T,
    left: Option<Box<TreeNode<T>>>,
    right: Option<Box<TreeNode<T>>>,
}

struct BinarySearchTree<T> {
    root: Option<Box<TreeNode<T>>>,
}

impl<T: Ord> BinarySearchTree<T>{
    pub fn new() -> Self {
        BinarySearchTree { root: None }
    }

    pub fn insert(&mut self, value: T) {
        let mut trav = &mut self.root;

        loop {
            match trav {
                Some(node) => {
                    if value < node.value {
                        trav = &mut node.left;
                    } else if value > node.value {
                        trav = &mut node.right;
                    } else {
                        return; // duplicate
                    }
                }
                None => {
                    *trav = Some(Box::new(TreeNode {
                       value,
                        left: None,
                        right: None,
                    }));
                    return;
                }
            }
        }
    }
}
impl<T: Ord + Display> BinarySearchTree<T>  {
    pub fn print_in_order(&self){

    }

    pub fn print_in_order_rec(&self, root: &Option<Box<TreeNode<T>>>){
        if root.is_none(){
             return;
        }
        if root.as_ref().unwrap().left.is_some() {
            self.print_in_order_rec(&root.as_ref().unwrap().left);
        }
        println!("{},", root.as_ref().unwrap().value);
        if root.as_ref().unwrap().right.is_some() {
            self.print_in_order_rec(&root.as_ref().unwrap().right);
        }
    }
}
fn main(){
    let mut first_tree = BinarySearchTree::<i32>::new();
    first_tree.insert(1);
    first_tree.insert(2);
}
```

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
#[derive(Debug)]
enum LinkedList {
    Empty,
    Node{ value: i32, next: Box<LinkedList> }, // if you do LinkedList instead of Box<LinkedList> it will cause infinite size error
    // you can do a plain reference, but the reference does not own the data and that must live longer than the list, it becomes difficult to manage lifetimes
    
}
```

## `Deref` and `DerefMut` Traits
In case of box pointers you can use `*` operator to get the data that pointer is pointing to, this behavior is enabled by implementing the `Deref` trait for the smart pointer type. The `Deref` trait requires you to implement the `deref` method that returns a reference to the data inside the smart pointer. Similaryly there is a `DerefMut` trait that allows mutable dereferencing.

```rust
use std::ops::Deref;

struct CustomBox<T>(T);

impl<T> CustomBox<T> {
    fn new(x: T) -> CustomBox<T> {
        CustomBox(x)
    }
}

impl<T> Deref for CustomBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<T> DerefMut for CustomBox<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

fn main() {
    let x = 5;
    let y = CustomBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y); // deref coercion happens here

    let mut z = CustomBox::new(String::from("Hello"));
    z.push_str(", world!"); // deref coercion to &mut String happens here
    println!("{}", *z);
}
```

> *Deref coercion, works because of the Target associated type defined in the Deref trait. When you use the dereference operator `*` on a smart pointer, Rust automatically calls the `deref` method to get a reference to the underlying data. For example `String` smart pointer's Target would be `str`, it allows chaining as well, rust keeps derefing until it matches the required type.*

### `Drop` Trait and Smart Pointer Deallocation
The `Drop` trait allows you to customize the behavior when a value goes out of scope. Smart pointers often implement the `Drop` trait to ensure that the memory they manage is properly deallocated when they are no longer needed.

```rust
struct CustomBox<T>(T);
impl<T> Drop for CustomBox<T> {
    fn drop(&mut self) {
        println!("Dropping CustomBox with data: {:?}", self.0);
    }
}
fn main() {
    let c = CustomBox::new(String::from("Hello, world!"));
} // c goes out of scope here, and the drop method is called
```

## Trait Objects
A trait object is an instance of some type that implements a specific trait. 

```rust
trait Wearable {
    fn wear(&self) -> String;
}


#[derive(Debug)]
struct Pants {
    size: u32,
}

impl Wearable for Pants {
    fn wear(&self) -> String {
        format!("Wearing pants of size {}", self.size)
    }
}

#[derive(Debug)]
struct Shirt {
    color: String,
}

impl Wearable for Shirt {
    fn wear(&self) -> String {
        format!("Wearing a {} shirt", self.color)
    }
}

// The problem statement is I'd like to iterate over a collection of Wearable items, but they are of different types (Pants and Shirt).

fn main() {
    let wardrobe: Vec<Box<dyn Wearable>> = vec![
        Box::new(Pants { size: 32 }),
        Box::new(Shirt { color: String::from("blue") }),
    ]; //box is fixed size pointer, this is the same solution to implementing recursive data structures

    for item in wardrobe.iter() {
        println!("{}", item.wear());
    }
}
```
This is also very useful when working with functions that can return different types of errors, as long as they implement the `Error` trait.

```rust
use std::error::Error;
fn do_something(flag: bool) -> Result<(), Box<dyn Error>> {
    if flag {
        Ok(())
    } else {
        Err(Box::new(std::fmt::Error)) // returning a different error type
    }
}
```
**Read more:** [[Data Types in Rust#^deref | Deref Coercions]]

