import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Award, Users, GraduationCap } from 'lucide-react';
import { faculty } from '../data/faculty';
import FacultyAvatar from '../components/FacultyAvatar';
import FinalCTA from '../components/FinalCTA';

export default function FacultyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const member = faculty.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Faculty member not found</h1>
        <p className="text-slate-600">The profile you are looking for does not exist.</p>
        <Link to="/faculty" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Faculty
        </Link>
      </div>
    );
  }

  const others = faculty.filter((m) => m.slug !== slug).slice(0, 3);

  return (
    <div>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <Link to="/faculty" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4 mr-1" /> All faculty
        </Link>

        <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 shadow-md flex-shrink-0">
            <FacultyAvatar name={member.name} photo={member.photo} className="w-full h-full" initialsClassName="text-4xl" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{member.name}</h1>
            <p className="mt-1 text-lg font-semibold text-primary-600">{member.title}</p>
            {member.department && <p className="text-sm text-slate-500">{member.department}</p>}
            <p className="mt-3 flex items-start gap-2 text-slate-600">
              <GraduationCap className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>{member.education}</span>
            </p>
          </div>
        </div>

        {/* RESEARCH INTERESTS */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" /> Research Interests
          </h2>
          <ul className="mt-4 space-y-3">
            {member.researchInterests.map((interest, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                {interest}
              </li>
            ))}
          </ul>
        </section>

        {/* BIOGRAPHY */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Biography</h2>
          <div className="mt-4 space-y-4">
            {member.bio.map((paragraph, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* RECENT PUBLICATIONS */}
        {member.publications && member.publications.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-600" /> Recent Publications
            </h2>
            <ul className="mt-4 space-y-2">
              {member.publications.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* AWARDS & HONOURS */}
        {member.awards && member.awards.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" /> Awards &amp; Honours
            </h2>
            <ul className="mt-4 space-y-2">
              {member.awards.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* AFFILIATIONS */}
        {member.affiliations && member.affiliations.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" /> Affiliations
            </h2>
            <ul className="mt-4 space-y-2">
              {member.affiliations.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* MORE FACULTY */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">More faculty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((m) => (
              <Link
                key={m.slug}
                to={`/faculty/${m.slug}`}
                className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group flex flex-col"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                  <FacultyAvatar name={m.name} photo={m.photo} className="w-full h-full" initialsClassName="text-lg" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{m.name}</h3>
                <p className="text-sm font-medium text-primary-600">{m.title}</p>
                <span className="mt-auto pt-4 inline-flex items-center text-sm font-semibold text-primary-600">
                  View profile <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FinalCTA />
    </div>
  );
}

