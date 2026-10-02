import { MapPin, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinalCTA from '../components/FinalCTA';
import QuoteRequestCTA from '../components/QuoteRequestCTA';
import { site } from '../data/site';
import { analytics } from '../services/analytics';
import { getQuoteRequestPath } from '../services/quoteRequest';

export default function Rakez() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>RAKEZ & Ras Al Khaimah</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            AI Training in RAKEZ & Ras Al Khaimah
          </h1>
          <p className="text-xl text-slate-700 font-medium">
            Practical AI training for organisations, schools and professionals in the RAKEZ ecosystem.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Based in {site.location}, we deliver AI training and readiness support on-site across Ras Al Khaimah and online
            across the UAE — built for the local business and education environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to={getQuoteRequestPath()}
              onClick={() => analytics.trackQuoteRequestClick('rakez_hero')}
              className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-xl shadow-primary-600/30 ring-2 ring-primary-500/30 transition-all focus-ring"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Request an AI Training Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/business"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
            >
              Explore Business AI Training
            </Link>
            <Link
              to="/schools"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
            >
              Explore AI for Schools
            </Link>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Corporate AI training',
            'School AI programmes',
            'Teacher training',
            'Student workshops',
            'Professional development',
            'AI readiness consulting',
          ].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-slate-200/60 p-6 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="font-semibold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE REQUEST (single request funnel, with the RAKEZ member option) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              RAKEZ members: request your quote
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Choose “RAKEZ member” in the quote form and add your licence number so we can apply RAKEZ pricing and plan
              sessions at your facility.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {['On-site at your RAKEZ facility', 'Online across the UAE', 'RAKEZ member pricing'].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <QuoteRequestCTA
              source="rakez_page"
              heading="Request an AI training quote"
              description="Tell us what you'd like taught, who is attending and when. If you're a RAKEZ member, mention your licence number and we'll include member pricing in the quote."
            />
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Let's make your organisation AI ready."
        description="Whether you're a growing company in RAKEZ or a school preparing students for the future, the first step is a short conversation about your goals."
      />
    </div>
  );
}
