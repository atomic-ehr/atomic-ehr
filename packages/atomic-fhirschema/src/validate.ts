/**
 * FHIR Schema Validation Algorithm
 * 
 * This module implements a FHIR-specific validation algorithm that validates
 * FHIR resources against normalized schemas. The algorithm is ported from
 * Clojure and handles the complexity of FHIR's meta-model including:
 * 
 * - Dynamic schema resolution based on resource type and profiles
 * - Choice elements (e.g., value[x])
 * - Primitive extensions (e.g., _name for name)
 * - Array cardinality validation
 * - Required element validation
 * - Pattern/fixed value validation
 * - Nested element validation
 * - FHIR slicing (planned)
 * 
 * ## Algorithm Overview
 * 
 * The validation process:
 * 1. Creates a validation context with schemas and error tracking
 * 2. Resolves schemas based on resource type and meta.profile
 * 3. Recursively validates the data structure
 * 4. Applies validation rules (type, required, choices, patterns)
 * 5. Returns structured validation errors
 * 
 * ## Key Features
 * 
 * - **Schema Composition**: Inherits from base schemas and applies profiles
 * - **Extensible Rules**: Pluggable validation rules for different aspects
 * - **FHIR-Specific Logic**: Handles primitive extensions and choice elements
 * - **Detailed Errors**: Provides precise error paths and schema references
 */

// Core validation types
export interface ValidationError {
  type: string;
  path: (string | number)[];
  message: string;
  value?: any;
  expected?: any;
  schemaPath?: (string | number)[];
  schemaPaths?: (string | number)[][];
}

export interface ValidationContext {
  ctx: {
    schemas: Record<string, any>;
  };
  errors: ValidationError[];
  deferreds: any[];
  resource: any;
  path: (string | number)[];
  schemas: Set<SchemaEntry>;
}

export interface SchemaEntry {
  schema: any;
  path: (string | number)[];
  parent?: any;
}

export interface ValidationResult {
  errors: ValidationError[];
  deferreds: any[];
}

// Utility function for indexed reduce
function reduceIndexed<T, R>(
  collection: T[], 
  reducerFn: (acc: R, index: number, item: T) => R, 
  initialValue: R
): R {
  return collection.reduce((acc, item, index) => reducerFn(acc, index, item), initialValue);
}

// Error handling
function addError(vctx: ValidationContext, error: Partial<ValidationError>): ValidationContext {
  const fullError: ValidationError = {
    type: error.type || 'unknown',
    path: error.path || vctx.path,
    message: error.message || 'Validation error',
    ...error
  };
  
  return {
    ...vctx,
    errors: [...vctx.errors, fullError]
  };
}

// Schema resolution functions
function resolveType(vctx: ValidationContext, typeRef: string): any | null {
  return vctx.ctx.schemas[typeRef] || null;
}

function resolveSchema(vctx: ValidationContext, schemaRef: string): any | null {
  return vctx.ctx.schemas[schemaRef] || null;
}

function addSchemaRef(vctx: ValidationContext, schemaRef: string, schemaPath: (string | number)[]): ValidationContext {
  const schema = resolveSchema(vctx, schemaRef);
  if (schema) {
    const newSchemas = new Set(vctx.schemas);
    newSchemas.add({ schema, path: [...schemaPath, schemaRef] });
    return { ...vctx, schemas: newSchemas };
  } else {
    return addError(vctx, {
      type: 'schema/unknown',
      message: `Unknown schema: ${schemaRef}`,
      value: schemaRef,
      schemaPath
    });
  }
}

function addTypeSchema(vctx: ValidationContext, typeRef: string, schemaPath: (string | number)[]): ValidationContext {
  if (typeof typeRef !== 'string') {
    throw new Error(`Type reference must be string, got: ${JSON.stringify(typeRef)}`);
  }
  
  const schema = resolveType(vctx, typeRef);
  if (schema) {
    const newSchemas = new Set(vctx.schemas);
    newSchemas.add({ schema, path: [...schemaPath, typeRef] });
    return { ...vctx, schemas: newSchemas };
  } else {
    return addError(vctx, {
      type: 'type/unknown',
      message: `Unknown type: ${typeRef}`,
      value: typeRef,
      schemaPath
    });
  }
}

// Array validation rules
function validateMinMax(vctx: ValidationContext, value: any[]): ValidationContext {
  const schemasArray = Array.from(vctx.schemas);
  
  const minSchema = schemasArray
    .filter(entry => entry.schema.min !== undefined)
    .sort((a, b) => (a.schema.min || 0) - (b.schema.min || 0))[0];
    
  const maxSchema = schemasArray
    .filter(entry => entry.schema.max !== undefined)
    .sort((a, b) => (b.schema.max || 0) - (a.schema.max || 0))[0];
  
  const count = value.length;
  let result = vctx;
  
  if (minSchema && count < minSchema.schema.min) {
    result = addError(result, {
      type: 'min',
      message: `expected min=${minSchema.schema.min} got ${count}`,
      value: count,
      expected: minSchema.schema.min,
      schemaPaths: [[...minSchema.path, 'min']]
    });
  }
  
  if (maxSchema && count > maxSchema.schema.max) {
    result = addError(result, {
      type: 'max',
      message: `expected max=${maxSchema.schema.max} got ${count}`,
      value: count,
      expected: maxSchema.schema.max,
      schemaPaths: [[...maxSchema.path, 'max']]
    });
  }
  
  return result;
}

function validateSlicing(vctx: ValidationContext, _value: any[]): ValidationContext {
  // TODO: Implement slicing validation
  return vctx;
}

const ARRAY_RULES = {
  minmax: validateMinMax,
  slicing: validateSlicing
};

function validateArrayRules(vctx: ValidationContext, value: any[]): ValidationContext {
  return Object.entries(ARRAY_RULES).reduce((ctx, [_ruleName, ruleFn]) => {
    return ruleFn(ctx, value);
  }, vctx);
}

function isArray(vctx: ValidationContext): SchemaEntry | null {
  for (const entry of vctx.schemas) {
    if (entry.schema.array) {
      return entry;
    }
  }
  return null;
}

// Handle primitive extensions
function dataElements(vctx: ValidationContext, data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith('_')) {
      // Primitive extension
      const elementKey = key.substring(1);
      result[elementKey] = {
        ...result[elementKey],
        key: elementKey,
        path: [...vctx.path, key],
        extension: value
      };
    } else {
      // Regular element
      result[key] = {
        ...result[key],
        key,
        path: [...vctx.path, key],
        value
      };
    }
  }
  
  return result;
}

// Type validators
function validateString(vctx: ValidationContext, schemas: SchemaEntry[], data: any): ValidationContext {
  if (typeof data !== 'string') {
    return addError(vctx, {
      type: 'type',
      message: 'Expected type string',
      value: data,
      schemaPath: schemas[0]?.path
    });
  }
  return vctx;
}

const TYPE_VALIDATORS: Record<string, (vctx: ValidationContext, schemas: SchemaEntry[], data: any) => ValidationContext> = {
  string: validateString
};

// Value validation rules
function validateType(vctx: ValidationContext, schemas: SchemaEntry[], data: any): ValidationContext {
  const typeGroups: Record<string, SchemaEntry[]> = {};
  
  for (const schemaEntry of schemas) {
    const type = schemaEntry.schema;
    if (typeof type === 'string') {
      if (!typeGroups[type]) typeGroups[type] = [];
      typeGroups[type].push(schemaEntry);
    }
  }
  
  return Object.entries(typeGroups).reduce((ctx, [type, schemaEntries]) => {
    const validator = TYPE_VALIDATORS[type];
    if (validator) {
      return validator(ctx, schemaEntries, data);
    }
    // Ignore if no type validator (don't error)
    return ctx;
  }, vctx);
}

function validateChoices(vctx: ValidationContext, schemas: SchemaEntry[], data: Record<string, any>): ValidationContext {
  // Find choice elements in the data
  const choiceElements: Record<string, Record<string, any>> = {};
  
  for (const [key, value] of Object.entries(data)) {
    for (const schemaEntry of schemas) {
      const choiceOf = schemaEntry.parent?.elements?.[key]?.choiceOf;
      if (choiceOf) {
        if (!choiceElements[choiceOf]) choiceElements[choiceOf] = {};
        choiceElements[choiceOf][key] = value;
      }
    }
  }
  
  return Object.entries(choiceElements).reduce((ctx, [choiceKey, choices]) => {
    const choiceCount = Object.keys(choices).length;
    
    // Only one choice element is allowed
    if (choiceCount > 1) {
      ctx = addError(ctx, {
        type: 'choices/multiple',
        path: [...vctx.path, choiceKey],
        message: 'Only one choice element is allowed',
        value: choices
      });
    }
    
    // Validate against allowed choices
    return schemas.reduce((innerCtx, schemaEntry) => {
      const allowedChoices = schemaEntry.schema[choiceKey];
      if (allowedChoices) {
        const selectedChoice = Object.keys(choices)[0];
        if (selectedChoice && !allowedChoices.includes(selectedChoice)) {
          return addError(innerCtx, {
            type: 'choice/excluded',
            message: `Choice element ${choiceKey} is not allowed, only ${allowedChoices.join(', ')}`,
            path: [...vctx.path, choiceKey],
            schemaPath: schemaEntry.path
          });
        }
      }
      return innerCtx;
    }, ctx);
  }, vctx);
}

function validateRequired(vctx: ValidationContext, schemas: SchemaEntry[], data: Record<string, any>): ValidationContext {
  const elementsIndex: Record<string, SchemaEntry[]> = {};
  
  // Build index of required elements
  for (const schemaEntry of schemas) {
    const required = schemaEntry.schema;
    if (Array.isArray(required)) {
      for (const elementName of required) {
        if (!elementsIndex[elementName]) elementsIndex[elementName] = [];
        elementsIndex[elementName].push(schemaEntry);
      }
    }
  }
  
  return Object.entries(elementsIndex).reduce((ctx, [elementName, schemaEntries]) => {
    const hasValue = data[elementName] !== undefined && data[elementName] !== null;
    const hasExtension = data[`_${elementName}`] !== undefined && data[`_${elementName}`] !== null;
    
    if (!hasValue && !hasExtension) {
      return addError(ctx, {
        type: 'require',
        path: [...vctx.path, elementName],
        message: `Element ${elementName} is required`,
        schemaPaths: schemaEntries.map(entry => entry.path)
      });
    }
    
    return ctx;
  }, vctx);
}

function matchPattern(pattern: any, data: any): boolean {
  return JSON.stringify(pattern) === JSON.stringify(data);
}

function validatePattern(vctx: ValidationContext, schemas: SchemaEntry[], data: any): ValidationContext {
  return schemas.reduce((ctx, schemaEntry) => {
    const patterns = schemaEntry.schema;
    if (typeof patterns === 'object' && patterns !== null) {
      const patternValue = Object.values(patterns)[0];
      if (!matchPattern(patternValue, data)) {
        return addError(ctx, {
          type: 'pattern',
          expected: patternValue,
          schemaPath: schemaEntry.path,
          value: data
        });
      }
    }
    return ctx;
  }, vctx);
}

const VALUE_RULES = {
  type: validateType,
  choices: validateChoices,
  required: validateRequired,
  pattern: validatePattern
};

function validateValueRules(vctx: ValidationContext, data: any): ValidationContext {
  return Object.entries(VALUE_RULES).reduce((ctx, [ruleName, ruleFn]) => {
    const relevantSchemas = Array.from(ctx.schemas)
      .map(schemaEntry => {
        const rule = schemaEntry.schema[ruleName];
        if (rule) {
          return {
            schema: rule,
            parent: schemaEntry.schema,
            path: [...schemaEntry.path, ruleName]
          } as SchemaEntry;
        }
        return null;
      })
      .filter((entry): entry is SchemaEntry => entry !== null);
    
    if (relevantSchemas.length > 0) {
      return ruleFn(ctx, relevantSchemas, data);
    }
    
    return ctx;
  }, vctx);
}

// Schema addition based on data
function addSchemas(vctx: ValidationContext, data: any): ValidationContext {
  let result = vctx;
  
  // Only process data if it's a valid object
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    // Add schema based on resourceType
    if (data.resourceType) {
      result = addTypeSchema(result, data.resourceType, []);
    }
    
    // Add schemas based on meta.profile
    if (data.meta?.profile) {
      result = data.meta.profile.reduce((ctx: ValidationContext, profile: string) => {
        return addSchemaRef(ctx, profile, []);
      }, result);
    }
  }
  
  // Process base schemas and types
  const schemasToProcess = Array.from(result.schemas);
  for (const schemaEntry of schemasToProcess) {
    if (schemaEntry.schema.type) {
      result = addTypeSchema(result, schemaEntry.schema.type, [...schemaEntry.path, 'type']);
    }
    if (schemaEntry.schema.base) {
      result = addTypeSchema(result, schemaEntry.schema.base, [...schemaEntry.path, 'base']);
    }
  }
  
  return result;
}

// Primitive schema for handling primitive extensions
const primitiveSchema = {
  elements: {
    id: { type: 'code' },
    extension: { array: true, type: 'Extension' }
  }
};

function getElementSchemas(vctx: ValidationContext, key: string): Set<SchemaEntry> {
  let schemas = new Set<SchemaEntry>();
  
  // Handle primitive extensions
  if (key.startsWith('_')) {
    const elementKey = key.substring(1);
    const elementSchemas = getElementSchemas(vctx, elementKey);
    const hasArray = Array.from(elementSchemas).some(entry => entry.schema.array);
    
    schemas.add({
      schema: { ...primitiveSchema, array: hasArray },
      path: []
    });
  }
  
  // Get element schemas from current schemas
  for (const schemaEntry of vctx.schemas) {
    const elementSchema = schemaEntry.schema.elements?.[key];
    if (elementSchema) {
      schemas.add({
        schema: elementSchema,
        path: [...schemaEntry.path, key]
      });
    }
  }
  
  return schemas;
}

function checkItemInPrimitiveExtension(data: Record<string, any>, key: string, index: number): boolean {
  const extensionKey = `_${key}`;
  const extensionArray = data[extensionKey];
  return Array.isArray(extensionArray) && 
         extensionArray[index] !== undefined && 
         typeof extensionArray[index] === 'object';
}

// Forward declaration
let validateRecursive: (vctx: ValidationContext, data: any) => ValidationContext;

function validateElement(
  vctx: ValidationContext, 
  key: string, 
  value: any, 
  parentValue?: Record<string, any>
): ValidationContext {
  const arraySchema = isArray(vctx);
  
  if (arraySchema) {
    if (!Array.isArray(value)) {
      return addError(vctx, {
        type: 'type/array',
        message: 'Expected array',
        path: vctx.path,
        value,
        schemaPath: [...arraySchema.path, 'array']
      });
    }
    
    let result = validateArrayRules(vctx, value);
    const schemas = result.schemas;
    
    return reduceIndexed(value, (ctx, index, item) => {
      if (item === null && parentValue && checkItemInPrimitiveExtension(parentValue, key, index)) {
        return ctx;
      }
      
      return validateRecursive({
        ...ctx,
        path: [...vctx.path, index],
        schemas
      }, item);
    }, result);
  } else {
    if (Array.isArray(value)) {
      return addError(vctx, {
        type: 'type/array',
        message: 'Expected not array',
        path: vctx.path,
        value
      });
    }
    
    return validateRecursive({
      ...vctx,
      path: vctx.path
    }, value);
  }
}

// Main validation function
validateRecursive = function(vctx: ValidationContext, data: any): ValidationContext {
  let result = addSchemas(vctx, data);
  result = validateValueRules(result, data);
  
  const schemas = result.schemas;
  const path = result.path;
  
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return Object.entries(data).reduce((ctx, [key, value]) => {
      const elementSchemas = getElementSchemas({
        ...ctx,
        path,
        schemas
      }, key);
      
      if (elementSchemas.size > 0) {
        return validateElement({
          ...ctx,
          schemas: elementSchemas,
          path: [...path, key]
        }, key, value, data);
      } else {
        return addError(ctx, {
          type: 'element/unknown',
          path: [...path, key]
        });
      }
    }, result);
  }
  
  return result;
};

// Public API functions
function createValidationContext(
  ctx: { schemas: Record<string, any> }, 
  schemaRefs: string[], 
  resource: any
): ValidationContext {
  const vctx: ValidationContext = {
    ctx,
    errors: [],
    deferreds: [],
    resource,
    path: [],
    schemas: new Set()
  };
  
  return schemaRefs.reduce((context, schemaRef) => {
    return addSchemaRef(context, schemaRef, [schemaRef]);
  }, vctx);
}

export function validateSchemas(
  ctx: { schemas: Record<string, any> }, 
  schemas: any[], 
  resource: any
): ValidationResult {
  const vctx = createValidationContext(ctx, [], resource);
  
  const contextWithSchemas = schemas.reduce((context, schema) => {
    const newSchemas = new Set(context.schemas);
    newSchemas.add({ schema, path: [] });
    return { ...context, schemas: newSchemas };
  }, vctx);
  
  const result = validateRecursive(contextWithSchemas, resource);
  return {
    errors: result.errors,
    deferreds: result.deferreds
  };
}

export function validate(
  ctx: { schemas: Record<string, any> }, 
  schemaRefs: string[], 
  resource: any
): ValidationResult {
  const vctx = createValidationContext(ctx, schemaRefs, resource);
  const result = validateRecursive(vctx, resource);
  
  return {
    errors: result.errors,
    deferreds: result.deferreds
  };
}