import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./simple.json" with { type: "json" };

// Test file generated from simple.yaml

describe("simple", () => {
  const ctx = {};

  it("Patient.name.family", () => {
        const result0 = fhirpath(ctx, `Patient.name.family`, subject);
        expect(result0).toEqual(["Chalmers", "Windsor"]);
        const result1 = fhirpath(ctx, `name.family`, subject);
        expect(result1).toEqual(["Chalmers", "Windsor"]);
        const result2 = fhirpath(ctx, `name.\`family\``, subject);
        expect(result2).toEqual(["Chalmers", "Windsor"]);
  });
  it("mapcat arrays - Patient.name.given", () => {
        const result = fhirpath(ctx, `Patient.name.given`, subject);
        expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
  });
  it("Patient.id", () => {
        const result0 = fhirpath(ctx, `Patient.id`, subject);
        expect(result0).toEqual(["example"]);
        const result1 = fhirpath(ctx, `id`, subject);
        expect(result1).toEqual(["example"]);
  });
  it("Encounter.id", () => {
        const result = fhirpath(ctx, `Encounter.id`, subject);
        expect(result).toEqual([]);
  });
  it("access by index - Patient.address[0].use", () => {
        const result = fhirpath(ctx, `Patient.address[0].use`, subject);
        expect(result).toEqual(["home"]);
  });
  it("access by index - Patient.name[0].family", () => {
        const result = fhirpath(ctx, `Patient.name[0].family`, subject);
        expect(result).toEqual(["Chalmers"]);
  });
  it("access by index unexisting - Patient.name[1].family", () => {
        const result = fhirpath(ctx, `Patient.name[1].family`, subject);
        expect(result).toEqual([]);
  });
  it("access by index - Patient.name[2].family", () => {
        const result = fhirpath(ctx, `Patient.name[2].family`, subject);
        expect(result).toEqual(["Windsor"]);
  });
  it("access by index unexisting - Patient.name[3].family", () => {
        const result = fhirpath(ctx, `Patient.name[3].family`, subject);
        expect(result).toEqual([]);
  });
  it("access by index - Patient.name[1].given[0]", () => {
        const result = fhirpath(ctx, `Patient.name[1].given[0]`, subject);
        expect(result).toEqual(["Jim"]);
  });
  it("Patient.managingOrganization.reference", () => {
        const result = fhirpath(ctx, `Patient.managingOrganization.reference`, subject);
        expect(result).toEqual(["Organization/1"]);
  });
  it("Patient.name.exists()", () => {
        const result = fhirpath(ctx, `Patient.name.exists()`, subject);
        expect(result).toEqual([true]);
  });
  it("Patient.name.exists(given)", () => {
        const result = fhirpath(ctx, `Patient.name.exists(given)`, subject);
        expect(result).toEqual([true]);
  });
  it("Patient.ups.exists()", () => {
        const result = fhirpath(ctx, `Patient.ups.exists()`, subject);
        expect(result).toEqual([false]);
  });
  it("Patient.name.empty()", () => {
        const result = fhirpath(ctx, `Patient.name.empty()`, subject);
        expect(result).toEqual([false]);
  });
  it("Patient.ups.empty()", () => {
        const result = fhirpath(ctx, `Patient.ups.empty()`, subject);
        expect(result).toEqual([true]);
  });
  it("count - Patient.name.given.count()", () => {
        const result = fhirpath(ctx, `Patient.name.given.count()`, subject);
        expect(result).toEqual([5]);
  });
  it("count - Patient.name.given.count() = 5", () => {
        const result = fhirpath(ctx, `Patient.name.given.count() = 5`, subject);
        expect(result).toEqual([true]);
  });
  it("Patient.name.where(use ='official').family", () => {
        const result = fhirpath(ctx, `Patient.name.where(use ='official').family`, subject);
        expect(result).toEqual(["Chalmers"]);
  });
  it("Patient.name.where(use ='official').given", () => {
        const result = fhirpath(ctx, `Patient.name.where(use ='official').given`, subject);
        expect(result).toEqual(["Peter", "James"]);
  });
  it("'a' | 'b'", () => {
        const result = fhirpath(ctx, `'a' | 'b'`, subject);
        expect(result).toEqual(["a", "b"]);
  });
  it("Patient.name.select(given)", () => {
        const result = fhirpath(ctx, `Patient.name.select(given)`, subject);
        expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
  });
  it("Patient.name.given | Patient.name.family", () => {
        const result = fhirpath(ctx, `Patient.name.given | Patient.name.family`, subject);
        expect(result).toEqual(["Peter", "James", "Jim", "Chalmers", "Windsor"]);
  });
  it("Patient.name.select(given | family)", () => {
        const result = fhirpath(ctx, `Patient.name.select(given | family)`, subject);
        expect(result).toEqual(["Peter", "James", "Chalmers", "Jim", "Peter", "James", "Windsor"]);
  });
  it("Patient.name.select(given.union(family))", () => {
        const result = fhirpath(ctx, `Patient.name.select(given.union(family))`, subject);
        expect(result).toEqual(["Peter", "James", "Chalmers", "Jim", "Peter", "James", "Windsor"]);
  });
  it("Patient.name.select(given.combine(family))", () => {
        const result = fhirpath(ctx, `Patient.name.select(given.combine(family))`, subject);
        expect(result).toEqual(["Peter", "James", "Chalmers", "Jim", "Peter", "James", "Windsor"]);
  });
  it("Patient.name.select(('James').subsetOf(given))", () => {
        const result = fhirpath(ctx, `Patient.name.select(('James').subsetOf(given))`, subject);
        expect(result).toEqual([true, false, true]);
  });
  it("Patient.name.select(('Peter' | 'James').supersetOf(given))", () => {
        const result = fhirpath(ctx, `Patient.name.select(('Peter' | 'James').supersetOf(given))`, subject);
        expect(result).toEqual([true, false, true]);
  });
  it("Patient.name.select(('Peter' | 'James' | 'something').intersect(given | family))", () => {
        const result = fhirpath(ctx, `Patient.name.select(('Peter' | 'James' | 'something').intersect(given | family))`, subject);
        expect(result).toEqual(["Peter", "James", "Peter", "James"]);
  });
  it("Patient.name.trace('tracing').given[0]", () => {
        const result = fhirpath(ctx, `Patient.name.trace('tracing').given[0]`, subject);
        expect(result).toEqual(["Peter"]);
  });
  it("Patient.name.given.select($this.single())", () => {
        const result = fhirpath(ctx, `Patient.name.given.select($this.single())`, subject);
        expect(result).toEqual(["Peter", "James", "Jim", "Peter", "James"]);
  });
  it("Patient.name.given.select($this.contains('Ja'))", () => {
        const result = fhirpath(ctx, `Patient.name.given.select($this.contains('Ja'))`, subject);
        expect(result).toEqual([false, true, false, false, true]);
  });
  it("Patient.name.given.select($this.length) = Patient.name.given.select(length)", () => {
        const result = fhirpath(ctx, `Patient.name.given.select($this.length) = Patient.name.given.select(length)`, subject);
        expect(result).toEqual([true]);
  });
  it("Patient.telecom.where($this.use = 'work')", () => {
        const result = fhirpath(ctx, `Patient.telecom.where($this.use = 'work')`, subject);
        expect(result).toEqual([{"use": "work", "rank": 1, "value": "(03) 5555 6473", "system": "phone"}]);
  });
  it("identifier.where($this.type.coding.code = 'MR').value", () => {
        const result = fhirpath(ctx, `identifier.where($this.type.coding.code = 'MR').value`, subject);
        expect(result).toEqual(["12345"]);
  });
  it("identifier.where($this.type.coding.code = 'Z').value", () => {
        const result = fhirpath(ctx, `identifier.where($this.type.coding.code = 'Z').value`, subject);
        expect(result).toEqual([]);
  });
  it("trace(name) doesn't affect the context of the following subexpressions - name.given.combine(name.family) = name.trace('n').given.combine(name.family)", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `name.given.combine(name.family) = name.trace('n').given.combine(name.family)`, subject);
        expect(result).toEqual([true]);
  });
  it("trace(name, projection) doesn't affect the context of the following subexpressions - name.given.combine(name.family) = name.trace('m', family).given.combine(name.family)", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `name.given.combine(name.family) = name.trace('m', family).given.combine(name.family)`, subject);
        expect(result).toEqual([true]);
  });
  it("Parenthesized expression - (2).combine(3)", () => {
        const result = fhirpath(ctx, `(2).combine(3)`, subject);
        expect(result).toEqual([2, 3]);
  });
  it("Evaluating expression for a part of a resource - {'base': 'QuestionnaireResponse.item', 'expression': 'answer.value = 2 year'}", () => {
        // Input file: questionnaire-part-example.json
        const result = fhirpath(ctx, `{"base": "QuestionnaireResponse.item", "expression": "answer.value = 2 year"}`, subject);
        expect(result).toEqual([true]);
  });
  it("type() function for the null element of a collection - Patient.name.given.type()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.type()`, subject);
        expect(result).toEqual([{"name": "string", "namespace": "FHIR"}, {"name": "string", "namespace": "FHIR"}, {"name": "string", "namespace": "FHIR"}, {"name": "string", "namespace": "FHIR"}]);
  });
  it("ofType() function for the null element of a collection (1) - Patient.name.given.ofType(string)[0]", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.ofType(string)[0]`, subject);
        expect(result).toEqual([]);
  });
  it("ofType() function for the null element of a collection (2) - Patient.name.given.ofType(string)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.ofType(string)`, subject);
        expect(result).toEqual(["Peter", "James"]);
  });
  it("ofType() function for the null element of a collection (3) - Patient.name.given.ofType(System.String)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.ofType(System.String)`, subject);
        expect(result).toEqual(["Peter", "James"]);
  });
});
