import localFont from 'next/font/local';
import './globals.css';

const elJekate = localFont({
  src: '../font/El Jekate.otf',
  variable: '--font-el-jekate',
  display: 'swap',
});

export const metadata = {
  title: 'Nova Admin Panel | Media & Campaign Management',
  description: 'Admin Portal for Nova Innovations Outdoor Advertising',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={elJekate.variable}>
      <body className={elJekate.className}>{children}</body>
    </html>
  );
}
