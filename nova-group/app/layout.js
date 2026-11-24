import './globals.css';
import ClientShell from '../components/ClientShell';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata = {
  title: {
    default: 'NOVA Innovations | A-to-Z Billboard, Hoarding & Vehicle Advertising Kerala & TVM',
    template: '%s | NOVA Innovations',
  },
  description:
    "Kerala's premier turnkey outdoor advertising agency headquartered in Trivandrum (TVM). We plan, host, design, print, physically place, and maintain 500+ prime billboards, highway hoardings on NH 66, and KSRTC bus fleet wraps from A to Z across all 14 districts.",
  keywords: [
    'turnkey outdoor advertising agency kerala',
    'billboard advertising trivandrum',
    'billboard advertising kerala',
    'hoarding advertising tvm',
    'vehicle advertising kerala',
    'ksrtc bus branding agency kerala',
    'outdoor hoardings placement and maintenance',
    'unipole advertising kerala',
    'a to z physical advertising kerala',
    'ooh media planning and hosting tvm',
    'commercial wall painting kerala',
    '3d led signboard branding trivandrum',
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
  '@type': 'AdvertisingAgency',
  name: 'NOVA Innovations',
  alternateName: ['Nova Advertising Kerala', 'Nova Innovations OOH', 'Nova Media Trivandrum'],
  url: 'https://novainnovations.in',
  logo: 'https://novainnovations.in/icon-512.png',
  image: 'https://novainnovations.in/mainhero1.png',
  description:
    "Kerala's premier turnkey outdoor advertising agency headquartered in Trivandrum. We provide full A-to-Z services: Strategic Media Planning, Site Space Hosting, Creative Design Studio, In-House Industrial Flex/Vinyl Printing, Physical Overnight Crane Placement, and 24/7 Illumination & Structural Maintenance for 500+ highway hoardings, unipoles, and KSRTC bus fleet wraps across all 14 districts of Kerala.",
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
