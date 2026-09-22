import React from 'react';
import {
  Property,
  PropertyCategory,
  ApprovedArea,
  PageRoute,
  PropertyFilterState,
} from '../types';
import { BRAND, APPROVED_AREAS } from '../data/constants';
import { PropertySearchPanel } from '../components/PropertySearchPanel';
import { PropertyCategories } from '../components/PropertyCategories';
import { PropertyCard } from '../components/PropertyCard';
import { SERVICES_DATA } from '../data/services';
import { AREAS_DATA } from '../data/areas';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Compass,
  FileCheck,
  Building,
} from 'lucide-react';

interface HomeViewProps {
  properties: Property[];
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  onNavigate: (route: PageRoute) => void;
  onSelectProperty: (propertyId: string) => void;
  onSelectCategory: (category: PropertyCategory) => void;
  onSelectArea: (area: ApprovedArea) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  filters,
  onFilterChange,
  onNavigate,
  onSelectProperty,
  onSelectCategory,
  onSelectArea,
}) => {
  // Category counts
  const categoryCounts: Record<PropertyCategory, number> = {
    House: properties.filter((p) => p.category === 'House').length,
    Apartment: properties.filter((p) => p.category === 'Apartment').length,
    'Plot / Land': properties.filter((p) => p.category === 'Plot / Land').length,
    'Shop / Commercial': properties.filter((p) => p.category === 'Shop / Commercial').length,
    Building: properties.filter((p) => p.category === 'Building').length,
  };

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 6);

  const handleHeroSearchSubmit = () => {
    onNavigate('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-neutral-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Islamabad Modern Real Estate Architecture"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transform animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/50" />
        </div>

        {/* Hero Content & Search Panel */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Capi Buy Properties • Islamabad</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white leading-[1.15] drop-shadow-sm">
              Find the Right Property in Islamabad
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Explore properties for buying, renting and selling with Capi Buy Properties.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                id="hero-explore-properties-btn"
                onClick={() => {
                  onNavigate('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-us-btn"
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg backdrop-blur-md transition-all duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Hero Search Panel (Functional) */}
          <div className="w-full">
            <PropertySearchPanel
              filters={filters}
              onFilterChange={onFilterChange}
              onSearchSubmit={handleHeroSearchSubmit}
              resultCount={properties.length}
            />
          </div>
        </div>
      </section>

      {/* 2. Property Categories Section */}
      <PropertyCategories
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        categoryCounts={categoryCounts}
      />

      {/* 3. Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                Curated Listings
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-serif mt-1 tracking-tight">
                Featured Properties
              </h2>
              <p className="text-neutral-500 text-sm mt-2 max-w-xl">
                Browse our featured selection of verified residential and commercial opportunities across Islamabad.
              </p>
            </div>

            <button
              id="view-all-featured-btn"
              onClick={() => {
                onNavigate('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
            >
              <span>View All Properties ({properties.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onViewDetails={onSelectProperty}
              />
            ))}
          </div>

          {/* Demo Notice */}
          <div className="mt-10 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-center text-xs text-neutral-500">
            <span className="font-semibold text-neutral-700">Listing Notice:</span> Properties presented are realistic demo records structured for client evaluation and can be easily updated with active inventory.
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-20 bg-neutral-900 text-white border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Straightforward Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mt-1">
              How It Works
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              A transparent, reliable pathway to navigating property transactions in Islamabad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/90 relative">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">
                Explore Properties
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Filter by transaction type, category, sector, or budget to discover listings that match your criteria.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/90 relative">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">
                Choose Your Requirement
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Identify the property size, condition, and location preferences that meet your family or business objectives.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/90 relative">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">
                Contact Capi Buy Properties
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Connect directly with us via phone, instant WhatsApp message, or our straightforward online inquiry form.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/90 relative">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">
                Discuss Your Property
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Review verified details, schedule on-site inspections, and receive objective guidance to finalize your deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Explore Areas Section */}
      <section className="py-20 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                Focused Locations
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-serif mt-1 tracking-tight">
                Explore Our Areas
              </h2>
              <p className="text-neutral-500 text-sm mt-2 max-w-xl">
                Capi Buy Properties focuses exclusively on approved, established, and high-potential sectors in Islamabad.
              </p>
            </div>

            <button
              id="view-all-areas-btn"
              onClick={() => {
                onNavigate('areas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
            >
              <span>View All 9 Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS_DATA.slice(0, 6).map((area) => (
              <div
                key={area.name}
                id={`area-card-${area.name.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => onSelectArea(area.name)}
                className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={area.image}
                    alt={area.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wider block">
                      Islamabad Sector
                    </span>
                    <h3 className="text-xl font-bold text-white font-serif tracking-tight">
                      {area.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-neutral-600 text-xs leading-relaxed line-clamp-2 mb-4">
                    {area.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs font-semibold text-neutral-800 group-hover:text-amber-700 transition-colors">
                    <span>Browse {area.name} Listings</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Services Section */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mt-1">
              Our Services
            </h2>
            <p className="text-neutral-500 text-sm mt-2">
              Dedicated real-estate services backed by local Islamabad market knowledge and straightforward communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 font-serif mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                    {srv.shortDesc}
                  </p>
                </div>

                <button
                  id={`srv-cta-${srv.id}`}
                  onClick={() => {
                    onNavigate(srv.actionRoute);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-amber-700 transition-colors"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust / Brand Section */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
            Our Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 mt-2 mb-4">
            Property decisions made easier.
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Capi Buy Properties provides clear, factual property details, verified sector information, and direct access to assistance for buying, selling, or renting across Islamabad. We focus on transparent communication rather than exaggerated claims.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-lg bg-white border border-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mb-2" />
              <h4 className="text-xs font-bold text-neutral-900 uppercase">Focused Coverage</h4>
              <p className="text-neutral-500 text-xs mt-1">
                Specialized in selected high-demand Islamabad sectors and phases.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-neutral-200">
              <FileCheck className="w-5 h-5 text-amber-600 mb-2" />
              <h4 className="text-xs font-bold text-neutral-900 uppercase">Direct Verification</h4>
              <p className="text-neutral-500 text-xs mt-1">
                Objective property information and realistic market assessments.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-neutral-200">
              <Compass className="w-5 h-5 text-amber-600 mb-2" />
              <h4 className="text-xs font-bold text-neutral-900 uppercase">Responsive Support</h4>
              <p className="text-neutral-500 text-xs mt-1">
                Direct phone and WhatsApp coordination for viewings and queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Quick Contact CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-neutral-950 p-8 sm:p-12 rounded-2xl border border-neutral-800">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Connect Directly
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                Looking to Buy, Sell or Rent in Islamabad?
              </h2>
              <p className="text-neutral-400 text-sm mt-2">
                Reach out to Capi Buy Properties today for property availability, site visits, or selling assistance.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                id="cta-call-button"
                href={BRAND.phoneTel}
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-neutral-900" />
                <span>Call {BRAND.phone}</span>
              </a>

              <a
                id="cta-whatsapp-button"
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <button
                id="cta-contact-page-button"
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-lg text-sm font-semibold border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                Send Inquiry Form
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
