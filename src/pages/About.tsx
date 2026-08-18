import { ShieldCheck, Target, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About GeneralSoft Learning
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
          We bridge the gap between complex emerging technologies and everyday business application. Our training is designed for professionals who want to lead in the AI era.
        </p>
      </div>

      {/* Grid: Mission and Values */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Technology is moving faster than ever, creating a massive skills gap for leaders, managers, and executives. GeneralSoft Learning was founded to address this challenge by delivering highly approachable, non-technical training that focuses on real-world outcomes rather than code syntax.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Based in Dubai, UAE, we provide professional development workshops that empower teams to adopt tools like generative AI, streamline document analysis, automate reporting, and scale productivity safely.
          </p>
        </div>

        <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-slate-200/40">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Outcome Focused</h3>
            <p className="text-xs text-slate-500">Every lesson translates directly into a daily workflow you can deploy immediately.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Non-Technical</h3>
            <p className="text-xs text-slate-500">Designed from the ground up for business professionals, leaders, and consultants.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Privacy Conscious</h3>
            <p className="text-xs text-slate-500">We prioritize corporate security guidelines, data boundaries, and safe AI usage.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">High Quality</h3>
            <p className="text-xs text-slate-500">Structured courses, comprehensive worksheets, and dedicated post-course support.</p>
          </div>
        </div>
      </div>
      
      {/* Instructor Spot or Tagline */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-3">Learn from Practitioners</h3>
        <p className="text-xs sm:text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
          Our trainers are technology consultants who advise organizations on software architecture, integrations, and AI deployments. You get insights from real-world digital transformations.
        </p>
      </div>
    </div>
  );
}
