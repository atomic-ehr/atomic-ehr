import type { AtomicContext } from "./context";

// Essential types and interfaces used by telemetry system
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogAttributes {
    [key: string]: any;
}

// OpenTelemetry-compatible instrumentation scope parameters
export interface InstrumentationScope {
    name: string;
    version?: string;
    schemaUrl?: string;
    attributes?: LogAttributes;
}

// OpenTelemetry-compatible LogRecord interface
export interface LogRecord {
    timestamp?: number;
    observedTimestamp?: number;
    severityNumber?: number;
    severityText?: string;
    body?: any;
    attributes?: LogAttributes;
    eventName?: string;
    traceId?: string;
    spanId?: string;
    traceFlags?: number;
    resource?: Record<string, any>;
    instrumentationScope?: InstrumentationScope;
}

// OpenTelemetry-compatible Logger interface
export interface Logger {
    /**
     * Emit a LogRecord to the processing pipeline.
     * This is the main method that follows OpenTelemetry specification.
     */
    emit(record: LogRecord): void;
    
    /**
     * Check if the Logger is enabled for the provided parameters.
     * This helps avoid computationally expensive operations when generating LogRecords.
     */
    enabled(severityNumber?: number, eventName?: string): boolean;
}

// OpenTelemetry-compatible LoggerProvider interface
export interface LoggerProvider {
    /**
     * Get a Logger instance.
     * This method accepts instrumentation scope parameters as per OpenTelemetry specification.
     */
    getLogger(
        name: string,
        version?: string,
        schemaUrl?: string,
        attributes?: LogAttributes
    ): Logger;
}

// Metric interfaces
export interface MetricOptions {
    description?: string;
    unit?: string;
    attributes?: LogAttributes;
}

export type MetricType = 'counter' | 'histogram' | 'gauge';

export interface MetricDefinition extends MetricOptions {
    type: MetricType;
}

export interface MetricsConfig {
    [metricName: string]: MetricDefinition;
}

export interface AtomicTelemetryConfig {
    engine: new (context: AtomicContext, config: AtomicTelemetryConfig) => AtomicTelemetry;
    level?: LogLevel;
    metrics?: MetricsConfig;
}

// Span interface for tracing
export interface Span {
    name: string;
    attributes?: LogAttributes;
    startTime: number;
    endTime?: number;
    traceId: string;
    spanId: string;
    parentSpanId?: string;
}

export interface Counter {
    name: string;
    options: MetricOptions;
    value: number;
}

export interface Histogram {
    name: string;
    options: MetricOptions;
    values: number[];
}

export interface Gauge {
    name: string;
    options: MetricOptions;
    value: number;
}

// Main telemetry interface combining logging, tracing, and metrics
export abstract class AtomicTelemetry {
    context: AtomicContext;
    config: AtomicTelemetryConfig;
    protected spans: Map<string, Span> = new Map();
    protected counters: Map<string, Counter> = new Map();
    protected histograms: Map<string, Histogram> = new Map();
    protected gauges: Map<string, Gauge> = new Map();

    constructor(context: AtomicContext, config: AtomicTelemetryConfig) {
        this.context = context;
        this.config = config;
    }

    async init(): Promise<void> {
        // Initialize predefined metrics if configured
        if (this.config.metrics) {
            Object.entries(this.config.metrics).forEach(([name, definition]) => {
                const options: MetricOptions = {
                    description: definition.description,
                    unit: definition.unit,
                    attributes: definition.attributes
                };

                switch (definition.type) {
                    case 'counter':
                        this.createCounter(name, options);
                        break;
                    case 'histogram':
                        this.createHistogram(name, options);
                        break;
                    case 'gauge':
                        this.createGauge(name, options);
                        break;
                    default:
                        console.warn(`Unknown metric type: ${definition.type} for metric: ${name}`);
                }
            });
        }
    }

    // === LOGGING METHODS ===
    
    /**
     * Log a message with attributes
     */
    log(body: any, attributes?: LogAttributes): void {
        this.info(body, attributes);
    }

    /**
     * Log a trace level message
     */
    trace(body: any, attributes?: LogAttributes): void {
        this.logLevel('trace', body, attributes);
    }

    /**
     * Log a debug level message
     */
    debug(body: any, attributes?: LogAttributes): void {
        this.logLevel('debug', body, attributes);
    }

    /**
     * Log an info level message
     */
    info(body: any, attributes?: LogAttributes): void {
        this.logLevel('info', body, attributes);
    }

    /**
     * Log a warning level message
     */
    warn(body: any, attributes?: LogAttributes): void {
        this.logLevel('warn', body, attributes);
    }

    /**
     * Log an error level message
     */
    error(body: any, attributes?: LogAttributes): void {
        this.logLevel('error', body, attributes);
    }

    /**
     * Log a fatal level message
     */
    fatal(body: any, attributes?: LogAttributes): void {
        this.logLevel('fatal', body, attributes);
    }

    /**
     * Abstract method for logging at specific levels
     */
    protected abstract logLevel(level: LogLevel, body: any, attributes?: LogAttributes): void;

    // === TRACING METHODS ===

    /**
     * Start a new span for tracing
     */
    startSpan(name: string, attributes?: LogAttributes): Span {
        const span: Span = {
            name,
            attributes,
            startTime: Date.now(),
            traceId: this.generateTraceId(),
            spanId: this.generateSpanId()
        };
        
        this.spans.set(name, span);
        return span;
    }

    /**
     * End a span
     */
    endSpan(name: string): void {
        const span = this.spans.get(name);
        if (span) {
            span.endTime = Date.now();
            this.onSpanEnd(span);
            this.spans.delete(name);
        }
    }

    /**
     * Execute a function within a span context
     */
    span<T>(name: string, attributes: LogAttributes | undefined, callback: (span: Span) => T): T {
        const span = this.startSpan(name, attributes);
        try {
            const result = callback(span);
            return result;
        } finally {
            this.endSpan(name);
        }
    }

    /**
     * Override this method to handle span completion
     */
    protected onSpanEnd(span: Span): void {
        // Override in implementations
    }

    // === METRICS METHODS ===

    /**
     * Create a counter metric
     */
    createCounter(name: string, options: MetricOptions = {}): Counter {
        const counter: Counter = {
            name,
            options,
            value: 0
        };
        this.counters.set(name, counter);
        return counter;
    }

    /**
     * Increment a counter
     */
    increment(name: string, value: number = 1): void {
        const counter = this.counters.get(name);
        if (counter) {
            counter.value += value;
        } else {
            // Auto-create counter if it doesn't exist
            const newCounter = this.createCounter(name);
            newCounter.value = value;
        }
    }

    /**
     * Create a histogram metric
     */
    createHistogram(name: string, options: MetricOptions = {}): Histogram {
        const histogram: Histogram = {
            name,
            options,
            values: []
        };
        this.histograms.set(name, histogram);
        return histogram;
    }

    /**
     * Create a gauge metric
     */
    createGauge(name: string, options: MetricOptions = {}): Gauge {
        const gauge: Gauge = {
            name,
            options,
            value: 0
        };
        this.gauges.set(name, gauge);
        return gauge;
    }

    /**
     * Record a value to a metric (histogram or gauge)
     */
    record(name: string, value: number): void {
        const histogram = this.histograms.get(name);
        if (histogram) {
            histogram.values.push(value);
            return;
        }

        const gauge = this.gauges.get(name);
        if (gauge) {
            gauge.value = value;
            return;
        }

        // Auto-create gauge if metric doesn't exist
        const newGauge = this.createGauge(name);
        newGauge.value = value;
    }

    // === UTILITY METHODS ===

    /**
     * Generate a unique trace ID
     */
    private generateTraceId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
     * Generate a unique span ID
     */
    private generateSpanId(): string {
        return Math.random().toString(36).substring(2, 15);
    }

    /**
     * Get current spans (for debugging)
     */
    getSpans(): Map<string, Span> {
        return new Map(this.spans);
    }

    /**
     * Get current counters (for debugging)
     */
    getCounters(): Map<string, Counter> {
        return new Map(this.counters);
    }

    /**
     * Get current histograms (for debugging)
     */
    getHistograms(): Map<string, Histogram> {
        return new Map(this.histograms);
    }

    /**
     * Get current gauges (for debugging)
     */
    getGauges(): Map<string, Gauge> {
        return new Map(this.gauges);
    }
}

// Basic implementation using console logging
export class BasicAtomicTelemetry extends AtomicTelemetry {
    constructor(context: AtomicContext, config: AtomicTelemetryConfig) {
        super(context, config);
    }

    protected logLevel(level: LogLevel, body: any, attributes?: LogAttributes): void {
        // Check if logging is enabled for this level
        if (this.config.level && !this.isLevelEnabled(level)) {
            return;
        }

        const timestamp = new Date().toISOString();
        const message = `[${timestamp}] [${level.toUpperCase()}] ${this.formatMessage(body)}`;
        
        if (attributes && Object.keys(attributes).length > 0) {
            console.log(message, attributes);
        } else {
            console.log(message);
        }
    }

    protected override onSpanEnd(span: Span): void {
        // Log span completion
        const duration = span.endTime ? span.endTime - span.startTime : 0;
        this.info(`Span completed: ${span.name}`, {
            ...span.attributes,
            duration: `${duration}ms`,
            traceId: span.traceId,
            spanId: span.spanId
        });
    }

    private formatMessage(body: any): string {
        if (typeof body === 'string') {
            return body;
        }
        return JSON.stringify(body);
    }

    private isLevelEnabled(level: LogLevel): boolean {
        if (!this.config.level) {
            return true;
        }

        const levelPriority: Record<LogLevel, number> = {
            trace: 0,
            debug: 1,
            info: 2,
            warn: 3,
            error: 4,
            fatal: 5
        };

        return levelPriority[level] >= levelPriority[this.config.level];
    }
} 