import { Link } from 'react-router-dom';
import { Target, Building2, School, MapPin, ShieldCheck, Users, Zap, ArrowRight } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import FacultyAvatar from '../components/FacultyAvatar';
import { faculty } from '../data/faculty';
import { site } from '../data/site';

export default function About() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your AI training and readiness partner in the UAE
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
            Generalsoft helps UAE organisations and schools prepare their people for AI — through practical training,
            whole-school and whole-organisation programmes, and AI readiness consulting.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-slate-600 leading-relaxed">
            <p>
              AI is changing the workplace and education. Our focus is not on teaching theory, but on helping businesses,
              teachers and students understand and use AI effectively, responsibly and confidently.
            </p>
            <p>
              Based in {site.location}, we deliver training on-site across Ras Al Khaimah and online across the UAE — for
              companies, schools and professionals.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Outcome Focused</h3>
              <p className="text-xs text-slate-500">Every session connects AI to real workflows and outcomes.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Practical</h3>
              <p className="text-xs text-slate-500">Real-world use rather than AI terminology.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Responsible AI</h3>
              <p className="text-xs text-slate-500">Privacy, ethics, integrity and appropriate use built in.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Whole Organisation</h3>
              <p className="text-xs text-slate-500">Leadership, employees, teachers, students and parents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">Who we serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/business" className="bg-slate-50 rounded-2xl border border-slate-200/60 p-7 hover:shadow-md transition-all">
              <Building2 className="w-6 h-6 text-primary-600 mb-4" />
              <h3 className="font-bold text-slate-900">Businesses</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Corporate teams, managers and professionals looking to work smarter with AI.
              </p>
            </Link>
            <Link to="/schools" className="bg-slate-50 rounded-2xl border border-slate-200/60 p-7 hover:shadow-md transition-all">
              <School className="w-6 h-6 text-emerald-600 mb-4" />
              <h3 className="font-bold text-slate-900">Schools</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Students, teachers, parents and school leadership building AI capability.
              </p>
            </Link>
            <Link to="/rakez" className="bg-slate-50 rounded-2xl border border-slate-200/60 p-7 hover:shadow-md transition-all">
              <MapPin className="w-6 h-6 text-emerald-600 mb-4" />
              <h3 className="font-bold text-slate-900">RAKEZ & Ras Al Khaimah</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Organisations and schools across the RAKEZ ecosystem, trained on-site or online.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* MEET OUR FACULTY */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold text-slate-900">Meet our faculty</h2>
              <p className="mt-2 text-slate-600">
                Learn directly from experienced practitioners who pair real-world delivery with deep technical understanding.
              </p>
            </div>
            <Link to="/faculty" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all faculty <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.filter((member) => member.featured).map((member) => (
              <Link
                key={member.slug}
                to={`/faculty/${member.slug}`}
                className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                  <FacultyAvatar name={member.name} photo={member.photo} className="w-full h-full" initialsClassName="text-lg" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{member.name}</h3>
                <p className="text-sm font-medium text-primary-600">{member.title}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{member.education}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Let's make your organisation AI ready."
        description="Book a conversation and we'll help you find the right starting point."
      />
    </div>
  );
}
