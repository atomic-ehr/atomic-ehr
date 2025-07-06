import { describe, it, expect, beforeEach } from "bun:test";
import { AtomicLogger, type AtomicLoggerConfig } from "../src/logger";
import { type AtomicContext } from "../src/context";
import type { AtomicConfig } from "../src/config";
import { AtomicSystem } from "../src/system";

class TestLogger extends AtomicLogger {
    logs: Record<string, {message: string, timestamp: string}[]> = {};
    constructor(context: AtomicContext, config: AtomicLoggerConfig) {
        console.log('init test logger');
        super(context, config);
        this.logs = {
            log: [],
            info: [],
            warn: [],
            error: [],
            debug: [],
            trace: []
        };
    }
    log(message: string): void {
        this.logs['log']?.push({message, timestamp: new Date().toISOString()});
    }
    info(message: string): void {
        this.logs['info']?.push({message, timestamp: new Date().toISOString()});
    }
    warn(message: string): void {
        this.logs['warn']?.push({message, timestamp: new Date().toISOString()});
    }
    error(message: string): void {
        this.logs['error']?.push({message, timestamp: new Date().toISOString()});
    }
    debug(message: string): void {
        this.logs['debug']?.push({message, timestamp: new Date().toISOString()});
    }
    trace(message: string): void {
        this.logs['trace']?.push({message, timestamp: new Date().toISOString()});
    }
}

describe("AtomicLogger", () => {
    let system: AtomicSystem;
    let logger: TestLogger;

    beforeEach(async () => {
        const systemConfig: AtomicConfig = {
            logger: [{ engine: TestLogger }],
        };
        system = new AtomicSystem(systemConfig);
        await system.init();
        logger = system.loggers[0] as TestLogger;
    });

    it("should log messages", () => {
        system.log("Hello");
        system.log("Hello2");
        
        expect(logger.logs.log).toHaveLength(2);
        expect(logger.logs.log![0]?.message).toBe("Hello");
        expect(logger.logs.log![1]?.message).toBe("Hello2");
    });

    it("should log info messages", () => {
        system.info("Info message");
        
        expect(logger.logs.info).toHaveLength(1);
        expect(logger.logs.info![0]?.message).toBe("Info message");
    });

    it("should log error messages", () => {
        system.error("Error message");
        
        expect(logger.logs.error).toHaveLength(1);
        expect(logger.logs.error![0]?.message).toBe("Error message");
    });
}); 