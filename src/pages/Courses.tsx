import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, School, Sparkles, ArrowRight, Clock, MapPin, Check, BookOpen } from 'lucide-react';
import { programmeCategories } from '../data/programmes';
import { courses } from '../courses/courseData';
import { analytics } from '../services/analytics';
import FinalCTA from '../components/FinalCTA';

const categoryIcon = { business: Building2, schools: School, professional: Sparkles };

export default function Courses() {
  useEffect(() => {
    analytics.trackCourseView('programmes');
  }, []);

  return (
    <div>
      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Programmes</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
            AI training grouped by outcome — for businesses, schools and professionals. Most programmes are tailored to your
            organisation and begin with a conversation.
          </p>
        </div>
      </section>
      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {programmeCategories.map((category) => {
          const Icon = categoryIcon[category.id];
          return (
            <div key={category.id}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">{category.title}</h2>
                    <p className="mt-1 text-slate-600 max-w-xl">{category.description}</p>
                  </div>
                </div>
                <Link
                  to={category.link}
                  className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  Explore {category.title} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.programmes.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <p className="text-sm text-primary-600 font-medium mt-1">{p.tagline}</p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      <span className="font-semibold text-slate-700">Who it's for: </span>
                      {p.whoFor}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.learn.map((item) => (
                        <span key={item} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-slate-500 space-y-1.5">
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {p.duration}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.delivery}
                      </p>
                      {p.customised && (
                        <p className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                          <Check className="w-3.5 h-3.5" /> Customised to your organisation
                        </p>
                      )}
                    </div>
                    <div className="mt-auto pt-5 flex gap-2">
                      <Link
                        to="/contact"
                        onClick={() => analytics.trackCourseEnquiry(p.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                      >
                        Request a Programme
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => analytics.trackLeadClick('business')}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                      >
                        Book a Consultation
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      {/* TECHNICAL DEEP-DIVES */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Technical deep-dives</h2>
            <p className="mt-2 text-slate-600">
              For professionals and builders who want a rigorous, foundational understanding of how AI works under the hood.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 text-primary-600">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">{course.duration}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{course.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA
        heading="Not sure which programme fits?"
        description="Book a consultation and we'll help you choose the right starting point for your organisation or school."
      />
    </div>
  );
}
