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
> On the first glace it seems like Decorator is just like [[Builder]], since its adding functionality to an object. That is true but the main difference here is that decorator is meant to be dynamic i.e. it adds functionality to existing object, whereas builder is supposed to only work during the object creation. Take the pizza for example, once the pizza is baked there is no way for adding functionality to it, hence builder sits right in that case, but if you want to do it at any time, a decorator is best suited. Moreover Decorator is somewhat like an onion 🧅, once a layer is wrapped there is no easy way to unwrap, the object identity is considered lost. If you need to keep adding and removing things dynamically [[Strategy]] maybe a better choice.

### Example: Aspect Oriented Programming, Metaprogramming and Decorators

> **Aspect Oriented Programming (AOP)** is a programming paradigm which allows you to separate cross cutting concerns into pluggable, reusable modules.

> **Metaprogramming** The ability of a program to treat another program as input data, do modifications on it.

AOP is generally implemented using metaprogramming! Let's take the cliché example of a cross cutting concern of logging.

```csharp
// csharp lacks native support for AOP unlike AspectJ for Java, but similar thing can be achieved using reflection + attributes, there are commercial libraries like PostSharp available for this.
// The contract
public interface IOrderService 
{
    void ProcessOrder(int orderId);
}

// The real business logic (clean, no logging)
public class OrderService : IOrderService 
{
    public void ProcessOrder(int orderId) 
    {
        // Pure business logic
        Console.WriteLine($"Processing order {orderId}");
    }
}

// The Aspect - wraps the real service
public class LoggingDecorator : IOrderService 
{
    private readonly IOrderService _inner;
    private readonly ILogger _logger;

    public LoggingDecorator(IOrderService inner, ILogger logger) 
    {
        _inner = inner;
        _logger = logger;
    }

    public void ProcessOrder(int orderId) 
    {
        _logger.LogInfo($"[ASPECT] Starting ProcessOrder with id={orderId}");
        
        try 
        {
            _inner.ProcessOrder(orderId);
            _logger.LogInfo("[ASPECT] Completed successfully");
        }
        catch (Exception ex) 
        {
            _logger.LogError($"[ASPECT] Failed: {ex.Message}");
            throw;
        }
    }
}

// Wire-up (usually in Startup.cs or DI container)
IOrderService realService = new OrderService();
IOrderService loggedService = new LoggingDecorator(realService, logger);
loggedService.ProcessOrder(123);  // Logs automatically
```

### Example: `rclone` layers
`rclone` is a robust Linux tool which is used to sync files locally to virtually any cloud provider! If we look closely at the architecture of `rclone` layers it is a decorator.

![[Decorator 2026-03-28 00.31.23.excalidraw|200]]
Adding each layer creates a wrapper and fundamentally changes the `read` and `write` procedures.

```cpp
#include <iostream>
using namespace std;
class Base {
private:
	string _target;
public:
	Base(target)
		: _target(target){}
		
	string readFile(string path) {
	
	}
};

class Crypt {
private:
	Base _inner;
	string _key;
public:
	Crypt(Base inner)
		:_inner(inner) {}
	string readFile(string key) {
		// decrypt
		return _inner.readFile();
	}
};


class Cache {
	Crypt _inner;
	
}
```