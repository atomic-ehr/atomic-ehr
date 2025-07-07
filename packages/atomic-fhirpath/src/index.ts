import { CharStream, CommonTokenStream, BaseErrorListener, AbstractParseTreeVisitor } from 'antlr4ng';
import { fhirpathLexer } from './generated/fhirpathLexer.js';
import { fhirpathParser } from './generated/fhirpathParser.js';
import { type ParseResult, FHIRPathErrorListener, FHIRPathASTBuilder, type NullLiteralNode } from './parser.js';

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