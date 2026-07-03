// src/app/robots.ts
// Generates /robots.txt — allows full crawling and points crawlers at the sitemap.

import type { MetadataRoute } from 'next'
import { SITE } from '@/utils/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicitly welcome AI / answer / generative-engine crawlers (GEO/AEO/AIO)
      // so this site is eligible to be read and cited by them.
      {
        userAgent: [
          'GPTBot',            // OpenAI training
          'OAI-SearchBot',     // ChatGPT search
          'ChatGPT-User',      // ChatGPT browsing
          'ClaudeBot',         // Anthropic
          'anthropic-ai',
          'Claude-Web',
          'PerplexityBot',     // Perplexity
          'Perplexity-User',
          'Google-Extended',   // Gemini / AI Overviews
          'Applebot-Extended', // Apple Intelligence
          'Amazonbot',
          'cohere-ai',
          'YouBot',
          'DuckAssistBot',
          'Bingbot',           // Bing / Copilot
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
