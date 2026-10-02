import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TrainingQuoteRequestData } from '../types';

/**
 * Verifies the Firestore wiring for the AI training quote request page without
 * touching the network: the Firebase SDK is mocked so the test can inspect the
 * exact collection and document payload the page submits.
 */
const addDoc = vi.fn();
const serverTimestamp = vi.fn(() => 'SERVER_TIMESTAMP');
const collection = vi.fn((db: unknown, name: string) => ({ db, name }));

vi.mock('firebase/firestore', () => ({
  addDoc: (...args: unknown[]) => addDoc(...args),
  collection: (...args: unknown[]) => collection(...(args as [unknown, string])),
  serverTimestamp: () => serverTimestamp(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
}));

vi.mock('./firebase', () => ({ db: { projectId: 'learn-generalsoft-ai' } }));

import { submitTrainingQuoteRequest } from './api';

const sample: TrainingQuoteRequestData = {
  organisationType: 'rakez',
  organisation: '  Acme LLC  ',
  licence: '  RAK-123  ',
  contactName: '  Aisha Khan  ',
  email: '  Aisha@Example.com  ',
  phone: '  +971500000000  ',
  topics: ['AI fundamentals', 'AI for our customer support team'],
  learners: 25,
  level: 'Beginners',
  audience: 'Staff / professionals',
  delivery: 'Either works',
  location: '  RAKEZ, Ras Al Khaimah  ',
  preferredSlots: [{ date: '2026-10-05', start: '09:00', end: '13:00' }],
  startTime: '09:00',
  endTime: '13:00',
  sessionLength: 'Half day (3–4 hours)',
  notes: '  Bring laptops  ',
  language: 'en',
  reference: 'GS-260930-K7QP',
  website: '',
};

describe('submitTrainingQuoteRequest', () => {
  beforeEach(() => {
    addDoc.mockReset();
    addDoc.mockResolvedValue({ id: 'quote-doc-1' });
    collection.mockClear();
    serverTimestamp.mockClear();
  });

  it('writes the request to the quoteRequests collection', async () => {
    await submitTrainingQuoteRequest(sample);

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'quoteRequests');
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc.mock.calls[0][0]).toEqual({
      db: { projectId: 'learn-generalsoft-ai' },
      name: 'quoteRequests',
    });
  });

  it('maps the form fields, trims input and stamps the document', async () => {
    await submitTrainingQuoteRequest(sample);
    const payload = addDoc.mock.calls[0][1];

    expect(payload).toMatchObject({
      reference: 'GS-260930-K7QP',
      status: 'new',
      language: 'en',
      organisationType: 'rakez',
      organisation: 'Acme LLC',
      licence: 'RAK-123',
      contactName: 'Aisha Khan',
      email: 'Aisha@Example.com',
      emailNormalized: 'aisha@example.com',
      phone: '+971500000000',
      topics: ['AI fundamentals', 'AI for our customer support team'],
      learners: 25,
      level: 'Beginners',
      audience: 'Staff / professionals',
      delivery: 'Either works',
      location: 'RAKEZ, Ras Al Khaimah',
      preferredSlots: [{ date: '2026-10-05', start: '09:00', end: '13:00' }],
      startTime: '09:00',
      endTime: '13:00',
      sessionLength: 'Half day (3–4 hours)',
      notes: 'Bring laptops',
      createdAt: 'SERVER_TIMESTAMP',
    });
  });

  it('never persists the honeypot field', async () => {
    await submitTrainingQuoteRequest({ ...sample, website: 'http://spam.example' });
    expect(addDoc.mock.calls[0][1]).not.toHaveProperty('website');
  });

  it('stores empty optional fields as null', async () => {
    await submitTrainingQuoteRequest({
      ...sample,
      licence: '',
      phone: '',
      location: '',
      notes: '',
    });
    const payload = addDoc.mock.calls[0][1];
    expect(payload.licence).toBeNull();
    expect(payload.phone).toBeNull();
    expect(payload.location).toBeNull();
    expect(payload.notes).toBeNull();
  });

  it('returns the reference so the confirmation screen can show it', async () => {
    const response = await submitTrainingQuoteRequest(sample);
    expect(response.success).toBe(true);
    expect(response.data).toEqual({ id: 'quote-doc-1', reference: 'GS-260930-K7QP' });
  });

  it('surfaces Firestore errors instead of throwing', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    addDoc.mockRejectedValueOnce({ code: 'permission-denied' });

    const response = await submitTrainingQuoteRequest(sample);

    expect(response.success).toBe(false);
    expect(response.message).toContain('permission-denied');
    consoleError.mockRestore();
  });
});
