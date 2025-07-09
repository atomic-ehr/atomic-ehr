import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 16-advanced-functions.yaml
// Tests for advanced FHIRPath functions including intersect(), exclude(), iif(), trace(), matches(), replace(), and utility functions

describe("Advanced Functions", () => {

  describe("functions", () => {
    it("intersect() with overlapping collections", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "b",
          "c",
          "d"
        ]
      };
      // Test intersect() function with overlapping collections
      const result = fhirpath({}, `set1.intersect(set2)`, fixture);
      expect(result).toEqual(["b","c"]);
    });
    it("intersect() with no overlap", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "d",
          "e",
          "f"
        ]
      };
      // Test intersect() function with no overlapping elements
      const result = fhirpath({}, `set1.intersect(set2)`, fixture);
      expect(result).toEqual([]);
    });
    it("intersect() with identical collections", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "a",
          "b",
          "c"
        ]
      };
      // Test intersect() function with identical collections
      const result = fhirpath({}, `set1.intersect(set2)`, fixture);
      expect(result).toEqual(["a","b","c"]);
    });
    it("intersect() with empty collection", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "empty": []
      };
      // Test intersect() function with empty collection
      const result = fhirpath({}, `set1.intersect(empty)`, fixture);
      expect(result).toEqual([]);
    });
    it("intersect() with complex objects", () => {
      const fixture = {
        "people1": [
          {
            "name": "John",
            "age": 30
          },
          {
            "name": "Jane",
            "age": 25
          }
        ],
        "people2": [
          {
            "name": "Jane",
            "age": 27
          },
          {
            "name": "Bob",
            "age": 35
          }
        ]
      };
      // Test intersect() function with complex objects
      const result = fhirpath({}, `people1.name.intersect(people2.name)`, fixture);
      expect(result).toEqual(["John","Jane"]);
    });
    it("exclude() basic usage", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "b",
          "c",
          "d"
        ]
      };
      // Test exclude() function basic usage
      const result = fhirpath({}, `set1.exclude(set2)`, fixture);
      expect(result).toEqual(["a"]);
    });
    it("exclude() with no matches", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "d",
          "e",
          "f"
        ]
      };
      // Test exclude() function with no matching elements
      const result = fhirpath({}, `set1.exclude(set2)`, fixture);
      expect(result).toEqual(["a","b","c"]);
    });
    it("exclude() all elements", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "a",
          "b",
          "c",
          "d"
        ]
      };
      // Test exclude() function excluding all elements
      const result = fhirpath({}, `set1.exclude(set2)`, fixture);
      expect(result).toEqual([]);
    });
    it("exclude() with duplicates", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "a",
          "c"
        ],
        "set2": [
          "b",
          "c"
        ]
      };
      // Test exclude() function with duplicate elements
      const result = fhirpath({}, `set1.exclude(set2)`, fixture);
      expect(result).toEqual(["a","a"]);
    });
    it("exclude() with complex filtering", () => {
      const fixture = {
        "allUsers": [
          {
            "name": "John",
            "status": "active"
          },
          {
            "name": "Jane",
            "status": "active"
          },
          {
            "name": "Bob",
            "status": "banned"
          }
        ],
        "bannedUsers": [
          {
            "name": "Bob"
          },
          {
            "name": "Alice"
          }
        ]
      };
      // Test exclude() function with complex object filtering
      const result = fhirpath({}, `allUsers.name.exclude(bannedUsers.name)`, fixture);
      expect(result).toEqual(["John","Jane"]);
    });
    it("iif() with true condition", () => {
      const fixture = {
        "age": 25
      };
      // Test iif() function with true condition
      const result = fhirpath({}, `iif(age >= 18, 'adult', 'minor')`, fixture);
      expect(result).toEqual(["adult"]);
    });
    it("iif() with false condition", () => {
      const fixture = {
        "age": 15
      };
      // Test iif() function with false condition
      const result = fhirpath({}, `iif(age >= 18, 'adult', 'minor')`, fixture);
      expect(result).toEqual(["minor"]);
    });
    it("iif() with complex condition", () => {
      const fixture = {
        "score": 85
      };
      // Test iif() function with complex condition
      const result = fhirpath({}, `iif(score >= 90, 'excellent', iif(score >= 70, 'good', 'needs improvement'))`, fixture);
      expect(result).toEqual(["good"]);
    });
    it("iif() with collection", () => {
      const fixture = {
        "scores": [
          65,
          85,
          92,
          58
        ]
      };
      // Test iif() function applied to collection
      const result = fhirpath({}, `scores.select(iif($this >= 70, 'pass', 'fail'))`, fixture);
      expect(result).toEqual(["fail","pass","pass","fail"]);
    });
    it("iif() with type checking", () => {
      const fixture = {
        "values": [
          "hello",
          42,
          true
        ]
      };
      // Test iif() function with type checking
      const result = fhirpath({}, `values.select(iif($this is string, $this.upper(), $this.toString()))`, fixture);
      expect(result).toEqual(["HELLO","42","TRUE"]);
    });
    it("iif() nested conditions", () => {
      const fixture = {
        "temperature": [
          15,
          25,
          35
        ]
      };
      // Test iif() function with deeply nested conditions
      const result = fhirpath({}, `temperature.select(iif($this < 0, 'freezing', iif($this < 20, 'cold', iif($this < 30, 'warm', 'hot'))))`, fixture);
      expect(result).toEqual(["cold","warm","hot"]);
    });
    it("trace() basic usage", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test trace() function basic usage
      const result = fhirpath({}, `name.trace('patient name')`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("trace() with expression", () => {
      const fixture = {
        "scores": [
          75,
          85,
          92,
          68,
          88
        ]
      };
      // Test trace() function with expression evaluation
      const result = fhirpath({}, `scores.where($this > 80).trace('high scores').count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("trace() with custom projection", () => {
      const fixture = {
        "patients": [
          {
            "name": "John",
            "age": 30
          },
          {
            "name": "Jane",
            "age": 25
          },
          {
            "name": "Bob",
            "age": 30
          }
        ]
      };
      // Test trace() function with custom projection
      const result = fhirpath({}, `patients.trace('patient data', name).age.sum()`, fixture);
      expect(result).toEqual([85]);
    });
    it("trace() chaining", () => {
      const fixture = {
        "items": [
          {
            "name": "item1",
            "active": true
          },
          {
            "name": "item2",
            "active": false
          },
          {
            "name": "item3",
            "active": true
          }
        ]
      };
      // Test trace() function in chained operations
      const result = fhirpath({}, `items.trace('original').where(active = true).trace('filtered').count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("matches() basic pattern", () => {
      const fixture = {
        "text": "12345"
      };
      // Test matches() function with basic regex pattern
      const result = fhirpath({}, `text.matches('[0-9]+')`, fixture);
      expect(result).toEqual([true]);
    });
    it("matches() with complex pattern", () => {
      const fixture = {
        "email": "user@example.com"
      };
      // Test matches() function with complex regex pattern
      const result = fhirpath({}, `email.matches('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')`, fixture);
      expect(result).toEqual([true]);
    });
    it("matches() case insensitive", () => {
      const fixture = {
        "text": "HELLO"
      };
      // Test matches() function with case insensitive matching
      const result = fhirpath({}, `text.matches('(?i)hello')`, fixture);
      expect(result).toEqual([true]);
    });
    it("matches() with collection", () => {
      const fixture = {
        "phones": [
          "+1-555-123-4567",
          "555-1234",
          "+44-20-1234-5678"
        ]
      };
      // Test matches() function applied to collection
      const result = fhirpath({}, `phones.where($this.matches('\+1-[0-9]{3}-[0-9]{3}-[0-9]{4}'))`, fixture);
      expect(result).toEqual(["+1-555-123-4567"]);
    });
    it("matches() validation", () => {
      const fixture = {
        "identifiers": [
          "AB12345678",
          "CD87654321",
          "invalid123"
        ]
      };
      // Test matches() function for data validation
      const result = fhirpath({}, `identifiers.all($this.matches('[A-Z]{2}[0-9]{8}'))`, fixture);
      expect(result).toEqual([false]);
    });
    it("replace() basic usage", () => {
      const fixture = {
        "text": "This is old text"
      };
      // Test replace() function basic usage
      const result = fhirpath({}, `text.replace('old', 'new')`, fixture);
      expect(result).toEqual(["This is new text"]);
    });
    it("replace() with regex", () => {
      const fixture = {
        "text": "Version 1.2.3"
      };
      // Test replace() function with regex pattern
      const result = fhirpath({}, `text.replace('[0-9]+', 'NUMBER')`, fixture);
      expect(result).toEqual(["Version NUMBER.NUMBER.NUMBER"]);
    });
    it("replace() multiple occurrences", () => {
      const fixture = {
        "text": "banana"
      };
      // Test replace() function with multiple occurrences
      const result = fhirpath({}, `text.replace('a', 'A')`, fixture);
      expect(result).toEqual(["bAnAnA"]);
    });
    it("replace() with capture groups", () => {
      const fixture = {
        "text": "John Doe"
      };
      // Test replace() function with regex capture groups
      const result = fhirpath({}, `text.replace('(\w+)\s+(\w+)', '$2, $1')`, fixture);
      expect(result).toEqual(["Doe, John"]);
    });
    it("replace() data cleaning", () => {
      const fixture = {
        "messyData": "Clean!@# text   data!!! 123"
      };
      // Test replace() function for data cleaning
      const result = fhirpath({}, `messyData.replace('[^a-zA-Z0-9\s]', '').replace('\s+', ' ')`, fixture);
      expect(result).toEqual(["Clean text data 123"]);
    });
    it("split() basic usage", () => {
      const fixture = {
        "text": "apple,banana,orange"
      };
      // Test split() function basic usage
      const result = fhirpath({}, `text.split(',')`, fixture);
      expect(result).toEqual([["apple","banana","orange"]]);
    });
    it("split() with regex delimiter", () => {
      const fixture = {
        "text": "word1   word2    word3"
      };
      // Test split() function with regex delimiter
      const result = fhirpath({}, `text.split('\s+')`, fixture);
      expect(result).toEqual([["word1","word2","word3"]]);
    });
    it("split() with limit", () => {
      const fixture = {
        "text": "first,second,third,fourth"
      };
      // Test split() function with limit parameter
      const result = fhirpath({}, `text.split(',', 2)`, fixture);
      expect(result).toEqual([["first","second,third,fourth"]]);
    });
    it("split() empty delimiter", () => {
      const fixture = {
        "text": "hello"
      };
      // Test split() function with empty delimiter
      const result = fhirpath({}, `text.split('')`, fixture);
      expect(result).toEqual([["h","e","l","l","o"]]);
    });
    it("join() basic usage", () => {
      const fixture = {
        "items": [
          "apple",
          "banana",
          "orange"
        ]
      };
      // Test join() function basic usage
      const result = fhirpath({}, `items.join(', ')`, fixture);
      expect(result).toEqual(["apple, banana, orange"]);
    });
    it("join() with empty separator", () => {
      const fixture = {
        "letters": [
          "h",
          "e",
          "l",
          "l",
          "o"
        ]
      };
      // Test join() function with empty separator
      const result = fhirpath({}, `letters.join('')`, fixture);
      expect(result).toEqual(["hello"]);
    });
    it("join() with single element", () => {
      const fixture = {
        "singleItem": [
          "only"
        ]
      };
      // Test join() function with single element
      const result = fhirpath({}, `singleItem.join(',')`, fixture);
      expect(result).toEqual(["only"]);
    });
    it("join() with empty collection", () => {
      const fixture = {
        "empty": []
      };
      // Test join() function with empty collection
      const result = fhirpath({}, `empty.join(',')`, fixture);
      expect(result).toEqual([""]);
    });
    it("join() with complex formatting", () => {
      const fixture = {
        "people": [
          {
            "name": "John",
            "age": 30
          },
          {
            "name": "Jane",
            "age": 25
          },
          {
            "name": "Bob",
            "age": 35
          }
        ]
      };
      // Test join() function with complex formatting
      const result = fhirpath({}, `people.select(name + ' (' + age.toString() + ')').join('; ')`, fixture);
      expect(result).toEqual(["John (30); Jane (25); Bob (35)"]);
    });
    it("combine() function", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "b",
          "c",
          "d"
        ]
      };
      // Test combine() function for merging collections
      const result = fhirpath({}, `set1.combine(set2)`, fixture);
      expect(result).toEqual(["a","b","c","b","c","d"]);
    });
    it("union() vs combine() difference", () => {
      const fixture = {
        "set1": [
          "a",
          "b",
          "c"
        ],
        "set2": [
          "b",
          "c",
          "d"
        ]
      };
      // Test difference between union() and combine() functions
      const result = fhirpath({}, `set1.union(set2).count() != set1.combine(set2).count()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Advanced function chaining", () => {
      const fixture = {
        "data": [
          {
            "name": "John",
            "status": "active"
          },
          {
            "name": "Bob",
            "status": "inactive"
          },
          {
            "name": "Jane",
            "status": "active"
          },
          {
            "name": "Alice",
            "status": "active"
          }
        ],
        "blacklist": [
          "Alice"
        ]
      };
      // Test complex chaining of advanced functions
      const result = fhirpath({}, `data.where(status = 'active').select(name).exclude(blacklist).join(', ')`, fixture);
      expect(result).toEqual(["John, Jane"]);
    });
    it("Conditional processing with iif and matches", () => {
      const fixture = {
        "emails": [
          "john@company.com",
          "jane@gmail.com",
          "bob@company.com"
        ]
      };
      // Test conditional processing combining iif() and matches()
      const result = fhirpath({}, `emails.select(iif($this.matches('.*@company\.com$'), 'internal', 'external'))`, fixture);
      expect(result).toEqual(["internal","external","internal"]);
    });
    it("Data transformation pipeline", () => {
      const fixture = {
        "rawData": "apple!@#,banana,apple,orange!!!"
      };
      // Test complex data transformation using multiple advanced functions
      const result = fhirpath({}, `rawData.replace('[^a-zA-Z0-9,]', '').split(',').where($this != '').select($this.upper()).distinct().join(' | ')`, fixture);
      expect(result).toEqual(["APPLE | BANANA | ORANGE"]);
    });
    it("matches() with invalid regex", () => {
      const fixture = {
        "text": "test"
      };
      // Test matches() function with invalid regex pattern
      expect(() => {
        fhirpath({}, `text.matches('[invalid')`, fixture);
      }).toThrow("Invalid regular expression pattern");
    });
    it("split() with null input", () => {
      const fixture = {
        "nullValue": null
      };
      // Test split() function with null input
      const result = fhirpath({}, `nullValue.split(',')`, fixture);
      expect(result).toEqual([]);
    });
    it("join() with non-string elements", () => {
      const fixture = {
        "mixedTypes": [
          42,
          true,
          "text"
        ]
      };
      // Test join() function with non-string elements
      const result = fhirpath({}, `mixedTypes.join(',')`, fixture);
      expect(result).toEqual(["42,true,text"]);
    });
  });
});
