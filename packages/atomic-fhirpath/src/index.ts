import { CharStream, CommonTokenStream, BaseErrorListener, AbstractParseTreeVisitor } from 'antlr4ng';
import { fhirpathLexer } from './generated/fhirpathLexer.js';
import { fhirpathParser } from './generated/fhirpathParser.js';
import * as ParserContext from './generated/fhirpathParser.js';
import { FunctionsTable, compileInvocation, compileBinaryOperation, compileMemberInvocation } from './functions.js';

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
type BinaryOperationContext = ParserContext.AdditiveExpressionContext | ParserContext.MultiplicativeExpressionContext | ParserContext.InequalityExpressionContext | ParserContext.EqualityExpressionContext | ParserContext.ImpliesExpressionContext | ParserContext.OrExpressionContext | ParserContext.AndExpressionContext | ParserContext.MembershipExpressionContext;

// Custom error listener to collect parsing errors
class FHIRPathErrorListener extends BaseErrorListener {
  private errors: string[] = [];

  override syntaxError(
    recognizer: any,
    offendingSymbol: any,
    line: number,
    column: number,
    msg: string,
    e: any
  ): void {
    this.errors.push(`Line ${line}:${column} - ${msg}`);
  }

  getErrors(): string[] {
    return this.errors;
  }
}

const NULL_LITERAL = { type: 'NullLiteral' } as NullLiteralNode;

// FHIRPath AST Builder Visitor
export class FHIRPathASTBuilder extends AbstractParseTreeVisitor<ASTNode> {

  context: any;
  constructor(context: any) {
    super();
    this.context = context;
  }
  
  visitEntireExpression(ctx: ParserContext.EntireExpressionContext): ASTNode {
    const result = this.visit(ctx.expression());
    return result || NULL_LITERAL;
  }

  // Expression visitors
  visitLambdaExpression(ctx: ParserContext.LambdaExpressionContext): ASTNode {
    const parameter = ctx.identifier()?.getText();
    const body = this.visit(ctx.expression());
    
    return {
      type: 'Lambda',
      parameter,
      body: body || { type: 'NullLiteral' } as NullLiteralNode
    } as LambdaNode;
  }

  visitIndexerExpression(ctx: ParserContext.IndexerExpressionContext): ASTNode {
    const targetCtx = ctx.expression(0);
    const indexCtx = ctx.expression(1);
    const target = targetCtx ? this.visit(targetCtx) : null;
    const index = indexCtx ? this.visit(indexCtx) : null;
    
    return {
      type: 'Indexer',
      target: target || NULL_LITERAL,
      index: index || NULL_LITERAL
    } as IndexerNode;
  }

  visitPolarityExpression(ctx: ParserContext.PolarityExpressionContext): ASTNode {
    const operator = ctx.getChild(0)?.getText() || '';
    const operand = this.visit(ctx.expression());
    
    return {
      type: 'UnaryOperation',
      operator,
      operand: operand || NULL_LITERAL
    } as UnaryOperationNode;
  }

  visitAdditiveExpression(ctx: ParserContext.AdditiveExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }


  visitMultiplicativeExpression(ctx: ParserContext.MultiplicativeExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitInequalityExpression(ctx: ParserContext.InequalityExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitEqualityExpression(ctx: ParserContext.EqualityExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitImpliesExpression(ctx: ParserContext.ImpliesExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitUnionExpression(ctx: ParserContext.UnionExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitOrExpression(ctx: ParserContext.OrExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitAndExpression(ctx: ParserContext.AndExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitMembershipExpression(ctx: ParserContext.MembershipExpressionContext): ASTNode {
    return this.visitBinaryOperation(ctx);
  }

  visitBinaryOperation(ctx: BinaryOperationContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';

    return {
      type: 'BinaryOperation',
      operator,
      left: left || NULL_LITERAL,
      right: right || NULL_LITERAL,
      eval: compileBinaryOperation(ctx, operator, left || undefined, right || undefined)
    } as BinaryOperationNode;
  } 

  visitInvocationExpression(ctx: ParserContext.InvocationExpressionContext): ASTNode {
    const target = this.visit(ctx.expression());
    const invocation = this.visit(ctx.invocation());
    
    // Handle different types of invocations
    if (invocation?.type === 'Function') {
      const func = invocation as FunctionNode;
      let compileFunction = FunctionsTable[func.name as keyof typeof FunctionsTable] || this.context.functions[func.name];
      if (!compileFunction) {
        throw new Error(`Function ${func.name} not found`);
      }
      return {
        type: 'Function',
        name: func.name,
        parameters: [target, ...func.parameters].filter(Boolean),
        eval: compileFunction(this.context, target, func.parameters)
      } as FunctionNode;
    } else if (invocation?.type === 'Identifier') {
      const id = invocation as IdentifierNode;
      return {
        type: 'Invocation',
        target: target || NULL_LITERAL,
        member: id.name,
        eval: compileInvocation(this.context, id.name, target!)
      } as InvocationNode;
    }
    throw new Error(`Invalid invocation: ${invocation}`);
  }

  visitTermExpression(ctx: ParserContext.TermExpressionContext): ASTNode {
    const result = this.visit(ctx.term());
    return result || NULL_LITERAL;
  }

  visitTypeExpression(ctx: ParserContext.TypeExpressionContext): ASTNode {
    const left = this.visit(ctx.expression());
    const operator = ctx.getChild(1)?.getText() as 'is' | 'as';
    const right = ctx.typeSpecifier().getText();
    
    return {
      type: 'TypeOperation',
      operator,
      left: left || NULL_LITERAL,
      right
    } as TypeOperationNode;
  }

  // Term visitors
  visitInvocationTerm(ctx: ParserContext.InvocationTermContext): ASTNode {
    const result = this.visit(ctx.invocation());
    return result || NULL_LITERAL;
  }

  visitLiteralTerm(ctx: ParserContext.LiteralTermContext): ASTNode {
    const result = this.visit(ctx.literal());
    return result || NULL_LITERAL;
  }

  visitExternalConstantTerm(ctx: ParserContext.ExternalConstantTermContext): ASTNode {
    const result = this.visit(ctx.externalConstant());
    return result || NULL_LITERAL;
  }

  visitParenthesizedTerm(ctx: ParserContext.ParenthesizedTermContext): ASTNode {
    const result = this.visit(ctx.expression());
    return result || NULL_LITERAL;
  }

  // Literal visitors
  visitNullLiteral(ctx: ParserContext.NullLiteralContext): ASTNode {
    return NULL_LITERAL;
  }

  visitBooleanLiteral(ctx: ParserContext.BooleanLiteralContext): ASTNode {
    const value = ctx.getText() === 'true';
    return { type: 'BooleanLiteral', value, eval: ()=> value } as BooleanLiteralNode;
  }

  visitStringLiteral(ctx: ParserContext.StringLiteralContext): ASTNode {
    const text = ctx.getText();
    const value = text.slice(1, -1); // Remove quotes
    return { type: 'StringLiteral', value, eval: ()=> value } as StringLiteralNode;
  }

  visitNumberLiteral(ctx: ParserContext.NumberLiteralContext): ASTNode {
    const value = parseFloat(ctx.getText());
    return { type: 'NumberLiteral', value, eval: ()=> value } as NumberLiteralNode;
  }

  visitLongNumberLiteral(ctx: ParserContext.LongNumberLiteralContext): ASTNode {
    const value = parseFloat(ctx.getText());
    return { type: 'NumberLiteral', value, eval: ()=> value } as NumberLiteralNode;
  }

  parseDateLiteral(value: string): string {
    return value;
  }

  visitDateLiteral(ctx: ParserContext.DateLiteralContext): ASTNode {
    const value = this.parseDateLiteral(ctx.getText().slice(1)); // Remove @
    return { type: 'DateLiteral', value, eval: ()=> value } as DateLiteralNode;
  }

  parseDateTimeLiteral(value: string): string {
    return value;
  }

  visitDateTimeLiteral(ctx: ParserContext.DateTimeLiteralContext): ASTNode {
    const value = this.parseDateTimeLiteral(ctx.getText().slice(1)); // Remove @
    return { type: 'DateTimeLiteral', value, eval: ()=> value } as DateTimeLiteralNode;
  }

  parseTimeLiteral(value: string): string {
    return value;
  }

  visitTimeLiteral(ctx: ParserContext.TimeLiteralContext): ASTNode {
    const value = this.parseTimeLiteral(ctx.getText().slice(1)); // Remove @
    return { type: 'TimeLiteral', value, eval: ()=> value } as TimeLiteralNode;
  }

  parseQuantityLiteral(value: string): number {
    return parseFloat(value);
  }

  visitQuantityLiteral(ctx: ParserContext.QuantityLiteralContext): ASTNode {
    const value = this.parseQuantityLiteral(ctx.getText().slice(1)); // Remove @
    return { 
      type: 'Quantity', 
      value: value, 
      eval: ()=> {return {value: value, unit:undefined}}
    } as QuantityNode;
  }

  getExternalConstant(name: string): string {
    return this.context.constants[name];
  }

  visitExternalConstant(ctx: ParserContext.ExternalConstantContext): ASTNode {
    const name = ctx.identifier()?.getText() || ctx.STRING()?.getText()?.slice(1, -1) || '';
    const value = this.getExternalConstant(name);
    return { type: 'ExternalConstant', name, value, eval: ()=> value } as ExternalConstantNode;
  }

  // Invocation visitors
  visitMemberInvocation(ctx: ParserContext.MemberInvocationContext): ASTNode {
    const name = ctx.identifier().getText();
    return { 
        type: 'Identifier', 
        name,
        eval: compileMemberInvocation(this.context, name)
    } as IdentifierNode;
  }

  visitFunctionInvocation(ctx: ParserContext.FunctionInvocationContext): ASTNode {
    const result = this.visit(ctx.function());
    return result || NULL_LITERAL;
  }

  visitThisInvocation(ctx: ParserContext.ThisInvocationContext): ASTNode {
    return { type: 'ThisInvocation' } as ThisInvocationNode;
  }

  visitIndexInvocation(ctx: ParserContext.IndexInvocationContext): ASTNode {
    return { type: 'IndexInvocation' } as IndexInvocationNode;
  }

  visitTotalInvocation(ctx: ParserContext.TotalInvocationContext): ASTNode {
    return { type: 'TotalInvocation' } as TotalInvocationNode;
  }

  visitFunction(ctx: ParserContext.FunctionContext): ASTNode {
    const name = ctx.identifier().getText();
    const expressions = ctx.paramList()?.expression() || [];
    const parameters = (Array.isArray(expressions) ? expressions : [expressions])
      .map(expr => this.visit(expr))
      .filter(Boolean);
    
    return {
      type: 'Function',
      name,
      parameters
    } as FunctionNode;
  }

  parseQuantity(textValue: string, unit: string | undefined): number {
    const value = parseFloat(textValue);
    return value;
  }

  visitQuantity(ctx: ParserContext.QuantityContext): ASTNode {
    const unit = ctx.unit()?.getText();
    const textValue = ctx.NUMBER().getText();
    const value = this.parseQuantity(textValue, unit);
    return { type: 'Quantity', value, unit, eval: ()=> {return {value: value, unit:unit}}} as QuantityNode;
  }

  visitIdentifier(ctx: ParserContext.IdentifierContext): ASTNode {
    const name = ctx.getText();
    return { type: 'Identifier', name } as IdentifierNode;
  }
}

// Main parser function
export function parse_fhirpath(ctx: any, input: string): ParseResult {
  const errorListener = new FHIRPathErrorListener();
  
  // Create lexer
  const inputStream = CharStream.fromString(input);
  const lexer = new fhirpathLexer(inputStream);
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);
  
  // Create parser
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new fhirpathParser(tokenStream);
  parser.removeErrorListeners();
  parser.addErrorListener(errorListener);
  
  // Parse and build AST
  const tree = parser.entireExpression();
  const visitor = new FHIRPathASTBuilder(ctx);
  
  try {
    const ast = visitor.visit(tree);
    return {
      ast: ast || { type: 'NullLiteral' } as NullLiteralNode,
      errors: errorListener.getErrors()
    };
  } catch (error) {
    return {
      ast: { type: 'NullLiteral' } as NullLiteralNode,
      errors: [...errorListener.getErrors(), `AST building error: ${error}`]
    };
  }
}

let cache: {[key: string]: ParseResult} = {};

export function fhirpath(ctx:any, fhirpath: string, data?: any){
    let ast = cache[fhirpath] || parse_fhirpath(ctx, fhirpath);
    cache[fhirpath] = ast;
    try{
        let result = ast.ast.eval(ctx, data);
        return result;
    }catch(e: any){
        console.error('ERROR:',e.message, ast.ast);
        return null;
    }
}