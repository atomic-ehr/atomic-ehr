import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.7_math.json" with { type: "json" };

// Test file generated from 5.7_math.yaml

describe("5.7_math", () => {
  const ctx = {};

  it("5.7 Math", () => {

  });
  it("5.7.1 abs() : Integer | Decimal | Quantity", () => {

  });
  it("** Can take the absolute value of a number - Math.d2.abs()", () => {
        const result = fhirpath(ctx, `Math.d2.abs()`, subject);
        expect(result).toEqual([1.1]);
  });
  it("** Empty result when taking the absolute value of empty collection - Math.n2.abs()", () => {
        const result = fhirpath(ctx, `Math.n2.abs()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking the absolute value of null - Math.arrWithNullsAndVals[0].abs()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].abs()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error taking the absolute value due to too many input parameters - Math.n3.abs(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.abs(n4)`, subject);
        }).toThrow();
  });
  it("** Error taking the absolute value if the input collection contains multiple items - Math.arr.abs()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.abs()`, subject);
        }).toThrow();
  });
  it("5.7.2 ceiling() : Integer", () => {

  });
  it("** Can return a number equal to the input - Math.n1.ceiling()", () => {
        const result = fhirpath(ctx, `Math.n1.ceiling()`, subject);
        expect(result).toEqual([1]);
  });
  it("** Can round a number upward to its nearest integer - Math.d1.ceiling()", () => {
        const result = fhirpath(ctx, `Math.d1.ceiling()`, subject);
        expect(result).toEqual([2]);
  });
  it("** Can round a number upward to its nearest integer - Math.d2.ceiling()", () => {
        const result = fhirpath(ctx, `Math.d2.ceiling()`, subject);
        expect(result).toEqual([-1]);
  });
  it("** Empty result when rounding a number upward to its nearest integer from empty collection - Math.n2.ceiling()", () => {
        const result = fhirpath(ctx, `Math.n2.ceiling()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when rounding a number upward to its nearest integer from null - Math.arrWithNullsAndVals[0].ceiling()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].ceiling()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error rounding a number due to too many input parameters - Math.n3.ceiling(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.ceiling(n4)`, subject);
        }).toThrow();
  });
  it("** Error rounding a number if the input collection contains multiple items - Math.arr.ceiling()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.ceiling()`, subject);
        }).toThrow();
  });
  it("5.7.3 exp() : Decimal", () => {

  });
  it("** Can raise e to the input number power - Math.n0.exp()", () => {
        const result = fhirpath(ctx, `Math.n0.exp()`, subject);
        expect(result).toEqual([1]);
  });
  it("** Empty result for empty degree - Math.n2.exp()", () => {
        const result = fhirpath(ctx, `Math.n2.exp()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result for null - Math.arrWithNullsAndVals[0].exp()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].exp()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error exponentiation due to too many input parameters - Math.n3.exp(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.exp(n4)`, subject);
        }).toThrow();
  });
  it("** Error exponentiation if the input collection contains multiple items - Math.arr.exp()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.exp()`, subject);
        }).toThrow();
  });
  it("5.7.4 floor() : Integer", () => {

  });
  it("** Can return a number equal to the input - Math.n1.floor()", () => {
        const result = fhirpath(ctx, `Math.n1.floor()`, subject);
        expect(result).toEqual([1]);
  });
  it("** Can round a number downward to its nearest integer - Math.d1.floor()", () => {
        const result = fhirpath(ctx, `Math.d1.floor()`, subject);
        expect(result).toEqual([1]);
  });
  it("** Can round a number downward to its nearest integer - Math.d2.floor()", () => {
        const result = fhirpath(ctx, `Math.d2.floor()`, subject);
        expect(result).toEqual([-2]);
  });
  it("** Empty result when rounding a number downward to its nearest integer from empty collection - Math.n2.floor()", () => {
        const result = fhirpath(ctx, `Math.n2.floor()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when rounding a number downward to its nearest integer from null - Math.arrWithNullsAndVals[0].floor()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].floor()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error rounding a number due to too many input parameters - Math.n3.floor(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.floor(n4)`, subject);
        }).toThrow();
  });
  it("** Error rounding a number if the input collection contains multiple items - Math.arr.floor()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.floor()`, subject);
        }).toThrow();
  });
  it("5.7.5 ln() : Decimal", () => {

  });
  it("** Can take the natural logarithm of the number - Math.n1.ln()", () => {
        const result = fhirpath(ctx, `Math.n1.ln()`, subject);
        expect(result).toEqual([0]);
  });
  it("** Empty result when taking logarithm from empty collection - Math.n2.ln()", () => {
        const result = fhirpath(ctx, `Math.n2.ln()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking logarithm from null - Math.arrWithNullsAndVals[0].ln()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].ln()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error taking logarithm due to too many input parameters - Math.n3.ln(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.ln(n4)`, subject);
        }).toThrow();
  });
  it("** Error taking logarithm if the input collection contains multiple items - Math.arr.ln()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.ln()`, subject);
        }).toThrow();
  });
  it("5.7.6  log(base : Decimal) : Decimal", () => {

  });
  it("** Can take the logarithm of the number with a given base - Math.n4.log(2)", () => {
        const result = fhirpath(ctx, `Math.n4.log(2)`, subject);
        expect(result).toEqual([3]);
  });
  it("** Empty result when taking logarithm from empty collection - Math.n2.log(8)", () => {
        const result = fhirpath(ctx, `Math.n2.log(8)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking logarithm with empty base - Math.n3.log(n2)", () => {
        const result = fhirpath(ctx, `Math.n3.log(n2)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking logarithm from null - Math.arrWithNullsAndVals[0].log(2)", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].log(2)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking logarithm with base=null - Math.n4.log(%context.arrWithNullsAndVals[0])", () => {
        const result = fhirpath(ctx, `Math.n4.log(%context.arrWithNullsAndVals[0])`, subject);
        expect(result).toEqual([]);
  });
  it("** Error taking logarithm if the input collection contains multiple items - Math.arr.log(8)", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.log(8)`, subject);
        }).toThrow();
  });
  it("** Error taking logarithm due to too many input parameters - Math.n3.log([3, 5])", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.log([3, 5])`, subject);
        }).toThrow();
  });
  it("5.7.7  power(exponent : Integer | Decimal) : Integer | Decimal", () => {

  });
  it("** Can raise input number to the power of given degree - Math.n4.power(2)", () => {
        const result = fhirpath(ctx, `Math.n4.power(2)`, subject);
        expect(result).toEqual([64]);
  });
  it("** Empty result if the power cannot be represented - n6.power(1.5)", () => {
        const result = fhirpath(ctx, `n6.power(1.5)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result if the power cannot be represented - Math.n6.power(0.5)", () => {
        const result = fhirpath(ctx, `Math.n6.power(0.5)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when raising empty collection to a power - Math.n2.power(8)", () => {
        const result = fhirpath(ctx, `Math.n2.power(8)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when raising collection to the empty power - Math.n3.power(n2)", () => {
        const result = fhirpath(ctx, `Math.n3.power(n2)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when raising null to a power - Math.arrWithNullsAndVals[0].power(2)", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].power(2)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when raising a number to the null power - Math.n4.power(%context.arrWithNullsAndVals[0])", () => {
        const result = fhirpath(ctx, `Math.n4.power(%context.arrWithNullsAndVals[0])`, subject);
        expect(result).toEqual([]);
  });
  it("** Error raising to a power if the input collection contains multiple items - Math.arr.power(8)", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.power(8)`, subject);
        }).toThrow();
  });
  it("** Error raising to a power due to too many input parameters - Math.n3.power([3, 5])", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.power([3, 5])`, subject);
        }).toThrow();
  });
  it("5.7.8  round([precision : Integer]) : Decimal", () => {

  });
  it("** Can round number with a given accuracy - Math.d3.round(2)", () => {
        const result = fhirpath(ctx, `Math.d3.round(2)`, subject);
        expect(result).toEqual([13.85]);
  });
  it("** Can round a number to the nearest integer if a given accuracy is empty - Math.d2.round(n2)", () => {
        const result = fhirpath(ctx, `Math.d2.round(n2)`, subject);
        expect(result).toEqual([-1]);
  });
  it("** Can round a number to the nearest integer if accuracy is not specified - Math.d2.round()", () => {
        const result = fhirpath(ctx, `Math.d2.round()`, subject);
        expect(result).toEqual([-1]);
  });
  it("** Empty result when rounding empty number - Math.n2.round(n3)", () => {
        const result = fhirpath(ctx, `Math.n2.round(n3)`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when rounding null - Math.arrWithNullsAndVals[0].round(2)", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].round(2)`, subject);
        expect(result).toEqual([]);
  });
  it("** Can round a number to the nearest integer if a given accuracy is null - Math.d2.round(%context.arrWithNullsAndVals[0])", () => {
        const result = fhirpath(ctx, `Math.d2.round(%context.arrWithNullsAndVals[0])`, subject);
        expect(result).toEqual([-1]);
  });
  it("** Error rounding if the input collection contains multiple items - Math.arr.round(8)", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.round(8)`, subject);
        }).toThrow();
  });
  it("** Error rounding due to too many input parameters - Math.n3.round([3, 5])", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.round([3, 5])`, subject);
        }).toThrow();
  });
  it("5.7.9 sqrt() : Decimal", () => {

  });
  it("** Can take square root - Math.n5.sqrt()", () => {
        const result = fhirpath(ctx, `Math.n5.sqrt()`, subject);
        expect(result).toEqual([4]);
  });
  it("** Empty result when taking square root of a negative number - Math.d2.sqrt()", () => {
        const result = fhirpath(ctx, `Math.d2.sqrt()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking square root of an empty collection - Math.n2.sqrt()", () => {
        const result = fhirpath(ctx, `Math.n2.sqrt()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking square root of null - Math.arrWithNullsAndVals[0].sqrt()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].sqrt()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error taking square root due to too many input parameters - Math.n3.sqrt(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.sqrt(n4)`, subject);
        }).toThrow();
  });
  it("** Error taking square root if the input collection contains multiple items - Math.arr.sqrt()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.sqrt()`, subject);
        }).toThrow();
  });
  it("5.7.10 truncate() : Integer", () => {

  });
  it("** Can return the integer part of the number - Math.d1.truncate()", () => {
        const result = fhirpath(ctx, `Math.d1.truncate()`, subject);
        expect(result).toEqual([1]);
  });
  it("** Empty result when taking integer part from empty collection - Math.n2.truncate()", () => {
        const result = fhirpath(ctx, `Math.n2.truncate()`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when taking integer part from null - Math.arrWithNullsAndVals[0].truncate()", () => {
        const result = fhirpath(ctx, `Math.arrWithNullsAndVals[0].truncate()`, subject);
        expect(result).toEqual([]);
  });
  it("** Error taking integer part due to too many input parameters - Math.n3.truncate(n4)", () => {
        expect(() => {
          fhirpath(ctx, `Math.n3.truncate(n4)`, subject);
        }).toThrow();
  });
  it("** Error taking integer part if the input collection contains multiple items - Math.arr.truncate()", () => {
        expect(() => {
          fhirpath(ctx, `Math.arr.truncate()`, subject);
        }).toThrow();
  });
});
