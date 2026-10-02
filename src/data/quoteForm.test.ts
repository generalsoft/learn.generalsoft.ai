import { describe, it, expect } from 'vitest';
import {
  QUOTE_AUDIENCES,
  QUOTE_DELIVERY_MODES,
  QUOTE_EXPERIENCE_LEVELS,
  QUOTE_ORGANISATION_TYPES,
  QUOTE_SESSION_LENGTHS,
  QUOTE_TOPICS,
} from './quoteForm';
import { ARABIC_STRINGS, localeFor, translate } from './quoteFormStrings';

/** Every value the page can display inside an option list / chip / summary row. */
const OPTION_LABELS = [
  ...QUOTE_ORGANISATION_TYPES.map((option) => option.label),
  ...QUOTE_TOPICS,
  ...QUOTE_EXPERIENCE_LEVELS,
  ...QUOTE_AUDIENCES,
  ...QUOTE_DELIVERY_MODES,
  ...QUOTE_SESSION_LENGTHS,
];

describe('quote form options', () => {
  it('matches the topics advertised on the quote page', () => {
    expect(QUOTE_TOPICS).toHaveLength(12);
    expect(QUOTE_TOPICS).toContain('AI fundamentals');
    expect(QUOTE_TOPICS).toContain('Coding with AI');
  });

  it('keeps the organisation types in the order shown on the page', () => {
    expect(QUOTE_ORGANISATION_TYPES.map((option) => option.value)).toEqual([
      'company',
      'rakez',
      'school',
      'other',
    ]);
  });

  it('offers "Other" plus a fallback option in every select', () => {
    expect(QUOTE_EXPERIENCE_LEVELS).toContain('Mixed levels');
    expect(QUOTE_AUDIENCES).toContain('Mixed');
    expect(QUOTE_DELIVERY_MODES).toContain('Either works');
    expect(QUOTE_SESSION_LENGTHS).toContain('Not sure yet');
  });
});

describe('Arabic translation of the quote page', () => {
  it('translates every selectable option and chip', () => {
    for (const label of OPTION_LABELS) {
      expect(ARABIC_STRINGS[label], `missing Arabic for "${label}"`).toBeTruthy();
    }
  });

  it('translates the section headings, summary rows and buttons', () => {
    const labels = [
      'Bring an AI educator to your team or classroom',
      'Who is this for?',
      'What should we teach?',
      'Who is attending?',
      'When would you like it?',
      'Your request',
      'Request my quote',
      'Your reference:',
      'Request received',
      'For',
      'Topics',
      'Learners',
      'Delivery',
      'Preferred dates',
      'Length',
    ];
    for (const label of labels) {
      expect(ARABIC_STRINGS[label], `missing Arabic for "${label}"`).toBeTruthy();
    }
  });

  it('translates the validation messages raised by the page', () => {
    for (const label of [
      'Enter your organisation name.',
      'Enter a contact name.',
      'Enter a valid email address.',
      'Please choose at least one topic or describe your own.',
    ]) {
      expect(ARABIC_STRINGS[label], `missing Arabic for "${label}"`).toBeTruthy();
    }
  });

  it('returns the English source string when the language is English', () => {
    expect(translate('en', 'Company')).toBe('Company');
  });

  it('translates known strings and falls back for unknown ones', () => {
    expect(translate('ar', 'Company')).toBe('شركة');
    expect(translate('ar', 'Not a real label')).toBe('Not a real label');
  });

  it('resolves the date locale used by the calendar and summary', () => {
    expect(localeFor('en')).toBe('en-GB');
    expect(localeFor('ar')).toBe('ar-AE');
  });
});
