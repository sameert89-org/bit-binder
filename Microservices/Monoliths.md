When all functionality in a system must be deployed together it is considered as a *monolith*. 

## Single-Process Monolith

All code is deployed as a single process. 

## Modular Monolith

A variation of [Single-Process Monolith] where single process consists of separate modules. But all still need to be combined together for deployment.


> [!NOTE] Problem with Modular Monolith
> One of the challenges of a modular monolith is that the database tends to lack the decomposition we find in the code level, leading to significant challenges if you want to pull apart the monolith in the future.

## Distributed Monolith

> *"A distributed system is one in which the failure of a computer you didn’t even know existed can render your own computer unusable."*

It meets the definition of [[Service Oriented Architecture]] but it must be deployed together.


**Next:** [[Monoliths Are Not BAD]]