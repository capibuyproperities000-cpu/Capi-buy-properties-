import React, { useState } from 'react';
import { PageRoute, PropertyCategory, SellPropertyFormData } from '../types';
import { BRAND, APPROVED_AREAS, PROPERTY_CATEGORIES } from '../data/constants';
import {
  Building2,
  CheckCircle2,
  Send,
  MessageCircle,
  Phone,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface SellWithUsViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const SellWithUsView: React.FC<SellWithUsViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<SellPropertyFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    propertyType: 'House',
    propertyLocation: 'F Sectors',
    propertySize: '',
    expectedPrice: '',
    propertyCondition: 'Brand New',
    additionalDetails: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof SellPropertyFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof SellPropertyFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+()-\s]{10,16}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.propertySize.trim()) {
      errors.propertySize = 'Please specify property size (e.g. 10 Marla, 1 Kanal)';
    }

    if (!formData.expectedPrice.trim()) {
      errors.expectedPrice = 'Please provide an expected asking price (e.g. PKR 3.5 Crore)';
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

  const generateWhatsAppSubmissionUrl = () => {
    const text = encodeURIComponent(
      `Hello Capi Buy Properties, I want to sell my property:\n\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phoneNumber}\n` +
      `• Type: ${formData.propertyType}\n` +
      `• Location: ${formData.propertyLocation}\n` +
      `• Size: ${formData.propertySize}\n` +
      `• Expected Price: ${formData.expectedPrice}\n` +
      `• Condition: ${formData.propertyCondition}\n` +
      `• Details: ${formData.additionalDetails || 'None provided'}`
    );
    return `https://wa.me/923360566035?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-amber-800 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Sell With Us</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Property Owners
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mt-1 tracking-tight">
            Sell Your Property With Capi Buy Properties
          </h1>
          <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
            Submit your residential or commercial property details. We assist owners in connecting with genuine buyers across approved areas of Islamabad with professional representation.
          </p>
        </div>

        {/* Informational Guidance Box */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 mb-8 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Transparent Partnership:</span> We coordinate property inspections, clarify market trends, and present your listing to interested buyers. We do not make unrealistic promises or guaranteed timelines; our priority is professional handling and accurate property assessment.
          </div>
        </div>

        {/* Submission Form Container */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-serif text-neutral-900 mb-2">
                Property Details Submitted Successfully
              </h2>
              <p className="text-neutral-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <strong className="text-neutral-900">{formData.fullName}</strong>. Capi Buy Properties has received your submission for your {formData.propertyType} in {formData.propertyLocation}. Our team will review the specifications and reach out to you shortly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  id="whatsapp-confirm-submission-btn"
                  href={generateWhatsAppSubmissionUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Details on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs tracking-wide uppercase transition-colors"
                >
                  Submit Another Property
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-lg font-bold font-serif text-neutral-900 pb-3 border-b border-neutral-100">
                Property Submission Form
              </h2>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="sell-fullname-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Asad Khan"
                    className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      formErrors.fullName ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="sell-phone-input"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="e.g. 03360566035"
                    className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      formErrors.phoneNumber ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                    }`}
                  />
                  {formErrors.phoneNumber && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {formErrors.phoneNumber}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="sell-email-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. asad@example.com"
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
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Property Type *
                  </label>
                  <select
                    id="sell-type-select"
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value as PropertyCategory })
                    }
                    className="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    {PROPERTY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Islamabad Location *
                  </label>
                  <select
                    id="sell-location-select"
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    {APPROVED_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Property Size *
                  </label>
                  <input
                    type="text"
                    id="sell-size-input"
                    value={formData.propertySize}
                    onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                    placeholder="e.g. 10 Marla / 1 Kanal"
                    className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      formErrors.propertySize ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                    }`}
                  />
                  {formErrors.propertySize && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {formErrors.propertySize}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                    Expected Price *
                  </label>
                  <input
                    type="text"
                    id="sell-price-input"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    placeholder="e.g. PKR 4.5 Crore"
                    className={`w-full px-3.5 py-2.5 text-xs bg-neutral-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      formErrors.expectedPrice ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'
                    }`}
                  />
                  {formErrors.expectedPrice && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {formErrors.expectedPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Property Condition */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                  Property Condition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Brand New', 'Excellent', 'Well-Maintained', 'Under-Construction / Plot'].map(
                    (condition) => (
                      <button
                        type="button"
                        key={condition}
                        onClick={() => setFormData({ ...formData, propertyCondition: condition })}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                          formData.propertyCondition === condition
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {condition}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                  Additional Details
                </label>
                <textarea
                  id="sell-details-input"
                  rows={4}
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  placeholder="Specify sector street, floor details, corner status, possession state, or preferred calling times..."
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-sell-property-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Property Details...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Property</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
