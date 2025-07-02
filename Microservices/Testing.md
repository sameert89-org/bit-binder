![[Pasted image 20241213151749.png#invert_B_C]]

*The testing quadrant*


> [!NOTE] Mocks vs Stubs
> Mocks are intelligent stubs, mocks can have some expectations and can be asserted after test is run so as to verify whether the expectations were met. Stubs just return canned data and cannot be verified upon.


# Unit Tests
Code level tests, fast feedback, verifies basic functionality. Should be written as "unit" i.e. testing one method call.

# Service Tests
Class of tests where we test the behaviour isolated to a particular microservice, this means other services must be mocked. You can mock services manually by spinning up servers, or use a tool like [mountebank](https://www.mbtest.org/)

## End to End Tests

designate certain end-to-end tests as being the responsibility of a given team, even though they might cut across microservices being worked on by multiple different teams. I first learned of this approach from Emily Bache.[7](https://learning.oreilly.com/library/view/building-microservices-2nd/9781492034018/ch09.html#idm45699527590128) The idea is that even though we make use of a “fan in” stage in our pipeline, they would then split the end-to-end test suite into groups of functionality that were owned by different teams. Fundamentally, it’s problematic to have a team own responsibility for tests where people from a different team can cause these tests to break.
 ![[Pasted image 20241213165447.png#invert_B_C]]


Sometimes organizations react by having a dedicated team write these tests. This can be disastrous. The team developing the software becomes increasingly distant from the tests for its code.

## Contract testing
This type of testing can save a lot of time by identifying upstream issues, that would be hard to debug in case they showed up in e2e tests. The consuming microservices define a contract test suite that are shared to the producer microservice team. It defines how they expect the producer to behave. These tests are run as part of the the consumers test suite against one producer in isolation, this can help in identifying issues faster. Tools like [Pact](https://pact.io/) can help with this.


> [!INFO] Smoke Tests
> Used after the software is deployed into production but before it is released, smoke tests are run against the software to make sure it is working appropriately. These tests are normally fully automated and can range from very simple activities like making sure a given microservice is up and running to actually executing full-blown synthetic transactions.
