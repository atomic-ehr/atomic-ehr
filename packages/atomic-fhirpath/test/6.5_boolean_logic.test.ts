import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./6.5_boolean_logic.json" with { type: "json" };

// Test file generated from 6.5_boolean_logic.yaml

describe("6.5_boolean_logic", () => {
  const ctx = {};

  it("6.5. Boolean logic", () => {

  });
  it("* 6.5.1 and", () => {

  });
  it("* and (true and true) - ok1 and ok2", () => {
        const result = fhirpath(ctx, `ok1 and ok2`, subject);
        expect(result).toEqual([true]);
  });
  it("* and (true and false) - ok1 and ups1", () => {
        const result = fhirpath(ctx, `ok1 and ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* and (true and false) - ok1 and ups1", () => {
        const result = fhirpath(ctx, `ok1 and ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* and (false and false) - ok1 and ups1", () => {
        const result = fhirpath(ctx, `ok1 and ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* Empty logic", () => {

  });
  it("* and ({} and true) - emp and ok1", () => {
        const result = fhirpath(ctx, `emp and ok1`, subject);
        expect(result).toEqual([]);
  });
  it("* and (true and {}) - ok1 and emp", () => {
        const result = fhirpath(ctx, `ok1 and emp`, subject);
        expect(result).toEqual([]);
  });
  it("* and ({} and false) - emp and ups1", () => {
        const result = fhirpath(ctx, `emp and ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* and (false and {}) - ups1 and emp", () => {
        const result = fhirpath(ctx, `ups1 and emp`, subject);
        expect(result).toEqual([false]);
  });
  it("* and (true and null) - ok1 and i", () => {
        const result = fhirpath(ctx, `ok1 and i`, subject);
        expect(result).toEqual([]);
  });
  it("* and (false and null) - ups1 and i", () => {
        const result = fhirpath(ctx, `ups1 and i`, subject);
        expect(result).toEqual([false]);
  });
  it("* 6.5.2 or", () => {

  });
  it("* or (true or true) - ok1 or ok2", () => {
        const result = fhirpath(ctx, `ok1 or ok2`, subject);
        expect(result).toEqual([true]);
  });
  it("* or (true or false) - ok1 or ups1", () => {
        const result = fhirpath(ctx, `ok1 or ups1`, subject);
        expect(result).toEqual([true]);
  });
  it("* or (false or false) - ups2 or ups1", () => {
        const result = fhirpath(ctx, `ups2 or ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* Empty logic", () => {

  });
  it("* or ({} or true) - emp or ok1", () => {
        const result = fhirpath(ctx, `emp or ok1`, subject);
        expect(result).toEqual([true]);
  });
  it("* or (true or {}) - ok1 or emp", () => {
        const result = fhirpath(ctx, `ok1 or emp`, subject);
        expect(result).toEqual([true]);
  });
  it("* or ({} or false) - emp or ups1", () => {
        const result = fhirpath(ctx, `emp or ups1`, subject);
        expect(result).toEqual([]);
  });
  it("* or (false or {}) - ups1 or emp", () => {
        const result = fhirpath(ctx, `ups1 or emp`, subject);
        expect(result).toEqual([]);
  });
  it("* or ({} or {}) - emp or emp", () => {
        const result = fhirpath(ctx, `emp or emp`, subject);
        expect(result).toEqual([]);
  });
  it("* or (true or null) - ok1 or i", () => {
        const result = fhirpath(ctx, `ok1 or i`, subject);
        expect(result).toEqual([true]);
  });
  it("* or (false or null) - ups1 or i", () => {
        const result = fhirpath(ctx, `ups1 or i`, subject);
        expect(result).toEqual([]);
  });
  it("* 6.5.3 not", () => {

  });
  it("** not() for non-empty collection - (0).not()", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `(0).not()`, subject);
        expect(result).toEqual([false]);
  });
  it("* 6.5.4 xor", () => {

  });
  it("* xor (true xor true) - ok1 xor ok2", () => {
        const result = fhirpath(ctx, `ok1 xor ok2`, subject);
        expect(result).toEqual([false]);
  });
  it("* xor (true xor false) - ok1 xor ups1", () => {
        const result = fhirpath(ctx, `ok1 xor ups1`, subject);
        expect(result).toEqual([true]);
  });
  it("* xor (false xor true) - ups1 xor ok1", () => {
        const result = fhirpath(ctx, `ups1 xor ok1`, subject);
        expect(result).toEqual([true]);
  });
  it("* xor (false xor false) - ups2 xor ups1", () => {
        const result = fhirpath(ctx, `ups2 xor ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* Empty logic", () => {

  });
  it("* xor ({} xor true) - emp xor ok1", () => {
        const result = fhirpath(ctx, `emp xor ok1`, subject);
        expect(result).toEqual([]);
  });
  it("* xor (true xor {}) - ok1 xor emp", () => {
        const result = fhirpath(ctx, `ok1 xor emp`, subject);
        expect(result).toEqual([]);
  });
  it("* xor ({} xor false) - emp xor ups1", () => {
        const result = fhirpath(ctx, `emp xor ups1`, subject);
        expect(result).toEqual([]);
  });
  it("* xor (false xor {}) - ups1 xor emp", () => {
        const result = fhirpath(ctx, `ups1 xor emp`, subject);
        expect(result).toEqual([]);
  });
  it("* xor ({} xor {}) - emp xor emp", () => {
        const result = fhirpath(ctx, `emp xor emp`, subject);
        expect(result).toEqual([]);
  });
  it("* xor (true xor null) - ok1 xor i", () => {
        const result = fhirpath(ctx, `ok1 xor i`, subject);
        expect(result).toEqual([]);
  });
  it("* xor (false xor null) - ups1 xor i", () => {
        const result = fhirpath(ctx, `ups1 xor i`, subject);
        expect(result).toEqual([]);
  });
  it("* 6.5.5 implies", () => {

  });
  it("* implies (true implies true) - ok1 implies ok2", () => {
        const result = fhirpath(ctx, `ok1 implies ok2`, subject);
        expect(result).toEqual([true]);
  });
  it("* implies (true implies false) - ok1 implies ups1", () => {
        const result = fhirpath(ctx, `ok1 implies ups1`, subject);
        expect(result).toEqual([false]);
  });
  it("* implies (false implies true) - ups1 implies ok1", () => {
        const result = fhirpath(ctx, `ups1 implies ok1`, subject);
        expect(result).toEqual([true]);
  });
  it("* implies (false implies false) - ups2 implies ups1", () => {
        const result = fhirpath(ctx, `ups2 implies ups1`, subject);
        expect(result).toEqual([true]);
  });
  it("* Empty logic", () => {

  });
  it("* implies ({} implies true) - emp implies ok1", () => {
        const result = fhirpath(ctx, `emp implies ok1`, subject);
        expect(result).toEqual([true]);
  });
  it("* implies (true implies {}) - ok1 implies emp", () => {
        const result = fhirpath(ctx, `ok1 implies emp`, subject);
        expect(result).toEqual([]);
  });
  it("* implies ({} implies false) - emp implies ups1", () => {
        const result = fhirpath(ctx, `emp implies ups1`, subject);
        expect(result).toEqual([]);
  });
  it("* implies (false implies {}) - ups1 implies emp", () => {
        const result = fhirpath(ctx, `ups1 implies emp`, subject);
        expect(result).toEqual([true]);
  });
  it("* implies ({} implies {}) - emp implies emp", () => {
        const result = fhirpath(ctx, `emp implies emp`, subject);
        expect(result).toEqual([]);
  });
  it("* in where TODO:", () => {

  });
});
