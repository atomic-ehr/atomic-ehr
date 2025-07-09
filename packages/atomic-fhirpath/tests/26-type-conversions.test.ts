import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 26-type-conversions.yaml
// Tests for type checking and conversion functions: convertsToX(), toDateTime(), toQuantity()

describe("Type Conversion Functions", () => {

  describe("functions", () => {
    it("convertsToBoolean() - valid strings", () => {
      const fixture = {};
      // Check if values can be converted to boolean
      const result = fhirpath({}, `'true'.convertsToBoolean()`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("general", () => {
    it("convertsToBoolean() - numeric values", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1.convertsToBoolean()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToBoolean() - invalid string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'maybe'.convertsToBoolean()`, fixture);
      expect(result).toEqual([false]);
    });
    it("convertsToBoolean() - already boolean", () => {
      const fixture = {};
      
      const result = fhirpath({}, `false.convertsToBoolean()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToInteger() - valid string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'42'.convertsToInteger()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToInteger() - decimal string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'3.14'.convertsToInteger()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToInteger() - invalid string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'not a number'.convertsToInteger()`, fixture);
      expect(result).toEqual([false]);
    });
    it("convertsToInteger() - decimal value", () => {
      const fixture = {};
      
      const result = fhirpath({}, `3.14.convertsToInteger()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDecimal() - valid string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'3.14159'.convertsToDecimal()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDecimal() - integer string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'42'.convertsToDecimal()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDecimal() - scientific notation", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'1.23e-4'.convertsToDecimal()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDecimal() - invalid format", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'12.34.56'.convertsToDecimal()`, fixture);
      expect(result).toEqual([false]);
    });
    it("convertsToString() - all types", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(42).convertsToString() and (true).convertsToString() and (@2023-01-01).convertsToString()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToString() - complex object", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{a: 1, b: 2}.convertsToString()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDateTime() - date only", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'2023-01-15'.convertsToDateTime()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDateTime() - with timezone", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'2023-01-15T10:30:00-05:00'.convertsToDateTime()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToDateTime() - invalid format", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'01/15/2023'.convertsToDateTime()`, fixture);
      expect(result).toEqual([false]);
    });
    it("convertsToTime() - valid time", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'10:30:00'.convertsToTime()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToTime() - with milliseconds", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'10:30:00.123'.convertsToTime()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToTime() - invalid format", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'10:70:00'.convertsToTime()`, fixture);
      expect(result).toEqual([false]);
    });
    it("convertsToQuantity() - with unit", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'10 mg'.convertsToQuantity()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToQuantity() - UCUM unit", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'5.5 mmol/L'.convertsToQuantity()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToQuantity() - number only", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'10'.convertsToQuantity()`, fixture);
      expect(result).toEqual([true]);
    });
    it("convertsToQuantity() - invalid format", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'ten milligrams'.convertsToQuantity()`, fixture);
      expect(result).toEqual([false]);
    });
    it("toDateTime() - from string", () => {
      const fixture = {};
      // Convert strings to DateTime
      const result = fhirpath({}, `'2023-01-15T10:30:00Z'.toDateTime()`, fixture);
      expect(result).toEqual(["@2023-01-15T10:30:00Z"]);
    });
    it("toDateTime() - date only string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'2023-01-15'.toDateTime()`, fixture);
      expect(result).toEqual(["@2023-01-15T00:00:00"]);
    });
    it("toDateTime() - already DateTime", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:30:00Z.toDateTime()`, fixture);
      expect(result).toEqual(["@2023-01-15T10:30:00Z"]);
    });
    it("toDateTime() - invalid conversion", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'invalid date'.toDateTime()`, fixture);
      expect(result).toEqual([]);
    });
    it("toTime() - from string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'14:30:00'.toTime()`, fixture);
      expect(result).toEqual(["@T14:30:00"]);
    });
    it("toTime() - with milliseconds", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'14:30:00.500'.toTime()`, fixture);
      expect(result).toEqual(["@T14:30:00.500"]);
    });
    it("toTime() - from DateTime", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T14:30:00Z.toTime()`, fixture);
      expect(result).toEqual(["@T14:30:00"]);
    });
    it("toQuantity() - from string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'25 kg'.toQuantity()`, fixture);
      expect(result).toEqual([{"value":25,"unit":"kg"}]);
    });
    it("toQuantity() - complex unit", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'120 mm[Hg]'.toQuantity()`, fixture);
      expect(result).toEqual([{"value":120,"unit":"mm[Hg]"}]);
    });
    it("toQuantity() - from number", () => {
      const fixture = {};
      
      const result = fhirpath({}, `42.toQuantity()`, fixture);
      expect(result).toEqual([{"value":42}]);
    });
    it("toQuantity() - already quantity", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(10 'mg').toQuantity()`, fixture);
      expect(result).toEqual([{"value":10,"unit":"mg"}]);
    });
    it("Collection conversions", () => {
      const fixture = {};
      
      const result = fhirpath({}, `('1' | '2' | 'three' | '4').where($this.convertsToInteger()).toInteger()`, fixture);
      expect(result).toEqual([1,2,4]);
    });
    it("Conditional conversion", () => {
      const fixture = {
        "value": "123"
      };
      
      const result = fhirpath({}, `iif(value.convertsToInteger(), value.toInteger(), 0)`, fixture);
      expect(result).toEqual([123]);
    });
    it("Safe navigation with conversion", () => {
      const fixture = {
        "stringValue": [
          "2023-01-15",
          "not a date",
          "2023-12-31"
        ]
      };
      
      const result = fhirpath({}, `stringValue.where(convertsToDateTime()).toDateTime()`, fixture);
      expect(result).toEqual(["@2023-01-15T00:00:00","@2023-12-31T00:00:00"]);
    });
    it("Parse observation values", () => {
      const fixture = {
        "component": [
          {
            "valueString": "98.6"
          },
          {
            "valueString": "normal"
          },
          {
            "valueString": "120.5"
          }
        ]
      };
      
      const result = fhirpath({}, `component.where(valueString.convertsToDecimal()).valueString.toDecimal()`, fixture);
      expect(result).toEqual([98.6,120.5]);
    });
    it("Convert timing", () => {
      const fixture = {
        "event": [
          "2023-01-15T08:00:00",
          "morning",
          "2023-01-15T20:00:00"
        ]
      };
      
      const result = fhirpath({}, `event.where(convertsToDateTime()).toDateTime()`, fixture);
      expect(result).toEqual(["@2023-01-15T08:00:00","@2023-01-15T20:00:00"]);
    });
    it("Empty string conversions", () => {
      const fixture = {};
      
      const result = fhirpath({}, `''.convertsToInteger() or ''.convertsToDecimal() or ''.convertsToBoolean()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Whitespace handling", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'  42  '.convertsToInteger() and '  42  '.toInteger() = 42`, fixture);
      expect(result).toEqual([true]);
    });
    it("Null conversions", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.toInteger().exists()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Invalid conversion chain", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'abc'.toInteger().toDecimal()`, fixture);
      expect(result).toEqual([]);
    });
  });
  describe("intermediate", () => {
    it("convertsToDateTime() - valid formats", () => {
      const fixture = {};
      // Check various date/time string formats
      const result = fhirpath({}, `'2023-01-15T10:30:00Z'.convertsToDateTime()`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("advanced", () => {
    it("Chained conversions", () => {
      const fixture = {};
      // Multiple type conversions in sequence
      const result = fhirpath({}, `'42.5'.toDecimal().toInteger().toString()`, fixture);
      expect(result).toEqual(["42"]);
    });
  });
});
