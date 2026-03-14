**Liskov Substitution Principle**

>"You should be able to *substitute* child classes in place of parent classes without affecting functionality"

Example: An ostrich is a bird, but it cannot fly, if the bird interface has a `fly()` method and ostrich implements bird just to do nothing or throws in the fly function, you have violated LSP.

A better way of modelling this problem would be using the Flyer class, A pigeon implements both Flyer and Bird but the ostrich only implements Bird.

to support LSP we just used [[ISP}]]

## Example: Model Runner

Assume you have a model runner, a model runner has access to global model registry. It can sync data from model registry to update the model context.

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

A new requirement came from US govt. to deploy the AI models for military use, these processors must be air gapped and the hardware must be deployed in their facility.

```cpp
class NetworkException : std::runtime_error {
public:
	explicit NetworkException(const std::string &message)
		: std::runtime_error(format("A network error occured with the following message: {}", message)) {}
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

Now you try to run this and you have to account for the exception at runtime. This child does not obey the contract, likely because contract is too binding.

Instead of this we could make 2 different base classes, `ISyncable` and `IModelRunner`

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