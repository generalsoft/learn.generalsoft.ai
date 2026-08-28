import { describe, it, expect } from 'vitest';
import { courses, getCourseBySlug, getCourseById } from './courseData.js';
import { getCourseMaterials } from './courseMaterials.js';

describe('Course Catalog and Configuration', () => {
  it('should contain the AI Soup to Nuts course', () => {
    expect(courses.length).toBeGreaterThan(0);
    const aiCourse = courses[0];
    expect(aiCourse.id).toBe('ai-soup-to-nuts');
    expect(aiCourse.slug).toBe('ai-soup-to-nuts');
    expect(aiCourse.pricing.individualPrice).toBe(0);
    expect(aiCourse.pricing.companyPrice).toBe(400);
  });

  it('should load correctly by slug and ID helpers', () => {
    const courseBySlug = getCourseBySlug('ai-soup-to-nuts');
    expect(courseBySlug).toBeDefined();
    expect(courseBySlug?.id).toBe('ai-soup-to-nuts');

    const courseById = getCourseById('ai-soup-to-nuts');
    expect(courseById).toBeDefined();
    expect(courseById?.slug).toBe('ai-soup-to-nuts');

    expect(getCourseBySlug('unknown-slug')).toBeUndefined();
  });
});

describe('Course Materials', () => {
  it('returns a list for a known course slug', () => {
    expect(Array.isArray(getCourseMaterials('ai-soup-to-nuts'))).toBe(true);
  });

  it('returns an empty list for unknown slugs', () => {
    expect(getCourseMaterials('unknown-slug')).toEqual([]);
  });

  it('never exposes hidden/placeholder files and always provides a URL', () => {
    for (const material of getCourseMaterials('ai-soup-to-nuts')) {
      expect(material.name.startsWith('.')).toBe(false);
      expect(material.url).toBeTruthy();
      expect(material.slug).toBe('ai-soup-to-nuts');
    }
  });
});
