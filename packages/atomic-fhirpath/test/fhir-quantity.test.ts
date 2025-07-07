import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./fhir-quantity.json" with { type: "json" };

// Test file generated from fhir-quantity.yaml

describe("fhir-quantity", () => {
  const ctx = {};

  describe("standard tests from fhir-r4", () => {

    it("** test - 1.toQuantity() = 1 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.toQuantity() = 1 '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - 1.0.toQuantity() = 1.0 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `1.0.toQuantity() = 1.0 '1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - '1'.toQuantity()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1'.toQuantity()`, subject);
          expect(result).toEqual(["1 '1'"]);
    });
    it("** test - '1 day'.toQuantity() = 1 day", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 day'.toQuantity() = 1 day`, subject);
          expect(result).toEqual([true]);
    });
    it("** test - '1 day'.toQuantity() = 1 'd'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 day'.toQuantity() = 1 'd'`, subject);
          expect(result).toEqual([]);
    });
    it("** test - '1 \\'wk\\''.toQuantity() = 1 week", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1 \\'wk\\''.toQuantity() = 1 week`, subject);
          expect(result).toEqual([]);
    });
    it("** test - '1.0'.toQuantity() ~ 1 '1'", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `'1.0'.toQuantity() ~ 1 '1'`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("Mapping from FHIR Quantity to FHIRPath System.Quantity", () => {

    it("After converting 'a' to year it is equal to year - QuestionnaireResponse.item[0].answer.value = 2 year", () => {
          // Input file: quantity-example.json
          const result = fhirpath(ctx, `QuestionnaireResponse.item[0].answer.value = 2 year`, subject);
          expect(result).toEqual([true]);
    });
    it("After converting 'a' to year it is equivalent to 'a' - QuestionnaireResponse.item[0].answer.value ~ 2 'a'", () => {
          // Input file: quantity-example.json
          const result = fhirpath(ctx, `QuestionnaireResponse.item[0].answer.value ~ 2 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("After converting 'a' to year it isn't equal to 'a' - QuestionnaireResponse.item[0].answer.value != 2 'a'", () => {
          // Input file: quantity-example.json
          const result = fhirpath(ctx, `QuestionnaireResponse.item[0].answer.value != 2 'a'`, subject);
          expect(result).toEqual([true]);
    });
    it("After converting 'min' to minutes it is equal to minutes - QuestionnaireResponse.item[1].answer.value = 3 minutes", () => {
          // Input file: quantity-example.json
          const result = fhirpath(ctx, `QuestionnaireResponse.item[1].answer.value = 3 minutes`, subject);
          expect(result).toEqual([true]);
    });
    it("Unable to convert from non-UCUM system - QuestionnaireResponse.item[2].answer.value.toQuantity()", () => {
          // Input file: quantity-example.json
          const result = fhirpath(ctx, `QuestionnaireResponse.item[2].answer.value.toQuantity()`, subject);
          expect(result).toEqual([]);
    });
    it("Error when a comparator is present and there is a need to convert - QuestionnaireResponse.item[3].answer.value.toQuantity()", () => {
          // Input file: quantity-example.json
          expect(() => {
            fhirpath(ctx, `QuestionnaireResponse.item[3].answer.value.toQuantity()`, subject);
          }).toThrow();
    });
    it("Can access the comparator field when there isn't a need to convert - QuestionnaireResponse.item[3].answer.value.comparator", () => {
          // Input file: quantity-example.json
          const result = fhirpath(ctx, `QuestionnaireResponse.item[3].answer.value.comparator`, subject);
          expect(result).toEqual([">"]);
    });
  });
});
