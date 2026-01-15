```js
const myString = "This absolutely sucks";

myString.indexOf("a"); // Returns the first appearance index
myString.lastIndexOf("s"); // Returns the last appearance index


myString.slice(firstIndex, lastIndex); // Returns a new string since primitive types are immutable
// Negative indices also work like in python, lastIndex can be skipped but not the first one


myString.toLowerCase();
myString.toUpperCase();

myString.trim(); // Removes white spaces from the beginning and the end of the string, there are trimStart and trimEnd as well. 

myString.replace("old substring", "new substring"); // only replaces the first occurence, use replaceAll to replace all occurences, regex matching is supported

myString.includes(substring);
myString.startsWith(substring);
myString.endsWith(substring);

myArray.join(separator); // joins everything into one string with separator between adjacent words.
myString.split(separator); // separator need not be a string, js will convert it automatically 

myString.padStart(desiredLength, padSubstring);
myString.padEnd(desiredLength, padSubstring);

myString.repeat(numberOfTimes); // Repeats the string without separators
```