I am not going to define functions, that would be absurd. Below is the syntax however if I ever get dementia. Rust is a functional programming language so you have pretty much all function functionalities with added extras.


> [!INFO] Parameters vs Arguments
> _Functions_ may declare a set of input variables as _parameters_, through which the caller passes _arguments_ into the _function_


```rust title="Sample Function"
fn my_function(){
	// Body here
}
```

Well there are a few differences between the functions you see in other languages-
### **Implicit Returns**
You don't have to add an explicit `return` statement for functions. 

```rust title="Implicit Return Example"
fn add(x: i32, y: i32) -> i32 { // The return type is a must when your function returns anything other than a unit tuple 
    x + y  // implicit return (no semicolon)
}

// This behaviour is not limited to functions, any block's last statement is an implicit return
let x = {
	let k = 2.14;
	k*k
}
```


> [!WARNING] Notice the semi-colon (Statements vs Expressions)
> Statements in rust end with a semi-colon and do not return a value, Expressions don't end with a semi-colon and do return a value, in the implicit return the last line has to be an expression for it to work. Furthermore if you specified a return type in the function definition and then add a statement at the end of the function, it will trigger a compile time error.
^statement-vs-expressions

### **Ownership & Borrowing**
Parameters can take ownership, borrow immutably, or borrow mutably:

```rust title="Ownership Example"
fn take_ownership(s: String) { /* s is moved here */ }
fn borrow_immutably(s: &String) { /* s is borrowed */ }
fn borrow_mutably(s: &mut String) { /* s is mutably borrowed */ }
```

> The default return type for a function without any explicit or implicit returns i.e. `void` is a **Unit Tuple**

^cbdcdc

