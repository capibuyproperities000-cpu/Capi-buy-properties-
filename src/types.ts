export type ApprovedArea =
  | 'B-17'
  | 'Faisal Town Phase 1'
  | 'Faisal Town Phase 2'
  | 'Faisal Hills'
  | 'E Sectors'
  | 'F Sectors'
  | 'G Sectors'
  | 'H Sectors'
  | 'I Sectors';

export type PropertyCategory =
  | 'House'
  | 'Apartment'
  | 'Plot / Land'
  | 'Shop / Commercial'
  | 'Building';

export type TransactionType = 'Buy' | 'Rent';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  transactionType: TransactionType;
  location: string;
  area: ApprovedArea;
  price: number; // in PKR
  priceFormatted: string;
  size: string;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  status: 'Available' | 'Under Offer' | 'Exclusive';
  isFeatured?: boolean;
  createdAt: string;
  contactInformation: {
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export interface PropertyFilterState {
  transactionType: 'all' | TransactionType;
  category: 'all' | PropertyCategory;
  area: 'all' | ApprovedArea;
  minPrice: number | null;
  maxPrice: number | null;
  keyword: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export type PageRoute =
  | 'home'
  | 'properties'
  | 'buy'
  | 'rent'
  | 'sell-with-us'
  | 'services'
  | 'areas'
  | 'about'
  | 'contact'
  | 'property-detail'
  | '404';

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
}

export interface SellPropertyFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  propertyType: PropertyCategory;
  propertyLocation: string;
  propertySize: string;
  expectedPrice: string;
  propertyCondition: string;
  additionalDetails: string;
}

export interface AreaInfo {
  name: ApprovedArea;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
}
