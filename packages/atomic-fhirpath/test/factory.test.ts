import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";
import subject from "./factory.json" with { type: "json" };

// Test file generated from factory.yaml

describe("factory", () => {
  const ctx = {};

  describe("Type Factory API (%factory)", () => {

    describe("primitives", () => {

      it("** create a base64Binary without an extension - %factory.base64Binary('ZHNmZHNm').where($this is base64Binary) .decode('base64')", () => {
            const result = fhirpath(ctx, `%factory.base64Binary('ZHNmZHNm').where($this is base64Binary) .decode('base64')`, subject);
            expect(result).toEqual(["dsfdsf"]);
      });
      it("** create a base64Binary with an extension - %factory.base64Binary('ZHNmZHNm', %factory.Extension('someExt', 'someString')).extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.base64Binary('ZHNmZHNm', %factory.Extension('someExt', 'someString')).extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a base64Binary may throw an exception - %factory.base64Binary('dsfdsf')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.base64Binary('dsfdsf')`, subject);
            }).toThrow();
      });
      it("** create a boolean without an extension - %factory.boolean(true).where($this is boolean)", () => {
            const result = fhirpath(ctx, `%factory.boolean(true).where($this is boolean)`, subject);
            expect(result).toEqual([true]);
      });
      it("** create a boolean with an extension - %factory.boolean('false', %factory.Extension('someExt', 'someString')).where($this is boolean and $this = false) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.boolean('false', %factory.Extension('someExt', 'someString')).where($this is boolean and $this = false) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a boolean may throw an exception - %factory.boolean('dsfdsf')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.boolean('dsfdsf')`, subject);
            }).toThrow();
      });
      it("** create a canonical without an extension - %factory.canonical('someUrl').where($this is canonical)", () => {
            const result = fhirpath(ctx, `%factory.canonical('someUrl').where($this is canonical)`, subject);
            expect(result).toEqual(["someUrl"]);
      });
      it("** create a canonical with an extension - %factory.canonical('someUrl', %factory.Extension('someExt', 'someString')).where($this is canonical and $this = 'someUrl') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.canonical('someUrl', %factory.Extension('someExt', 'someString')).where($this is canonical and $this = 'someUrl') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a canonical may throw an exception - %factory.canonical('some Url')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.canonical('some Url')`, subject);
            }).toThrow();
      });
      it("** create a code without an extension - %factory.code('some code').where($this is code)", () => {
            const result = fhirpath(ctx, `%factory.code('some code').where($this is code)`, subject);
            expect(result).toEqual(["some code"]);
      });
      it("** create a code with an extension - %factory.code('some code', %factory.Extension('someExt', 'someString')).where($this is code and $this = 'some code') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.code('some code', %factory.Extension('someExt', 'someString')).where($this is code and $this = 'some code') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a code may throw an exception - %factory.code('some code ')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.code('some code ')`, subject);
            }).toThrow();
      });
      it("** create a date without an extension - %factory.date('2024-01-01').where($this is date) = @2024-01-01", () => {
            const result = fhirpath(ctx, `%factory.date('2024-01-01').where($this is date) = @2024-01-01`, subject);
            expect(result).toEqual([true]);
      });
      it("** create a date with an extension - %factory.date('2024-01-01', %factory.Extension('someExt', 'someString')).where($this is date and $this = @2024-01-01) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.date('2024-01-01', %factory.Extension('someExt', 'someString')).where($this is date and $this = @2024-01-01) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a date may throw an exception - %factory.date('something')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.date('something')`, subject);
            }).toThrow();
      });
      it("** create a dateTime without an extension - %factory.dateTime('2024-01-01T01:01:01').where($this is dateTime) = @2024-01-01T01:01:01", () => {
            const result = fhirpath(ctx, `%factory.dateTime('2024-01-01T01:01:01').where($this is dateTime) = @2024-01-01T01:01:01`, subject);
            expect(result).toEqual([true]);
      });
      it("** create a dateTime with an extension - %factory.dateTime('2024-01-01T01:01:01', %factory.Extension('someExt', 'someString')).where($this is dateTime and $this = @2024-01-01T01:01:01) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.dateTime('2024-01-01T01:01:01', %factory.Extension('someExt', 'someString')).where($this is dateTime and $this = @2024-01-01T01:01:01) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a dateTime may throw an exception - %factory.dateTime('something')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.dateTime('something')`, subject);
            }).toThrow();
      });
      it("** create a decimal without an extension - %factory.decimal(1.1).where($this is decimal)", () => {
            const result = fhirpath(ctx, `%factory.decimal(1.1).where($this is decimal)`, subject);
            expect(result).toEqual([1.1]);
      });
      it("** create a decimal with an extension - %factory.decimal('1.1', %factory.Extension('someExt', 'someString')) .where($this is decimal and $this = 1.1).extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.decimal('1.1', %factory.Extension('someExt', 'someString')) .where($this is decimal and $this = 1.1).extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a decimal may throw an exception - %factory.decimal('sdfds')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.decimal('sdfds')`, subject);
            }).toThrow();
      });
      it("** create an id without an extension - %factory.id('someId-123').where($this is id) = 'someId-123'", () => {
            const result = fhirpath(ctx, `%factory.id('someId-123').where($this is id) = 'someId-123'`, subject);
            expect(result).toEqual([true]);
      });
      it("** create an id with an extension - %factory.id('someId-123', %factory.Extension('someExt', 'someString')).where($this is id and $this = 'someId-123') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.id('someId-123', %factory.Extension('someExt', 'someString')).where($this is id and $this = 'someId-123') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an id may throw an exception - %factory.id('someId 123')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.id('someId 123')`, subject);
            }).toThrow();
      });
      it("** create an instant without an extension - %factory.instant('2024-01-01T01:01:01+01:00').where($this is instant) = @2024-01-01T01:01:01+01:00", () => {
            const result = fhirpath(ctx, `%factory.instant('2024-01-01T01:01:01+01:00').where($this is instant) = @2024-01-01T01:01:01+01:00`, subject);
            expect(result).toEqual([true]);
      });
      it("** create an instant with an extension - %factory.instant('2024-01-01T01:01:01+01:00', %factory.Extension('someExt', 'someString')).where($this is instant and $this = @2024-01-01T01:01:01+01:00) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.instant('2024-01-01T01:01:01+01:00', %factory.Extension('someExt', 'someString')).where($this is instant and $this = @2024-01-01T01:01:01+01:00) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an instant may throw an exception - %factory.instant('something')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.instant('something')`, subject);
            }).toThrow();
      });
      it("** create an integer without an extension - %factory.integer(134).where($this is integer)", () => {
            const result = fhirpath(ctx, `%factory.integer(134).where($this is integer)`, subject);
            expect(result).toEqual([134]);
      });
      it("** create an integer with an extension - %factory.integer(-134, %factory.Extension('someExt', 'someString')) .where($this is integer and $this = -134) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.integer(-134, %factory.Extension('someExt', 'someString')) .where($this is integer and $this = -134) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an integer may throw an exception - %factory.integer(1.1)", () => {
            expect(() => {
              fhirpath(ctx, `%factory.integer(1.1)`, subject);
            }).toThrow();
      });
      it("** create an integer64 without an extension - %factory.integer64(134).where($this is integer64)", () => {
            const result = fhirpath(ctx, `%factory.integer64(134).where($this is integer64)`, subject);
            expect(result).toEqual(["134"]);
      });
      it("** create an integer64 with an extension - %factory.integer64(134, %factory.Extension('someExt', 'someString')) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.integer64(134, %factory.Extension('someExt', 'someString')) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an integer64 may throw an exception - %factory.integer64(1.1)", () => {
            expect(() => {
              fhirpath(ctx, `%factory.integer64(1.1)`, subject);
            }).toThrow();
      });
      it("** create a markdown without an extension - %factory.markdown(' md md ').where($this is markdown)", () => {
            const result = fhirpath(ctx, `%factory.markdown(' md md ').where($this is markdown)`, subject);
            expect(result).toEqual([" md md "]);
      });
      it("** create a markdown with an extension - %factory.markdown(' md md ', %factory.Extension('someExt', 'someString')) .where($this is markdown and $this = ' md md ') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.markdown(' md md ', %factory.Extension('someExt', 'someString')) .where($this is markdown and $this = ' md md ') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an markdown may throw an exception - %factory.markdown('')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.markdown('')`, subject);
            }).toThrow();
      });
      it("** create an oid without an extension - %factory.oid('urn:oid:1.2.3').where($this is oid)", () => {
            const result = fhirpath(ctx, `%factory.oid('urn:oid:1.2.3').where($this is oid)`, subject);
            expect(result).toEqual(["urn:oid:1.2.3"]);
      });
      it("** create an oid with an extension - %factory.oid('urn:oid:1.2.3', %factory.Extension('someExt', 'someString')) .where($this is oid and $this = 'urn:oid:1.2.3') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.oid('urn:oid:1.2.3', %factory.Extension('someExt', 'someString')) .where($this is oid and $this = 'urn:oid:1.2.3') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an oid may throw an exception - %factory.oid('urn:oid:3.2.3')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.oid('urn:oid:3.2.3')`, subject);
            }).toThrow();
      });
      it("** create a string without an extension - %factory.string('some string').where($this is string)", () => {
            const result = fhirpath(ctx, `%factory.string('some string').where($this is string)`, subject);
            expect(result).toEqual(["some string"]);
      });
      it("** create a string with an extension - %factory.string('some string', %factory.Extension('someExt', 'someString')) .where($this is string and $this = 'some string') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.string('some string', %factory.Extension('someExt', 'someString')) .where($this is string and $this = 'some string') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a string may throw an exception - %factory.string('')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.string('')`, subject);
            }).toThrow();
      });
      it("** create a positiveInt without an extension - %factory.positiveInt(134).where($this is positiveInt)", () => {
            const result = fhirpath(ctx, `%factory.positiveInt(134).where($this is positiveInt)`, subject);
            expect(result).toEqual([134]);
      });
      it("** create a positiveInt with an extension - %factory.positiveInt(134, %factory.Extension('someExt', 'someString')) .where($this is positiveInt and $this = 134) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.positiveInt(134, %factory.Extension('someExt', 'someString')) .where($this is positiveInt and $this = 134) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a positiveInt may throw an exception - %factory.positiveInt(0)", () => {
            expect(() => {
              fhirpath(ctx, `%factory.positiveInt(0)`, subject);
            }).toThrow();
      });
      it("** create a time without an extension - %factory.time('10:00').where($this is time) =  @T10:00", () => {
            const result = fhirpath(ctx, `%factory.time('10:00').where($this is time) =  @T10:00`, subject);
            expect(result).toEqual([true]);
      });
      it("** create a time with an extension - %factory.time('10:00', %factory.Extension('someExt', 'someString')) .where($this is time and $this = @T10:00) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.time('10:00', %factory.Extension('someExt', 'someString')) .where($this is time and $this = @T10:00) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a time may throw an exception - %factory.time('something')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.time('something')`, subject);
            }).toThrow();
      });
      it("** create a unsignedInt without an extension - %factory.unsignedInt(134).where($this is unsignedInt)", () => {
            const result = fhirpath(ctx, `%factory.unsignedInt(134).where($this is unsignedInt)`, subject);
            expect(result).toEqual([134]);
      });
      it("** create a unsignedInt with an extension - %factory.unsignedInt(0, %factory.Extension('someExt', 'someString')) .where($this is unsignedInt and $this = 0) .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.unsignedInt(0, %factory.Extension('someExt', 'someString')) .where($this is unsignedInt and $this = 0) .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a unsignedInt may throw an exception - %factory.unsignedInt(-1)", () => {
            expect(() => {
              fhirpath(ctx, `%factory.unsignedInt(-1)`, subject);
            }).toThrow();
      });
      it("** create a uri without an extension - %factory.uri('/something').where($this is uri)", () => {
            const result = fhirpath(ctx, `%factory.uri('/something').where($this is uri)`, subject);
            expect(result).toEqual(["/something"]);
      });
      it("** create a uri with an extension - %factory.uri('', %factory.Extension('someExt', 'someString')) .where($this is uri and $this = '') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.uri('', %factory.Extension('someExt', 'someString')) .where($this is uri and $this = '') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a uri may throw an exception - %factory.uri(123)", () => {
            expect(() => {
              fhirpath(ctx, `%factory.uri(123)`, subject);
            }).toThrow();
      });
      it("** create a url without an extension - %factory.url('/something').where($this is url)", () => {
            const result = fhirpath(ctx, `%factory.url('/something').where($this is url)`, subject);
            expect(result).toEqual(["/something"]);
      });
      it("** create a url with an extension - %factory.url('', %factory.Extension('someExt', 'someString')) .where($this is url and $this = '') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.url('', %factory.Extension('someExt', 'someString')) .where($this is url and $this = '') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a url may throw an exception - %factory.url(123)", () => {
            expect(() => {
              fhirpath(ctx, `%factory.url(123)`, subject);
            }).toThrow();
      });
      it("** create a uuid without an extension - %factory.uuid('urn:uuid:c757873d-ec9a-4326-a141-556f43239520') .where($this is uuid)", () => {
            const result = fhirpath(ctx, `%factory.uuid('urn:uuid:c757873d-ec9a-4326-a141-556f43239520') .where($this is uuid)`, subject);
            expect(result).toEqual(["urn:uuid:c757873d-ec9a-4326-a141-556f43239520"]);
      });
      it("** create a uuid with an extension - %factory.uuid('urn:uuid:c757873d-ec9a-4326-a141-556f43239520', %factory.Extension('someExt', 'someString')).where($this is uuid and $this = 'urn:uuid:c757873d-ec9a-4326-a141-556f43239520') .extension('someExt').value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.uuid('urn:uuid:c757873d-ec9a-4326-a141-556f43239520', %factory.Extension('someExt', 'someString')).where($this is uuid and $this = 'urn:uuid:c757873d-ec9a-4326-a141-556f43239520') .extension('someExt').value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a uuid may throw an exception - %factory.uuid('something')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.uuid('something')`, subject);
            }).toThrow();
      });
    });
    describe("Extension", () => {

      it("** create an extension of the string data type - %factory.Extension('someExt', 'someString').where($this is Extension and $this.valueString is string).value = 'someString'", () => {
            const result = fhirpath(ctx, `%factory.Extension('someExt', 'someString').where($this is Extension and $this.valueString is string).value = 'someString'`, subject);
            expect(result).toEqual([true]);
      });
      it("** create an extension of the integer data type - %factory.Extension('someExt', 11).where($this is Extension and $this.valueInteger is integer).value = 11", () => {
            const result = fhirpath(ctx, `%factory.Extension('someExt', 11).where($this is Extension and $this.valueInteger is integer).value = 11`, subject);
            expect(result).toEqual([true]);
      });
      it("** create an extension of the decimal data type - %factory.Extension('someExt', 11.1).where($this is Extension and $this.valueDecimal is decimal).value = 11.1", () => {
            const result = fhirpath(ctx, `%factory.Extension('someExt', 11.1).where($this is Extension and $this.valueDecimal is decimal).value = 11.1`, subject);
            expect(result).toEqual([true]);
      });
      it("** create an extension of the code data type - %factory.Extension('someExt', %factory.code('some code')).where($this is Extension and $this.valueCode is code).value = 'some code'", () => {
            const result = fhirpath(ctx, `%factory.Extension('someExt', %factory.code('some code')).where($this is Extension and $this.valueCode is code).value = 'some code'`, subject);
            expect(result).toEqual([true]);
      });
    });
    describe("Identifier", () => {

      it("** created an Identifier - %factory.Identifier('someSystem', 'someValue', 'someUse', %factory .create(CodeableConcept)).where($this.system = 'someSystem' and $this.value = 'someValue' and $this.use = 'someUse' and $this.type is CodeableConcept) is Identifier", () => {
            const result = fhirpath(ctx, `%factory.Identifier('someSystem', 'someValue', 'someUse', %factory .create(CodeableConcept)).where($this.system = 'someSystem' and $this.value = 'someValue' and $this.use = 'someUse' and $this.type is CodeableConcept) is Identifier`, subject);
            expect(result).toEqual([true]);
      });
      it("** created an Identifier without system - %factory.Identifier({}, 'someValue', 'someUse', %factory .create(CodeableConcept)).where($this.system.empty() and $this.value = 'someValue' and $this.use = 'someUse' and $this.type is CodeableConcept) is Identifier", () => {
            const result = fhirpath(ctx, `%factory.Identifier({}, 'someValue', 'someUse', %factory .create(CodeableConcept)).where($this.system.empty() and $this.value = 'someValue' and $this.use = 'someUse' and $this.type is CodeableConcept) is Identifier`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an Identifier may throw an exception - %factory.Identifier(1, 'someValue', 'someUse', %factory .create(CodeableConcept))", () => {
            expect(() => {
              fhirpath(ctx, `%factory.Identifier(1, 'someValue', 'someUse', %factory .create(CodeableConcept))`, subject);
            }).toThrow();
      });
    });
    describe("HumanName", () => {

      it("** created a HumanName - %factory.HumanName('Smith', 'Julia' | 'A', {}, {}, 'Julia Smith').where( family = 'Smith' and given = ('Julia' | 'A') and prefix.empty() and suffix.empty() and text = 'Julia Smith' and use.empty() ) is HumanName", () => {
            const result = fhirpath(ctx, `%factory.HumanName('Smith', 'Julia' | 'A', {}, {}, 'Julia Smith').where( family = 'Smith' and given = ('Julia' | 'A') and prefix.empty() and suffix.empty() and text = 'Julia Smith' and use.empty() ) is HumanName`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a HumanName may throw an exception - %factory.HumanName(1, 'Julia' | 'A', {}, {}, 'Julia Smith')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.HumanName(1, 'Julia' | 'A', {}, {}, 'Julia Smith')`, subject);
            }).toThrow();
      });
    });
    describe("ContactPoint", () => {

      it("** created a ContactPoint - %factory.ContactPoint('email', 'coyote@acme.com', 'work').where( system = 'email' and value = 'coyote@acme.com' and use = 'work' ) is ContactPoint", () => {
            const result = fhirpath(ctx, `%factory.ContactPoint('email', 'coyote@acme.com', 'work').where( system = 'email' and value = 'coyote@acme.com' and use = 'work' ) is ContactPoint`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a ContactPoint may throw an exception - %factory.ContactPoint(1, 'coyote@acme.com', 'work')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.ContactPoint(1, 'coyote@acme.com', 'work')`, subject);
            }).toThrow();
      });
    });
    describe("Address", () => {

      it("** created an Address - %factory.Address('5 Nowhere Road' | 'second line', 'SomeCity', 'EW', '0000', {}, 'home', 'physical').where(line = ('5 Nowhere Road' | 'second line') and city = 'SomeCity' and state = 'EW' and postalCode = '0000' and country.empty() and use = 'home' and type = 'physical') is Address", () => {
            const result = fhirpath(ctx, `%factory.Address('5 Nowhere Road' | 'second line', 'SomeCity', 'EW', '0000', {}, 'home', 'physical').where(line = ('5 Nowhere Road' | 'second line') and city = 'SomeCity' and state = 'EW' and postalCode = '0000' and country.empty() and use = 'home' and type = 'physical') is Address`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating an Address may throw an exception - %factory.Address(1 | 'second line', 'SomeCity', 'EW', '0000', {}, 'home', 'physical')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.Address(1 | 'second line', 'SomeCity', 'EW', '0000', {}, 'home', 'physical')`, subject);
            }).toThrow();
      });
    });
    describe("Quantity", () => {

      it("** created a Quantity using a string value - %factory.Quantity('http://unitsofmeasure.org', 'mg/dL', '5.03', 'mg/dL').where(system = 'http://unitsofmeasure.org' and code = 'mg/dL') = 5.03 'mg/dL'", () => {
            const result = fhirpath(ctx, `%factory.Quantity('http://unitsofmeasure.org', 'mg/dL', '5.03', 'mg/dL').where(system = 'http://unitsofmeasure.org' and code = 'mg/dL') = 5.03 'mg/dL'`, subject);
            expect(result).toEqual([true]);
      });
      it("** created a Quantity using a number value - %factory.Quantity('http://unitsofmeasure.org', 'mg/dL', 5.03, 'mg/dL') = 5.03 'mg/dL'", () => {
            const result = fhirpath(ctx, `%factory.Quantity('http://unitsofmeasure.org', 'mg/dL', 5.03, 'mg/dL') = 5.03 'mg/dL'`, subject);
            expect(result).toEqual([true]);
      });
      it("** created a Quantity without system - %factory.Quantity({}, 'mg/dL', 5.03, 'mg/dL').where(system.empty()) is Quantity", () => {
            const result = fhirpath(ctx, `%factory.Quantity({}, 'mg/dL', 5.03, 'mg/dL').where(system.empty()) is Quantity`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a Quantity may throw an exception - %factory.Quantity(1, 'mg/dL', 5.03, 'mg/dL')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.Quantity(1, 'mg/dL', 5.03, 'mg/dL')`, subject);
            }).toThrow();
      });
    });
    describe("Coding", () => {

      it("** created a Coding - %factory.Coding('http://loinc.org', '1234-5', 'An example test', '1.02').where(system = 'http://loinc.org' and code = '1234-5' and display = 'An example test' and version = '1.02') is Coding", () => {
            const result = fhirpath(ctx, `%factory.Coding('http://loinc.org', '1234-5', 'An example test', '1.02').where(system = 'http://loinc.org' and code = '1234-5' and display = 'An example test' and version = '1.02') is Coding`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a Coding may throw an exception - %factory.Coding(1, '1234-5', 'An example test', '1.02')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.Coding(1, '1234-5', 'An example test', '1.02')`, subject);
            }).toThrow();
      });
    });
    describe("CodeableConcept", () => {

      it("** created a CodeableConcept - %factory.CodeableConcept(%factory.Coding('system1', '1') | %factory .Coding('system2', '2'), 'Example Test').where(coding.code = '1' | '2' and text = 'Example Test') is CodeableConcept", () => {
            const result = fhirpath(ctx, `%factory.CodeableConcept(%factory.Coding('system1', '1') | %factory .Coding('system2', '2'), 'Example Test').where(coding.code = '1' | '2' and text = 'Example Test') is CodeableConcept`, subject);
            expect(result).toEqual([true]);
      });
      it("** creating a CodeableConcept may throw an exception - %factory.CodeableConcept(1 | %factory.Coding('system2', '2'), 'Example Test')", () => {
            expect(() => {
              fhirpath(ctx, `%factory.CodeableConcept(1 | %factory.Coding('system2', '2'), 'Example Test')`, subject);
            }).toThrow();
      });
    });
    describe("create", () => {

      it("** the created instance has the correct data type - %factory.create(integer) is FHIR.integer", () => {
            const result = fhirpath(ctx, `%factory.create(integer) is FHIR.integer`, subject);
            expect(result).toEqual([true]);
      });
    });
    describe("withExtension", () => {

      it("** adding an extension to an existing list of extensions - %factory.withExtension(%factory.integer(134, %factory.Extension( 'someExt1', 'someString')), 'someExt2', 1).extension.value = 'someString' | 1", () => {
            const result = fhirpath(ctx, `%factory.withExtension(%factory.integer(134, %factory.Extension( 'someExt1', 'someString')), 'someExt2', 1).extension.value = 'someString' | 1`, subject);
            expect(result).toEqual([true]);
      });
      it("** create an instance with no data and add an extension later - %factory.withExtension(%factory.integer({}), 'someExt', 1).extension( 'someExt').value = 1", () => {
            const result = fhirpath(ctx, `%factory.withExtension(%factory.integer({}), 'someExt', 1).extension( 'someExt').value = 1`, subject);
            expect(result).toEqual([true]);
      });
    });
    describe("withProperty", () => {

      it("** adding a property to an instance - %factory.withProperty(%factory.integer(134, %factory.Extension( 'someExt1', 'someString')), 'id', 'someId').where(extension.value = 'someString').id = 'someId'", () => {
            const result = fhirpath(ctx, `%factory.withProperty(%factory.integer(134, %factory.Extension( 'someExt1', 'someString')), 'id', 'someId').where(extension.value = 'someString').id = 'someId'`, subject);
            expect(result).toEqual([true]);
      });
    });
  });
});
