import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2, AlertTriangle, AlertCircle, Loader2, ArrowRight,
  Calendar, Clock, Globe, ShieldAlert, Sparkles
} from 'lucide-react';
import { verifyEmailToken, resendVerificationEmail } from '../services/api';
import { analytics } from '../services/analytics';
import { courses } from '../courses/courseData';
import { setCookie, REGISTRATION_COOKIE } from '../services/cookies';

type VerificationState = 'loading' | 'confirmed' | 'expired' | 'invalid' | 'error';

export default function VerifyRegistration() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  // When the emailed link points directly at the verifyEmail Cloud Function,
  // it verifies the record (Admin SDK) and redirects back here with these
  // params so the SPA can set the cookie and render the confirmation page.
  const redirectState = searchParams.get('state');
  const rid = searchParams.get('rid');
  const redirectMessage = searchParams.get('message');

  // States
  const [state, setState] = useState<VerificationState>('loading');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Let's assume the course is AI Soup to Nuts for version 1 confirmation details
  const course = courses[0];

  useEffect(() => {
    // Preferred path: the Cloud Function already verified the record and
    // redirected back with an explicit state. No client-side Firestore write
    // is required (and none should be attempted).
    if (redirectState === 'verified' || redirectState === 'error') {
      if (redirectState === 'verified') {
        if (rid) {
          setCookie(REGISTRATION_COOKIE, rid);
        }
        setState('confirmed');
        analytics.trackEmailVerified(course.id);
        analytics.trackRegistrationComplete(course.id);
      } else {
        applyRedirectError();
      }
      return;
    }

    if (!token) {
      setState('invalid');
      setErrorMsg('The verification link is missing a secure token.');
      return;
    }

    // Legacy/fallback path: the link pointed directly at the SPA /verify page.
    // Attempt a client-side verification token lookup.
    const performVerification = async () => {
      try {
        const response = await verifyEmailToken(token);

        if (response.success) {
          setState('confirmed');
          analytics.trackEmailVerified(course.id);
          analytics.trackRegistrationComplete(course.id);

          // Remember the registration document id so the course page can
          // recognize this verified user on subsequent visits.
          const registrationId = response.data?.id;
          if (registrationId) {
            setCookie(REGISTRATION_COOKIE, registrationId);
          }
        } else {
          const msg = response.message.toLowerCase();
          if (msg.includes('expired')) {
            setState('expired');
          } else if (msg.includes('already verified') || msg.includes('already confirmed')) {
            setState('confirmed');
          } else {
            setState('error');
            setErrorMsg(response.message);
          }
        }
      } catch (err) {
        setState('error');
        setErrorMsg('Could not connect to the verification server. Please check your network and try again.');
      }
    };

    performVerification();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectState, rid, token, course.id]);

  function applyRedirectError() {
    const msg = (redirectMessage || '').toLowerCase();
    if (msg.includes('expired')) {
      setState('expired');
    } else if (msg.includes('already verified') || msg.includes('already confirmed')) {
      setState('confirmed');
    } else if (msg.includes('invalid') || msg.includes('token')) {
      setState('invalid');
      setErrorMsg(redirectMessage || 'The verification link you followed is invalid or has already been used.');
    } else {
      setState('error');
      setErrorMsg(redirectMessage || 'An error occurred during verification.');
    }
  }

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) return;

    setResendStatus('loading');
    try {
      const response = await resendVerificationEmail(resendEmail, course.id);
      if (response.success) {
        setResendStatus('success');
      } else {
        setResendStatus('error');
        setErrorMsg(response.message);
      }
    } catch (err) {
      setResendStatus('error');
      setErrorMsg('Failed to resend. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden">

        {/* Loading State */}
        {state === 'loading' && (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto" />
            <h1 className="text-xl font-bold text-slate-900">Verifying Email Address</h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Please wait while we confirm your secure token with our database...
            </p>
          </div>
        )}

        {/* Confirmed State */}
        {state === 'confirmed' && (
          <div>
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-600 p-8 text-center text-white relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10"></div>
              <CheckCircle2 className="w-14 h-14 text-white mx-auto mb-4 drop-shadow-sm" />
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-white/10 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
                Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Registration Confirmed</h1>
              <p className="text-emerald-100/90 text-sm mt-1">You're registered for {course.title}!</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Event Cards */}
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 space-y-3.5">
                <div className="flex items-center text-sm text-slate-700">
                  <Calendar className="w-4.5 h-4.5 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span className="font-semibold text-slate-900 mr-2">Dates:</span>
                  <span>{course.dates}</span>
                </div>
                <div className="flex items-center text-sm text-slate-700">
                  <Clock className="w-4.5 h-4.5 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span className="font-semibold text-slate-900 mr-2">Time:</span>
                  <span>{course.time} {course.timezone} (Break: {course.breakTime})</span>
                </div>
                <div className="flex items-center text-sm text-slate-700">
                  <Globe className="w-4.5 h-4.5 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span className="font-semibold text-slate-900 mr-2">Format:</span>
                  <span>{course.deliveryMethod} (Live Video stream)</span>
                </div>
              </div>

              {/* Success information */}
              <div className="space-y-4.5">
                <h3 className="font-bold text-slate-900 text-sm">Joining Instructions</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We have verified your registration details. A final calendar invite along with links, resources, and connection guidelines will be sent to your email address before the event starts.
                </p>
                <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-800 leading-relaxed">
                  <Sparkles className="w-4 h-4 text-primary-600 inline mr-2 -mt-0.5" />
                  Check your spam or junk folder if you don't receive the confirmation email in the next few minutes.
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                  Back to Homepage
                </Link>
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg shadow-sm focus-ring"
                >
                  Explore More Courses
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Expired Token State */}
        {state === 'expired' && (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-100">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">Verification Link Expired</h1>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Secure registration verification tokens expire after 24 hours. You can easily request a new link below.
              </p>
            </div>

            {resendStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4.5 text-emerald-800 text-sm text-left">
                <h4 className="font-bold mb-1">New Link Sent!</h4>
                <p className="text-xs">We have emailed a fresh verification link. Please check your inbox and confirm within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleResend} className="max-w-md mx-auto space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your registered email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="flex-grow text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    disabled={resendStatus === 'loading'}
                    className="inline-flex items-center px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold transition-colors rounded-lg text-sm disabled:bg-primary-400 focus-ring"
                  >
                    {resendStatus === 'loading' ? 'Sending...' : 'Resend Link'}
                  </button>
                </div>
                {resendStatus === 'error' && (
                  <p className="text-xs text-rose-600 text-left">{errorMsg || 'Failed to request. Check email input.'}</p>
                )}
              </form>
            )}

            <div className="border-t border-slate-100 pt-6">
              <Link to="/courses/ai-soup-to-nuts" className="text-sm font-semibold text-primary-600 hover:underline">
                Return to Course Page
              </Link>
            </div>
          </div>
        )}

        {/* Invalid Token State */}
        {state === 'invalid' && (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">Invalid Link</h1>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                {errorMsg || 'The verification link you followed is malformed, broken, or has already been used.'}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6 flex justify-center space-x-6 text-sm">
              <Link to="/" className="text-slate-500 hover:text-slate-900 font-medium">
                Home Page
              </Link>
              <Link to="/courses/ai-soup-to-nuts" className="text-primary-600 hover:underline font-semibold">
                Register Anew
              </Link>
            </div>
          </div>
        )}

        {/* Generic Error State */}
        {state === 'error' && (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">Verification Error</h1>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                {errorMsg || 'An error occurred during verification. Please try again.'}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm focus-ring"
              >
                Retry Verification
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}