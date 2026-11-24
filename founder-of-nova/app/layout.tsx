import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "GIREESH KUMAR S | Founder, Director & CEO — Nova Innovations Kerala",
  description:
    "Official executive portfolio of Gireesh Kumar S, Founder & CEO of Nova Innovations. 27+ years pioneering turnkey A-to-Z outdoor advertising: planning, hosting, physical placement, and 24/7 maintenance of 500+ prime billboards and KSRTC bus fleets across Kerala & TVM.",
  metadataBase: new URL("https://gireeshkumar.novainnovations.in"),
  alternates: {
    canonical: "https://gireeshkumar.novainnovations.in",
  },
  openGraph: {
    title: "Gireesh Kumar S — Founder, Director & CEO | Nova Innovations",
    description:
      "27+ years pioneering A-to-Z billboard hosting, physical crane placement, and transit media across Trivandrum (TVM) and all 14 Kerala districts.",
    url: "https://gireeshkumar.novainnovations.in",
    siteName: "Gireesh Kumar S — Nova Innovations",
    images: [
      {
        url: "/assets/hero_man.jpeg",
        width: 1200,
        height: 630,
        alt: "Gireesh Kumar S Founder Nova Innovations",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gireesh Kumar S — Founder, Director & CEO | Nova Innovations",
    description:
      "A-to-Z Outdoor Media Infrastructure: Planning, Hosting 500+ Corridors, Physical Placement & 24/7 Maintenance across Kerala & TVM.",
    images: ["/assets/hero_man.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Gireesh Kumar S",
    jobTitle: "Founder, Director & CEO",
    worksFor: {
      "@type": "AdvertisingAgency",
      name: "NOVA Innovations",
      url: "https://novainnovations.in",
      telephone: "+919539000640",
      address: {
        "@type": "PostalAddress",
        streetAddress: "T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, Thycaud",
        addressLocality: "Thiruvananthapuram",
        addressRegion: "Kerala",
        postalCode: "695014",
        addressCountry: "IN",
      },
    },
    image: "https://gireeshkumar.novainnovations.in/assets/hero_man.jpeg",
    url: "https://gireeshkumar.novainnovations.in",
    telephone: "+919539000640",
    email: "novainnovations2020@gmail.com",
    description:
      "Founder and Chief Executive Officer of Nova Innovations with over 27 years of experience pioneering turnkey A-to-Z outdoor advertising: strategic media planning, hosting 500+ prime highway billboards, physical crane placement, and 24/7 structural maintenance across Kerala.",
    knowsAbout: [
      "Out of Home Advertising (OOH)",
      "Turnkey Billboard Space Hosting & Media Planning",
      "Highway Hoardings & High-Rise Unipoles",
      "KSRTC Bus Fleet Transit Advertising",
      "Trivandrum Highway Corridors & NH 66",
      "24/7 Billboard Illumination & Structural Maintenance",
      "Overnight Campaign Execution across Kerala",
      "Retail Showroom Signages & ACP Facades",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
