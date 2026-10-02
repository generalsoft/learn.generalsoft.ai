import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QuoteRequest from './QuoteRequest';
import { QUOTE_ORGANISATION_TYPES, QUOTE_TOPICS } from '../data/quoteForm';
import { MAX_PREFERRED_DATES } from '../services/quoteRequest';

/**
 * Smoke test for the Firestore-backed quote request page. `renderToStaticMarkup`
 * runs the component in Node (no DOM required) so a render-time regression — a
 * missing import, bad JSX nesting or a broken option list — fails here rather
 * than only in the browser.
 *
 * React warns that react-router's `useLayoutEffect` is a no-op on the server.
 * The warning is expected for this DOM-free environment, so it is filtered out
 * to keep CI output readable.
 */
const originalConsoleError = console.error;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect does nothing on the server')) {
      return;
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

const render = (entry = '/quote'): string =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[entry]}>
      <QuoteRequest />
    </MemoryRouter>
  );

const occurrences = (html: string, needle: string): number => html.split(needle).length - 1;

describe('QuoteRequest page', () => {
  it('renders the hero copy from the standalone quote page', () => {
    const html = render();
    expect(html).toContain('Bring an AI educator to your team or classroom');
    expect(html).toContain('Request an AI training quote');
  });

  it('renders every question section', () => {
    const html = render();
    for (const heading of [
      'Who is this for?',
      'What should we teach?',
      'Who is attending?',
      'When would you like it?',
      'Your request',
    ]) {
      expect(html, `missing section: ${heading}`).toContain(heading);
    }
  });

  it('renders the four organisation types and every topic chip', () => {
    const html = render();
    expect(occurrences(html, 'name="organisationType"')).toBe(QUOTE_ORGANISATION_TYPES.length);
    for (const option of QUOTE_ORGANISATION_TYPES) {
      expect(html).toContain(`value="${option.value}"`);
      expect(html).toContain(option.label);
    }
    expect(occurrences(html, 'name="topic"')).toBe(QUOTE_TOPICS.length);
    for (const topic of QUOTE_TOPICS) {
      expect(html).toContain(topic.replace(/&/g, '&amp;'));
    }
  });

  it('wires the summary aside button to the form in the document', () => {
    const html = render();
    expect(html).toContain('id="quote-form"');
    expect(html).toContain('form="quote-form"');
    expect(html).toContain('Request my quote');
  });

  it('submits to Firestore rather than a mailto fallback', () => {
    const html = render();
    expect(html).not.toContain('mailto:training@');
    // The submit control is a plain button so React owns validation + Firestore.
    expect(html).toContain('type="submit"');
  });

  it('keeps the honeypot field hidden from humans', () => {
    const html = render();
    expect(html).toContain('id="quote-website"');
    expect(html).toContain('tabindex="-1"');
  });

  it('defaults to English and offers the Arabic switch', () => {
    const html = render();
    expect(html).toContain('dir="ltr"');
    expect(html).toContain('العربية');
    expect(html).toContain(`up to ${MAX_PREFERRED_DATES} preferred dates`);
  });

  it('renders the month calendar with disabled past days', () => {
    const html = render();
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    expect(occurrences(html, 'aspect-square')).toBe(daysInMonth);
    expect(html).toContain('aria-label="Previous month"');
    expect(html).toContain('aria-label="Next month"');
    expect(html).toContain('aria-pressed="false"');
    if (now.getDate() > 1) {
      // Earlier days of the current month cannot be selected.
      expect(html).toContain('disabled=""');
    }
  });

  it('renders an empty preferred-date summary until dates are chosen', () => {
    const html = render();
    expect(html).toContain('Not set');
    expect(html).toContain('None chosen yet');
  });

  it('selects the chip when a call to action hands over a known topic', () => {
    const html = render('/quote?topic=Prompt%20engineering');
    expect(html).toContain('name="topic" class="sr-only" checked="" value="Prompt engineering"');
    expect(html).toContain('Prompt engineering');
  });

  it('prefills the custom topic field when the handed-over topic is not a chip', () => {
    const html = render('/quote?topic=AI%20for%20our%20customer%20support%20team');
    expect(html).toContain('value="AI for our customer support team"');
    // The summary proves the prefilled topic counts as a selection.
    expect(html).toContain('AI for our customer support team');
    expect(html).not.toContain('None chosen yet');
  });
});
