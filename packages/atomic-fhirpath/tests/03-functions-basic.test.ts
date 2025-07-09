import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 03-functions-basic.yaml
// Tests for basic FHIRPath functions including empty(), exists(), count(), first(), last(), tail(), skip(), and take()

describe("Basic Functions", () => {

  describe("functions", () => {
    it("empty() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test empty() function on empty collection
      const result = fhirpath({}, `nonexistent.empty()`, fixture);
      expect(result).toEqual([true]);
    });
    it("empty() on non-empty collection", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith"
        ]
      };
      // Test empty() function on non-empty collection
      const result = fhirpath({}, `name.empty()`, fixture);
      expect(result).toEqual([false]);
    });
    it("empty() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test empty() function on single element
      const result = fhirpath({}, `name.empty()`, fixture);
      expect(result).toEqual([false]);
    });
    it("exists() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test exists() function on empty collection
      const result = fhirpath({}, `nonexistent.exists()`, fixture);
      expect(result).toEqual([false]);
    });
    it("exists() on non-empty collection", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith"
        ]
      };
      // Test exists() function on non-empty collection
      const result = fhirpath({}, `name.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("exists() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test exists() function on single element
      const result = fhirpath({}, `name.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("exists() with condition", () => {
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
      // Test exists() function with condition
      const result = fhirpath({}, `name.exists(use = 'official')`, fixture);
      expect(result).toEqual([true]);
    });
    it("exists() with false condition", () => {
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
      // Test exists() function with false condition
      const result = fhirpath({}, `name.exists(use = 'maiden')`, fixture);
      expect(result).toEqual([false]);
    });
    it("count() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test count() function on empty collection
      const result = fhirpath({}, `nonexistent.count()`, fixture);
      expect(result).toEqual([0]);
    });
    it("count() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test count() function on single element
      const result = fhirpath({}, `name.count()`, fixture);
      expect(result).toEqual([1]);
    });
    it("count() on collection", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test count() function on collection
      const result = fhirpath({}, `name.count()`, fixture);
      expect(result).toEqual([3]);
    });
    it("count() on flattened collection", () => {
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
          },
          {
            "given": [
              "Bob"
            ],
            "family": "Johnson"
          }
        ]
      };
      // Test count() function on flattened collection
      const result = fhirpath({}, `name.given.count()`, fixture);
      expect(result).toEqual([4]);
    });
    it("first() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test first() function on empty collection
      const result = fhirpath({}, `nonexistent.first()`, fixture);
      expect(result).toEqual([]);
    });
    it("first() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test first() function on single element
      const result = fhirpath({}, `name.first()`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("first() on collection", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test first() function on collection
      const result = fhirpath({}, `name.first()`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("first() on nested collection", () => {
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
      // Test first() function on nested collection
      const result = fhirpath({}, `name.given.first()`, fixture);
      expect(result).toEqual(["John"]);
    });
    it("last() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test last() function on empty collection
      const result = fhirpath({}, `nonexistent.last()`, fixture);
      expect(result).toEqual([]);
    });
    it("last() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test last() function on single element
      const result = fhirpath({}, `name.last()`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("last() on collection", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test last() function on collection
      const result = fhirpath({}, `name.last()`, fixture);
      expect(result).toEqual(["Bob Johnson"]);
    });
    it("last() on nested collection", () => {
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
      // Test last() function on nested collection
      const result = fhirpath({}, `name.given.last()`, fixture);
      expect(result).toEqual(["Jane"]);
    });
    it("tail() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test tail() function on empty collection
      const result = fhirpath({}, `nonexistent.tail()`, fixture);
      expect(result).toEqual([]);
    });
    it("tail() on single element", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test tail() function on single element
      const result = fhirpath({}, `name.tail()`, fixture);
      expect(result).toEqual([]);
    });
    it("tail() on collection", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test tail() function on collection
      const result = fhirpath({}, `name.tail()`, fixture);
      expect(result).toEqual(["Jane Smith","Bob Johnson"]);
    });
    it("skip() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test skip() function on empty collection
      const result = fhirpath({}, `nonexistent.skip(2)`, fixture);
      expect(result).toEqual([]);
    });
    it("skip() more than collection size", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test skip() function with count larger than collection
      const result = fhirpath({}, `name.skip(5)`, fixture);
      expect(result).toEqual([]);
    });
    it("skip() some elements", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test skip() function with partial skip
      const result = fhirpath({}, `name.skip(1)`, fixture);
      expect(result).toEqual(["Jane Smith","Bob Johnson"]);
    });
    it("skip() zero elements", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test skip() function with zero
      const result = fhirpath({}, `name.skip(0)`, fixture);
      expect(result).toEqual(["John Doe","Jane Smith","Bob Johnson"]);
    });
    it("take() on empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test take() function on empty collection
      const result = fhirpath({}, `nonexistent.take(2)`, fixture);
      expect(result).toEqual([]);
    });
    it("take() more than collection size", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test take() function with count larger than collection
      const result = fhirpath({}, `name.take(5)`, fixture);
      expect(result).toEqual(["John Doe","Jane Smith","Bob Johnson"]);
    });
    it("take() some elements", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test take() function with partial take
      const result = fhirpath({}, `name.take(2)`, fixture);
      expect(result).toEqual(["John Doe","Jane Smith"]);
    });
    it("take() zero elements", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson"
        ]
      };
      // Test take() function with zero
      const result = fhirpath({}, `name.take(0)`, fixture);
      expect(result).toEqual([]);
    });
    it("Chained basic functions", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith",
          "Bob Johnson",
          "Alice Brown"
        ]
      };
      // Test chaining multiple basic functions
      const result = fhirpath({}, `name.skip(1).take(2).count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("Combined exists and count", () => {
      const fixture = {
        "name": [
          "John Doe",
          "Jane Smith"
        ]
      };
      // Test combining exists and count functions
      const result = fhirpath({}, `name.exists() and name.count() > 1`, fixture);
      expect(result).toEqual([true]);
    });
  });
});
