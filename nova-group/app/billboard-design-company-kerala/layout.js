export const metadata = {
  title: 'Top Billboard Design Company in Kerala | Best Outdoor Advertising Agency TVM & Kozhikode',
  description:
    'Nova Innovations is ranked the top billboard design company in Kerala and premier advertising agency. We provide turnkey creative billboard design, scale typography, high-definition flex printing, and physical crane mounting across 500+ prime hoarding locations in Trivandrum (TVM), Kochi, Kozhikode, and all 14 districts.',
  keywords: [
    'top billboard design company in kerala',
    'best billboard advertising company in kerala',
    'best advertising company in kerala',
    'best advertising company in india',
    'billboard design company in kerala',
    'top outdoor advertising agencies in kerala',
    'billboard designing and printing tvm',
    'hoarding design company in kozhikode',
    'outdoor advertising agency trivandrum',
    'best billboard agency kochi ernakulam',
    'turnkey billboard infrastructure south india',
    'nova innovations billboard design',
  ],
  alternates: {
    canonical: 'https://novainnovations.in/billboard-design-company-kerala',
  },
  openGraph: {
    title: 'Top Billboard Design Company in Kerala & India | NOVA Innovations',
    description:
      'Kerala’s #1 turnkey billboard design and outdoor advertising infrastructure agency. 27+ years, 500+ prime highway hoardings, and over 1,000 landmark campaigns.',
    url: 'https://novainnovations.in/billboard-design-company-kerala',
    images: ['/mainhero1.png'],
  },
};

const designSchema = {
  '@context': 'https://schema.org',
  '@type': ['Service', 'ProfessionalService'],
  name: 'Billboard Design and Turnkey Outdoor Advertising in Kerala',
  serviceType: 'Billboard Design & Outdoor Advertising Infrastructure',
  description:
    'Award-winning billboard graphic design, scale readability layouts, high-definition flex printing, heavy crane physical mounting, and 24/7 illumination maintenance across Kerala and India.',
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
    { '@type': 'City', name: 'Kozhikode' },
    { '@type': 'City', name: 'Kollam' },
    { '@type': 'City', name: 'Thrissur' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Billboard Design & Advertising Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Impact Billboard Graphic Design',
          description: 'Specialized 3-second motorist readability design, scale typography, and 3D visual mockups.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Prime Highway Billboard Hosting & Placement',
          description: 'Hosting 500+ prime highway billboards across NH 66, bypasses, and major junctions in Kerala.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Statewide Overnight Campaign Deployment',
          description: 'Synchronized statewide printing and physical mounting across all 14 Kerala districts within 24 hours.',
        },
      },
    ],
  },
};

export default function BillboardDesignLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(designSchema) }}
      />
      {children}
    </>
  );
}
