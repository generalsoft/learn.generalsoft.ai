import { describe, it, expect } from 'vitest';
import { faculty, getFacultyBySlug } from './faculty.js';

describe('Faculty directory', () => {
  it('starts with Abid Nasim as the first profile', () => {
    expect(faculty[0].slug).toBe('abid-nasim');
    expect(faculty[0].name).toBe('Abid Nasim');
    expect(faculty[0].title).toBe('Adjunct Faculty');
  });

  it('resolves a faculty member by slug and returns undefined for unknown slugs', () => {
    const member = getFacultyBySlug('abid-nasim');
    expect(member?.id).toBe('abid-nasim');
    expect(getFacultyBySlug('unknown-slug')).toBeUndefined();
  });

  it('keeps every slug unique', () => {
    const slugs = faculty.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
