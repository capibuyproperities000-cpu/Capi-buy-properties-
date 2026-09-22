import React from 'react';
import { PropertyCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PropertyCategoriesProps {
  onSelectCategory: (category: PropertyCategory) => void;
  categoryCounts: Record<PropertyCategory, number>;
}

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({
  onSelectCategory,
  categoryCounts,
}) => {
  const categories: {
    category: PropertyCategory;
    title: string;
    subtitle: string;
    image: string;
  }[] = [
    {
      category: 'House',
      title: 'HOUSE',
      subtitle: 'Designer bungalows, villas & family residences',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Apartment',
      title: 'APARTMENTS',
      subtitle: 'Luxury high-rise, penthouses & serviced suites',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Plot / Land',
      title: 'PLOTS & LAND',
      subtitle: 'Prime residential & commercial possession plots',
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Shop / Commercial',
      title: 'SHOPS & COMMERCIAL',
      subtitle: 'High footfall retail outlets & corporate markaz shops',
      image:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Building',
      title: 'BUILDINGS',
      subtitle: 'Complete corporate plazas & mixed-use towers',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-16 bg-neutral-50/50 border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
              Property Categories
            </span>
            <h2 className="text-3xl font-bold text-neutral-900 font-serif mt-1 tracking-tight">
              Explore Properties
            </h2>
            <p className="text-neutral-500 text-sm mt-1.5 max-w-xl">
              Select a category to view verified listings across Islamabad’s premier sectors.
            </p>
          </div>
        </div>

        {/* 5-Card Grid: 2 on top row, 3 on bottom row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((item) => {
            const count = categoryCounts[item.category] || 0;
            return (
              <button
                key={item.category}
                id={`cat-card-${item.category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                onClick={() => onSelectCategory(item.category)}
                className="group relative h-80 rounded-xl overflow-hidden text-left focus:outline-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Background image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-black/10 group-hover:from-neutral-950/95 transition-colors" />

                {/* Top Corner Pill */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase bg-amber-600/90 text-white rounded-md mb-2">
                    {count} {count === 1 ? 'Listing' : 'Listings'}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight font-serif text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-300 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
