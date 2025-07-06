# AtomicFHIR Registry System

The AtomicFHIR Registry system provides a pluggable architecture for resolving FHIR canonical resources (like StructureDefinitions, ValueSets, CodeSystems, etc.) from various sources. This system enables applications to resolve FHIR resources by their canonical URLs without needing to know the specific storage mechanism.

## Overview

The registry pattern allows the AtomicFHIR system to:
- Resolve FHIR resources by canonical URLs
- Support multiple registry implementations (npm packages, file system, remote servers, etc.)
- Cache resolved resources for performance
- Manage package-based FHIR resource distribution
- Provide a unified interface for resource resolution

## Architecture

### Core Interface: `AtomicFhirRegistry`

The `AtomicFhirRegistry` is an abstract base class that defines the contract for all registry implementations:

```typescript
abstract class AtomicFhirRegistry {
    context: AtomicContext;
    
    constructor(context: AtomicContext, config: AtomicFhirRegistryConfig);
    
    abstract init(): Promise<void>;
    abstract listPackages(): Promise<string[]>;
    abstract getPackage(packageName: string): Promise<string>;
    abstract resolve(resolutionContext: AtomicFhirResolutionOptions, canonical: string): Promise<AtomicCanonicalResource>;
}
```

### Configuration

Registry configuration is defined through the `AtomicFhirRegistryConfig` interface:

```typescript
interface AtomicFhirRegistryConfig {
    engine: new (context: AtomicContext, config: AtomicFhirRegistryConfig) => AtomicFhirRegistry;
    packages?: string[];
}
```

## NodeModulesRegistry Implementation

The `NodeModulesRegistry` is a concrete implementation that uses npm/bun packages to manage FHIR resources. It's particularly useful for working with official FHIR packages and implementation guides.

### Features

- **Package Management**: Automatically installs and manages FHIR packages using bun
- **Resource Resolution**: Resolves canonical URLs to actual FHIR resources
- **Caching**: Caches resolved resources in memory for performance
- **Index Support**: Uses `.index.json` files to map canonical URLs to resource files
- **Custom Registry Support**: Supports custom npm registries (like FHIR package registries)

### Configuration

```typescript
interface NodeModulesRegistryConfig extends AtomicFhirRegistryConfig {
    registryUrl: string;        // NPM registry URL (e.g., "https://fs.get-ig.org/pkgs/")
    workingDirectory: string;   // Directory for package installation
    packages?: string[];        // List of packages to install
}
```

### Usage Example

```typescript
import { AtomicSystem } from "atomic-core";
import { NodeModulesRegistry } from "atomic-core/registry/node-modules-registry";

const system = new AtomicSystem({
    registry: {
        engine: NodeModulesRegistry,
        registryUrl: "https://fs.get-ig.org/pkgs/",
        workingDirectory: ".atomic/packages",
        packages: [
            "hl7.fhir.r4.core",
            "hl7.fhir.us.core"
        ]
    }
});

// Initialize the system (installs packages)
await system.init();

// Resolve a StructureDefinition
const patientStructDef = await system.registry.resolve(
    {}, 
    "http://hl7.org/fhir/StructureDefinition/Patient"
);

if (patientStructDef.status === 'success') {
    console.log('Patient StructureDefinition:', patientStructDef.resource);
}
```

## How It Works

### Initialization Process

1. **Directory Setup**: Creates the working directory if it doesn't exist
2. **Package.json Creation**: Creates a package.json file for dependency management
3. **Package Installation**: Installs specified packages using bun
4. **Index Reading**: Reads `.index.json` files from installed packages
5. **Resource Mapping**: Creates internal mappings from canonical URLs to resource files

### Resource Resolution

1. **Lookup**: Searches through all installed packages for the canonical URL
2. **File Loading**: Loads the actual resource file from the package
3. **Caching**: Caches the loaded resource for subsequent requests
4. **Status Tracking**: Returns status information ('success' or 'not-found')

### Package Structure

FHIR packages are expected to have the following structure:
```
package-name/
├── package.json
├── .index.json          # Maps canonical URLs to files
└── package/
    ├── StructureDefinition-Patient.json
    ├── ValueSet-administrative-gender.json
    └── ...
```

The `.index.json` file contains entries like:
```json
{
  "files": [
    {
      "url": "http://hl7.org/fhir/StructureDefinition/Patient",
      "version": "4.0.1",
      "filename": "package/StructureDefinition-Patient.json",
      "resourceType": "StructureDefinition"
    }
  ]
}
```

## API Reference

### AtomicFhirRegistry Methods

#### `init(): Promise<void>`
Initializes the registry. This method must be called before using the registry.

#### `listPackages(): Promise<string[]>`
Returns a list of all installed package names.

#### `getPackage(packageName: string): Promise<string>`
Returns package information as a JSON string.

#### `resolve(resolutionContext: AtomicFhirResolutionOptions, canonical: string): Promise<AtomicCanonicalResource>`
Resolves a canonical URL to a FHIR resource.

**Parameters:**
- `resolutionContext`: Resolution options (currently unused)
- `canonical`: The canonical URL to resolve

**Returns:**
An `AtomicCanonicalResource` object with:
- `status`: 'success' or 'not-found'
- `url`: The canonical URL
- `resource`: The resolved FHIR resource (if found)
- `version`: Resource version (if available)
- `filename`: Original filename (if available)
- `resourceType`: FHIR resource type (if available)

### NodeModulesRegistry Additional Methods

#### `getPackageInfo(packageName: string): PackageInfo | undefined`
Returns detailed information about a specific package.

#### `getAllPackages(): Map<string, PackageInfo>`
Returns all package information as a Map.

## Integration with AtomicSystem

The registry is integrated into the AtomicSystem and can be accessed through the system context:

```typescript
// In any component with access to AtomicContext
const resource = await this.context.registry?.resolve(
    {}, 
    "http://hl7.org/fhir/StructureDefinition/Patient"
);
```

## Error Handling

The registry system includes comprehensive error handling:

- **Installation Errors**: Logged but don't prevent other packages from installing
- **File Read Errors**: Gracefully handled during resolution
- **Missing Resources**: Return 'not-found' status rather than throwing errors
- **Network Issues**: Handled during package installation

## Performance Considerations

- **Caching**: Resources are cached in memory after first resolution
- **Lazy Loading**: Resources are only loaded when first requested
- **Batch Operations**: Multiple packages can be installed during initialization
- **Index Optimization**: Uses index files for fast URL-to-file mapping

## Common Use Cases

### 1. FHIR Validation
```typescript
const structDef = await registry.resolve({}, resourceUrl);
if (structDef.status === 'success') {
    // Use structure definition for validation
}
```

### 2. Profile Resolution
```typescript
const profile = await registry.resolve({}, profileUrl);
// Use profile for data transformation or validation
```

### 3. Implementation Guide Support
```typescript
const system = new AtomicSystem({
    registry: {
        engine: NodeModulesRegistry,
        packages: [
            "hl7.fhir.us.core",
            "hl7.fhir.us.davinci-pdex"
        ]
    }
});
```

## Extending the Registry

To create a custom registry implementation:

1. Extend the `AtomicFhirRegistry` class
2. Implement all abstract methods
3. Define your custom configuration interface
4. Register your implementation in the system configuration

```typescript
class CustomRegistry extends AtomicFhirRegistry {
    async init(): Promise<void> {
        // Custom initialization logic
    }
    
    async resolve(context: AtomicFhirResolutionOptions, canonical: string): Promise<AtomicCanonicalResource> {
        // Custom resolution logic
    }
    
    // ... implement other methods
}
```