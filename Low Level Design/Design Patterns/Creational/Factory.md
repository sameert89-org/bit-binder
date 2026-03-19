aka *virtual constructor* or *simple factory*

> Factory is a pattern used to create objects of a superclass with the option to pick which subclass object should be created.

**Why do I need a factory?** 
If you have one contract and multiple implementations, and you need to use different implementations based on parameters at runtime, a factory is for you.

**Could I just use a `switch` or `if-else` ?** 

yes, you could, but if you need that in more than one place you will repeat this code over and over, with possibility of introducing bugs. And adding more implementations will be a pain.

**Who creates the objects?**

Factories often rely on implementations to do this, because its not necessary that each subclass has the same instantiation pattern, if they need additional details then those are also provided by the factory.

**How do I implement a factory?**

```csharp
public interface INotifier {
	Task Notify();
}

public class EmailNotifier : INotifier {
	Task Notify() {
		throw new NotImplementedException();
	}
}

public class SmsNotifier : INotifier {
	Task Notify() {
		throw new NotImplementedException();
	}
}

public class NotifierFactory() {
	public TA
}
```