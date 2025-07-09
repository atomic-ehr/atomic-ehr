import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 34-delimited-identifiers.yaml
// Tests for backtick-delimited identifiers with special characters, spaces, and reserved words

describe("Delimited Identifiers", () => {

  describe("syntax", () => {
    it("Identifier with spaces", () => {
      const fixture = {
        "resourceType": "Person",
        "first name": "John",
        "last name": "Doe"
      };
      // Access property with spaces using backticks
      const result = fhirpath({}, `\`first name\``, fixture);
      expect(result).toEqual(["John"]);
    });
    it("Identifier with hyphen", () => {
      const fixture = {
        "resourceType": "Patient",
        "patient-id": "P12345",
        "admission-date": "2024-01-15"
      };
      // Access property with hyphen
      const result = fhirpath({}, `\`patient-id\``, fixture);
      expect(result).toEqual(["P12345"]);
    });
    it("Identifier with dots", () => {
      const fixture = {
        "resourceType": "Resource",
        "com.example.customField": "custom-value",
        "com.example.version": "1.0"
      };
      // Access property containing dots
      const result = fhirpath({}, `\`com.example.customField\``, fixture);
      expect(result).toEqual(["custom-value"]);
    });
    it("Reserved word as identifier", () => {
      const fixture = {
        "resourceType": "Resource",
        "where": "location",
        "when": "2024-01-01",
        "select": "option-a"
      };
      // Use FHIRPath reserved word as property name
      const result = fhirpath({}, `\`where\``, fixture);
      expect(result).toEqual(["location"]);
    });
    it("Numeric identifier", () => {
      const fixture = {
        "resourceType": "CodeSystem",
        "123-code": "ABC",
        "456-code": "DEF"
      };
      // Property name starting with number
      const result = fhirpath({}, `\`123-code\``, fixture);
      expect(result).toEqual(["ABC"]);
    });
    it("Special characters in identifier", () => {
      const fixture = {
        "resourceType": "Resource",
        "field@2024!": "special",
        "field#2023?": "previous"
      };
      // Identifier with various special characters
      const result = fhirpath({}, `\`field@2024!\``, fixture);
      expect(result).toEqual(["special"]);
    });
    it("Unicode in identifier", () => {
      const fixture = {
        "resourceType": "Patient",
        "名前": "太郎",
        "年齢": 30
      };
      // Identifier with unicode characters
      const result = fhirpath({}, `\`名前\``, fixture);
      expect(result).toEqual(["太郎"]);
    });
    it("Emoji in identifier", () => {
      const fixture = {
        "resourceType": "Resource",
        "status-🟢": "active",
        "status-🔴": "inactive"
      };
      // Identifier containing emoji
      const result = fhirpath({}, `\`status-🟢\``, fixture);
      expect(result).toEqual(["active"]);
    });
    it("Chained delimited identifiers", () => {
      const fixture = {
        "resourceType": "Record",
        "patient info": {
          "full name": "John Smith",
          "date of birth": "1990-01-01"
        }
      };
      // Multiple delimited identifiers in path
      const result = fhirpath({}, `\`patient info\`.\`full name\``, fixture);
      expect(result).toEqual(["John Smith"]);
    });
    it("Mixed regular and delimited", () => {
      const fixture = {
        "resourceType": "Observation",
        "data": {
          "measurement-1": {
            "value": 100,
            "unit": "mg/dL"
          },
          "measurement-2": {
            "value": 110,
            "unit": "mg/dL"
          }
        }
      };
      // Combining regular and delimited identifiers
      const result = fhirpath({}, `data.\`measurement-1\`.value`, fixture);
      expect(result).toEqual([100]);
    });
    it("Delimited identifier in where clause", () => {
      const fixture = {
        "resourceType": "Inventory",
        "items": [
          {
            "item-code": "A123",
            "item-name": "Widget"
          },
          {
            "item-code": "B456",
            "item-name": "Gadget"
          }
        ]
      };
      // Using delimited identifier in filtering
      const result = fhirpath({}, `items.where(\`item-code\` = 'A123')`, fixture);
      expect(result).toEqual([{"item-code":"A123","item-name":"Widget"}]);
    });
    it("Empty delimited identifier", () => {
      const fixture = {
        "resourceType": "Resource",
        "": "empty-property"
      };
      // Property with empty name
      const result = fhirpath({}, `\`\``, fixture);
      expect(result).toEqual(["empty-property"]);
    });
    it("Backtick inside identifier", () => {
      const fixture = {
        "resourceType": "Resource",
        "field`with`backticks": "value"
      };
      // Escaping backtick within identifier
      const result = fhirpath({}, `\`field\\\`with\\\`backticks\``, fixture);
      expect(result).toEqual(["value"]);
    });
    it("Newline in identifier", () => {
      const fixture = {
        "resourceType": "Resource",
        "field\nwith\nnewlines": "multiline"
      };
      // Identifier containing newline
      const result = fhirpath({}, `\`field
with
newlines\``, fixture);
      expect(result).toEqual(["multiline"]);
    });
    it("HL7 extension URLs", () => {
      const fixture = {
        "resourceType": "Patient",
        "http://hl7.org/fhir/StructureDefinition/patient-birthPlace": "Boston, MA",
        "http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName": "Smith"
      };
      // Accessing HL7 extension URLs as properties
      const result = fhirpath({}, `\`http://hl7.org/fhir/StructureDefinition/patient-birthPlace\``, fixture);
      expect(result).toEqual(["Boston, MA"]);
    });
    it("Custom namespace properties", () => {
      const fixture = {
        "resourceType": "Patient",
        "custom:patient-score": 85,
        "custom:risk-level": "medium"
      };
      // Properties with namespace prefixes
      const result = fhirpath({}, `\`custom:patient-score\``, fixture);
      expect(result).toEqual([85]);
    });
    it("Database column names", () => {
      const fixture = {
        "resourceType": "DatabaseRecord",
        "PATIENT_FIRST_NAME": "Alice",
        "PATIENT_LAST_NAME": "Johnson",
        "PATIENT_DOB": "1985-06-15"
      };
      // Properties matching database column conventions
      const result = fhirpath({}, `\`PATIENT_FIRST_NAME\``, fixture);
      expect(result).toEqual(["Alice"]);
    });
    it("Function on delimited property", () => {
      const fixture = {
        "resourceType": "LabReport",
        "test-results": [
          {
            "test-type": "blood",
            "test-value": 5.5
          },
          {
            "test-type": "urine",
            "test-value": 1.02
          },
          {
            "test-type": "blood",
            "test-value": 6.2
          }
        ]
      };
      // Calling functions on delimited identifier results
      const result = fhirpath({}, `\`test-results\`.where(\`test-type\` = 'blood')`, fixture);
      expect(result).toEqual([{"test-type":"blood","test-value":5.5},{"test-type":"blood","test-value":6.2}]);
    });
    it("Unclosed delimited identifier", () => {
      const fixture = {};
      // Missing closing backtick
      expect(() => {
        fhirpath({}, `\`unclosed identifier`, fixture);
      }).toThrow("Unclosed delimited identifier");
    });
    it("Invalid escape in delimited", () => {
      const fixture = {};
      // Invalid escape sequence in delimited identifier
      expect(() => {
        fhirpath({}, `\`invalid\escape\``, fixture);
      }).toThrow("Invalid escape sequence in delimited identifier");
    });
  });
});
