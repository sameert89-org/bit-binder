Destructuring in JavaScript is a feature that allows you to extract values from arrays and objects and assign them to variables in a concise and expressive way. It simplifies the process of extracting data from complex data structures, making your code cleaner and more readable.

```js
const numbers = [1, 2, 3];
const [a, b, c] = numbers;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

const [a, , c] = numbers;  //This skips b

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};

const { firstName, lastName, age } = person;

console.log(firstName); // "John"
console.log(lastName); // "Doe"
console.log(age);      // 30

// Can also rename the variables

const { firstName: first, lastName: last } = person; console.log(first); // "John" console.log(last); // "Doe"

// While destructuring nested objects you must provide the names

const employees = [
  {
    id: 1,
    name: {
      first: "John",
      last: "Doe"
    },
    position: "Software Engineer",
    department: "Engineering"
  },
  {
    id: 2,
    name: {
      first: "Jane",
      last: "Smith"
    },
    position: "Product Manager",
    department: "Product"
  },
  // ... more employee objects
];
const res = Array.from(employees, function (item) {
  const {
    name: { first, last }, // The inner ones (ones actually getting broken) dont need the names, but everything before them must be named 
    department,
  } = item;
  return {
    fullName: first + last,
    department: department,
  };
});
```