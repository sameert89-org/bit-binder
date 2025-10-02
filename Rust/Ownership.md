**Ownership** is a set of compile-time rules that the compiler checks for to ensure the program will be free of memory errors.

**Owner** is something that is responsible for cleaning up a piece of memory when it is no longer in use. Every value in a rust program has a 1 owner. The owner can change over the course of a program.

**Move** this refers to transfer of ownership from one owner to another in rust.

```rust title="Ownership Transfer" hl=2
let name = String::from("Sameer"); // lives in heap, name stores the **pointer**
let next = name; // Ownership transferred, now next is the ONLY pointer pointin to the String
println!("{name}"); // name is useless now, this won't compile.
```

**Rust's Borrowing Rules**

Rust allows multiple ways to access data, but with strict safety rules:

**Immutable References (&T)**

- You can create multiple immutable references to the same data
- These references only allow reading the data, not modifying it
- Multiple immutable references can coexist safely since no one can change the data

**Mutable References (&mut T)**

- Only one *active* mutable reference can exist at a time
- This reference allows both reading and modifying the data
- No other references (mutable or immutable) can exist while a mutable reference is active

**The Key Rule: Exclusive Access** At any given time, you can have either:

- Multiple immutable references, OR
- Exactly one *active* mutable reference

A reference is considered "active" from when it's created until its last use, not just until the end of its scope. Below is an example:

```rust
let mut data = vec![1, 2, 3];
let immut_ref = &data;        // immutable reference created
println!("{:?}", immut_ref);  // last use of immutable reference
let mut_ref = &mut data;      // mutable reference created (OK!)
mut_ref.push(4);              // use mutable reference
```

> *Immutable references implement the copy trait.*

> [!IMPORTANT] The drop function
> `drop(&mut self)` function is a special function which is called by Rust at the end of a scope which cleans up the data in the heap or signals the rust runtime to do so. This only works on heap allocated memory. You can also define the `drop` function which is a part of the `Drop` trait, for custom types. Also it can be manually called whenever you want for the types that implement it, this makes them unusable.
> ```rust
> let mut person = String::from("Test");
> drop(person);
> println!("{person}");
>```

^e064ef
## Function Parameters

### 1. Taking Ownership (Move)

```rust
fn consume_string(s: String) { // This can also be mut s: String even if the previous owner is not mutable
    println!("{}", s);
    // s is dropped here
}

let my_string = String::from("hello");
consume_string(my_string); // my_string is moved, no longer accessible
```

### 2. Borrowing (Immutable Reference)

```rust
fn read_string(s: &String) {
    println!("{}", s);
}

let my_string = String::from("hello");
read_string(&my_string); // my_string is still accessible after the call
```

### 3. Mutable Borrowing

```rust
fn modify_string(s: &mut String) {
    s.push_str(" world");
}

let mut my_string = String::from("hello");
modify_string(&mut my_string);
println!("{}", my_string); // prints "hello world"
```

### 4. String Slice Parameters

```rust
fn process_str(s: &str) { // Immutable reference
    println!("{}", s);
}

// Works with both String and &str
let owned = String::from("hello");
let borrowed = "world";
process_str(&owned);
process_str(borrowed);
```


When functions return a variable, there is again an ownership transfer, following the same set of rules. The function is no longer responsible for [[#^e064ef|drop]]. 


## Ownership with Compound Types
Compound types such as [[Data Types in Rust#Compound Types|Arrays & Tuples]], own each element inside them. So when their elements are accessed, a full copy needs to be created or access must be done via reference.

```rust title="Arrays & Tuples Ownership"
let my_array = [1,2,3];
let el = my_array[0]; // Full copy created, only possible when copy trait implemented by type
let my_array_2 = [String::from("Test")]
let el_2 = my_array_2[0] // Throws error, either .clone() must be used or el_2 must hold a reference.
```