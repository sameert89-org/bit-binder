> A design pattern that guarantees a class has only one interface and provides a global access point to it.

**Why do I need singleton?** 

1. Controlled access to a shared resource. (Db Connection, logger, file handles, print spooler)
2. Share a global state across the application (Authentication status, dark mode)

**How to implement a singleton?**

```cpp
// Meyer's singleton (thread safe)
class Logger {
private:
	Logger() {} // make the default constructor private
	Logger(const Logger&) = delete; // delete the copy constructor
	Logger& operator=(const Logger&) = delete; // delete the assignment operator
	
public:
	static Logger& getInstance() {
		static Logger instance;
		return instance;
	}
}
```

```csharp
public sealed class Logger {
	private static readonly Lazy<Logger> _instance => Lazy<Instance>(() => new Logger());
	
	public static Logger Instance => _instance.Value;
	
	private Logger() { } // make the constructor private
}
```

**Eager initialization**: Instead of Lazy initialization (instance created when `getInstance` is called first time)

```cpp
class EagerLogger {
private:
	EagerLogger() {} // make the default constructor private
	EagerLogger(const EagerLogger&) = delete; // delete the copy constructor
	EagerLogger& operator=(const EagerLogger&) = delete; // delete the assignment operator
	static EagerLogger instance;
	
public:
	static EagerLogger& getInstance() {
		return instance;
	}
};
```

```csharp
public sealed class EagerLogger {
	private static readonly EagerLogger _instance = new();
	private EagerLogger() {}
	public static Instance => _instance;
}
```