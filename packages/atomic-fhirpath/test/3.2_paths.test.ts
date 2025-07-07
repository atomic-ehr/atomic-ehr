import { describe, it, expect } from "bun:test";
import subject from "./3.2_paths.json" with { type: "json" };
import { fhirpath } from "../src/index";

// Test file generated from 3.2_paths.yaml

describe("3.2_paths", () => {
  const ctx = {};

  describe("Paths with choice types", () => {

    it("Observation.value with an R5 FHIR model - Observation.value", () => {
          const result = fhirpath(ctx, `Observation.value`, subject);
          expect(result).toEqual(["high"]);
    });
    it("Observation.value with an R4 FHIR model - Observation.value", () => {
          const result = fhirpath(ctx, `Observation.value`, subject);
          expect(result).toEqual(["high"]);
    });
    it("Observation.value with an STU3 FHIR model - Observation.value", () => {
          const result = fhirpath(ctx, `Observation.value`, subject);
          expect(result).toEqual(["high"]);
    });
    it("Observation.value with an DSTU2 FHIR model - Observation.value", () => {
          const result = fhirpath(ctx, `Observation.value`, subject);
          expect(result).toEqual(["high"]);
    });
    it("Observation.value without a model - Observation.value", () => {
          const result = fhirpath(ctx, `Observation.value`, subject);
          expect(result).toEqual([]);
    });
    it("Observation.value contained in another resource (1) - Observation.contained[0].value", () => {
          const result = fhirpath(ctx, `Observation.contained[0].value`, subject);
          expect(result).toEqual(["medium"]);
    });
    it("Observation.value contained in another resource (2) - Observation.contained.value", () => {
          const result = fhirpath(ctx, `Observation.contained.value`, subject);
          expect(result).toEqual(["medium", "low"]);
    });
    it("Type of Observation contained in another resource - Observation.contained[0] is Observation", () => {
          const result = fhirpath(ctx, `Observation.contained[0] is Observation`, subject);
          expect(result).toEqual([true]);
    });
    it("Getting choice type fields via children() - Observation.children().value", () => {
          const result = fhirpath(ctx, `Observation.children().value`, subject);
          expect(result).toEqual(["medium", "low"]);
    });
    it("Getting choice type fields via children() (2) - Observation.children().children().value", () => {
          const result = fhirpath(ctx, `Observation.children().children().value`, subject);
          expect(result).toEqual(["zero"]);
    });
    it("Getting choice type fields via descendants() - Observation.descendants().value", () => {
          const result = fhirpath(ctx, `Observation.descendants().value`, subject);
          expect(result).toEqual(["medium", "low", "zero", "Red", "Blue", "Green"]);
    });
    it("Getting choice type fields via descendants() and where() - Observation.descendants().where(resourceType = 'Observation').value", () => {
          const result = fhirpath(ctx, `Observation.descendants().where(resourceType = 'Observation').value`, subject);
          expect(result).toEqual(["medium", "low", "zero"]);
    });
    it("QR with where() - contained.where(resourceType = 'QuestionnaireResponse').item.where(linkId = '1').answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').item.where(linkId = '1').answer.value`, subject);
          expect(result).toEqual(["Red"]);
    });
    it("QR with descendants() and where() (1) - contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1').answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1').answer.value`, subject);
          expect(result).toEqual(["Red"]);
    });
    it("QR with descendants() and where() (2) - contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1.0').answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1.0').answer.value`, subject);
          expect(result).toEqual(["Green"]);
    });
    it("QR with descendants() and where() (3) - contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1.1').answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1.1').answer.value`, subject);
          expect(result).toEqual(["Blue"]);
    });
    it("QR with item.answer.value - contained.where(resourceType = 'QuestionnaireResponse').item.answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').item.answer.value`, subject);
          expect(result).toEqual(["Red"]);
    });
    it("QR with item.item.answer.value - contained.where(resourceType = 'QuestionnaireResponse').item.item.answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').item.item.answer.value`, subject);
          expect(result).toEqual(["Blue"]);
    });
    it("QR with item.answer.item.answer.value - contained.where(resourceType = 'QuestionnaireResponse').item.answer.item.answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').item.answer.item.answer.value`, subject);
          expect(result).toEqual(["Green"]);
    });
    it("QR with item.answer.item.answer.value (STU3) - contained.where(resourceType = 'QuestionnaireResponse').item.answer.item.answer.value", () => {
          const result = fhirpath(ctx, `contained.where(resourceType = 'QuestionnaireResponse').item.answer.item.answer.value`, subject);
          expect(result).toEqual(["Green"]);
    });
    it("Access a custom field starting with a capital letter (1) - CustomField = 'test'", () => {
          const result = fhirpath(ctx, `CustomField = 'test'`, subject);
          expect(result).toEqual([true]);
    });
    it("Access a custom field starting with a capital letter (2) - Observation.CustomField = 'test'", () => {
          const result = fhirpath(ctx, `Observation.CustomField = 'test'`, subject);
          expect(result).toEqual([true]);
    });
  });
});
