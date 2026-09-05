import { describe, it, expect } from 'vitest';
import { isValidEmail, EMAIL_REGEX } from './validation';

describe('isValidEmail', () => {
  it('accepts valid addresses with a TLD', () => {
    expect(isValidEmail('abid@nasim.com')).toBe(true);
    expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    expect(isValidEmail('first.last@sub.domain.org')).toBe(true);
  });

  it('rejects addresses missing a domain dot (TLD)', () => {
    expect(isValidEmail('abid@nasim')).toBe(false);
    expect(isValidEmail('user@localhost')).toBe(false);
  });

  it('rejects malformed addresses', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('foo bar@example.com')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
  });

  it('trims surrounding whitespace before validating', () => {
    expect(isValidEmail('  name@example.com  ')).toBe(true);
  });

  it('exposes a regex matching the backend rules', () => {
    expect(EMAIL_REGEX.test('abid@nasim')).toBe(false);
    expect(EMAIL_REGEX.test('abid@nasim.com')).toBe(true);
  });
});
