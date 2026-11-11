/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'novainnovations.in' },
      { protocol: 'https', hostname: 'api.novainnovations.in' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/admin', destination: process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001', permanent: false },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/founder-of-nova.html', destination: '/founder-of-nova', permanent: true },
      { source: '/founder', destination: '/founder-of-nova', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/gallery.html', destination: '/gallery', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
