import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./extensions.json" with { type: "json" };

// Test file generated from extensions.yaml

describe("extensions", () => {
  const ctx = {};

  describe("Extension and id for primitive types", () => {

    it("** id for primitive type - Functions.attrtrue.id = 'someid'", () => {
          const result = fhirpath(ctx, `Functions.attrtrue.id = 'someid'`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension for primitive type 1 - Patient.birthDate.extension.where(url = '').empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension.where(url = '').empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension for primitive type 2 - Patient.birthDate.extension .where(url = 'http://hl7.org/fhir/StructureDefinition/patient-birthTime') .valueDateTime.toDateTime() = @1974-12-25T14:35:45-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension .where(url = 'http://hl7.org/fhir/StructureDefinition/patient-birthTime') .valueDateTime.toDateTime() = @1974-12-25T14:35:45-05:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension for primitive type 3 - Patient.birthDate.extension .where(url = 'http://hl7.org/fhir/StructureDefinition/patient-birthTime') .value = @1974-12-25T14:35:45-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension .where(url = 'http://hl7.org/fhir/StructureDefinition/patient-birthTime') .value = @1974-12-25T14:35:45-05:00`, subject);
          expect(result).toEqual([true]);
    });
  });
  describe("Additional functions", () => {

    it("extension(url : string) : collection", () => {

    });
    it("** empty url - Patient.birthDate.extension('').empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension('').empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** empty input collection - Patient.birthDate1 .extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime').empty()", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate1 .extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime').empty()`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension() for primitive type (without using FHIR model data) - Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime') .valueDateTime.toDateTime() = @1974-12-25T14:35:45-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime') .valueDateTime.toDateTime() = @1974-12-25T14:35:45-05:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension() for primitive type (without using FHIR model data) when only extension is present - Patient.communication.preferred.extension('test').exists()", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.communication.preferred.extension('test').exists()`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension() for primitive type (using FHIR model data) when only extension is present - Patient.communication.preferred.extension('test').value.id", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.communication.preferred.extension('test').value.id`, subject);
          expect(result).toEqual(["testing"]);
    });
    it("** type of a primitive type \"id\" (using R4 model data) - Patient.communication.preferred.extension('test').value.id is System.String", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.communication.preferred.extension('test').value.id is System.String`, subject);
          expect(result).toEqual([true]);
    });
    it("** type of a primitive type \"id\" (using DSTU2 model data) - Patient.communication.preferred.extension('test').value.id is FHIR.id", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.communication.preferred.extension('test').value.id is FHIR.id`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension() for an item of an array of primitive types when associated value is null - Bundle.entry.resource.name[0].given[0].extension('http://hl7.org/fhir/StructureDefinition/display').value", () => {
          // Input file: patient-bundle.json
          const result = fhirpath(ctx, `Bundle.entry.resource.name[0].given[0].extension('http://hl7.org/fhir/StructureDefinition/display').value`, subject);
          expect(result).toEqual([]);
    });
    it("** expression with extension() for an item of an array of primitive types when associated value is not null - Bundle.entry.resource.name[0].given[1].extension('http://hl7.org/fhir/StructureDefinition/display').value", () => {
          // Input file: patient-bundle.json
          const result = fhirpath(ctx, `Bundle.entry.resource.name[0].given[1].extension('http://hl7.org/fhir/StructureDefinition/display').value`, subject);
          expect(result).toEqual(["Jacomus"]);
    });
    it("** expression with extension() for the null item of an array of primitive types when it has a non-null extension - Patient.name.given[0].extension('http://hl7.org/fhir/StructureDefinition/display').value = 'Jacomus1'", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given[0].extension('http://hl7.org/fhir/StructureDefinition/display').value = 'Jacomus1'`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension() when the list of primitive types is shorter than the list of extensions - Patient.name.given[3].extension('http://hl7.org/fhir/StructureDefinition/display').value = 'Jacomus2'", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given[3].extension('http://hl7.org/fhir/StructureDefinition/display').value = 'Jacomus2'`, subject);
          expect(result).toEqual([true]);
    });
    it("** expression with extension() when the list of values doesn't exists but the list of extensions does - Patient.address[1].id = 'someId'", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.address[1].id = 'someId'`, subject);
          expect(result).toEqual([true]);
    });
    it("** count nodes without value, but with extensions - Patient.name.given.count() = 4", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given.count() = 4`, subject);
          expect(result).toEqual([true]);
    });
    it("** exclude null values from the result - Patient.name.given", () => {
          // Input file: patient-example-2.json
          const result = fhirpath(ctx, `Patient.name.given`, subject);
          expect(result).toEqual(["Peter", "James"]);
    });
    it("** expression with extension() for primitive type (using FHIR model data) - Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime') .value = @1974-12-25T14:35:45-05:00", () => {
          // Input file: patient-example.json
          const result = fhirpath(ctx, `Patient.birthDate.extension('http://hl7.org/fhir/StructureDefinition/patient-birthTime') .value = @1974-12-25T14:35:45-05:00`, subject);
          expect(result).toEqual([true]);
    });
    it("** value of extension of extension (using FHIR model data) - Functions.attrtrue.extension('url1').extension('url2').value = 'someuri'", () => {
          const result = fhirpath(ctx, `Functions.attrtrue.extension('url1').extension('url2').value = 'someuri'`, subject);
          expect(result).toEqual([true]);
    });
    it("** id of extension of extension - Functions.attrtrue.extension('url1').extension('url2').id = 'someid2'", () => {
          const result = fhirpath(ctx, `Functions.attrtrue.extension('url1').extension('url2').id = 'someid2'`, subject);
          expect(result).toEqual([true]);
    });
  });
});
