import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { analytics } from '../services/analytics';

interface FinalCTAProps {
  heading?: string;
  description?: string;
}

/**
 * Reusable closing call-to-action band used across the site.
 * The default messaging is the consistent site-wide CTA from Section 12.
 */
export default function FinalCTA({ heading, description }: FinalCTAProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent_60%)]"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {heading || "Let's Make Your Organisation AI Ready."}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {description ||
              'Whether you are a business looking to empower your team or a school preparing students and teachers for the AI-powered future, we can design a practical programme around your needs.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              onClick={() => analytics.trackLeadClick('business')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-slate-950 font-bold hover:bg-slate-100 rounded-xl transition-all shadow-md"
            >
              Book an AI Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/schools"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-500 rounded-xl transition-all border border-primary-500/40"
            >
              Explore AI for Schools
            </Link>
            <Link
              to="/schools/complimentary-session"
              onClick={() => analytics.trackLeadClick('complimentary_session')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white rounded-xl transition-colors"
            >
              Request a Complimentary School Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
