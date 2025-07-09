import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 36-string-indexof-trim.yaml
// Tests for indexOf(), lastIndexOf(), and trim() string manipulation functions

describe("String indexOf and trim Functions", () => {

  describe("functions", () => {
    it("indexOf basic usage", () => {
      const fixture = {};
      // Find first occurrence of substring
      const result = fhirpath({}, `'Hello World'.indexOf('World')`, fixture);
      expect(result).toEqual([6]);
    });
    it("indexOf at beginning", () => {
      const fixture = {};
      // Find substring at start of string
      const result = fhirpath({}, `'FHIRPath'.indexOf('FHIR')`, fixture);
      expect(result).toEqual([0]);
    });
    it("indexOf not found", () => {
      const fixture = {};
      // indexOf returns -1 when substring not found
      const result = fhirpath({}, `'Hello World'.indexOf('xyz')`, fixture);
      expect(result).toEqual([-1]);
    });
    it("indexOf case sensitive", () => {
      const fixture = {};
      // indexOf is case sensitive
      const result = fhirpath({}, `'Hello World'.indexOf('world')`, fixture);
      expect(result).toEqual([-1]);
    });
    it("indexOf with empty string", () => {
      const fixture = {};
      // indexOf with empty search string
      const result = fhirpath({}, `'Hello'.indexOf('')`, fixture);
      expect(result).toEqual([0]);
    });
    it("indexOf repeated substring", () => {
      const fixture = {};
      // indexOf finds first occurrence only
      const result = fhirpath({}, `'ababab'.indexOf('ab')`, fixture);
      expect(result).toEqual([0]);
    });
    it("indexOf with special characters", () => {
      const fixture = {};
      // indexOf with special characters
      const result = fhirpath({}, `'user@example.com'.indexOf('@')`, fixture);
      expect(result).toEqual([4]);
    });
    it("indexOf in path expression", () => {
      const fixture = {
        "resourceType": "Patient",
        "emails": [
          {
            "value": "john@example.com",
            "primary": true
          },
          {
            "value": "invalid-email",
            "primary": false
          },
          {
            "value": "j.doe@work.com",
            "primary": false
          }
        ]
      };
      // Using indexOf in path navigation
      const result = fhirpath({}, `emails.where(value.indexOf('@') > 0)`, fixture);
      expect(result).toEqual([{"value":"john@example.com","primary":true},{"value":"j.doe@work.com","primary":false}]);
    });
    it("lastIndexOf basic usage", () => {
      const fixture = {};
      // Find last occurrence of substring
      const result = fhirpath({}, `'ababab'.lastIndexOf('ab')`, fixture);
      expect(result).toEqual([4]);
    });
    it("lastIndexOf single occurrence", () => {
      const fixture = {};
      // lastIndexOf with single occurrence
      const result = fhirpath({}, `'Hello World'.lastIndexOf('World')`, fixture);
      expect(result).toEqual([6]);
    });
    it("lastIndexOf not found", () => {
      const fixture = {};
      // lastIndexOf returns -1 when not found
      const result = fhirpath({}, `'Hello'.lastIndexOf('xyz')`, fixture);
      expect(result).toEqual([-1]);
    });
    it("lastIndexOf file extension", () => {
      const fixture = {};
      // Find file extension using lastIndexOf
      const result = fhirpath({}, `'document.pdf.backup'.lastIndexOf('.')`, fixture);
      expect(result).toEqual([12]);
    });
    it("trim leading and trailing spaces", () => {
      const fixture = {};
      // Remove whitespace from both ends
      const result = fhirpath({}, `'  Hello World  '.trim()`, fixture);
      expect(result).toEqual(["Hello World"]);
    });
    it("trim only leading spaces", () => {
      const fixture = {};
      // Remove leading whitespace
      const result = fhirpath({}, `'   Hello'.trim()`, fixture);
      expect(result).toEqual(["Hello"]);
    });
    it("trim only trailing spaces", () => {
      const fixture = {};
      // Remove trailing whitespace
      const result = fhirpath({}, `'World   '.trim()`, fixture);
      expect(result).toEqual(["World"]);
    });
    it("trim with tabs and newlines", () => {
      const fixture = {};
      // Trim various whitespace characters
      const result = fhirpath({}, `'	
  Hello  
	'.trim()`, fixture);
      expect(result).toEqual(["Hello"]);
    });
    it("trim empty string", () => {
      const fixture = {};
      // Trim on empty string
      const result = fhirpath({}, `''.trim()`, fixture);
      expect(result).toEqual([""]);
    });
    it("trim all whitespace", () => {
      const fixture = {};
      // Trim string that is all whitespace
      const result = fhirpath({}, `'   	
   '.trim()`, fixture);
      expect(result).toEqual([""]);
    });
    it("trim no whitespace", () => {
      const fixture = {};
      // Trim string with no whitespace
      const result = fhirpath({}, `'NoSpaces'.trim()`, fixture);
      expect(result).toEqual(["NoSpaces"]);
    });
    it("Extract domain from email", () => {
      const fixture = {
        "resourceType": "ContactPoint",
        "email": "user@example.com"
      };
      // Use indexOf to extract email domain
      const result = fhirpath({}, `email.substring(email.indexOf('@') + 1)`, fixture);
      expect(result).toEqual(["example.com"]);
    });
    it("Extract file name without extension", () => {
      const fixture = {
        "resourceType": "DocumentReference",
        "filename": "report_2024.pdf"
      };
      // Use lastIndexOf to remove file extension
      const result = fhirpath({}, `filename.substring(0, filename.lastIndexOf('.'))`, fixture);
      expect(result).toEqual(["report_2024"]);
    });
    it("Clean and validate input", () => {
      const fixture = {
        "resourceType": "Form",
        "inputs": [
          "  John  ",
          "Doe",
          "   ",
          " 12345 ",
          ""
        ]
      };
      // Trim and check for valid content
      const result = fhirpath({}, `inputs.select(trim()).where(length() > 0)`, fixture);
      expect(result).toEqual(["John","Doe","12345"]);
    });
    it("Parse structured data", () => {
      const fixture = {
        "resourceType": "Configuration",
        "parameters": [
          "name=John",
          "age=30",
          "city=Boston"
        ]
      };
      // Parse key-value pairs using indexOf
      const result = fhirpath({}, `parameters.select({key: substring(0, indexOf('=')), value: substring(indexOf('=') + 1)})`, fixture);
      expect(result).toEqual([{"key":"name","value":"John"},{"key":"age","value":"30"},{"key":"city","value":"Boston"}]);
    });
    it("URL path extraction", () => {
      const fixture = {
        "resourceType": "Reference",
        "url": "https://example.com/fhir/Patient/123"
      };
      // Extract path components using indexOf
      const result = fhirpath({}, `url.substring(url.indexOf('://') + 3).substring(indexOf('/') + 1)`, fixture);
      expect(result).toEqual(["fhir/Patient/123"]);
    });
    it("indexOf on non-string", () => {
      const fixture = {};
      // indexOf on non-string value
      expect(() => {
        fhirpath({}, `123.indexOf('2')`, fixture);
      }).toThrow("indexOf() requires string input");
    });
    it("trim on non-string", () => {
      const fixture = {};
      // trim on non-string value
      expect(() => {
        fhirpath({}, `true.trim()`, fixture);
      }).toThrow("trim() requires string input");
    });
    it("indexOf with non-string parameter", () => {
      const fixture = {};
      // indexOf with non-string search parameter
      expect(() => {
        fhirpath({}, `'Hello'.indexOf(123)`, fixture);
      }).toThrow("indexOf() requires string parameter");
    });
    it("indexOf with null", () => {
      const fixture = {};
      // indexOf on null/empty
      const result = fhirpath({}, `{}.indexOf('test')`, fixture);
      expect(result).toEqual([]);
    });
    it("trim with null", () => {
      const fixture = {};
      // trim on null/empty
      const result = fhirpath({}, `{}.trim()`, fixture);
      expect(result).toEqual([]);
    });
    it("indexOf overlapping pattern", () => {
      const fixture = {};
      // indexOf with overlapping occurrences
      const result = fhirpath({}, `'aaaa'.indexOf('aa')`, fixture);
      expect(result).toEqual([0]);
    });
  });
});
