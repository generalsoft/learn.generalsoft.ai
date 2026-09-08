import { Link } from 'react-router-dom';
import {
  School, GraduationCap, BookOpen, Users, Compass, ListChecks, Sparkles,
  ArrowRight, Clock, ShieldCheck,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import LeadForm from '../components/LeadForm';
import FinalCTA from '../components/FinalCTA';

export default function Schools() {
  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <School className="w-3.5 h-3.5" />
              <span>AI Training for Schools in the UAE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              AI Ready Schools UAE
            </h1>
            <p className="text-xl text-slate-700 font-medium">
              Preparing students, teachers and schools for the AI-powered future.
            </p>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              AI is changing how students learn, how teachers work and how future careers will evolve. Generalsoft helps
              UAE schools build practical AI capability across the entire school community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/schools/complimentary-session"
                onClick={() => analytics.trackLeadClick('complimentary_session')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
              >
                Request a Complimentary AI Futures Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/schools/ai-readiness"
                onClick={() => analytics.trackLeadClick('ai_readiness')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
              >
                Book an AI Readiness Consultation
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-7 space-y-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Who we work with</p>
              <div className="space-y-3 text-slate-700 text-sm">
                {[
                  'School principals & owners',
                  'Heads of innovation & digital learning',
                  'Teacher-training coordinators',
                  'Teachers & students',
                  'Parents & school leadership',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                UAE schools · RAKEZ · Ras Al Khaimah · across the Emirates
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROGRAMMES: STUDENTS / TEACHERS / PARENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        {/* Students */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">For Students</p>
              <h2 className="text-2xl font-extrabold text-slate-900">AI Futures: The World of Tomorrow</h2>
              <p className="text-slate-600 leading-relaxed">Interactive sessions that prepare students for the AI-powered world.</p>
              <Link
                to="/schools/complimentary-session"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
              >
                Book a Student Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-sm text-slate-600">
              {[
                'How AI is changing careers', 'Generative AI', 'AI and learning',
                'Responsible AI', 'Deepfakes & misinformation', 'Prompting',
                'Future skills', 'AI demonstrations', 'Interactive challenges',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teachers */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">For Teachers</p>
              <h2 className="text-2xl font-extrabold text-slate-900">AI for Teachers: Work Smarter, Teach Better</h2>
              <p className="text-slate-600 leading-relaxed">Practical professional development for busy teachers.</p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
              >
                Book Teacher Training
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-sm text-slate-600">
              {[
                'Lesson planning', 'Learning resources', 'Assessments',
                'Differentiated learning', 'Feedback', 'Administrative productivity',
                'Prompting', 'Responsible AI', 'Classroom use of AI',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parents */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">For Parents</p>
              <h2 className="text-2xl font-extrabold text-slate-900">Your Child & AI: What Parents Need to Know</h2>
              <p className="text-slate-600 leading-relaxed">Clear, practical guidance for parents and guardians.</p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
              >
                Request a Parent Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-sm text-slate-600">
              {[
                'AI and homework', 'Responsible AI use', 'Academic integrity',
                'Privacy', 'Deepfakes', 'Misinformation',
                'Future careers', 'How parents can support children',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* UAE AI CURRICULUM FRAMEWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-tr from-primary-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Aligned to the UAE AI Curriculum</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                UAE AI Curriculum Framework — Student Learning Outcomes
              </h2>
              <p className="text-white/90 leading-relaxed">
                Our school programmes map directly to the UAE Ministry of Education's official AI curriculum framework,
                covering Kindergarten through Grade 12 across three domains and seven strands.
              </p>
              <Link
                to="/curriculum"
                onClick={() => analytics.trackLeadClick('school')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-primary-700 bg-white hover:bg-primary-50 rounded-xl transition-all"
              >
                Explore the Curriculum Framework
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {[
                { icon: Sparkles, title: 'AI Foundations', sub: 'Core principles & data' },
                { icon: ShieldCheck, title: 'Responsible & Ethical AI', sub: 'Fairness, privacy & policy' },
                { icon: GraduationCap, title: 'Applications & Innovation', sub: 'Projects & real-world AI' },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 border border-white/15 rounded-2xl p-4 flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="text-white/70 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* WHOLE-SCHOOL AI READINESS */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                From "What should we do about AI?" to "Here's our AI strategy."
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We help schools assess and improve AI readiness across the whole community — leadership, teachers, students,
                parents, policy and future skills.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                {['Leadership', 'Teachers', 'Students', 'Parents', 'Policy', 'Future Skills'].map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">{item}</span>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to="/schools/ai-readiness"
                  onClick={() => analytics.trackLeadClick('ai_readiness')}
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
                >
                  Assess Your School's AI Readiness
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-7">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <ListChecks className="w-5 h-5 text-primary-600 mr-2" />
                Whole-school AI readiness includes
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-600">
                <li>AI Readiness Assessment</li>
                <li>Leadership strategy session</li>
                <li>Teacher AI training</li>
                <li>Student workshops</li>
                <li>Parent awareness</li>
                <li>Responsible AI guidance</li>
                <li>AI policy consultation</li>
                <li>Student AI challenges</li>
                <li>Follow-up recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIMENTARY SESSION (major lead generator) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-tr from-emerald-600 to-emerald-700 rounded-3xl p-8 text-white h-full">
              <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complimentary AI Futures Session</span>
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Give your students an AI advantage.
              </h2>
              <p className="mt-4 text-emerald-50 leading-relaxed">
                A complimentary 45–60 minute interactive session for UAE schools covering:
              </p>
              <ul className="mt-5 space-y-2 text-sm text-emerald-50">
                {[
                  'AI and future careers',
                  'Generative AI',
                  'Responsible AI use',
                  'Deepfakes and misinformation',
                  'Future skills',
                  'Live AI demonstrations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-200 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
                {['45–60 minutes', 'Interactive', 'Practical', 'No obligation'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1.5">
                    <Clock className="w-3.5 h-3.5" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-7">
              <LeadForm
                variant="school_session"
                heading="Request a Complimentary AI Futures Session"
                description="Tell us a little about your school and we'll be in touch to arrange a session."
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to make your school AI ready?"
        description="Whether you are a principal, head of innovation or teacher-training coordinator, we can design a practical AI programme around your school's needs."
      />
    </div>
  );
}

