- All numbers are represented internally in 64 Bit IEEE-754 floating point convention.
```js
console.log(23 === 23.0); // logs true
```
- parseInt and parseFloat can be used to parse numbers to any base from a string.
```js
Number.parseFloat("  2.5 rem "); // helps a lot with css
```
- isNaN can be used to check for NaN
```js
Number.isNaN(+"20x");
```
- isFinite can be used to check if a number is Inifinity.
- isInteger can be used to check if a number is an integer.
- As of ES2021 JS allows Numeric separators to help represent large numbers more conveniently.
```js
const x = 10_100_100;
// can also be used in decimal numbers
```
- more on bigINTs
```js
Number.MAX_SAFE_INTEGER; // This is the maximum safe integer
// Creation
const x = BigInt(333); // This tells the compiler that this number may grow to be huge
const x = 234324234234234n; // This is also a big int;
// All arithmetic operations work as expected but maybe slow
// Cannot mix BigInts with normal numbers in calculations, but comparisons can be done only greater and less than

```
## Dates and Times
There is a Date constructor in js.
```js
const now = new Date();
console.log(typeof now); // Date Object
// It can take a bunch of values();
// You can pass any date string and it will attempt to parse it
const specificDate = new Date('2022-01-01T12:00:00');

// You can get components from the date object
const date = new Date(); //NOTE: Date(0) is the beginning of UNIX time Jan 1, 1970

const year = date.getFullYear();
const month = date.getMonth(); // 0-based (0 is January)
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const milliseconds = date.getMilliseconds();

// You can set the specific components of the date object
const date = new Date();

date.setFullYear(2022);
date.setMonth(0); // 0-based (0 is January)
date.setDate(1);
date.setHours(12);
date.setMinutes(30);
date.setSeconds(45);
date.setMilliseconds(500);

//You can format date to various strings 
console.log(date.toLocaleString()); // Format based on the user's locale
console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());

// Date objects can have arithmetic performed upon them too
// This is due to JS converting the dates into timestamps in ms, after the beginning
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

console.log(today);
console.log(tomorrow);



```
