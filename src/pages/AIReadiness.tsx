import { Compass, CheckCircle2 } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import FinalCTA from '../components/FinalCTA';

export default function AIReadiness() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>AI Readiness Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            How AI ready is your school?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Take the first step with a complimentary AI Readiness Consultation for your school leadership team.
          </p>
        </div>
      </section>

      {/* FORM + WHAT'S ASSESSED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">What we assess</h2>
            <ul className="space-y-3 text-slate-600">
              {[
                'Teacher AI capability',
                'Student AI literacy',
                'Responsible AI',
                'AI policy',
                'Parent awareness',
                'AI and future careers',
                'School leadership readiness',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 leading-relaxed">
              After the consultation, you'll receive clear, prioritised recommendations for building AI capability across
              your school.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-7 sm:p-8">
              <LeadForm
                variant="ai_readiness"
                heading="Request My AI Readiness Consultation"
                description="Tell us a little about your school and we'll arrange a complimentary consultation."
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to become AI ready?"
        description="We can help your school move from questions about AI to a clear, practical AI strategy."
      />
    </div>
  );
}
