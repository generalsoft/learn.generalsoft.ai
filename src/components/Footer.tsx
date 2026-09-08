import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { site } from '../data/site';
import { analytics } from '../services/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2.5 text-white">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">Generalsoft</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Practical AI training and AI readiness for businesses, schools and professionals across the UAE — including
              RAKEZ and Ras Al Khaimah.
            </p>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Programmes</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/business" className="hover:text-white transition-colors">AI for Business</Link>
              </li>
              <li>
                <Link to="/schools" className="hover:text-white transition-colors">AI for Schools</Link>
              </li>
              <li>
                <Link to="/schools/complimentary-session" className="hover:text-white transition-colors">
                  Complimentary School Session
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">All Programmes</Link>
              </li>
              <li>
                <Link to="/curriculum" className="hover:text-white transition-colors">UAE AI Curriculum Framework</Link>
              </li>
              <li>
                <Link to="/rakez" className="hover:text-white transition-colors">RAKEZ & Ras Al Khaimah</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => analytics.trackEmailClick('footer')}
                  className="hover:text-white transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <a
                  href={`tel:${site.phoneTel}`}
                  onClick={() => analytics.trackPhoneClick('footer')}
                  className="hover:text-white transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackWhatsAppClick('footer')}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{site.location}</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Generalsoft</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs">
          <p>&copy; {currentYear} {site.company}. All rights reserved.</p>
          <p className="text-slate-500">UAE-based AI training · Businesses · Schools · RAKEZ</p>
        </div>
      </div>
    </footer>
  );
}
