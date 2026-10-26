import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'History by HER — Educational Women’s History Bookmarks',
  description:
    'Volunteer with History by HER: print free women’s history bookmarks and donate them to local schools, libraries, and bookstores. Open worldwide.',
  keywords: [
    'History by HER',
    'women’s history bookmarks',
    'volunteer women’s history',
    'educational bookmarks',
    'donate bookmarks schools libraries',
  ],
  alternates: { canonical: 'https://www.hereducation.org/history-by-her' },
  openGraph: {
    title: 'History by HER — Women’s History Bookmark Initiative',
    description:
      'Print and donate women’s history bookmarks to schools and libraries in your community.',
    url: 'https://www.hereducation.org/history-by-her',
  },
}

export default function HistoryByHerLayout({ children }: { children: React.ReactNode }) {
  return children
}
