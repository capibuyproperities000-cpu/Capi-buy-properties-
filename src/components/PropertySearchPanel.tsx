import React from 'react';
import {
  PropertyFilterState,
  ApprovedArea,
  PropertyCategory,
  TransactionType,
} from '../types';
import { APPROVED_AREAS, PROPERTY_CATEGORIES } from '../data/constants';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface PropertySearchPanelProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  onSearchSubmit?: () => void;
  resultCount?: number;
  compact?: boolean;
}

export const PropertySearchPanel: React.FC<PropertySearchPanelProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  resultCount,
  compact = false,
}) => {
  const handleTransactionChange = (type: 'all' | TransactionType) => {
    onFilterChange({ ...filters, transactionType: type });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      category: e.target.value as 'all' | PropertyCategory,
    });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      area: e.target.value as 'all' | ApprovedArea,
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : null;
    onFilterChange({ ...filters, minPrice: val });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : null;
    onFilterChange({ ...filters, maxPrice: val });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, keyword: e.target.value });
  };

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

  const hasActiveFilters =
    filters.transactionType !== 'all' ||
    filters.category !== 'all' ||
    filters.area !== 'all' ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.keyword.trim() !== '';

  return (
    <div className={`bg-white rounded-2xl border border-neutral-200/90 shadow-xl transition-all ${compact ? 'p-4' : 'p-6'}`}>
      {/* Header with Transaction Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-100">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
          <button
            type="button"
            id="tab-filter-all"
            onClick={() => handleTransactionChange('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              filters.transactionType === 'all'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Types
          </button>
          <button
            type="button"
            id="tab-filter-buy"
            onClick={() => handleTransactionChange('Buy')}
            className={`px-5 py-2 text-xs font-semibold rounded-md transition-all ${
              filters.transactionType === 'Buy'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            id="tab-filter-rent"
            onClick={() => handleTransactionChange('Rent')}
            className={`px-5 py-2 text-xs font-semibold rounded-md transition-all ${
              filters.transactionType === 'Rent'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Rent
          </button>
        </div>

        {/* Clear Filters & Count */}
        <div className="flex items-center gap-3">
          {resultCount !== undefined && (
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-md">
              Showing <strong className="text-neutral-900">{resultCount}</strong> properties
            </span>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              id="clear-filters-btn"
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-600 py-1.5 px-2.5 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {/* Keyword Search */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
            Search Keyword
          </label>
          <div className="relative">
            <input
              type="text"
              id="search-keyword-input"
              value={filters.keyword}
              onChange={handleKeywordChange}
              placeholder="e.g. 1 Kanal, Corner, F-10"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
            Property Type
          </label>
          <select
            id="filter-property-type-select"
            value={filters.category}
            onChange={handleCategoryChange}
            aria-label="Filter by Property Type"
            className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
          >
            <option value="all">All Categories</option>
            {PROPERTY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Area Selection Dropdown (Only approved areas!) */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
            Islamabad Area
          </label>
          <select
            id="filter-area-select"
            value={filters.area}
            onChange={handleAreaChange}
            aria-label="Filter by Islamabad Area"
            className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
          >
            <option value="all">All Approved Areas</option>
            {APPROVED_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Price Ranges Min & Max */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Min Price
            </label>
            <select
              id="filter-min-price-select"
              value={filters.minPrice !== null ? String(filters.minPrice) : ''}
              onChange={handleMinPriceChange}
              aria-label="Minimum Price Filter"
              className="w-full px-2 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
            >
              <option value="">Any Min</option>
              <option value="50000">PKR 50k</option>
              <option value="100000">PKR 1 Lac</option>
              <option value="5000000">PKR 50 Lac</option>
              <option value="10000000">PKR 1 Crore</option>
              <option value="30000000">PKR 3 Crore</option>
              <option value="50000000">PKR 5 Crore</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Max Price
            </label>
            <select
              id="filter-max-price-select"
              value={filters.maxPrice !== null ? String(filters.maxPrice) : ''}
              onChange={handleMaxPriceChange}
              aria-label="Maximum Price Filter"
              className="w-full px-2 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
            >
              <option value="">Any Max</option>
              <option value="300000">PKR 3 Lac</option>
              <option value="10000000">PKR 1 Crore</option>
              <option value="30000000">PKR 3 Crore</option>
              <option value="60000000">PKR 6 Crore</option>
              <option value="150000000">PKR 15 Crore</option>
              <option value="500000000">PKR 50 Crore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit / Trigger Button */}
      {onSearchSubmit && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            id="search-properties-submit-btn"
            onClick={onSearchSubmit}
            className="w-full sm:w-auto px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Search Properties</span>
          </button>
        </div>
      )}
    </div>
  );
};
