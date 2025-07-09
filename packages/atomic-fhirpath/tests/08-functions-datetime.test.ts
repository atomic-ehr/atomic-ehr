import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from 08-functions-datetime.yaml
// Tests for FHIRPath date/time functions including now(), today(), and timeOfDay()

describe("Date/Time Functions", () => {

  describe("functions", () => {
    it("now() returns current datetime", () => {
      const fixture = {
        "dummy": true
      };
      // Test now() function returns current datetime
      const result = fhirpath({}, `now().type().name`, fixture);
      expect(result).toEqual(["DateTime"]);
    });
    it("now() in comparison", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test now() function in date comparison
      const result = fhirpath({}, `birthDate < now()`, fixture);
      expect(result).toEqual([true]);
    });
    it("now() consistency within expression", () => {
      const fixture = {
        "dummy": true
      };
      // Test now() returns same value within single expression
      const result = fhirpath({}, `now() = now()`, fixture);
      expect(result).toEqual([true]);
    });
    it("now() with time arithmetic", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test now() function with time arithmetic
      const result = fhirpath({}, `(now() - birthDate).value > 25 'years'`, fixture);
      expect(result).toEqual([true]);
    });
    it("today() returns current date", () => {
      const fixture = {
        "dummy": true
      };
      // Test today() function returns current date
      const result = fhirpath({}, `today().type().name`, fixture);
      expect(result).toEqual(["Date"]);
    });
    it("today() in comparison", () => {
      const fixture = {
        "birthDate": "@1990-01-01"
      };
      // Test today() function in date comparison
      const result = fhirpath({}, `birthDate < today()`, fixture);
      expect(result).toEqual([true]);
    });
    it("today() consistency within expression", () => {
      const fixture = {
        "dummy": true
      };
      // Test today() returns same value within single expression
      const result = fhirpath({}, `today() = today()`, fixture);
      expect(result).toEqual([true]);
    });
    it("today() vs specific date", () => {
      const fixture = {
        "dummy": true
      };
      // Test today() comparison with specific date
      const result = fhirpath({}, `today() >= @2020-01-01`, fixture);
      expect(result).toEqual([true]);
    });
    it("timeOfDay() returns current time", () => {
      const fixture = {
        "dummy": true
      };
      // Test timeOfDay() function returns current time
      const result = fhirpath({}, `timeOfDay().type().name`, fixture);
      expect(result).toEqual(["Time"]);
    });
    it("timeOfDay() consistency within expression", () => {
      const fixture = {
        "dummy": true
      };
      // Test timeOfDay() returns same value within single expression
      const result = fhirpath({}, `timeOfDay() = timeOfDay()`, fixture);
      expect(result).toEqual([true]);
    });
    it("timeOfDay() comparison", () => {
      const fixture = {
        "dummy": true
      };
      // Test timeOfDay() in time comparison
      const result = fhirpath({}, `timeOfDay() >= @T00:00:00`, fixture);
      expect(result).toEqual([true]);
    });
    it("timeOfDay() business hours check", () => {
      const fixture = {
        "dummy": true
      };
      // Test timeOfDay() for business hours check
      const result = fhirpath({}, `timeOfDay() >= @T09:00:00 and timeOfDay() <= @T17:00:00`, fixture);
      expect(result).toEqual([true,false]);
    });
    it("DateTime comparison with timezone", () => {
      const fixture = {
        "dummy": true
      };
      // Test datetime comparison handling timezones
      const result = fhirpath({}, `@2019-02-03T01:00Z = @2019-02-02T21:00-04:00`, fixture);
      expect(result).toEqual([true]);
    });
    it("DateTime inequality with timezone", () => {
      const fixture = {
        "dummy": true
      };
      // Test datetime inequality with different timezones
      const result = fhirpath({}, `@2019-02-03T02:00Z = @2019-02-02T21:00-04:00`, fixture);
      expect(result).toEqual([false]);
    });
    it("Date arithmetic with age calculation", () => {
      const fixture = {
        "birthDate": "@1990-06-15"
      };
      // Test date arithmetic for age calculation
      const result = fhirpath({}, `(today() - birthDate).value.div(365.25).floor()`, fixture);
      expect(result).toEqual([33]);
    });
    it("Date range checking", () => {
      const fixture = {
        "effectiveDate": "@2020-06-15"
      };
      // Test date range checking
      const result = fhirpath({}, `effectiveDate >= @2020-01-01 and effectiveDate <= @2020-12-31`, fixture);
      expect(result).toEqual([true]);
    });
    it("Date functions on collections", () => {
      const fixture = {
        "appointments": [
          {
            "date": "@2020-06-15",
            "type": "consultation"
          },
          {
            "date": "@2025-12-01",
            "type": "checkup"
          }
        ]
      };
      // Test date functions applied to collections
      const result = fhirpath({}, `appointments.where(date >= today())`, fixture);
      expect(result).toEqual([{"date":"@2025-12-01","type":"checkup"}]);
    });
    it("Latest date selection", () => {
      const fixture = {
        "dates": [
          "@2022-01-01",
          "@2023-12-25",
          "@2021-06-15"
        ]
      };
      // Test selecting latest date from collection
      const result = fhirpath({}, `dates.select($this).where($this = dates.max())`, fixture);
      expect(result).toEqual(["@2023-12-25"]);
    });
    it("Date sorting and filtering", () => {
      const fixture = {
        "events": [
          {
            "date": "@2020-01-01",
            "type": "start"
          },
          {
            "date": "@2020-01-01",
            "type": "duplicate"
          },
          {
            "date": "@2021-06-15",
            "type": "milestone"
          },
          {
            "date": "@2030-01-01",
            "type": "future"
          }
        ]
      };
      // Test date sorting and filtering
      const result = fhirpath({}, `events.where(date < today()).select(date).distinct().count()`, fixture);
      expect(result).toEqual([2]);
    });
    it("Date precision comparison", () => {
      const fixture = {
        "dummy": true
      };
      // Test date precision in comparisons
      const result = fhirpath({}, `@2020-01 <= @2020-01-15`, fixture);
      expect(result).toEqual([true]);
    });
    it("DateTime precision comparison", () => {
      const fixture = {
        "dummy": true
      };
      // Test datetime precision in comparisons
      const result = fhirpath({}, `@2020-01-01T10:30 >= @2020-01-01T10:30:00`, fixture);
      expect(result).toEqual([true]);
    });
    it("Time precision comparison", () => {
      const fixture = {
        "dummy": true
      };
      // Test time precision in comparisons
      const result = fhirpath({}, `@T10:30 = @T10:30:00`, fixture);
      expect(result).toEqual([true]);
    });
    it("Appointment scheduling", () => {
      const fixture = {
        "appointments": [
          {
            "dateTime": "@2025-07-05T09:00:00",
            "provider": "Dr. Jones"
          },
          {
            "dateTime": "@2025-07-10T14:00:00",
            "provider": "Dr. Smith"
          },
          {
            "dateTime": "@2025-07-20T16:00:00",
            "provider": "Dr. Brown"
          }
        ]
      };
      // Test appointment scheduling logic
      const result = fhirpath({}, `appointments.where(dateTime > now() and dateTime < (now() + 7 'days'))`, fixture);
      expect(result).toEqual([{"dateTime":"@2025-07-10T14:00:00","provider":"Dr. Smith"}]);
    });
    it("Medication expiry check", () => {
      const fixture = {
        "medications": [
          {
            "name": "Aspirin",
            "expiryDate": "@2025-07-15"
          },
          {
            "name": "Vitamin D",
            "expiryDate": "@2026-01-01"
          }
        ]
      };
      // Test medication expiry date checking
      const result = fhirpath({}, `medications.where(expiryDate <= today() + 30 'days').name`, fixture);
      expect(result).toEqual(["Aspirin"]);
    });
    it("Age-based medication dosing", () => {
      const fixture = {
        "birthDate": "@1990-01-01",
        "adultDose": "500mg",
        "pediatricDose": "250mg"
      };
      // Test age-based medication dosing calculation
      const result = fhirpath({}, `iif((today() - birthDate).value.div(365.25) >= 18, adultDose, pediatricDose)`, fixture);
      expect(result).toEqual(["500mg"]);
    });
    it("Working hours validation", () => {
      const fixture = {
        "appointments": [
          {
            "dateTime": "@2025-07-08T09:00:00"
          },
          {
            "dateTime": "@2025-07-08T14:30:00"
          },
          {
            "dateTime": "@2025-07-08T19:00:00"
          }
        ]
      };
      // Test working hours validation
      const result = fhirpath({}, `appointments.all(timeOfDay() >= @T08:00:00 and timeOfDay() <= @T18:00:00)`, fixture);
      expect(result).toEqual([false]);
    });
    it("Environment variable now comparison", () => {
      const fixture = {
        "lastUpdated": "@2020-01-01"
      };
      // Test comparison with %now environment variable
      const result = fhirpath({}, `lastUpdated < %now`, fixture);
      expect(result).toEqual([true]);
    });
    it("Invalid date format handling", () => {
      const fixture = {
        "dummy": true
      };
      // Test handling of invalid date format
      expect(() => {
        fhirpath({}, `@invalid-date`, fixture);
      }).toThrow("Invalid date format");
    });
    it("Date arithmetic overflow", () => {
      const fixture = {
        "dummy": true
      };
      // Test date arithmetic overflow handling
      expect(() => {
        fhirpath({}, `@9999-12-31 + 1 'year'`, fixture);
      }).toThrow("Date arithmetic overflow");
    });
    it("Time zone conversion", () => {
      const fixture = {
        "dummy": true
      };
      // Test time zone conversion scenarios
      const result = fhirpath({}, `@2020-01-01T00:00:00-05:00 = @2020-01-01T05:00:00Z`, fixture);
      expect(result).toEqual([true]);
    });
    it("Multi-condition date filtering", () => {
      const fixture = {
        "events": [
          {
            "name": "Past Event",
            "startDate": "@2020-01-01",
            "endDate": "@2020-12-31"
          },
          {
            "name": "Current Event",
            "startDate": "@2024-01-01"
          },
          {
            "name": "Future Event",
            "startDate": "@2026-01-01",
            "endDate": "@2026-12-31"
          }
        ]
      };
      // Test complex multi-condition date filtering
      const result = fhirpath({}, `events.where((startDate <= today()) and (endDate.empty() or endDate >= today()))`, fixture);
      expect(result).toEqual([{"name":"Current Event","startDate":"@2024-01-01"}]);
    });
  });
});
