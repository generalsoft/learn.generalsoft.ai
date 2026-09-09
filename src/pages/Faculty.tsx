import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faculty } from '../data/faculty';
import FacultyAvatar from '../components/FacultyAvatar';
import FinalCTA from '../components/FinalCTA';

export default function Faculty() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Our Faculty</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
            Meet the people behind Generalsoft's AI training and readiness programmes — experienced practitioners who pair
            real-world delivery with deep technical understanding.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => (
            <Link
              key={member.slug}
              to={`/faculty/${member.slug}`}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group flex flex-col"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <FacultyAvatar name={member.name} photo={member.photo} className="w-full h-full" initialsClassName="text-xl" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {member.name}
              </h2>
              <p className="text-sm font-medium text-primary-600">{member.title}</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{member.bio[0]}</p>
              <span className="mt-auto pt-4 inline-flex items-center text-sm font-semibold text-primary-600">
                View profile <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
