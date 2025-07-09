import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 29-error-edge-cases.yaml
// Comprehensive tests for error handling, null propagation, and edge cases

describe("Error and Edge Cases", () => {

  describe("errors", () => {
    it("Null propagation - simple path", () => {
      const fixture = {};
      // Null propagates through path navigation
      const result = fhirpath({}, `{}.name.first()`, fixture);
      expect(result).toEqual([]);
    });
  });
  describe("general", () => {
    it("Null propagation - function call", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.substring(0, 5)`, fixture);
      expect(result).toEqual([]);
    });
    it("Null propagation - arithmetic", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{} + 5`, fixture);
      expect(result).toEqual([]);
    });
    it("Null propagation - comparison", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{} > 5`, fixture);
      expect(result).toEqual([]);
    });
    it("Null propagation - multiple levels", () => {
      const fixture = {
        "patient": {}
      };
      
      const result = fhirpath({}, `patient.name.given.first().substring(0, 3)`, fixture);
      expect(result).toEqual([]);
    });
    it("Division by zero - integer", () => {
      const fixture = {};
      // Division by zero error handling
      expect(() => {
        fhirpath({}, `10 / 0`, fixture);
      }).toThrow("Division by zero");
    });
    it("Division by zero - decimal", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `10.5 / 0.0`, fixture);
      }).toThrow("Division by zero");
    });
    it("Mod by zero", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `10 mod 0`, fixture);
      }).toThrow("Division by zero");
    });
    it("String arithmetic", () => {
      const fixture = {};
      // Invalid type for arithmetic operation
      expect(() => {
        fhirpath({}, `'hello' + 5`, fixture);
      }).toThrow("Cannot add string and integer");
    });
    it("Boolean arithmetic", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `true * false`, fixture);
      }).toThrow("Cannot multiply booleans");
    });
    it("Invalid function argument", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `substring('test')`, fixture);
      }).toThrow("substring() requires 2 or 3 arguments");
    });
    it("Deep nesting limit", () => {
      const fixture = {
        "a": {
          "b": {
            "c": {
              "d": {
                "e": {
                  "f": {
                    "g": {
                      "h": {
                        "i": {
                          "j": "deep"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      
      const result = fhirpath({}, `descendants().count() < 10000`, fixture);
      expect(result).toEqual([true]);
    });
    it("Large collection creation", () => {
      const fixture = {};
      // Performance with large collections
      const result = fhirpath({}, `(1 to 10000).count()`, fixture);
      expect(result).toEqual([10000]);
    });
    it("Large collection filtering", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 to 10000).where($this mod 100 = 0).count()`, fixture);
      expect(result).toEqual([100]);
    });
    it("Memory limit - combine", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 to 5000).combine(5000 to 10000).count()`, fixture);
      expect(result).toEqual([10001]);
    });
    it("Property of primitive", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'string'.property`, fixture);
      expect(result).toEqual([]);
    });
    it("Index out of bounds", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3)[10]`, fixture);
      expect(result).toEqual([]);
    });
    it("Negative index", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3)[-1]`, fixture);
      expect(result).toEqual([]);
    });
    it("Empty aggregate", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.aggregate($total + $this, 0)`, fixture);
      expect(result).toEqual([0]);
    });
    it("Where with error in condition", () => {
      const fixture = {
        "items": [
          {
            "value": 10
          },
          {
            "value": 20
          }
        ]
      };
      
      expect(() => {
        fhirpath({}, `items.where(value / 0 > 1)`, fixture);
      }).toThrow("Division by zero in where clause");
    });
    it("Select with null", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | {} | 3).select($this + 1)`, fixture);
      expect(result).toEqual([2,4]);
    });
    it("Substring beyond length", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'hello'.substring(10, 5)`, fixture);
      expect(result).toEqual([""]);
    });
    it("Negative substring start", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'hello'.substring(-2, 3)`, fixture);
      expect(result).toEqual(["hel"]);
    });
    it("Replace with empty", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'hello world'.replace('o', '')`, fixture);
      expect(result).toEqual(["hell wrld"]);
    });
    it("Invalid date arithmetic", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-31 + 1 month`, fixture);
      expect(result).toEqual(["@2023-02-28"]);
    });
    it("Time without date arithmetic", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@T10:30:00 + 25 hours`, fixture);
      expect(result).toEqual(["@T11:30:00"]);
    });
    it("Type of null", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.type()`, fixture);
      expect(result).toEqual([]);
    });
    it("Mixed type collection operations", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 'two' | true).all($this.toString().exists())`, fixture);
      expect(result).toEqual([true]);
    });
    it("Partial success in collection", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(10 | 'twenty' | 30).select($this / 2)`, fixture);
      expect(result).toEqual([5,15]);
    });
    it("Unclosed string", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `'unclosed string`, fixture);
      }).toThrow("Unterminated string literal");
    });
    it("Invalid operator", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `1 ** 2`, fixture);
      }).toThrow("Unknown operator '**'");
    });
    it("Mismatched parentheses", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `((1 + 2) * 3`, fixture);
      }).toThrow("Missing closing parenthesis");
    });
    it("Expression complexity limit", () => {
      const fixture = {
        "children": [
          {
            "children": [
              {
                "children": [
                  1,
                  2,
                  3
                ]
              }
            ]
          }
        ]
      };
      
      const result = fhirpath({}, `repeat(children()).take(100).flatten().count() < 100000`, fixture);
      expect(result).toEqual([true]);
    });
    it("String length limit", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'x'.repeat(1000000).length() = 1000000`, fixture);
      expect(result).toEqual([true]);
    });
    it("All operations on empty", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.exists() or {}.empty() and {}.count() = 0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Join empty collection", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.join(',')`, fixture);
      expect(result).toEqual([""]);
    });
    it("Compare incompatible types", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1 < 'two'`, fixture);
      expect(result).toEqual([]);
    });
    it("Null in comparison chain", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1 < {} < 3`, fixture);
      expect(result).toEqual([]);
    });
  });
  describe("intermediate", () => {
    it("Circular reference detection", () => {
      const fixture = {
        "self": {
          "$ref": "#"
        }
      };
      // Detect circular references in navigation
      const result = fhirpath({}, `repeat(self).take(1000).count()`, fixture);
      expect(result).toEqual([1000]);
    });
  });
  describe("advanced", () => {
    it("Nested error propagation", () => {
      const fixture = {
        "items": [
          {
            "value": 10
          },
          {
            "value": 20
          },
          {
            "value": 30
          }
        ],
        "divisor": 0
      };
      // Error in nested expression
      expect(() => {
        fhirpath({}, `items.select(value / divisor)`, fixture);
      }).toThrow("Division by zero");
    });
  });
});
