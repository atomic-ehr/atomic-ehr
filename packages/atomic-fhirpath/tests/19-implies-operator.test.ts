import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 19-implies-operator.yaml
// Tests for the implies logical operator

describe("Implies Operator", () => {

  describe("operators", () => {
    it("implies - true implies true", () => {
      const fixture = {};
      // Basic implies truth table
      const result = fhirpath({}, `true implies true`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("general", () => {
    it("implies - true implies false", () => {
      const fixture = {};
      
      const result = fhirpath({}, `true implies false`, fixture);
      expect(result).toEqual([false]);
    });
    it("implies - false implies true", () => {
      const fixture = {};
      
      const result = fhirpath({}, `false implies true`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - false implies false", () => {
      const fixture = {};
      
      const result = fhirpath({}, `false implies false`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - null handling left", () => {
      const fixture = {};
      // Null on left side of implies
      const result = fhirpath({}, `{} implies true`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - null implies false", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{} implies false`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - true implies null", () => {
      const fixture = {};
      
      const result = fhirpath({}, `true implies {}`, fixture);
      expect(result).toEqual([]);
    });
    it("implies - false implies null", () => {
      const fixture = {};
      
      const result = fhirpath({}, `false implies {}`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - null implies null", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{} implies {}`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - violated condition", () => {
      const fixture = {
        "pregnant": true,
        "gender": "male"
      };
      
      const result = fhirpath({}, `pregnant implies (gender = 'female')`, fixture);
      expect(result).toEqual([false]);
    });
    it("implies - not applicable", () => {
      const fixture = {
        "pregnant": false,
        "gender": "male"
      };
      
      const result = fhirpath({}, `pregnant implies (gender = 'female')`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - chained conditions", () => {
      const fixture = {
        "active": true,
        "status": "active",
        "endDate": "2025-12-31"
      };
      // Multiple implications
      const result = fhirpath({}, `active implies (status = 'active') and (endDate.empty() or endDate > today())`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies - nested implications", () => {
      const fixture = {
        "category": "medication",
        "code": {
          "system": "http://snomed.info/sct",
          "code": "123456"
        }
      };
      
      const result = fhirpath({}, `(category = 'medication') implies (code.exists() implies (code.system = 'http://snomed.info/sct'))`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies with all()", () => {
      const fixture = {
        "item": [
          {
            "critical": true,
            "priority": "high"
          },
          {
            "critical": false,
            "priority": "normal"
          },
          {
            "critical": true,
            "priority": "high"
          }
        ]
      };
      // All elements satisfy implication
      const result = fhirpath({}, `item.all(critical implies priority = 'high')`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies with where()", () => {
      const fixture = {
        "observation": [
          {
            "abnormal": true,
            "interpretation": "High"
          },
          {
            "abnormal": false
          },
          {
            "abnormal": true,
            "interpretation": "Low"
          }
        ]
      };
      
      const result = fhirpath({}, `observation.where(abnormal implies interpretation.exists())`, fixture);
      expect(result).toEqual([{"abnormal":true,"interpretation":"High"},{"abnormal":false},{"abnormal":true,"interpretation":"Low"}]);
    });
    it("Prescription validation", () => {
      const fixture = {
        "controlled": true,
        "prescriber": {
          "dea": "BX1234567"
        },
        "quantity": 30,
        "maxQuantity": 90
      };
      
      const result = fhirpath({}, `controlled implies (prescriber.dea.exists() and quantity <= maxQuantity)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Insurance requirement", () => {
      const fixture = {
        "expensive": true,
        "insurance": [],
        "selfPay": true
      };
      
      const result = fhirpath({}, `expensive implies (insurance.exists() or selfPay = true)`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies precedence with and", () => {
      const fixture = {};
      
      const result = fhirpath({}, `true and false implies false`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies precedence with or", () => {
      const fixture = {};
      
      const result = fhirpath({}, `false or true implies true`, fixture);
      expect(result).toEqual([true]);
    });
    it("implies with comparison", () => {
      const fixture = {
        "value": 150,
        "category": "high"
      };
      
      const result = fhirpath({}, `value > 100 implies category = 'high'`, fixture);
      expect(result).toEqual([true]);
    });
    it("Null-safe implication", () => {
      const fixture = {
        "hasValue": false
      };
      
      const result = fhirpath({}, `hasValue implies value > 0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Existence check pattern", () => {
      const fixture = {
        "code": {
          "code": "123",
          "system": "http://example.com"
        }
      };
      
      const result = fhirpath({}, `code.exists() implies code.system.exists()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Empty collection implies", () => {
      const fixture = {};
      
      const result = fhirpath({}, `{}.exists() implies false`, fixture);
      expect(result).toEqual([true]);
    });
    it("String comparison implies", () => {
      const fixture = {
        "status": "inactive",
        "enabled": false
      };
      
      const result = fhirpath({}, `(status = 'active') implies enabled`, fixture);
      expect(result).toEqual([true]);
    });
    it("Complex null propagation", () => {
      const fixture = {
        "required": true,
        "value": "present"
      };
      
      const result = fhirpath({}, `required implies (value.exists() and value != '')`, fixture);
      expect(result).toEqual([true]);
    });
    it("Multiple implies chain", () => {
      const fixture = {
        "a": true,
        "b": true,
        "c": true
      };
      
      const result = fhirpath({}, `a implies b implies c`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("intermediate", () => {
    it("implies - conditional requirement", () => {
      const fixture = {
        "pregnant": true,
        "gender": "female"
      };
      // If pregnant then female
      const result = fhirpath({}, `pregnant implies (gender = 'female')`, fixture);
      expect(result).toEqual([true]);
    });
  });
  describe("advanced", () => {
    it("Age restriction rule", () => {
      const fixture = {
        "patient": {
          "age": 25
        },
        "service": [
          {
            "name": "Pediatric Care",
            "adultOnly": false
          },
          {
            "name": "Adult Counseling",
            "adultOnly": true
          },
          {
            "name": "General Checkup",
            "adultOnly": false
          }
        ]
      };
      // Adult services require age >= 18
      const result = fhirpath({}, `service.all(adultOnly implies patient.age >= 18)`, fixture);
      expect(result).toEqual([true]);
    });
  });
});
