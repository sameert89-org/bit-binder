Rest stands for Representational State Transfer.


> [!NOTE] **R**epresentational in REST
> How a resource is shown externally is completely decoupled from how it is stored internally. The server creates different representations of the resource.


![[HATEOAS]]


### Challenges

Traditionally auto-generation of client side code was not possible with rest, now that OpenAPI is around, it has become somewhat possible.

Performance is slower compared to a binary protocol. Also there is an HTTP overhead.