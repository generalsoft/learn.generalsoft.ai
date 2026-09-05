/**
 * Shared client-side validation helpers.
 *
 * Mirrors the server-side validation in `middleware/src/shared/validation.ts`
 * and the Firestore security-rules email matcher, so the same rules are
 * enforced in the browser as on the backend.
 */

// Requires a local part, an "@", a domain, and a dot (TLD) — e.g. rejects
// "abid@nasim" but accepts "abid@nasim.com".
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}
