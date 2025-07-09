import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 31-boolean-aggregates.yaml
// Tests for allTrue(), allFalse(), anyTrue(), anyFalse() functions

describe("Boolean Aggregate Functions", () => {

  describe("functions", () => {
    it("allTrue with all true values", () => {
      const fixture = {};
      // allTrue() returns true when all items are true
      const result = fhirpath({}, `(true | true | true).allTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("allTrue with mixed values", () => {
      const fixture = {};
      // allTrue() returns false when not all items are true
      const result = fhirpath({}, `(true | false | true).allTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("allTrue with all false values", () => {
      const fixture = {};
      // allTrue() returns false when all items are false
      const result = fhirpath({}, `(false | false | false).allTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("allTrue on empty collection", () => {
      const fixture = {};
      // allTrue() on empty collection returns true (vacuous truth)
      const result = fhirpath({}, `{}.allTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("allTrue with path expression", () => {
      const fixture = {
        "resourceType": "Patient",
        "vaccinations": [
          {
            "vaccine": "COVID-19",
            "status": true
          },
          {
            "vaccine": "Flu",
            "status": false
          },
          {
            "vaccine": "Hepatitis B",
            "status": true
          }
        ]
      };
      // allTrue() with boolean path evaluation
      const result = fhirpath({}, `vaccinations.status.allTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("allFalse with all false values", () => {
      const fixture = {};
      // allFalse() returns true when all items are false
      const result = fhirpath({}, `(false | false | false).allFalse()`, fixture);
      expect(result).toEqual([true]);
    });
    it("allFalse with mixed values", () => {
      const fixture = {};
      // allFalse() returns false when not all items are false
      const result = fhirpath({}, `(false | true | false).allFalse()`, fixture);
      expect(result).toEqual([false]);
    });
    it("allFalse with all true values", () => {
      const fixture = {};
      // allFalse() returns false when all items are true
      const result = fhirpath({}, `(true | true | true).allFalse()`, fixture);
      expect(result).toEqual([false]);
    });
    it("allFalse on empty collection", () => {
      const fixture = {};
      // allFalse() on empty collection returns true (vacuous truth)
      const result = fhirpath({}, `{}.allFalse()`, fixture);
      expect(result).toEqual([true]);
    });
    it("anyTrue with at least one true", () => {
      const fixture = {};
      // anyTrue() returns true when at least one item is true
      const result = fhirpath({}, `(false | true | false).anyTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("anyTrue with all false values", () => {
      const fixture = {};
      // anyTrue() returns false when all items are false
      const result = fhirpath({}, `(false | false | false).anyTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("anyTrue with all true values", () => {
      const fixture = {};
      // anyTrue() returns true when all items are true
      const result = fhirpath({}, `(true | true | true).anyTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("anyTrue on empty collection", () => {
      const fixture = {};
      // anyTrue() on empty collection returns false
      const result = fhirpath({}, `{}.anyTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("anyFalse with at least one false", () => {
      const fixture = {};
      // anyFalse() returns true when at least one item is false
      const result = fhirpath({}, `(true | false | true).anyFalse()`, fixture);
      expect(result).toEqual([true]);
    });
    it("anyFalse with all true values", () => {
      const fixture = {};
      // anyFalse() returns false when all items are true
      const result = fhirpath({}, `(true | true | true).anyFalse()`, fixture);
      expect(result).toEqual([false]);
    });
    it("anyFalse with all false values", () => {
      const fixture = {};
      // anyFalse() returns true when all items are false
      const result = fhirpath({}, `(false | false | false).anyFalse()`, fixture);
      expect(result).toEqual([true]);
    });
    it("anyFalse on empty collection", () => {
      const fixture = {};
      // anyFalse() on empty collection returns false
      const result = fhirpath({}, `{}.anyFalse()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Boolean aggregates with conditional logic", () => {
      const fixture = {
        "resourceType": "Patient",
        "conditions": [
          {
            "name": "Hypertension",
            "severity": 7,
            "active": true
          },
          {
            "name": "Diabetes",
            "severity": 8,
            "active": true
          },
          {
            "name": "Headache",
            "severity": 3,
            "active": false
          }
        ]
      };
      // Combining boolean aggregates with where() conditions
      const result = fhirpath({}, `conditions.where(severity > 5).active.allTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Nested boolean aggregate evaluation", () => {
      const fixture = {
        "resourceType": "Organization",
        "departments": [
          {
            "name": "Cardiology",
            "employees": [
              {
                "name": "Dr. Smith",
                "active": true
              },
              {
                "name": "Dr. Jones",
                "active": true
              }
            ]
          },
          {
            "name": "Radiology",
            "employees": [
              {
                "name": "Dr. Brown",
                "active": false
              },
              {
                "name": "Dr. White",
                "active": true
              }
            ]
          }
        ]
      };
      // Boolean aggregates with nested collections
      const result = fhirpath({}, `departments.select(employees.active.allTrue()).anyTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Boolean aggregates with null handling", () => {
      const fixture = {};
      // How boolean aggregates handle null values
      const result = fhirpath({}, `(true | {} | false).anyTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Chained boolean aggregates", () => {
      const fixture = {
        "resourceType": "Resource",
        "flags": {
          "a": [
            false,
            true,
            false
          ],
          "b": [
            false,
            false
          ],
          "c": [
            true,
            true,
            true
          ]
        }
      };
      // Multiple boolean aggregates in sequence
      const result = fhirpath({}, `((flags.a.anyTrue() | flags.b.allFalse()) | flags.c.allTrue()).allTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("All vaccines completed check", () => {
      const fixture = {
        "resourceType": "Patient",
        "immunizations": [
          {
            "vaccine": "MMR",
            "required": true,
            "completed": true
          },
          {
            "vaccine": "DTP",
            "required": true,
            "completed": false
          },
          {
            "vaccine": "Flu",
            "required": false,
            "completed": false
          }
        ]
      };
      // Check if all required vaccines are completed
      const result = fhirpath({}, `immunizations.where(required = true).completed.allTrue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Any critical lab result", () => {
      const fixture = {
        "resourceType": "DiagnosticReport",
        "labResults": [
          {
            "test": "Glucose",
            "value": 250,
            "referenceRange": {
              "low": 70,
              "high": 100
            }
          },
          {
            "test": "Hemoglobin",
            "value": 14,
            "referenceRange": {
              "low": 13.5,
              "high": 17.5
            }
          }
        ]
      };
      // Check if any lab results are critical
      const result = fhirpath({}, `labResults.select(value > referenceRange.high or value < referenceRange.low).anyTrue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("allTrue on non-boolean collection", () => {
      const fixture = {};
      // allTrue() on non-boolean values should error
      expect(() => {
        fhirpath({}, `(1 | 2 | 3).allTrue()`, fixture);
      }).toThrow("allTrue() requires boolean values");
    });
    it("Boolean aggregate on mixed types", () => {
      const fixture = {};
      // Boolean aggregates with mixed type collection
      expect(() => {
        fhirpath({}, `(true | 'string' | false).anyTrue()`, fixture);
      }).toThrow("Boolean aggregate functions require all boolean values");
    });
  });
});
