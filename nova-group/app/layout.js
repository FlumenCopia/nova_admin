import './globals.css';
import ClientShell from '../components/ClientShell';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata = {
  title: {
    default: 'Top Billboard Design & Best Advertising Company in Kerala, India | NOVA Innovations',
    template: '%s | Top Billboard Design & Best Advertising Company in Kerala - NOVA Innovations',
  },
  description:
    "NOVA Innovations is ranked the top billboard design company in Kerala and best advertising infrastructure agency across India. 27+ years of turnkey excellence, managing 500+ prime highway hoardings on NH 66, Kazhakkoottam Technopark bypass unipoles, Kowdiar, MG Road, Kozhikode, and statewide KSRTC bus fleet branding.",
  keywords: [
    'top billboard design company in kerala',
    'best advertising company in kerala',
    'best advertising company in india',
    'best billboard advertising companies in tvm',
    'best billboard advertising company in tvm',
    'billboard design company in kerala',
    'top billboard advertising agency kerala',
    'billboard advertising in trivandrum',
    'hoarding advertising tvm',
    'outdoor advertising companies in thiruvananthapuram',
    'top advertising agencies in kozhikode',
    'best outdoor advertising agency in kochi',
    'hoardings advertising agency in trivandrum',
    'billboard designing and printing kerala',
    'hoarding rates in trivandrum',
    'kazhakkoottam technopark billboard advertising',
    'kowdiar billboard advertising tvm',
    'mg road trivandrum hoardings',
    'highway unipoles nh 66 kerala',
    'ksrtc bus branding agency kerala',
    'turnkey outdoor advertising agency kerala',
    'nova innovations',
  ],
  metadataBase: new URL('https://novainnovations.in'),
  alternates: {
    canonical: 'https://novainnovations.in',
  },
  openGraph: {
    title: 'NOVA Innovations | Turnkey Billboard, Hoarding & Vehicle Advertising in Kerala & TVM',
    description:
      'We plan, host, design, physically place, and maintain 500+ prime billboards, highway hoardings, and KSRTC transit wraps from A to Z across Kerala.',
    url: 'https://novainnovations.in',
    siteName: 'Nova Innovations',
    images: [
      {
        url: '/mainhero1.png',
        width: 1200,
        height: 630,
        alt: 'Nova Innovations Turnkey Outdoor Advertising Kerala',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVA Innovations | Turnkey Billboard & Vehicle Advertising Kerala',
    description:
      'From A-to-Z: Media Planning ➔ Site Hosting ➔ Design Studio ➔ Production ➔ Physical Placement ➔ 24/7 Maintenance across Kerala & TVM.',
    images: ['/mainhero1.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AdvertisingAgency', 'LocalBusiness'],
      '@id': 'https://novainnovations.in/#organization',
      name: 'NOVA Innovations',
      alternateName: [
        'Top Billboard Design Company in Kerala',
        'Best Advertising Company in Kerala',
        'Best Advertising Company in India',
        'Nova Advertising Kerala',
        'Nova Innovations OOH',
        'Nova Media Trivandrum',
        'Best Billboard Advertising Company in TVM',
      ],
      url: 'https://novainnovations.in',
      logo: 'https://novainnovations.in/icon-512.png',
      image: 'https://novainnovations.in/mainhero1.png',
      description:
        "Recognized among the best billboard advertising companies in TVM & across Kerala. 27+ years of turnkey excellence, managing 500+ prime highway hoardings, Kazhakkoottam Technopark bypass unipoles, Kowdiar Avenue, MG Road, and statewide KSRTC bus fleet wraps with 100% legal clearance and 24/7 illumination maintenance.",
      telephone: '+919539000640',
      email: 'novainnovations2020@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, Thycaud',
        addressLocality: 'Thiruvananthapuram',
        addressRegion: 'Kerala',
        postalCode: '695014',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 8.4988,
        longitude: 76.9616,
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Kerala' },
        { '@type': 'City', name: 'Thiruvananthapuram (TVM)' },
        { '@type': 'Place', name: 'Kazhakkoottam Technopark Bypass' },
        { '@type': 'Place', name: 'Kowdiar & MG Road Trivandrum' },
        { '@type': 'Place', name: 'NH 66 Highway Corridor Kerala' },
        { '@type': 'City', name: 'Kochi' },
        { '@type': 'City', name: 'Kozhikode' },
        { '@type': 'City', name: 'Kollam' },
        { '@type': 'City', name: 'Palakkad' },
        { '@type': 'City', name: 'Thrissur' },
        { '@type': 'City', name: 'Alappuzha' },
        { '@type': 'City', name: 'Kottayam' },
        { '@type': 'City', name: 'Kannur' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'AdministrativeArea', name: 'South India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Turnkey A-to-Z Outdoor & Physical Advertising Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Prime Highway Billboard & Hoarding Placement & Hosting',
              description: 'Hosting, physical placement, spot illumination, and 24/7 maintenance of 500+ prime highway billboards and unipoles across Kerala & TVM.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'KSRTC Bus Fleet & Commercial Vehicle Advertising',
              description: 'Official KSRTC bus full wraps, auto hood branding, and mobile LED publicity vans operating across all 14 Kerala districts.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Turnkey A-to-Z Campaign Planning & Overnight Execution',
              description: 'End-to-end campaign lifecycle: audience analytics, location scouting, artwork design, large-format printing, overnight crane mounting, and 24/7 site warranty.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Retail Storefront 3D LED Signages & ACP Facades',
              description: 'Design, fabrication, and structural placement of 3D acrylic channel letters, glow signboards, and dealer network branding across Kerala.',
            },
          },
        ],
      },
      priceRange: '₹₹',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://novainnovations.in/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which is the best billboard advertising company in TVM (Thiruvananthapuram)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NOVA Innovations is recognized as the best billboard advertising company in TVM (Thiruvananthapuram) and across Kerala. Headquartered at Vazhuthacaud with 27+ years of leadership, NOVA Innovations directly operates 500+ prime hoarding sites, highway unipoles on the Kazhakkoottam Technopark Bypass, Kowdiar, and MG Road, and provides full turnkey A-to-Z services with overnight mounting capability.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the prime billboard and hoarding advertising locations in Trivandrum (TVM)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Prime billboard locations in TVM include Kazhakkoottam Technopark Bypass (NH 66), Kowdiar Avenue, Vellayambalam Junction, MG Road (Palayam, Statue, Overbridge), Pattom, Enchakkal Lulu Mall bypass, and Thampanoor Central Railway Station. All hoardings feature municipal approvals and high-lumen night illumination.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the cost of renting a billboard or hoarding in Trivandrum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hoarding costs in Trivandrum vary by location tier and dimension. Prime junctions like Kazhakkoottam Bypass or Kowdiar range from ₹1,20,000 to ₹2,50,000 per month, commercial arteries like Pattom and Vellayambalam range from ₹60,000 to ₹1,20,000 per month, and suburban feeder roads range from ₹30,000 to ₹60,000 per month, inclusive of mounting and structural warranty.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Nova Innovations offer statewide outdoor advertising across all 14 districts in Kerala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. NOVA Innovations manages an interconnected network of 500+ prime hoardings across all 14 districts of Kerala—including Trivandrum, Kochi (Ernakulam), Kozhikode (Calicut), Kollam, Thrissur, and Palakkad—with specialized overnight synchronized rollout capability.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
