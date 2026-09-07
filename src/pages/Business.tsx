import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Check, Zap, Users, ShieldCheck, Layers, MapPin } from 'lucide-react';
import { programmeCategories } from '../data/programmes';
import { analytics } from '../services/analytics';
import LeadForm from '../components/LeadForm';
import FinalCTA from '../components/FinalCTA';

export default function Business() {
  const business = programmeCategories.find((c) => c.id === 'business')!;

  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>AI Training for Business</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Help your organisation work smarter with AI.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Practical AI training for teams, managers and professionals — from everyday productivity and generative AI to
              department-specific workflows and AI strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/contact"
                onClick={() => analytics.trackLeadClick('business')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-600/25 transition-all"
              >
                Book an AI Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href="#programmes"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
              >
                Explore Programmes
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-7 space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-500 uppercase tracking-wider text-xs">We train</p>
              {['Executives & leadership', 'Managers & team leaders', 'Departments & teams', 'Whole organisations'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">AI for Business programmes</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{business.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.programmes.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="text-sm text-primary-600 font-medium mt-1">{p.tagline}</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{p.whoFor}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.learn.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-500 space-y-1">
                <p><span className="font-semibold text-slate-700">Duration:</span> {p.duration}</p>
                <p><span className="font-semibold text-slate-700">Delivery:</span> {p.delivery}</p>
                {p.customised && <p className="text-emerald-600 font-semibold">✓ Customised to your organisation</p>}
              </div>
              <div className="mt-auto pt-5">
                <Link
                  to="/contact"
                  onClick={() => analytics.trackCourseEnquiry(p.id)}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Request a Programme
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* WHY TRAIN WITH GENERALSOFT */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why organisations choose Generalsoft
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Zap className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-slate-900">Practical, Not Theoretical</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Real-world use, not AI jargon.</p>
            </div>
            <div className="space-y-3">
              <MapPin className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-slate-900">Built for the UAE</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Designed for UAE organisations and environments.</p>
            </div>
            <div className="space-y-3">
              <Users className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-slate-900">For the Whole Organisation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Leadership, employees, teams and departments.</p>
            </div>
            <div className="space-y-3">
              <ShieldCheck className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-slate-900">Responsible AI</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Privacy, accuracy and appropriate use built in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Book an AI consultation
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Tell us about your organisation and goals, and we'll recommend a practical starting point — whether it's a
              leadership briefing, team workshop or a full AI readiness programme.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {['Tailored to your objectives', 'Online or onsite (UAE)', 'No technical background required'].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-7 sm:p-8">
              <LeadForm
                variant="business"
                heading="Book an AI Consultation"
                description="Complete the form and our team will contact you to arrange a consultation."
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to build an AI-ready team?"
        description="Whether you're starting with a single workshop or a whole-organisation programme, we can design practical AI training around your needs."
      />
    </div>
  );
}

