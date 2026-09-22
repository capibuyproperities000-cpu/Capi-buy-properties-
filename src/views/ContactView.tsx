import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BRAND } from '../data/constants';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
  Clock,
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  propertyRequirement: string;
  message: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    propertyRequirement: 'Buying a Property',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your phone number';
    } else if (!/^[0-9+()-\s]{10,16}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (e.g. 03360566035)';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please include a message or inquiry details';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const generateWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `Hello Capi Buy Properties, my name is ${formData.name || 'Client'}.\n` +
      `Requirement: ${formData.propertyRequirement}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Message: ${formData.message || BRAND.defaultWhatsAppMessage}`
    );
    return `https://wa.me/923360566035?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-amber-800 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Contact</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mt-1 tracking-tight">
            Contact Capi Buy Properties
          </h1>
          <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
            Have questions regarding buying, renting, or selling in Islamabad? Connect with us directly or submit your inquiry below.
          </p>
        </div>

        {/* Quick Contact Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a
            id="contact-call-action-card"
            href={BRAND.phoneTel}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block">
                Call Directly
              </span>
              <span className="text-base font-bold text-neutral-900 font-serif block">
                {BRAND.phone}
              </span>
              <span className="text-xs text-amber-700 font-medium hover:underline">
                Call Capi Buy Properties
              </span>
            </div>
          </a>

          <a
            id="contact-whatsapp-action-card"
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-400 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block">
                Chat on WhatsApp
              </span>
              <span className="text-base font-bold text-neutral-900 font-serif block">
                {BRAND.phone}
              </span>
              <span className="text-xs text-emerald-600 font-medium hover:underline">
                WhatsApp Us
              </span>
            </div>
          </a>

          <a
            id="contact-email-action-card"
            href={BRAND.emailMailto}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block">
                Official Email
              </span>
              <span className="text-xs font-bold text-neutral-900 block truncate max-w-[190px]">
                {BRAND.email}
              </span>
              <span className="text-xs text-neutral-600 font-medium hover:underline">
                Email Us
              </span>
            </div>
          </a>
        </div>

        {/* 2-Column Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-8 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold font-serif text-neutral-900 mb-1">
              Send a Direct Message
            </h2>
            <p className="text-neutral-500 text-xs mb-6">
              Complete the form below and a representative will follow up with verified information.
            </p>

            {isSubmitted ? (
              <div className="py-10 text-center animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-serif text-neutral-900 mb-1">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-6">
                  Thank you, {formData.name}. Capi Buy Properties has received your message regarding &ldquo;{formData.propertyRequirement}&rdquo;.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    id="contact-confirm-whatsapp-btn"
                    href={generateWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        propertyRequirement: 'Buying a Property',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Farhan Ali"
                      className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                        formErrors.name ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 03360566035"
                      className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                        formErrors.phone ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {formErrors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. farhan@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                        formErrors.email ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                      Property Requirement
                    </label>
                    <select
                      id="contact-requirement-select"
                      value={formData.propertyRequirement}
                      onChange={(e) =>
                        setFormData({ ...formData, propertyRequirement: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Buying a Property">Buying a Property</option>
                      <option value="Renting a Property">Renting a Property</option>
                      <option value="Selling Assistance">Selling Assistance</option>
                      <option value="Real Estate Consultancy">Real Estate Consultancy</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your desired sector, budget range, or property type..."
                    className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      formErrors.message ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                    }`}
                  />
                  {formErrors.message && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Col: Verified Contact Information & Social Accounts */}
          <div className="space-y-6">
            <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Office Information
              </span>
              <h3 className="text-xl font-bold font-serif text-white mb-4">
                Capi Buy Properties
              </h3>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Location</span>
                    <span>Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Direct Phone</span>
                    <a href={BRAND.phoneTel} className="hover:text-amber-400 transition-colors">
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">WhatsApp</span>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Email</span>
                    <a href={BRAND.emailMailto} className="hover:text-amber-400 transition-colors break-all">
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-neutral-800">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-3">
                  Official Social Accounts
                </span>

                <div className="space-y-2.5">
                  <a
                    id="contact-instagram-link"
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-pink-500/50 text-neutral-200 hover:text-white transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                      <span>{BRAND.instagramHandle}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                  </a>

                  <a
                    id="contact-tiktok-link"
                    href={BRAND.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-cyan-400/50 text-neutral-200 hover:text-white transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.32a6.34 6.34 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.87a8.27 8.27 0 0 0 4.89 1.58V8.01a4.85 4.85 0 0 1-1-.24 4.89 4.89 0 0 1-.9-.08z"/>
                      </svg>
                      <span>{BRAND.tiktokHandle}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
