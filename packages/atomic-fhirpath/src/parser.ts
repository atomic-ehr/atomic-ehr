import { CharStream, CommonTokenStream, BaseErrorListener, AbstractParseTreeVisitor } from 'antlr4ng';
import { fhirpathLexer } from './generated/fhirpathLexer.js';
import { fhirpathParser } from './generated/fhirpathParser.js';
import * as ParserContext from './generated/fhirpathParser.js';
import type { 
  ASTNode, 
  ParseResult,
  StringLiteralNode,
  NumberLiteralNode,
  BooleanLiteralNode,
  DateLiteralNode,
  DateTimeLiteralNode,
  TimeLiteralNode,
  NullLiteralNode,
  IdentifierNode,
  BinaryOperationNode,
  UnaryOperationNode,
  InvocationNode,
  IndexerNode,
  FunctionNode,
  LambdaNode,
  TypeOperationNode,
  QuantityNode,
  ExternalConstantNode,
  ThisInvocationNode,
  IndexInvocationNode,
  TotalInvocationNode
} from './types.js';
import { eq } from './functions.js';

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

// FHIRPath AST Builder Visitor
export class FHIRPathASTBuilder extends AbstractParseTreeVisitor<ASTNode> {
  
  visitEntireExpression(ctx: ParserContext.EntireExpressionContext): ASTNode {
    const result = this.visit(ctx.expression());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
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
      target: target || { type: 'NullLiteral' } as NullLiteralNode,
      index: index || { type: 'NullLiteral' } as NullLiteralNode
    } as IndexerNode;
  }

  visitPolarityExpression(ctx: ParserContext.PolarityExpressionContext): ASTNode {
    const operator = ctx.getChild(0)?.getText() || '';
    const operand = this.visit(ctx.expression());
    
    return {
      type: 'UnaryOperation',
      operator,
      operand: operand || { type: 'NullLiteral' } as NullLiteralNode
    } as UnaryOperationNode;
  }

  visitAdditiveExpression(ctx: ParserContext.AdditiveExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';
    
    return {
      type: 'BinaryOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode
    } as BinaryOperationNode;
  }


  visitMultiplicativeExpression(ctx: ParserContext.MultiplicativeExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';

    const opFunctions = {
        '=': (left: any, right: any) => left === right,
        '!=': (left: any, right: any) => left !== right,
        '<': (left: any, right: any) => left < right,
        '<=': (left: any, right: any) => left <= right,
        '>': (left: any, right: any) => left > right,
        '>=': (left: any, right: any) => left >= right,
    }
    
    
    return {
      type: 'BinaryOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode,
      eval: opFunctions[operator as keyof typeof opFunctions]
    } as BinaryOperationNode;
  }

  visitUnionExpression(ctx: ParserContext.UnionExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    
    return {
      type: 'BinaryOperation',
      operator: '|',
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode
    } as BinaryOperationNode;
  }

  visitOrExpression(ctx: ParserContext.OrExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';
    
    return {
      type: 'BinaryOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode
    } as BinaryOperationNode;
  }

  visitAndExpression(ctx: ParserContext.AndExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    
    return {
      type: 'BinaryOperation',
      operator: 'and',
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode
    } as BinaryOperationNode;
  }

  visitMembershipExpression(ctx: ParserContext.MembershipExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';
    
    return {
      type: 'BinaryOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode
    } as BinaryOperationNode;
  }

  visitInequalityExpression(ctx: ParserContext.InequalityExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';

    const opFunctions = {
        '=': (left: any, right: any) => left === right,
        '!=': (left: any, right: any) => left !== right,
        '<': (left: any, right: any) => left < right,
        '<=': (left: any, right: any) => left <= right,
        '>': (left: any, right: any) => left > right,
        '>=': (left: any, right: any) => left >= right,
    }
    return {
      type: 'BinaryOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode,
      eval: opFunctions[operator as keyof typeof opFunctions]
    } as BinaryOperationNode;
  }

  visitInvocationExpression(ctx: ParserContext.InvocationExpressionContext): ASTNode {
    const target = this.visit(ctx.expression());
    const invocation = this.visit(ctx.invocation());
    
    const fnTable = {
        'where':  {
          build: (target: ASTNode, parameters: ASTNode[]) => {
            return (ctx:any, data: any) => {
              let node = target?.eval(ctx, data);
              return node.filter((item: any) => {
                let result = parameters?.[0]?.eval(ctx, item);
                return result?.[0];
              });
            }   
          }
        }
    }
    // Handle different types of invocations
    if (invocation?.type === 'Function') {
      const func = invocation as FunctionNode;
      let fn = fnTable[func.name as keyof typeof fnTable];
      return {
        type: 'Function',
        name: func.name,
        parameters: [target, ...func.parameters].filter(Boolean),
        eval: fn.build ? fn.build(target!,func.parameters) : (fn.eval || (() => {throw new Error(`Function ${func.name} not implemented`)}))
      } as FunctionNode;
    } else if (invocation?.type === 'Identifier') {
      const id = invocation as IdentifierNode;
      return {
        type: 'Invocation',
        target: target || { type: 'NullLiteral' } as NullLiteralNode,
        member: id.name,
        eval: (ctx:any, data: any) =>{
            let node = target?.eval(ctx, data);
            if(node === null || node === undefined){
                return null;
            }
            if(Array.isArray(node)){
                return node.map((item: any) => item[id.name]);
            }
            return node[id.name];
        }
      } as InvocationNode;
    }
    
    return invocation || { type: 'NullLiteral' } as NullLiteralNode;
  }

  visitEqualityExpression(ctx: ParserContext.EqualityExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    const operator = ctx.getChild(1)?.getText() || '';
    
    const opFunctions = {
        '=': (ctx: any, data: any) => {
          let leftNode = left?.eval(ctx, data);
          let rightNode = right?.eval(ctx, data);
          return eq(leftNode, rightNode);
        }
    }
    return {
      type: 'BinaryOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode,
      eval: opFunctions[operator as keyof typeof opFunctions]
    } as BinaryOperationNode;
  }

  visitImpliesExpression(ctx: ParserContext.ImpliesExpressionContext): ASTNode {
    const leftCtx = ctx.expression(0);
    const rightCtx = ctx.expression(1);
    const left = leftCtx ? this.visit(leftCtx) : null;
    const right = rightCtx ? this.visit(rightCtx) : null;
    
    return {
      type: 'BinaryOperation',
      operator: 'implies',
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right: right || { type: 'NullLiteral' } as NullLiteralNode
    } as BinaryOperationNode;
  }

  visitTermExpression(ctx: ParserContext.TermExpressionContext): ASTNode {
    const result = this.visit(ctx.term());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
  }

  visitTypeExpression(ctx: ParserContext.TypeExpressionContext): ASTNode {
    const left = this.visit(ctx.expression());
    const operator = ctx.getChild(1)?.getText() as 'is' | 'as';
    const right = ctx.typeSpecifier().getText();
    
    return {
      type: 'TypeOperation',
      operator,
      left: left || { type: 'NullLiteral' } as NullLiteralNode,
      right
    } as TypeOperationNode;
  }

  // Term visitors
  visitInvocationTerm(ctx: ParserContext.InvocationTermContext): ASTNode {
    const result = this.visit(ctx.invocation());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
  }

  visitLiteralTerm(ctx: ParserContext.LiteralTermContext): ASTNode {
    const result = this.visit(ctx.literal());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
  }

  visitExternalConstantTerm(ctx: ParserContext.ExternalConstantTermContext): ASTNode {
    const result = this.visit(ctx.externalConstant());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
  }

  visitParenthesizedTerm(ctx: ParserContext.ParenthesizedTermContext): ASTNode {
    const result = this.visit(ctx.expression());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
  }

  // Literal visitors
  visitNullLiteral(ctx: ParserContext.NullLiteralContext): ASTNode {
    return { type: 'NullLiteral' } as NullLiteralNode;
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

  visitDateLiteral(ctx: ParserContext.DateLiteralContext): ASTNode {
    const value = ctx.getText().slice(1); // Remove @
    return { type: 'DateLiteral', value } as DateLiteralNode;
  }

  visitDateTimeLiteral(ctx: ParserContext.DateTimeLiteralContext): ASTNode {
    const value = ctx.getText().slice(1); // Remove @
    return { type: 'DateTimeLiteral', value } as DateTimeLiteralNode;
  }

  visitTimeLiteral(ctx: ParserContext.TimeLiteralContext): ASTNode {
    const value = ctx.getText().slice(1); // Remove @
    return { type: 'TimeLiteral', value } as TimeLiteralNode;
  }

  visitQuantityLiteral(ctx: ParserContext.QuantityLiteralContext): ASTNode {
    const result = this.visit(ctx.quantity());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
  }

  visitExternalConstant(ctx: ParserContext.ExternalConstantContext): ASTNode {
    const name = ctx.identifier()?.getText() || ctx.STRING()?.getText()?.slice(1, -1) || '';
    return { type: 'ExternalConstant', name } as ExternalConstantNode;
  }

  // Invocation visitors
  visitMemberInvocation(ctx: ParserContext.MemberInvocationContext): ASTNode {
    const name = ctx.identifier().getText();
    let evaluate = (ctx:any, data: any) => {};
    if (name[0]?.toUpperCase() == name[0]){
        evaluate = (ctx:any, data: any) => {
            if (data.resourceType === name){
                return data;
            }
            return null;
        }
    } else {
        evaluate = (ctx:any, data: any) =>{
          if(data === null || data === undefined){
            return null;
          }
          return (Array.isArray(data) ? data : [data]).reduce((acc: any, item: any) => {
              if(item[name]){
                  acc.push(item[name]);
              }
              return acc;
          }, []);
        }

    }
    return { 
        type: 'Identifier', 
        name,
        eval: evaluate
    } as IdentifierNode;
  }

  visitFunctionInvocation(ctx: ParserContext.FunctionInvocationContext): ASTNode {
    const result = this.visit(ctx.function());
    return result || { type: 'NullLiteral' } as NullLiteralNode;
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

  visitQuantity(ctx: ParserContext.QuantityContext): ASTNode {
    const value = parseFloat(ctx.NUMBER().getText());
    const unit = ctx.unit()?.getText();
    
    return {
      type: 'Quantity',
      value,
      unit
    } as QuantityNode;
  }

  visitIdentifier(ctx: ParserContext.IdentifierContext): ASTNode {
    const name = ctx.getText();
    return { type: 'Identifier', name } as IdentifierNode;
  }
}

// Main parser function
export function parseFHIRPath(input: string): ParseResult {
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
  const visitor = new FHIRPathASTBuilder();
  
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
    let ast = cache[fhirpath] || parseFHIRPath(fhirpath);
    cache[fhirpath] = ast;
    try{
        let result = ast.ast.eval(ctx, data);
        return result;
    }catch(e){
        console.error('ERROR', ast.ast);
        return null;
    }
}