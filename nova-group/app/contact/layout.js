export const metadata = {
  title: 'Book Prime Billboards & Vehicle Advertising Kerala | Nova Innovations TVM',
  description:
    'Contact Nova Innovations in Trivandrum (TVM) for instant billboard availability, rates, and turnkey campaign planning across Kerala. Direct phone: +91 95390 00640.',
  keywords: [
    'book billboard kerala',
    'rent hoarding trivandrum',
    'outdoor advertising agency contact tvm',
    'ksrtc bus branding enquiry',
    'billboard vacancy rate kerala',
    'nova innovations address',
    'nova innovations phone number',
  ],
  alternates: {
    canonical: 'https://novainnovations.in/contact',
  },
  openGraph: {
    title: 'Book Prime Billboards & Vehicle Advertising Kerala | Nova Innovations',
    description:
      'Contact our Trivandrum head office for instant vacancy lists, rate quotes, and rapid overnight campaign deployment across Kerala.',
    url: 'https://novainnovations.in/contact',
    images: ['/mainhero1.png'],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'NOVA Innovations',
    telephone: '+919539000640',
    email: 'novainnovations2020@gmail.com',
    url: 'https://novainnovations.in/contact',
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
      latitude: '8.4975',
      longitude: '76.9632',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
