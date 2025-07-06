import type { AtomicContext } from "./context";

export interface AtomicLoggerConfig {
    engine: new (context: AtomicContext, config: AtomicLoggerConfig) => AtomicLogger;
    level?: 'debug' | 'info' | 'warn' | 'error' | 'trace';
}

export abstract class AtomicLogger {
    context: AtomicContext;
    config: AtomicLoggerConfig;
    constructor(context: AtomicContext, config: AtomicLoggerConfig) {
        this.context = context;
        this.config = config;
    }
    async init(): Promise<void> {
        // do nothing
    }
    abstract log(message: string): void;
    abstract info(message: string): void;
    abstract warn(message: string): void;
    abstract error(message: string): void;
    abstract debug(message: string): void;
    abstract trace(message: string): void;
} 