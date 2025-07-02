> *"The connections between modules are the assumptions which the modules make about each other"*


> [!NOTE] In-process vs Inter-process
> In a monolith, we have in process calls and compiler and runtimes can do a plethora of optimizations to make it faster, but in case of [[Microservices]], inter-process calls have to be made, packets have to be serialized and sent. Be mindful of what you send.


# Interface Rollout

When rolling out a backward incompatible change to a microservice interface, we either need to do a lockstep deployment with all consumers or find some way to phase the rollout of the new microservice contract.


## Error Handling


> [!WARNING] I swear its not me
> With a distributed system, the nature of errors can be different. You are vulnerable to a host of errors that are outside your control. Networks time out. Downstream microservices might be temporarily unavailable. Networks get disconnected, containers get killed due to consuming too much memory, and in extreme situations, bits of your data center can catch fire.

**5 types of errors:**
1. Crash failure: Server Crashed
2. Omission Failure: I sent something but did not get a response (sync) or event back (async)
3. Timing Failure: Something happened too early or too late.
4. Response Failure: I did get a response but it was wrong.
5. Arbitrary Failure


# Styles of Microservice Communication

Following is a high level kinds of microservice communication

![[Pasted image 20241119142944.png#invert_B]]


# Synchronous (Blocking)

This type of call is a type of temporal coupling, where the sender has to wait for a response from the downstream.


| Pros              | Cons                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Easy to implement | If downstream is down, then some kind of retry mechanism is needed, on the other hand if the upstream is down the response is just lost. |

It is fine as long as you **DO NOT** chain the synchronous calls, as in that case the errors will be hard to track. Eg: REST over HTTP and RPC


## Asynchronous (Non Blocking)

### Request Response
What is this doing here you ask?

When the requested operation completes, whether successfully or not, the upstream microservice receives the response. Specifically, _any_ instance of the upstream microservice should be able to handle the response (NOT tied to instance). So you can send a request and later receive a response as an **invoke** from the downstream back.

![[Pasted image 20241120150746.png#invert_B]]



> [!NOTE] Parallel v/s Sequential Calls
> A better option would be to run these three requests in parallel; then the overall latency of the operation would be based on the slowest API call, rather than on the sum of latencies of each API call. By parallelism we mean either concurrency or parallelism, a single core server for example may not be truly parallel.

### Event Driven
Event is raised, the raiser does not know who will consume this, consumers just consume it.


> [!WARNING] By Asynchronous we DO NOT mean `async/await`
> Async await is something we do at code level, it is asynchronous with respect to the the thread which executes things (that too being subjective depending on the type of blocking i.e. I/O or CPU bound). If we use `async/await` in this context, we are still waiting for a response.

Long Running Processes are a good candidate for these along with chained api calls.


> [!NOTE] Events and Messages
> Event is something that happened, message is something that is sent. Message is the medium, event is the payload.


> [!NOTE] One event many listeners
> The emitter does not know who will process the events, then the problem arises that others might not need all info the event has, for example Order processor emits order created event, then loyalty calculator only needs the order Id and customer Id to increase loyalty by 1, but notification service might need more data such as name, email etc. There are multiple approaches, either you include everything in one message or you can send common stuff and have other fetch the data if they need, for example loyalty can ask customer service for these details.


## Common Data

Service X drops data at a place which is picked up by Y and Z. This is **NOT** a database sharing example. Clear distinction between producer and consumer is there. **Flow of data is in single direction**.

Two common examples of this pattern are the data lake and the data warehouse. In both cases, these solutions are typically designed to help process large volumes of data, but arguably they exist at opposite ends of the spectrum regarding coupling. With a data lake, sources upload raw data in whatever format they see fit, and downstream consumers of this raw data are expected to know how to process the information. With a data warehouse, the warehouse itself is a structured data store. Microservices pushing data to the data warehouse need to know the structure of the data warehouse—if the structure changes in a backward-incompatible way, then these producers will need to be updated.

Some sort of polling mechanism is required by the downstream consumers to check for new data.


> Note: We follow this in Report Blobs and Asset Blobs, it is very common but hard to spot.

There is [[Cohesion & Coupling#Common Coupling]] in this case.

## Story

It’s time for a cautionary tale. Back in 2006, I was working on building a pricing system for a bank. We would look at market events and work out which items in a portfolio needed to be repriced. Once we determined the list of things to work through, we put these all onto a message queue. We were making use of a grid to create a pool of pricing workers, allowing us to scale up and down the pricing farm on request. These workers used the competing consumers pattern, each one gobbling messages as fast as possible until there was nothing left to process.

The system was up and running, and we were feeling rather smug. One day, though, just after we pushed a release out, we hit a nasty problem: our workers kept dying. And dying. And dying.

Eventually, we tracked down the problem. A bug had crept in whereby a certain type of pricing request would cause a worker to crash. We were using a transacted queue: as the worker died, its lock on the request timed out, and the pricing request was put back on the queue—only for another worker to pick it up and die. This was a classic example of what Martin Fowler calls a catastrophic failover.

Aside from the bug itself, we’d failed to specify a maximum retry limit for the job on the queue. So we fixed the bug, and configured a maximum retry. But we also realized we needed a way to view and potentially replay these bad messages. We ended up having to implement a message hospital (or dead letter queue), where messages got sent if they failed. We also created a UI to view those messages and retry them if needed. These sorts of problems aren’t immediately obvious if you are familiar only with synchronous point-to-point communication.


## Tips for making communication easier

1. Make backward compatibility easy
2. Make interface explicit (clear on what it provides)
3. Keep APIs technology agnostic, avoid integration technology that dictates what tech stacks can be used to implement microservices (example: RPC using Java RMI) 
4. Make your service simple for consumers, consumers should not have to do too much to consumer your API
5. Hide internal implementation detail, customer should not be told "how" to do things.



> [!WARNING] Structural v/s Semantic Contract Changes
> A structural change is where the contract fields change, for example a remote api used to accept 3 fields not it accepts only 2, then it will reject old consumers. A semantic change is in behaviour and harder to detect generally. That means the API used to provide some result using the input but the result is different after a semantic contract change. The second one can only be caught by testing.



# Tips for making change easier

1. Expansion changes: Only adding new things and not removing old things.
2. Tolerant reader (Robustness): Make services tolerant to a variety of inputs.
3. Explicit schemas


> [!NOTE] Semantic Versioning
> `MAJOR.MINOR.PATCH`

> Postel's Law: *"Be conservative in what you do, be liberal in what you expect from others."*

# Handling breaking changes
1. Lockstep deployment: Require all consumers to change with the changing service.
2. Coexist Incompatible Microservice Versions: Deploying a different set of services allow consumers to move to new service and then retire to old service. Drawbacks are complex pipelines and deployment and extra resources.
3. Emulate the Old Interface: Have a mix of endpoints in the new service which adheres to both old and new services. 


## Sharing Code across Services

### Sharing code via libraries
This is something done commonly, but this can unknowingly create coupling. If you were to change this library somehow, then all the consuming services need to change. The thing to remember is that you **cannot** update all uses of the library at once, because the library is packaged into a deployment of the consuming services, a change in library means redeploying the microservices.


> [!NOTE] Client Libraries
> Client libraries wrap over existing APIs and provide an abstraction along with handling logging, service discovery, failures etc. This helps in ensuring all the customers use your API in the 'intended' way. SDKs are a good example of this.

### Sharing code via a dedicated microservice
## Service Discovery

There are few ways of performing service discovery:

#### DNS
We could have a fixed web address for the service such as `<servicename>-<environment>.company.net` these can front a load balancer which distributes load between all instances of the service.

#### Dynamic Service Registries
1. Zookeeper
2. Consul
3. etcd

### Service Meshes and API Gateways

> [!NOTE] East-West & North-South Traffic
> In a datacenter east-west traffic refers to traffic inside the datacenter, but North-South traffic refers to the data coming from and going outside.


An API gateway sits in the perimeter of our cluster and is only concerned with **North-South** traffic. It also offers capabilities of logging, rate-limiting etc.

A service mesh lives inside the cluster and deals with communication between services inside the cluster. Service meshes include mutual TLS, correlation IDs, service discovery and load balancing. Dapr is essentially a service mesh.


Read More: [[Proxies and Reverse Proxies]]