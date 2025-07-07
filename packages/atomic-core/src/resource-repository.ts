import type { AtomicContext } from "./context";
import type { AtomicResource } from "./resource";


export interface AtomicResourceRepositoryConfig {
    schema?: string;
    type?: string;
    resourceType?: string;
    resourceDefinition?: string;
    engine: typeof AtomicResourceRepository;
    disableHistory?: boolean;
    definition?: string;
    [key: string]: any;
}


export interface AtomicError {
    code: string;
    message: string;
}

export interface AtomicReadOptions {
    resourceType: string;
    id: string;
}

export type AtomicReadResult = 
    | { status: 'not-found' }
    | { status: 'found'; resource: AtomicResource }
    | { status: 'error'; error: AtomicError };

export interface AtomicCreateOptions {
    resource: AtomicResource;
}

export type AtomicCreateResult = 
    | { status: 'created'; resource: AtomicResource }
    | { status: 'already-exists'; resource: AtomicResource }
    | { status: 'validation-error'; error: AtomicError }
    | { status: 'error'; error: AtomicError };

export interface AtomicUpdateOptions {
    resource: AtomicResource;
}

export type AtomicUpdateResult = 
    | { status: 'not-found' }
    | { status: 'updated'; resource: AtomicResource; history?: AtomicResource }
    | { status: 'duplicate', resource: AtomicResource }
    | { status: 'validation-error'; error: AtomicError }
    | { status: 'error'; error: AtomicError };

export interface AtomicUpsertOptions {
    resource: AtomicResource;
}

export type AtomicUpsertResult = 
    | { status: 'created', resource: AtomicResource }
    | { status: 'updated', resource: AtomicResource }
    | { status: 'duplicate', resource: AtomicResource }
    | { status: 'error'; error: AtomicError };

export interface AtomicDeleteOptions {
    resourceType: string;
    id: string;
}

export type AtomicDeleteResult = 
    | { status: 'deleted'; resource?: AtomicResource }
    | { status: 'not-found' }
    | { status: 'error'; error: AtomicError };

export interface AtomicSearchOptions {
    resourceType: string;
    query: string;
}

export type AtomicSearchResult = 
    | { status: 'success'; resources: AtomicResource[] }
    | { status: 'error'; error: AtomicError };

export interface AtomicPatchOptions {
    resource: AtomicResource;
}

export type AtomicPatchResult = 
    | { status: 'patched'; resource: AtomicResource }
    | { status: 'not-found'; }
    | { status: 'error'; error: AtomicError };

export interface AtomicResourceTypeHistoryOptions {
    resource: AtomicResource;
}

export type AtomicResourceTypeHistoryResult = 
    | { status: 'success'; history: AtomicResource[] }
    | { status: 'error'; error: AtomicError };

export interface AtomicInstanceHistoryOptions {
    resourceType: string;
    id: string;
}

export type AtomicInstanceHistoryResult = 
    | { status: 'success'; history: AtomicResource[] }
    | { status: 'not-found' }
    | { status: 'error'; error: AtomicError };

export interface AtomicHistoricalVersionOptions {
    resourceType: string;
    id: string;
    version: string;
}

export type AtomicHistoricalVersionResult = 
    | { status: 'success'; resource: AtomicResource }
    | { status: 'not-found' }
    | { status: 'error'; error: AtomicError };

export interface AtomicBulkDeleteOptions {
    ids?: string[];
    query?: string;
}   

export type AtomicBulkDeleteResult = 
    | { status: 'deleted'; resources: AtomicResource[] }
    | { status: 'not-found'; resources: AtomicResource[] }
    | { status: 'error'; error: AtomicError };

export class AtomicResourceRepository {
    context: AtomicContext;
    config: AtomicResourceRepositoryConfig;
    constructor(context: AtomicContext, config: AtomicResourceRepositoryConfig) {
        this.context = context;
        this.config = config;
    }
    init(): Promise<void> {
        return Promise.resolve();
    }
    destroy(context: AtomicContext, config: AtomicResourceRepositoryConfig): Promise<void> {
        throw new Error('Method not implemented.');
    }
    read(options: AtomicReadOptions): Promise<AtomicReadResult> {
        throw new Error('Method not implemented.');
    }
    // create resource, fail if exists
    create(options: AtomicCreateOptions): Promise<AtomicCreateResult> {
        throw new Error('Method not implemented.');
    }
    // update resource, fail if not exists
    update(options: AtomicUpdateOptions): Promise<AtomicUpdateResult> {
        throw new Error('Method not implemented.');
    }
    // if resource exists, update it, otherwise create it
    upsert(options: AtomicUpsertOptions): Promise<AtomicUpsertResult> {
        throw new Error('Method not implemented.');
    }
    // patch resource, fail if not exists
    patch(options: AtomicPatchOptions): Promise<AtomicPatchResult> {
        throw new Error('Method not implemented.');
    }
    delete(options: AtomicDeleteOptions): Promise<AtomicDeleteResult> {
        throw new Error('Method not implemented.');
    }
    bulkDelete(options: AtomicBulkDeleteOptions): Promise<AtomicBulkDeleteResult> {
        throw new Error('Method not implemented.');
    }
    search(options: AtomicSearchOptions): Promise<AtomicSearchResult> {
        throw new Error('Method not implemented.');
    }
    resourceTypeHistory(options: AtomicResourceTypeHistoryOptions): Promise<AtomicResourceTypeHistoryResult> {
        throw new Error('Method not implemented.');
    }
    instanceHistory(options: AtomicInstanceHistoryOptions): Promise<AtomicInstanceHistoryResult> {
        throw new Error('Method not implemented.');
    }
    historicalVersion(options: AtomicHistoricalVersionOptions): Promise<AtomicHistoricalVersionResult> {
        throw new Error('Method not implemented.');
    }
}
