Incremental decomposition is key, pick low hanging fruits first i.e. the microservices that are easy to do. You should not decompose everything at once, <mark style="background: #ABF7F7A6;">Don't wait for a big bang deployment.</mark>

Often times people ignore the UI decomposition, the concept of [[Vertical Slicing]] is a very helpful one, a team owning a vertical slice truly fulfills the independent deployability.


### Decomposition by layers

Basically this strategy involves dividing layers (Frontend, Backend and the Database). This often times is not a good idea because of UI decomposition lagging behind backend. Backend [[Vertical Slicing]] is the way to go in many of these scenarios.
### Code First Decomposition

![[Drawing 2024-11-15 12.28.26.excalidraw]]

We break down the code and share the same database, it is very common type of decomposition, it tends to be easier as well.


### Data First Decomposition

Less common, DB is split first, this allows you to deal with issues like loss of enforced data integrity or lack of transactional operations across both sets of data.


## Decomposition patterns

Following are some well know decomposition patterns.

### Strangler Fig

The pattern describes the process of wrapping an old system with the new system over time, allowing the new system to take over more and more features of the old system incrementally.

![[Pasted image 20241115123817.png#invert_B]]


## Parallel Run

Also known as <mark style="background: #D2B3FFA6;">Shadow Trafficking</mark>, you run both the new microservices architecture and old monolith side by side serving same requests and compare both responses.


**Next:** [[ Problems around Data Decomposition ]]

