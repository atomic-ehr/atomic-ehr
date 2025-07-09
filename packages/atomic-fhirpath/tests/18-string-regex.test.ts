import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 18-string-regex.yaml
// Tests for advanced string manipulation: matches(), replace(), split(), join()

describe("String and Regex Functions", () => {

  describe("string", () => {
    it("matches() - basic pattern", () => {
      const fixture = {};
      // Basic regex pattern matching
      const result = fhirpath({}, `'hello123'.matches('[a-z]+[0-9]+')`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("general", () => {
    it("matches() - case insensitive", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Hello'.matches('hello', 'i')`, fixture);
      expect(result).toEqual([true]);
    });
    it("matches() - digit pattern", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'12345'.matches('^\d+$')`, fixture);
      expect(result).toEqual([true]);
    });
    it("matches() - email pattern", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'user@example.com'.matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')`, fixture);
      expect(result).toEqual([true]);
    });
    it("matches() - no match", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'hello'.matches('^[0-9]+$')`, fixture);
      expect(result).toEqual([false]);
    });
    it("matches() - multiline", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'line1
line2'.matches('line1.*line2', 's')`, fixture);
      expect(result).toEqual([true]);
    });
    it("replace() - simple replacement", () => {
      const fixture = {};
      // Basic string replacement
      const result = fhirpath({}, `'hello world'.replace('world', 'universe')`, fixture);
      expect(result).toEqual(["hello universe"]);
    });
    it("replace() - regex replacement", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'hello123world'.replace('[0-9]+', '-')`, fixture);
      expect(result).toEqual(["hello-world"]);
    });
    it("replace() - capture groups", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'John Smith'.replace('(\w+) (\w+)', '$2, $1')`, fixture);
      expect(result).toEqual(["Smith, John"]);
    });
    it("replace() - global replacement", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'aaabbbccc'.replace('b+', 'X')`, fixture);
      expect(result).toEqual(["aaaXccc"]);
    });
    it("replace() - case insensitive", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Hello HELLO hello'.replace('hello', 'hi', 'i')`, fixture);
      expect(result).toEqual(["hi HELLO hello"]);
    });
    it("replace() - special characters", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'price: $10.99'.replace('\$([0-9.]+)', '€$1')`, fixture);
      expect(result).toEqual(["price: €10.99"]);
    });
    it("split() - simple delimiter", () => {
      const fixture = {};
      // Split string by delimiter
      const result = fhirpath({}, `'a,b,c'.split(',')`, fixture);
      expect(result).toEqual(["a","b","c"]);
    });
    it("split() - regex delimiter", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'a1b2c3'.split('[0-9]')`, fixture);
      expect(result).toEqual(["a","b","c",""]);
    });
    it("split() - whitespace", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'hello   world   test'.split('\s+')`, fixture);
      expect(result).toEqual(["hello","world","test"]);
    });
    it("split() - empty strings", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'a,,c'.split(',')`, fixture);
      expect(result).toEqual(["a","","c"]);
    });
    it("split() - limit parameter", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'a-b-c-d'.split('-', 2)`, fixture);
      expect(result).toEqual(["a","b-c-d"]);
    });
    it("join() - simple join", () => {
      const fixture = {};
      // Join collection of strings
      const result = fhirpath({}, `('a' | 'b' | 'c').join(',')`, fixture);
      expect(result).toEqual(["a,b,c"]);
    });
    it("join() - with space", () => {
      const fixture = {};
      
      const result = fhirpath({}, `('hello' | 'world').join(' ')`, fixture);
      expect(result).toEqual(["hello world"]);
    });
    it("join() - empty delimiter", () => {
      const fixture = {};
      
      const result = fhirpath({}, `('1' | '2' | '3').join('')`, fixture);
      expect(result).toEqual(["123"]);
    });
    it("join() - complex delimiter", () => {
      const fixture = {};
      
      const result = fhirpath({}, `('item1' | 'item2' | 'item3').join(' -> ')`, fixture);
      expect(result).toEqual(["item1 -> item2 -> item3"]);
    });
    it("join() - single item", () => {
      const fixture = {};
      
      const result = fhirpath({}, `('solo').join(',')`, fixture);
      expect(result).toEqual(["solo"]);
    });
    it("Parse structured string", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Name: John Doe; Age: 30; Status: Active'.split(';').select($this.split(':')[1].trim())`, fixture);
      expect(result).toEqual(["John Doe","30","Active"]);
    });
    it("Validate and clean phone", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'(555) 123-4567'.replace('[^0-9]', '').matches('^[0-9]{10}$')`, fixture);
      expect(result).toEqual([true]);
    });
    it("Extract URLs", () => {
      const fixture = {
        "text": "Visit https://example.com for more info"
      };
      
      const result = fhirpath({}, `text.matches('https?://[^\s]+')`, fixture);
      expect(result).toEqual([true]);
    });
    it("Build path from parts", () => {
      const fixture = {
        "id": "12345"
      };
      
      const result = fhirpath({}, `('users' | id | 'profile').join('/')`, fixture);
      expect(result).toEqual(["users/12345/profile"]);
    });
    it("Sanitize HTML", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'<p>Hello <b>world</b></p>'.replace('<[^>]+>', '')`, fixture);
      expect(result).toEqual(["Hello world"]);
    });
    it("Format name variations", () => {
      const fixture = {
        "name": [
          {
            "given": [
              "John",
              "Michael"
            ],
            "family": "Smith"
          },
          {
            "given": [
              "Jane"
            ],
            "family": "Doe"
          }
        ]
      };
      
      const result = fhirpath({}, `name.select($this.given.join(' ') + ' ' + $this.family.upper())`, fixture);
      expect(result).toEqual(["John Michael SMITH","Jane DOE"]);
    });
    it("Extract hashtags", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'Check out #fhir and #healthcare'.split(' ').where($this.matches('^#[a-zA-Z0-9]+')).replace('#', '')`, fixture);
      expect(result).toEqual(["fhir","healthcare"]);
    });
    it("matches() - invalid regex", () => {
      const fixture = {};
      // Invalid regex pattern
      expect(() => {
        fhirpath({}, `'test'.matches('[invalid')`, fixture);
      }).toThrow("Invalid regular expression");
    });
    it("replace() - invalid replacement", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `'test'.replace('(test)', '$2')`, fixture);
      }).toThrow("Invalid capture group reference");
    });
    it("Empty string operations", () => {
      const fixture = {};
      
      const result = fhirpath({}, `''.split(',').count()`, fixture);
      expect(result).toEqual([1]);
    });
    it("Unicode handling", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'café'.matches('^[a-zé]+$')`, fixture);
      expect(result).toEqual([true]);
    });
    it("Newline handling", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'line1
line2
line3'.split('
').count()`, fixture);
      expect(result).toEqual([3]);
    });
    it("Escape sequences", () => {
      const fixture = {};
      
      const result = fhirpath({}, `'path\to\file'.replace('\\', '/')`, fixture);
      expect(result).toEqual(["path/to/file"]);
    });
    it("Complex nested operations", () => {
      const fixture = {
        "text": "First line\n  Second line\nthird line\n  Fourth line"
      };
      
      const result = fhirpath({}, `text.split('
').where($this.matches('^\s*[A-Z]')).select($this.trim()).join('; ')`, fixture);
      expect(result).toEqual(["First line; Second line; Fourth line"]);
    });
  });
  describe("intermediate", () => {
    it("Extract and transform", () => {
      const fixture = {
        "identifier": [
          {
            "system": "http://example.com",
            "value": "PAT-12345"
          },
          {
            "system": "http://other.com",
            "value": "OTHER-67890"
          },
          {
            "system": "http://example.com",
            "value": "PAT-11111"
          }
        ]
      };
      // Extract parts using regex and transform
      const result = fhirpath({}, `identifier.where(system = 'http://example.com').value.replace('^PAT-', '')`, fixture);
      expect(result).toEqual(["12345","11111"]);
    });
  });
  describe("advanced", () => {
    it("Parse CSV line", () => {
      const fixture = {};
      // Parse CSV with quoted values
      const result = fhirpath({}, `'"Smith, John",30,"Active"'.split(',(?=(?:[^"]*"[^"]*")*[^"]*$)')`, fixture);
      expect(result).toEqual(["\"Smith, John\"","30","\"Active\""]);
    });
  });
});
