# @atomic-ehr/core

A modular, plugin-based FHIR server framework built in TypeScript. Atomic Core provides the foundational architecture for building scalable, extensible FHIR servers with customizable components.

## Overview

Atomic Core is designed around the principle of modularity, where each component of the FHIR server can be independently configured, extended, or replaced. It provides a type-safe foundation for building FHIR-compliant healthcare applications.

## Architecture

### Core Components

#### 🏗️ **System (`AtomicSystem`)**
The main orchestrator that initializes and manages all system components. It provides the entry point for configuration and startup.

#### 🗄️ **Repository (`AtomicRepository`)**
The data access layer that handles FHIR resource persistence. Provides standard CRUD operations with strong typing:

- **Read**: Retrieve resources by ID
- **Create**: Create new resources with validation
- **Update**: Update existing resources
- **Upsert**: Create or update resources
- **Delete**: Remove resources
- **Search**: Query resources with FHIR search parameters
- **History**: Track resource versions and changes
- **Bulk Operations**: Handle multiple resources efficiently

#### 🔐 **Authentication & Authorization (`AtomicAuth`)**
Comprehensive security framework supporting:

- **Authentication**: User and client authentication
- **Authorization**: Role-based access control
- **Session Management**: Token-based sessions with expiration
- **Audit Logging**: Complete audit trail for compliance
- **FHIR Resource Linking**: Link sessions to FHIR resources (Patient, Practitioner, etc.)

#### 📋 **Resource Management (`AtomicResource`)**
FHIR resource handling with:

- **Metadata**: Version tracking, timestamps, and provenance
- **Canonical Resources**: URL-based resource identification
- **Type Safety**: Strong TypeScript typing for FHIR resources

#### ✅ **Validation (`AtomicValidator`)**
Resource validation framework with:

- **Structure Validation**: Verify resource structure
- **Terminology Validation**: Validate coded values
- **Reference Validation**: Check resource references
- **Extension Validation**: Validate custom extensions

#### 📚 **Terminology Services (`AtomicFhirTerminology`)**
FHIR terminology operations:

- **Lookup**: Retrieve concept definitions
- **Expand**: Expand value sets
- **Validate**: Validate coded values
- **Translate**: Convert between code systems

#### 🔍 **FHIRPath (`AtomicFhirpath`)**
Expression evaluation for FHIR resources, enabling:

- **Resource Queries**: Extract data from FHIR resources
- **Conditional Logic**: Implement business rules
- **Data Transformation**: Transform resource data

#### 📦 **Registry (`AtomicFhirRegistry`)**
Canonical resource resolution for:

- **FHIR Packages**: Load and manage FHIR packages
- **Resource Resolution**: Resolve canonical URLs to resources
- **Version Management**: Handle resource versioning

#### 🔧 **Services (`AtomicService`)**
Plugin-based service architecture for extending functionality with custom business logic.

#### 📊 **Logging & Telemetry**
- **Structured Logging**: Configurable log levels and formats
- **Metrics Collection**: Performance and usage metrics
- **Monitoring**: Health checks and diagnostics

#### ⚙️ **Configuration (`AtomicConfig`)**
Type-safe configuration system supporting:

- **Environment-based Configuration**: Different configs for different environments
- **Plugin Configuration**: Configure each component independently
- **Validation**: Ensure configuration correctness

#### 🔄 **Context (`AtomicContext`)**
Dependency injection and context passing throughout the system, providing access to all configured services and repositories.

## Plugin Architecture

Atomic Core uses a plugin-based architecture where each component can be extended or replaced:

```typescript
// Example: Custom repository implementation
class MyCustomRepository extends AtomicRepository {
  async read(options: AtomicReadOptions): Promise<AtomicReadResult> {
    // Custom implementation
  }
}

// Configuration
const config: AtomicConfig = {
  repos: {
    'Patient': {
      engine: MyCustomRepository,
      // Custom configuration
    }
  }
}
```

## Key Features

- **🔒 Type Safety**: Full TypeScript support with comprehensive type definitions
- **🔌 Plugin Architecture**: Extensible design for custom implementations
- **📊 FHIR Compliance**: Built with FHIR R4 standards in mind
- **🏗️ Modular Design**: Use only the components you need
- **⚡ Performance**: Async/await throughout for optimal performance
- **🔍 Comprehensive Validation**: Multiple validation layers for data integrity
- **📈 Observability**: Built-in logging, metrics, and telemetry
- **🔐 Security First**: Complete authentication and authorization framework

## Getting Started

### Installation

```bash
bun add @atomic-ehr/core
```

### Basic Usage

```typescript
import { AtomicSystem, AtomicConfig } from '@atomic-ehr/core';

// Configure your system
const config: AtomicConfig = {
  logger: { engine: ConsoleLogger },
  registry: [{ engine: FhirRegistry }],
  terminology: [{ engine: TerminologyService }],
  fhirpath: { engine: FhirPathEngine },
  auth: [{ engine: AuthService }],
  telemetry: [{ engine: TelemetryService }],
  services: {
    'custom-service': { engine: CustomService }
  },
  repos: {
    'Patient': { engine: PatientRepository },
    'Practitioner': { engine: PractitionerRepository }
  }
};

// Initialize system
const system = new AtomicSystem(config);
await system.init();
```

## Development

### Type Checking

```bash
bun run typecheck
```

### Building

```bash
bun run build
```

## Contributing

Atomic Core is designed to be extended. Common extension points include:

- **Custom Repositories**: Implement data persistence for your needs
- **Authentication Providers**: Add support for different auth systems
- **Terminology Services**: Connect to external terminology servers
- **Validation Rules**: Implement custom validation logic
- **Business Services**: Add domain-specific business logic

## License

[License information would go here]

## Support

[Support information would go here]

## Features

### OpenTelemetry-Compatible Structured Logging

The logging system is fully compatible with the [OpenTelemetry Logs API specification](https://opentelemetry.io/docs/specs/otel/logs/api/#emit-a-logrecord), providing structured logging with attributes, trace correlation, and configurable log levels.

#### Key Features

- **OpenTelemetry Compatibility**: Full compliance with OpenTelemetry Logs API specification
- **Structured Logging**: Rich attributes and context for better observability
- **Trace Correlation**: Automatic correlation with distributed tracing
- **Configurable Levels**: Support for all standard log levels (trace, debug, info, warn, error, fatal)
- **Instrumentation Scope**: Proper identification of log sources
- **Performance Optimized**: Built-in `enabled()` checks to avoid expensive operations

#### Basic Usage

```typescript
import { AtomicSystem, AtomicConfig } from '@atomic-ehr/core';

// Configure logging
const config: AtomicConfig = {
  logger: [{ 
    engine: ConsoleLogger,
    level: 'info' // Optional: filter logs by level
  }],
  // ... other configuration
};

const system = new AtomicSystem(config);
await system.init();

// Simple logging
system.info("User logged in", { 
  userId: "123", 
  sessionId: "abc-123" 
});

// Error logging with context
system.error("Database connection failed", {
  error: "ECONNREFUSED",
  host: "localhost",
  port: 5432,
  operation: "user-fetch"
});
```

#### OpenTelemetry-Compatible API

The logging system implements the full OpenTelemetry Logs API:

```typescript
// Using the Logger interface directly
const logger = system.loggers[0];

// Check if logging is enabled (performance optimization)
if (logger.enabled(9)) { // INFO level
  logger.emit({
    timestamp: Date.now() * 1000000,
    observedTimestamp: Date.now() * 1000000,
    severityNumber: 9,
    severityText: "INFO",
    body: "Custom log record",
    attributes: { 
      userId: "123",
      operation: "data-processing"
    },
    eventName: "user.data.processed"
  });
}
```

#### LoggerProvider Pattern

For advanced usage, you can implement the LoggerProvider pattern:

```typescript
import { AtomicLoggerProvider, InstrumentationScope } from '@atomic-ehr/core';

class CustomLoggerProvider extends AtomicLoggerProvider {
  protected createLogger(instrumentationScope: InstrumentationScope): AtomicLogger {
    return new CustomLogger(this.context, this.config, instrumentationScope);
  }
}
```

#### Custom Logger Implementation

```typescript
import { AtomicLogger, LogRecord, InstrumentationScope } from '@atomic-ehr/core';

class CustomLogger extends AtomicLogger {
  constructor(context: AtomicContext, config: AtomicLoggerConfig, instrumentationScope: InstrumentationScope) {
    super(context, config, instrumentationScope);
  }

  emit(record: LogRecord): void {
    // Custom log processing logic
    console.log(JSON.stringify({
      timestamp: record.timestamp,
      level: record.severityText,
      message: record.body,
      attributes: record.attributes,
      scope: record.instrumentationScope?.name,
      traceId: record.traceId,
      spanId: record.spanId
    }));
  }
}
```

#### Log Levels and Severity Numbers

Following OpenTelemetry standards:

| Level | Severity Number | Description |
|-------|----------------|-------------|
| trace | 1 | Detailed debugging information |
| debug | 5 | Debug-level messages |
| info  | 9 | Informational messages |
| warn  | 13 | Warning messages |
| error | 17 | Error conditions |
| fatal | 21 | Fatal error conditions |

#### Trace Correlation

When tracing is enabled, logs are automatically correlated with spans:

```typescript
// Logs will include traceId and spanId when available
system.info("Processing user request", {
  userId: "123",
  operation: "profile-update"
});
// Output includes: traceId, spanId, traceFlags
```

This OpenTelemetry-compatible logging system provides a foundation for comprehensive observability in distributed healthcare systems, enabling better monitoring, debugging, and compliance tracking.
