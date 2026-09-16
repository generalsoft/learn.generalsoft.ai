import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

/**
 * learn.generalsoft.ai is served as static files from GitHub Pages, so a deep
 * link — such as the permanent registration link we email out
 * (`/register/ai-without-fear`) — is answered by `404.html`, which rewrites the
 * URL and lets the script in `index.html` restore the intended route before
 * React Router boots.
 *
 * These tests execute both scripts exactly as the browser would, so a change
 * that silently breaks emailed or shared links fails here rather than in
 * production.
 */
const inlineScripts = (html: string, marker?: string): string =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1])
    .filter((script) => !marker || script.includes(marker))
    .join('\n;\n');

const readHtml = (relativePath: string): string =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

const fallbackScript = inlineScripts(readHtml('../../public/404.html'));
const restoreScript = inlineScripts(readHtml('../../index.html'), 'history.replaceState');

/** URL the browser is sent to after GitHub Pages has served 404.html. */
function rewriteToFallbackUrl(target: string): string {
  const url = new URL(target);
  let rewritten = '';

  new Function('window', fallbackScript)({
    location: {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      replace(value: string) {
        rewritten = value;
      },
    },
  });

  return rewritten;
}

/** Route (path + query + fragment) the single-page app actually renders. */
function restoreRoute(rewritten: string): string {
  const url = new URL(rewritten);
  let restored: string | null = null;

  new Function('window', restoreScript)({
    location: { pathname: url.pathname, search: url.search, hash: url.hash },
    history: {
      replaceState(_state: unknown, _title: unknown, next: string) {
        restored = next;
      },
    },
  });

  return (restored as string | null) ?? `${url.pathname}${url.search}${url.hash}`;
}

const resolveDeepLink = (target: string): string => restoreRoute(rewriteToFallbackUrl(target));

describe('GitHub Pages deep-link fallback', () => {
  it('rewrites the requested path behind the "/?/" separator index.html decodes', () => {
    expect(rewriteToFallbackUrl('https://learn.generalsoft.ai/register/ai-without-fear')).toBe(
      'https://learn.generalsoft.ai/?/register/ai-without-fear'
    );
  });

  it('restores the emailed registration link on a first visit', () => {
    expect(resolveDeepLink('https://learn.generalsoft.ai/register/ai-without-fear')).toBe(
      '/register/ai-without-fear'
    );
  });

  it('restores a course page with its registration anchor and tracking query', () => {
    expect(resolveDeepLink('https://learn.generalsoft.ai/courses/ai-without-fear#register')).toBe(
      '/courses/ai-without-fear#register'
    );
    expect(
      resolveDeepLink('https://learn.generalsoft.ai/courses/ai-without-fear?utm_source=email#register')
    ).toBe('/courses/ai-without-fear?utm_source=email#register');
  });

  it('restores verification-email links with their token query intact', () => {
    expect(resolveDeepLink('https://learn.generalsoft.ai/verify?token=abc123')).toBe(
      '/verify?token=abc123'
    );
    expect(
      resolveDeepLink(
        'https://learn.generalsoft.ai/verify?state=verified&rid=ai-without-fear__a%40b.com&course=ai-without-fear'
      )
    ).toBe('/verify?state=verified&rid=ai-without-fear__a%40b.com&course=ai-without-fear');
  });
});
