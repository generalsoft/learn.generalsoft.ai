/**
 * Pure helpers for the AI training quote request page (`/quote`).
 *
 * Kept free of React and Firestore imports so the reference format, preferred
 * slot formatting and field validation can be unit tested directly (see
 * `quoteRequest.test.ts`).
 */

import type { QuotePreferredSlot } from '../types';
import { isValidEmail } from './validation';

/** Maximum number of preferred dates a prospect may select on the calendar. */
export const MAX_PREFERRED_DATES = 5;

/**
 * Reference alphabet with ambiguous characters removed (no I/O/0/1) so a
 * reference read out over the phone cannot be mistyped.
 */
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const pad = (value: number): string => String(value).padStart(2, '0');

/**
 * Builds the human-readable reference quoted on the confirmation screen and
 * stored on the Firestore document, e.g. `GS-260930-K7QP`.
 *
 * `date` and `random` are injectable so the output is deterministic in tests.
 */
export function generateQuoteReference(
  date: Date = new Date(),
  random: () => number = Math.random
): string {
  let suffix = '';
  for (let i = 0; i < 4; i += 1) {
    suffix += REFERENCE_ALPHABET[Math.floor(random() * REFERENCE_ALPHABET.length)];
  }

  return `GS-${String(date.getFullYear()).slice(2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${suffix}`;
}

/** Serialises a local date to the ISO `YYYY-MM-DD` form used for calendar days. */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Strips the time component so "today" comparisons are calendar based. */
export function startOfToday(now: Date = new Date()): Date {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return today;
}

const isValidIsoDate = (value: string): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00`).getTime());

/** Formats one preferred slot, e.g. "Mon, 5 Oct 2026, 09:00–13:00". */
export function formatPreferredSlot(slot: QuotePreferredSlot, locale = 'en-GB'): string {
  const day = isValidIsoDate(slot.date)
    ? new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(`${slot.date}T00:00`))
    : slot.date;

  return `${day}, ${slot.start}–${slot.end}`;
}

/** Errors keyed by the form field they belong to (empty object means valid). */
export interface QuoteFieldErrors {
  organisation?: string;
  contactName?: string;
  email?: string;
  topics?: string;
}

export interface QuoteValidationInput {
  organisation: string;
  contactName: string;
  email: string;
  topics: string[];
}

/**
 * Validates the required quote request fields. Mirrors the backend/rules email
 * pattern via `isValidEmail` and returns one message per invalid field so the
 * page can show inline errors instead of a blocking `alert()`.
 */
export function validateQuoteRequest(input: QuoteValidationInput): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};

  if (!input.organisation.trim()) {
    errors.organisation = 'Enter your organisation name.';
  }

  if (!input.contactName.trim()) {
    errors.contactName = 'Enter a contact name.';
  }

  if (!isValidEmail(input.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (input.topics.length === 0) {
    errors.topics = 'Please choose at least one topic or describe your own.';
  }

  return errors;
}

/**
 * Normalises preferred slots: de-duplicated, sorted by date, and carrying the
 * chosen start/end times.
 */
export function buildPreferredSlots(
  dates: string[],
  start: string,
  end: string
): QuotePreferredSlot[] {
  return [...new Set(dates)]
    .filter(isValidIsoDate)
    .sort()
    .map((date) => ({ date, start, end }));
}
