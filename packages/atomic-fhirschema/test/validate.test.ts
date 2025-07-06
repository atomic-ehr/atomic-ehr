import { describe, test, expect } from "bun:test";
import { validate, validateSchemas, ValidationResult, ValidationError } from "../src/validate";

// Test context with schema definitions
const ctx = {
  schemas: {
    "HumanName": {
      elements: {
        family: { type: "string" },
        given: { array: true, type: "string" },
        use: { type: "Coding" }
      }
    },
    "Extension": {
      elements: {
        id: { type: "code" },
        url: { type: "url" },
        valueString: { type: "string" },
        valueCode: { type: "code" }
      }
    },
    "Patient": {
      base: "Resource",
      elements: {
        name: { array: true, type: "HumanName" }
      }
    },
    "Coding": {
      elements: {
        code: { type: "string" },
        system: { type: "string" }
      }
    },
    "Resource": {
      elements: {
        resourceType: { type: "code" },
        id: { type: "string" }
      }
    },
    "boolean": { kind: "primitive-type", type: "boolean" },
    "code": { kind: "primitive-type", type: "string" },
    "url": { kind: "primitive-type", type: "string" },
    "string": { kind: "primitive-type", type: "string" }
  }
};

// Helper function to match errors with expected patterns
function matchErrors(data: any, expectedErrors: Partial<ValidationError>[]): ValidationResult {
  const result = validate(ctx, [], data);
  
  // Check that we have the expected number of errors
  expect(result.errors).toHaveLength(expectedErrors.length);
  
  // Check each error matches the pattern
  for (let i = 0; i < expectedErrors.length; i++) {
    const error = result.errors[i];
    const expected = expectedErrors[i];
    
    if (expected.type) expect(error.type).toBe(expected.type);
    if (expected.path) expect(error.path).toEqual(expected.path);
    if (expected.message) expect(error.message).toBe(expected.message);
    if (expected.value !== undefined) expect(error.value).toEqual(expected.value);
    if (expected.expected !== undefined) expect(error.expected).toEqual(expected.expected);
  }
  
  return result;
}

// Helper function to match schema validation
function matchSchema(schema: any, data: any, expectedErrors: Partial<ValidationError>[]): ValidationResult {
  const result = validateSchemas(ctx, [schema], data);
  
  // Check that we have the expected number of errors
  expect(result.errors).toHaveLength(expectedErrors.length);
  
  // Check each error matches the pattern
  for (let i = 0; i < expectedErrors.length; i++) {
    const error = result.errors[i];
    const expected = expectedErrors[i];
    
    if (expected.type) expect(error.type).toBe(expected.type);
    if (expected.path) expect(error.path).toEqual(expected.path);
    if (expected.message) expect(error.message).toBe(expected.message);
    if (expected.value !== undefined) expect(error.value).toEqual(expected.value);
    if (expected.expected !== undefined) expect(error.expected).toEqual(expected.expected);
  }
  
  return result;
}

describe("FHIR Schema Validation", () => {
  
  test("string type validation - valid", () => {
    matchSchema({ type: "string" }, "string", []);
  });
  
  test("string type validation - invalid number", () => {
    matchSchema({ type: "string" }, 1, [
      { type: "type", path: [] }
    ]);
  });
  
  test("string type validation - invalid boolean", () => {
    matchSchema({ type: "string" }, true, [
      { type: "type", path: [] }
    ]);
  });
  
  test("object with valid string element", () => {
    matchSchema(
      { elements: { name: { type: "string" } } },
      { name: "ok" },
      []
    );
  });
  
  test("object with unknown element", () => {
    matchSchema(
      { elements: { name: { type: "string" } } },
      { unknown: "ups" },
      [{ type: "element/unknown", path: ["unknown"] }]
    );
  });
  
  test("nested elements - valid", () => {
    matchSchema(
      { elements: { name: { elements: { family: { type: "string" } } } } },
      { name: { family: "family" } },
      []
    );
  });
  
  test("nested elements - unknown nested element", () => {
    matchSchema(
      { elements: { name: { elements: { family: { type: "string" } } } } },
      { name: { unknown: "ups" } },
      [{ type: "element/unknown", path: ["name", "unknown"] }]
    );
  });
  
  test("array validation - valid", () => {
    matchSchema(
      { elements: { name: { array: true, elements: { family: { type: "string" } } } } },
      { name: [{ family: "family" }] },
      []
    );
  });
  
  test("array validation - not array when expected", () => {
    matchSchema(
      { elements: { name: { array: true, elements: { family: { type: "string" } } } } },
      { name: { family: "family" } },
      [{ 
        type: "type/array", 
        message: "Expected array", 
        path: ["name"], 
        value: { family: "family" } 
      }]
    );
  });
  
  test("array validation - unknown element in array", () => {
    matchSchema(
      { elements: { name: { array: true, elements: { family: { type: "string" } } } } },
      { name: [{ family: "family", ups: "x" }] },
      [{ type: "element/unknown", path: ["name", 0, "ups"] }]
    );
  });
  
  test("nested array with complex structure", () => {
    matchSchema(
      { 
        elements: { 
          name: { 
            array: true,
            elements: { 
              family: { type: "string" },
              type: { elements: { code: { type: "string" } } }
            }
          }
        }
      },
      { name: [{ family: "family", type: { code: "ok" } }] },
      []
    );
  });
  
  test("type validation error in nested array", () => {
    matchSchema(
      { 
        elements: { 
          name: { 
            array: true,
            elements: { 
              family: { type: "string" },
              type: { elements: { code: { type: "string" } } }
            }
          }
        }
      },
      { name: [{ family: "family", type: { code: 1 } }] },
      [{ 
        type: "type",
        message: "Expected type string",
        value: 1,
        path: ["name", 0, "type", "code"]
      }]
    );
  });
  
  test("schema type reference validation", () => {
    matchSchema(
      { elements: { name: { array: true, type: "HumanName" } } },
      { name: [{ family: "f", given: ["g1", "g2"] }] },
      []
    );
  });
  
  test("schema type reference with type error", () => {
    matchSchema(
      { elements: { name: { array: true, type: "HumanName" } } },
      { name: [{ family: 1 }] },
      [{ 
        type: "type",
        message: "Expected type string",
        value: 1,
        path: ["name", 0, "family"]
      }]
    );
  });
  
  test("choice validation - multiple choices error", () => {
    matchSchema(
      {
        choices: { value: ["valueString", "valueCode"] },
        elements: {
          label: { type: "string" },
          valueString: { type: "string", choiceOf: "value" },
          valueCode: { type: "code", choiceOf: "value" }
        }
      },
      { valueString: "a", valueCode: "c", label: "x" },
      [{ 
        type: "choices/multiple",
        path: ["value"],
        message: "Only one choice element is allowed",
        value: { valueString: "a", valueCode: "c" }
      }]
    );
  });
  
  test("choice validation - excluded choice error", () => {
    matchSchema(
      {
        choices: { value: ["valueString"] },
        elements: {
          label: { type: "string" },
          valueString: { type: "string", choiceOf: "value" },
          valueCode: { type: "code", choiceOf: "value" }
        }
      },
      { valueCode: "c", label: "x" },
      [{ 
        type: "choice/excluded",
        message: "Choice element value is not allowed, only valueString",
        path: ["value"]
      }]
    );
  });
  
  test("required validation - valid", () => {
    matchSchema(
      {
        required: ["name"],
        elements: { name: { type: "string" } }
      },
      { name: "john" },
      []
    );
  });
  
  test("required validation - satisfied by primitive extension", () => {
    matchSchema(
      {
        required: ["name"],
        elements: { name: { type: "string" } }
      },
      { _name: { extension: [{ url: "ext", valueString: "ok" }] } },
      []
    );
  });
  
  test("required validation - missing element", () => {
    matchSchema(
      {
        required: ["name"],
        elements: { name: { type: "string" } }
      },
      {},
      [{ type: "require", path: ["name"] }]
    );
  });
  
  test("min cardinality validation", () => {
    matchSchema(
      { elements: { name: { array: true, type: "string", min: 1, max: 2 } } },
      { name: [] },
      [{ 
        type: "min",
        message: "expected min=1 got 0",
        value: 0,
        expected: 1,
        path: ["name"]
      }]
    );
  });
  
  test("max cardinality validation", () => {
    matchSchema(
      { elements: { name: { array: true, type: "string", min: 1, max: 2 } } },
      { name: ["a", "b", "c"] },
      [{ 
        type: "max",
        message: "expected max=2 got 3",
        value: 3,
        expected: 2,
        path: ["name"]
      }]
    );
  });
  
  test("pattern validation - valid", () => {
    matchSchema(
      { elements: { name: { elements: { use: { type: "string", pattern: { string: "home" } } } } } },
      { name: { use: "home" } },
      []
    );
  });
  
  test("pattern validation - invalid", () => {
    matchSchema(
      { elements: { name: { elements: { use: { type: "string", pattern: { string: "home" } } } } } },
      { name: { use: "hotel" } },
      [{ 
        type: "pattern",
        expected: "home",
        value: "hotel",
        path: ["name", "use"]
      }]
    );
  });
  
  test("complex Patient example", () => {
    matchSchema(
      {
        base: "Resource",
        elements: {
          resourceType: { type: "code" },
          name: { array: true, type: "HumanName" },
          active: { type: "boolean" },
          extension: { array: true, type: "Extension" }
        }
      },
      {
        resourceType: "Patient",
        name: [
          {
            family: "Smith",
            given: ["John", "Jacob"],
            use: "official"
          },
          {
            family: "Smith", 
            given: ["Johnny"],
            use: "nickname"
          }
        ],
        active: true,
        extension: [
          {
            url: "http://example.org/fhir/StructureDefinition/preferred-contact-method",
            valueString: "email"
          }
        ]
      },
      []
    );
  });
  
  test("nested extensions", () => {
    matchSchema(
      {
        elements: {
          extension: {
            array: true,
            type: "Extension",
            elements: {
              extension: { array: true, type: "Extension" }
            }
          }
        }
      },
      {
        extension: [
          {
            url: "http://example.org/parent",
            extension: [
              {
                url: "http://example.org/child",
                valueString: "nested value"
              }
            ]
          }
        ]
      },
      []
    );
  });
});

describe("Primitive Types and Extensions", () => {
  
  test("basic string validation", () => {
    matchSchema(
      { elements: { gender: { type: "string" } } },
      { gender: "male" },
      []
    );
  });
  
  test("primitive extension satisfies required", () => {
    matchSchema(
      {
        required: ["gender"],
        elements: { gender: { type: "string" } }
      },
      { _gender: { extension: [{ url: "data-absent-reason", valueCode: "asked-unknown" }] } },
      []
    );
  });
  
  test("primitive extensions with arrays - valid alignment", () => {
    matchSchema(
      { elements: { code: { array: true, type: "string" } } },
      {
        code: ["au", "nz"],
        _code: [
          null,
          {
            extension: [
              {
                url: "http://hl7.org/fhir/StructureDefinition/display",
                valueString: "New Zealand a.k.a Kiwiland"
              }
            ]
          }
        ]
      },
      []
    );
  });
  
  test("primitive extensions with mixed null and extension values", () => {
    matchSchema(
      { elements: { code: { array: true, type: "string" } } },
      {
        code: [null, "nz"],
        _code: [
          { extension: [{ url: "data-absent-reason", valueCode: "error" }] },
          {
            extension: [
              {
                url: "http://hl7.org/fhir/StructureDefinition/display",
                valueString: "New Zealand a.k.a Kiwiland"
              }
            ]
          }
        ]
      },
      []
    );
  });
  
  test("type mismatch error", () => {
    matchSchema(
      { elements: { gender: { type: "string" } } },
      { gender: 1 },
      [{ 
        type: "type",
        message: "Expected type string",
        value: 1,
        path: ["gender"]
      }]
    );
  });
  
  test("array vs non-array mismatch - array expected", () => {
    matchSchema(
      { elements: { value: { type: "string", array: true } } },
      { value: "male" },
      [{ 
        type: "type/array",
        message: "Expected array",
        path: ["value"],
        value: "male"
      }]
    );
  });
  
  test("array vs non-array mismatch - non-array expected", () => {
    matchSchema(
      { elements: { gender: { type: "string" } } },
      { gender: ["male"] },
      [{ 
        type: "type/array",
        message: "Expected not array",
        path: ["gender"],
        value: ["male"]
      }]
    );
  });
  
  test("object passed instead of primitive", () => {
    matchSchema(
      { elements: { gender: { type: "string" } } },
      { gender: { value: "male" } },
      [
        { 
          type: "type",
          message: "Expected type string",
          value: { value: "male" },
          path: ["gender"]
        },
        { 
          type: "element/unknown", 
          path: ["gender", "value"] 
        }
      ]
    );
  });
});

describe("Edge Cases and Error Handling", () => {
  
  test("empty object validation", () => {
    matchSchema({}, {}, []);
  });
  
  test("null value handling", () => {
    matchSchema(
      { elements: { name: { type: "string" } } },
      { name: null },
      [{ 
        type: "type",
        message: "Expected type string",
        value: null,
        path: ["name"]
      }]
    );
  });
  
  test("undefined value handling", () => {
    matchSchema(
      { elements: { name: { type: "string" } } },
      { name: undefined },
      [{ 
        type: "type",
        message: "Expected type string", 
        value: undefined,
        path: ["name"]
      }]
    );
  });
  
  test("deeply nested structures", () => {
    matchSchema(
      {
        elements: {
          level1: {
            elements: {
              level2: {
                elements: {
                  level3: {
                    elements: {
                      value: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      {
        level1: {
          level2: {
            level3: {
              value: "deep"
            }
          }
        }
      },
      []
    );
  });
  
  test("array with mixed valid and invalid items", () => {
    matchSchema(
      { elements: { items: { array: true, elements: { name: { type: "string" } } } } },
      { 
        items: [
          { name: "valid" },
          { name: 123 },
          { name: "also valid" }
        ]
      },
      [{ 
        type: "type",
        message: "Expected type string",
        value: 123,
        path: ["items", 1, "name"]
      }]
    );
  });
});