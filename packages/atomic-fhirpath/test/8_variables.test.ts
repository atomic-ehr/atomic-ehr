import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./8_variables.json" with { type: "json" };

// Test file generated from 8_variables.yaml

describe("8_variables", () => {
  const ctx = {};

  describe("Environment variables", () => {

    describe("Standard variables", () => {

      it("%resource (FHIR extension) - %resource.n1", () => {
            const result = fhirpath(ctx, `%resource.n1`, subject);
            expect(result).toEqual([1]);
      });
      it("%context - %context.n1", () => {
            const result = fhirpath(ctx, `%context.n1`, subject);
            expect(result).toEqual([1]);
      });
      it("%context - %context.n1", () => {
            const result = fhirpath(ctx, `%context.n1`, subject);
            expect(result).toEqual([2]);
      });
      it("%ucum - %ucum", () => {
            const result = fhirpath(ctx, `%ucum`, subject);
            expect(result).toEqual(["http://unitsofmeasure.org"]);
      });
    });
    it("%a - 1", () => {
          const result = fhirpath(ctx, `%a - 1`, subject);
          expect(result).toEqual([4]);
    });
    it("Empty variable - %a", () => {
          const result = fhirpath(ctx, `%a`, subject);
          expect(result).toEqual([]);
    });
    it("Null variable - %a", () => {
          const result = fhirpath(ctx, `%a`, subject);
          expect(result).toEqual([]);
    });
    it("Undefined variable - %a", () => {
          expect(() => {
            fhirpath(ctx, `%a`, subject);
          }).toThrow();
    });
    it("Back-quoted variable name - %`a.b() - 1` - 2", () => {
          const result = fhirpath(ctx, `%\`a.b() - 1\` - 2`, subject);
          expect(result).toEqual([3]);
    });
    it("Single-quoted variable name - %'a.b() - 1' - 3", () => {
          const result = fhirpath(ctx, `%'a.b() - 1' - 3`, subject);
          expect(result).toEqual([2]);
    });
  });
});
