## Why Testing?
Testing verifies that code behaves as expected and protects against regressions before shipping changes.

## Basics
- **Test**: A plain Rust function annotated with `#[test]` and executed by the test runner.
- **Assertions**: Statements that validate expectations in a test; an assertion either passes silently or fails the test.

## Testing Techniques

### `assert!`
Checks whether a boolean expression is true. If false, the macro panics and fails the test.

````rust
assert!(is_even(4));
````

### `assert_eq!`
Checks whether two expressions are equal. When they differ the macro prints both the left and right values before failing the test.

````rust
assert_eq!(add(2, 3), 5);
````

### `assert_ne!`
Checks whether two expressions are not equal. Equality triggers a failure along with the compared values.

````rust
assert_ne!(add(2, 2), 5);
````

## Example

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn test_add() {
    // Rust labels macro arguments as "left" and "right" instead of "expected" and "actual".
    assert_eq!(add(2, 3), 5);

    // Adding custom error messages with formatting, all assert macros support this.
    assert_eq!(add(2, 2), 4, "Adding {} and {} should equal {}", 2, 2, 4);
}
```

> *Debug trait is required for types used with `assert_eq!` and `assert_ne!` to print their values on failure.*


### `Result` Returning Tests

Tests can return `Result<T, E>`, allowing the use of the `?` operator for error handling. A test passes if it returns `Ok(())` and fails if it returns `Err`. It can be used in conjunction with assert macros.

```rust
#[test]
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("division by zero".to_string())
    } else {
        Ok(a / b)
    }
}
```

### `should_panic` Attribute

Annotate tests expected to panic with `#[should_panic]`. Optionally, specify an expected panic message substring.

```rust
#[test]
#[should_panic(expected = "test-panic-message")]
fn test_divide_by_zero() {
    panic!("test-panic-message"); // messages must match
}
```

> *The panic message is output to the console, to avoid cluttering the output, use `cargo test -- --quiet`, this passes the `--quiet` flag to the test binary.*

### `ignore` Attribute

Annotate tests that should be skipped during normal test runs with `#[ignore]`. These tests can be executed explicitly.

```rust
#[test]
#[ignore]
fn long_running_test() {
    // lengthy operations
}
```

## Running Tests
- Use `cargo test` (or the shorthand `cargo t`) to compile the crate and execute every function decorated with `#[test]`.
- It is common to keep tests next to the code under a `mod tests` module. Because it is a submodule, you can pull items into scope with `use super::*`.
- Add `#[cfg(test)]` to test modules to exclude them from non-test builds.
- Use `cargo test module_name` or `cargo test function_name` to target specific tests.
- Use `cargo test -- --ignored` to run only ignored tests.
- Use `cargo test -- --nocapture` to see all output from tests, including `println!` statements.
- Use `cargo test -- --lib` to run only library tests in a crate that has both library and binary targets.
- Use `cargo test -- --test` to run only integration tests.
- Use `cargo test -- --doc` to run only documentation tests.
- You can format the output with `cargo test -- --format pretty` or `terse` or `json`.

## Types of Tests
1. **Unit tests**: Focus on the smallest components in isolation. What we have demonstrated so far.
2. **Integration tests**: Verify how multiple components collaborate across boundaries.

Integration tests are placed in the `tests` directory at the crate root. Each file is compiled as a separate crate, so you need to import your library crate to test it.

[Example of an integration test](https://doc.rust-lang.org/rust-by-example/testing/integration_testing.html)

3. **Documentation tests**: Code examples in documentation comments are compiled and run as tests to ensure they remain accurate.

/// Adds two numbers together.
/// # Examples
/// ```
/// let sum = my_crate::add(2, 3);
/// assert_eq!(sum, 5);
/// ```

`cargo doc` will generate documentation including these examples. But will not run them. Use `cargo test` to execute documentation tests.

### Pretty Assertions
For more complex data structures, consider using the `pretty_assertions` crate. It provides enhanced diff output for easier debugging. Since its an external create, we need to add it to our `Cargo.toml`.

```toml
[dev-dependencies]
pretty_assertions = "1.0"
```

Then, in your test module, you can use it like this:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use pretty_assertions::{assert_eq, assert_ne};

    #[test]
    fn test_complex_structure() {
        let expected = vec![1, 2, 3];
        let actual = vec![1, 2, 4]; // Intentional mistake for demonstration
        assert_eq!(expected, actual); 
        assert_ne!(expected, vec![1, 2, 3, 4]);
    }
}
```
### Test Fixtures and the `rstest` Crate
Fixtures are a way to bundle setup code that can be reused across multiple tests. The `rstest` crate provides a convenient way to define and use fixtures in Rust tests.

```rust
use rstest::{fixture, rstest};

#[fixture]
fn setup_dummy_customers() -> Vec<String> {
    vec!["Alice".to_string(), "Bob".to_string(), "Charlie".to_string()]
}

#[rstest] //swap test attribute for rstest
fn test_customer_count(setup_dummy_customers: Vec<String>) { // rstest automatically runs the fixture and injects its return value
    assert_eq!(setup_dummy_customers.len(), 3);
}
```

## Test Driven Development (TDD)
TDD is a software development approach where tests are written before the actual code. The cycle typically follows these steps:
1. Write a failing test that defines a desired function or improvement.
2. Write the minimum amount of code necessary to make the test pass.
3. Refactor the code while ensuring all tests still pass.

<span style="color: red"> Red </span> -> <span style="color: red"> Green </span> -> Refactor.

This is encouraged for critical components to ensure correctness from the start.
