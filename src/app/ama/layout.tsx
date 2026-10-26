import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ask Me Anything — Mentors & Speakers',
  description:
    'HER Ask Me Anything events connect student chapters with journalists, leaders, and changemakers. Apply to speak or watch past AMAs.',
  alternates: { canonical: 'https://www.hereducation.org/ama' },
  openGraph: {
    title: 'HER Ask Me Anything',
    description: 'Live conversations between HER chapters and world-class mentors.',
    url: 'https://www.hereducation.org/ama',
  },
}

export default function AmaLayout({ children }: { children: React.ReactNode }) {
  return children
}
