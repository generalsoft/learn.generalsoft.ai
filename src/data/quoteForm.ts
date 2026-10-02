/**
 * Option lists for the AI training quote request page (`/quote`).
 *
 * The English labels double as the values persisted in Firestore (matching the
 * other lead forms on the site), and they are the keys looked up in the Arabic
 * dictionary in `quoteFormStrings.ts`.
 */

import type { QuoteOrganisationType } from '../types';

export interface QuoteOption<T extends string = string> {
  value: T;
  label: string;
}

/** "Who is this for?" radio group. */
export const QUOTE_ORGANISATION_TYPES: QuoteOption<QuoteOrganisationType>[] = [
  { value: 'company', label: 'Company' },
  { value: 'rakez', label: 'RAKEZ member' },
  { value: 'school', label: 'School' },
  { value: 'other', label: 'Other' },
];

/** "What should we teach?" selectable topics. */
export const QUOTE_TOPICS = [
  'AI fundamentals',
  'Generative AI & ChatGPT',
  'Prompt engineering',
  'AI for business productivity',
  'AI for marketing & content',
  'AI in education & lesson planning',
  'AI for teachers',
  'AI ethics & safety',
  'Data & analytics with AI',
  'Automation & AI agents',
  'AI strategy for leaders',
  'Coding with AI',
] as const;

export const QUOTE_EXPERIENCE_LEVELS = [
  'Beginners',
  'Some experience',
  'Advanced',
  'Mixed levels',
] as const;

export const QUOTE_AUDIENCES = [
  'Leadership / managers',
  'Staff / professionals',
  'Teachers / educators',
  'Students',
  'Mixed',
] as const;

export const QUOTE_DELIVERY_MODES = ['On-site at our location', 'Online', 'Either works'] as const;

export const QUOTE_SESSION_LENGTHS = [
  'Half day (3–4 hours)',
  'Full day',
  'Multi-day programme',
  'Short talk (1–2 hours)',
  'Not sure yet',
] as const;
