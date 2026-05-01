import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: "SmartHire — AI-Powered Recruitment Platform",
  description: "NLP-powered resume scoring, real-time application tracking, and transparent dual portals. Reduce hiring time by 40–60%.",
  openGraph: {
    title: "SmartHire — AI-Powered Recruitment Platform",
    description: "NLP-powered resume scoring, real-time application tracking, and transparent dual portals. Reduce hiring time by 40–60%.",
    type: "website",
    url: "/",
    siteName: "SmartHire",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SmartHire — AI-Powered Recruitment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartHire — AI-Powered Recruitment Platform",
    description: "NLP-powered resume scoring, real-time application tracking, and transparent dual portals. Reduce hiring time by 40–60%.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
