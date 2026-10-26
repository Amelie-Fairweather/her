import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a HER Chapter — High School Movements & Student Leadership',
  description:
    'Apply to start a HER chapter: build a high school movement for women’s history, girls’ education, gender equity, and youth advocacy — leadership that strengthens college admissions profiles.',
  keywords: [
    'high school movements',
    'students',
    'leadership',
    'college admissions',
    'youth advocacy',
    'girls education',
    'womens history',
  ],
  alternates: { canonical: 'https://www.hereducation.org/apply' },
  openGraph: {
    title: 'Start a HER Chapter — Student Leadership & Advocacy',
    description:
      'Launch a student-led chapter for women’s history education and youth advocacy.',
    url: 'https://www.hereducation.org/apply',
  },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
