Brokers are intermediaries, which implement the pubsub/orchestrator design pattern. Producers produce message which is either push or pull delivered to subscribers.

## Topics and Queues

Brokers typically provide topics which are 1-n or queues which are 1-1 or both.

There can be more than one consumers in a queue, and it might sound confusing, look at the below diagram.

![[Pasted image 20241122171038.png#invert_B]] 

One of the big differences between the two are sender has information of the receiver in case of queues, in case of topics however this is not the case.


### Why use a Brokers
These provide few things which are really helpful and help us avoid re-inventing a wheel only to make it a square.

![[Pasted image 20241122171414.png]]

The things are, guaranteed delivery, it can handle the *retry policies*, *dead lettering* etc.
