/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/admin', destination: process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001', permanent: false },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/gallery.html', destination: '/gallery', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
