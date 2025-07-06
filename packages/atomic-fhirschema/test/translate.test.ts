import { describe, test, expect } from "bun:test";
import { translate } from "../src/translate";

describe("FHIR Schema Translation Algorithm", () => {
  test("basic path parsing and action calculation", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          { path: "R.a", short: "a" },
          { path: "R.b", short: "b" },
        ],
      },
    });

    expect(result).toMatchObject({
      elements: {
        a: { short: "a" },
        b: { short: "b" },
      },
    });
  });

  test("nested elements", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          { path: "R.a", short: "a" },
          { path: "R.b", short: "b" },
          { path: "R.c", short: "c" },
          { path: "R.c.d", short: "c.d" },
          { path: "R.c.d.f", short: "c.d.f" },
          { path: "R.c.d.i", short: "c.d.i" },
        ],
      },
    });

    expect(result).toMatchObject({
      elements: {
        a: { short: "a" },
        b: { short: "b" },
        c: {
          short: "c",
          elements: {
            d: {
              short: "c.d",
              elements: {
                f: { short: "c.d.f" },
                i: { short: "c.d.i" },
              },
            },
          },
        },
      },
    });
  });

  test("basic slicing", () => {
    const els = [
      {
        path: "R.x",
        short: "x",
        slicing: { discriminator: [{ type: "pattern", path: "a" }] },
      },
      { path: "R.x", sliceName: "s1" },
      { path: "R.x.a", short: "x.s1.a", patternString: "s1" },
      { path: "R.x.b", short: "x.s1.b" },
      { path: "R.x", sliceName: "s2" },
      { path: "R.x.a", short: "x.s2.a", patternString: "s2" },
      { path: "R.x.b", short: "x.s2.b" },
    ];

    const result = translate({
      url: "http://example.com/test",
      differential: { element: els },
    });

    expect(result).toMatchObject({
      elements: {
        x: {
          short: "x",
          slicing: {
            slices: {
              s1: {
                match: { a: "s1" },
                schema: {
                  elements: {
                    a: { short: "x.s1.a" },
                    b: { short: "x.s1.b" },
                  },
                },
              },
              s2: {
                match: { a: "s2" },
                schema: {
                  elements: {
                    a: { short: "x.s2.a" },
                    b: { short: "x.s2.b" },
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  test("cardinality constraints", () => {
    const result1 = translate({
      url: "http://example.com/test",
      differential: {
        element: [{ path: "A.x", min: 1, max: "*" }],
      },
    });

    expect(result1).toMatchObject({
      required: expect.arrayContaining(["x"]),
      elements: {
        x: {
          array: true,
          min: 1,
        },
      },
    });

    const result2 = translate({
      url: "http://example.com/test",
      differential: {
        element: [{ path: "A.x", min: 1, max: "10" }],
      },
    });

    expect(result2).toMatchObject({
      required: expect.arrayContaining(["x"]),
      elements: {
        x: {
          array: true,
          min: 1,
          max: 10,
        },
      },
    });
  });

  test("type specification", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [{ path: "A.x", type: [{ code: "string" }] }],
      },
    });

    expect(result).toMatchObject({
      elements: {
        x: { type: "string" },
      },
    });
  });

  test("choice types (union elements)", () => {
    const unionEls = [
      { path: "R.value[x]", type: [{ code: "string" }, { code: "Quantity" }] },
      { path: "R.valueQuantity.unit", short: "unit" },
    ];

    const result = translate({
      url: "http://example.com/test",
      differential: { element: unionEls },
    });

    expect(result).toMatchObject({
      elements: {
        value: {
          choices: expect.arrayContaining(["valueString", "valueQuantity"]),
        },
        valueString: {
          type: "string",
          choiceOf: "value",
        },
        valueQuantity: {
          type: "Quantity",
          choiceOf: "value",
          elements: {
            unit: { short: "unit" },
          },
        },
      },
    });
  });

  test("choice types without [x] suffix", () => {
    const unionElsNoSuffix = [
      { path: "R.value", type: [{ code: "string" }, { code: "Quantity" }] },
      { path: "R.valueQuantity.unit", short: "unit" },
    ];

    const result = translate({
      url: "http://example.com/test",
      differential: { element: unionElsNoSuffix },
    });

    expect(result).toMatchObject({
      elements: {
        value: {
          choices: expect.arrayContaining(["valueString", "valueQuantity"]),
        },
        valueString: {
          type: "string",
          choiceOf: "value",
        },
        valueQuantity: {
          type: "Quantity",
          choiceOf: "value",
          elements: {
            unit: { short: "unit" },
          },
        },
      },
    });
  });

  test("complex slicing with patterns", () => {
    const elements = [
      {
        path: "R.category",
        slicing: {
          discriminator: [{ type: "pattern", path: "$this" }],
          rules: "open",
        },
        min: 1,
        max: "10",
        mustSupport: true,
      },
      {
        path: "R.category",
        sliceName: "LaboratorySlice",
        min: 2,
        max: "3",
        patternCodeableConcept: {
          coding: [{ system: "CodeSystem", code: "LAB" }],
        },
        mustSupport: true,
      },
      {
        path: "R.category",
        sliceName: "RadiologySlice",
        min: 4,
        max: "5",
        patternCodeableConcept: {
          coding: [{ system: "CodeSystem", code: "RAD" }],
        },
        mustSupport: true,
      },
    ];

    const result = translate({
      url: "http://example.com/test",
      differential: { element: elements },
    });

    expect(result).toMatchObject({
      required: expect.arrayContaining(["category"]),
      elements: {
        category: {
          mustSupport: true,
          min: 1,
          max: 10,
          slicing: {
            discriminator: [{ type: "pattern", path: "$this" }],
            rules: "open",
            slices: {
              LaboratorySlice: {
                schema: {
                  pattern: {
                    type: "CodeableConcept",
                    value: { coding: [{ system: "CodeSystem", code: "LAB" }] },
                  },
                  mustSupport: true,
                },
                _required: true,
                min: 2,
                max: 3,
                match: { coding: [{ system: "CodeSystem", code: "LAB" }] },
              },
              RadiologySlice: {
                schema: {
                  pattern: {
                    type: "CodeableConcept",
                    value: { coding: [{ system: "CodeSystem", code: "RAD" }] },
                  },
                  mustSupport: true,
                },
                _required: true,
                min: 4,
                max: 5,
                match: { coding: [{ system: "CodeSystem", code: "RAD" }] },
              },
            },
          },
        },
      },
    });
  });

  test("extension handling", () => {
    const elements = [
      { path: "Patient", mustSupport: false },
      { path: "Patient.name", mustSupport: true },
      {
        path: "Patient.extension",
        slicing: {
          discriminator: [{ type: "value", path: "url" }],
          rules: "open",
        },
      },
      {
        sliceName: "race",
        path: "Patient.extension",
        min: 1,
        max: "1",
        type: [
          {
            code: "Extension",
            profile: [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
            ],
          },
        ],
      },
      {
        sliceName: "ethnicity",
        path: "Patient.extension",
        min: 0,
        max: "1",
        type: [
          {
            code: "Extension",
            profile: [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            ],
          },
        ],
      },
      {
        sliceName: "tribal",
        path: "Patient.extension",
        min: 0,
        max: "8",
        type: [
          {
            code: "Extension",
            profile: [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation",
            ],
          },
        ],
      },
      {
        sliceName: "birthSex",
        path: "Patient.extension",
        min: 0,
        max: "1",
        short: "Birth Sex Extension",
        type: [
          {
            code: "Extension",
            profile: [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
            ],
          },
        ],
      },
    ];

    const result = translate({
      url: "http://example.com/test",
      differential: { element: elements },
    });

    expect(result).toMatchObject({
      extensions: {
        race: {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
          min: 1,
          max: 1,
        },
        ethnicity: {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
          max: 1,
        },
        tribal: {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation",
          max: 8,
        },
        birthSex: {
          short: "Birth Sex Extension",
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
        },
      },
      elements: {
        name: { mustSupport: true },
      },
    });
  });

  test("reference types", () => {
    const result1 = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          {
            path: "CareTeam.member",
            type: [
              {
                code: "Reference",
                targetProfile:
                  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient",
              },
              {
                code: "Reference",
                targetProfile:
                  "http://hl7.org/fhir/StructureDefinition/Practitioner",
              },
              {
                code: "Reference",
                targetProfile:
                  "http://hl7.org/fhir/StructureDefinition/RelatedPerson",
              },
              { code: "Reference" },
            ],
          },
        ],
      },
    });

    expect(result1).toMatchObject({
      elements: {
        member: {
          type: "Reference",
          refers: expect.arrayContaining([
            "http://hl7.org/fhir/StructureDefinition/Practitioner",
            "http://hl7.org/fhir/StructureDefinition/RelatedPerson",
            "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient",
          ]),
        },
      },
    });

    const result2 = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          {
            path: "CareTeam.member",
            type: [{ code: "Reference" }],
          },
        ],
      },
    });

    expect(result2).toMatchObject({
      elements: {
        member: {
          type: "Reference",
          // refers should be undefined/not present
        },
      },
    });
  });

  test("binding with extensions", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          {
            path: "Patient.gender",
            type: [{ code: "code" }],
            binding: {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
                  valueString: "AdministrativeGender",
                },
                {
                  url: "http://hl7.org/fhir/StructureDefinition/elementdefinition-isCommonBinding",
                  valueBoolean: true,
                } as any,
              ],
              strength: "required",
              description:
                "The gender of a person used for administrative purposes.",
              valueSet:
                "http://hl7.org/fhir/ValueSet/administrative-gender|6.0.0-ballot2",
            },
          },
        ],
      },
    });

    expect(result).toMatchObject({
      elements: {
        gender: {
          type: "code",
          binding: {
            strength: "required",
            valueSet:
              "http://hl7.org/fhir/ValueSet/administrative-gender|6.0.0-ballot2",
            bindingName: "AdministrativeGender",
          },
        },
      },
    });
  });

  test("nested reference types", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          { path: "DocumentReference" },
          {
            path: "DocumentReference.context.related",
            type: [
              {
                code: "Reference",
                targetProfile: [
                  "http://hl7.org/fhir/uv/genomics-reporting/StructureDefinition/genomics-report",
                ],
              },
            ],
          },
        ],
      },
    });

    expect(result).toMatchObject({
      elements: {
        context: {
          elements: {
            related: {
              type: "Reference",
              refers: [
                "http://hl7.org/fhir/uv/genomics-reporting/StructureDefinition/genomics-report",
              ],
            },
          },
        },
      },
    });
  });

  test("resource header building", () => {
    const result = translate({
      url: "http://hl7.org/fhir/StructureDefinition/Profile",
      baseDefinition: "http://hl7.org/fhir/StructureDefinition/Observation",
      kind: "resource",
      derivation: "specialization",
      differential: {
        element: [
          { path: "Observation", short: "US Core Blood Pressure Profile" },
        ],
      },
    });

    expect(result).toMatchObject({
      url: "http://hl7.org/fhir/StructureDefinition/Profile",
      base: "http://hl7.org/fhir/StructureDefinition/Observation",
      kind: "resource",
      derivation: "specialization",
      class: "resource",
    });
  });

  test("primitive types", () => {
    const result = translate({
      kind: "primitive-type",
      url: "http://hl7.org/fhir/StructureDefinition/string",
      differential: {
        element: [],
      },
    });

    expect(result).toMatchObject({
      kind: "primitive-type",
      url: "http://hl7.org/fhir/StructureDefinition/string",
    });

    expect(result.elements).toBeUndefined();
  });

  test("profile classification", () => {
    const profileResult = translate({
      url: "http://example.com/test",
      kind: "resource",
      derivation: "constraint",
      type: "Patient",
      differential: {
        element: [],
      },
    });

    expect(profileResult).toMatchObject({
      class: "profile",
    });

    const extensionResult = translate({
      url: "http://example.com/test",
      type: "Extension",
      differential: {
        element: [],
      },
    });

    expect(extensionResult).toMatchObject({
      class: "extension",
    });
  });

  test("pattern processing", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          {
            path: "R.code",
            patternCodeableConcept: {
              coding: [{ system: "http://loinc.org", code: "85354-9" }],
            },
          },
        ],
      },
    });

    expect(result).toMatchObject({
      elements: {
        code: {
          pattern: {
            type: "CodeableConcept",
            value: {
              coding: [{ system: "http://loinc.org", code: "85354-9" }],
            },
          },
        },
      },
    });
  });

  test("fixed value processing", () => {
    const result = translate({
      url: "http://example.com/test",
      differential: {
        element: [
          {
            path: "R.system",
            fixedUri: "http://unitsofmeasure.org",
          },
        ],
      },
    });

    expect(result).toMatchObject({
      elements: {
        system: {
          pattern: {
            type: "uri",
            value: "http://unitsofmeasure.org",
          },
        },
      },
    });
  });

  test("final example", async () => {
    const sampleData = await Bun.file("test/samples/patient.sd.json").json()

    const result = translate(sampleData);

    //console.log(result);
    expect(result).toMatchObject({
      url: "http://hl7.org/fhir/StructureDefinition/Patient",
      type: "Patient",
      elements: {
        identifier: {
          type: "Identifier",
          array: true,
          min: 1,
          isSummary: true,
        },
        active: {
          type: "boolean",
        },
      },
    });
  });

  test("performance test - translate patient 10000 times", async () => {
    const sampleData = await Bun.file("test/samples/patient.sd.json").json()

    const iterations = 10000;
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      translate(sampleData);
    }

    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const averageTime = totalTime / iterations;

    console.log(`Performance test results:`);
    console.log(`Total time for ${iterations} iterations: ${totalTime.toFixed(2)}ms`);
    console.log(`Average time per iteration: ${averageTime.toFixed(4)}ms`);
    console.log(`Operations per second: ${(iterations / (totalTime / 1000)).toFixed(2)}`);

    // Basic assertion to ensure the test actually runs
    expect(totalTime).toBeGreaterThan(0);
    expect(averageTime).toBeGreaterThan(0);
    // Assert that the performance is acceptable (less than 1 second total)
    expect(totalTime).toBeLessThan(1000);
  });
});
