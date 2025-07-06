import type { AtomicContext } from "./context";

export interface AtomicTelemetryConfig {
    engine: typeof AtomicTelemetry;
}

export class AtomicTelemetry {
    context: AtomicContext;
    config: AtomicTelemetryConfig;

    constructor(context: AtomicContext, config: AtomicTelemetryConfig) {
        this.context = context;
        this.config = config;
    }
} 