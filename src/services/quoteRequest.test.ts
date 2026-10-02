import { describe, it, expect } from 'vitest';
import {
  MAX_PREFERRED_DATES,
  buildPreferredSlots,
  formatPreferredSlot,
  generateQuoteReference,
  getQuoteRequestPath,
  readPrefilledTopic,
  toIsoDate,
  validateQuoteRequest,
} from './quoteRequest';

describe('generateQuoteReference', () => {
  it('formats the reference as GS-YYMMDD-XXXX', () => {
    expect(generateQuoteReference(new Date(2026, 8, 30), () => 0)).toBe('GS-260930-AAAA');
  });

  it('pads single digit months and days', () => {
    expect(generateQuoteReference(new Date(2026, 0, 5), () => 0)).toBe('GS-260105-AAAA');
  });

  it('only uses unambiguous characters in the random suffix', () => {
    const suffix = generateQuoteReference(new Date(2026, 0, 5), () => 0.999999).split('-')[2];
    expect(suffix).toMatch(/^[A-HJ-NP-Z2-9]{4}$/);
    expect(suffix).not.toMatch(/[IO01]/);
  });

  it('produces a different suffix for different random values', () => {
    const first = generateQuoteReference(new Date(2026, 0, 5), () => 0);
    const second = generateQuoteReference(new Date(2026, 0, 5), () => 0.5);
    expect(first).not.toBe(second);
  });
});

describe('toIsoDate', () => {
  it('serialises a local date without a time component', () => {
    expect(toIsoDate(new Date(2026, 9, 5))).toBe('2026-10-05');
    expect(toIsoDate(new Date(2026, 11, 31))).toBe('2026-12-31');
  });
});

describe('formatPreferredSlot', () => {
  it('renders the day and the chosen time range', () => {
    const formatted = formatPreferredSlot(
      { date: '2026-10-05', start: '09:00', end: '13:00' },
      'en-GB'
    );
    expect(formatted).toContain('2026');
    expect(formatted).toContain('09:00–13:00');
    expect(formatted).toContain('Oct');
  });

  it('falls back to the raw date when it cannot be parsed', () => {
    expect(formatPreferredSlot({ date: 'not-a-date', start: '09:00', end: '13:00' })).toBe(
      'not-a-date, 09:00–13:00'
    );
  });
});

describe('buildPreferredSlots', () => {
  it('sorts, de-duplicates and attaches the chosen times', () => {
    expect(
      buildPreferredSlots(['2026-10-07', '2026-10-05', '2026-10-07'], '09:00', '13:00')
    ).toEqual([
      { date: '2026-10-05', start: '09:00', end: '13:00' },
      { date: '2026-10-07', start: '09:00', end: '13:00' },
    ]);
  });

  it('drops malformed dates', () => {
    expect(buildPreferredSlots(['2026-13-40', 'today', ''], '09:00', '13:00')).toEqual([]);
  });
});

describe('validateQuoteRequest', () => {
  const valid = {
    organisation: 'Generalsoft',
    contactName: 'Aisha Khan',
    email: 'aisha@example.com',
    topics: ['AI fundamentals'],
  };

  it('accepts a complete request', () => {
    expect(validateQuoteRequest(valid)).toEqual({});
  });

  it('requires an organisation name', () => {
    expect(validateQuoteRequest({ ...valid, organisation: '   ' })).toHaveProperty('organisation');
  });

  it('requires a contact name', () => {
    expect(validateQuoteRequest({ ...valid, contactName: '' })).toHaveProperty('contactName');
  });

  it('requires a valid email address', () => {
    expect(validateQuoteRequest({ ...valid, email: 'aisha@example' })).toHaveProperty('email');
  });

  it('requires at least one topic', () => {
    expect(validateQuoteRequest({ ...valid, topics: [] })).toHaveProperty('topics');
  });

  it('reports every invalid field at once', () => {
    const errors = validateQuoteRequest({
      organisation: '',
      contactName: '',
      email: 'nope',
      topics: [],
    });
    expect(Object.keys(errors).sort()).toEqual(['contactName', 'email', 'organisation', 'topics']);
  });
});

describe('MAX_PREFERRED_DATES', () => {
  it('matches the "up to 5 preferred dates" promise on the page', () => {
    expect(MAX_PREFERRED_DATES).toBe(5);
  });
});

describe('getQuoteRequestPath', () => {
  it('points at the quote form and encodes any promised topic', () => {
    expect(getQuoteRequestPath()).toBe('/quote');
    expect(getQuoteRequestPath('   ')).toBe('/quote');
    expect(getQuoteRequestPath('AI fundamentals')).toBe('/quote?topic=AI%20fundamentals');
    expect(getQuoteRequestPath('Prompt engineering & ChatGPT')).toBe(
      '/quote?topic=Prompt%20engineering%20%26%20ChatGPT'
    );
  });
});

describe('readPrefilledTopic', () => {
  it('reads the topic handed over by a call to action', () => {
    expect(readPrefilledTopic('topic=AI%20for%20Teachers')).toBe('AI for Teachers');
    expect(readPrefilledTopic('?topic=Prompt+engineering')).toBe('Prompt engineering');
  });

  it('returns an empty string when no topic was passed', () => {
    expect(readPrefilledTopic('')).toBe('');
    expect(readPrefilledTopic('utm_source=newsletter')).toBe('');
    expect(readPrefilledTopic('topic=%20%20')).toBe('');
  });

  it('caps the prefilled topic so a huge URL cannot bloat the form', () => {
    const long = 'a'.repeat(500);
    expect(readPrefilledTopic(`topic=${long}`)).toHaveLength(120);
  });

  it('round-trips a topic through the path builder', () => {
    expect(readPrefilledTopic(getQuoteRequestPath('AI for Teachers').split('?')[1])).toBe(
      'AI for Teachers'
    );
  });
});
