import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { courses } from '../courses/courseData';
import { analytics } from '../services/analytics';

export default function Courses() {
  useEffect(() => {
    analytics.trackCourseView('courses_list');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Available Courses
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
          Practical technology training and workshops designed for business professionals. Learn live online with industry experts.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
          >
            {/* Header info */}
            <div className="p-6 sm:p-8 flex-grow space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Status: {course.registrationStatus}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {course.duration}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                <Link to={`/courses/${course.slug}`} className="hover:text-primary-600 transition-colors">
                  {course.title}
                </Link>
              </h2>
              
              <p className="text-sm font-semibold text-primary-600">
                {course.subtitle}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Specs Grid */}
              <div className="border-t border-slate-100 pt-4 mt-6 space-y-3.5">
                <div className="flex items-center text-xs sm:text-sm text-slate-600">
                  <Calendar className="w-4.5 h-4.5 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 mr-1.5">Date:</span>
                  <span>{course.dates}</span>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-slate-600">
                  <Clock className="w-4.5 h-4.5 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 mr-1.5">Time:</span>
                  <span>
                    {course.time} {course.timezone} {course.breakTime && `(Break: ${course.breakTime})`}
                  </span>
                </div>

                <div className="flex items-center text-xs sm:text-sm text-slate-600">
                  <Globe className="w-4.5 h-4.5 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 mr-1.5">Format:</span>
                  <span>{course.deliveryMethod}</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">Pricing</span>
                <div className="text-xs text-slate-700 leading-relaxed">
                  <p><span className="font-semibold text-slate-900">Individuals:</span> {course.pricing.individual}</p>
                  <p><span className="font-semibold text-slate-900">Companies:</span> {course.pricing.company}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  to={`/courses/${course.slug}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors rounded-lg focus-ring"
                >
                  View Details
                </Link>
                <Link
                  to={`/courses/${course.slug}`}
                  onClick={() => analytics.trackRegisterClick(course.id)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg focus-ring"
                >
                  Register Now
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
