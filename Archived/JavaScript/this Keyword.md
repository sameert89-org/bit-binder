  In JavaScript, the `this` keyword is a special variable that is implicitly defined in every function. It refers to the object on which the function is currently being called or the object that is currently being referred to.

## Global Context
In the global context, this refers to the global object, for browsers it is the `window` object.

```javascript
console.log(this); // This refers to the window object
```

## Function Context
- If the function is a method of an object then this binds to that object.
  ```javascript
const myObject = {
	myfunc: function(x) {
		console.log(this); // This binds to the myObject
		return x + 5;
	};
}
myObject.myfunct(7);
```
- If the function is a constructor and is being used to create a new instance of a class then this binds to the newly created instance.
- If the function is an event handler then this binds to the element in the DOM that triggered the event.
- Arrow functions do not have a this binding, they inherit it from an enclosing scope. 
```javascript
const myObject = {
	myfunc: (x) => {
		console.log(this); // This binds to the parent this, global object in this case
		return x + 5;
	};
}
myObject.myfunct(7);
```
- If it is none of the above and just a regular function call then this is undefined. 