import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./getValue.json" with { type: "json" };

// Test file generated from getValue.yaml

describe("getValue", () => {
  const ctx = {};

  describe("no model specified", () => {

    it("collection only contains one string - Patient.name.given[0].getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].getValue()`, subject);
          expect(result).toEqual(["Peter"]);
    });
    it("collection contains array of strings - Patient.name.given.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection contains object - Patient.name.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains an element without a value but with an extension - Patient.birthDate.getValue()", () => {
          // Input file: patient-example-3.json
          const result = fhirpath(ctx, `Patient.birthDate.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains an element of a non-FHIR primitive type - '5'.getValue()", () => {
          const result = fhirpath(ctx, `'5'.getValue()`, subject);
          expect(result).toEqual(["5"]);
    });
  });
  describe("model specified", () => {

    it("collection only contains one non-primitive - Patient.identifier.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.identifier.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains one string - Patient.name.given[0].getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].getValue()`, subject);
          expect(result).toEqual(["Peter"]);
    });
    it("collection contains array of strings - Patient.name.given.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains one string - Patient.name.given[0].getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].getValue()`, subject);
          expect(result).toEqual(["Peter"]);
    });
    it("collection contains array of strings - Patient.name.given.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains one string - Patient.name.given[0].getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].getValue()`, subject);
          expect(result).toEqual(["Peter"]);
    });
    it("collection contains array of strings - Patient.name.given.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains one string - Patient.name.given[0].getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given[0].getValue()`, subject);
          expect(result).toEqual(["Peter"]);
    });
    it("collection contains array of strings - Patient.name.given.getValue()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.name.given.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains an element without a value but with an extension - Patient.birthDate.getValue()", () => {
          // Input file: patient-example-3.json
          const result = fhirpath(ctx, `Patient.birthDate.getValue()`, subject);
          expect(result).toEqual([]);
    });
    it("collection only contains an element of a non-FHIR primitive type - '5'.getValue()", () => {
          const result = fhirpath(ctx, `'5'.getValue()`, subject);
          expect(result).toEqual(["5"]);
    });
  });
});
