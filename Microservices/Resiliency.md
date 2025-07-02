The four pillars of resiliency are:
1. **Robustness:** The ability to absorb expected perturbation.
2. **Rebound:** The ability to recover after a traumatic event.
3. **Graceful extensibility:** How well we deal with a situation that is unexpected.
4. **Sustained adaptability:** The ability to continually adapt to changing environments, state-holders and demands.


> [!INFO] Target Percentile
> Given the nature of networks you'll always have outliers, so setting targets for a given percentile of the responses monitored can be useful. "We" expect the website to have a 90th percentile response time of 2 seconds when handling 200 concurrent connects per second."


> [!TIP] Timeouts
> Timeouts are incredibly useful. Put time outs on all out of process calls, and pick a default timeout for everything. Log when time-outs occur, look at what happens and change them accordingly.


## Resiliency Patterns

### Pattern: Timeout
I only wait for the downstream service to respond until my timeout is reached. Think of timeouts as per your SLOs, suppose you want the page to render in 2 seconds, it takes 2 seconds for one service in the chain to respond, then we should have timeout out way before. Have default timeouts everywhere. 

### Pattern: Retry
If the service did not respond in the expected timeout, I retry a defined number of times, with potentially some backoff between retries.


### Pattern: [[Circuit Breaker]]
When a set number of requests fail in a given duration the circuit breaker trips, causing any more requests to *fail fast*, monitor the downstream service by letting a few requests through, if sufficient requests become successful, circuit is restored.

### Pattern: Bulkhead
In shipping, a bulkhead is a part of the ship that can be sealed off to protect the rest of the ship. So if the ship springs a leak, you can close the bulkhead doors. You lose part of the ship, but the rest of it remains intact. Separation of concerns is the best way to implement bulkheads, systems shouldn't be coupled to a degree that causing failure in one part of the ship causes water to leak inside everything.


> [!INFO] Idempotent calls
> In idempotent operations, the outcome doesn't change after the first application, even if the operation is subsequently applied multiple times. If operations are idempotent, we can repeat the call multiple times. This is useful when we want to repeat calls which we aren't sure have been processed.
> *Fun fact:* Verbs `PUT` and `GET` are defined as idempotent in HTTP spec.


## Chaos Engineering
Useful approach to help you improve resiliency- either in terms of ensuring your systems are as robust as you think they are, or else as part of an approach toward the sustained adaptability of your system.


> [!ABSTRACT] Netflix's Simian Army
> The most famous of these tools is Chaos Monkey, which during certain hours of the day turns off random machines in production. Knowing that this can and will happen in production means that the developers who create the systems really have to be prepared for it. Chaos Monkey is just one part of Netflix’s Simian Army of failure bots. Chaos Gorilla is used to take out an entire availability zone (the AWS equivalent of a data center), whereas Latency Monkey simulates slow network connectivity between machines. For many, the ultimate test of whether your system really is robust might be unleashing your very own Simian Army on your production infrastructure. **Chaos toolkit** is an open-source project which offers similar chaos engineering options.


**Read More:** [[CAP Theorem]]