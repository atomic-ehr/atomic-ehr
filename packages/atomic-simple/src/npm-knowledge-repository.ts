import { 
    AtomicMinimalKnowledgeRepository, 
    type AtomicSearchStructureDefinitionQuery,
    type AtomicContext, 
    type AtomicKnowledgeRepositoryConfig, 
    type AtomicCanonicalResource, 
    type AtomicPackage,
    type AtomicSearchCanonicalQuery
} from "../../atomic-core/src/index";
import { mkdir } from 'node:fs/promises';
import * as path from 'path';
import { $ } from "bun";
import { Database } from "bun:sqlite";


export interface NPMKnowledgeRepositoryConfig extends AtomicKnowledgeRepositoryConfig {
    registryUrl?: string;
    workingDirectory: string;
    packages?: string[];
    databasePath?: string; // Optional path for persistent database
}

export function isMemory(dbPath: string): boolean {
    return dbPath === ":memory:";
}

interface CanonicalReference {
    url: string;
    version?: string;
}

function parseCanonical(canonical: string): CanonicalReference {
    let url = canonical;
    let version: string | undefined;

    if (canonical.includes('|')) {
        const parts = canonical.split('|');
        url = parts[0]!;
        version = parts[1];
    }

    return { url, version };
}

export class NPMKnowledgeRepository extends AtomicMinimalKnowledgeRepository {
    db!: Database;
    config: NPMKnowledgeRepositoryConfig;
    private resourceCache: Map<string, any> = new Map();

    constructor(context: AtomicContext, config: AtomicKnowledgeRepositoryConfig) {
        super(context, config);
        this.config = config as NPMKnowledgeRepositoryConfig;
    }

    private initDb(): void {
        // Create tables
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS packages (
                name TEXT PRIMARY KEY,
                package_json TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS canonicals (
                package_name TEXT,
                resource_type TEXT,
                url TEXT PRIMARY KEY,
                version TEXT,
                filename TEXT,
                filepath TEXT,
                kind TEXT,
                base TEXT
            )
        `);

        // Create indexes for better performance
        this.db.exec(`
            CREATE INDEX IF NOT EXISTS idx_canonicals_package_name ON canonicals(package_name);
            CREATE INDEX IF NOT EXISTS idx_canonicals_resource_type ON canonicals(resource_type);
            CREATE INDEX IF NOT EXISTS idx_canonicals_kind ON canonicals(kind);
            CREATE INDEX IF NOT EXISTS idx_canonicals_kind ON canonicals(base);
        `);
    }

    async init(): Promise<void> {
        // Check if workingDirectory exists, if not create it
        const workingDirFile = Bun.file(this.config.workingDirectory);
        const dirExists = await workingDirFile.exists();

        
        if (!dirExists) {
            // Directory doesn't exist, create it
            await mkdir(this.config.workingDirectory, { recursive: true });
        }

        // Use provided database path or default to memory
        const dbPath = this.config.databasePath || ":memory:";
        
        // Check if database file exists (only relevant for persistent databases)
        let dbExists = false;
        if (!isMemory(dbPath)) {
            const dbFile = Bun.file(dbPath);
            dbExists = await dbFile.exists();
        }
        
        this.db = new Database(dbPath);
        
        // Only initialize database if it's in-memory or the file doesn't exist
        if (isMemory(dbPath) || !dbExists) {
            this.initDb();
        }

        // Check if package.json exists, if not create it
        const packageJsonPath = path.join(this.config.workingDirectory, 'package.json');
        const packageJsonFile = Bun.file(packageJsonPath);
        const packageJsonExists = await packageJsonFile.exists();
        

        if (!packageJsonExists) {
            // package.json doesn't exist, create it
            const defaultPackageJson = {
                dependencies: {}
            };
            await Bun.write(packageJsonFile, JSON.stringify(defaultPackageJson, null, 2));
        }


        // Install packages if they are specified in config
        if (this.config.packages && this.config.packages.length > 0) {
            for (const pkg of this.config.packages) {
                try {
                    const existingPackage = this.db.query(`SELECT 1 FROM packages WHERE name = ? limit 1 `).get(pkg);
                    if (existingPackage) {
                        console.log(`Package ${pkg} already exists in database, skipping installation`);
                        continue;
                    }
                    console.log(`Installing package: ${pkg}`);
                    // TODO there is a problem with bun install
                    if (this.config.registryUrl) {
                        console.log(`cd ${this.config.workingDirectory} && bun install --registry=${this.config.registryUrl} ${pkg}`);
                        await $`cd ${this.config.workingDirectory} && bun install --registry=${this.config.registryUrl} ${pkg}`;
                    } else {
                        await $`cd ${this.config.workingDirectory} && bun install ${pkg}`;
                    }

                    console.log(`Successfully installed package: ${pkg}`);
                    
                    // Read package.json and .index.json from the installed package
                    await this.readPackageFiles(pkg);
                    
                } catch (error) {
                    console.error(`ERROR:Failed to install package ${pkg}:`, error);
                }
            }
        }
        // const result = this.db.query(` SELECT COUNT(*) as count FROM canonicals `).get() as any;
        // console.log(`Total number of canonical resources in database: ${result.count}`);
    }

    async deinit(): Promise<void> {
        this.db.close();
    }

    private async readPackageFiles(packageName: string): Promise<void> {
        const nodeModulesPath = path.join(this.config.workingDirectory, 'node_modules', packageName);
        
        try {
            // Read package.json
            const packageJsonPath = path.join(nodeModulesPath, 'package.json');
            const packageJsonFile = Bun.file(packageJsonPath);
            let packageJson = null;
            
            if (await packageJsonFile.exists()) {
                packageJson = await packageJsonFile.json();
                console.log(`Read package.json for ${packageName}`);
            } else {
                console.warn(`package.json not found for ${packageName}`);
            }


            // Read .index.json
            const indexJsonPath = path.join(nodeModulesPath, '.index.json');
            const indexJsonFile = Bun.file(indexJsonPath);
            
            if (await indexJsonFile.exists()) {
                const index = await indexJsonFile.json();
                
                // Load resources from index
                await this.loadResourcesFromIndex(packageName, nodeModulesPath, index);
                
                console.log(`Read .index.json for ${packageName} and loaded all resources`);
            } else {
                console.warn(`.index.json not found for ${packageName}`);
            }

            // Store package info in database
            const insertPackageStmt = this.db.prepare(`
                INSERT OR REPLACE INTO packages (name, package_json)
                VALUES (?, ?)
            `);
            insertPackageStmt.run(packageName, packageJson ? JSON.stringify(packageJson) : null);

        } catch (error) {
            console.error(`Failed to read package files for ${packageName}:`, error);
        }
    }

    private async loadResourcesFromIndex(packageName: string, nodeModulesPath: string, index: any): Promise<void> {
        // Store canonical resources in database and load resources

        const insertIndexStmt = this.db.prepare(`
            INSERT OR REPLACE INTO canonicals 
            (package_name, resource_type, url, version, filename, filepath, kind, base)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        if (index.files) {
            for (const file of index.files) {
                const filepath = path.join(nodeModulesPath, file.filename);
                
                insertIndexStmt.run(
                    packageName,
                    file.resourceType,
                    file.url,
                    file.version,
                    file.filename,
                    filepath,
                    file.kind || null,
                    file.base || null
                );
            }
        }
    }

    private async getResourceByFilepath(filepath: string): Promise<any> {
        // Check cache first
        if (this.resourceCache.has(filepath)) {
            return this.resourceCache.get(filepath);
        }

        let resource = null;
        if (filepath) {
            const file = Bun.file(filepath);
            if (await file.exists()) {
                resource = await file.json();
                // Cache the resource
                this.resourceCache.set(filepath, resource);
            } else {
                console.warn(`File does not exist: ${filepath}`);
            }
        } else {
            console.warn(`File does not exist: ${filepath}`);
        }

        return resource;
    }

    override getPackages(): Promise<AtomicPackage[]> {
        const result = this.db.query(` SELECT name, package_json FROM packages `).all() as any;
        return Promise.resolve(result.map((row: any) => {
            if (!row.package_json) {
                console.warn(`Package ${row.name} has no package.json data`);
                return null;
            }
            try {
                const packageJson = JSON.parse(row.package_json);
                return packageJson;
            } catch (error) {
                console.error(`Failed to parse package.json for ${row.name}:`, error);
                return null;
            }
        }).filter(Boolean));
    }
    override getPackage(packageName: string, version?: string): Promise<AtomicPackage | null> {
        console.log('getPackage', packageName, version);
        const result = this.db.query(`SELECT name, package_json FROM packages where name = ? limit 1 `).get(packageName) as any;
        if (!result) {
            console.log(`Package ${packageName} not found in database`);
            return Promise.resolve(null);
        }
        
        if (!result.package_json) {
            console.warn(`Package ${packageName} found but has no package.json data`);
            return Promise.resolve(null);
        }
        
        try {
            const packageJson = JSON.parse(result.package_json);
            console.log(`Successfully retrieved package ${packageName}:`, packageJson?.name || 'unknown');
            return Promise.resolve(packageJson);
        } catch (error) {
            console.error(`Failed to parse package.json for ${packageName}:`, error);
            return Promise.resolve(null);
        }
    }

    override async resolve(canonical: string): Promise<AtomicCanonicalResource[]> {
        // Parse canonical to extract URL and version
        const { url, version } = parseCanonical(canonical);
        
        // Build query based on whether version is specified
        let query: string;
        let params: any[];
        
        if (version) {
            query = `SELECT * FROM canonicals WHERE url = ? AND version = ?`;
            params = [url, version];
        } else {
            query = `SELECT * FROM canonicals WHERE url = ?`;
            params = [url];
        }
        
        const result = this.db.query(query).all(...params) as any[];

        // Transform database results to AtomicCanonicalResource objects
        const canonicalResources: AtomicCanonicalResource[] = await Promise.all(
            result.map(async (row) => {
                const resource = await this.getResourceByFilepath(row.filepath);
                
                return {
                    resourceType: row.resource_type,
                    url: row.url,
                    version: row.version,
                    id: row.filename?.replace(/\.[^/.]+$/, ''), // Remove file extension for ID
                    // Add custom properties that might be useful
                    kind: row.kind,
                    base: row.base,
                    filepath: row.filepath,
                    resource: resource,
                    packageName: row.package_name
                };
            })
        );
        
        return Promise.resolve(canonicalResources);
    }

    override getCanonicals(query: AtomicSearchCanonicalQuery): Promise<AtomicCanonicalResource[]> {
        throw new Error("Method not implemented.");
    }
    override getStructureDefinitions(query: AtomicSearchStructureDefinitionQuery): Promise<AtomicCanonicalResource[]> {
        throw new Error("Method not implemented.");
    }
    override getSearchParameters(resourceType: string): Promise<AtomicCanonicalResource> {
        throw new Error("Method not implemented.");
    }
    override getProfiles(resourceType: string): Promise<AtomicCanonicalResource> {
        throw new Error("Method not implemented.");
    }
    override getCompartments(): Promise<AtomicCanonicalResource> {
        throw new Error("Method not implemented.");
    }
}