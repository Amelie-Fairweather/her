import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Her Education Required",
  description: "HER - Her Education Required | Student club at CVU and SBHS advocating for women's history education",
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
    description: "HER - Her Education Required | Student club at CVU and SBHS advocating for women's history education",
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
    description: "HER - Her Education Required | Student club at CVU and SBHS advocating for women's history education",
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
      </head>
      <body
        className={`${geistMono.variable} ${coiny.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
