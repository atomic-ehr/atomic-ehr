import type { AtomicContext } from "./context";
import type { AtomicCanonicalResource } from "./resource";

export interface AtomicKnowledgeRepositoryOptions {
}

export interface AtomicKnowledgeRepositoryConfig {
    engine: new (context: AtomicContext, config: AtomicKnowledgeRepositoryConfig) => AtomicMinimalKnowledgeRepository;
    packages?: string[];
}

export interface AtomicSearchStructureDefinitionQuery {
    package?: string;
    kind?: string;
    url?: string;
    type?: string;
}

export interface AtomicSearchCanonicalQuery {
    resourceType?: string;
    url?: string;
    type?: string;
}

export interface AtomicPackage {
    name: string;
    version: string;
    url: string;
}

export abstract class AtomicMinimalKnowledgeRepository {
    context: AtomicContext;
    constructor(context: AtomicContext, config: AtomicKnowledgeRepositoryConfig) {
        this.context = context;
    }
    abstract init(): Promise<void>;
    abstract deinit(): Promise<void>;

    abstract getPackages(): Promise<AtomicPackage[]>;
    abstract getPackage(packageName: string, version?: string): Promise<AtomicPackage | null>;
    abstract getCanonicals(query: AtomicSearchCanonicalQuery): Promise<AtomicCanonicalResource[]>;

    abstract getStructureDefinitions(query: AtomicSearchStructureDefinitionQuery): Promise<AtomicCanonicalResource[]>;
    abstract getSearchParameters(resourceType: string): Promise<AtomicCanonicalResource>;
    abstract getProfiles(resourceType: string): Promise<AtomicCanonicalResource>;
    abstract getCompartments(): Promise<AtomicCanonicalResource>;

    // return all canonicals, or filter by resource type
    abstract resolve(canonical: string): Promise<AtomicCanonicalResource[]>;
}

export abstract class AtomicKnowledgeRepository extends AtomicMinimalKnowledgeRepository {
    abstract search(resourceType: string, query: string): Promise<AtomicCanonicalResource[]>;
    abstract create(resource: AtomicCanonicalResource): Promise<AtomicCanonicalResource>;
    abstract update(resource: AtomicCanonicalResource): Promise<AtomicCanonicalResource>;
    abstract delete(resource: {resourceType: string, id: string}): Promise<void>;
} 