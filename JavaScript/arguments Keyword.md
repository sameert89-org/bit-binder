Regular functions also get an additional keyword apart from this. It stores all the arguments passed to the function.

```javascript
function myFunc(a, b) {
	console.log(arguments);
	// body
}
myFunc(12,13,14,15);
// even though we have only a and b named but the rest will also be stored
```

