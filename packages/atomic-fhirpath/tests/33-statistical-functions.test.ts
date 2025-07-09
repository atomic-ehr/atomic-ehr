import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 33-statistical-functions.yaml
// Comprehensive tests for avg(), min(), max() statistical functions

describe("Statistical Functions", () => {

  describe("functions", () => {
    it("avg of integers", () => {
      const fixture = {};
      // Calculate average of integer collection
      const result = fhirpath({}, `(10 | 20 | 30 | 40 | 50).avg()`, fixture);
      expect(result).toEqual([30]);
    });
    it("avg of decimals", () => {
      const fixture = {};
      // Calculate average of decimal numbers
      const result = fhirpath({}, `(1.5 | 2.5 | 3.5).avg()`, fixture);
      expect(result).toEqual([2.5]);
    });
    it("avg with mixed numeric types", () => {
      const fixture = {};
      // Average of integers and decimals
      const result = fhirpath({}, `(10 | 20.5 | 30).avg()`, fixture);
      expect(result).toEqual([20.166666666666668]);
    });
    it("avg of single element", () => {
      const fixture = {};
      // Average of single-element collection
      const result = fhirpath({}, `(42).avg()`, fixture);
      expect(result).toEqual([42]);
    });
    it("avg on empty collection", () => {
      const fixture = {};
      // avg() on empty collection returns empty
      const result = fhirpath({}, `{}.avg()`, fixture);
      expect(result).toEqual([]);
    });
    it("avg with path expression", () => {
      const fixture = {
        "resourceType": "Patient",
        "vitals": [
          {
            "date": "2024-01-01",
            "bloodPressure": {
              "systolic": 120,
              "diastolic": 80
            }
          },
          {
            "date": "2024-01-02",
            "bloodPressure": {
              "systolic": 140,
              "diastolic": 90
            }
          },
          {
            "date": "2024-01-03",
            "bloodPressure": {
              "systolic": 145,
              "diastolic": 95
            }
          }
        ]
      };
      // Calculate average from path navigation
      const result = fhirpath({}, `vitals.bloodPressure.systolic.avg()`, fixture);
      expect(result).toEqual([135]);
    });
    it("min of integers", () => {
      const fixture = {};
      // Find minimum in integer collection
      const result = fhirpath({}, `(30 | 10 | 50 | 20 | 40).min()`, fixture);
      expect(result).toEqual([10]);
    });
    it("min of decimals", () => {
      const fixture = {};
      // Find minimum in decimal collection
      const result = fhirpath({}, `(3.14 | 2.71 | 1.41 | 2.23).min()`, fixture);
      expect(result).toEqual([1.41]);
    });
    it("min with negative numbers", () => {
      const fixture = {};
      // Minimum with negative values
      const result = fhirpath({}, `(5 | -10 | 3 | -2 | 0).min()`, fixture);
      expect(result).toEqual([-10]);
    });
    it("min of strings", () => {
      const fixture = {};
      // Find lexicographic minimum of strings
      const result = fhirpath({}, `('zebra' | 'apple' | 'banana').min()`, fixture);
      expect(result).toEqual(["apple"]);
    });
    it("min of dates", () => {
      const fixture = {};
      // Find earliest date
      const result = fhirpath({}, `(@2024-01-15 | @2024-01-01 | @2024-01-30).min()`, fixture);
      expect(result).toEqual(["2024-01-01"]);
    });
    it("min on empty collection", () => {
      const fixture = {};
      // min() on empty collection returns empty
      const result = fhirpath({}, `{}.min()`, fixture);
      expect(result).toEqual([]);
    });
    it("max of integers", () => {
      const fixture = {};
      // Find maximum in integer collection
      const result = fhirpath({}, `(30 | 10 | 50 | 20 | 40).max()`, fixture);
      expect(result).toEqual([50]);
    });
    it("max of decimals", () => {
      const fixture = {};
      // Find maximum in decimal collection
      const result = fhirpath({}, `(3.14 | 2.71 | 1.41 | 2.23).max()`, fixture);
      expect(result).toEqual([3.14]);
    });
    it("max with negative numbers", () => {
      const fixture = {};
      // Maximum with negative values
      const result = fhirpath({}, `(-5 | -10 | -3 | -2 | -20).max()`, fixture);
      expect(result).toEqual([-2]);
    });
    it("max of strings", () => {
      const fixture = {};
      // Find lexicographic maximum of strings
      const result = fhirpath({}, `('zebra' | 'apple' | 'banana').max()`, fixture);
      expect(result).toEqual(["zebra"]);
    });
    it("max of datetimes", () => {
      const fixture = {};
      // Find latest datetime
      const result = fhirpath({}, `(@2024-01-15T10:00:00 | @2024-01-15T14:30:00 | @2024-01-15T08:00:00).max()`, fixture);
      expect(result).toEqual(["2024-01-15T14:30:00"]);
    });
    it("Combined statistical analysis", () => {
      const fixture = {
        "resourceType": "Observation",
        "measurements": [
          {
            "timestamp": "2024-01-01T08:00:00",
            "value": 100
          },
          {
            "timestamp": "2024-01-01T12:00:00",
            "value": 110
          },
          {
            "timestamp": "2024-01-01T16:00:00",
            "value": 120
          },
          {
            "timestamp": "2024-01-01T20:00:00",
            "value": 130
          },
          {
            "timestamp": "2024-01-02T08:00:00",
            "value": 90
          }
        ]
      };
      // Using multiple statistical functions together
      const result = fhirpath({}, `(measurements.value.min() | measurements.value.avg() | measurements.value.max())`, fixture);
      expect(result).toEqual([90,110,130]);
    });
    it("Statistical range calculation", () => {
      const fixture = {
        "resourceType": "TestResult",
        "scores": [
          85,
          92,
          78,
          95,
          88,
          75,
          91,
          87,
          93,
          90
        ]
      };
      // Calculate range using max and min
      const result = fhirpath({}, `scores.max() - scores.min()`, fixture);
      expect(result).toEqual([45]);
    });
    it("Filtered statistics", () => {
      const fixture = {
        "resourceType": "DiagnosticReport",
        "labResults": [
          {
            "test": "Glucose",
            "value": 105
          },
          {
            "test": "Cholesterol",
            "value": 180
          },
          {
            "test": "Glucose",
            "value": 115
          },
          {
            "test": "HbA1c",
            "value": 6.5
          },
          {
            "test": "Glucose",
            "value": 110
          }
        ]
      };
      // Statistics on filtered subset
      const result = fhirpath({}, `labResults.where(test = 'Glucose').value.avg()`, fixture);
      expect(result).toEqual([110]);
    });
    it("Blood pressure trending", () => {
      const fixture = {
        "resourceType": "BloodPressureLog",
        "readings": [
          {
            "systolic": 128,
            "diastolic": 82
          },
          {
            "systolic": 135,
            "diastolic": 88
          },
          {
            "systolic": 142,
            "diastolic": 92
          },
          {
            "systolic": 130,
            "diastolic": 85
          }
        ]
      };
      // Analyze blood pressure trends
      const result = fhirpath({}, `(readings.systolic.avg() > 130) or (readings.diastolic.avg() > 80)`, fixture);
      expect(result).toEqual([true]);
    });
    it("Temperature range monitoring", () => {
      const fixture = {
        "resourceType": "VitalSigns",
        "temperatures": [
          {
            "celsius": 36.5,
            "time": "08:00"
          },
          {
            "celsius": 37.1,
            "time": "12:00"
          },
          {
            "celsius": 37.8,
            "time": "16:00"
          },
          {
            "celsius": 37.3,
            "time": "20:00"
          }
        ]
      };
      // Check if temperature stays within normal range
      const result = fhirpath({}, `temperatures.celsius.min() >= 36.1 and temperatures.celsius.max() <= 37.2`, fixture);
      expect(result).toEqual([false]);
    });
    it("Lab result outlier detection", () => {
      const fixture = {
        "resourceType": "LabPanel",
        "values": [
          95,
          98,
          102,
          97,
          150,
          100,
          99,
          45,
          101,
          96
        ]
      };
      // Identify potential outliers in lab results
      const result = fhirpath({}, `values.where($ > values.avg() + 20 or $ < values.avg() - 20)`, fixture);
      expect(result).toEqual([150,45]);
    });
    it("avg with quantities", () => {
      const fixture = {};
      // Average of quantities with same unit
      const result = fhirpath({}, `(10 'mg' | 20 'mg' | 30 'mg').avg()`, fixture);
      expect(result).toEqual([{"value":20,"unit":"mg"}]);
    });
    it("min/max with quantities", () => {
      const fixture = {};
      // Min/max of quantities
      const result = fhirpath({}, `(5.5 'kg' | 3.2 'kg' | 7.8 'kg').min()`, fixture);
      expect(result).toEqual([{"value":3.2,"unit":"kg"}]);
    });
    it("avg on non-numeric collection", () => {
      const fixture = {};
      // avg() on non-numeric values
      expect(() => {
        fhirpath({}, `('a' | 'b' | 'c').avg()`, fixture);
      }).toThrow("avg() requires numeric values");
    });
    it("statistical functions on mixed types", () => {
      const fixture = {};
      // Statistics on incompatible types
      expect(() => {
        fhirpath({}, `(10 | 'string' | @2024-01-01).max()`, fixture);
      }).toThrow("Statistical functions require compatible types");
    });
    it("avg with incompatible quantities", () => {
      const fixture = {};
      // Average of quantities with different units
      expect(() => {
        fhirpath({}, `(10 'mg' | 5 'kg' | 15 'mg').avg()`, fixture);
      }).toThrow("Cannot calculate average of quantities with different units");
    });
  });
});
