import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 12-operators-collection.yaml
// Tests for FHIRPath collection operators including union (|), membership (in), and contains

describe("Collection Operators", () => {

  describe("operators", () => {
    it("Union of two simple collections", () => {
      const fixture = {
        "names1": [
          "John",
          "Jane"
        ],
        "names2": [
          "Bob",
          "Alice"
        ]
      };
      // Test union operator with two simple collections
      const result = fhirpath({}, `names1 | names2`, fixture);
      expect(result).toEqual(["John","Jane","Bob","Alice"]);
    });
    it("Union with overlapping collections", () => {
      const fixture = {
        "names1": [
          "John",
          "Jane"
        ],
        "names2": [
          "Bob",
          "John"
        ]
      };
      // Test union operator with overlapping collections
      const result = fhirpath({}, `names1 | names2`, fixture);
      expect(result).toEqual(["John","Jane","Bob","John"]);
    });
    it("Union with empty collection", () => {
      const fixture = {
        "names": [
          "John",
          "Jane"
        ],
        "empty": []
      };
      // Test union operator with empty collection
      const result = fhirpath({}, `names | empty`, fixture);
      expect(result).toEqual(["John","Jane"]);
    });
    it("Union of single values", () => {
      const fixture = {
        "dummy": true
      };
      // Test union operator with single values
      const result = fhirpath({}, `'John' | 'Jane'`, fixture);
      expect(result).toEqual(["John","Jane"]);
    });
    it("Union with mixed types", () => {
      const fixture = {
        "numbers": [
          1,
          2,
          3
        ],
        "strings": [
          "a",
          "b",
          "c"
        ]
      };
      // Test union operator with mixed data types
      const result = fhirpath({}, `numbers | strings`, fixture);
      expect(result).toEqual([1,2,3,"a","b","c"]);
    });
    it("Complex collection union", () => {
      const fixture = {
        "patients": [
          {
            "name": "John Doe",
            "age": 30
          },
          {
            "name": "Jane Smith",
            "age": 25
          }
        ],
        "contacts": [
          {
            "name": "Emergency Contact",
            "type": "emergency"
          },
          {
            "name": "Family Member",
            "type": "family"
          }
        ]
      };
      // Test union operator with complex collections
      const result = fhirpath({}, `patients.name | contacts.name`, fixture);
      expect(result).toEqual(["John Doe","Jane Smith","Emergency Contact","Family Member"]);
    });
    it("Membership test - value in collection", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test membership operator with value in collection
      const result = fhirpath({}, `'John' in names`, fixture);
      expect(result).toEqual([true]);
    });
    it("Membership test - value not in collection", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test membership operator with value not in collection
      const result = fhirpath({}, `'Alice' in names`, fixture);
      expect(result).toEqual([false]);
    });
    it("Membership test with numbers", () => {
      const fixture = {
        "numbers": [
          1,
          3,
          5,
          7,
          9
        ]
      };
      // Test membership operator with numeric values
      const result = fhirpath({}, `5 in numbers`, fixture);
      expect(result).toEqual([true]);
    });
    it("Membership test with empty collection", () => {
      const fixture = {
        "empty": []
      };
      // Test membership operator with empty collection
      const result = fhirpath({}, `'John' in empty`, fixture);
      expect(result).toEqual([false]);
    });
    it("Membership test with single value", () => {
      const fixture = {
        "singleName": "John"
      };
      // Test membership operator with single value collection
      const result = fhirpath({}, `'John' in singleName`, fixture);
      expect(result).toEqual([true]);
    });
    it("Multiple membership tests", () => {
      const fixture = {
        "testValues": [
          "a",
          "x",
          "c"
        ],
        "validValues": [
          "a",
          "b",
          "c",
          "d"
        ]
      };
      // Test membership operator with multiple values
      const result = fhirpath({}, `testValues in validValues`, fixture);
      expect(result).toEqual([true,false,true]);
    });
    it("Collection contains value", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test contains operator with collection containing value
      const result = fhirpath({}, `names contains 'John'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Collection does not contain value", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test contains operator with collection not containing value
      const result = fhirpath({}, `names contains 'Alice'`, fixture);
      expect(result).toEqual([false]);
    });
    it("Contains with numbers", () => {
      const fixture = {
        "numbers": [
          1,
          3,
          5,
          7,
          9
        ]
      };
      // Test contains operator with numeric values
      const result = fhirpath({}, `numbers contains 5`, fixture);
      expect(result).toEqual([true]);
    });
    it("Contains with complex objects", () => {
      const fixture = {
        "patients": [
          {
            "name": "John Doe",
            "age": 30
          },
          {
            "name": "Jane Smith",
            "age": 25
          }
        ]
      };
      // Test contains operator with complex objects
      const result = fhirpath({}, `patients.name contains 'John Doe'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Contains with empty collection", () => {
      const fixture = {
        "empty": []
      };
      // Test contains operator with empty collection
      const result = fhirpath({}, `empty contains 'anything'`, fixture);
      expect(result).toEqual([false]);
    });
    it("Union with where() filtering", () => {
      const fixture = {
        "patients": [
          {
            "name": "John Doe",
            "age": 30
          },
          {
            "name": "Jane Smith",
            "age": 20
          }
        ],
        "contacts": [
          {
            "name": "Emergency Contact",
            "type": "emergency"
          },
          {
            "name": "Family Member",
            "type": "family"
          }
        ]
      };
      // Test union operator combined with where() filtering
      const result = fhirpath({}, `patients.where(age > 25).name | contacts.where(type = 'emergency').name`, fixture);
      expect(result).toEqual(["John Doe","Emergency Contact"]);
    });
    it("Membership with select() projection", () => {
      const fixture = {
        "users": [
          {
            "name": "John",
            "role": "admin"
          },
          {
            "name": "Jane",
            "role": "user"
          }
        ]
      };
      // Test membership operator with select() projection
      const result = fhirpath({}, `'admin' in users.select(role)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Contains with distinct values", () => {
      const fixture = {
        "roles": [
          "user",
          "admin",
          "manager",
          "user",
          "admin"
        ]
      };
      // Test contains operator with distinct values
      const result = fhirpath({}, `roles.distinct() contains 'manager'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Union of nested collections", () => {
      const fixture = {
        "departments": {
          "employees": [
            "John",
            "Jane",
            "Bob"
          ]
        },
        "contractors": [
          "Alice",
          "Charlie"
        ]
      };
      // Test union operator with nested collections
      const result = fhirpath({}, `departments.employees | contractors`, fixture);
      expect(result).toEqual(["John","Jane","Bob","Alice","Charlie"]);
    });
    it("Membership in nested structure", () => {
      const fixture = {
        "organization": {
          "departments": {
            "employees": [
              "John",
              "Jane",
              "Bob"
            ]
          }
        }
      };
      // Test membership operator in nested structure
      const result = fhirpath({}, `'John' in organization.departments.employees`, fixture);
      expect(result).toEqual([true]);
    });
    it("Contains across multiple levels", () => {
      const fixture = {
        "teams": [
          {
            "name": "Development",
            "members": [
              {
                "name": "John Doe",
                "role": "developer"
              },
              {
                "name": "Jane Smith",
                "role": "tester"
              }
            ]
          },
          {
            "name": "Marketing",
            "members": [
              {
                "name": "Bob Johnson",
                "role": "manager"
              }
            ]
          }
        ]
      };
      // Test contains operator across multiple levels
      const result = fhirpath({}, `teams.members.name contains 'John Doe'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Union with comparison results", () => {
      const fixture = {
        "ages": [
          25,
          35,
          15,
          45,
          28
        ]
      };
      // Test union operator with comparison results
      const result = fhirpath({}, `ages.where($this > 30) | ages.where($this < 20)`, fixture);
      expect(result).toEqual([35,45,15]);
    });
    it("Membership with boolean results", () => {
      const fixture = {
        "statuses": [
          {
            "name": "User1",
            "active": true
          },
          {
            "name": "User2",
            "active": false
          }
        ]
      };
      // Test membership operator with boolean results
      const result = fhirpath({}, `true in statuses.select(active)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Role-based access control", () => {
      const fixture = {
        "requiredRole": "editor",
        "userRoles": [
          "user",
          "editor",
          "viewer"
        ]
      };
      // Test role-based access using collection operators
      const result = fhirpath({}, `requiredRole in userRoles or 'admin' in userRoles`, fixture);
      expect(result).toEqual([true]);
    });
    it("Medical allergy checking", () => {
      const fixture = {
        "medicationIngredients": [
          "acetaminophen",
          "caffeine"
        ],
        "patientAllergies": [
          "penicillin",
          "latex",
          "shellfish"
        ]
      };
      // Test allergy checking using collection operators
      const result = fhirpath({}, `medicationIngredients.exists($this in patientAllergies)`, fixture);
      expect(result).toEqual([false]);
    });
    it("Course prerequisite validation", () => {
      const fixture = {
        "prerequisites": [
          "MATH101",
          "PHYS101"
        ],
        "completedCourses": [
          "MATH101",
          "PHYS101",
          "CHEM101",
          "ENG101"
        ]
      };
      // Test course prerequisite validation using collection operators
      const result = fhirpath({}, `prerequisites.all($this in completedCourses)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Shopping cart total calculation", () => {
      const fixture = {
        "items": [
          {
            "name": "Book",
            "category": "education",
            "price": 50
          },
          {
            "name": "Alcohol",
            "category": "restricted",
            "price": 30
          },
          {
            "name": "Software",
            "category": "technology",
            "price": 100
          }
        ],
        "allowedCategories": [
          "education",
          "technology",
          "clothing"
        ]
      };
      // Test shopping cart logic using collection operators
      const result = fhirpath({}, `items.where(category in allowedCategories).price.sum()`, fixture);
      expect(result).toEqual([150]);
    });
    it("Union with incompatible types", () => {
      const fixture = {
        "numbers": [
          1,
          2,
          3
        ],
        "booleans": [
          true,
          false
        ]
      };
      // Test union operator with incompatible types
      const result = fhirpath({}, `numbers | booleans`, fixture);
      expect(result).toEqual([1,2,3,true,false]);
    });
    it("Membership with null values", () => {
      const fixture = {
        "values": [
          "a",
          "b",
          "c"
        ]
      };
      // Test membership operator with null values
      const result = fhirpath({}, `{} in values`, fixture);
      expect(result).toEqual([false]);
    });
    it("Contains with null collection", () => {
      const fixture = {
        "dummy": true
      };
      // Test contains operator with null collection
      const result = fhirpath({}, `nullCollection contains 'anything'`, fixture);
      expect(result).toEqual([false]);
    });
    it("Large collection union", () => {
      const fixture = {
        "largeSet1": [
          1,
          2,
          3,
          4,
          5
        ],
        "largeSet2": [
          6,
          7,
          8,
          9,
          10
        ]
      };
      // Test union operator with large collections
      const result = fhirpath({}, `largeSet1 | largeSet2`, fixture);
      expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
    });
    it("Membership in large collection", () => {
      const fixture = {
        "largeNumbers": [
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900,
          1000
        ]
      };
      // Test membership operator with large collection
      const result = fhirpath({}, `500 in largeNumbers`, fixture);
      expect(result).toEqual([true]);
    });
    it("Chained collection operations", () => {
      const fixture = {
        "set1": [
          "a",
          "b"
        ],
        "set2": [
          "c",
          "d"
        ],
        "validValues": [
          "a",
          "c",
          "e"
        ]
      };
      // Test chaining multiple collection operators
      const result = fhirpath({}, `(set1 | set2).where($this in validValues)`, fixture);
      expect(result).toEqual(["a","c"]);
    });
    it("Complex collection expression", () => {
      const fixture = {
        "users": [
          {
            "name": "Admin User",
            "role": "admin",
            "department": "IT"
          },
          {
            "name": "Regular User",
            "role": "user",
            "department": "Sales"
          },
          {
            "name": "Manager User",
            "role": "manager",
            "department": "Finance"
          }
        ],
        "adminRoles": [
          "admin",
          "superadmin"
        ],
        "priorityDepartments": [
          "Finance",
          "Legal"
        ]
      };
      // Test complex expression with multiple collection operators
      const result = fhirpath({}, `users.where(role in adminRoles or department in priorityDepartments).name`, fixture);
      expect(result).toEqual(["Admin User","Manager User"]);
    });
  });
});
