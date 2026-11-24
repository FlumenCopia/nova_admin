export const metadata = {
  title: 'Turnkey Outdoor Advertising Services Kerala | Billboards, Vehicle & Transit TVM',
  description:
    "Full A-to-Z OOH media services across Kerala & Trivandrum (TVM): We plan, host, design, print, physically place, and maintain 500+ highway hoardings, KSRTC bus wraps, and retail signages from head to tail.",
  keywords: [
    'turnkey outdoor advertising services kerala',
    'billboard advertising trivandrum',
    'hoarding placement and maintenance kerala',
    'ksrtc bus branding agency tvm',
    'vehicle advertising kerala',
    'unipole media hosting kerala',
    'a to z physical advertising kerala',
    'highway hoardings nh 66 tvm',
    'transit media advertising kerala',
    'nova innovations services',
  ],
  alternates: {
    canonical: 'https://novainnovations.in/services',
  },
  openGraph: {
    title: 'A-to-Z Outdoor & Transit Advertising Services Kerala | Nova Innovations',
    description:
      'We host, print, physically place, and maintain 500+ prime billboards, road gantries, and transit fleet wraps across Kerala and TVM.',
    url: 'https://novainnovations.in/services',
    images: ['/mainhero1.png'],
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Turnkey Outdoor Advertising & Media Hosting',
  provider: {
    '@type': 'AdvertisingAgency',
    name: 'NOVA Innovations',
    url: 'https://novainnovations.in',
    telephone: '+919539000640',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, Thycaud',
      addressLocality: 'Thiruvananthapuram',
      addressRegion: 'Kerala',
      postalCode: '695014',
      addressCountry: 'IN',
    },
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Kerala' },
    { '@type': 'City', name: 'Thiruvananthapuram' },
    { '@type': 'City', name: 'Kochi' },
    { '@type': 'City', name: 'Kollam' },
    { '@type': 'City', name: 'Thrissur' },
    { '@type': 'City', name: 'Kozhikode' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Turnkey A-to-Z Physical Advertising Catalog',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Highway Billboards & High-Rise Unipoles Hosting & Placement',
          description: 'Prime highway hoardings across NH 66, MC Road, and Trivandrum city corridors with 24/7 illumination and continuous maintenance.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Vehicle & Transit Advertising Fleet Wraps',
          description: 'Official KSRTC bus wraps, auto hood branding, and mobile LED announcement vans covering all 14 Kerala districts.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Turnkey In-House Studio Design & Industrial Flex Printing',
          description: 'High-impact 3D visual designs, heavy-duty solvent/eco-solvent printing, and 24-hour rapid overnight statewide mounting.',
        },
      },
    ],
  },
};

export default function ServicesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  );
}
