import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.5_conversion.json" with { type: "json" };

// Test file generated from 5.5_conversion.yaml

describe("5.5_conversion", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.5. Conversion", () => {

  });
  it("5.5.1. iif(criterium: expression, true-result: collection [, otherwise-result: collection]) : collection", () => {

  });
  it("** boolean - true - true", () => {
        const result = fhirpath(ctx, `true`, subject);
        expect(result).toEqual([true]);
  });
  it("** boolean - false - false", () => {
        const result = fhirpath(ctx, `false`, subject);
        expect(result).toEqual([false]);
  });
  it("** iif - Functions.iif(true, 'a', 'b')", () => {
        const result = fhirpath(ctx, `Functions.iif(true, 'a', 'b')`, subject);
        expect(result).toEqual(["a"]);
  });
  it("** iif 2 - Functions.iif(false, 'a', 'b')", () => {
        const result = fhirpath(ctx, `Functions.iif(false, 'a', 'b')`, subject);
        expect(result).toEqual(["b"]);
  });
  it("** iif 3 - Functions.iif(coll1[0].coll2[0].attr = 1, coll1[0].coll2[0].attr, coll1[0].coll2[1].attr)", () => {
        const result = fhirpath(ctx, `Functions.iif(coll1[0].coll2[0].attr = 1, coll1[0].coll2[0].attr, coll1[0].coll2[1].attr)`, subject);
        expect(result).toEqual([1]);
  });
  it("** iif 4 - Functions.iif(true, 'a')", () => {
        const result = fhirpath(ctx, `Functions.iif(true, 'a')`, subject);
        expect(result).toEqual(["a"]);
  });
  it("** iif 5 - Functions.iif(false, 'a')", () => {
        const result = fhirpath(ctx, `Functions.iif(false, 'a')`, subject);
        expect(result).toEqual([]);
  });
  it("** iif for collection with null values - Functions.iif(collWithNullsAndTrue[1], collWithNullsAndTrue[0], collWithNullsAndTrue[2]).id", () => {
        const result = fhirpath(ctx, `Functions.iif(collWithNullsAndTrue[1], collWithNullsAndTrue[0], collWithNullsAndTrue[2]).id`, subject);
        expect(result).toEqual(["nullId"]);
  });
  it("5.5.2. toInteger() : integer", () => {

  });
  it("** Bool to int - Functions.attrtrue.toInteger()", () => {
        const result = fhirpath(ctx, `Functions.attrtrue.toInteger()`, subject);
        expect(result).toEqual([1]);
  });
  it("** str to int - intstr.toInteger()", () => {
        const result = fhirpath(ctx, `intstr.toInteger()`, subject);
        expect(result).toEqual([101]);
  });
  it("** Null to int - Functions.collWithNullsAndTrue[0].toInteger()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toInteger()`, subject);
        expect(result).toEqual([]);
  });
  it("** Long to int - 5L.toInteger()", () => {
        const result = fhirpath(ctx, `5L.toInteger()`, subject);
        expect(result).toEqual([5]);
  });
  it("** collection to int - ('5' | '6').toInteger()", () => {
        expect(() => {
          fhirpath(ctx, `('5' | '6').toInteger()`, subject);
        }).toThrow();
  });
  it("** toLong(): Long", () => {

  });
  it("** int to Long - 5.toLong() = 5L", () => {
        const result = fhirpath(ctx, `5.toLong() = 5L`, subject);
        expect(result).toEqual([true]);
  });
  it("** str to Long - intstr.toLong() = 101L", () => {
        const result = fhirpath(ctx, `intstr.toLong() = 101L`, subject);
        expect(result).toEqual([true]);
  });
  it("** Bool to Long - Functions.attrtrue.toLong() = 1L", () => {
        const result = fhirpath(ctx, `Functions.attrtrue.toLong() = 1L`, subject);
        expect(result).toEqual([true]);
  });
  it("** Null to Long - Functions.collWithNullsAndTrue[0].toLong()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toLong()`, subject);
        expect(result).toEqual([]);
  });
  it("** collection to Long - ('5' | '6').toLong()", () => {
        expect(() => {
          fhirpath(ctx, `('5' | '6').toLong()`, subject);
        }).toThrow();
  });
  it("5.5.3. toDecimal() : decimal", () => {

  });
  it("** Bool to decimal - Functions.attrtrue.toDecimal()", () => {
        const result = fhirpath(ctx, `Functions.attrtrue.toDecimal()`, subject);
        expect(result).toEqual([1.0]);
  });
  it("** str to decimal - decstr.toDecimal()", () => {
        const result = fhirpath(ctx, `decstr.toDecimal()`, subject);
        expect(result).toEqual([101.99]);
  });
  it("** Long to decimal - 5L.toDecimal()", () => {
        const result = fhirpath(ctx, `5L.toDecimal()`, subject);
        expect(result).toEqual([5]);
  });
  it("** Null to decimal - Functions.collWithNullsAndTrue[0].toDecimal()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toDecimal()`, subject);
        expect(result).toEqual([]);
  });
  it("** collection to decimal - ('5' | '6').toDecimal()", () => {
        expect(() => {
          fhirpath(ctx, `('5' | '6').toDecimal()`, subject);
        }).toThrow();
  });
  describe("toDateTime", () => {

    it("equality - datetime.toDateTime() = @2019-02-06T19:17-05:00", () => {
          const result = fhirpath(ctx, `datetime.toDateTime() = @2019-02-06T19:17-05:00`, subject);
          expect(result).toEqual([true]);
    });
    it("inequality - datetime.toDateTime() = @2010-02-06T19:17-05:00", () => {
          const result = fhirpath(ctx, `datetime.toDateTime() = @2010-02-06T19:17-05:00`, subject);
          expect(result).toEqual([false]);
    });
  });
  it("** Null to dateTime - Functions.collWithNullsAndTrue[0].toDateTime()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toDateTime()`, subject);
        expect(result).toEqual([]);
  });
  describe("toTime", () => {

    it("equality - time.toTime() = @T19:15", () => {
          const result = fhirpath(ctx, `time.toTime() = @T19:15`, subject);
          expect(result).toEqual([true]);
    });
    it("inequality - time.toTime() = @T18:15", () => {
          const result = fhirpath(ctx, `time.toTime() = @T18:15`, subject);
          expect(result).toEqual([false]);
    });
    it("inequality operator - time.toTime() != @T18:15", () => {
          const result = fhirpath(ctx, `time.toTime() != @T18:15`, subject);
          expect(result).toEqual([true]);
    });
  });
  it("** Null to time - Functions.collWithNullsAndTrue[0].toTime()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toTime()`, subject);
        expect(result).toEqual([]);
  });
  it("** Null to date - Functions.collWithNullsAndTrue[0].toDate()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toDate()`, subject);
        expect(result).toEqual([]);
  });
  it("** Null to boolean - Functions.collWithNullsAndTrue[0].toBoolean()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toBoolean()`, subject);
        expect(result).toEqual([]);
  });
  it("** 1L to boolean - 1L.toBoolean()", () => {
        const result = fhirpath(ctx, `1L.toBoolean()`, subject);
        expect(result).toEqual([true]);
  });
  it("** 0L to boolean - 0L.toBoolean()", () => {
        const result = fhirpath(ctx, `0L.toBoolean()`, subject);
        expect(result).toEqual([false]);
  });
  it("** 2L to boolean - 2L.toBoolean()", () => {
        const result = fhirpath(ctx, `2L.toBoolean()`, subject);
        expect(result).toEqual([]);
  });
  it("** collection to boolean - ('0' | '1').toBoolean()", () => {
        expect(() => {
          fhirpath(ctx, `('0' | '1').toBoolean()`, subject);
        }).toThrow();
  });
  it("5.5.4. toString() : string", () => {

  });
  it("** bool to string - attrtrue.toString()", () => {
        const result = fhirpath(ctx, `attrtrue.toString()`, subject);
        expect(result).toEqual(["true"]);
  });
  it("** bool to string - attrdec.toString()", () => {
        const result = fhirpath(ctx, `attrdec.toString()`, subject);
        expect(result).toEqual(["101.99"]);
  });
  it("** null to string - Patient.name.given[0].toString()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].toString()`, subject);
        expect(result).toEqual([]);
  });
  it("** null date to string - Patient.birthDate.toString()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.birthDate.toString()`, subject);
        expect(result).toEqual([]);
  });
  it("** Long to string - 101L.toString() = '101'", () => {
        const result = fhirpath(ctx, `101L.toString() = '101'`, subject);
        expect(result).toEqual([true]);
  });
  it("** collection to string - (5 | 6).toString()", () => {
        expect(() => {
          fhirpath(ctx, `(5 | 6).toString()`, subject);
        }).toThrow();
  });
  it("5.5.7. toQuantity([unit:string]) : Quantity", () => {

  });
  it("** string to Quantity - '1 \\'wk\\''.toQuantity() = 7 days", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity() = 7 days`, subject);
        expect(result).toEqual([]);
  });
  it("** string to Quantity - '1 \\'wk\\''.toQuantity('days')", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity('days')`, subject);
        expect(result).toEqual([]);
  });
  it("** string to Quantity - '1 \\'wk\\''.toQuantity('d') = 7 days", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity('d') = 7 days`, subject);
        expect(result).toEqual([]);
  });
  it("** string to Quantity - result UCUM unit code must be surrounded with single quotes - '1 \\'wk\\''.toQuantity('d').toString() = '7 \\'d\\''", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity('d').toString() = '7 \\'d\\''`, subject);
        expect(result).toEqual([true]);
  });
  it("** calendar duration conversion factor - '1 year'.toQuantity() != 1 'a'", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 year'.toQuantity() != 1 'a'`, subject);
        expect(result).toEqual([true]);
  });
  it("** calendar duration conversion factor - '1 year'.toQuantity() ~ 1 'a'", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 year'.toQuantity() ~ 1 'a'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Duration to Quantity - MedicationRequest.dispenseRequest.expectedSupplyDuration.toQuantity() = 3 days", () => {
        // Input file: medicationrequest-example.json
        const result = fhirpath(ctx, `MedicationRequest.dispenseRequest.expectedSupplyDuration.toQuantity() = 3 days`, subject);
        expect(result).toEqual([true]);
  });
  it("** UCUM units - '1 \\'cm\\''.toQuantity('mm').value = 10", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'cm\\''.toQuantity('mm').value = 10`, subject);
        expect(result).toEqual([true]);
  });
  it("** Invalid conversion - '1 \\'cm\\''.toQuantity('g')", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'cm\\''.toQuantity('g')`, subject);
        expect(result).toEqual([]);
  });
  it("** Implicit to quantity + toQuantity - Observation.value.toQuantity('kg') ~ 84 'kg'", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value.toQuantity('kg') ~ 84 'kg'`, subject);
        expect(result).toEqual([true]);
  });
  it("** Invalid conversion - '1 \\'wk\\''.toQuantity('nonexistent-unit')", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity('nonexistent-unit')`, subject);
        expect(result).toEqual([]);
  });
  it("** Invalid conversion - 'some not quantity string'.toQuantity()", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `'some not quantity string'.toQuantity()`, subject);
        expect(result).toEqual([]);
  });
  it("** Null to Quantity - Functions.collWithNullsAndTrue[0].toQuantity()", () => {
        const result = fhirpath(ctx, `Functions.collWithNullsAndTrue[0].toQuantity()`, subject);
        expect(result).toEqual([]);
  });
  it("** integer to Quantity - 1.toQuantity() = 1 '1'", () => {
        const result = fhirpath(ctx, `1.toQuantity() = 1 '1'`, subject);
        expect(result).toEqual([true]);
  });
  it("** long integer to Quantity is not defined - 1L.toQuantity() = 1 '1'", () => {
        const result = fhirpath(ctx, `1L.toQuantity() = 1 '1'`, subject);
        expect(result).toEqual([]);
  });
  it("** collection to Quantity - (5 | 6).toQuantity()", () => {
        expect(() => {
          fhirpath(ctx, `(5 | 6).toQuantity()`, subject);
        }).toThrow();
  });
});
