import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 37-math-boundary-precision.yaml
// Tests for lowBoundary(), highBoundary(), precision(), and round(precision) functions

describe("Math Boundary and Precision Functions", () => {

  describe("functions", () => {
    it("lowBoundary of integer", () => {
      const fixture = {};
      // Get lower boundary of integer value
      const result = fhirpath({}, `42.lowBoundary()`, fixture);
      expect(result).toEqual([42]);
    });
    it("lowBoundary of decimal", () => {
      const fixture = {};
      // Get lower boundary of decimal value
      const result = fhirpath({}, `3.14159.lowBoundary()`, fixture);
      expect(result).toEqual([3.141585]);
    });
    it("lowBoundary with significant digits", () => {
      const fixture = {};
      // Lower boundary considering precision
      const result = fhirpath({}, `1.95.lowBoundary()`, fixture);
      expect(result).toEqual([1.945]);
    });
    it("lowBoundary of quantity", () => {
      const fixture = {};
      // Get lower boundary of quantity value
      const result = fhirpath({}, `(25.5 'mg').lowBoundary()`, fixture);
      expect(result).toEqual([{"value":25.45,"unit":"mg"}]);
    });
    it("lowBoundary with path expression", () => {
      const fixture = {
        "resourceType": "Observation",
        "measurements": [
          {
            "value": 96,
            "unit": "mg/dL"
          },
          {
            "value": 121,
            "unit": "mg/dL"
          },
          {
            "value": 79,
            "unit": "mg/dL"
          }
        ]
      };
      // Using lowBoundary in calculations
      const result = fhirpath({}, `measurements.value.lowBoundary()`, fixture);
      expect(result).toEqual([95.5,120.5,78.5]);
    });
    it("highBoundary of integer", () => {
      const fixture = {};
      // Get upper boundary of integer value
      const result = fhirpath({}, `42.highBoundary()`, fixture);
      expect(result).toEqual([42]);
    });
    it("highBoundary of decimal", () => {
      const fixture = {};
      // Get upper boundary of decimal value
      const result = fhirpath({}, `3.14159.highBoundary()`, fixture);
      expect(result).toEqual([3.141595]);
    });
    it("highBoundary with significant digits", () => {
      const fixture = {};
      // Upper boundary considering precision
      const result = fhirpath({}, `1.95.highBoundary()`, fixture);
      expect(result).toEqual([1.955]);
    });
    it("highBoundary of quantity", () => {
      const fixture = {};
      // Get upper boundary of quantity value
      const result = fhirpath({}, `(25.5 'mg').highBoundary()`, fixture);
      expect(result).toEqual([{"value":25.55,"unit":"mg"}]);
    });
    it("precision of integer", () => {
      const fixture = {};
      // Get precision of integer (infinite precision)
      const result = fhirpath({}, `42.precision()`, fixture);
      expect(result).toEqual([8]);
    });
    it("precision of decimal", () => {
      const fixture = {};
      // Get precision of decimal number
      const result = fhirpath({}, `3.14.precision()`, fixture);
      expect(result).toEqual([3]);
    });
    it("precision of trailing zeros", () => {
      const fixture = {};
      // Precision includes significant trailing zeros
      const result = fhirpath({}, `1.200.precision()`, fixture);
      expect(result).toEqual([4]);
    });
    it("precision of scientific notation", () => {
      const fixture = {};
      // Precision of number in scientific notation
      const result = fhirpath({}, `1.23e-4.precision()`, fixture);
      expect(result).toEqual([3]);
    });
    it("precision of quantity", () => {
      const fixture = {};
      // Get precision of quantity value
      const result = fhirpath({}, `(25.50 'mg').precision()`, fixture);
      expect(result).toEqual([4]);
    });
    it("round with precision parameter", () => {
      const fixture = {};
      // Round to specific decimal places
      const result = fhirpath({}, `3.14159.round(2)`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("round to integer with precision 0", () => {
      const fixture = {};
      // Round to whole number
      const result = fhirpath({}, `5.678.round(0)`, fixture);
      expect(result).toEqual([6]);
    });
    it("round negative precision", () => {
      const fixture = {};
      // Round to tens, hundreds, etc.
      const result = fhirpath({}, `12345.round(-2)`, fixture);
      expect(result).toEqual([12300]);
    });
    it("round with higher precision than value", () => {
      const fixture = {};
      // Precision parameter exceeds decimal places
      const result = fhirpath({}, `3.14.round(5)`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("round quantity with precision", () => {
      const fixture = {};
      // Round quantity value to precision
      const result = fhirpath({}, `(25.5678 'mg').round(2)`, fixture);
      expect(result).toEqual([{"value":25.57,"unit":"mg"}]);
    });
    it("Boundary checking for measurements", () => {
      const fixture = {
        "resourceType": "Observation",
        "value": 98.5,
        "reference": 98.6
      };
      // Check if values are within boundaries
      const result = fhirpath({}, `value >= reference.lowBoundary() and value <= reference.highBoundary()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Precision-aware comparison", () => {
      const fixture = {
        "resourceType": "Result",
        "measured": 5.12345,
        "reference": 5.12
      };
      // Compare values considering their precision
      const result = fhirpath({}, `(measured.round(reference.precision()) = reference)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Statistical rounding with boundaries", () => {
      const fixture = {
        "resourceType": "DataSet",
        "values": [
          95.456,
          120.782,
          87.234,
          102.549
        ]
      };
      // Round collection values based on precision
      const result = fhirpath({}, `values.select(round(2))`, fixture);
      expect(result).toEqual([95.46,120.78,87.23,102.55]);
    });
    it("Measurement uncertainty range", () => {
      const fixture = {
        "resourceType": "Measurement",
        "value": 10.5,
        "unit": "mmol/L"
      };
      // Calculate uncertainty range using boundaries
      const result = fhirpath({}, `(value.highBoundary() - value.lowBoundary()) / 2`, fixture);
      expect(result).toEqual([0.05]);
    });
    it("Precision preservation in calculations", () => {
      const fixture = {
        "resourceType": "Calculation",
        "a": 10.5,
        "b": 20.25
      };
      // Maintain precision through calculations
      const result = fhirpath({}, `(a + b).precision() <= a.precision().min(b.precision())`, fixture);
      expect(result).toEqual([true]);
    });
    it("lowBoundary on non-numeric", () => {
      const fixture = {};
      // lowBoundary on string value
      expect(() => {
        fhirpath({}, `'string'.lowBoundary()`, fixture);
      }).toThrow("lowBoundary() requires numeric input");
    });
    it("precision on non-numeric", () => {
      const fixture = {};
      // precision on boolean value
      expect(() => {
        fhirpath({}, `true.precision()`, fixture);
      }).toThrow("precision() requires numeric input");
    });
    it("round with non-numeric precision", () => {
      const fixture = {};
      // round with invalid precision parameter
      expect(() => {
        fhirpath({}, `3.14.round('two')`, fixture);
      }).toThrow("round() precision must be numeric");
    });
    it("boundaries of zero", () => {
      const fixture = {};
      // Boundary functions on zero
      const result = fhirpath({}, `(0.lowBoundary() | 0.highBoundary())`, fixture);
      expect(result).toEqual([0,0]);
    });
    it("precision of very small numbers", () => {
      const fixture = {};
      // Precision handling for small decimals
      const result = fhirpath({}, `0.000001.precision()`, fixture);
      expect(result).toEqual([6]);
    });
    it("round with extreme precision", () => {
      const fixture = {};
      // Round with very large precision value
      const result = fhirpath({}, `3.14159265359.round(20)`, fixture);
      expect(result).toEqual([3.14159265359]);
    });
  });
});
