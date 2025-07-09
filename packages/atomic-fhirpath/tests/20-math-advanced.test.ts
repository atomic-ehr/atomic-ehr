import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 20-math-advanced.yaml
// Tests for advanced mathematical functions: ln(), log(), exp(), power(), truncate()

describe("Advanced Math Functions", () => {

  describe("math", () => {
    it("ln() - natural log of e", () => {
      const fixture = {};
      // Natural logarithm function tests
      const result = fhirpath({}, `2.718281828.ln().round(2)`, fixture);
      expect(result).toEqual([1]);
    });
  });
  describe("general", () => {
    it("ln() - natural log of 1", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1.ln()`, fixture);
      expect(result).toEqual([0]);
    });
    it("ln() - natural log of 10", () => {
      const fixture = {};
      
      const result = fhirpath({}, `10.ln().round(4)`, fixture);
      expect(result).toEqual([2.3026]);
    });
    it("ln() - invalid input", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `0.ln()`, fixture);
      }).toThrow("Natural log of non-positive number");
    });
    it("ln() - negative input", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `(-5).ln()`, fixture);
      }).toThrow("Natural log of non-positive number");
    });
    it("log() - base 10 of 10", () => {
      const fixture = {};
      // Base 10 logarithm tests
      const result = fhirpath({}, `10.log()`, fixture);
      expect(result).toEqual([1]);
    });
    it("log() - base 10 of 100", () => {
      const fixture = {};
      
      const result = fhirpath({}, `100.log()`, fixture);
      expect(result).toEqual([2]);
    });
    it("log() - base 10 of 1", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1.log()`, fixture);
      expect(result).toEqual([0]);
    });
    it("log() - custom base", () => {
      const fixture = {};
      
      const result = fhirpath({}, `8.log(2)`, fixture);
      expect(result).toEqual([3]);
    });
    it("log() - fractional result", () => {
      const fixture = {};
      
      const result = fhirpath({}, `5.log().round(4)`, fixture);
      expect(result).toEqual([0.699]);
    });
    it("exp() - e^0", () => {
      const fixture = {};
      // Exponential function tests
      const result = fhirpath({}, `0.exp()`, fixture);
      expect(result).toEqual([1]);
    });
    it("exp() - e^1", () => {
      const fixture = {};
      
      const result = fhirpath({}, `1.exp().round(4)`, fixture);
      expect(result).toEqual([2.7183]);
    });
    it("exp() - e^2", () => {
      const fixture = {};
      
      const result = fhirpath({}, `2.exp().round(4)`, fixture);
      expect(result).toEqual([7.3891]);
    });
    it("exp() - negative exponent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(-1).exp().round(4)`, fixture);
      expect(result).toEqual([0.3679]);
    });
    it("power() - simple square", () => {
      const fixture = {};
      // Power/exponentiation function
      const result = fhirpath({}, `2.power(3)`, fixture);
      expect(result).toEqual([8]);
    });
    it("power() - base 10", () => {
      const fixture = {};
      
      const result = fhirpath({}, `10.power(3)`, fixture);
      expect(result).toEqual([1000]);
    });
    it("power() - fractional exponent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `9.power(0.5)`, fixture);
      expect(result).toEqual([3]);
    });
    it("power() - negative exponent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `2.power(-2)`, fixture);
      expect(result).toEqual([0.25]);
    });
    it("power() - zero exponent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `5.power(0)`, fixture);
      expect(result).toEqual([1]);
    });
    it("truncate() - positive number", () => {
      const fixture = {};
      // Truncate decimal places
      const result = fhirpath({}, `3.14159.truncate(2)`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("truncate() - negative number", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(-3.14159).truncate(3)`, fixture);
      expect(result).toEqual([-3.141]);
    });
    it("truncate() - zero decimal places", () => {
      const fixture = {};
      
      const result = fhirpath({}, `5.99.truncate(0)`, fixture);
      expect(result).toEqual([5]);
    });
    it("truncate() - no truncation needed", () => {
      const fixture = {};
      
      const result = fhirpath({}, `2.5.truncate(2)`, fixture);
      expect(result).toEqual([2.5]);
    });
    it("Scientific calculation", () => {
      const fixture = {
        "mass": 100,
        "speed": 10
      };
      
      const result = fhirpath({}, `(mass * (speed.power(2))).sqrt()`, fixture);
      expect(result).toEqual([100]);
    });
    it("Logarithmic scale", () => {
      const fixture = {
        "values": [
          0,
          1,
          9,
          99
        ]
      };
      
      const result = fhirpath({}, `values.select(($this + 1).ln())`, fixture);
      expect(result).toEqual([0,0.6931,2.3026,4.6052]);
    });
    it("Exponential growth", () => {
      const fixture = {
        "initialPop": 100,
        "rate": 0.02,
        "time": 50
      };
      
      const result = fhirpath({}, `initialPop * 2.718281828.power(rate * time)`, fixture);
      expect(result).toEqual([271.83]);
    });
    it("Decibel calculation", () => {
      const fixture = {
        "intensity": 100,
        "reference": 1
      };
      
      const result = fhirpath({}, `(intensity / reference).log() * 10`, fixture);
      expect(result).toEqual([20]);
    });
    it("pH calculation", () => {
      const fixture = {
        "concentration": 0.0001
      };
      
      const result = fhirpath({}, `concentration.log().abs()`, fixture);
      expect(result).toEqual([4]);
    });
    it("Present value", () => {
      const fixture = {
        "futureValue": 1000,
        "rate": 0.05,
        "periods": 5
      };
      
      const result = fhirpath({}, `futureValue / (1 + rate).power(periods)`, fixture);
      expect(result).toEqual([783.53]);
    });
    it("Continuous compounding", () => {
      const fixture = {
        "principal": 1000,
        "rate": 0.05
      };
      
      const result = fhirpath({}, `principal * rate.exp()`, fixture);
      expect(result).toEqual([1051.27]);
    });
    it("Very large exponent", () => {
      const fixture = {};
      
      const result = fhirpath({}, `10.power(10).exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Very small result", () => {
      const fixture = {};
      
      const result = fhirpath({}, `10.power(-10)`, fixture);
      expect(result).toEqual([1e-10]);
    });
    it("Chained operations", () => {
      const fixture = {};
      
      const result = fhirpath({}, `2.power(3).ln().exp()`, fixture);
      expect(result).toEqual([8]);
    });
    it("Precision handling", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1.0000001).ln().round(10)`, fixture);
      expect(result).toEqual([1e-7]);
    });
    it("Invalid power base", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `(-2).power(0.5)`, fixture);
      }).toThrow("Complex number result");
    });
    it("Division by zero in log", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `(1/0).log()`, fixture);
      }).toThrow("Invalid input for logarithm");
    });
  });
  describe("intermediate", () => {
    it("Compound interest", () => {
      const fixture = {
        "principal": 1000,
        "rate": 0.05,
        "years": 10
      };
      // Calculate compound interest
      const result = fhirpath({}, `principal * (1 + rate).power(years)`, fixture);
      expect(result).toEqual([1628.89]);
    });
  });
  describe("advanced", () => {
    it("Geometric mean", () => {
      const fixture = {
        "values": [
          2,
          8,
          16
        ]
      };
      // Calculate geometric mean
      const result = fhirpath({}, `values.aggregate($total * $this, 1).power(1.0 / values.count())`, fixture);
      expect(result).toEqual([6.35]);
    });
  });
});
