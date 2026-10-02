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

  // ---- AI training quote request (the single request funnel at /quote) ----
  /**
   * Fired by every call to action that sends a visitor to the quote form.
   * `source` identifies the placement (navbar, hero, course page, …) and
   * `topic` is the programme the copy promised, when one applied.
   */
  trackQuoteRequestClick: (source: string, topic?: string) => {
    trackEvent('quote_request_clicked', {
      source,
      topic: topic || undefined,
    });
  },
  trackQuoteFormView: () => {
    trackEvent('quote_form_viewed');
  },
  trackQuoteRequestSubmit: (organisationType: string, learners: number, topics: number) => {
    trackEvent('quote_request_submitted', {
      organisation_type: organisationType,
      learners,
      topic_count: topics,
    });
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
