The if statement is weird, look at the syntax

```rust  title="Strange Syntax for if"
if expression { // you dont need parenthesis here
	
} // but you need the curly braces
```

And yes you have `else` and `else if` like any sane language

```rust title="else & else if in rust"
if expression {
	
}
else if expression2 { // Pardon my .NET psychopath habits
	
}
else {

}
```

### Assigning value of if else statement
Yes due to implicit returns and if-else ladder being technically a block, you can assign values out of it.

```rust title="Value assignment from if-else"
let age = 17;
    let voting_allowed: bool = if age >= 18 { true } else { false }; // This whole line starting from let is an "expression" the if is a "statement" which returns a value but this whole line is an expression.
    println!("{}", voting_allowed);
```

Read More: [[Functions#^statement-vs-expressions | Statements vs Expressions]]

## Match Statement
They went with "match" like our good old snake_friend 🐍. Below is the syntax-

```rust title="The Match Statement"
let evalution: bool = true;

match evaluation { // no break needed like other languages
	// Patterns/arms
	true => {
 		// do something
	}
	false => {
		// do something else
	}
	_ => {
		// default, I know its a sh^t example
	}
}
```

> A good safety feature of rust is that it checks whether all possible paths have been covered before the code can compile in a match statement.

And *assignment* also works like above.

> [!INFO] Fallthrough and multi-match
> By design rust match arms don't have a `break` statement, so it does not support fallthrough statements like if and if-else. To do a multi-match you follow the below syntax. Even the curly braces are optional, you can just write a single line after `=>`
> ```rust
> match x {
> 1 | 2 => { /* shared logic for 1 and 2 */ },
>_ => { /* rest */ }
> }
>```

> Every match arm must return a value because the **RHS** of the `=>` is a "statement" and they must be of same type, if it doesn't return anything it returns a [[Functions#^cbdcdc | Unit Tuple]]

### Combining `match` with `if-else`
In this episode or Rusty Voodoo we are looking at matched if-else.

```rust title="match arms with conditionals"
match x {
    n if n > 0 => {
        if n % 2 == 0 {
            "positive even"
        } else {
            "positive odd"
        }
    }
    n if n < 0 => {
        if n % 2 == 0 {
            "negative even"
        } else {
            "negative odd"
        }
    }
    0 => "zero",
    _ => "unknown",
}
```

Read More: [[Macros#`unreachable` macro | Unreachable macro]]

Up Next: [[Loops]]
