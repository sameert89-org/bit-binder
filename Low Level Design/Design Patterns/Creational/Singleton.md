> Singleton guarantees that a class has only one instance and provides a global access point to it.

## Why do I need a singleton?

1. Control access to a shared resource, such as a database connection, logger, file handle, or print spooler.
2. Share global state across the application, such as authentication status or dark mode.

## How do I implement a singleton?

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

## Eager initialization

With eager initialization, the instance is created immediately instead of when `getInstance` is first called.

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
