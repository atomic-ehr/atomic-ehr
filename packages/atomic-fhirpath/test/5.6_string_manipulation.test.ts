import { describe, it, expect } from "bun:test";
import subject from "./5.6_string_manipulation.json" with { type: "json" };
import { fhirpath } from "../src/index";

// Test file generated from 5.6_string_manipulation.yaml

describe("5.6_string_manipulation", () => {
  const ctx = {};

  it("5. Functions", () => {

  });
  it("5.6. String Manipulation", () => {

  });
  it("5.6.1. indexOf(substring : string) : integer", () => {

  });
  it("** index of substring (contains) - Functions.str.attr.indexOf('string')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.indexOf('string')`, subject);
        expect(result).toEqual([5]);
  });
  it("** index of substring (isnt contains) - Functions.str.attr.indexOf('qwerty')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.indexOf('qwerty')`, subject);
        expect(result).toEqual([-1]);
  });
  it("** index of substring with zero length - Functions.str.attr.indexOf('')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.indexOf('')`, subject);
        expect(result).toEqual([0]);
  });
  it("** indexOf on empty input collection - Functions.str.empty.indexOf('')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.indexOf('')`, subject);
        expect(result).toEqual([]);
  });
  it("** indexOf on a singleton with null value - Patient.name.given[0].indexOf('Peter')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].indexOf('Peter')`, subject);
        expect(result).toEqual([]);
  });
  it("** index of empty substring - Functions.str.empty.indexOf(EmptySubstring)", () => {
        const result = fhirpath(ctx, `Functions.str.empty.indexOf(EmptySubstring)`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.2. substring(start : integer [, length : integer]) : string", () => {

  });
  it("** substring with length - Functions.str.attr.substring(5, 3)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.substring(5, 3)`, subject);
        expect(result).toEqual(["str"]);
  });
  it("** substring without length - Functions.str.attr.substring(5)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.substring(5)`, subject);
        expect(result).toEqual(["string"]);
  });
  it("** substring with outside index - Functions.str.attr.substring(55)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.substring(55)`, subject);
        expect(result).toEqual([]);
  });
  it("** substring with empty index - Functions.str.attr.substring(EmptyStart)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.substring(EmptyStart)`, subject);
        expect(result).toEqual([]);
  });
  it("** substring with outside length - Functions.str.attr.substring(5, 55)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.substring(5, 55)`, subject);
        expect(result).toEqual(["string"]);
  });
  it("** substring with empty length - Functions.str.attr.substring(5, EmptyLength)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.substring(5, EmptyLength)`, subject);
        expect(result).toEqual(["string"]);
  });
  it("** substring on empty input collection - Functions.str.empty.substring(0)", () => {
        const result = fhirpath(ctx, `Functions.str.empty.substring(0)`, subject);
        expect(result).toEqual([]);
  });
  it("** substring on a singleton with null value - Patient.name.given[0].substring(0)", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].substring(0)`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.3. startsWith(prefix : string) : boolean", () => {

  });
  it("** start with - Functions.str.attr.startsWith('test')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.startsWith('test')`, subject);
        expect(result).toEqual([true]);
  });
  it("** not start with - Functions.str.attr.startsWith('jest')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.startsWith('jest')`, subject);
        expect(result).toEqual([false]);
  });
  it("** starts with prefix with zero length - Functions.str.attr.startsWith('')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.startsWith('')`, subject);
        expect(result).toEqual([true]);
  });
  it("** startsWith on empty input collection - Functions.str.empty.startsWith('')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.startsWith('')`, subject);
        expect(result).toEqual([]);
  });
  it("** start with empty prefix - Functions.str.attr.startsWith(EmptyString)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.startsWith(EmptyString)`, subject);
        expect(result).toEqual([]);
  });
  it("** startsWith on a singleton with null value - Patient.name.given[0].startsWith('P')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].startsWith('P')`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.4. endsWith(suffix : string) : boolean", () => {

  });
  it("** end with - Functions.str.attr.endsWith('ing')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.endsWith('ing')`, subject);
        expect(result).toEqual([true]);
  });
  it("** not end with - Functions.str.attr.endsWith('lala')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.endsWith('lala')`, subject);
        expect(result).toEqual([false]);
  });
  it("** end with suffix with zero length - Functions.str.attr.endsWith('')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.endsWith('')`, subject);
        expect(result).toEqual([true]);
  });
  it("** endsWith on empty input collection - Functions.str.empty.endsWith('')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.endsWith('')`, subject);
        expect(result).toEqual([]);
  });
  it("** end with empty substring - Functions.str.attr.endsWith(EmptyString)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.endsWith(EmptyString)`, subject);
        expect(result).toEqual([]);
  });
  it("** endsWith on a singleton with null value - Patient.name.given[0].endsWith('P')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].endsWith('P')`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.5. contains(substring : string) : boolean", () => {

  });
  it("** contains - Functions.str.attr.contains('tri')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.contains('tri')`, subject);
        expect(result).toEqual([true]);
  });
  it("** not contains - Functions.str.attr.contains('lala')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.contains('lala')`, subject);
        expect(result).toEqual([false]);
  });
  it("** contains empty string - Functions.str.attr.contains('')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.contains('')`, subject);
        expect(result).toEqual([true]);
  });
  it("** contains on empty input collection - Functions.str.empty.contains('P')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.contains('P')`, subject);
        expect(result).toEqual([]);
  });
  it("** contains on a singleton with null value - Patient.name.given[0].contains('P')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].contains('P')`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.6. upper() : string", () => {

  });
  it("** upper 1 - 'abcdefg'.upper()", () => {
        const result = fhirpath(ctx, `'abcdefg'.upper()`, subject);
        expect(result).toEqual(["ABCDEFG"]);
  });
  it("** upper 2 - 'AbCdefg'.upper()", () => {
        const result = fhirpath(ctx, `'AbCdefg'.upper()`, subject);
        expect(result).toEqual(["ABCDEFG"]);
  });
  it("** upper on empty input collection - Functions.str.empty.upper()", () => {
        const result = fhirpath(ctx, `Functions.str.empty.upper()`, subject);
        expect(result).toEqual([]);
  });
  it("** upper on a singleton with null value - Patient.name.given[0].upper()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].upper()`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.7. lower() : string", () => {

  });
  it("** lower 1 - 'ABCDEFG'.lower()", () => {
        const result = fhirpath(ctx, `'ABCDEFG'.lower()`, subject);
        expect(result).toEqual(["abcdefg"]);
  });
  it("** lower 2 - 'aBcDEFG'.lower()", () => {
        const result = fhirpath(ctx, `'aBcDEFG'.lower()`, subject);
        expect(result).toEqual(["abcdefg"]);
  });
  it("** lower on empty input collection - Functions.str.empty.lower()", () => {
        const result = fhirpath(ctx, `Functions.str.empty.lower()`, subject);
        expect(result).toEqual([]);
  });
  it("** lower on a singleton with null value - Patient.name.given[0].lower()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].lower()`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.8. replace(pattern : string, substitution : string) : string", () => {

  });
  it("** replace - Functions.str.attr.replace('string', 'lala')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replace('string', 'lala')`, subject);
        expect(result).toEqual(["test lala"]);
  });
  it("** replace multiple - Functions.str.attr.replace('t', 'FHIR')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replace('t', 'FHIR')`, subject);
        expect(result).toEqual(["FHIResFHIR sFHIRring"]);
  });
  it("** replace for empty string - Functions.str.attr.replace('t', '')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replace('t', '')`, subject);
        expect(result).toEqual(["es sring"]);
  });
  it("** replace is not the same as replaceMatches - Functions.str.attr2.replace('\\\\s', 'a')", () => {
        const result = fhirpath(ctx, `Functions.str.attr2.replace('\\\\s', 'a')`, subject);
        expect(result).toEqual(["aaa"]);
  });
  it("** surround - Functions.str.attr.replace('', 'x')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replace('', 'x')`, subject);
        expect(result).toEqual(["xtxexsxtx xsxtxrxixnxgx"]);
  });
  it("** replace on empty input collection - Functions.str.empty.replace('', 'x')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.replace('', 'x')`, subject);
        expect(result).toEqual([]);
  });
  it("** replace with empty collection in pattern - Functions.str.attr.replace(EmptyPattern, '')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replace(EmptyPattern, '')`, subject);
        expect(result).toEqual([]);
  });
  it("** replace with empty collection in substitution - Functions.str.attr.replace('', EmptySubstitution)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replace('', EmptySubstitution)`, subject);
        expect(result).toEqual([]);
  });
  it("** replace on a singleton with null value - Patient.name.given[0].replace('a', 'b')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].replace('a', 'b')`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.9. matches(regex : string) : boolean", () => {

  });
  it("** matches - Functions.str.attr.matches('t.+')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.matches('t.+')`, subject);
        expect(result).toEqual([true]);
  });
  it("** not matches - Functions.str.attr.matches('asd.+')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.matches('asd.+')`, subject);
        expect(result).toEqual([false]);
  });
  it("** matches on empty input collection - Functions.str.empty.matches('.*')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.matches('.*')`, subject);
        expect(result).toEqual([]);
  });
  it("** matches with empty collection in regex - Functions.str.attr.matches(EmptyRegex)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.matches(EmptyRegex)`, subject);
        expect(result).toEqual([]);
  });
  it("** matches with dotAll - 'first line\nsecond line'.matches('line.second')", () => {
        const result = fhirpath(ctx, `'first line
second line'.matches('line.second')`, subject);
        expect(result).toEqual([true]);
  });
  it("** matches on a singleton with null value - Patient.name.given[0].matches('.*')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].matches('.*')`, subject);
        expect(result).toEqual([]);
  });
  it("** matches with unicode character class escapes - 'Taupō'.matches('^\\\\p{Lu}\\\\p{Ll}*$')", () => {
        const result = fhirpath(ctx, `'Taupō'.matches('^\\\\p{Lu}\\\\p{Ll}*$')`, subject);
        expect(result).toEqual([true]);
  });
  it("5.6.10. replaceMatches(regex : string, substitution: string) : string", () => {

  });
  it("** replaceMatches - Functions.str.attr.replaceMatches('test', 'match')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replaceMatches('test', 'match')`, subject);
        expect(result).toEqual(["match string"]);
  });
  it("** replaceMatches 2 - Functions.str.date.replaceMatches('\\\\b(?<month>\\\\d{1,2})/(?<day>\\\\d{1,2})/(?<year>\\\\d{2,4})\\\\b', '${day}-${month}-${year}')", () => {
        const result = fhirpath(ctx, `Functions.str.date.replaceMatches('\\\\b(?<month>\\\\d{1,2})/(?<day>\\\\d{1,2})/(?<year>\\\\d{2,4})\\\\b', '\${day}-\${month}-\${year}')`, subject);
        expect(result).toEqual(["30-11-1972"]);
  });
  it("** replaceMatches 3 - Functions.str.date.replaceMatches('\\\\b(\\\\d{1,2})/(\\\\d{1,2})/(\\\\d{2,4})\\\\b', '$2-$1-$3')", () => {
        const result = fhirpath(ctx, `Functions.str.date.replaceMatches('\\\\b(\\\\d{1,2})/(\\\\d{1,2})/(\\\\d{2,4})\\\\b', '$2-$1-$3')`, subject);
        expect(result).toEqual(["30-11-1972"]);
  });
  it("** replaceMatches replaces each match - Functions.str.dateRange.replaceMatches('\\\\b(\\\\d{1,2})/(\\\\d{1,2})/(\\\\d{2,4})\\\\b', '$2-$1-$3')", () => {
        const result = fhirpath(ctx, `Functions.str.dateRange.replaceMatches('\\\\b(\\\\d{1,2})/(\\\\d{1,2})/(\\\\d{2,4})\\\\b', '$2-$1-$3')`, subject);
        expect(result).toEqual(["01-11-1972 - 30-11-1972"]);
  });
  it("** replaceMatches on empty input collection - Functions.str.empty.replaceMatches('(.*)', '$1')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.replaceMatches('(.*)', '$1')`, subject);
        expect(result).toEqual([]);
  });
  it("** replaceMatches with empty collection in regex - Functions.str.attr.replaceMatches(EmptyRegex, 'aaa')", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replaceMatches(EmptyRegex, 'aaa')`, subject);
        expect(result).toEqual([]);
  });
  it("** replaceMatches with empty input collection in substitution - Functions.str.attr.replaceMatches('', EmptySubstitution)", () => {
        const result = fhirpath(ctx, `Functions.str.attr.replaceMatches('', EmptySubstitution)`, subject);
        expect(result).toEqual([]);
  });
  it("** replaceMatches on a singleton with null value - Patient.name.given[0].replaceMatches('(.*)', '$1')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].replaceMatches('(.*)', '$1')`, subject);
        expect(result).toEqual([]);
  });
  it("** replaceMatches with a unicode character class escape - 'Taupō'.replaceMatches('(\\\\p{Lu})', 'city: $1')", () => {
        const result = fhirpath(ctx, `'Taupō'.replaceMatches('(\\\\p{Lu})', 'city: $1')`, subject);
        expect(result).toEqual(["city: Taupō"]);
  });
  it("5.6.11. length() : integer", () => {

  });
  it("** length - Functions.str.attr.length()", () => {
        const result = fhirpath(ctx, `Functions.str.attr.length()`, subject);
        expect(result).toEqual([11]);
  });
  it("** length of empty coll - Functions.str.empty.length()", () => {
        const result = fhirpath(ctx, `Functions.str.empty.length()`, subject);
        expect(result).toEqual([]);
  });
  it("** length on a singleton with null value - Patient.name.given[0].length()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].length()`, subject);
        expect(result).toEqual([]);
  });
  it("5.6.12. toChars() : collection", () => {

  });
  it("** list of characters in the input string - 'abc'.toChars()", () => {
        const result = fhirpath(ctx, `'abc'.toChars()`, subject);
        expect(result).toEqual(["a", "b", "c"]);
  });
  it("** toChars on empty input collection - Functions.str.empty.toChars()", () => {
        const result = fhirpath(ctx, `Functions.str.empty.toChars()`, subject);
        expect(result).toEqual([]);
  });
  it("** toChars on a singleton with null value - Patient.name.given[0].toChars()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].toChars()`, subject);
        expect(result).toEqual([]);
  });
  it("** split string on delimiter - 'a,b,c'.split(',')", () => {
        const result = fhirpath(ctx, `'a,b,c'.split(',')`, subject);
        expect(result).toEqual(["a", "b", "c"]);
  });
  it("** split string on delimiter - 'a,,c'.split(',')", () => {
        const result = fhirpath(ctx, `'a,,c'.split(',')`, subject);
        expect(result).toEqual(["a", "", "c"]);
  });
  it("** split on a singleton with null value - Patient.name.given[0].split(',')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].split(',')`, subject);
        expect(result).toEqual([]);
  });
  it("** join string with separator - ('a'|'b'|'c').join(',')", () => {
        const result = fhirpath(ctx, `('a'|'b'|'c').join(',')`, subject);
        expect(result).toEqual(["a,b,c"]);
  });
  it("** join string with separator - ('a'|'b'|'c').join()", () => {
        const result = fhirpath(ctx, `('a'|'b'|'c').join()`, subject);
        expect(result).toEqual(["abc"]);
  });
  it("** join string with date throws error - ('a'|'2023-05-28'.toDate()|'c').join(',')", () => {
        expect(() => {
          fhirpath(ctx, `('a'|'2023-05-28'.toDate()|'c').join(',')`, subject);
        }).toThrow();
  });
  it("** join on empty input collection - Functions.str.empty.join(',')", () => {
        const result = fhirpath(ctx, `Functions.str.empty.join(',')`, subject);
        expect(result).toEqual([]);
  });
  it("** join on a collection with null values - Patient.name.given.join(',')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given.join(',')`, subject);
        expect(result).toEqual(["Peter,James"]);
  });
  it("** trim down a string - '   this is a string   '.trim()", () => {
        const result = fhirpath(ctx, `'   this is a string   '.trim()`, subject);
        expect(result).toEqual(["this is a string"]);
  });
  it("** trim down a string null - 'a ,, c'.split(',').select(trim())", () => {
        const result = fhirpath(ctx, `'a ,, c'.split(',').select(trim())`, subject);
        expect(result).toEqual(["a", "", "c"]);
  });
  it("** trim on a singleton with null value - Patient.name.given[0].trim()", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].trim()`, subject);
        expect(result).toEqual([]);
  });
  it("** encode urlbase64 - 'http://example.org/fhir'.encode('base64')", () => {
        const result = fhirpath(ctx, `'http://example.org/fhir'.encode('base64')`, subject);
        expect(result).toEqual(["aHR0cDovL2V4YW1wbGUub3JnL2ZoaXI="]);
  });
  it("** encode on a singleton with null value - Patient.name.given[0].encode('base64')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].encode('base64')`, subject);
        expect(result).toEqual([]);
  });
  it("** decode - 'aHR0cDovL2V4YW1wbGUub3JnL2ZoaXI='.decode('base64')", () => {
        const result = fhirpath(ctx, `'aHR0cDovL2V4YW1wbGUub3JnL2ZoaXI='.decode('base64')`, subject);
        expect(result).toEqual(["http://example.org/fhir"]);
  });
  it("** decode on a singleton with null value - Patient.name.given[0].decode('base64')", () => {
        // Input file: patient-example-2.json
        const result = fhirpath(ctx, `Patient.name.given[0].decode('base64')`, subject);
        expect(result).toEqual([]);
  });
  it("** testEncodeDecode 1e - 'test'.encode('base64')", () => {
        const result = fhirpath(ctx, `'test'.encode('base64')`, subject);
        expect(result).toEqual(["dGVzdA=="]);
  });
  it("** testEncodeDecode 2e - 'test'.encode('hex')", () => {
        const result = fhirpath(ctx, `'test'.encode('hex')`, subject);
        expect(result).toEqual(["74657374"]);
  });
  it("** testEncodeDecode 3e - 'subjects?_d'.encode('base64')", () => {
        const result = fhirpath(ctx, `'subjects?_d'.encode('base64')`, subject);
        expect(result).toEqual(["c3ViamVjdHM/X2Q="]);
  });
  it("** testEncodeDecode 4e - 'subjects?_d'.encode('urlbase64')", () => {
        const result = fhirpath(ctx, `'subjects?_d'.encode('urlbase64')`, subject);
        expect(result).toEqual(["c3ViamVjdHM_X2Q="]);
  });
  it("** testEncodeDecode 1u - 'dGVzdA=='.decode('base64')", () => {
        const result = fhirpath(ctx, `'dGVzdA=='.decode('base64')`, subject);
        expect(result).toEqual(["test"]);
  });
  it("** testEncodeDecode 2u - '74657374'.decode('hex')", () => {
        const result = fhirpath(ctx, `'74657374'.decode('hex')`, subject);
        expect(result).toEqual(["test"]);
  });
  it("** testEncodeDecode 3u - 'c3ViamVjdHM/X2Q='.decode('base64')", () => {
        const result = fhirpath(ctx, `'c3ViamVjdHM/X2Q='.decode('base64')`, subject);
        expect(result).toEqual(["subjects?_d"]);
  });
  it("** testEncodeDecode 4u - 'c3ViamVjdHM_X2Q='.decode('urlbase64')", () => {
        const result = fhirpath(ctx, `'c3ViamVjdHM_X2Q='.decode('urlbase64')`, subject);
        expect(result).toEqual(["subjects?_d"]);
  });
  it("extra test that results with a `+` in the encoded string - 'subjects>_d'.encode('base64')", () => {
        const result = fhirpath(ctx, `'subjects>_d'.encode('base64')`, subject);
        expect(result).toEqual(["c3ViamVjdHM+X2Q="]);
  });
  it("** uneven number of chars, so throws an error - '6B6C6D6E6'.decode('hex')", () => {
        expect(() => {
          fhirpath(ctx, `'6B6C6D6E6'.decode('hex')`, subject);
        }).toThrow();
  });
  it("** testExcapeUnescape 1e - '\"1&lt;2\"'.escape('html')", () => {
        const result = fhirpath(ctx, `'"1&lt;2"'.escape('html')`, subject);
        expect(result).toEqual(["&amp;quot;1&amp;lt;2&amp;quot;"]);
  });
  it("** testExcapeUnescape 2e - '\"1&lt;2\"'.escape('json')", () => {
        const result = fhirpath(ctx, `'"1&lt;2"'.escape('json')`, subject);
        expect(result).toEqual(["\\\"1&lt;2\\\""]);
  });
  it("** testExcapeUnescape 3u - '&amp;quot;1&amp;lt;2&amp;quot;'.unescape('html')", () => {
        const result = fhirpath(ctx, `'&amp;quot;1&amp;lt;2&amp;quot;'.unescape('html')`, subject);
        expect(result).toEqual(["1&lt;2\""]);
  });
  it("** testExcapeUnescape 4u - '\"1&lt;2\"'.unescape('json')", () => {
        const result = fhirpath(ctx, `'"1&lt;2"'.unescape('json')`, subject);
        expect(result).toEqual(["1&lt;2"]);
  });
  it("** \"123456\".trim().length() = 6 - '123456'.trim().length() = 6", () => {
        const result = fhirpath(ctx, `'123456'.trim().length() = 6`, subject);
        expect(result).toEqual([true]);
  });
  it("** \"123 456\".trim().length() = 7 - '123 456'.trim().length() = 7", () => {
        const result = fhirpath(ctx, `'123 456'.trim().length() = 7`, subject);
        expect(result).toEqual([true]);
  });
  it("** \" 123456 \".trim().length() = 6 - ' 123456 '.trim().length() = 6", () => {
        const result = fhirpath(ctx, `' 123456 '.trim().length() = 6`, subject);
        expect(result).toEqual([true]);
  });
  it("** \"   \".trim().length() = 0 - '   '.trim().length() = 0", () => {
        const result = fhirpath(ctx, `'   '.trim().length() = 0`, subject);
        expect(result).toEqual([true]);
  });
  it("** 'Peter,James,Jim,Peter,James'.split(',').count() = 5 - 'Peter,James,Jim,Peter,James'.split(',').count() = 5", () => {
        const result = fhirpath(ctx, `'Peter,James,Jim,Peter,James'.split(',').count() = 5`, subject);
        expect(result).toEqual([true]);
  });
  it("** name.given.join(',') - name.given.join(',')", () => {
        // Input file: patient-example.json
        const result = fhirpath(ctx, `name.given.join(',')`, subject);
        expect(result).toEqual(["Peter,James,Jim,Peter,James"]);
  });
});
