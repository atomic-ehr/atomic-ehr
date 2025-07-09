/**
 * AST Node Types for FHIRPath Compiler
 * 
 * Represents the typed Abstract Syntax Tree nodes for FHIRPath expressions.
 * Each node contains type information and source location for debugging.
 */

import type { FHIRPathType } from "./types";

export interface SourceLocation {
  line: number;
  column: number;
  startIndex: number;
  endIndex: number;
}

export interface TypeInfo {
  type: FHIRPathType;
  isCollection: boolean;
  isOptional: boolean;
}

export interface BaseNode {
  nodeType: string;
  location?: SourceLocation;
  text?: string; // Original source text
  resultType?: TypeInfo;
  errors?: CompilerError[];
}

export interface CompilerError {
  message: string;
  severity: 'error' | 'warning' | 'info';
  location?: SourceLocation;
}

// Expression nodes
export interface Expression extends BaseNode {
  nodeType: string;
}

export interface BinaryExpression extends Expression {
  nodeType: 'binary_expression';
  operator: string;
  left: Expression;
  right: Expression;
}

export interface UnaryExpression extends Expression {
  nodeType: 'unary_expression';
  operator: string;
  operand: Expression;
}

export interface MemberExpression extends Expression {
  nodeType: 'member_expression';
  object: Expression;
  property: Identifier | FunctionCall;
}

export interface IndexerExpression extends Expression {
  nodeType: 'indexer_expression';
  object: Expression;
  index: Expression;
}

export interface FunctionCall extends Expression {
  nodeType: 'function_call';
  name: Identifier;
  arguments: Expression[];
}

export interface TypeExpression extends Expression {
  nodeType: 'type_expression';
  operator: 'is' | 'as';
  operand: Expression;
  typeSpecifier: TypeSpecifier;
}

// Literals
export interface Literal extends Expression {
  nodeType: 'literal';
  literalType: string;
  value: any;
}

export interface NullLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'null';
  value: null;
}

export interface BooleanLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'boolean';
  value: boolean;
}

export interface StringLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'string';
  value: string;
}

export interface NumberLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'number';
  value: number;
}

export interface DateLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'date';
  value: string;
}

export interface DateTimeLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'datetime';
  value: string;
}

export interface TimeLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'time';
  value: string;
}

export interface QuantityLiteral extends Literal {
  nodeType: 'literal';
  literalType: 'quantity';
  value: number;
  unit?: string;
}

// Other nodes
export interface Identifier extends BaseNode {
  nodeType: 'identifier';
  name: string;
}

export interface ExternalConstant extends Expression {
  nodeType: 'external_constant';
  name: string;
}

export interface TypeSpecifier extends BaseNode {
  nodeType: 'type_specifier';
  qualifiedName: string[];
}

export interface ThisInvocation extends Expression {
  nodeType: 'this_invocation';
}

export interface IndexInvocation extends Expression {
  nodeType: 'index_invocation';
}

export interface TotalInvocation extends Expression {
  nodeType: 'total_invocation';
}

// Union type for all expression types
export type ASTNode = 
  | BinaryExpression
  | UnaryExpression
  | MemberExpression
  | IndexerExpression
  | FunctionCall
  | TypeExpression
  | NullLiteral
  | BooleanLiteral
  | StringLiteral
  | NumberLiteral
  | DateLiteral
  | DateTimeLiteral
  | TimeLiteral
  | QuantityLiteral
  | Identifier
  | ExternalConstant
  | TypeSpecifier
  | ThisInvocation
  | IndexInvocation
  | TotalInvocation; 