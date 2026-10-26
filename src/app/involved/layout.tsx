import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Involved — Join a HER Chapter or Volunteer',
  description:
    'Join Her Education Required: start a school chapter, volunteer at events, advocate for women’s history curriculum, and support the movement.',
  alternates: { canonical: 'https://www.hereducation.org/involved' },
  openGraph: {
    title: 'Get Involved with Her Education Required',
    description: 'Join a chapter, volunteer, or help advocate for women’s history in schools.',
    url: 'https://www.hereducation.org/involved',
  },
}

export default function InvolvedLayout({ children }: { children: React.ReactNode }) {
  return children
}
