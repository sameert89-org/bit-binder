`rand` is an external crate in Rust that provides functionality for generating random numbers and performing various randomization tasks.

To use the `rand` crate in your Rust project, you need to add it as a dependency in your `Cargo.toml` file.

```toml
[dependencies]
rand = "0.8"  # Check https://crates.io/crates/rand for the latest version
```
## Usage

```rust
use rand::Rng;
// Generate a random number of basic types
let random_number: u32 = rand::random();

println!("Random number: {}", random_number);

// Generating multiple random numbers
use rand::rng; 
let mut my_rng = rng(); // the random() method auto generates this ThreadRng instance, its efficient to generate it once and reuse

for _ in 0..100 {
    let n = my_rng.random::<u32>(); // this by default generates numbers in the full range of u32, if you want to limit the range, use gen_range or multiply or divide by powers of 10

    let m = my_rng.random_range(1..101); // generates a number between 1 and 100 inclusive

    let b = my_rng.random_bool(0.75); // generates a random boolean value, takes arg as probability of true, default is 0.5

    let p = my_rng.random_ratio(1, 6); // generates a boolean like random_bool, but the change depends on the ratio of the two args, here it generates true with 1/6 probability
    println!("Random number: {}", n);
}

// Shuffle
use rand::seq::SliceRandom;
let mut arr = [1, 2, 3, 4, 5];
my_rng.shuffle(&mut arr);
println!("Shuffled array: {:?}", arr);
```
