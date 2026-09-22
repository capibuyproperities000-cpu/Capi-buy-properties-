import React from 'react';
import { PageRoute, ApprovedArea } from '../types';
import { AREAS_DATA } from '../data/areas';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';

interface AreasViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectArea: (area: ApprovedArea) => void;
  propertyCountByArea: Record<ApprovedArea, number>;
}

export const AreasView: React.FC<AreasViewProps> = ({
  onNavigate,
  onSelectArea,
  propertyCountByArea,
}) => {
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
          <span className="text-neutral-900 font-medium">Areas</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Focused Coverage
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mt-1 tracking-tight">
            Explore Our Areas
          </h1>
          <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
            Capi Buy Properties focuses on the core approved sectors and growing phases of Islamabad. Click on any area to browse matching residential and commercial opportunities.
          </p>
        </div>

        {/* 9 Approved Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {AREAS_DATA.map((area) => {
            const count = propertyCountByArea[area.name] || 0;
            return (
              <div
                key={area.name}
                id={`area-detail-card-${area.name.replace(/\s+/g, '-').toLowerCase()}`}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Cover */}
                <div className="relative h-52 bg-neutral-900 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md bg-white/20 text-white backdrop-blur-md">
                      Islamabad Sector
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-amber-600 text-white shadow-xs">
                      {count} {count === 1 ? 'Property' : 'Properties'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl font-bold font-serif tracking-tight">
                      {area.name}
                    </h2>
                    <p className="text-xs text-amber-300 font-medium mt-0.5 line-clamp-1">
                      {area.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-neutral-600 text-xs leading-relaxed mb-5">
                      {area.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-neutral-100 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Sector Highlights:
                      </span>
                      {area.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    id={`view-area-properties-${area.name.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => onSelectArea(area.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 group-hover:bg-amber-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View {area.name} Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Policy Clarification */}
        <div className="p-6 rounded-xl bg-white border border-neutral-200 text-center max-w-2xl mx-auto text-xs text-neutral-500">
          <p className="font-semibold text-neutral-800 mb-1">Location Notice</p>
          Capi Buy Properties operates specifically within the 9 approved Islamabad sectors and developments displayed above, maintaining deep on-ground familiarity and accurate verification for our clients.
        </div>
      </div>
    </div>
  );
};
