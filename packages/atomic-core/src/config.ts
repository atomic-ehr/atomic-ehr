import type { AtomicServiceConfig } from "./service";
import type { AtomicLoggerConfig } from "./logger";
import type { AtomicFhirpathConfig } from "./fhirpath";
import type { AtomicRepositoryConfig } from "./repository";
import type { AtomicFhirTerminologyConfig } from "./terminology";
import type { AtomicAuthConfig } from "./auth";
import type { AtomicFhirRegistryConfig } from "./registry";
import type { AtomicTelemetryConfig } from "./telemetry";

export interface AtomicConfig {
    logger?: AtomicLoggerConfig[];
    registry?: AtomicFhirRegistryConfig[];
    terminology?: AtomicFhirTerminologyConfig[];
    fhirpath?: AtomicFhirpathConfig;
    auth?: AtomicAuthConfig[];
    telemetry?: AtomicTelemetryConfig[];
    services?: {
        [key: string]: AtomicServiceConfig
    }
    repos?: {
        [key: string]: AtomicRepositoryConfig
    }
} 