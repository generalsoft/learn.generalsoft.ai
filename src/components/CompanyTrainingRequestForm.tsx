import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Monitor, Loader2, CheckCircle2, AlertCircle, Send
} from 'lucide-react';
import { submitCompanyTrainingRequest } from '../services/api';
import { analytics } from '../services/analytics';
import type { Course, CompanyTrainingRequestData } from '../types';
import { isValidEmail } from '../services/validation';

const initialFormData: CompanyTrainingRequestData = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  country: '',
  deliveryMethod: 'online',
  employeeCount: 1,
  message: '',
  website: '',
};

export default function CompanyTrainingRequestForm({ course }: { course: Course }) {
  const [formData, setFormData] = useState<CompanyTrainingRequestData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'employeeCount') {
      const parsed = parseInt(value, 10);
      setFormData((prev) => ({
        ...prev,
        employeeCount: Number.isNaN(parsed) ? 1 : Math.max(1, parsed),
      }));
      return;
    }

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
        setIsSubmitted(true);
      }, 800);
      return;
    }

    try {
      const response = await submitCompanyTrainingRequest(course.id, formData);
      if (response.success) {
        analytics.trackCompanyRequestSubmit(course.id, formData.deliveryMethod);
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

  const handleReset = () => {
    setFormData({ ...initialFormData });
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
          <h2 className="text-2xl font-bold text-slate-900">Request Received</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you{formData.contactName ? `, ${formData.contactName}` : ''}. We've received your request to train{' '}
            <span className="font-semibold text-slate-900">{formData.employeeCount} employees</span> at{' '}
            <span className="font-semibold text-slate-900">{formData.companyName}</span>{' '}
            ({formData.deliveryMethod === 'online' ? 'online' : 'onsite'}).
          </p>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Our team will review your request and contact you within 1 business day to confirm availability, scheduling, and pricing.
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold text-primary-600 hover:text-primary-700 underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Request This Course</h2>
      <p className="text-xs text-slate-500 mb-6">
        Tell us about your team and we'll get in touch to schedule <span className="font-semibold text-slate-700">{course.title}</span> for your company — online or onsite.
      </p>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3.5 flex items-start space-x-2 text-rose-800 text-xs sm:text-sm mb-5">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4.5">
        {/* Bot Honeypot (hidden with CSS) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field blank</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 mb-1">
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="e.g. Acme LLC"
            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="contactName" className="block text-xs font-bold text-slate-700 mb-1">
            Contact Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            required
            value={formData.contactName}
            onChange={handleInputChange}
            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
            Work Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.com"
            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
              Phone <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+971"
              className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-xs font-bold text-slate-700 mb-1">
              Country <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="e.g. UAE"
              className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Delivery Method */}
        <div>
          <span className="block text-xs font-bold text-slate-700 mb-2">
            Delivery Method <span className="text-rose-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${
              formData.deliveryMethod === 'online'
                ? 'border-primary-600 bg-primary-50/40 text-primary-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
              <input
                type="radio"
                name="deliveryMethod"
                value="online"
                checked={formData.deliveryMethod === 'online'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <Monitor className="w-4 h-4" />
              <span>Online</span>
            </label>

            <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${
              formData.deliveryMethod === 'onsite'
                ? 'border-primary-600 bg-primary-50/40 text-primary-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
              <input
                type="radio"
                name="deliveryMethod"
                value="onsite"
                checked={formData.deliveryMethod === 'onsite'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <Building2 className="w-4 h-4" />
              <span>Onsite</span>
            </label>
          </div>
        </div>

        {/* Number of Employees */}
        <div>
          <label htmlFor="employeeCount" className="block text-xs font-bold text-slate-700 mb-1">
            Number of Employees <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            id="employeeCount"
            name="employeeCount"
            min={1}
            required
            value={formData.employeeCount}
            onChange={handleInputChange}
            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Dates or Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your goals, preferred dates, or any customization needs."
            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <p className="text-[10px] text-slate-400 leading-normal">
          By submitting this form, you agree to our{' '}
          <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>{' '}
          and{' '}
          <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>. Communications are handled in accordance with GDPR and UAE regulations.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 transition-colors rounded-xl shadow-md focus-ring mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting Request...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </>
          )}
        </button>
      </form>
    </>
  );
}


