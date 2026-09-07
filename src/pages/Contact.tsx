import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { site } from '../data/site';
import { analytics } from '../services/analytics';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Let's make your organisation AI ready.
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
          Book an AI consultation or get in touch — we'll help you find the right starting point for your business or school.
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

          <div className="bg-slate-50 rounded-2xl border border-slate-200/50 p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">For schools</h3>
            <Link
              to="/schools/complimentary-session"
              onClick={() => analytics.trackLeadClick('complimentary_session')}
              className="flex items-center justify-between text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Request a Complimentary AI Futures Session <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/schools/ai-readiness"
              onClick={() => analytics.trackLeadClick('ai_readiness')}
              className="flex items-center justify-between text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              Book an AI Readiness Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 sm:p-8">
            <LeadForm
              variant="general"
              heading="Book an AI Consultation"
              description="Tell us about your organisation and goals, and a member of our team will be in touch."
              ctaLabel="Send Enquiry"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
