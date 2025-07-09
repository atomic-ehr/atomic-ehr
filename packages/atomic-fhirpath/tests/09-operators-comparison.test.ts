import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 09-operators-comparison.yaml
// Tests for FHIRPath comparison operators including =, !=, <, <=, >, and >=

describe("Comparison Operators", () => {

  describe("operators", () => {
    it("Equality operator with integers", () => {
      const fixture = {
        "age": 30
      };
      // Test equality operator with integer values
      const result = fhirpath({}, `age = 30`, fixture);
      expect(result).toEqual([true]);
    });
    it("Equality operator with strings", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test equality operator with string values
      const result = fhirpath({}, `name = 'John Doe'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Equality operator with booleans", () => {
      const fixture = {
        "active": true
      };
      // Test equality operator with boolean values
      const result = fhirpath({}, `active = true`, fixture);
      expect(result).toEqual([true]);
    });
    it("Equality operator with dates", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test equality operator with date values
      const result = fhirpath({}, `birthDate = @1990-01-01`, fixture);
      expect(result).toEqual([true]);
    });
    it("Equality operator with decimals", () => {
      const fixture = {
        "weight": 70.5
      };
      // Test equality operator with decimal values
      const result = fhirpath({}, `weight = 70.5`, fixture);
      expect(result).toEqual([true]);
    });
    it("Equality operator case sensitivity", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test equality operator is case sensitive for strings
      const result = fhirpath({}, `name = 'john doe'`, fixture);
      expect(result).toEqual([false]);
    });
    it("Equality operator with null values", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test equality operator with null values
      const result = fhirpath({}, `middleName = {}`, fixture);
      expect(result).toEqual([true]);
    });
    it("Inequality operator with integers", () => {
      const fixture = {
        "age": 30
      };
      // Test inequality operator with integer values
      const result = fhirpath({}, `age != 25`, fixture);
      expect(result).toEqual([true]);
    });
    it("Inequality operator with strings", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test inequality operator with string values
      const result = fhirpath({}, `name != 'Jane Doe'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Inequality operator false case", () => {
      const fixture = {
        "age": 30
      };
      // Test inequality operator returning false
      const result = fhirpath({}, `age != 30`, fixture);
      expect(result).toEqual([false]);
    });
    it("Inequality operator with null", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test inequality operator with null values
      const result = fhirpath({}, `middleName != {}`, fixture);
      expect(result).toEqual([false]);
    });
    it("Less than operator with integers", () => {
      const fixture = {
        "age": 30
      };
      // Test less than operator with integer values
      const result = fhirpath({}, `age < 35`, fixture);
      expect(result).toEqual([true]);
    });
    it("Less than operator with decimals", () => {
      const fixture = {
        "weight": 70.5
      };
      // Test less than operator with decimal values
      const result = fhirpath({}, `weight < 80.0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Less than operator with dates", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test less than operator with date values
      const result = fhirpath({}, `birthDate < @2000-01-01`, fixture);
      expect(result).toEqual([true]);
    });
    it("Less than operator with strings", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test less than operator with string values (lexicographic)
      const result = fhirpath({}, `name < 'John Zoe'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Less than operator false case", () => {
      const fixture = {
        "age": 30
      };
      // Test less than operator returning false
      const result = fhirpath({}, `age < 25`, fixture);
      expect(result).toEqual([false]);
    });
    it("Less than or equal operator - less case", () => {
      const fixture = {
        "age": 30
      };
      // Test less than or equal operator with smaller value
      const result = fhirpath({}, `age <= 35`, fixture);
      expect(result).toEqual([true]);
    });
    it("Less than or equal operator - equal case", () => {
      const fixture = {
        "age": 30
      };
      // Test less than or equal operator with equal value
      const result = fhirpath({}, `age <= 30`, fixture);
      expect(result).toEqual([true]);
    });
    it("Less than or equal operator false case", () => {
      const fixture = {
        "age": 30
      };
      // Test less than or equal operator returning false
      const result = fhirpath({}, `age <= 25`, fixture);
      expect(result).toEqual([false]);
    });
    it("Greater than operator with integers", () => {
      const fixture = {
        "age": 30
      };
      // Test greater than operator with integer values
      const result = fhirpath({}, `age > 25`, fixture);
      expect(result).toEqual([true]);
    });
    it("Greater than operator with decimals", () => {
      const fixture = {
        "weight": 70.5
      };
      // Test greater than operator with decimal values
      const result = fhirpath({}, `weight > 60.0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Greater than operator with dates", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test greater than operator with date values
      const result = fhirpath({}, `birthDate > @1980-01-01`, fixture);
      expect(result).toEqual([true]);
    });
    it("Greater than operator false case", () => {
      const fixture = {
        "age": 30
      };
      // Test greater than operator returning false
      const result = fhirpath({}, `age > 35`, fixture);
      expect(result).toEqual([false]);
    });
    it("Greater than or equal operator - greater case", () => {
      const fixture = {
        "age": 30
      };
      // Test greater than or equal operator with larger value
      const result = fhirpath({}, `age >= 25`, fixture);
      expect(result).toEqual([true]);
    });
    it("Greater than or equal operator - equal case", () => {
      const fixture = {
        "age": 30
      };
      // Test greater than or equal operator with equal value
      const result = fhirpath({}, `age >= 30`, fixture);
      expect(result).toEqual([true]);
    });
    it("Greater than or equal operator false case", () => {
      const fixture = {
        "age": 30
      };
      // Test greater than or equal operator returning false
      const result = fhirpath({}, `age >= 35`, fixture);
      expect(result).toEqual([false]);
    });
    it("Equality operator with collections", () => {
      const fixture = {
        "ages": [
          25,
          30,
          35
        ]
      };
      // Test equality operator applied to collections
      const result = fhirpath({}, `ages = 30`, fixture);
      expect(result).toEqual([false,true,false]);
    });
    it("Less than operator with collections", () => {
      const fixture = {
        "ages": [
          25,
          30,
          35
        ]
      };
      // Test less than operator applied to collections
      const result = fhirpath({}, `ages < 30`, fixture);
      expect(result).toEqual([true,false,false]);
    });
    it("Greater than operator with collections", () => {
      const fixture = {
        "ages": [
          25,
          30,
          35
        ]
      };
      // Test greater than operator applied to collections
      const result = fhirpath({}, `ages > 30`, fixture);
      expect(result).toEqual([false,false,true]);
    });
    it("Chained comparison operators", () => {
      const fixture = {
        "age": 30
      };
      // Test chained comparison operators
      const result = fhirpath({}, `age >= 18 and age <= 65`, fixture);
      expect(result).toEqual([true]);
    });
    it("Comparison with calculated values", () => {
      const fixture = {
        "weight": 70,
        "height": 1.8
      };
      // Test comparison with calculated values
      const result = fhirpath({}, `weight / (height * height) > 25`, fixture);
      expect(result).toEqual([false]);
    });
    it("Date range comparison", () => {
      const fixture = {
        "eventDate": "@2020-06-15"
      };
      // Test date range comparison
      const result = fhirpath({}, `eventDate >= @2020-01-01 and eventDate <= @2020-12-31`, fixture);
      expect(result).toEqual([true]);
    });
    it("String comparison with contains", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test string comparison combined with contains
      const result = fhirpath({}, `name.contains('John') and name != 'John'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Quantity comparison", () => {
      const fixture = {
        "weight": "70 'kg'"
      };
      // Test comparison with quantity values
      const result = fhirpath({}, `weight > 60 'kg'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Time comparison", () => {
      const fixture = {
        "appointmentTime": "@T14:30:00"
      };
      // Test comparison with time values
      const result = fhirpath({}, `appointmentTime >= @T09:00:00`, fixture);
      expect(result).toEqual([true]);
    });
    it("DateTime timezone comparison", () => {
      const fixture = {
        "dummy": true
      };
      // Test comparison with datetime values in different timezones
      const result = fhirpath({}, `@2020-01-01T10:00:00+01:00 = @2020-01-01T09:00:00Z`, fixture);
      expect(result).toEqual([true]);
    });
    it("Comparison with mixed types", () => {
      const fixture = {
        "age": 30
      };
      // Test comparison with mixed data types
      expect(() => {
        fhirpath({}, `age = '30'`, fixture);
      }).toThrow("Cannot compare different types");
    });
    it("Comparison with empty collections", () => {
      const fixture = {
        "age": 30
      };
      // Test comparison with empty collections
      const result = fhirpath({}, `nonexistent = 30`, fixture);
      expect(result).toEqual([]);
    });
    it("Null comparison semantics", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test null comparison semantics
      const result = fhirpath({}, `middleName = middleName`, fixture);
      expect(result).toEqual([true]);
    });
    it("Age-based eligibility check", () => {
      const fixture = {
        "patients": [
          {
            "name": "John Doe",
            "age": 30
          },
          {
            "name": "Minor",
            "age": 16
          },
          {
            "name": "Jane Smith",
            "age": 45
          },
          {
            "name": "Senior",
            "age": 70
          }
        ]
      };
      // Test age-based eligibility using comparison
      const result = fhirpath({}, `patients.where(age >= 18 and age <= 65)`, fixture);
      expect(result).toEqual([{"name":"John Doe","age":30},{"name":"Jane Smith","age":45}]);
    });
    it("Lab value range checking", () => {
      const fixture = {
        "labResults": [
          {
            "test": "Cholesterol",
            "value": 180,
            "normalRange": {
              "low": 150,
              "high": 200
            }
          },
          {
            "test": "Glucose",
            "value": 150,
            "normalRange": {
              "low": 70,
              "high": 140
            }
          }
        ]
      };
      // Test lab value range checking with comparisons
      const result = fhirpath({}, `labResults.where(value < normalRange.low or value > normalRange.high)`, fixture);
      expect(result).toEqual([{"test":"Glucose","value":150,"normalRange":{"low":70,"high":140}}]);
    });
    it("Priority-based sorting", () => {
      const fixture = {
        "tasks": [
          {
            "name": "Regular Task",
            "priority": 5
          },
          {
            "name": "Critical Task",
            "priority": 10
          },
          {
            "name": "Low Priority",
            "priority": 2
          },
          {
            "name": "Urgent Task",
            "priority": 8
          }
        ]
      };
      // Test priority-based sorting using comparisons
      const result = fhirpath({}, `tasks.where(priority >= 8).select(name)`, fixture);
      expect(result).toEqual(["Critical Task","Urgent Task"]);
    });
    it("Comparison operator precedence", () => {
      const fixture = {
        "value": 15
      };
      // Test comparison operator precedence with arithmetic
      const result = fhirpath({}, `value + 10 > 20`, fixture);
      expect(result).toEqual([true]);
    });
    it("Comparison with logical operators", () => {
      const fixture = {
        "age": 30,
        "weight": 70,
        "height": 175
      };
      // Test comparison combined with logical operators
      const result = fhirpath({}, `age > 18 and weight < 100 or height > 180`, fixture);
      expect(result).toEqual([true]);
    });
  });
});
