Bounded Contexts are Just Business Domains.

Bounded contexts hide implementation details, they contain one or more aggregates. They can share aggregates as well, but the meaning of the aggregate among bounded contexts could completely differ.

![[Drawing 2024-11-13 17.09.18.excalidraw|600]]

These may have the same name but for finance context, this would be used to calculate the **valuation** of the company, but for warehouse it is to track the location and stock. If the data is shared between the two contexts, warehouse does not need to tell about the location as it is irrelevant to the finance service.