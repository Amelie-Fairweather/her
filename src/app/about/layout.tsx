import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About HER — Student Leadership, Youth Advocacy & Women’s History',
  description:
    'About Her Education Required: students building high school movements for women’s history, girls’ education, gender equity, leadership, and youth advocacy in schools worldwide.',
  keywords: [
    'students',
    'leadership',
    'youth advocacy',
    'womens history',
    'girls education',
    'gender',
    'education',
    'high school movements',
  ],
  alternates: { canonical: 'https://www.hereducation.org/about' },
  openGraph: {
    title: 'About Her Education Required — Youth Advocacy & Women’s History',
    description:
      'Student-led leadership and advocacy for women’s history and girls’ education.',
    url: 'https://www.hereducation.org/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
