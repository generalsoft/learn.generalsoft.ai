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
};
