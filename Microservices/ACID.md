Atomicity
Ensures that the operations attempted within the transaction either all complete or all fail. If any of the changes we’re trying to make fail for some reason, then the whole operation is aborted, and it’s as though no changes were ever made.

Consistency
When changes are made to our database, we ensure it is left in a valid, consistent state.

Isolation
Allows multiple transactions to operate at the same time without interfering. This is achieved by ensuring that any interim state changes made during one transaction are invisible to other transactions.

Durability
Makes sure that once a transaction has been completed, we are confident the data won’t get lost in the event of some system failure.