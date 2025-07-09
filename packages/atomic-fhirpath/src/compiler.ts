import type { Expression, ExternalConstant, FunctionCall, IndexerExpression, Literal, MemberExpression, ThisInvocation, TypeExpression } from "./ast";

export abstract class FHIRPathCompiler {        
    constructor(private context: any) {}

    compileOperation(ast: Expression): any { }
    compileLiteral(ast: Literal): any { }
    compileFunctionCall(ast: FunctionCall): any { }
    compileMember(ast: MemberExpression): any { }
    compileIndex(ast: IndexerExpression): any { }
    compileType(ast: TypeExpression): any { }
    compileThisInvocation(ast: ThisInvocation): any { }
    compileConstant(ast: ExternalConstant): any { }

    compileDollarIndex(ast: IndexInvocation): any { }
    compileDollarTotal(ast: TotalInvocation): any { }
    compileDollarThis(ast: ThisInvocation): any { }


}