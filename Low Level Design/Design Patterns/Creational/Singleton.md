A design pattern that guarantees a class has only one interface and provides a global access point to it.

Why do I need singleton?

1. Controlled access to a shared resource. (Db Connection, logger, file handles, print spooler)
2. Share a global state across the application (Authentication status, dark mode)

How to implement a singleton?

```cpp
// Meyer's singleton
class Logger {
public:
	Logger(Logger &original) = delete; // delete the copy cons
	Operator
}
```