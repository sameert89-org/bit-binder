> Chain of responsibility allows you pass a request through a chain of handlers.

## Example: Amazon customer service
All of us have tried to reach the unreachable amazon customer service, I swear that this feels harder than using AWS console sometimes. 

In the service industry there are levels of service personnel, if one cannot resolve your query they escalate it to their higher-up.

![[Pasted image 20260629145256.png]]


## Example: Middleware
Middleware are the classic example of chain of responsibility. A typical middleware flow looks like this:

![[Chain of Responsibility 2026-07-24 13.37.49.excalidraw]]
Its normal to have multiple middleware that are chained together one after another such as: Auth, CORS, Logging, ExceptionHandling etc.

These all follow the chain of responsibility, each has its own and it sends the request down once it has fulfilled its responsibility or terminates it.

```csharp
using System.Diagnostics;

namespace MyApp.Middleware;

public sealed class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();

        try
        {
            _logger.LogInformation(
                "Started {Method} {Path}",
                context.Request.Method,
                context.Request.Path);

            await _next(context);
        }
        finally
        {
            stopwatch.Stop();

            _logger.LogInformation(
                "Completed {Method} {Path} with {StatusCode} in {ElapsedMilliseconds} ms",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds);
        }
    }
}
```

The Middleware execute in the order they are added to the pipeline for example in C# its `app.UseMiddleware<RequestLoggingMiddleware>()`. 

The middleware execution behaves like nested function calls.