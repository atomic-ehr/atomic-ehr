import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./6.4_collections.json" with { type: "json" };

// Test file generated from 6.4_collections.yaml

describe("6.4_collections", () => {
  const ctx = {};

  it("6.4.2 |", () => {

  });
  it("coll | coll2", () => {
        const result = fhirpath(ctx, `coll | coll2`, subject);
        expect(result).toEqual([{"a": 1}, {"a": 2}, {"a": 3}, {"a": 4}, {"a": 5}]);
  });
  it("6.4.2 in", () => {

  });
  it("el in coll", () => {
        const result = fhirpath(ctx, `el in coll`, subject);
        expect(result).toEqual([true]);
  });
  it("not_el in coll", () => {
        const result = fhirpath(ctx, `not_el in coll`, subject);
        expect(result).toEqual([false]);
  });
  it("If the left-hand side of the operator is the empty collection is empty, the result is empty - ups in coll", () => {
        const result = fhirpath(ctx, `ups in coll`, subject);
        expect(result).toEqual([]);
  });
  it("if the right-hand side is empty, the result is false - el in emptycoll", () => {
        const result = fhirpath(ctx, `el in emptycoll`, subject);
        expect(result).toEqual([false]);
  });
  it("empty in empty is empty - ups in emptycoll", () => {
        const result = fhirpath(ctx, `ups in emptycoll`, subject);
        expect(result).toEqual([]);
  });
  it("If the left operand has multiple items, an exception is thrown - coll in coll", () => {
        expect(() => {
          fhirpath(ctx, `coll in coll`, subject);
        }).toThrow();
  });
  it("6.4.3 contains", () => {

  });
  it("coll contains el", () => {
        const result = fhirpath(ctx, `coll contains el`, subject);
        expect(result).toEqual([true]);
  });
  it("coll contains not_el", () => {
        const result = fhirpath(ctx, `coll contains not_el`, subject);
        expect(result).toEqual([false]);
  });
  it("coll contains empty", () => {
        const result = fhirpath(ctx, `coll contains empty`, subject);
        expect(result).toEqual([]);
  });
  it("reverse of: If the left-hand side of the operator is the empty collection is empty, the result is empty - coll contains ups", () => {
        const result = fhirpath(ctx, `coll contains ups`, subject);
        expect(result).toEqual([]);
  });
  it("reverse of: if the right-hand side is empty, the result is false - emptycoll contains el", () => {
        const result = fhirpath(ctx, `emptycoll contains el`, subject);
        expect(result).toEqual([false]);
  });
  it("empty in empty is empty - emptycoll contains ups", () => {
        const result = fhirpath(ctx, `emptycoll contains ups`, subject);
        expect(result).toEqual([]);
  });
  it("reverse of: If the left operand has multiple items, an exception is thrown - coll contains coll", () => {
        expect(() => {
          fhirpath(ctx, `coll contains coll`, subject);
        }).toThrow();
  });
});
