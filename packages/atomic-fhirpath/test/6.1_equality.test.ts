import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./6.1_equality.json" with { type: "json" };

// Test file generated from 6.1_equality.yaml

describe("6.1_equality", () => {
  const ctx = {};

  it("6.1 Equality", () => {

  });
  describe("6.1.1. = (Equals)", () => {

    it("* string: comparison is based on Unicode values", () => {

    });
    it("** strings equals - 'abc' = 'abc'", () => {
          const result = fhirpath(ctx, `'abc' = 'abc'`, subject);
          expect(result).toEqual([true]);
    });
    it("** strings equals - Ops.str1 = Ops.str1", () => {
          const result = fhirpath(ctx, `Ops.str1 = Ops.str1`, subject);
          expect(result).toEqual([true]);
    });
    it("** strings not equals - 'abc' = 'abcd'", () => {
          const result = fhirpath(ctx, `'abc' = 'abcd'`, subject);
          expect(result).toEqual([false]);
    });
    it("** strings not equals - Ops.str1 = Ops.str2", () => {
          const result = fhirpath(ctx, `Ops.str1 = Ops.str2`, subject);
          expect(result).toEqual([false]);
    });
    it("** utf8 strings - 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' = 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ'", () => {
          const result = fhirpath(ctx, `'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' = 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ'`, subject);
          expect(result).toEqual([true]);
    });
    it("** utf8 strings - 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' = 'ə ɚ ɛ ɜ ɝ ɞ ɟ ɠɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ '", () => {
          const result = fhirpath(ctx, `'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' = 'ə ɚ ɛ ɜ ɝ ɞ ɟ ɠɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ '`, subject);
          expect(result).toEqual([false]);
    });
    it("* integer: values must be exactly equal", () => {

    });
    it("** equal - 1 = 1", () => {
          const result = fhirpath(ctx, `1 = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** equal - Ops.int1 = Ops.int1", () => {
          const result = fhirpath(ctx, `Ops.int1 = Ops.int1`, subject);
          expect(result).toEqual([true]);
    });
    it("** not equal - 1 = 2", () => {
          const result = fhirpath(ctx, `1 = 2`, subject);
          expect(result).toEqual([false]);
    });
    it("** not equal - Ops.int1 = Ops.int2", () => {
          const result = fhirpath(ctx, `Ops.int1 = Ops.int2`, subject);
          expect(result).toEqual([false]);
    });
    it("** equal, different types, but same values - 2 = 2L", () => {
          const result = fhirpath(ctx, `2 = 2L`, subject);
          expect(result).toEqual([true]);
    });
    it("** equal, different types, but same values (opposite order of operands) - 2L = 2", () => {
          const result = fhirpath(ctx, `2L = 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** equal, long integers - 2L = 2L", () => {
          const result = fhirpath(ctx, `2L = 2L`, subject);
          expect(result).toEqual([true]);
    });
    it("** not equal, long integers - 2L = 3L", () => {
          const result = fhirpath(ctx, `2L = 3L`, subject);
          expect(result).toEqual([false]);
    });
    it("* decimal: values must be equal, trailing zeroes are ignored", () => {

    });
    it("** decimals equal - 1.01 = 1.01", () => {
          const result = fhirpath(ctx, `1.01 = 1.01`, subject);
          expect(result).toEqual([true]);
    });
    it("** decimals equal, trailing zeroes are ignored - 0.01 = 00.01", () => {
          const result = fhirpath(ctx, `0.01 = 00.01`, subject);
          expect(result).toEqual([true]);
    });
    it("decimal not equal - 1.01 = 1.02", () => {
          const result = fhirpath(ctx, `1.01 = 1.02`, subject);
          expect(result).toEqual([false]);
    });
    it("decimal values should not be compared beyond the maximum precision - 0.1 + 0.1 + 0.1 = 0.3", () => {
          const result = fhirpath(ctx, `0.1 + 0.1 + 0.1 = 0.3`, subject);
          expect(result).toEqual([true]);
    });
    it("should take into account extensions for decimal values - (%factory.decimal(0.3, %factory.Extension('someExt', 'someString')) =\n %factory.decimal(0.30000000000000004, %factory.Extension('someExt', 'someString'))) |\n(%factory.decimal(0.3, %factory.Extension('someExt', 'someString1')) =\n %factory.decimal(0.30000000000000004, %factory.Extension('someExt', 'someString2')))", () => {
          const result = fhirpath(ctx, `(%factory.decimal(0.3, %factory.Extension('someExt', 'someString')) =
 %factory.decimal(0.30000000000000004, %factory.Extension('someExt', 'someString'))) |
(%factory.decimal(0.3, %factory.Extension('someExt', 'someString1')) =
 %factory.decimal(0.30000000000000004, %factory.Extension('someExt', 'someString2')))`, subject);
          expect(result).toEqual([true, false]);
    });
    it("* boolean: values must be the same", () => {

    });
    it("** equal - true = true", () => {
          const result = fhirpath(ctx, `true = true`, subject);
          expect(result).toEqual([true]);
    });
    it("** not equal - true = false", () => {
          const result = fhirpath(ctx, `true = false`, subject);
          expect(result).toEqual([false]);
    });
    it("** propagate empty coll - true = Ops.unexists", () => {
          const result = fhirpath(ctx, `true = Ops.unexists`, subject);
          expect(result).toEqual([]);
    });
    it("** equality for null values - Patient.name.given[0] = Patient.name.given[3]", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given[0] = Patient.name.given[3]`, subject);
          expect(result).toEqual([false]);
    });
    describe("Quantity Equality", () => {

      it("1 year != 1 'a'", () => {
            const result = fhirpath(ctx, `1 year != 1 'a'`, subject);
            expect(result).toEqual([true]);
      });
      it("12 months = 1 year", () => {
            const result = fhirpath(ctx, `12 months = 1 year`, subject);
            expect(result).toEqual([true]);
      });
      it("12 'mo' = 1 'a'", () => {
            const result = fhirpath(ctx, `12 'mo' = 1 'a'`, subject);
            expect(result).toEqual([true]);
      });
      it("1 year = 1 year", () => {
            const result = fhirpath(ctx, `1 year = 1 year`, subject);
            expect(result).toEqual([true]);
      });
      it("1 month != 1 'mo'", () => {
            const result = fhirpath(ctx, `1 month != 1 'mo'`, subject);
            expect(result).toEqual([true]);
      });
      it("1 month = 30 'd'", () => {
            const result = fhirpath(ctx, `1 month = 30 'd'`, subject);
            expect(result).toEqual([]);
      });
      it("1 month = 30 days", () => {
            const result = fhirpath(ctx, `1 month = 30 days`, subject);
            expect(result).toEqual([true]);
      });
      it("1 week = 1 'wk'", () => {
            const result = fhirpath(ctx, `1 week = 1 'wk'`, subject);
            expect(result).toEqual([]);
      });
      it("1 week = 7 days", () => {
            const result = fhirpath(ctx, `1 week = 7 days`, subject);
            expect(result).toEqual([true]);
      });
      it("1 day = 1 'd'", () => {
            const result = fhirpath(ctx, `1 day = 1 'd'`, subject);
            expect(result).toEqual([]);
      });
      it("1 day = 24 hours", () => {
            const result = fhirpath(ctx, `1 day = 24 hours`, subject);
            expect(result).toEqual([true]);
      });
      it("1 day = 24 'h'", () => {
            const result = fhirpath(ctx, `1 day = 24 'h'`, subject);
            expect(result).toEqual([]);
      });
      it("1 second = 1 's'", () => {
            const result = fhirpath(ctx, `1 second = 1 's'`, subject);
            expect(result).toEqual([true]);
      });
      it("10 'kg.m/s2' = 5 'kg' * 4 'm' / (2 seconds * 1000 'ms')", () => {
            const result = fhirpath(ctx, `10 'kg.m/s2' = 5 'kg' * 4 'm' / (2 seconds * 1000 'ms')`, subject);
            expect(result).toEqual([true]);
      });
    });
    it("* For complex types, equality requires all child properties to be equal, recursively.", () => {

    });
    it("** two objects - Ops.complex = Ops.complexsame", () => {
          const result = fhirpath(ctx, `Ops.complex = Ops.complexsame`, subject);
          expect(result).toEqual([true]);
    });
    it("** two objects not - Ops.complex = Ops.complexother", () => {
          const result = fhirpath(ctx, `Ops.complex = Ops.complexother`, subject);
          expect(result).toEqual([false]);
    });
    it("** two colls - Ops.coll = Ops.collsame", () => {
          const result = fhirpath(ctx, `Ops.coll = Ops.collsame`, subject);
          expect(result).toEqual([true]);
    });
    it("** two colls not - Ops.coll = Ops.collother", () => {
          const result = fhirpath(ctx, `Ops.coll = Ops.collother`, subject);
          expect(result).toEqual([false]);
    });
    it("** two colls + empty - Ops.coll = Ops.ups", () => {
          const result = fhirpath(ctx, `Ops.coll = Ops.ups`, subject);
          expect(result).toEqual([]);
    });
    it("** length mismatch - Ops.coll.a = 1", () => {
          const result = fhirpath(ctx, `Ops.coll.a = 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** length match - Ops.coll.a.first() = 1", () => {
          const result = fhirpath(ctx, `Ops.coll.a.first() = 1`, subject);
          expect(result).toEqual([true]);
    });
    it("** empty right - Ops.coll.a.first() = Ops.unexists", () => {
          const result = fhirpath(ctx, `Ops.coll.a.first() = Ops.unexists`, subject);
          expect(result).toEqual([]);
    });
    it("** empty left - Ops.unexists = Ops.coll.a.first()", () => {
          const result = fhirpath(ctx, `Ops.unexists = Ops.coll.a.first()`, subject);
          expect(result).toEqual([]);
    });
    describe("Dates & Times", () => {

      it("DateTime literal compared with DateTime - @2018 = @2018", () => {
            const result = fhirpath(ctx, `@2018 = @2018`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime - @2018 = @2017", () => {
            const result = fhirpath(ctx, `@2018 = @2017`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different precision DateTime (1) - @2018 = @2018-02", () => {
            const result = fhirpath(ctx, `@2018 = @2018-02`, subject);
            expect(result).toEqual([]);
      });
      it("DateTime literal compared with different precision DateTime (2) - @2018 = @2019-02", () => {
            const result = fhirpath(ctx, `@2018 = @2019-02`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (month) - @2018-02 = @2018-02", () => {
            const result = fhirpath(ctx, `@2018-02 = @2018-02`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (month) - @2018-02 = @2018-03", () => {
            const result = fhirpath(ctx, `@2018-02 = @2018-03`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (day) - @2018-02-02 = @2018-02-02", () => {
            const result = fhirpath(ctx, `@2018-02-02 = @2018-02-02`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (day) - @2018-02-02 = @2018-02-03", () => {
            const result = fhirpath(ctx, `@2018-02-02 = @2018-02-03`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (hour) - @2018-02-02T11 = @2018-02-02T11", () => {
            const result = fhirpath(ctx, `@2018-02-02T11 = @2018-02-02T11`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (hour) - @2018-02-02T11 = @2018-02-02T12", () => {
            const result = fhirpath(ctx, `@2018-02-02T11 = @2018-02-02T12`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with same time, diff. precision (hour) - @2018-02-02T11 = @2018-02-02T11:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T11 = @2018-02-02T11:00`, subject);
            expect(result).toEqual([]);
      });
      it("DateTime literal compared with DateTime (hour, tz) - @2018-02-02T11+04:00 = @2018-02-02T11+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T11+04:00 = @2018-02-02T11+04:00`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with same DateTime (hour, tz different) - @2018-02-02T22-04:00 = @2018-02-03T06+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T22-04:00 = @2018-02-03T06+04:00`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different precision DateTime (hour, tz diff) - @2018-02-02T22-04:00 = @2018-02-03T06:03+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T22-04:00 = @2018-02-03T06:03+04:00`, subject);
            expect(result).toEqual([]);
      });
      it("DateTime literal compared with different precision DateTime (hour, tz diff) - @2018-02-02T22-04:00 = @2018-02-03T05:03+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T22-04:00 = @2018-02-03T05:03+04:00`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different DateTime (hour,tz) - @2018-02-02T11+04:00 = @2018-02-02T12+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T11+04:00 = @2018-02-02T12+04:00`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (minute) - @2018-02-02T11:01 = @2018-02-02T11:01", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01 = @2018-02-02T11:01`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (minute) - @2018-02-02T11:01 = @2018-02-02T11:02", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01 = @2018-02-02T11:02`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (minute, tz) - @2018-02-02T11:01+04:00 = @2018-02-02T11:01+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01+04:00 = @2018-02-02T11:01+04:00`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (minute, tz) - @2018-02-02T11:01+04:00 = @2018-02-02T11:02+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01+04:00 = @2018-02-02T11:02+04:00`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (second) - @2018-02-02T11:01:03 = @2018-02-02T11:01:03", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01:03 = @2018-02-02T11:01:03`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (second) - @2018-02-02T11:01:03 = @2018-02-02T11:01:04", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01:03 = @2018-02-02T11:01:04`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with DateTime (millisecond) - @2018-02-02T11:01:03.123 = @2018-02-02T11:01:03.123", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01:03.123 = @2018-02-02T11:01:03.123`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime (millisecond) - @2018-02-02T11:01:03.123 = @2018-02-02T11:01:03.124", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01:03.123 = @2018-02-02T11:01:03.124`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different DateTime (timezone) - @2018-02-02T11:01:03.123+02:00 = @2018-02-02T11:01:03.123+04:00", () => {
            const result = fhirpath(ctx, `@2018-02-02T11:01:03.123+02:00 = @2018-02-02T11:01:03.123+04:00`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with same DateTime in resource (1) - @2018-02 = date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02 = date1.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with same DateTime in resource (2) - date1.toDate() = @2018-02", () => {
            const result = fhirpath(ctx, `date1.toDate() = @2018-02`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime in resource - @2018-01 = date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-01 = date1.toDate()`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different precision DateTime in resource - @2018-02-02 = date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02-02 = date1.toDate()`, subject);
            expect(result).toEqual([]);
      });
      it("DateTime literal compared with a number - @2018 = int1", () => {
            const result = fhirpath(ctx, `@2018 = int1`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with a string literal - @2018 = 'zzz'", () => {
            const result = fhirpath(ctx, `@2018 = 'zzz'`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different time - @T16:04:23 = @T18:04:24", () => {
            const result = fhirpath(ctx, `@T16:04:23 = @T18:04:24`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal (same time) - @T14:04:23 = @T14:04:23", () => {
            const result = fhirpath(ctx, `@T14:04:23 = @T14:04:23`, subject);
            expect(result).toEqual([true]);
      });
      it("Same time, different precision - @T14:04:23 = @T14:04", () => {
            const result = fhirpath(ctx, `@T14:04:23 = @T14:04`, subject);
            expect(result).toEqual([]);
      });
      it("Different time and different precision - @T14:05:23 = @T14:04", () => {
            const result = fhirpath(ctx, `@T14:05:23 = @T14:04`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with same time in resource - @T12:34:45 = time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34:45 = time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with different time in resource - @T12:34:46 = time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34:46 = time1.toTime()`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different precision time in resource - @T12 = time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12 = time1.toTime()`, subject);
            expect(result).toEqual([]);
      });
      it("should take into account extensions for date values - (%factory.date('2024-01-01', %factory.Extension('someExt', 'someString')) =\n %factory.date('2024-01-01', %factory.Extension('someExt', 'someString'))) |\n(%factory.date('2024-01-01', %factory.Extension('someExt', 'someString1')) =\n %factory.date('2024-01-01', %factory.Extension('someExt', 'someString2')))", () => {
            const result = fhirpath(ctx, `(%factory.date('2024-01-01', %factory.Extension('someExt', 'someString')) =
 %factory.date('2024-01-01', %factory.Extension('someExt', 'someString'))) |
(%factory.date('2024-01-01', %factory.Extension('someExt', 'someString1')) =
 %factory.date('2024-01-01', %factory.Extension('someExt', 'someString2')))`, subject);
            expect(result).toEqual([true, false]);
      });
    });
    it("** should not ignore null properties in arrays - Bundle.entry[1] != Bundle.entry[2]", () => {
          // Input file: patient-bundle.json
          const result = fhirpath(ctx, `Bundle.entry[1] != Bundle.entry[2]`, subject);
          expect(result).toEqual([true]);
    });
    it("** should take into account extension for primitives - Bundle.entry[1].resource.name.given[0] = Bundle.entry[2].resource.name.given[0]", () => {
          // Input file: patient-bundle.json
          const result = fhirpath(ctx, `Bundle.entry[1].resource.name.given[0] = Bundle.entry[2].resource.name.given[0]`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("6.1.2. ~ (Equivalent)", () => {

    it("* collections for equivalence { } ~ { } will result in true. - Ops.unexists ~ Ops.unexists", () => {
          const result = fhirpath(ctx, `Ops.unexists ~ Ops.unexists`, subject);
          expect(result).toEqual([true]);
    });
    it("* string: the strings must be the same while ignoring case and normalizing whitespace. - 'ab c' ~ 'Ab  C'", () => {
          const result = fhirpath(ctx, `'ab c' ~ 'Ab  C'`, subject);
          expect(result).toEqual([true]);
    });
    it("decimal: values must be equal, comparison is done on values rounded\nto the precision of the least precise operand.\nTrailing zeroes are ignored in  determining precision.\n - 1.001 ~ 01.0012", () => {
          const result = fhirpath(ctx, `1.001 ~ 01.0012`, subject);
          expect(result).toEqual([true]);
    });
    it("** equivalence of integer and long - 2 ~ 2L", () => {
          const result = fhirpath(ctx, `2 ~ 2L`, subject);
          expect(result).toEqual([true]);
    });
    it("** non-equivalence of integer and long - 1 ~ 2L", () => {
          const result = fhirpath(ctx, `1 ~ 2L`, subject);
          expect(result).toEqual([false]);
    });
    describe("trailing zeros after decimal", () => {

      it("1.100 ~ 1.1", () => {
            const result = fhirpath(ctx, `1.100 ~ 1.1`, subject);
            expect(result).toEqual([true]);
      });
      it("1.100 ~ 1.101", () => {
            const result = fhirpath(ctx, `1.100 ~ 1.101`, subject);
            expect(result).toEqual([true]);
      });
      it("1.1 ~ 1.0", () => {
            const result = fhirpath(ctx, `1.1 ~ 1.0`, subject);
            expect(result).toEqual([true]);
      });
      it("1.1 ~ 1.00", () => {
            const result = fhirpath(ctx, `1.1 ~ 1.00`, subject);
            expect(result).toEqual([true]);
      });
      it("1.10 ~ 1.00", () => {
            const result = fhirpath(ctx, `1.10 ~ 1.00`, subject);
            expect(result).toEqual([true]);
      });
      it("11 ~ 10", () => {
            const result = fhirpath(ctx, `11 ~ 10`, subject);
            expect(result).toEqual([false]);
      });
      it("12 ~ 11", () => {
            const result = fhirpath(ctx, `12 ~ 11`, subject);
            expect(result).toEqual([false]);
      });
    });
    it("1.1 ~ 1.2", () => {
          const result = fhirpath(ctx, `1.1 ~ 1.2`, subject);
          expect(result).toEqual([false]);
    });
    it("0.00000011 ~ 0.00000012", () => {
          const result = fhirpath(ctx, `0.00000011 ~ 0.00000012`, subject);
          expect(result).toEqual([false]);
    });
    it("0.00000011 ~ 0.00000010", () => {
          const result = fhirpath(ctx, `0.00000011 ~ 0.00000010`, subject);
          expect(result).toEqual([true]);
    });
    it("0 ~ 0.00000010", () => {
          const result = fhirpath(ctx, `0 ~ 0.00000010`, subject);
          expect(result).toEqual([true]);
    });
    it("1 ~ 0.00000010", () => {
          const result = fhirpath(ctx, `1 ~ 0.00000010`, subject);
          expect(result).toEqual([false]);
    });
    it("0.010 ~ 0.00000010", () => {
          const result = fhirpath(ctx, `0.010 ~ 0.00000010`, subject);
          expect(result).toEqual([false]);
    });
    describe("Quantity Equivalence", () => {

      it("1 year ~ 1 'a'", () => {
            const result = fhirpath(ctx, `1 year ~ 1 'a'`, subject);
            expect(result).toEqual([true]);
      });
      it("12 months ~ 1 'a'", () => {
            const result = fhirpath(ctx, `12 months ~ 1 'a'`, subject);
            expect(result).toEqual([true]);
      });
      it("1 month ~ 1 'mo'", () => {
            const result = fhirpath(ctx, `1 month ~ 1 'mo'`, subject);
            expect(result).toEqual([true]);
      });
      it("30 days ~ 1 'mo'", () => {
            const result = fhirpath(ctx, `30 days ~ 1 'mo'`, subject);
            expect(result).toEqual([true]);
      });
    });
    describe("Dates & Times", () => {

      it("DateTime literal compared with DateTime - @2018 ~ @2018", () => {
            const result = fhirpath(ctx, `@2018 ~ @2018`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime - @2018 ~ @2017", () => {
            const result = fhirpath(ctx, `@2018 ~ @2017`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different precision DateTime - @2018 ~ @2018-02", () => {
            const result = fhirpath(ctx, `@2018 ~ @2018-02`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with same DateTime in resource - @2018-02 ~ date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02 ~ date1.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different DateTime in resource - @2018-01 ~ date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-01 ~ date1.toDate()`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different precision DateTime in resource - @2018-02-02 ~ date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02-02 ~ date1.toDate()`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with same time - @T18:04:23 ~ @T18:04:23", () => {
            const result = fhirpath(ctx, `@T18:04:23 ~ @T18:04:23`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with different time - @T18:04:23 ~ @T18:04:24", () => {
            const result = fhirpath(ctx, `@T18:04:23 ~ @T18:04:24`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with same time in resource - @T12:34:45 ~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34:45 ~ time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with different time in resource - @T12:35:46 ~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:35:46 ~ time1.toTime()`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different precision time in resource - @T12:34:46.123 ~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34:46.123 ~ time1.toTime()`, subject);
            expect(result).toEqual([false]);
      });
    });
    it("* For complex types, equivalence requires all child properties to be equivalent, recursively. - Ops.complex ~ Ops.complexsimilar", () => {
          const result = fhirpath(ctx, `Ops.complex ~ Ops.complexsimilar`, subject);
          expect(result).toEqual([true]);
    });
    it("* For complex types, equivalence requires all child properties to be equivalent, recursively. - Ops.complex ~ Ops.complexother", () => {
          const result = fhirpath(ctx, `Ops.complex ~ Ops.complexother`, subject);
          expect(result).toEqual([false]);
    });
    it("** equivalence for null values - Patient.name.given[0] ~ Patient.name.given[3]", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given[0] ~ Patient.name.given[3]`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("6.1.3. != (Not Equals)", () => {

    it("* string: comparison is based on Unicode values", () => {

    });
    it("** strings equals - 'abc' != 'abc'", () => {
          const result = fhirpath(ctx, `'abc' != 'abc'`, subject);
          expect(result).toEqual([false]);
    });
    it("** strings equals - Ops.str1 != Ops.str1", () => {
          const result = fhirpath(ctx, `Ops.str1 != Ops.str1`, subject);
          expect(result).toEqual([false]);
    });
    it("** strings not equals - 'abc' != 'abcd'", () => {
          const result = fhirpath(ctx, `'abc' != 'abcd'`, subject);
          expect(result).toEqual([true]);
    });
    it("** strings not equals - Ops.str1 != Ops.str2", () => {
          const result = fhirpath(ctx, `Ops.str1 != Ops.str2`, subject);
          expect(result).toEqual([true]);
    });
    it("** utf8 strings - 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' != 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ'", () => {
          const result = fhirpath(ctx, `'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' != 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ'`, subject);
          expect(result).toEqual([false]);
    });
    it("** utf8 strings - 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' != 'ə ɚ ɛ ɜ ɝ ɞ ɟ ɠɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ '", () => {
          const result = fhirpath(ctx, `'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ' != 'ə ɚ ɛ ɜ ɝ ɞ ɟ ɠɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ '`, subject);
          expect(result).toEqual([true]);
    });
    it("* integer: values must be exactly equal", () => {

    });
    it("** equal - 1 != 1", () => {
          const result = fhirpath(ctx, `1 != 1`, subject);
          expect(result).toEqual([false]);
    });
    it("** equal - Ops.int1 != Ops.int1", () => {
          const result = fhirpath(ctx, `Ops.int1 != Ops.int1`, subject);
          expect(result).toEqual([false]);
    });
    it("** not equal - 1 != 2", () => {
          const result = fhirpath(ctx, `1 != 2`, subject);
          expect(result).toEqual([true]);
    });
    it("** not equal - Ops.int1 != Ops.int2", () => {
          const result = fhirpath(ctx, `Ops.int1 != Ops.int2`, subject);
          expect(result).toEqual([true]);
    });
    it("** equal, different types, but same values - 2 != 2L", () => {
          const result = fhirpath(ctx, `2 != 2L`, subject);
          expect(result).toEqual([false]);
    });
    it("** equal, different types, but same values (opposite order of operands) - 2L != 2", () => {
          const result = fhirpath(ctx, `2L != 2`, subject);
          expect(result).toEqual([false]);
    });
    it("** equal, long integers - 2L != 2L", () => {
          const result = fhirpath(ctx, `2L != 2L`, subject);
          expect(result).toEqual([false]);
    });
    it("** not equal, long integers - 1L != 2L", () => {
          const result = fhirpath(ctx, `1L != 2L`, subject);
          expect(result).toEqual([true]);
    });
    it("* decimal: values must be equal, trailing zeroes are ignored", () => {

    });
    it("** decimals equal - 1.01 != 1.01", () => {
          const result = fhirpath(ctx, `1.01 != 1.01`, subject);
          expect(result).toEqual([false]);
    });
    it("** decimals equal, trailing zeroes are ignored - 0.01 != 00.01", () => {
          const result = fhirpath(ctx, `0.01 != 00.01`, subject);
          expect(result).toEqual([false]);
    });
    it("decimal not equal - 1.01 != 1.02", () => {
          const result = fhirpath(ctx, `1.01 != 1.02`, subject);
          expect(result).toEqual([true]);
    });
    it("* boolean: values must be the same", () => {

    });
    it("** equal - true != true", () => {
          const result = fhirpath(ctx, `true != true`, subject);
          expect(result).toEqual([false]);
    });
    it("** not equal - true != false", () => {
          const result = fhirpath(ctx, `true != false`, subject);
          expect(result).toEqual([true]);
    });
    it("** propagate empty coll - true != Ops.unexists", () => {
          const result = fhirpath(ctx, `true != Ops.unexists`, subject);
          expect(result).toEqual([]);
    });
    it("** inequality for null values - Patient.name.given[0] != Patient.name.given[3]", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given[0] != Patient.name.given[3]`, subject);
          expect(result).toEqual([true]);
    });
    describe("Dates & Times", () => {

      it("DateTime literal compared with DateTime - @2018 != @2018", () => {
            const result = fhirpath(ctx, `@2018 != @2018`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different DateTime - @2018 != @2017", () => {
            const result = fhirpath(ctx, `@2018 != @2017`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different precision DateTime (1) - @2018 != @2018-02", () => {
            const result = fhirpath(ctx, `@2018 != @2018-02`, subject);
            expect(result).toEqual([]);
      });
      it("DateTime literal compared with different precision DateTime (2) - @2018 != @2018-01", () => {
            const result = fhirpath(ctx, `@2018 != @2018-01`, subject);
            expect(result).toEqual([]);
      });
      it("DateTime literal compared with different precision DateTime (3) - @2018-02-03 != @2018-01", () => {
            const result = fhirpath(ctx, `@2018-02-03 != @2018-01`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with same DateTime in resource - @2018-02 != date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02 != date1.toDate()`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different DateTime in resource - @2018-01 != date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-01 != date1.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different precision DateTime in resource - @2018-02-02 != date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02-02 != date1.toDate()`, subject);
            expect(result).toEqual([]);
      });
      it("Time literal compared with same time - @T18:04:23 != @T18:04:23", () => {
            const result = fhirpath(ctx, `@T18:04:23 != @T18:04:23`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different time - @T18:04:23 != @T18:04:24", () => {
            const result = fhirpath(ctx, `@T18:04:23 != @T18:04:24`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with same time in resource - @T12:34:45 != time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34:45 != time1.toTime()`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different time in resource - @T12:35:46 != time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:35:46 != time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with different precision time in resource (1) - @T12:34 != time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34 != time1.toTime()`, subject);
            expect(result).toEqual([]);
      });
      it("Time literal compared with different precision time in resource (2) - @T12:35 != time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:35 != time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
    });
  });
  describe("6.1.4. !~ (Not Equivalent)", () => {

    it("** equivalence of integer and long - 2 !~ 2L", () => {
          const result = fhirpath(ctx, `2 !~ 2L`, subject);
          expect(result).toEqual([false]);
    });
    it("** non-equivalence of integer and long - 1 !~ 2L", () => {
          const result = fhirpath(ctx, `1 !~ 2L`, subject);
          expect(result).toEqual([true]);
    });
    describe("Dates & Times", () => {

      it("DateTime literal compared with DateTime - @2018 !~ @2018", () => {
            const result = fhirpath(ctx, `@2018 !~ @2018`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different DateTime - @2018 !~ @2017", () => {
            const result = fhirpath(ctx, `@2018 !~ @2017`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different precision DateTime (1) - @2018 !~ @2018-02", () => {
            const result = fhirpath(ctx, `@2018 !~ @2018-02`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different precision DateTime (2) - @2019 !~ @2018-02", () => {
            const result = fhirpath(ctx, `@2019 !~ @2018-02`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with same DateTime in resource - @2018-02 !~ date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02 !~ date1.toDate()`, subject);
            expect(result).toEqual([false]);
      });
      it("DateTime literal compared with different DateTime in resource - @2018-01 !~ date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-01 !~ date1.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("DateTime literal compared with different precision DateTime in resource - @2018-02-02 !~ date1.toDate()", () => {
            const result = fhirpath(ctx, `@2018-02-02 !~ date1.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with same time - @T18:04:23 !~ @T18:04:23", () => {
            const result = fhirpath(ctx, `@T18:04:23 !~ @T18:04:23`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different time - @T18:04:23 !~ @T18:04:24", () => {
            const result = fhirpath(ctx, `@T18:04:23 !~ @T18:04:24`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with same time in resource - @T12:34:45 !~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34:45 !~ time1.toTime()`, subject);
            expect(result).toEqual([false]);
      });
      it("Time literal compared with different time in resource - @T12:35:46 !~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:35:46 !~ time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with different precision time in resource (1) - @T12:34 !~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:34 !~ time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Time literal compared with different precision time in resource (2) - @T12:35 !~ time1.toTime()", () => {
            const result = fhirpath(ctx, `@T12:35 !~ time1.toTime()`, subject);
            expect(result).toEqual([true]);
      });
    });
    it("* collections for equivalence { } !~ { } will result in true. - Ops.unexists !~ Ops.unexists", () => {
          const result = fhirpath(ctx, `Ops.unexists !~ Ops.unexists`, subject);
          expect(result).toEqual([false]);
    });
    it("** non-equivalence for null values - Patient.name.given[0] !~ Patient.name.given[3]", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given[0] !~ Patient.name.given[3]`, subject);
          expect(result).toEqual([false]);
    });
    it("** should not take into account extension for primitives - Bundle.entry[1].resource.name.given[0] ~ Bundle.entry[2].resource.name.given[0]", () => {
          // Input file: patient-bundle.json
          const result = fhirpath(ctx, `Bundle.entry[1].resource.name.given[0] ~ Bundle.entry[2].resource.name.given[0]`, subject);
          expect(result).toEqual([true]);
    });
    it("* string: the strings must be the same while ignoring case and normalizing whitespace. - 'ab c' !~ 'Ab  C'", () => {
          const result = fhirpath(ctx, `'ab c' !~ 'Ab  C'`, subject);
          expect(result).toEqual([false]);
    });
    it("decimal: values must be equal, comparison is done on values rounded\nto the precision of the least precise operand.\nTrailing zeroes are ignored in  determining precision.\n - 1.001 !~ 01.0012", () => {
          const result = fhirpath(ctx, `1.001 !~ 01.0012`, subject);
          expect(result).toEqual([false]);
    });
  });
});
