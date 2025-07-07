import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.9_utility_functions.json" with { type: "json" };

// Test file generated from 5.9_utility_functions.yaml

describe("5.9_utility_functions", () => {
  const ctx = {};

  describe("5. Functions", () => {

    describe("5.9. Utility functions", () => {

      describe("5.9.1. trace(name : string) : collection", () => {

        it("** trace - coll.attr.trace('coll')", () => {
              const result = fhirpath(ctx, `coll.attr.trace('coll')`, subject);
              expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });
        it("** trace for collection with null values - Patient.name.given.trace('coll')[0].id", () => {
              // Input file: patient-example-2.json
              const result = fhirpath(ctx, `Patient.name.given.trace('coll')[0].id`, subject);
              expect(result).toEqual(["Jacomus1Id"]);
        });
      });
      describe("5.9.2. Current date and time functions", () => {

        describe("now(): DateTime", () => {

          it("** should return the same date as today() - now().toString().substring(0,10) = today().toString()", () => {
                const result = fhirpath(ctx, `now().toString().substring(0,10) = today().toString()`, subject);
                expect(result).toEqual([true]);
          });
          it("** should return the same time as timeOfDay() - now().toString().substring(11,12) = timeOfDay().toString()", () => {
                const result = fhirpath(ctx, `now().toString().substring(11,12) = timeOfDay().toString()`, subject);
                expect(result).toEqual([true]);
          });
        });
        describe("timeOfDay(): Time", () => {

          it("** should return the full time - timeOfDay().toString().length() = 12", () => {
                const result = fhirpath(ctx, `timeOfDay().toString().length() = 12`, subject);
                expect(result).toEqual([true]);
          });
          it("** should return type System.Time - timeOfDay().is(System.Time)", () => {
                const result = fhirpath(ctx, `timeOfDay().is(System.Time)`, subject);
                expect(result).toEqual([true]);
          });
        });
      });
    });
  });
});
