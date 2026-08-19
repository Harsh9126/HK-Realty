import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'HK Realty – Building Trust. Creating Landmarks.',
    template: '%s | HK Realty',
  },
  description:
    'HK Realty is a premium real estate company offering property dealing and development services. Explore residential, commercial, luxury, and investment properties across India.',
  keywords: ['real estate', 'property', 'buy property', 'sell property', 'rent property', 'HK Realty', 'India real estate', 'luxury homes', 'commercial property'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hkrealty.com',
    siteName: 'HK Realty',
    title: 'HK Realty – Building Trust. Creating Landmarks.',
    description: 'Premium real estate dealing and development across India.',
  },
  icons: {
    icon: '/favicon.ico',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
