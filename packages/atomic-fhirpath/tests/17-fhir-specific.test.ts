import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 17-fhir-specific.yaml
// Tests for FHIR-specific FHIRPath functions including getValue(), hasValue(), extension(), and choice type handling

describe("FHIR-Specific Functions", () => {

  describe("fhir", () => {
    it("getValue() with string element", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "gender": "male",
          "_gender": {
            "extension": [
              {
                "url": "http://example.org/extension",
                "valueString": "metadata"
              }
            ]
          }
        }
      };
      // Test getValue() function with FHIR string element
      const result = fhirpath({}, `Patient.gender.getValue()`, fixture);
      expect(result).toEqual(["male"]);
    });
    it("getValue() with boolean element", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "active": true,
          "_active": {
            "extension": [
              {
                "url": "http://example.org/extension",
                "valueString": "active metadata"
              }
            ]
          }
        }
      };
      // Test getValue() function with FHIR boolean element
      const result = fhirpath({}, `Patient.active.getValue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("getValue() with integer element", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueInteger": 120,
          "_valueInteger": {
            "extension": [
              {
                "url": "http://example.org/unit",
                "valueString": "mmHg"
              }
            ]
          }
        }
      };
      // Test getValue() function with FHIR integer element
      const result = fhirpath({}, `Observation.valueInteger.getValue()`, fixture);
      expect(result).toEqual([120]);
    });
    it("getValue() with decimal element", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueDecimal": 98.6
        }
      };
      // Test getValue() function with FHIR decimal element
      const result = fhirpath({}, `Observation.valueDecimal.getValue()`, fixture);
      expect(result).toEqual([98.6]);
    });
    it("getValue() with collection", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": [
            {
              "given": [
                "John",
                "William"
              ],
              "family": "Doe"
            }
          ]
        }
      };
      // Test getValue() function with collection of primitive elements
      const result = fhirpath({}, `Patient.name.given.getValue()`, fixture);
      expect(result).toEqual(["John","William"]);
    });
    it("getValue() with complex element returns empty", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": [
            {
              "given": [
                "John"
              ],
              "family": "Doe"
            }
          ]
        }
      };
      // Test getValue() function with complex element returns empty
      const result = fhirpath({}, `Patient.name.getValue()`, fixture);
      expect(result).toEqual([]);
    });
    it("hasValue() with primitive element", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "gender": "male"
        }
      };
      // Test hasValue() function with primitive element
      const result = fhirpath({}, `Patient.gender.hasValue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("hasValue() with missing element", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        }
      };
      // Test hasValue() function with missing element
      const result = fhirpath({}, `Patient.gender.hasValue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("hasValue() with complex element", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": [
            {
              "given": [
                "John"
              ],
              "family": "Doe"
            }
          ]
        }
      };
      // Test hasValue() function with complex element
      const result = fhirpath({}, `Patient.name.hasValue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("hasValue() with extension-only element", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "_gender": {
            "extension": [
              {
                "url": "http://example.org/extension",
                "valueString": "metadata only"
              }
            ]
          }
        }
      };
      // Test hasValue() function with element having only extensions
      const result = fhirpath({}, `Patient.gender.hasValue()`, fixture);
      expect(result).toEqual([false]);
    });
    it("hasValue() with collection", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": [
            {
              "given": [
                "John",
                "William"
              ],
              "family": "Doe"
            },
            {
              "given": [],
              "family": "Smith"
            }
          ]
        }
      };
      // Test hasValue() function with collection of elements
      const result = fhirpath({}, `Patient.name.given.hasValue()`, fixture);
      expect(result).toEqual([true,true,false]);
    });
    it("extension() basic usage", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "extension": [
            {
              "url": "http://example.org/ethnicity",
              "valueString": "Hispanic"
            },
            {
              "url": "http://example.org/birthPlace",
              "valueString": "New York"
            }
          ]
        }
      };
      // Test extension() function basic usage
      const result = fhirpath({}, `Patient.extension('http://example.org/ethnicity')`, fixture);
      expect(result).toEqual([{"url":"http://example.org/ethnicity","valueString":"Hispanic"}]);
    });
    it("extension() with no matches", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "extension": [
            {
              "url": "http://example.org/ethnicity",
              "valueString": "Hispanic"
            }
          ]
        }
      };
      // Test extension() function with no matching extensions
      const result = fhirpath({}, `Patient.extension('http://example.org/nonexistent')`, fixture);
      expect(result).toEqual([]);
    });
    it("extension() with nested extensions", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "extension": [
            {
              "url": "http://example.org/name",
              "extension": [
                {
                  "url": "given",
                  "valueString": "preferredGiven"
                },
                {
                  "url": "family",
                  "valueString": "preferredFamily"
                }
              ]
            }
          ]
        }
      };
      // Test extension() function with nested extensions
      const result = fhirpath({}, `Patient.extension('http://example.org/name').extension('given')`, fixture);
      expect(result).toEqual([{"url":"given","valueString":"preferredGiven"}]);
    });
    it("extension() on element level", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": [
            {
              "given": [
                "John"
              ],
              "family": "Doe",
              "_family": {
                "extension": [
                  {
                    "url": "http://example.org/nameQuality",
                    "valueString": "verified"
                  }
                ]
              }
            }
          ]
        }
      };
      // Test extension() function on FHIR element extensions
      const result = fhirpath({}, `Patient.name.extension('http://example.org/nameQuality')`, fixture);
      expect(result).toEqual([{"url":"http://example.org/nameQuality","valueString":"verified"}]);
    });
    it("extension() with multiple matches", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "extension": [
            {
              "url": "http://example.org/identifier",
              "valueString": "SSN"
            },
            {
              "url": "http://example.org/identifier",
              "valueString": "DL"
            },
            {
              "url": "http://example.org/other",
              "valueString": "other"
            }
          ]
        }
      };
      // Test extension() function with multiple matching extensions
      const result = fhirpath({}, `Patient.extension('http://example.org/identifier').count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("Choice type string access", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueString": "positive"
        }
      };
      // Test choice type access with string value
      const result = fhirpath({}, `Observation.value.getValue()`, fixture);
      expect(result).toEqual(["positive"]);
    });
    it("Choice type quantity access", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueQuantity": {
            "value": 120,
            "unit": "mmHg",
            "system": "http://unitsofmeasure.org"
          }
        }
      };
      // Test choice type access with quantity value
      const result = fhirpath({}, `Observation.value.value`, fixture);
      expect(result).toEqual([120]);
    });
    it("Choice type boolean access", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueBoolean": true
        }
      };
      // Test choice type access with boolean value
      const result = fhirpath({}, `Observation.value.getValue()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Choice type type checking", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueQuantity": {
            "value": 120,
            "unit": "mmHg"
          }
        }
      };
      // Test choice type with type checking
      const result = fhirpath({}, `Observation.value is Quantity`, fixture);
      expect(result).toEqual([true]);
    });
    it("Choice type filtering", () => {
      const fixture = {
        "observations": [
          {
            "resourceType": "Observation",
            "valueString": "positive"
          },
          {
            "resourceType": "Observation",
            "valueQuantity": {
              "value": 120,
              "unit": "mmHg"
            }
          },
          {
            "resourceType": "Observation",
            "valueBoolean": false
          }
        ]
      };
      // Test choice type filtering by type
      const result = fhirpath({}, `observations.value.where($this is Quantity)`, fixture);
      expect(result).toEqual([{"value":120,"unit":"mmHg"}]);
    });
    it("Factory string function", () => {
      const fixture = {
        "dummy": true
      };
      // Test %factory.string() function
      const result = fhirpath({}, `%factory.string('test value')`, fixture);
      expect(result).toEqual(["test value"]);
    });
    it("Factory boolean function", () => {
      const fixture = {
        "dummy": true
      };
      // Test %factory.boolean() function
      const result = fhirpath({}, `%factory.boolean(true)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Factory integer function", () => {
      const fixture = {
        "dummy": true
      };
      // Test %factory.integer() function
      const result = fhirpath({}, `%factory.integer(42)`, fixture);
      expect(result).toEqual([42]);
    });
    it("Factory decimal function", () => {
      const fixture = {
        "dummy": true
      };
      // Test %factory.decimal() function
      const result = fhirpath({}, `%factory.decimal(3.14)`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("Factory quantity function", () => {
      const fixture = {
        "dummy": true
      };
      // Test %factory.quantity() function
      const result = fhirpath({}, `%factory.quantity(120, 'mmHg')`, fixture);
      expect(result).toEqual(["120 'mmHg'"]);
    });
    it("Contained resource basic access", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": {
            "given": [
              "John"
            ],
            "family": "Doe"
          },
          "contained": [
            {
              "resourceType": "Organization",
              "id": "org1",
              "name": "Acme Healthcare"
            },
            {
              "resourceType": "Practitioner",
              "id": "pract1",
              "name": {
                "given": [
                  "Jane"
                ],
                "family": "Smith"
              }
            }
          ]
        }
      };
      // Test contained resource basic access
      const result = fhirpath({}, `Patient.contained.where(resourceType = 'Organization').name`, fixture);
      expect(result).toEqual(["Acme Healthcare"]);
    });
    it("Contained resource reference resolution", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": {
            "given": [
              "John"
            ],
            "family": "Doe"
          },
          "managingOrganization": {
            "reference": "#org1"
          },
          "contained": [
            {
              "resourceType": "Organization",
              "id": "org1",
              "name": "Acme Healthcare"
            }
          ]
        }
      };
      // Test contained resource reference resolution
      const result = fhirpath({}, `Patient.resolve(managingOrganization.reference).name`, fixture);
      expect(result).toEqual(["Acme Healthcare"]);
    });
    it("Contained resource type filtering", () => {
      const fixture = {
        "Bundle": {
          "entry": [
            {
              "resource": {
                "resourceType": "Patient",
                "contained": [
                  {
                    "resourceType": "Practitioner",
                    "name": {
                      "family": "Smith"
                    }
                  },
                  {
                    "resourceType": "Organization",
                    "name": "Hospital"
                  }
                ]
              }
            },
            {
              "resource": {
                "resourceType": "Encounter",
                "contained": [
                  {
                    "resourceType": "Practitioner",
                    "name": {
                      "family": "Johnson"
                    }
                  }
                ]
              }
            }
          ]
        }
      };
      // Test contained resource filtering by type
      const result = fhirpath({}, `Bundle.entry.resource.contained.ofType(Practitioner).name.family`, fixture);
      expect(result).toEqual(["Smith","Johnson"]);
    });
    it("FHIR R4 specific behavior", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": [
            {
              "use": "official",
              "given": [
                "John"
              ],
              "family": "Doe"
            },
            {
              "use": "nickname",
              "given": [
                "Johnny"
              ]
            }
          ]
        }
      };
      // Test FHIR R4 specific behavior
      const result = fhirpath({}, `Patient.name.where(use = 'official').family.getValue()`, fixture);
      expect(result).toEqual(["Doe"]);
    });
    it("FHIR resource meta handling", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "meta": {
            "versionId": "1",
            "lastUpdated": "2023-01-01T10:00:00Z",
            "profile": [
              "http://example.org/StructureDefinition/CustomPatient"
            ]
          }
        }
      };
      // Test FHIR resource meta element handling
      const result = fhirpath({}, `Patient.meta.profile`, fixture);
      expect(result).toEqual(["http://example.org/StructureDefinition/CustomPatient"]);
    });
    it("Extension chain navigation", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "extension": [
            {
              "url": "http://example.org/complex",
              "extension": [
                {
                  "url": "nested",
                  "extension": [
                    {
                      "url": "deep",
                      "valueString": "deep value"
                    }
                  ]
                }
              ]
            }
          ]
        }
      };
      // Test complex extension chain navigation
      const result = fhirpath({}, `Patient.extension('http://example.org/complex').extension('nested').extension('deep').valueString`, fixture);
      expect(result).toEqual(["deep value"]);
    });
    it("Choice type with extensions", () => {
      const fixture = {
        "Observation": {
          "resourceType": "Observation",
          "valueQuantity": {
            "value": 120.45,
            "unit": "mmHg",
            "_value": {
              "extension": [
                {
                  "url": "http://example.org/precision",
                  "valueInteger": 2
                }
              ]
            }
          }
        }
      };
      // Test choice type elements with extensions
      const result = fhirpath({}, `Observation.value.extension('http://example.org/precision').valueInteger`, fixture);
      expect(result).toEqual([2]);
    });
    it("Bundle resource navigation", () => {
      const fixture = {
        "Bundle": {
          "resourceType": "Bundle",
          "entry": [
            {
              "resource": {
                "resourceType": "Patient",
                "name": {
                  "family": "Doe"
                }
              }
            },
            {
              "resource": {
                "resourceType": "Observation",
                "valueString": "normal"
              }
            },
            {
              "resource": {
                "resourceType": "Patient",
                "name": {
                  "family": "Smith"
                }
              }
            }
          ]
        }
      };
      // Test Bundle resource navigation patterns
      const result = fhirpath({}, `Bundle.entry.resource.where(resourceType = 'Patient').name.family`, fixture);
      expect(result).toEqual(["Doe","Smith"]);
    });
    it("getValue() on non-primitive returns empty", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "name": {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        }
      };
      // Test getValue() on non-primitive element returns empty collection
      const result = fhirpath({}, `Patient.name.getValue()`, fixture);
      expect(result).toEqual([]);
    });
    it("extension() with invalid URL", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "extension": [
            {
              "url": "http://example.org/valid",
              "valueString": "value"
            }
          ]
        }
      };
      // Test extension() function with malformed URL
      const result = fhirpath({}, `Patient.extension('not-a-url')`, fixture);
      expect(result).toEqual([]);
    });
    it("Contained resource circular reference", () => {
      const fixture = {
        "Patient": {
          "resourceType": "Patient",
          "id": "patient1",
          "contained": [
            {
              "resourceType": "Patient",
              "id": "self",
              "managingOrganization": {
                "reference": "#patient1"
              }
            }
          ]
        }
      };
      // Test contained resource with circular reference handling
      expect(() => {
        fhirpath({}, `Patient.contained.where(id = 'self')`, fixture);
      }).toThrow("Circular reference in contained resources");
    });
  });
});
