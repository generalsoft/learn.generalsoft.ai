export interface CourseOutlineSection {
  title: string;
  items: string[];
}

export interface CoursePricing {
  individual: string;
  company: string;
  individualPrice: number;
  companyPrice: number;
  currency: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  audience: string[];
  audienceSummary?: string;
  learningOutcomes: string[];
  outline: CourseOutlineSection[];
  deliveryMethod: 'Online' | 'In-Class' | 'Hybrid';
  dates: string;
  time: string;
  breakTime: string;
  timezone: string;
  pricing: CoursePricing;
  registrationStatus: 'Open' | 'Closed' | 'Upcoming' | 'Full';
  duration: string;
  featured: boolean;
  /** Short note shown in the course quick-info card (e.g. prerequisites). */
  infoNote?: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  registrationType: 'individual' | 'company';
  companyName?: string;
  jobTitle?: string;
  phone?: string;
  country?: string;
  howDidYouHear?: string;
  marketingConsent: boolean;
  // Bot protection honeypot (should remain blank)
  website?: string;
}

/**
 * Organisation categories offered on the AI training quote request page
 * (`/quote`). Mirrors the radio group on that page.
 */
export type QuoteOrganisationType = 'company' | 'rakez' | 'school' | 'other';

/** UI language a quote request was submitted in (the page is bilingual). */
export type QuoteLanguage = 'en' | 'ar';

/** One preferred delivery slot a prospect asked for. */
export interface QuotePreferredSlot {
  /** ISO calendar date (`YYYY-MM-DD`). */
  date: string;
  /** 24-hour start time (`HH:MM`). */
  start: string;
  /** 24-hour end time (`HH:MM`). */
  end: string;
}

/**
 * Everything collected by the AI training quote request page. Values are stored
 * in Firestore as-is (English option labels) so the sales team can filter and
 * report on them without a translation lookup.
 */
export interface TrainingQuoteRequestData {
  organisationType: QuoteOrganisationType;
  organisation: string;
  /** RAKEZ licence number — only collected when organisationType is 'rakez'. */
  licence?: string;
  contactName: string;
  email: string;
  phone?: string;
  /** Selected topics plus any custom topic the visitor typed. */
  topics: string[];
  learners: number;
  level: string;
  audience: string;
  delivery: string;
  location?: string;
  preferredSlots: QuotePreferredSlot[];
  startTime: string;
  endTime: string;
  sessionLength: string;
  notes?: string;
  /** Language the request was submitted in. */
  language: QuoteLanguage;
  /** Human-readable reference shown to the prospect, e.g. GS-260930-K7QP. */
  reference: string;
  /** Bot protection honeypot (should remain blank). */
  website?: string;
}

export interface Registration {
  id: string;
  courseId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailNormalized: string;
  registrationType: 'individual' | 'company';
  companyName: string | null;
  jobTitle: string | null;
  phone: string | null;
  country: string | null;
  howDidYouHear: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlisted';
  amountExpected: number;
  currency: string;
  createdAt: string;
  verifiedAt: string | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * A faculty member / instructor profile shown on the site.
 * Fields without content (publications, awards, etc.) can be omitted and the
 * corresponding sections will be hidden on the profile page.
 */
export interface Faculty {
  id: string;
  slug: string;
  name: string;
  /** Role or academic title, e.g. "Adjunct Faculty". */
  title: string;
  /** Optional department or team label. */
  department?: string;
  /** URL of the portrait photo. Falls back to initials if it fails to load. */
  photo?: string;
  /** Highest qualification / degree line shown under the name. */
  education: string;
  researchInterests: string[];
  bio: string[];
  publications?: string[];
  awards?: string[];
  affiliations?: string[];
  email?: string;
  featured?: boolean;
}
