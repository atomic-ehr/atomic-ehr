import type { AtomicResourceRepository, AtomicResourceRepositoryConfig } from "./resource-repository";
import type { AtomicFhirTerminology, AtomicFhirTerminologyConfig } from "./terminology";
import type { AtomicService, AtomicServiceConfig } from "./service";
import type { LogAttributes } from "./telemetry";
import type { AtomicFhirpath, AtomicFhirpathConfig, FhirpathContext, FhirpathResult } from "./fhirpath";
import type { AtomicContext, AtomicConfig } from "./context";
import type { AtomicMeta, AtomicResource, AtomicCanonicalResource } from "./resource";
import type { AtomicTelemetry, AtomicTelemetryConfig } from "./telemetry";
import type { AtomicMinimalKnowledgeRepository, AtomicKnowledgeRepositoryConfig, AtomicKnowledgeRepositoryOptions } from "./knowledge-repository";
import type { AtomicValidator, AtomicValidationOptions, AtomicValidationOutcome } from "./validation";

export class AtomicSystem implements AtomicContext {
  config: AtomicConfig;
  telemetry?: AtomicTelemetry;
  knowledgeRepo?: AtomicMinimalKnowledgeRepository;
  terminology?: AtomicFhirTerminology;
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

    if (this.config.knowledgeRepo) {
      this.knowledgeRepo = new this.config.knowledgeRepo.engine(
        this as unknown as AtomicContext,
        this.config.knowledgeRepo
      );
      await this.knowledgeRepo!.init();
    }
  }
}











