import React, { useState, useMemo } from 'react';
import {
  Property,
  PropertyFilterState,
  PageRoute,
  PropertyCategory,
  ApprovedArea,
} from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PropertySearchPanel } from '../components/PropertySearchPanel';
import { Building2, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface PropertiesViewProps {
  properties: Property[];
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  onSelectProperty: (propertyId: string) => void;
  onNavigate: (route: PageRoute) => void;
  customHeading?: string;
  customSubheading?: string;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  properties,
  filters,
  onFilterChange,
  onSelectProperty,
  onNavigate,
  customHeading = 'Property Listings in Islamabad',
  customSubheading = 'Search and filter residential, commercial and land opportunities across Islamabad with Capi Buy Properties.',
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Transaction Type
      if (
        filters.transactionType !== 'all' &&
        prop.transactionType !== filters.transactionType
      ) {
        return false;
      }

      // Category
      if (filters.category !== 'all' && prop.category !== filters.category) {
        return false;
      }

      // Area
      if (filters.area !== 'all' && prop.area !== filters.area) {
        return false;
      }

      // Min Price
      if (filters.minPrice !== null && prop.price < filters.minPrice) {
        return false;
      }

      // Max Price
      if (filters.maxPrice !== null && prop.price > filters.maxPrice) {
        return false;
      }

      // Keyword
      if (filters.keyword.trim()) {
        const q = filters.keyword.toLowerCase().trim();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        const matchesCategory = prop.category.toLowerCase().includes(q);
        const matchesArea = prop.area.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesCategory && !matchesArea) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [properties, filters]);

  const handleClearFilters = () => {
    onFilterChange({
      transactionType: 'all',
      category: 'all',
      area: 'all',
      minPrice: null,
      maxPrice: null,
      keyword: '',
      sortBy: 'featured',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-800 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Properties</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            {customHeading}
          </h1>
          <p className="text-neutral-600 text-sm mt-1.5 max-w-2xl">
            {customSubheading}
          </p>
        </div>

        {/* Filter Panel Container */}
        <div className="mb-8">
          <PropertySearchPanel
            filters={filters}
            onFilterChange={onFilterChange}
            resultCount={filteredProperties.length}
          />
        </div>

        {/* Results Bar (Sort + Count) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
          <div className="text-sm text-neutral-700">
            Showing <span className="font-bold text-neutral-950">{filteredProperties.length}</span> of {properties.length} listings
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by-select" className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </label>
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as PropertyFilterState['sortBy'],
                })
              }
              className="px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Listings Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onViewDetails={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          /* Empty State as specified: "No Properties Found" */
          <div className="text-center py-20 px-4 bg-white rounded-2xl border border-neutral-200 shadow-xs max-w-xl mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-neutral-900 mb-2">
              No Properties Found
            </h2>
            <p className="text-neutral-600 text-sm mb-6 max-w-md mx-auto">
              Try changing your filters or explore another area.
            </p>
            <button
              id="empty-state-clear-filters-btn"
              onClick={handleClearFilters}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Demo Listings Disclosure */}
        <div className="mt-14 p-4 rounded-xl bg-white border border-neutral-200 text-center text-xs text-neutral-500">
          <span className="font-semibold text-neutral-700">Notice:</span> Demo property records shown above are structured for functional demonstration and are ready for inventory updates.
        </div>
      </div>
    </div>
  );
};
