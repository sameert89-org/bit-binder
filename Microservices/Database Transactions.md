A typical database transaction ensures [[ACID]].

## Distributed Transactions


> [!NOTE] 2PC (Two Phase commit) algorithm
> This is commonly used to implement a *distributed transaction*. As the name suggests there are 2 phases: *voting phase* & *commit phase*. In the *voting phase* a central coordinator asks all the involved parties whether a state change can be made as a part of the transaction. For example service X needs to remove one row from its table and service Y needs to change 2 rows from its table. If someone says the change cannot be made then the whole operation aborts. If all agree then a commit message is sent by the coordinator. Again this algorithm **DOES NOT** solve the core problem. Since these <mark style="background: #FF5582A6;">transactions are distributed they will not happen at the same time</mark>. And service Y saying it can do the change does not mean anything if in the future some other thing say deleted its rows. That forces the service to maintain locks on the promised data. Then coordinator also need to push a rollback message if someone doesn't hold their promise of changing the state. It also introduces latency if the transaction is long, or has more participants.


# Sagas

![[Pasted image 20241204172032.png#invert_B]]

### Saga Failure Recovery

The original saga paper describes two modes of recovery:
1. **Forward Recovery:** At the point where the transaction fails we *keep processing* We need to retry transactions, which implies that our systems need to have enough info to allow retries to happen.
2. **Backward Recovery**: At the point where the transaction fails rollback the previous work in the chain, which implies that our system need to have mechanism to rollback the changes.
It is totally appropriate to have a mix of the above modes, some failures may require a rollback; other may be fail forward. For example if the stock is not there we Have to cancel the order, but if a customer could not receive a delivery then we could retry next day.

> [!WARNING] Sagas handle business failures and not technical failures
> Sagas forward and reverse failure handling refers to business failures, for example a customer wants to withdraw funds but he does not have sufficient funds. If there is a say 503 error from the service we need to handle that separately such as by using Retry or [[Circuit Breaker]].

### Saga rollbacks
Saga rollbacks are different from regular database rollbacks that happen *pre-commit*, but in case of sagas commits have already happened. The way to go about it is implementing something called a *compensation transaction*, it is not a 100% rollback but it tries to compensate for the changes. For example a customer has received an email regarding order placed, but it was out of stock, then we can send another email as a part of compensation informing the customer about the issue.

To reduce the number of rollbacks you have to do you need to carefully decide the flow inside sagas. As a rule of thumb *if you wanna fail, fail faster*.


### Saga Implementations

#### Orchestrated Sagas
They use a central coordinator like distributed transactions, it defines the order of execution and to trigger any required compensating action. You do not need a separate orchestrator, any appropriate service can also handle the orchestration work.

This pattern uses the request-response model heavily, it has to talk to services one by one on whether something in the chain is done or not. There is a large domain coupling between the orchestrator and the orchestrated.

#### Choreographed Sagas
A choreographed saga aims to distribute responsibility for the operation of the saga among multiple collaborating services. Basically no microservice knows about another microservice, saga starts at one service which after doing its job fires an event that could be picked up by the interested services, this reduces the amount of domain coupling but introduces more challenges like harder rollbacks and a lack of tracing. We can use [[Correlation ID]]s to combat this, which can be logged to understand the flow of transactions.