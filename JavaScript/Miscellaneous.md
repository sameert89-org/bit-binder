# Prompt Function
This can be used for inputs in the browser, by default the input is a string.
```js
const val = prompt("Please enter the value..");
```
# Formatting in Console
There are other functions than console.log
```js
console.warn("This will display like a warning")
console.error("This will display as an error but does not interrupt the program")
```

# Infinity in JS
often times you need to use INT_MAX or float('inf') in your problems, below is the Js way of doing it
```js
var myNumber = Infinity;
var mySmallestNumber = -Infinity;
var dontUseThis = Number.MAX_VALUE;
var dontUseThis2 = Number.MIN_VALUE; // Small and error prone due to possible overflow
console.log(Infinity-Infinity);  //NaN
console.log(Infinity *5, Infinity + 44); // Infinity Infinity
```

# Enhanced Object Literals
Some handy features to make writing objects easier and concise.

```js
const custRelations = [1123214,21312412,2132132,2132123, 3243423,567566765,564645657,67565767567,6547457576,657567567,345345345];


const customer = {
	custID: 1123234,
	custName: "Sameer Joseph",
	custRelations: custRelations, // See this is repetitive, we can directly substitute custReations as a field in this object
	custRelations,
	//....
	withdraw: function(){
	} // this does not look good instead you can do
	withdraw() {
	},
	// object key names can be evaluatble expressions now aka dynamicKeys
	[2 + 2]: "Something",
}
```