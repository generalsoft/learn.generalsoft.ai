import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Guards the "one request funnel" rule: the AI training quote form at /quote is
 * the only place a visitor can submit a request, and every other request-style
 * call to action hands off to it.
 */
const srcDir = fileURLToPath(new URL('..', import.meta.url));

function sourceFiles(dir: string = srcDir): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...sourceFiles(fullPath));
    } else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const read = (relativePath: string): string => readFileSync(join(srcDir, relativePath), 'utf8');

describe('single request funnel', () => {
  it('no longer ships the old request forms', () => {
    for (const removed of [
      'components/LeadForm.tsx',
      'components/CompanyTrainingRequestForm.tsx',
      'components/CourseInterestForm.tsx',
    ]) {
      expect(existsSync(join(srcDir, removed)), `${removed} should be deleted`).toBe(false);
    }
  });

  it('does not reference the removed forms anywhere else in the source', () => {
    const offenders = sourceFiles()
      .filter((file) => /LeadForm|CompanyTrainingRequestForm|CourseInterestForm/.test(readFileSync(file, 'utf8')))
      .map((file) => file.replace(srcDir, ''));

    expect(offenders).toEqual([]);
  });

  it('exposes the quote request submit function as the only request writer', () => {
    const api = read('services/api.ts');

    expect(api).toContain('export async function submitTrainingQuoteRequest');
    for (const removed of [
      'submitLead',
      'submitCompanyTrainingRequest',
      'submitCourseInterest',
      'resendInterestVerification',
      'sendMessage',
    ]) {
      expect(api, `${removed} should be gone from the API client`).not.toContain(removed);
    }
  });

  it('highlights the quote request in every persistent CTA placement', () => {
    const placements: Array<[string, string]> = [
      ['components/Navbar.tsx', 'navbar'],
      ['components/Footer.tsx', 'footer'],
      ['components/FinalCTA.tsx', 'final_cta'],
      ['components/FloatingContact.tsx', 'floating_button'],
    ];

    for (const [file, source] of placements) {
      const content = read(file);
      expect(content, `${file} should link to the quote form`).toMatch(/getQuoteRequestPath\(|\/quote/);
      expect(content, `${file} should report its analytics source`).toContain(`trackQuoteRequestClick('${source}'`);
    }
  });

  it('points every page-level request CTA at the quote form', () => {
    const pages = [
      'pages/Home.tsx',
      'pages/Business.tsx',
      'pages/Schools.tsx',
      'pages/Contact.tsx',
      'pages/Curriculum.tsx',
      'pages/Rakez.tsx',
      'pages/Courses.tsx',
      'pages/CourseDetail.tsx',
      'pages/ComplimentarySession.tsx',
      'pages/AIReadiness.tsx',
    ];

    for (const page of pages) {
      const content = read(page);
      expect(content, `${page} should hand off to the quote form`).toMatch(
        /getQuoteRequestPath\(|QuoteRequestCTA/
      );
      expect(content, `${page} should not post to a removed request form`).not.toMatch(
        /trackLeadClick|trackCourseEnquiry|trackCompanyRequest|trackInterest/
      );
    }
  });

  it('keeps course enrolment separate from the request funnel', () => {
    // Registration (a verified seat) is not a request, so it survives untouched.
    const api = read('services/api.ts');
    expect(api).toContain("const REGISTRATIONS_COLLECTION = 'registrations'");
    expect(api).toContain("const QUOTE_REQUESTS_COLLECTION = 'quoteRequests'");
    expect(api).toContain('export async function registerParticipant');
  });
});
