import React, { useState, useEffect } from 'react';
import {
  PageRoute,
  Property,
  PropertyFilterState,
  PropertyCategory,
  ApprovedArea,
} from './types';
import { DEMO_PROPERTIES } from './data/properties';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomeView } from './views/HomeView';
import { PropertiesView } from './views/PropertiesView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { SellWithUsView } from './views/SellWithUsView';
import { ServicesView } from './views/ServicesView';
import { AreasView } from './views/AreasView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const initialFilters: PropertyFilterState = {
    transactionType: 'all',
    category: 'all',
    area: 'all',
    minPrice: null,
    maxPrice: null,
    keyword: '',
    sortBy: 'featured',
  };

  const [filters, setFilters] = useState<PropertyFilterState>(initialFilters);

  // Sync hash routing for shareable URLs and browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === 'home') {
        setCurrentPage('home');
        setSelectedPropertyId(null);
      } else if (hash.startsWith('property/')) {
        const propId = hash.replace('property/', '');
        const exists = DEMO_PROPERTIES.some((p) => p.id === propId);
        if (exists) {
          setSelectedPropertyId(propId);
          setCurrentPage('property-detail');
        } else {
          setCurrentPage('404');
        }
      } else if (
        [
          'properties',
          'buy',
          'rent',
          'sell-with-us',
          'services',
          'areas',
          'about',
          'contact',
        ].includes(hash)
      ) {
        if (hash === 'buy') {
          setFilters((prev) => ({ ...prev, transactionType: 'Buy' }));
        } else if (hash === 'rent') {
          setFilters((prev) => ({ ...prev, transactionType: 'Rent' }));
        }
        setCurrentPage(hash as PageRoute);
        setSelectedPropertyId(null);
      } else {
        setCurrentPage('404');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    setSelectedPropertyId(null);
    if (page === 'home') {
      window.location.hash = 'home';
    } else if (page === 'buy') {
      setFilters((prev) => ({ ...prev, transactionType: 'Buy' }));
      window.location.hash = 'buy';
    } else if (page === 'rent') {
      setFilters((prev) => ({ ...prev, transactionType: 'Rent' }));
      window.location.hash = 'rent';
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage('property-detail');
    window.location.hash = `property/${propertyId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: PropertyCategory) => {
    setFilters((prev) => ({
      ...prev,
      category,
      transactionType: 'all',
    }));
    navigateTo('properties');
  };

  const handleSelectArea = (area: ApprovedArea) => {
    setFilters((prev) => ({
      ...prev,
      area,
      transactionType: 'all',
    }));
    navigateTo('properties');
  };

  // Property counts by area for AreasView
  const propertyCountByArea = APPROVED_AREAS_COUNT();

  function APPROVED_AREAS_COUNT(): Record<ApprovedArea, number> {
    const counts: Record<string, number> = {};
    DEMO_PROPERTIES.forEach((p) => {
      counts[p.area] = (counts[p.area] || 0) + 1;
    });
    return counts as Record<ApprovedArea, number>;
  }

  const selectedProperty = selectedPropertyId
    ? DEMO_PROPERTIES.find((p) => p.id === selectedPropertyId)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 font-sans selection:bg-amber-700 selection:text-white">
      {/* Sticky Header */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            properties={DEMO_PROPERTIES}
            filters={filters}
            onFilterChange={setFilters}
            onNavigate={navigateTo}
            onSelectProperty={handleSelectProperty}
            onSelectCategory={handleSelectCategory}
            onSelectArea={handleSelectArea}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesView
            properties={DEMO_PROPERTIES}
            filters={filters}
            onFilterChange={setFilters}
            onSelectProperty={handleSelectProperty}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'buy' && (
          <PropertiesView
            properties={DEMO_PROPERTIES}
            filters={{ ...filters, transactionType: 'Buy' }}
            onFilterChange={setFilters}
            onSelectProperty={handleSelectProperty}
            onNavigate={navigateTo}
            customHeading="Find a Property to Buy"
            customSubheading="Browse residential homes, luxury apartments, and commercial plots available for purchase in Islamabad."
          />
        )}

        {currentPage === 'rent' && (
          <PropertiesView
            properties={DEMO_PROPERTIES}
            filters={{ ...filters, transactionType: 'Rent' }}
            onFilterChange={setFilters}
            onSelectProperty={handleSelectProperty}
            onNavigate={navigateTo}
            customHeading="Find a Property to Rent"
            customSubheading="Explore quality furnished apartments, spacious residential houses, and commercial office floors for rent in Islamabad."
          />
        )}

        {currentPage === 'sell-with-us' && (
          <SellWithUsView onNavigate={navigateTo} />
        )}

        {currentPage === 'services' && (
          <ServicesView onNavigate={navigateTo} />
        )}

        {currentPage === 'areas' && (
          <AreasView
            onNavigate={navigateTo}
            onSelectArea={handleSelectArea}
            propertyCountByArea={propertyCountByArea}
          />
        )}

        {currentPage === 'about' && (
          <AboutView onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactView onNavigate={navigateTo} />
        )}

        {currentPage === 'property-detail' && (
          selectedProperty ? (
            <PropertyDetailView
              property={selectedProperty}
              allProperties={DEMO_PROPERTIES}
              onBack={() => navigateTo('properties')}
              onSelectProperty={handleSelectProperty}
              onNavigate={navigateTo}
            />
          ) : (
            <NotFoundView onNavigate={navigateTo} />
          )
        )}

        {currentPage === '404' && (
          <NotFoundView onNavigate={navigateTo} />
        )}
      </main>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Multi-Column Footer */}
      <Footer
        onNavigate={navigateTo}
        onFilterByCategory={handleSelectCategory}
        onFilterByArea={handleSelectArea}
      />
    </div>
  );
}
