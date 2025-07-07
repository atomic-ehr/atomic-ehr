import type { ASTNode } from "./parser";

interface evalFunction {
    (ctx: any, data: any): any;
}

export function isEmptyCollection(value: any): boolean {    
    return value === undefined || value === null || (Array.isArray(value) && value.length == 0);
}

export function eq(left: any, right: any): boolean[] {
    // Handle empty collections
    if (isEmptyCollection(left) || isEmptyCollection(right)) {
        return [];
    }
    if (Array.isArray(left) && !Array.isArray(right)){
        return [Bun.deepEquals(left, [right])];
    } else if (!Array.isArray(left) && Array.isArray(right)){
        return [Bun.deepEquals([left], right)];
    }
    return [Bun.deepEquals(left, right)];
}

export function complileWhere(ctx: any, target: ASTNode, parameters: ASTNode[]): evalFunction {
  return (ctx: any, data: any) => {
    let node = target?.eval(ctx, data);
    return node.filter((item: any) => {
      let result = parameters?.[0]?.eval(ctx, item);
      return result?.[0];
    });
  };
}


export const opTable = {
    '=': eq
}

export function compileBinaryOperation(ctx: any, operator: string, left?: ASTNode, right?: ASTNode): evalFunction {
    const op = opTable[operator as keyof typeof opTable];
    return (ctx: any, data: any) => {
        let leftNode = left?.eval(ctx, data);
        let rightNode = right?.eval(ctx, data);
        return op(leftNode, rightNode);
    }
}

export const FunctionsTable: Record<string, (ctx: any, target: ASTNode, parameters: ASTNode[]) => evalFunction> = {
    where: complileWhere,
}

export function compileInvocation(ctx: any, name: string, target: ASTNode): evalFunction {
  return (ctx: any, data: any) => {
    let node = target?.eval(ctx, data);
    if (node === null || node === undefined) {
      return null;
    }
    if (Array.isArray(node)) {
      return node.map((item: any) => item[name]);
    }
    return node[name];
  };
}

export function compileMemberInvocation(ctx: any, name: string): evalFunction {
    if (name[0]?.toUpperCase() == name[0]){
        return (ctx:any, data: any) => {
            if (data.resourceType === name){
                return data;
            }
            return null;
        }
    } else {
        return (ctx:any, data: any) =>{
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
}