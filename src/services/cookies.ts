/**
 * Minimal cookie helpers used to remember the Firestore registration document
 * id on the client so the course page can skip the registration form once the
 * email has been verified.
 */

export const REGISTRATION_COOKIE = 'gs_registration_id';

export function setCookie(
  name: string,
  value: string,
  days: number = 365
): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const encodedName = encodeURIComponent(name);
  const encodedValue = encodeURIComponent(value);
  const maxAge = days * 24 * 60 * 60;

  document.cookie = `${encodedName}=${encodedValue}; expires=${expires.toUTCString()}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const prefix = `${name}=`;
  const parts = document.cookie.split(';');

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      const rawValue = trimmed.substring(prefix.length);
      try {
        return decodeURIComponent(rawValue);
      } catch {
        return rawValue;
      }
    }
  }

  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;

  const encodedName = encodeURIComponent(name);
  document.cookie = `${encodedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/; SameSite=Lax`;
}