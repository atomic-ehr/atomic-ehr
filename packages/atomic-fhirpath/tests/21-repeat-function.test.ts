import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 21-repeat-function.yaml
// Tests for the repeat() function for iterative tree traversal

describe("Repeat Function", () => {

  describe("functions", () => {
    it("repeat() - simple property access", () => {
      const fixture = {
        "item": {
          "item": {
            "item": {
              "value": "nested"
            }
          }
        }
      };
      // Basic repeat iteration
      const result = fhirpath({}, `repeat(item)`, fixture);
      expect(result).toEqual([{"item":{"item":{"value":"nested"}}},{"item":{"value":"nested"}},{"value":"nested"}]);
    });
  });
  describe("general", () => {
    it("repeat() - stop at empty", () => {
      const fixture = {
        "value": 1,
        "next": {
          "value": 2,
          "next": {
            "value": 3
          }
        }
      };
      
      const result = fhirpath({}, `repeat(next)`, fixture);
      expect(result).toEqual([{"value":2,"next":{"value":3}},{"value":3}]);
    });
    it("repeat() - with collections", () => {
      const fixture = {
        "id": "root",
        "children": [
          {
            "id": "a",
            "children": [
              {
                "id": "a1"
              },
              {
                "id": "a2"
              }
            ]
          },
          {
            "id": "b",
            "children": [
              {
                "id": "b1"
              }
            ]
          }
        ]
      };
      
      const result = fhirpath({}, `repeat(children)`, fixture);
      expect(result).toEqual([{"id":"a","children":[{"id":"a1"},{"id":"a2"}]},{"id":"b","children":[{"id":"b1"}]},{"id":"a1"},{"id":"a2"},{"id":"b1"}]);
    });
    it("repeat() - reference chain", () => {
      const fixture = {
        "resourceType": "ServiceRequest",
        "id": "sr1",
        "basedOn": {
          "reference": "#sr2"
        },
        "contained": [
          {
            "resourceType": "ServiceRequest",
            "id": "sr2",
            "basedOn": {
              "reference": "#sr3"
            }
          },
          {
            "resourceType": "ServiceRequest",
            "id": "sr3",
            "code": "final"
          }
        ]
      };
      
      const result = fhirpath({}, `repeat(basedOn.resolve())`, fixture);
      expect(result).toEqual([{"resourceType":"ServiceRequest","id":"sr2","basedOn":{"reference":"#sr3"}},{"resourceType":"ServiceRequest","id":"sr3","code":"final"}]);
    });
    it("repeat() with where clause", () => {
      const fixture = {
        "children": [
          {
            "id": "1",
            "active": true,
            "children": [
              {
                "id": "1.1",
                "active": false
              },
              {
                "id": "1.2",
                "active": true
              }
            ]
          },
          {
            "id": "2",
            "active": false,
            "children": [
              {
                "id": "2.1",
                "active": true
              }
            ]
          }
        ]
      };
      // Filter during traversal
      const result = fhirpath({}, `repeat(children).where(active = true)`, fixture);
      expect(result).toEqual([{"id":"1","active":true,"children":[{"id":"1.1","active":false},{"id":"1.2","active":true}]},{"id":"1.2","active":true},{"id":"2.1","active":true}]);
    });
    it("repeat() - union of paths", () => {
      const fixture = {
        "id": "1",
        "link": {
          "id": "2",
          "next": {
            "id": "3"
          }
        },
        "next": {
          "id": "4",
          "link": {
            "id": "5"
          }
        }
      };
      
      const result = fhirpath({}, `repeat(link | next)`, fixture);
      expect(result).toEqual([{"id":"2","next":{"id":"3"}},{"id":"4","link":{"id":"5"}},{"id":"3"},{"id":"5"}]);
    });
    it("Condition problem list hierarchy", () => {
      const fixture = {
        "resourceType": "Condition",
        "code": {
          "text": "Heart Failure"
        },
        "dueTo": {
          "reference": "#condition2"
        },
        "contained": [
          {
            "resourceType": "Condition",
            "id": "condition2",
            "code": {
              "text": "Hypertension"
            },
            "dueTo": {
              "reference": "#condition3"
            }
          },
          {
            "resourceType": "Condition",
            "id": "condition3",
            "code": {
              "text": "Obesity"
            }
          }
        ]
      };
      // Navigate condition relationships
      const result = fhirpath({}, `repeat(dueTo.resolve()).code.text`, fixture);
      expect(result).toEqual(["Hypertension","Obesity"]);
    });
    it("Goal target hierarchy", () => {
      const fixture = {
        "resourceType": "Goal",
        "target": {
          "measure": {
            "text": "Weight loss"
          }
        },
        "addresses": [
          {
            "reference": "#goal2"
          }
        ],
        "contained": [
          {
            "resourceType": "Goal",
            "id": "goal2",
            "target": {
              "measure": {
                "text": "Exercise regularly"
              }
            },
            "addresses": [
              {
                "reference": "#goal3"
              }
            ]
          },
          {
            "resourceType": "Goal",
            "id": "goal3",
            "target": {
              "measure": {
                "text": "Healthy diet"
              }
            }
          }
        ]
      };
      
      const result = fhirpath({}, `repeat(addresses.resolve()).where(resourceType = 'Goal').target.measure.text`, fixture);
      expect(result).toEqual(["Exercise regularly","Healthy diet"]);
    });
    it("repeat() - empty starting point", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.repeat(item)`, fixture);
      expect(result).toEqual([]);
    });
    it("repeat() - null in path", () => {
      const fixture = {
        "nullableNext": {
          "value": 1,
          "nullableNext": null
        }
      };
      
      const result = fhirpath({}, `repeat(nullableNext)`, fixture);
      expect(result).toEqual([{"value":1,"nullableNext":null}]);
    });
    it("repeat() - mixed types", () => {
      const fixture = {
        "various": [
          {
            "type": "a",
            "various": {
              "type": "b"
            }
          },
          "string",
          42,
          {
            "type": "c"
          }
        ]
      };
      
      const result = fhirpath({}, `repeat(various)`, fixture);
      expect(result).toEqual([{"type":"a","various":{"type":"b"}},"string",42,{"type":"c"},{"type":"b"}]);
    });
    it("repeat() with aggregate", () => {
      const fixture = {
        "children": [
          {
            "children": [
              {},
              {}
            ]
          },
          {
            "children": [
              {}
            ]
          }
        ]
      };
      
      const result = fhirpath({}, `repeat(children).aggregate($total + 1, 0)`, fixture);
      expect(result).toEqual([5]);
    });
    it("repeat() distinct values", () => {
      const fixture = {
        "name": "A",
        "alias": {
          "name": "B",
          "alias": {
            "name": "C",
            "alias": {
              "name": "B"
            }
          }
        }
      };
      
      const result = fhirpath({}, `repeat(alias).distinct()`, fixture);
      expect(result).toEqual([{"name":"B","alias":{"name":"C","alias":{"name":"B"}}},{"name":"C","alias":{"name":"B"}}]);
    });
    it("repeat() - invalid expression", () => {
      const fixture = {
        "value": 1
      };
      
      expect(() => {
        fhirpath({}, `repeat()`, fixture);
      }).toThrow("repeat() requires an expression argument");
    });
  });
  describe("intermediate", () => {
    it("repeat() - organization hierarchy", () => {
      const fixture = {
        "name": "Unit A",
        "partOf": {
          "name": "Department X",
          "partOf": {
            "name": "Division 1",
            "partOf": {
              "name": "Company"
            }
          }
        }
      };
      // Navigate organizational structure
      const result = fhirpath({}, `repeat(partOf).name`, fixture);
      expect(result).toEqual(["Department X","Division 1","Company"]);
    });
  });
  describe("advanced", () => {
    it("repeat() - detect circular reference", () => {
      const fixture = {
        "id": "a",
        "related": {
          "id": "b",
          "related": {
            "id": "c",
            "related": {
              "id": "a"
            }
          }
        }
      };
      // Stop on circular references
      const result = fhirpath({}, `repeat(related).take(10).count()`, fixture);
      expect(result).toEqual([10]);
    });
  });
});
