These patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

Ranking from most used to least used:

1. [[Singleton]] - **Universal:** Managed by dependency injection frameworks such as Spring and NestJS for shared services like database pools or loggers.
2. [[Factory]] - **Very high:** Decouples object creation in logging libraries, API clients, and collections such as `List.of()`.
3. [[Builder]] - **High:** Creates complex, immutable configuration objects and data records in modern "state is evil" architectures.
4. [[Abstract Factory]] - **Medium:** Provides families of related objects for multi-cloud SDKs, such as AWS versus Azure, or cross-platform UI themes.
5. [[Prototype]] - **Very low:** Efficiently clones objects in performance-critical systems such as game engines or through JavaScript spread operators.
