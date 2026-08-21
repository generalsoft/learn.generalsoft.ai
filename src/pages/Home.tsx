import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Globe, ArrowRight, ShieldCheck, Sparkles, Zap, Users } from 'lucide-react';
import { analytics } from '../services/analytics';

export default function Home() {
  useEffect(() => {
    // Track page view
    analytics.trackCourseView('home');
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background visual details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[5%] w-[40%] h-[60%] rounded-full bg-primary-100/50 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[50%] rounded-full bg-indigo-100/40 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              <span>Registration Open</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              AI Soup <span className="text-gradient">to Nuts</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              A practical, non-technical journey through AI — from the basics to real-world use. Designed for business professionals and executives.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/courses/ai-soup-to-nuts"
                onClick={() => analytics.trackRegisterClick('ai-soup-to-nuts')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 transition-all rounded-xl shadow-lg shadow-primary-600/25 focus-ring"
              >
                Register for AI Soup to Nuts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 active:bg-slate-100 transition-all rounded-xl focus-ring"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Right Column: Event Details Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/80 border border-slate-100 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 -z-10"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Next Cohort</span>
                  <span className="text-2xl font-bold text-slate-800">August 2026</span>
                </div>
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-xs font-bold border border-primary-100">
                  Featured Course
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="space-y-5">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-100">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Dates</h4>
                    <p className="text-sm font-semibold text-slate-800">August 28–29, 2026</p>
                    <p className="text-xs text-slate-500">Friday & Saturday</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Time & Timezone</h4>
                    <p className="text-sm font-semibold text-slate-800">09:30 AM – 4:30 PM</p>
                    <p className="text-xs text-slate-500">Break: 12:30 PM – 2:00 PM • UAE time (GST / UTC+4)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-100">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Format</h4>
                    <p className="text-sm font-semibold text-slate-800">Online Live Session</p>
                    <p className="text-xs text-slate-500">Interactive lectures & hands-on exercises</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 my-6"></div>

              {/* Pricing breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/50">
                  <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Individuals</span>
                  <span className="text-lg font-extrabold text-emerald-700">FREE</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 block mb-1">Companies</span>
                  <span className="text-base font-extrabold text-slate-800">AED 400</span>
                  <span className="text-[10px] text-slate-500 block leading-none">per attendee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="bg-slate-100/60 border-y border-slate-200/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Why Learn with Generalsoft?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed font-medium">
              We move past the coding syntax and mathematical jargon to focus on practical, ready-to-use workflows that directly translate to everyday business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/40 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Practical & Practical Workflows</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Step-by-step guidance on how to write prompts, analyze heavy documents, compile research notes, and automate tasks in minutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/40 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tailored for Business</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Perfect for managers, executives, and leaders. We address return-on-investment, department integrations, and strategic scaling of technology.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/40 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Trustworthy & Secure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Crucial guidance on corporate guidelines, privacy boundaries, data leakage risks, and security considerations when utilizing LLMs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Highlight Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_60%)]"></div>
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to harness AI for your business?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Join our live cohort on August 28–29, 2026. Secure your free seat as an individual, or register your company team today.
            </p>
            <div className="pt-2">
              <Link
                to="/courses/ai-soup-to-nuts"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-950 font-bold hover:bg-slate-100 rounded-xl transition-all shadow-md focus-ring"
              >
                Register Now
                <ArrowRight className="w-4 h-4 ml-2 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
