/**
 * Example usage of the FHIRPath Parser
 * 
 * Demonstrates how to parse various FHIRPath expressions and handle results.
 */

import { FHIRPathParser, parse, validate } from './src/parser';

// Example 1: Simple literal expressions
console.log('=== Example 1: Literal Expressions ===');
const literals = [
  'true',
  'false',
  '42',
  "'hello world'",
  '@2023-01-01',
  '@2023-01-01T12:30:00Z',
  '{}',
  '10 "mg"'
];

for (const expr of literals) {
  const result = parse(expr);
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.ast.nodeType === 'literal') {
    console.log(`  Value: ${JSON.stringify((result.ast as any).value)}`);
  }
  if (result.errors.length > 0) {
    console.log(`  Errors: ${result.errors.map(e => e.message).join(', ')}`);
  }
  console.log();
}

// Example 2: Binary expressions
console.log('=== Example 2: Binary Expressions ===');
const binaryExpressions = [
  '1 + 2',
  '3 * 4',
  'true and false',
  "'hello' = 'world'",
  '10 > 5',
  '1 | 2 | 3'
];

for (const expr of binaryExpressions) {
  const result = parse(expr);
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.ast.resultType) {
    console.log(`  Result Type: ${result.ast.resultType.type}`);
  }
  if (result.errors.length > 0) {
    console.log(`  Errors: ${result.errors.map(e => e.message).join(', ')}`);
  }
  console.log();
}

// Example 3: Function calls
console.log('=== Example 3: Function Calls ===');
const functionCalls = [
  'length("hello")',
  'empty({})',
  'count(items)',
  'first(collection)',
  'sum(values)',
  'now()',
  'abs(-10)'
];

for (const expr of functionCalls) {
  const result = parse(expr);
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.ast.nodeType === 'function_call') {
    console.log(`  Function: ${(result.ast as any).name.name}`);
    console.log(`  Arguments: ${(result.ast as any).arguments.length}`);
  }
  if (result.ast.resultType) {
    console.log(`  Result Type: ${result.ast.resultType.type}`);
  }
  if (result.errors.length > 0) {
    console.log(`  Errors: ${result.errors.map(e => e.message).join(', ')}`);
  }
  console.log();
}

// Example 4: Member access and indexing
console.log('=== Example 4: Member Access and Indexing ===');
const memberExpressions = [
  'Patient.name',
  'Patient.name.given',
  'Patient.name[0]',
  'Patient.name.first().family',
  'Bundle.entry.resource'
];

for (const expr of memberExpressions) {
  const result = parse(expr);
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.errors.length > 0) {
    console.log(`  Errors: ${result.errors.map(e => e.message).join(', ')}`);
  }
  console.log();
}

// Example 5: Type operations
console.log('=== Example 5: Type Operations ===');
const typeExpressions = [
  'value is String',
  'element as Patient',
  'items.ofType(Observation)',
  'resource.where($this is Patient)'
];

for (const expr of typeExpressions) {
  const result = parse(expr);
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.ast.resultType) {
    console.log(`  Result Type: ${result.ast.resultType.type}`);
  }
  if (result.errors.length > 0) {
    console.log(`  Errors: ${result.errors.map(e => e.message).join(', ')}`);
  }
  console.log();
}

// Example 6: External constants
console.log('=== Example 6: External Constants ===');
const variableExpressions = [
  '%context',
  '%resource',
  '%rootResource',
  '%patient'
];

// Set up some variables for testing
const variables = {
  context: { resourceType: 'Patient' },
  resource: { resourceType: 'Observation' },
  rootResource: { resourceType: 'Bundle' },
  patient: { resourceType: 'Patient', id: '123' }
};

for (const expr of variableExpressions) {
  const result = parse(expr, { variables });
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.ast.resultType) {
    console.log(`  Result Type: ${result.ast.resultType.type}`);
  }
  if (result.warnings.length > 0) {
    console.log(`  Warnings: ${result.warnings.map(w => w.message).join(', ')}`);
  }
  console.log();
}

// Example 7: Complex expressions
console.log('=== Example 7: Complex Expressions ===');
const complexExpressions = [
  'Patient.name.where(use = "official").family',
  'Bundle.entry.resource.where(resourceType = "Patient").name.given',
  'Observation.value.where(value > 100 and unit = "mg/dL")',
  'Patient.telecom.where(system = "phone" and use = "home").value.first()',
  'Bundle.entry.resource.ofType(Observation).where(status = "final").count()'
];

for (const expr of complexExpressions) {
  const result = parse(expr);
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  AST Type: ${result.ast.nodeType}`);
  if (result.errors.length > 0) {
    console.log(`  Errors: ${result.errors.map(e => e.message).join(', ')}`);
  }
  if (result.warnings.length > 0) {
    console.log(`  Warnings: ${result.warnings.map(w => w.message).join(', ')}`);
  }
  console.log();
}

// Example 8: Error handling
console.log('=== Example 8: Error Handling ===');
const invalidExpressions = [
  'Patient.name.',
  'function(',
  '1 + + 2',
  'Patient..name',
  'unknownFunction()'
];

for (const expr of invalidExpressions) {
  const result = parse(expr, { allowErrors: true });
  console.log(`Expression: ${expr}`);
  console.log(`  Success: ${result.success}`);
  console.log(`  Errors: ${result.errors.length}`);
  result.errors.forEach(error => {
    console.log(`    - ${error.message}`);
  });
  console.log();
}

// Example 9: Using the parser class
console.log('=== Example 9: Using Parser Class ===');
const parser = new FHIRPathParser();

// Set up variables
parser.setTypeProvider({
  getTypeInfo: (path: string) => {
    if (path.startsWith('Patient.name')) {
      return { type: 'HumanName', isCollection: true, isOptional: false };
    }
    return null;
  },
  resolveFunction: (name: string, args: any[]) => {
    if (name === 'myCustomFunction') {
      return { type: 'String', isCollection: false, isOptional: false };
    }
    return null;
  },
  validateTypecast: (fromType: any, toType: string) => true
});

const customResult = parser.parse('Patient.name.myCustomFunction()');
console.log(`Custom function result: ${customResult.success}`);
if (customResult.errors.length > 0) {
  console.log(`Errors: ${customResult.errors.map(e => e.message).join(', ')}`);
}

console.log('\n=== Parser Examples Complete ==='); 