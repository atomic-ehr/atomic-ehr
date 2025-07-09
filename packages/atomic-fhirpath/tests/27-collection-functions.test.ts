import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 27-collection-functions.yaml
// Tests for collection manipulation functions: combine(), union(), intersect(), exclude()

describe("Collection Functions", () => {

  describe("functions", () => {
    it("combine() - basic merge", () => {
      const fixture = {};
      // Merge collections preserving duplicates
      const result = fhirpath({}, `(1 | 2 | 3).combine(2 | 3 | 4)`, fixture);
      expect(result).toEqual([1,2,3,2,3,4]);
    });
  });
  describe("general", () => {
    it("combine() - with empty collection", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2).combine({})`, fixture);
      expect(result).toEqual([1,2]);
    });
    it("combine() - both empty", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.combine({})`, fixture);
      expect(result).toEqual([]);
    });
    it("combine() - strings", () => {
      const fixture = {};
      
      const result = fhirpath({}, `('a' | 'b').combine('b' | 'c')`, fixture);
      expect(result).toEqual(["a","b","b","c"]);
    });
    it("combine() - mixed types", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 'two').combine(true | 3)`, fixture);
      expect(result).toEqual([1,"two",true,3]);
    });
    it("union() - basic merge", () => {
      const fixture = {};
      // Merge collections removing duplicates
      const result = fhirpath({}, `(1 | 2 | 3).union(2 | 3 | 4)`, fixture);
      expect(result).toEqual([1,2,3,4]);
    });
    it("union() - all duplicates", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3).union(1 | 2 | 3)`, fixture);
      expect(result).toEqual([1,2,3]);
    });
    it("union() - objects", () => {
      const fixture = {};
      
      const result = fhirpath({}, `({a: 1} | {b: 2}).union({a: 1} | {c: 3})`, fixture);
      expect(result).toEqual([{"a":1},{"b":2},{"c":3}]);
    });
    it("union() - preserve order", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(3 | 1 | 2).union(4 | 2 | 5)`, fixture);
      expect(result).toEqual([3,1,2,4,5]);
    });
    it("intersect() - common elements", () => {
      const fixture = {};
      // Find common elements between collections
      const result = fhirpath({}, `(1 | 2 | 3 | 4).intersect(2 | 3 | 5)`, fixture);
      expect(result).toEqual([2,3]);
    });
    it("intersect() - no common elements", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3).intersect(4 | 5 | 6)`, fixture);
      expect(result).toEqual([]);
    });
    it("intersect() - duplicates in first", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 2 | 3).intersect(2 | 3)`, fixture);
      expect(result).toEqual([2,3]);
    });
    it("intersect() - complex objects", () => {
      const fixture = {
        "patients": [
          {
            "id": "1",
            "name": "John"
          },
          {
            "id": "2",
            "name": "Jane"
          },
          {
            "id": "3",
            "name": "Bob"
          }
        ],
        "activePatients": [
          {
            "id": "1",
            "name": "John"
          },
          {
            "id": "3",
            "name": "Bob"
          }
        ]
      };
      
      const result = fhirpath({}, `patients.intersect(activePatients)`, fixture);
      expect(result).toEqual([{"id":"1","name":"John"},{"id":"3","name":"Bob"}]);
    });
    it("exclude() - remove elements", () => {
      const fixture = {};
      // Remove elements from first collection
      const result = fhirpath({}, `(1 | 2 | 3 | 4).exclude(2 | 4)`, fixture);
      expect(result).toEqual([1,3]);
    });
    it("exclude() - remove all", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3).exclude(1 | 2 | 3)`, fixture);
      expect(result).toEqual([]);
    });
    it("exclude() - nothing to remove", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 3).exclude(4 | 5)`, fixture);
      expect(result).toEqual([1,2,3]);
    });
    it("exclude() - duplicates", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2 | 2 | 3).exclude(2)`, fixture);
      expect(result).toEqual([1,3]);
    });
    it("Set operations", () => {
      const fixture = {
        "setA": [
          1,
          2,
          3
        ],
        "setB": [
          3,
          4,
          5
        ]
      };
      
      const result = fhirpath({}, `setA.union(setB).exclude(setA.intersect(setB))`, fixture);
      expect(result).toEqual([1,2,4,5]);
    });
    it("Multiple combines", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2).combine(3 | 4).combine(5 | 6)`, fixture);
      expect(result).toEqual([1,2,3,4,5,6]);
    });
    it("Find shared medications", () => {
      const fixture = {
        "patient1": {
          "medication": [
            {
              "code": "med1"
            },
            {
              "code": "med2"
            },
            {
              "code": "med3"
            }
          ]
        },
        "patient2": {
          "medication": [
            {
              "code": "med2"
            },
            {
              "code": "med3"
            },
            {
              "code": "med4"
            }
          ]
        }
      };
      
      const result = fhirpath({}, `patient1.medication.code.intersect(patient2.medication.code)`, fixture);
      expect(result).toEqual(["med2","med3"]);
    });
    it("Remove excluded codes", () => {
      const fixture = {
        "allCodes": [
          "001",
          "002",
          "003",
          "004",
          "005"
        ],
        "excludedCodes": [
          "003",
          "005"
        ]
      };
      
      const result = fhirpath({}, `allCodes.exclude(excludedCodes)`, fixture);
      expect(result).toEqual(["001","002","004"]);
    });
    it("Combine with filtering", () => {
      const fixture = {
        "list1": [
          {
            "value": 5
          },
          {
            "value": 15
          },
          {
            "value": 25
          }
        ],
        "list2": [
          {
            "value": 8
          },
          {
            "value": 12
          },
          {
            "value": 30
          }
        ]
      };
      
      const result = fhirpath({}, `list1.combine(list2).where(value > 10)`, fixture);
      expect(result).toEqual([{"value":15},{"value":25},{"value":12},{"value":30}]);
    });
    it("Large collection union", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 to 100).union(50 to 150).count()`, fixture);
      expect(result).toEqual([150]);
    });
    it("Intersect with empty", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 to 1000).intersect({})`, fixture);
      expect(result).toEqual([]);
    });
    it("Union with self", () => {
      const fixture = {
        "list": [
          1,
          2,
          3,
          2,
          1
        ]
      };
      
      const result = fhirpath({}, `list.union(list)`, fixture);
      expect(result).toEqual([1,2,3]);
    });
    it("Exclude from empty", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.exclude(1 | 2 | 3)`, fixture);
      expect(result).toEqual([]);
    });
    it("Nested collections", () => {
      const fixture = {};
      
      const result = fhirpath({}, `((1 | 2) | (3 | 4)).combine((5 | 6))`, fixture);
      expect(result).toEqual([[1,2],[3,4],5,6]);
    });
    it("Type preservation", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1.0 | 2.0).union(2 | 3)`, fixture);
      expect(result).toEqual([1,2,3]);
    });
    it("Union with nulls", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | {} | 3).union(2 | {} | 4)`, fixture);
      expect(result).toEqual([1,{},3,2,4]);
    });
    it("Exclude nulls", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | {} | 2 | {} | 3).exclude({})`, fixture);
      expect(result).toEqual([1,2,3]);
    });
    it("Union by property", () => {
      const fixture = {
        "items1": [
          {
            "id": "a",
            "value": 1
          },
          {
            "id": "b",
            "value": 2
          }
        ],
        "items2": [
          {
            "id": "b",
            "value": 3
          },
          {
            "id": "c",
            "value": 4
          }
        ]
      };
      
      const result = fhirpath({}, `items1.union(items2).id.distinct()`, fixture);
      expect(result).toEqual(["a","b","c"]);
    });
    it("Invalid combine argument", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(1 | 2).combine(3)`, fixture);
      expect(result).toEqual([1,2,3]);
    });
  });
  describe("intermediate", () => {
    it("Chained operations", () => {
      const fixture = {};
      // Multiple collection operations
      const result = fhirpath({}, `(1 | 2 | 3).union(3 | 4 | 5).exclude(4)`, fixture);
      expect(result).toEqual([1,2,3,5]);
    });
    it("Merge patient lists", () => {
      const fixture = {
        "wardPatients": [
          {
            "id": "p1"
          },
          {
            "id": "p2"
          }
        ],
        "icuPatients": [
          {
            "id": "p2"
          },
          {
            "id": "p3"
          }
        ],
        "erPatients": [
          {
            "id": "p4"
          }
        ]
      };
      // Combine patient lists from different sources
      const result = fhirpath({}, `wardPatients.union(icuPatients).union(erPatients)`, fixture);
      expect(result).toEqual([{"id":"p1"},{"id":"p2"},{"id":"p3"},{"id":"p4"}]);
    });
  });
});
