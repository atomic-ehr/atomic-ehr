export function eq(left: any, right: any): boolean[] {
    // Handle empty collections
    if (left === undefined || right === undefined) {
        return [];
    }
    if (left === null && right === null){
        return [];
    }
    if ((Array.isArray(left) && left.length == 0) || (Array.isArray(right) && right.length == 0)){
        return [];
    }
    if (Array.isArray(left) && !Array.isArray(right)){
        return [Bun.deepEquals(left, [right])];
    } else if (!Array.isArray(left) && Array.isArray(right)){
        return [Bun.deepEquals([left], right)];
    }
    return [Bun.deepEquals(left, right)];
}