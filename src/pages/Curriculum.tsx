import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Sparkles, Cpu, ListChecks, ArrowRight, BookOpen,
} from 'lucide-react';
import { curriculum, curriculumDomains, getGrade } from '../data/curriculum';
import { analytics } from '../services/analytics';
import FinalCTA from '../components/FinalCTA';

const domainMeta: Record<string, { icon: typeof Cpu; accent: string; chip: string; dot: string }> = {
  foundations: {
    icon: Cpu,
    accent: 'text-primary-600 bg-primary-50',
    chip: 'bg-primary-50 text-primary-700',
    dot: 'bg-primary-400',
  },
  responsible: {
    icon: ShieldCheck,
    accent: 'text-emerald-600 bg-emerald-50',
    chip: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-400',
  },
  applications: {
    icon: Sparkles,
    accent: 'text-indigo-600 bg-indigo-50',
    chip: 'bg-indigo-50 text-indigo-700',
    dot: 'bg-indigo-400',
  },
};

const countOutcomes = (g: (typeof curriculum)[number]) =>
  g.domains.reduce(
    (sum, d) => sum + d.strands.reduce((s, s2) => s + s2.standards.reduce((o, o2) => o + o2.outcomes.length, 0), 0),
    0,
  );

export default function Curriculum() {
  const [selectedGrade, setSelectedGrade] = useState('KG');
  const grade = getGrade(selectedGrade) ?? curriculum[0];

  const totalOutcomes = useMemo(() => curriculum.reduce((sum, g) => sum + countOutcomes(g), 0), []);

  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>UAE Ministry of Education Framework</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              AI Curriculum Framework — Student Learning Outcomes
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              A structured, grade-by-grade view of the UAE's official AI curriculum from Kindergarten to Grade 12,
              organised by domain, strand, standard and learning outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/schools/complimentary-session"
                onClick={() => analytics.trackLeadClick('complimentary_session')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-600/25 transition-all"
              >
                Bring this framework to your school
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href="#grade-browser"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
              >
                Browse by grade
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-7 space-y-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Framework at a glance</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '13', label: 'Grade levels (KG–12)' },
                  { value: '3', label: 'Core domains' },
                  { value: '7', label: 'Learning strands' },
                  { value: `${totalOutcomes}`, label: 'Learning outcomes' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                Source: UAE Curriculum Framework Structure (Student Learning Outcomes)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE DOMAINS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curriculumDomains.map((domain) => {
            const meta = domainMeta[domain.id];
            const Icon = meta.icon;
            return (
              <div key={domain.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${meta.accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 leading-snug">{domain.name}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{domain.description}</p>
                <ul className="space-y-2 pt-1">
                  {domain.strands.map((strand) => (
                    <li key={strand} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${meta.dot}`} />
                      {strand}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* GRADE BROWSER */}
      <section id="grade-browser" className="bg-white border-y border-slate-100 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore learning outcomes by grade
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Select a grade level to see the standards and student learning outcomes organised by domain and strand.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {curriculum.map((g) => {
              const active = g.grade === selectedGrade;
              return (
                <button
                  key={g.grade}
                  onClick={() => setSelectedGrade(g.grade)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all focus-ring ${
                    active ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  aria-pressed={active}
                >
                  {g.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{grade.label}</h3>
                <p className="text-sm text-slate-500">{countOutcomes(grade)} learning outcomes</p>
              </div>
            </div>

            {grade.domains.map((domain) => {
              const meta = domainMeta[domain.id];
              const Icon = meta.icon;
              return (
                <div key={domain.id} className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 sm:p-8">
                  <div className="flex items-start gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.accent} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{domain.name}</h4>
                      <p className="text-sm text-slate-500 mt-0.5">{domain.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {domain.strands.map((strand) => (
                      <div key={strand.name}>
                        <div className="mb-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${meta.chip}`}>
                            {strand.name}
                          </span>
                        </div>
                        <div className="space-y-4">
                          {strand.standards.map((standard) => (
                            <div key={standard.standard} className="bg-white rounded-xl border border-slate-200/70 p-5">
                              <p className="font-semibold text-slate-900 flex items-start gap-2">
                                <ListChecks className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                {standard.standard}
                              </p>
                              <ul className="mt-3 space-y-1.5 pl-6">
                                {standard.outcomes.map((outcome) => (
                                  <li key={outcome} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${meta.dot}`} />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Looking to teach this framework in your school?"
        description="Generalsoft helps UAE schools build practical AI capability that maps directly to the UAE AI curriculum framework — from teacher training to student workshops."
      />
    </div>
  );
}
