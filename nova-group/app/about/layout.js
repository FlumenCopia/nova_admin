export const metadata = {
  title: 'About Nova Innovations | Premier A-to-Z Outdoor Advertising Agency Kerala & TVM',
  description:
    "Kerala's trusted outdoor advertising infrastructure leader with 27+ years experience. Headquartered in Trivandrum (TVM), we plan, host, design, print, physically place, and maintain 500+ prime billboards and transit fleets across all 14 districts.",
  keywords: [
    'about nova innovations',
    'outdoor advertising agency kerala',
    'gireesh kumar s',
    'billboard hosting tvm',
    'highway hoardings trivandrum',
    'ksrtc bus branding kerala',
    'ooh media leader kerala',
    'nova innovations background',
  ],
  alternates: {
    canonical: 'https://novainnovations.in/about',
  },
  openGraph: {
    title: 'About Nova Innovations | 27+ Years Pioneering Outdoor Advertising in Kerala',
    description:
      'We own, print, physically place, and maintain 500+ prime outdoor hoardings and KSRTC bus wraps across Kerala and TVM.',
    url: 'https://novainnovations.in/about',
    images: ['/mainhero1.png'],
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'AdvertisingAgency',
    name: 'NOVA Innovations',
    url: 'https://novainnovations.in',
    founder: {
      '@type': 'Person',
      name: 'Gireesh Kumar S',
      jobTitle: 'Founder, Director & CEO',
      url: 'https://gireeshkumar.novainnovations.in',
    },
    foundingDate: '1997',
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
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  );
}
