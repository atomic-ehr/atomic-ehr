import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 25-equivalence-operators.yaml
// Tests for semantic equivalence operators: ~ (equivalent) and !~ (not equivalent)

describe("Equivalence Operators", () => {

  describe("operators", () => {
    it("String equivalence - case insensitive", () => {
      const fixture = {};
      // Strings are equivalent ignoring case
      const result = fhirpath({}, `'Hello' ~ 'hello'`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("general", () => {
    it("String equivalence - whitespace normalization", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Hello   World' ~ 'Hello World'`, fixture);
      expect(result).toEqual([true]);
    });
    it("String equivalence - leading/trailing whitespace", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'  test  ' ~ 'test'`, fixture);
      expect(result).toEqual([true]);
    });
    it("String not equivalent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Hello' !~ 'Goodbye'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Decimal equivalence - trailing zeros", () => {
      const fixture = {};
      // Decimals equivalent ignoring trailing zeros
      const result = fhirpath({}, `1.0 ~ 1.00`, fixture);
      expect(result).toEqual([true]);
    });
    it("Decimal equivalence - different precision", () => {
      const fixture = {};
      
      const result = fhirpath({}, `3.14 ~ 3.1400`, fixture);
      expect(result).toEqual([true]);
    });
    it("Integer and decimal equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `42 ~ 42.0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Numeric not equivalent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1.0 !~ 1.1`, fixture);
      expect(result).toEqual([true]);
    });
    it("Boolean equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `true ~ true`, fixture);
      expect(result).toEqual([true]);
    });
    it("Boolean not equivalent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `true !~ false`, fixture);
      expect(result).toEqual([true]);
    });
    it("DateTime equivalence - same instant", () => {
      const fixture = {};
      // Different timezone representations of same instant
      const result = fhirpath({}, `@2023-01-15T10:00:00Z ~ @2023-01-15T05:00:00-05:00`, fixture);
      expect(result).toEqual([true]);
    });
    it("Date equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 ~ @2023-01-15`, fixture);
      expect(result).toEqual([true]);
    });
    it("DateTime precision equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:00:00 ~ @2023-01-15T10:00:00.000`, fixture);
      expect(result).toEqual([true]);
    });
    it("Quantity equivalence - convertible units", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1000 'mg' ~ 1 'g'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Quantity not equivalent - different units", () => {
      const fixture = {};
      
      const result = fhirpath({}, `10 'mg' !~ 10 'ml'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Collection equivalence - order matters", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3) ~ (1 | 2 | 3)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Collection not equivalent - different order", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3) !~ (3 | 2 | 1)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Collection equivalence - nested", () => {
      const fixture = {};
      
      const result = fhirpath({}, `((1 | 2) | (3 | 4)) ~ ((1.0 | 2.00) | (3 | 4))`, fixture);
      expect(result).toEqual([true]);
    });
    it("Object not equivalent - different values", () => {
      const fixture = {
        "obj1": {
          "a": 1,
          "b": "test"
        },
        "obj2": {
          "a": 2,
          "b": "test"
        }
      };
      
      const result = fhirpath({}, `obj1 !~ obj2`, fixture);
      expect(result).toEqual([true]);
    });
    it("Object not equivalent - missing property", () => {
      const fixture = {
        "obj1": {
          "a": 1,
          "b": "test",
          "c": true
        },
        "obj2": {
          "a": 1,
          "b": "test"
        }
      };
      
      const result = fhirpath({}, `obj1 !~ obj2`, fixture);
      expect(result).toEqual([true]);
    });
    it("Null equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{} ~ {}`, fixture);
      expect(result).toEqual([true]);
    });
    it("Null not equivalent to value", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{} !~ 0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Empty string equivalence to null", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'' ~ {}`, fixture);
      expect(result).toEqual([false]);
    });
    it("Code system comparison", () => {
      const fixture = {
        "code": "active"
      };
      // Compare codes ignoring case
      const result = fhirpath({}, `code ~ 'ACTIVE'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Identifier comparison", () => {
      const fixture = {
        "identifier": [
          {
            "system": "http://example.com",
            "value": "123"
          },
          {
            "system": "http://other.com",
            "value": "456"
          }
        ]
      };
      
      const result = fhirpath({}, `identifier.where(system ~ 'HTTP://EXAMPLE.COM')`, fixture);
      expect(result).toEqual([{"system":"http://example.com","value":"123"}]);
    });
    it("Status checking", () => {
      const fixture = {
        "status": "draft"
      };
      
      const result = fhirpath({}, `status ~ 'Draft' or status ~ 'DRAFT'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Very long string equivalence", () => {
      const fixture = {
        "longStr1": "This is a very long string with MIXED case and   extra   spaces",
        "longStr2": "this is a very long string with mixed case and extra spaces"
      };
      
      const result = fhirpath({}, `longStr1 ~ longStr2`, fixture);
      expect(result).toEqual([true]);
    });
    it("Special characters", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Test\nLine' ~ 'Test\nLine'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Unicode normalization", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'café' ~ 'CAFÉ'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Multiple equivalence checks", () => {
      const fixture = {
        "a": "TEST",
        "b": "test",
        "c": "Test"
      };
      
      const result = fhirpath({}, `a ~ b and b ~ c implies a ~ c`, fixture);
      expect(result).toEqual([true]);
    });
    it("Type mismatch equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1 ~ 'one'`, fixture);
      expect(result).toEqual([false]);
    });
    it("Complex type equivalence", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 ~ '2023-01-15'`, fixture);
      expect(result).toEqual([false]);
    });
  });
  describe("intermediate", () => {
    it("Quantity equivalence - same unit", () => {
      const fixture = {};
      // Quantities with same value and unit
      const result = fhirpath({}, `10 'mg' ~ 10.0 'mg'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Object equivalence - property order", () => {
      const fixture = {
        "obj1": {
          "a": 1,
          "b": "test",
          "c": true
        },
        "obj2": {
          "c": true,
          "a": 1,
          "b": "TEST"
        }
      };
      // Objects equivalent regardless of property order
      const result = fhirpath({}, `obj1 ~ obj2`, fixture);
      expect(result).toEqual([true]);
    });
  });
});
