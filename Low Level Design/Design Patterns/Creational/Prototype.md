> An object that supports cloning is called a *prototype*.

**Why do I need a prototype?**
To clone objects, cloning from outside is tough, if you clone from outside you cannot clone the private fields and then whoever makes this clone has the dependency on that class which its cloning you need to know the anatomy of that class.
Prototype pattern delegates the *cloning* process to the objects themselves.

**How do I implement a prototype?**

Minecraft slime, splits every time its hit into two smaller halves.

```csharp
public class Slime(int size, int hp) {
	public Slime? Hit() {
		if(size == 1){
			hp = 0;
			return null; // can't split further
		}

		size /= 2; 
		hp /= 2;

		return new Slime(size, hp);
	}
}
```

