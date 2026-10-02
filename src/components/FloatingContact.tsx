import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { site } from '../data/site';
import { analytics } from '../services/analytics';
import { getQuoteRequestPath } from '../services/quoteRequest';

/**
 * Always-visible floating actions. The primary action is the quote request —
 * the only request funnel on the site — followed by WhatsApp and phone for
 * visitors who would rather talk first.
 */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <Link
        to={getQuoteRequestPath()}
        onClick={() => analytics.trackQuoteRequestClick('floating_button')}
        className="inline-flex items-center gap-2 rounded-full bg-primary-600 pl-4 pr-5 py-3 text-sm font-bold text-white shadow-xl shadow-primary-600/40 ring-2 ring-primary-400/40 hover:bg-primary-700 transition-colors"
      >
        <Sparkles className="h-4 w-4" />
        Get a Quote
      </Link>
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.trackWhatsAppClick('floating')}
        aria-label="Chat with Generalsoft on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${site.phoneTel}`}
        onClick={() => analytics.trackPhoneClick('floating')}
        aria-label="Call Generalsoft"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-colors"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
