These patterns define how objects communicate, delegate responsibilities, and manage algorithms or workflows.

Ranking from most used to least used:

1. [[Observer]] - **Universal:** Supports event-driven systems, UI frameworks, pub/sub messaging, React state updates, DOM events, and notification systems.
2. [[Strategy]] - **Very high:** Swaps algorithms at runtime, such as payment methods, sorting rules, validation logic, compression formats, or authentication schemes.
3. [[Command]] - **High:** Encapsulates actions for undo/redo, job queues, task scheduling, UI button actions, and CQRS-style application commands.
4. [[Iterator]] - **High:** Traverses collections without exposing internal structure; used in `foreach`, Java and C# iterators, Python generators, and database cursors.
5. [[Mediator]] - **Medium-high:** Reduces direct dependencies between components; commonly used in UI coordination, message buses, chat rooms, and libraries such as MediatR.
6. [[Chain of Responsibility]] - **Medium:** Passes requests through middleware pipelines, logging chains, exception handlers, authorization filters, and HTTP request processing.
7. [[Template Method]] - **Medium:** Defines a fixed algorithm skeleton while allowing subclasses to customize steps; common in frameworks, test setup flows, and lifecycle hooks.
8. [[State]] - **Medium:** Models objects whose behavior changes based on internal state, such as TCP connections, parsers, order workflows, game characters, or UI components.
9. [[Memento]] - **Low:** Captures and restores object state; mostly used in undo systems, snapshots, checkpoints, and editor history.
10. [[Visitor]] - **Low:** Adds operations to complex object structures without modifying them; common in compilers, AST traversal, code analysis tools, and document processing.
11. [[Interpreter]] - **Very low:** Represents and evaluates grammar or rule systems; mostly used in small DSLs, query languages, expression evaluators, and rule engines.
