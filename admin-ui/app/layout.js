import './globals.css';

export const metadata = {
  title: 'Nova Admin Panel | Media & Campaign Management',
  description: 'Admin Portal for Nova Innovations Outdoor Advertising',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
