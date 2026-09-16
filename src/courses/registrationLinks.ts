import { site } from '../data/site';

/**
 * Base path of the short, permanent registration links we email out. Shared
 * with the router (see `App.tsx`) so the advertised link and the route that
 * serves it can never drift apart.
 */
export const REGISTRATION_FORM_BASE_PATH = '/register';

/**
 * Fragment id of the registration form block on a course page.
 *
 * The course page renders the form container with this id, and the permanent
 * registration link we email out ends with it (`/courses/<slug>#register`), so
 * both sides read the value from here to stay in sync.
 */
export const REGISTRATION_FORM_ANCHOR = 'register';

/**
 * Path of the short, permanent, email-friendly registration link for a course.
 *
 * `/register/<slug>` redirects to `/courses/<slug>#register`, which lands the
 * visitor directly on the registration form. Unlike the tokenised verification
 * links this path never expires and carries no participant data, so it is safe
 * to paste into outreach emails or documents.
 */
export function getRegistrationFormPath(slug: string): string {
  return `${REGISTRATION_FORM_BASE_PATH}/${slug}`;
}

/** Absolute registration link (with the site domain) for emails and print. */
export function getRegistrationFormUrl(slug: string): string {
  return `${site.domain}${getRegistrationFormPath(slug)}`;
}
