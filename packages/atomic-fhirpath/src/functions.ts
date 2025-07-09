import { FHIRPathType } from "./types";
import type { TypeInfo } from "./types";

interface FunctionParameter {
    name: string;
    type: FHIRPathType;
    optional?: boolean;
    isExpression?: boolean;
}

interface FunctionTableEntry {
    parameters: FunctionParameter[];
    returnType: TypeInfo;
    acceptsCollection: boolean;
    description: string;
    // Context type is the implicit first parameter (the collection/value the function is called on)
    // Argument types are the explicit parameters passed to the function
    inferReturnType?: (contextType: TypeInfo, argumentTypes: TypeInfo[]) => TypeInfo;
}

const FunctionsTable: Record<string, FunctionTableEntry> = {
    // 5.1 Existence functions
    
    /**
     * empty() : Boolean
     * Returns true if the input collection is empty ({ }) and false otherwise.
     */
    "empty": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if the input collection is empty"
    },
    /**
     * exists([criteria : expression]) : Boolean
     * Returns true if the collection has any elements, and false otherwise. 
     * If the input collection is empty ({ }), the result is false.
     * 
     * The function can also take an optional criteria to be applied to the collection prior to the determination of the exists.
     * In this case, the function is shorthand for where(criteria).exists().
     * 
     * Note that a common term for this function is any.
     */
    "exists": {
        parameters: [
            { name: "criteria", type: FHIRPathType.Any, optional: true, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if the collection has any elements (optionally filtered by criteria)"
    },
    /**
     * all(criteria : expression) : Boolean
     * Returns true if for every element in the input collection, criteria evaluates to true. 
     * Otherwise, the result is false. If the input collection is empty ({ }), the result is true.
     * 
     * If any item in the input collection evaluates to an empty collection when the criteria is evaluated, 
     * the result is false.
     */
    "all": {
        parameters: [
            { name: "criteria", type: FHIRPathType.Any, optional: false, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if all items in the collection satisfy the criteria"
    },
    /**
     * allTrue() : Boolean
     * Takes a collection of Boolean values and returns true if all the items are true. 
     * If any items are false, the result is false. If the input is empty ({ }), the result is true.
     * 
     * The allTrue() function is shorthand for X.all($this = true)
     */
    "allTrue": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if all items in the collection are true"
    },
    /**
     * anyTrue() : Boolean  
     * Takes a collection of Boolean values and returns true if any of the items are true. 
     * If all the items are false, or if the input is empty ({ }), the result is false.
     * 
     * The anyTrue() function is shorthand for X.exists($this = true)
     */
    "anyTrue": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if any item in the collection is true"
    },
    /**
     * allFalse() : Boolean
     * Takes a collection of Boolean values and returns true if all the items are false. 
     * If any items are true, the result is false. If the input is empty ({ }), the result is true.
     * 
     * The allFalse() function is shorthand for X.all($this = false)
     */
    "allFalse": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if all items in the collection are false"
    },
    /**
     * anyFalse() : Boolean
     * Takes a collection of Boolean values and returns true if any of the items are false. 
     * If all the items are true, or if the input is empty ({ }), the result is false.
     * 
     * The anyFalse() function is shorthand for X.exists($this = false)
     */
    "anyFalse": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if any item in the collection is false"
    },
    /**
     * subsetOf(other : collection) : Boolean
     * Returns true if all items in the input collection are members of the collection passed as the other argument. 
     * Membership is determined using the = (Equals) (=) operator.
     * 
     * Conceptually, this function is evaluated by testing each element in the input collection for membership 
     * in the other collection, with a default of true. This means that if the input collection is empty ({ }), 
     * the result is true, otherwise if the other collection is empty ({ }), the result is false.
     */
    "subsetOf": {
        parameters: [
            { name: "other", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if all items in the collection are in the other collection"
    },
    /**
     * supersetOf(other : collection) : Boolean
     * Returns true if all items in the collection passed as the other argument are members of the input collection. 
     * Membership is determined using the = (Equals) (=) operator.
     * 
     * Conceptually, this function is evaluated by testing each element in the other collection for membership 
     * in the input collection, with a default of true. This means that if the other collection is empty ({ }), 
     * the result is true, otherwise if the input collection is empty ({ }), the result is false.
     */
    "supersetOf": {
        parameters: [
            { name: "other", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if all items in the other collection are in this collection"
    },
    /**
     * count() : Integer
     * Returns the number of items in the input collection.
     */
    "count": {
        parameters: [],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns the number of items in the collection"
    },
    /**
     * distinct() : collection
     * Returns a collection containing only the unique items in the input collection. 
     * To determine whether two items are the same, the = (Equals) operator is used, 
     * as defined in the Equality section.
     * 
     * Note that the order of elements in the input collection is not guaranteed to be preserved in the result.
     */
    "distinct": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns a collection with duplicates removed"
    },
    /**
     * isDistinct() : Boolean
     * Returns true if all the items in the input collection are distinct. 
     * To determine whether two items are distinct, the = (Equals) operator is used, as defined in the Equality section.
     */
    "isDistinct": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Returns true if all items in the collection are distinct"
    },

    // 5.2 Filtering and projection functions
    
    /**
     * where(criteria : expression) : collection
     * Returns a collection containing only those elements in the input collection for which the stated criteria 
     * expression evaluates to true. Elements for which the criteria expression evaluates to false or empty ({ }) 
     * are not included in the result.
     * 
     * If the input collection is empty ({ }), the result is empty.
     * 
     * If the result of evaluating the criteria is other than a single boolean value, the evaluation will end 
     * and signal an error to the calling environment.
     */
    "where": {
        parameters: [
            { name: "criteria", type: FHIRPathType.Any, optional: false, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns a collection with only those items that satisfy the criteria",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },
    /**
     * select(projection : expression) : collection
     * Evaluates the projection expression for each item in the input collection. The result of each evaluation is 
     * added to the output collection. If the evaluation result is a collection with multiple items, all items are 
     * added to the output collection (collections resulting from evaluation of projection are flattened).
     * 
     * If the input collection is empty ({ }), the result is empty.
     * 
     * If the result of evaluating the projection is empty ({ }), no element is added to the result, and the 
     * evaluation continues with the next item in the input collection.
     * 
     * select is the standard "map" operation found in most functional programming languages.
     */
    "select": {
        parameters: [
            { name: "projection", type: FHIRPathType.Any, optional: false, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns a collection with items transformed by the projection",
        inferReturnType: (contextType, argumentTypes) => {
            // The return type of select is the type of the projection expression
            // Since select flattens collections, the result is always a collection
            if (argumentTypes.length > 0) {
                const projectionType = argumentTypes[0];
                return {
                    type: projectionType?.type || contextType.type,
                    isCollection: true, // select always returns a collection
                    isOptional: false
                };
            }
            // Fallback to Any if no type information available
            return { type: FHIRPathType.Any, isCollection: true, isOptional: false };
        }
    },
    /**
     * repeat(projection : expression) : collection
     * A version of select that will repeat the projection and add it to the output collection, as long as 
     * the projection yields new items.
     * 
     * The repeat function can be used to traverse a tree structure. This function returns all descendant nodes. 
     * If only the immediate children are required, a select would be used.
     * 
     * Note that this function is still considered experimental, and the semantics and performance characteristics 
     * are subject to change as experience is gained with its use in the community.
     * 
     * The following items should be noted when using repeat:
     * - The order of items returned by the function is undefined
     * - This function may loop indefinitely given an invalid argument
     * - This function may cause an out of memory condition given an invalid argument
     */
    "repeat": {
        parameters: [
            { name: "projection", type: FHIRPathType.Any, optional: false, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Recursively applies projection until no new items are found",
        inferReturnType: (contextType, argumentTypes) => {
            // Like select, repeat returns a collection of the projection type
            if (argumentTypes.length > 0) {
                const projectionType = argumentTypes[0];
                return {
                    type: projectionType.type,
                    isCollection: true, // repeat always returns a collection
                    isOptional: false
                };
            }
            return { type: FHIRPathType.Any, isCollection: true, isOptional: false };
        }
    },
    /**
     * ofType(type : type specifier) : collection
     * Returns a collection that contains all items in the input collection that are of the given type or 
     * a subclass thereof. If the input collection is empty ({ }), the result is empty.
     * 
     * The type argument is an identifier that must resolve to the name of a type in a model. For polymorphic types, 
     * this is the name of the base type. If the type cannot be resolved to a valid type identifier, the evaluation 
     * will end and signal an error to the calling environment.
     * 
     * Note that the type argument is an identifier, not a string, and must not be enclosed in quotes.
     */
    "ofType": {
        parameters: [
            { name: "type", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns items of the specified type"
    },

    // 5.3 Subsetting functions
    
    /**
     * single() : collection
     * Will return the single item in the input if there is just one item. If the input collection is empty ({ }), 
     * the result is empty. If there is more than one item, an error is signaled to the evaluation environment.
     * 
     * This function is useful for ensuring that an assumption about cardinality is satisfied, and is a shorthand 
     * for the following expression:
     * X.where(true).count() = 1
     */
    "single": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns the single item in the collection (error if not exactly one)",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: false,
            isOptional: true
        })
    },
    /**
     * first() : collection
     * Returns a collection containing only the first item in the input collection. 
     * This function is equivalent to item[0], so it will return an empty collection if the input collection 
     * has no items.
     */
    "first": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns the first item in the collection",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: false,
            isOptional: true
        })
    },
    /**
     * last() : collection
     * Returns a collection containing only the last item in the input collection. 
     * This function is equivalent to item[item.count()-1], so it will return an empty collection if the 
     * input collection has no items.
     */
    "last": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns the last item in the collection",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: false,
            isOptional: true
        })
    },
    /**
     * tail() : collection
     * Returns a collection containing all but the first item in the input collection. 
     * This function is equivalent to item.skip(1), so it will return an empty collection if the input 
     * collection has no items, or only one item.
     */
    "tail": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns all items except the first",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },
    "skip": {
        parameters: [
            { name: "count", type: FHIRPathType.Integer, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns items after skipping the specified count",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },
    "take": {
        parameters: [
            { name: "count", type: FHIRPathType.Integer, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns the first count items",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },
    "intersect": {
        parameters: [
            { name: "other", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns items that are in both collections",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },
    "exclude": {
        parameters: [
            { name: "other", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns items not in the other collection",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },

    // 5.4 Combining functions
    "union": {
        parameters: [
            { name: "other", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Combines two collections, removing duplicates",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },
    "combine": {
        parameters: [
            { name: "other", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Combines two collections, keeping duplicates",
        inferReturnType: (contextType) => ({
            type: contextType.type,
            isCollection: true,
            isOptional: false
        })
    },

    // 5.5 Conversion functions
    
    /**
     * iif(condition : expression, ifTrue : expression [, ifFalse : expression]) : collection
     * The iif function in FHIRPath is an immediate if, also known as a conditional operator (such as C's ? : operator).
     * 
     * The condition is expected to evaluate to a Boolean, or a collection that contains a single Boolean. 
     * If condition is true, the function returns the value of the ifTrue expression; otherwise, it returns the 
     * value of the ifFalse expression (or empty ({ }) if the ifFalse expression is not provided).
     * 
     * If the condition evaluates to empty ({ }), or a collection with multiple items, the function will return empty.
     * 
     * Note that both ifTrue and ifFalse expressions will always be evaluated, even though only one will be returned. 
     * This means that even if the condition is true, ifFalse will be evaluated; and when the condition is false, 
     * ifTrue will be evaluated. It is immediately evaluated in the sense that it is not lazy/short-circuit evaluated. 
     * This is why it's called iif instead of if.
     */
    "iif": {
        parameters: [
            { name: "condition", type: FHIRPathType.Boolean, optional: false },
            { name: "ifTrue", type: FHIRPathType.Any, optional: false },
            { name: "ifFalse", type: FHIRPathType.Any, optional: true }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: true },
        acceptsCollection: false,
        description: "Conditional expression (if-then-else)",
        inferReturnType: (contextType, argumentTypes) => {
            // For iif, arguments are: [condition, ifTrue, ifFalse?]
            // Return type is the union of ifTrue and ifFalse types
            if (argumentTypes.length >= 2) {
                const ifTrueType = argumentTypes[1];
                const ifFalseType = argumentTypes.length > 2 ? argumentTypes[2] : undefined;
                
                // If both branches have same type, use that
                if (ifFalseType && ifTrueType.type === ifFalseType.type) {
                    return {
                        type: ifTrueType.type,
                        isCollection: ifTrueType.isCollection || ifFalseType.isCollection,
                        isOptional: ifTrueType.isOptional || ifFalseType.isOptional || argumentTypes.length === 2
                    };
                }
            }
            // Otherwise return Any
            return { type: FHIRPathType.Any, isCollection: true, isOptional: true };
        }
    },
    "toBoolean": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to Boolean"
    },
    "toInteger": {
        parameters: [],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to Integer"
    },
    "toDecimal": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to Decimal"
    },
    "toQuantity": {
        parameters: [
            { name: "unit", type: FHIRPathType.String, optional: true }
        ],
        returnType: { type: FHIRPathType.Quantity, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to Quantity"
    },
    "toDate": {
        parameters: [],
        returnType: { type: FHIRPathType.Date, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to Date"
    },
    "toDateTime": {
        parameters: [],
        returnType: { type: FHIRPathType.DateTime, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to DateTime"
    },
    "toTime": {
        parameters: [],
        returnType: { type: FHIRPathType.Time, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to Time"
    },
    "toString": {
        parameters: [],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Converts to String"
    },

    // 5.6 String manipulation functions
    "indexOf": {
        parameters: [
            { name: "substring", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns the 0-based index of substring (-1 if not found)"
    },
    "substring": {
        parameters: [
            { name: "start", type: FHIRPathType.Integer, optional: false },
            { name: "length", type: FHIRPathType.Integer, optional: true }
        ],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns a substring starting at position"
    },
    "startsWith": {
        parameters: [
            { name: "prefix", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns true if string starts with prefix"
    },
    "endsWith": {
        parameters: [
            { name: "suffix", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns true if string ends with suffix"
    },
    "contains": {
        parameters: [
            { name: "substring", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns true if string contains substring"
    },
    "upper": {
        parameters: [],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Converts string to uppercase"
    },
    "lower": {
        parameters: [],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Converts string to lowercase"
    },
    "replace": {
        parameters: [
            { name: "pattern", type: FHIRPathType.String, optional: false },
            { name: "substitution", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Replaces all occurrences of pattern with substitution"
    },
    "matches": {
        parameters: [
            { name: "regex", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns true if string matches regex"
    },
    "replaceMatches": {
        parameters: [
            { name: "regex", type: FHIRPathType.String, optional: false },
            { name: "substitution", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Replaces matches of regex with substitution"
    },
    "length": {
        parameters: [],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns the length of the string"
    },
    "toChars": {
        parameters: [],
        returnType: { type: FHIRPathType.String, isCollection: true, isOptional: false },
        acceptsCollection: false,
        description: "Returns a collection of single-character strings"
    },
    "split": {
        parameters: [
            { name: "separator", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.String, isCollection: true, isOptional: false },
        acceptsCollection: false,
        description: "Splits string by separator"
    },
    "join": {
        parameters: [
            { name: "separator", type: FHIRPathType.String, optional: true }
        ],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: true,
        description: "Joins collection items with separator"
    },
    "encode": {
        parameters: [
            { name: "encoding", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Encodes string using specified encoding"
    },
    "decode": {
        parameters: [
            { name: "encoding", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Decodes string using specified encoding"
    },

    // 5.7 Math functions
    "abs": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns absolute value"
    },
    "ceiling": {
        parameters: [],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns the smallest integer >= value"
    },
    "exp": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns e raised to the power"
    },
    "floor": {
        parameters: [],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns the largest integer <= value"
    },
    "ln": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns natural logarithm"
    },
    "log": {
        parameters: [
            { name: "base", type: FHIRPathType.Decimal, optional: false }
        ],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns logarithm with specified base"
    },
    "power": {
        parameters: [
            { name: "exponent", type: FHIRPathType.Decimal, optional: false }
        ],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns value raised to exponent"
    },
    "round": {
        parameters: [
            { name: "precision", type: FHIRPathType.Integer, optional: true }
        ],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Rounds to specified precision"
    },
    "sqrt": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns square root"
    },
    "truncate": {
        parameters: [],
        returnType: { type: FHIRPathType.Integer, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Truncates decimal to integer"
    },

    // 5.8 Type functions
    "type": {
        parameters: [],
        returnType: { type: FHIRPathType.String, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns the type name"
    },
    "is": {
        parameters: [
            { name: "type", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Tests if value is of specified type"
    },
    "as": {
        parameters: [
            { name: "type", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: true },
        acceptsCollection: false,
        description: "Casts value to specified type"
    },

    // 5.9 Date/Time functions
    "today": {
        parameters: [],
        returnType: { type: FHIRPathType.Date, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns current date"
    },
    "now": {
        parameters: [],
        returnType: { type: FHIRPathType.DateTime, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns current date and time"
    },
    "timeOfDay": {
        parameters: [],
        returnType: { type: FHIRPathType.Time, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns current time"
    },

    // Aggregate functions
    "aggregate": {
        parameters: [
            { name: "init", type: FHIRPathType.Any, optional: false },
            { name: "aggregator", type: FHIRPathType.Any, optional: false, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Performs custom aggregation over collection"
    },
    "sum": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns sum of numeric collection"
    },
    "min": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns minimum value"
    },
    "max": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns maximum value"
    },
    "avg": {
        parameters: [],
        returnType: { type: FHIRPathType.Decimal, isCollection: false, isOptional: true },
        acceptsCollection: true,
        description: "Returns average of numeric collection"
    },

    // Utility functions
    "trace": {
        parameters: [
            { name: "name", type: FHIRPathType.String, optional: false },
            { name: "selector", type: FHIRPathType.Any, optional: true, isExpression: true }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Logs value and returns it unchanged"
    },
    "children": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns all children of a node"
    },
    "descendants": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Returns all descendants of a node"
    },

    // FHIR-specific functions
    "extension": {
        parameters: [
            { name: "url", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Filters for extensions with the specified URL"
    },
    "hasValue": {
        parameters: [],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Returns true if the element has a primitive value"
    },
    "resolve": {
        parameters: [],
        returnType: { type: FHIRPathType.Any, isCollection: true, isOptional: false },
        acceptsCollection: true,
        description: "Resolves references to their targets"
    },
    "memberOf": {
        parameters: [
            { name: "valueSet", type: FHIRPathType.String, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Tests if code is member of value set"
    },
    "subsumes": {
        parameters: [
            { name: "code", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Tests if code subsumes another code"
    },
    "subsumedBy": {
        parameters: [
            { name: "code", type: FHIRPathType.Any, optional: false }
        ],
        returnType: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
        acceptsCollection: false,
        description: "Tests if code is subsumed by another code"
    }
};

export function getFunctionTableEntry(functionName: string): FunctionTableEntry | undefined {
    return FunctionsTable[functionName];
}

export function resolveFunctionReturnType( entry: FunctionTableEntry, contextType: TypeInfo, argumentTypes: TypeInfo[]): TypeInfo {
    if (!entry) {
        return { type: FHIRPathType.Any, isCollection: true, isOptional: true };
    }
    if (entry.inferReturnType) {
        return entry.inferReturnType(contextType, argumentTypes);
    }
    return entry.returnType;
}

export function validateFunctionCall( functionName: string, argumentCount: number): { valid: boolean; error?: string } {
    const entry = getFunctionTableEntry(functionName);
    
    if (!entry) {
        return { valid: false, error: `Unknown function: ${functionName}` };
    }
    
    const requiredParams = entry.parameters.filter(p => !p.optional).length;
    const totalParams = entry.parameters.length;
    
    if (argumentCount < requiredParams) {
        return {
            valid: false,
            error: `Function ${functionName} requires at least ${requiredParams} arguments, got ${argumentCount}`
        };
    }
    
    if (argumentCount > totalParams) {
        return {
            valid: false,
            error: `Function ${functionName} accepts at most ${totalParams} arguments, got ${argumentCount}`
        };
    }
    
    return { valid: true };
}