import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./bigint.json" with { type: "json" };

// Test file generated from bigint.yaml

describe("bigint", () => {
  const ctx = {};

  it("* Big integers", () => {

  });
  it("** check if value[x] is of type integer64 - Parameters.parameter.value is integer64", () => {
        const result = fhirpath(ctx, `Parameters.parameter.value is integer64`, subject);
        expect(result).toEqual([true]);
  });
  it("** check if the value in value[x] is actually stored as a BigInt - Parameters.parameter.value + 1 = 12345678901234567891L", () => {
        const result = fhirpath(ctx, `Parameters.parameter.value + 1 = 12345678901234567891L`, subject);
        expect(result).toEqual([true]);
  });
  it("** testLiteralLong1 - 1.convertsToLong()", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `1.convertsToLong()`, subject);
        expect(result).toEqual([true]);
  });
  it("** testLiteralLong0 - 0.convertsToLong()", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `0.convertsToLong()`, subject);
        expect(result).toEqual([true]);
  });
  it("** testLiteralLongNegative1 - (-1).convertsToLong()", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `(-1).convertsToLong()`, subject);
        expect(result).toEqual([true]);
  });
  it("** testLiteralLongNegative1Invalid - -1.convertsToLong()", () => {
        // Input file: patient-example.json
        expect(() => {
          fhirpath(ctx, `-1.convertsToLong()`, subject);
        }).toThrow();
  });
  it("** testLiteralLongMax - 2147483647.convertsToLong()", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `2147483647.convertsToLong()`, subject);
        expect(result).toEqual([true]);
  });
});
