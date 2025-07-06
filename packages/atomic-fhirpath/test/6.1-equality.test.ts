import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/parser.js";

describe('6.1 Equality', () => {
  const ctx = {};
  it('complex quantity calculation', () => {
    expect(fhirpath(ctx, '10 kg.m/s2 =5 kg * 4 m / (2 seconds * 1000 ms)')).toEqual([true]);
  });

  it('decimal values should not be compared beyond maximum precision', () => {
    expect(fhirpath(ctx, '0.1 + 0.1 + 0.1 = 0.3')).toEqual([true]);
  });

  it('quantity equals - year', () => {
    expect(fhirpath(ctx, '12 months = 1 year')).toEqual([true]);
  });

  it('quantity equals - month', () => {
    expect(fhirpath(ctx, '1 month = 30 days')).toEqual([true]);
  });

  it('quantity equals - week', () => {
    expect(fhirpath(ctx, '1 week = 7 days')).toEqual([true]);
  });

  it('quantity equals - day', () => {
    expect(fhirpath(ctx, '1 day = 24 hours')).toEqual([true]);
  });

  it('quantity equals - second', () => {
    expect(fhirpath(ctx, '1 second = 1 s')).toEqual([true]);
  });

});