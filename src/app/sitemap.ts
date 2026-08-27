// src/app/sitemap.ts
// Generates /sitemap.xml at build time — helps Google discover and index every
// route, including each project case-study page.

import type { MetadataRoute } from 'next'
import { projects } from '@/utils/data'
import { SITE, getSlug } from '@/utils/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-07-03')

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE.url}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      // Privacy policy for the PrintBridge Android app — must stay crawlable and
      // reachable: Google Play and AdMob both verify this URL.
      url: `${SITE.url}/privacy/printbridge`,
      lastModified: new Date('2026-08-28'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE.url}/projects/${getSlug(p.title)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
