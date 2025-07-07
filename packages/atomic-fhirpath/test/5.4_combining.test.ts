import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.4_combining.json" with { type: "json" };

// Test file generated from 5.4_combining.yaml

describe("5.4_combining", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.4. Combining", () => {

  });
  it("5.4.1. | (union collections)", () => {

  });
  it("** Unioning empty coll with non-exists coll  is empty coll - Functions.coll1.nothing | Functions.attrempty", () => {
        const result = fhirpath(ctx, `Functions.coll1.nothing | Functions.attrempty`, subject);
        expect(result).toEqual([]);
  });
  it("** Unioning empty coll with non-distinct coll is coll without duplicates - Functions.attrempty | Functions.coll1.colltrue.attr", () => {
        const result = fhirpath(ctx, `Functions.attrempty | Functions.coll1.colltrue.attr`, subject);
        expect(result).toEqual([true]);
  });
  it("** Unioning colls - Functions.attrdouble | Functions.coll1.colltrue.attr", () => {
        const result = fhirpath(ctx, `Functions.attrdouble | Functions.coll1.colltrue.attr`, subject);
        expect(result).toEqual([1, 2, true]);
  });
  it("** Unioning colls 2 - Functions.attrdouble | Functions.coll1.coll2.attr", () => {
        const result = fhirpath(ctx, `Functions.attrdouble | Functions.coll1.coll2.attr`, subject);
        expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("** should use year-to-month conversion factor (https://hl7.org/fhirpath/#equals) - (1 year | 12 months)", () => {
        const result = fhirpath(ctx, `(1 year | 12 months)`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** should compare quantities for equality (https://hl7.org/fhirpath/#equals) - (3 'min' | 180 seconds)", () => {
        const result = fhirpath(ctx, `(3 'min' | 180 seconds)`, subject);
        expect(result).toEqual(["3 'min'"]);
  });
  it("** should not depend on the order of properties in an object - Functions.objects.group1 | Functions.objects.group2", () => {
        const result = fhirpath(ctx, `Functions.objects.group1 | Functions.objects.group2`, subject);
        expect(result).toEqual([{"prop1": 1, "prop2": 2}, {"prop1": 3, "prop2": 4}, {"prop1": 5, "prop2": 6}]);
  });
  it("** union of coll with nodes that have null values (1) - (Patient.name.given[0] | Patient.name.given[3]).count()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `(Patient.name.given[0] | Patient.name.given[3]).count()`, subject);
        expect(result).toEqual([2]);
  });
  it("** union of coll with nodes that have null values (2) - Patient.name.given[0].union(Patient.name.given[3]).count()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].union(Patient.name.given[3]).count()`, subject);
        expect(result).toEqual([2]);
  });
  it("5.4.2. combine(other : collection) : collection", () => {

  });
  it("** Combine empty coll with non-exists coll is empty coll - Functions.attrempty.combine(Functions.nothing)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.combine(Functions.nothing)`, subject);
        expect(result).toEqual([]);
  });
  it("** Combine empty coll with non-empty coll - Functions.attrempty.combine(Functions.coll1.colltrue.attr)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.combine(Functions.coll1.colltrue.attr)`, subject);
        expect(result).toEqual([true, true, true]);
  });
  it("** Combine colls - Functions.attrdouble.combine(Functions.coll1.colltrue.attr)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.combine(Functions.coll1.colltrue.attr)`, subject);
        expect(result).toEqual([1, 2, true, true, true]);
  });
  it("** Combine colls 2 - Functions.attrdouble.combine(Functions.coll1.coll2.attr)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.combine(Functions.coll1.coll2.attr)`, subject);
        expect(result).toEqual([1, 2, 1, 2, 3, 4, 5]);
  });
  it("** Combine coll with nodes that have null values - (Patient.name.given[0]).combine(Patient.name.given[3]).count()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `(Patient.name.given[0]).combine(Patient.name.given[3]).count()`, subject);
        expect(result).toEqual([2]);
  });
});
