import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'History by HER — Women’s History Education for Students & Youth',
  description:
    'History by HER helps students and youth advance women’s history education: print educational bookmarks and donate them to schools and libraries — leadership through advocacy.',
  keywords: [
    'womens history',
    'women’s history',
    'students',
    'youth',
    'education',
    'girls education',
    'advocacy',
    'youth advocacy',
    'History by HER',
  ],
  alternates: { canonical: 'https://www.hereducation.org/history-by-her' },
  openGraph: {
    title: 'History by HER — Women’s History Bookmarks for Students',
    description:
      'A youth advocacy initiative bringing women’s history education into schools and communities.',
    url: 'https://www.hereducation.org/history-by-her',
  },
}

export default function HistoryByHerLayout({ children }: { children: React.ReactNode }) {
  return children
}
