export const metadata = {
  title: 'Campaign Gallery & Prime Billboards Kerala | Live Hoarding Showcase TVM',
  description:
    'Explore real-world outdoor media executions across Kerala: myG highway billboards, NH 66 high-rise unipoles, KSRTC bus wraps, and live vacant hoarding sites in Trivandrum and all 14 districts.',
  keywords: [
    'billboard gallery kerala',
    'hoarding photos trivandrum',
    'myg billboard campaign kerala',
    'vacant hoardings tvm',
    'outdoor advertising portfolio kerala',
    'unipole billboard pictures kerala',
    'ksrtc bus branding photos',
    'nova innovations showcase',
  ],
  alternates: {
    canonical: 'https://novainnovations.in/gallery',
  },
  openGraph: {
    title: 'Campaign Gallery & Prime Billboards Kerala | Nova Innovations',
    description:
      'High-impact billboard installations, transit bus wraps, and live vacant outdoor advertising sites across Kerala.',
    url: 'https://novainnovations.in/gallery',
    images: ['/mainhero1.png'],
  },
};

const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nova Innovations Outdoor Advertising Campaign Gallery',
  description: 'Showcase of prime highway billboards, high-rise unipoles, and KSRTC transit wraps executed across Kerala.',
  url: 'https://novainnovations.in/gallery',
  provider: {
    '@type': 'AdvertisingAgency',
    name: 'NOVA Innovations',
    url: 'https://novainnovations.in',
    telephone: '+919539000640',
  },
};

export default function GalleryLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      {children}
    </>
  );
}
