GraphQL sits between the client and the server, it facilitates clients to write queries and fetch data which would have required multiple queries otherwise. Servers define schema, types and operations. Each field in schema represents a separate piece of data and you need to define resolvers on how to get/mutate those.

There are 2 types of operations:
- Queries
- Mutations

Can be used to implement a [[BFF]].

### Challenges
- Developers are Dumb, they won't write good GraphQL queries, same as the age old SQL problem, this will cause throttling in the servers. Unlike SQL we don't have query planners.
- Unlike rest, caching is complex, for a fixed response, I can use [[CDN]] to cache the responses.