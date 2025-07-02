A content delivery network (CDN) is a system of servers that speeds up the delivery of web content to users by storing copies of files in data centers closer to the use.


We discussed how **CDNs** cache content by storing copies of files like videos, images, and static assets on geographically distributed edge servers to improve performance, reduce latency, and decrease origin server load. Cached files remain valid until their **TTL (Time-to-Live)** expires, based on `Cache-Control` or `Expires` headers.

If a cached file, like `vid.mp4`, is updated on the origin server before the TTL expires, the CDN will still serve the stale file unless additional mechanisms are used:

1. **Cache Validation**: Using `ETag` or `Last-Modified` headers, the CDN can conditionally check the origin for updates and fetch the file if it has changed.
2. **Cache Purging**: Explicitly removing stale files from the CDN cache through APIs or dashboards.
3. **Versioned URLs**: Adding query strings (e.g., `vid.mp4?v=2`) or hashing filenames ensures the CDN treats updated files as new resources.
4. **Stale-While-Revalidate**: Serves stale content while asynchronously fetching updates from the origin.

Finally, we covered **best practices**, like enabling validation headers, using versioning, purging stale caches for frequently updated files, and balancing TTL durations for efficiency and freshness. These strategies ensure CDNs serve updated files promptly without waiting for TTL expiry.