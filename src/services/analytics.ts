const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID || '';
const IS_DEV = import.meta.env.DEV;

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (IS_DEV) {
    console.log(`[Analytics Dev] Event: ${eventName}`, params);
  }

  if (!ANALYTICS_ID) {
    return;
  }

  // Support Standard Google Analytics gtag.js format if loaded
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...params,
      send_to: ANALYTICS_ID,
    });
  }
};

export const analytics = {
  trackCourseView: (courseId: string) => {
    trackEvent('course_page_viewed', { course_id: courseId });
  },
  trackRegisterClick: (courseId: string) => {
    trackEvent('register_button_clicked', { course_id: courseId });
  },
  trackCompanyRequestClick: (courseId: string) => {
    trackEvent('company_training_request_clicked', { course_id: courseId });
  },
  trackCompanyRequestSubmit: (courseId: string, deliveryMethod: 'online' | 'onsite') => {
    trackEvent('company_training_request_submitted', { course_id: courseId, delivery_method: deliveryMethod });
  },
  trackRegistrationStart: (courseId: string) => {
    trackEvent('registration_started', { course_id: courseId });
  },
  trackRegistrationSubmit: (courseId: string, type: 'individual' | 'company') => {
    trackEvent('registration_submitted', { course_id: courseId, registration_type: type });
  },
  trackEmailVerified: (courseId: string) => {
    trackEvent('email_verified', { course_id: courseId });
  },
  trackRegistrationComplete: (courseId: string) => {
    trackEvent('registration_completed', { course_id: courseId });
  },
  trackInterestClick: (courseId: string) => {
    trackEvent('interest_button_clicked', { course_id: courseId });
  },
  trackInterestSubmit: (courseId: string) => {
    trackEvent('interest_submitted', { course_id: courseId });
  },

  // ---- Lead generation & conversion tracking (business / school / session) ----
  trackLeadClick: (leadType: string, source?: string) => {
    trackEvent('lead_cta_clicked', { lead_type: leadType, source: source || undefined });
  },
  trackLeadSubmit: (leadType: string) => {
    // Category-level event plus a dedicated per-type event so Business,
    // School and Complimentary Session leads can be attributed independently.
    trackEvent('generate_lead', { lead_type: leadType });
    trackEvent(`lead_${leadType}`, { lead_type: leadType });
  },
  trackCourseEnquiry: (programmeId: string) => {
    trackEvent('programme_enquiry_clicked', { programme_id: programmeId });
  },

  // ---- Direct contact interactions (phone / WhatsApp / email / downloads) ----
  trackPhoneClick: (source?: string) => {
    trackEvent('phone_clicked', { source: source || undefined });
  },
  trackWhatsAppClick: (source?: string) => {
    trackEvent('whatsapp_clicked', { source: source || undefined });
  },
  trackEmailClick: (source?: string) => {
    trackEvent('email_clicked', { source: source || undefined });
  },
  trackBrochureDownload: (source?: string) => {
    trackEvent('brochure_downloaded', { source: source || undefined });
  },
};
