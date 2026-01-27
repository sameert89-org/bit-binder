## Raw Pointers and References
A variable that stores a memory address without any safety guarantees. Common in languages like C and C++ (called references interchangeably). But in Rust references are safe and have strict borrowing rules. Rust offers raw pointers but they are generally not recommended unless absolutely necessary.

```rust
let mut password = String::from("test-123");

let password_ptr = $raw const password; //immutable raw pointer

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
