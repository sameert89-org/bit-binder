The four axes of scaling
- **Vertical Scaling**: Getting a bigger machine.
- **Horizontal Duplication**: Having multiple things capable of doing the same work.
- **Data Partitioning**: Dividing work based on some attribute of the data, e.g., customer group, consumer name first alphabet essentially sharding.  Partitioning can also be done based on geolocation.
- **Functional Decomposition**: Separation of work based on the type, e.g., microservice decomposition.


> [!DANGER] Sticky Sessions and Why They are Bad
> Some systems place requirements on load distribution mechanism that they require each request associated with the same user session gets redirected to the same replica. Load balancers do allow for sticky sessions but you might want to avoid building such systems because they can lead to scalability and reliability challenges. Systems that rely on sticky sessions can become a bottleneck if a particular replica gets overloaded or fails, as user sessions tied to that replica cannot seamlessly migrate to another one. Additionally, debugging and monitoring become more complex because the state is distributed across replicas rather than centralized or consistent across all nodes


> [!INFO] Sharding
 > Sharding is a strategy to divide a large database into smaller databases to improve scalability. We take a key from the database of concern and apply a function to it, for example we take consumer age and $$f(age) = age \% 2 == 0$$ now we can put the incoming data into two shards.
 > 
 > If you want to query data that spans across multiple shards (for eg. patients within month of april), you need to either query each individual shard and join in memory or else have an alternative read store where both data sets are available. Often querying across shards is handled by an asynchronous mechanism, using cached results. Mongo uses map/reduce jobs, for example, to perform these queries.


 
> [!INFO] Event Sourcing and CQRS
> **Event Sourcing:** Event Sourcing is an architectural pattern in which instead of storing the state of an entity we store the events that alter this state in a event source database, these events are replayed to get the current state of the entity, to avoid replaying large number of events regular snapshots are used and replay starts from latest snapshot.
> **CQRS**: Command Query Responsibility Segregation is an architectural pattern where we separate the type of requests based or read (query) and writes(commands) this allows us to organize code at the code level but also achieve scale at database level by having separate fast query database optimized for reads.


