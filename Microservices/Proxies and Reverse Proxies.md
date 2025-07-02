Proxy is an intermediate server that sits between the client and a server. It forwards the requests from the client to the server.

There are 2 types of proxies:
1. Forward Proxy: Client is aware of this proxy and it just acts as middleman to forward request to 1 backend.
2. Reverse Proxy: Client is unaware of this proxy, it appears as if its talking to the concerned server. It forwards a request to the appropriate backend from a pool of backends.


The reason of fwd and rev in their names, is that fwd proxy hides the client from the server, whereas reverse proxy hides the server from the client (while also hiding the client but we dont care about that do we)
ps naming is hard.