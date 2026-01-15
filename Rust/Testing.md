Testing is testing, do you seriously need a definition forthat?

### Basics

**Assertions**: A verification that a statement is valid, to assert means to state a fact.

**Test**: A test is a plain Rust function annotated with the `#[test]` attribute. It is executed by the test runner.

**`assert_eq!` macro**: A macro that checks if two expressions are equal. If they are not, the test fails and an error message is printed.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn test_add() {
    assert_eq!(add(2, 3), 5);
}
```

**Running Tests**: To run tests in a Rust project, use the command `cargo test` or`cargo t` in the terminal. This will compile the code and execute all functions annotated with `#[test]`.

> *In Rust it's common to write tests alongside the code. Generally we create a `mod tests` and put our tests there, since its a submodule you can use `super` or `crate` or pull everything using `use super::*`* 
> *Usually all the test code will be a part of the final binary, but you can use `#[cfg(test)]` to exclude it from builds.*
> *You can run `cargo test module_name` or `cargo test function_name` to run specific tests.*

### Types of tests
1. **Unit Tests**: Targets a small component of a program in isolation.

2. **Integration Tests**: Tests the interaction of multiple components within the program.
