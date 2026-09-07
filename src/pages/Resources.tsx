import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { resources } from '../data/resources';
import FinalCTA from '../components/FinalCTA';

export default function Resources() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Resources</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
            Practical guidance on AI adoption for businesses, schools and professionals across the UAE.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((article) => (
            <Link
              key={article.slug}
              to={`/resources/${article.slug}`}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{article.category}</span>
                <span className="text-xs text-slate-400">{article.readTime}</span>
              </div>
              <h2 className="mt-3 font-bold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{article.excerpt}</p>
              <span className="mt-auto pt-4 inline-flex items-center text-sm font-semibold text-primary-600">
                Read article <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
