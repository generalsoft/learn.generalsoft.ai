import { RegistrationFormData, TrainingQuoteRequestData, ApiResponse } from '../types';
import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Firestore collections written by this client.
 *
 * `registrations` covers course enrolment (the verified-seat flow) and
 * `quoteRequests` is the single request funnel for the whole site — every
 * "request / enquiry / consultation" call to action now funnels into the
 * AI training quote form at `/quote`.
 */
const REGISTRATIONS_COLLECTION = 'registrations';
const QUOTE_REQUESTS_COLLECTION = 'quoteRequests';
const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function registrationDocId(courseId: string, email: string): string {
  return `${courseId}__${normalizeEmail(email)}`;
}

function generateToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export async function registerParticipant(
  courseId: string,
  formData: RegistrationFormData
): Promise<ApiResponse> {
  const emailNormalized = normalizeEmail(formData.email);
  const registrationRef = doc(db, REGISTRATIONS_COLLECTION, registrationDocId(courseId, emailNormalized));

  try {
    const existingSnap = await getDoc(registrationRef);

    if (existingSnap.exists()) {
      const existing = existingSnap.data();
      if (existing.status === 'confirmed') {
        return {
          success: true,
          message: 'This email is already verified for this course.',
        };
      }
      return {
        success: true,
        message: 'This email is already registered and awaiting email verification.',
      };
    }

    const payload = {
      courseId,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      emailNormalized,
      registrationType: formData.registrationType,
      companyName: formData.registrationType === 'company' ? formData.companyName?.trim() || null : null,
      jobTitle: formData.registrationType === 'company' ? formData.jobTitle?.trim() || null : null,
      phone: formData.phone?.trim() || null,
      country: formData.country?.trim() || null,
      howDidYouHear: formData.howDidYouHear || null,
      marketingConsent: formData.marketingConsent,
      status: 'pending',
      token: generateToken(),
      tokenCreatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      verifiedAt: null,
    };

    await setDoc(registrationRef, payload);

    return {
      success: true,
      message: 'Registration received. Please verify your email address.',
      data: { id: registrationRef.id },
    };
  } catch (error) {
    console.error('Firestore registration error:', error);
    const code = (error as { code?: string })?.code;
    return {
      success: false,
      message: code
        ? `Unable to save your registration (${code}). Please try again later.`
        : 'Unable to save your registration. Please try again later.',
    };
  }
}

export async function verifyEmailToken(token: string): Promise<ApiResponse> {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where('token', '==', token)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return {
        success: false,
        message: 'Verification failed or link expired.',
      };
    }

    const registrationRef = snapshot.docs[0].ref;
    const registration = snapshot.docs[0].data();
    const registrationId = snapshot.docs[0].id;

    if (registration.status === 'confirmed') {
      return {
        success: true,
        message: 'This registration has already been confirmed.',
        data: { id: registrationId, courseId: registration.courseId ?? '' },
      };
    }

    const createdAt = registration.tokenCreatedAt?.toDate?.();
    if (createdAt && Date.now() - createdAt.getTime() > VERIFICATION_TTL_MS) {
      return {
        success: false,
        message: 'This verification link has expired. Please request a new one.',
      };
    }

    await updateDoc(registrationRef, {
      status: 'confirmed',
      verifiedAt: serverTimestamp(),
      token: null,
      tokenCreatedAt: null,
    });

    return {
      success: true,
      message: 'Registration confirmed.',
      data: { id: registrationId, courseId: registration.courseId ?? '' },
    };
  } catch (error) {
    console.error('Firestore verification error:', error);
    return {
      success: false,
      message: 'Unable to verify. Please try again later.',
    };
  }
}

export interface RegistrationLookup {
  id: string | null;
  courseId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlisted' | null;
  verified: boolean;
  email: string | null;
}

/**
 * Look up a registration by its Firestore document id. Used by the course page
 * to skip the registration form when the id stored in a cookie points to an
 * already-verified registration.
 */
export async function getRegistrationById(
  registrationId: string
): Promise<RegistrationLookup | null> {
  try {
    const registrationRef = doc(db, REGISTRATIONS_COLLECTION, registrationId);
    const snap = await getDoc(registrationRef);

    if (!snap.exists()) {
      return null;
    }

    const data = snap.data();
    return {
      id: snap.id,
      courseId: data.courseId ?? '',
      status: data.status ?? null,
      verified: data.status === 'confirmed',
      email: data.email ?? null,
    };
  } catch (error) {
    console.error('Firestore get registration error:', error);
    return null;
  }
}

/**
 * Persists an AI training quote request submitted through the `/quote` page.
 *
 * The visitor-facing `reference` is generated on the client, stored on the
 * document and echoed back on the confirmation screen so the sales team and the
 * prospect can quote the same number.
 */
export async function submitTrainingQuoteRequest(
  data: TrainingQuoteRequestData
): Promise<ApiResponse> {
  try {
    const requestsRef = collection(db, QUOTE_REQUESTS_COLLECTION);
    const payload = {
      reference: data.reference,
      status: 'new',
      language: data.language,
      organisationType: data.organisationType,
      organisation: data.organisation.trim(),
      licence: data.licence?.trim() || null,
      contactName: data.contactName.trim(),
      email: data.email.trim(),
      emailNormalized: normalizeEmail(data.email),
      phone: data.phone?.trim() || null,
      topics: data.topics,
      learners: data.learners,
      level: data.level,
      audience: data.audience,
      delivery: data.delivery,
      location: data.location?.trim() || null,
      preferredSlots: data.preferredSlots,
      startTime: data.startTime,
      endTime: data.endTime,
      sessionLength: data.sessionLength,
      notes: data.notes?.trim() || null,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(requestsRef, payload);

    return {
      success: true,
      message: 'Quote request received. Our team will contact you shortly.',
      data: { id: docRef.id, reference: data.reference },
    };
  } catch (error) {
    console.error('Firestore quote request error:', error);
    const code = (error as { code?: string })?.code;
    return {
      success: false,
      message: code
        ? `Unable to submit your quote request (${code}). Please try again later.`
        : 'Unable to submit your quote request. Please try again later.',
    };
  }
}

export async function resendVerificationEmail(
  email: string,
  courseId: string
): Promise<ApiResponse> {
  const registrationRef = doc(db, REGISTRATIONS_COLLECTION, registrationDocId(courseId, email));

  try {
    const existingSnap = await getDoc(registrationRef);

    if (!existingSnap.exists()) {
      return {
        success: false,
        message: 'No pending registration found for this email.',
      };
    }

    const existing = existingSnap.data();
    if (existing.status === 'confirmed') {
      return {
        success: true,
        message: 'This registration is already confirmed.',
      };
    }

    await updateDoc(registrationRef, {
      token: generateToken(),
      tokenCreatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: 'A new verification link has been generated.',
    };
  } catch (error) {
    console.error('Firestore resend error:', error);
    return {
      success: false,
      message: 'Failed to resend verification email. Please try again.',
    };
  }
}

