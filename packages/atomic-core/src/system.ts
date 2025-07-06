import type { AtomicRepository, AtomicRepositoryConfig } from "./repository";
import type { AtomicFhirTerminology, AtomicFhirTerminologyConfig } from "./terminology";
import type { AtomicService, AtomicServiceConfig } from "./service";
import type { AtomicLogger, AtomicLoggerConfig } from "./logger";
import type { AtomicFhirpath, AtomicFhirpathConfig, FhirpathContext, FhirpathResult } from "./fhirpath";
import type { AtomicContext } from "./context";
import type { AtomicConfig } from "./config";
import type { AtomicMeta, AtomicResource, AtomicCanonicalResource } from "./resource";
import type { AtomicTelemetry, AtomicTelemetryConfig } from "./telemetry";
import type { AtomicFhirRegistry, AtomicFhirRegistryConfig, AtomicFhirResolutionOptions } from "./registry";
import type { AtomicValidator, AtomicValidationOptions, AtomicValidationOutcome } from "./validation";

export class AtomicSystem {
  private config: AtomicConfig;
  loggers: AtomicLogger[] = [];

  constructor(config: AtomicConfig) {
    this.config = config;
  }

  async init(): Promise<void> {
    this.config.logger?.forEach(async loggerConfig => {
        try {
            const loggerInstance = new loggerConfig.engine(this as unknown as AtomicContext, loggerConfig);
            await loggerInstance.init();
            this.loggers.push(loggerInstance);
        } catch (error) {
            console.error('Error initializing logger', loggerConfig, error);
        }
    });
  }

  log(message: string): void {
    this.loggers.forEach(logger => logger.log(message));
  }

  info(message: string): void {
    this.loggers.forEach(logger => logger.info(message));
  }

  warn(message: string): void {
    this.loggers.forEach(logger => logger.warn(message));
  }

  error(message: string): void {
    this.loggers.forEach(logger => logger.error(message));
  }

  debug(message: string): void {
    this.loggers.forEach(logger => logger.debug(message));
  }

  trace(message: string): void {
    this.loggers.forEach(logger => logger.trace(message));
  }


}











