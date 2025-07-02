Cap theorem states that in a distributed system it is only possible to achieve two of Consistency, Availability and Partition tolerance at time. 

In practice AP and CP systems are the only possible, because losing P means your system just can't run over a network.

AP systems will be eventually consistent so stale data possibility exisits.
CP systems will be hard to build and scale, across multiple clusters if a node fails we have to refuse the requests to that node, sacrificing availability.