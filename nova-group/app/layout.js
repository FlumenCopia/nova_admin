import './globals.css';
import ClientShell from '../components/ClientShell';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata = {
  title: 'NOVA Innovations | Outdoors • Design Studio • Events | Kerala',
  description:
    'Nova Innovations - Premier Outdoor Advertising, Highway Hoardings, KSRTC Bus Fleet Wraps, and Retail Branding Agency across Kerala with 27+ years of excellence.',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
