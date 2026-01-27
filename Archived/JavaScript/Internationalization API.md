 JavaScript has an internationalization API
 
 ```js
const number = 123456.789;
const formattedNumber = new Intl.NumberFormat('en-US').format(number);
console.log(formattedNumber); // Output: 123,456.789

const date = new Date();
const formattedDate = new Intl.DateTimeFormat('en-US').format(date);
console.log(formattedDate); // Output: 1/11/2024

const strings = ['apple', 'Orange', 'banana'];
const sortedStrings = strings.sort(new Intl.Collator('en-US').compare);
console.log(sortedStrings); // Output: [ 'banana', 'Orange', 'apple' ]

const amount = 1234.56;
const formattedCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(amount);
console.log(formattedCurrency); // Output: $1,234.56

const count = 3;
const message = new Intl.PluralRules('en-US').select(count);
console.log(message); // Output: other

```

[PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)