> **High-level modules should not depend on low-level modules. Both should depend on abstractions.**
>
> **Abstractions should not depend on details. Details should depend on abstractions.**

```csharp
// ❌ VIOLATION: High-level depends directly on Low-level
public class WarehouseManager {
    // Hard-coded to a specific 2024-era drone model
    private SkyeDroneV2 _drone = new SkyeDroneV2();

    public void ProcessDelivery(string packageId) {
        Console.WriteLine($"Processing {packageId}...");
        _drone.LiftOff(); // If we switch to a ground bot, this class breaks.
        _drone.FlyToCoordinates(10.5, 20.2);
    }
}
```

## Solution: Depend on interfaces

```csharp
public interface IDeliveryVehicle {
    void Deploy(double x, double y);
}
public class WarehouseManager {
    private readonly IDeliveryVehicle _vehicle;

    // Inject any vehicle that follows the contract
    public WarehouseManager(IDeliveryVehicle vehicle) {
        _vehicle = vehicle;
    }

    public void ProcessDelivery(string packageId) {
        _vehicle.Deploy(10.5, 20.2);
    }
}

public class SkyeDroneV5 : IDeliveryVehicle {
    public void Deploy(double x, double y) => Console.WriteLine("Flying to coordinates...");
}

public class StarshipGroundBot : IDeliveryVehicle {
    public void Deploy(double x, double y) => Console.WriteLine("Driving through warehouse floor...");
}
```
