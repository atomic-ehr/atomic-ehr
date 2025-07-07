import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./4.1_literals.json" with { type: "json" };

// Test file generated from 4.1_literals.yaml

describe("4.1_literals", () => {
  const ctx = {};

  it("{}", () => {
        const result = fhirpath(ctx, `{}`, subject);
        expect(result).toEqual([]);
  });
  it("'a\\\\b\\'\\\"\\`\\r\\n\\t\\u0065'", () => {
        const result = fhirpath(ctx, `'a\\\\b\\'\\"\\\`\\r\\n\\t\\u0065'`, subject);
        expect(result).toEqual(["a\\b'\"`\r\n\te"]);
  });
  it("\"a\\\\b\\'\\\"\\`\\r\\n\\t\\u0065\"", () => {
        expect(() => {
          fhirpath(ctx, `"a\\\\b\\'\\"\\\`\\r\\n\\t\\u0065"`, subject);
        }).toThrow();
  });
  it("`a\\\\b\\'\\\"\\`\\r\\n\\t\\u0065`", () => {
        const result = fhirpath(ctx, `\`a\\\\b\\'\\"\\\`\\r\\n\\t\\u0065\``, subject);
        expect(result).toEqual([]);
  });
  it("2 'mo'", () => {
        const result = fhirpath(ctx, `2 'mo'`, subject);
        expect(result).toEqual(["2 'mo'"]);
  });
  it("2 years", () => {
        const result = fhirpath(ctx, `2 years`, subject);
        expect(result).toEqual(["2 years"]);
  });
  it("(2 years).value", () => {
        const result = fhirpath(ctx, `(2 years).value`, subject);
        expect(result).toEqual([2]);
  });
  it("@2019", () => {
        const result = fhirpath(ctx, `@2019`, subject);
        expect(result).toEqual(["2019"]);
  });
  it("@2019-02-03T01:00Z = @2019-02-02T21:00-04:00", () => {
        const result = fhirpath(ctx, `@2019-02-03T01:00Z = @2019-02-02T21:00-04:00`, subject);
        expect(result).toEqual([true]);
  });
  it("@2019-02-03T02:00Z = @2019-02-02T21:00-04:00", () => {
        const result = fhirpath(ctx, `@2019-02-03T02:00Z = @2019-02-02T21:00-04:00`, subject);
        expect(result).toEqual([false]);
  });
  it("-7", () => {
        const result = fhirpath(ctx, `-7`, subject);
        expect(result).toEqual([-7]);
  });
  it("-7.3", () => {
        const result = fhirpath(ctx, `-7.3`, subject);
        expect(result).toEqual([-7.3]);
  });
  it("-7L", () => {
        const result = fhirpath(ctx, `-7L`, subject);
        expect(result).toEqual(["-7"]);
  });
  it("+7", () => {
        const result = fhirpath(ctx, `+7`, subject);
        expect(result).toEqual([7]);
  });
  it("(-7).combine(3)", () => {
        const result = fhirpath(ctx, `(-7).combine(3)`, subject);
        expect(result).toEqual([-7, 3]);
  });
  it("-7.combine(3)", () => {
        expect(() => {
          fhirpath(ctx, `-7.combine(3)`, subject);
        }).toThrow();
  });
  it("-((7).combine(3))", () => {
        expect(() => {
          fhirpath(ctx, `-((7).combine(3))`, subject);
        }).toThrow();
  });
  it("-true", () => {
        expect(() => {
          fhirpath(ctx, `-true`, subject);
        }).toThrow();
  });
  it("-'zzz'", () => {
        expect(() => {
          fhirpath(ctx, `-'zzz'`, subject);
        }).toThrow();
  });
});
