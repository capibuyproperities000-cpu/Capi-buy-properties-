import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BRAND } from '../data/constants';
import {
  Building2,
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
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

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs transition-all">
      {/* Top micro bar for direct contact credibility */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4 hidden sm:block border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Islamabad, Pakistan</span>
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-600"></span>
            <span className="text-neutral-300">Property Buying, Selling, Renting & Consultancy</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              id="topbar-phone-link"
              href={BRAND.phoneTel}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{BRAND.phone}</span>
            </a>
            <a
              id="topbar-whatsapp-link"
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="w-11 h-11 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-md group-hover:bg-amber-600 transition-colors duration-200">
              <Building2 className="w-6 h-6 text-amber-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="block text-xl font-bold tracking-tight text-neutral-900 group-hover:text-amber-700 transition-colors leading-tight font-serif">
                {BRAND.name}
              </span>
              <span className="block text-[11px] font-medium tracking-wider uppercase text-neutral-500">
                Islamabad Real Estate
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-amber-800 bg-amber-50 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-view-properties-button"
              onClick={() => handleNavClick('properties')}
              className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors"
            >
              View Properties
            </button>
            <button
              id="header-contact-us-button"
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              id="mobile-call-quick-button"
              href={BRAND.phoneTel}
              className="p-2.5 rounded-md text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
              aria-label="Call Capi Buy Properties"
            >
              <Phone className="w-4 h-4 text-neutral-800" />
            </a>
            <a
              id="mobile-whatsapp-quick-button"
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
              aria-label="WhatsApp Capi Buy Properties"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-md text-neutral-700 hover:bg-neutral-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-900" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  id={`mobile-nav-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-base rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-800 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-col gap-3">
            <button
              id="mobile-drawer-view-properties"
              onClick={() => handleNavClick('properties')}
              className="w-full py-3 px-4 text-center text-sm font-semibold text-neutral-800 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Browse All Properties
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                id="mobile-drawer-call-btn"
                href={BRAND.phoneTel}
                className="flex items-center justify-center gap-2 py-3 px-3 text-sm font-medium text-neutral-900 bg-neutral-100 rounded-lg border border-neutral-200"
              >
                <Phone className="w-4 h-4 text-neutral-700" />
                <span>Call Us</span>
              </a>
              <a
                id="mobile-drawer-whatsapp-btn"
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 text-sm font-medium text-white bg-emerald-600 rounded-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
