import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About HER — Youth Network for Women’s History Education',
  description:
    'Learn about Her Education Required: a student-led movement to include women’s history in school curricula, with chapters worldwide and advocacy in Vermont and beyond.',
  alternates: { canonical: 'https://www.hereducation.org/about' },
  openGraph: {
    title: 'About Her Education Required',
    description:
      'Student-led network advocating for women’s history education in schools worldwide.',
    url: 'https://www.hereducation.org/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
