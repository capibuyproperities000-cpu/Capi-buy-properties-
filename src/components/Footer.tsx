import React from 'react';
import { PageRoute, PropertyCategory, ApprovedArea } from '../types';
import { BRAND, APPROVED_AREAS, PROPERTY_CATEGORIES } from '../data/constants';
import {
  Building2,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onFilterByCategory?: (category: PropertyCategory) => void;
  onFilterByArea?: (area: ApprovedArea) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onFilterByCategory,
  onFilterByArea,
}) => {
  const quickLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Properties', route: 'properties' },
    { label: 'Buy', route: 'buy' },
    { label: 'Rent', route: 'rent' },
    { label: 'Sell With Us', route: 'sell-with-us' },
    { label: 'Services', route: 'services' },
    { label: 'Areas', route: 'areas' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleLinkClick = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: PropertyCategory) => {
    if (onFilterByCategory) {
      onFilterByCategory(cat);
    } else {
      onNavigate('properties');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAreaClick = (area: ApprovedArea) => {
    if (onFilterByArea) {
      onFilterByArea(area);
    } else {
      onNavigate('properties');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-neutral-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-serif tracking-tight">
                  {BRAND.name}
                </h3>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
                  Islamabad, Pakistan
                </p>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Real estate solutions for buying, selling and renting in selected areas of Islamabad.
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <a
                id="footer-phone-link"
                href={BRAND.phoneTel}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-neutral-700">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <span>{BRAND.phone}</span>
              </a>

              <a
                id="footer-whatsapp-link"
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-neutral-700">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <span>WhatsApp: {BRAND.phone}</span>
              </a>

              <a
                id="footer-email-link"
                href={BRAND.emailMailto}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-neutral-700">
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <span className="truncate">{BRAND.email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                id="footer-instagram-link"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors text-neutral-300"
              >
                <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                id="footer-tiktok-link"
                href={BRAND.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors text-neutral-300"
              >
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.32a6.34 6.34 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.87a8.27 8.27 0 0 0 4.89 1.58V8.01a4.85 4.85 0 0 1-1-.24 4.89 4.89 0 0 1-.9-.08z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.route}>
                  <button
                    id={`footer-link-${item.route}`}
                    onClick={() => handleLinkClick(item.route)}
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Property Types
            </h4>
            <ul className="space-y-2.5 text-sm">
              {PROPERTY_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    id={`footer-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => handleCategoryClick(cat)}
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Approved Areas */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Areas
            </h4>
            <ul className="space-y-2 text-xs">
              {APPROVED_AREAS.map((area) => (
                <li key={area}>
                  <button
                    id={`footer-area-${area.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => handleAreaClick(area)}
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-left truncate block max-w-full"
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Note & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Capi Buy Properties. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Islamabad Real Estate Platform</span>
            <span>•</span>
            <button
              onClick={() => handleLinkClick('contact')}
              className="hover:text-neutral-300 transition-colors"
            >
              capibuyproperties000@gmail.com
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
