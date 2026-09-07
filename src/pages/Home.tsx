import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Building2, School, Brain, Target, GraduationCap,
  BookOpen, Users, ListChecks, Compass, Zap, MapPin, ShieldCheck, Layers,
  Clock,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { resources } from '../data/resources';
import { site } from '../data/site';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  useEffect(() => {
    analytics.trackCourseView('home');
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background visual details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[5%] w-[40%] h-[60%] rounded-full bg-primary-100/50 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[50%] rounded-full bg-emerald-100/40 blur-[100px]" />
      </div>

      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center flex-wrap gap-x-2.5 gap-y-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>UAE</span><span className="text-slate-300">·</span>
            <span>AI Training</span><span className="text-slate-300">·</span>
            <span>Businesses</span><span className="text-slate-300">·</span>
            <span>Schools</span><span className="text-slate-300">·</span>
            <span>RAKEZ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            AI Training for the People <span className="text-gradient">Building the Future</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 font-medium">
            Practical AI training for UAE businesses, schools and professionals.
          </p>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Help your teams, teachers and students understand and use AI effectively, responsibly and confidently.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              onClick={() => analytics.trackLeadClick('business')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 transition-all rounded-xl shadow-lg shadow-primary-600/25 focus-ring"
            >
              Book an AI Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/schools"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 active:bg-slate-100 transition-all rounded-xl focus-ring"
            >
              Explore AI for Schools
            </Link>
          </div>
          <div className="pt-1">
            <Link
              to="/schools/complimentary-session"
              onClick={() => analytics.trackLeadClick('complimentary_session')}
              className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4"
            >
              Request a Complimentary AI Futures Session
            </Link>
          </div>
        </div>
      </section>
      {/* 2. AUDIENCE PATHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business card */}
          <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-8 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">AI for Business</h2>
            <p className="text-primary-600 font-semibold mt-1">Help your organisation work smarter with AI.</p>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Practical AI training for teams, managers and professionals.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
              <li>AI productivity</li>
              <li>Generative AI</li>
              <li>AI for business</li>
              <li>Prompt engineering</li>
              <li>AI tools</li>
              <li>Department-specific AI</li>
              <li>Executive AI awareness</li>
              <li>AI strategy</li>
            </ul>
            <div className="mt-auto pt-6">
              <Link
                to="/business"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-100 rounded-xl transition-colors"
              >
                Explore Business AI Training
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Schools card (visually prominent) */}
          <div className="bg-gradient-to-tr from-emerald-50 to-white rounded-2xl border-2 border-emerald-200 shadow-md p-8 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <School className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">AI for Schools</h2>
            <p className="text-emerald-700 font-semibold mt-1">Prepare your students and teachers for the AI-powered future.</p>
            <p className="text-slate-600 mt-3 leading-relaxed">
              AI programmes for students, teachers, parents and school leadership.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
              <li>AI literacy</li>
              <li>Future careers</li>
              <li>Responsible AI</li>
              <li>Teacher productivity</li>
              <li>AI readiness</li>
              <li>Student AI challenges</li>
            </ul>
            <div className="mt-auto pt-6">
              <Link
                to="/schools"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
              >
                Explore AI for Schools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY AI READINESS MATTERS */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why AI readiness matters
          </h2>
          <p className="text-xl text-slate-700 font-semibold">AI is changing the workplace and education.</p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We help UAE organisations and schools prepare their people for it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/business"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
            >
              Business → AI Training
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/schools"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
            >
              School → AI Ready Schools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* 4. STUDENTS / TEACHERS / PARENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI programmes for the whole school community
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Practical, age-appropriate AI learning for everyone involved in education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-7 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Students</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              AI literacy, future careers, responsible AI and interactive challenges that prepare students for the world ahead.
            </p>
            <Link to="/schools" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
              Explore student sessions <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-7 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Teachers</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Professional development on lesson planning, resources, assessment, feedback and classroom use of AI.
            </p>
            <Link to="/schools" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
              Explore teacher training <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-7 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Parents</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              What parents need to know about AI and children — homework, integrity, privacy and how to support learning.
            </p>
            <Link to="/schools" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
              Explore parent sessions <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHOLE-SCHOOL AI READINESS */}
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
                Generalsoft helps schools assess and improve their AI readiness across the entire community — from leadership
                to the classroom.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                {['Leadership', 'Teachers', 'Students', 'Parents', 'Policy', 'Future Skills'].map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">{item}</span>
                ))}
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
              <div className="pt-6">
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
          </div>
        </div>
      </section>
      {/* 6. CORPORATE AI TRAINING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-slate-50 rounded-2xl border border-slate-200/60 p-7">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 text-primary-600 mr-2" />
              Corporate AI training
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-600">
              <li>AI productivity</li>
              <li>Generative AI</li>
              <li>Prompt engineering</li>
              <li>AI for marketing</li>
              <li>AI for HR</li>
              <li>AI for management</li>
              <li>Executive AI awareness</li>
              <li>AI strategy</li>
            </ul>
            <div className="pt-6">
              <Link
                to="/business"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
              >
                Explore Business AI Training
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Practical AI training for UAE organisations
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We train leadership, managers and teams to use AI productively in their real work — from everyday productivity
              to department-specific workflows and AI strategy. Programmes are tailored to your organisation and delivered
              online or onsite.
            </p>
          </div>
        </div>
      </section>

      {/* 7. RAKEZ / RAS AL KHAIMAH */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                AI Training in RAKEZ & Ras Al Khaimah
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Practical AI training for organisations, schools and professionals in the RAKEZ ecosystem.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-600">
                <li>Corporate AI training</li>
                <li>School AI programmes</li>
                <li>Teacher training</li>
                <li>Student workshops</li>
                <li>Professional development</li>
                <li>AI readiness consulting</li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/rakez"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                >
                  Explore RAKEZ AI Training
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <p className="text-2xl font-bold leading-snug">Based in {site.location}.</p>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                We deliver AI training and readiness support on-site across Ras Al Khaimah and online across the UAE —
                built for the local business and education environment.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 8. WHY GENERALSOFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Why Generalsoft?</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A serious AI training partner serving the UAE — practical, responsible and tailored to your people.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-3">
            <Zap className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-slate-900">Practical, Not Theoretical</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Training focuses on real-world use rather than AI terminology.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-3">
            <MapPin className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-slate-900">Built for the UAE</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Programmes are designed for UAE organisations and educational environments.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-3">
            <Users className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-slate-900">For the Whole Organisation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">We train leadership, employees, teachers, students and parents.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-3">
            <ShieldCheck className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-slate-900">Responsible AI</h3>
            <p className="text-sm text-slate-600 leading-relaxed">We address privacy, misinformation, academic integrity, ethics and appropriate use.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-3">
            <Layers className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-slate-900">Tailored Programmes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Training can be adapted to the organisation, department, age group and objectives.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-3">
            <Target className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-slate-900">Outcome Focused</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Every session connects AI to the outcomes and workflows that matter to you.</p>
          </div>
        </div>
      </section>

      {/* 9. SOCIAL PROOF (honest placeholder — no fabricated logos/testimonials) */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bringing AI Training to UAE Organisations
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We work with businesses, schools and professionals across the UAE — including RAKEZ and Ras Al Khaimah.
            Case studies and programme statistics will be published here as our client work grows.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Learn more about Generalsoft <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
      {/* 10. COMPLIMENTARY SCHOOL SESSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-tr from-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_55%)]"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary AI Futures Session for UAE Schools</span>
            </div>
            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Give your students an AI advantage.
            </h2>
            <p className="mt-4 text-emerald-50 leading-relaxed">
              We are offering a limited number of UAE schools a complimentary 45–60 minute interactive session covering:
            </p>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-emerald-50">
              <li>AI and future careers</li>
              <li>Generative AI</li>
              <li>Responsible AI use</li>
              <li>Deepfakes and misinformation</li>
              <li>Future skills</li>
              <li>Live AI demonstrations</li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
              {['45–60 minutes', 'Interactive', 'Practical', 'No obligation'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1.5">
                  <Clock className="w-3.5 h-3.5" /> {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/schools/complimentary-session"
                onClick={() => analytics.trackLeadClick('complimentary_session')}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-700 font-bold hover:bg-emerald-50 rounded-xl transition-colors shadow-md"
              >
                Request a Complimentary Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/schools/ai-readiness"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-white/40 hover:bg-white/10 rounded-xl transition-colors"
              >
                Book an AI Readiness Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Resources</h2>
            <p className="mt-2 text-slate-600">Practical guidance on AI adoption across the UAE.</p>
          </div>
          <Link to="/resources" className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all resources <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              to={`/resources/${article.slug}`}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group"
            >
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{article.category}</span>
              <h3 className="mt-2 font-bold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{article.excerpt}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600">
                Read article <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <FinalCTA />
    </div>
  );
}
