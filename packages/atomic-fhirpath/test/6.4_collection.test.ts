import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./6.4_collection.json" with { type: "json" };

// Test file generated from 6.4_collection.yaml

describe("6.4_collection", () => {
  const ctx = {};

  it("6.4. Collections", () => {

  });
  it("6.4.1. | (union collections)", () => {

  });
  it("see 5.4.1 tests", () => {

  });
  it("6.4.2. in (membership)", () => {

  });
  it("** item in coll - b in c", () => {
        const result = fhirpath(ctx, `b in c`, subject);
        expect(result).toEqual([true]);
  });
  it("** item not in coll - a in c", () => {
        const result = fhirpath(ctx, `a in c`, subject);
        expect(result).toEqual([false]);
  });
  it("** in empty coll - d in c", () => {
        const result = fhirpath(ctx, `d in c`, subject);
        expect(result).toEqual([]);
  });
  it("** in empty coll 2 - a in d", () => {
        const result = fhirpath(ctx, `a in d`, subject);
        expect(result).toEqual([false]);
  });
  it("** in operand is coll - c in d", () => {
        expect(() => {
          fhirpath(ctx, `c in d`, subject);
        }).toThrow();
  });
  it("in operator for the null element of a collection - Patient.name.given[3] in Patient.name.given", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[3] in Patient.name.given`, subject);
        expect(result).toEqual([true]);
  });
  it("6.4.3. contains (containership)", () => {

  });
  it("contains operator for the null element of a collection - Patient.name.given contains Patient.name.given[3]", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given contains Patient.name.given[3]`, subject);
        expect(result).toEqual([true]);
  });
});
