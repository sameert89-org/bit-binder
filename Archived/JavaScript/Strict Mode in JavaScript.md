This is how you activate strict mode.

```js
'use strict';
// Rest of your code
```

Strict Mode helps you catch common coding mistakes and prevents the use of certain error-prone features.
Below is the list of things that strict mode does:
1. **Disallow Undeclared Variables:** You cannot attach stuff to global scope, it will throw an error in strict mode. 
2. **Eliminate this coercion:** In normal mode when you use `this` in a function that is standalone(Not a method of an object) it refers to the global object. But in strict mode it remains undefined.
3. **Prohibition of Octal Literals:** In normal mode numbers that start with a 0 are treated as octal numbers. But in strict mode they are not allowed.
4. **Forbid Assignment to Read-Only Properties:** 
you cannot assign values to read only properties and non-writable properties.
```js
'use strict';
NaN = 55 // This throws type error
window = 55  // Also invalid
```

5. **Functions cannot have duplicate parameter names**
6. **Objects cannot have same name for more than one properties**
7. **with statement:** Strict Mode removes with statement. [with statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
8. **Restricts the delete operator:** In strict mode the delete operator cannot be used to delete variables, function names or function arguments.
10. Disallow eval with variable declarations. `eval('var x = 5')` This does not add the variable to the global scope in strict mode.
11. **Block `this` in Constructors:** In strict mode, constructors called without the `new` keyword won't inadvertently overwrite global variables. Instead, they will operate in the current scope.
    
12. **Eliminate `arguments` and `caller`:** In strict mode, you can't modify the `arguments` object, and accessing the `caller` property of a function is disallowed.
    
13. **Introduce Restricted Words:** A set of additional keywords is reserved for future versions of JavaScript, reducing the likelihood of naming conflicts.
    
14. **Enhance `eval`:** Code executed with `eval` has its own scope in strict mode and doesn't introduce new variables into the surrounding scope.
    
15. **Make `this` Immutable:** In strict mode, you can't assign a new value to `this` within a function, preventing accidental changes to the `this` context.
    
16. **Enforce Strict Parsing:** Some mistakes that might have been silently tolerated in non-strict mode are treated as errors in strict mode
17. Functions are block scoped in strict mode otherwise they are function scoped. 