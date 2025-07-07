import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.2.3_repeat.json" with { type: "json" };

// Test file generated from 5.2.3_repeat.yaml

describe("5.2.3_repeat", () => {
  const ctx = {};

  it("Questionnaire.repeat(item).linkId", () => {
        const result = fhirpath(ctx, `Questionnaire.repeat(item).linkId`, subject);
        expect(result).toEqual(["1", "2", "1.1", "2.1", "1.1.1", "2.1.2", "1.1.1.1", "1.1.1.2", "1.1.1.1.1", "1.1.1.1.2"]);
  });
  it("Questionnaire.combine(Questionnaire).repeat(item).linkId", () => {
        const result = fhirpath(ctx, `Questionnaire.combine(Questionnaire).repeat(item).linkId`, subject);
        expect(result).toEqual(["1", "2", "1.1", "2.1", "1.1.1", "2.1.2", "1.1.1.1", "1.1.1.2", "1.1.1.1.1", "1.1.1.1.2"]);
  });
});
