import { FHIRPathType } from "./types";
import type { TypeInfo } from "./types";

interface OperatorTableEntry {
    left: { type: FHIRPathType };
    right: { type: FHIRPathType };
    returnType: TypeInfo;
}

const OperatorsTable: Record<string, OperatorTableEntry> = {
    // Logical operators
    "and": {
        left: { type: FHIRPathType.Boolean },
        right: { type: FHIRPathType.Boolean },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "or": {
        left: { type: FHIRPathType.Boolean },
        right: { type: FHIRPathType.Boolean },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "implies": {
        left: { type: FHIRPathType.Boolean },
        right: { type: FHIRPathType.Boolean },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    
    // Collection operators  
    "|": {
        left:  { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any }, 
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
    },
    
    // Arithmetic operators
    "+": {
        left: { type: FHIRPathType.Any }, // Can be numeric or string
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: false },
    },
    "-": {
        left: { type: FHIRPathType.Decimal },
        right: { type: FHIRPathType.Decimal },
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
    },
    "*": {
        left: { type: FHIRPathType.Decimal },
        right: { type: FHIRPathType.Decimal },
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
    },
    "/": {
        left: { type: FHIRPathType.Decimal },
        right: { type: FHIRPathType.Decimal },
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
    },
    "div": {
        left: { type: FHIRPathType.Integer },
        right: { type: FHIRPathType.Integer },
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
    },
    "mod": {
        left: { type: FHIRPathType.Integer },
        right: { type: FHIRPathType.Integer },
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
    },
    
    // String operators
    "&": {
        left: { type: FHIRPathType.String },
        right: { type: FHIRPathType.String },
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
    },
    
    // Comparison operators
    "=": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "!=": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "~": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "!~": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "<": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    ">": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "<=": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    ">=": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    
    // Membership operators
    "in": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
    "contains": {
        left: { type: FHIRPathType.Any },
        right: { type: FHIRPathType.Any },
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
    },
}

export function getOperatorTableEntry(context: any, operator: string): OperatorTableEntry | undefined {
    return OperatorsTable[operator];
}