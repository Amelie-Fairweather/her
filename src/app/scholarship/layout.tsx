import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scholarship Fund — Girls’ Education & College Admissions Support',
  description:
    'HER scholarship support for girls’ education and college admissions — investing in students, leadership, and youth advocacy for women’s history and gender equity.',
  keywords: [
    'college admissions',
    'girls education',
    'students',
    'girls',
    'education',
    'leadership',
    'youth',
  ],
  alternates: { canonical: 'https://www.hereducation.org/scholarship' },
  openGraph: {
    title: 'HER Scholarship Fund — Girls’ Education & College Support',
    description:
      'Need-based support advancing girls’ education and college opportunity.',
    url: 'https://www.hereducation.org/scholarship',
  },
}

export default function ScholarshipLayout({ children }: { children: React.ReactNode }) {
  return children
}
