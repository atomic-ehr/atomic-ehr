import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 05-functions-aggregate.yaml
// Tests for FHIRPath aggregate functions including all(), any(), and sum()

describe("Aggregate Functions", () => {

  describe("functions", () => {
    it("all() with true condition on all elements", () => {
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
      // Test all() function where condition is true for all elements
      const result = fhirpath({}, `name.all(family.exists())`, fixture);
      expect(result).toEqual([true]);
    });
    it("all() with false condition on some elements", () => {
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
      // Test all() function where condition is false for some elements
      const result = fhirpath({}, `name.all(prefix.exists())`, fixture);
      expect(result).toEqual([false]);
    });
    it("all() with false condition on all elements", () => {
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
      // Test all() function where condition is false for all elements
      const result = fhirpath({}, `name.all(suffix.exists())`, fixture);
      expect(result).toEqual([false]);
    });
    it("all() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test all() function on empty collection (should return true)
      const result = fhirpath({}, `nonexistent.all(true)`, fixture);
      expect(result).toEqual([true]);
    });
    it("all() on single element - true", () => {
      const fixture = {
        "name": {
          "given": [
            "John"
          ],
          "family": "Doe"
        }
      };
      // Test all() function on single element with true condition
      const result = fhirpath({}, `name.all(family = 'Doe')`, fixture);
      expect(result).toEqual([true]);
    });
    it("all() on single element - false", () => {
      const fixture = {
        "name": {
          "given": [
            "John"
          ],
          "family": "Doe"
        }
      };
      // Test all() function on single element with false condition
      const result = fhirpath({}, `name.all(family = 'Smith')`, fixture);
      expect(result).toEqual([false]);
    });
    it("all() with complex condition", () => {
      const fixture = {
        "telecom": [
          {
            "system": "phone",
            "value": "555-1234"
          },
          {
            "system": "email",
            "value": "john@example.com"
          }
        ]
      };
      // Test all() function with complex boolean condition
      const result = fhirpath({}, `telecom.all(system.exists() and value.exists())`, fixture);
      expect(result).toEqual([true]);
    });
    it("all() with numeric comparison", () => {
      const fixture = {
        "measurements": [
          {
            "value": 120,
            "unit": "mmHg"
          },
          {
            "value": 0,
            "unit": "mmHg"
          },
          {
            "value": 80,
            "unit": "mmHg"
          }
        ]
      };
      // Test all() function with numeric comparison
      const result = fhirpath({}, `measurements.all(value > 0)`, fixture);
      expect(result).toEqual([false]);
    });
    it("any() with true condition on some elements", () => {
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
      // Test any() function where condition is true for some elements
      const result = fhirpath({}, `name.any(use = 'official')`, fixture);
      expect(result).toEqual([true]);
    });
    it("any() with false condition on all elements", () => {
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
      // Test any() function where condition is false for all elements
      const result = fhirpath({}, `name.any(use = 'maiden')`, fixture);
      expect(result).toEqual([false]);
    });
    it("any() with true condition on all elements", () => {
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
      // Test any() function where condition is true for all elements
      const result = fhirpath({}, `name.any(family.exists())`, fixture);
      expect(result).toEqual([true]);
    });
    it("any() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test any() function on empty collection (should return false)
      const result = fhirpath({}, `nonexistent.any(true)`, fixture);
      expect(result).toEqual([false]);
    });
    it("any() on single element - true", () => {
      const fixture = {
        "name": {
          "given": [
            "John"
          ],
          "family": "Doe"
        }
      };
      // Test any() function on single element with true condition
      const result = fhirpath({}, `name.any(family = 'Doe')`, fixture);
      expect(result).toEqual([true]);
    });
    it("any() on single element - false", () => {
      const fixture = {
        "name": {
          "given": [
            "John"
          ],
          "family": "Doe"
        }
      };
      // Test any() function on single element with false condition
      const result = fhirpath({}, `name.any(family = 'Smith')`, fixture);
      expect(result).toEqual([false]);
    });
    it("any() with complex condition", () => {
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
      // Test any() function with complex boolean condition
      const result = fhirpath({}, `telecom.any(system = 'phone' and use = 'home')`, fixture);
      expect(result).toEqual([true]);
    });
    it("any() with numeric comparison", () => {
      const fixture = {
        "measurements": [
          {
            "value": 120,
            "unit": "mmHg"
          },
          {
            "value": 90,
            "unit": "mmHg"
          },
          {
            "value": 80,
            "unit": "mmHg"
          }
        ]
      };
      // Test any() function with numeric comparison
      const result = fhirpath({}, `measurements.any(value > 100)`, fixture);
      expect(result).toEqual([true]);
    });
    it("sum() of integers", () => {
      const fixture = {
        "values": [
          1,
          2,
          3,
          4,
          5
        ]
      };
      // Test sum() function with integer values
      const result = fhirpath({}, `values.sum()`, fixture);
      expect(result).toEqual([15]);
    });
    it("sum() of decimals", () => {
      const fixture = {
        "values": [
          1.5,
          2.5,
          3.5,
          4,
          4
        ]
      };
      // Test sum() function with decimal values
      const result = fhirpath({}, `values.sum()`, fixture);
      expect(result).toEqual([15.5]);
    });
    it("sum() of single value", () => {
      const fixture = {
        "values": [
          42
        ]
      };
      // Test sum() function with single value
      const result = fhirpath({}, `values.sum()`, fixture);
      expect(result).toEqual([42]);
    });
    it("sum() of empty collection", () => {
      const fixture = {
        "values": [
          1,
          2,
          3
        ]
      };
      // Test sum() function on empty collection
      const result = fhirpath({}, `nonexistent.sum()`, fixture);
      expect(result).toEqual([0]);
    });
    it("sum() with negative numbers", () => {
      const fixture = {
        "values": [
          -3,
          -2,
          -1,
          0,
          1,
          2,
          3
        ]
      };
      // Test sum() function with negative numbers
      const result = fhirpath({}, `values.sum()`, fixture);
      expect(result).toEqual([0]);
    });
    it("sum() with mixed positive and negative", () => {
      const fixture = {
        "values": [
          10,
          -3,
          -2
        ]
      };
      // Test sum() function with mixed positive and negative numbers
      const result = fhirpath({}, `values.sum()`, fixture);
      expect(result).toEqual([5]);
    });
    it("sum() with quantities (should extract values)", () => {
      const fixture = {
        "measurements": [
          {
            "value": 120,
            "unit": "mmHg"
          },
          {
            "value": 90,
            "unit": "mmHg"
          },
          {
            "value": 80,
            "unit": "mmHg"
          }
        ]
      };
      // Test sum() function with quantity values
      const result = fhirpath({}, `measurements.value.sum()`, fixture);
      expect(result).toEqual([290]);
    });
    it("Combining all() and any()", () => {
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
      // Test combining all() and any() functions
      const result = fhirpath({}, `name.all(family.exists()) and name.any(use = 'official')`, fixture);
      expect(result).toEqual([true]);
    });
    it("all() with count() condition", () => {
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
      // Test all() function with count() condition
      const result = fhirpath({}, `name.all(given.count() > 0)`, fixture);
      expect(result).toEqual([true]);
    });
    it("any() with exists() condition", () => {
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
              "Dr. Jane"
            ],
            "family": "Smith",
            "prefix": [
              "Dr."
            ]
          }
        ]
      };
      // Test any() function with exists() condition
      const result = fhirpath({}, `name.any(prefix.exists())`, fixture);
      expect(result).toEqual([true]);
    });
    it("sum() with where() filter", () => {
      const fixture = {
        "measurements": [
          {
            "value": 120,
            "unit": "mmHg"
          },
          {
            "value": 80,
            "unit": "mmHg"
          },
          {
            "value": 98.6,
            "unit": "F"
          }
        ]
      };
      // Test sum() function with where() filter
      const result = fhirpath({}, `measurements.where(unit = 'mmHg').value.sum()`, fixture);
      expect(result).toEqual([200]);
    });
    it("all() with always false condition", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        ]
      };
      // Test all() function with condition that's always false
      const result = fhirpath({}, `name.all(false)`, fixture);
      expect(result).toEqual([false]);
    });
    it("any() with always true condition", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        ]
      };
      // Test any() function with condition that's always true
      const result = fhirpath({}, `name.any(true)`, fixture);
      expect(result).toEqual([true]);
    });
    it("sum() with zero values", () => {
      const fixture = {
        "values": [
          0,
          0,
          0
        ]
      };
      // Test sum() function with all zero values
      const result = fhirpath({}, `values.sum()`, fixture);
      expect(result).toEqual([0]);
    });
    it("sum() with non-numeric values", () => {
      const fixture = {
        "values": [
          "a",
          "b",
          "c"
        ]
      };
      // Test sum() function with non-numeric values (should error)
      expect(() => {
        fhirpath({}, `values.sum()`, fixture);
      }).toThrow("Cannot sum non-numeric values");
    });
  });
});
