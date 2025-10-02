> *Borrowing means taking something without transferring ownership, a borrower must return the reference.*

Borrowing involves creating a reference to a value. Generally Heap Data's reference are used, but stack data can also be referenced. 

```rust title="Reference example"
let my_val: i32 = 2;
let my_ref: &i32 = &my_val; // Type address leading to i32
```

References must never outlive their referent.

```rust title="Dereference example"
println!("{*my_ref}");
```

Rust auto dereferences display trait implementing types