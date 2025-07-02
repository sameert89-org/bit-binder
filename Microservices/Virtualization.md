---
id: 1733896222-BUIK
aliases:
  - Virtualization & Hypervisors
tags: []
---

# Virtualization & Hypervisors

> *Virtualization is a technology that creates virtual representation of servers, storage, networks and other physical machines*

> *A Hypervisor is a software that allows multiple virtual machines to run on a single physical machine*

![[Pasted image 20241213120814.png#invert_B]]

## Types of Hypervisors

### Type 1 Hypervisor
Runs directly on the underlying host system. Also called Native/Bare Metal Hypervisor. It does not require any base os. It has direct access to hardware resources. **Examples** VMWARE ESXi, XenServer and Hyper-V

Type 1 Hypervisors are very efficient, since they have direct hardware access.

### Type 2 Hypervisor

Runs on top of underlying host OS, slower than type 1, eg: VMware workstation, virtual box, qemu. 

### Container Based Virtualization

Lower isolation compared to VMs but faster to provision. Containers do not have their own kernel code, instead they use the same underlying kernel code.
![[Pasted image 20241213120745.png#invert_B]]


> [!NOTE] Best of both Worlds
> Projects like Hyper-V containers and **Firecracker** (Internally used by AWS lambda) have proven to be useful with fully isolated workloads while still trying to keep spin-up time down.





