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
	impl milk{
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