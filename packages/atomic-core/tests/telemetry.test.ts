import { describe, it, expect, beforeEach } from "bun:test";
import { BasicAtomicTelemetry, type AtomicTelemetryConfig } from "../src/telemetry";
import { type AtomicContext, type AtomicConfig } from "../src/context";
import { AtomicSystem } from "../src/system";
import type { LogAttributes, LogLevel } from "../src/telemetry";

// Test implementation that captures logs for testing
class TestAtomicTelemetry extends BasicAtomicTelemetry {
    logs: Array<{ level: LogLevel; body: any; attributes?: LogAttributes; timestamp: string }> = [];
    
    constructor(context: AtomicContext, config: AtomicTelemetryConfig) {
        super(context, config);
        this.logs = [];
    }
    
    protected override logLevel(level: LogLevel, body: any, attributes?: LogAttributes): void {
        // Check if logging is enabled for this level
        if (this.config.level && !this.checkLevelEnabled(level)) {
            return;
        }

        this.logs.push({
            level,
            body,
            attributes,
            timestamp: new Date().toISOString()
        });
    }

    private checkLevelEnabled(level: LogLevel): boolean {
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

describe("AtomicTelemetry", () => {
    let system: AtomicSystem;
    let telemetry: TestAtomicTelemetry;

    beforeEach(async () => {
        const systemConfig: AtomicConfig = {
            telemetry: { engine: TestAtomicTelemetry}
        };
        system = new AtomicSystem(systemConfig);
        await system.init();
        telemetry = system.telemetry as TestAtomicTelemetry;
    });

    it("should provide unified telemetry interface", () => {
        expect(telemetry).toBeDefined();
        expect(typeof telemetry.log).toBe('function');
        expect(typeof telemetry.startSpan).toBe('function');
        expect(typeof telemetry.createCounter).toBe('function');
    });

    it("should support logging through telemetry", () => {
        system.telemetry!.log("Test message", { userId: "123" });
        system.telemetry!.info("Info message");
        system.telemetry!.error("Error message", { code: "E001" });
        
        expect(telemetry.logs).toHaveLength(3);
        expect(telemetry.logs[0]?.body).toBe("Test message");
        expect(telemetry.logs[0]?.level).toBe("info");
        expect(telemetry.logs[0]?.attributes?.userId).toBe("123");
        expect(telemetry.logs[1]?.body).toBe("Info message");
        expect(telemetry.logs[1]?.level).toBe("info");
        expect(telemetry.logs[2]?.body).toBe("Error message");
        expect(telemetry.logs[2]?.level).toBe("error");
        expect(telemetry.logs[2]?.attributes?.code).toBe("E001");
    });

    it("should support logging at different levels", () => {
        system.telemetry!.trace("Trace message");
        system.telemetry!.debug("Debug message");
        system.telemetry!.info("Info message");
        system.telemetry!.warn("Warning message");
        system.telemetry!.error("Error message");
        system.telemetry!.fatal("Fatal message");
        
        expect(telemetry.logs).toHaveLength(6);
        expect(telemetry.logs[0]?.level).toBe("trace");
        expect(telemetry.logs[1]?.level).toBe("debug");
        expect(telemetry.logs[2]?.level).toBe("info");
        expect(telemetry.logs[3]?.level).toBe("warn");
        expect(telemetry.logs[4]?.level).toBe("error");
        expect(telemetry.logs[5]?.level).toBe("fatal");
    });
}); 