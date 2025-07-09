import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 35-variable-management.yaml
// Tests for defineVariable() function and variable scoping

describe("Variable Management", () => {

  describe("functions", () => {
    it("Define simple variable", () => {
      const fixture = {};
      // Basic variable definition and usage
      const result = fhirpath({}, `defineVariable('myVar', 42)`, fixture);
      expect(result).toEqual([42]);
    });
    it("Define and use variable", () => {
      const fixture = {
        "resourceType": "Bundle",
        "entry": [
          {
            "resource": {
              "id": "1"
            }
          },
          {
            "resource": {
              "id": "2"
            }
          },
          {
            "resource": {
              "id": "3"
            }
          }
        ]
      };
      // Define variable and reference it
      const result = fhirpath({}, `defineVariable('total', count()) and %total > 5`, fixture);
      expect(result).toEqual([false]);
    });
    it("Define variable from path", () => {
      const fixture = {
        "resourceType": "Patient",
        "name": [
          {
            "given": [
              "John",
              "James"
            ],
            "family": "Doe"
          }
        ]
      };
      // Store path result in variable
      const result = fhirpath({}, `defineVariable('patientName', name.first())`, fixture);
      expect(result).toEqual(["John"]);
    });
    it("Multiple variable definitions", () => {
      const fixture = {};
      // Define multiple variables in expression
      const result = fhirpath({}, `defineVariable('x', 10) and defineVariable('y', 20) and %x + %y`, fixture);
      expect(result).toEqual([30]);
    });
    it("Variable in where clause", () => {
      const fixture = {
        "resourceType": "Observation",
        "values": [
          50,
          150,
          75,
          200,
          125,
          90
        ]
      };
      // Use variable within where() scope
      const result = fhirpath({}, `defineVariable('threshold', 100) and values.where($ > %threshold)`, fixture);
      expect(result).toEqual([150,200,125]);
    });
    it("Variable in select expression", () => {
      const fixture = {
        "resourceType": "PriceList",
        "prices": [
          10,
          20,
          30
        ]
      };
      // Reference variable in select()
      const result = fhirpath({}, `defineVariable('factor', 1.1) and prices.select($ * %factor)`, fixture);
      expect(result).toEqual([11,22,33]);
    });
    it("Nested variable scopes", () => {
      const fixture = {
        "resourceType": "List",
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
        ]
      };
      // Variables in nested expressions
      const result = fhirpath({}, `defineVariable('outer', 5) and items.select(defineVariable('inner', value) and %inner + %outer)`, fixture);
      expect(result).toEqual([15,25,35]);
    });
    it("Variable with collection", () => {
      const fixture = {
        "resourceType": "Condition",
        "code": {
          "coding": [
            {
              "system": "ICD-10",
              "code": "123"
            },
            {
              "system": "SNOMED",
              "code": "456"
            },
            {
              "system": "ICD-10",
              "code": "123"
            }
          ]
        }
      };
      // Store collection in variable
      const result = fhirpath({}, `defineVariable('codes', code.coding.code) and %codes.distinct()`, fixture);
      expect(result).toEqual(["123","456"]);
    });
    it("Conditional variable definition", () => {
      const fixture = {
        "resourceType": "Patient",
        "active": true
      };
      // Define variable based on condition
      const result = fhirpath({}, `defineVariable('status', iif(active, 'Active', 'Inactive')) and %status`, fixture);
      expect(result).toEqual(["Active"]);
    });
    it("Variable in aggregate function", () => {
      const fixture = {
        "resourceType": "Report",
        "measurements": [
          10,
          20,
          30,
          40
        ]
      };
      // Use variable in aggregate calculation
      const result = fhirpath({}, `defineVariable('avg', measurements.avg()) and measurements.where($ > %avg)`, fixture);
      expect(result).toEqual([30,40]);
    });
    it("BMI calculation with variables", () => {
      const fixture = {
        "resourceType": "Observation",
        "weight": {
          "value": 70,
          "unit": "kg"
        },
        "height": {
          "value": 170,
          "unit": "cm"
        }
      };
      // Calculate BMI using variables
      const result = fhirpath({}, `defineVariable('weightKg', weight.value) and defineVariable('heightM', height.value / 100) and %weightKg / (%heightM * %heightM)`, fixture);
      expect(result).toEqual([24.22]);
    });
    it("Risk score with variables", () => {
      const fixture = {
        "resourceType": "Patient",
        "conditions": [
          {
            "code": "I10",
            "display": "Essential hypertension"
          },
          {
            "code": "E11",
            "display": "Type 2 diabetes"
          }
        ]
      };
      // Complex risk calculation using multiple variables
      const result = fhirpath({}, `defineVariable('age', 65) and
defineVariable('hasHypertension', conditions.exists(code = 'I10')) and
defineVariable('hasDiabetes', conditions.exists(code = 'E11')) and
defineVariable('baseScore', %age / 10) and
defineVariable('riskMultiplier', iif(%hasHypertension, 1.5, 1) * iif(%hasDiabetes, 1.3, 1)) and
%baseScore * %riskMultiplier
`, fixture);
      expect(result).toEqual([12.675]);
    });
    it("Lab result analysis", () => {
      const fixture = {
        "resourceType": "Observation",
        "value": 250,
        "referenceRange": {
          "low": 70,
          "high": 100
        }
      };
      // Analyze lab results with reference ranges
      const result = fhirpath({}, `defineVariable('result', value) and
defineVariable('low', referenceRange.low) and
defineVariable('high', referenceRange.high) and
defineVariable('status', 
  iif(%result < %low, 'Low',
    iif(%result > %high, 'High', 'Normal'))) and
%status
`, fixture);
      expect(result).toEqual(["High"]);
    });
    it("Variable shadowing", () => {
      const fixture = {
        "resourceType": "List",
        "items": [
          {},
          {}
        ]
      };
      // Inner variable shadows outer variable
      const result = fhirpath({}, `defineVariable('x', 10) and
items.select(
  defineVariable('x', 20) and %x
)
`, fixture);
      expect(result).toEqual([20,20]);
    });
    it("Variable in repeat function", () => {
      const fixture = {
        "resourceType": "List",
        "item": {
          "id": "1"
        }
      };
      // Using variables with repeat()
      const result = fhirpath({}, `defineVariable('counter', 0) and
repeat(item,
  defineVariable('counter', %counter + 1) and
  {index: %counter, value: item}
).take(3)
`, fixture);
      expect(result).toEqual([{"index":1,"value":{"id":"1"}},{"index":2,"value":{"id":"2"}},{"index":3,"value":{"id":"3"}}]);
    });
    it("Undefined variable reference", () => {
      const fixture = {};
      // Reference to undefined variable
      expect(() => {
        fhirpath({}, `%undefinedVar + 10`, fixture);
      }).toThrow("Undefined variable: undefinedVar");
    });
    it("Invalid variable name", () => {
      const fixture = {};
      // Variable name with invalid characters
      expect(() => {
        fhirpath({}, `defineVariable('my-var', 10)`, fixture);
      }).toThrow("Invalid variable name: my-var");
    });
    it("Circular variable reference", () => {
      const fixture = {};
      // Variable referencing itself
      expect(() => {
        fhirpath({}, `defineVariable('x', %x + 1)`, fixture);
      }).toThrow("Circular variable reference: x");
    });
    it("Empty variable name", () => {
      const fixture = {};
      // Define variable with empty name
      expect(() => {
        fhirpath({}, `defineVariable('', 42)`, fixture);
      }).toThrow("Variable name cannot be empty");
    });
    it("Variable with null value", () => {
      const fixture = {};
      // Store null in variable
      const result = fhirpath({}, `defineVariable('nullVar', {}) and %nullVar.exists()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Variable name collision with constants", () => {
      const fixture = {};
      // Variable name same as environment constant
      expect(() => {
        fhirpath({}, `defineVariable('context', 'myValue')`, fixture);
      }).toThrow("Variable name conflicts with environment constant: context");
    });
  });
});
