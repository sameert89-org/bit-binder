#### Declaring Arrays and Accessing Items
```js
const myArray = ['Item', 2, 4.0]
const myOtherArray = new Array('Item', 2, 4.0)
console.log(myArray[50]); // undefined
//  Making an array of 100 items
const array = new Array(100).fill(0); // undefined if fill not used

```

**Array.from method**
The `Array.from()` method in JavaScript creates a new array instance from an iterable object (like an array, string, or other iterable objects) or an array-like object (an object with a `length` property and indexed elements). It allows you to map, filter, or perform other operations on the elements while creating the new array.
Syntax:
```js
Array.from(iterable[, mapFn[, thisArg]])
```
- `iterable`: This is the source from which you want to create a new array. It can be an array, a string, or any other iterable object.
    
- `mapFn` (Optional): A function that is called for each element in the `iterable`, and its return value is included in the new array. It is an optional parameter. If not provided, the new array will have the same elements as the `iterable`.
    
- `thisArg` (Optional): An optional value that is used as the `this` value when executing the `mapFn` function.

```JS
const obj = {
  length: 3,
  getValue: function(index) {
    return this.values[index];
  },
  values: [10, 20, 30]
};

const newArray = Array.from(obj, function(item, index) {
  return this.getValue(index);
}, obj);

// newArray is [10, 20, 30], using obj as the thisArg

```
#### Adding Items
```js
myArray.push('NaN pierce');
myArray.unshift("inserts at beginning")
```

#### Removing items
```js
myArray.pop(); // Last element popped
```
#### Spread Operator
```js
const myArray = [1,2,4]
const secondArray = [...myArray, 4,6,7]
console.log(secondArray);  // 1,2,4,4,6,7
```

#wierd-js 
Here is another quirk for ya: arrays can be used a dictionaries or objects because of their underlying implementation. You can assign a large value to the array out of scope, it will fill the middle part with undefined and assign the index with the value.
```js
const myArray = []
myArray[50] ="sameer";
console.log(myArray.length) // 51
myArray["sameer"] = 6  // This is fine too
console.log(myArray["sameer"])
```

#### Array Methods
Oh boy there are 40+ methods and each revision adds more.
[Array Methods](https://www.w3schools.com/jsref/jsref_obj_array.asp)

Pay special attention to map, filter and reduce. 
#### Array Destructuring
Refer [[Destructuring]]