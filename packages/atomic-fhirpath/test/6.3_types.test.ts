import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./6.3_types.json" with { type: "json" };

// Test file generated from 6.3_types.yaml

describe("6.3_types", () => {
  const ctx = {};

  it("6.3. Types", () => {

  });
  it("6.3.1. is", () => {

  });
  it("** is boolean - (1 > 2) is Boolean", () => {
        const result = fhirpath(ctx, `(1 > 2) is Boolean`, subject);
        expect(result).toEqual([true]);
  });
  it("** operator precedence - 1 > 2 is Boolean", () => {
        expect(() => {
          fhirpath(ctx, `1 > 2 is Boolean`, subject);
        }).toThrow();
  });
  it("** values is integer - coll.a is Integer", () => {
        const result = fhirpath(ctx, `coll.a is Integer`, subject);
        expect(result).toEqual([true]);
  });
  it("** is long integer - 5L is Long", () => {
        const result = fhirpath(ctx, `5L is Long`, subject);
        expect(result).toEqual([true]);
  });
  it("** values isnt Patient type - coll.all($this is Patient)", () => {
        const result = fhirpath(ctx, `coll.all($this is Patient)`, subject);
        expect(result).toEqual([false]);
  });
  it("** is Quantity - 1 year is Quantity", () => {
        const result = fhirpath(ctx, `1 year is Quantity`, subject);
        expect(result).toEqual([true]);
  });
  it("** is System.Quantity - 1 year is System.Quantity", () => {
        const result = fhirpath(ctx, `1 year is System.Quantity`, subject);
        expect(result).toEqual([true]);
  });
  it("** Observation is DomainResource - Observation is DomainResource", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation is DomainResource`, subject);
        expect(result).toEqual([true]);
  });
  it("** Observation is Resource - Observation is Resource", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation is Resource`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity is FHIR.Quantity - Observation.value is FHIR.Quantity", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value is FHIR.Quantity`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity is Element - Observation.value is Element", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value is Element`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity.value is decimal - Observation.value.value is decimal", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value.value is decimal`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity.value is Element - Observation.value.value is Element", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value.value is Element`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity.system is uri - Observation.value.system is uri", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value.system is uri`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity.unit is string - Observation.value.unit is string", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value.unit is string`, subject);
        expect(result).toEqual([true]);
  });
  it("** valueQuantity.unit is not decimal - Observation.value.unit is decimal", () => {
        // Input file: observation-example.json
        const result = fhirpath(ctx, `Observation.value.unit is decimal`, subject);
        expect(result).toEqual([false]);
  });
  it("** Patient.contact is BackboneElement - Patient.contact is BackboneElement", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.contact is BackboneElement`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.contact is Element - Patient.contact is Element", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.contact is Element`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.contact.name is HumanName - Patient.contact.name is HumanName", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.contact.name is HumanName`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.contact.name.given is string - Patient.contact.name.given is string", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.contact.name.given is string`, subject);
        expect(result).toEqual([true]);
  });
  it("** Extension.valueString is string - Patient.contact.name.family.extension('http://hl7.org/fhir/StructureDefinition/humanname-own-prefix').value is string", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.contact.name.family.extension('http://hl7.org/fhir/StructureDefinition/humanname-own-prefix').value is string`, subject);
        expect(result).toEqual([true]);
  });
  it("** Extension.url is System.String - Patient.contact.name.family.extension('http://hl7.org/fhir/StructureDefinition/humanname-own-prefix').url is System.String", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.contact.name.family.extension('http://hl7.org/fhir/StructureDefinition/humanname-own-prefix').url is System.String`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.id is System.String (R5) - Patient.id is System.String", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.id is System.String`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.id is System.String (R4) - Patient.id is System.String", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.id is System.String`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.id is id (DSTU2) - Patient.id is id", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.id is id`, subject);
        expect(result).toEqual([true]);
  });
  it("** Check if the nested nodes in the DSTU2 model are of the correct type - Questionnaire.group.group.question.group.question.concept.where($this is Coding).count() = 4", () => {
        // Input file: questionnaire-example-DSTU2.json
        const result = fhirpath(ctx, `Questionnaire.group.group.question.group.question.concept.where($this is Coding).count() = 4`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.id is id (STU3) - Patient.id is id", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.id is id`, subject);
        expect(result).toEqual([true]);
  });
  it("** Patient.deceased is boolean - Patient.deceased is boolean", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.deceased is boolean`, subject);
        expect(result).toEqual([true]);
  });
  it("** \"is\" for the null element of a collection - Patient.name.given[3] is FHIR.string", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[3] is FHIR.string`, subject);
        expect(result).toEqual([true]);
  });
  it("** StructureDefinition.snapshot.element.type is Element - StructureDefinition.snapshot.element.type is Element", () => {
        // Input file: structure-definition-example.json
        const result = fhirpath(ctx, `StructureDefinition.snapshot.element.type is Element`, subject);
        expect(result).toEqual([true]);
  });
  it("** StructureDefinition.snapshot.element.type.code is uri - StructureDefinition.snapshot.element.type.code is uri", () => {
        // Input file: structure-definition-example.json
        const result = fhirpath(ctx, `StructureDefinition.snapshot.element.type.code is uri`, subject);
        expect(result).toEqual([true]);
  });
  it("** The type of a valid but missing property is empty - Patient.photo is Attachment", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `Patient.photo is Attachment`, subject);
        expect(result).toEqual([]);
  });
  it("6.3.2. is(type : type specifier)", () => {

  });
  it("** is(Quantity) - 1 day.is(Quantity)", () => {
        const result = fhirpath(ctx, `1 day.is(Quantity)`, subject);
        expect(result).toEqual([true]);
  });
  it("** is(System.Quantity) - 1 day.is(System.Quantity)", () => {
        const result = fhirpath(ctx, `1 day.is(System.Quantity)`, subject);
        expect(result).toEqual([true]);
  });
  it("** is() for the null element of a collection - Patient.name.given[3].is(FHIR.string)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[3].is(FHIR.string)`, subject);
        expect(result).toEqual([true]);
  });
  it("6.3.3. as type specifier", () => {

  });
  it("** more than one item in the input collection for \"as\" - mixedTypeVals as Integer", () => {
        expect(() => {
          fhirpath(ctx, `mixedTypeVals as Integer`, subject);
        }).toThrow();
  });
  it("** as integer - mixedTypeVals.select($this as Integer)", () => {
        const result = fhirpath(ctx, `mixedTypeVals.select($this as Integer)`, subject);
        expect(result).toEqual([1]);
  });
  it("** as Quantity - 1 year as Quantity", () => {
        const result = fhirpath(ctx, `1 year as Quantity`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** as System.Quantity - 1 year as System.Quantity", () => {
        const result = fhirpath(ctx, `1 year as System.Quantity`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** as FHIR.Quantity - QuestionnaireResponse.item.select(answer.value as FHIR.Quantity).count()", () => {
        // Input file: quantity-example.json
        const result = fhirpath(ctx, `QuestionnaireResponse.item.select(answer.value as FHIR.Quantity).count()`, subject);
        expect(result).toEqual([4]);
  });
  it("** \"as\" for the null element of a collection - (Patient.name.given[3] as FHIR.string).count() = 1", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `(Patient.name.given[3] as FHIR.string).count() = 1`, subject);
        expect(result).toEqual([true]);
  });
  it("** \"as FHIR.Quantity\" returns the empty collection for the System.Quantity - 1 year as FHIR.Quantity", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `1 year as FHIR.Quantity`, subject);
        expect(result).toEqual([]);
  });
  it("6.3.4. as(type : type specifier)", () => {

  });
  it("** more than one item in the input collection for \"as()\" - mixedTypeVals.as(Integer)", () => {
        expect(() => {
          fhirpath(ctx, `mixedTypeVals.as(Integer)`, subject);
        }).toThrow();
  });
  it("** as(Integer) - mixedTypeVals.select($this.as(Integer))", () => {
        const result = fhirpath(ctx, `mixedTypeVals.select($this.as(Integer))`, subject);
        expect(result).toEqual([1]);
  });
  it("** as(Quantity) - 1 year.as(Quantity)", () => {
        const result = fhirpath(ctx, `1 year.as(Quantity)`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** as(System.Quantity) - 1 year.as(System.Quantity)", () => {
        const result = fhirpath(ctx, `1 year.as(System.Quantity)`, subject);
        expect(result).toEqual(["1 year"]);
  });
  it("** as FHIR.Quantity - QuestionnaireResponse.item.select(answer.value.as(FHIR.Quantity)).count()", () => {
        // Input file: quantity-example.json
        const result = fhirpath(ctx, `QuestionnaireResponse.item.select(answer.value.as(FHIR.Quantity)).count()`, subject);
        expect(result).toEqual([4]);
  });
  it("** \"as(FHIR.Quantity)\" returns the empty collection for the System.Quantity - 1 year.as(FHIR.Quantity)", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `1 year.as(FHIR.Quantity)`, subject);
        expect(result).toEqual([]);
  });
  it("** as() for the null element of a collection - Patient.name.given[3].as(FHIR.string).count() = 1", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[3].as(FHIR.string).count() = 1`, subject);
        expect(result).toEqual([true]);
  });
  it("** as Coding - Questionnaire.children().select(code as Coding).count() = 2", () => {
        // Input file: questionnaire-example.json
        const result = fhirpath(ctx, `Questionnaire.children().select(code as Coding).count() = 2`, subject);
        expect(result).toEqual([true]);
  });
  it("** as Element - Questionnaire.children().select(code as Element).count() = 2", () => {
        // Input file: questionnaire-example.json
        const result = fhirpath(ctx, `Questionnaire.children().select(code as Element).count() = 2`, subject);
        expect(result).toEqual([true]);
  });
  it("** \"as Quantity\" found nothing - Questionnaire.children().select(code as Quantity).count() = 0", () => {
        // Input file: questionnaire-example.json
        const result = fhirpath(ctx, `Questionnaire.children().select(code as Quantity).count() = 0`, subject);
        expect(result).toEqual([true]);
  });
  it("** descendants() returns resource nodes with the correct data types (1) - descendants().where($this is Identifier and system = 'urn:oid:1.2.36.146.595.217.0.1').use = 'usual'", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `descendants().where($this is Identifier and system = 'urn:oid:1.2.36.146.595.217.0.1').use = 'usual'`, subject);
        expect(result).toEqual([true]);
  });
});
