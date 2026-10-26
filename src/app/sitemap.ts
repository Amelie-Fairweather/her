import type { MetadataRoute } from 'next'

const BASE = 'https://www.hereducation.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/history-by-her',
    '/involved',
    '/apply',
    '/media',
    '/ama',
    '/events',
    '/scholarship',
    '/contact',
    '/involved/community-supporters',
    '/events/recap',
    '/events/wake-robin-recap',
  ]

  const now = new Date()

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/history-by-her' || path === '/media' ? 'weekly' : 'monthly',
    priority:
      path === ''
        ? 1
        : path === '/history-by-her' || path === '/about' || path === '/media'
          ? 0.9
          : 0.7,
  }))
}
