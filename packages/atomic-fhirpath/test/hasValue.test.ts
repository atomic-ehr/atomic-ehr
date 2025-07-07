import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./hasValue.json" with { type: "json" };

// Test file generated from hasValue.yaml

describe("hasValue", () => {
  const ctx = {};

  describe("no model specified", () => {

    it("collection only contains one string - Patient.name.given[0].hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].hasValue()`, subject);
          expect(result).toEqual([true]);
    });
    it("collection contains array of strings - Patient.name.given.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection contains object - Patient.name.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains an element without a value but with an extension - Patient.birthDate.hasValue()", () => {
          // Input file: patient-example-3.json
          const result = fhirpath(ctx, `Patient.birthDate.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains an element of a non-FHIR primitive type - '5'.hasValue()", () => {
          const result = fhirpath(ctx, `'5'.hasValue()`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("model specified", () => {

    it("collection only contains one non-primitive - Patient.identifier.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.identifier.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains one string - Patient.name.given[0].hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].hasValue()`, subject);
          expect(result).toEqual([true]);
    });
    it("collection contains array of strings - Patient.name.given.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains one string - Patient.name.given[0].hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].hasValue()`, subject);
          expect(result).toEqual([true]);
    });
    it("collection contains array of strings - Patient.name.given.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains one string - Patient.name.given[0].hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].hasValue()`, subject);
          expect(result).toEqual([true]);
    });
    it("collection contains array of strings - Patient.name.given.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains one string - Patient.name.given[0].hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].hasValue()`, subject);
          expect(result).toEqual([true]);
    });
    it("collection contains array of strings - Patient.name.given.hasValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains an element without a value but with an extension - Patient.birthDate.hasValue()", () => {
          // Input file: patient-example-3.json
          const result = fhirpath(ctx, `Patient.birthDate.hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("Quantity is not a primitive type - (5.03 'mg/dL').hasValue()", () => {
          const result = fhirpath(ctx, `(5.03 'mg/dL').hasValue()`, subject);
          expect(result).toEqual([false]);
    });
    it("collection only contains an element of a non-FHIR primitive type - '5'.hasValue()", () => {
          const result = fhirpath(ctx, `'5'.hasValue()`, subject);
          expect(result).toEqual([true]);
    });
  });
});
