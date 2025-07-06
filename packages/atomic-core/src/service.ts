import type { AtomicContext } from "./context";

export interface AtomicServiceConfig {
    engine: typeof AtomicService;
}

export class AtomicService {
    context: AtomicContext;
    config: AtomicServiceConfig;
    constructor(context: AtomicContext, config: AtomicServiceConfig) {
        this.context = context;
        this.config = config;
    } 
    init(): Promise<void> {
        return Promise.resolve();
    }

    deinit(): Promise<void> {
        return Promise.resolve();
    }
} 