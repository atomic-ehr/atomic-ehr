import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./fhir-r4.json" with { type: "json" };

// Test file generated from fhir-r4.yaml

describe("fhir-r4", () => {
  const ctx = {};

  describe("Miscellaneous accessor tests", () => {

    it("** Extract birthDate - birthDate", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `birthDate`, subject);
          expect(result).toEqual(["1974-12-25"]);
    });
    it("** patient has a birthDate - birthDate", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `birthDate`, subject);
          expect(result).toEqual([true]);
    });
    it("** patient telecom types - telecom.use", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `telecom.use`, subject);
          expect(result).toEqual(["home", "work", "mobile", "old"]);
    });
  });
  describe("Tests ported from the Java Unit Tests", () => {

    it("** testSimple - name.given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.given`, subject);
          expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
    });
    it("** testSimpleNone - name.suffix", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.suffix`, subject);
          expect(result).toEqual([]);
    });
    it("** testEscapedIdentifier - name.`given`", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.\`given\``, subject);
          expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
    });
    it("** testSimpleBackTick1 - `Patient`.name.`given`", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `\`Patient\`.name.\`given\``, subject);
          expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
    });
    it("** testSimpleFail - name.given1", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `name.given1`, subject);
          }).toThrow();
    });
    it("** testSimpleWithContext - Patient.name.given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given`, subject);
          expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
    });
    it("** testSimpleWithWrongContext - Encounter.name.given", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `Encounter.name.given`, subject);
          }).toThrow();
    });
  });
  describe("testObservations", () => {

    it("** testPolymorphismA - Observation.value.unit", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.unit`, subject);
          expect(result).toEqual(["lbs"]);
    });
    it("** testPolymorphismB - Observation.valueQuantity.unit", () => {
          // Input file: observation-example.json
          expect(() => {
            fhirpath(ctx, `Observation.valueQuantity.unit`, subject);
          }).toThrow();
    });
    it("** testPolymorphismIsA1 - Observation.value.is(Quantity)", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.is(Quantity)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPolymorphismIsA2 - Observation.value is Quantity", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value is Quantity`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPolymorphismIsA3 - Observation.issued is instant", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.issued is instant`, subject);
          expect(result).toEqual([]);
    });
    it("** testPolymorphismIsB - Observation.value.is(Period).not()", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.is(Period).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPolymorphismAsA - Observation.value.as(Quantity).unit", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.as(Quantity).unit`, subject);
          expect(result).toEqual(["lbs"]);
    });
    it("** testPolymorphismAsAFunction - (Observation.value as Quantity).unit", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `(Observation.value as Quantity).unit`, subject);
          expect(result).toEqual(["lbs"]);
    });
    it("** testPolymorphismAsB - (Observation.value as Period).unit", () => {
          // Input file: observation-example.json
          expect(() => {
            fhirpath(ctx, `(Observation.value as Period).unit`, subject);
          }).toThrow();
    });
    it("** testPolymorphismAsBFunction - Observation.value.as(Period).start", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.as(Period).start`, subject);
          expect(result).toEqual([]);
    });
  });
  describe("testDollar", () => {

    it("** testDollarThis1 - Patient.name.given.where(substring($this.length()-3) = 'out')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.where(substring($this.length()-3) = 'out')`, subject);
          expect(result).toEqual([]);
    });
    it("** testDollarThis2 - Patient.name.given.where(substring($this.length()-3) = 'ter')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.where(substring($this.length()-3) = 'ter')`, subject);
          expect(result).toEqual(["Peter", "Peter"]);
    });
    it("** testDollarOrderAllowed - Patient.name.skip(1).given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.skip(1).given`, subject);
          expect(result).toEqual(["Jim", "Peter", "James"]);
    });
    it("** testDollarOrderAllowedA - Patient.name.skip(3).given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.skip(3).given`, subject);
          expect(result).toEqual([]);
    });
    it("** testDollarOrderNotAllowed - Patient.children().skip(1)", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `Patient.children().skip(1)`, subject);
          }).toThrow();
    });
  });
  describe("testLiterals", () => {

    it("** testLiteralTrue - Patient.name.exists() = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.exists() = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralFalse - Patient.name.empty() = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.empty() = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralString - Patient.name.given.first() = 'Peter'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.first() = 'Peter'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralInteger1 - 1.convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralInteger0 - 0.convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerNegative1 - (-1).convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1).convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerNegative1Invalid - -1.convertsToInteger()", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `-1.convertsToInteger()`, subject);
          }).toThrow();
    });
    it("** testLiteralIntegerMax - 2147483647.convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2147483647.convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralString - 'test'.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'test'.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralStringEscapes - '\\\\\\/\\f\\r\\n\\t\\\"\\`\\'\\u002a'.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'\\\\\\/\\f\\r\\n\\t\\"\\\`\\'\\u002a'.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralBooleanTrue - true.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralBooleanFalse - false.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `false.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimal10 - 1.0.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimal01 - 0.1.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.1.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimal00 - 0.0.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.0.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalNegative01 - (-0.1).convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-0.1).convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalNegative01Invalid - -0.1.convertsToDecimal()", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `-0.1.convertsToDecimal()`, subject);
          }).toThrow();
    });
    it("** testLiteralDecimalMax - 1234567890987654321.0.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1234567890987654321.0.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalStep - 0.00000001.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.00000001.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateYear - @2015.is(Date)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015.is(Date)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateMonth - @2015-02.is(Date)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02.is(Date)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateDay - @2015-02-04.is(Date)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04.is(Date)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeYear - @2015T.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015T.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeMonth - @2015-02T.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02T.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeDay - @2015-02-04T.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeHour - @2015-02-04T14.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T14.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeMinute - @2015-02-04T14:34.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T14:34.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeSecond - @2015-02-04T14:34:28.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T14:34:28.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeMillisecond - @2015-02-04T14:34:28.123.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T14:34:28.123.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeUTC - @2015-02-04T14:34:28Z.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T14:34:28Z.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeTimezoneOffset - @2015-02-04T14:34:28+10:00.is(DateTime)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2015-02-04T14:34:28+10:00.is(DateTime)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralTimeHour - @T14.is(Time)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T14.is(Time)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralTimeMinute - @T14:34.is(Time)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T14:34.is(Time)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralTimeSecond - @T14:34:28.is(Time)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T14:34:28.is(Time)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralTimeMillisecond - @T14:34:28.123.is(Time)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T14:34:28.123.is(Time)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralTimeUTC - @T14:34:28Z.is(Time)", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `@T14:34:28Z.is(Time)`, subject);
          }).toThrow();
    });
    it("** testLiteralTimeTimezoneOffset - @T14:34:28+10:00.is(Time)", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `@T14:34:28+10:00.is(Time)`, subject);
          }).toThrow();
    });
    it("** testLiteralQuantityDecimal - 10.1 'mg'.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `10.1 'mg'.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralQuantityInteger - 10 'mg'.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `10 'mg'.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralQuantityDay - 4 days.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 days.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerNotEqual - -3 != 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `-3 != 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerEqual - Patient.name.given.count() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.count() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPolarityPrecedence - -Patient.name.given.count() = -5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `-Patient.name.given.count() = -5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerGreaterThan - Patient.name.given.count() > -3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.count() > -3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerCountNotEqual - Patient.name.given.count() != 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.count() != 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerLessThanTrue - 1 < 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 < 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerLessThanFalse - 1 < -2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 < -2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLiteralIntegerLessThanPolarityTrue - +1 < +2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `+1 < +2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralIntegerLessThanPolarityFalse - -1 < 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `-1 < 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalGreaterThanNonZeroTrue - Observation.value.value > 180.0", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.value > 180.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalGreaterThanZeroTrue - Observation.value.value > 0.0", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.value > 0.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalGreaterThanIntegerTrue - Observation.value.value > 0", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.value > 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalLessThanInteger - Observation.value.value < 190", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value.value < 190`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDecimalLessThanInvalid - Observation.value.value < 'test'", () => {
          // Input file: observation-example.json
          expect(() => {
            fhirpath(ctx, `Observation.value.value < 'test'`, subject);
          }).toThrow();
    });
    it("** testDateEqual - Patient.birthDate = @1974-12-25", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate = @1974-12-25`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateNotEqual - Patient.birthDate != @1974-12-25T12:34:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate != @1974-12-25T12:34:00`, subject);
          expect(result).toEqual([]);
    });
    it("** testDateNotEqualTimezoneOffsetBefore - Patient.birthDate != @1974-12-25T12:34:00-10:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate != @1974-12-25T12:34:00-10:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateNotEqualTimezoneOffsetAfter - Patient.birthDate != @1974-12-25T12:34:00+10:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate != @1974-12-25T12:34:00+10:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateNotEqualUTC - Patient.birthDate != @1974-12-25T12:34:00Z", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate != @1974-12-25T12:34:00Z`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateNotEqualTimeSecond - Patient.birthDate != @T12:14:15", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate != @T12:14:15`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateNotEqualTimeMinute - Patient.birthDate != @T12:14", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate != @T12:14`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateNotEqualToday - Patient.birthDate < today()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate < today()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateTimeGreaterThanDate - now() > Patient.birthDate", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `now() > Patient.birthDate`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeTZGreater - @2017-11-05T01:30:00.0-04:00 > @2017-11-05T01:15:00.0-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2017-11-05T01:30:00.0-04:00 > @2017-11-05T01:15:00.0-05:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLiteralDateTimeTZLess - @2017-11-05T01:30:00.0-04:00 < @2017-11-05T01:15:00.0-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2017-11-05T01:30:00.0-04:00 < @2017-11-05T01:15:00.0-05:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralDateTimeTZEqualFalse - @2017-11-05T01:30:00.0-04:00 = @2017-11-05T01:15:00.0-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2017-11-05T01:30:00.0-04:00 = @2017-11-05T01:15:00.0-05:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLiteralDateTimeTZEqualTrue - @2017-11-05T01:30:00.0-04:00 = @2017-11-05T00:30:00.0-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2017-11-05T01:30:00.0-04:00 = @2017-11-05T00:30:00.0-05:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralUnicode - Patient.name.given.first() = 'P\\u0065ter'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.first() = 'P\\u0065ter'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCollectionNotEmpty - Patient.name.given.empty().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.empty().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCollectionNotEqualEmpty - Patient.name.given != {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given != {}`, subject);
          expect(result).toEqual([]);
    });
    it("** testExpressions - Patient.name.select(given | family).distinct()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.select(given | family).distinct()`, subject);
          expect(result).toEqual(["Peter", "James", "Chalmers", "Jim", "Windsor"]);
    });
    it("** testExpressionsEqual - Patient.name.given.count() = 1 + 4", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.count() = 1 + 4`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEmpty - Patient.name.empty().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.empty().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEmpty - Patient.link.empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.link.empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralNotTrue - true.not() = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.not() = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLiteralNotFalse - false.not() = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `false.not() = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerBooleanNotTrue - (0).not() = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(0).not() = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerBooleanNotFalse - (1).not() = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1).not() = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotInvalid - (1|2).not() = false", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `(1|2).not() = false`, subject);
          }).toThrow();
    });
  });
  describe("testTypes", () => {

    it("** testStringYearConvertsToDate - '2015'.convertsToDate()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015'.convertsToDate()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringMonthConvertsToDate - '2015-02'.convertsToDate()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02'.convertsToDate()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDayConvertsToDate - '2015-02-04'.convertsToDate()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04'.convertsToDate()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringYearConvertsToDateTime - '2015'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringMonthConvertsToDateTime - '2015-02'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDayConvertsToDateTime - '2015-02-04'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringHourConvertsToDateTime - '2015-02-04T14'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04T14'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringMinuteConvertsToDateTime - '2015-02-04T14:34'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04T14:34'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringSecondConvertsToDateTime - '2015-02-04T14:34:28'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04T14:34:28'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringMillisecondConvertsToDateTime - '2015-02-04T14:34:28.123'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04T14:34:28.123'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringUTCConvertsToDateTime - '2015-02-04T14:34:28Z'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04T14:34:28Z'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringTZConvertsToDateTime - '2015-02-04T14:34:28+10:00'.convertsToDateTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'2015-02-04T14:34:28+10:00'.convertsToDateTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringHourConvertsToTime - '14'.convertsToTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'14'.convertsToTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringMinuteConvertsToTime - '14:34'.convertsToTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'14:34'.convertsToTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringSecondConvertsToTime - '14:34:28'.convertsToTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'14:34:28'.convertsToTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringMillisecondConvertsToTime - '14:34:28.123'.convertsToTime()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'14:34:28.123'.convertsToTime()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralConvertsToInteger - 1.convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralIsInteger - 1.is(Integer)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.is(Integer)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralIsSystemInteger - 1.is(System.Integer)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.is(System.Integer)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringLiteralConvertsToInteger - '1'.convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringLiteralConvertsToIntegerFalse - 'a'.convertsToInteger().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a'.convertsToInteger().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalConvertsToIntegerFalse - '1.0'.convertsToInteger().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.convertsToInteger().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringLiteralIsNotInteger - '1'.is(Integer).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.is(Integer).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralConvertsToInteger - true.convertsToInteger()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.convertsToInteger()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralIsNotInteger - true.is(Integer).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.is(Integer).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDateIsNotInteger - @2013-04-05.is(Integer).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2013-04-05.is(Integer).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToInteger - 1.toInteger() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toInteger() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringIntegerLiteralToInteger - '1'.toInteger() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.toInteger() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralToInteger - '1.1'.toInteger() = {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.1'.toInteger() = {}`, subject);
          expect(result).toEqual([]);
    });
    it("** testDecimalLiteralToIntegerIsEmpty - '1.1'.toInteger().empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.1'.toInteger().empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralToInteger - true.toInteger() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.toInteger() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralConvertsToDecimal - 1.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralIsNotDecimal - 1.is(Decimal).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.is(Decimal).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralConvertsToDecimal - 1.0.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralIsDecimal - 1.0.is(Decimal)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.is(Decimal)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringIntegerLiteralConvertsToDecimal - '1'.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringIntegerLiteralIsNotDecimal - '1'.is(Decimal).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.is(Decimal).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringLiteralConvertsToDecimalFalse - '1.a'.convertsToDecimal().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.a'.convertsToDecimal().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalLiteralConvertsToDecimal - '1.0'.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalLiteralIsNotDecimal - '1.0'.is(Decimal).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.is(Decimal).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralConvertsToDecimal - true.convertsToDecimal()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.convertsToDecimal()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralIsNotDecimal - true.is(Decimal).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.is(Decimal).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToDecimal - 1.toDecimal() = 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toDecimal() = 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToDeciamlEquivalent - 1.toDecimal() ~ 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toDecimal() ~ 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralToDecimal - 1.0.toDecimal() = 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.toDecimal() = 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralToDecimalEqual - '1.1'.toDecimal() = 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.1'.toDecimal() = 1.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralToDecimal - true.toDecimal() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.toDecimal() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralConvertsToQuantity - 1.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralIsNotQuantity - 1.is(Quantity).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.is(Quantity).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralConvertsToQuantity - 1.0.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralIsNotQuantity - 1.0.is(System.Quantity).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.is(System.Quantity).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringIntegerLiteralConvertsToQuantity - '1'.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringIntegerLiteralIsNotQuantity - '1'.is(System.Quantity).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.is(System.Quantity).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringQuantityLiteralConvertsToQuantity - '1 day'.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 day'.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringQuantityWeekConvertsToQuantity - '1 \\'wk\\''.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 \\'wk\\''.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringQuantityWeekConvertsToQuantityFalse - '1 wk'.convertsToQuantity().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 wk'.convertsToQuantity().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalLiteralConvertsToQuantityFalse - '1.a'.convertsToQuantity().not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.a'.convertsToQuantity().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalLiteralConvertsToQuantity - '1.0'.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalLiteralIsNotSystemQuantity - '1.0'.is(System.Quantity).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.is(System.Quantity).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralConvertsToQuantity - true.convertsToQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.convertsToQuantity()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralIsNotSystemQuantity - true.is(System.Quantity).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.is(System.Quantity).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToQuantity - 1.toQuantity() = 1 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toQuantity() = 1 '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralToQuantity - 1.0.toQuantity() = 1.0 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.toQuantity() = 1.0 '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringIntegerLiteralToQuantity - '1'.toQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.toQuantity()`, subject);
          expect(result).toEqual(["1 '1'"]);
    });
    it("** testStringQuantityLiteralToQuantity - '1 day'.toQuantity() = 1 day", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 day'.toQuantity() = 1 day`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringQuantityDayLiteralToQuantity - '1 day'.toQuantity() = 1 '{day}'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 day'.toQuantity() = 1 '{day}'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringQuantityWeekLiteralToQuantity - '1 \\'wk\\''.toQuantity() = 1 'wk'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity() = 1 'wk'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringDecimalLiteralToQuantity - '1.0'.toQuantity() ~ 1 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.toQuantity() ~ 1 '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralConvertsToBoolean - 1.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralConvertsToBooleanFalse - 2.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.convertsToBoolean()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNegativeIntegerLiteralConvertsToBooleanFalse - (-1).convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1).convertsToBoolean()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testIntegerLiteralFalseConvertsToBoolean - 0.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralConvertsToBoolean - 1.0.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringTrueLiteralConvertsToBoolean - 'true'.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'true'.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringFalseLiteralConvertsToBoolean - 'false'.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'false'.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringFalseLiteralAlsoConvertsToBoolean - 'False'.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'False'.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTrueLiteralConvertsToBoolean - true.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testFalseLiteralConvertsToBoolean - false.convertsToBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `false.convertsToBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToBoolean - 1.toBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToBooleanEmpty - 2.toBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.toBoolean()`, subject);
          expect(result).toEqual([]);
    });
    it("** testIntegerLiteralToBooleanFalse - 0.toBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.toBoolean()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testStringTrueToBoolean - 'true'.toBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'true'.toBoolean()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringFalseToBoolean - 'false'.toBoolean()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'false'.toBoolean()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testIntegerLiteralConvertsToString - 1.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralIsNotString - 1.is(String).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.is(String).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNegativeIntegerLiteralConvertsToString - (-1).convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1).convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDecimalLiteralConvertsToString - 1.0.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStringLiteralConvertsToString - 'true'.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'true'.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLiteralConvertsToString - true.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantityLiteralConvertsToString - 1 'wk'.convertsToString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 'wk'.convertsToString()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntegerLiteralToString - 1.toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toString()`, subject);
          expect(result).toEqual(["1"]);
    });
    it("** testNegativeIntegerLiteralToString - (-1).toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1).toString()`, subject);
          expect(result).toEqual(["-1"]);
    });
    it("** testDecimalLiteralToString - 1.0.toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.toString()`, subject);
          expect(result).toEqual(["1.0"]);
    });
    it("** testStringLiteralToString - 'true'.toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'true'.toString()`, subject);
          expect(result).toEqual(["true"]);
    });
    it("** testBooleanLiteralToString - true.toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.toString()`, subject);
          expect(result).toEqual(["true"]);
    });
    it("** testQuantityLiteralWkToString - 1 'wk'.toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 'wk'.toString()`, subject);
          expect(result).toEqual(["1 'wk'"]);
    });
    it("** testQuantityLiteralWeekToString - 1 week.toString()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 week.toString()`, subject);
          expect(result).toEqual(["1 'week'"]);
    });
  });
  describe("testExists", () => {

    it("** test - Patient.name.exists()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.exists()`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - Patient.name.exists(use = 'nickname')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.exists(use = 'nickname')`, subject);
          expect(result).toEqual([false]);
    });
    it("** test - Patient.name.exists(use = 'official')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.exists(use = 'official')`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - Patient.maritalStatus.coding.exists(code = 'P' and system = 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus')\n\t\t\tor Patient.maritalStatus.coding.exists(code = 'A' and system = 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.maritalStatus.coding.exists(code = 'P' and system = 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus')
			or Patient.maritalStatus.coding.exists(code = 'A' and system = 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus')`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("testAll", () => {

    it("** testAllTrue1 - Patient.name.select(given.exists()).allTrue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.select(given.exists()).allTrue()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAllTrue2 - Patient.name.select(period.exists()).allTrue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.select(period.exists()).allTrue()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testAllTrue3 - Patient.name.all(given.exists())", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.all(given.exists())`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAllTrue4 - Patient.name.all(period.exists())", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.all(period.exists())`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("testSubSetOf", () => {

    it("** testSubSetOf1 - Patient.name.first().subsetOf($this.name)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.first().subsetOf($this.name)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSubSetOf2 - Patient.name.subsetOf($this.name.first()).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.subsetOf($this.name.first()).not()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSuperSetOf", () => {

    it("** testSuperSetOf1 - Patient.name.first().supersetOf($this.name).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.first().supersetOf($this.name).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSuperSetOf2 - Patient.name.supersetOf($this.name.first())", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.supersetOf($this.name.first())`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testQuantity", () => {

    it("** testQuantity1 - 4.0000 'g' = 4000.0 'mg'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4.0000 'g' = 4000.0 'mg'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity2 - 4 'g' ~ 4000 'mg'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 'g' ~ 4000 'mg'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity3 - 4 'g' != 4040 'mg'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 'g' != 4040 'mg'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity4 - 4 'g' ~ 4040 'mg'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 'g' ~ 4040 'mg'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity5 - 7 days = 1 week", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `7 days = 1 week`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity6 - 7 days = 1 'wk'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `7 days = 1 'wk'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity7 - 6 days < 1 week", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `6 days < 1 week`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity8 - 8 days > 1 week", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `8 days > 1 week`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity9 - 2.0 'cm' * 2.0 'm' = 0.040 'm2'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.0 'cm' * 2.0 'm' = 0.040 'm2'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity10 - 4.0 'g' / 2.0 'm' = 2 'g/m'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4.0 'g' / 2.0 'm' = 2 'g/m'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testQuantity11 - 1.0 'm' / 1.0 'm' = 1 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 'm' / 1.0 'm' = 1 '1'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testCollectionBoolean", () => {

    it("** testCollectionBoolean1 - iif(1 | 2 | 3, true, false)", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `iif(1 | 2 | 3, true, false)`, subject);
          }).toThrow();
    });
    it("** testCollectionBoolean2 - iif({}, true, false)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif({}, true, false)`, subject);
          expect(result).toEqual([false]);
    });
    it("** testCollectionBoolean3 - iif(true, true, false)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(true, true, false)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCollectionBoolean4 - iif({} | true, true, false)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif({} | true, true, false)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCollectionBoolean5 - iif(true, true, 1/0)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(true, true, 1/0)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCollectionBoolean6 - iif(false, 1/0, true)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(false, 1/0, true)`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testDistinct", () => {

    it("** testDistinct1 - (1 | 2 | 3).isDistinct()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3).isDistinct()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDistinct2 - Questionnaire.descendants().linkId.isDistinct()", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.descendants().linkId.isDistinct()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDistinct3 - Questionnaire.descendants().linkId.select(substring(0,1)).isDistinct().not()", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.descendants().linkId.select(substring(0,1)).isDistinct().not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDistinct4 - (1 | 2 | 3).distinct()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3).distinct()`, subject);
          expect(result).toEqual([1, 2, 3]);
    });
    it("** testDistinct5 - Questionnaire.descendants().linkId.distinct().count()", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.descendants().linkId.distinct().count()`, subject);
          expect(result).toEqual([10]);
    });
    it("** testDistinct6 - Questionnaire.descendants().linkId.select(substring(0,1)).distinct().count()", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.descendants().linkId.select(substring(0,1)).distinct().count()`, subject);
          expect(result).toEqual([2]);
    });
  });
  describe("testCount", () => {

    it("** testCount1 - Patient.name.count()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.count()`, subject);
          expect(result).toEqual([3]);
    });
    it("** testCount2 - Patient.name.count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.count() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCount3 - Patient.name.first().count()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.first().count()`, subject);
          expect(result).toEqual([1]);
    });
    it("** testCount4 - Patient.name.first().count() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.first().count() = 1`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testWhere", () => {

    it("** testWhere1 - Patient.name.count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.count() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testWhere2 - Patient.name.where(given = 'Jim').count() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.where(given = 'Jim').count() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testWhere3 - Patient.name.where(given = 'X').count() = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.where(given = 'X').count() = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testWhere4 - Patient.name.where($this.given = 'Jim').count() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.where($this.given = 'Jim').count() = 1`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSelect", () => {

    it("** testSelect1 - Patient.name.select(given).count() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.select(given).count() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSelect2 - Patient.name.select(given | family).count() = 7 ", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.select(given | family).count() = 7 `, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testRepeat", () => {

    it("** testRepeat1 - ValueSet.expansion.repeat(contains).count() = 10", () => {
          // Input file: valueset-example-expansion.json
          const result = fhirpath(ctx, `ValueSet.expansion.repeat(contains).count() = 10`, subject);
          expect(result).toEqual([true]);
    });
    it("** testRepeat2 - Questionnaire.repeat(item).code.count() = 11", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.repeat(item).code.count() = 11`, subject);
          expect(result).toEqual([true]);
    });
    it("** testRepeat3 - Questionnaire.descendants().code.count() = 23", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.descendants().code.count() = 23`, subject);
          expect(result).toEqual([true]);
    });
    it("** testRepeat4 - Questionnaire.children().code.count() = 2", () => {
          // Input file: questionnaire-example.json
          const result = fhirpath(ctx, `Questionnaire.children().code.count() = 2`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testAggregate", () => {

    it("** testAggregate1 - (1|2|3|4|5|6|7|8|9).aggregate($this+$total, 0) = 45", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1|2|3|4|5|6|7|8|9).aggregate($this+$total, 0) = 45`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAggregate2 - (1|2|3|4|5|6|7|8|9).aggregate($this+$total, 2) = 47", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1|2|3|4|5|6|7|8|9).aggregate($this+$total, 2) = 47`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAggregate3 - (1|2|3|4|5|6|7|8|9).aggregate(iif($total.empty(), $this, iif($this < $total, $this, $total))) = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1|2|3|4|5|6|7|8|9).aggregate(iif($total.empty(), $this, iif($this < $total, $this, $total))) = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAggregate4 - (1|2|3|4|5|6|7|8|9).aggregate(iif($total.empty(), $this, iif($this > $total, $this, $total))) = 9", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1|2|3|4|5|6|7|8|9).aggregate(iif($total.empty(), $this, iif($this > $total, $this, $total))) = 9`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testIndexer", () => {

    it("** testIndexer1 - Patient.name[0].given = 'Peter' | 'James'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name[0].given = 'Peter' | 'James'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIndexer2 - Patient.name[1].given = 'Jim'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name[1].given = 'Jim'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSingle", () => {

    it("** testSingle1 - Patient.name.first().single().exists()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.first().single().exists()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSingle2 - Patient.name.single().exists()", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `Patient.name.single().exists()`, subject);
          }).toThrow();
    });
  });
  describe("testFirstLast", () => {

    it("** testFirstLast1 - Patient.name.first().given = 'Peter' | 'James'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.first().given = 'Peter' | 'James'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testFirstLast2 - Patient.name.last().given = 'Peter' | 'James'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.last().given = 'Peter' | 'James'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testTail", () => {

    it("** testTail1 - (0 | 1 | 2).tail() = 1 | 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(0 | 1 | 2).tail() = 1 | 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTail2 - Patient.name.tail().given = 'Jim' | 'Peter' | 'James'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.tail().given = 'Jim' | 'Peter' | 'James'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSkip", () => {

    it("** testSkip1 - (0 | 1 | 2).skip(1) = 1 | 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(0 | 1 | 2).skip(1) = 1 | 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSkip2 - (0 | 1 | 2).skip(2) = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(0 | 1 | 2).skip(2) = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSkip3 - Patient.name.skip(1).given.trace('test') = 'Jim' | 'Peter' | 'James'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.skip(1).given.trace('test') = 'Jim' | 'Peter' | 'James'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSkip4 - Patient.name.skip(3).given.exists() = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.skip(3).given.exists() = false`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testTake", () => {

    it("** testTake1 - (0 | 1 | 2).take(1) = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(0 | 1 | 2).take(1) = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTake2 - (0 | 1 | 2).take(2) = 0 | 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(0 | 1 | 2).take(2) = 0 | 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTake3 - Patient.name.take(1).given = 'Peter' | 'James'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.take(1).given = 'Peter' | 'James'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTake4 - Patient.name.take(2).given = 'Peter' | 'James' | 'Jim'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.take(2).given = 'Peter' | 'James' | 'Jim'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTake5 - Patient.name.take(3).given.count() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.take(3).given.count() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTake6 - Patient.name.take(4).given.count() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.take(4).given.count() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTake7 - Patient.name.take(0).given.exists() = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.take(0).given.exists() = false`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testIif", () => {

    it("** testIif1 - iif(Patient.name.exists(), 'named', 'unnamed') = 'named'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(Patient.name.exists(), 'named', 'unnamed') = 'named'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIif2 - iif(Patient.name.empty(), 'unnamed', 'named') = 'named'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(Patient.name.empty(), 'unnamed', 'named') = 'named'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIif3 - iif(true, true, (1 | 2).toString())", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(true, true, (1 | 2).toString())`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIif4 - iif(false, (1 | 2).toString(), true)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `iif(false, (1 | 2).toString(), true)`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testToInteger", () => {

    it("** testToInteger1 - '1'.toInteger() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.toInteger() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToInteger2 - '-1'.toInteger() = -1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'-1'.toInteger() = -1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToInteger3 - '0'.toInteger() = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'0'.toInteger() = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToInteger4 - '0.0'.toInteger().empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'0.0'.toInteger().empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToInteger5 - 'st'.toInteger().empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'st'.toInteger().empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testToDecimal", () => {

    it("** testToDecimal1 - '1'.toDecimal() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.toDecimal() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToDecimal2 - '-1'.toInteger() = -1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'-1'.toInteger() = -1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToDecimal3 - '0'.toDecimal() = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'0'.toDecimal() = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToDecimal4 - '0.0'.toDecimal() = 0.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'0.0'.toDecimal() = 0.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToDecimal5 - 'st'.toDecimal().empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'st'.toDecimal().empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testToString", () => {

    it("** testToString1 - 1.toString() = '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toString() = '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToString2 - '-1'.toInteger() = -1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'-1'.toInteger() = -1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToString3 - 0.toString() = '0'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.toString() = '0'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToString4 - 0.0.toString() = '0.0'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.0.toString() = '0.0'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToString5 - @2014-12-14.toString() = '2014-12-14'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-14.toString() = '2014-12-14'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testCase", () => {

    it("** testCase1 - 't'.upper() = 'T'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'t'.upper() = 'T'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCase2 - 't'.lower() = 't'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'t'.lower() = 't'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCase3 - 'T'.upper() = 'T'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'T'.upper() = 'T'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCase4 - 'T'.lower() = 't'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'T'.lower() = 't'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testToChars", () => {

    it("** testToChars1 - 't2'.toChars() = 't' | '2'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'t2'.toChars() = 't' | '2'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSubstring", () => {

    it("** testSubstring1 - '12345'.substring(2) = '345'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.substring(2) = '345'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSubstring2 - '12345'.substring(2,1) = '3'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.substring(2,1) = '3'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSubstring3 - '12345'.substring(2,5) = '345'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.substring(2,5) = '345'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSubstring4 - '12345'.substring(25).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.substring(25).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSubstring5 - '12345'.substring(-1).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.substring(-1).empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testStartsWith", () => {

    it("** testStartsWith1 - '12345'.startsWith('2') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('2') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStartsWith2 - '12345'.startsWith('1') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('1') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStartsWith3 - '12345'.startsWith('12') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('12') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStartsWith4 - '12345'.startsWith('13') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('13') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStartsWith5 - '12345'.startsWith('12345') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('12345') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStartsWith6 - '12345'.startsWith('123456') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('123456') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testStartsWith7 - '12345'.startsWith('') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.startsWith('') = true`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testEndsWith", () => {

    it("** testEndsWith1 - '12345'.endsWith('2') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('2') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEndsWith2 - '12345'.endsWith('5') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('5') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEndsWith3 - '12345'.endsWith('45') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('45') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEndsWith4 - '12345'.endsWith('35') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('35') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEndsWith5 - '12345'.endsWith('12345') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('12345') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEndsWith6 - '12345'.endsWith('012345') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('012345') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEndsWith7 - '12345'.endsWith('') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.endsWith('') = true`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testContainsString", () => {

    it("** testContainsString1 - '12345'.contains('6') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('6') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsString2 - '12345'.contains('5') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('5') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsString3 - '12345'.contains('45') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('45') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsString4 - '12345'.contains('35') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('35') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsString5 - '12345'.contains('12345') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('12345') = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsString6 - '12345'.contains('012345') = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('012345') = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsString7 - '12345'.contains('') = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.contains('') = true`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testLength", () => {

    it("** testLength1 - '123456'.length() = 6", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'123456'.length() = 6`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLength2 - '12345'.length() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'12345'.length() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLength3 - '123'.length() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'123'.length() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLength4 - '1'.length() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.length() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLength5 - ''.length() = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `''.length() = 0`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testEncodeDecode", () => {

    it("** test - 'test'.encode('base64')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'test'.encode('base64')`, subject);
          expect(result).toEqual(["dGVzdA=="]);
    });
    it("** test - 'test'.encode('hex')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'test'.encode('hex')`, subject);
          expect(result).toEqual(["74657374"]);
    });
    it("** test - 'subjects?_d'.encode('base64')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'subjects?_d'.encode('base64')`, subject);
          expect(result).toEqual(["c3ViamVjdHM/X2Q="]);
    });
    it("** test - 'subjects?_d'.encode('urlbase64')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'subjects?_d'.encode('urlbase64')`, subject);
          expect(result).toEqual(["c3ViamVjdHM_X2Q="]);
    });
    it("** test - 'dGVzdA=='.decode('base64')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'dGVzdA=='.decode('base64')`, subject);
          expect(result).toEqual(["test"]);
    });
    it("** test - '74657374'.decode('hex')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'74657374'.decode('hex')`, subject);
          expect(result).toEqual(["test"]);
    });
    it("** test - 'c3ViamVjdHM/X2Q='.decode('base64')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'c3ViamVjdHM/X2Q='.decode('base64')`, subject);
          expect(result).toEqual(["subjects?_d"]);
    });
    it("** test - 'c3ViamVjdHM_X2Q='.decode('urlbase64')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'c3ViamVjdHM_X2Q='.decode('urlbase64')`, subject);
          expect(result).toEqual(["subjects?_d"]);
    });
  });
  describe("testExcapeUnescape", () => {

    it("** test - '\"1<2\"'.escape('html')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'"1<2"'.escape('html')`, subject);
          expect(result).toEqual(["&quot;1&lt;2&quot;"]);
    });
    it("** test - '\"1<2\"'.escape('json')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'"1<2"'.escape('json')`, subject);
          expect(result).toEqual(["\\\"1<2\\\""]);
    });
    it("** test - '&quot;1&lt;2&quot;'.unescape('html')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'&quot;1&lt;2&quot;'.unescape('html')`, subject);
          expect(result).toEqual(["\"1<2\""]);
    });
    it("** test - '\\\"1<2\\\"'.unescape('json')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'\\"1<2\\"'.unescape('json')`, subject);
          expect(result).toEqual(["\"1<2\""]);
    });
  });
  describe("testTrim", () => {

    it("** test - '123456'.trim().length() = 6", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'123456'.trim().length() = 6`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - '123 456'.trim().length() = 7", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'123 456'.trim().length() = 7`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - ' 123456 '.trim().length() = 6", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `' 123456 '.trim().length() = 6`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - '  '.trim().length() = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'  '.trim().length() = 0`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSplit", () => {

    it("** test - 'Peter,James,Jim,Peter,James'.split(',').count() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'Peter,James,Jim,Peter,James'.split(',').count() = 5`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testJoin", () => {

    it("** test - name.given.join(',')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.given.join(',')`, subject);
          expect(result).toEqual(["Peter,James,Jim,Peter,James"]);
    });
  });
  describe("testTrace", () => {

    it("** testTrace1 - name.given.trace('test').count() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.given.trace('test').count() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTrace2 - name.trace('test', given).count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.trace('test', given).count() = 3`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testToday", () => {

    it("** testToday1 - Patient.birthDate < today()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate < today()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testToday2 - today().toString().length() = 10", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `today().toString().length() = 10`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testNow", () => {

    it("** testNow1 - Patient.birthDate < now()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate < now()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNow2 - now().toString().length() > 10", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `now().toString().length() > 10`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testEquality", () => {

    it("** testEquality1 - 1 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality2 - {} = {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `{} = {}`, subject);
          expect(result).toEqual([]);
    });
    it("** testEquality3 - true = {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true = {}`, subject);
          expect(result).toEqual([]);
    });
    it("** testEquality4 - (1) = (1)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1) = (1)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality5 - (1 | 2) = (1 | 2)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2) = (1 | 2)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality6 - (1 | 2 | 3) = (1 | 2 | 3)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3) = (1 | 2 | 3)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality7 - (1 | 1) = (1 | 2 | {})", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 1) = (1 | 2 | {})`, subject);
          expect(result).toEqual([]);
    });
    it("** testEquality8 - 1 = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 = 2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality9 - 'a' = 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' = 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality10 - 'a' = 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' = 'A'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality11 - 'a' = 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' = 'b'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality12 - 1.1 = 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 = 1.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality13 - 1.1 = 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 = 1.2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality14 - 1.10 = 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.10 = 1.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality15 - 0 = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0 = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality16 - 0.0 = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.0 = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality17 - @2012-04-15 = @2012-04-15", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 = @2012-04-15`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality18 - @2012-04-15 = @2012-04-16", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 = @2012-04-16`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality19 - @2012-04-15 = @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 = @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([]);
    });
    it("** testEquality20 - @2012-04-15T15:00:00 = @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:00:00 = @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality21 - @2012-04-15T15:30:31 = @2012-04-15T15:30:31.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 = @2012-04-15T15:30:31.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality22 - @2012-04-15T15:30:31 = @2012-04-15T15:30:31.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 = @2012-04-15T15:30:31.1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality23 - @2012-04-15T15:00:00Z = @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:00:00Z = @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([]);
    });
    it("** testEquality24 - @2012-04-15T15:00:00+02:00 = @2012-04-15T16:00:00+03:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:00:00+02:00 = @2012-04-15T16:00:00+03:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality25 - name = name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name = name`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality26 - name.take(2) = name.take(2).first() | name.take(2).last()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2) = name.take(2).first() | name.take(2).last()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquality27 - name.take(2) = name.take(2).last() | name.take(2).first()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2) = name.take(2).last() | name.take(2).first()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquality28 - Observation.value = 185 '[lb_av]'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value = 185 '[lb_av]'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testNEquality", () => {

    it("** testNEquality1 - 1 != 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 != 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality2 - {} != {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `{} != {}`, subject);
          expect(result).toEqual([]);
    });
    it("** testNEquality3 - 1 != 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 != 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality4 - 'a' != 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' != 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality5 - 'a' != 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' != 'b'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality6 - 1.1 != 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 != 1.1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality7 - 1.1 != 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 != 1.2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality8 - 1.10 != 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.10 != 1.1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality9 - 0 != 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0 != 0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality10 - 0.0 != 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.0 != 0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality11 - @2012-04-15 != @2012-04-15", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 != @2012-04-15`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality12 - @2012-04-15 != @2012-04-16", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 != @2012-04-16`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality13 - @2012-04-15 != @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 != @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([]);
    });
    it("** testNEquality14 - @2012-04-15T15:00:00 != @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:00:00 != @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality15 - @2012-04-15T15:30:31 != @2012-04-15T15:30:31.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 != @2012-04-15T15:30:31.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality16 - @2012-04-15T15:30:31 != @2012-04-15T15:30:31.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 != @2012-04-15T15:30:31.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality17 - @2012-04-15T15:00:00Z != @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:00:00Z != @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([]);
    });
    it("** testNEquality18 - @2012-04-15T15:00:00+02:00 != @2012-04-15T16:00:00+03:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:00:00+02:00 != @2012-04-15T16:00:00+03:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality19 - name != name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name != name`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality20 - name.take(2) != name.take(2).first() | name.take(2).last()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2) != name.take(2).first() | name.take(2).last()`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNEquality21 - name.take(2) != name.take(2).last() | name.take(2).first()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2) != name.take(2).last() | name.take(2).first()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality22 - 1.2 / 1.8 != 0.6666667", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 / 1.8 != 0.6666667`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality23 - 1.2 / 1.8 != 0.67", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 / 1.8 != 0.67`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNEquality24 - Observation.value != 185 'kg'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value != 185 'kg'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testEquivalent", () => {

    it("** testEquivalent1 - 1 ~ 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 ~ 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent2 - {} ~ {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `{} ~ {}`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent3 - 1 ~ {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 ~ {}`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent4 - 1 ~ 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 ~ 2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent5 - 'a' ~ 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' ~ 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent6 - 'a' ~ 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' ~ 'A'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent7 - 'a' ~ 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' ~ 'b'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent8 - 1.1 ~ 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 ~ 1.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent9 - 1.1 ~ 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 ~ 1.2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent10 - 1.10 ~ 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.10 ~ 1.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent11 - 1.2 / 1.8 ~ 0.67", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 / 1.8 ~ 0.67`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent12 - 0 ~ 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0 ~ 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent13 - 0.0 ~ 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.0 ~ 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent14 - @2012-04-15 ~ @2012-04-15", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 ~ @2012-04-15`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent15 - @2012-04-15 ~ @2012-04-16", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 ~ @2012-04-16`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent16 - @2012-04-15 ~ @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 ~ @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent17 - @2012-04-15T15:30:31 ~ @2012-04-15T15:30:31.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 ~ @2012-04-15T15:30:31.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent18 - @2012-04-15T15:30:31 ~ @2012-04-15T15:30:31.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 ~ @2012-04-15T15:30:31.1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testEquivalent19 - name ~ name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name ~ name`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent20 - name.take(2).given ~ name.take(2).first().given | name.take(2).last().given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2).given ~ name.take(2).first().given | name.take(2).last().given`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent21 - name.take(2).given ~ name.take(2).last().given | name.take(2).first().given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2).given ~ name.take(2).last().given | name.take(2).first().given`, subject);
          expect(result).toEqual([true]);
    });
    it("** testEquivalent22 - Observation.value ~ 185 '[lb_av]'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value ~ 185 '[lb_av]'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testNotEquivalent", () => {

    it("** testNotEquivalent1 - 1 !~ 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 !~ 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent2 - {} !~ {}", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `{} !~ {}`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent3 - {} !~ 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `{} !~ 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent4 - 1 !~ 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 !~ 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent5 - 'a' !~ 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' !~ 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent6 - 'a' !~ 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' !~ 'A'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent7 - 'a' !~ 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' !~ 'b'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent8 - 1.1 !~ 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 !~ 1.1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent9 - 1.1 !~ 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 !~ 1.2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent10 - 1.10 !~ 1.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.10 !~ 1.1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent11 - 0 !~ 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0 !~ 0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent12 - 0.0 !~ 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.0 !~ 0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent13 - 1.2 / 1.8 !~ 0.6", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 / 1.8 !~ 0.6`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent14 - @2012-04-15 !~ @2012-04-15", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 !~ @2012-04-15`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent15 - @2012-04-15 !~ @2012-04-16", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 !~ @2012-04-16`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent16 - @2012-04-15 !~ @2012-04-15T10:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15 !~ @2012-04-15T10:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent17 - @2012-04-15T15:30:31 !~ @2012-04-15T15:30:31.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 !~ @2012-04-15T15:30:31.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent18 - @2012-04-15T15:30:31 !~ @2012-04-15T15:30:31.1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2012-04-15T15:30:31 !~ @2012-04-15T15:30:31.1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testNotEquivalent19 - name !~ name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name !~ name`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent20 - name.take(2).given !~ name.take(2).first().given | name.take(2).last().given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2).given !~ name.take(2).first().given | name.take(2).last().given`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent21 - name.take(2).given !~ name.take(2).last().given | name.take(2).first().given", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `name.take(2).given !~ name.take(2).last().given | name.take(2).first().given`, subject);
          expect(result).toEqual([false]);
    });
    it("** testNotEquivalent22 - Observation.value !~ 185 'kg'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value !~ 185 'kg'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testLessThan", () => {

    it("** testLessThan1 - 1 < 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 < 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan2 - 1.0 < 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 < 1.2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan3 - 'a' < 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' < 'b'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan4 - 'A' < 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' < 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan5 - @2014-12-12 < @2014-12-13", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 < @2014-12-13`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan6 - @2014-12-13T12:00:00 < @2014-12-13T12:00:01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 < @2014-12-13T12:00:01`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan7 - @T12:00:00 < @T14:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 < @T14:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan8 - 1 < 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 < 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan9 - 1.0 < 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 < 1.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan10 - 'a' < 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' < 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan11 - 'A' < 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' < 'A'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan12 - @2014-12-12 < @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 < @2014-12-12`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan13 - @2014-12-13T12:00:00 < @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 < @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan14 - @T12:00:00 < @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 < @T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan15 - 2 < 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2 < 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan16 - 1.1 < 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 < 1.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan17 - 'b' < 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'b' < 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan18 - 'B' < 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'B' < 'A'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan19 - @2014-12-13 < @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13 < @2014-12-12`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan20 - @2014-12-13T12:00:01 < @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:01 < @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan21 - @T12:00:01 < @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:01 < @T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan22 - Observation.value < 200 '[lb_av]'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value < 200 '[lb_av]'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessThan23 - @2018-03 < @2018-03-01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03 < @2018-03-01`, subject);
          expect(result).toEqual([]);
    });
    it("** testLessThan24 - @2018-03-01T10 < @2018-03-01T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10 < @2018-03-01T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testLessThan25 - @T10 < @T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10 < @T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testLessThan26 - @2018-03-01T10:30:00 < @2018-03-01T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10:30:00 < @2018-03-01T10:30:00.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessThan27 - @T10:30:00 < @T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10:30:00 < @T10:30:00.0`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("testLessOrEqual", () => {

    it("** testLessOrEqual1 - 1 <= 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 <= 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual2 - 1.0 <= 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 <= 1.2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual3 - 'a' <= 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' <= 'b'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual4 - 'A' <= 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' <= 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual5 - @2014-12-12 <= @2014-12-13", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 <= @2014-12-13`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual6 - @2014-12-13T12:00:00 <= @2014-12-13T12:00:01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 <= @2014-12-13T12:00:01`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual7 - @T12:00:00 <= @T14:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 <= @T14:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual8 - 1 <= 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 <= 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual9 - 1.0 <= 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 <= 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual10 - 'a' <= 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' <= 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual11 - 'A' <= 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' <= 'A'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual12 - @2014-12-12 <= @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 <= @2014-12-12`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual13 - @2014-12-13T12:00:00 <= @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 <= @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual14 - @T12:00:00 <= @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 <= @T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual15 - 2 <= 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2 <= 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual16 - 1.1 <= 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 <= 1.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual17 - 'b' <= 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'b' <= 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual18 - 'B' <= 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'B' <= 'A'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual19 - @2014-12-13 <= @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13 <= @2014-12-12`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual20 - @2014-12-13T12:00:01 <= @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:01 <= @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual21 - @T12:00:01 <= @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:01 <= @T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testLessOrEqual22 - Observation.value <= 200 '[lb_av]'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value <= 200 '[lb_av]'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual23 - @2018-03 <= @2018-03-01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03 <= @2018-03-01`, subject);
          expect(result).toEqual([]);
    });
    it("** testLessOrEqual24 - @2018-03-01T10 <= @2018-03-01T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10 <= @2018-03-01T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testLessOrEqual25 - @T10 <= @T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10 <= @T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testLessOrEqual26 - @2018-03-01T10:30:00  <= @2018-03-01T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10:30:00  <= @2018-03-01T10:30:00.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLessOrEqual27 - @T10:30:00 <= @T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10:30:00 <= @T10:30:00.0`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testGreatorOrEqual", () => {

    it("** testGreatorOrEqual1 - 1 >= 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 >= 2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual2 - 1.0 >= 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 >= 1.2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual3 - 'a' >= 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' >= 'b'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual4 - 'A' >= 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' >= 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual5 - @2014-12-12 >= @2014-12-13", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 >= @2014-12-13`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual6 - @2014-12-13T12:00:00 >= @2014-12-13T12:00:01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 >= @2014-12-13T12:00:01`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual7 - @T12:00:00 >= @T14:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 >= @T14:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreatorOrEqual8 - 1 >= 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 >= 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual9 - 1.0 >= 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 >= 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual10 - 'a' >= 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' >= 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual11 - 'A' >= 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' >= 'A'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual12 - @2014-12-12 >= @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 >= @2014-12-12`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual13 - @2014-12-13T12:00:00 >= @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 >= @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual14 - @T12:00:00 >= @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 >= @T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual15 - 2 >= 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2 >= 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual16 - 1.1 >= 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 >= 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual17 - 'b' >= 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'b' >= 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual18 - 'B' >= 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'B' >= 'A'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual19 - @2014-12-13 >= @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13 >= @2014-12-12`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual20 - @2014-12-13T12:00:01 >= @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:01 >= @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual21 - @T12:00:01 >= @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:01 >= @T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual22 - Observation.value >= 100 '[lb_av]'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value >= 100 '[lb_av]'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual23 - @2018-03 >= @2018-03-01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03 >= @2018-03-01`, subject);
          expect(result).toEqual([]);
    });
    it("** testGreatorOrEqual24 - @2018-03-01T10 >= @2018-03-01T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10 >= @2018-03-01T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testGreatorOrEqual25 - @T10 >= @T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10 >= @T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testGreatorOrEqual26 - @2018-03-01T10:30:00 >= @2018-03-01T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10:30:00 >= @2018-03-01T10:30:00.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreatorOrEqual27 - @T10:30:00 >= @T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10:30:00 >= @T10:30:00.0`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testGreaterThan", () => {

    it("** testGreaterThan1 - 1 > 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 > 2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan2 - 1.0 > 1.2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 > 1.2`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan3 - 'a' > 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' > 'b'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan4 - 'A' > 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' > 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan5 - @2014-12-12 > @2014-12-13", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 > @2014-12-13`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan6 - @2014-12-13T12:00:00 > @2014-12-13T12:00:01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 > @2014-12-13T12:00:01`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan7 - @T12:00:00 > @T14:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 > @T14:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan8 - 1 > 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 > 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan9 - 1.0 > 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0 > 1.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan10 - 'a' > 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' > 'a'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan11 - 'A' > 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'A' > 'A'`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan12 - @2014-12-12 > @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-12 > @2014-12-12`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan13 - @2014-12-13T12:00:00 > @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:00 > @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan14 - @T12:00:00 > @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:00 > @T12:00:00`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan15 - 2 > 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2 > 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan16 - 1.1 > 1.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1 > 1.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan17 - 'b' > 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'b' > 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan18 - 'B' > 'A'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'B' > 'A'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan19 - @2014-12-13 > @2014-12-12", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13 > @2014-12-12`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan20 - @2014-12-13T12:00:01 > @2014-12-13T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2014-12-13T12:00:01 > @2014-12-13T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan21 - @T12:00:01 > @T12:00:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T12:00:01 > @T12:00:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan22 - Observation.value > 100 '[lb_av]'", () => {
          // Input file: observation-example.json
          const result = fhirpath(ctx, `Observation.value > 100 '[lb_av]'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testGreaterThan23 - @2018-03 > @2018-03-01", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03 > @2018-03-01`, subject);
          expect(result).toEqual([]);
    });
    it("** testGreaterThan24 - @2018-03-01T10 > @2018-03-01T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10 > @2018-03-01T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testGreaterThan25 - @T10 > @T10:30", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10 > @T10:30`, subject);
          expect(result).toEqual([]);
    });
    it("** testGreaterThan26 - @2018-03-01T10:30:00 > @2018-03-01T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@2018-03-01T10:30:00 > @2018-03-01T10:30:00.0`, subject);
          expect(result).toEqual([false]);
    });
    it("** testGreaterThan27 - @T10:30:00 > @T10:30:00.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `@T10:30:00 > @T10:30:00.0`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("testUnion", () => {

    it("** testUnion1 - (1 | 2 | 3).count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3).count() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion2 - (1 | 2 | 2).count() = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 2).count() = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion3 - (1|1).count() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1|1).count() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion4 - 1.union(2).union(3).count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.union(2).union(3).count() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion5 - 1.union(2.union(3)).count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.union(2.union(3)).count() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion6 - (1 | 2).combine(2).count() = 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2).combine(2).count() = 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion7 - 1.combine(1).count() = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.combine(1).count() = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testUnion8 - 1.combine(1).union(2).count() = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.combine(1).union(2).count() = 2`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testIntersect", () => {

    it("** testIntersect1 - (1 | 2 | 3).intersect(2 | 4) = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3).intersect(2 | 4) = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntersect2 - (1 | 2).intersect(4).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2).intersect(4).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntersect3 - (1 | 2).intersect({}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2).intersect({}).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIntersect4 - 1.combine(1).intersect(1).count() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.combine(1).intersect(1).count() = 1`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testExclude", () => {

    it("** testExclude1 - (1 | 2 | 3).exclude(2 | 4) = 1 | 3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3).exclude(2 | 4) = 1 | 3`, subject);
          expect(result).toEqual([true]);
    });
    it("** testExclude2 - (1 | 2).exclude(4) = 1 | 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2).exclude(4) = 1 | 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testExclude3 - (1 | 2).exclude({}) = 1 | 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2).exclude({}) = 1 | 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testExclude4 - 1.combine(1).exclude(2).count() = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.combine(1).exclude(2).count() = 2`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testIn", () => {

    it("** testIn1 - 1 in (1 | 2 | 3)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 in (1 | 2 | 3)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIn2 - 1 in (2 | 3)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 in (2 | 3)`, subject);
          expect(result).toEqual([false]);
    });
    it("** testIn3 - 'a' in ('a' | 'c' | 'd')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' in ('a' | 'c' | 'd')`, subject);
          expect(result).toEqual([true]);
    });
    it("** testIn4 - 'b' in ('a' | 'c' | 'd')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'b' in ('a' | 'c' | 'd')`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("testContainsCollection", () => {

    it("** testContainsCollection1 - (1 | 2 | 3) contains 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(1 | 2 | 3) contains 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsCollection2 - (2 | 3) contains 1 ", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(2 | 3) contains 1 `, subject);
          expect(result).toEqual([false]);
    });
    it("** testContainsCollection3 - ('a' | 'c' | 'd') contains 'a'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `('a' | 'c' | 'd') contains 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testContainsCollection4 - ('a' | 'c' | 'd') contains 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `('a' | 'c' | 'd') contains 'b'`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("testBooleanLogicAnd", () => {

    it("** testBooleanLogicAnd1 - (true and true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true and true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd2 - (true and false) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true and false) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd3 - (true and {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true and {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd4 - (false and true) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false and true) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd5 - (false and false) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false and false) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd6 - (false and {}) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false and {}) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd7 - ({} and true).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} and true).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd8 - ({} and false) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} and false) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicAnd9 - ({} and {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} and {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testBooleanLogicOr", () => {

    it("** testBooleanLogicOr1 - (true or true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true or true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr2 - (true or false) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true or false) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr3 - (true or {}) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true or {}) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr4 - (false or true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false or true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr5 - (false or false) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false or false) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr6 - (false or {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false or {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr7 - ({} or true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} or true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr8 - ({} or false).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} or false).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicOr9 - ({} or {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} or {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testBooleanLogicXOr", () => {

    it("** testBooleanLogicXOr1 - (true xor true) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true xor true) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr2 - (true xor false) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true xor false) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr3 - (true xor {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true xor {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr4 - (false xor true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false xor true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr5 - (false xor false) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false xor false) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr6 - (false xor {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false xor {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr7 - ({} xor true).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} xor true).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr8 - ({} xor false).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} xor false).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanLogicXOr9 - ({} xor {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} xor {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testBooleanImplies", () => {

    it("** testBooleanImplies1 - (true implies true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true implies true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies2 - (true implies false) = false", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true implies false) = false`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies3 - (true implies {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true implies {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies4 - (false implies true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false implies true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies5 - (false implies false) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false implies false) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies6 - (false implies {}) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(false implies {}) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies7 - ({} implies true) = true", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} implies true) = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies8 - ({} implies false).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} implies false).empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testBooleanImplies9 - ({} implies {}).empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `({} implies {}).empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testPlus", () => {

    it("** testPlus1 - 1 + 1 = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 + 1 = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPlus2 - 1 + 0 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 + 0 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPlus3 - 1.2 + 1.8 = 3.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 + 1.8 = 3.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPlus4 - 'a'+'b' = 'ab'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a'+'b' = 'ab'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testConcatenate", () => {

    it("** testConcatenate1 - 'a' & 'b' = 'ab'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'a' & 'b' = 'ab'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testConcatenate2 - '1' & {} = '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1' & {} = '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testConcatenate3 - {} & 'b' = 'b'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `{} & 'b' = 'b'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testConcatenate4 - (1 | 2 | 3) & 'b' = '1,2,3b'", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `(1 | 2 | 3) & 'b' = '1,2,3b'`, subject);
          }).toThrow();
    });
  });
  describe("testMinus", () => {

    it("** testMinus1 - 1 - 1 = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 - 1 = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMinus2 - 1 - 0 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 - 0 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMinus3 - 1.8 - 1.2 = 0.6", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.8 - 1.2 = 0.6`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMinus4 - 'a'-'b' = 'ab'", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `'a'-'b' = 'ab'`, subject);
          }).toThrow();
    });
  });
  describe("testMultiply", () => {

    it("** testMultiply1 - 1 * 1 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 * 1 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMultiply2 - 1 * 0 = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 * 0 = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMultiply3 - 1.2 * 1.8 = 2.16", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 * 1.8 = 2.16`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testDivide", () => {

    it("** testDivide1 - 1 / 1 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 / 1 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDivide2 - 4 / 2 = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 / 2 = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDivide3 - 4.0 / 2.0 = 2.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4.0 / 2.0 = 2.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDivide4 - 1 / 2 = 0.5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 / 2 = 0.5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDivide5 - 1.2 / 1.8 = 0.66666667", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.2 / 1.8 = 0.66666667`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDivide6 - 1 / 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 / 0`, subject);
          expect(result).toEqual([]);
    });
  });
  describe("testDiv", () => {

    it("** testDiv1 - 1 div 1 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 div 1 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDiv2 - 4 div 2 = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 div 2 = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDiv3 - 5 div 2 = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `5 div 2 = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDiv4 - 2.2 div 1.8 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.2 div 1.8 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testDiv5 - 5 div 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `5 div 0`, subject);
          expect(result).toEqual([]);
    });
  });
  describe("testMod", () => {

    it("** testMod1 - 1 mod 1 = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 mod 1 = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMod2 - 4 mod 2 = 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `4 mod 2 = 0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMod3 - 5 mod 2 = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `5 mod 2 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMod4 - 2.2 mod 1.8 = 0.4", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.2 mod 1.8 = 0.4`, subject);
          expect(result).toEqual([true]);
    });
    it("** testMod5 - 5 mod 0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `5 mod 0`, subject);
          expect(result).toEqual([]);
    });
  });
  describe("testRound", () => {

    it("** testRound1 - 1.round() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.round() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testRound2 - 3.14159.round(3) = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `3.14159.round(3) = 2`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testSqrt", () => {

    it("** testSqrt1 - 81.sqrt() = 9.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `81.sqrt() = 9.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testSqrt2 - (-1).sqrt()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1).sqrt()`, subject);
          expect(result).toEqual([]);
    });
  });
  describe("testAbs", () => {

    it("** testAbs1 - (-5).abs() = 5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-5).abs() = 5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAbs2 - (-5.5).abs() = 5.5", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-5.5).abs() = 5.5`, subject);
          expect(result).toEqual([true]);
    });
    it("** testAbs3 - (-5.5 'mg').abs() = 5.5 'mg'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-5.5 'mg').abs() = 5.5 'mg'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testCeiling", () => {

    it("** testCeiling1 - 1.ceiling() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.ceiling() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCeiling2 - (-1.1).ceiling() = -1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1.1).ceiling() = -1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testCeiling3 - 1.1.ceiling() = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.1.ceiling() = 2`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testExp", () => {

    it("** testExp1 - 0.exp() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `0.exp() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testExp2 - (-0.0).exp() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-0.0).exp() = 1`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testFloor", () => {

    it("** testFloor1 - 1.floor() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.floor() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testFloor2 - 2.1.floor() = 2", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.1.floor() = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** testFloor3 - (-2.1).floor() = -3", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-2.1).floor() = -3`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testLn", () => {

    it("** testLn1 - 1.ln() = 0.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.ln() = 0.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLn2 - 1.0.ln() = 0.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.ln() = 0.0`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testLog", () => {

    it("** testLog1 - 16.log(2) = 4.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `16.log(2) = 4.0`, subject);
          expect(result).toEqual([true]);
    });
    it("** testLog2 - 100.0.log(10.0) = 2.0", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `100.0.log(10.0) = 2.0`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testPower", () => {

    it("** testPower1 - 2.power(3) = 8", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.power(3) = 8`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPower2 - 2.5.power(2) = 6.25", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `2.5.power(2) = 6.25`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPower3 - (-1).power(0.5)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1).power(0.5)`, subject);
          expect(result).toEqual([]);
    });
  });
  describe("testTruncate", () => {

    it("** testTruncate1 - 101.truncate() = 101", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `101.truncate() = 101`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTruncate2 - 1.00000001.truncate() = 1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.00000001.truncate() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** testTruncate3 - (-1.56).truncate() = -1", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(-1.56).truncate() = -1`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testPrecedence", () => {

    it("** test unary precedence - -1.convertsToInteger()", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `-1.convertsToInteger()`, subject);
          }).toThrow();
    });
    it("** testPrecedence2 - 1+2*3+4 = 11", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1+2*3+4 = 11`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPrecedence3 - 1 > 2 is Boolean", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 > 2 is Boolean`, subject);
          expect(result).toEqual([true]);
    });
    it("** testPrecedence4 - 1 | 1 is Integer", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1 | 1 is Integer`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testVariables", () => {

    it("** testVariables1 - %sct = 'http://snomed.info/sct'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `%sct = 'http://snomed.info/sct'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testVariables2 - %loinc = 'http://loinc.org'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `%loinc = 'http://loinc.org'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testVariables3 - %ucum = 'http://unitsofmeasure.org'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `%ucum = 'http://unitsofmeasure.org'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testVariables4 - %`vs-administrative-gender` = 'http://hl7.org/fhir/ValueSet/administrative-gender'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `%\`vs-administrative-gender\` = 'http://hl7.org/fhir/ValueSet/administrative-gender'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testExtension", () => {

    it("** testExtension1 - Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime').exists()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime').exists()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testExtension2 - Patient.birthDate.extension(%`ext-patient-birthTime`).exists()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension(%\`ext-patient-birthTime\`).exists()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testExtension3 - Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime1').empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime1').empty()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("testType", () => {

    it("** testType1 - 1.type().namespace = 'System'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.type().namespace = 'System'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType2 - 1.type().name = 'Integer'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.type().name = 'Integer'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType3 - true.type().namespace = 'System'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.type().namespace = 'System'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType4 - true.type().name = 'Boolean'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.type().name = 'Boolean'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType5 - true.is(Boolean)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.is(Boolean)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType6 - true.is(System.Boolean)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true.is(System.Boolean)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType7 - true is Boolean", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true is Boolean`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType8 - true is System.Boolean", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `true is System.Boolean`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType9 - Patient.active.type().namespace = 'FHIR'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.active.type().namespace = 'FHIR'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType10 - Patient.active.type().name = 'boolean'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.active.type().name = 'boolean'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType11 - Patient.active.is(boolean)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.active.is(boolean)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType12 - Patient.active.is(Boolean).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.active.is(Boolean).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType13 - Patient.active.is(FHIR.boolean)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.active.is(FHIR.boolean)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType14 - Patient.active.is(System.Boolean).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.active.is(System.Boolean).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType15 - Patient.type().namespace = 'FHIR'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.type().namespace = 'FHIR'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType16 - Patient.type().name = 'Patient'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.type().name = 'Patient'`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType17 - Patient.is(Patient)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.is(Patient)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType18 - Patient.is(FHIR.Patient)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.is(FHIR.Patient)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType19 - Patient.is(FHIR.`Patient`)", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.is(FHIR.\`Patient\`)`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType20 - Patient.ofType(Patient).type().name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.ofType(Patient).type().name`, subject);
          expect(result).toEqual(["Patient"]);
    });
    it("** testType21 - Patient.ofType(FHIR.Patient).type().name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.ofType(FHIR.Patient).type().name`, subject);
          expect(result).toEqual(["Patient"]);
    });
    it("** testType22 - Patient.is(System.Patient).not()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.is(System.Patient).not()`, subject);
          expect(result).toEqual([true]);
    });
    it("** testType23 - Patient.ofType(FHIR.`Patient`).type().name", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.ofType(FHIR.\`Patient\`).type().name`, subject);
          expect(result).toEqual(["Patient"]);
    });
  });
  describe("testConformsTo", () => {

    it("** testConformsTo1 - conformsTo('http://hl7.org/fhir/StructureDefinition/Patient')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `conformsTo('http://hl7.org/fhir/StructureDefinition/Patient')`, subject);
          expect(result).toEqual([true]);
    });
    it("** testConformsTo2 - conformsTo('http://hl7.org/fhir/StructureDefinition/Person')", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `conformsTo('http://hl7.org/fhir/StructureDefinition/Person')`, subject);
          expect(result).toEqual([false]);
    });
    it("** testConformsTo3 - conformsTo('http://trash')", () => {
          // Input file: patient-example.json
          expect(() => {
            fhirpath(ctx, `conformsTo('http://trash')`, subject);
          }).toThrow();
    });
  });
  describe("from-Zulip", () => {

    it("** test - (true and 'foo').empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true and 'foo').empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - (true | 'foo').allTrue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `(true | 'foo').allTrue()`, subject);
          expect(result).toEqual([false]);
    });
  });
});
