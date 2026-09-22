import React from 'react';
import { Property } from '../types';
import { getWhatsAppInquiryUrl } from '../data/constants';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
}) => {
  const whatsappUrl = getWhatsAppInquiryUrl(property.title, property.id);

  return (
    <article className="group bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col h-full">
      {/* Image Container with Badge */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback image if unsplash link has issues
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md text-white shadow-xs ${
              property.transactionType === 'Buy'
                ? 'bg-amber-600'
                : 'bg-indigo-600'
            }`}
          >
            For {property.transactionType}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-900/80 text-neutral-100 backdrop-blur-xs">
            {property.category}
          </span>
        </div>

        {/* Status Badge */}
        {property.status === 'Exclusive' && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500 text-neutral-950 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Exclusive</span>
          </div>
        )}

        {/* Bottom overlay with area badge & price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <span className="text-xs font-medium bg-neutral-950/60 px-2 py-0.5 rounded-sm backdrop-blur-xs">
            {property.area}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="mb-2">
            <span className="text-xl font-bold text-neutral-900 font-serif tracking-tight">
              {property.priceFormatted}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(property.id)}
            className="font-semibold text-neutral-900 text-base line-clamp-1 hover:text-amber-700 transition-colors cursor-pointer"
            title={property.title}
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-neutral-500 text-xs mt-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Specifications Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-100 text-neutral-600 text-xs mb-4">
            <div className="flex items-center gap-1.5" title={`Size: ${property.size}`}>
              <Maximize2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate font-medium">{property.size}</span>
            </div>

            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
                <Bed className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-medium">{property.bedrooms} Beds</span>
              </div>
            )}

            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
                <Bath className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-medium">{property.bathrooms} Baths</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            id={`view-details-${property.id}`}
            onClick={() => onViewDetails(property.id)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            id={`whatsapp-card-${property.id}`}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
};
