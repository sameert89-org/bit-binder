Also known as a *virtual constructor* or *simple factory*.

> Factory creates objects through a common contract while deciding which concrete implementation to instantiate.

## Why do I need a factory?
If you have one contract and multiple implementations, and you need to use different implementations based on parameters at runtime, a factory is for you.

## Could I just use a `switch` or `if-else`?

Yes, but if you need that logic in more than one place, you will repeat it and increase the possibility of introducing bugs. Adding more implementations will also become painful.

## Who creates the objects?

Factories often rely on implementation-specific creation functions because subclasses do not necessarily share the same instantiation pattern. The factory can provide any additional details they need.

## How do I implement a factory?

```csharp
public interface INotifier {
    Task Notify();
}

// Example Implementation
public class EmailNotifier(Dictionary<string, string> attributes) : INotifier {
    public async Task Notify() => await Task.CompletedTask;
}

public class NotifierFactory {
    private readonly Dictionary<string, Func<Dictionary<string, string>, INotifier>> _notifierRegistry = new();

    public NotifierFactory() {
        RegisterNotifier("email", attrs => new EmailNotifier(attrs));
        RegisterNotifier("sms", attrs => new SmsNotifier(attrs));
    }

    public void RegisterNotifier(string identifier, Func<Dictionary<string, string>, INotifier> creator) {
        _notifierRegistry[identifier] = creator;
    }

    public INotifier CreateNotifier(string identifier, Dictionary<string, string> attributes) {
        if (_notifierRegistry.TryGetValue(identifier, out var creator)) {
            return creator(attributes);
        }
        throw new Exception($"Notifier '{identifier}' is not registered.");
    }
}
```

```cpp
#include <format>
#include <functional>
#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>
class Notifier {
public:
  virtual ~Notifier() = default;
  virtual void Notify() = 0;
};

class EmailNotifier : public Notifier {
private:
  std::unordered_map<std::string, std::string> _attrs;

public:
  EmailNotifier(std::unordered_map<std::string, std::string> attrs)
      : _attrs(attrs) {
    std::cout << "Email Notifier Initialized";
  }
  void Notify() override { std::cout << "Sending Email Notification"; }
};

class SmsNotifier : public Notifier {
private:
  std::unordered_map<std::string, std::string> _attrs;

public:
  SmsNotifier(std::unordered_map<std::string, std::string> attrs)
      : _attrs(attrs) {
    std::cout << "Sms Notifier Initialized";
  }
  void Notify() override { std::cout << "Sending Sms Notification"; }
};

using Creator = std::function<std::unique_ptr<Notifier>(
    std::unordered_map<std::string, std::string>)>;
class NotificationFactory {
private:
  std::unordered_map<std::string, Creator> _registry;

public:
  std::unique_ptr<Notifier>
  CreateNotifier(std::string identifier,
                 std::unordered_map<std::string, std::string> attributes) {
    if (_registry.contains(identifier))
      return _registry[identifier](attributes);
    std::cerr << std::format("identifier {} not registered", identifier);
    return nullptr;
  }

  void RegisterNotifier(std::string identifier, Creator creator) {
    _registry[identifier] = creator;
  }
};

int main(int argc, char **argv) {
  NotificationFactory notificationFactory;
  notificationFactory.RegisterNotifier("email", [](auto attrs) {
    return std::make_unique<EmailNotifier>(attrs);
  });
  notificationFactory.RegisterNotifier(
      "sms", [](auto attrs) { return std::make_unique<SmsNotifier>(attrs); });

  auto notifier = notificationFactory.CreateNotifier(
      "sms", std::unordered_map<std::string, std::string>({
                 {"to", "test@gmail.com"},
             }));

  notifier->Notify();

  return 0;
}
```

## Related concepts

[[Types of Polymorphism]]
