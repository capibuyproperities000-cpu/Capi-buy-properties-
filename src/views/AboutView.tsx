import React from 'react';
import { PageRoute } from '../types';
import { BRAND, APPROVED_AREAS } from '../data/constants';
import {
  Building2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-amber-800 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">About</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Who We Are
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mt-1 tracking-tight">
            About Capi Buy Properties
          </h1>
          <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
            Professional real estate services for buying, selling, and renting properties in Islamabad.
          </p>
        </div>

        {/* Main Narrative Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 shadow-xs mb-12 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Business Overview</span>
            </div>
            {/* Exact required copy from prompt */}
            <p className="text-xl sm:text-2xl font-serif text-neutral-900 leading-snug font-medium">
              &ldquo;Capi Buy Properties is a real-estate business based in Islamabad, focused on helping customers explore property opportunities for buying, selling and renting across selected areas of Islamabad.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-100 text-neutral-600 text-sm leading-relaxed">
            <div>
              <h3 className="text-base font-bold font-serif text-neutral-900 mb-3">
                Our Primary Focus
              </h3>
              <p>
                Real estate decisions involve significant financial and personal commitments. Capi Buy Properties prioritizes clear communication, genuine property specifications, and organized property viewings. We assist individuals, families, and businesses in identifying properties that meet their budget and functional objectives.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold font-serif text-neutral-900 mb-3">
                Transparent Guidance
              </h3>
              <p>
                We do not employ high-pressure sales tactics or exaggerated claims. Instead, we provide straightforward sector insights, current price ranges, and facilitate direct coordination between prospective buyers, tenants, and property owners.
              </p>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-serif text-neutral-900 mb-2">
              Verified Information
            </h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              We present accurate property specifications, location details, and price ranges without unwarranted inflation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-serif text-neutral-900 mb-2">
              Area Specialization
            </h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              We concentrate our efforts on designated approved sectors in Islamabad where we have direct local market knowledge.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-serif text-neutral-900 mb-2">
              Responsive Assistance
            </h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Direct access through phone calls and WhatsApp to answer questions, discuss options, and coordinate site viewings.
            </p>
          </div>
        </div>

        {/* Approved Sectors Overview */}
        <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-10 mb-12">
          <div className="max-w-xl mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Coverage Locations
            </span>
            <h3 className="text-2xl font-bold font-serif text-white mt-1">
              Active Islamabad Sectors & Developments
            </h3>
            <p className="text-neutral-400 text-xs mt-2">
              Capi Buy Properties focuses services within these designated locations:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {APPROVED_AREAS.map((area) => (
              <div
                key={area}
                className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-serif text-neutral-900">
              Ready to explore properties or sell with us?
            </h3>
            <p className="text-neutral-500 text-xs mt-1">
              Contact Capi Buy Properties today for professional guidance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('properties')}
              className="px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Browse Properties
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
