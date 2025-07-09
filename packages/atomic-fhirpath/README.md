# FHIRPath Implementation

A high-performance FHIRPath expression parser and evaluator built with TypeScript and Bun. This implementation aims to be the best FHIRPath implementation - clean code, well-structured, and extremely fast.

## Features

- **Single-pass parser** with integrated type checking
- **Comprehensive type system** based on FHIRPath specification
- **Full operator support** including arithmetic, comparison, logical, and collection operators
- **Complete function library** with all standard FHIRPath functions
- **FHIR-aware** with support for FHIR-specific functions like `resolve()` and `memberOf()`
- **Excellent error messages** with source location and context
- **Fast performance** using Bun runtime

## Installation

```bash
bun install
```

## Usage

```typescript
import { parse } from './src/parser';

// Parse with type checking (default)
const result = parse('Patient.name.given.first()');
if (result.success) {
  console.log(result.ast);
}

// Parse without type checking
const syntaxOnly = parse('Patient.name', { typeCheck: false });

// Parse with context type
const withContext = parse('name.given', {
  contextType: { type: FHIRPathType.Resource, isCollection: false, isOptional: false }
});
```

## Architecture

### Overview

The codebase follows a clean, modular architecture with clear separation of concerns:

```
src/
├── parser.ts          # Main parser with integrated compilation
├── ast.ts             # AST node type definitions
├── types.ts           # Type system and interfaces
├── operators.ts       # Operator table and type rules
├── functions.ts       # Function table and signatures
├── literal.ts         # Literal value parsing
├── parser/            # ANTLR-generated parser files
└── index.ts           # Public API (fhirpath function)
```

### Key Components

#### Parser (`parser.ts`)
The heart of the implementation. Contains:
- **FHIRPathParser**: Main visitor class that converts ANTLR parse tree to typed AST
- **FHIRPathErrorListener**: Custom error handling with helpful messages
- **parse()**: Single entry point for parsing with optional type checking
- **formatErrors()**: Utility for formatting errors with source context

#### AST (`ast.ts`)
Defines all AST node types:
- **Expression nodes**: BinaryExpression, UnaryExpression, MemberExpression, etc.
- **Literal nodes**: StringLiteral, NumberLiteral, BooleanLiteral, etc.
- **Special nodes**: FunctionCall, TypeExpression, Identifier
- Each node includes location info, original text, and result type

#### Type System (`types.ts`)
Comprehensive type system:
- **FHIRPathType enum**: All supported types (Boolean, String, Integer, etc.)
- **TypeInfo interface**: Type with collection/optional flags
- **FHIRPathContext**: External dependencies (model provider, terminology, etc.)
- **Type compatibility rules**: For type checking and inference

#### Operators (`operators.ts`)
Operator definitions and type rules:
- Complete operator table with input/output types
- Supports all FHIRPath operators
- Type checking for operator compatibility

#### Functions (`functions.ts`)
Comprehensive function library:
- All standard FHIRPath functions
- Parameter validation and type checking
- Dynamic return type inference for context-dependent functions
- Detailed documentation from the spec

### Design Decisions

1. **Single-Pass Architecture**: The parser performs type checking during AST construction, eliminating the need for separate passes.

2. **Unified API**: Single `parse()` function with optional type checking, replacing separate compile/parse functions.

3. **Error Handling**: Errors are collected rather than thrown, allowing multiple errors to be reported. Syntax errors prevent AST creation, but type errors don't.

4. **Context Pattern**: External dependencies (FHIR model, terminology) are provided through FHIRPathContext interface.

5. **Type Inference**: Functions like `select()` and `where()` have dynamic return types based on their inputs.

### Extension Points

- **Custom Functions**: Add entries to the functions table
- **Model Provider**: Implement FHIRModelProvider for FHIR type information
- **Terminology Provider**: Implement for ValueSet membership checking
- **Reference Resolver**: Implement for resolving FHIR references

## Development

### Running Tests

```bash
# Run all tests
bun test

# Run parser tests
bun test tests/parser.test.ts

# Run specific test suites
bun test tests/*.test.ts
```

### Project Structure

```
.
├── src/               # Source code
├── tests/             # Test suites
├── spec.md           # FHIRPath specification reference
├── log.md            # Development log and decisions
└── CLAUDE.md         # AI assistant instructions
```

## Contributing

This project aims to be the best FHIRPath implementation. Contributions should maintain:
- Clean, well-structured code
- Comprehensive test coverage
- Excellent performance
- Clear documentation

## License

[License information here]

---

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
