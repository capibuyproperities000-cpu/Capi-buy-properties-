export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  points: string[];
  ctaText: string;
  actionRoute: 'buy' | 'sell-with-us' | 'rent' | 'contact';
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'property-buying',
    title: 'Property Buying',
    shortDesc: 'Help customers explore and inquire about suitable properties across selected areas of Islamabad.',
    fullDesc:
      'We guide buyers through exploring residential and commercial opportunities across Islamabad’s prime sectors, helping evaluate property specifications, verify location suitability, and submit direct inquiries for viewing.',
    points: [
      'Tailored property shortlisting based on budget and location preferences',
      'Assistance across houses, luxury apartments, and residential/commercial plots',
      'Direct scheduling for on-ground site visits and physical inspections',
      'Transparent price discussions and property detail verification',
    ],
    ctaText: 'Explore Properties to Buy',
    actionRoute: 'buy',
  },
  {
    id: 'property-selling',
    title: 'Property Selling',
    shortDesc: 'Allow property owners to submit their properties for selling assistance.',
    fullDesc:
      'Property owners looking to sell their house, plot, apartment, or commercial asset can submit their property details directly to Capi Buy Properties for dedicated marketing and qualified buyer matching.',
    points: [
      'Direct submission of your property specs and asking price',
      'Presentation of your property to active, vetted buyers and investors',
      'Professional communication and coordination of viewing schedules',
      'Guidance through standard documentation and transfer processes',
    ],
    ctaText: 'Sell Your Property',
    actionRoute: 'sell-with-us',
  },
  {
    id: 'property-rental',
    title: 'Property Rental',
    shortDesc: 'Help customers explore rental property options.',
    fullDesc:
      'Whether you are an expatriate, a corporate executive, or a family seeking a quality home or commercial office in Islamabad, we assist in identifying and securing suitable rental listings.',
    points: [
      'Curated furnished and unfurnished rental houses and apartments',
      'Commercial office spaces, corporate floors, and retail shops',
      'Assistance with tenancy terms and agreement formalization',
      'Focus on secure sectors and well-maintained properties',
    ],
    ctaText: 'Explore Rental Properties',
    actionRoute: 'rent',
  },
  {
    id: 'real-estate-consultancy',
    title: 'Real Estate Consultancy',
    shortDesc: 'Provide property-related consultation and guidance.',
    fullDesc:
      'Navigating Islamabad’s real estate landscape requires local market familiarity. We offer pragmatic, research-backed advice on development trends, sector readiness, and property suitability.',
    points: [
      'Objective analysis of sector development timelines and infrastructure status',
      'Comparative evaluation between different sectors and phases',
      'Clarification regarding NOC approvals and transfer guidelines',
      'Honest, non-exaggerated property counsel tailored to your timeline',
    ],
    ctaText: 'Contact for Consultation',
    actionRoute: 'contact',
  },
];
