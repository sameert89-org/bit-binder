var, let & const keywords can be used to create these.

```js
var s = 5;
let t = 10;
const u = 15;
```

JavaScript supports [[Dynamic Typing (Late Binding)]]


## var vs let vs const

|Property|`let`|`var`|`const`|
|---|---|---|---|
|Scope|Block-scoped|Function-scoped|Block-scoped|
|Hoisting|Hoisted within block|Hoisted to the function|Hoisted within block|
|Reassignment|Can be reassigned|Can be reassigned|Cannot be reassigned|
|Initialization Required|No|No|Yes|
|Example|`let x = 10;`|`var x = 10;`|`const x = 10;`|
<mark style="background: #FF5582A6;">WierdJS</mark>

```js
fruit = "apple";
console.log(fruit);  // This works but it is not a variable it adds a property to the global object
```
## Naming Conventions

The variables have certain naming conventions. It a good practice to follow a set of conventions.

#### Camel Case

*Used for variables and function names in JS*
```js
var myVariable = 50;
function myFunction(paramA) {
	// body
}
```

#### Snake Case

*It is not commonly used in JS*
#### Pascal Case

*Used for Constructors and Classes*

```js
class MyClass{
	MyClass(paramVal) {
		// Body
	}
}
```

#### Upper Case or Screaming Snake Case

*Used for Constants like API_KEY, DB_URL*

```js
CONST API_KEY = "HF324NI2DIWNFE12312421NINIJ";
```

#### Kebab Case

*Used for html attributes and css naming, cannot be used in naming variables in any programming language*

```css
.intro-title{
	
}
```
```html
<button on-click = handleClick>Click Me!</button>
```

## Naming Conventions in CSS

**BEM (Block Element Modifier)**: BEM is a widely used naming convention that promotes a clear and structured approach to naming classes. It divides selectors into three parts:

- **Block**: Represents a standalone component or module (e.g., `.button`, `.menu`).
- **Element**: Represents a part or component within a block (e.g., `.button__label`, `.menu__item`).
- **Modifier**: Represents variations or states of a block or element (e.g., `.button--primary`, `.menu--open`).

Example:
```css
.button {
    /* Styles for the button block */
}

.button__label {
    /* Styles for the button's label element */
}

.button--primary {
    /* Modifier class for a primary button */
}

```

**Functional CSS**: Functional CSS is an approach that uses very small, single-purpose utility classes to apply styles directly to elements. It aims for minimal specificity and encourages composing styles by combining utility classes.

Example:

```css
<div class="bg-blue text-white p-4">
    This is a blue box with white text and padding.
</div>
```

