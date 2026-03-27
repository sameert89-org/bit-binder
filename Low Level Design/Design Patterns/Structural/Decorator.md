> A decorator is a pattern that allows you to add behaviors to objects dynamically.

### Why do I need a Decorator?
The subclass explosion is the main reason for having this pattern, sometimes you have a base functionality in a class and need to add a functionality to this class, the easiest thing to do is *inheritance*. But this is where the problem lies in. Imagine having the following set of classes:
```cpp
class Pizza {
	
}

class PizzaWithPepperoni
```