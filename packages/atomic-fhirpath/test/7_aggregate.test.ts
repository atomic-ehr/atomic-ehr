import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./7_aggregate.json" with { type: "json" };

// Test file generated from 7_aggregate.yaml

describe("7_aggregate", () => {
  const ctx = {};

  describe("7 Aggregates", () => {

    describe("7.1 aggregate(aggregator : expression [, init : value]) : value", () => {

      it("aggregate() function within the aggregate() iterator - (1|2|3).aggregate($total + (1|2|3|4).aggregate($total + $this, 0), 0) = 30", () => {
            const result = fhirpath(ctx, `(1|2|3).aggregate($total + (1|2|3|4).aggregate($total + $this, 0), 0) = 30`, subject);
            expect(result).toEqual([true]);
      });
      it("Calculate sum of undefined input collection, start with 3 - UndefinedInput.aggregate($total + $this, 3) = 3", () => {
            const result = fhirpath(ctx, `UndefinedInput.aggregate($total + $this, 3) = 3`, subject);
            expect(result).toEqual([true]);
      });
      it("Using $index in an expression for the aggregate function - (10|20|30|0).aggregate($total + $index, 0) = 6", () => {
            const result = fhirpath(ctx, `(10|20|30|0).aggregate($total + $index, 0) = 6`, subject);
            expect(result).toEqual([true]);
      });
      it("Using the result of the aggregate function - 10 + (1|2|3).aggregate($total + $this*$index, 4) = 22", () => {
            const result = fhirpath(ctx, `10 + (1|2|3).aggregate($total + $this*$index, 4) = 22`, subject);
            expect(result).toEqual([true]);
      });
      it("aggregate() function with string initial value - ('a'|'b'|'c').aggregate($total & '-' & $this, 'concat')", () => {
            const result = fhirpath(ctx, `('a'|'b'|'c').aggregate($total & '-' & $this, 'concat')`, subject);
            expect(result).toEqual(["concat-a-b-c"]);
      });
      it("aggregate() function for collection with null elements (1) - Patient.name.given.aggregate($total & '-' & $this, '')", () => {
            // Input file: patient-example-2.json
            const result = fhirpath(ctx, `Patient.name.given.aggregate($total & '-' & $this, '')`, subject);
            expect(result).toEqual(["--Peter-James-"]);
      });
      it("aggregate() function for collection with null elements (2) - Patient.name.given.aggregate($total & '-' & $this & $this.id, '')", () => {
            // Input file: patient-example-2.json
            const result = fhirpath(ctx, `Patient.name.given.aggregate($total & '-' & $this & $this.id, '')`, subject);
            expect(result).toEqual(["-Jacomus1Id-Peter-James-Jacomus2Id"]);
      });
      it("aggregate() function for collection with null initial value - (Patient.name.given[1] | Patient.name.given[2]).aggregate($total & '-' & $this, %context.name.given[0])", () => {
            // Input file: patient-example-2.json
            const result = fhirpath(ctx, `(Patient.name.given[1] | Patient.name.given[2]).aggregate($total & '-' & $this, %context.name.given[0])`, subject);
            expect(result).toEqual(["-Peter-James"]);
      });
      it("aggregate() function with quantity values - (1 'cm'|3 'cm'|1 'm').aggregate($total + $this, 0 'cm') = 104 'cm'", () => {
            const result = fhirpath(ctx, `(1 'cm'|3 'cm'|1 'm').aggregate($total + $this, 0 'cm') = 104 'cm'`, subject);
            expect(result).toEqual([true]);
      });
      it("aggregate() function with incompatible quantity values - (1 'cm'|3 'cm'|1 'kg'|1 'm').aggregate($total + $this, 0 'cm')", () => {
            const result = fhirpath(ctx, `(1 'cm'|3 'cm'|1 'kg'|1 'm').aggregate($total + $this, 0 'cm')`, subject);
            expect(result).toEqual([]);
      });
    });
    describe("Extension functions", () => {

      it("sum() function calculates the sum of input collection - (1|2|3|4|5|6|7|8|9).sum() = 45", () => {
            const result = fhirpath(ctx, `(1|2|3|4|5|6|7|8|9).sum() = 45`, subject);
            expect(result).toEqual([true]);
      });
      it("sum() function calculates the sum of undefined input collection - UndefinedInput.sum()", () => {
            const result = fhirpath(ctx, `UndefinedInput.sum()`, subject);
            expect(result).toEqual([]);
      });
      it("sum() function calculates the sum of input collection with null elements - Patient.name.given.sum()", () => {
            // Input file: patient-example-2.json
            const result = fhirpath(ctx, `Patient.name.given.sum()`, subject);
            expect(result).toEqual([]);
      });
      it("sum() function calculates the sum of quantity values - (1 'cm'|3 'cm'|1 'm').sum() = 104 'cm'", () => {
            const result = fhirpath(ctx, `(1 'cm'|3 'cm'|1 'm').sum() = 104 'cm'`, subject);
            expect(result).toEqual([true]);
      });
      it("min() function returns the minimum value from the input collection - (7|8|9|1|2|3|4|5|6).min() = 1", () => {
            const result = fhirpath(ctx, `(7|8|9|1|2|3|4|5|6).min() = 1`, subject);
            expect(result).toEqual([true]);
      });
      it("min() function returns empty value for the undefined input collection - UndefinedInput.min()", () => {
            const result = fhirpath(ctx, `UndefinedInput.min()`, subject);
            expect(result).toEqual([]);
      });
      it("min() function returns the minimum quantity from the input collection - (1 'cm'|3 'cm'|1 'm').min() = 1 'cm'", () => {
            const result = fhirpath(ctx, `(1 'cm'|3 'cm'|1 'm').min() = 1 'cm'`, subject);
            expect(result).toEqual([true]);
      });
      it("min() function for collection with nulls (1) - Functions.collWithNull1.min()", () => {
            const result = fhirpath(ctx, `Functions.collWithNull1.min()`, subject);
            expect(result).toEqual([]);
      });
      it("min() function for collection with nulls (2) - Functions.collWithNull2.min()", () => {
            const result = fhirpath(ctx, `Functions.collWithNull2.min()`, subject);
            expect(result).toEqual([]);
      });
      it("max() function returns the maximum value from the input collection - (7|8|9|1|2|3|4|5|6).max() = 9", () => {
            const result = fhirpath(ctx, `(7|8|9|1|2|3|4|5|6).max() = 9`, subject);
            expect(result).toEqual([true]);
      });
      it("max() function returns empty value for the undefined input collection - UndefinedInput.max()", () => {
            const result = fhirpath(ctx, `UndefinedInput.max()`, subject);
            expect(result).toEqual([]);
      });
      it("max() function returns the maximum quantity from the input collection - (1 'cm'|3 'cm'|1 'm').max() = 1 'm'", () => {
            const result = fhirpath(ctx, `(1 'cm'|3 'cm'|1 'm').max() = 1 'm'`, subject);
            expect(result).toEqual([true]);
      });
      it("max() function for collection with nulls (1) - Functions.collWithNull1.max()", () => {
            const result = fhirpath(ctx, `Functions.collWithNull1.max()`, subject);
            expect(result).toEqual([]);
      });
      it("max() function for collection with nulls (2) - Functions.collWithNull2.max()", () => {
            const result = fhirpath(ctx, `Functions.collWithNull2.max()`, subject);
            expect(result).toEqual([]);
      });
      it("avg() function calculates the average value for the input collection - (7|8|9|1|2|3|4|5|6).avg() = 5", () => {
            const result = fhirpath(ctx, `(7|8|9|1|2|3|4|5|6).avg() = 5`, subject);
            expect(result).toEqual([true]);
      });
      it("avg() function calculates the average quantity for the input collection - (7 'm' |8 'm'|9 'm'|1 'm'|2 'm'|3 'm'|400 'cm'|5 'm'|6 'm').avg() = 5 'm'", () => {
            const result = fhirpath(ctx, `(7 'm' |8 'm'|9 'm'|1 'm'|2 'm'|3 'm'|400 'cm'|5 'm'|6 'm').avg() = 5 'm'`, subject);
            expect(result).toEqual([true]);
      });
      it("avg() function for collection with nulls (1) - Functions.collWithNull1.avg()", () => {
            const result = fhirpath(ctx, `Functions.collWithNull1.avg()`, subject);
            expect(result).toEqual([]);
      });
      it("avg() function for collection with nulls (2) - Functions.collWithNull2.avg()", () => {
            const result = fhirpath(ctx, `Functions.collWithNull2.avg()`, subject);
            expect(result).toEqual([]);
      });
      it("avg() function returns an empty value for the undefined input collection - UndefinedInput.avg()", () => {
            const result = fhirpath(ctx, `UndefinedInput.avg()`, subject);
            expect(result).toEqual([]);
      });
    });
  });
});
