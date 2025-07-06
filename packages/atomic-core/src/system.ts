import type { AtomicRepository, AtomicRepositoryConfig } from "./repository";
import type { AtomicFhirTerminology, AtomicFhirTerminologyConfig } from "./terminology";
import type { AtomicService, AtomicServiceConfig } from "./service";
import type { LogAttributes } from "./telemetry";
import type { AtomicFhirpath, AtomicFhirpathConfig, FhirpathContext, FhirpathResult } from "./fhirpath";
import type { AtomicContext } from "./context";
import type { AtomicConfig } from "./config";
import type { AtomicMeta, AtomicResource, AtomicCanonicalResource } from "./resource";
import type { AtomicTelemetry, AtomicTelemetryConfig } from "./telemetry";
import type { AtomicFhirRegistry, AtomicFhirRegistryConfig, AtomicFhirResolutionOptions } from "./registry";
import type { AtomicValidator, AtomicValidationOptions, AtomicValidationOutcome } from "./validation";

export class AtomicSystem implements AtomicContext {
  config: AtomicConfig;
  telemetry?: AtomicTelemetry;
  registry?: AtomicFhirRegistry;
  constructor(config: AtomicConfig) {
    this.config = config;
  }
  async init(): Promise<void> {
    if (this.config.telemetry) {
      this.telemetry = new this.config.telemetry.engine(
        this as unknown as AtomicContext,
        this.config.telemetry
      );
      await this.telemetry.init();
    }

    if (this.config.registry) {
      this.registry = new this.config.registry.engine(
        this as unknown as AtomicContext,
        this.config.registry
      );
      await this.registry.init();
    }
  }
}











