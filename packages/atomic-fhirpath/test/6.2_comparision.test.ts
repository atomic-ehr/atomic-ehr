import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./6.2_comparision.json" with { type: "json" };

// Test file generated from 6.2_comparision.yaml

describe("6.2_comparision", () => {
  const ctx = {};

  it("less than, expecting true - a < b", () => {
        const result = fhirpath(ctx, `a < b`, subject);
        expect(result).toEqual([true]);
  });
  it("less than, expecting false - b < a", () => {
        const result = fhirpath(ctx, `b < a`, subject);
        expect(result).toEqual([false]);
  });
  it("less than, with mismatched types - c < d", () => {
        expect(() => {
          fhirpath(ctx, `c < d`, subject);
        }).toThrow();
  });
  it("less than, with empty value - c < e", () => {
        const result = fhirpath(ctx, `c < e`, subject);
        expect(result).toEqual([]);
  });
  it("less than, with null value - c < i", () => {
        const result = fhirpath(ctx, `c < i`, subject);
        expect(result).toEqual([]);
  });
  it("less than, with too many values - c < g", () => {
        expect(() => {
          fhirpath(ctx, `c < g`, subject);
        }).toThrow();
  });
  it("less than, expecting true - a < h", () => {
        const result = fhirpath(ctx, `a < h`, subject);
        expect(result).toEqual([true]);
  });
  it("less than, expecting false - j < d", () => {
        const result = fhirpath(ctx, `j < d`, subject);
        expect(result).toEqual([false]);
  });
  it("less than, with long numbers - -7L < 3L", () => {
        const result = fhirpath(ctx, `-7L < 3L`, subject);
        expect(result).toEqual([true]);
  });
  it("less than, with long number and integer - 2L < 3", () => {
        const result = fhirpath(ctx, `2L < 3`, subject);
        expect(result).toEqual([true]);
  });
  it("less than, with long number and decimal - 3L < 3.1", () => {
        const result = fhirpath(ctx, `3L < 3.1`, subject);
        expect(result).toEqual([true]);
  });
  it("greater than, expecting true - b > a", () => {
        const result = fhirpath(ctx, `b > a`, subject);
        expect(result).toEqual([true]);
  });
  it("greater than, expecting false - a > b", () => {
        const result = fhirpath(ctx, `a > b`, subject);
        expect(result).toEqual([false]);
  });
  it("greater than, with mismatched types - d > c", () => {
        expect(() => {
          fhirpath(ctx, `d > c`, subject);
        }).toThrow();
  });
  it("greater than, with empty value - e > a", () => {
        const result = fhirpath(ctx, `e > a`, subject);
        expect(result).toEqual([]);
  });
  it("greater than, with null value - c > i", () => {
        const result = fhirpath(ctx, `c > i`, subject);
        expect(result).toEqual([]);
  });
  it("greater than, with too many values - c > g", () => {
        expect(() => {
          fhirpath(ctx, `c > g`, subject);
        }).toThrow();
  });
  it("greater than, expecting true - h > a", () => {
        const result = fhirpath(ctx, `h > a`, subject);
        expect(result).toEqual([true]);
  });
  it("greater than, expecting false - d > j", () => {
        const result = fhirpath(ctx, `d > j`, subject);
        expect(result).toEqual([false]);
  });
  it("greater than, with long numbers - 3L > -7L", () => {
        const result = fhirpath(ctx, `3L > -7L`, subject);
        expect(result).toEqual([true]);
  });
  it("greater than, with long number and integer - 3 > 2L", () => {
        const result = fhirpath(ctx, `3 > 2L`, subject);
        expect(result).toEqual([true]);
  });
  it("greater than, with long number and decimal - 3.1 > 3L", () => {
        const result = fhirpath(ctx, `3.1 > 3L`, subject);
        expect(result).toEqual([true]);
  });
  it("greater or equal than, expecting true - b >= c", () => {
        const result = fhirpath(ctx, `b >= c`, subject);
        expect(result).toEqual([true]);
  });
  it("greater or equal than, expecting false - a >= b", () => {
        const result = fhirpath(ctx, `a >= b`, subject);
        expect(result).toEqual([false]);
  });
  it("greater or equal than, with mismatched types - d >= c", () => {
        expect(() => {
          fhirpath(ctx, `d >= c`, subject);
        }).toThrow();
  });
  it("greater or equal than, with empty value - e >= a", () => {
        const result = fhirpath(ctx, `e >= a`, subject);
        expect(result).toEqual([]);
  });
  it("greater or equal than, with null value - c >= i", () => {
        const result = fhirpath(ctx, `c >= i`, subject);
        expect(result).toEqual([]);
  });
  it("greater or equal than, with too many values - c >= g", () => {
        expect(() => {
          fhirpath(ctx, `c >= g`, subject);
        }).toThrow();
  });
  it("greater or equal than, expecting true - c >= h", () => {
        const result = fhirpath(ctx, `c >= h`, subject);
        expect(result).toEqual([true]);
  });
  it("greater or equal than, expecting false - d >= j", () => {
        const result = fhirpath(ctx, `d >= j`, subject);
        expect(result).toEqual([false]);
  });
  it("greater or equal than, with long numbers - 3L >= -7L", () => {
        const result = fhirpath(ctx, `3L >= -7L`, subject);
        expect(result).toEqual([true]);
  });
  it("greater or equal than, with long number and integer - 3 >= 2L", () => {
        const result = fhirpath(ctx, `3 >= 2L`, subject);
        expect(result).toEqual([true]);
  });
  it("greater or equal than, with long number and decimal - 3.1 >= 3L", () => {
        const result = fhirpath(ctx, `3.1 >= 3L`, subject);
        expect(result).toEqual([true]);
  });
  it("less or equal than, expecting true - b <= c", () => {
        const result = fhirpath(ctx, `b <= c`, subject);
        expect(result).toEqual([true]);
  });
  it("less than or equal, expecting false - b <= a", () => {
        const result = fhirpath(ctx, `b <= a`, subject);
        expect(result).toEqual([false]);
  });
  it("less or equal than, with mismatched types - c <= d", () => {
        expect(() => {
          fhirpath(ctx, `c <= d`, subject);
        }).toThrow();
  });
  it("less or equal than, with empty value - c <= e", () => {
        const result = fhirpath(ctx, `c <= e`, subject);
        expect(result).toEqual([]);
  });
  it("less or equal than, with null value - c <= i", () => {
        const result = fhirpath(ctx, `c <= i`, subject);
        expect(result).toEqual([]);
  });
  it("less than equal, with too many values - a <= h", () => {
        expect(() => {
          fhirpath(ctx, `a <= h`, subject);
        }).toThrow();
  });
  it("less or equal than, expecting true - a <= h", () => {
        const result = fhirpath(ctx, `a <= h`, subject);
        expect(result).toEqual([true]);
  });
  it("less than or equal, expecting false - j <= d", () => {
        const result = fhirpath(ctx, `j <= d`, subject);
        expect(result).toEqual([false]);
  });
  it("less than or equal, with long numbers - -7L <= 3L", () => {
        const result = fhirpath(ctx, `-7L <= 3L`, subject);
        expect(result).toEqual([true]);
  });
  it("less than or equal, with long number and integer - 2L <= 3", () => {
        const result = fhirpath(ctx, `2L <= 3`, subject);
        expect(result).toEqual([true]);
  });
  it("less than or equal, with long number and decimal - 3L <= 3.1", () => {
        const result = fhirpath(ctx, `3L <= 3.1`, subject);
        expect(result).toEqual([true]);
  });
  describe("Quantities", () => {

    it("1 year > 1 'a'", () => {
          const result = fhirpath(ctx, `1 year > 1 'a'`, subject);
          expect(result).toEqual([]);
    });
    it("1 's' > 1 year", () => {
          const result = fhirpath(ctx, `1 's' > 1 year`, subject);
          expect(result).toEqual([]);
    });
    it("1 'min' < 2 minutes", () => {
          const result = fhirpath(ctx, `1 'min' < 2 minutes`, subject);
          expect(result).toEqual([]);
    });
    it("1 'kg' < 2 's'", () => {
          const result = fhirpath(ctx, `1 'kg' < 2 's'`, subject);
          expect(result).toEqual([]);
    });
    it("1 year > 12 months", () => {
          const result = fhirpath(ctx, `1 year > 12 months`, subject);
          expect(result).toEqual([false]);
    });
    it("1 year < 12 months", () => {
          const result = fhirpath(ctx, `1 year < 12 months`, subject);
          expect(result).toEqual([false]);
    });
    it("1 minute > 59 seconds", () => {
          const result = fhirpath(ctx, `1 minute > 59 seconds`, subject);
          expect(result).toEqual([true]);
    });
    it("1 minute < 61 seconds", () => {
          const result = fhirpath(ctx, `1 minute < 61 seconds`, subject);
          expect(result).toEqual([true]);
    });
    it("1 'min' < 61 seconds", () => {
          const result = fhirpath(ctx, `1 'min' < 61 seconds`, subject);
          expect(result).toEqual([true]);
    });
    it("10 seconds > 1 's'", () => {
          const result = fhirpath(ctx, `10 seconds > 1 's'`, subject);
          expect(result).toEqual([true]);
    });
    it("10 seconds < 1 's'", () => {
          const result = fhirpath(ctx, `10 seconds < 1 's'`, subject);
          expect(result).toEqual([false]);
    });
    it("1 's' > 10 seconds", () => {
          const result = fhirpath(ctx, `1 's' > 10 seconds`, subject);
          expect(result).toEqual([false]);
    });
    it("1 's' < 10 seconds", () => {
          const result = fhirpath(ctx, `1 's' < 10 seconds`, subject);
          expect(result).toEqual([true]);
    });
    it("999 'g' < 1 'kg'", () => {
          const result = fhirpath(ctx, `999 'g' < 1 'kg'`, subject);
          expect(result).toEqual([true]);
    });
    it("999 'g' > 1 'kg'", () => {
          const result = fhirpath(ctx, `999 'g' > 1 'kg'`, subject);
          expect(result).toEqual([false]);
    });
    it("1001 'g' > 1 'kg'", () => {
          const result = fhirpath(ctx, `1001 'g' > 1 'kg'`, subject);
          expect(result).toEqual([true]);
    });
    it("1001 'g' < 1 'kg'", () => {
          const result = fhirpath(ctx, `1001 'g' < 1 'kg'`, subject);
          expect(result).toEqual([false]);
    });
  });
  describe("Dates & Times", () => {

    describe("Date >", () => {

      it("@2018 > @2019", () => {
            const result = fhirpath(ctx, `@2018 > @2019`, subject);
            expect(result).toEqual([false]);
      });
      it("@2018 > @2017", () => {
            const result = fhirpath(ctx, `@2018 > @2017`, subject);
            expect(result).toEqual([true]);
      });
      it("Raise error on type comparison with string - @2018 > d", () => {
            expect(() => {
              fhirpath(ctx, `@2018 > d`, subject);
            }).toThrow();
      });
      it("Raise error on type comparison with integer - @2018 > a", () => {
            expect(() => {
              fhirpath(ctx, `@2018 > a`, subject);
            }).toThrow();
      });
      it("Raise error on type comparison with Time - @2018 > @T12:34", () => {
            expect(() => {
              fhirpath(ctx, `@2018 > @T12:34`, subject);
            }).toThrow();
      });
      it("Comparison based on the lesser precision (1) - @2018-12-31 > @2018", () => {
            const result = fhirpath(ctx, `@2018-12-31 > @2018`, subject);
            expect(result).toEqual([]);
      });
      it("Comparison based on the lesser precision (2) - @2018 > @2017-01", () => {
            const result = fhirpath(ctx, `@2018 > @2017-01`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later Date from resource - @2018-12-21 > date.toDate()", () => {
            const result = fhirpath(ctx, `@2018-12-21 > date.toDate()`, subject);
            expect(result).toEqual([false]);
      });
    });
    describe("Date >=", () => {

      it("Comparison with earlier Date - @2018 >= @2017", () => {
            const result = fhirpath(ctx, `@2018 >= @2017`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with equal Date - @2018 >= @2018", () => {
            const result = fhirpath(ctx, `@2018 >= @2018`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later Date - @2018 >= @2019", () => {
            const result = fhirpath(ctx, `@2018 >= @2019`, subject);
            expect(result).toEqual([false]);
      });
      it("Comparison with earlier Date from resource - @2020 >= date.toDate()", () => {
            const result = fhirpath(ctx, `@2020 >= date.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with equal Date from resource - @2019-02-25 >= date.toDate()", () => {
            const result = fhirpath(ctx, `@2019-02-25 >= date.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later Date from resource - @2018 >= date.toDate()", () => {
            const result = fhirpath(ctx, `@2018 >= date.toDate()`, subject);
            expect(result).toEqual([false]);
      });
    });
    describe("Date <=", () => {

      it("Comparison with earlier Date - @2018 <= @2017", () => {
            const result = fhirpath(ctx, `@2018 <= @2017`, subject);
            expect(result).toEqual([false]);
      });
      it("Comparison with equal Date - @2018 <= @2018", () => {
            const result = fhirpath(ctx, `@2018 <= @2018`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later Date - @2018 <= @2019", () => {
            const result = fhirpath(ctx, `@2018 <= @2019`, subject);
            expect(result).toEqual([true]);
      });
    });
    describe("Date <", () => {

      it("Comparison with earlier Date - @2018 < @2017", () => {
            const result = fhirpath(ctx, `@2018 < @2017`, subject);
            expect(result).toEqual([false]);
      });
      it("Comparison with equal Date - @2018 < @2018", () => {
            const result = fhirpath(ctx, `@2018 < @2018`, subject);
            expect(result).toEqual([false]);
      });
      it("Comparison with later Date - @2018 < @2019", () => {
            const result = fhirpath(ctx, `@2018 < @2019`, subject);
            expect(result).toEqual([true]);
      });
    });
    describe("DateTime", () => {

      it("Same date, same time - @2018-12-21T12:01 > @2018-12-21T12:01", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:01 > @2018-12-21T12:01`, subject);
            expect(result).toEqual([false]);
      });
      it("Same date, different time (1) - @2018-12-21T12:01 > @2018-12-21T12:02", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:01 > @2018-12-21T12:02`, subject);
            expect(result).toEqual([false]);
      });
      it("Same date, different time (2) - @2018-12-21T12:02 > @2018-12-21T12:01", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:02 > @2018-12-21T12:01`, subject);
            expect(result).toEqual([true]);
      });
      it("Different dates & times (1) - @2018-12-22T12:02 > @2018-12-21T12:01", () => {
            const result = fhirpath(ctx, `@2018-12-22T12:02 > @2018-12-21T12:01`, subject);
            expect(result).toEqual([true]);
      });
      it("Different dates & times (1) - @2018-12-20T12:02 > @2018-12-21T12:01", () => {
            const result = fhirpath(ctx, `@2018-12-20T12:02 > @2018-12-21T12:01`, subject);
            expect(result).toEqual([false]);
      });
      it("Comparison with differnet precision (1) - @2018-12-20T12 > @2018-12-20T12:01", () => {
            const result = fhirpath(ctx, `@2018-12-20T12 > @2018-12-20T12:01`, subject);
            expect(result).toEqual([]);
      });
      it("Comparison with differnet precision (2) - @2018-12-20T12 > @2018-12-20T11:01", () => {
            const result = fhirpath(ctx, `@2018-12-20T12 > @2018-12-20T11:01`, subject);
            expect(result).toEqual([true]);
      });
      it("Time zone differences (1) - @2018-12-21T12:02+03:00 > @2018-12-21T12:01+02:00", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:02+03:00 > @2018-12-21T12:01+02:00`, subject);
            expect(result).toEqual([false]);
      });
      it("Time zone differences (2) - @2018-12-21T12:02+02:00 > @2018-12-21T12:01+03:00", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:02+02:00 > @2018-12-21T12:01+03:00`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later Date from resource - @2018-12-21 < date.toDate()", () => {
            const result = fhirpath(ctx, `@2018-12-21 < date.toDate()`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later DateTime from resource - @2018-12-21T12:02+02:00 < dateTime.toDateTime()", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:02+02:00 < dateTime.toDateTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later DateTime from resource (2) - @2018-12-21T12:02+02:00 > dateTime.toDateTime()", () => {
            const result = fhirpath(ctx, `@2018-12-21T12:02+02:00 > dateTime.toDateTime()`, subject);
            expect(result).toEqual([false]);
      });
      it("@2020-08-04T12:34 < @2020", () => {
            const result = fhirpath(ctx, `@2020-08-04T12:34 < @2020`, subject);
            expect(result).toEqual([]);
      });
    });
    describe("Time", () => {

      it("Time comparison; GT (1) - @T12:03 > @T12:01", () => {
            const result = fhirpath(ctx, `@T12:03 > @T12:01`, subject);
            expect(result).toEqual([true]);
      });
      it("Time comparison; GT (2) - @T12:01 > @T12:03", () => {
            const result = fhirpath(ctx, `@T12:01 > @T12:03`, subject);
            expect(result).toEqual([false]);
      });
      it("Time comparison; GT (3) - @T12:01:34.123 > @T12:01:34.122", () => {
            const result = fhirpath(ctx, `@T12:01:34.123 > @T12:01:34.122`, subject);
            expect(result).toEqual([true]);
      });
      it("Time comparison with based on lesser precision (1) - @T12:01 > @T12", () => {
            const result = fhirpath(ctx, `@T12:01 > @T12`, subject);
            expect(result).toEqual([]);
      });
      it("Time comparison with based on lesser precision (2) - @T12:02:34.324 > @T12:01", () => {
            const result = fhirpath(ctx, `@T12:02:34.324 > @T12:01`, subject);
            expect(result).toEqual([true]);
      });
      it("Time comparison with based on lesser precision (3) - @T13 > @T12:02:34.324", () => {
            const result = fhirpath(ctx, `@T13 > @T12:02:34.324`, subject);
            expect(result).toEqual([true]);
      });
      it("Time comparison with based on lesser precision (4) - @T12:02:34.324 > @T12", () => {
            const result = fhirpath(ctx, `@T12:02:34.324 > @T12`, subject);
            expect(result).toEqual([]);
      });
      it("Comparison with later time in resource (1) - @T17:00 < timeWithT.toTime()", () => {
            const result = fhirpath(ctx, `@T17:00 < timeWithT.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later time in resource (2) - @T17:00 > timeWithT.toTime()", () => {
            const result = fhirpath(ctx, `@T17:00 > timeWithT.toTime()`, subject);
            expect(result).toEqual([false]);
      });
      it("Comparison with later time in resource (3) - @T17:00 < timeWithOutT.toTime()", () => {
            const result = fhirpath(ctx, `@T17:00 < timeWithOutT.toTime()`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison with later time in resource (4) - @T17:00 > timeWithOutT.toTime()", () => {
            const result = fhirpath(ctx, `@T17:00 > timeWithOutT.toTime()`, subject);
            expect(result).toEqual([false]);
      });
    });
    describe("Instant", () => {

      it("Comparison using the greater than operator - now() > DiagnosticReport.issued", () => {
            // Input file: diagnosticreport-example.json
            const result = fhirpath(ctx, `now() > DiagnosticReport.issued`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison using the less than operator - DiagnosticReport.issued < DiagnosticReport.effectiveDateTime", () => {
            // Input file: diagnosticreport-example.json
            const result = fhirpath(ctx, `DiagnosticReport.issued < DiagnosticReport.effectiveDateTime`, subject);
            expect(result).toEqual([true]);
      });
      it("Comparison using the equality operator - DiagnosticReport.issued = @2005-01-27T06:40:01Z", () => {
            // Input file: diagnosticreport-example.json
            const result = fhirpath(ctx, `DiagnosticReport.issued = @2005-01-27T06:40:01Z`, subject);
            expect(result).toEqual([true]);
      });
    });
  });
});
