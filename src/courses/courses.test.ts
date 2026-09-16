import { describe, it, expect } from 'vitest';
import { courses, getCourseBySlug, getCourseById } from './courseData.js';
import { getCourseMaterials, classifyMaterial } from './courseMaterials.js';
import {
  REGISTRATION_FORM_ANCHOR,
  REGISTRATION_FORM_BASE_PATH,
  getRegistrationFormPath,
  getRegistrationFormUrl,
} from './registrationLinks.js';
import { site } from '../data/site.js';

describe('Course Catalog and Configuration', () => {
  it('lists AI Under the Hood before AI Soup to Nuts', () => {
    expect(courses[0].id).toBe('ai-under-the-hood');
    expect(courses[1].id).toBe('ai-soup-to-nuts');
  });

  it('should contain the AI Soup to Nuts course', () => {
    expect(courses.length).toBeGreaterThan(0);
    const aiCourse = getCourseBySlug('ai-soup-to-nuts');
    expect(aiCourse?.id).toBe('ai-soup-to-nuts');
    expect(aiCourse?.slug).toBe('ai-soup-to-nuts');
    expect(aiCourse?.pricing.individualPrice).toBe(0);
    expect(aiCourse?.pricing.companyPrice).toBe(400);
    expect(aiCourse?.registrationStatus).toBe('Closed');
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

describe('Material classification', () => {
  it('classifies common file extensions into presentation kinds', () => {
    expect(classifyMaterial('html')).toBe('html');
    expect(classifyMaterial('htm')).toBe('html');
    expect(classifyMaterial('pdf')).toBe('pdf');
    expect(classifyMaterial('png')).toBe('image');
    expect(classifyMaterial('jpg')).toBe('image');
    expect(classifyMaterial('mp4')).toBe('video');
    expect(classifyMaterial('zip')).toBe('other');
    expect(classifyMaterial('')).toBe('other');
  });
});

describe('AI Under the Hood (upcoming) course', () => {
  it('is registered as an upcoming course with details to be announced', () => {
    const course = getCourseBySlug('ai-under-the-hood');
    expect(course).toBeDefined();
    expect(course?.registrationStatus).toBe('Upcoming');
    expect(course?.dates).toBe('To be announced');
    expect(course?.time).toBe('To be announced');
    expect(course?.pricing.individual).toBe('To be announced');
    expect(course?.pricing.company).toBe('To be announced');
  });

  it('auto-discovers the uploaded materials for the course', () => {
    const materials = getCourseMaterials('ai-under-the-hood');
    expect(materials.length).toBeGreaterThan(0);
    for (const material of materials) {
      expect(material.slug).toBe('ai-under-the-hood');
      expect(material.url).toBeTruthy();
    }
  });
});

describe('AI Without Fear (open for registration)', () => {
  it('is registered as an open two-hour session on Fridays and Saturdays', () => {
    const course = getCourseBySlug('ai-without-fear');
    expect(course).toBeDefined();
    expect(course?.id).toBe('ai-without-fear');
    expect(course?.registrationStatus).toBe('Open');
    expect(course?.duration).toBe('2 Hours (Single Session)');
    expect(course?.dates).toBe('Friday Sep 18 & Saturday Sep 19');
    expect(course?.time).toBe('4:00 PM – 6:00 PM');
    expect(course?.deliveryMethod).toBe('Online');
  });

  it('exposes pricing the registration form can price against', () => {
    const course = getCourseBySlug('ai-without-fear');
    expect(course?.pricing.individualPrice).toBe(0);
    expect(course?.pricing.companyPrice).toBe(400);
    expect(course?.pricing.currency).toBe('AED');
  });

  it('is resolvable by both slug and ID', () => {
    expect(getCourseBySlug('ai-without-fear')?.id).toBe('ai-without-fear');
    expect(getCourseById('ai-without-fear')?.slug).toBe('ai-without-fear');
  });

  it('auto-discovers the uploaded workshop materials', () => {
    const materials = getCourseMaterials('ai-without-fear');
    expect(materials.length).toBeGreaterThanOrEqual(3);
    for (const material of materials) {
      expect(material.slug).toBe('ai-without-fear');
      expect(material.url).toBeTruthy();
      expect(material.ext).toBe('pdf');
    }
  });
});

describe('Permanent registration links (emailed to participants)', () => {
  it('builds the short, absolute AI Without Fear registration link', () => {
    expect(getRegistrationFormPath('ai-without-fear')).toBe('/register/ai-without-fear');
    expect(REGISTRATION_FORM_BASE_PATH).toBe('/register');
    expect(getRegistrationFormPath('ai-without-fear')).toBe(
      `${REGISTRATION_FORM_BASE_PATH}/ai-without-fear`
    );
    expect(getRegistrationFormUrl('ai-without-fear')).toBe(`${site.domain}/register/ai-without-fear`);
    expect(getRegistrationFormUrl('ai-without-fear')).toBe(
      'https://learn.generalsoft.ai/register/ai-without-fear'
    );
  });

  it('keeps the course-page anchor and the emailed fragment in sync', () => {
    expect(REGISTRATION_FORM_ANCHOR).toBe('register');
    expect(`/courses/ai-without-fear#${REGISTRATION_FORM_ANCHOR}`).toBe(
      '/courses/ai-without-fear#register'
    );
  });

  it('offers a resolvable link for every open course', () => {
    const openCourses = courses.filter((course) => course.registrationStatus === 'Open');
    expect(openCourses.length).toBeGreaterThan(0);
    expect(openCourses.map((course) => course.slug)).toContain('ai-without-fear');

    for (const course of openCourses) {
      // The alias redirects to /courses/<slug>, so the slug must resolve.
      expect(getCourseBySlug(course.slug)?.id).toBe(course.id);
      expect(getRegistrationFormUrl(course.slug)).toBe(`${site.domain}/register/${course.slug}`);
    }
  });

  it('never leaks participant data into the permanent link', () => {
    // Registration links are shareable, so they must contain only the slug.
    expect(getRegistrationFormPath('ai-without-fear')).not.toContain('@');
    expect(getRegistrationFormPath('ai-without-fear')).not.toContain('?');
  });
});
