import { 
    AtomicFhirRegistry, 
    type AtomicContext, 
    type AtomicFhirRegistryConfig, 
    type AtomicCanonicalResource, 
    type AtomicFhirResolutionOptions 
} from "../index";
import { mkdir } from 'node:fs/promises';
import * as path from 'path';
import { $ } from "bun";

export interface NodeModulesRegistryConfig extends AtomicFhirRegistryConfig {
    registryUrl: string;
    workingDirectory: string;
    packages?: string[];
}

interface PackageInfo {
    name: string;
    packageJson?: any;
    index?: { [url: string]: {
        url: string, 
        version: string, 
        filename: string, 
        resourceType: string, 
        resource?: AtomicCanonicalResource,
        status?: 'not-found' | 'success'
    } };
}

export class NodeModulesRegistry extends AtomicFhirRegistry {
    config: NodeModulesRegistryConfig;
    packages: Map<string, PackageInfo> = new Map();
    
    constructor(context: AtomicContext, config: AtomicFhirRegistryConfig) {
        super(context, config);
        this.config = config as NodeModulesRegistryConfig;
    }

    async init(): Promise<void> {
        // Check if workingDirectory exists, if not create it
        const workingDirFile = Bun.file(this.config.workingDirectory);
        const dirExists = await workingDirFile.exists();
        
        if (!dirExists) {
            // Directory doesn't exist, create it
            await mkdir(this.config.workingDirectory, { recursive: true });
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
                    console.log(`Installing package: ${pkg}`);
                    
                    if (this.config.registryUrl) {
                        await $`cd ${this.config.workingDirectory} && bun install --registry=${this.config.registryUrl} ${pkg}`;
                    } else {
                        await $`cd ${this.config.workingDirectory} && bun install ${pkg}`;
                    }
                    
                    console.log(`Successfully installed package: ${pkg}`);
                    
                    // Read package.json and .index.json from the installed package
                    await this.readPackageFiles(pkg);
                    
                } catch (error) {
                    console.error(`Failed to install package ${pkg}:`, error);
                    throw error;
                }
            }
        }
    }

    private async readPackageFiles(packageName: string): Promise<void> {
        const packageInfo: PackageInfo = { name: packageName };
        const nodeModulesPath = path.join(this.config.workingDirectory, 'node_modules', packageName);
        
        try {
            // Read package.json
            const packageJsonPath = path.join(nodeModulesPath, 'package.json');
            const packageJsonFile = Bun.file(packageJsonPath);
            if (await packageJsonFile.exists()) {
                packageInfo.packageJson = await packageJsonFile.json();
                console.log(`Read package.json for ${packageName}`);
            } else {
                console.warn(`package.json not found for ${packageName}`);
            }

            // Read .index.json
            const indexJsonPath = path.join(nodeModulesPath, '.index.json');
            const indexJsonFile = Bun.file(indexJsonPath);
            if (await indexJsonFile.exists()) {
                const index = await indexJsonFile.json();
                packageInfo.index = index.files?.reduce((acc: any, file: any) => {
                    acc[file.url] = file;
                    return acc;
                }, {});

                console.log(`Read .index.json for ${packageName}`);
            } else {
                console.warn(`.index.json not found for ${packageName}`);
            }

            // Store package info in internal packages field
            this.packages.set(packageName, packageInfo);
        } catch (error) {
            console.error(`Failed to read package files for ${packageName}:`, error);
            // Still store package info even if reading files failed
            this.packages.set(packageName, packageInfo);
        }
    }

    getPackageInfo(packageName: string): PackageInfo | undefined {
        return this.packages.get(packageName);
    }

    getAllPackages(): Map<string, PackageInfo> {
        return this.packages;
    }

    async listPackages(): Promise<string[]> {
        return Array.from(this.packages.keys());
    }

    async getPackage(packageName: string): Promise<string> {
        const packageInfo = this.packages.get(packageName);
        return packageInfo ? JSON.stringify(packageInfo) : "";
    }

    async resolve(resolutionContext: AtomicFhirResolutionOptions, canonical: string): Promise<AtomicCanonicalResource> {
        // Iterate through all packages
        for (const [packageName, packageInfo] of this.packages) {
            // Check if package has an index and the canonical URL exists in it
            if (packageInfo.index && packageInfo.index[canonical]) {
                const indexEntry = packageInfo.index[canonical];

                // Check if resource is already cached
                if (indexEntry.resource) {
                    // Return cached resource
                    return indexEntry;
                }
                
                // Build the path to the resource file
                const resourcePath = path.join(this.config.workingDirectory, 'node_modules', packageName, indexEntry.filename);
                const resourceFile = Bun.file(resourcePath);
                try {
                    const resource = await resourceFile.json();
                    indexEntry.status = "success";
                    indexEntry.resource = resource;
                    return indexEntry;
                } catch (error) {
                    continue;
                }
            }
        }

        return { status: 'not-found', url: canonical };
    }
}