import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Coiny, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const coiny = Coiny({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-coiny",
});

const SITE_URL = "https://www.hereducation.org";
const SITE_NAME = "Her Education Required";
const SITE_DESCRIPTION =
  "Her Education Required (HER) is a student-led youth advocacy network for women's history and girls' education — high school movements, leadership, gender equity in education, and college-ready civic engagement worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Her Education Required | Students, Youth Advocacy & Women's History Education",
    template: "%s | Her Education Required",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "students",
    "leadership",
    "high school movements",
    "womens history",
    "women's history",
    "youth advocacy",
    "women",
    "gender",
    "education",
    "girls education",
    "girls' education",
    "college admissions",
    "girls",
    "youth",
    "advocacy",
    "Her Education Required",
    "HER Education Required",
    "women's history education",
    "History by HER",
    "student leadership",
    "youth leadership",
    "gender education",
  ],
  authors: [{ name: "Her Education Required" }],
  creator: "Her Education Required",
  publisher: "Her Education Required",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo.png",
  },
  openGraph: {
    title:
      "Her Education Required | Students, Youth Advocacy & Women's History Education",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
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
    title:
      "Her Education Required | Students, Youth Advocacy & Women's History",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Her Education Required",
  alternateName: ["HER", "HER Education Required", "HerEducationRequired"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  email: "hereducationrequired@gmail.com",
  sameAs: ["https://www.instagram.com/hereducationrequired/"],
  foundingDate: "2025",
  areaServed: "Worldwide",
  knowsAbout: [
    "students",
    "leadership",
    "high school movements",
    "women's history",
    "youth advocacy",
    "women",
    "gender",
    "education",
    "girls education",
    "college admissions",
    "girls",
    "youth",
    "advocacy",
    "History by HER",
  ],
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${geistMono.variable} ${coiny.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
