import React, { useState } from 'react';
import { Property, PageRoute, InquiryFormData } from '../types';
import { BRAND, getWhatsAppInquiryUrl } from '../data/constants';
import { PropertyCard } from '../components/PropertyCard';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Check,
  Phone,
  MessageCircle,
  Mail,
  ArrowLeft,
  Share2,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  allProperties: Property[];
  onBack: () => void;
  onSelectProperty: (propertyId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  allProperties,
  onBack,
  onSelectProperty,
  onNavigate,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Inquiry Form State
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    requirement: `Inquiry regarding ${property.title} (${property.priceFormatted})`,
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  const whatsappInquiryUrl = getWhatsAppInquiryUrl(property.title, property.id);

  // More properties in same area or same category
  const relatedProperties = allProperties
    .filter((p) => p.id !== property.id && (p.area === property.area || p.category === property.category))
    .slice(0, 3);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+()-\s]{10,16}$/.test(formData.phone.trim())) {
      errors.phone = 'Please provide a valid phone number (e.g. 03360566035)';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief message or question';
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            id="back-to-properties-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-amber-800 transition-colors py-2 px-3 rounded-lg hover:bg-neutral-200/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </button>

          <button
            id="share-property-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copyNotification ? 'Link Copied!' : 'Share Listing'}</span>
          </button>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm mb-8">
          {/* Main Large Image */}
          <div className="relative aspect-16/9 md:aspect-21/9 bg-neutral-900 overflow-hidden group">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500"
            />

            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md text-white shadow-md ${
                  property.transactionType === 'Buy'
                    ? 'bg-amber-600'
                    : 'bg-indigo-600'
                }`}
              >
                For {property.transactionType}
              </span>
              <span className="px-3 py-1.5 text-xs font-semibold rounded-md bg-neutral-900/85 text-white backdrop-blur-md">
                {property.category}
              </span>
            </div>

            {property.status === 'Exclusive' && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-500 text-neutral-950 shadow-md">
                <ShieldCheck className="w-4 h-4" />
                <span>Exclusive Listing</span>
              </div>
            )}

            {/* Gallery Navigation Arrows (if multiple images) */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? property.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-950/60 hover:bg-neutral-950 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === property.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-950/60 hover:bg-neutral-950 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-neutral-950/70 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs font-medium">
              Image {activeImageIndex + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          {property.images.length > 1 && (
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center gap-3 overflow-x-auto">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-amber-600 ring-2 ring-amber-500/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout: Left Details, Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-neutral-100 pb-5">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                    {property.area} • Islamabad
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 tracking-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mt-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{property.location}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block font-medium">
                    Asking Price
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-serif">
                    {property.priceFormatted}
                  </span>
                </div>
              </div>

              {/* Overview Specs Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-400 text-xs flex items-center gap-1.5 mb-1">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Property Size</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">
                    {property.size}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-400 text-xs flex items-center gap-1.5 mb-1">
                    <Bed className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bedrooms</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">
                    {property.bedrooms ? `${property.bedrooms} Beds` : 'N/A'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-400 text-xs flex items-center gap-1.5 mb-1">
                    <Bath className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bathrooms</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">
                    {property.bathrooms ? `${property.bathrooms} Baths` : 'N/A'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-400 text-xs flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Status</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">
                    {property.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
              <h2 className="text-xl font-bold font-serif text-neutral-900 mb-4">
                Description
              </h2>
              <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
                <h2 className="text-xl font-bold font-serif text-neutral-900 mb-4">
                  Property Highlights & Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 text-neutral-800 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
                <h2 className="text-xl font-bold font-serif text-neutral-900 mb-4">
                  Community & Building Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 text-neutral-800 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Direct Contact & Inquiry Form */}
          <div className="space-y-6">
            {/* Quick Action Contact Card */}
            <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Direct Contact
              </span>
              <h3 className="text-lg font-bold font-serif text-white mb-2">
                Inquire With Capi Buy Properties
              </h3>
              <p className="text-neutral-400 text-xs mb-6">
                Connect with our team for exact viewing times, document verification, and transaction assistance.
              </p>

              <div className="space-y-3">
                <a
                  id="detail-whatsapp-btn"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <a
                  id="detail-call-btn"
                  href={BRAND.phoneTel}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BRAND.phone}</span>
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-neutral-800 text-xs text-neutral-400 space-y-1">
                <p>Location: Islamabad, Pakistan</p>
                <p>Email: {BRAND.email}</p>
              </div>
            </div>

            {/* Detailed Inquiry Form */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
              <h3 className="text-lg font-bold font-serif text-neutral-900 mb-2">
                Send an Inquiry
              </h3>
              <p className="text-neutral-500 text-xs mb-5">
                Fill out the form below and we will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 mb-4">
                    Thank you, {formData.name}. Capi Buy Properties has received your inquiry for &quot;{property.title}&quot;.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        requirement: `Inquiry regarding ${property.title}`,
                        message: '',
                      });
                    }}
                    className="text-xs text-amber-800 font-semibold underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="inquiry-name-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
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

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="inquiry-phone-input"
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

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="inquiry-email-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com"
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

                  {/* Requirement (Pre-filled) */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Requirement
                    </label>
                    <input
                      type="text"
                      id="inquiry-requirement-input"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-600"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Message *
                    </label>
                    <textarea
                      id="inquiry-message-input"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know when you would like to visit or what specific details you require..."
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
                    id="submit-inquiry-btn"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Explore More Properties Section at bottom */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Similar Opportunities
                </span>
                <h3 className="text-2xl font-bold font-serif text-neutral-900 mt-1">
                  Explore More Properties
                </h3>
              </div>

              <button
                onClick={() => onNavigate('properties')}
                className="text-xs font-semibold text-amber-800 hover:underline"
              >
                View all properties
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onViewDetails={onSelectProperty}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
