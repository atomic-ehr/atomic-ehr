import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 38-conversion-alias-functions.yaml
// Tests for toString(), toDate(), single(), hasValue(), and string concatenation operator &

describe("Type Conversion and Alias Functions", () => {

  describe("functions", () => {
    it("toString from integer", () => {
      const fixture = {};
      // Convert integer to string
      const result = fhirpath({}, `42.toString()`, fixture);
      expect(result).toEqual(["42"]);
    });
    it("toString from decimal", () => {
      const fixture = {};
      // Convert decimal to string
      const result = fhirpath({}, `3.14.toString()`, fixture);
      expect(result).toEqual(["3.14"]);
    });
    it("toString from boolean", () => {
      const fixture = {};
      // Convert boolean to string
      const result = fhirpath({}, `true.toString()`, fixture);
      expect(result).toEqual(["true"]);
    });
    it("toString from date", () => {
      const fixture = {};
      // Convert date to string
      const result = fhirpath({}, `@2024-01-15.toString()`, fixture);
      expect(result).toEqual(["2024-01-15"]);
    });
    it("toString from datetime", () => {
      const fixture = {};
      // Convert datetime to string
      const result = fhirpath({}, `@2024-01-15T14:30:00.toString()`, fixture);
      expect(result).toEqual(["2024-01-15T14:30:00"]);
    });
    it("toString from quantity", () => {
      const fixture = {};
      // Convert quantity to string representation
      const result = fhirpath({}, `(25.5 'mg').toString()`, fixture);
      expect(result).toEqual(["25.5 'mg'"]);
    });
    it("toString on collection", () => {
      const fixture = {};
      // Convert each element to string
      const result = fhirpath({}, `(1 | 2 | 3).toString()`, fixture);
      expect(result).toEqual(["1","2","3"]);
    });
    it("toDate from string", () => {
      const fixture = {};
      // Convert string to date
      const result = fhirpath({}, `'2024-01-15'.toDate()`, fixture);
      expect(result).toEqual(["2024-01-15"]);
    });
    it("toDate from datetime", () => {
      const fixture = {};
      // Extract date from datetime
      const result = fhirpath({}, `@2024-01-15T14:30:00Z.toDate()`, fixture);
      expect(result).toEqual(["2024-01-15"]);
    });
    it("toDate with invalid format", () => {
      const fixture = {};
      // toDate with invalid date string
      const result = fhirpath({}, `'not-a-date'.toDate()`, fixture);
      expect(result).toEqual([]);
    });
    it("toDate from path expression", () => {
      const fixture = {
        "resourceType": "Bundle",
        "patients": [
          {
            "birthDate": "1990-05-15"
          },
          {
            "birthDate": "1985-12-20"
          },
          {
            "birthDate": "2000-01-01"
          }
        ]
      };
      // Convert birthdate strings to dates
      const result = fhirpath({}, `patients.birthDate.toDate()`, fixture);
      expect(result).toEqual(["1990-05-15","1985-12-20","2000-01-01"]);
    });
    it("single on single-element collection", () => {
      const fixture = {};
      // single() returns element if exactly one
      const result = fhirpath({}, `(42).single()`, fixture);
      expect(result).toEqual([42]);
    });
    it("single on empty collection", () => {
      const fixture = {};
      // single() errors on empty collection
      expect(() => {
        fhirpath({}, `{}.single()`, fixture);
      }).toThrow("single() requires exactly one element");
    });
    it("single on multi-element collection", () => {
      const fixture = {};
      // single() errors with multiple elements
      expect(() => {
        fhirpath({}, `(1 | 2 | 3).single()`, fixture);
      }).toThrow("single() requires exactly one element");
    });
    it("single vs first comparison", () => {
      const fixture = {
        "resourceType": "Patient",
        "identifier": [
          {
            "system": "mrn",
            "value": "12345"
          }
        ]
      };
      // single() is stricter than first()
      const result = fhirpath({}, `identifier.where(system = 'mrn').single()`, fixture);
      expect(result).toEqual([{"system":"mrn","value":"12345"}]);
    });
    it("hasValue on element with value", () => {
      const fixture = {
        "resourceType": "Extension",
        "url": "http://example.com",
        "valueString": "test"
      };
      // Check if FHIR element has value
      const result = fhirpath({}, `valueString.hasValue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("hasValue on element without value", () => {
      const fixture = {
        "resourceType": "Extension",
        "url": "http://example.com"
      };
      // hasValue returns false for missing value
      const result = fhirpath({}, `valueString.hasValue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("hasValue on null extension", () => {
      const fixture = {
        "resourceType": "Element",
        "id": "test"
      };
      // hasValue with null/missing extension
      const result = fhirpath({}, `extension.hasValue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("hasValue in filtering", () => {
      const fixture = {
        "resourceType": "Patient",
        "extension": [
          {
            "url": "weight"
          },
          {
            "url": "height",
            "valueDecimal": 170
          },
          {
            "url": "eye-color",
            "valueString": "blue"
          }
        ]
      };
      // Use hasValue to filter elements
      const result = fhirpath({}, `extension.where(hasValue())`, fixture);
      expect(result).toEqual([{"url":"height","valueDecimal":170},{"url":"eye-color","valueString":"blue"}]);
    });
    it("Format patient identifier", () => {
      const fixture = {
        "resourceType": "Patient",
        "identifier": [
          {
            "use": "official",
            "type": {
              "text": "Medical Record Number"
            },
            "value": "MRN-12345"
          },
          {
            "use": "secondary",
            "value": "ALT-67890"
          }
        ]
      };
      // Build formatted identifier string
      const result = fhirpath({}, `identifier.where(use = 'official').first().type.text & ': ' & identifier.where(use = 'official').first().value`, fixture);
      expect(result).toEqual(["Medical Record Number: MRN-12345"]);
    });
    it("Date range formatting", () => {
      const fixture = {
        "resourceType": "Coverage",
        "period": {
          "start": "2024-01-01T00:00:00Z",
          "end": "2024-12-31T23:59:59Z"
        }
      };
      // Format date range as string
      const result = fhirpath({}, `'Period: ' & period.start.toDate().toString() & ' to ' & period.end.toDate().toString()`, fixture);
      expect(result).toEqual(["Period: 2024-01-01 to 2024-12-31"]);
    });
    it("Validate single primary contact", () => {
      const fixture = {
        "resourceType": "Patient",
        "contact": [
          {
            "relationship": [
              {
                "coding": [
                  {
                    "code": "primary"
                  }
                ]
              }
            ],
            "name": "John Smith"
          },
          {
            "relationship": [
              {
                "coding": [
                  {
                    "code": "emergency"
                  }
                ]
              }
            ],
            "name": "Jane Doe"
          }
        ]
      };
      // Ensure exactly one primary contact
      const result = fhirpath({}, `contact.where(relationship.coding.code = 'primary').single().name`, fixture);
      expect(result).toEqual(["John Smith"]);
    });
    it("toString on empty collection", () => {
      const fixture = {};
      // toString on empty returns empty
      const result = fhirpath({}, `{}.toString()`, fixture);
      expect(result).toEqual([]);
    });
    it("Invalid date conversion", () => {
      const fixture = {};
      // toDate with completely invalid input
      expect(() => {
        fhirpath({}, `true.toDate()`, fixture);
      }).toThrow("Cannot convert boolean to date");
    });
  });
  describe("operators", () => {
    it("String concatenation with &", () => {
      const fixture = {};
      // Concatenate strings using & operator
      const result = fhirpath({}, `'Hello' & ' ' & 'World'`, fixture);
      expect(result).toEqual(["Hello World"]);
    });
    it("& operator with numbers", () => {
      const fixture = {};
      // Concatenate numbers as strings
      const result = fhirpath({}, `'Value: ' & 42`, fixture);
      expect(result).toEqual(["Value: 42"]);
    });
    it("& operator with mixed types", () => {
      const fixture = {
        "resourceType": "Patient",
        "id": "12345",
        "active": true
      };
      // Concatenate different types
      const result = fhirpath({}, `'Patient ' & id & ' is ' & active`, fixture);
      expect(result).toEqual(["Patient 12345 is true"]);
    });
    it("& operator with null", () => {
      const fixture = {
        "resourceType": "Patient",
        "name": [
          {
            "given": [
              "John"
            ]
          }
        ]
      };
      // Concatenation with null/empty values
      const result = fhirpath({}, `'Name: ' & name.first() & ' ' & name.last()`, fixture);
      expect(result).toEqual(["Name: John "]);
    });
    it("& vs + operator comparison", () => {
      const fixture = {};
      // String concatenation vs arithmetic addition
      const result = fhirpath({}, `('1' & '2') != (1 + 2).toString()`, fixture);
      expect(result).toEqual([true]);
    });
    it("& operator type coercion limits", () => {
      const fixture = {
        "resourceType": "Bundle",
        "patient": {
          "id": "123",
          "name": [
            {
              "given": [
                "John"
              ]
            }
          ]
        }
      };
      // Complex object concatenation
      expect(() => {
        fhirpath({}, `patient & ' suffix'`, fixture);
      }).toThrow("Cannot concatenate complex object");
    });
  });
});
