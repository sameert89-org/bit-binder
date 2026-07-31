> A decorator is a pattern that allows you to add behaviors to objects dynamically.

## Why do I need a decorator?

Subclass explosion is the main reason for this pattern. Sometimes you have base functionality in a class and need to add more. The easiest approach is *inheritance*, but that is where the problem begins. Imagine the following set of classes:

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

See the problem? We need to add functionality, but we are creating a multitude of classes.

> [!Question] How is Decorator different from Builder?
> At first glance, Decorator looks like [[Builder]] because both add functionality to an object. The main difference is that Decorator is dynamic: it adds functionality to an existing object, while Builder works during object creation. Once a pizza is baked, there is no way to add functionality to it, so Builder fits that case. If you want to add behavior at any time, Decorator is better suited. Decorator is also somewhat like an onion 🧅: once a layer is wrapped, there is no easy way to unwrap it, and the object's identity is considered lost. If you need to add and remove behaviors dynamically, [[Strategy]] may be a better choice.

## Example: Aspect-oriented programming and metaprogramming

> **Aspect-oriented programming (AOP)** separates cross-cutting concerns into pluggable, reusable modules.

> **Metaprogramming** is the ability of a program to treat another program as input data and modify it.

AOP is generally implemented using metaprogramming. Consider the cliché cross-cutting concern of logging.

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

## Example: `rclone` layers
`rclone` is a robust Linux tool used to sync local files to virtually any cloud provider. If we look closely at its layered architecture, it is a decorator.

![[Decorator 2026-03-28 00.31.23.excalidraw|200]]
Adding each layer creates a wrapper and fundamentally changes the `read` and `write` procedures.

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Base {
private:
    string _target;
public:
    Base(string target)
        : _target(target) {}

    string readFile(string path) {
        return "Content from " + path;
    }
};

class Crypt {
private:
    Base _inner;
    string _key;
public:
    Crypt(Base inner, string key)
        : _inner(inner), _key(key) {}

    string readFile(string path) {
	    // decrypt
        return _inner.readFile(path);
    }
};

class Cache {
private:
    Crypt _inner;
    vector<string> _filePaths;
public:
    Cache(Crypt inner)
        : _inner(inner) {}

    string readFile(string path) {
	    // check cache to reduce network calls
        return _inner.readFile(path);
    }
};
```
