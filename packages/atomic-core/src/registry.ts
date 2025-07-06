import type { AtomicContext } from "./context";
import type { AtomicCanonicalResource } from "./resource";

export interface AtomicFhirResolutionOptions {
}

export interface AtomicFhirRegistryConfig {
    engine: typeof AtomicFhirRegistry;
    packages?: string[];
}

export class AtomicFhirRegistry {
    context: AtomicContext;
    constructor(context: AtomicContext, config: AtomicFhirRegistryConfig) {
        this.context = context;
    }
    resolve(resolutionContext: AtomicFhirResolutionOptions, canonical: string): Promise<AtomicCanonicalResource> {
        throw new Error('Not implemented');
    }
} 