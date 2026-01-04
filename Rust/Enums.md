A *special* type that represents a group of constants.

```rust title="Enums in Rust"

enum Color{
    Red,
    Blue,
    Yellow,
    Green
}

let treeColor: Color = Color::Green;
```

## Storing data in enums
Rust enums are powerful; each variant can store different types and amounts of data.

```rust
enum Message {
    Quit,              // Unit variant, no data
    Move { x: i32, y: i32 },  // Struct variant with named fields
    Write(String),     // Tuple variant with one anonymous field
    ChangeColor(i32, i32, i32),  // Tuple variant with multiple fields
}
```

- **Unit variants** like `Quit` store no data.
- **Tuple variants** like `Write` or `ChangeColor` hold anonymous data.
- **Struct variants** like `Move` have named fields for structured data.

>[!NOTE] About memory allocation
> The amount of memory rust allocates for a struct is `>= largest_size_among_all_fields`, when creating the struct it atleast allocates this much. They live on heap as expected.


## Enums and the `match` expression
The match expression becomes very powerful when used with enums, since rust checks that all possible values of that enum must be covered in the match statement, below is an example: 
```rust
enum Color {
    Red,
    Green,
    Blue,
}

fn main() {
    let color = Color::Red;
    match color {
        Color::Red => println!("Red"),
        Color::Green => println!("Green"),
        Color::Blue => println!("Blue"),
    }
    // you can also access the data inside the enums if they have any
    enum Message {
	    Quit,              // Unit variant, no data
	    Move { x: i32, y: i32 },  // Struct variant with named fields
	    Write(String),     // Tuple variant with one anonymous field
	    ChangeColor(i32, i32, i32),  // Tuple variant with multiple fields
	}
	let m = Message::Write;
	match m {
		Message::Write(data_string) => {// name does not matter
		// now this data-string is available here,	
		},
		Message::Move{x, y} => { // name must match
			// notice the different accessor {} instead of ()
		}
	}
	
	// you can also define methods on enums
	// the syntax is same as with structs
	// Match is also possible using specific value contained in the enum
	enum Milk{
		Lowfat(i32),
		Whole
	}
	impl Milk{
		fn drink(self){
			match self {
				Milk::Lowfact(2) => {
					// spefic match that only matches when value = 2	
				}	
			}	
		}	
	}
}
```

### Enums and the `if let` statement

^0458e9

Sometimes you want to execute a piece of code for a specific enum value and you don't care about other possible values, sure you can use the `match` to achieve this, but the you have to match all possible values and even when using `-` you are writing unreachable code. `if let ` solves that.
```rust title="if let with enums" hl=6
enum Milk{
	Lowfat(i32),
	Whole
}
let x: Milk = Milk::Whole;

if let Milk::Whole = x { // syntax is very crucial if let <constant_val> = variable
	// do something
}
// naturally this also will work with all enum variants and the member access if needed works the same as in the match construct

```

There is also a `let else` which does the opposite of `if let` i.e. it only executes when the values are not equal.

```rust title="let else"
let Milk::Whole = x else {
	// do something
}
```
one super confusing difference comes when dealing with *non-unit* variants, when you do value access with `if let` then that value is available inside the scope of that `if let`, in case of `let-else` the inverse is true, if the else block fails to execute i.e. the *condition is true* then the member variables declared will be available to the rest of the program outside the `let else`. 

But that does not make sense right? How would the compiler know if the dynamic value x matches the conditional? Because if it doesn't know how would it ensure that the parameters declared are available after the block?

It requires you to break out of the current scope if you want to run a `let else` for a method this will be the **return**.

## Options Enum
Rust provides a built-in enum called `Option` to handle cases where a value may or may not be present. It is defined as follows:

```rust
let a = Option::Some(5); // This is a generic enum, the type here is Option<i32>
let b: Option<i32> = Option::None; // there is another way to do this
let b = Option::<i32>::None; // using the turbofish operator
```

- Option enum is very useful such is demonstrated by the built in array method get
```rust
let musical_instruments: [i32;3] = [56; 3];

let second = musical_instruments.get(2); // This returns an Option<&String>
```

- By default `Option` implements the copy-trait.
- Because `Option` is so common its members are already in scope `use Option::*` implicitly, so you can directly do something like `Some` or `None`. See [[Enums#^a5c2f7 | The Rust Prelude]]

#### Unwrap and Expect Methods
The "unwrap" method attempts to extract the associated data out of the **Some** variant. If the variant is **None** it will result in a `RuntimeError`.

```rust
let fifth = musical_instruments.get(5); // This is the None Variant
let value = fifth.unwrap();
```

The `expect` method is almost identical to `unwrap` but it allows us to customize the error message in case it fails.

```rust
let sixth = musical_instruments.get(6);
let value = sixth.expect("Unable to retrieve element from the array");
```

There is also an `unwrap_or` method, which can take a default value to return in case the unwrap is called on the `None` variant.

```rust
let value = fifth.unwrap_or(-1);
```

Along with this there is an `unwrap_or_else` method which takes a [[Closures|closure]] that generates the default value.

```rust
let value = fifth.unwrap_or_else(|| {
    // complex logic to generate default value
    -1
});
```

- The `match` syntax is very useful for `Option` since it forces you to cover all possible cases unlike `unwrap` and `expect`.

> [!NOTE] The `copied` method
> The `copied` method can be used to convert an `Option<&T>` to an `Option<T>` where `T` implements the `Copy` trait.
> ```rust
> let musical_instruments: [i32;3] = [56; 3];
> let second = musical_instruments.get(2).copied(); // This returns an Option<i32>
> ```


> [!INFO] The Rust Prelude
> The Rust prelude is a collection of named constructs that are available automatically in every program eg: types, functions, Option etc. Some other constructs require manual importing.

^a5c2f7

## Result Enum
A result can be either a `Success` or an `Error`.

```rust
pub enum Result<T,E>{
	Ok(T),
	Err(E),
}
```

- match operator works very well with it.

### Methods
Like `Option`, this enum also has very useful impl methods.

- `unwrap`: In case of success the data is returned else panics.
- `expect`: Works the same way as Option's expect.
- `unwrap_or`: Works the same way as Unwrap or.
- `is_ok`: Returns `boolean`
- `is_err`

### Enums and the `while let` loop
Like the [[Enums#^0458e9|if let]] statement, but instead this runs a look while the condition in the `let` yields the specified `enum` variant

```rust
let mut sauces: Vec<&str> = vec!["Sauce1", "Sauce2", "Sauce3"];
while let Some(sauce: &str) = sauces.pop() { // Pop returns a None variant if there are no elements left
	println!("The next sauce is {sauce}");
}
```
