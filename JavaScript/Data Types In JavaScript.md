## Primitive Data Types

Primitive data types are the basic building blocks of data in JavaScript. They are immutable, meaning their values cannot be changed once they are created. In JavaScript, there are seven primitive data types:

1. **Number**: Represents both integer and floating-point numbers. Example: `let num = 42;`

2. **String**: Represents textual data enclosed in single (' ') or double (" ") quotes. Example: `let name = "John";` Singe and double quotes can both used.

3. **Boolean**: Represents true or false values. Example: `let isTrue = true;`

4. **Undefined**: Represents a variable that has been declared but not assigned a value. Example: `let x;` The variable's value is undefined and its type is also undefined.

5. **Null**: Represents an intentional absence of any object value or no value at all. Example: `let y = null;` *typeof null is Object 😵*

6. **Symbol** (ES6 and later): Represents a unique and immutable value, often used as object property keys. Example: `const uniqueSymbol = Symbol('description');`

7. **BigInt** (ES 2020 and later): Used for storing Very Large numbers, use suffix n for making BigInt. Example: `let largeNum = 1234567890123456789012345678901234567890n;

<mark style="background: #FFF3A3A6;">Note:</mark> In JavaScript, regular Number values (non-BigInt) have a limit to their precision, which means they can only represent integers accurately up to a certain point. Beyond this point, they may lose precision, and calculations with very large or very small numbers can result in inaccuracies or unexpected behavior. This limitation is due to the way JavaScript represents numbers using the IEEE 754 floating-point standard.

The maximum integer that can be accurately represented in JavaScript as a regular Number is `Number.MAX_SAFE_INTEGER`, which is equal to 2^53 - 1 or 9,007,199,254,740,991. This represents the largest integer that can be stored without losing precision.

**Primitive values when declared with const are immutable.**

## Non Primitive Data Types / Reference Data Types
 Non-primitive data types are more complex data structures and are often referred to as reference types because they are stored by reference in memory. They are mutable, meaning their values can be changed after creation. In JavaScript, there are three primary non-primitive data types:
    
1. **Object**: Represents a collection of key-value pairs and is a fundamental data structure in JavaScript. Examples: `let person = { name: "Alice", age: 30 };`
    
2. **Array**: A special type of object used to store ordered lists of values. Examples: `let numbers = [1, 2, 3];`
    
3. **Function**: Functions in JavaScript are first-class citizens and are treated as objects. You can assign them to variables, pass them as arguments, and return them from other functions. Example: `function add(x, y) { return x + y; }`

**Non primitive values are still mutable when declared with const**
### Checking Types

```js
typeof objectToCheck;
typeof(objectToCheck);
typeof null;  // This is object for some reason
```


==Note== :If you create a new variable and assign it to a non primitive data types, it will just create a reference to the non primitive type, rather than creating a copy of the type. 