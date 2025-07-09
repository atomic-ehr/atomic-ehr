/**
 * FHIRPath Type System Definitions
 * 
 * Based on the FHIRPath specification, this module defines the type hierarchy
 * and type checking rules for FHIRPath expressions.
 */

/**
 * Base FHIRPath types according to the specification
 */
export enum FHIRPathType {
  // System types
  Any = 'Any',
  
  // Primitive types
  Boolean = 'Boolean',
  String = 'String',
  Integer = 'Integer',
  Decimal = 'Decimal',
  Date = 'Date',
  DateTime = 'DateTime',
  Time = 'Time',
  Quantity = 'Quantity',
  
  // FHIR types
  Resource = 'Resource',
  DomainResource = 'DomainResource',
  Element = 'Element',
  BackboneElement = 'BackboneElement',
  
  // Special types
  Empty = 'Empty',  // Represents empty collection
}

/**
 * Type information for expressions
 */
export interface TypeInfo {
  type: FHIRPathType;
  isCollection: boolean;
  isOptional: boolean;
}

/**
 * Function signature for type checking
 */
export interface FunctionSignature {
  name: string;
  parameters: TypeInfo[];
  returnType: TypeInfo;
  isVariadic?: boolean;  // For functions like union that take variable args
}

/**
 * Type compatibility and conversion rules
 */
export class TypeSystem {
  private static typeHierarchy: Map<string, string[]> = new Map([
    // All types are subtypes of Any
    [FHIRPathType.Boolean, [FHIRPathType.Any]],
    [FHIRPathType.String, [FHIRPathType.Any]],
    [FHIRPathType.Integer, [FHIRPathType.Decimal, FHIRPathType.Any]],
    [FHIRPathType.Decimal, [FHIRPathType.Any]],
    [FHIRPathType.Date, [FHIRPathType.Any]],
    [FHIRPathType.DateTime, [FHIRPathType.Any]],
    [FHIRPathType.Time, [FHIRPathType.Any]],
    [FHIRPathType.Quantity, [FHIRPathType.Any]],
    
    // FHIR type hierarchy
    [FHIRPathType.Element, [FHIRPathType.Any]],
    [FHIRPathType.BackboneElement, [FHIRPathType.Element, FHIRPathType.Any]],
    [FHIRPathType.Resource, [FHIRPathType.Any]],
    [FHIRPathType.DomainResource, [FHIRPathType.Resource, FHIRPathType.Any]],
  ]);

  /**
   * Check if typeA is compatible with (can be assigned to) typeB
   */
  static isCompatible(typeA: string, typeB: string): boolean {
    if (typeA === typeB || typeB === FHIRPathType.Any) {
      return true;
    }
    
    const ancestors = this.typeHierarchy.get(typeA);
    if (ancestors) {
      return ancestors.includes(typeB);
    }
    
    // Check if it's a FHIR resource type
    if (this.isFHIRResourceType(typeA)) {
      return typeB === FHIRPathType.Resource || 
             typeB === FHIRPathType.DomainResource ||
             typeB === FHIRPathType.Any;
    }
    
    return false;
  }

  /**
   * Get common type for binary operations
   */
  static getCommonType(typeA: TypeInfo, typeB: TypeInfo): TypeInfo | null {
    // Handle empty collections
    if (typeA.type === FHIRPathType.Empty) return typeB;
    if (typeB.type === FHIRPathType.Empty) return typeA;
    
    // Same type
    if (typeA.type === typeB.type) {
      return {
        type: typeA.type,
        isCollection: typeA.isCollection || typeB.isCollection,
        isOptional: typeA.isOptional || typeB.isOptional
      };
    }
    
    // Integer can be promoted to Decimal
    if (typeA.type === FHIRPathType.Integer && typeB.type === FHIRPathType.Decimal) {
      return { type: FHIRPathType.Decimal, isCollection: false, isOptional: false };
    }
    if (typeB.type === FHIRPathType.Integer && typeA.type === FHIRPathType.Decimal) {
      return { type: FHIRPathType.Decimal, isCollection: false, isOptional: false };
    }
    
    // Otherwise, use Any
    return { type: FHIRPathType.Any, isCollection: false, isOptional: true };
  }

  /**
   * Check if a type is a FHIR resource type
   */
  static isFHIRResourceType(type: string): boolean {
    // Common FHIR resources - in real implementation, this would be comprehensive
    const fhirResources = [
      'Patient', 'Practitioner', 'Organization', 'Observation',
      'Condition', 'Procedure', 'MedicationRequest', 'Encounter',
      'AllergyIntolerance', 'Immunization', 'DiagnosticReport'
    ];
    
    return fhirResources.includes(type);
  }

  /**
   * Get type for literal values
   */
  static getLiteralType(literalType: string): TypeInfo {
    switch (literalType) {
      case 'null':
        return { type: FHIRPathType.Empty, isCollection: true, isOptional: true };
      case 'boolean':
        return { type: FHIRPathType.Boolean, isCollection: false, isOptional: false };
      case 'string':
        return { type: FHIRPathType.String, isCollection: false, isOptional: false };
      case 'number':
        // Check if integer or decimal
        return { type: FHIRPathType.Decimal, isCollection: false, isOptional: false };
      case 'date':
        return { type: FHIRPathType.Date, isCollection: false, isOptional: false };
      case 'datetime':
        return { type: FHIRPathType.DateTime, isCollection: false, isOptional: false };
      case 'time':
        return { type: FHIRPathType.Time, isCollection: false, isOptional: false };
      case 'quantity':
        return { type: FHIRPathType.Quantity, isCollection: false, isOptional: false };
      default:
        return { type: FHIRPathType.Any, isCollection: false, isOptional: true };
    }
  }
}

/**
 * Type environment for tracking variable types in scope
 */
export class TypeEnvironment {
  private scopes: Map<string, TypeInfo>[] = [new Map()];
  
  /**
   * Enter a new scope
   */
  pushScope(): void {
    this.scopes.push(new Map());
  }
  
  /**
   * Exit current scope
   */
  popScope(): void {
    if (this.scopes.length > 1) {
      this.scopes.pop();
    }
  }
  
  /**
   * Add a variable to current scope
   */
  addVariable(name: string, type: TypeInfo): void {
    const currentScope = this.scopes[this.scopes.length - 1];
    currentScope?.set(name, type);
  }
  
  /**
   * Look up a variable type
   */
  getVariable(name: string): TypeInfo | undefined {
    // Search from innermost to outermost scope
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const type = this.scopes[i]?.get(name);
      if (type) return type;
    }
    return undefined;
  }
  
  /**
   * Set the context type (what 'this' refers to)
   */
  setContextType(type: TypeInfo): void {
    this.addVariable('$this', type);
  }
  
  /**
   * Get the current context type
   */
  getContextType(): TypeInfo | undefined {
    return this.getVariable('$this');
  }
}

// Model/Schema provider interfaces
export interface FHIRModelProvider {
  getTypeInfo(typeName: string): TypeInfo | undefined;
  getPropertyType(parentType: string, propertyName: string): TypeInfo | undefined;
  isSubtypeOf(type: string, superType: string): boolean;
}

export interface FHIRTerminologyProvider {
  memberOf(code: string, valueSet: string): boolean;
  subsumes(code1: string, code2: string): boolean;
  subsumedBy(code1: string, code2: string): boolean;
}

export interface FHIRReferenceResolver {
  resolve(reference: string): any;
}

// Context that provides all external dependencies for FHIRPath evaluation
export interface FHIRPathContext {
  modelProvider?: FHIRModelProvider;
  terminologyProvider?: FHIRTerminologyProvider;
  referenceResolver?: FHIRReferenceResolver;
}

// Parser options
export interface FHIRPathParserOptions {
  contextType?: TypeInfo;  // The type of the root context (e.g., Patient)
  strict?: boolean;        // Strict type checking
}