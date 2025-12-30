A trait is a contract that requires the types that implement the trait to have certain functionality according to the contract. Imagine them like an interface in C# and Java and abstract classes in C++. They enable **polymorphism** in Rust.

## Defining a Trait
A trait is defined using the `trait` keyword.

```rust
enum AccomodationCategory {
    Hotel,
    Hostel,
    House
}
trait Accomodation {
    fn number_of_rooms(&self) -> u32;
    fn cost_per_night(&self) -> f64;
    fn is_booked(&mut self) -> bool;
    fn category() -> AccomodationCategory; // static/Associated function
    const MAX_ROOMS: u32 = 100; // Associated constant
}
```

## Implementing a Trait
A trait is implemented for a type using the `impl` keyword. Each trait that a type implements requires a separate `impl` block. Methods outside the trait contract should be defined in a plain `impl` block.

```rust
struct AirBnb {
    rooms: u32,
    cost: f64,
    booked: bool,
}
impl Accomodation for AirBnb {
    fn number_of_rooms(&self) -> u32 {
        self.rooms
    }

    fn cost_per_night(&self) -> f64 {
        self.cost
    }

    fn is_booked(&mut self) -> bool {
        self.booked = true;
        self.booked
    }

    fn category() -> AccomodationCategory {
        AccomodationCategory::House
    }
}
```

### Default Implementaions
Traits can provide default implementations for methods. Types can choose to override these implementations.

```rust
trait Accomodation {
    fn number_of_rooms(&self) -> u32;
    fn cost_per_night(&self) -> f64;
    fn is_booked(&mut self) -> bool {
        // Default implementation
        false
    }
}
```

### Traits as bounds
Traits can be used as bounds on function parameters as well as generic type parameters.

```rust
fn print_accomodation_details<T: Accomodation>(accomodation: &T) { // when not using generics its fn print_accomodation_details(accomodation: &impl Accomodation)
{
    println!("Rooms: {}", accomodation.number_of_rooms());
    println!("Cost per night: {}", accomodation.cost_per_night());
}

// When using generic with multiple parameters, concrete types must be same for all T
fn compare_accomodations<T: Accomodation>(a: &T, b: &T) { // T must be same concrete type, the way to get around this is using two generic types with same trait bound
    if a.cost_per_night() < b.cost_per_night() {
        println!("First accomodation is cheaper");
    } else {
        println!("Second accomodation is cheaper");
    }
}

// Multiple trait bounds
trait Cleanable {
    fn clean(&self);
}

fn manage_accomodation<T: Accomodation + Cleanable>(accomodation: &T) { // It is valid in the non generic sytanx as well
    accomodation.clean();
    println!("Rooms: {}", accomodation.number_of_rooms());
}

// trait bounds on impl blocks
impl<T: Accomodation + Cleanable> Manager for T {
    fn manage(&self) {
        self.clean();
        println!("Rooms: {}", self.number_of_rooms());
    }
}
```

**Read More:**: [[Generics^#generic_impl_blocks|Generic Impl Blocks]]

### Where clause
When there are multiple trait bounds on generic types, it is often cleaner to use a `where` clause.

```rust
fn manage_accomodation<T, U>(accomodation: &T, cleaner: &U)
where
    T: Accomodation,
    U: Cleanable,
{
    cleaner.clean(accomodation);
    println!("Rooms: {}", accomodation.number_of_rooms());
}
```

### Traits as Function Return Types
Traits can also be used as return types for functions using `impl Trait` syntax.

```rust
fn create_accomodation() -> impl Accomodation {
    AirBnb {
        rooms: 3,
        cost: 150.0,
        booked: false,
    }
}
// The concrete type returned must be a same, for example you cannot return different types based on some condition even if they implement Accomodation.
```

### Trait Objects
A trait object is an instance of a type that implements a particular trait whose methods will be accessed at runtime using a feature called bynamic dispatch. To create a trait object, you use a reference to the trait with the `dyn` keyword.

```rust
trait Animal{
    fn speak(&self);
}

struct Dog;
struct Cat;

impl Animal for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
}

impl Animal for Cat {
    fn speak(&self) {
        println!("Meow!");
    }
}

let butch = Dog{};
let tom = Cat{};

let animal1: &dyn Animal = &butch; // trait object using dyn keyword, notice the dyn keyword
let animal2: &dyn Animal = &tom;

```

**what is dynamic dispatch?**
Its a runtime polymorphism, suppose two types implement the same trait, and you have a function that takes a reference to that trait, at runtime based on the concrete type passed the appropriate method implementation is called.

```rust

let animals: Vec<&dyn Animal> = vec![animal1, animal2]; // trait objects using dyn keyword, notice the dyn keyword (although its optional here since rust 2018 Vec<&Animal> is actually dynamic dispatch behind the scenes)
for animal in animals {
    animal.speak(); // Dynamic dispatch happens here
}
// Multiple traits also work with + operator
let animals: Vec<&dyn Animal + Speak> = vec![animal1, animal2];
```

> Why not use Vec<Animal> directly? Well you can't since Vector requires fixed size elements, two types implementing the same trait can have different sizes, so you must store a reference to those.

> Traits can be marked public using `pub trait TraitName` syntax. All methods inside the trait will become public as well. As a result, unlike regular `impl` blocks, you don't need to mark each method as public individually.

### Getters and Setters

```rust
trait Person {
    fn get_name(&self) -> &str;
    fn set_name(&mut self, name: String);
}

struct Employee {
    name: String,
}

impl Person for Employee {
    fn get_name(&self) -> &str {
        &self.name
    }

    fn set_name(&mut self, name: String) {
        self.name = name;
    }
}
```

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


