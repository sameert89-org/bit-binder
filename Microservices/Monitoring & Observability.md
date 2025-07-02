>[!QUOTE]  
>*"We replaced our monolith with microservices so that every outage can be more like a murder mystery.*

**Observability:** The observability of a system is the extent to which you can understand the internal state of the system from external outputs.

*MELT:* Four core pillars of Observability, Metrics, Events, Logs and Traces).

# CORE Concepts

**Log Aggregation:** Collecting log generated across multiple microservices.
**Metric Aggregation:** Capturing raw numbers from microservices and infrastructure.
**Distributed Tracing:** Tracking a flow of calls across multiple microservice boundaries.

> [!INFO] SLAs, SLOs & SLIs
> Service Level Agreements are formal agreements b/w a service provider and a customer. It defines the level of service expected, including metrics, responsibilities and consequences if the agreed SLA is not met.
> Service Level Objectives on the other hand are internal targets that define the performance and reliability of a service. Typically stricter than SLAs to ensure SLAs are met.
> Service Level Indicators are measure of something our software does, for example the response time for a process, SLOs define many SLIs.


## Log Aggregation

![[Pasted image 20241217111503.png#invert_B]]

**Sticking to a Log Format:** There is no standard that has gained enough traction as of 2024. 


> [!INFO] Products in the Logging Space
> Using a <mark style="background: #FF5582A6;">log forwarder</mark> like Fluentd to forward to ElasticSearch using Kibana as a data cleaner middleman. Splunk, Humio and Datadog. CloudWatch for AWS and Application Insights for Azure.

## Metrics Aggregation

> [!TIP]
> The secret to knowing when to panic and when to relax is to gather metrics about how your system behaves over a long-enough period of time that clear patterns emerge.

Response times, CPU, disk and Memory usage. 
**Cardinality:** In a database, cardinality refers to the relationship between data in two tables. It shows how many times a specific entity occurs in comparison to another. For example, in an auto repair shop database, a mechanic works with multiple customers every day, so the relationship is one mechanic to many customers.

> [!INFO] Products in the Metrics Aggregation Space
> For low cardinality, you ave Prometheus, for high cardinality we have Honeycomb or Lightstep

## Distributed Tracing

> [!INFO] Alerts
> The purpose of alerts is to direct the user’s attention towards significant aspects of the operation or equipment that require timely attention. An alert should be *Relevant, Unique, Timely, Prioritized, Understandable, Clear, Advisory On What Should be Done, Focusing.*

**Real User Monitoring:** What actually is happening to our product in production, metrics such as how many users signed up, these are considered "business" metrics. We can expose these to production tooling. The challenge with this is, Real user data is noisy.

