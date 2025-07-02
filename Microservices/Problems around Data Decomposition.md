Below are some problems that are encountered in data decomposition:
## Performance

> [!WARNING] Don't OverJoin
> Databases, especially relational databases, are good at joining data across different tables. Very good. So good, in fact, that we take this for granted. Often, though, when we split databases apart in the name of microservices, we end up having to move join operations from the data tier up into the microservices themselves. And try as we might, it’s unlikely to be as fast.

The problem with incorrect decomposition: Lets consider 2 services X and Y, X needs to perform join with data in Y, so X queries Y's data and then joins it with its own data, that is a problem since Y runs `SELECT` on its own db then sends data. So the `JOIN` is happening inside X but not the root database.

## Data Integrity

Since now our data lives across different tables, foreign key relationships are challenging, since if X's table has a link to Y's data, then if Y decides to delete some data, then X's references will be incorrect.

## Transactions

Suppose we have Paytm Mall order processing system, and suppose a customer places an order. The following tasks need to be done in the database.

1. Deduct the item quantity from inventory table.
2. Record the order details in the order table.
3. Deduct the amount from the customers' wallet in the accounts table.

In a Monolith, this all can be wrapped in one [[ACID]] Transaction. But in case of microservices, these databases are separate.

Possible solutions are:

1. Distributed transactions
2. Sagas

