import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { resources } from '../data/resources';
import FinalCTA from '../components/FinalCTA';

export default function ResourceArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = resources.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Article not found</h1>
        <p className="text-slate-600">The article you are looking for does not exist.</p>
        <Link to="/resources" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Resources
        </Link>
      </div>
    );
  }

  const others = resources.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16">
        <Link to="/resources" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4 mr-1" /> All resources
        </Link>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 uppercase tracking-wider">{article.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{article.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>
        </div>

        <div className="mt-10 space-y-8">
          {article.sections.map((section, i) => (
            <div key={i} className="space-y-4">
              {section.heading && <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>}
              {(section.paragraphs ?? []).map((p, j) => (
                <p key={j} className="text-slate-600 leading-relaxed">{p}</p>
              ))}
              {section.bullets && (
                <ul className="space-y-2">
                  {section.bullets.map((b, k) => (
                    <li key={k} className="flex items-start gap-3 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Article CTA */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold">{article.cta.title}</h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">{article.cta.text}</p>
          <Link
            to={article.cta.to}
            className="mt-5 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-colors"
          >
            {article.cta.label}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </article>

      {/* Related */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-6">More resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((a) => (
            <Link
              key={a.slug}
              to={`/resources/${a.slug}`}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-md transition-all group"
            >
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{a.category}</span>
              <h3 className="mt-2 font-bold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
