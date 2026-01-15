These are asynchronous features that enable use to delay or repeat an action based on time intervals.

```js
const myFunction = () => {
	console.log("My Action was Delayed");
}
const args = []
const delayedAction = setTimeout(myFunction, 3000, ...args); //WARN: Delay is passed in ms

const cancelAction = false;

if (cancelAction){
	clearTimeout(delayedAction);
}
// setInterval infinitely repeats an action in defined intervals until cancelled

let repetitionNumber = 0;
const repeatAction = setInterval(() => {
	repetitionNumber++;
	console.log(`This has repeated ${repetitionNumber} times`);
}, 3000);
```