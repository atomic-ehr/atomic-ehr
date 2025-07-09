import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 02-path-navigation.yaml
// Tests for FHIRPath path navigation including simple paths, chained paths, and collection navigation

describe("Path Navigation", () => {

  describe("navigation", () => {
    it("Simple property access", () => {
      const fixture = {
        "name": "John Doe",
        "age": 30
      };
      // Access a simple property
      const result = fhirpath({}, `name`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("Simple property access with resourceType", () => {
      const fixture = {
        "resourceType": "Patient",
        "name": "John Doe",
        "age": 30
      };
      // Access property with explicit resource type
      const result = fhirpath({}, `Patient.name`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("Non-existent property", () => {
      const fixture = {
        "name": "John Doe",
        "age": 30
      };
      // Access non-existent property returns empty collection
      const result = fhirpath({}, `nonexistent`, fixture);
      expect(result).toEqual([]);
    });
    it("Chained property access", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William"
          ],
          "family": "Doe"
        },
        "age": 30
      };
      // Access nested property using chained paths
      const result = fhirpath({}, `name.given`, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("Deep chained property access", () => {
      const fixture = {
        "name": "John Doe",
        "contact": {
          "name": {
            "given": [
              "Jane"
            ],
            "family": "Smith"
          },
          "relationship": "spouse"
        }
      };
      // Access deeply nested property
      const result = fhirpath({}, `contact.name.given`, fixture);
      expect(result).toEqual(["Jane"]);
    });
    it("Collection property access", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John",
              "William"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Smith"
          }
        ]
      };
      // Access property from collection returns all values
      const result = fhirpath({}, `name.given`, fixture);
      expect(result).toEqual(["John","William","Bob"]);
    });
    it("Mixed collection access", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe",
            "prefix": [
              "Dr."
            ]
          },
          {
            "given": [
              "Jane"
            ],
            "family": "Smith"
          }
        ]
      };
      // Access property from mixed collection (some have property, some don't)
      const result = fhirpath({}, `name.prefix`, fixture);
      expect(result).toEqual(["Dr."]);
    });
    it("Empty collection navigation", () => {
      const fixture = {
        "name": [],
        "age": 30
      };
      // Navigate through empty collection
      const result = fhirpath({}, `name.given`, fixture);
      expect(result).toEqual([]);
    });
    it("Array index access - first element", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John",
              "William"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Smith"
          }
        ]
      };
      // Access first element of array using index
      const result = fhirpath({}, `name[0].given`, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("Array index access - second element", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John",
              "William"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Smith"
          }
        ]
      };
      // Access second element of array using index
      const result = fhirpath({}, `name[1].given`, fixture);
      expect(result).toEqual(["Bob"]);
    });
    it("Array index access - out of bounds", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John",
              "William"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Smith"
          }
        ]
      };
      // Access array element out of bounds returns empty
      const result = fhirpath({}, `name[5].given`, fixture);
      expect(result).toEqual([]);
    });
    it("Nested array index access", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John",
              "William"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Smith"
          }
        ]
      };
      // Access nested array element using index
      const result = fhirpath({}, `name[0].given[1]`, fixture);
      expect(result).toEqual(["William"]);
    });
    it("Escaped identifier with backticks", () => {
      const fixture = {
        "given": [
          "John",
          "William"
        ],
        "family": "Doe"
      };
      // Access property using escaped identifier
      const result = fhirpath({}, `\`given\``, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("Escaped identifier in chain", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William"
          ],
          "family": "Doe"
        }
      };
      // Use escaped identifier in chained path
      const result = fhirpath({}, `name.\`given\``, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("Reserved keyword as identifier", () => {
      const fixture = {
        "class": "inpatient",
        "status": "active"
      };
      // Access property that is a reserved keyword
      const result = fhirpath({}, `\`class\``, fixture);
      expect(result).toEqual(["inpatient"]);
    });
    it("Navigation through optional properties", () => {
      const fixture = {
        "name": "John Doe",
        "extension": {
          "url": "http://example.org/fhir/extension",
          "valueString": "test"
        }
      };
      // Navigate through properties that may not exist
      const result = fhirpath({}, `extension.url`, fixture);
      expect(result).toEqual(["http://example.org/fhir/extension"]);
    });
    it("Navigation with null intermediate", () => {
      const fixture = {
        "name": "John Doe",
        "contact": null
      };
      // Navigate through null intermediate property
      const result = fhirpath({}, `contact.name.given`, fixture);
      expect(result).toEqual([]);
    });
    it("Multiple equivalent expressions (expression 1)", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William"
          ],
          "family": "Doe"
        }
      };
      // Test equivalent ways to express the same navigation
      const result = fhirpath({}, `name.given`, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("Multiple equivalent expressions (expression 2)", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William"
          ],
          "family": "Doe"
        }
      };
      
      const result = fhirpath({}, `\`name\`.\`given\``, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("Multiple equivalent expressions (expression 3)", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William"
          ],
          "family": "Doe"
        }
      };
      
      const result = fhirpath({}, `name.\`given\``, fixture);
      expect(result).toEqual(["John","William"]);
    });
  });
});
