import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 07-functions-math.yaml
// Tests for FHIRPath mathematical functions including abs(), ceiling(), floor(), round(), and sqrt()

describe("Math Functions", () => {

  describe("functions", () => {
    it("abs() on positive number", () => {
      const fixture = {
        "value": 42
      };
      // Test abs() function on positive number
      const result = fhirpath({}, `value.abs()`, fixture);
      expect(result).toEqual([42]);
    });
    it("abs() on negative number", () => {
      const fixture = {
        "value": -42
      };
      // Test abs() function on negative number
      const result = fhirpath({}, `value.abs()`, fixture);
      expect(result).toEqual([42]);
    });
    it("abs() on zero", () => {
      const fixture = {
        "value": 0
      };
      // Test abs() function on zero
      const result = fhirpath({}, `value.abs()`, fixture);
      expect(result).toEqual([0]);
    });
    it("abs() on positive decimal", () => {
      const fixture = {
        "value": 3.14
      };
      // Test abs() function on positive decimal
      const result = fhirpath({}, `value.abs()`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("abs() on negative decimal", () => {
      const fixture = {
        "value": -3.14
      };
      // Test abs() function on negative decimal
      const result = fhirpath({}, `value.abs()`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("abs() on collection of numbers", () => {
      const fixture = {
        "values": [
          -1,
          2,
          -3,
          4,
          -5
        ]
      };
      // Test abs() function on collection of numbers
      const result = fhirpath({}, `values.abs()`, fixture);
      expect(result).toEqual([1,2,3,4,5]);
    });
    it("ceiling() on positive decimal", () => {
      const fixture = {
        "value": 3.14
      };
      // Test ceiling() function on positive decimal
      const result = fhirpath({}, `value.ceiling()`, fixture);
      expect(result).toEqual([4]);
    });
    it("ceiling() on negative decimal", () => {
      const fixture = {
        "value": -3.14
      };
      // Test ceiling() function on negative decimal
      const result = fhirpath({}, `value.ceiling()`, fixture);
      expect(result).toEqual([-3]);
    });
    it("ceiling() on integer", () => {
      const fixture = {
        "value": 5
      };
      // Test ceiling() function on integer
      const result = fhirpath({}, `value.ceiling()`, fixture);
      expect(result).toEqual([5]);
    });
    it("ceiling() on zero", () => {
      const fixture = {
        "value": 0
      };
      // Test ceiling() function on zero
      const result = fhirpath({}, `value.ceiling()`, fixture);
      expect(result).toEqual([0]);
    });
    it("ceiling() on edge cases", () => {
      const fixture = {
        "values": [
          0.1,
          -0.1,
          -2.9,
          2.1
        ]
      };
      // Test ceiling() function on edge cases
      const result = fhirpath({}, `values.ceiling()`, fixture);
      expect(result).toEqual([1,0,-2,3]);
    });
    it("floor() on positive decimal", () => {
      const fixture = {
        "value": 3.14
      };
      // Test floor() function on positive decimal
      const result = fhirpath({}, `value.floor()`, fixture);
      expect(result).toEqual([3]);
    });
    it("floor() on negative decimal", () => {
      const fixture = {
        "value": -3.14
      };
      // Test floor() function on negative decimal
      const result = fhirpath({}, `value.floor()`, fixture);
      expect(result).toEqual([-4]);
    });
    it("floor() on integer", () => {
      const fixture = {
        "value": 5
      };
      // Test floor() function on integer
      const result = fhirpath({}, `value.floor()`, fixture);
      expect(result).toEqual([5]);
    });
    it("floor() on zero", () => {
      const fixture = {
        "value": 0
      };
      // Test floor() function on zero
      const result = fhirpath({}, `value.floor()`, fixture);
      expect(result).toEqual([0]);
    });
    it("floor() on edge cases", () => {
      const fixture = {
        "values": [
          0.9,
          -0.1,
          -2.1,
          2.9
        ]
      };
      // Test floor() function on edge cases
      const result = fhirpath({}, `values.floor()`, fixture);
      expect(result).toEqual([0,-1,-3,2]);
    });
    it("round() on decimal - round down", () => {
      const fixture = {
        "value": 3.14
      };
      // Test round() function on decimal that rounds down
      const result = fhirpath({}, `value.round()`, fixture);
      expect(result).toEqual([3]);
    });
    it("round() on decimal - round up", () => {
      const fixture = {
        "value": 3.67
      };
      // Test round() function on decimal that rounds up
      const result = fhirpath({}, `value.round()`, fixture);
      expect(result).toEqual([4]);
    });
    it("round() on decimal - exact half", () => {
      const fixture = {
        "value": 3.5
      };
      // Test round() function on exact half (banker's rounding)
      const result = fhirpath({}, `value.round()`, fixture);
      expect(result).toEqual([4]);
    });
    it("round() on negative decimal", () => {
      const fixture = {
        "value": -3.14
      };
      // Test round() function on negative decimal
      const result = fhirpath({}, `value.round()`, fixture);
      expect(result).toEqual([-3]);
    });
    it("round() on integer", () => {
      const fixture = {
        "value": 5
      };
      // Test round() function on integer
      const result = fhirpath({}, `value.round()`, fixture);
      expect(result).toEqual([5]);
    });
    it("round() on zero", () => {
      const fixture = {
        "value": 0
      };
      // Test round() function on zero
      const result = fhirpath({}, `value.round()`, fixture);
      expect(result).toEqual([0]);
    });
    it("round() with precision parameter", () => {
      const fixture = {
        "value": 3.14159
      };
      // Test round() function with precision parameter
      const result = fhirpath({}, `value.round(2)`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("sqrt() on perfect square", () => {
      const fixture = {
        "value": 25
      };
      // Test sqrt() function on perfect square
      const result = fhirpath({}, `value.sqrt()`, fixture);
      expect(result).toEqual([5]);
    });
    it("sqrt() on non-perfect square", () => {
      const fixture = {
        "value": 5
      };
      // Test sqrt() function on non-perfect square
      const result = fhirpath({}, `value.sqrt()`, fixture);
      expect(result).toEqual([2.236]);
    });
    it("sqrt() on zero", () => {
      const fixture = {
        "value": 0
      };
      // Test sqrt() function on zero
      const result = fhirpath({}, `value.sqrt()`, fixture);
      expect(result).toEqual([0]);
    });
    it("sqrt() on one", () => {
      const fixture = {
        "value": 1
      };
      // Test sqrt() function on one
      const result = fhirpath({}, `value.sqrt()`, fixture);
      expect(result).toEqual([1]);
    });
    it("sqrt() on decimal", () => {
      const fixture = {
        "value": 2
      };
      // Test sqrt() function on decimal
      const result = fhirpath({}, `value.sqrt()`, fixture);
      expect(result).toEqual([1.414]);
    });
    it("sqrt() on collection", () => {
      const fixture = {
        "values": [
          1,
          4,
          9,
          16,
          25
        ]
      };
      // Test sqrt() function on collection of numbers
      const result = fhirpath({}, `values.sqrt()`, fixture);
      expect(result).toEqual([1,2,3,4,5]);
    });
    it("Chained math functions - abs and round", () => {
      const fixture = {
        "value": -3.14
      };
      // Test chaining abs() and round() functions
      const result = fhirpath({}, `value.abs().round()`, fixture);
      expect(result).toEqual([3]);
    });
    it("Chained math functions - sqrt and ceiling", () => {
      const fixture = {
        "value": 5
      };
      // Test chaining sqrt() and ceiling() functions
      const result = fhirpath({}, `value.sqrt().ceiling()`, fixture);
      expect(result).toEqual([3]);
    });
    it("Complex math expression", () => {
      const fixture = {
        "values": [
          -1,
          4,
          -6,
          9
        ]
      };
      // Test complex math expression with multiple operations
      const result = fhirpath({}, `values.select(abs().sqrt().round())`, fixture);
      expect(result).toEqual([1,2,2,3]);
    });
    it("Math functions with where() filter", () => {
      const fixture = {
        "values": [
          3,
          -10,
          7,
          -2,
          -8,
          4
        ]
      };
      // Test math functions combined with where() filtering
      const result = fhirpath({}, `values.where(abs() > 5)`, fixture);
      expect(result).toEqual([-10,7,-8]);
    });
    it("Math aggregation", () => {
      const fixture = {
        "values": [
          3,
          -10,
          7,
          -2,
          -8,
          4
        ]
      };
      // Test math functions with aggregation
      const result = fhirpath({}, `values.abs().sum()`, fixture);
      expect(result).toEqual([34]);
    });
    it("Math functions on very large numbers", () => {
      const fixture = {
        "value": 1000000000
      };
      // Test math functions on very large numbers
      const result = fhirpath({}, `value.sqrt().round()`, fixture);
      expect(result).toEqual([31623]);
    });
    it("Math functions on very small decimals", () => {
      const fixture = {
        "value": -0.001
      };
      // Test math functions on very small decimals
      const result = fhirpath({}, `value.abs().ceiling()`, fixture);
      expect(result).toEqual([1]);
    });
    it("Precision handling in math operations", () => {
      const fixture = {
        "value": 0.33333333
      };
      // Test precision handling in math operations
      const result = fhirpath({}, `value.round(3)`, fixture);
      expect(result).toEqual([0.333]);
    });
    it("sqrt() on negative number", () => {
      const fixture = {
        "value": -4
      };
      // Test sqrt() function on negative number (should error)
      expect(() => {
        fhirpath({}, `value.sqrt()`, fixture);
      }).toThrow("Cannot calculate square root of negative number");
    });
    it("Math function on non-numeric value", () => {
      const fixture = {
        "value": "not a number"
      };
      // Test math function on non-numeric value
      expect(() => {
        fhirpath({}, `value.abs()`, fixture);
      }).toThrow("Math functions require numeric input");
    });
    it("Math function on empty collection", () => {
      const fixture = {
        "value": 42
      };
      // Test math function on empty collection
      const result = fhirpath({}, `nonexistent.abs()`, fixture);
      expect(result).toEqual([]);
    });
    it("BMI calculation using math functions", () => {
      const fixture = {
        "weight": 70,
        "height": 1.7
      };
      // Test BMI calculation using multiple math functions
      const result = fhirpath({}, `(weight / (height * height)).round(1)`, fixture);
      expect(result).toEqual([24.2]);
    });
    it("Age calculation precision", () => {
      const fixture = {
        "ageInDays": [
          9131,
          15340,
          6935
        ]
      };
      // Test age calculation with precision handling
      const result = fhirpath({}, `ageInDays.select(($this / 365.25).floor())`, fixture);
      expect(result).toEqual([25,42,18]);
    });
    it("Statistical calculations", () => {
      const fixture = {
        "measurements": [
          12,
          8,
          15,
          5,
          10
        ],
        "average": 10
      };
      // Test statistical calculations using math functions
      const result = fhirpath({}, `measurements.select(abs() - average).abs().sum() / count()`, fixture);
      expect(result).toEqual([2.4]);
    });
  });
});
