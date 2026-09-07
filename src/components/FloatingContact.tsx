import { Phone, MessageCircle } from 'lucide-react';
import { site } from '../data/site';
import { analytics } from '../services/analytics';

/**
 * Always-visible floating contact actions. Keeps phone and WhatsApp one tap
 * away on mobile, which is critical for WhatsApp / LinkedIn inbound traffic.
 */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
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
