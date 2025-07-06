import type { AtomicRepository } from "./repository";
import type { AtomicFhirTerminology } from "./terminology";
import type { AtomicService } from "./service";
import type { AtomicLogger } from "./logger";
import type { AtomicFhirpath } from "./fhirpath";
import type { AtomicConfig } from "./config";

export interface AtomicContext {
  config: AtomicConfig;

  logger: AtomicLogger;
  metrics: any;
  fhirpath: AtomicFhirpath;
  registry: any;
  terminology: AtomicFhirTerminology;
  validator: any;

  services: { [serviceName: string]: AtomicService; };
  repos: { [resourceType: string]: AtomicRepository; };
} 