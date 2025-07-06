// AST Node Types for FHIRPath
export type ASTNode = 
  | LiteralNode
  | IdentifierNode
  | BinaryOperationNode
  | UnaryOperationNode
  | InvocationNode
  | IndexerNode
  | FunctionNode
  | LambdaNode
  | TypeOperationNode
  | QuantityNode
  | ExternalConstantNode
  | ThisInvocationNode
  | IndexInvocationNode
  | TotalInvocationNode;

export interface BaseNode {
  type: string;
  location?: {
    start: number;
    end: number;
  };
  eval: (ctx: any, data: any) => any;
}

// Literal values
export type LiteralNode = 
  | StringLiteralNode
  | NumberLiteralNode
  | BooleanLiteralNode
  | DateLiteralNode
  | DateTimeLiteralNode
  | TimeLiteralNode
  | NullLiteralNode;

export interface StringLiteralNode extends BaseNode {
  type: 'StringLiteral';
  value: string;
}

export interface NumberLiteralNode extends BaseNode {
  type: 'NumberLiteral';
  value: number;
}

export interface BooleanLiteralNode extends BaseNode {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface DateLiteralNode extends BaseNode {
  type: 'DateLiteral';
  value: string;
}

export interface DateTimeLiteralNode extends BaseNode {
  type: 'DateTimeLiteral';
  value: string;
}

export interface TimeLiteralNode extends BaseNode {
  type: 'TimeLiteral';
  value: string;
}

export interface NullLiteralNode extends BaseNode {
  type: 'NullLiteral';
}

// Identifier
export interface IdentifierNode extends BaseNode {
  type: 'Identifier';
  name: string;
}

// Binary operations
export interface BinaryOperationNode extends BaseNode {
  type: 'BinaryOperation';
  operator: string;
  left: ASTNode;
  right: ASTNode;
}

// Unary operations
export interface UnaryOperationNode extends BaseNode {
  type: 'UnaryOperation';
  operator: string;
  operand: ASTNode;
}

// Invocation (member access)
export interface InvocationNode extends BaseNode {
  type: 'Invocation';
  target: ASTNode;
  member: string;
}

// Indexer
export interface IndexerNode extends BaseNode {
  type: 'Indexer';
  target: ASTNode;
  index: ASTNode;
}

// Function call
export interface FunctionNode extends BaseNode {
  type: 'Function';
  name: string;
  parameters: ASTNode[];
}

// Lambda expression
export interface LambdaNode extends BaseNode {
  type: 'Lambda';
  parameter?: string;
  body: ASTNode;
}

// Type operations (is, as)
export interface TypeOperationNode extends BaseNode {
  type: 'TypeOperation';
  operator: 'is' | 'as';
  left: ASTNode;
  right: string;
}

// Quantity with unit
export interface QuantityNode extends BaseNode {
  type: 'Quantity';
  value: number;
  unit?: string;
}

// External constant
export interface ExternalConstantNode extends BaseNode {
  type: 'ExternalConstant';
  name: string;
}

// Special invocation types
export interface ThisInvocationNode extends BaseNode {
  type: 'ThisInvocation';
}

export interface IndexInvocationNode extends BaseNode {
  type: 'IndexInvocation';
}

export interface TotalInvocationNode extends BaseNode {
  type: 'TotalInvocation';
}

// Parser result
export interface ParseResult {
  ast: ASTNode;
  errors: string[];
} 