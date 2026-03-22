**Law of Demeter** : Only talk to your immediate friends.

The rule is straightforward. A method `M` on an object `O` should only call methods on:
1. **Itself** (the object `O`)
2. **Its own fields** (objects that `O` holds as instance variables like DI)
3. **Its method parameters** (objects passed into `M`)
4. **Objects it creates** (objects instantiated within `M`)

 **don't reach through one object to get to another.**

If you inject `IMyService` into your class:
- **Allowed:** `_myService.DoWork()` (Talking to a direct friend).
- **Violation:** `_myService.Configuration.DatabaseSettings.ConnectionString`