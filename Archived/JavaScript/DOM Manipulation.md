DOM stands for Document Object Model. It is a programming interface for web documents, primarily used to manipulate the content and structure of web pages. The DOM represents the web page as a tree-like structure where each element in the page, such as paragraphs, headings, images, and links, is represented as a node in the tree.

![[Pasted image 20230907140209.png|500]]

**Document object is itself a part of the window object.**
Nodes in the DOM are either parents, children or siblings(same parent) of other nodes.
## Selecting Elements
There are 5 major ways to select the elements from the DOM.
```js
const myElement = document.getElementById('someID'); // This returns 1 element since ID is unique


cost myElement = document.getElementByClassName('my-class'); // This returns an array of all elements which have the class MyClass

const myElement = document.getElementsByTagName('div'); // Array of all divs

const myElement = document.querySelector('.some-class or #some-id or sometag'); // returns the first element which matches

const myElement = document.querySelectorAll('.some-class or #some-id or sometag')  // returns an array of elements
```

==Note: The above methods do not exactly return an array, they return a NodeList. It does not have all array functions and its type is object.== 
```js
const nodeList = document.querySelectorAll(".my-class"); console.log(typeof nodeList); // Outputs: "object"
```

**query selectors work on CSS selectors**

<iframe src="https://www.w3schools.com/cssref/css_selectors.php" width = 600, height = 400 sandbox=""></iframe>

## Changing Styles

```js
const myElement = document.querySelector("#main-text");
myElement.style.anyCssStyleInCamelCase = "value";  // This is inline style under the hood
```

You need to loop through the NodeList of items if you want to apply the style to multiple items, but there is a better way using [[#Class Manipulation]].

## Creating and Adding Elements

1. **createElement() Method:** You can use the `document.createElement()` method to create a new HTML element. Once you've created the element, you can modify its properties and attributes, and then add it to the DOM.
    
```js
// Create a new <div> element
const newDiv = document.createElement('div');

// Set properties and attributes
newDiv.textContent = 'Hello, World!';
newDiv.className = 'my-class';

// Add it to the DOM
document.body.appendChild(newDiv);
```
    
2. **innerHTML Property:** You can use the `innerHTML` property of an existing element to set or append HTML content to it.
    
  ```js
const container = document.getElementById('container');
container.innerHTML = '<p>Hello, World!</p>'; // Replaces existing content

// Append content
container.innerHTML += '<p>Additional content</p>';
```
    
3. **insertAdjacentHTML() Method:** The `insertAdjacentHTML()` method allows you to insert HTML content at a specified position relative to an element.
    
```js
const container = document.getElementById('container');

// Insert content before the element
container.insertAdjacentHTML('beforebegin', '<div>Hello, World!</div>');

// Insert content after the element
container.insertAdjacentHTML('afterend', '<div>Additional content</div>');
// There are also after begin, before begin, before end and after end. 

```
    
4. **appendChild() Method:** You can use the `appendChild()` method to add a child element to an existing element.
    
    ```js
// Create a new <div> element
const newDiv = document.createElement('div');

// Set properties and attributes
newDiv.textContent = 'Hello, World!';
newDiv.className = 'my-class';

// Add it to the DOM
document.body.appendChild(newDiv);

```
5. **insertBefore() Method:** The `insertBefore()` method allows you to insert an element before a specified reference element.
    
```js
const parentElement = document.getElementById('parent');
const childElement = document.createElement('div');
const referenceElement = document.getElementById('reference');

parentElement.insertBefore(childElement, referenceElement);
```
    
6. **Document Fragments:** Document fragments are lightweight containers that allow you to create and manipulate elements offscreen before appending them to the DOM. This can improve performance when adding multiple elements.
    
```js
const fragment = document.createDocumentFragment();
const element1 = document.createElement('div');
const element2 = document.createElement('div');

fragment.appendChild(element1);
fragment.appendChild(element2);

// Append the fragment to the DOM
const container = document.getElementById('container');
container.appendChild(fragment);

```
    
7. **Template Literals:** You can use template literals to create and insert HTML content into the DOM. This is a concise way to create elements with dynamic content.
 ```js
const name = 'John';
const greeting = `<p>Hello, ${name}!</p>`;
document.body.innerHTML = greeting;
```

8. **Append Method** Append method works similar to appendChild but it can take in multiple elements and append then sequentially it creates a document fragment behind the scenes.
```js
parentElement.append(child1, child2, textNode1, textNode2);
```

9. **replace Child** You can create a new node and replace a child with it
```js
cloneNode()
cloneNode(deep)
// deep specifies whether to clone the entire subtree as well true or false
// by default it does not copy event listeners added using element.onClick = myFunction. or using addEventListeners
parent.replaceChild(elementWhichReplaces, elementToBeReplaced);
```
## Modifying Tags
You can change everything, the text the style the html.
```js
const myEle = document.querySelector("#main-content");
myEle.innerHTML = "<p> test </p>";
myEle.innerText = "can only be used to set text, everything inside will be overwritten by text"
myElem.textContent = "This also shows hidden text which has display none or comments etc. things that are not visible to the user"
```

Note: `innerHTML` is a security problem if you are taking user inputs as it may allow them to execute code.

## Modifying Attributes and Classes

Attributes are the properties available to HTML tags like input name, placeholder, a href, id class etc.

```js
element.setAttribute("attributename", "attribute-value");
element.removeAttribute("attributename");
element.getAttribute("attributename"); // Returns the attribute value of the attribute

// Working with classes
element.classList.add("class-name", "class-name2"); // these classes are defined in your style tag or the css file
element.classList.remove("class-name", "class-name2");

element.classList.contains("class-name");
```

# Removing elements

```js
element.remove(); // Removes the element from the DOM
```

# DOM Traversal

**Every** child node is a js object and has a property called parentNode. Similarly a parent has a nodelist of its children

```js
// Accessing parents
const parent = child.parentNode;
// or
const parent = child.parentElement;

const grandParent = child.parentNode.parentNode;

// Accessing children (You wish)
const children = parent.childNodes; // returns a NodeList
parent.lastChild;
parent.firstChild;

const childrenElements = parent.children;
parent.lastChildElement;
parent.firstChildElement;

// Accessing siblings

element.previousSibling;
element.nextSibling;
element.previousElementSibling;
element.nextElementSibling;

```

**Difference between the `parentNode `and `parentElement`**
parentNode grabs any node where as parentElement is specific to HTML nodes, for example the parentNode of `<html>` tag is #document but the parentElement is null. Node is a javascript object with bunch of properties and functions that you can call. Element is just an HTML element.

# Event Listeners
  
Event listeners are functions or procedures in a computer program that wait for a specific event to occur and then respond to it in some predetermined way.

## Adding event listeners

### The HTML way
There are built in events in HTML that event listeners can listen to. You can directly include some JS in the html even attributes of some elements like button `onclick`

[HTML Event Attributes (w3schools.com)](https://www.w3schools.com/tags/ref_eventattributes.asp)

```html
<button id = 'explore' type = "button" onclick = "someJScode()"> Click Me! </button>
<!-- OR -->
```

HTML shit is simple the onclick handler accepts some JavaScript code that it will run. You have to give full js code though.

### The JS way

The JS way overrides the one set using onclick attribute;

```js
element.addEventListener('eventname', referenceToFunction, captureBoolean); // again something Callable
element.removeEventListener('eventname', referenceToFunction);
```

### The React Way

React can be confusing the onClick prop of button expects a reference to a function that it can put () at the end of and execute

```jsx
import React from 'react';

function myComponent {
	const referenceToFunction = function(e){
		// something
	}
	// Assume myFunction and someOtherValue are defined here
	return (`<div>
	<button onClick = {(e, someOtherValue) => {someOtherValue += 2;
	return myFunction(e, someOtherValue, somethingElse);
	}}>Click me </button>
	<button onClick = {referenceToFunction}/> Click me 2 </button>
	</div>`);
}

```

The second fat arrow way essentially returns an unnamed function body which can be called by the browser.

**Do not pass js code to the onClick handler because it will execute it, myFunction() should not be used as this will just be called during run time and not when button is clicked. If you are passing a function however make sure it returns a reference to a function so that it can be called.**

<mark style="background: #FF5582A6;">Note: details about the event in certain events are present as keys in the event object, for example key in keydown event etc. </mark>
# Event propagation in JS
This refers to how events travel through the DOM tree. 

There are 2 types, **Bubbling & Capturing**

- Bubbling travels from root to target node, and capturing is reverse of it.

For example there is a button inside a container

```js
<div class = "container" onclick = 'functionA()'><button onclick="functionB"></button></div>

// when you click the button, both functionA and functionB are going to run

// you can avoid this by stopping the propagation (bubbling here)
const functionB = (event)=>{
// do something
event.stopPropagation();
}

// There is also a stopImmediatePropagation(), this prevents other event listeners on the same element whereas the earlier one will prevent all the ones above in the hierarchy
```

# Event Delegation
Add an event listener to an element which will be auto added to all its current and future descendants.

