import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Loader2, CheckCircle2, AlertCircle, MailCheck } from 'lucide-react';
import { submitCourseInterest, resendInterestVerification } from '../services/api';
import { analytics } from '../services/analytics';
import type { Course, CourseInterestData } from '../types';
import { isValidEmail } from '../services/validation';

const initialFormData: CourseInterestData = {
  firstName: '',
  lastName: '',
  email: '',
  marketingConsent: true,
  website: '',
};

type InterestStatus = 'idle' | 'pending' | 'already_confirmed' | 'already_pending';

export default function CourseInterestForm({ course }: { course: Course }) {
  const [formData, setFormData] = useState<CourseInterestData>(initialFormData);
  const [status, setStatus] = useState<InterestStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Frontend honeypot: silently accept bot submissions.
    if (formData.website && formData.website.trim() !== '') {
      setTimeout(() => {
        setIsSubmitting(false);
        setStatus('pending');
      }, 800);
      return;
    }

    try {
      const response = await submitCourseInterest(course.id, course.title, formData);
      if (response.success) {
        analytics.trackInterestSubmit(course.id);
        const resultStatus = response.data?.status;
        if (resultStatus === 'confirmed') {
          setStatus('already_confirmed');
        } else if (resultStatus === 'pending') {
          setStatus('already_pending');
        } else {
          setStatus('pending');
        }
      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('loading');
    try {
      const response = await resendInterestVerification(formData.email, course.id);
      if (response.success) {
        setResendStatus('success');
      } else {
        setResendStatus('error');
        setErrorMsg(response.message);
      }
    } catch (err) {
      console.error(err);
      setResendStatus('error');
      setErrorMsg('Failed to resend. Please try again later.');
    }
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    setStatus('idle');
    setErrorMsg(null);
    setResendStatus('idle');
  };

  if (status === 'pending' || status === 'already_pending') {
    return (
      <div className="text-center py-10 space-y-5">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-100">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Confirm Your Email</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We sent a confirmation link to{' '}
            <span className="font-semibold text-slate-900">{formData.email}</span>. Please click it
            to confirm your interest in{' '}
            <span className="font-semibold text-slate-900">{course.title}</span>.
          </p>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          The link expires after 24 hours. Didn't receive it?
        </p>

        {resendStatus === 'success' ? (
          <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 py-2.5 px-3 rounded-lg border border-emerald-100 inline-block">
            Confirmation email resent!
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resendStatus === 'loading'}
            className="w-full py-2.5 text-xs font-bold text-primary-700 bg-primary-50 border border-primary-200 rounded-xl hover:bg-primary-100 focus-ring"
          >
            {resendStatus === 'loading' ? 'Resending...' : 'Resend Confirmation Email'}
          </button>
        )}

        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-800 block mx-auto underline"
        >
          Use a different email address
        </button>
      </div>
    );
  }

  if (status === 'already_confirmed') {
    return (
      <div className="text-center py-10 space-y-5">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">You're on the List</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">{formData.email}</span> is already
            registered for updates about{' '}
            <span className="font-semibold text-slate-900">{course.title}</span>. We'll be in touch
            as soon as details are announced.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-800 block mx-auto underline"
        >
          Use a different email address
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 flex-shrink-0">
          <Bell className="w-5 h-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notify Me</h2>
          <p className="text-xs text-slate-500">Details for this course will be announced soon.</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mb-6">
        Leave your details below and we'll let you know as soon as dates, pricing, and registration
        open. We'll send a quick confirmation email to verify your address.
      </p>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3.5 flex items-start space-x-2 text-rose-800 text-xs sm:text-sm mb-5">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bot Honeypot (hidden with CSS) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="interest-website">Leave this field blank</label>
          <input
            type="text"
            id="interest-website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="interest-firstName" className="block text-xs font-bold text-slate-700 mb-1">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="interest-firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="interest-lastName" className="block text-xs font-bold text-slate-700 mb-1">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="interest-lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="interest-email" className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="interest-email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleInputChange}
            className="mt-0.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <span>I agree to be contacted about this course and related training updates.</span>
        </label>

        <p className="text-[10px] text-slate-400 leading-normal">
          By submitting this form, you agree to our{' '}
          <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>{' '}
          and{' '}
          <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 transition-colors rounded-xl shadow-md focus-ring"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 mr-2" />
              Notify Me
            </>
          )}
        </button>
      </form>
    </>
  );
}
