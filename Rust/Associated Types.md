An associated types is a placeholder for a type that is required within a trait. 

```rust
struct Lunch {
    cost: f64
}
 
iml Add for Lunch {
    type Output = Lunch; // Output is an associated type, since Lunch + Lunch may not be a lunch as far as rust is concerned
    fn add(self, other: Lunch) -> Lunch {
        Lunch {
            cost: self.cost + other.cost
        }
    }
}
```

## Special Cases: Constraining Associated Types

Associated types can be constrained in trait bounds by specifying their concrete types directly in the angle brackets or using where clauses. This allows you to enforce specific type requirements on implementations.

```rust
trait Calculator {
    type Input;
    type Output;
    fn calculate(&self, input: Self::Input) -> Self::Output;
}

// Implement for a simple struct
struct DoubleCalculator;

impl Calculator for DoubleCalculator {
    type Input = f64;
    type Output = f64;
    fn calculate(&self, input: Self::Input) -> Self::Output {
        input * 2.0
    }
}

// A generic function that requires specific associated types, ofcourse you can do it without the where clause <T: Calculator<Input = 64, Output = f64>
fn process_with_specific_types<T>(calc: T, value: f64) -> f64
where
    T: Calculator<Input = f64, Output = f64>,
{
    calc.calculate(value)
}
```

