import './globals.css';
import ClientShell from '../components/ClientShell';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata = {
  title: {
    default: 'NOVA Innovations | Outdoors • Design Studio • Events | Kerala',
    template: '%s | NOVA Innovations',
  },
  description:
    'Nova Innovations - Premier Outdoor Advertising, Highway Hoardings, KSRTC Bus Fleet Wraps, and Retail Branding Agency across Kerala with 27+ years of excellence.',
  keywords: [
    'Outdoor Advertising Kerala',
    'Highway Hoardings Trivandrum',
    'Billboard Advertising Kerala',
    'KSRTC Bus Branding',
    'Unipole Advertising Kochi',
    'Nova Innovations',
    'Retail Showroom Branding Kerala',
  ],
  metadataBase: new URL('https://novainnovations.in'),
  alternates: {
    canonical: 'https://novainnovations.in',
  },
  openGraph: {
    title: 'NOVA Innovations | Premier Advertising Agency Kerala',
    description:
      'Highway Hoardings, KSRTC Bus Branding, 3D Signages, and 24/7 Campaign Execution across Kerala.',
    url: 'https://novainnovations.in',
    siteName: 'Nova Innovations',
    images: [
      {
        url: '/mainhero1.png',
        width: 1200,
        height: 630,
        alt: 'Nova Innovations Kerala Advertising',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVA Innovations | Premier Advertising Agency Kerala',
    description:
      'Highway Hoardings, KSRTC Bus Branding & Rapid Campaign Execution across Kerala.',
    images: ['/mainhero1.png'],
  },
  icons: {
    icon: '/logo.png',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'AdvertisingAgency',
  name: 'NOVA Innovations',
  alternateName: 'Nova Advertising Kerala',
  url: 'https://novainnovations.in',
  logo: 'https://novainnovations.in/logo.png',
  image: 'https://novainnovations.in/mainhero1.png',
  description:
    'Premier Outdoor Advertising, Highway Hoardings, KSRTC Bus Fleet Wraps, and Retail Branding Agency across Kerala with 27+ years of excellence.',
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
    { '@type': 'City', name: 'Thiruvananthapuram' },
    { '@type': 'City', name: 'Kochi' },
    { '@type': 'City', name: 'Kozhikode' },
    { '@type': 'City', name: 'Kollam' },
  ],
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
