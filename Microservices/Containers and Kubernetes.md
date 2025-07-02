Ideally, each microservice instance should be run in isolation. This ensures that issues in one microservice cannot affect others.

This can be done using *virtualization*, by using virtual operating systems on top of a host, but this can grow expensive very quick in terms of resources due to the VM overhead.

Containers allow you to do something similar but with way less overhead. Once we have our services deployed in containers, we also need *Container Orchestration*. Kubernetes is one such solution.