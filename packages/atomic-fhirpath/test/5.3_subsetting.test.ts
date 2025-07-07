import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.3_subsetting.json" with { type: "json" };

// Test file generated from 5.3_subsetting.yaml

describe("5.3_subsetting", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.3. Subsetting 5.3.1.", () => {

  });
  it("[ index : integer ] : collection", () => {

  });
  it("** [index] - Functions.coll1[1].coll2[0].attr", () => {
        const result = fhirpath(ctx, `Functions.coll1[1].coll2[0].attr`, subject);
        expect(result).toEqual([4]);
  });
  it("** [big index] - Functions.coll1[100].coll2[0].attr", () => {
        const result = fhirpath(ctx, `Functions.coll1[100].coll2[0].attr`, subject);
        expect(result).toEqual([]);
  });
  it("5.3.2. single() : collection", () => {

  });
  it("** single - Functions.attrsingle.single()", () => {
        const result = fhirpath(ctx, `Functions.attrsingle.single()`, subject);
        expect(result).toEqual([1]);
  });
  it("** single on nothing - Functions.ups.single()", () => {
        const result = fhirpath(ctx, `Functions.ups.single()`, subject);
        expect(result).toEqual([]);
  });
  it("** single on empty - Functions.attrempty.single()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.single()`, subject);
        expect(result).toEqual([]);
  });
  it("** single on many - Functions.attrdouble.single()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.attrdouble.single()`, subject);
        }).toThrow();
  });
  it("** single for collection with null values (1) - Functions.collWithNullsAndTrue[0].single()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].single()`, subject);
        expect(result).toEqual([]);
  });
  it("** single for collection with null values (2) - Functions.collWithNullsAndTrue.single()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.collWithNullsAndTrue.single()`, subject);
        }).toThrow();
  });
  it("5.3.3. first() : collection", () => {

  });
  it("** first - Functions.attrdouble.first()", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.first()`, subject);
        expect(result).toEqual([1]);
  });
  it("** first for collection with null values - Functions.collWithNullsAndTrue.first().id", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue.first().id`, subject);
        expect(result).toEqual(["nullId"]);
  });
  it("** first nothing - Functions.nothing.first()", () => {
        const result = fhirpath(ctx, `Functions.nothing.first()`, subject);
        expect(result).toEqual([]);
  });
  it("5.3.4. last() : collection", () => {

  });
  it("** last - Functions.attrdouble.last()", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.last()`, subject);
        expect(result).toEqual([2]);
  });
  it("** last (alternative) - Functions.attrsingle.last()", () => {
        const result = fhirpath(ctx, `Functions.attrsingle.last()`, subject);
        expect(result).toEqual([1]);
  });
  it("** last on empty - Functions.attrempty.last()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.last()`, subject);
        expect(result).toEqual([]);
  });
  it("** last for collection with null values - Functions.collWithNullsAndTrue.last().id", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue.last().id`, subject);
        expect(result).toEqual(["lastNullId"]);
  });
  it("** last nothing - Functions.nothing.last()", () => {
        const result = fhirpath(ctx, `Functions.nothing.last()`, subject);
        expect(result).toEqual([]);
  });
  it("5.3.5. tail() : collection", () => {

  });
  it("** tail - Functions.attrdouble.tail()", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.tail()`, subject);
        expect(result).toEqual([2]);
  });
  it("** tail on one - Functions.attrsingle.tail()", () => {
        const result = fhirpath(ctx, `Functions.attrsingle.tail()`, subject);
        expect(result).toEqual([]);
  });
  it("** tail on empty - Functions.attrempty.tail()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.tail()`, subject);
        expect(result).toEqual([]);
  });
  it("** tail nothing - Functions.nothing.tail()", () => {
        const result = fhirpath(ctx, `Functions.nothing.tail()`, subject);
        expect(result).toEqual([]);
  });
  it("** tail (alternative) - Functions.coll1.coll2.attr.tail()", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.tail()`, subject);
        expect(result).toEqual([2, 3, 4, 5]);
  });
  it("** tail for collection with null values - Functions.collWithNullsAndTrue.tail()[1].id", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue.tail()[1].id`, subject);
        expect(result).toEqual(["lastNullId"]);
  });
  it("5.3.6. skip(num : integer) : collection", () => {

  });
  it("** skip - Functions.attrdouble.skip(1)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.skip(1)`, subject);
        expect(result).toEqual([2]);
  });
  it("** skip 2 - Functions.attrsingle.skip(1)", () => {
        const result = fhirpath(ctx, `Functions.attrsingle.skip(1)`, subject);
        expect(result).toEqual([]);
  });
  it("** skip 3 - Functions.coll1.coll2.attr.skip(3)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.skip(3)`, subject);
        expect(result).toEqual([4, 5]);
  });
  it("** skip 4 - Functions.coll1.coll2.attr.skip(4)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.skip(4)`, subject);
        expect(result).toEqual([5]);
  });
  it("** skip 5 - Functions.coll1.coll2.attr.skip(5)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.skip(5)`, subject);
        expect(result).toEqual([]);
  });
  it("** skip 6 - Functions.coll1.coll2.attr.skip(6)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.skip(6)`, subject);
        expect(result).toEqual([]);
  });
  it("** skip for collection with null values - Functions.collWithNullsAndTrue.skip(2).id", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue.skip(2).id`, subject);
        expect(result).toEqual(["lastNullId"]);
  });
  it("5.3.7. take(num : integer) : collection", () => {

  });
  it("** take - Functions.attrdouble.take(1)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.take(1)`, subject);
        expect(result).toEqual([1]);
  });
  it("** take 2 - Functions.attrdouble.take(2)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.take(2)`, subject);
        expect(result).toEqual([1, 2]);
  });
  it("** take more then has - Functions.attrsingle.take(2)", () => {
        const result = fhirpath(ctx, `Functions.attrsingle.take(2)`, subject);
        expect(result).toEqual([1]);
  });
  it("** take on empty - Functions.attrempty.take(1)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.take(1)`, subject);
        expect(result).toEqual([]);
  });
  it("** take nothing - Functions.nothing.take(2)", () => {
        const result = fhirpath(ctx, `Functions.nothing.take(2)`, subject);
        expect(result).toEqual([]);
  });
  it("** take 3 - Functions.coll1.coll2.attr.take(3)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.take(3)`, subject);
        expect(result).toEqual([1, 2, 3]);
  });
  it("** take 4 - Functions.coll1.coll2.attr.take(4)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.take(4)`, subject);
        expect(result).toEqual([1, 2, 3, 4]);
  });
  it("** take 5 - Functions.coll1.coll2.attr.take(5)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.take(5)`, subject);
        expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("** take for collection with null values - Functions.collWithNullsAndTrue.take(1).id", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue.take(1).id`, subject);
        expect(result).toEqual(["nullId"]);
  });
  it("5.3.8. intersect(other: collection) : collection", () => {

  });
  it("** should not depend on the order of properties in an object - Functions.objects.group1.intersect(Functions.objects.group2)", () => {
        const result = fhirpath(ctx, `Functions.objects.group1.intersect(Functions.objects.group2)`, subject);
        expect(result).toEqual([{"prop1": 1, "prop2": 2}]);
  });
  it("** should ignore null properties - Bundle.entry.intersect(Bundle.entry) = (Bundle.entry[0] | Bundle.entry[2])", () => {
        // Input file: patient-bundle.json
        const result = fhirpath(ctx, `Bundle.entry.intersect(Bundle.entry) = (Bundle.entry[0] | Bundle.entry[2])`, subject);
        expect(result).toEqual([true]);
  });
  it("** should use year-to-month conversion factor (https://hl7.org/fhirpath/#equals) - (1 year).combine(12 months).intersect(12 months)", () => {
        const result = fhirpath(ctx, `(1 year).combine(12 months).intersect(12 months)`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** should use year-to-month conversion factor for large collections - (1 year | 2 year | 3 year | 4 year | 5 year | 6 year).combine(12 months).intersect(12 months)", () => {
        const result = fhirpath(ctx, `(1 year | 2 year | 3 year | 4 year | 5 year | 6 year).combine(12 months).intersect(12 months)`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** should compare quantities for equality (https://hl7.org/fhirpath/#equals) - (3 'min').combine(180 seconds).intersect(180 seconds)", () => {
        const result = fhirpath(ctx, `(3 'min').combine(180 seconds).intersect(180 seconds)`, subject);
        expect(result).toEqual(["3 'min'"]);
  });
  it("** should compare quantities for equality for large collections - (3 'min' | 4 'min' | 5 'min' | 6 'min' | 7 'min').combine(180 seconds).intersect(180 seconds)", () => {
        const result = fhirpath(ctx, `(3 'min' | 4 'min' | 5 'min' | 6 'min' | 7 'min').combine(180 seconds).intersect(180 seconds)`, subject);
        expect(result).toEqual(["3 'min'"]);
  });
  it("** intersect for collection with null values - Functions.collWithNullsAndTrue[0].intersect(Functions.collWithNullsAndTrue[2]).id", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].intersect(Functions.collWithNullsAndTrue[2]).id`, subject);
        expect(result).toEqual([]);
  });
  it("5.3.9. exclude(other: collection) : collection", () => {

  });
  it("** with large collection 1 - (1 | 2 | 3 | 5 | 6 | 7).exclude(2 | 4) = 1 | 3 | 5 | 6 | 7", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `(1 | 2 | 3 | 5 | 6 | 7).exclude(2 | 4) = 1 | 3 | 5 | 6 | 7`, subject);
        expect(result).toEqual([true]);
  });
  it("** with large collection 2 - (1 | 2 | 3 | 5 | 6 | 7).exclude(4) = 1 | 2 | 3 | 5 | 6 | 7", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `(1 | 2 | 3 | 5 | 6 | 7).exclude(4) = 1 | 2 | 3 | 5 | 6 | 7`, subject);
        expect(result).toEqual([true]);
  });
  it("** with large collection 3 - (1 | 2 | 3 | 4 | 5 | 6 | 7).exclude({}) = 1 | 2 | 3 | 4 | 5 | 6 | 7", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `(1 | 2 | 3 | 4 | 5 | 6 | 7).exclude({}) = 1 | 2 | 3 | 4 | 5 | 6 | 7`, subject);
        expect(result).toEqual([true]);
  });
  it("** with large collection 4 - 1.combine(1 | 3 | 4 | 5 | 6 | 7).exclude(2).count() = 7", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `1.combine(1 | 3 | 4 | 5 | 6 | 7).exclude(2).count() = 7`, subject);
        expect(result).toEqual([true]);
  });
  it("** exclude for collection with null values - (Functions.collWithNullsAndTrue[0] | Functions.collWithNullsAndTrue[1]).exclude(Functions.collWithNullsAndTrue[1]).id", () => {
        const result = fhirpath(ctx, `(Functions.collWithNullsAndTrue[0] | Functions.collWithNullsAndTrue[1]).exclude(Functions.collWithNullsAndTrue[1]).id`, subject);
        expect(result).toEqual(["nullId"]);
  });
});
