import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 15-special-variables.yaml
// Tests for FHIRPath special variables including $this, $index, and $total

describe("Special Variables", () => {

  describe("special", () => {
    it("$this basic usage in select", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test $this variable basic usage in select()
      const result = fhirpath({}, `names.select($this)`, fixture);
      expect(result).toEqual(["John","Jane","Bob"]);
    });
    it("$this with string functions", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test $this variable with string functions
      const result = fhirpath({}, `names.select($this.length())`, fixture);
      expect(result).toEqual([4,4,3]);
    });
    it("$this in where condition", () => {
      const fixture = {
        "numbers": [
          3,
          10,
          2,
          7,
          8,
          1
        ]
      };
      // Test $this variable in where() condition
      const result = fhirpath({}, `numbers.where($this > 5)`, fixture);
      expect(result).toEqual([10,7,8]);
    });
    it("$this with complex expressions", () => {
      const fixture = {
        "items": [
          {
            "name": "Apple",
            "count": 5
          },
          {
            "name": "Banana",
            "count": 3
          },
          {
            "name": "Orange",
            "count": 8
          }
        ]
      };
      // Test $this variable with complex expressions
      const result = fhirpath({}, `items.select($this.name + ' (' + $this.count.toString() + ')')`, fixture);
      expect(result).toEqual(["Apple (5)","Banana (3)","Orange (8)"]);
    });
    it("$this with mathematical operations", () => {
      const fixture = {
        "numbers": [
          3,
          4,
          5,
          6
        ]
      };
      // Test $this variable with mathematical operations
      const result = fhirpath({}, `numbers.select($this * $this)`, fixture);
      expect(result).toEqual([9,16,25,36]);
    });
    it("$this with type checking", () => {
      const fixture = {
        "mixedValues": [
          "text",
          42,
          true,
          100,
          "string"
        ]
      };
      // Test $this variable with type checking
      const result = fhirpath({}, `mixedValues.where($this is integer)`, fixture);
      expect(result).toEqual([42,100]);
    });
    it("$this with nested access", () => {
      const fixture = {
        "people": [
          {
            "name": "John",
            "age": 30
          },
          {
            "name": "Jane",
            "age": 22
          },
          {
            "name": "Alice",
            "age": 28
          }
        ]
      };
      // Test $this variable with nested property access
      const result = fhirpath({}, `people.where($this.age > 25).select($this.name)`, fixture);
      expect(result).toEqual(["John","Alice"]);
    });
    it("$this in collection aggregation", () => {
      const fixture = {
        "scores": [
          85,
          92,
          65,
          78,
          55
        ]
      };
      // Test $this variable in collection aggregation
      const result = fhirpath({}, `scores.where($this >= 70).select($this).sum()`, fixture);
      expect(result).toEqual([235]);
    });
    it("$this with contains operation", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob",
          "Diana"
        ]
      };
      // Test $this variable with contains operation
      const result = fhirpath({}, `names.where($this.contains('a'))`, fixture);
      expect(result).toEqual(["Jane","Diana"]);
    });
    it("$index basic usage", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test $index variable basic usage
      const result = fhirpath({}, `names.select($index)`, fixture);
      expect(result).toEqual([0,1,2]);
    });
    it("$index with $this", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test $index variable combined with $this
      const result = fhirpath({}, `names.select($index.toString() + ': ' + $this)`, fixture);
      expect(result).toEqual(["0: John","1: Jane","2: Bob"]);
    });
    it("$index in filtering", () => {
      const fixture = {
        "items": [
          "first",
          "second",
          "third",
          "fourth",
          "fifth"
        ]
      };
      // Test $index variable in filtering operations
      const result = fhirpath({}, `items.where($index mod 2 = 0)`, fixture);
      expect(result).toEqual(["first","third","fifth"]);
    });
    it("$index for position-based logic", () => {
      const fixture = {
        "items": [
          "first",
          "middle1",
          "middle2",
          "last"
        ]
      };
      // Test $index variable for position-based logic
      const result = fhirpath({}, `items.where($index = 0 or $index = items.count() - 1)`, fixture);
      expect(result).toEqual(["first","last"]);
    });
    it("$index with mathematical operations", () => {
      const fixture = {
        "items": [
          5,
          3,
          2,
          4
        ]
      };
      // Test $index variable with mathematical operations
      const result = fhirpath({}, `items.select($index * 10 + $this)`, fixture);
      expect(result).toEqual([5,13,22,34]);
    });
    it("$index for ranking", () => {
      const fixture = {
        "scores": [
          95,
          87,
          92
        ]
      };
      // Test $index variable for creating rankings
      const result = fhirpath({}, `scores.select({'rank': $index + 1, 'score': $this})`, fixture);
      expect(result).toEqual([{"rank":1,"score":95},{"rank":2,"score":87},{"rank":3,"score":92}]);
    });
    it("$index boundary conditions", () => {
      const fixture = {
        "singleItem": [
          "only"
        ]
      };
      // Test $index variable boundary conditions
      const result = fhirpath({}, `singleItem.select($index)`, fixture);
      expect(result).toEqual([0]);
    });
    it("$total basic usage", () => {
      const fixture = {
        "items": [
          "a",
          "b",
          "c"
        ]
      };
      // Test $total variable basic usage
      const result = fhirpath({}, `items.select($total)`, fixture);
      expect(result).toEqual([3,3,3]);
    });
    it("$total with percentage calculation", () => {
      const fixture = {
        "scores": [
          40,
          30,
          30
        ]
      };
      // Test $total variable for percentage calculation
      const result = fhirpath({}, `scores.select(($this / $total.sum()) * 100)`, fixture);
      expect(result).toEqual([40,30,30]);
    });
    it("$total in progress tracking", () => {
      const fixture = {
        "tasks": [
          "task1",
          "task2",
          "task3",
          "task4"
        ]
      };
      // Test $total variable for progress tracking
      const result = fhirpath({}, `tasks.select('Task ' + ($index + 1).toString() + ' of ' + $total.toString())`, fixture);
      expect(result).toEqual(["Task 1 of 4","Task 2 of 4","Task 3 of 4","Task 4 of 4"]);
    });
    it("$total with conditional logic", () => {
      const fixture = {
        "items": [
          "a",
          "b",
          "c"
        ]
      };
      // Test $total variable with conditional logic
      const result = fhirpath({}, `items.select(iif($index = $total - 1, 'last', 'not last'))`, fixture);
      expect(result).toEqual(["not last","not last","last"]);
    });
    it("$total for batch processing", () => {
      const fixture = {
        "items": [
          "a",
          "b",
          "c",
          "d"
        ]
      };
      // Test $total variable for batch processing logic
      const result = fhirpath({}, `items.where(($index + 1) mod ($total div 2) = 0)`, fixture);
      expect(result).toEqual(["b","d"]);
    });
    it("All special variables together", () => {
      const fixture = {
        "items": [
          "first",
          "second",
          "third"
        ]
      };
      // Test all special variables in single expression
      const result = fhirpath({}, `items.select({'item': $this, 'index': $index, 'total': $total, 'isLast': $index = $total - 1})`, fixture);
      expect(result).toEqual([{"item":"first","index":0,"total":3,"isLast":false},{"item":"second","index":1,"total":3,"isLast":false},{"item":"third","index":2,"total":3,"isLast":true}]);
    });
    it("Special variables in nested operations", () => {
      const fixture = {
        "groups": [
          {
            "items": [
              "item1",
              "item2"
            ]
          },
          {
            "items": [
              "item3",
              "item4"
            ]
          }
        ]
      };
      // Test special variables in nested operations
      const result = fhirpath({}, `groups.select(items.select($this + ' (group ' + $index.toString() + ')'))`, fixture);
      expect(result).toEqual([["item1 (group 0)","item2 (group 0)"],["item3 (group 1)","item4 (group 1)"]]);
    });
    it("Special variables with aggregation", () => {
      const fixture = {
        "numbers": [
          10,
          15,
          5,
          8,
          20
        ]
      };
      // Test special variables with aggregation functions
      const result = fhirpath({}, `numbers.where($this > ($total.sum() / $total)).count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("Pagination with special variables", () => {
      const fixture = {
        "pageStart": 1,
        "pageSize": 2,
        "items": [
          {
            "name": "item1"
          },
          {
            "name": "item2"
          },
          {
            "name": "item3"
          },
          {
            "name": "item4"
          }
        ]
      };
      // Test pagination logic using special variables
      const result = fhirpath({}, `items.where($index >= pageStart and $index < pageStart + pageSize)`, fixture);
      expect(result).toEqual([{"name":"item2"},{"name":"item3"}]);
    });
    it("Progress bar calculation", () => {
      const fixture = {
        "tasks": [
          "task1",
          "task2",
          "task3",
          "task4"
        ]
      };
      // Test progress bar calculation using special variables
      const result = fhirpath({}, `tasks.select(($index + 1) * 100 div $total)`, fixture);
      expect(result).toEqual([25,50,75,100]);
    });
    it("Data validation with position", () => {
      const fixture = {
        "records": [
          {
            "value": "A"
          },
          {
            "value": "A"
          },
          {
            "value": "B"
          },
          {
            "value": "B"
          },
          {
            "value": "A"
          }
        ]
      };
      // Test data validation using positional information
      const result = fhirpath({}, `records.where($index = 0 or $this.value != records[$index - 1].value)`, fixture);
      expect(result).toEqual([{"value":"A"},{"value":"B"},{"value":"A"}]);
    });
    it("Special variables outside context", () => {
      const fixture = {
        "value": "test"
      };
      // Test special variables used outside valid context
      expect(() => {
        fhirpath({}, `$this + $index`, fixture);
      }).toThrow("Special variables can only be used in collection operations");
    });
    it("$index with empty collection", () => {
      const fixture = {
        "emptyList": []
      };
      // Test $index variable with empty collection
      const result = fhirpath({}, `emptyList.select($index)`, fixture);
      expect(result).toEqual([]);
    });
    it("$total with empty collection", () => {
      const fixture = {
        "emptyList": []
      };
      // Test $total variable with empty collection
      const result = fhirpath({}, `emptyList.select($total)`, fixture);
      expect(result).toEqual([]);
    });
    it("Special variables with large collections", () => {
      const fixture = {
        "largeCollection": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
      };
      // Test special variables performance with large collections
      const result = fhirpath({}, `largeCollection.where($index mod 100 = 0).count()`, fixture);
      expect(result).toEqual([10]);
    });
    it("Complex special variable expressions", () => {
      const fixture = {
        "items": [
          "first",
          "second",
          "third",
          "fourth"
        ]
      };
      // Test complex expressions with multiple special variables
      const result = fhirpath({}, `items.select(iif($index < $total div 2, $this.upper(), $this.lower()))`, fixture);
      expect(result).toEqual(["FIRST","SECOND","third","fourth"]);
    });
    it("Special variables with type operations", () => {
      const fixture = {
        "mixedItems": [
          "text1",
          42,
          "text2",
          true
        ]
      };
      // Test special variables with type operations
      const result = fhirpath({}, `mixedItems.where($this is string).select($index.toString() + ': ' + $this)`, fixture);
      expect(result).toEqual(["0: text1","2: text2"]);
    });
    it("Special variables with date operations", () => {
      const fixture = {
        "dates": [
          "@2023-01-01",
          "@2023-01-01",
          "@2023-01-01"
        ]
      };
      // Test special variables with date operations
      const result = fhirpath({}, `dates.select($this + ($index * 1 'day'))`, fixture);
      expect(result).toEqual(["@2023-01-01","@2023-01-02","@2023-01-03"]);
    });
    it("Special variables with environment variables", () => {
      const fixture = {
        "startIndex": 1,
        "endIndex": 2,
        "items": [
          "item1",
          "item2",
          "item3",
          "item4"
        ]
      };
      // Test special variables combined with environment variables
      const result = fhirpath({}, `items.where($index >= %startIndex and $index <= %endIndex)`, fixture);
      expect(result).toEqual(["item2","item3"]);
    });
  });
});
