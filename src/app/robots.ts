// src/app/robots.ts
// Generates /robots.txt — allows full crawling and points crawlers at the sitemap.

import type { MetadataRoute } from 'next'
import { SITE } from '@/utils/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
