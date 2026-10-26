import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media — Youth Advocacy, Women’s History & High School Movements',
  description:
    'News coverage of HER students leading youth advocacy for women’s history, girls’ education, gender equity, and high school movements — including NBC5, VTDigger, and WCAX.',
  keywords: [
    'youth advocacy',
    'womens history',
    'students',
    'high school movements',
    'girls education',
    'gender',
    'education',
    'advocacy',
  ],
  alternates: { canonical: 'https://www.hereducation.org/media' },
  openGraph: {
    title: 'HER in the News — Students & Youth Advocacy',
    description:
      'Media coverage of student leadership and advocacy for women’s history education.',
    url: 'https://www.hereducation.org/media',
  },
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children
}
