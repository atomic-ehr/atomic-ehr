import type { AtomicContext } from "./context";
import type { AtomicCanonicalResource } from "./resource";

export interface AtomicFhirResolutionOptions {
}

export interface AtomicFhirRegistryConfig {
    engine: new (context: AtomicContext, config: AtomicFhirRegistryConfig) => AtomicFhirRegistry;
    packages?: string[];
}

export abstract class AtomicFhirRegistry {
    context: AtomicContext;
    constructor(context: AtomicContext, config: AtomicFhirRegistryConfig) {
        this.context = context;
    }

    abstract init(): Promise<void>;
    abstract listPackages(): Promise<string[]>;
    abstract getPackage(packageName: string): Promise<string>;
    abstract resolve(resolutionContext: AtomicFhirResolutionOptions, canonical: string): Promise<AtomicCanonicalResource>;
} 