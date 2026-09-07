import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { submitLead } from '../services/api';
import { analytics } from '../services/analytics';
import type { LeadData, LeadType } from '../types';
import { isValidEmail } from '../services/validation';

export type LeadFormVariant = 'business' | 'school_session' | 'ai_readiness' | 'general';

interface LeadFormProps {
  variant: LeadFormVariant;
  heading?: string;
  description?: string;
  ctaLabel?: string;
}

const VARIANT: Record<
  LeadFormVariant,
  { leadType: LeadType; orgLabel: string; cta: string }
> = {
  business: { leadType: 'business', orgLabel: 'Company / Organisation', cta: 'Book an AI Consultation' },
  school_session: { leadType: 'complimentary_session', orgLabel: 'School', cta: 'Request a Complimentary Session' },
  ai_readiness: { leadType: 'ai_readiness', orgLabel: 'School / Organisation', cta: 'Request My AI Readiness Consultation' },
  general: { leadType: 'general', orgLabel: 'Organisation', cta: 'Send Enquiry' },
};

interface FormState {
  name: string;
  organisation: string;
  jobTitle: string;
  email: string;
  phone: string;
  studentsCount: string;
  ageGrade: string;
  preferredDate: string;
  message: string;
  website: string;
}

const emptyState: FormState = {
  name: '',
  organisation: '',
  jobTitle: '',
  email: '',
  phone: '',
  studentsCount: '',
  ageGrade: '',
  preferredDate: '',
  message: '',
  website: '',
};

const inputClass =
  'w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';

export default function LeadForm({ variant, heading, description, ctaLabel }: LeadFormProps) {
  const config = VARIANT[variant];
  const [form, setForm] = useState<FormState>(emptyState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isSchool = variant === 'school_session';
  const showOrg = variant !== 'general';

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Frontend honeypot: silently accept bot submissions.
    if (form.website && form.website.trim() !== '') {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 600);
      return;
    }

    const data: LeadData = {
      leadType: config.leadType,
      name: form.name,
      organisation: form.organisation,
      jobTitle: form.jobTitle,
      email: form.email,
      phone: form.phone,
      studentsCount: form.studentsCount,
      ageGrade: form.ageGrade,
      preferredDate: form.preferredDate,
      message: form.message,
    };

    try {
      const response = await submitLead(data);
      if (response.success) {
        analytics.trackLeadSubmit(config.leadType);
        setIsSubmitted(true);
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

  const reset = () => {
    setForm(emptyState);
    setErrorMsg(null);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 space-y-5">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Request Received</h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We have received your request and a member of
            our team will contact you shortly.
          </p>
        </div>
        <button
          onClick={reset}
          className="text-xs font-bold text-primary-600 hover:text-primary-700 underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {heading && <h3 className="text-xl font-bold text-slate-900">{heading}</h3>}
      {description && <p className="text-sm text-slate-600 leading-relaxed">{description}</p>}

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3.5 flex items-start space-x-2 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Honeypot field (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          type="text"
          id="lead-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update('website')}
        />
      </div>

      <div>
        <label htmlFor="lead-name" className="block text-xs font-bold text-slate-700 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          id="lead-name"
          required
          value={form.name}
          onChange={update('name')}
          className={inputClass}
        />
      </div>

      {showOrg && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-org" className="block text-xs font-bold text-slate-700 mb-1">
              {config.orgLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="lead-org"
              required
              value={form.organisation}
              onChange={update('organisation')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lead-job" className="block text-xs font-bold text-slate-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="lead-job"
              value={form.jobTitle}
              onChange={update('jobTitle')}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-email" className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="lead-email"
            required
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="lead-phone"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+971..."
            className={inputClass}
          />
        </div>
      </div>
      {isSchool && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="lead-students" className="block text-xs font-bold text-slate-700 mb-1">
              Number of Students
            </label>
            <input
              type="text"
              id="lead-students"
              value={form.studentsCount}
              onChange={update('studentsCount')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lead-grade" className="block text-xs font-bold text-slate-700 mb-1">
              Student Age / Grade
            </label>
            <input
              type="text"
              id="lead-grade"
              value={form.ageGrade}
              onChange={update('ageGrade')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lead-date" className="block text-xs font-bold text-slate-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              id="lead-date"
              value={form.preferredDate}
              onChange={update('preferredDate')}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="lead-message" className="block text-xs font-bold text-slate-700 mb-1">
          Message <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="lead-message"
          rows={3}
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us about your goals or any questions."
          className={inputClass}
        />
      </div>

      <p className="text-[10px] text-slate-400 leading-normal">
        By submitting this form, you agree to our{' '}
        <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link> and{' '}
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
            <Send className="w-4 h-4 mr-2" />
            {ctaLabel || config.cta}
          </>
        )}
      </button>
    </form>
  );
}
