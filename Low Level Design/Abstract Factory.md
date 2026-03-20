> Abstract factory is a *system of factories*, it allows creation of creating families of related objects without having to specify their concrete classes.

**Why do I need Abstract Factory?**
Similar to [[Factory]] to avoid code duplication and having an easy way to create nested families of objects.

**How do I implement an Abstract Factory?**

Follow the 3 steps:
1. Find the interfaces for the families of classes i.e. group your classes together based on the contract that they follow.
2. Create a simple factory for each of the families
3. Create an abstract factory which uses the simple factories

```csharp

```