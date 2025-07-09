import { CharStreams } from 'antlr4ts/CharStreams';
import { CommonTokenStream } from 'antlr4ts/CommonTokenStream';
import { ConsoleErrorListener } from 'antlr4ts/ConsoleErrorListener';
import { fhirpathLexer } from './parser/fhirpathLexer';
import { fhirpathParser } from './parser/fhirpathParser';
import type { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';
import { Token } from 'antlr4ts/Token';
import type { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import type { ParseTree } from 'antlr4ts/tree/ParseTree';
import type { RuleNode } from 'antlr4ts/tree/RuleNode';
import type { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import type { ParserRuleContext } from 'antlr4ts';
import type { ASTNode, SourceLocation, CompilerError } from './ast';
import type { TermExpressionContext, InvocationExpressionContext, IndexerExpressionContext, PolarityExpressionContext, MultiplicativeExpressionContext, AdditiveExpressionContext, TypeExpressionContext, UnionExpressionContext, InequalityExpressionContext, EqualityExpressionContext, MembershipExpressionContext, AndExpressionContext, OrExpressionContext, ImpliesExpressionContext, NullLiteralContext, BooleanLiteralContext, StringLiteralContext, NumberLiteralContext, DateLiteralContext, DateTimeLiteralContext, TimeLiteralContext, QuantityLiteralContext, MemberInvocationContext, FunctionInvocationContext, ThisInvocationContext, IndexInvocationContext, TotalInvocationContext, InvocationTermContext, LiteralTermContext, ExternalConstantTermContext, ParenthesizedTermContext, ExpressionContext, TermContext, LiteralContext, ExternalConstantContext, InvocationContext, FunctionContext, ParamListContext, QuantityContext, UnitContext, DateTimePrecisionContext, PluralDateTimePrecisionContext, TypeSpecifierContext, QualifiedIdentifierContext, IdentifierContext } from './parser/fhirpathParser';
import type { fhirpathVisitor } from './parser/fhirpathVisitor';
import type { Expression, BinaryExpression, UnaryExpression, MemberExpression, IndexerExpression, FunctionCall, TypeExpression, NullLiteral, BooleanLiteral, StringLiteral, NumberLiteral, DateLiteral, DateTimeLiteral, TimeLiteral, QuantityLiteral, Identifier, ExternalConstant, TypeSpecifier, ThisInvocation, IndexInvocation, TotalInvocation } from './ast';
import { FHIRPathType, TypeSystem, TypeEnvironment } from './types';
import type { TypeInfo, FHIRPathContext, FHIRPathParserOptions } from './types';
import { getOperatorTableEntry } from './operators';
import { getFunctionTableEntry, validateFunctionCall, resolveFunctionReturnType } from './functions';
import { LiteralFactory } from './literal';

/**
 * Custom error listener for FHIRPath parser that collects syntax errors
 * with detailed location information and contextual error messages.
 */
class FHIRPathErrorListener<T> implements ANTLRErrorListener<T> {
  private errors: CompilerError[] = [];
  private source: string;
  private maxErrors: number = 100;

  constructor(source: string) {
    this.source = source;
  }

  syntaxError<S extends T>(
    recognizer: Recognizer<S, any>,
    offendingSymbol: S | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined
  ): void {
    // Prevent infinite error collection
    if (this.errors.length >= this.maxErrors) {
      return;
    }

    const location: SourceLocation = {
      line,
      column: charPositionInLine + 1, // Convert to 1-based
      startIndex: offendingSymbol && typeof offendingSymbol === 'object' && 'startIndex' in offendingSymbol 
        ? (offendingSymbol as any).startIndex 
        : charPositionInLine,
      endIndex: offendingSymbol && typeof offendingSymbol === 'object' && 'stopIndex' in offendingSymbol 
        ? (offendingSymbol as any).stopIndex + 1 
        : charPositionInLine + 1
    };

    // Create enhanced error message with context
    const enhancedMessage = this.enhanceErrorMessage(msg, line, charPositionInLine, offendingSymbol);

    this.errors.push({
      message: enhancedMessage,
      severity: 'error',
      location
    });
  }

  /**
   * Enhance error message with source context and suggestions
   */
  private enhanceErrorMessage(
    msg: string,
    line: number,
    column: number,
    offendingSymbol?: T
  ): string {
    // Extract the problematic line from source
    const lines = this.source.split('\n');
    const errorLine = lines[line - 1] || '';
    
    // Create visual indicator of error position
    const pointer = ' '.repeat(column) + '^';
    
    // Build enhanced message
    let enhanced = msg;
    
    // Add common fixes for typical errors
    if (msg.includes("missing") && msg.includes("')'")) {
      enhanced += " - check for unclosed parentheses";
    } else if (msg.includes("missing") && msg.includes("']'")) {
      enhanced += " - check for unclosed brackets";
    } else if (msg.includes("extraneous input")) {
      enhanced += " - unexpected token, check syntax";
    } else if (msg.includes("mismatched input")) {
      const token = offendingSymbol && typeof offendingSymbol === 'object' && 'text' in offendingSymbol 
        ? (offendingSymbol as any).text 
        : undefined;
      if (token) {
        enhanced += ` - unexpected '${token}'`;
      }
    }
    
    // Add source context
    enhanced += `\n  ${line} | ${errorLine}\n  ${' '.repeat(String(line).length)} | ${pointer}`;
    
    return enhanced;
  }

  /**
   * Get all collected errors
   */
  getErrors(): CompilerError[] {
    return this.errors;
  }

  /**
   * Check if any errors were collected
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Clear all collected errors
   */
  clearErrors(): void {
    this.errors = [];
  }
}

/**
 * Error recovery strategy helper for common FHIRPath syntax errors
 */
class FHIRPathErrorRecovery {
  /**
   * Suggest fixes for common syntax errors
   */
  static suggestFix(error: CompilerError): string | undefined {
    const msg = error.message.toLowerCase();
    
    if (msg.includes('missing') && msg.includes('identifier')) {
      return "Add an identifier (e.g., property name or function name)";
    }
    
    if (msg.includes('no viable alternative')) {
      return "Check expression syntax - this token cannot appear here";
    }
    
    if (msg.includes('mismatched') && msg.includes('eof')) {
      return "Expression ends unexpectedly - may be missing closing bracket or quote";
    }
    
    return undefined;
  }
}

type BinaryExpressionContext =
  | AndExpressionContext
  | OrExpressionContext
  | ImpliesExpressionContext
  | EqualityExpressionContext
  | InequalityExpressionContext
  | MembershipExpressionContext
  | UnionExpressionContext
  | TypeExpressionContext
  | AdditiveExpressionContext
  | MultiplicativeExpressionContext
  | PolarityExpressionContext
  | IndexerExpressionContext
  | InvocationExpressionContext
  | TermExpressionContext;

/**
 * Enhanced FHIRPath parser that performs parsing and type checking in a single pass
 */
export class FHIRPathParser implements fhirpathVisitor<ASTNode> {
  private errors: CompilerError[] = [];
  private context: FHIRPathContext;
  private options: FHIRPathParserOptions;
  
  constructor(context: FHIRPathContext, options?: FHIRPathParserOptions) {
    this.context = context;
    this.options = options || {};
  }
  
  getErrors(): CompilerError[] {
    return this.errors;
  }
  
  private addError(node: ASTNode | ParserRuleContext | Expression, message: string, severity: 'error' | 'warning' = 'error'): void {
    const location = 'location' in node ? node.location : this.getLocation(node as ParserRuleContext);
    this.errors.push({ message, severity, location });
  }
  
  private getLocation(ctx: ParserRuleContext): SourceLocation {
    const start = ctx.start;
    const stop = ctx.stop || ctx.start;
    
    return {
      line: start.line,
      column: start.charPositionInLine + 1,
      startIndex: start.startIndex,
      endIndex: stop.stopIndex + 1
    };
  }
  
  private getText(ctx: ParserRuleContext): string {
    return ctx.text;
  }
  
  private getOperatorText(ctx: any, startIndex: number = 0): string {
    for (let i = startIndex; i < ctx.childCount; i++) {
      const child = ctx.getChild(i);
      if (child) {
        let text: string | undefined;
        
        if ('getText' in child && typeof child.getText === 'function') {
          text = child.getText();
        } else if ('text' in child) {
          text = child.text;
        } else if ('symbol' in child && child.symbol && 'text' in child.symbol) {
          text = child.symbol.text;
        }
        
        if (text && text.length > 0 && text !== '(' && text !== ')') {
          return text;
        }
      }
    }
    return '';
  }

  // Expression methods with integrated type checking
  
  visitTermExpression(ctx: TermExpressionContext): ASTNode {
    return this.visit(ctx.term());
  }

  visitInvocationExpression(ctx: InvocationExpressionContext): ASTNode {
    const object = this.visit(ctx.expression()) as Expression;
    const invocation = this.visit(ctx.invocation());
    
    // Special handling for function calls - check if they accept collections
    let resultType: TypeInfo;
    if (invocation.nodeType === 'function_call') {
      const functionCall = invocation as FunctionCall;
      const functionName = functionCall.name.name;
      const functionEntry = getFunctionTableEntry(functionName);
      
      if (functionEntry) {
        // Check if function accepts collections
        if (!functionEntry.acceptsCollection && object.resultType?.isCollection) {
          this.addError(ctx, `Function ${functionName} does not accept collections`);
        }
        
        // Get argument types for type inference
        const argumentTypes = functionCall.arguments.map(arg => 
          arg.resultType || { type: FHIRPathType.Any, isCollection: false, isOptional: true }
        );
        
        // Resolve the return type using context and argument types
        resultType = resolveFunctionReturnType(
          functionEntry,
          object.resultType || { type: FHIRPathType.Any, isCollection: false, isOptional: true },
          argumentTypes
        );
      } else {
        resultType = invocation.resultType || { 
          type: FHIRPathType.Any, 
          isCollection: false,
          isOptional: true 
        };
      }
    } else if (invocation.nodeType === 'identifier') {
      // For property access, we need to resolve based on the object's type
      const identifier = invocation as Identifier;
      if (object.resultType && this.context.modelProvider) {
        const propertyType = this.context.modelProvider.getPropertyType(
          object.resultType.type,
          identifier.name
        );
        resultType = propertyType || { type: FHIRPathType.Any, isCollection: true, isOptional: true };
      } else {
        resultType = invocation.resultType || { 
          type: FHIRPathType.Any, 
          isCollection: object.resultType?.isCollection || false,
          isOptional: true 
        };
      }
    } else {
      // For other invocations, use their result type
      resultType = invocation.resultType || { 
        type: FHIRPathType.Any, 
        isCollection: false,
        isOptional: true 
      };
    }
    
    const node: MemberExpression = {
      nodeType: 'member_expression',
      object: object,
      property: invocation as Identifier | FunctionCall,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType
    };
    
    return node;
  }

  visitIndexerExpression(ctx: IndexerExpressionContext): ASTNode {
    const object = this.visit(ctx.expression(0)!) as Expression;
    const index = this.visit(ctx.expression(1)!) as Expression;
    
    const node: IndexerExpression = {
      nodeType: 'indexer_expression',
      object: object,
      index: index,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: {
        type: object.resultType?.type || FHIRPathType.Any,
        isCollection: false,
        isOptional: true
      }
    };
    
    return node;
  }

  visitPolarityExpression(ctx: PolarityExpressionContext): ASTNode {
    const operator = this.getOperatorText(ctx) || '+';
    const operand = this.visit(ctx.expression()) as Expression;
    
    const node: UnaryExpression = {
      nodeType: 'unary_expression',
      operator: operator,
      operand: operand,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: operand.resultType || { type: FHIRPathType.Any, isCollection: false, isOptional: true }
    };
    
    return node;
  }

  visitTypeExpression(ctx: TypeExpressionContext): ASTNode {
    const operand = this.visit(ctx.expression()) as Expression;
    const typeSpecifier = this.visit(ctx.typeSpecifier()) as TypeSpecifier;
    
    const operatorText = this.getOperatorText(ctx, 1);
    const operator: 'is' | 'as' = operatorText === 'as' ? 'as' : 'is';
    
    const resultType = operator === 'is' 
      ? { type: FHIRPathType.Boolean, isCollection: false, isOptional: false }
      : { 
          type: FHIRPathType.Any, // TODO: Map type specifier to proper FHIRPathType
          isCollection: operand.resultType?.isCollection || false, 
          isOptional: true 
        };
    
    const node: TypeExpression = {
      nodeType: 'type_expression',
      operator: operator,
      operand: operand,
      typeSpecifier: typeSpecifier,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType
    };
    
    return node;
  }

  // Binary operator expression methods
  
  visitBinaryOperatorExpression(ctx: any, operator: string): ASTNode {
    const operatorTableEntry = getOperatorTableEntry(ctx, operator);

    const left = this.visit(ctx.expression(0)!) as Expression;
    const right = this.visit(ctx.expression(1)!) as Expression;

    // Type check left and right
    let errors: CompilerError[] = [];
    if (left.resultType?.type !== operatorTableEntry?.left.type && left.resultType?.type !== FHIRPathType.Any) {
      errors.push({
        message: `Left operand of "${operator}" must be ${operatorTableEntry?.left.type}, but got ${left.resultType?.type}`,
        severity: 'error',
        location: this.getLocation(ctx),
      });
    }
    if (right.resultType?.type !== operatorTableEntry?.right.type && right.resultType?.type !== FHIRPathType.Any) {
      errors.push({
        message: `Right operand of "${operator}" must be ${operatorTableEntry?.right.type}, but got ${right.resultType?.type}`,
        severity: 'error',
        location: this.getLocation(ctx),
      });
    }

    const node: BinaryExpression = {
      nodeType: 'binary_expression',
      operator: operator,
      left: left,
      right: right,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: operatorTableEntry?.returnType || { type: FHIRPathType.Any, isCollection: false, isOptional: false },
      errors: errors,
    };
    
    return node;

  }

  visitMultiplicativeExpression(ctx: MultiplicativeExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, this.getOperatorText(ctx, 1) || '*');
  }

  visitAdditiveExpression(ctx: AdditiveExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, this.getOperatorText(ctx, 1) || '+');
  }

  visitMembershipExpression(ctx: MembershipExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, this.getOperatorText(ctx, 1) || 'in');
  }

  visitUnionExpression(ctx: UnionExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, '|');
  }

  visitInequalityExpression(ctx: InequalityExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, this.getOperatorText(ctx, 1));
  }

  visitEqualityExpression(ctx: EqualityExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, this.getOperatorText(ctx, 1) || '=');
  }

  visitAndExpression(ctx: AndExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, 'and');
  }

  visitOrExpression(ctx: OrExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, 'or');
  }

  visitImpliesExpression(ctx: ImpliesExpressionContext): ASTNode {
    return this.visitBinaryOperatorExpression(ctx, 'implies');
  }

  // Literal methods with type assignment
  
  visitNullLiteral(ctx: NullLiteralContext): ASTNode {
    return LiteralFactory.createNullLiteral(ctx);
  }

  visitBooleanLiteral(ctx: BooleanLiteralContext): ASTNode {
    return LiteralFactory.createBooleanLiteral(ctx);
  }

  visitStringLiteral(ctx: StringLiteralContext): ASTNode {
    return LiteralFactory.createStringLiteral(ctx);
  }

  visitNumberLiteral(ctx: NumberLiteralContext): ASTNode {
    return LiteralFactory.createNumberLiteral(ctx);
  }

  visitDateLiteral(ctx: DateLiteralContext): ASTNode {
    return LiteralFactory.createDateLiteral(ctx);
  }

  visitDateTimeLiteral(ctx: DateTimeLiteralContext): ASTNode {
    return LiteralFactory.createDateTimeLiteral(ctx);
  }

  visitTimeLiteral(ctx: TimeLiteralContext): ASTNode {
    return LiteralFactory.createTimeLiteral(ctx);
  }

  visitQuantityLiteral(ctx: QuantityLiteralContext): ASTNode {
    return LiteralFactory.createQuantityLiteral(ctx);
  }

  // Invocation methods
  
  visitMemberInvocation(ctx: MemberInvocationContext): ASTNode {
    return this.visit(ctx.identifier());
  }

  visitFunctionInvocation(ctx: FunctionInvocationContext): ASTNode {
    return this.visit(ctx.function());
  }

  visitThisInvocation(ctx: ThisInvocationContext): ASTNode {
    const contextType = this.options.contextType;
    
    const node: ThisInvocation = {
      nodeType: 'this_invocation',
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: contextType || { type: FHIRPathType.Any, isCollection: false, isOptional: true }
    };
    
    if (!contextType) {
      this.addError(node, '$this used outside of valid context');
    }
    
    return node;
  }

  visitIndexInvocation(ctx: IndexInvocationContext): ASTNode {
    const node: IndexInvocation = {
      nodeType: 'index_invocation',
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false }
    };
    
    return node;
  }

  visitTotalInvocation(ctx: TotalInvocationContext): ASTNode {
    const node: TotalInvocation = {
      nodeType: 'total_invocation',
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false }
    };
    
    return node;
  }

  // Term methods
  
  visitInvocationTerm(ctx: InvocationTermContext): ASTNode {
    return this.visit(ctx.invocation());
  }

  visitLiteralTerm(ctx: LiteralTermContext): ASTNode {
    return this.visit(ctx.literal());
  }

  visitExternalConstantTerm(ctx: ExternalConstantTermContext): ASTNode {
    return this.visit(ctx.externalConstant());
  }

  visitParenthesizedTerm(ctx: ParenthesizedTermContext): ASTNode {
    return this.visit(ctx.expression());
  }

  visitExpression(ctx: ExpressionContext): ASTNode {
    return ctx.accept(this);
  }

  visitTerm(ctx: TermContext): ASTNode {
    return ctx.accept(this);
  }

  visitLiteral(ctx: LiteralContext): ASTNode {
    return ctx.accept(this);
  }

  visitExternalConstant(ctx: ExternalConstantContext): ASTNode {
    const identifier = ctx.identifier();
    const string = ctx.STRING();
    
    let name: string;
    if (identifier) {
      name = identifier.text;
    } else if (string) {
      name = string.text.slice(1, -1);
    } else {
      name = '';
    }
    
    const node: ExternalConstant = {
      nodeType: 'external_constant',
      name: name,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType: { type: FHIRPathType.Any, isCollection: false, isOptional: true }
    };
    
    return node;
  }

  visitInvocation(ctx: InvocationContext): ASTNode {
    return ctx.accept(this);
  }

  visitFunction(ctx: FunctionContext): ASTNode {
    const name = this.visit(ctx.identifier()) as Identifier;
    const args: Expression[] = [];
    
    const paramList = ctx.paramList();
    if (paramList) {
      const expressions = paramList.expression();
      for (const expr of expressions) {
        args.push(this.visit(expr) as Expression);
      }
    }

    const functionName = name.name;
    const functionEntry = getFunctionTableEntry(functionName);
    const contextType = this.options.contextType || { type: FHIRPathType.Any, isCollection: false, isOptional: true };
    let resultType: TypeInfo;
    if (functionEntry) {
      const argumentTypes = args.map(arg => arg.resultType || { type: FHIRPathType.Any, isCollection: false, isOptional: true });
      resultType = resolveFunctionReturnType(functionEntry, contextType, argumentTypes);
    } else {
      resultType = { type: FHIRPathType.Any, isCollection: true, isOptional: true };
      this.addError(ctx, `Unknown function: ${functionName}`);
    }
    
    const node: FunctionCall = {
      nodeType: 'function_call',
      name: name,
      arguments: args,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType
    };
    
    return node;
  }

  visitTypeSpecifier(ctx: TypeSpecifierContext): ASTNode {
    const qualifiedIdentifier = ctx.qualifiedIdentifier();
    const identifiers = qualifiedIdentifier.identifier();
    const qualifiedName = identifiers.map(id => id.text);
    
    const node: TypeSpecifier = {
      nodeType: 'type_specifier',
      qualifiedName: qualifiedName,
      location: this.getLocation(ctx),
      text: this.getText(ctx)
    };
    
    return node;
  }

  visitIdentifier(ctx: IdentifierContext): ASTNode {
    const identifier = ctx.IDENTIFIER();
    const delimitedIdentifier = ctx.DELIMITEDIDENTIFIER();
    
    let name: string;
    if (identifier) {
      name = identifier.text;
    } else if (delimitedIdentifier) {
      name = delimitedIdentifier.text.slice(1, -1);
    } else {
      name = '';
    }
    
    // Determine the type of this identifier
    const contextType = this.options.contextType;
    let resultType: TypeInfo;
    
    // Special variables
    if (name === '$this') {
      resultType = contextType || { type: FHIRPathType.Any, isCollection: false, isOptional: true };
    } else if (name === '$index') {
      resultType = { type: FHIRPathType.Integer, isCollection: false, isOptional: false };
    } else if (name === '$total') {
      resultType = { type: FHIRPathType.Integer, isCollection: false, isOptional: false };
    } else if (contextType && name === contextType.type) {
      // It's the resource type itself
      resultType = contextType;
    } else if (contextType && this.context.modelProvider) {
      // It's a property access - use model provider to get the type
      const propertyType = this.context.modelProvider.getPropertyType(contextType.type, name);
      resultType = propertyType || { type: FHIRPathType.Any, isCollection: true, isOptional: true };
    } else {
      // Default to Any if we can't resolve
      resultType = { type: FHIRPathType.Any, isCollection: true, isOptional: true };
    }
    
    const node: Identifier = {
      nodeType: 'identifier',
      name: name,
      location: this.getLocation(ctx),
      text: this.getText(ctx),
      resultType
    };
    
    return node;
  }

  visit(tree: ParseTree): ASTNode {
    return tree.accept(this);
  }

  // Methods that should not be called directly
  
  visitParamList(ctx: ParamListContext): ASTNode {
    throw new Error('visitParamList should not be called directly');
  }

  visitQuantity(ctx: QuantityContext): ASTNode {
    throw new Error('visitQuantity should not be called directly');
  }

  visitUnit(ctx: UnitContext): ASTNode {
    throw new Error('visitUnit should not be called directly');
  }

  visitDateTimePrecision(ctx: DateTimePrecisionContext): ASTNode {
    throw new Error('visitDateTimePrecision should not be called directly');
  }

  visitPluralDateTimePrecision(ctx: PluralDateTimePrecisionContext): ASTNode {
    throw new Error('visitPluralDateTimePrecision should not be called directly');
  }

  visitQualifiedIdentifier(ctx: QualifiedIdentifierContext): ASTNode {
    throw new Error('visitQualifiedIdentifier should not be called directly');
  }

  visitChildren(node: RuleNode): ASTNode {
    throw new Error('visitChildren should not be called directly');
  }

  visitTerminal(node: TerminalNode): ASTNode {
    throw new Error('visitTerminal should not be called directly');
  }

  visitErrorNode(node: ErrorNode): ASTNode {
    throw new Error('visitErrorNode should not be called directly');
  }
  
  // Type checking helpers
}

/**
 * Parse result containing AST and any errors
 */
export interface ParseResult {
  ast: ASTNode | null;
  errors: CompilerError[];
  success: boolean;
}

/**
 * Parse options
 */
export interface ParseOptions {
  /**
   * Whether to perform type checking (default: true)
   */
  typeCheck?: boolean;
  
  /**
   * FHIRPath context providing model info, terminology, etc.
   */
  context?: FHIRPathContext;
  
  /**
   * Context type for type checking (e.g., "Patient")
   */
  contextType?: TypeInfo;
  
  /**
   * Maximum number of errors to collect
   */
  maxErrors?: number;
  
  /**
   * Strict type checking
   */
  strict?: boolean;
}


/**
 * Parse a FHIRPath expression with optional type checking
 */
export function parse(expression: string, options: ParseOptions = {}): ParseResult {
  const errors: CompilerError[] = [];
  
  try {
    // Create lexer
    const inputStream = CharStreams.fromString(expression);
    const lexer = new fhirpathLexer(inputStream);
    
    // Remove default console error listener
    lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);
    
    // Add custom error listener
    const lexerErrorListener = new FHIRPathErrorListener<number>(expression);
    lexer.addErrorListener(lexerErrorListener);
    
    // Create parser
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new fhirpathParser(tokenStream);
    
    // Remove default console error listener
    parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
    
    // Add custom error listener
    const parserErrorListener = new FHIRPathErrorListener<Token>(expression);
    parser.addErrorListener(parserErrorListener);
    
    // Parse the expression
    const parseTree = parser.expression();
    
    // Collect syntax errors
    errors.push(...lexerErrorListener.getErrors());
    errors.push(...parserErrorListener.getErrors());
    
    // If syntax errors, return early
    if (errors.length > 0) {
      return {
        ast: null,
        errors,
        success: false
      };
    }
    
    // Default to type checking unless explicitly disabled
    const typeCheck = options.typeCheck !== false;
    
    if (typeCheck) {
      // Create a default context if none provided
      const context: FHIRPathContext = options.context || {
        modelProvider: {
          getTypeInfo: () => undefined,
          getPropertyType: () => undefined,
          isSubtypeOf: () => false
        }
      };
      
      // Create parser options
      const parserOptions: FHIRPathParserOptions = {
        contextType: options.contextType,
        strict: options.strict
      };
      
      // Convert parse tree to AST with integrated type checking
      const visitor = new FHIRPathParser(context, parserOptions);
      const ast = visitor.visit(parseTree);
      
      // Collect type checking errors
      const typeErrors = visitor.getErrors();
      errors.push(...typeErrors);
      
      // Attach errors to AST if any
      if (errors.length > 0 && ast) {
        ast.errors = errors;
      }
      
      // For single-pass parser, we return the AST even with type errors
      // Only syntax errors should prevent AST creation
      const hasSyntaxErrors = errors.some(e => 
        e.message.includes('token') || 
        e.message.includes('mismatched') || 
        e.message.includes('extraneous') ||
        e.message.includes('viable alternative')
      );
      
      // Success means we have a valid AST, even if there are type errors
      // This allows for gradual typing and better error reporting
      return {
        ast: hasSyntaxErrors ? null : ast,
        errors,
        success: !hasSyntaxErrors
      };
    } else {
      // Syntax-only parsing - create minimal AST without type checking
      const context: FHIRPathContext = {
        modelProvider: {
          getTypeInfo: () => undefined,
          getPropertyType: () => undefined,
          isSubtypeOf: () => false
        }
      };
      
      const visitor = new FHIRPathParser(context, {});
      const ast = visitor.visit(parseTree);
      
      return {
        ast,
        errors: [], // No type errors in syntax-only mode
        success: true
      };
    }
    
  } catch (error) {
    // Catch any unexpected errors
    errors.push({
      message: `Parsing failed: ${error instanceof Error ? error.message : String(error)}`,
      severity: 'error'
    });
    
    return {
      ast: null,
      errors,
      success: false
    };
  }
}

/**
 * Format compiler errors for display
 */
export function formatErrors(errors: CompilerError[], source?: string): string {
  return errors.map(error => {
    let message = `${error.severity.toUpperCase()}: ${error.message}`;
    
    if (error.location && source) {
      const lines = source.split('\n');
      const line = lines[error.location.line - 1];
      if (line) {
        message += `\n  at line ${error.location.line}, column ${error.location.column}`;
      }
    }
    
    return message;
  }).join('\n\n');
}

