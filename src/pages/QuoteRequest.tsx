import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Globe,
  Loader2,
  Minus,
  Plus,
  Send,
} from 'lucide-react';
import { submitTrainingQuoteRequest } from '../services/api';
import { analytics } from '../services/analytics';
import { createTranslator, localeFor } from '../data/quoteFormStrings';
import {
  QUOTE_AUDIENCES,
  QUOTE_DELIVERY_MODES,
  QUOTE_EXPERIENCE_LEVELS,
  QUOTE_ORGANISATION_TYPES,
  QUOTE_SESSION_LENGTHS,
  QUOTE_TOPICS,
} from '../data/quoteForm';
import {
  MAX_PREFERRED_DATES,
  buildPreferredSlots,
  formatPreferredSlot,
  generateQuoteReference,
  startOfToday,
  toIsoDate,
  validateQuoteRequest,
  type QuoteFieldErrors,
} from '../services/quoteRequest';
import { site } from '../data/site';
import type { QuoteLanguage, QuoteOrganisationType, TrainingQuoteRequestData } from '../types';

interface QuoteFormState {
  organisationType: QuoteOrganisationType;
  organisation: string;
  licence: string;
  contactName: string;
  email: string;
  phone: string;
  topics: string[];
  customTopic: string;
  learners: number;
  level: string;
  audience: string;
  delivery: string;
  location: string;
  startTime: string;
  endTime: string;
  sessionLength: string;
  notes: string;
  website: string;
}

const emptyForm: QuoteFormState = {
  organisationType: 'company',
  organisation: '',
  licence: '',
  contactName: '',
  email: '',
  phone: '',
  topics: [],
  customTopic: '',
  learners: 20,
  level: QUOTE_EXPERIENCE_LEVELS[0],
  audience: QUOTE_AUDIENCES[0],
  delivery: QUOTE_DELIVERY_MODES[0],
  location: '',
  startTime: '09:00',
  endTime: '13:00',
  sessionLength: QUOTE_SESSION_LENGTHS[0],
  notes: '',
  website: '',
};

const inputClass =
  'w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
const labelClass = 'block text-xs font-bold text-slate-700 mb-1';
const errorClass = 'text-xs text-rose-600 mt-1';

const segmentedClass = (active: boolean) =>
  `px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all focus-ring ${
    active
      ? 'border-primary-600 bg-primary-50 text-primary-700'
      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
  }`;

const chipClass = (active: boolean) =>
  `px-4 py-2 rounded-full border text-sm font-medium transition-all focus-ring ${
    active
      ? 'border-primary-600 bg-primary-600 text-white'
      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
  }`;

/** Arabic-speaking visitors get the form in Arabic on their first visit. */
const preferredLanguage = (): QuoteLanguage =>
  typeof navigator !== 'undefined' && (navigator.language || '').toLowerCase().startsWith('ar')
    ? 'ar'
    : 'en';

/** Maps a validation error key to the DOM id of the field it belongs to. */
const invalidFieldIds: Record<'organisation' | 'contactName' | 'email', string> = {
  organisation: 'quote-org',
  contactName: 'quote-contact',
  email: 'quote-email',
};

export default function QuoteRequest() {
  const [language, setLanguage] = useState<QuoteLanguage>(preferredLanguage);
  const [form, setForm] = useState<QuoteFormState>(emptyForm);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ reference: string } | null>(null);

  const t = useMemo(() => createTranslator(language), [language]);
  const locale = localeFor(language);
  const isRtl = language === 'ar';

  useEffect(() => {
    analytics.trackQuoteFormView();
  }, []);

  const update =
    (field: keyof QuoteFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const toggleTopic = (topic: string) => {
    setForm((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((item) => item !== topic)
        : [...prev.topics, topic],
    }));
  };

  const toggleDate = (iso: string) => {
    setSelectedDates((current) =>
      current.includes(iso) ? current.filter((date) => date !== iso) : [...current, iso].sort()
    );
  };

  const shiftMonth = (delta: number) => {
    setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const adjustLearners = (delta: number) => {
    setForm((prev) => ({ ...prev, learners: Math.max(1, (prev.learners || 0) + delta) }));
  };

  // Custom topics are stored alongside the selected chips (de-duplicated).
  const topics = useMemo(
    () => [...new Set([...form.topics, form.customTopic.trim()].filter(Boolean))],
    [form.topics, form.customTopic]
  );

  const preferredSlots = useMemo(
    () => buildPreferredSlots(selectedDates, form.startTime, form.endTime),
    [selectedDates, form.startTime, form.endTime]
  );

  const todayIso = toIsoDate(startOfToday());
  const weekdayLabels = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) =>
        new Date(2023, 0, 1 + index).toLocaleDateString(locale, { weekday: 'short' })
      ),
    [locale]
  );
  const firstWeekday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const monthLabel = viewMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const calendarMaxed = selectedDates.length >= MAX_PREFERRED_DATES;

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedDates([]);
    setErrors({});
    setSubmitError(null);
    setResult(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateQuoteRequest({
      organisation: form.organisation,
      contactName: form.contactName,
      email: form.email,
      topics,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (['organisation', 'contactName', 'email'] as const).find(
        (field) => nextErrors[field]
      );
      if (firstInvalid) {
        document.getElementById(invalidFieldIds[firstInvalid])?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Frontend honeypot: silently accept bot submissions.
    if (form.website.trim() !== '') {
      window.setTimeout(() => {
        setIsSubmitting(false);
        setResult({ reference: generateQuoteReference() });
      }, 700);
      return;
    }

    const reference = generateQuoteReference();
    const payload: TrainingQuoteRequestData = {
      organisationType: form.organisationType,
      organisation: form.organisation,
      licence: form.organisationType === 'rakez' ? form.licence : '',
      contactName: form.contactName,
      email: form.email,
      phone: form.phone,
      topics,
      learners: form.learners,
      level: form.level,
      audience: form.audience,
      delivery: form.delivery,
      location: form.location,
      preferredSlots,
      startTime: form.startTime,
      endTime: form.endTime,
      sessionLength: form.sessionLength,
      notes: form.notes,
      language,
      reference,
      website: form.website,
    };

    try {
      const response = await submitTrainingQuoteRequest(payload);
      if (response.success) {
        analytics.trackQuoteRequestSubmit(form.organisationType, form.learners, topics.length);
        setResult({ reference });
      } else {
        setSubmitError(response.message);
      }
    } catch (error) {
      console.error(error);
      setSubmitError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageStyle = isRtl ? { fontFamily: "'Tajawal', system-ui, sans-serif" } : undefined;

  const organisationTypeLabel =
    QUOTE_ORGANISATION_TYPES.find((option) => option.value === form.organisationType)?.label ??
    'Company';

  if (result) {
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'} style={pageStyle}>
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('Request received')}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
              {t("Thanks. We'll email you a tailored quote shortly.")}
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {t('Your reference:')}{' '}
              <span className="font-mono tracking-tight">{result.reference}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
              >
                {t('Back to home')}
              </Link>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                {t('Submit another request')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} style={pageStyle}>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 md:pt-16">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setLanguage(isRtl ? 'en' : 'ar')}
            aria-label={isRtl ? t('Show the form in English') : t('Show the form in Arabic')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors focus-ring"
          >
            <Globe className="w-4 h-4" />
            {isRtl ? 'English' : 'العربية'}
          </button>
        </div>

        <div className="max-w-3xl space-y-5 pt-6">
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{t('Request an AI training quote')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            {t('Bring an AI educator to your team or classroom')}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("Tell us what you'd like taught, to whom, and when. We'll reply with a tailored quote.")}
          </p>
        </div>
      </section>

      {/* FORM + LIVE SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <form
            id="quote-form"
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 sm:p-8 space-y-10"
          >
            {submitError && (
              <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3.5 flex items-start space-x-2 rtl:space-x-reverse text-rose-800 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <span>
                  {submitError}{' '}
                  <a href={`mailto:${site.email}`} className="underline font-semibold">
                    {site.email}
                  </a>
                </span>
              </div>
            )}

            {/* Honeypot field (hidden from humans) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="quote-website">Website</label>
              <input
                type="text"
                id="quote-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={update('website')}
              />
            </div>

            {/* WHO IS THIS FOR */}
            <section aria-labelledby="quote-who">
              <h2 id="quote-who" className="text-lg font-bold text-slate-900">
                {t('Who is this for?')}
              </h2>

              <div role="radiogroup" aria-label={t('Who is this for?')} className="flex flex-wrap gap-3 mt-4">
                {QUOTE_ORGANISATION_TYPES.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer ${segmentedClass(form.organisationType === option.value)}`}
                  >
                    <input
                      type="radio"
                      name="organisationType"
                      value={option.value}
                      checked={form.organisationType === option.value}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, organisationType: option.value }))
                      }
                      className="sr-only"
                    />
                    {t(option.label)}
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label htmlFor="quote-org" className={labelClass}>
                    {t('Organisation name')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-org"
                    name="organisation"
                    autoComplete="organization"
                    value={form.organisation}
                    onChange={update('organisation')}
                    aria-invalid={Boolean(errors.organisation)}
                    className={inputClass}
                  />
                  {errors.organisation && <p className={errorClass}>{t(errors.organisation)}</p>}
                </div>

                {form.organisationType === 'rakez' && (
                  <div>
                    <label htmlFor="quote-lic" className={labelClass}>
                      {t('RAKEZ licence number (optional)')}
                    </label>
                    <input
                      id="quote-lic"
                      name="licence"
                      value={form.licence}
                      onChange={update('licence')}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="quote-contact" className={labelClass}>
                    {t('Contact name')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-contact"
                    name="contactName"
                    autoComplete="name"
                    value={form.contactName}
                    onChange={update('contactName')}
                    aria-invalid={Boolean(errors.contactName)}
                    className={inputClass}
                  />
                  {errors.contactName && <p className={errorClass}>{t(errors.contactName)}</p>}
                </div>
                <div>
                  <label htmlFor="quote-email" className={labelClass}>
                    {t('Email')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={Boolean(errors.email)}
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{t(errors.email)}</p>}
                </div>
              </div>

              <div className="mt-4 max-w-xs">
                <label htmlFor="quote-phone" className={labelClass}>
                  {t('Phone / WhatsApp (optional)')}
                </label>
                <input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  className={inputClass}
                />
              </div>
            </section>

            {/* WHAT SHOULD WE TEACH */}
            <section aria-labelledby="quote-topics">
              <h2 id="quote-topics" className="text-lg font-bold text-slate-900">
                {t('What should we teach?')}
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">{t('Pick as many as you like.')}</p>

              <div className="flex flex-wrap gap-3">
                {QUOTE_TOPICS.map((topic) => {
                  const active = form.topics.includes(topic);
                  return (
                    <label key={topic} className={`cursor-pointer ${chipClass(active)}`}>
                      <input
                        type="checkbox"
                        name="topic"
                        value={topic}
                        checked={active}
                        onChange={() => toggleTopic(topic)}
                        className="sr-only"
                      />
                      {t(topic)}
                    </label>
                  );
                })}
              </div>
              {errors.topics && <p className={errorClass}>{t(errors.topics)}</p>}

              <div className="mt-5 max-w-md">
                <label htmlFor="quote-custom" className={labelClass}>
                  {t('Something else?')}
                </label>
                <input
                  id="quote-custom"
                  name="customTopic"
                  placeholder={t('e.g. AI for our customer support team')}
                  value={form.customTopic}
                  onChange={update('customTopic')}
                  className={inputClass}
                />
              </div>
            </section>

            {/* WHO IS ATTENDING */}
            <section aria-labelledby="quote-attendees">
              <h2 id="quote-attendees" className="text-lg font-bold text-slate-900">
                {t('Who is attending?')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="quote-learners" className={labelClass}>
                    {t('Number of learners')}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => adjustLearners(-5)}
                      aria-label={t('Fewer learners')}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-ring"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="quote-learners"
                      name="learners"
                      type="number"
                      min={1}
                      value={form.learners}
                      onChange={(event) => {
                        const parsed = Number.parseInt(event.target.value, 10);
                        setForm((prev) => ({
                          ...prev,
                          learners: Number.isNaN(parsed) ? 1 : Math.max(1, parsed),
                        }));
                      }}
                      className="w-24 text-sm text-center border border-slate-200 rounded-lg p-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => adjustLearners(5)}
                      aria-label={t('More learners')}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-ring"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="quote-level" className={labelClass}>
                    {t('Current AI experience')}
                  </label>
                  <select
                    id="quote-level"
                    name="level"
                    value={form.level}
                    onChange={update('level')}
                    className={inputClass}
                  >
                    {QUOTE_EXPERIENCE_LEVELS.map((option) => (
                      <option key={option} value={option}>
                        {t(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-audience" className={labelClass}>
                    {t('Audience')}
                  </label>
                  <select
                    id="quote-audience"
                    name="audience"
                    value={form.audience}
                    onChange={update('audience')}
                    className={inputClass}
                  >
                    {QUOTE_AUDIENCES.map((option) => (
                      <option key={option} value={option}>
                        {t(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-delivery" className={labelClass}>
                    {t('Delivery')}
                  </label>
                  <select
                    id="quote-delivery"
                    name="delivery"
                    value={form.delivery}
                    onChange={update('delivery')}
                    className={inputClass}
                  >
                    {QUOTE_DELIVERY_MODES.map((option) => (
                      <option key={option} value={option}>
                        {t(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="quote-location" className={labelClass}>
                  {t('Location (emirate / venue)')}
                </label>
                <input
                  id="quote-location"
                  name="location"
                  placeholder={t('e.g. RAKEZ, Ras Al Khaimah')}
                  value={form.location}
                  onChange={update('location')}
                  className={inputClass}
                />
              </div>
            </section>

            {/* WHEN */}
            <section aria-labelledby="quote-when">
              <h2 id="quote-when" className="text-lg font-bold text-slate-900">
                {t('When would you like it?')}
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                {t('Pick up to 5 preferred dates, then the times that suit you.')}
              </p>

              <div className="max-w-sm">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => shiftMonth(-1)}
                    aria-label={t('Previous month')}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-ring"
                  >
                    {isRtl ? '›' : '‹'}
                  </button>
                  <strong className="text-sm font-bold text-slate-900">{monthLabel}</strong>
                  <button
                    type="button"
                    onClick={() => shiftMonth(1)}
                    aria-label={t('Next month')}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-ring"
                  >
                    {isRtl ? '‹' : '›'}
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {weekdayLabels.map((day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className="text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400 py-1"
                    >
                      {day}
                    </span>
                  ))}
                  {Array.from({ length: firstWeekday }, (_, index) => (
                    <span key={`blank-${index}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const iso = `${viewMonth.getFullYear()}-${String(viewMonth.getMonth() + 1).padStart(
                      2,
                      '0'
                    )}-${String(day).padStart(2, '0')}`;
                    const selected = selectedDates.includes(iso);
                    const disabled = iso < todayIso || (!selected && calendarMaxed);

                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => toggleDate(iso)}
                        disabled={disabled}
                        aria-pressed={selected}
                        aria-label={`${day} ${monthLabel}`}
                        className={`aspect-square rounded-lg text-xs font-semibold transition-colors focus-ring ${
                          selected
                            ? 'bg-primary-600 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 max-w-md">
                <div>
                  <label htmlFor="quote-start" className={labelClass}>
                    {t('Start time')}
                  </label>
                  <input
                    id="quote-start"
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={update('startTime')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="quote-end" className={labelClass}>
                    {t('End time')}
                  </label>
                  <input
                    id="quote-end"
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={update('endTime')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 max-w-xs">
                <label htmlFor="quote-length" className={labelClass}>
                  {t('Session length')}
                </label>
                <select
                  id="quote-length"
                  name="sessionLength"
                  value={form.sessionLength}
                  onChange={update('sessionLength')}
                  className={inputClass}
                >
                  {QUOTE_SESSION_LENGTHS.map((option) => (
                    <option key={option} value={option}>
                      {t(option)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="quote-notes" className={labelClass}>
                  {t('Anything else we should know?')}
                </label>
                <textarea
                  id="quote-notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={update('notes')}
                  className={`${inputClass} resize-y min-h-[90px]`}
                />
              </div>
            </section>
          </form>

          {/* LIVE SUMMARY */}
          <aside className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-7 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">{t('Your request')}</h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {t('For')}
                </dt>
                <dd className="mt-1 font-medium">
                  {form.organisation.trim() || t('Your organisation')}{' '}
                  <span className="text-slate-400">({t(organisationTypeLabel)})</span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {t('Topics')}
                </dt>
                <dd className="mt-1 font-medium">
                  {topics.length > 0
                    ? topics.map((topic) => t(topic)).join(isRtl ? '، ' : ', ')
                    : t('None chosen yet')}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {t('Learners')}
                </dt>
                <dd className="mt-1 font-medium">
                  {form.learners} · {t(form.level)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {t('Delivery')}
                </dt>
                <dd className="mt-1 font-medium">{t(form.delivery)}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {t('Preferred dates')}
                </dt>
                <dd className="mt-1 font-medium">
                  {preferredSlots.length > 0 ? (
                    <span className="block space-y-1">
                      {preferredSlots.map((slot) => (
                        <span key={slot.date} className="block">
                          {formatPreferredSlot(slot, locale)}
                        </span>
                      ))}
                    </span>
                  ) : (
                    t('Not set')
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {t('Length')}
                </dt>
                <dd className="mt-1 font-medium">{t(form.sessionLength)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              form="quote-form"
              disabled={isSubmitting}
              className="mt-7 w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-primary-600 hover:bg-primary-500 disabled:bg-primary-400 disabled:cursor-wait transition-colors rounded-xl shadow-md focus-ring"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  {t('Sending…')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 me-2" />
                  {t('Request my quote')}
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 leading-relaxed mt-3">
              {t("No payment now. We'll confirm availability and pricing by email.")}
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-3">
              <Link to="/privacy" className="underline hover:text-white">
                {t('Privacy Policy')}
              </Link>{' '}
              ·{' '}
              <Link to="/terms" className="underline hover:text-white">
                {t('Terms of Service')}
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

