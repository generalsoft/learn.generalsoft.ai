import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { sendMessage } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const response = await sendMessage(formData);
    if (response.success) {
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrorMsg(response.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Generalsoft
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium">
          Have questions about our courses, corporate team training, or customization options? Reach out and we'll get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5 text-sm text-slate-600">
                <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Email Support</h4>
                  <a href="mailto:info@generalsoft.ae" className="hover:text-primary-600 transition-colors">
                    info@generalsoft.ae
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-sm text-slate-600">
                <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <a href="tel:+971558809863" className="hover:text-primary-600 transition-colors">
                    +971.55.880.9863
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-sm text-slate-600">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Headquarters</h4>
                  <p>RAKEZ, RAK, UAE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-primary-50 rounded-2xl border border-primary-100/50 text-xs sm:text-sm text-primary-900 leading-relaxed">
            <h4 className="font-bold mb-1">Corporate Registrations</h4>
            <p>For bookings of more than 5 attendees, we support dedicated private training sessions customized to your specific company tools and compliance guidelines.</p>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8">
          {isSent ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out. A Generalsoft representative will review your message and respond within 1 business day.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Send a Message</h3>
              
              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3.5 flex items-start space-x-2 text-rose-800 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 transition-colors rounded-xl shadow-md focus-ring"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
