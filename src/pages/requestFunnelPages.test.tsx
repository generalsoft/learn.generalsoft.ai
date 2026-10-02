import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import Business from './Business';
import Schools from './Schools';
import Contact from './Contact';
import ComplimentarySession from './ComplimentarySession';
import AIReadiness from './AIReadiness';
import Rakez from './Rakez';
import Curriculum from './Curriculum';
import Courses from './Courses';

/**
 * Every page that used to host its own request form must now hand the visitor
 * to the single quote request funnel. Rendering them in Node (no DOM needed)
 * fails here if a page loses that hand-off or throws while rendering.
 *
 * react-router's `useLayoutEffect` server warning is expected and filtered out.
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

const render = (element: ReactElement): string =>
  renderToStaticMarkup(<MemoryRouter>{element}</MemoryRouter>);

const business = <Business key="business" />;
const schools = <Schools key="schools" />;
const contact = <Contact key="contact" />;
const complimentary = <ComplimentarySession key="complimentary" />;
const readiness = <AIReadiness key="readiness" />;
const rakez = <Rakez key="rakez" />;
const curriculum = <Curriculum key="curriculum" />;
const courses = <Courses key="courses" />;

/** Every page whose call to action must hand off to the quote form. */
const pages: Array<[string, ReactElement]> = [
  ['AI for Business', business],
  ['AI for Schools', schools],
  ['Contact', contact],
  ['Complimentary Session', complimentary],
  ['AI Readiness', readiness],
  ['RAKEZ', rakez],
  ['Curriculum', curriculum],
  ['Courses', courses],
];

/** Pages that used to host their own request form, now hosting the panel. */
const panelPages: Array<[string, ReactElement]> = [
  ['AI for Business', business],
  ['AI for Schools', schools],
  ['Contact', contact],
  ['Complimentary Session', complimentary],
  ['AI Readiness', readiness],
  ['RAKEZ', rakez],
];

describe('pages that funnel into the quote request', () => {
  for (const [name, element] of pages) {
    it(`${name} renders and links to /quote`, () => {
      const html = render(element);

      expect(html, `${name} should link to the quote form`).toContain('/quote');
      expect(html.length).toBeGreaterThan(500);
    });
  }

  for (const [name, element] of panelPages) {
    it(`${name} shows the highlighted request panel`, () => {
      const html = render(element);

      // The highlighted panel (gradient border + badge) replaced the removed
      // consultation / session / readiness / enquiry forms on these pages.
      expect(html, `${name} should render the highlighted quote panel`).toContain(
        'The fast way to get a quote'
      );
    });
  }
});
