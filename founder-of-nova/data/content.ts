import { ServiceItem, ClientItem, GallerySlide } from '@/types';

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Innovative Hoardings',
    description:
      'High-visibility billboards, unipoles, gantries, and cantilever structures in prime city junctions and national highways across Kerala.',
    icon: 'fa-rectangle-ad',
    features: ['Prime footfall locations', 'Weatherproof flex & LED lights'],
    isActive: true,
  },
  {
    id: 'srv-2',
    title: 'Vehicle Advertising',
    description:
      'Time-bound mobile advertising fleet services including KSRTC buses, private transit branding, and promotional display vans.',
    icon: 'fa-bus',
    features: ['High city-wide reach & mobility', 'Full body wrap & side panels'],
    isActive: true,
  },
  {
    id: 'srv-3',
    title: 'Shop & Retail Branding',
    description:
      'Complete store exterior & interior transformations: 3D illuminated signboards, LED glow boards, ACP signboards, and retail display units.',
    icon: 'fa-store',
    features: ['LED glow & ACP signboards', 'Showroom facade design'],
    isActive: true,
  },
  {
    id: 'srv-4',
    title: 'Event Branding & Stalls',
    description:
      'Capturing the essence of your brand in corporate events, exhibition stalls, stage backdrops, kiosks, and product launch productions.',
    icon: 'fa-champagne-glasses',
    features: ['Custom stall fabrication', 'Turnkey event management'],
    isActive: true,
  },
  {
    id: 'srv-5',
    title: 'Commercial Wall Paintings',
    description:
      'Long-lasting direct wall artworks and branding murals executed with durable weather-resistant paint on prominent roadsides and town walls.',
    icon: 'fa-paintbrush',
    features: ['Long-term brand retention', 'Rural & urban highway routes'],
    isActive: true,
  },
  {
    id: 'srv-6',
    title: 'Design Studio & Printing',
    description:
      'State-of-the-art flex digital printing, large format banners, offset catalogs, brochures, bulk posters, and corporate stationery.',
    icon: 'fa-pen-ruler',
    features: ['High-definition printing machinery', 'Creative branding agency support'],
    isActive: true,
  },
];

export const DEFAULT_CLIENT_LOGOS: ClientItem[] = [
  { name: 'KSRTC', file: 'client_ksrtc.png', isActive: true },
  { name: 'myG', file: 'client_myg.png', isActive: true },
  { name: 'Bank of Baroda', file: 'client_bob.png', isActive: true },
  { name: 'Bhima', file: 'client_bhima.png', isActive: true },
  { name: 'Pothys', file: 'client_pothys.png', isActive: true },
  { name: 'Impex', file: 'client_impex.png', isActive: true },
  { name: 'Oxygen', file: 'client_oxygen.png', isActive: true },
  { name: 'Malayala Manorama', file: 'client_manorama.png', isActive: true },
];

export const GALLERY_SLIDES: GallerySlide[] = [
  {
    img: '/assets/founder_gireesh.jpg',
    badgeIcon: 'fa-user-tie',
    badgeText: 'Executive Profile',
    counter: '01 / 06',
    title: 'GIREESH KUMAR S — Founder, Director & CEO',
    metaIcon: 'fa-award',
    meta: '27+ Years Excellence • Managing 500+ Prime Media Assets Across Kerala',
    modalSubject: 'Founder Meeting',
    actionText: 'Connect with Director',
  },
  {
    img: '/assets/founder_hoarding.jpg',
    badgeIcon: 'fa-bolt',
    badgeText: 'Highway Inspection',
    counter: '02 / 06',
    title: 'Founder Inspection — Highway Hoarding Landmark',
    metaIcon: 'fa-location-dot',
    meta: 'NH 66 Corridor • Director Gireesh Kumar S Overseeing Spot-Lit 40x20 FT Billboard',
    modalSubject: 'Highway Hoarding',
    actionText: 'Inquire Location',
  },
  {
    img: '/assets/founder_transit.jpg',
    badgeIcon: 'fa-bus',
    badgeText: 'Transit Fleet Launch',
    counter: '03 / 06',
    title: 'Gireesh Kumar S Launching KSRTC Transit Wrap Fleet',
    metaIcon: 'fa-location-dot',
    meta: '14 Districts Pan-Kerala • Statewide Mobile Media Network',
    modalSubject: 'Transit Media',
    actionText: 'Inquire Fleet',
  },
  {
    img: '/assets/founder_retail.jpg',
    badgeIcon: 'fa-store',
    badgeText: 'Retail Unveiling',
    counter: '04 / 06',
    title: 'Retail Facade & 3D LED Display Unveiling',
    metaIcon: 'fa-location-dot',
    meta: 'Highway Commercial Hub • Gireesh Kumar S at Architectural Facade Opening',
    modalSubject: 'Retail Facade',
    actionText: 'Inquire Branding',
  },
  {
    img: '/assets/founder_execution.jpg',
    badgeIcon: 'fa-wand-magic-sparkles',
    badgeText: 'Studio Operations',
    counter: '05 / 06',
    title: 'Overnight Flex Printing & Studio Direction',
    metaIcon: 'fa-location-dot',
    meta: 'Design Studio Hub • Director Gireesh Kumar S Directing 24/7 Rapid Execution Team',
    modalSubject: 'Campaign Execution',
    actionText: 'Inquire Execution',
  },
  {
    img: '/assets/founder_award.jpg',
    badgeIcon: 'fa-microphone',
    badgeText: 'Media Keynote',
    counter: '06 / 06',
    title: 'Advertising Excellence Summit Keynote',
    metaIcon: 'fa-trophy',
    meta: 'Kerala Media Summit • Keynote Address on OOH Innovations by Director Gireesh Kumar S',
    modalSubject: 'Founder Keynote',
    actionText: 'Inquire Speaker',
  },
];

