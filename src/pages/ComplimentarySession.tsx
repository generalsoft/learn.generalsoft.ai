import { Sparkles, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import FinalCTA from '../components/FinalCTA';

export default function ComplimentarySession() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complimentary AI Futures Session for UAE Schools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Give your students an AI advantage.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A complimentary 45–60 minute interactive session covering AI and future careers, generative AI, responsible AI
            use, deepfakes and misinformation, future skills and live AI demonstrations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            {['45–60 minutes', 'Interactive', 'Practical', 'No obligation'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-600" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + WHAT'S COVERED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">What the session covers</h2>
            <ul className="space-y-3 text-slate-600">
              {[
                'AI and future careers',
                'Generative AI',
                'Responsible AI use',
                'Deepfakes and misinformation',
                'Future skills',
                'Live AI demonstrations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-sm text-emerald-900 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
              A limited number of complimentary sessions are available to UAE schools. Sessions can be delivered on-site or
              online, with no obligation.
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-7 sm:p-8">
              <LeadForm
                variant="school_session"
                heading="Request a Complimentary AI Futures Session"
                description="Complete the short form below and our team will contact you to arrange a suitable time."
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Want to go further?"
        description="Explore our full range of AI programmes for students, teachers, parents and school leadership."
      />
    </div>
  );
}
