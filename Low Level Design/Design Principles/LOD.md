> **Law of Demeter:** Only talk to your immediate friends.

The rule is straightforward. A method `M` on an object `O` should only call methods on:

1. **Itself:** The object `O`
2. **Its own fields:** Objects that `O` holds as instance variables, such as injected dependencies
3. **Its method parameters:** Objects passed into `M`
4. **Objects it creates:** Objects instantiated within `M`

**Do not reach through one object to get to another.**

If you inject `IMyService` into your class:
- **Allowed:** `_myService.DoWork()` (talking to a direct friend)
- **Violation:** `_myService.Configuration.DatabaseSettings.ConnectionString`
