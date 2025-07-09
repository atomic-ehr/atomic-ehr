import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 10-operators-logical.yaml
// Tests for FHIRPath logical operators including and, or, xor, and not

describe("Logical Operators", () => {

  describe("operators", () => {
    it("AND operator with true values", () => {
      const fixture = {
        "dummy": true
      };
      // Test AND operator with both true values
      const result = fhirpath({}, `true and true`, fixture);
      expect(result).toEqual([true]);
    });
    it("AND operator with false values", () => {
      const fixture = {
        "dummy": true
      };
      // Test AND operator with both false values
      const result = fhirpath({}, `false and false`, fixture);
      expect(result).toEqual([false]);
    });
    it("AND operator with mixed values - true and false", () => {
      const fixture = {
        "dummy": true
      };
      // Test AND operator with true and false
      const result = fhirpath({}, `true and false`, fixture);
      expect(result).toEqual([false]);
    });
    it("AND operator with mixed values - false and true", () => {
      const fixture = {
        "dummy": true
      };
      // Test AND operator with false and true
      const result = fhirpath({}, `false and true`, fixture);
      expect(result).toEqual([false]);
    });
    it("AND operator with expressions", () => {
      const fixture = {
        "age": 30
      };
      // Test AND operator with comparison expressions
      const result = fhirpath({}, `age > 18 and age < 65`, fixture);
      expect(result).toEqual([true]);
    });
    it("AND operator short-circuit evaluation", () => {
      const fixture = {
        "dummy": true
      };
      // Test AND operator short-circuit behavior
      const result = fhirpath({}, `false and (1/0 > 0)`, fixture);
      expect(result).toEqual([false]);
    });
    it("OR operator with true values", () => {
      const fixture = {
        "dummy": true
      };
      // Test OR operator with both true values
      const result = fhirpath({}, `true or true`, fixture);
      expect(result).toEqual([true]);
    });
    it("OR operator with false values", () => {
      const fixture = {
        "dummy": true
      };
      // Test OR operator with both false values
      const result = fhirpath({}, `false or false`, fixture);
      expect(result).toEqual([false]);
    });
    it("OR operator with mixed values - true or false", () => {
      const fixture = {
        "dummy": true
      };
      // Test OR operator with true or false
      const result = fhirpath({}, `true or false`, fixture);
      expect(result).toEqual([true]);
    });
    it("OR operator with mixed values - false or true", () => {
      const fixture = {
        "dummy": true
      };
      // Test OR operator with false or true
      const result = fhirpath({}, `false or true`, fixture);
      expect(result).toEqual([true]);
    });
    it("OR operator with expressions", () => {
      const fixture = {
        "age": 30
      };
      // Test OR operator with comparison expressions
      const result = fhirpath({}, `age < 18 or age > 65`, fixture);
      expect(result).toEqual([false]);
    });
    it("OR operator short-circuit evaluation", () => {
      const fixture = {
        "dummy": true
      };
      // Test OR operator short-circuit behavior
      const result = fhirpath({}, `true or (1/0 > 0)`, fixture);
      expect(result).toEqual([true]);
    });
    it("XOR operator with true values", () => {
      const fixture = {
        "dummy": true
      };
      // Test XOR operator with both true values
      const result = fhirpath({}, `true xor true`, fixture);
      expect(result).toEqual([false]);
    });
    it("XOR operator with false values", () => {
      const fixture = {
        "dummy": true
      };
      // Test XOR operator with both false values
      const result = fhirpath({}, `false xor false`, fixture);
      expect(result).toEqual([false]);
    });
    it("XOR operator with mixed values - true xor false", () => {
      const fixture = {
        "dummy": true
      };
      // Test XOR operator with true xor false
      const result = fhirpath({}, `true xor false`, fixture);
      expect(result).toEqual([true]);
    });
    it("XOR operator with mixed values - false xor true", () => {
      const fixture = {
        "dummy": true
      };
      // Test XOR operator with false xor true
      const result = fhirpath({}, `false xor true`, fixture);
      expect(result).toEqual([true]);
    });
    it("XOR operator with expressions", () => {
      const fixture = {
        "age": 30,
        "weight": 70
      };
      // Test XOR operator with comparison expressions
      const result = fhirpath({}, `(age < 25) xor (weight > 80)`, fixture);
      expect(result).toEqual([false]);
    });
    it("NOT operator with true value", () => {
      const fixture = {
        "dummy": true
      };
      // Test NOT operator with true value
      const result = fhirpath({}, `not true`, fixture);
      expect(result).toEqual([false]);
    });
    it("NOT operator with false value", () => {
      const fixture = {
        "dummy": true
      };
      // Test NOT operator with false value
      const result = fhirpath({}, `not false`, fixture);
      expect(result).toEqual([true]);
    });
    it("NOT operator with expression", () => {
      const fixture = {
        "age": 30
      };
      // Test NOT operator with comparison expression
      const result = fhirpath({}, `not (age > 65)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Double negation", () => {
      const fixture = {
        "dummy": true
      };
      // Test double NOT operator
      const result = fhirpath({}, `not (not true)`, fixture);
      expect(result).toEqual([true]);
    });
    it("AND operator with collection results", () => {
      const fixture = {
        "names": [
          "John",
          "Jane"
        ],
        "ages": [
          30,
          25
        ]
      };
      // Test AND operator with expressions returning collections
      const result = fhirpath({}, `names.exists() and ages.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("OR operator with empty collections", () => {
      const fixture = {
        "names": [
          "John",
          "Jane"
        ],
        "ages": [
          30,
          25
        ]
      };
      // Test OR operator with empty collection checks
      const result = fhirpath({}, `names.empty() or ages.empty()`, fixture);
      expect(result).toEqual([false]);
    });
    it("Logical operators with where() results", () => {
      const fixture = {
        "patients": [
          {
            "name": "John",
            "age": 30
          },
          {
            "name": "Jane",
            "age": 35
          }
        ]
      };
      // Test logical operators with where() filtering
      const result = fhirpath({}, `patients.where(age > 25).exists() and patients.where(age < 40).exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Multiple AND operations", () => {
      const fixture = {
        "age": 30,
        "active": true
      };
      // Test multiple AND operations in sequence
      const result = fhirpath({}, `age > 18 and age < 65 and active = true`, fixture);
      expect(result).toEqual([true]);
    });
    it("Multiple OR operations", () => {
      const fixture = {
        "status": "pending"
      };
      // Test multiple OR operations in sequence
      const result = fhirpath({}, `status = 'active' or status = 'pending' or status = 'review'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Mixed logical operators", () => {
      const fixture = {
        "age": 30,
        "retired": false
      };
      // Test mixed AND and OR operators
      const result = fhirpath({}, `(age >= 18 and age <= 25) or (age >= 65 and retired = true)`, fixture);
      expect(result).toEqual([false]);
    });
    it("Logical operators with parentheses", () => {
      const fixture = {
        "age": 30,
        "active": true,
        "vip": false
      };
      // Test logical operators with explicit parentheses
      const result = fhirpath({}, `(age > 18 and active = true) or (vip = true)`, fixture);
      expect(result).toEqual([true]);
    });
    it("AND/OR precedence without parentheses", () => {
      const fixture = {
        "dummy": true
      };
      // Test AND/OR operator precedence
      const result = fhirpath({}, `true or false and false`, fixture);
      expect(result).toEqual([true]);
    });
    it("NOT operator precedence", () => {
      const fixture = {
        "dummy": true
      };
      // Test NOT operator precedence
      const result = fhirpath({}, `not false and true`, fixture);
      expect(result).toEqual([true]);
    });
    it("Complex precedence with comparison", () => {
      const fixture = {
        "age": 30,
        "weight": 70,
        "height": 175
      };
      // Test logical operator precedence with comparisons
      const result = fhirpath({}, `age > 18 and weight < 100 or height > 200`, fixture);
      expect(result).toEqual([true]);
    });
    it("AND with null values", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test AND operator with null values
      const result = fhirpath({}, `name.exists() and middleName.exists()`, fixture);
      expect(result).toEqual([false]);
    });
    it("OR with null values", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test OR operator with null values
      const result = fhirpath({}, `name.exists() or middleName.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("NOT with empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test NOT operator with empty collection
      const result = fhirpath({}, `not middleName.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Eligibility criteria check", () => {
      const fixture = {
        "age": 30,
        "income": 35000,
        "hasInsurance": true,
        "criminalRecord": []
      };
      // Test complex eligibility criteria using logical operators
      const result = fhirpath({}, `(age >= 18 and age <= 65) and (income >= 25000 or hasInsurance = true) and criminalRecord.empty()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Medical contraindication check", () => {
      const fixture = {
        "allergies": [
          "pollen",
          "dust"
        ],
        "age": 30,
        "weight": 70,
        "pregnancyStatus": "not pregnant"
      };
      // Test medical contraindication logic
      const result = fhirpath({}, `not (allergies.contains('penicillin') or (age < 18 and weight < 40) or pregnancyStatus = 'pregnant')`, fixture);
      expect(result).toEqual([true]);
    });
    it("Business hours validation", () => {
      const fixture = {
        "dayOfWeek": 3,
        "hour": 14,
        "isHoliday": false
      };
      // Test business hours validation logic
      const result = fhirpath({}, `(dayOfWeek >= 1 and dayOfWeek <= 5) and (hour >= 9 and hour <= 17) and not isHoliday`, fixture);
      expect(result).toEqual([true]);
    });
    it("Access control logic", () => {
      const fixture = {
        "role": "manager",
        "department": "IT",
        "requestedDepartment": "IT",
        "userId": "user123",
        "resourceOwner": "user456"
      };
      // Test access control using logical operators
      const result = fhirpath({}, `(role = 'admin') or (role = 'manager' and department = requestedDepartment) or (role = 'user' and userId = resourceOwner)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Logical operator with non-boolean expression", () => {
      const fixture = {
        "name": "John Doe",
        "age": 30
      };
      // Test logical operator with non-boolean expression
      expect(() => {
        fhirpath({}, `name and age`, fixture);
      }).toThrow("Logical operators require boolean operands");
    });
    it("Logical operator with empty collection", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test logical operator behavior with empty collections
      const result = fhirpath({}, `nonexistent.exists() and true`, fixture);
      expect(result).toEqual([false]);
    });
    it("Three-valued logic - unknown AND true", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test three-valued logic with unknown and true
      const result = fhirpath({}, `unknownValue.exists() and true`, fixture);
      expect(result).toEqual([false]);
    });
    it("Three-valued logic - unknown OR true", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test three-valued logic with unknown or true
      const result = fhirpath({}, `unknownValue.exists() or true`, fixture);
      expect(result).toEqual([true]);
    });
    it("Three-valued logic - unknown AND false", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test three-valued logic with unknown and false
      const result = fhirpath({}, `unknownValue.exists() and false`, fixture);
      expect(result).toEqual([false]);
    });
    it("Long chain of AND operations", () => {
      const fixture = {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": 4,
        "e": 5
      };
      // Test long chain of AND operations
      const result = fhirpath({}, `a = 1 and b = 2 and c = 3 and d = 4 and e = 5`, fixture);
      expect(result).toEqual([true]);
    });
    it("Long chain of OR operations", () => {
      const fixture = {
        "status": "approved"
      };
      // Test long chain of OR operations
      const result = fhirpath({}, `status = 'draft' or status = 'review' or status = 'approved' or status = 'published'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Complex nested logical expression", () => {
      const fixture = {
        "age": 20,
        "citizen": true,
        "hasPermit": false,
        "banned": false,
        "suspended": false
      };
      // Test complex nested logical expression
      const result = fhirpath({}, `((age >= 18 and citizen = true) or (age >= 16 and hasPermit = true)) and not (banned = true or suspended = true)`, fixture);
      expect(result).toEqual([true]);
    });
  });
});
