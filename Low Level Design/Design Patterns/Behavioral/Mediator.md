> Mediator = a middleman object that coordinates communication between related objects.

## Why do I need a Mediator?
Imagine you are flying a plane & obviously you are not the only one doing it. Let's say you want to land, how do you know whether the runway is prepared for you to land? Do you ask each and every plane in the vicinity?

That's where the mediator *Air traffic control* comes into play.

```
Plane A -> Control Tower
Plane B -> Control Tower
Plane C -> Control Tower
```

The control tower decides who can land, who must wait, and which runway is available.

A mediator not only routes, it coordinates: 

```
Router:
"Send this to X."

Mediator:
"Given that A happened, decide what B, C, and D should do, in what order, under what conditions."
```

## Example: Distributed Transactions 2Phased Commits
Read about it [here](https://notes.kernelrider.in/Microservices/database-transactions.html)

## Example: Auction House
An auction house:
- Reject bids lower than current price.
- Track highest bidder.
- Notify previous highest bidder they were outbid.
- Notify seller when reserve price is met.
- Close auction after time expires.
- Prevent seller from bidding on their own item.
l