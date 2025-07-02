RPC Stands for Remote procedure calls, it makes network calls look like local method calls.

There are various RPC implementations, most of these requires explicit schema such as SOAP or gRPC or Thrift. Others such as Java RMI does not require explicit schema but requires client and server to same technology.

RPC framework defines how data is serialized and deserialized, for example gRPC uses `protocol buffers`.

Client side code generation is easier it looks and feels like a normal method call.

### Challenges
- Local calls are not like remote calls, there is overhead of serialization and deserialization, also the overhead of transporting the data over the network. The problem arises when we forget that it is actually a network calls.
- Client stub regeneration, both clients and server must have same proto files, if server removes a field from a type then unlike json parsers proto will break.