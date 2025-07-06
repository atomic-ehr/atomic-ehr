# Telemetry

AtomicSystem provides a unified facade for OpenTelemetry logging, tracing and metrics through the `system.telemetry` interface.

## Configuration

Configure telemetry in your AtomicSystem:

```typescript
import { AtomicSystem, BasicAtomicTelemetry } from '@atomic-ehr/atomic-core';

const system = new AtomicSystem({
    telemetry: { engine: BasicAtomicTelemetry }
});

await system.init();
```

You can also configure the log level:

```typescript
const system = new AtomicSystem({
    telemetry: { 
        engine: BasicAtomicTelemetry, 
        level: "warn" // Only warn, error, and fatal messages will be logged
    }
});
```

### Predefined Metrics

You can predefine metrics in your telemetry configuration to ensure they're available immediately without manual creation:

```typescript
const system = new AtomicSystem({
    telemetry: {
        engine: BasicAtomicTelemetry,
        level: "info",
        metrics: {
            "http.requests": { type: "counter", description: "HTTP requests count" },
            "db.connections": { type: "counter", unit: "count", description: "Database connections" },
            "request.duration": { type: "histogram", unit: "ms", description: "Request duration" },
            "response.size": { type: "histogram", unit: "bytes", description: "Response size" },
            "memory.usage": { type: "gauge", unit: "MB", description: "Memory usage" },
            "active.sessions": { type: "gauge", description: "Currently active sessions" },
            "cpu.load": { type: "gauge" } // Minimal configuration
        }
    }
});

await system.init();
```

Benefits of predefined metrics:
- **Performance**: Metrics are created once during initialization
- **Consistency**: Ensures all metric names and options are standardized
- **Reliability**: Prevents runtime errors from missing metrics
- **Documentation**: Serves as a registry of all available metrics

## Usage

### Logging

```typescript
const USER_ID_ATTR = "user.id";
const ERROR_CODE_ATTR = "error.code";
const ERROR_MESSAGE_ATTR = "error.message";

// Basic logging
system.telemetry.log("User logged in", { [USER_ID_ATTR]: "123" });
system.telemetry.info("Info message", { sessionId: "abc-123" });
system.telemetry.error("Error message", { 
    [ERROR_CODE_ATTR]: "404", 
    [ERROR_MESSAGE_ATTR]: "Not found" 
});

// All log levels are supported
system.telemetry.trace("Trace message");
system.telemetry.debug("Debug message");
system.telemetry.warn("Warning message");
system.telemetry.fatal("Fatal message");

// You can also use the system-level API
system.log("Message");
system.info("Info message");
system.error("Error message");
```

### Tracing

```typescript
// Manual span management
const span = system.telemetry.startSpan("fhir.operation.x", { [USER_ID_ATTR]: "123" });
system.telemetry.info("Processing inside span");
system.telemetry.endSpan("fhir.operation.x");

// Automatic span management with callback
system.telemetry.span("fhir.operation.y", { [USER_ID_ATTR]: "123" }, (span) => {
    system.telemetry.info("Doing something", { traceId: span.traceId });
    // span automatically ends when callback completes
});
```

### Metrics

#### Using Predefined Metrics

If you've configured predefined metrics, you can use them immediately:

```typescript
// These metrics were predefined in configuration, so they're ready to use
system.telemetry.increment("http.requests");
system.telemetry.increment("db.connections", 3);

system.telemetry.record("request.duration", 150);
system.telemetry.record("response.size", 2048);

system.telemetry.record("memory.usage", 512);
system.telemetry.record("active.sessions", 25);
```

#### Creating Metrics Dynamically

You can still create metrics at runtime when needed:

```typescript
// Create and use counters
system.telemetry.createCounter("patient.request.count", {
    description: "Count of patient requests"
});

system.telemetry.increment("patient.request.count");
system.telemetry.increment("patient.request.count", 5); // increment by 5
```

#### Histograms
```typescript
// Track value distributions
system.telemetry.createHistogram("patient.request.duration", {
    unit: "ms",
    description: "Duration of patient requests"
});

system.telemetry.record("patient.request.duration", 100);
system.telemetry.record("patient.request.duration", 250);
```

#### Gauges
```typescript
// Track current values
system.telemetry.createGauge("memory.usage", {
    unit: "MB",
    description: "Current memory usage"
});

system.telemetry.record("memory.usage", 512);
system.telemetry.record("memory.usage", 1024); // overwrites previous value
```

## Practical Example

Here's a complete example of setting up telemetry for a FHIR server:

```typescript
import { AtomicSystem, BasicAtomicTelemetry } from '@atomic-ehr/atomic-core';

// Configure system with comprehensive telemetry
const system = new AtomicSystem({
    telemetry: {
        engine: BasicAtomicTelemetry,
        level: "info",
        metrics: {
            "fhir.requests.total": { type: "counter", description: "Total FHIR requests" },
            "fhir.requests.success": { type: "counter", description: "Successful FHIR requests" },
            "fhir.requests.error": { type: "counter", description: "Failed FHIR requests" },
            "patient.operations": { type: "counter", description: "Patient resource operations" },
            "db.queries": { type: "counter", description: "Database queries executed" },
            "fhir.request.duration": { type: "histogram", unit: "ms", description: "FHIR request duration" },
            "db.query.duration": { type: "histogram", unit: "ms", description: "Database query duration" },
            "resource.size": { type: "histogram", unit: "bytes", description: "FHIR resource size" },
            "active.connections": { type: "gauge", description: "Active client connections" },
            "memory.usage": { type: "gauge", unit: "MB", description: "Current memory usage" },
            "cache.size": { type: "gauge", unit: "entries", description: "Number of cached resources" }
        }
    }
});

await system.init();

// Usage in your FHIR server
async function handlePatientRequest(patientId: string) {
    // Start a span for the operation
    return system.telemetry.span("patient.fetch", { patientId }, async (span) => {
        const startTime = Date.now();
        
        try {
            // Log the incoming request
            system.telemetry.info("Fetching patient", { patientId });
            
            // Track the request
            system.telemetry.increment("fhir.requests.total");
            system.telemetry.increment("patient.operations");
            
            // Simulate database query
            const queryStart = Date.now();
            const patient = await fetchPatientFromDB(patientId);
            const queryDuration = Date.now() - queryStart;
            
            // Record database metrics
            system.telemetry.increment("db.queries");
            system.telemetry.record("db.query.duration", queryDuration);
            
            // Record resource size
            const resourceSize = JSON.stringify(patient).length;
            system.telemetry.record("resource.size", resourceSize);
            
            // Track success
            system.telemetry.increment("fhir.requests.success");
            
            const totalDuration = Date.now() - startTime;
            system.telemetry.record("fhir.request.duration", totalDuration);
            
            return patient;
        } catch (error) {
            // Track errors
            system.telemetry.increment("fhir.requests.error");
            system.telemetry.error("Patient fetch failed", { 
                patientId, 
                error: error.message 
            });
            throw error;
        }
    });
}

// Periodic system metrics
setInterval(() => {
    const memUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    system.telemetry.record("memory.usage", Math.round(memUsage));
    
    // Track active connections (example)
    const activeConns = getCurrentConnectionCount();
    system.telemetry.record("active.connections", activeConns);
}, 30000); // Every 30 seconds
```

## Log Levels

The telemetry system supports the following log levels in order of severity:

- `trace` - Most verbose, typically only enabled in development
- `debug` - Debug information
- `info` - General information (default level)
- `warn` - Warning messages
- `error` - Error messages
- `fatal` - Critical errors

When you set a log level, only messages at that level and above will be logged.

## Metric Options

All metrics support these configuration properties:

```typescript
interface MetricDefinition {
    type: 'counter' | 'histogram' | 'gauge';
    description?: string;  // Human-readable description
    unit?: string;        // Unit of measurement (e.g., "ms", "bytes", "count")
    attributes?: LogAttributes; // Additional metadata
}
```

Example with full options:

```typescript
const system = new AtomicSystem({
    telemetry: {
        engine: BasicAtomicTelemetry,
        metrics: {
            "api.requests": { 
                type: "counter",
                description: "Total API requests",
                unit: "count",
                attributes: { service: "patient-api" }
            }
        }
    }
});
```

## Custom Telemetry Implementation

Create your own telemetry engine by extending `AtomicTelemetry`:

```typescript
import { AtomicTelemetry, LogLevel, LogAttributes } from '@atomic-ehr/atomic-core';

class MyCustomTelemetry extends AtomicTelemetry {
    protected logLevel(level: LogLevel, body: any, attributes?: LogAttributes): void {
        // Your custom logging implementation
        console.log(`[${level}]`, body, attributes);
    }
    
    protected onSpanEnd(span: Span): void {
        // Your custom span handling
        console.log(`Span ${span.name} completed in ${span.endTime - span.startTime}ms`);
    }
}

// Use in configuration
const system = new AtomicSystem({
    telemetry: { engine: MyCustomTelemetry }
});
```

## Error Handling

If telemetry is not configured, the system will throw an error when you try to access it:

```typescript
const system = new AtomicSystem({}); // No telemetry config

// This will throw an error
system.telemetry.log("Message"); // Error: Telemetry not initialized
```

Make sure to either:
1. Configure telemetry in your system config
2. Call `system.init()` after creating the system
3. Handle the error appropriately in your application