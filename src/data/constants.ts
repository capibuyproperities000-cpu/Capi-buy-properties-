import { ApprovedArea, PropertyCategory } from '../types';

export const BRAND = {
  name: 'Capi Buy Properties',
  location: 'Islamabad, Pakistan',
  phone: '03360566035',
  phoneTel: 'tel:03360566035',
  whatsappRaw: '03360566035',
  whatsappUrl: 'https://wa.me/923360566035',
  email: 'capibuyproperties000@gmail.com',
  emailMailto: 'mailto:capibuyproperties000@gmail.com',
  instagramUrl: 'https://www.instagram.com/capibuyproperties_01?stkn=aTg3M3pyOXFy',
  instagramHandle: '@capibuyproperties_01',
  tiktokUrl: 'https://www.tiktok.com/@capi.buy.properties011',
  tiktokHandle: '@capi.buy.properties011',
  defaultWhatsAppMessage: 'Hello Capi Buy Properties, I am interested in a property. Please share more details.',
};

export const APPROVED_AREAS: ApprovedArea[] = [
  'B-17',
  'Faisal Town Phase 1',
  'Faisal Town Phase 2',
  'Faisal Hills',
  'E Sectors',
  'F Sectors',
  'G Sectors',
  'H Sectors',
  'I Sectors',
];

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  'House',
  'Apartment',
  'Plot / Land',
  'Shop / Commercial',
  'Building',
];

export function getWhatsAppInquiryUrl(propertyTitle?: string, propertyId?: string): string {
  if (propertyTitle) {
    const text = encodeURIComponent(
      `Hello Capi Buy Properties, I am interested in "${propertyTitle}" (Ref: ${propertyId || 'Listing'}). Please share more details and availability.`
    );
    return `https://wa.me/923360566035?text=${text}`;
  }
  return `https://wa.me/923360566035?text=${encodeURIComponent(BRAND.defaultWhatsAppMessage)}`;
}
