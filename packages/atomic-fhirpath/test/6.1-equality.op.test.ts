import { describe, it, expect } from 'bun:test';
import { eq } from '../src/functions';

describe('eq function tests', () => {
  it('strings equals', () => {
    expect(eq('abc', 'abc')).toEqual([true]);
  });

  it('strings not equals', () => {
    expect(eq('abc', 'abcd')).toEqual([false]);
  });

  it('array and string equals', () => {
    expect(eq(['abc'], 'abc')).toEqual([true]);
    expect(eq('abc', ['abc'])).toEqual([true]);
  });

  it('utf8 strings equals', () => {
    expect(eq('ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ', 'ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ')).toEqual([true]);
  });

  it('utf8 strings not equals', () => {
    expect(eq('ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ', 'ə ɚ ɛ ɜ ɝ ɞ ɟ ɠɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ')).toEqual([false]);
  });

  it('integer equals', () => {
    expect(eq(1, 1)).toEqual([true]);
  });

  it('integer not equals', () => {
    expect(eq(1, 2)).toEqual([false]);
  });

  it('equal different types but same values', () => {
    expect(eq(2, 2)).toEqual([true]);
  });

  it('decimals equal', () => {
    expect(eq(1.01, 1.01)).toEqual([true]);
  });

  it('decimals equal, trailing zeroes are ignored', () => {
    expect(eq(0.01, 0.01)).toEqual([true]);
  });

  it('decimal not equal', () => {
    expect(eq(1.01, 1.02)).toEqual([false]);
  });


  it('boolean equals', () => {
    expect(eq(true, true)).toEqual([true]);
  });

  it('boolean not equals', () => {
    expect(eq(true, false)).toEqual([false]);
  });

  it('propagate empty collection', () => {
    expect(eq(true, undefined)).toEqual([]);
  });

  it('DateTime literal equals', () => {
    expect(eq(new Date('2018'), new Date('2018'))).toEqual([true]);
  });

  it('DateTime literal not equals', () => {
    expect(eq(new Date('2018'), new Date('2017'))).toEqual([false]);
  });

  it('Time literal equals', () => {
    expect(eq('14:04:23', '14:04:23')).toEqual([true]);
  });

  it('Time literal not equals', () => {
    expect(eq('14:04:23', '14:04:24')).toEqual([false]);
  });

  it('empty collections equals', () => {
    expect(eq([], [])).toEqual([]);
  });

  it('length mismatch', () => {
    expect(eq([1, 2, 3], 1)).toEqual([false]);
  });

  it('length match', () => {
    expect(eq([1], 1)).toEqual([true]);
  });

  it('empty right operand', () => {
    expect(eq(1, undefined)).toEqual([]);
  });

  it('empty left operand', () => {
    expect(eq(undefined, 1)).toEqual([]);
  });
}); 