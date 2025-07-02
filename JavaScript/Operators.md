The standard operators are there. Along with some weirdness.

**1. Exponentiation**

```js
console.log(2**3);  // Results in 8
```

**2. Equality Operators**

There are 2 of these `===` (strict equality) and `==` (equality), the former checks equality as well as type the latter does not check the type, if they are different it just tries to perform [[Type Coercion & Conversion]] first and then compares them.

```js
console.log(2 == '2')  // true
console.log(2 === '2')  // false
```

**3. Plus Operator**

This operator is used to perform good old addition but also works with strings and objects and arrays to give you all sorts of weird results.

```js
// Scenario 1: Addition of Numbers
const num1 = 5;
const num2 = 10;
const result1 = num1 + num2; // Adds two numbers, result is 15

// Scenario 2: Concatenation of Strings
const str1 = "Hello, ";
const str2 = "world!";
const result2 = str1 + str2; // Concatenates two strings, result is "Hello, world!"

// Scenario 3: Mixing Numbers and Strings
const num3 = 42;
const str3 = " is the answer.";
const result3 = num3 + str3; // Converts number to string and concatenates, result is "42 is the answer."

// Scenario 4: Concatenating Arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const result4 = arr1 + arr2; // Converts arrays to strings and concatenates, result is "1,23,4"

// Scenario 5: Adding Objects
const obj1 = { x: 1 };
const obj2 = { y: 2 };
const result5 = obj1 + obj2; // Converts objects to strings and concatenates, result is "[object Object][object Object]"

// Scenario 6: Mixing Data Types
const mixed1 = 5;
const mixed2 = "apples";
const result6 = mixed1 + mixed2; // Converts number to string and concatenates, result is "5apples"

// Scenario 7: More Complex Example
const complexObj = { prop1: 3, prop2: " oranges" };
const complexArr = [1, 2];
const complexResult = complexObj.prop1 + complexArr + complexObj.prop2; // Converts parts to strings and concatenates, result is "312 oranges"
```

<mark style="background: #FF5582A6;">WierdJS</mark>
Strings are always converted to numbers (or atleast js tries to) when there is a math operation involved. But when it cannot do that it give **NaN** which stands for Not a number (for \*, \\ & -)


## Operator Precedence

[MDN Precedence Table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table)

## Spread Operator
`...` operator is used to unpack the value of an iterable or object. Apart from the usual use cases to make deep copies, merging & combining. Below are some of the important use cases.
- Collect remaining arguments of a function

```js
function exampleFunction(first, ...rest) { console.log(first); // prints the first argument console.log(rest); // collects the rest of the arguments into an array }
// The above is possible because spread operator can be combined with destructuring, rest must be the last one
const [a, b, ...others] = [1,2,3,4,5]
// It also works in objects
const myObj = {
k1: 1,
k2: 3,
k3: 7
}
const myNewObj = {k3, ...rest} = myObj;
```


## Short Circuiting
The logical `&` and `|` operators can work on any data type and return any data type, they have a property called short-circuit evaluation.

```js
console.log(1 || "e"); // Results in 1
// If a is true return a, else if b is true return b else if c is true return c all the way until finally return the last one if none of the predecessors are true
console.log(0 && "Sameer") // Return the first false one or the last one
console.log(x && "truthy" || "falsy"); // truthy
// This only moves when x is truthy, so it prints truthy otherwise if x is falsy it prints falsy
```

## Nullish Coalescence Operator
Introduced in ES2020, it solves one of the issues of the `||` short circuiting. It works on the concept of *nullish* values which are null & undefined, so it does not short circuit on `'' or 0`

```js
const guests = 0

guests || "Error"; // This results in "Error" but guests can be zero
guests ?? "Error"; // This results in 0
```

## Logical Assignment Operators
Introduced in ES2021, these provided a nifty way to write self short circuiting statements.

```javascript
let num = 0;
num = num || 10; // assigns num to 10
num ||= 10; // This works the same

num ??= 10;
num &&= 10;
// There are counterparts for these too!
```

## Optional Chaining
Sometimes some object may not exist and you try to access one of its properties and get an error. Optional chaining makes it so that it does not throw an error but it returns undefined immediately.
```js
console.log(myObject.propA?.childA); 
const openingTime = restaurant.openingHours[day]?.open ?? "-";
// Also works on functions and arrays
const bill = parseBill?.(orderID); 
```