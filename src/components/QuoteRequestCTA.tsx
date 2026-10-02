import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { analytics } from '../services/analytics';
import { getQuoteRequestPath } from '../services/quoteRequest';

interface QuoteRequestCTAProps {
  /**
   * Placement identifier reported to analytics (e.g. `business_page`,
   * `course_closed`, `navbar`) so the team can see which CTA drives quotes.
   */
  source: string;
  heading?: string;
  description?: string;
  /** Programme the surrounding copy promised — prefills the quote form topic. */
  topic?: string;
  ctaLabel?: string;
}

const POINTS = [
  'Tailored quote by email',
  'No payment now',
  'Online or on-site across the UAE',
];

/**
 * The single request call to action used everywhere a form used to live
 * (consultation, complimentary session, AI readiness, course request, …).
 *
 * Every enquiry now funnels into the AI training quote form at `/quote`, so
 * this panel is intentionally the most prominent element on the page: gradient
 * highlight border, gradient badge and a large primary button.
 */
export default function QuoteRequestCTA({
  source,
  heading = 'Request your AI training quote',
  description = "Tell us what you'd like taught, to whom, and when. You'll get a tailored quote by email — no payment and no obligation.",
  topic,
  ctaLabel = 'Request my quote',
}: QuoteRequestCTAProps) {
  const path = getQuoteRequestPath(topic);

  return (
    <div className="relative rounded-2xl bg-gradient-to-tr from-primary-700 via-primary-600 to-indigo-600 p-[2px] shadow-xl shadow-primary-600/20">
      <div className="rounded-[14px] bg-white p-7 sm:p-8 space-y-5">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The fast way to get a quote</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {heading}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{description}</p>

        {topic && (
          <p className="text-xs font-semibold text-slate-500">
            Topic pre-filled:{' '}
            <span className="text-primary-700 font-bold">{topic}</span>
          </p>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3">
          <Link
            to={path}
            onClick={() => analytics.trackQuoteRequestClick(source, topic)}
            className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-600/25 transition-all focus-ring"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <span className="text-xs text-slate-400">Takes about 2 minutes · no obligation</span>
        </div>
      </div>
    </div>
  );
}
