There are many ways to declare the functions.
```js
function myFunction(){
	// Bog standard function also called function Declaration
}
const mySecondFunction = () => {
	// The phat arrow also an anon function
}
const myThirdFunction = function() {
 // Anonymous Function
}
```

- **Functional Expressions**  Functional expressions, also known as anonymous functions or lambda expressions in some programming languages, are a way to define a function in a more concise and flexible manner. Functional expressions allow you to define a function on-the-fly without giving it a formal name. They are often used for short, simple operations or when you need to pass a function as an argument to another function.
- Functions can be treated as **first class citizens** in JavaScript, they can be passed around to and returned from function.
```js
function greet(greeting){
	return function print(name){
		console.log(`${greeting} ${name}!!!`);
	}
}
greet("Hello")("Sameer");

const greet2 = greeting=> name => console.log(`${greeting} ${name}!!!`);

greet2("Hello")("Sameer");
```
- **Callbacks** A callback is a programming concept that refers to a function or a piece of code that is passed as an argument to another function and is intended to be executed at a later point in the program's execution
- **Immediately Invoked Function Expressions (IIFE):** You can create and execute an anonymous function immediately after defining it, which is useful for creating private scopes and avoiding variable name clashes.
```js
(function() {
  // This code is inside the IIFE and has its own scope
  var localVar = 42;
  console.log(localVar); // Outputs: 42
})(); // This () at the end invokes the function immediately

// localVar is not accessible here, outside the IIFE
console.log(typeof localVar); // Outputs: "undefined"
```
- **this behaviour** In anon functions the this does not bind to anything, where as incase of defined functions the this binds to the function itself.
- Functional expressions lack [[Hoisting]] So they cannot be called before they are declared.
- **Partial Functions and the Lexical Environment** You can use anonymous functions to create partial functions by "remembering" certain arguments and returning a new function with those arguments fixed.
```js
function multiply(x) {
  return function(y) { // const returnedFunction = function() This will work too
    return x * y;
  };
}

const double = multiply(2); // Create a function that doubles a number
const triple = multiply(3); // Create a function that triples a number

console.log(double(5)); // Outputs: 10 (2 * 5)
console.log(triple(5)); // Outputs: 15 (3 * 5)
```
## Default Values
Like C++ you can specify default values for the arguments.
## Scopes, Context & Lexical Environment

When executing a function or script, the JavaScript interpreter creates a new context. Every script/function has a base context called global execution context. And every time we call a function, a new execution context is created and is put on top of the _execution stack._ The same pattern follows when you reach the nested function which calls another nested function. There are two scopes in JavaScript.

1.    Global Scope

2.   Local Scope

**Global Scope**

There is only one global scope throughout a JavaScript document. We can access and change variables in the global scope.

**Local Scope**

Variables defined inside a function are in the local scope. And they have a different scope for every call of that function. This means the same variable name can exist in other functions as well. This is because those variables are bound to that scope.


The scope chain helps to resolve variables. When a variable needs to resolve, JavaScript starts from the innermost level of the code and keeps jumping back to the parent scope until it finds the variable it’s looking for.

**Lexical Scope**

When we have a nested group of functions, the inner function has access to variables and other resources of the parent function. This means child functions are lexically bound to the execution context of their parents.

```js
function findMyName() {
var name = "Max Mayfield";
return function printMyName() { console.log(name);
}
}
< undefined
> findMyName()()
Max Mayfield
<- undefined
```

The printMyName() function had access to name variable of findMyName() function. This will work only in one direction, you cannot access variables and other resources residing in the inner function from the parent function.

**Lexical Environment**

When the JavaScript engine creates a new execution context for a function, it creates a new lexical environment to store variables defined in that function during the execution phase.

A **lexical Environment** is a data structure that holds an _identifier-variable_ mapping. (here identifier refers to the name of variables/functions, and the variable is the reference to the actual object including function type object or primitive value).

The lexical environment contains two components:

1.    Environment record: It is the actual place where the variable and function declarations are stored.

2.   Reference to the outer environment: It means it has access to its outer (parent) lexical environment.

```js
let language = 'JavaScript';  
function a() {  
  const b = "Dart";  
  console.log("Inside function a");  
}a();  
console.log("Global execution context")```

When the JavaScript engine creates a new execution context for global, it creates a new lexical environment to store variables and functions defined in the scope. It looks like this:

```js
globalLexicalEnvironment = {  
  environmentRecord: {  
      language    : 'JavaScript',  
      a : < reference to function object >  
  }  
  outer: null  
}
```

When the JavaScript engine creates a new execution context for function a(), it creates a new lexical environment to store variables and functions defined in the scope. It looks like this:

```js
functionLexicalEnvironment = {  
  environmentRecord: {  
      b    : 'Dart',  
  }  
  outer: <globalLexicalEnvironment>  
}
```

When the function completes the execution it may or may not be removed from the stack, depending on if that lexical environment is referred to by any other lexical environments in their outer lexical environment property.  When you return a function from another function, the returned function closes over its lexical environment, which means it retains a reference to the variables and parameters it needs from the outer function's scope. This allows the returned function to access and use those variables even after the outer function has completed execution. The outer function's scope, including its local variables, will eventually be subject to garbage collection when there are no references to it. However, as long as the returned function (the closure) still exists and references the variables from the outer function's scope, those variables will not be garbage collected.

## Closures
A closure is a feature of JavaScript that allows inner functions to access the outer scope of a function. Closure helps in binding a function to its outer boundary and is created automatically whenever a function is created. A block is also treated as a scope since ES6.

Since JavaScript is [[event-driven]] so closures are useful as it helps to maintain the state between events.

## Call, apply & bind
Call is used to call a function with a specific this value.
```js
myFunction.call(myObject, arg1, arg2, ...);
```

Apply is used to call a function with a specific this value but it takes an arguments array.
```js
myFunction.call(myObject, argumentsArray); // you could just use call with destructuring to achieve the same effect.
```

Bind is used to bind a function to a this value and return a new bound function which can be invoked later.
```js
const myBoundFunction = myFunction.bind(myObject, defaultValues);
myBoundFunction(args);
```

