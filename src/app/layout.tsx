import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafly Juliano - Junior Web Developer Portfolio",
  description: "Junior Web Developer specializing in Frontend & Backend Development. Mahasiswa Universitas Bina Sarana Informatika. Building modern web applications with Laravel, Next.js, and cutting-edge technologies.",
  keywords: ["Web Developer", "Junior Web Developer", "Portfolio", "Next.js", "Laravel", "Frontend Developer", "Backend Developer", "Rafly Juliano"],
  authors: [{ name: "Rafly Juliano" }],
  creator: "Rafly Juliano",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rafly-juliano.vercel.app",
    title: "Rafly Juliano - Junior Web Developer Portfolio",
    description: "Junior Web Developer specializing in Frontend & Backend Development. Building modern web applications with Laravel & Next.js.",
    siteName: "Rafly Juliano Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafly Juliano - Junior Web Developer Portfolio",
    description: "Junior Web Developer specializing in Frontend & Backend Development.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
