import type { AtomicContext } from "./context";

export interface AtomicFhirpathConfig {
    engine: typeof AtomicFhirpath;
}

export interface FhirpathContext {
}

export interface FhirpathResult {
    result: any;
    errors: any[];
    warnings: any[];
    deferredActions: any[];
}

export class AtomicFhirpath {
    context: AtomicContext;
    constructor(context: AtomicContext) {
        this.context = context;
    }
    fhirpath(fhirpathContext: FhirpathContext, expression: string, resource: any): Promise<FhirpathResult> {
        return Promise.resolve({
            result: null,
            errors: [],
            warnings: [],
            deferredActions: []
        });
    }
} 