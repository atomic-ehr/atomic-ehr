import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 24-datetime-arithmetic.yaml
// Tests for date/time arithmetic with quantities and durations

describe("DateTime Arithmetic", () => {

  describe("datetime", () => {
    it("Date plus days", () => {
      const fixture = {};
      // Add days to a date
      const result = fhirpath({}, `@2023-01-15 + 10 days`, fixture);
      expect(result).toEqual(["@2023-01-25"]);
    });
  });
  describe("general", () => {
    it("Date minus days", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 - 5 days`, fixture);
      expect(result).toEqual(["@2023-01-10"]);
    });
    it("DateTime plus hours", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:00:00Z + 3 hours`, fixture);
      expect(result).toEqual(["@2023-01-15T13:00:00Z"]);
    });
    it("DateTime minus minutes", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:30:00Z - 45 minutes`, fixture);
      expect(result).toEqual(["@2023-01-15T09:45:00Z"]);
    });
    it("Add years", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 + 2 years`, fixture);
      expect(result).toEqual(["@2025-01-15"]);
    });
    it("Add months", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 + 3 months`, fixture);
      expect(result).toEqual(["@2023-04-15"]);
    });
    it("Add weeks", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 + 2 weeks`, fixture);
      expect(result).toEqual(["@2023-01-29"]);
    });
    it("Add seconds", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:00:00Z + 90 seconds`, fixture);
      expect(result).toEqual(["@2023-01-15T10:01:30Z"]);
    });
    it("Add milliseconds", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:00:00.000Z + 500 milliseconds`, fixture);
      expect(result).toEqual(["@2023-01-15T10:00:00.500Z"]);
    });
    it("Leap year handling", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2024-02-29 + 1 year`, fixture);
      expect(result).toEqual(["@2025-02-28"]);
    });
    it("Month end handling", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-31 + 1 month`, fixture);
      expect(result).toEqual(["@2023-02-28"]);
    });
    it("Cross year boundary", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-12-25 + 10 days`, fixture);
      expect(result).toEqual(["@2024-01-04"]);
    });
    it("DateTime with timezone offset", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:00:00-05:00 + 3 hours`, fixture);
      expect(result).toEqual(["@2023-01-15T13:00:00-05:00"]);
    });
    it("Cross day boundary with timezone", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T22:00:00-05:00 + 5 hours`, fixture);
      expect(result).toEqual(["@2023-01-16T03:00:00-05:00"]);
    });
    it("Date difference in days", () => {
      const fixture = {};
      // Calculate difference between dates
      const result = fhirpath({}, `(@2023-01-20 - @2023-01-15) in days`, fixture);
      expect(result).toEqual([5]);
    });
    it("DateTime difference in hours", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(@2023-01-15T15:00:00Z - @2023-01-15T10:00:00Z) in hours`, fixture);
      expect(result).toEqual([5]);
    });
    it("Date difference in years", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(@2025-06-15 - @2023-06-15) in years`, fixture);
      expect(result).toEqual([2]);
    });
    it("Negative difference", () => {
      const fixture = {};
      
      const result = fhirpath({}, `(@2023-01-10 - @2023-01-15) in days`, fixture);
      expect(result).toEqual([-5]);
    });
    it("Appointment scheduling", () => {
      const fixture = {
        "start": "@2023-01-15T09:00:00Z",
        "duration": 30
      };
      
      const result = fhirpath({}, `start + duration minutes`, fixture);
      expect(result).toEqual(["@2023-01-15T09:30:00Z"]);
    });
    it("Medication schedule", () => {
      const fixture = {
        "startDate": "@2023-01-15T08:00:00Z",
        "doseNumber": 3
      };
      
      const result = fhirpath({}, `startDate + (doseNumber - 1) * 12 hours`, fixture);
      expect(result).toEqual(["@2023-01-16T08:00:00Z"]);
    });
    it("Follow-up calculation", () => {
      const fixture = {
        "discharged": "@2023-01-15",
        "followUpDays": 14
      };
      
      const result = fhirpath({}, `discharged + followUpDays days`, fixture);
      expect(result).toEqual(["@2023-01-29"]);
    });
    it("Add to time only", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@T10:30:00 + 2 hours`, fixture);
      expect(result).toEqual(["@T12:30:00"]);
    });
    it("Daylight saving transition", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-03-12T01:30:00-05:00 + 1 hour`, fixture);
      expect(result).toEqual(["@2023-03-12T02:30:00-05:00"]);
    });
    it("Very large addition", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15 + 10000 days`, fixture);
      expect(result).toEqual(["@2050-06-02"]);
    });
    it("Fractional units", () => {
      const fixture = {};
      
      const result = fhirpath({}, `@2023-01-15T10:00:00Z + 1.5 hours`, fixture);
      expect(result).toEqual(["@2023-01-15T11:30:00Z"]);
    });
    it("Date range check", () => {
      const fixture = {
        "date": "@2023-01-10"
      };
      
      const result = fhirpath({}, `date >= today() - 30 days and date <= today()`, fixture);
      expect(result).toEqual([true]);
    });
    it("Overdue calculation", () => {
      const fixture = {
        "dueDate": "@2023-01-10"
      };
      
      const result = fhirpath({}, `(today() - dueDate) in days > 0`, fixture);
      expect(result).toEqual([true]);
    });
    it("Invalid unit", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `@2023-01-15 + 5 decades`, fixture);
      }).toThrow("Invalid time unit 'decades'");
    });
    it("Incompatible types", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `@2023-01-15 + '5 days'`, fixture);
      }).toThrow("Cannot add string to date");
    });
    it("Time arithmetic on date", () => {
      const fixture = {};
      
      expect(() => {
        fhirpath({}, `@2023-01-15 + 30 seconds`, fixture);
      }).toThrow("Cannot add time units to date without time");
    });
  });
  describe("intermediate", () => {
    it("Multiple operations", () => {
      const fixture = {};
      // Chain multiple date operations
      const result = fhirpath({}, `@2023-01-15 + 1 year - 2 months + 10 days`, fixture);
      expect(result).toEqual(["@2023-11-25"]);
    });
    it("Age calculation", () => {
      const fixture = {
        "birthDate": "@1990-06-15"
      };
      // Calculate age from birthdate
      const result = fhirpath({}, `(today() - birthDate) in years`, fixture);
      expect(result).toEqual([33]);
    });
  });
});
