Containers are an excellent tool for running services on a single machine, but you are never going to run all your code on a single machine (unless you are an exception like lichess). The need for running multiple containers across machine as a part of the same environment is what made Kubernetes super popular. Docker has its own solution to this called Docker swarm. Many others had their own solutions to this, but Kubernetes has taken the crown as the most popular orchestration platform.

They allow you to define:
1. How and where the workloads run.
2. Handle desired state management.
3. Allocating and reallocating resources.

![[Pasted image 20241213141342.png#invert_B]]
### Key Concepts

1. **Kubernetes Nodes:** These are machines where multiple pods can run. These could be physical/virtual machines.
2. **Control Pane:** Manages these machines.
3. **Kubernetes Pod:** Collection of one or more containers (preferably sidecars) deployed together.
4. **Kube Services:** A pod is ephemeral, but a service lives forever. For example service X has 3 replicas. Multiple pods can map to one service.

![[Pasted image 20241213141722.png#invert_B]]

5. **Multitenancy & Federation:** Multitenancy means a single software architecture services multiple customers called tenants. Tenant data is isolated logically. This is like you want to use the one kubecluster to run all your workloads of your orgs projects. Kubernetes is limited in this usecase. Platforms built on top of Kubernetes such as ACA, and OpenShift support this.


>*"Applications build on Kubernetes are portable across Kubernetes clusters in theory, but not always in practice".*

> *"Deployment is what happens when you install some version of your software into a particular environment (the production environment is often implied). Release is when you make a system or some part of it (for example, a feature) available to users."*

> [!NOTE] Green Blue Deployments
> Green-Blue deployments involve maintaining two environments: **Green (active)** and **Blue (standby)**. New versions of the application are deployed to the standby environment (Blue) while the active environment (Green) serves live traffic. Once the new version is tested and validated in Blue, traffic is switched over to it, making Blue the new active environment. This approach ensures zero-downtime deployments and allows quick rollback by reverting traffic to the previous environment.


> [!NOTE] Feature toggles
> Feature toggles (or flags) allow enabling or disabling specific features at runtime without redeploying code. Features are wrapped in conditional logic (`if-else`) and controlled dynamically via configurations. They support phased rollouts, A/B testing, and user-specific features while mitigating deployment risks. Proper flag lifecycle management is essential to avoid accumulating unused toggles.

> [!NOTE] Canary Releases
> Canary releases involve deploying a new version of an application to a small subset of users or infrastructure first. This approach tests the new version in a controlled environment, monitoring for issues before rolling it out to the entire user base. If problems are detected, the release is halted or rolled back, minimizing the impact on users.

> [!NOTE] Parallel Runs
> Parallel runs involve running the new and old versions of a system simultaneously to compare their behavior and results. This approach is common in systems with high risk or strict regulatory requirements (e.g., financial systems). Data is processed through both versions, and results are compared to ensure the new system works as intended before fully transitioning.

