import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 32-collection-advanced.yaml
// Tests for slice(), isDistinct(), flatten(), subsetOf(), supersetOf() functions

describe("Advanced Collection Functions", () => {

  describe("functions", () => {
    it("slice basic usage", () => {
      const fixture = {};
      // Extract a portion of collection with slice()
      const result = fhirpath({}, `(1 | 2 | 3 | 4 | 5).slice(1, 3)`, fixture);
      expect(result).toEqual([2,3,4]);
    });
    it("slice from beginning", () => {
      const fixture = {};
      // slice() starting from index 0
      const result = fhirpath({}, `('a' | 'b' | 'c' | 'd').slice(0, 2)`, fixture);
      expect(result).toEqual(["a","b"]);
    });
    it("slice to end", () => {
      const fixture = {};
      // slice() with length exceeding collection size
      const result = fhirpath({}, `(10 | 20 | 30).slice(1, 10)`, fixture);
      expect(result).toEqual([20,30]);
    });
    it("slice with negative start", () => {
      const fixture = {};
      // slice() with negative start index
      const result = fhirpath({}, `(1 | 2 | 3 | 4).slice(-2, 2)`, fixture);
      expect(result).toEqual([3,4]);
    });
    it("slice empty result", () => {
      const fixture = {};
      // slice() returning empty when start exceeds length
      const result = fhirpath({}, `(1 | 2 | 3).slice(5, 2)`, fixture);
      expect(result).toEqual([]);
    });
    it("slice on path expression", () => {
      const fixture = {
        "resourceType": "Patient",
        "medications": [
          {
            "name": "Aspirin",
            "dose": "81mg"
          },
          {
            "name": "Lisinopril",
            "dose": "10mg"
          },
          {
            "name": "Metformin",
            "dose": "500mg"
          },
          {
            "name": "Atorvastatin",
            "dose": "20mg"
          }
        ]
      };
      // Using slice() on property paths
      const result = fhirpath({}, `medications.slice(1, 2)`, fixture);
      expect(result).toEqual([{"name":"Lisinopril","dose":"10mg"},{"name":"Metformin","dose":"500mg"}]);
    });
    it("isDistinct with unique values", () => {
      const fixture = {};
      // isDistinct() returns true for unique values
      const result = fhirpath({}, `(1 | 2 | 3 | 4).isDistinct()`, fixture);
      expect(result).toEqual([true]);
    });
    it("isDistinct with duplicates", () => {
      const fixture = {};
      // isDistinct() returns false when duplicates exist
      const result = fhirpath({}, `(1 | 2 | 2 | 3).isDistinct()`, fixture);
      expect(result).toEqual([false]);
    });
    it("isDistinct with strings", () => {
      const fixture = {};
      // isDistinct() checking string uniqueness
      const result = fhirpath({}, `('apple' | 'banana' | 'apple').isDistinct()`, fixture);
      expect(result).toEqual([false]);
    });
    it("isDistinct on empty collection", () => {
      const fixture = {};
      // isDistinct() on empty collection returns true
      const result = fhirpath({}, `{}.isDistinct()`, fixture);
      expect(result).toEqual([true]);
    });
    it("isDistinct with complex objects", () => {
      const fixture = {
        "resourceType": "CodeableConcept",
        "codes": [
          {
            "system": "http://loinc.org",
            "code": "1234-5"
          },
          {
            "system": "http://loinc.org",
            "code": "5678-9"
          },
          {
            "system": "http://loinc.org",
            "code": "1234-5"
          }
        ]
      };
      // isDistinct() comparing complex objects
      const result = fhirpath({}, `codes.isDistinct()`, fixture);
      expect(result).toEqual([false]);
    });
    it("flatten nested collections", () => {
      const fixture = {};
      // flatten() removes one level of nesting
      const result = fhirpath({}, `((1 | 2) | (3 | 4)).flatten()`, fixture);
      expect(result).toEqual([1,2,3,4]);
    });
    it("flatten mixed depth collections", () => {
      const fixture = {};
      // flatten() with varying nesting levels
      const result = fhirpath({}, `(1 | (2 | 3) | 4).flatten()`, fixture);
      expect(result).toEqual([1,2,3,4]);
    });
    it("flatten already flat collection", () => {
      const fixture = {};
      // flatten() on non-nested collection
      const result = fhirpath({}, `(1 | 2 | 3).flatten()`, fixture);
      expect(result).toEqual([1,2,3]);
    });
    it("flatten path expressions", () => {
      const fixture = {
        "resourceType": "Bundle",
        "organizations": [
          {
            "name": "Tech Corp",
            "departments": [
              {
                "name": "Engineering",
                "employees": [
                  {
                    "name": "Alice",
                    "role": "Manager"
                  },
                  {
                    "name": "Bob",
                    "role": "Developer"
                  }
                ]
              },
              {
                "name": "Analytics",
                "employees": [
                  {
                    "name": "Carol",
                    "role": "Analyst"
                  }
                ]
              }
            ]
          },
          {
            "name": "Design Inc",
            "departments": [
              {
                "name": "Creative",
                "employees": [
                  {
                    "name": "David",
                    "role": "Designer"
                  }
                ]
              }
            ]
          }
        ]
      };
      // flatten() with nested path results
      const result = fhirpath({}, `organizations.departments.employees.flatten()`, fixture);
      expect(result).toEqual([{"name":"Alice","role":"Manager"},{"name":"Bob","role":"Developer"},{"name":"Carol","role":"Analyst"},{"name":"David","role":"Designer"}]);
    });
    it("subsetOf true case", () => {
      const fixture = {};
      // Collection is subset of another
      const result = fhirpath({}, `(1 | 2).subsetOf(1 | 2 | 3 | 4)`, fixture);
      expect(result).toEqual([true]);
    });
    it("subsetOf false case", () => {
      const fixture = {};
      // Collection is not subset when element missing
      const result = fhirpath({}, `(1 | 2 | 5).subsetOf(1 | 2 | 3 | 4)`, fixture);
      expect(result).toEqual([false]);
    });
    it("subsetOf with duplicates", () => {
      const fixture = {};
      // subsetOf handling duplicate elements
      const result = fhirpath({}, `(1 | 1 | 2).subsetOf(1 | 2 | 3)`, fixture);
      expect(result).toEqual([true]);
    });
    it("subsetOf empty collection", () => {
      const fixture = {};
      // Empty collection is subset of any collection
      const result = fhirpath({}, `{}.subsetOf(1 | 2 | 3)`, fixture);
      expect(result).toEqual([true]);
    });
    it("subsetOf same collection", () => {
      const fixture = {};
      // Collection is subset of itself
      const result = fhirpath({}, `(1 | 2 | 3).subsetOf(1 | 2 | 3)`, fixture);
      expect(result).toEqual([true]);
    });
    it("supersetOf true case", () => {
      const fixture = {};
      // Collection is superset of another
      const result = fhirpath({}, `(1 | 2 | 3 | 4).supersetOf(2 | 3)`, fixture);
      expect(result).toEqual([true]);
    });
    it("supersetOf false case", () => {
      const fixture = {};
      // Collection is not superset when element missing
      const result = fhirpath({}, `(1 | 2 | 3).supersetOf(2 | 4)`, fixture);
      expect(result).toEqual([false]);
    });
    it("supersetOf with empty", () => {
      const fixture = {};
      // Any collection is superset of empty collection
      const result = fhirpath({}, `(1 | 2).supersetOf({})`, fixture);
      expect(result).toEqual([true]);
    });
    it("Chained collection operations", () => {
      const fixture = {
        "resourceType": "Bundle",
        "patients": [
          {
            "id": "p1",
            "conditions": [
              "Diabetes",
              "Hypertension"
            ]
          },
          {
            "id": "p2",
            "conditions": [
              "Diabetes",
              "Asthma"
            ]
          },
          {
            "id": "p3",
            "conditions": [
              "COPD"
            ]
          }
        ]
      };
      // Combining multiple collection functions
      const result = fhirpath({}, `patients.conditions.flatten().slice(0, 3).isDistinct()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Set operations combination", () => {
      const fixture = {
        "resourceType": "DiagnosticOrder",
        "requiredTests": [
          "CBC",
          "BMP"
        ],
        "completedTests": [
          "CBC",
          "BMP",
          "Lipid Panel",
          "HbA1c"
        ],
        "criticalTests": [
          "CBC"
        ]
      };
      // Complex subset/superset checking
      const result = fhirpath({}, `requiredTests.subsetOf(completedTests) and completedTests.supersetOf(criticalTests)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Distinct slices of data", () => {
      const fixture = {
        "resourceType": "Bundle",
        "observations": [
          {
            "code": "8480-6"
          },
          {
            "code": "8462-4"
          },
          {
            "code": "8310-5"
          },
          {
            "code": "8480-6"
          },
          {
            "code": "9279-1"
          },
          {
            "code": "8867-4"
          },
          {
            "code": "8867-4"
          },
          {
            "code": "2708-6"
          },
          {
            "code": "8480-6"
          },
          {
            "code": "8462-4"
          }
        ]
      };
      // Checking uniqueness in data slices
      const result = fhirpath({}, `observations.slice(0, 5).code.isDistinct() and observations.slice(5, 5).code.isDistinct()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Medication list uniqueness check", () => {
      const fixture = {
        "resourceType": "Bundle",
        "medicationRequest": [
          {
            "medication": {
              "coding": [
                {
                  "system": "RxNorm",
                  "code": "315677"
                }
              ]
            }
          },
          {
            "medication": {
              "coding": [
                {
                  "system": "RxNorm",
                  "code": "860975"
                }
              ]
            }
          },
          {
            "medication": {
              "coding": [
                {
                  "system": "RxNorm",
                  "code": "315677"
                }
              ]
            }
          }
        ]
      };
      // Ensure no duplicate medications prescribed
      const result = fhirpath({}, `medicationRequest.medication.coding.code.isDistinct()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Lab result pagination", () => {
      const fixture = {
        "resourceType": "Bundle",
        "labResults": [
          {
            "test": "Glucose",
            "date": "2024-01-01"
          },
          {
            "test": "HbA1c",
            "date": "2024-01-02"
          },
          {
            "test": "Cholesterol",
            "date": "2024-01-03"
          }
        ]
      };
      // Paginate through lab results using slice
      const result = fhirpath({}, `labResults.orderBy(date).slice(10, 10)`, fixture);
      expect(result).toEqual([]);
    });
    it("slice with invalid parameters", () => {
      const fixture = {};
      // slice() with non-numeric parameters
      expect(() => {
        fhirpath({}, `(1 | 2 | 3).slice('a', 2)`, fixture);
      }).toThrow("slice() requires numeric parameters");
    });
    it("subsetOf with non-collection", () => {
      const fixture = {};
      // subsetOf() with non-collection argument
      expect(() => {
        fhirpath({}, `(1 | 2).subsetOf(3)`, fixture);
      }).toThrow("subsetOf() requires collection argument");
    });
  });
});
