These patterns define how objects communicate, delegate responsibilities, and manage algorithms or workflows.

Ranking based on most used to least used.

1. [[Observer]] : (Universal) - Event-driven systems, UI frameworks, pub/sub messaging, React state updates, DOM events, and notification systems.
2. [[Strategy]] : (Very High) - Swapping algorithms at runtime, such as payment methods, sorting rules, validation logic, compression formats, or authentication schemes.
3. [[Command]] : (High) - Encapsulating actions for undo/redo, job queues, task scheduling, UI button actions, and CQRS-style application commands.
4. [[Iterator]] : (High) - Traversing collections without exposing internal structure, used everywhere in `foreach`, Java/C# iterators, Python generators, and database cursors.
5. [[Mediator]] : (Medium-High) - Reducing direct dependencies between components, commonly used in UI coordination, message buses, chat rooms, and libraries like MediatR.
6. [[Chain of Responsibility]] : (Medium) - Passing requests through middleware pipelines, logging chains, exception handlers, authorization filters, and HTTP request processing.
7. [[Template Method]] : (Medium) - Defining a fixed algorithm skeleton while allowing subclasses to customize steps, common in frameworks, test setup flows, and lifecycle hooks.
8. [[State]] : (Medium) - Modeling objects whose behavior changes based on internal state, such as TCP connections, parsers, order workflows, game characters, or UI components.
9. [[Memento]] : (Low) - Capturing and restoring object state, mostly used in undo systems, snapshots, checkpoints, and editor history.
10. [[Visitor]] : (Low) - Adding operations to complex object structures without modifying them, common in compilers, AST traversal, code analysis tools, and document processing.
11. [[Interpreter]] : (Very Low) - Representing and evaluating grammar/rule systems, mostly seen in small DSLs, query languages, expression evaluators, and rule engines.
