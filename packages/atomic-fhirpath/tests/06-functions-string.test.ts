import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 06-functions-string.yaml
// Tests for FHIRPath string functions including length(), substring(), contains(), startsWith(), endsWith(), upper(), and lower()

describe("String Functions", () => {

  describe("functions", () => {
    it("length() on simple string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test length() function on simple string
      const result = fhirpath({}, `name.length()`, fixture);
      expect(result).toEqual([8]);
    });
    it("length() on empty string", () => {
      const fixture = {
        "name": ""
      };
      // Test length() function on empty string
      const result = fhirpath({}, `name.length()`, fixture);
      expect(result).toEqual([0]);
    });
    it("length() on string with spaces", () => {
      const fixture = {
        "name": "John William Doe"
      };
      // Test length() function on string with spaces
      const result = fhirpath({}, `name.length()`, fixture);
      expect(result).toEqual([13]);
    });
    it("length() on string with special characters", () => {
      const fixture = {
        "name": "Héllo, Wörld! 123"
      };
      // Test length() function on string with special characters
      const result = fhirpath({}, `name.length()`, fixture);
      expect(result).toEqual([15]);
    });
    it("length() on collection of strings", () => {
      const fixture = {
        "names": [
          "John",
          "Jane Doe",
          "Bob"
        ]
      };
      // Test length() function on collection of strings
      const result = fhirpath({}, `names.length()`, fixture);
      expect(result).toEqual([4,8,3]);
    });
    it("substring() with start position", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function with start position only
      const result = fhirpath({}, `name.substring(5)`, fixture);
      expect(result).toEqual(["Doe"]);
    });
    it("substring() with start and length", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function with start position and length
      const result = fhirpath({}, `name.substring(0, 4)`, fixture);
      expect(result).toEqual(["John"]);
    });
    it("substring() with zero start", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function with zero start position
      const result = fhirpath({}, `name.substring(0)`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("substring() beyond string length", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function beyond string length
      const result = fhirpath({}, `name.substring(10)`, fixture);
      expect(result).toEqual([""]);
    });
    it("substring() with negative start", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function with negative start position
      const result = fhirpath({}, `name.substring(-1)`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("substring() with zero length", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function with zero length
      const result = fhirpath({}, `name.substring(0, 0)`, fixture);
      expect(result).toEqual([""]);
    });
    it("substring() on empty string", () => {
      const fixture = {
        "name": ""
      };
      // Test substring() function on empty string
      const result = fhirpath({}, `name.substring(0, 5)`, fixture);
      expect(result).toEqual([""]);
    });
    it("contains() with existing substring", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test contains() function with existing substring
      const result = fhirpath({}, `name.contains('John')`, fixture);
      expect(result).toEqual([true]);
    });
    it("contains() with non-existing substring", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test contains() function with non-existing substring
      const result = fhirpath({}, `name.contains('Jane')`, fixture);
      expect(result).toEqual([false]);
    });
    it("contains() with empty string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test contains() function with empty string
      const result = fhirpath({}, `name.contains('')`, fixture);
      expect(result).toEqual([true]);
    });
    it("contains() case sensitive", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test contains() function is case sensitive
      const result = fhirpath({}, `name.contains('john')`, fixture);
      expect(result).toEqual([false]);
    });
    it("contains() with full string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test contains() function with full string
      const result = fhirpath({}, `name.contains('John Doe')`, fixture);
      expect(result).toEqual([true]);
    });
    it("contains() with special characters", () => {
      const fixture = {
        "name": "Jöhn Doe"
      };
      // Test contains() function with special characters
      const result = fhirpath({}, `name.contains('ö')`, fixture);
      expect(result).toEqual([true]);
    });
    it("startsWith() with matching prefix", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test startsWith() function with matching prefix
      const result = fhirpath({}, `name.startsWith('John')`, fixture);
      expect(result).toEqual([true]);
    });
    it("startsWith() with non-matching prefix", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test startsWith() function with non-matching prefix
      const result = fhirpath({}, `name.startsWith('Jane')`, fixture);
      expect(result).toEqual([false]);
    });
    it("startsWith() with empty string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test startsWith() function with empty string
      const result = fhirpath({}, `name.startsWith('')`, fixture);
      expect(result).toEqual([true]);
    });
    it("startsWith() case sensitive", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test startsWith() function is case sensitive
      const result = fhirpath({}, `name.startsWith('john')`, fixture);
      expect(result).toEqual([false]);
    });
    it("startsWith() with full string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test startsWith() function with full string
      const result = fhirpath({}, `name.startsWith('John Doe')`, fixture);
      expect(result).toEqual([true]);
    });
    it("startsWith() longer than string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test startsWith() function with prefix longer than string
      const result = fhirpath({}, `name.startsWith('John Doe Smith')`, fixture);
      expect(result).toEqual([false]);
    });
    it("endsWith() with matching suffix", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test endsWith() function with matching suffix
      const result = fhirpath({}, `name.endsWith('Doe')`, fixture);
      expect(result).toEqual([true]);
    });
    it("endsWith() with non-matching suffix", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test endsWith() function with non-matching suffix
      const result = fhirpath({}, `name.endsWith('Smith')`, fixture);
      expect(result).toEqual([false]);
    });
    it("endsWith() with empty string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test endsWith() function with empty string
      const result = fhirpath({}, `name.endsWith('')`, fixture);
      expect(result).toEqual([true]);
    });
    it("endsWith() case sensitive", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test endsWith() function is case sensitive
      const result = fhirpath({}, `name.endsWith('doe')`, fixture);
      expect(result).toEqual([false]);
    });
    it("endsWith() with full string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test endsWith() function with full string
      const result = fhirpath({}, `name.endsWith('John Doe')`, fixture);
      expect(result).toEqual([true]);
    });
    it("endsWith() longer than string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test endsWith() function with suffix longer than string
      const result = fhirpath({}, `name.endsWith('William John Doe')`, fixture);
      expect(result).toEqual([false]);
    });
    it("upper() on mixed case string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test upper() function on mixed case string
      const result = fhirpath({}, `name.upper()`, fixture);
      expect(result).toEqual(["JOHN DOE"]);
    });
    it("upper() on already uppercase string", () => {
      const fixture = {
        "name": "JOHN DOE"
      };
      // Test upper() function on already uppercase string
      const result = fhirpath({}, `name.upper()`, fixture);
      expect(result).toEqual(["JOHN DOE"]);
    });
    it("upper() on lowercase string", () => {
      const fixture = {
        "name": "john doe"
      };
      // Test upper() function on lowercase string
      const result = fhirpath({}, `name.upper()`, fixture);
      expect(result).toEqual(["JOHN DOE"]);
    });
    it("upper() on empty string", () => {
      const fixture = {
        "name": ""
      };
      // Test upper() function on empty string
      const result = fhirpath({}, `name.upper()`, fixture);
      expect(result).toEqual([""]);
    });
    it("upper() on string with numbers and symbols", () => {
      const fixture = {
        "name": "John123!@#"
      };
      // Test upper() function on string with numbers and symbols
      const result = fhirpath({}, `name.upper()`, fixture);
      expect(result).toEqual(["JOHN123!@#"]);
    });
    it("upper() on string with accented characters", () => {
      const fixture = {
        "name": "café"
      };
      // Test upper() function on string with accented characters
      const result = fhirpath({}, `name.upper()`, fixture);
      expect(result).toEqual(["CAFÉ"]);
    });
    it("lower() on mixed case string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test lower() function on mixed case string
      const result = fhirpath({}, `name.lower()`, fixture);
      expect(result).toEqual(["john doe"]);
    });
    it("lower() on already lowercase string", () => {
      const fixture = {
        "name": "john doe"
      };
      // Test lower() function on already lowercase string
      const result = fhirpath({}, `name.lower()`, fixture);
      expect(result).toEqual(["john doe"]);
    });
    it("lower() on uppercase string", () => {
      const fixture = {
        "name": "JOHN DOE"
      };
      // Test lower() function on uppercase string
      const result = fhirpath({}, `name.lower()`, fixture);
      expect(result).toEqual(["john doe"]);
    });
    it("lower() on empty string", () => {
      const fixture = {
        "name": ""
      };
      // Test lower() function on empty string
      const result = fhirpath({}, `name.lower()`, fixture);
      expect(result).toEqual([""]);
    });
    it("lower() on string with numbers and symbols", () => {
      const fixture = {
        "name": "JOHN123!@#"
      };
      // Test lower() function on string with numbers and symbols
      const result = fhirpath({}, `name.lower()`, fixture);
      expect(result).toEqual(["john123!@#"]);
    });
    it("lower() on string with accented characters", () => {
      const fixture = {
        "name": "CAFÉ"
      };
      // Test lower() function on string with accented characters
      const result = fhirpath({}, `name.lower()`, fixture);
      expect(result).toEqual(["café"]);
    });
    it("Chained string functions - upper and substring", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test chaining upper() and substring() functions
      const result = fhirpath({}, `name.upper().substring(0, 4)`, fixture);
      expect(result).toEqual(["JOHN"]);
    });
    it("Chained string functions - substring and contains", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test chaining substring() and contains() functions
      const result = fhirpath({}, `name.substring(0, 4).contains('John')`, fixture);
      expect(result).toEqual([true]);
    });
    it("Chained string functions - lower and startsWith", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test chaining lower() and startsWith() functions
      const result = fhirpath({}, `name.lower().startsWith('john')`, fixture);
      expect(result).toEqual([true]);
    });
    it("String functions on collection - length", () => {
      const fixture = {
        "names": [
          "John",
          "Jane Doe",
          "Bob"
        ]
      };
      // Test length() function on collection of strings
      const result = fhirpath({}, `names.length()`, fixture);
      expect(result).toEqual([4,8,3]);
    });
    it("String functions on collection - upper", () => {
      const fixture = {
        "names": [
          "John",
          "Jane Doe",
          "Bob"
        ]
      };
      // Test upper() function on collection of strings
      const result = fhirpath({}, `names.upper()`, fixture);
      expect(result).toEqual(["JOHN","JANE DOE","BOB"]);
    });
    it("String functions on collection - contains", () => {
      const fixture = {
        "names": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test contains() function on collection of strings
      const result = fhirpath({}, `names.contains('John')`, fixture);
      expect(result).toEqual([true,false,false]);
    });
    it("Complex string filtering with where", () => {
      const fixture = {
        "names": [
          "John Doe",
          "Jane Smith",
          "Bob"
        ]
      };
      // Test complex string filtering using where() with string functions
      const result = fhirpath({}, `names.where(length() > 5)`, fixture);
      expect(result).toEqual(["John Doe","Jane Smith"]);
    });
    it("String transformation with select", () => {
      const fixture = {
        "names": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test string transformation using select() with string functions
      const result = fhirpath({}, `names.select(substring(0, 4).upper())`, fixture);
      expect(result).toEqual(["JOHN","JANE","BOB"]);
    });
    it("substring() with invalid parameters", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test substring() function with invalid parameters
      expect(() => {
        fhirpath({}, `name.substring('invalid')`, fixture);
      }).toThrow("substring() requires numeric parameters");
    });
    it("String function on non-string value", () => {
      const fixture = {
        "name": "John Doe",
        "age": 30
      };
      // Test string function on non-string value
      expect(() => {
        fhirpath({}, `age.upper()`, fixture);
      }).toThrow("upper() function requires string input");
    });
  });
});
