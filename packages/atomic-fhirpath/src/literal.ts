import type { ParserRuleContext } from 'antlr4ts';
import type { 
  NullLiteral, 
  BooleanLiteral, 
  StringLiteral, 
  NumberLiteral, 
  DateLiteral, 
  DateTimeLiteral, 
  TimeLiteral, 
  QuantityLiteral,
  SourceLocation 
} from './ast';
import { FHIRPathType } from './types';
import type { TypeInfo } from './types';
import type { 
  NullLiteralContext, 
  BooleanLiteralContext, 
  StringLiteralContext, 
  NumberLiteralContext, 
  DateLiteralContext, 
  DateTimeLiteralContext, 
  TimeLiteralContext, 
  QuantityLiteralContext 
} from './parser/fhirpathParser';

/**
 * Literal type information table
 */
export const LITERAL_TYPES: Record<string, TypeInfo> = {
  null: { type: FHIRPathType.Empty, isCollection: true, isOptional: true },
  boolean: { type: FHIRPathType.Boolean, isCollection: false, isOptional: false },
  string: { type: FHIRPathType.String, isCollection: false, isOptional: false },
  number: { type: FHIRPathType.Decimal, isCollection: false, isOptional: false },
  date: { type: FHIRPathType.Date, isCollection: false, isOptional: false },
  datetime: { type: FHIRPathType.DateTime, isCollection: false, isOptional: false },
  time: { type: FHIRPathType.Time, isCollection: false, isOptional: false },
  quantity: { type: FHIRPathType.Quantity, isCollection: false, isOptional: false }
};

/**
 * Helper function to extract location from parser context
 */
function getLocation(ctx: ParserRuleContext): SourceLocation {
  const start = ctx.start;
  const stop = ctx.stop || ctx.start;
  
  return {
    line: start.line,
    column: start.charPositionInLine + 1,
    startIndex: start.startIndex,
    endIndex: stop.stopIndex + 1
  };
}

/**
 * Helper function to get text from parser context
 */
function getText(ctx: ParserRuleContext): string {
  return ctx.text;
}

/**
 * Literal factory functions
 */
export const LiteralFactory = {
  /**
   * Create a null literal
   */
  createNullLiteral(ctx: NullLiteralContext): NullLiteral {
    return {
      nodeType: 'literal',
      literalType: 'null',
      value: null,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.null
    };
  },

  /**
   * Create a boolean literal
   */
  createBooleanLiteral(ctx: BooleanLiteralContext): BooleanLiteral {
    const text = ctx.text;
    return {
      nodeType: 'literal',
      literalType: 'boolean',
      value: text === 'true',
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.boolean
    };
  },

  /**
   * Create a string literal
   */
  createStringLiteral(ctx: StringLiteralContext): StringLiteral {
    const text = ctx.STRING().text;
    const value = text.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
    
    return {
      nodeType: 'literal',
      literalType: 'string',
      value: value,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.string
    };
  },

  /**
   * Create a number literal
   */
  createNumberLiteral(ctx: NumberLiteralContext): NumberLiteral {
    const text = ctx.NUMBER().text;
    const value = parseFloat(text);
    
    return {
      nodeType: 'literal',
      literalType: 'number',
      value: value,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.number
    };
  },

  /**
   * Create a date literal
   */
  createDateLiteral(ctx: DateLiteralContext): DateLiteral {
    const text = ctx.DATE().text;
    const value = text.substring(1);
    
    return {
      nodeType: 'literal',
      literalType: 'date',
      value: value,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.date
    };
  },

  /**
   * Create a datetime literal
   */
  createDateTimeLiteral(ctx: DateTimeLiteralContext): DateTimeLiteral {
    const text = ctx.DATETIME().text;
    const value = text.substring(1);
    
    return {
      nodeType: 'literal',
      literalType: 'datetime',
      value: value,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.datetime
    };
  },

  /**
   * Create a time literal
   */
  createTimeLiteral(ctx: TimeLiteralContext): TimeLiteral {
    const text = ctx.TIME().text;
    const value = text.substring(2);
    
    return {
      nodeType: 'literal',
      literalType: 'time',
      value: value,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.time
    };
  },

  /**
   * Create a quantity literal
   */
  createQuantityLiteral(ctx: QuantityLiteralContext): QuantityLiteral {
    const quantity = ctx.quantity();
    const numberText = quantity.NUMBER().text;
    const value = parseFloat(numberText);
    
    let unit: string | undefined;
    const unitCtx = quantity.unit();
    if (unitCtx) {
      unit = unitCtx.text;
    }
    
    return {
      nodeType: 'literal',
      literalType: 'quantity',
      value: value,
      unit: unit,
      location: getLocation(ctx),
      text: getText(ctx),
      resultType: LITERAL_TYPES.quantity
    };
  }
};

/**
 * Literal registry for lookup-based creation
 */
export const LiteralRegistry = {
  null: LiteralFactory.createNullLiteral,
  boolean: LiteralFactory.createBooleanLiteral,
  string: LiteralFactory.createStringLiteral,
  number: LiteralFactory.createNumberLiteral,
  date: LiteralFactory.createDateLiteral,
  datetime: LiteralFactory.createDateTimeLiteral,
  time: LiteralFactory.createTimeLiteral,
  quantity: LiteralFactory.createQuantityLiteral
};

/**
 * Get type information for a literal type
 */
export function getLiteralType(literalType: string): TypeInfo {
  return LITERAL_TYPES[literalType] || { type: FHIRPathType.Any, isCollection: false, isOptional: true };
}

/**
 * Check if a literal type is supported
 */
export function isValidLiteralType(literalType: string): boolean {
  return literalType in LITERAL_TYPES;
} 