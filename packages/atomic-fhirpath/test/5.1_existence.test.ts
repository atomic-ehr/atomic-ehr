import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.1_existence.json" with { type: "json" };

// Test file generated from 5.1_existence.yaml

describe("5.1_existence", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.1 Existence", () => {

  });
  it("5.1.1. empty() : boolean", () => {

  });
  it("** empty coll - Functions.attrempty.empty()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.empty()`, subject);
        expect(result).toEqual([true]);
  });
  it("** null is not empty - Patient.name.given[0].empty()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].empty()`, subject);
        expect(result).toEqual([false]);
  });
  it("** not empty coll - Functions.attrsingle.empty()", () => {
        const result = fhirpath(ctx, `Functions.attrsingle.empty()`, subject);
        expect(result).toEqual([false]);
  });
  it("** empty nothing - Functions.nothing.empty()", () => {
        const result = fhirpath(ctx, `Functions.nothing.empty()`, subject);
        expect(result).toEqual([true]);
  });
  it("5.1.2. not() : boolean", () => {

  });
  it("** not true is false - Functions.attrtrue.not()", () => {
        const result = fhirpath(ctx, `Functions.attrtrue.not()`, subject);
        expect(result).toEqual([false]);
  });
  it("** not false is true - Functions.attrfalse.not()", () => {
        const result = fhirpath(ctx, `Functions.attrfalse.not()`, subject);
        expect(result).toEqual([true]);
  });
  it("** true with double not is true - Functions.attrtrue.not().not()", () => {
        const result = fhirpath(ctx, `Functions.attrtrue.not().not()`, subject);
        expect(result).toEqual([true]);
  });
  it("** empty coll with not() is empty coll - Functions.attrempty.not()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.not()`, subject);
        expect(result).toEqual([]);
  });
  it("** multi-valued coll with not() is invalid - Functions.attrdouble.not()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.attrdouble.not()`, subject);
        }).toThrow();
  });
  it("** not nothing is empty coll - Functions.nothing.not()", () => {
        const result = fhirpath(ctx, `Functions.nothing.not()`, subject);
        expect(result).toEqual([]);
  });
  it("** error for collection that is not a singleton - Functions.collWithNullAndTrue.not()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.collWithNullAndTrue.not()`, subject);
        }).toThrow();
  });
  it("5.1.3. exists([criteria : expression]) : boolean", () => {

  });
  it("** exists for not empty coll should return true - Functions.coll1.exists()", () => {
        const result = fhirpath(ctx, `Functions.coll1.exists()`, subject);
        expect(result).toEqual([true]);
  });
  it("** exists for empty coll should return false - Functions.attrempty.exists()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.exists()`, subject);
        expect(result).toEqual([false]);
  });
  it("** exists for null should return true - Patient.name.given[0].exists()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].exists()`, subject);
        expect(result).toEqual([true]);
  });
  it("** exists for undefined coll should return false - Functions.nothing.exists()", () => {
        const result = fhirpath(ctx, `Functions.nothing.exists()`, subject);
        expect(result).toEqual([false]);
  });
  it("** exists with criteria should work - Functions.coll1.coll2.attr.exists($this > 0)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.exists($this > 0)`, subject);
        expect(result).toEqual([true]);
  });
  it("** exists with criteria should work for empty filtered coll - Functions.coll1.coll2.attr.exists($this < 0)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.exists($this < 0)`, subject);
        expect(result).toEqual([false]);
  });
  it("** exists with criteria should work for not exists coll  - Functions.nothing.attr.exists($this < 0)", () => {
        const result = fhirpath(ctx, `Functions.nothing.attr.exists($this < 0)`, subject);
        expect(result).toEqual([false]);
  });
  it("5.1.4. all(criteria : expression) : boolean", () => {

  });
  it("** all for empty coll is true - Functions.attrempty.all($this > 0)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.all($this > 0)`, subject);
        expect(result).toEqual([true]);
  });
  it("** all for non-exists coll is true - Functions.nothing.all($this > 0)", () => {
        const result = fhirpath(ctx, `Functions.nothing.all($this > 0)`, subject);
        expect(result).toEqual([true]);
  });
  it("** all for evaluations is true - Functions.coll1.coll2.attr.all($this > 0)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.all($this > 0)`, subject);
        expect(result).toEqual([true]);
  });
  it("** not all evaluations is true - Functions.coll1.coll2.attr.all($this = 5)", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.all($this = 5)`, subject);
        expect(result).toEqual([false]);
  });
  it("** the ability to use $index in the expression - (0|1|2|3).all($this = $index)", () => {
        const result = fhirpath(ctx, `(0|1|2|3).all($this = $index)`, subject);
        expect(result).toEqual([true]);
  });
  it("** all for a collection with a null value that has an id - Patient.name.given[0].all(id = 'Jacomus1Id')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].all(id = 'Jacomus1Id')`, subject);
        expect(result).toEqual([true]);
  });
  it("5.1.5. allTrue() : boolean", () => {

  });
  it("** allTrue for empty coll is true - Functions.attrempty.allTrue()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.allTrue()`, subject);
        expect(result).toEqual([true]);
  });
  it("** allTrue for coll with all true items is true - Functions.coll1.colltrue.attr.allTrue()", () => {
        const result = fhirpath(ctx, `Functions.coll1.colltrue.attr.allTrue()`, subject);
        expect(result).toEqual([true]);
  });
  it("** allTrue for coll with false value - Functions.coll1.collwithfalse.attr.allTrue()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collwithfalse.attr.allTrue()`, subject);
        expect(result).toEqual([false]);
  });
  it("** allTrue for non exists coll is true - Functions.nothing.allTrue()", () => {
        const result = fhirpath(ctx, `Functions.nothing.allTrue()`, subject);
        expect(result).toEqual([true]);
  });
  it("** allTrue for null values in the collection raise an error - Functions.collWithNullAndTrue.allTrue()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.collWithNullAndTrue.allTrue()`, subject);
        }).toThrow();
  });
  it("5.1.6. anyTrue() : boolean", () => {

  });
  it("** anyTrue for empty coll is false - Functions.attrempty.anyTrue()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.anyTrue()`, subject);
        expect(result).toEqual([false]);
  });
  it("** anyTrue for non-exists coll is false - Functions.nothing.anyTrue()", () => {
        const result = fhirpath(ctx, `Functions.nothing.anyTrue()`, subject);
        expect(result).toEqual([false]);
  });
  it("** anyTrue for null values in the collection raise an error - Functions.collWithNullAndTrue.anyTrue()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.collWithNullAndTrue.anyTrue()`, subject);
        }).toThrow();
  });
  it("** anyTrue for coll with true value - Functions.coll1.collwithfalse.attr.anyTrue()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collwithfalse.attr.anyTrue()`, subject);
        expect(result).toEqual([true]);
  });
  it("** anyTrue for coll with all false values - Functions.coll1.collfalse.attr.anyTrue()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collfalse.attr.anyTrue()`, subject);
        expect(result).toEqual([false]);
  });
  it("5.1.7. allFalse() : boolean", () => {

  });
  it("** allFalse for empty coll is true - Functions.attrempty.allFalse()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.allFalse()`, subject);
        expect(result).toEqual([true]);
  });
  it("** allFalse for non-exists coll is true - Functions.nothing.allFalse()", () => {
        const result = fhirpath(ctx, `Functions.nothing.allFalse()`, subject);
        expect(result).toEqual([true]);
  });
  it("** allFalse for null values in the collection raise an error - Functions.collWithNullAndTrue.allFalse()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.collWithNullAndTrue.allFalse()`, subject);
        }).toThrow();
  });
  it("** allFalse for coll with all false items is true - Functions.coll1.collfalse.attr.allFalse()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collfalse.attr.allFalse()`, subject);
        expect(result).toEqual([true]);
  });
  it("** allFalse for coll with true value - Functions.coll1.collwithfalse.attr.allFalse()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collwithfalse.attr.allFalse()`, subject);
        expect(result).toEqual([false]);
  });
  it("5.1.8. anyFalse() : boolean", () => {

  });
  it("** anyFalse for empty coll is false - Functions.attrempty.anyFalse()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.anyFalse()`, subject);
        expect(result).toEqual([false]);
  });
  it("** anyFalse for non-exists coll is false - Functions.nothing.anyFalse()", () => {
        const result = fhirpath(ctx, `Functions.nothing.anyFalse()`, subject);
        expect(result).toEqual([false]);
  });
  it("** anyFalse for null values in the collection raise an error - Functions.collWithNullAndTrue.anyFalse()", () => {
        expect(() => {
          fhirpath(ctx, `Functions.collWithNullAndTrue.anyFalse()`, subject);
        }).toThrow();
  });
  it("** anyFalse for coll with false value - Functions.coll1.collwithfalse.attr.anyFalse()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collwithfalse.attr.anyFalse()`, subject);
        expect(result).toEqual([true]);
  });
  it("** anyFalse for coll with all true values - Functions.coll1.colltrue.attr.anyFalse()", () => {
        const result = fhirpath(ctx, `Functions.coll1.colltrue.attr.anyFalse()`, subject);
        expect(result).toEqual([false]);
  });
  it("TODO 5.1.5 - 5.1.8 add test for non-boolean values", () => {

  });
  it("5.1.9. subsetOf(other : collection) : boolean", () => {

  });
  it("** if input coll is empty - result of subset is true - Functions.attrempty.subsetOf(Functions.attrdouble)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.subsetOf(Functions.attrdouble)`, subject);
        expect(result).toEqual([true]);
  });
  it("** if argument coll is empty - result of subset is false - Functions.attrdouble.subsetOf(Functions.attrempty)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.subsetOf(Functions.attrempty)`, subject);
        expect(result).toEqual([false]);
  });
  it("** if argument coll isnt exists -  result of subset is false - Functions.attrdouble.subsetOf(Functions.attrempty)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.subsetOf(Functions.attrempty)`, subject);
        expect(result).toEqual([false]);
  });
  it("** subsetOf for collections with null values (1) - Functions.collWith2NullAndTrue.subsetOf(Functions.collWithNullAndTrue)", () => {
        const result = fhirpath(ctx, `Functions.collWith2NullAndTrue.subsetOf(Functions.collWithNullAndTrue)`, subject);
        expect(result).toEqual([false]);
  });
  it("** subsetOf for collections with null values (2) - Functions.collWithNullAndTrue.subsetOf(Functions.collWith2NullAndTrue)", () => {
        const result = fhirpath(ctx, `Functions.collWithNullAndTrue.subsetOf(Functions.collWith2NullAndTrue)`, subject);
        expect(result).toEqual([true]);
  });
  it("** if input coll is subset of argument coll - Functions.attrdouble.subsetOf(Functions.coll1[0].coll2.attr)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.subsetOf(Functions.coll1[0].coll2.attr)`, subject);
        expect(result).toEqual([true]);
  });
  it("** if input coll isnt subset of argument coll - Functions.coll1[0].coll2.attr.subsetOf(Functions.attrdouble)", () => {
        const result = fhirpath(ctx, `Functions.coll1[0].coll2.attr.subsetOf(Functions.attrdouble)`, subject);
        expect(result).toEqual([false]);
  });
  it("** should treat objects with different key orders as equivalent - Functions.subsetTestC1.subsetOf(Functions.subsetTestC2)", () => {
        const result = fhirpath(ctx, `Functions.subsetTestC1.subsetOf(Functions.subsetTestC2)`, subject);
        expect(result).toEqual([true]);
  });
  it("** subsetOf for a large collections 1 - (1 | 2 | 3 | 4 | 5).subsetOf(1 | 2 | 3 | 4 | 6 | 7)", () => {
        const result = fhirpath(ctx, `(1 | 2 | 3 | 4 | 5).subsetOf(1 | 2 | 3 | 4 | 6 | 7)`, subject);
        expect(result).toEqual([false]);
  });
  it("** subsetOf for a large collections 2 - (1 | 2 | 3 | 4 | 5).subsetOf(1 | 2 | 3 | 4 | 5 | 6)", () => {
        const result = fhirpath(ctx, `(1 | 2 | 3 | 4 | 5).subsetOf(1 | 2 | 3 | 4 | 5 | 6)`, subject);
        expect(result).toEqual([true]);
  });
  it("** 5.1.10. supersetOf(other : collection) : boolean", () => {

  });
  it("** if argumet coll is empty - result of superset is true - Functions.attrdouble.supersetOf(Functions.attrempty)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.supersetOf(Functions.attrempty)`, subject);
        expect(result).toEqual([true]);
  });
  it("** if input coll is empty - result of superset is false - Functions.attrempty.supersetOf(Functions.attrdouble)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.supersetOf(Functions.attrdouble)`, subject);
        expect(result).toEqual([false]);
  });
  it("** if input coll isnt exists and argument is non-empty, result of superset is false - Functions.attrempty.supersetOf(Functions.attrdouble)", () => {
        const result = fhirpath(ctx, `Functions.attrempty.supersetOf(Functions.attrdouble)`, subject);
        expect(result).toEqual([false]);
  });
  it("** if argument coll is superset of input coll result is true - Functions.coll1[0].coll2.attr.supersetOf(Functions.attrdouble)", () => {
        const result = fhirpath(ctx, `Functions.coll1[0].coll2.attr.supersetOf(Functions.attrdouble)`, subject);
        expect(result).toEqual([true]);
  });
  it("** if argument coll isnt superset of input coll result is false - Functions.attrdouble.supersetOf(Functions.coll1[0].coll2.attr)", () => {
        const result = fhirpath(ctx, `Functions.attrdouble.supersetOf(Functions.coll1[0].coll2.attr)`, subject);
        expect(result).toEqual([false]);
  });
  it("** supersetOf for collections with null values (1) - Functions.collWith2NullAndTrue.supersetOf(Functions.collWithNullAndTrue)", () => {
        const result = fhirpath(ctx, `Functions.collWith2NullAndTrue.supersetOf(Functions.collWithNullAndTrue)`, subject);
        expect(result).toEqual([true]);
  });
  it("** supersetOf for collections with null values (2) - Functions.collWithNullAndTrue.supersetOf(Functions.collWith2NullAndTrue)", () => {
        const result = fhirpath(ctx, `Functions.collWithNullAndTrue.supersetOf(Functions.collWith2NullAndTrue)`, subject);
        expect(result).toEqual([false]);
  });
  it("5.1.11. isDistinct() : boolean", () => {

  });
  it("** isDistinct of empty input coll is true - Functions.attrempty.isDistinct()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.isDistinct()`, subject);
        expect(result).toEqual([true]);
  });
  it("** isDistinct of non-exists coll is true - Functions.nothing.isDistinct()", () => {
        const result = fhirpath(ctx, `Functions.nothing.isDistinct()`, subject);
        expect(result).toEqual([true]);
  });
  it("** isDistinct of distinct coll - Functions.coll1.coll2.attr.isDistinct()", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.attr.isDistinct()`, subject);
        expect(result).toEqual([true]);
  });
  it("** isDistinct of coll with same values - Functions.coll1.collfalse.attr.isDistinct()", () => {
        const result = fhirpath(ctx, `Functions.coll1.collfalse.attr.isDistinct()`, subject);
        expect(result).toEqual([false]);
  });
  it("** isDistinct of a large collection 1 - (1 | 2 | 3 | 4 | 5 | 6 | 7).combine(7).isDistinct()", () => {
        const result = fhirpath(ctx, `(1 | 2 | 3 | 4 | 5 | 6 | 7).combine(7).isDistinct()`, subject);
        expect(result).toEqual([false]);
  });
  it("** isDistinct of a large collection 2 - (1 | 2 | 3 | 4 | 5 | 6 | 7).isDistinct()", () => {
        const result = fhirpath(ctx, `(1 | 2 | 3 | 4 | 5 | 6 | 7).isDistinct()`, subject);
        expect(result).toEqual([true]);
  });
  it("** isDistinct of coll with nodes that have null values - (Patient.name.given[0]).combine(Patient.name.given[3]).isDistinct()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `(Patient.name.given[0]).combine(Patient.name.given[3]).isDistinct()`, subject);
        expect(result).toEqual([true]);
  });
  it("5.1.12. distinct() : collection", () => {

  });
  it("** distinct of empty coll is empty - Functions.attrempty.distinct()", () => {
        const result = fhirpath(ctx, `Functions.attrempty.distinct()`, subject);
        expect(result).toEqual([]);
  });
  it("** distinct of non-exists coll is empty - Functions.nothing.distinct()", () => {
        const result = fhirpath(ctx, `Functions.nothing.distinct()`, subject);
        expect(result).toEqual([]);
  });
  it("** distinct of coll with same values - Functions.coll1[2].colltrue.attr.distinct()", () => {
        const result = fhirpath(ctx, `Functions.coll1[2].colltrue.attr.distinct()`, subject);
        expect(result).toEqual([true]);
  });
  it("** distinct of coll with different values - Functions.coll1[0].coll2.attr.distinct()", () => {
        const result = fhirpath(ctx, `Functions.coll1[0].coll2.attr.distinct()`, subject);
        expect(result).toEqual([1, 2, 3]);
  });
  it("** should not depend on the order of properties in an object - Functions.objects.distinct()", () => {
        const result = fhirpath(ctx, `Functions.objects.distinct()`, subject);
        expect(result).toEqual([{"prop1": 1, "prop2": 2}, {"prop1": 3, "prop2": 4}, {"prop1": 5, "prop2": 6}]);
  });
  it("** should ignore null properties - Bundle.entry.distinct() = (Bundle.entry[0] | Bundle.entry[2])", () => {
        // Input file: patient-bundle.json
        const result = fhirpath(ctx, `Bundle.entry.distinct() = (Bundle.entry[0] | Bundle.entry[2])`, subject);
        expect(result).toEqual([true]);
  });
  it("** should use year-to-month conversion factor (https://hl7.org/fhirpath/#equals) - (1 year).combine(12 months).distinct()", () => {
        const result = fhirpath(ctx, `(1 year).combine(12 months).distinct()`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** should compare quantities for equality (https://hl7.org/fhirpath/#equals) - (3 'min').combine(180 seconds).distinct()", () => {
        const result = fhirpath(ctx, `(3 'min').combine(180 seconds).distinct()`, subject);
        expect(result).toEqual(["3 'min'"]);
  });
  it("** should work with nodes that have null values - Patient.name.given.distinct().count()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.distinct().count()`, subject);
        expect(result).toEqual([4]);
  });
  it("5.1.13. count() : integer", () => {

  });
  it("** count - Functions.coll1.count()", () => {
        const result = fhirpath(ctx, `Functions.coll1.count()`, subject);
        expect(result).toEqual([6]);
  });
  it("** nested count - Functions.coll1.coll2.count()", () => {
        const result = fhirpath(ctx, `Functions.coll1.coll2.count()`, subject);
        expect(result).toEqual([5]);
  });
  it("** nested count (alternative) - Functions.coll1[0].coll2.count()", () => {
        const result = fhirpath(ctx, `Functions.coll1[0].coll2.count()`, subject);
        expect(result).toEqual([3]);
  });
  it("** 0 if nothing - Functions.ups.count()", () => {
        const result = fhirpath(ctx, `Functions.ups.count()`, subject);
        expect(result).toEqual([0]);
  });
});
