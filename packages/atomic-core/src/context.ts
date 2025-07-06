import type { AtomicRepository } from "./repository";
import type { AtomicFhirTerminology } from "./terminology";
import type { AtomicService } from "./service";
import type { AtomicTelemetry } from "./telemetry";
import type { AtomicFhirpath } from "./fhirpath";
import type { AtomicConfig } from "./config";
import type { AtomicFhirRegistry } from "./registry";

export interface AtomicContext {
  config: AtomicConfig;

  telemetry?: AtomicTelemetry;
  fhirpath?: AtomicFhirpath;
  registry?: AtomicFhirRegistry;
  terminology?: AtomicFhirTerminology;

  services?: { [serviceName: string]: AtomicService; };
  repos?: { [resourceType: string]: AtomicRepository; };
} 