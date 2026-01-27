## Sets
```js
const mySet = new Set([/*iterable of elements can be of mixed Data Type*/])
```
### Methods
```js
mySet.has()
mySet.add()
mySet.delete()
mySet.size();
```

A simple for of loop can be used to iterate over the set.

## Maps
```js
const myMap = new Map(/* Takes an array of arrays or another map*/);
```

### Methods
```js
myMap.set(key, value); // returns the updated map so multiple sets can be chained
myMap.get(key);
myMap.has(key);
myMap.delete(key);
myMap.size();
myMap.delete(key);
```

### Iteration
```js
for(const [k, v] of myMap){

}
```

==Notes on Maps== 
- Maps outperform traditional object in repeated insertions and deletions. 
- Cannot have functions as values.
- They maintain the order of insertion and iteration follows this order. 