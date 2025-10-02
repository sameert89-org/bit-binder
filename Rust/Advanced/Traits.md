A trait is a contract that requires the types that implement the trait to have certain functionality according to the contract. Imagine them like an interface in C# and Java and abstract classes in C++. They enable **polymorphism** in Rust.

## Built-in Traits
Following are some useful built in traits.

### Display Trait
Mandates a format method on the type which can output string representation, used while printing the data using  `println!`.

```rust
println!("This is my integer {}", 32);
```

### Debug Trait
Debug should format the data to a programmer facing string which is useful for debugging.

```rust
#[derive(Debug)] // easy shortcut to auto add debug trait to types
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 3, y: 7 };
    println!("{:?}", p);         // Output: Point { x: 3, y: 7 }
    println!("{:#?}", p);        // Pretty-printed
}
```

### Copy Trait

^1a31c0

Mandates that the type can be copied (Full duplicate). This forces the compiler to treat operations such as *assignment*, passing arg as value as NOT MOVE. Basically something that can be copied using `memcpy`.

```rust title="Copy Trait Example"
let x = 24;
let y = x; // 2 separate copies

#[derive(Copy, Clone)] // For custom types both copy and clone must be derived
struct Point {
	x: i32, // All fields of the type must implement Copy on their own
	y: i32,
}
```


> [!DANGER] Copy Behavior for Heap Allocated Types
>Heap allocated types such as `Vec<T>` do not implement the copy trait. Such data types when assigned to another variable a duplicate reference pointing to the same data on the heap is created.

### Clone Trait
Any type can implement this trait unlike copy. This introduces a special method `.clone()` on the object. This is where you implement complex logic to do clone the whole objects.

> [!IMPORTANT] Copy and Clone are closely related
> Copy is essentially derived from clone i.e its a subset. 
`Copy` types must implement `Clone` because `Copy` is essentially saying "my `clone()` operation is so cheap it can happen implicitly.
