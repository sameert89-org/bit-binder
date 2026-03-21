> Abstract factory is a *system of factories*, it allows creation of creating families of related objects without having to specify their concrete classes.

**Why do I need Abstract Factory?**
Similar to [[Factory]] to avoid code duplication and having an easy way to create nested families of objects.

**How do I implement an Abstract Factory?**

Follow the 3 steps:
1. Group your classes into kinds of products, for example Buttons and Textboxes
2. Create the abstract factory, this has methods for returning the kinds of products identified in 1.
3. Now if something wants to provide both buttons and textboxes (say a theme) then it is a concrete implementation for the abstract factory.

```csharp
// 1. Abstract Products
public interface ILlm { void Chat(); }
public interface IDiffusionModel { void GenerateImage(); }

// 2. The Abstract Factory
// It defines a "Kit" or "Suite" of related objects.
public interface IAiSuiteFactory
{
    ILlm CreateLlm();
    IDiffusionModel CreateImageGenerator();
}

// 3. Concrete Factory A: OpenAI Suite
public class OpenAiSuite : IAiSuiteFactory
{
    public ILlm CreateLlm() => new ChatGptLlm();
    public IDiffusionModel CreateImageGenerator() => new DallEImageGenerator();
}

// 4. Concrete Factory B: OpenSource/Anthropic Suite
public class AlternativeSuite : IAiSuiteFactory
{
    public ILlm CreateLlm() => new ClaudeLlm(); // this can be a simple factory depending on the number of members in this family
    public IDiffusionModel CreateImageGenerator() => new SdxlImageGenerator();
}
```

```cpp
include <iostream>
#include <memory>
#include <string>

// --- 1. Abstract Products ---
// These define what a "Storage" and "Queue" look like, regardless of provider.

class IStorage {
public:
    virtual ~IStorage() = default;
    virtual void UploadFile(std::string name) = 0;
};

class IQueue {
public:
    virtual ~IQueue() = default;
    virtual void SendMessage(std::string msg) = 0;
};

// --- 2. Concrete Products (AWS) ---

class S3Storage : public IStorage {
public:
    void UploadFile(std::string name) override {
        std::cout << "AWS: Uploading " << name << " to S3 Bucket.\n";
    }
};

class SqsQueue : public IQueue {
public:
    void SendMessage(std::string msg) override {
        std::cout << "AWS: Sending '" << msg << "' to SQS Queue.\n";
    }
};

// --- 3. Concrete Products (Azure) ---

class BlobStorage : public IStorage {
public:
    void UploadFile(std::string name) override {
        std::cout << "Azure: Uploading " << name << " to Blob Storage.\n";
    }
};

class ServiceBusQueue : public IQueue {
public:
    void SendMessage(std::string msg) override {
        std::cout << "Azure: Sending '" << msg << "' to Service Bus.\n";
    }
};

// --- 4. The Abstract Factory ---
// This is the "Contract" that every provider must fulfill.

class ICloudProviderFactory {
public:
    virtual ~ICloudProviderFactory() = default;
    virtual std::unique_ptr<IStorage> CreateStorage() = 0;
    virtual std::unique_ptr<IQueue> CreateQueue() = 0;
};

// --- 5. Concrete Factories ---

class AwsFactory : public ICloudProviderFactory {
public:
    std::unique_ptr<IStorage> CreateStorage() override { return std::make_unique<S3Storage>(); }
    std::unique_ptr<IQueue> CreateQueue() override { return std::make_unique<SqsQueue>(); }
};

class AzureFactory : public ICloudProviderFactory {
public:
    std::unique_ptr<IStorage> CreateStorage() override { return std::make_unique<BlobStorage>(); }
    std::unique_ptr<IQueue> CreateQueue() override { return std::make_unique<ServiceBusQueue>(); }
};
```