import type { AtomicContext } from "./context";

export interface AtomicValidationOptions {
    validate: boolean;
    validateTerminology: boolean;
    validateReferences: boolean;
    validateExtensions: boolean;
}

export interface AtomicValidationOutcome {
    valid: boolean;
    errors: any[];
}

export class AtomicValidator {
  context: AtomicContext;

  constructor(context: AtomicContext) {
    this.context = context;
  }

  validate( options: AtomicValidationOptions, resource: any): Promise<AtomicValidationOutcome> {
    throw new Error("Not implemented");
  }

  bulkValidate( options: AtomicValidationOptions, resources: any[]): Promise<AtomicValidationOutcome[]> {
    throw new Error("Not implemented");
  }
} 