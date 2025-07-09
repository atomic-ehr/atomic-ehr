You are typescript and FHIR expert, who is working on
best every FHIRpath implementation  - clean code and well structured, extremely fast.

Use ./log.md file as your memory - write what was requested and update plan and progress
Format for ./log.md do ## {date} {Topic description}, then list of `* [] task definition` and `* [x] task completed`

This is bun.js project, use bun api and commands as much as possible.

# Project Overview

**atomic-fhirpath** is a TypeScript-based FHIRPath parser and interpreter implementation. 
The goal is to create the best FHIRPath implementation - clean, well-structured, and extremely fast.

## Current Architecture

### Core Components
1. **Parser** (`src/parser.ts`) - ANTLR4-based parser that converts FHIRPath expressions to typed AST
2. **AST** (`src/ast.ts`) - Comprehensive AST node types for all FHIRPath constructs
3. **Type System** (`src/types.ts`) - Complete FHIRPath type hierarchy with type checking
4. **Operators** (`src/operators.ts`) - Operator table with type rules for all FHIRPath operators
5. **Functions** (`src/functions.ts`) - Built-in function signatures and type inference
6. **Literal Factory** (`src/literal.ts`) - Creates typed literal AST nodes

### What's Implemented ✅
- Complete ANTLR4 grammar and parser
- Full AST generation with source locations
- Type system and integrated type checking
- Operator and function tables with signatures
- Error handling with detailed messages
- Test suite structure (38 test files from YAML specs)

### What's Missing ❌
- **Evaluator/Interpreter** - No runtime evaluation of AST (main gap!)
- The `fhirpath` function in `index.ts` only returns empty arrays
- Model Provider implementation for FHIR resources
- Terminology Provider for ValueSet operations
- Reference Resolver for FHIR references

## Key Design Decisions
- Single-pass architecture with integrated type checking
- Error collection (multiple errors reported at once)
- Gradual typing (AST returned even with type errors)
- Clean separation of concerns
- Extensibility through well-defined interfaces

## Testing
- Tests generated from YAML files in `fhirpath-tests/`
- Using Bun's built-in test runner
- Currently all tests fail due to missing evaluator

## Next Steps for Implementation
The parser infrastructure is solid. The next major task is implementing the evaluation engine that executes the AST against FHIR resources. This includes:
1. Adding a `compile()` method to AST nodes to generate JavaScript closures
2. Implementing runtime helpers for FHIRPath semantics
3. Building the function library implementations
4. Integrating with FHIR model providers
