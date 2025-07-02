%%  %%[[Microservices]] design should aim for tight cohesion in the code of a service, that means all the functionality inside a service should be highly related and contribute to a single, well-defined purpose.

This core idea behind this is to allow us to reduce code changes that could span across multiple microservices.

> *"A structure is stable if cohesion is strong and coupling is low."*

### Types of Coupling

![[Pasted image 20241113110859.png#invert_B]]

### Domain Coupling
When one microservice needs to interact with another microservice to use its provided functionality. It is a type of **loose** coupling, largely unavoidable.


> [!WARNING] Contracts
> A microservice that needs to talk to lots of downstream microservices might point to a situation in which too much logic has been centralized. Domain coupling can also become problematic as more complex sets of data are sent between services—this can often point to the more problematic forms of coupling we’ll explore shortly.
> Just remember the importance of information hiding. Share only what you absolutely have to, and send only the absolute minimum amount of data that you need.

#### Temporal Coupling
Can be categorized as domain coupling but this is a more sophisticated case where the caller needs to have a response from the upstream. If the upstream is down the execution fails. To solve this retry and circuit breaker patterns along with error handling should be implemented if the response is synchronously needed or have an asynchronous call via a broker or data replication.

### Pass Through Coupling
One of the most problematic forms of implementation coupling, it happens when service X passes data to Y just because its needed by Z. That means X **needs** to be aware of the Y's implementation as it calls Z.

### Common Coupling
This happens when two or more microservices make use of a common set of data. Eg: A shared database. Changes in the common data will cause changes in all those who share it. It should be avoided, try to have one **source of truth**, and other services should just access the data through this SoT.

> [!WARNING] Db Wrappers
> If you see a microservice that just looks like a thin wrapper around database CRUD operations, that is a sign that you may have weak cohesion and tighter coupling, as logic that should be in that service to manage the data is instead spread elsewhere in your system.

### Content Coupling
Content coupling describes a situation in which an upstream service reaches into the internals of a downstream service and changes its internal state. The most common manifestation of this is an external service accessing another microservice’s database and changing it directly.

