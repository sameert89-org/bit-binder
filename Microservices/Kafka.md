#### Kafka's Key Components

1. **Topics:**
    
    - A **topic** is a named category to which producers send messages.
    - Example: `pricing-tasks` (stores tasks for portfolio repricing).
2. **Partitions:**
    
    - Each topic is divided into **partitions** for scalability and parallelism.
    - Partitions are append-only logs where each message gets a unique **offset**.
    - Example:
        
        `Partition 0: [Message 0, Message 1] Partition 1: [Message 2, Message 3] Partition 2: [Message 4, Message 5]`
        
3. **Offsets:**
    - Unique sequential numbers assigned to messages within a partition.
    - Track the position of the next message a consumer should process.
4. **Consumer Groups:**
    - A logical grouping of consumers working together to process messages from a topic.
    - Consumers in a group **split partitions** among themselves.
    - Each group has its own offset for independent processing.

---

#### Kafka's Message Delivery Model

- **Producers:**
    
    - Send messages to a topic, which are distributed across partitions.
    - Example: A producer sends portfolio repricing tasks to `pricing-tasks`.
- **Consumers:**
    
    - Consumers **pull** messages from partitions.
    - They can belong to a **consumer group** to share the workload.
    - Kafka ensures each partition is processed by only one consumer in a group at a time.

---

#### Partition Assignment in Consumer Groups

1. **Within a Consumer Group:**
    
    - Kafka divides partitions among consumers:
        - If partitions = consumers, each consumer processes one partition.
        - If partitions > consumers, some consumers process multiple partitions.
        - If partitions < consumers, some consumers remain idle.
2. **Across Consumer Groups:**
    
    - Multiple consumer groups can process the same topic independently.
    - Example:
        - Group A (`pricing-workers`) processes tasks for repricing.
        - Group B (`analytics-workers`) analyzes the same tasks.

---

#### **Dynamic Handling of Consumer Groups**

- Kafka does not need prior knowledge of how many consumer groups will consume a topic.
- When a consumer group connects:
    - Kafka tracks it by its **group ID**.
    - Offsets are stored for each group in the internal `__consumer_offsets` topic.
    - Consumer group metadata includes:
        - **Group ID**
        - **Members (active consumers)**
        - **Offsets for each partition**

---

#### **Message Processing in Kafka**

1. **Message Delivery Rules:**
    
    - A partition can only be processed by one consumer **within a group**.
    - Across groups, the same message can be consumed independently.
2. **How Kafka Tracks Processing:**
    - Consumers commit offsets after processing messages.
    - If a consumer crashes before committing:
        - Kafka reassigns the partition to another consumer in the group.
        - The new consumer starts from the last committed offset.
3. **Retention Policy:**
    - Messages are retained in partitions for a configurable time (e.g., 7 days).
    - They are not deleted upon consumption, allowing multiple consumer groups to process the same data.

---

#### **Kafka vs Traditional Queues**

|Feature|Kafka|Traditional Queues (e.g., SQS, RabbitMQ)|
|---|---|---|
|**Message Storage**|Retained in partitions for a set duration.|Deleted after consumption or timeout.|
|**Delivery Guarantee**|At-least-once or exactly-once (if configured).|At-least-once or exactly-once.|
|**Parallelism**|Based on partitions and consumer groups.|Based on message visibility and workers.|
|**Offset Tracking**|By consumers via committed offsets.|Queue tracks visibility and ACKs.|

---

#### **Kafka Example**

**Topic:** `pricing-tasks`  
**Partitions:** 3  
**Messages:**

`Partition 0: [Task A, Task B] Partition 1: [Task C] Partition 2: [Task D, Task E]`

**Consumer Groups:**

1. **Group A (`pricing-workers`):**
    
    - Consumer 1 -> Partition 0
    - Consumer 2 -> Partition 1
    - Consumer 3 -> Partition 2
2. **Group B (`analytics-workers`):**
    
    - Consumer 4 -> Partition 0
    - Consumer 5 -> Partition 1
    - Consumer 6 -> Partition 2

**Processing:**

- Group A handles repricing tasks, processing each partition independently.
- Group B processes the same partitions for analytics, independent of Group A.

---

#### Key Takeaways

1. **Topics and Partitions:**
    
    - Topics are divided into partitions for parallel processing.
    - Each partition is processed sequentially but can be consumed in parallel by different consumers.
2. **Consumer Groups:**
    
    - Consumers in the same group share work by dividing partitions.
    - Different consumer groups can process the same topic independently.
3. **Dynamic Scaling:**
    
    - Adding more consumers to a group increases parallelism up to the number of partitions.
    - Kafka automatically handles partition assignment.
4. **Reliability:**
    
    - Offsets ensure messages are processed exactly once (if configured properly).
    - Messages are retained for a configurable duration, allowing re-processing or late consumers.
5. **Kafka Does Not "Hide" Messages:**
    
    - Messages remain in partitions until consumed and retained per the configured retention policy.