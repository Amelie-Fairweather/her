import type { Metadata } from "next";
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
  title: "Her Education Required",
  description: "HER - Her Education Required | CVU Student Club advocating for women's history education",
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  openGraph: {
    title: "Her Education Required",
    description: "HER - Her Education Required | CVU Student Club advocating for women's history education",
    url: "https://www.hereducation.org",
    siteName: "Her Education Required",
    images: [
      {
        url: "https://www.hereducation.org/logo.png", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "HER - Her Education Required Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Her Education Required",
    description: "HER - Her Education Required | CVU Student Club advocating for women's history education",
    images: ["https://www.hereducation.org/logo.png"], // Must be an absolute URL
  },
  metadataBase: new URL('https://www.hereducation.org'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
