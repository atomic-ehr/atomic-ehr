import type { AtomicResourceRepository, AtomicResourceRepositoryConfig } from "./resource-repository";
import type { AtomicFhirTerminology, AtomicFhirTerminologyConfig } from "./terminology";
import type { AtomicService, AtomicServiceConfig } from "./service";
import type { AtomicTelemetry, AtomicTelemetryConfig } from "./telemetry";
import type { AtomicFhirpath, AtomicFhirpathConfig } from "./fhirpath";
import type { AtomicKnowledgeRepository, AtomicKnowledgeRepositoryConfig, AtomicMinimalKnowledgeRepository } from "./knowledge-repository";
import type { AtomicAuthConfig } from "./auth";

export interface AtomicConfig {
    knowledgeRepo?: AtomicKnowledgeRepositoryConfig;
    terminology?: AtomicFhirTerminologyConfig[];
    fhirpath?: AtomicFhirpathConfig;
    auth?: AtomicAuthConfig[];
    telemetry?: AtomicTelemetryConfig;
    services?: {
        [key: string]: AtomicServiceConfig
    }
    repos?: {
        [key: string]: AtomicResourceRepositoryConfig
    }
} 

export interface AtomicContext {
  config: AtomicConfig;

  telemetry?: AtomicTelemetry;
  fhirpath?: AtomicFhirpath;
  knowledgeRepo?: AtomicMinimalKnowledgeRepository;
  terminology?: AtomicFhirTerminology;

  services?: { [serviceName: string]: AtomicService; };
  repos?: { [resourceType: string]: AtomicResourceRepository; };
} 