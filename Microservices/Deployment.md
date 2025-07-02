---
id: Deployment
aliases: []
tags: []
---

### Principles of microservice deployment

1. **Isolated Execution**: Microservices should have their own computing resources, and their execution should not impact other microservices.
2. **Automation Focused**
3. **Infrastructure as code**
4. **Zero-Downtime deployment**
5. **Desired state management**: Use a platform that maintains your microservices in a defined state. If you say I want 2 nodes of the same microservice in 2 data centers then platform should enforce this, if one node crashes then it should boot up another to ensure the desired state.


> [!NOTE] Rolling upgrades
> Platforms like rolling Kubernetes provide a feature called rolling upgrades, your microservice isn't totally shut down before the new version is deployed, instead instances of the service are slowly ramped down as new instances running new versions are ramped up.



> [!WARNING] PaaS and its challenges
> When PaaS solutions work well, they work very well only until they don't work for you and you want to change something. You are extremely limited on getting under the hood. The smarter a PaaS is often times then worse it is.
