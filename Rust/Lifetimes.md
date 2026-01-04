Lifetimes are a compile time feature that track how long references are valid. The actual compiler determined span of validity is often called concrete lifetime. 
**borrow checker:** The part of the compiler that enforces the rules of references and lifetimes.
**referrent/lender**: The data being borrowed.
**reference:** borrow

> [!NOTE] Non Lexical Lifetimes (NLL)
> The rust compiler treats the last usage of a reference as the end of its lifetime, rather than the end of its scope. This was not originally the part of the language, see [RFC 2094](https://rust-lang.github.io/rfcs/2094-nll.html) for more details.


## Functions and Lifetimes

> [!WARNING]
>A function cannot return a reference to owned values or parameters
>```rust
>// It might seem intuitive to write a function like this:
>fn create() -> &i32 {
>    let x = 5;
>    &x  // Invalid, x goes out of scope here
>}
>```
> The only way to return a reference from a function is to return a reference to data that is owned by the caller. For that to happen you need to have a reference as a parameter:
> ```rust
> fn get_first_element(v: &Vec<i32>) -> &i32 {
>     &v[0]  // Valid, returns a reference to data owned by the caller
> }

### Generic Lifetimes

A **generic lifetime** is an abstract, hypothetical lifetime that can vary, we can annotate generic lifetimes in code, this enables functions that are flexible enough to handle varying lifetimes.

Lifetime annotations are used to specify generic lifetimes.

```rust
fn get_first_element<'a>(v: &'a Vec<i32>) -> &'a i32 {
    &v[0]
} // The above example with explicit lifetime annotations, we can omit these here due to lifetime elision rules.
```

> [!NOTE] Lifetime Elision Rules
> Rust has three lifetime elision rules that the compiler uses to infer lifetimes when they are not explicitly annotated:
> 1. Each parameter that is a reference gets its own lifetime parameter.
> 2. If there is exactly one input reference/lifetime parameter, that lifetime is assigned to all output lifetime parameters.
> 3. If there are multiple input lifetimes and one of them is &self or &mut self, the lifetime of self is assigned to all elided output lifetimes.

In simple cases like the one above, Rust's *lifetime elision* might let you omit annotations, but they are essential for correctness in functions with multiple reference parameters or when lifetimes vary:

```rust
// This fails without annotations due to ambiguity.
fn longest_string(x: &str, y: &str) -> &str {  // Compile error
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// Multiple lifetimes can be annotated with 'a, 'b, etc.
fn return_first<'a, 'b>(x: &'a str, y: &'b str) -> &'a str { // 'b is optional here
    x
}

// Explicitly annotated to specify the relationship.
fn longest_string<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
// This means that the returned reference will live as long as both input references i.e if any one goes out of scope the returned reference becomes invalid.
```

### Lifetimes in Structs
Structs also need lifetime annotations when they hold references:

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
} // part and the struct instance must have the same lifetime, if any one is shorter the other becomes invalid as soon as the shorter one goes out of scope.
```

> *The following text is AI generated.*
A struct instance cannot live longer than its shortest-lived field. However, the **validity of the references inside** the struct depends on how you define the lifetimes.

### Scenario
We have two string references:
*   `from`: Lives a long time (Outer scope).
*   `to`: Lives a short time (Inner scope).

### Case 1: Single Lifetime (`<'a>`)
```rust
struct TravelPlan<'a> {
    from: &'a str,
    to: &'a str,
}
```
**Mechanism:** Both fields share a single lifetime "visa." The compiler must find one lifespan that satisfies **both**.
*   **Result:** The struct is forced to adopt the **shortest** lifespan (that of `to`).
*   **The Consequence:** The reference `from` is "dragged down." Even though the actual data `from` exists longer, the reference `&from` inside the struct is treated as if it dies when `to` dies.
*   **Extraction:** **Failed.** You cannot return `travel_plan.from` because Rust thinks it is tied to the short life of `to`.

### Case 2: Independent Lifetimes (`<'a, 'b>`)
```rust
struct TravelPlan<'a, 'b> {
    from: &'a str,
    to:   &'b str,
}
```
**Mechanism:** The fields have independent "visas."
*   **Result:** The struct instance still dies when the shortest field (`to`) dies, because a struct cannot exist with a dead field. **However**, the `from` field retains its long lifespan.
*   **The Consequence:** While the container (`travel_plan`) dies, the data inside it (`&from`) is known to be valid for a longer time.
*   **Extraction:** **Success.** You can return `travel_plan.from` because the compiler sees that this specific reference was never tied to `to`.

### Summary
| Lifetime Definition | Struct Lifespan | `from` Reference Validity | Can return `from`? |
| :--- | :--- | :--- | :--- |
| `<'a>` (Shared) | Short (tied to `to`) | Short (tied to `to`) | **No** |
| `<'a, 'b>` (Separate) | Short (dies with `to`) | **Long** (independent) | **Yes** |



## Static lifetimes
A `'static` lifetime means that the reference is valid for the entire duration of the program. String literals have a `'static` lifetime because they are stored in the binary's read-only memory and exist for the entire runtime of the program.

```rust

fn speak() -> &'static str {
    "I have a static lifetime."
} // string literals and constants have a 'static lifetime

static PRIMES: &[i32] = &[2, 3, 5, 7, 11, 13]; // A static variable with a 'static lifetime

struct Point {
    x: i32,
    y: i32,
}
struct ORIGIN: Point = Point { x: 0, y: 0 }; // A static instance of a struct

static EXPECTED_RESULT: Result<i32, String> = Ok(42); // A static instance of a generic built-in type
```
