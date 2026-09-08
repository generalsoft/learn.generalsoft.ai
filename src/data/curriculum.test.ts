import { describe, it, expect } from 'vitest';
import { curriculum, curriculumDomains, getGrade } from './curriculum.js';

describe('UAE AI Curriculum Framework', () => {
  it('covers every grade level from KG to Grade 12', () => {
    expect(curriculum.map((g) => g.grade)).toEqual([
      'KG', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    ]);
  });

  it('defines the three core domains in order', () => {
    expect(curriculumDomains.map((d) => d.name)).toEqual([
      'AI Foundations and Core Principles',
      'Responsible and Ethical AI',
      'AI Applications, Innovation, and Practice',
    ]);
  });

  it('defines exactly seven learning strands', () => {
    const strands = curriculumDomains.flatMap((d) => d.strands);
    expect(strands).toHaveLength(7);
    expect(strands).toContain('Foundations and Fundamentals of AI');
    expect(strands).toContain('Data, Algorithms, and Machine Learning');
    expect(strands).toContain('Ethics, Bias, and Fairness in AI');
    expect(strands).toContain('AI Policies, and Accountability');
    expect(strands).toContain('AI Applications in Society and Industry');
    expect(strands).toContain('Innovation and Projects Design');
    expect(strands).toContain('Usage of AI Tools');
  });

  it('ensures every standard has at least one non-empty learning outcome', () => {
    for (const g of curriculum) {
      for (const d of g.domains) {
        for (const s of d.strands) {
          for (const std of s.standards) {
            expect(std.standard.length).toBeGreaterThan(0);
            expect(std.outcomes.length).toBeGreaterThan(0);
            for (const outcome of std.outcomes) {
              expect(outcome.length).toBeGreaterThan(0);
            }
          }
        }
      }
    }
  });

  it('resolves grades by code and returns undefined for unknown codes', () => {
    expect(getGrade('KG')?.label).toBe('Kindergarten');
    expect(getGrade('01')?.label).toBe('Grade 1');
    expect(getGrade('12')?.label).toBe('Grade 12');
    expect(getGrade('unknown')).toBeUndefined();
  });
});
