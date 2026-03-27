> A decorator is a pattern that allows you to add behaviors to objects dynamically.

### Why do I need a Decorator?
The subclass explosion is the main reason for having this pattern, sometimes you have a base functionality in a class and need to add a functionality to this class, the easiest thing to do is *inheritance*. But this is where the problem lies in. Imagine having the following set of classes:

```cpp
class Building {
public
	public void openDoor() {
	}
};

class BuildingWithSecurityGuard : public class Building {
	public void securityCheck() {
		// security Check
		this.openDoor();
	}
};

class BuildingWithSecurityGuardAndIdScanner : public class BuildingWithSecurityGuard {
	public void idScan() {
		// id scan
		this.securityCheck();
		this.openDoor();	
	}
}
```

See the problem? We need to add functionality but we are having a multitude of classes. 

> [!Question] How is Decorator different from Builder?
> On the first glace it seems like Decorator is just like [[Builder]], since its adding functionality to an object. That is true but the main difference here is that decorator is meant to be dynamic i.e. it adds functionality to existing object, whereas builder is supposed to only work during the object creation. Take the pizza for example, once the pizza is baked there is no way for adding functionality to it, hence builder sits right in that case, but if you want to do it at any time, a decorator is best suited. Moreover Decorator is somewhat like an onion 🧅, once a layer is wrapped there is no easy way to unwrap, the object identity is considered lost.


