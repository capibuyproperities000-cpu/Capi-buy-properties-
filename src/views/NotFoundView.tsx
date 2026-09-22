import React from 'react';
import { PageRoute } from '../types';
import { Building2, Home, Search, ArrowRight } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF9F6] px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-5">
          <Building2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">
          404 Error
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 mb-2">
          Property Not Found
        </h1>

        <p className="text-neutral-600 text-sm mb-8 leading-relaxed">
          The page or property you&apos;re looking for could not be found.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            id="notfound-home-btn"
            onClick={() => onNavigate('home')}
            className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <button
            id="notfound-explore-btn"
            onClick={() => onNavigate('properties')}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Explore Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
};
