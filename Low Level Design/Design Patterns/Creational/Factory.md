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
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface INotifier {
    Task Notify();
}

public class EmailNotifier(Dictionary<string, string> attributes) : INotifier {
    public async Task Notify() {
        // Implementation here
        await Task.CompletedTask;
    }
}

public class SmsNotifier(Dictionary<string, string> attributes) : INotifier {
    public async Task Notify() {
        // Implementation here
        await Task.CompletedTask;
    }
}

public class NotifierFactory {
    private readonly Dictionary<string, Func<Dictionary<string, string>, INotifier>> _notifierRegistry;

    public NotifierFactory() {
        _notifierRegistry = new Dictionary<string, Func<Dictionary<string, string>, INotifier>> {
            {"email", (attributes) => new EmailNotifier(attributes)},
            {"sms", (attributes) => new SmsNotifier(attributes)}
        };
    }

    public INotifier CreateNotifier(string identifier, Dictionary<string, string> attributes) {
        if (_notifierRegistry.TryGetValue(identifier, out var creator)) {
            return creator(attributes);
        }
        throw new ArgumentException($"Notifier type '{identifier}' not registered.");
    }

    public void RegisterNotifier(string identifier, Type type) {
        _notifierRegistry.Add(identifier, (attributes) => {
            return (INotifier)Activator.CreateInstance(type, attributes)!;
        });
    }
}
```