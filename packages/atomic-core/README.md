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
