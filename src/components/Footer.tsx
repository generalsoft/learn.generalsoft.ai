import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 text-white">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">Generalsoft</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional, practical training in AI and modern technologies designed for business professionals and executives in Dubai and the UAE.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses/ai-soup-to-nuts" className="hover:text-white transition-colors">
                  AI Soup to Nuts
                </Link>
              </li>
              <li>
                <Link to="/courses/ai-under-the-hood" className="hover:text-white transition-colors">
                  AI Under the Hood
                </Link>
              </li>
              <li>
                <Link to="/courses/ai-soup-to-nuts#coursematerial" className="hover:text-white transition-colors">
                  Course Materials
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <a href="mailto:info@generalsoft.ae" className="hover:text-white transition-colors">
                  info@generalsoft.ae
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <a href="tel:+971558809863" className="hover:text-white transition-colors">
                  +971.55.880.9863
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>RAKEZ, RAK, UAE</span>
              </li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Generalsoft
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs">
          <p>&copy; {currentYear} Generalsoft FZ-LLC. All rights reserved.</p>
          <p className="text-slate-500">Designed by&nbsp;
           <a href="https://generalsoft.ae/en/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Generalsoft FZ-LLC. 
            </a> 
          </p>
        </div>
      </div>
    </footer>
  );
}
