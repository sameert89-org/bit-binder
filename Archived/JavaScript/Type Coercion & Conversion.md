
There are a lot of terms and even more confusion regarding this.

#### Casting
It is conversion of data from one type to another.

**Type Coercion (Implicit Casting)**: When types are automatically converted by the compiler/interpreter.
**Type Conversion (Static Casting)**: Manual Conversion of types done by the programmer during compile time.
```js
var fix = "55";
console.log(typeof fix)
fix = Number(fix)  // Slow and not recommended
fix = parseInt(fix)  // Recommended way
fix = fix + 0  // ✅ Also works
console.log(typeof fix)
```
**Dynamic Casting**
- Dynamic casting is typically used in languages that support object-oriented programming, such as C++ or Java. It's used for casting between related class types in a type-safe way.
- It's performed at runtime and is used when you need to determine whether a base-class pointer or reference actually points to a derived-class object, and if so, perform the casting.
- Dynamic casting checks if the cast is valid and returns either a valid pointer to the derived class or a null pointer if the cast is not valid.

```cpp
Base* basePtr = new Derived;
Derived* derivedPtr = dynamic_cast<Derived*>(basePtr); // Dynamic casting
if (derivedPtr) {
    // Casting successful
}
```

<mark style="background: #FF5582A6;">WierdJS</mark>

```js
console.log(typeof NaN);  // This is a number for some reason
console.log(NaN === NaN); // Outputs false
```