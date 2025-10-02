A *struct* or structure is a container for related pieces of data.

There are 3 types of structs in rust:

1. Named Type Structs: Fields have names, this is the most common type of struct.
2. Tuple structs: These are like tuples but have a name. Which can be used to create more *instances* of the struct type.
3. Unit structs: These structs don't have any fields. These are used when you want a type to implement traits but don't want to store any data.
 
```rust
/* Named Type Structs */
struct Person {
	name: String,
	age: u8 
}

let heroine = Person {
	name: String::from("Daenerys Targaryen"),
	age: 197
}; // Notice the delimiter

println!("{} was the rightful heir to the Iron Throne", heroine.name);

/* Tuple structs */
struct Rgb(u8, u8, u8);

let black = Rgb(255,255,255);

println!("R value of black is: {Rgb.0}");

/* Unit structs */
struct Marker;

let m1 = Marker; 
```


> [!TIP] Mutability of Fields
> All fields are either mutable or immutable depending on whether the variable that owns the struct is declared as `mut` 

> [!NOTE] Field Init Shorthand and Spreading
Like TS and JS Object property shorthand, rust has a handy syntactical sugar for doing below
> ```rust
> struct Player {
>     class: String,
>     name: String, 
>     level: u8
> }
> 
> fn create_player(class: String, name: String, level: u8) -> Player {
>     Player {
>         class,
>         level,
>         name 
>     }   
> }
> ```
> 
> Apart from this it also has spreading, which in Rust is called "struct update syntax":
> ```rust
> fn level_up_player(player: Player) -> Player {
>     Player {
>         level: player.level + 1,
>         ..player // Must be written last in the syntax field and rust will not replace anything that was declared before the spread
>     }
> }
> 
> // Example usage:
> let player1 = Player {
>     class: String::from("Warrior"),
>     name: String::from("Alice"),
>     level: 5
> };
> 
> let player2 = level_up_player(player1);
> // player2 will have class: "Warrior", name: "Alice", level: 6
> ```

## Struct Methods
We can define functions on structs, a function can either belong to instance of struct or struct itself (called associated function)

```rust title="Struct Methods"
const PI: f64 = 3.14;
struct Circle {
	radius: f64
}

impl Circle {
	fn calc_area(&self: Self) -> f64 { // You can also pass self and mut self which will result in an ownership transfer
		PI * self.radius * self.radius
	}
	fn increase_radius(&mut self: &mut Circle, increase_by: f64) {
		self.radius += increase_by;
	}
	// Associated function (does not take self)
	fn get_sides() -> u8 {
		0	
	}
}
```

> A struct can define multiple `impl` blocks, during compilation it will combine all the blocks to create the final implementation.

## Builder Pattern
Every method returns the instance itself. Like in C#
```c#
builder.AddOptions().AddHttpClient().AddControllers();
```
Its also possible in rust: 

```rust
#[derive(Clone)]
struct Builder {
    options: Vec<String>,
}

impl Builder {
    fn new() -> Self {
        Self {
            options: Vec::new(),
        }
    }

    fn add_option(mut self, opt: String) -> Self { // we can also return a mutable reference
        self.options.push(opt);
        self
    }

    fn build(self) -> Vec<String> {
        self.options
    }

fn main() {
    let builder = Builder::new()
        .add_option("option1".to_string())
        .add_option("option2".to_string());

    let result = builder.build();
    println!("{:?}", result);
}
```


