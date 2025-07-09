import { describe, it, expect, beforeAll } from "bun:test";
import { AtomicSystem, type AtomicConfig, type AtomicFhirTerminologyConfig } from "@atomic-ehr/core/src/index";
import { NPMKnowledgeRepository, type NPMKnowledgeRepositoryConfig } from "../src/npm-knowledge-repository";
import { $ } from "bun";

describe("NPM Knowledge Registry", async () => {
    let system: AtomicSystem;
    let registry: NPMKnowledgeRepository;

    beforeAll(async () => {
        // Clean up any existing test directory

        //await $`rm -rf .tmp/dev`;
        system = new AtomicSystem({
            knowledgeRepo: {
                engine: NPMKnowledgeRepository,
                workingDirectory: ".tmp/dev",
                databasePath: ".tmp/dev/db.sqlite",
                packages: ["@atomic-ehr/hl7.fhir.r4.core"],
            } as NPMKnowledgeRepositoryConfig,
        } as AtomicConfig);

        const startTime = performance.now();
        
        await system.init();
        const endTime = performance.now();
        expect(endTime - startTime).toBeGreaterThan(0);
        registry = system.knowledgeRepo! as NPMKnowledgeRepository;
    });

    it("should be defined", () => {
        expect(system.knowledgeRepo).toBeDefined();
        expect(registry).toBeDefined();
    });

    it("should retrieve packages", async () => {
        const packages = await registry.getPackages();
        expect(packages).toBeDefined();
        expect(Array.isArray(packages)).toBe(true);
        console.log('packages', packages);
        expect(packages.length).toBeGreaterThan(0);
    });

    it("should have configured packages", async () => {
        const packages = await registry.getPackages();
        const packageNames = packages.map(pkg => pkg.name);
        expect(packageNames).toContain("@atomic-ehr/hl7.fhir.r4.core");
    });


    it("should retrieve package", async () => {
        const pkg = await registry.getPackage("@atomic-ehr/hl7.fhir.r4.core");
        expect(pkg).toBeDefined();
        expect(pkg!.name).toBe("@atomic-ehr/hl7.fhir.r4.core");
        expect(pkg!.version).toEqual("0.0.1");
    });

    it("should retrieve canonicals", async () => {
        const canonicals = await registry.resolve("http://hl7.org/fhir/StructureDefinition/Patient");
        //console.log('canonicals', canonicals);
        expect(canonicals).toBeDefined();
        expect(canonicals[0]?.filepath).toBeTruthy();
        expect(canonicals[0]?.resource).toBeDefined();
        expect(canonicals[0]?.resource.resourceType).toBe("StructureDefinition");
        expect(canonicals[0]?.resource.url).toBe("http://hl7.org/fhir/StructureDefinition/Patient");
    });

    it("should retrieve canonicals", async () => {
        const canonicals = await registry.resolve("http://hl7.org/fhir/StructureDefinition/Patient|4.0.1");
        //console.log('canonicals', canonicals);
        expect(canonicals).toBeDefined();
        expect(canonicals.length).toBe(1);
        expect(canonicals[0]?.version).toBe("4.0.1");
    });

    it("should retrieve canonicals", async () => {
        const canonicals = await registry.resolve("http://hl7.org/fhir/StructureDefinition/Patient|6.0.0");
        expect(canonicals).toBeEmpty();
    });

    it("should provide search parameters", async () => {
        const searchParameters = await registry.getSearchParameters("Patient");
        expect(searchParameters).toBeDefined();
        expect(searchParameters.length).toBeGreaterThan(0);
    });

    it("should provide profiles", async () => {
        const profiles = await registry.getProfiles("Patient");
    });
}); 