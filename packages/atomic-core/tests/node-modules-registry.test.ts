import { describe, it, expect, beforeEach } from "bun:test";
import { NodeModulesRegistry, type NodeModulesRegistryConfig } from "../src/registry/node-modules-registry";
import type { AtomicContext } from "../src/context";
import type { AtomicConfig } from "../src/config";
import { AtomicSystem } from "../src/system";
import type { AtomicFhirResolutionOptions } from "../src/registry";

describe("NodeModulesRegistry", async () => {
    let system: AtomicSystem = new AtomicSystem({
        registry: {
            engine: NodeModulesRegistry,
            registryUrl: "https://fs.get-ig.org/pkgs/",
            workingDirectory: ".tmp/node-modules-registry-test",
            packages: ["hl7.fhir.r4.core"]
        } as NodeModulesRegistryConfig
    });

    let registry: NodeModulesRegistry =  system.registry as NodeModulesRegistry;

    await system.init();

    it("should be defined", () => {
        expect(system.registry).toBeDefined();
    });

    it("Resolve Patient StructureDefinition", async () => {
        const ptStructDef = await system.registry!.resolve({}, "http://hl7.org/fhir/StructureDefinition/Patient");
        expect(ptStructDef.status).toBe('success');
        expect(ptStructDef.resource).toBeDefined();
        const unknown = await system.registry!.resolve({}, "http://hl7.org/fhir/StructureDefinition/Unknown");
        expect(unknown.status).toBe('not-found');
        const ptStructDef2 = await system.registry!.resolve({}, "http://hl7.org/fhir/StructureDefinition/Patient");
        expect(ptStructDef2.status).toBe('success');
        expect(ptStructDef2.resource).toBeDefined();
        expect(ptStructDef2.resource).toEqual(ptStructDef.resource);


        const humanName = await system.registry!.resolve({}, "http://hl7.org/fhir/StructureDefinition/HumanName");
        expect(humanName.status).toBe('success');
        expect(humanName.resource).toBeDefined();
        expect(humanName.resource.url).toBe("http://hl7.org/fhir/StructureDefinition/HumanName");
        expect(humanName.resource.resourceType).toBe("StructureDefinition");
        expect(humanName.resource.status).toBe("active");
        expect(humanName.resource.kind).toBe("complex-type");
    });

}); 