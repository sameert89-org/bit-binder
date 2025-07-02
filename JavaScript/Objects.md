```js
const customerData = {
	name: "Jon Doe",
	age: 57,
	balance: 10000,
	logHistory: ['22/10/23', '22/11/23'],
	getInfo: function(){
		console.log(this.name, this.age, this.balance) // Inside member methods this refers to the parent object
	}
}
customerData.getInfo()  // logs as expected
```

**Spread operator also works** All the key value pairs are spread inside the other object.

#### Accessing object members

```js
customerData.balance;
customerData[balance];
// why even use the square bracket syntax. It allows us to have any expression for accessing things
customerData[something]; // undefined
```


You can add more properties on the fly, therefore they cane be used as maps

```js
customerData[ID] = 257;
console.log(ID in customerData);
```

They are very very very similar to python dictionaries. Keys however can only be of string or symbol type, if you use something else it will try to create a string representation of it.

#### Accessing the keys
Like python there are methods to iterate over keys and values
```js
Object.keys(myObject);  // This returns an array of keys
```

#### Object Destructuring
Refer [[Destructuring]]

