import { describe, it, expect } from "bun:test";
import subject from "./6.6_math.json" with { type: "json" };
import { fhirpath } from "../src/index";

// Test file generated from 6.6_math.yaml

describe("6.6_math", () => {
  const ctx = {};

  it("6.6 Math", () => {

  });
  it("6.6.1 multiplication", () => {

  });
  it("** Can multiply two numbers - n1 * n2", () => {
        const result = fhirpath(ctx, `n1 * n2`, subject);
        expect(result).toEqual([10]);
  });
  it("** Can multiply two number literals - 2 * 4", () => {
        const result = fhirpath(ctx, `2 * 4`, subject);
        expect(result).toEqual([8]);
  });
  it("** Can multiply two long number literals - 2L * 4L", () => {
        const result = fhirpath(ctx, `2L * 4L`, subject);
        expect(result).toEqual(["8"]);
  });
  it("** Can multiply a long number literal by a number literal - 2L * 4", () => {
        const result = fhirpath(ctx, `2L * 4`, subject);
        expect(result).toEqual(["8"]);
  });
  it("** Can multiply a long number literal by a decimal literal - 2L * 4.1", () => {
        const result = fhirpath(ctx, `2L * 4.1`, subject);
        expect(result).toEqual([8.2]);
  });
  it("** Can multiply a decimal literal by a long number literal - 4.1 * 2L", () => {
        const result = fhirpath(ctx, `4.1 * 2L`, subject);
        expect(result).toEqual([8.2]);
  });
  it("** Error multiplying a long number literal by a Quantity literal - 2L * 4 '1'", () => {
        expect(() => {
          fhirpath(ctx, `2L * 4 '1'`, subject);
        }).toThrow();
  });
  it("** Error multiplying string (1) - s5 * n2", () => {
        expect(() => {
          fhirpath(ctx, `s5 * n2`, subject);
        }).toThrow();
  });
  it("** Error multiplying string (2) - n2 * s5", () => {
        expect(() => {
          fhirpath(ctx, `n2 * s5`, subject);
        }).toThrow();
  });
  it("** Error multiplying string (3) - s5 * s5", () => {
        expect(() => {
          fhirpath(ctx, `s5 * s5`, subject);
        }).toThrow();
  });
  it("** Error multiplying multi-valued collection (1) - n1 * a3", () => {
        expect(() => {
          fhirpath(ctx, `n1 * a3`, subject);
        }).toThrow();
  });
  it("** Error multiplying multi-valued collection (2) - a3 * n1", () => {
        expect(() => {
          fhirpath(ctx, `a3 * n1`, subject);
        }).toThrow();
  });
  it("** Empty result multiplying empty collection (1) - n1 * n4", () => {
        const result = fhirpath(ctx, `n1 * n4`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result multiplying empty collection (2) - n4 * n1", () => {
        const result = fhirpath(ctx, `n4 * n1`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is null - n1 * i", () => {
        const result = fhirpath(ctx, `n1 * i`, subject);
        expect(result).toEqual([]);
  });
  it("** Can multiply two quantities - 2 'kg' * 5 'm' = 10 'kg.m'", () => {
        const result = fhirpath(ctx, `2 'kg' * 5 'm' = 10 'kg.m'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can multiply a quantity by a number - 2 'kg' * 5 = 10 'kg'", () => {
        const result = fhirpath(ctx, `2 'kg' * 5 = 10 'kg'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can multiply a number by a quantity - 2 * 5 'kg' = 10 'kg'", () => {
        const result = fhirpath(ctx, `2 * 5 'kg' = 10 'kg'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands has a special unit - 1 'B' * 2", () => {
        const result = fhirpath(ctx, `1 'B' * 2`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (1) - 1 'm' * 1 year", () => {
        const result = fhirpath(ctx, `1 'm' * 1 year`, subject);
        expect(result).toEqual([]);
  });
  it("** Can multiply a quantity by a calendar duration quantity less than or equal to seconds (1) - 1 'm' * (1 year).toQuantity('seconds') = 31536000 'm.s'", () => {
        const result = fhirpath(ctx, `1 'm' * (1 year).toQuantity('seconds') = 31536000 'm.s'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (2) - 1 year * 1 year", () => {
        const result = fhirpath(ctx, `1 year * 1 year`, subject);
        expect(result).toEqual([]);
  });
  it("** Can multiply a quantity by a calendar duration quantity less than or equal to seconds (2) - (1 year).toQuantity('s') * (1 year).toQuantity('seconds') = 994519296000000 's2'", () => {
        const result = fhirpath(ctx, `(1 year).toQuantity('s') * (1 year).toQuantity('seconds') = 994519296000000 's2'`, subject);
        expect(result).toEqual([true]);
  });
  it("6.6.2 division", () => {

  });
  it("** Can divide two numbers - n2/n1", () => {
        const result = fhirpath(ctx, `n2/n1`, subject);
        expect(result).toEqual([2.5]);
  });
  it("** Can divide two number literals - 5/2", () => {
        const result = fhirpath(ctx, `5/2`, subject);
        expect(result).toEqual([2.5]);
  });
  it("** Can divide two long number literals - 2L / 4L", () => {
        const result = fhirpath(ctx, `2L / 4L`, subject);
        expect(result).toEqual([0.5]);
  });
  it("** Can divide a long number literal by a number literal - 2L / 4", () => {
        const result = fhirpath(ctx, `2L / 4`, subject);
        expect(result).toEqual([0.5]);
  });
  it("** Can divide a long number literal by a decimal literal - 9L / 4.5", () => {
        const result = fhirpath(ctx, `9L / 4.5`, subject);
        expect(result).toEqual([2]);
  });
  it("** Can divide a decimal literal by a long number literal - 9 / 4L", () => {
        const result = fhirpath(ctx, `9 / 4L`, subject);
        expect(result).toEqual([2.25]);
  });
  it("** Error dividing a Quantity literal by a long number literal - 4 '1' / 2L", () => {
        expect(() => {
          fhirpath(ctx, `4 '1' / 2L`, subject);
        }).toThrow();
  });
  it("** Empty result when one of the operands is null - n1 / i", () => {
        const result = fhirpath(ctx, `n1 / i`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when dividing by zero (1) - 1L / 0L", () => {
        const result = fhirpath(ctx, `1L / 0L`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when dividing by zero (2) - 1L / 0", () => {
        const result = fhirpath(ctx, `1L / 0`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when dividing by zero (3) - 1 / 0L", () => {
        const result = fhirpath(ctx, `1 / 0L`, subject);
        expect(result).toEqual([]);
  });
  it("** Can divide two quantities - 10 'kg' / 5 'm' = 2 'kg/m'", () => {
        const result = fhirpath(ctx, `10 'kg' / 5 'm' = 2 'kg/m'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can divide a quantity by a number - 20 'kg' / 5 = 4 'kg'", () => {
        const result = fhirpath(ctx, `20 'kg' / 5 = 4 'kg'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can divide a number by a quantity - 20 / 5 'kg' = 4 '1/kg'", () => {
        const result = fhirpath(ctx, `20 / 5 'kg' = 4 '1/kg'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands has a special unit - 1 'B' / 2", () => {
        const result = fhirpath(ctx, `1 'B' / 2`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (1) - 1 'mo' / 1 year", () => {
        const result = fhirpath(ctx, `1 'mo' / 1 year`, subject);
        expect(result).toEqual([]);
  });
  it("** Can divide a UCUM duration quantity by a calendar duration quantity less than or equal to seconds - 1 'mo' / (1 year).toQuantity('seconds') = 0.08339041095890411", () => {
        const result = fhirpath(ctx, `1 'mo' / (1 year).toQuantity('seconds') = 0.08339041095890411`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (2) - 1 year / 1 'mo'", () => {
        const result = fhirpath(ctx, `1 year / 1 'mo'`, subject);
        expect(result).toEqual([]);
  });
  it("** Can divide a calendar duration quantity less than or equal to seconds by a UCUM duration quantity - (1 year).toQuantity('seconds') / 1 'mo' = 11.991786447638603", () => {
        const result = fhirpath(ctx, `(1 year).toQuantity('seconds') / 1 'mo' = 11.991786447638603`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (3) - 3 minutes / 1 's'", () => {
        const result = fhirpath(ctx, `3 minutes / 1 's'`, subject);
        expect(result).toEqual([]);
  });
  it("** Allow division of a UCUM duration quantity - 3 's' / 3 milliseconds = 1000", () => {
        const result = fhirpath(ctx, `3 's' / 3 milliseconds = 1000`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (4) - 1 'kg' / 3 months", () => {
        const result = fhirpath(ctx, `1 'kg' / 3 months`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (5) - 1 / 3 months", () => {
        const result = fhirpath(ctx, `1 / 3 months`, subject);
        expect(result).toEqual([]);
  });
  it("** Can divide a UCUM quantity by a calendar duration quantity less than or equal to seconds - 1 'kg' / (3 months).toQuantity('seconds') = 0.0001286008230452675 'g/s'", () => {
        const result = fhirpath(ctx, `1 'kg' / (3 months).toQuantity('seconds') = 0.0001286008230452675 'g/s'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when a calendar duration quantity divided by zero - 1 year / 0 months", () => {
        const result = fhirpath(ctx, `1 year / 0 months`, subject);
        expect(result).toEqual([]);
  });
  it("** Can divide when both operands are calendar duration quantities - 3 month / 2 year = 1 / 8", () => {
        const result = fhirpath(ctx, `3 month / 2 year = 1 / 8`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can divide a calendar duration quantity by a number - 1 year / 2 = 6 months", () => {
        const result = fhirpath(ctx, `1 year / 2 = 6 months`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can divide System.Quantity (converted from FHIR.Quantity) by System.Quantity - Observation.value / 185 months = 1", () => {
        // Input file: observation-example-2.json
        const result = fhirpath(ctx, `Observation.value / 185 months = 1`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (6) - Observation.value / 185 'mo'", () => {
        // Input file: observation-example-2.json
        const result = fhirpath(ctx, `Observation.value / 185 'mo'`, subject);
        expect(result).toEqual([]);
  });
  it("6.6.3 addition", () => {

  });
  it("** Can add two numbers - n1 + n2", () => {
        const result = fhirpath(ctx, `n1 + n2`, subject);
        expect(result).toEqual([7]);
  });
  it("** Can add two number literals - 2+3", () => {
        const result = fhirpath(ctx, `2+3`, subject);
        expect(result).toEqual([5]);
  });
  it("** Can add two long number literals - 2L + 4L", () => {
        const result = fhirpath(ctx, `2L + 4L`, subject);
        expect(result).toEqual(["6"]);
  });
  it("** Can add a number literal to a long number literal - 2L + 4", () => {
        const result = fhirpath(ctx, `2L + 4`, subject);
        expect(result).toEqual(["6"]);
  });
  it("** Can add a decimal literal to a long number literal - 9L + 4.5", () => {
        const result = fhirpath(ctx, `9L + 4.5`, subject);
        expect(result).toEqual([13.5]);
  });
  it("** Error adding a long number literal to a Quantity literal - 4 '1' + 2L", () => {
        expect(() => {
          fhirpath(ctx, `4 '1' + 2L`, subject);
        }).toThrow();
  });
  it("** Can add two quantity literals - 3 'm' + 3 'cm' = 303 'cm'", () => {
        const result = fhirpath(ctx, `3 'm' + 3 'cm' = 303 'cm'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can add a number to a quantity - 3 '1' + 2 = 5 '1'", () => {
        const result = fhirpath(ctx, `3 '1' + 2 = 5 '1'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can add a quantity to a number - 3 + 2 '1' = 5 '1'", () => {
        const result = fhirpath(ctx, `3 + 2 '1' = 5 '1'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Error adding array of numbers - n1 + a3", () => {
        expect(() => {
          fhirpath(ctx, `n1 + a3`, subject);
        }).toThrow();
  });
  it("** Error adding missing numbers - n1 + n4", () => {
        expect(() => {
          fhirpath(ctx, `n1 + n4`, subject);
        }).toThrow();
  });
  it("** Error adding non-matching types - n1 + s5", () => {
        expect(() => {
          fhirpath(ctx, `n1 + s5`, subject);
        }).toThrow();
  });
  it("** Error adding non-matching types (2) - s5 + n1", () => {
        expect(() => {
          fhirpath(ctx, `s5 + n1`, subject);
        }).toThrow();
  });
  it("** Empty result if one or both operands is empty (1) - n1 + n4", () => {
        const result = fhirpath(ctx, `n1 + n4`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result if one or both operands is empty (1b) - s5 + n4", () => {
        const result = fhirpath(ctx, `s5 + n4`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result if one or both operands is empty (2) - n4 + n1", () => {
        const result = fhirpath(ctx, `n4 + n1`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result if one or both operands is empty (3) - n4 + n4", () => {
        const result = fhirpath(ctx, `n4 + n4`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is null - n1 + i", () => {
        const result = fhirpath(ctx, `n1 + i`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands has a special unit - 1 'B' + 1 'B'", () => {
        const result = fhirpath(ctx, `1 'B' + 1 'B'`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds - 1 'a' + 1 year", () => {
        const result = fhirpath(ctx, `1 'a' + 1 year`, subject);
        expect(result).toEqual([]);
  });
  it("** Can add a calendar duration quantity less than or equal to seconds to a UCUM time-valued quantity - 1 'a' + (1 year).toQuantity('seconds') = 63093600 seconds", () => {
        const result = fhirpath(ctx, `1 'a' + (1 year).toQuantity('seconds') = 63093600 seconds`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds - 1 year + 1 'a'", () => {
        const result = fhirpath(ctx, `1 year + 1 'a'`, subject);
        expect(result).toEqual([]);
  });
  it("** Can add a UCUM time-valued quantity to a calendar duration quantity less than or equal to seconds - (1 year).toQuantity('seconds') + 1 'a' = 63093600 seconds", () => {
        const result = fhirpath(ctx, `(1 year).toQuantity('seconds') + 1 'a' = 63093600 seconds`, subject);
        expect(result).toEqual([true]);
  });
  it("** Changing the places of the terms may change the sum because of the year/month conversion factor - (1 year + 6 months).toQuantity('seconds') + 1 'a' - (2.5 days).toQuantity('seconds') = 1 'a' + (6 months).toQuantity('seconds') + (1 year).toQuantity('seconds')", () => {
        const result = fhirpath(ctx, `(1 year + 6 months).toQuantity('seconds') + 1 'a' - (2.5 days).toQuantity('seconds') = 1 'a' + (6 months).toQuantity('seconds') + (1 year).toQuantity('seconds')`, subject);
        expect(result).toEqual([true]);
  });
  it("** Changing the places of the terms does not change the sum - (1 year).toQuantity('seconds') + 6 'mo' + 1 'a' = 1 'a' + 6 'mo' + (1 year).toQuantity('seconds')", () => {
        const result = fhirpath(ctx, `(1 year).toQuantity('seconds') + 6 'mo' + 1 'a' = 1 'a' + 6 'mo' + (1 year).toQuantity('seconds')`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can add a calendar duration quantity to a calendar duration quantity - 2 years + 6 months = 2.5 year", () => {
        const result = fhirpath(ctx, `2 years + 6 months = 2.5 year`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can add a UCUM time-valued quantity to an UCUM time-valued quantity - 2 'a' + 1 'a' = 3 'a'", () => {
        const result = fhirpath(ctx, `2 'a' + 1 'a' = 3 'a'`, subject);
        expect(result).toEqual([true]);
  });
  it("6.6.4 substraction", () => {

  });
  it("** Can subtract two numbers - n1 - n2", () => {
        const result = fhirpath(ctx, `n1 - n2`, subject);
        expect(result).toEqual([-3]);
  });
  it("** Can subtract two number literals - 5-3", () => {
        const result = fhirpath(ctx, `5-3`, subject);
        expect(result).toEqual([2]);
  });
  it("** Can subtract two long number literals - 2L - 4L", () => {
        const result = fhirpath(ctx, `2L - 4L`, subject);
        expect(result).toEqual(["-2"]);
  });
  it("** Can subtract a number literal from a long number literal - 2L - 4", () => {
        const result = fhirpath(ctx, `2L - 4`, subject);
        expect(result).toEqual(["-2"]);
  });
  it("** Can subtract a decimal literal from a long number literal - 9L - 4.5", () => {
        const result = fhirpath(ctx, `9L - 4.5`, subject);
        expect(result).toEqual([4.5]);
  });
  it("** Error subtracting a long number literal from a Quantity literal - 4 '1' - 2L", () => {
        expect(() => {
          fhirpath(ctx, `4 '1' - 2L`, subject);
        }).toThrow();
  });
  it("** Error subtracting a Quantity literal from a long number literal - 2L - 4 '1'", () => {
        expect(() => {
          fhirpath(ctx, `2L - 4 '1'`, subject);
        }).toThrow();
  });
  it("** Empty result when one of the operands is empty - n1 - n4", () => {
        const result = fhirpath(ctx, `n1 - n4`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is null - n1 - i", () => {
        const result = fhirpath(ctx, `n1 - i`, subject);
        expect(result).toEqual([]);
  });
  it("** Can subtract two quantity literals - 3 'm' - 3 'cm' = 297 'cm'", () => {
        const result = fhirpath(ctx, `3 'm' - 3 'cm' = 297 'cm'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can subtract a quantity from a number - 3 - 2 '1' = 1 '1'", () => {
        const result = fhirpath(ctx, `3 - 2 '1' = 1 '1'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can subtract a number from a quantity - 3 '1' - 2 = 1 '1'", () => {
        const result = fhirpath(ctx, `3 '1' - 2 = 1 '1'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands has a special unit - 1 'B' - 1 'B'", () => {
        const result = fhirpath(ctx, `1 'B' - 1 'B'`, subject);
        expect(result).toEqual([]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (1) - 1 'a' - 1 year", () => {
        const result = fhirpath(ctx, `1 'a' - 1 year`, subject);
        expect(result).toEqual([]);
  });
  it("** Can subtract a calendar duration quantity less than or equal to seconds from a UCUM time-valued quantity - 1 'a' - (1 year).toQuantity('seconds') = 21600 seconds", () => {
        const result = fhirpath(ctx, `1 'a' - (1 year).toQuantity('seconds') = 21600 seconds`, subject);
        expect(result).toEqual([true]);
  });
  it("** Empty result when one of the operands is a calendar duration quantity greater than seconds (1) - 1 year - 1 'a'", () => {
        const result = fhirpath(ctx, `1 year - 1 'a'`, subject);
        expect(result).toEqual([]);
  });
  it("** Can subtract a UCUM time-valued quantity from a calendar duration quantity less than or equal to seconds - (1 year).toQuantity('seconds') - 1 'a' = -21600 seconds", () => {
        const result = fhirpath(ctx, `(1 year).toQuantity('seconds') - 1 'a' = -21600 seconds`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can subtract a calendar duration quantity from a calendar duration quantity - 3 year - 1 year = 2 year", () => {
        const result = fhirpath(ctx, `3 year - 1 year = 2 year`, subject);
        expect(result).toEqual([true]);
  });
  it("** Can subtract a UCUM time-valued quantity from an UCUM time-valued quantity - 3 'a' - 1 'a' = 2 'a'", () => {
        const result = fhirpath(ctx, `3 'a' - 1 'a' = 2 'a'`, subject);
        expect(result).toEqual([true]);
  });
  it("6.6.5 div", () => {

  });
  it("** Can div two numbers - n2 div n1", () => {
        const result = fhirpath(ctx, `n2 div n1`, subject);
        expect(result).toEqual([2]);
  });
  it("** Can div two long number literals - 5L div 2L", () => {
        const result = fhirpath(ctx, `5L div 2L`, subject);
        expect(result).toEqual(["2"]);
  });
  it("** Can div a long number literal by a number literal - 5L div 2", () => {
        const result = fhirpath(ctx, `5L div 2`, subject);
        expect(result).toEqual([2]);
  });
  it("** Can div a long number literal by a decimal literal - 10L div 4.5", () => {
        const result = fhirpath(ctx, `10L div 4.5`, subject);
        expect(result).toEqual([2]);
  });
  it("** Error dividing a Quantity literal by a long number literal - 4 '1' div 2L", () => {
        expect(() => {
          fhirpath(ctx, `4 '1' div 2L`, subject);
        }).toThrow();
  });
  it("** Empty result when one of the operands is null - n1 div i", () => {
        const result = fhirpath(ctx, `n1 div i`, subject);
        expect(result).toEqual([]);
  });
  it("** Error truncated divide array of numbers - MathTestData.n1 div MathTestData.a3", () => {
        expect(() => {
          fhirpath(ctx, `MathTestData.n1 div MathTestData.a3`, subject);
        }).toThrow();
  });
  it("** Error truncated divide missing numbers - MathTestData.n1 div MathTestData.n4", () => {
        expect(() => {
          fhirpath(ctx, `MathTestData.n1 div MathTestData.n4`, subject);
        }).toThrow();
  });
  it("** Error truncated divide non-number - MathTestData.n1 div MathTestData.s5", () => {
        expect(() => {
          fhirpath(ctx, `MathTestData.n1 div MathTestData.s5`, subject);
        }).toThrow();
  });
  it("6.6.6 mod", () => {

  });
  it("** Can mod two numbers - n2 mod n1", () => {
        const result = fhirpath(ctx, `n2 mod n1`, subject);
        expect(result).toEqual([1]);
  });
  it("** Can mod two long number literals - 5L mod 2L", () => {
        const result = fhirpath(ctx, `5L mod 2L`, subject);
        expect(result).toEqual(["1"]);
  });
  it("** Can mod a long number literal by a number literal - 5L mod 2", () => {
        const result = fhirpath(ctx, `5L mod 2`, subject);
        expect(result).toEqual([1]);
  });
  it("** Can mod a long number literal by a decimal literal - 10L mod 4.5", () => {
        const result = fhirpath(ctx, `10L mod 4.5`, subject);
        expect(result).toEqual([1]);
  });
  it("** Error dividing a Quantity literal by a long number literal - 4 '1' mod 2L", () => {
        expect(() => {
          fhirpath(ctx, `4 '1' mod 2L`, subject);
        }).toThrow();
  });
  it("** Empty result when one of the operands is null - n1 mod i", () => {
        const result = fhirpath(ctx, `n1 mod i`, subject);
        expect(result).toEqual([]);
  });
  it("** Error reminder of truncated division array of numbers - MathTestData.n1 mod MathTestData.a3", () => {
        expect(() => {
          fhirpath(ctx, `MathTestData.n1 mod MathTestData.a3`, subject);
        }).toThrow();
  });
  it("** Error reminder of truncated division missing numbers - MathTestData.n1 mod MathTestData.n4", () => {
        expect(() => {
          fhirpath(ctx, `MathTestData.n1 mod MathTestData.n4`, subject);
        }).toThrow();
  });
  it("** Error reminder of truncated division non-number - MathTestData.n1 mod MathTestData.s5", () => {
        expect(() => {
          fhirpath(ctx, `MathTestData.n1 mod MathTestData.s5`, subject);
        }).toThrow();
  });
  it("6.6.7 string concatenation", () => {

  });
  it("** Can concatenate two strings - s5 & s6", () => {
        const result = fhirpath(ctx, `s5 & s6`, subject);
        expect(result).toEqual(["onetwo"]);
  });
  it("** Can concatenate two strings with + - s5 + s6", () => {
        const result = fhirpath(ctx, `s5 + s6`, subject);
        expect(result).toEqual(["onetwo"]);
  });
  it("** Empty collection in concatenation is empty string (1) - n4 & s5", () => {
        const result = fhirpath(ctx, `n4 & s5`, subject);
        expect(result).toEqual(["one"]);
  });
  it("** Empty collection in concatenation is empty string (2) - s5 & n4", () => {
        const result = fhirpath(ctx, `s5 & n4`, subject);
        expect(result).toEqual(["one"]);
  });
  it("** Empty collection in concatenation is empty string (3) - n4 & n4", () => {
        const result = fhirpath(ctx, `n4 & n4`, subject);
        expect(result).toEqual([""]);
  });
  it("** Empty collection in concatenation using + - n4 + s5", () => {
        const result = fhirpath(ctx, `n4 + s5`, subject);
        expect(result).toEqual([]);
  });
  it("** Null in concatenation is treated as an empty collection (1) - Patient.name.given[0] + 'c'", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0] + 'c'`, subject);
        expect(result).toEqual([]);
  });
  it("** Null in concatenation is treated as an empty collection (2) - 'c' + Patient.name.given[0]", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `'c' + Patient.name.given[0]`, subject);
        expect(result).toEqual([]);
  });
  it("** Null in concatenation is treated as an empty collection (3) - Patient.name.given[0] & 'c'", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0] & 'c'`, subject);
        expect(result).toEqual(["c"]);
  });
  it("** Null in concatenation is treated as an empty collection (4) - 'c' & Patient.name.given[0]", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `'c' & Patient.name.given[0]`, subject);
        expect(result).toEqual(["c"]);
  });
  describe("6.7 Date/Time Arithmetic", () => {

    it("@2018 + 1 'a' = @2019", () => {
          expect(() => {
            fhirpath(ctx, `@2018 + 1 'a' = @2019`, subject);
          }).toThrow();
    });
    it("@2018 + 1 year", () => {
          const result = fhirpath(ctx, `@2018 + 1 year`, subject);
          expect(result).toEqual(["2019"]);
    });
    it("@2016 + 364 days", () => {
          const result = fhirpath(ctx, `@2016 + 364 days`, subject);
          expect(result).toEqual(["2016"]);
    });
    it("@2016 - 364 days", () => {
          const result = fhirpath(ctx, `@2016 - 364 days`, subject);
          expect(result).toEqual(["2016"]);
    });
    it("@2016 + 365 days", () => {
          const result = fhirpath(ctx, `@2016 + 365 days`, subject);
          expect(result).toEqual(["2017"]);
    });
    it("@2016 - 365 days", () => {
          const result = fhirpath(ctx, `@2016 - 365 days`, subject);
          expect(result).toEqual(["2015"]);
    });
    it("@2016 + 11 months", () => {
          const result = fhirpath(ctx, `@2016 + 11 months`, subject);
          expect(result).toEqual(["2016"]);
    });
    it("@2016 + 12 months", () => {
          const result = fhirpath(ctx, `@2016 + 12 months`, subject);
          expect(result).toEqual(["2017"]);
    });
    it("@2018 + 2 years", () => {
          const result = fhirpath(ctx, `@2018 + 2 years`, subject);
          expect(result).toEqual(["2020"]);
    });
    it("@2018-02 + 1 'mo'", () => {
          expect(() => {
            fhirpath(ctx, `@2018-02 + 1 'mo'`, subject);
          }).toThrow();
    });
    it("@2018-02 + 1 month", () => {
          const result = fhirpath(ctx, `@2018-02 + 1 month`, subject);
          expect(result).toEqual(["2018-03"]);
    });
    it("@2018-02 + 2 months", () => {
          const result = fhirpath(ctx, `@2018-02 + 2 months`, subject);
          expect(result).toEqual(["2018-04"]);
    });
    it("@2016-01 + 29 days", () => {
          const result = fhirpath(ctx, `@2016-01 + 29 days`, subject);
          expect(result).toEqual(["2016-01"]);
    });
    it("@2016-01 + 29 'd'", () => {
          expect(() => {
            fhirpath(ctx, `@2016-01 + 29 'd'`, subject);
          }).toThrow();
    });
    it("@2016-01 + 30 days", () => {
          const result = fhirpath(ctx, `@2016-01 + 30 days`, subject);
          expect(result).toEqual(["2016-02"]);
    });
    it("@2016-01 + 30 'd'", () => {
          expect(() => {
            fhirpath(ctx, `@2016-01 + 30 'd'`, subject);
          }).toThrow();
    });
    it("@2016-01 + 1 hour", () => {
          const result = fhirpath(ctx, `@2016-01 + 1 hour`, subject);
          expect(result).toEqual(["2016-01"]);
    });
    it("@2018-01-03 + 2 years", () => {
          const result = fhirpath(ctx, `@2018-01-03 + 2 years`, subject);
          expect(result).toEqual(["2020-01-03"]);
    });
    it("@2018-02-18T12:23:45-05:00 + 2 years", () => {
          const result = fhirpath(ctx, `@2018-02-18T12:23:45-05:00 + 2 years`, subject);
          expect(result).toEqual(["2020-02-18T14:23:45-03:00"]);
    });
    it("@2016-02-29 + 1 month", () => {
          const result = fhirpath(ctx, `@2016-02-29 + 1 month`, subject);
          expect(result).toEqual(["2016-03-29"]);
    });
    it("@2016-02-29 + 1 year", () => {
          const result = fhirpath(ctx, `@2016-02-29 + 1 year`, subject);
          expect(result).toEqual(["2017-02-28"]);
    });
    it("1 year + @2016-02-29", () => {
          const result = fhirpath(ctx, `1 year + @2016-02-29`, subject);
          expect(result).toEqual(["2017-02-28"]);
    });
    it("@2016-02-29 + @2016-02-29", () => {
          expect(() => {
            fhirpath(ctx, `@2016-02-29 + @2016-02-29`, subject);
          }).toThrow();
    });
    it("1 year - @2016-02-29", () => {
          expect(() => {
            fhirpath(ctx, `1 year - @2016-02-29`, subject);
          }).toThrow();
    });
    it("1 year - 6 months - 1 year + 18 months = 1 year", () => {
          const result = fhirpath(ctx, `1 year - 6 months - 1 year + 18 months = 1 year`, subject);
          expect(result).toEqual([true]);
    });
    it("1 year * 2 = 2 year", () => {
          const result = fhirpath(ctx, `1 year * 2 = 2 year`, subject);
          expect(result).toEqual([true]);
    });
    it("2 * 5 months = 10 months", () => {
          const result = fhirpath(ctx, `2 * 5 months = 10 months`, subject);
          expect(result).toEqual([true]);
    });
    it("1 year / 6 months = 2", () => {
          const result = fhirpath(ctx, `1 year / 6 months = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("@2016-01-31 + 1 month", () => {
          const result = fhirpath(ctx, `@2016-01-31 + 1 month`, subject);
          expect(result).toEqual(["2016-02-29"]);
    });
    it("@2016-01-31 + 1 month + 1 day", () => {
          const result = fhirpath(ctx, `@2016-01-31 + 1 month + 1 day`, subject);
          expect(result).toEqual(["2016-03-01"]);
    });
    it("@2016-02-28 + 1 week", () => {
          const result = fhirpath(ctx, `@2016-02-28 + 1 week`, subject);
          expect(result).toEqual(["2016-03-06"]);
    });
    it("@2016-02-28 + 1 'wk'", () => {
          expect(() => {
            fhirpath(ctx, `@2016-02-28 + 1 'wk'`, subject);
          }).toThrow();
    });
    it("@2016-02-28 + 1 day", () => {
          const result = fhirpath(ctx, `@2016-02-28 + 1 day`, subject);
          expect(result).toEqual(["2016-02-29"]);
    });
    it("@2016-02-28 + 2 days", () => {
          const result = fhirpath(ctx, `@2016-02-28 + 2 days`, subject);
          expect(result).toEqual(["2016-03-01"]);
    });
    it("@2016-02-28 - 2 days", () => {
          const result = fhirpath(ctx, `@2016-02-28 - 2 days`, subject);
          expect(result).toEqual(["2016-02-26"]);
    });
    it("@2016-01-01 + 1 month", () => {
          const result = fhirpath(ctx, `@2016-01-01 + 1 month`, subject);
          expect(result).toEqual(["2016-02-01"]);
    });
    it("@2016-01-01 + 24 hours", () => {
          const result = fhirpath(ctx, `@2016-01-01 + 24 hours`, subject);
          expect(result).toEqual(["2016-01-02"]);
    });
    it("@2016-01-01 + 47 hours", () => {
          const result = fhirpath(ctx, `@2016-01-01 + 47 hours`, subject);
          expect(result).toEqual(["2016-01-02"]);
    });
    it("@2018-02-18T12 + 59 minutes = @2018-02-18T12", () => {
          const result = fhirpath(ctx, `@2018-02-18T12 + 59 minutes = @2018-02-18T12`, subject);
          expect(result).toEqual([true]);
    });
    it("@2018-02-18T12 + 60 minutes = @2018-02-18T13", () => {
          const result = fhirpath(ctx, `@2018-02-18T12 + 60 minutes = @2018-02-18T13`, subject);
          expect(result).toEqual([true]);
    });
    it("@2018-02-18T12:00 + 59 seconds = @2018-02-18T12:00", () => {
          const result = fhirpath(ctx, `@2018-02-18T12:00 + 59 seconds = @2018-02-18T12:00`, subject);
          expect(result).toEqual([true]);
    });
    it("@2018-02-18T12:00 + 60 seconds = @2018-02-18T12:01", () => {
          const result = fhirpath(ctx, `@2018-02-18T12:00 + 60 seconds = @2018-02-18T12:01`, subject);
          expect(result).toEqual([true]);
    });
    it("@T09:45:23 + 2 years", () => {
          expect(() => {
            fhirpath(ctx, `@T09:45:23 + 2 years`, subject);
          }).toThrow();
    });
    it("@T09:45 + 120 seconds = @T09:47", () => {
          const result = fhirpath(ctx, `@T09:45 + 120 seconds = @T09:47`, subject);
          expect(result).toEqual([true]);
    });
    it("@T09:45 + 59 seconds = @T09:45", () => {
          const result = fhirpath(ctx, `@T09:45 + 59 seconds = @T09:45`, subject);
          expect(result).toEqual([true]);
    });
    it("@T09:45:23 + 2 minutes = @T09:47:23.000", () => {
          const result = fhirpath(ctx, `@T09:45:23 + 2 minutes = @T09:47:23.000`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 + 2 minutes = @T00:01:23", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 2 minutes = @T00:01:23`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 + 2 minutes = @T00:01:23", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 2 minutes = @T00:01:23`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 + 2 days", () => {
          expect(() => {
            fhirpath(ctx, `@T23:59:23 + 2 days`, subject);
          }).toThrow();
    });
    it("@T23:59:23 + 5 milliseconds = @T23:59:23.005", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 5 milliseconds = @T23:59:23.005`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 + 1.5 seconds = @T23:59:24.500", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 1.5 seconds = @T23:59:24.500`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 + 1.5 's' = @T23:59:24.500", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 1.5 's' = @T23:59:24.500`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 - 1.5 's' = @T23:59:21.500", () => {
          const result = fhirpath(ctx, `@T23:59:23 - 1.5 's' = @T23:59:21.500`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23 + 1000 milliseconds = @T23:59:24", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 1000 milliseconds = @T23:59:24`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23.005 + 995 milliseconds = @T23:59:24", () => {
          const result = fhirpath(ctx, `@T23:59:23.005 + 995 milliseconds = @T23:59:24`, subject);
          expect(result).toEqual([true]);
    });
    it("@T23:59:23.005 + 1990 milliseconds = @T23:59:24.995", () => {
          const result = fhirpath(ctx, `@T23:59:23.005 + 1990 milliseconds = @T23:59:24.995`, subject);
          expect(result).toEqual([true]);
    });
    it("@2016-02-29 + 1.5 year", () => {
          const result = fhirpath(ctx, `@2016-02-29 + 1.5 year`, subject);
          expect(result).toEqual(["2017-02-28"]);
    });
    it("@2016-02-28 + 1.5 weeks", () => {
          const result = fhirpath(ctx, `@2016-02-28 + 1.5 weeks`, subject);
          expect(result).toEqual(["2016-03-06"]);
    });
    it("@2016-02-28 - 1.5 weeks", () => {
          const result = fhirpath(ctx, `@2016-02-28 - 1.5 weeks`, subject);
          expect(result).toEqual(["2016-02-21"]);
    });
    it("@2016-02-28 + 1.5 'wk'", () => {
          expect(() => {
            fhirpath(ctx, `@2016-02-28 + 1.5 'wk'`, subject);
          }).toThrow();
    });
    it("@2016-02-28 + 1.5 day", () => {
          const result = fhirpath(ctx, `@2016-02-28 + 1.5 day`, subject);
          expect(result).toEqual(["2016-02-29"]);
    });
    it("@T23:59:23 + 1.5 hours = @T00:59:23", () => {
          const result = fhirpath(ctx, `@T23:59:23 + 1.5 hours = @T00:59:23`, subject);
          expect(result).toEqual([true]);
    });
    it("Patient.birthDate - 1 day = @1974-12-24", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate - 1 day = @1974-12-24`, subject);
          expect(result).toEqual([true]);
    });
    it("Patient.birthDate + 1 day = @1974-12-26", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate + 1 day = @1974-12-26`, subject);
          expect(result).toEqual([true]);
    });
    it("** Do not convert a resource node value to Date without model - Patient.birthDate + 1 day = @1974-12-26", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `Patient.birthDate + 1 day = @1974-12-26`, subject);
          }).toThrow();
    });
  });
});
