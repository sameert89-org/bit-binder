According to this software design approach, software should be modelled to match a business domain. It advocates for the use of a ‘ubiquitous language’, a common language that is shared by both the software developers and the business stakeholders.

It facilitates better understanding of work by both parties.

## Aggregates

In DDD, an _aggregate_ is a somewhat confusing concept, with many different definitions out there. Is it just an arbitrary collection of objects? The smallest unit that should be taken out of a database? It can be considered as a representation of a real domain concept—think of something like an Order, an Invoice, a Stock Item, and so on. Aggregates typically have a life cycle around them, which opens them up to being implemented as a state machine.


> [!NOTE] Definitions
> **Entity**: An object defined primarily by its identity is called an ENTITY that has significance (e.g. Customer) in the sales system is an Entity and can change over time.
> **Value Object**: Value Objects are objects that are known only by their properties and values. For example, "Customer Address" can be designed as a Value Object. Value Objects can be assigned to different Entities and are usually implemented as Immutable (e.g. date, address)
> **Aggregate**: a collection of entities or value objects that are related to each other through a Aggregate Root object
> **Aggregate Root**: Each Aggregate has a root and a boundary, **Aggregate Root** owns an Aggregate and serves as a gateway for all modifications within the Aggregate



> [!WARNING] DDD vs EF
> From domain driven design perspective `DbContext` is the implementation of UnitOfWork and a `DbSet<T>` is the implementation of a repository.
> This is the point where DDD and EntityFramework contrast. DDD suggests to have a Repository per aggregate root but EntityFramework creates one per Entity.
> So, what is an aggregate root?
> Assume that we have a social network and have **entities** like Post, Like, Comment, Tag. (I believe you can imagine the relations between these entities) Some of the entities are "Aggregate Root"
> To find the aggregate root(s) I try to find which entities cannot live without the other. For instance, Like or Comment cannot live without a Post. Then Post is an aggregate root and we need a PostRepository or turn the Post entity into a Repository (the famous collection like interface thing). CRUD operations for Comment and Like (as well as the Post) should remain on this repository.








