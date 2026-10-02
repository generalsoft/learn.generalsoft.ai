import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QuoteRequestCTA from './QuoteRequestCTA';

/**
 * The funnel component that replaced every embedded request form. Rendered in
 * Node with `renderToStaticMarkup` (react-router's `useLayoutEffect` warning is
 * expected there and filtered out).
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

const render = (props: ComponentProps<typeof QuoteRequestCTA>): string =>
  renderToStaticMarkup(
    <MemoryRouter>
      <QuoteRequestCTA {...props} />
    </MemoryRouter>
  );

describe('QuoteRequestCTA', () => {
  it('renders the highlighted call to action and links to the quote form', () => {
    const html = render({ source: 'unit_test' });

    expect(html).toContain('Request your AI training quote');
    expect(html).toContain('href="/quote"');
    expect(html).toContain('The fast way to get a quote');
    expect(html).toContain('Request my quote');
    expect(html).toContain('No payment now');
  });

  it('hands the promised programme over to the quote form', () => {
    const html = render({ source: 'unit_test', topic: 'AI for Teachers', ctaLabel: 'Request a Quote' });

    expect(html).toContain('href="/quote?topic=AI%20for%20Teachers"');
    expect(html).toContain('Request a Quote');
    expect(html).toContain('Topic pre-filled:');
  });

  it('accepts a custom heading and description for page-specific copy', () => {
    const html = render({
      source: 'unit_test',
      heading: 'Request This Programme',
      description: 'This cohort is closed.',
    });

    expect(html).toContain('Request This Programme');
    expect(html).toContain('This cohort is closed.');
  });
});
