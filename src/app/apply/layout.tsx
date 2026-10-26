import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a HER Chapter at Your School',
  description:
    'Apply to start a Her Education Required chapter and bring women’s history advocacy to your high school or community.',
  alternates: { canonical: 'https://www.hereducation.org/apply' },
  openGraph: {
    title: 'Apply to Start a HER Chapter',
    description: 'Launch a student-led HER chapter for women’s history education.',
    url: 'https://www.hereducation.org/apply',
  },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
