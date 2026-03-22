**Interface segregation principle**

**Clients should not be forced to depend on methods they do not use.**

Means DO NOT MAKE FAT INTERFACES 

If an interface expects too much of the clients then they will be implementing un-necessary functionality for no reason.

```csharp
public interface ISmartDevice {
    void TogglePower();
    void SetBrightness(int level);
    void AdjustTemperature(double celsius); // Irrelevant for bulbs
    void DetectMotion();                   // Irrelevant for thermostats
    void StreamVideo();                    // Irrelevant for most devices
}

public class BasicSmartBulb : ISmartDevice {
    public void TogglePower() => Console.WriteLine("Light toggled.");
    public void SetBrightness(int level) => Console.WriteLine($"Brightness at {level}%.");

    // Forced to implement methods it can't use
    public void AdjustTemperature(double c) => throw new NotImplementedException();
    public void DetectMotion() => throw new NotImplementedException();
    public void StreamVideo() => throw new NotImplementedException();
}
```

The solution

```cpp
public interface IPowerable {
    void TogglePower();
}

public interface ILightable {
    void SetBrightness(int level);
}

public interface IThermalControl {
    void AdjustTemperature(double celsius);
}

public interface IMotionSensor {
    void DetectMotion();
}
```

The `smart_bulb` only needs to implement `IPowerable` & `ILightable` .