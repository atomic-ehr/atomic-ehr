import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 14-environment-variables.yaml
// Tests for FHIRPath environment variables including %context, %now, %ucum, and custom variables

describe("Environment Variables", () => {

  describe("environment", () => {
    it("%context basic usage", () => {
      const fixture = {
        "name": "John Doe",
        "age": 30
      };
      // Test %context environment variable basic usage
      const result = fhirpath({}, `%context.name`, fixture);
      expect(result).toEqual(["John Doe"]);
    });
    it("%context vs direct access", () => {
      const fixture = {
        "age": 30
      };
      // Test %context vs direct property access equivalence
      const result = fhirpath({}, `%context.age = age`, fixture);
      expect(result).toEqual([true]);
    });
    it("%context with complex navigation", () => {
      const fixture = {
        "name": {
          "given": [
            "John",
            "William"
          ],
          "family": "Doe"
        }
      };
      // Test %context with complex property navigation
      const result = fhirpath({}, `%context.name.given.first()`, fixture);
      expect(result).toEqual(["John"]);
    });
    it("%context in where() condition", () => {
      const fixture = {
        "preferredCategory": "education",
        "items": [
          {
            "name": "Book",
            "category": "education"
          },
          {
            "name": "Toy",
            "category": "entertainment"
          }
        ]
      };
      // Test %context usage in where() conditions
      const result = fhirpath({}, `items.where(category = %context.preferredCategory)`, fixture);
      expect(result).toEqual([{"name":"Book","category":"education"}]);
    });
    it("%context with functions", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test %context with function calls
      const result = fhirpath({}, `%context.name.length() > 5`, fixture);
      expect(result).toEqual([true]);
    });
    it("%now basic usage", () => {
      const fixture = {
        "dummy": true
      };
      // Test %now environment variable basic usage
      const result = fhirpath({}, `%now.type().name`, fixture);
      expect(result).toEqual(["DateTime"]);
    });
    it("%now vs now() function", () => {
      const fixture = {
        "dummy": true
      };
      // Test %now vs now() function equivalence
      const result = fhirpath({}, `%now = now()`, fixture);
      expect(result).toEqual([true]);
    });
    it("%now in date comparison", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test %now in date comparison
      const result = fhirpath({}, `birthDate < %now`, fixture);
      expect(result).toEqual([true]);
    });
    it("%now with date arithmetic", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test %now with date arithmetic
      const result = fhirpath({}, `(%now - birthDate).value > 25 'years'`, fixture);
      expect(result).toEqual([true]);
    });
    it("%now consistency within expression", () => {
      const fixture = {
        "dummy": true
      };
      // Test %now returns same value within single expression
      const result = fhirpath({}, `%now = %now`, fixture);
      expect(result).toEqual([true]);
    });
    it("%now in future date filtering", () => {
      const fixture = {
        "appointments": [
          {
            "dateTime": "@2020-01-01T10:00:00",
            "provider": "Dr. Past"
          },
          {
            "dateTime": "@2030-01-01T10:00:00",
            "provider": "Dr. Future"
          }
        ]
      };
      // Test %now for filtering future dates
      const result = fhirpath({}, `appointments.where(dateTime > %now)`, fixture);
      expect(result).toEqual([{"dateTime":"@2030-01-01T10:00:00","provider":"Dr. Future"}]);
    });
    it("%ucum basic usage", () => {
      const fixture = {
        "dummy": true
      };
      // Test %ucum environment variable basic usage
      const result = fhirpath({}, `%ucum.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("%ucum unit validation", () => {
      const fixture = {
        "dummy": true
      };
      // Test %ucum for unit validation
      const result = fhirpath({}, `'kg' in %ucum.validUnits`, fixture);
      expect(result).toEqual([true]);
    });
    it("%ucum unit conversion", () => {
      const fixture = {
        "weight": "70 'kg'"
      };
      // Test %ucum for unit conversion
      const result = fhirpath({}, `%ucum.convert(weight, 'kg', 'lb')`, fixture);
      expect(result).toEqual(["154 'lb'"]);
    });
    it("%ucum unit compatibility", () => {
      const fixture = {
        "dummy": true
      };
      // Test %ucum for unit compatibility checking
      const result = fhirpath({}, `%ucum.isCompatible('kg', 'lb')`, fixture);
      expect(result).toEqual([true]);
    });
    it("%ucum invalid unit check", () => {
      const fixture = {
        "dummy": true
      };
      // Test %ucum for invalid unit checking
      const result = fhirpath({}, `'invalidunit' in %ucum.validUnits`, fixture);
      expect(result).toEqual([false]);
    });
    it("Custom environment variable", () => {
      const fixture = {
        "dummy": true
      };
      // Test custom environment variable usage
      const result = fhirpath({}, `%customVar`, fixture);
      expect(result).toEqual(["custom value"]);
    });
    it("Custom environment variable with spaces", () => {
      const fixture = {
        "dummy": true
      };
      // Test custom environment variable with spaces in name
      const result = fhirpath({}, `%'custom var with spaces'`, fixture);
      expect(result).toEqual(["spaced value"]);
    });
    it("Custom environment variable in expression", () => {
      const fixture = {
        "items": [
          {
            "name": "Low Priority Task",
            "priority": 3
          },
          {
            "name": "High Priority Task",
            "priority": 8
          }
        ]
      };
      // Test custom environment variable in complex expression
      const result = fhirpath({}, `items.where(priority >= %minPriority)`, fixture);
      expect(result).toEqual([{"name":"High Priority Task","priority":8}]);
    });
    it("Multiple environment variables", () => {
      const fixture = {
        "events": [
          {
            "name": "Too Early Event",
            "startDate": "@2023-01-01",
            "endDate": "@2023-03-31"
          },
          {
            "name": "Valid Event",
            "startDate": "@2023-06-01",
            "endDate": "@2023-08-31"
          },
          {
            "name": "Too Late Event",
            "startDate": "@2023-10-01",
            "endDate": "@2023-12-31"
          }
        ]
      };
      // Test multiple environment variables in single expression
      const result = fhirpath({}, `events.where(startDate >= %startRange and endDate <= %endRange)`, fixture);
      expect(result).toEqual([{"name":"Valid Event","startDate":"@2023-06-01","endDate":"@2023-08-31"}]);
    });
    it("Environment variable with collection access", () => {
      const fixture = {
        "names": [
          "John",
          "Jane",
          "Bob"
        ]
      };
      // Test environment variable accessing collection properties
      const result = fhirpath({}, `%context.names.count()`, fixture);
      expect(result).toEqual([3]);
    });
    it("Environment variable in collection filtering", () => {
      const fixture = {
        "currentUserRole": "admin",
        "users": [
          {
            "name": "Regular User",
            "role": "user"
          },
          {
            "name": "Admin User",
            "role": "admin"
          }
        ]
      };
      // Test environment variable in collection filtering
      const result = fhirpath({}, `users.where(role = %context.currentUserRole)`, fixture);
      expect(result).toEqual([{"name":"Admin User","role":"admin"}]);
    });
    it("Environment variable with aggregation", () => {
      const fixture = {
        "passingGrade": 70,
        "scores": [
          85,
          92,
          65,
          78,
          45
        ]
      };
      // Test environment variable with aggregation functions
      const result = fhirpath({}, `scores.where($this >= %passingGrade).count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("Nested environment variable access", () => {
      const fixture = {
        "dummy": true
      };
      // Test nested environment variable property access
      const result = fhirpath({}, `%config.database.connectionString.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Environment variable with function chaining", () => {
      const fixture = {
        "tags": [
          "category:health",
          "priority:high",
          "status:active"
        ]
      };
      // Test environment variable with function chaining
      const result = fhirpath({}, `%context.tags.where($this.startsWith('priority')).select($this.substring(9)).first()`, fixture);
      expect(result).toEqual(["high"]);
    });
    it("Environment variable type checking", () => {
      const fixture = {
        "dummy": true
      };
      // Test environment variable type checking
      const result = fhirpath({}, `%config is object and %config.version is string`, fixture);
      expect(result).toEqual([true]);
    });
    it("Environment variable in mathematical expression", () => {
      const fixture = {
        "price": 100,
        "taxRate": 0.2,
        "fixedFee": 3
      };
      // Test environment variable in mathematical calculations
      const result = fhirpath({}, `(price * %taxRate) + %fixedFee`, fixture);
      expect(result).toEqual([23]);
    });
    it("Undefined environment variable", () => {
      const fixture = {
        "dummy": true
      };
      // Test undefined environment variable access
      expect(() => {
        fhirpath({}, `%undefinedVariable`, fixture);
      }).toThrow("Undefined environment variable: %undefinedVariable");
    });
    it("Invalid environment variable syntax", () => {
      const fixture = {
        "dummy": true
      };
      // Test invalid environment variable syntax
      expect(() => {
        fhirpath({}, `%`, fixture);
      }).toThrow("Invalid environment variable syntax");
    });
    it("Environment variable circular reference", () => {
      const fixture = {
        "dummy": true
      };
      // Test environment variable circular reference
      expect(() => {
        fhirpath({}, `%selfRef.value`, fixture);
      }).toThrow("Circular reference in environment variable");
    });
    it("Security context validation", () => {
      const fixture = {
        "userRole": "admin",
        "userId": "admin",
        "sensitiveData": [
          {
            "data": "admin accessible",
            "owner": "admin"
          },
          {
            "data": "user accessible",
            "owner": "user123"
          }
        ]
      };
      // Test security context using environment variables
      const result = fhirpath({}, `sensitiveData.where(%context.userRole = 'admin' or %context.userId = owner)`, fixture);
      expect(result).toEqual([{"data":"admin accessible","owner":"admin"}]);
    });
    it("Localization using environment variables", () => {
      const fixture = {
        "locale": "en",
        "messages": [
          {
            "language": "en",
            "text": "Hello"
          },
          {
            "language": "fr",
            "text": "Bonjour"
          },
          {
            "language": "es",
            "text": "Hola"
          }
        ]
      };
      // Test localization using environment variables
      const result = fhirpath({}, `messages.where(language = %context.locale).text`, fixture);
      expect(result).toEqual(["Hello"]);
    });
    it("Configuration-driven filtering", () => {
      const fixture = {
        "features": [
          {
            "name": "feature1",
            "enabled": true
          },
          {
            "name": "feature2",
            "enabled": true
          },
          {
            "name": "feature3",
            "enabled": false
          }
        ]
      };
      // Test configuration-driven filtering
      const result = fhirpath({}, `features.where(enabled = true and name in %config.enabledFeatures)`, fixture);
      expect(result).toEqual([{"name":"feature1","enabled":true}]);
    });
    it("Time-based filtering with environment", () => {
      const fixture = {
        "events": [
          {
            "name": "Early Meeting",
            "startTime": "@T07:00:00",
            "endTime": "@T08:00:00"
          },
          {
            "name": "Business Meeting",
            "startTime": "@T09:00:00",
            "endTime": "@T10:00:00"
          },
          {
            "name": "Late Meeting",
            "startTime": "@T19:00:00",
            "endTime": "@T20:00:00"
          }
        ]
      };
      // Test time-based filtering using environment variables
      const result = fhirpath({}, `events.where(startTime >= %businessHours.start and endTime <= %businessHours.end)`, fixture);
      expect(result).toEqual([{"name":"Business Meeting","startTime":"@T09:00:00","endTime":"@T10:00:00"}]);
    });
    it("Environment variable caching", () => {
      const fixture = {
        "dummy": true
      };
      // Test environment variable caching behavior
      const result = fhirpath({}, `%expensiveComputation = %expensiveComputation`, fixture);
      expect(result).toEqual([true]);
    });
    it("Large environment variable collection", () => {
      const fixture = {
        "dummy": true
      };
      // Test performance with large environment variable collection
      const result = fhirpath({}, `'target' in %largeCollection`, fixture);
      expect(result).toEqual([true]);
    });
  });
});
