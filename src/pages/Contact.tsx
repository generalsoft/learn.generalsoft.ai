import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import QuoteRequestCTA from '../components/QuoteRequestCTA';
import { site } from '../data/site';
import { analytics } from '../services/analytics';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Talk to us — or get a quote in two minutes.
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
          Every training request goes through one short quote form. Tell us what you'd like taught, to whom and when, and
          we'll reply with a tailored quote. Prefer to talk first? Reach us directly below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info + Quick links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Get in Touch</h2>

            <div className="flex items-start space-x-3.5 text-sm text-slate-600">
              <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Email</h4>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => analytics.trackEmailClick('contact')}
                  className="hover:text-primary-600 transition-colors"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-sm text-slate-600">
              <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Call Us</h4>
                <a
                  href={`tel:${site.phoneTel}`}
                  onClick={() => analytics.trackPhoneClick('contact')}
                  className="hover:text-primary-600 transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-sm text-slate-600">
              <MessageCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">WhatsApp</h4>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackWhatsAppClick('contact')}
                  className="hover:text-emerald-600 transition-colors"
                >
                  Chat with us
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-sm text-slate-600">
              <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Location</h4>
                <p>{site.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-2xl border border-primary-100 p-6 space-y-3">
            <h3 className="inline-flex items-center gap-2 font-bold text-primary-800 text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> One form for every request
            </h3>
            <p className="text-sm text-primary-900/80 leading-relaxed">
              Consultations, complimentary school sessions, AI readiness and course requests all go through the AI training
              quote form, so nothing gets lost.
            </p>
            <Link
              to="/quote"
              onClick={() => analytics.trackQuoteRequestClick('contact_info_panel')}
              className="flex items-center justify-between text-sm font-bold text-primary-800 hover:text-primary-900"
            >
              Request an AI training quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: the single highlighted request funnel */}
        <div className="lg:col-span-7">
          <QuoteRequestCTA
            source="contact_page"
            heading="Request your AI training quote"
            description="Pick your topics, tell us who is attending and when, and we'll reply with a tailored quote — usually within one business day."
          />
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Prefer to talk it through first? Call{' '}
            <a href={`tel:${site.phoneTel}`} className="font-semibold text-primary-600 hover:underline">
              {site.phoneDisplay}
            </a>{' '}
            or{' '}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:underline"
            >
              WhatsApp us
            </a>{' '}
            — we're happy to scope your programme before you submit anything.
          </p>
        </div>
      </div>
    </div>
  );
}
