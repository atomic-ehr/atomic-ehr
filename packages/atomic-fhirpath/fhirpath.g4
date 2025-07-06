grammar fhirpath;

/*
 * ANTLR4 Grammar for FHIRPath
 * 
 * FHIRPath is a path-based navigation and extraction language for FHIR resources.
 * This grammar implements the FHIRPath specification for healthcare data querying.
 * 
 * Reference: http://hl7.org/fhirpath/N1 (Normative Release)
 */

//==============================================================================
// PARSER RULES
//==============================================================================

// Entry point for parsing complete FHIRPath expressions
entireExpression
    : expression EOF
    ;

// Expression hierarchy with proper precedence (lowest to highest)
expression
    : term                                                      #termExpression
    | expression '.' invocation                                 #invocationExpression
    | expression '[' expression ']'                             #indexerExpression
    | ('+' | '-') expression                                    #polarityExpression
    | expression ('*' | '/' | 'div' | 'mod') expression         #multiplicativeExpression
    | expression ('+' | '-' | '&') expression                   #additiveExpression
    | expression ('is' | 'as') typeSpecifier                    #typeExpression
    | expression '|' expression                                 #unionExpression
    | expression ('<=' | '<' | '>' | '>=') expression           #inequalityExpression
    | expression ('=' | '~' | '!=' | '!~') expression           #equalityExpression
    | expression ('in' | 'contains') expression                 #membershipExpression
    | expression 'and' expression                               #andExpression
    | expression ('or' | 'xor') expression                      #orExpression
    | expression 'implies' expression                           #impliesExpression
    | identifier? '=>' expression                               #lambdaExpression
    ;

// Terminal expressions
term
    : invocation                                                #invocationTerm
    | literal                                                   #literalTerm
    | externalConstant                                          #externalConstantTerm
    | '(' expression ')'                                        #parenthesizedTerm
    ;

//==============================================================================
// LITERALS
//==============================================================================

literal
    : '{' '}'                                                   #nullLiteral
    | ('true' | 'false')                                        #booleanLiteral
    | STRING                                                    #stringLiteral
    | NUMBER                                                    #numberLiteral
    | LONGNUMBER                                                #longNumberLiteral
    | DATE                                                      #dateLiteral
    | DATETIME                                                  #dateTimeLiteral
    | TIME                                                      #timeLiteral
    | quantity                                                  #quantityLiteral
    ;

// External constants (environment variables)
externalConstant
    : '%' ( identifier | STRING )
    ;

//==============================================================================
// INVOCATIONS
//==============================================================================

// Terms that can be used after the function/member invocation '.'
invocation
    : identifier                                                #memberInvocation
    | function                                                  #functionInvocation
    | '$this'                                                   #thisInvocation
    | '$index'                                                  #indexInvocation
    | '$total'                                                  #totalInvocation
    ;

// Function calls with optional parameters
function
    : identifier '(' paramList? ')'
    ;

// Parameter list for functions
paramList
    : expression (',' expression)*
    ;

//==============================================================================
// QUANTITIES AND UNITS
//==============================================================================

// Quantity with optional unit (for medical measurements)
quantity
    : NUMBER unit?
    ;

// Unit specifications
unit
    : dateTimePrecision
    | pluralDateTimePrecision
    | STRING                                                    // UCUM syntax for units of measure
    ;

// Date/time precision units (singular)
dateTimePrecision
    : 'year' | 'month' | 'week' | 'day' 
    | 'hour' | 'minute' | 'second' | 'millisecond'
    ;

// Date/time precision units (plural)
pluralDateTimePrecision
    : 'years' | 'months' | 'weeks' | 'days' 
    | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
    ;

//==============================================================================
// TYPE SYSTEM
//==============================================================================

// Type specifier for 'is' and 'as' operations
typeSpecifier
    : qualifiedIdentifier
    ;

// Qualified identifier (e.g., System.String)
qualifiedIdentifier
    : identifier ('.' identifier)*
    ;

// Identifier with support for FHIRPath keywords
identifier
    : IDENTIFIER
    | DELIMITEDIDENTIFIER
    // Allow FHIRPath keywords as identifiers in certain contexts
    | 'as' | 'contains' | 'in' | 'is'
    ;

//==============================================================================
// LEXICAL RULES
//==============================================================================

/*
 * Date and Time Tokens
 * 
 * NOTE: These rules provide tokens to the parser without validating
 * actual date/time correctness - that's handled by the interpreter.
 */

// Date literal (@2023-12-31)
DATE
    : '@' DATEFORMAT
    ;

// DateTime literal (@2023-12-31T14:30:00.000Z)
DATETIME
    : '@' DATEFORMAT 'T' (TIMEFORMAT TIMEZONEOFFSETFORMAT?)?
    ;

// Time literal (@T14:30:00)
TIME
    : '@' 'T' TIMEFORMAT
    ;

// Date format fragments
fragment DATEFORMAT
    : [0-9][0-9][0-9][0-9] ('-'[0-9][0-9] ('-'[0-9][0-9])?)?
    ;

fragment TIMEFORMAT
    : [0-9][0-9] (':'[0-9][0-9] (':'[0-9][0-9] ('.'[0-9]+)?)?)?
    ;

fragment TIMEZONEOFFSETFORMAT
    : ('Z' | ('+' | '-') [0-9][0-9]':'[0-9][0-9])
    ;

//==============================================================================
// IDENTIFIERS AND STRINGS
//==============================================================================

// Standard identifier (supports underscore for CQL compatibility)
IDENTIFIER
    : ([A-Za-z] | '_')([A-Za-z0-9] | '_')*
    ;

// Delimited identifier (`backtick quoted`)
DELIMITEDIDENTIFIER
    : '`' (ESC | ~[`\\])* '`'
    ;

// String literal ('single quoted')
STRING
    : '\'' (ESC | ~['\\])* '\''
    ;

//==============================================================================
// NUMERIC LITERALS
//==============================================================================

// Decimal numbers (allows leading zeros for XSD compatibility)
NUMBER
    : [0-9]+('.' [0-9]+)?
    ;

// Long numbers with optional 'L' suffix
LONGNUMBER
    : [0-9]+ 'L'?
    ;

//==============================================================================
// WHITESPACE AND COMMENTS
//==============================================================================

// Whitespace (preserved in hidden channel for source text retrieval)
WS
    : [ \r\n\t]+ -> channel(HIDDEN)
    ;

// Block comments
COMMENT
    : '/*' .*? '*/' -> channel(HIDDEN)
    ;

// Line comments
LINE_COMMENT
    : '//' ~[\r\n]* -> channel(HIDDEN)
    ;

//==============================================================================
// ESCAPE SEQUENCES
//==============================================================================

// Character escape sequences
fragment ESC
    : '\\' ([`'\\/fnrt] | UNICODE)                              // \`, \', \\, \/, \f, \n, \r, \t, \uXXXX
    ;

// Unicode escape sequences
fragment UNICODE
    : 'u' HEX HEX HEX HEX
    ;

// Hexadecimal digit
fragment HEX
    : [0-9a-fA-F]
    ;