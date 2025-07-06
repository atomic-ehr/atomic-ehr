export interface AtomicMeta {
    lastUpdated?: string;
    versionId?: string;
    source?: string;
    profile?: string[];
}

export interface AtomicResource {
    resourceType?: string;
    resourceDefinition?: string;
    id?: string;
    meta?: AtomicMeta;
    [key: string]: any;
}

export interface AtomicCanonicalResource extends AtomicResource {
    url: string;
    version?: string;
} 