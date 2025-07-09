import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 04-functions-filtering.yaml
// Tests for FHIRPath filtering functions including where(), select(), and distinct()

describe("Filtering Functions", () => {

  describe("functions", () => {
    it("where() with simple condition", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe",
            "use": "official"
          },
          {
            "given": [
              "Johnny"
            ],
            "family": "Doe",
            "use": "nickname"
          }
        ]
      };
      // Test where() function with simple equality condition
      const result = fhirpath({}, `name.where(use = 'official')`, fixture);
      expect(result).toEqual([{"given":["John"],"family":"Doe","use":"official"}]);
    });
    it("where() with no matches", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe",
            "use": "official"
          },
          {
            "given": [
              "Johnny"
            ],
            "family": "Doe",
            "use": "nickname"
          }
        ]
      };
      // Test where() function with condition that matches nothing
      const result = fhirpath({}, `name.where(use = 'maiden')`, fixture);
      expect(result).toEqual([]);
    });
    it("where() with exists condition", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "Dr. John"
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
      // Test where() function with exists condition
      const result = fhirpath({}, `name.where(prefix.exists())`, fixture);
      expect(result).toEqual([{"given":["Dr. John"],"family":"Doe","prefix":["Dr."]}]);
    });
    it("where() with nested property", () => {
      const fixture = {
        "contact": [
          {
            "name": "Jane Doe",
            "relationship": {
              "coding": {
                "code": "spouse"
              }
            }
          },
          {
            "name": "Bob Smith",
            "relationship": {
              "coding": {
                "code": "brother"
              }
            }
          }
        ]
      };
      // Test where() function with nested property condition
      const result = fhirpath({}, `contact.where(relationship.coding.code = 'spouse')`, fixture);
      expect(result).toEqual([{"name":"Jane Doe","relationship":{"coding":{"code":"spouse"}}}]);
    });
    it("where() with multiple conditions", () => {
      const fixture = {
        "telecom": [
          {
            "system": "phone",
            "use": "home",
            "value": "555-1234"
          },
          {
            "system": "phone",
            "use": "work",
            "value": "555-5678"
          },
          {
            "system": "email",
            "use": "home",
            "value": "john@example.com"
          }
        ]
      };
      // Test where() function with multiple conditions using and
      const result = fhirpath({}, `telecom.where(system = 'phone' and use = 'home')`, fixture);
      expect(result).toEqual([{"system":"phone","use":"home","value":"555-1234"}]);
    });
    it("where() with $this reference", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William",
            "Bob"
          ],
          "family": "Doe"
        }
      };
      // Test where() function with $this reference
      const result = fhirpath({}, `name.given.where($this.length() > 4)`, fixture);
      expect(result).toEqual(["William"]);
    });
    it("select() with simple property", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Jane"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test select() function with simple property selection
      const result = fhirpath({}, `name.select(family)`, fixture);
      expect(result).toEqual(["Doe","Smith"]);
    });
    it("select() with nested property", () => {
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
              "Jane",
              "Elizabeth"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test select() function with nested property selection
      const result = fhirpath({}, `name.select(given.first())`, fixture);
      expect(result).toEqual(["John","Jane"]);
    });
    it("select() with expression", () => {
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
              "Jane"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test select() function with expression
      const result = fhirpath({}, `name.select(given.count())`, fixture);
      expect(result).toEqual([2,1]);
    });
    it("select() with conditional expression", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe",
            "use": "official"
          },
          {
            "given": [
              "Jane"
            ],
            "family": "Smith",
            "use": "nickname"
          }
        ]
      };
      // Test select() function with conditional expression
      const result = fhirpath({}, `name.select(iif(use = 'official', family, given.first()))`, fixture);
      expect(result).toEqual(["Doe","Jane"]);
    });
    it("select() with union operation", () => {
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
              "Jane"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test select() function with union operation
      const result = fhirpath({}, `name.select(given | family)`, fixture);
      expect(result).toEqual([["John","William","Doe"],["Jane","Smith"]]);
    });
    it("select() with $this reference", () => {
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
              "Jane"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test select() function with $this reference
      const result = fhirpath({}, `name.given.select($this.upper())`, fixture);
      expect(result).toEqual(["JOHN","WILLIAM","JANE"]);
    });
    it("distinct() with duplicates", () => {
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
              "Jane",
              "John"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test distinct() function with duplicate values
      const result = fhirpath({}, `name.given.distinct()`, fixture);
      expect(result).toEqual(["John","William","Jane"]);
    });
    it("distinct() with no duplicates", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Jane"
            ],
            "family": "Smith"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Johnson"
          }
        ]
      };
      // Test distinct() function with no duplicate values
      const result = fhirpath({}, `name.family.distinct()`, fixture);
      expect(result).toEqual(["Doe","Smith","Johnson"]);
    });
    it("distinct() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test distinct() function on empty collection
      const result = fhirpath({}, `nonexistent.distinct()`, fixture);
      expect(result).toEqual([]);
    });
    it("distinct() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test distinct() function on single element
      const result = fhirpath({}, `name.distinct()`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("distinct() with mixed types", () => {
      const fixture = {
        "values": [
          "text",
          42,
          true,
          "text",
          42
        ]
      };
      // Test distinct() function with mixed data types
      const result = fhirpath({}, `values.distinct()`, fixture);
      expect(result).toEqual(["text",42,true]);
    });
    it("Chained where() and select()", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe",
            "use": "official"
          },
          {
            "given": [
              "Johnny"
            ],
            "family": "Doe",
            "use": "nickname"
          }
        ]
      };
      // Test chaining where() and select() functions
      const result = fhirpath({}, `name.where(use = 'official').select(family)`, fixture);
      expect(result).toEqual(["Doe"]);
    });
    it("Chained select() and distinct()", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          },
          {
            "given": [
              "Jane"
            ],
            "family": "Smith"
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Doe"
          }
        ]
      };
      // Test chaining select() and distinct() functions
      const result = fhirpath({}, `name.select(family).distinct()`, fixture);
      expect(result).toEqual(["Doe","Smith"]);
    });
    it("Chained where(), select(), and distinct()", () => {
      const fixture = {
        "telecom": [
          {
            "system": "phone",
            "use": "home",
            "value": "555-1234"
          },
          {
            "system": "phone",
            "use": "work",
            "value": "555-5678"
          },
          {
            "system": "phone",
            "use": "home",
            "value": "555-9999"
          },
          {
            "system": "email",
            "use": "home",
            "value": "john@example.com"
          }
        ]
      };
      // Test chaining where(), select(), and distinct() functions
      const result = fhirpath({}, `telecom.where(system = 'phone').select(use).distinct()`, fixture);
      expect(result).toEqual(["home","work"]);
    });
    it("Complex where() with nested conditions", () => {
      const fixture = {
        "contact": [
          {
            "name": {
              "given": [
                "Jane"
              ]
            },
            "relationship": {
              "coding": {
                "code": "spouse"
              }
            }
          },
          {
            "name": {
              "family": "Smith"
            },
            "relationship": {
              "text": "brother"
            }
          }
        ]
      };
      // Test complex where() function with nested conditions
      const result = fhirpath({}, `contact.where(relationship.coding.exists() and name.given.exists())`, fixture);
      expect(result).toEqual([{"name":{"given":["Jane"]},"relationship":{"coding":{"code":"spouse"}}}]);
    });
    it("Select with complex expression", () => {
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
              "Jane"
            ],
            "family": "Smith"
          }
        ]
      };
      // Test select() with complex expression involving multiple operations
      const result = fhirpath({}, `name.select(given.first() + ' ' + family)`, fixture);
      expect(result).toEqual(["John Doe","Jane Smith"]);
    });
  });
});
