import { MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinalCTA from '../components/FinalCTA';
import { site } from '../data/site';

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
              to="/business"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
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

      <FinalCTA
        heading="Let's make your organisation AI ready."
        description="Whether you're a growing company in RAKEZ or a school preparing students for the future, the first step is a short conversation about your goals."
      />
    </div>
  );
}
