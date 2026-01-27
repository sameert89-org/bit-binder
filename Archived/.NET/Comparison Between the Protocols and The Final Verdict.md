In the scope of the POC, two protocols (MQTT & AMQP) were analyzed for effective communication between Zeiss VTS devices. This section highlights a comparison between the two, focusing on key points like *ease of implementation*, *pros & cons* etc.

# AMQP

### Ease of Implementation
- For our specific use scenario (topic with n subscribers), AMQP does not offer a direct way to achieve that, however it is extremely powerful and flexible. We can use its queues and exchanges and set it up to work with our use case.
- Working with **RabbitMQ broker** was extremely easy due to its popularity and a large community and user knowledge base. They have extensive documentation for everything.
- On the other hand, the client library **AMQPNetLite** was not easy to work with, it has very little documentation and no active community. The first roadblock is rabbitmq leading with AMQP 0-9-1 while AMQPNetLite pushing for AMQP 1.0.
- Setting up docker compose for AMQP was a breeze, issues were faced however is managing configurations and running user creation scripts inside the container, again in the community someone has always faced the specific issue therefore solving these were not a big task.

### Pros
- AMQP protocol is very flexible, can have the configuration exactly to our liking.
- Offers great reliability. Handles client disconnections very well with queues retaining messages until delivery.
- Can handle high throughput and large file transfers. We can transfer binary data over the queues.
- Offers a great management plugin for free, it also has a good HTTP API that is well documented.
- Good community support.

### Cons
- The most popular client was hard to work with.
- No GUI clients for easy testing of the broker.
- Its a heavier protocol, the broker will consume more resources and has a larger overhead.

### Deployment

- Broker can be installed in Zeiss server box directly as they provide binaries for the same, but the custom management wrapper will require additional setup in the case.
- The whole package can be deployed in one go using docker compose but docker will come with its own overhead, i.e being installed and configured on the system.
- For systems already out, we will have to provide a software package that installs and configures rabbitmq and registers a service to autostart it everytime, and also takes care of loading the management server and its comms.


# MQTT
### Ease of Implementation
- Working with MQTT broker (Mosquitto) was a challenge, the documentation is nothing but a bunch of man-pages with tool descriptions. The community support while its not non-existent but definitely way less compared to RabbitMQ.
- Working with client here (MQTTNet) was a breeze, they provide prewritten examples for almost all scenarios possible (due to simplicity of the protocol this is possible). They have a great github space, you can discuss things and its answered very quickly.
- Setting up docker-compose was easy enough, the auth configuration was much more easier compared to RabbitMQ.

### Pros
- Lightweight protocol, lightweight broker and lightweight clients. 
- Provides 1-1 configuration (topic with n-subscribers) for our usecase. 
- Good reliability using MQTT QoS settings.
- MQTT as a protocol has very good documentation and clear specifications.

### Cons
- No free to use management plugin, both major brokers (Mosquitto and HiveMQ) offer management as a paid addon, mosquitto had a management plugin for free but later it was made paid. The last community version (2.2) which this POC uses still works, but the HTTP Api is paywalled there. For HiveMQ the plugin is paid as well.
- Bad documentation for the broker.
- MQTT v5 is still in its infancy most clients have partial support for it.

### Deployment
- Similar to AMQP, broker does provide binaries, and if we get a subscription for the management service, then we can develop it using the API.