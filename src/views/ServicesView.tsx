import React from 'react';
import { PageRoute } from '../types';
import { SERVICES_DATA } from '../data/services';
import { BRAND } from '../data/constants';
import {
  Building2,
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
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
          <span className="text-neutral-900 font-medium">Services</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Professional Real Estate Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mt-1 tracking-tight">
            Our Services
          </h1>
          <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
            Capi Buy Properties provides focused, transparent property services across selected sectors of Islamabad, covering acquisitions, sales submissions, tenancy arrangements, and objective market consultation.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES_DATA.map((srv, index) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-neutral-400">
                    Service 0{index + 1}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-serif text-neutral-900 mb-2">
                  {srv.title}
                </h2>
                <p className="text-amber-800 font-medium text-xs mb-4">
                  {srv.shortDesc}
                </p>
                <p className="text-neutral-600 text-xs leading-relaxed mb-6">
                  {srv.fullDesc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-neutral-100 mb-8">
                  {srv.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id={`service-cta-btn-${srv.id}`}
                onClick={() => {
                  onNavigate(srv.actionRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <span>{srv.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Consultancy Callout */}
        <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Schedule a Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1">
              Have Specific Real Estate Questions in Islamabad?
            </h2>
            <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
              Whether you need clarification on sector approvals, price trends, or documentation requirements, contact Capi Buy Properties for factual guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="services-phone-cta"
              href={BRAND.phoneTel}
              className="px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white text-neutral-900 hover:bg-neutral-100 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-neutral-900" />
              <span>Call {BRAND.phone}</span>
            </a>

            <a
              id="services-whatsapp-cta"
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
