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

export interface CompanyTrainingRequestData {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  country?: string;
  deliveryMethod: 'online' | 'onsite';
  employeeCount: number;
  message?: string;
  // Bot protection honeypot (should remain blank)
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

export interface CourseInterestData {
  firstName: string;
  lastName: string;
  email: string;
  marketingConsent: boolean;
  // Bot protection honeypot (should remain blank)
  website?: string;
}

export interface CourseInterest {
  id: string;
  courseId: string;
  courseTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  emailNormalized: string;
  status: 'pending' | 'confirmed';
  token?: string | null;
  tokenCreatedAt?: string | null;
  emailSentAt?: string | null;
  marketingConsent: boolean;
  createdAt: string;
  verifiedAt: string | null;
}
