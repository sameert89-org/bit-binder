> **You should be able to substitute child classes for parent classes without affecting functionality.**

For example, an ostrich is a bird, but it cannot fly. If a `Bird` interface has a `fly()` method and `Ostrich` implements it only to do nothing or throw an exception, the design violates LSP.

A better model uses a separate `Flyer` interface. A pigeon implements both `Flyer` and `Bird`, while an ostrich implements only `Bird`.

Supporting LSP in this example also uses [[ISP]].

## Example: Model runner

Assume a model runner has access to a global model registry. It can sync data from the registry to update its model context.

```cpp
#include <format>
#include <stdexcept>
#include <string>
#include <vector>

class ModelRunner {
protected:
	std::vector<std::string> modelContext;
public:
	~ModelRunner() = default;
	virtual void syncModelContextFromRegistry() = 0;
	virtual std::string runInference(std::string &userMessage) = 0;
};

class CloudRunner : private ModelRunner {
public:
	void syncModelContextFromRegistry() override {
		std::string receivedData = "new_data";
		int dataPoints = 500; // Received from the sync call
		this->modelContext.resize(dataPoints);
		this->modelContext.push_back(receivedData);
	};
	std::string runInference(std::string &userMessage) override {
		return "I cannot assist with that!";
	}
};
```

A new requirement comes from the US government to deploy AI models for military use. These processors must be air-gapped, and the hardware must be deployed in their facility.

```cpp
class NetworkException : std::runtime_error {
public:
	explicit NetworkException(const std::string &message)
		: std::runtime_error(format("A network error occurred with the following message: {}", message)) {}
};

class SecureEdgeRunner : private ModelRunner {
public:
	void syncModelContextFromRegistry() override {
		// cannot make a network call
		throw NetworkException("Destination Unreachable");
	}

	std::string runInference(std::string &userMessage) override {
		// do something on local hardware
		return "I cannot assist with that!";
	}
};
```

You now have to account for the exception at runtime. This child does not obey the contract, likely because the contract is too restrictive.

Instead, we could create two different base classes: `Syncable` and `ModelRunner`.

```cpp
#include <format>
#include <stdexcept>
#include <string>
#include <vector>
#include <memory>

// The base "Concept" - represents any object that can run inference
class ModelRunner {
public:
    virtual ~ModelRunner() = default;
    virtual std::string runInference(const std::string &userMessage) = 0;
};

// A specialized capability for runners that can talk to a registry
class Syncable {
public:
    virtual ~Syncable() = default;
    virtual void syncFromRegistry() = 0;
};

// Shared logic for runners that need to store state
class BaseRunner : public ModelRunner {
protected:
    std::vector<std::string> modelContext;
};

// Cloud implementation: It "is-a" Runner and "is" Syncable
class CloudRunner : public BaseRunner, public Syncable {
public:
    void syncFromRegistry() override {
        std::string receivedData = "new_data";
        // .assign() replaces the contents, avoiding the resize + push_back bug
        this->modelContext.assign(500, receivedData);
    }

    std::string runInference(const std::string &userMessage) override {
        return std::format("Cloud processing: {}", userMessage);
    }
};

// SecureEdge implementation: It "is-a" Runner only
class SecureEdgeRunner : public BaseRunner {
public:
    std::string runInference(const std::string &userMessage) override {
        return std::format("Local edge processing: {}", userMessage);
    }
};
```
