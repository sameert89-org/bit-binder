> *"Organizations which design systems...are constrained to produce designs which are copies of the communication structures of these organizations."* - Melvin Conway

Following are the core concepts of micro-services:

# Independent Deployability

*I should be able to deploy each service individually in production without having to deploy anything else.*

This requires my micro-services to be <mark style="background: #FF5582A6;">loosely coupled</mark>, this means having well-defined and stable contracts between the services.

This also means that we should avoid backward incompatible changes. If we break the backwards compatibility then we also force our consumers to change.

# Modeled Around a Business Domain

Taking a page from [[Domain Driven Design]], service boundaries should be defined along a business domain.


> [!Warning] Changes that span across multiple micro-services
> Rolling out a feature that requires changes to more than one microservice is expensive. You need to coordinate the work across each service (and potentially across separate teams) and carefully manage the order in which the new versions of these services are deployed. That takes a lot more work than making the same change inside a single service (or inside a monolith, for that matter). It therefore follows that we want to find ways to make cross-service changes as infrequent as possible.


# State Ownership

*[[Microservices]]* Should avoid the use of <mark style="background: #FF5582A6;">Shared Database</mark>, If a microservice wants to access data held by another microservice, it should go and ask that service for the data. 

**Next:** [[Communication Between Microservices]], [[Advantages & Disadvantages of Microservices]]