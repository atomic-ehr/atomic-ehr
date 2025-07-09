import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 13-type-system.yaml
// Tests for FHIRPath type system including is, as, type(), ofType(), and type conversion functions

describe("Type System", () => {

  describe("type", () => {
    it("is operator with matching type", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test is operator with matching type
      const result = fhirpath({}, `name is string`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with non-matching type", () => {
      const fixture = {
        "age": 30
      };
      // Test is operator with non-matching type
      const result = fhirpath({}, `age is string`, fixture);
      expect(result).toEqual([false]);
    });
    it("is operator with integer type", () => {
      const fixture = {
        "age": 30
      };
      // Test is operator with integer type
      const result = fhirpath({}, `age is integer`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with decimal type", () => {
      const fixture = {
        "weight": 70.5
      };
      // Test is operator with decimal type
      const result = fhirpath({}, `weight is decimal`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with boolean type", () => {
      const fixture = {
        "active": true
      };
      // Test is operator with boolean type
      const result = fhirpath({}, `active is boolean`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with date type", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test is operator with date type
      const result = fhirpath({}, `birthDate is date`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with datetime type", () => {
      const fixture = {
        "timestamp": "@2023-01-01T10:30:00Z"
      };
      // Test is operator with datetime type
      const result = fhirpath({}, `timestamp is dateTime`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with quantity type", () => {
      const fixture = {
        "dosage": "5 'mg'"
      };
      // Test is operator with quantity type
      const result = fhirpath({}, `dosage is Quantity`, fixture);
      expect(result).toEqual([true]);
    });
    it("is operator with collection", () => {
      const fixture = {
        "names": [
          "John",
          42,
          "Jane"
        ]
      };
      // Test is operator applied to collection
      const result = fhirpath({}, `names is string`, fixture);
      expect(result).toEqual([true,false,true]);
    });
    it("is operator with complex type", () => {
      const fixture = {
        "name": {
          "given": [
            "John"
          ],
          "family": "Doe",
          "use": "official"
        }
      };
      // Test is operator with complex FHIR type
      const result = fhirpath({}, `name is HumanName`, fixture);
      expect(result).toEqual([true]);
    });
    it("as operator with compatible type", () => {
      const fixture = {
        "numericString": "42"
      };
      // Test as operator with compatible type conversion
      const result = fhirpath({}, `numericString as integer`, fixture);
      expect(result).toEqual([42]);
    });
    it("as operator with incompatible type", () => {
      const fixture = {
        "textString": "not a number"
      };
      // Test as operator with incompatible type conversion
      const result = fhirpath({}, `textString as integer`, fixture);
      expect(result).toEqual([]);
    });
    it("as operator decimal to integer", () => {
      const fixture = {
        "weight": 70.8
      };
      // Test as operator converting decimal to integer
      const result = fhirpath({}, `weight as integer`, fixture);
      expect(result).toEqual([70]);
    });
    it("as operator with collection", () => {
      const fixture = {
        "values": [
          "1",
          "not a number",
          "3"
        ]
      };
      // Test as operator applied to collection
      const result = fhirpath({}, `values as integer`, fixture);
      expect(result).toEqual([1,3]);
    });
    it("as operator with complex type", () => {
      const fixture = {
        "polymorphicValue": "5 'mg'"
      };
      // Test as operator with complex type casting
      const result = fhirpath({}, `polymorphicValue as Quantity`, fixture);
      expect(result).toEqual(["5 'mg'"]);
    });
    it("type() function with string", () => {
      const fixture = {
        "name": "John Doe"
      };
      // Test type() function with string value
      const result = fhirpath({}, `name.type()`, fixture);
      expect(result).toEqual([{"name":"string","namespace":"System"}]);
    });
    it("type() function with integer", () => {
      const fixture = {
        "age": 30
      };
      // Test type() function with integer value
      const result = fhirpath({}, `age.type()`, fixture);
      expect(result).toEqual([{"name":"integer","namespace":"System"}]);
    });
    it("type() function with decimal", () => {
      const fixture = {
        "weight": 70.5
      };
      // Test type() function with decimal value
      const result = fhirpath({}, `weight.type()`, fixture);
      expect(result).toEqual([{"name":"decimal","namespace":"System"}]);
    });
    it("type() function with boolean", () => {
      const fixture = {
        "active": true
      };
      // Test type() function with boolean value
      const result = fhirpath({}, `active.type()`, fixture);
      expect(result).toEqual([{"name":"boolean","namespace":"System"}]);
    });
    it("type() function with date", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test type() function with date value
      const result = fhirpath({}, `birthDate.type()`, fixture);
      expect(result).toEqual([{"name":"date","namespace":"System"}]);
    });
    it("type() function with collection", () => {
      const fixture = {
        "values": [
          "text",
          42
        ]
      };
      // Test type() function with collection
      const result = fhirpath({}, `values.type()`, fixture);
      expect(result).toEqual([{"name":"string","namespace":"System"},{"name":"integer","namespace":"System"}]);
    });
    it("type() function with FHIR type", () => {
      const fixture = {
        "patient": {
          "resourceType": "Patient",
          "name": {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        }
      };
      // Test type() function with FHIR resource type
      const result = fhirpath({}, `patient.type()`, fixture);
      expect(result).toEqual([{"name":"Patient","namespace":"FHIR"}]);
    });
    it("ofType() with matching type", () => {
      const fixture = {
        "values": [
          "John",
          42,
          "Jane",
          true
        ]
      };
      // Test ofType() function with matching type
      const result = fhirpath({}, `values.ofType(string)`, fixture);
      expect(result).toEqual(["John","Jane"]);
    });
    it("ofType() with no matches", () => {
      const fixture = {
        "values": [
          "John",
          42,
          "Jane",
          true
        ]
      };
      // Test ofType() function with no matching types
      const result = fhirpath({}, `values.ofType(date)`, fixture);
      expect(result).toEqual([]);
    });
    it("ofType() with integer type", () => {
      const fixture = {
        "values": [
          "John",
          42,
          "Jane",
          100,
          true
        ]
      };
      // Test ofType() function filtering integers
      const result = fhirpath({}, `values.ofType(integer)`, fixture);
      expect(result).toEqual([42,100]);
    });
    it("ofType() with FHIR type", () => {
      const fixture = {
        "resources": [
          {
            "resourceType": "Patient",
            "name": "John"
          },
          {
            "resourceType": "Observation",
            "value": 120
          },
          {
            "resourceType": "Patient",
            "name": "Jane"
          }
        ]
      };
      // Test ofType() function with FHIR resource type
      const result = fhirpath({}, `resources.ofType(Patient)`, fixture);
      expect(result).toEqual([{"resourceType":"Patient","name":"John"}]);
    });
    it("toInteger() conversion", () => {
      const fixture = {
        "stringValue": "42"
      };
      // Test toInteger() type conversion function
      const result = fhirpath({}, `stringValue.toInteger()`, fixture);
      expect(result).toEqual([42]);
    });
    it("toInteger() with invalid string", () => {
      const fixture = {
        "invalidString": "not a number"
      };
      // Test toInteger() with invalid string
      const result = fhirpath({}, `invalidString.toInteger()`, fixture);
      expect(result).toEqual([]);
    });
    it("toDecimal() conversion", () => {
      const fixture = {
        "stringValue": "3.14"
      };
      // Test toDecimal() type conversion function
      const result = fhirpath({}, `stringValue.toDecimal()`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("toString() conversion", () => {
      const fixture = {
        "numericValue": 42
      };
      // Test toString() type conversion function
      const result = fhirpath({}, `numericValue.toString()`, fixture);
      expect(result).toEqual(["42"]);
    });
    it("toBoolean() conversion", () => {
      const fixture = {
        "stringValue": "true"
      };
      // Test toBoolean() type conversion function
      const result = fhirpath({}, `stringValue.toBoolean()`, fixture);
      expect(result).toEqual([true]);
    });
    it("toDate() conversion", () => {
      const fixture = {
        "stringValue": "1990-01-01"
      };
      // Test toDate() type conversion function
      const result = fhirpath({}, `stringValue.toDate()`, fixture);
      expect(result).toEqual(["@1990-01-01"]);
    });
    it("toDateTime() conversion", () => {
      const fixture = {
        "stringValue": "2023-01-01T10:30:00Z"
      };
      // Test toDateTime() type conversion function
      const result = fhirpath({}, `stringValue.toDateTime()`, fixture);
      expect(result).toEqual(["@2023-01-01T10:30:00Z"]);
    });
    it("convertsToInteger() check", () => {
      const fixture = {
        "values": [
          "42",
          "not a number",
          "100"
        ]
      };
      // Test convertsToInteger() check function
      const result = fhirpath({}, `values.convertsToInteger()`, fixture);
      expect(result).toEqual([true,false,true]);
    });
    it("convertsToDecimal() check", () => {
      const fixture = {
        "values": [
          "3.14",
          "not a number",
          "2.71"
        ]
      };
      // Test convertsToDecimal() check function
      const result = fhirpath({}, `values.convertsToDecimal()`, fixture);
      expect(result).toEqual([true,false,true]);
    });
    it("convertsToString() check", () => {
      const fixture = {
        "values": [
          42,
          true,
          "text"
        ]
      };
      // Test convertsToString() check function
      const result = fhirpath({}, `values.convertsToString()`, fixture);
      expect(result).toEqual([true,true,true]);
    });
    it("convertsToBoolean() check", () => {
      const fixture = {
        "values": [
          "true",
          "maybe",
          "false"
        ]
      };
      // Test convertsToBoolean() check function
      const result = fhirpath({}, `values.convertsToBoolean()`, fixture);
      expect(result).toEqual([true,false,true]);
    });
    it("Polymorphic type handling", () => {
      const fixture = {
        "value": "5 'mg'"
      };
      // Test polymorphic type handling with is operator
      const result = fhirpath({}, `value is Quantity or value is string`, fixture);
      expect(result).toEqual([true]);
    });
    it("Type-based filtering", () => {
      const fixture = {
        "mixedValues": [
          42,
          "text",
          100,
          true
        ]
      };
      // Test filtering based on type checks
      const result = fhirpath({}, `mixedValues.where($this is integer).sum()`, fixture);
      expect(result).toEqual([142]);
    });
    it("Type conversion in expressions", () => {
      const fixture = {
        "stringNumbers": [
          "50",
          "not a number",
          "100",
          "invalid"
        ]
      };
      // Test type conversion within complex expressions
      const result = fhirpath({}, `stringNumbers.where(convertsToInteger()).select(toInteger()).sum()`, fixture);
      expect(result).toEqual([150]);
    });
    it("Nested type operations", () => {
      const fixture = {
        "data": [
          {
            "name": "item1",
            "value": 100
          },
          {
            "name": "item2",
            "value": "text"
          },
          {
            "name": "item3",
            "value": 75
          },
          {
            "name": "item4",
            "value": 25
          }
        ]
      };
      // Test nested type operations
      const result = fhirpath({}, `data.where(value is integer).select(value as integer).where($this > 50)`, fixture);
      expect(result).toEqual([100,75]);
    });
    it("FHIR resource type checking", () => {
      const fixture = {
        "Bundle": {
          "entry": [
            {
              "resource": {
                "resourceType": "Patient",
                "name": "John"
              }
            },
            {
              "resource": {
                "resourceType": "Observation",
                "value": 120
              }
            },
            {
              "resource": {
                "resourceType": "Patient",
                "name": "Jane"
              }
            }
          ]
        }
      };
      // Test FHIR resource type checking
      const result = fhirpath({}, `Bundle.entry.resource.where($this is Patient).count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("Extension type handling", () => {
      const fixture = {
        "Patient": {
          "name": "John Doe",
          "extension": [
            {
              "url": "http://example.org/fhir/extension",
              "valueString": "test value"
            }
          ]
        }
      };
      // Test extension type handling
      const result = fhirpath({}, `Patient.extension.where(url = 'http://example.org/fhir/extension').value is string`, fixture);
      expect(result).toEqual([true]);
    });
    it("Invalid type in is operator", () => {
      const fixture = {
        "value": "test"
      };
      // Test invalid type in is operator
      expect(() => {
        fhirpath({}, `value is NonExistentType`, fixture);
      }).toThrow("Unknown type: NonExistentType");
    });
    it("Type conversion overflow", () => {
      const fixture = {
        "largeString": "999999999999999999999999999999"
      };
      // Test type conversion overflow scenario
      expect(() => {
        fhirpath({}, `largeString.toInteger()`, fixture);
      }).toThrow("Integer overflow in type conversion");
    });
    it("Circular type reference", () => {
      const fixture = {
        "circularRef": {
          "self": {
            "nested": {
              "value": "test"
            }
          }
        }
      };
      // Test handling of circular type references
      expect(() => {
        fhirpath({}, `circularRef is ComplexType`, fixture);
      }).toThrow("Circular type reference detected");
    });
  });
});
