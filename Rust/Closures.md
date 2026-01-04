Since rust is a functional language, it supports *closures*.

A closure is a function that "remembers" its lexical scope even when the function is called outside the scope. A functional language allows you to treat functions as first-class citizens, meaning you can pass them as arguments, return them from other functions, and assign them to variables.

Rust achieves this using anonymous functions which it calls closures.

```rust
let add_one = |x: i32| -> i32 x + 1;

let y = 10;
let add_y = |x: i32| x + y; // Closure captures y from its environment
```

The syntax is `|parameters| -> return_type { body }`. The parameter types & return type can often be inferred by the compiler, so they can be omitted, the parameter types are inferred using the first invocation something like hashmap insert. The only required thing is the pipe symbols `| |` that enclose the parameters, the curly braces can also be omitted for single-expression closures, the -> is also completely optional since in most cases the return type can be inferred.

Rust closures implement one or more traits based on how they capture variables from their environment:
- `Fn`: for closures that capture variables by reference. Can be called multiple times.
- `FnMut`: for closures that capture variables by mutable reference. Can modify the captured variables. Can be called multiple times.
- `FnOnce`: for closures that capture variables by value. Can only be called once because they take ownership of the captured variables.

> Fn : FnMut : FnOnce is the heirarcy
> The rust compiler treats a closure capture like a borrow, so lifetimes of the captures determine how long the closure can be used. The capture modes are determined at compile time based on how the closure is used.

> [!TIP] You can pass normal functions where closures are expected
> Since functions also implement the `Fn`, `FnMut`, and `FnOnce` traits (depending on their signature), you can pass regular functions to places where closures are expected.

Below are example use-cases:

```rust
// Immutable Borrow
let y = 10;
let closure = || { // explicit type annotation impl Fn() is not allowed here
    println!("y is: {}", y); // Captures y by immutable reference (no modification, no ownership transfer hence Fn)
}

// Mutable Borrow
let mut count = 0;
let mut closure = || { // see the mut keyword, you wont be able to call this without it
    count += 1; // Captures count by mutable reference (modification hence FnMut)
}

// The mut keyword is required because calling this closure mutates its captured environment, so calling it requires the FnMut trait, which takes a mutable reference to the closure itself.

// Ownership Transfer
let data = vec![1, 2, 3];
let closure = move || { // move keyword forces ownership transfer, although it will be inferred if the body has ownership transfer
    println!("data: {:?}", data); // Captures data by value (ownership transfer hence FnOnce)
}

// If the type implements Copy, it can still be used after the closure
```

> [!WARNING] `move` Does NOT Imply `FnOnce`
> 
> It's intuitive to think that since `move` transfers ownership, the closure cannot be called again. However, this is not true.
> 
> A closure annotated with `move` can still be `Fn`, `FnMut`, or `FnOnce`, depending on how it uses the captured variables:
> 
> - If the closure only reads the captured variables, it can be `Fn` (callable multiple times).
> - If it mutates them, it can be `FnMut` (callable multiple times with mutable access).
> - If it consumes them (e.g., by calling a method that takes ownership), then it is `FnOnce` (callable only once).
> 
> The `move` keyword only affects *how* the closure captures variables—it forces them to be moved into the closure. In layman's terms, it's like saying, "Hey, I'm taking ownership of these variables and putting them in my bag."
> 
> Using the analogy of a variable as an apple:
> - If the closure only looks at the apple, it can do so multiple times.
> - If it takes a tiny slice each time (mutating it slightly), it can still do that multiple times.
> - But if it gives the entire apple away (to a local variable or to the caller i.e. consuming it) or throws it in the trash (drops it), it cannot use the apple again.
> 
> Thus, the closure's trait depends on the operations in its body, not just the presence of `move`.

### Returning and Passing Closures
You can pass closures as arguments to functions or return them from functions. When doing so, you need to specify the closure traits.

```rust
// Accepting a closure as a parameter
fn apply<F>(func: F, value: i32) -> i32
where
    F: Fn(i32) -> i32, // you can inline the F into the angle brackets or annotate it in the type parameter list func: impl Fn(i32) -> i32
{
    func(value)
}

// Returning a closure from a function
fn make_adder(x: i32) -> impl Fn(i32) -> i32 {
    move |y| x + y // move keyword to capture x by value
}

// Due to Trait heirarcy, you can return FnMut or FnOnce where Fn is expected
```

