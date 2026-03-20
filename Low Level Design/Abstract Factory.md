> Abstract factory is a *system of factories*, it allows creation of creating families of related objects without having to specify their concrete classes.

**Why do I need Abstract Factory?**
Similar to [[Factory]] to avoid code duplication and having an easy way to create nested families of objects.

**How do I implement an Abstract Factory?**

Follow the 3 steps:
1. Find the interfaces for the families of classes i.e. group your classes together based on the contract that they follow.
2. Create the abstract factory

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
    public ILlm CreateLlm() => new ClaudeLlm();
    public IDiffusionModel CreateImageGenerator() => new SdxlImageGenerator();
}
```

