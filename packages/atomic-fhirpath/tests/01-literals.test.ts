import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 01-literals.yaml
// Tests for FHIRPath literal values including boolean, string, numeric, date/time, and quantity literals

describe("Literal Values", () => {

  describe("literals", () => {
    it("Boolean true literal", () => {
      const fixture = {};
      // Test boolean true literal
      const result = fhirpath({}, `true`, fixture);
      expect(result).toEqual([true]);
    });
    it("Boolean false literal", () => {
      const fixture = {};
      // Test boolean false literal
      const result = fhirpath({}, `false`, fixture);
      expect(result).toEqual([false]);
    });
    it("Simple string literal", () => {
      const fixture = {};
      // Test simple string literal
      const result = fhirpath({}, `'hello world'`, fixture);
      expect(result).toEqual(["hello world"]);
    });
    it("String with escaped quote", () => {
      const fixture = {};
      // Test string with escaped single quote
      const result = fhirpath({}, `'patient''s name'`, fixture);
      expect(result).toEqual(["patient's name"]);
    });
    it("String with escape sequences", () => {
      const fixture = {};
      // Test string with various escape sequences
      const result = fhirpath({}, `'line1\nline2\ttab\\backslash'`, fixture);
      expect(result).toEqual(["line1\nline2\ttab\\backslash"]);
    });
    it("Empty string literal", () => {
      const fixture = {};
      // Test empty string literal
      const result = fhirpath({}, `''`, fixture);
      expect(result).toEqual([""]);
    });
    it("Positive integer literal", () => {
      const fixture = {};
      // Test positive integer literal
      const result = fhirpath({}, `42`, fixture);
      expect(result).toEqual([42]);
    });
    it("Negative integer literal", () => {
      const fixture = {};
      // Test negative integer literal
      const result = fhirpath({}, `-17`, fixture);
      expect(result).toEqual([-17]);
    });
    it("Zero integer literal", () => {
      const fixture = {};
      // Test zero integer literal
      const result = fhirpath({}, `0`, fixture);
      expect(result).toEqual([0]);
    });
    it("Positive decimal literal", () => {
      const fixture = {};
      // Test positive decimal literal
      const result = fhirpath({}, `3.14`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("Negative decimal literal", () => {
      const fixture = {};
      // Test negative decimal literal
      const result = fhirpath({}, `-2.5`, fixture);
      expect(result).toEqual([-2.5]);
    });
    it("Zero decimal literal", () => {
      const fixture = {};
      // Test zero decimal literal
      const result = fhirpath({}, `0.0`, fixture);
      expect(result).toEqual([0]);
    });
    it("Decimal without leading zero", () => {
      const fixture = {};
      // Test decimal without leading zero
      const result = fhirpath({}, `.5`, fixture);
      expect(result).toEqual([0.5]);
    });
    it("Date literal", () => {
      const fixture = {};
      // Test date literal
      const result = fhirpath({}, `@2015-02-07`, fixture);
      expect(result).toEqual(["2015-02-07"]);
    });
    it("DateTime literal with timezone", () => {
      const fixture = {};
      // Test datetime literal with timezone
      const result = fhirpath({}, `@2015-02-07T13:28:17.239+02:00`, fixture);
      expect(result).toEqual(["2015-02-07T13:28:17.239+02:00"]);
    });
    it("Time literal", () => {
      const fixture = {};
      // Test time literal
      const result = fhirpath({}, `@T13:28:17.239`, fixture);
      expect(result).toEqual(["T13:28:17.239"]);
    });
    it("Year literal", () => {
      const fixture = {};
      // Test year literal
      const result = fhirpath({}, `@2019`, fixture);
      expect(result).toEqual(["2019"]);
    });
    it("Quantity with unit in quotes", () => {
      const fixture = {};
      // Test quantity with unit in quotes
      const result = fhirpath({}, `5 'mg'`, fixture);
      expect(result).toEqual(["5 'mg'"]);
    });
    it("Quantity with unit without quotes", () => {
      const fixture = {};
      // Test quantity with unit without quotes
      const result = fhirpath({}, `2 years`, fixture);
      expect(result).toEqual(["2 years"]);
    });
    it("Decimal quantity", () => {
      const fixture = {};
      // Test decimal quantity
      const result = fhirpath({}, `3.14 'cm'`, fixture);
      expect(result).toEqual(["3.14 'cm'"]);
    });
    it("Quantity with complex unit", () => {
      const fixture = {};
      // Test quantity with complex unit
      const result = fhirpath({}, `120 'mm[Hg]'`, fixture);
      expect(result).toEqual(["120 'mm[Hg]'"]);
    });
    it("Null literal (empty collection)", () => {
      const fixture = {};
      // Test null literal represented as empty collection
      const result = fhirpath({}, `{}`, fixture);
      expect(result).toEqual([]);
    });
    it("Double quoted string (invalid)", () => {
      const fixture = {};
      // Test that double-quoted strings are invalid
      expect(() => {
        fhirpath({}, `"invalid string"`, fixture);
      }).toThrow("Double-quoted strings are not allowed");
    });
    it("Invalid escape sequence", () => {
      const fixture = {};
      // Test invalid escape sequence in string
      expect(() => {
        fhirpath({}, `'invalid\q'`, fixture);
      }).toThrow("Invalid escape sequence");
    });
    it("Unterminated string", () => {
      const fixture = {};
      // Test unterminated string literal
      expect(() => {
        fhirpath({}, `'unterminated`, fixture);
      }).toThrow("Unterminated string literal");
    });
  });
});
