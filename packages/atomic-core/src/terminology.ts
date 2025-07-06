import type { AtomicContext } from "./context";

export interface AtomicFhirTerminologyConfig {
    engine: typeof AtomicFhirTerminology;
    url?: string;
}

export class AtomicFhirTerminology {
    context: AtomicContext;
    config: AtomicFhirTerminologyConfig;

    constructor(context: AtomicContext, config: AtomicFhirTerminologyConfig) {
        this.config = config;
        this.context = context;
    }

    lookup(codeSystem: string): Promise<string> {
        throw new Error("Not implemented");
    }

    expand(valueSet: string): Promise<string> {
        throw new Error("Not implemented");
    }

    validate(code: string, codeSystem: string): Promise<boolean> {
        throw new Error("Not implemented");
    }

    translate(code: string, codeSystem: string, targetCodeSystem: string): Promise<string> {
        throw new Error("Not implemented");
    }
} 