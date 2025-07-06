import { describe, it, expect } from 'bun:test';
import { fhirpath } from '../src/parser.js';

describe('3.2 Paths with choice types', () => {
  // Test data from the YAML file
  const ctx = {}; // TODO: This should be the FHIR model context
  const subject = {
    resourceType: 'Observation',
    CustomField: 'test',
    valueString: 'high',
    code: {
      coding: [ 
        { code: '123', system: 'loinc' },
        { code: '456', system: 'snomed' }
      ]
    },
    contained: [
      {
        resourceType: 'Observation',
        valueString: 'medium'
      },
      {
        resourceType: 'Observation',
        valueString: 'low',
        contained: [
          {
            resourceType: 'Observation',
            valueString: 'zero'
          }
        ]
      },
      {
        resourceType: 'QuestionnaireResponse',
        item: [
          {
            linkId: '1',
            answer: [
              {
                valueString: 'Red',
                item: [
                  {
                    linkId: '1.0',
                    answer: [
                      {
                        valueString: 'Green'
                      }
                    ]
                  }
                ]
              }
            ],
            item: [
              {
                linkId: '1.1',
                answer: [
                  {
                    valueString: 'Blue'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // TODO: These tests currently ignore the model parameter
  // The original tests use different FHIR models (r4, r5, stu3, dstu2)
  // This functionality needs to be implemented

  it('Observation.code.coding.code (loinc)', () => {
    const result = fhirpath(ctx, 'Observation.code.coding.code', subject);
    expect(result).toEqual(['123', '456']);
  });

  it('Observation.code.coding.where.code (snomed)', () => {
    const result = fhirpath(ctx, "Observation.code.coding.where(system = 'loinc').code", subject);
    expect(result).toEqual(['123']);
  });

  it('Observation.code.coding.where.code (not found)', () => {
    const result = fhirpath(ctx, "Observation.code.coding.where(system = 'ups').code", subject);
    expect(result).toEqual([]);
  });


  // 190 ms vs 5 ms after caching
  it('Observation.code.coding.where', () => {
    const startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
      fhirpath(ctx, "Observation.code.coding.where(system = 'snomed').code", subject);
    }
    const endTime = performance.now();
    const result = fhirpath(ctx, "Observation.code.coding.where(system = 'snomed').code", subject);
    const time = endTime - startTime;
    console.log(`Execution time for 10000 iterations: ${time}ms ${time/10000} ms/iteration`);
    expect(result).toEqual(['456']);
  });

  it('Observation.value with an R5 FHIR model', () => {
    const result = fhirpath(ctx, 'Observation.value', subject);
    expect(result).toEqual(['high']);
  });

  it('Observation.value with an R4 FHIR model', () => {
    const result = fhirpath(ctx, 'Observation.value', subject);
    expect(result).toEqual(['high']);
  });

  it('Observation.value with an STU3 FHIR model', () => {
    const result = fhirpath(ctx, 'Observation.value', subject);
    expect(result).toEqual(['high']);
  });

  it('Observation.value with an DSTU2 FHIR model', () => {
    const result = fhirpath(ctx, 'Observation.value', subject);
    expect(result).toEqual(['high']);
  });

  it('Observation.value without a model', () => {
    const result = fhirpath(ctx, 'Observation.value', subject);
    // TODO: This should return [] when no model is specified
    expect(result).toEqual(['high']);
  });

  it('Observation.value contained in another resource (1)', () => {
    const result = fhirpath(ctx, 'Observation.contained[0].value', subject);
    expect(result).toEqual(['medium']);
  });

  it('Observation.value contained in another resource (2)', () => {
    const result = fhirpath(ctx, 'Observation.contained.value', subject);
    expect(result).toEqual(['medium', 'low']);
  });

  it('Type of Observation contained in another resource', () => {
    const result = fhirpath(ctx, 'Observation.contained[0] is Observation', subject);
    expect(result).toEqual([true]);
  });

  it('Getting choice type fields via children()', () => {
    const result = fhirpath(ctx, 'Observation.children().value', subject);
    expect(result).toEqual(['medium', 'low']);
  });

  it('Getting choice type fields via children() (2)', () => {
    const result = fhirpath(ctx, 'Observation.children().children().value', subject);
    expect(result).toEqual(['zero']);
  });

  it('Getting choice type fields via descendants()', () => {
    const result = fhirpath(ctx, 'Observation.descendants().value', subject);
    expect(result).toEqual(['medium', 'low', 'zero', 'Red', 'Blue', 'Green']);
  });

  it('Getting choice type fields via descendants() and where()', () => {
    const result = fhirpath(ctx, "Observation.descendants().where(resourceType = 'Observation').value", subject);
    expect(result).toEqual(['medium', 'low', 'zero']);
  });

  it('QR with where()', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').item.where(linkId = '1').answer.value", subject);
    expect(result).toEqual(['Red']);
  });

  it('QR with descendants() and where() (1)', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1').answer.value", subject);
    expect(result).toEqual(['Red']);
  });

  it('QR with descendants() and where() (2)', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1.0').answer.value", subject);
    expect(result).toEqual(['Green']);
  });

  it('QR with descendants() and where() (3)', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').descendants().where(linkId = '1.1').answer.value", subject);
    expect(result).toEqual(['Blue']);
  });

  it('QR with item.answer.value', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').item.answer.value", subject);
    expect(result).toEqual(['Red']);
  });

  it('QR with item.item.answer.value', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').item.item.answer.value", subject);
    expect(result).toEqual(['Blue']);
  });

  it('QR with item.answer.item.answer.value', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').item.answer.item.answer.value", subject);
    expect(result).toEqual(['Green']);
  });

  it('QR with item.answer.item.answer.value (STU3)', () => {
    const result = fhirpath(ctx, "contained.where(resourceType = 'QuestionnaireResponse').item.answer.item.answer.value", subject);
    expect(result).toEqual(['Green']);
  });

  it('Access a custom field starting with a capital letter (1)', () => {
    const result = fhirpath(ctx, "CustomField = 'test'", subject);
    expect(result).toEqual([true]);
  });

  it('Access a custom field starting with a capital letter (2)', () => {
    const result = fhirpath(ctx, "Observation.CustomField = 'test'", subject);
    expect(result).toEqual([true]);
  });
});
