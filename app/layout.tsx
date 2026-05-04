import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import Providers from '@/components/Providers';
import './globals.css';

const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'SmartHire — AI-Powered Recruitment Platform',
    template: '%s | SmartHire',
  },
  description: 'NLP-powered resume scoring, real-time application tracking, and transparent dual portals. Reduce hiring time by 40–60%.',
  openGraph: {
    title: 'SmartHire — AI-Powered Recruitment Platform',
    description: 'NLP-powered resume scoring, real-time application tracking, and transparent dual portals. Reduce hiring time by 40–60%.',
    type: 'website',
    url: APP_URL,
    siteName: 'SmartHire',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SmartHire — AI-Powered Recruitment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartHire — AI-Powered Recruitment Platform',
    description: 'NLP-powered resume scoring, real-time application tracking, and transparent dual portals. Reduce hiring time by 40–60%.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
        <body className="bg-white text-slate-900 overflow-x-hidden">
          <Providers>{children}</Providers>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
