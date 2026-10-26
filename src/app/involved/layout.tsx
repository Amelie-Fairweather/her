import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Involved — Student Leadership, Advocacy & High School Movements',
  description:
    'Join HER: students and girls leading high school movements for women’s history, girls’ education, gender equity, youth advocacy, and leadership — including college admissions service hours.',
  keywords: [
    'students',
    'leadership',
    'high school movements',
    'youth advocacy',
    'advocacy',
    'girls',
    'girls education',
    'college admissions',
    'youth',
  ],
  alternates: { canonical: 'https://www.hereducation.org/involved' },
  openGraph: {
    title: 'Get Involved — Youth Advocacy & Student Leadership',
    description:
      'Join a HER chapter and help lead advocacy for women’s history and girls’ education.',
    url: 'https://www.hereducation.org/involved',
  },
}

export default function InvolvedLayout({ children }: { children: React.ReactNode }) {
  return children
}
