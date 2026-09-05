import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

import {
  Calendar, Clock, Globe, Check, Info, AlertCircle, ArrowRight,
  BookOpen, Users, Compass, Loader2, MailCheck,
  FolderOpen, FileText, Download, Image as ImageIcon, Video, Archive, FileSpreadsheet,
  X, ExternalLink
} from 'lucide-react';
import { getCourseBySlug } from '../courses/courseData';
import { getCourseMaterials } from '../courses/courseMaterials';
import type { CourseMaterial } from '../courses/courseMaterials';
import { registerParticipant, resendVerificationEmail, getRegistrationById } from '../services/api';
import { analytics } from '../services/analytics';
import { RegistrationFormData } from '../types';
import { setCookie, getCookie, REGISTRATION_COOKIE } from '../services/cookies';
import { isValidEmail } from '../services/validation';
import CompanyTrainingRequestForm from '../components/CompanyTrainingRequestForm';
import CourseInterestForm from '../components/CourseInterestForm';

/** Maps a file extension to a lucide icon, badge colors, and a short label. */
function materialPresentation(ext: string): { icon: typeof FileText; badgeClass: string; label: string } {
  switch (ext) {
    case 'pdf':
      return { icon: FileText, badgeClass: 'bg-rose-50 text-rose-700 border-rose-100', label: 'PDF' };
    case 'ppt':
    case 'pptx':
    case 'key':
      return { icon: FileText, badgeClass: 'bg-orange-50 text-orange-700 border-orange-100', label: 'Slides' };
    case 'doc':
    case 'docx':
      return { icon: FileText, badgeClass: 'bg-blue-50 text-blue-700 border-blue-100', label: 'Document' };
    case 'xls':
    case 'xlsx':
    case 'csv':
      return { icon: FileSpreadsheet, badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100', label: 'Spreadsheet' };
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return { icon: ImageIcon, badgeClass: 'bg-purple-50 text-purple-700 border-purple-100', label: 'Image' };
    case 'mp4':
    case 'mov':
    case 'webm':
    case 'mkv':
      return { icon: Video, badgeClass: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100', label: 'Video' };
    case 'zip':
    case 'rar':
    case '7z':
      return { icon: Archive, badgeClass: 'bg-amber-50 text-amber-700 border-amber-100', label: 'Archive' };
    case 'html':
    case 'htm':
      return { icon: Globe, badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-100', label: 'Web page' };
    case 'md':
    case 'txt':
    case 'rtf':
      return { icon: FileText, badgeClass: 'bg-slate-100 text-slate-600 border-slate-200', label: 'Text' };
    default:
      return { icon: FileText, badgeClass: 'bg-slate-100 text-slate-600 border-slate-200', label: ext.toUpperCase() || 'File' };
  }
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug || '');
  const materials = course ? getCourseMaterials(course.slug) : [];
  const formRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [viewingMaterial, setViewingMaterial] = useState<CourseMaterial | null>(null);

  // States
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    registrationType: 'individual',
    companyName: '',
    jobTitle: '',
    phone: '',
    country: '',
    howDidYouHear: '',
    marketingConsent: true,
    website: '' // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [regStatus, setRegStatus] = useState<'idle' | 'pending_verification' | 'duplicate_pending' | 'duplicate_confirmed' | 'already_verified'>('idle');
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (course) {
      analytics.trackCourseView(course.id);
    }
  }, [course]);

  useEffect(() => {
    if (!course) return;
    if (!location.hash) return;

    const target = document.getElementById(location.hash.slice(1));

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [course, location.hash]);

  // Scroll to an anchor fragment (e.g. /courses/ai-soup-to-nuts#coursematerial)
  // after render. React Router does not do this automatically, and the browser's
  // initial auto-scroll can fire before the element is mounted.
  useEffect(() => {
    if (!course) return;
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [course, location.hash]);

  // On mount, check whether a previously-verified registration document id is
  // stored in a cookie. If it maps to a confirmed registration for this
  // course, skip the registration form.
  useEffect(() => {
    if (!course) return;

    let cancelled = false;

    const checkExistingRegistration = async () => {
      const registrationId = getCookie(REGISTRATION_COOKIE);
      if (!registrationId) return;

      const registration = await getRegistrationById(registrationId);
      if (cancelled) return;

      if (registration && registration.verified && registration.courseId === course.id) {
        setVerifiedEmail(registration.email);
        setRegStatus('already_verified');
      }
    };

    checkExistingRegistration();

    return () => {
      cancelled = true;
    };
  }, [course]);

  // Lock page scroll and close the viewer on Escape while a material is open.
  useEffect(() => {
    if (!viewingMaterial) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewingMaterial(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewingMaterial]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900">Course Not Found</h1>
        <p className="mt-2 text-slate-600">The course you are looking for does not exist or has been archived.</p>
        <div className="mt-6">
          <Link to="/courses" className="inline-flex items-center text-primary-600 font-semibold hover:underline">
            Back to All Courses <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    );
  }

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (course.registrationStatus === 'Closed') {
      analytics.trackCompanyRequestClick(course.id);
    } else if (course.registrationStatus === 'Upcoming') {
      analytics.trackInterestClick(course.id);
    } else {
      analytics.trackRegisterClick(course.id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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
    setResendStatus('idle');

    // Frontend Honeypot Validation: If "website" is filled, silently discard or block
    if (formData.website && formData.website.trim() !== '') {
      // Simulate successful submission to spam bots
      setTimeout(() => {
        setIsSubmitting(false);
        setRegStatus('pending_verification');
      }, 1000);
      return;
    }

    analytics.trackRegistrationStart(course.id);

    try {
      const response = await registerParticipant(course.id, formData);
      if (response.success) {
        analytics.trackRegistrationSubmit(course.id, formData.registrationType);

        // Remember the registration document id so the course page can
        // recognize this user (and their verification status) on next visit.
        // The id is deterministic (`courseId__email`), so this also covers the
        // case where verification is completed later in the same browser.
        if (response.data?.id) {
          setCookie(REGISTRATION_COOKIE, response.data.id);
        }

        // Read response message/code to determine duplicate details
        const msg = response.message.toLowerCase();
        if (msg.includes('already verified') || msg.includes('already confirmed')) {
          setRegStatus('duplicate_confirmed');
        } else if (msg.includes('already registered') || msg.includes('pending verification')) {
          setRegStatus('duplicate_pending');
        } else {
          setRegStatus('pending_verification');
        }
      } else {
        // Handle specific duplicate/status messages from server
        const msg = response.message.toLowerCase();
        if (msg.includes('already verified') || msg.includes('already confirmed')) {
          setRegStatus('duplicate_confirmed');
        } else if (msg.includes('already registered') || msg.includes('pending verification')) {
          setRegStatus('duplicate_pending');
        } else {
          setErrorMsg(response.message);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendToken = async () => {
    setResendStatus('loading');
    try {
      const response = await resendVerificationEmail(formData.email, course.id);
      if (response.success) {
        setResendStatus('success');
      } else {
        setResendStatus('error');
        setErrorMsg(response.message);
      }
    } catch (err) {
      setResendStatus('error');
      setErrorMsg('Failed to send verification email. Please try again later.');
    }
  };

  const ctaLabel =
    course.registrationStatus === 'Closed'
      ? 'Request for Your Company'
      : course.registrationStatus === 'Upcoming'
      ? 'Notify Me'
      : 'Register Now';

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Course Hero Banner */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(12,130,235,0.15),transparent_55%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-primary-500/10 text-primary-400 border border-primary-500/20">
                {course.registrationStatus === 'Upcoming' ? 'Upcoming Course' : 'Live Interactive Course'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5.5xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                {course.subtitle}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3.5 text-sm text-slate-300 pt-2">
                <span className="flex items-center">
                  <Calendar className="w-4.5 h-4.5 text-primary-400 mr-2" />
                  {course.dates}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4.5 h-4.5 text-primary-400 mr-2" />
                  {course.time === 'To be announced'
                    ? 'To be announced'
                    : `${course.time} (${course.timezone})`}
                </span>
                <span className="flex items-center">
                  <Globe className="w-4.5 h-4.5 text-primary-400 mr-2" />
                  {course.deliveryMethod}
                </span>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleScrollToForm}
                  className="px-6 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all rounded-xl shadow-lg shadow-primary-600/20 focus-ring"
                >
                  {ctaLabel}
                </button>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-white text-base">Course Quick Info</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span>Duration</span>
                  <span className="font-semibold text-white">{course.duration}</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span>Audience</span>
                  <span className="font-semibold text-white">{course.audienceSummary || course.audience[0]}</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span>Individuals Fee</span>
                  <span className="font-semibold text-white">{course.pricing.individual}</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span>Corporate Fee</span>
                  <span className="font-semibold text-white">{course.pricing.company}</span>
                </li>
              </ul>
              {course.infoNote && (
                <div className="p-3 bg-slate-700/30 rounded-xl text-[11px] text-slate-400 border border-slate-700/30">
                  <Info className="w-3.5 h-3.5 text-primary-400 inline mr-1.5 -mt-0.5" />
                  {course.infoNote}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Course Overview */}
          <div className="lg:col-span-7 space-y-12">

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <BookOpen className="w-5.5 h-5.5 text-primary-600 mr-2.5" />
                Course Overview
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {course.longDescription}
              </p>
            </div>

            {/* What you'll learn */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Compass className="w-5.5 h-5.5 text-primary-600 mr-2.5" />
                What You'll Learn
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-600">
                    <span className="p-0.5 bg-primary-50 text-primary-600 rounded mr-2.5 mt-0.5 flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Outline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Calendar className="w-5.5 h-5.5 text-primary-600 mr-2.5" />
                Course Schedule & Curriculum
              </h2>

              <div className="space-y-6">
                {course.outline.map((section, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200/50 p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2.5">
                      {section.title}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 mr-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is it for? */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Users className="w-5.5 h-5.5 text-primary-600 mr-2.5" />
                Who Should Attend?
              </h2>

              <div className="bg-slate-100 border border-slate-200/40 p-6 rounded-2xl space-y-4">
                <p className="text-sm font-semibold text-slate-700">
                  This course requires absolutely NO programming, coding, or prior technical knowledge. It is built from the ground up for:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  {course.audience.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="p-0.5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Course Materials (auto-discovered from the materials folder) */}
            {materials.length > 0 && (
              <div id="coursematerial" className="space-y-5 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <FolderOpen className="w-5 h-5 text-primary-600 mr-2.5" />
                  Course Materials
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Open labs and documents in place, or download them for offline use.
                </p>
                <div className="space-y-3">
                  {materials.map((material) => {
                    const { icon: Icon, badgeClass, label } = materialPresentation(material.ext);
                    const viewable = material.kind !== 'other';
                    return (
                      <div
                        key={material.url}
                        className="group flex items-center gap-4 bg-white rounded-xl border border-slate-200/60 p-4 hover:border-primary-300 hover:shadow-sm transition-all"
                      >
                        <span className={`flex-shrink-0 w-11 h-11 rounded-lg border flex items-center justify-center ${badgeClass}`}>
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="flex-grow min-w-0">
                          <span className="block text-sm font-semibold text-slate-800 truncate">{material.name}</span>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                        </span>
                        <span className="flex items-center gap-2 flex-shrink-0">
                          {viewable && (
                            <button
                              type="button"
                              onClick={() => setViewingMaterial(material)}
                              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-100 rounded-lg transition-colors focus-ring"
                            >
                              Open
                            </button>
                          )}
                          <a
                            href={material.url}
                            download={material.name}
                            title="Download"
                            aria-label={`Download ${material.name}`}
                            className={`inline-flex items-center gap-1.5 rounded-lg transition-colors focus-ring ${viewable
                                ? 'p-2 text-slate-400 hover:text-primary-600 border border-slate-200 hover:border-primary-200'
                                : 'px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200'
                              }`}
                          >
                            <Download className="w-4 h-4" />
                            {!viewable && 'Download'}
                          </a>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Registration Form Container */}
          <div className="lg:col-span-5" ref={formRef}>
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg p-6 sm:p-8 sticky top-24">

              {course.registrationStatus === 'Closed' ? (
                <CompanyTrainingRequestForm course={course} />
              ) : course.registrationStatus === 'Upcoming' ? (
                <CourseInterestForm course={course} />
              ) : (
                <>
                  {/* Form header based on status */}
                  {regStatus === 'idle' && (
                    <>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Register Now</h2>
                      <p className="text-xs text-slate-500 mb-6">
                        Fill out the form below. Seat confirmation requires a verified email address.
                      </p>

                      {errorMsg && (
                        <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3.5 flex items-start space-x-2 text-rose-800 text-xs sm:text-sm mb-5">
                          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      {/* FORM */}
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

                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label htmlFor="firstName" className="block text-xs font-bold text-slate-700 mb-1">
                              First Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-xs font-bold text-slate-700 mb-1">
                              Last Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        {/* Registration Type selection */}
                        <div>
                          <span className="block text-xs font-bold text-slate-700 mb-2">
                            Registration Type <span className="text-rose-500">*</span>
                          </span>
                          <div className="grid grid-cols-2 gap-3">
                            <label className={`flex items-center justify-center p-3 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${formData.registrationType === 'individual'
                                ? 'border-primary-600 bg-primary-50/40 text-primary-700'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}>
                              <input
                                type="radio"
                                name="registrationType"
                                value="individual"
                                checked={formData.registrationType === 'individual'}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <span>Individual (Free)</span>
                            </label>

                            <label className={`flex items-center justify-center p-3 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${formData.registrationType === 'company'
                                ? 'border-primary-600 bg-primary-50/40 text-primary-700'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}>
                              <input
                                type="radio"
                                name="registrationType"
                                value="company"
                                checked={formData.registrationType === 'company'}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <span>Company (AED 400)</span>
                            </label>
                          </div>
                        </div>

                        {/* Company Conditional Fields */}
                        {formData.registrationType === 'company' && (
                          <div className="space-y-4 p-4.5 bg-slate-50 rounded-xl border border-slate-100 animate-fadeIn">
                            <div>
                              <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 mb-1">
                                Company Name <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                required={formData.registrationType === 'company'}
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                            <div>
                              <label htmlFor="jobTitle" className="block text-xs font-bold text-slate-700 mb-1">
                                Job Title / Role <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                required={formData.registrationType === 'company'}
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        )}

                        {/* Optional Fields toggle/inputs */}
                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                              Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
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

                        <div>
                          <label htmlFor="howDidYouHear" className="block text-xs font-bold text-slate-700 mb-1">
                            How did you hear about us? <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <select
                            id="howDidYouHear"
                            name="howDidYouHear"
                            value={formData.howDidYouHear}
                            onChange={handleInputChange}
                            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="">Select an option</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="search">Search Engine</option>
                            <option value="colleague">Colleague or Friend</option>
                            <option value="email">Email Newsletter</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Marketing Consent & Disclaimers */}
                        <div className="space-y-3 pt-2">
                          <label className="flex items-start cursor-pointer select-none text-xs text-slate-600">
                            <input
                              type="checkbox"
                              name="marketingConsent"
                              checked={formData.marketingConsent}
                              onChange={handleInputChange}
                              className="mt-0.5 mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                            />
                            <span>I agree to receive course-related communications about my registration.</span>
                          </label>

                          <p className="text-[10px] text-slate-400 leading-normal">
                            By submitting this form, you agree to our{' '}
                            <Link to="/privacy" className="text-primary-600 hover:underline">
                              Privacy Policy
                            </Link>{' '}
                            and{' '}
                            <Link to="/terms" className="text-primary-600 hover:underline">
                              Terms of Service
                            </Link>. Communications are handled in accordance with GDPR and UAE regulations.
                          </p>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 transition-colors rounded-xl shadow-md focus-ring mt-6"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing Registration...
                            </>
                          ) : (
                            'Submit Registration'
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  {/* PENDING EMAIL VERIFICATION STATE */}
                  {regStatus === 'pending_verification' && (
                    <div className="text-center py-8 space-y-5">
                      <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto border border-primary-100 shadow-inner">
                        <MailCheck className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">Verify Your Email</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          We have sent a verification link to <span className="font-semibold text-slate-900">{formData.email}</span>.
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 text-xs text-slate-500 leading-relaxed text-left">
                        <p className="font-semibold text-slate-700 mb-1">What's next?</p>
                        <ol className="list-decimal pl-4 space-y-1">
                          <li>Open your email inbox.</li>
                          <li>Click the <strong className="text-primary-600">Confirm Registration</strong> link.</li>
                          <li>Your registration status will become confirmed instantly.</li>
                        </ol>
                      </div>

                      <div className="border-t border-slate-100 pt-6">
                        {resendStatus === 'success' ? (
                          <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 py-2.5 px-3 rounded-lg border border-emerald-100 inline-block">
                            Verification email resent successfully!
                          </p>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-xs text-slate-500">Didn't receive the verification email?</p>
                            <button
                              onClick={handleResendToken}
                              disabled={resendStatus === 'loading'}
                              className="text-xs font-bold text-primary-600 hover:text-primary-700 disabled:text-slate-400 focus-ring px-3 py-1.5 rounded-lg border border-slate-200"
                            >
                              {resendStatus === 'loading' ? 'Resending...' : 'Resend Verification Email'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* DUPLICATE PENDING REGISTRATION STATE */}
                  {regStatus === 'duplicate_pending' && (
                    <div className="text-center py-8 space-y-5">
                      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-100">
                        <Info className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900">Email Registration Pending</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          A pending registration already exists for <span className="font-semibold text-slate-800">{formData.email}</span>.
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        Please verify your email address to confirm your registration. If you didn't receive the link, click below to resend it.
                      </p>

                      <div className="pt-4 space-y-4">
                        {resendStatus === 'success' ? (
                          <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 py-2.5 px-3 rounded-lg border border-emerald-100 inline-block">
                            Verification email resent!
                          </p>
                        ) : (
                          <button
                            onClick={handleResendToken}
                            disabled={resendStatus === 'loading'}
                            className="w-full py-2.5 text-xs font-bold text-primary-700 bg-primary-50 border border-primary-200 rounded-xl hover:bg-primary-100 focus-ring"
                          >
                            {resendStatus === 'loading' ? 'Resending...' : 'Resend Verification Email'}
                          </button>
                        )}
                        <button
                          onClick={() => setRegStatus('idle')}
                          className="text-xs text-slate-500 hover:text-slate-800 block mx-auto underline"
                        >
                          Use a different email address
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DUPLICATE CONFIRMED REGISTRATION STATE */}
                  {regStatus === 'duplicate_confirmed' && (
                    <div className="text-center py-8 space-y-5">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                        <Check className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900">Already Registered</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Your registration for <span className="font-semibold text-slate-850">{formData.email}</span> has already been confirmed.
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        You're set for the course. Joining links and reminder schedules will be sent separately. If you need support, please contact us.
                      </p>

                      <div className="pt-4">
                        <button
                          onClick={() => setRegStatus('idle')}
                          className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl focus-ring"
                        >
                          Register another participant
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ALREADY VERIFIED (COOKIE) STATE */}
                  {regStatus === 'already_verified' && (
                    <div className="text-center py-8 space-y-5">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                        <Check className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900">You're Registered</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {verifiedEmail ? (
                            <>Your registration for <span className="font-semibold text-slate-800">{verifiedEmail}</span> has been confirmed.</>
                          ) : (
                            <>Your registration for this course has been confirmed.</>
                          )}
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        You're set for the course. Joining links and reminder schedules will be sent separately. If you need support, please contact us.
                      </p>

                      <div className="pt-4">
                        <button
                          onClick={() => setRegStatus('idle')}
                          className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl focus-ring"
                        >
                          Register another participant
                        </button>
                      </div>
                    </div>
                  )}

                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Material Viewer Modal */}
      {viewingMaterial && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-slate-900/95"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${viewingMaterial.name}`}
        >
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-slate-900 border-b border-slate-700/60 flex-shrink-0">
            <div className="min-w-0 flex items-center gap-3">
              <span className="text-sm sm:text-base font-semibold text-slate-100 truncate">{viewingMaterial.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={viewingMaterial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors focus-ring"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in new tab
              </a>
              <a
                href={viewingMaterial.url}
                download={viewingMaterial.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors focus-ring"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
              <button
                type="button"
                onClick={() => setViewingMaterial(null)}
                aria-label="Close viewer"
                className="inline-flex items-center justify-center p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors focus-ring"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 bg-slate-800">
            {viewingMaterial.kind === 'html' || viewingMaterial.kind === 'pdf' ? (
              <iframe src={viewingMaterial.url} title={viewingMaterial.name} className="w-full h-full border-0" />
            ) : viewingMaterial.kind === 'image' ? (
              <div className="w-full h-full flex items-center justify-center p-6">
                <img src={viewingMaterial.url} alt={viewingMaterial.name} className="max-w-full max-h-full object-contain" />
              </div>
            ) : viewingMaterial.kind === 'video' ? (
              <div className="w-full h-full flex items-center justify-center p-6">
                <video src={viewingMaterial.url} controls className="max-w-full max-h-full" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-slate-400 text-sm">
                Preview is not available for this file type. Use "Download" instead.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
