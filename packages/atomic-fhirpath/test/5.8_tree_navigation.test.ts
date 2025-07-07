import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./5.8_tree_navigation.json" with { type: "json" };

// Test file generated from 5.8_tree_navigation.yaml

describe("5.8_tree_navigation", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.7. Tree navigation", () => {

  });
  it("5.7.1. children() : collection", () => {

  });
  it("** children - ch.children()", () => {
        const result = fhirpath(ctx, `ch.children()`, subject);
        expect(result).toEqual([{"d": 1}, {"e": 1}, {"d": 2}, {"e": 2}]);
  });
  it("** children() on a collection with null elements does not throw an error - name.given.children()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `name.given.children()`, subject);
        expect(result).toEqual(["Jacomus1Id", {"url": "http://hl7.org/fhir/StructureDefinition/display", "valueString": "Jacomus1"}, "Jacomus2Id", {"url": "http://hl7.org/fhir/StructureDefinition/display", "valueString": "Jacomus2"}]);
  });
  it("** children() processes a child node that has only a property starting with _ - communication.children()[1] = communication.preferred", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `communication.children()[1] = communication.preferred`, subject);
        expect(result).toEqual([true]);
  });
  it("** children() on a resource should not treat the resourceType property as a child - Patient.children() = (Patient.birthDate | Patient.address | Patient.name | Patient.communication)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.children() = (Patient.birthDate | Patient.address | Patient.name | Patient.communication)`, subject);
        expect(result).toEqual([true]);
  });
  it("5.7.2. descendants() : collection", () => {

  });
  it("** descendants - ch.descendants()", () => {
        const result = fhirpath(ctx, `ch.descendants()`, subject);
        expect(result).toEqual([{"d": 1}, {"e": 1}, {"d": 2}, {"e": 2}, 1, 1, 2, 2]);
  });
  it("** descendants - desc.descendants()", () => {
        const result = fhirpath(ctx, `desc.descendants()`, subject);
        expect(result).toEqual([{"b": {"c": {"d": 1}}}, {"c": {"d": 1}}, {"d": 1}, 1]);
  });
  it("** descendants() on a collection with null elements does not throw an error - name.given.descendants()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `name.given.descendants()`, subject);
        expect(result).toEqual(["Jacomus1Id", {"url": "http://hl7.org/fhir/StructureDefinition/display", "valueString": "Jacomus1"}, "Jacomus2Id", {"url": "http://hl7.org/fhir/StructureDefinition/display", "valueString": "Jacomus2"}, "http://hl7.org/fhir/StructureDefinition/display", "Jacomus1", "http://hl7.org/fhir/StructureDefinition/display", "Jacomus2"]);
  });
});
