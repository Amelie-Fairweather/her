import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Coverage — HER in the News',
  description:
    'News and media coverage of Her Education Required, including NBC5, VTDigger, WCAX, and local Vermont outlets on women’s history curriculum advocacy.',
  keywords: [
    'Her Education Required news',
    'CVU women’s history',
    'Vermont women’s history education',
    'NBC5 HER',
    'VTDigger women’s history',
    'WCAX women’s history curriculum',
  ],
  alternates: { canonical: 'https://www.hereducation.org/media' },
  openGraph: {
    title: 'HER Media Coverage',
    description:
      'TV, newspaper, and opinion coverage of Her Education Required’s women’s history advocacy.',
    url: 'https://www.hereducation.org/media',
  },
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children
}
