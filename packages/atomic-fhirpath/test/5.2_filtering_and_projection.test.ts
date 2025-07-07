import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.2_filtering_and_projection.json" with { type: "json" };

// Test file generated from 5.2_filtering_and_projection.yaml

describe("5.2_filtering_and_projection", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.2. Filtering and projection", () => {

  });
  it("5.2.1. where(criteria : expression) : collection", () => {

  });
  it("** filter coll of numbers - Functions.coll1.coll2.attr.where($this > 2)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.where($this > 2)`, subject);
        expect(result).toEqual([3, 4, 5]);
  });
  it("** filter coll with empty coll result - Functions.coll1.coll2.attr.where($this = 0)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.where($this = 0)`, subject);
        expect(result).toEqual([]);
  });
  it("** the ability to use $index in the expression - Functions.coll1.coll2.attr.where($index > 2)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.where($index > 2)`, subject);
        expect(result).toEqual([4, 5]);
  });
  it("** filter empty coll - Functions.attrempty.where($this > 0)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.where($this > 0)`, subject);
        expect(result).toEqual([]);
  });
  it("** filter non-exists coll - Functions.nothing.where($this < 0)", () => {
        const result = fhirpath(ctx, `Functions.nothing.where($this < 0)`, subject);
        expect(result).toEqual([]);
  });
  it("** where for a collection with a null value that has an id - Patient.name.given.where(id = 'Jacomus1Id').count()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.where(id = 'Jacomus1Id').count()`, subject);
        expect(result).toEqual([1]);
  });
  it("5.2.2. select(projection: expression) : collection", () => {

  });
  it("** simple select - Functions.coll1.coll2.select(attr)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.select(attr)`, subject);
        expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("** select 2 - Functions.coll1.select(colltrue | collfalse).attr", () => {
        const result = fhirpath(ctx, `Functions.coll1.select(colltrue | collfalse).attr`, subject);
        expect(result).toEqual([true, false]);
  });
  it("** select 3 - Functions.coll1.select(colltrue.attr | collfalse.attr)", () => {
        const result = fhirpath(ctx, `Functions.coll1.select(colltrue.attr | collfalse.attr)`, subject);
        expect(result).toEqual([true, false]);
  });
  it("** select on empty coll is empty - Functions.attrempty.select(nothing)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.select(nothing)`, subject);
        expect(result).toEqual([]);
  });
  it("** the ability to use $index in the expression - Functions.coll1.coll2.select(attr + $index)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.select(attr + $index)`, subject);
        expect(result).toEqual([1, 3, 5, 7, 9]);
  });
  it("** select() function for collection with null elements - Patient.name.given.select($this & $this.id)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.select($this & $this.id)`, subject);
        expect(result).toEqual(["Jacomus1Id", "Peter", "James", "Jacomus2Id"]);
  });
  it("5.2.3. repeat(projection: expression) : collection", () => {

  });
  it("* traverse tree", () => {

  });
  it("** should not result in an infinite loop 1 - Functions.coll1.colltrue.repeat(true)", () => {
        const result = fhirpath(ctx, `Functions.coll1.colltrue.repeat(true)`, subject);
        expect(result).toEqual([true]);
  });
  it("** should not result in an infinite loop 2 - (1 | 2).repeat('item')", () => {
        const result = fhirpath(ctx, `(1 | 2).repeat('item')`, subject);
        expect(result).toEqual(["item"]);
  });
  it("** should use year-to-month conversion factor (https://hl7.org/fhirpath/#equals) - (1 year).combine(12 months).repeat($this)", () => {
        const result = fhirpath(ctx, `(1 year).combine(12 months).repeat($this)`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** should compare quantities for equality (https://hl7.org/fhirpath/#equals) - (3 'min').combine(180 seconds).repeat($this)", () => {
        const result = fhirpath(ctx, `(3 'min').combine(180 seconds).repeat($this)`, subject);
        expect(result).toEqual(["3 'min'"]);
  });
  it("** find all attrs - Functions.repeat(repeatingAttr).count()", () => {
        const result = fhirpath(ctx, `Functions.repeat(repeatingAttr).count()`, subject);
        expect(result).toEqual([2]);
  });
  it("** find all repeatingAttr.a values - Functions.repeat(repeatingAttr).a", () => {
        const result = fhirpath(ctx, `Functions.repeat(repeatingAttr).a`, subject);
        expect(result).toEqual([2, 1]);
  });
  it("** find all true values in nested coll - Functions.coll1.colltrue.repeat(attr)", () => {
        const result = fhirpath(ctx, `Functions.coll1.colltrue.repeat(attr)`, subject);
        expect(result).toEqual([true]);
  });
  it("** find non-exists value - Functions.coll1.repeat(nothing)", () => {
        const result = fhirpath(ctx, `Functions.coll1.repeat(nothing)`, subject);
        expect(result).toEqual([]);
  });
  it("** repeat() function for collection with null elements - Patient.name.given.repeat(id)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.repeat(id)`, subject);
        expect(result).toEqual(["Jacomus1Id", "Jacomus2Id"]);
  });
  it("5.2.4. ofType(type : identifier) : collection", () => {

  });
  it("** empty input coll - Functions.attrempty.ofType(String)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.ofType(String)`, subject);
        expect(result).toEqual([]);
  });
  it("** string - heteroattr.ofType(String)", () => {
        const result = fhirpath(ctx, `heteroattr.ofType(String)`, subject);
        expect(result).toEqual(["string"]);
  });
  it("** integer - heteroattr.ofType(Integer)", () => {
        const result = fhirpath(ctx, `heteroattr.ofType(Integer)`, subject);
        expect(result).toEqual([1]);
  });
  it("** decimal - heteroattr.ofType(Decimal)", () => {
        const result = fhirpath(ctx, `heteroattr.ofType(Decimal)`, subject);
        expect(result).toEqual([1.01]);
  });
  it("** boolean - heteroattr.ofType(Boolean)", () => {
        const result = fhirpath(ctx, `heteroattr.ofType(Boolean)`, subject);
        expect(result).toEqual([true, false]);
  });
  it("** object (not fhir) - heteroattr.ofType(Object)", () => {
        expect(() => {
          fhirpath(ctx, `heteroattr.ofType(Object)`, subject);
        }).toThrow();
  });
  it("ofType() function with automatic data type conversion - Patient.name.given.ofType(FHIR.string) = Patient.name.given.ofType(System.String)", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.name.given.ofType(FHIR.string) = Patient.name.given.ofType(System.String)`, subject);
        expect(result).toEqual([true]);
  });
});
