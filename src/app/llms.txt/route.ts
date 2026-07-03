// src/app/llms.txt/route.ts
// Serves /llms.txt — a clean, machine-readable summary of the site for AI /
// generative engines (ChatGPT, Perplexity, Gemini, Claude, etc.) to read and
// cite accurately. Generated from real data so it stays in sync.
// Spec: https://llmstxt.org

import { projects } from '@/utils/data'
import { skills } from '@/utils/skillsData'
import { SITE, getSlug } from '@/utils/seo'

export const dynamic = 'force-static'

export function GET() {
  const categories = [...new Set(skills.map((s) => s.category))]
  const skillsByCategory = categories
    .map((c) => `- **${c}:** ${skills.filter((s) => s.category === c).map((s) => s.name).join(', ')}`)
    .join('\n')

  const projectList = projects
    .map(
      (p) =>
        `- [${p.title}](${p.demoLink || p.link}) — ${p.category}. ${p.description}`,
    )
    .join('\n')

  const caseStudies = projects
    .map((p) => `- ${p.title}: ${SITE.url}/projects/${getSlug(p.title)}`)
    .join('\n')

  const body = `# ${SITE.legalName} — ${SITE.jobTitle}

> ${SITE.description} Based in ${SITE.location.city}, ${SITE.location.country}; works remotely with clients worldwide and is available for freelance and contract projects.

## About
- Name: ${SITE.legalName} (also known as ${SITE.shortName})
- Role: ${SITE.headline}
- Location: ${SITE.location.city}, ${SITE.location.region}, ${SITE.location.country} — available remotely worldwide
- Education: BS Computer Science, COMSATS University Islamabad (2020–2025)
- Experience: 2+ years as a freelance full-stack developer; shipped 5+ production apps used across 100+ countries
- Availability: Open to freelance, contract, and remote work
- Website: ${SITE.url}
- Email: ${SITE.email}

## What he does (services)
- FinTech platforms — real-time pricing engines, multi-currency valuation, analytics dashboards
- E-commerce solutions — storefronts, carts, secure checkout, admin dashboards
- SaaS tools & calculators — multi-tool platforms, converters, i18n, privacy-first architecture
- REST APIs & backends — authentication, database modeling, cloud deployment
- Mobile apps — React Native and Expo

## Skills
${skillsByCategory}

## Featured projects
${projectList}

## Case studies
${caseStudies}

## Profiles & links
${SITE.sameAs.map((u) => `- ${u}`).join('\n')}
- Resume / CV: ${SITE.url}/resume

## Contact
Use the contact form at ${SITE.url}/#contact or email ${SITE.email}. Typical response time: within 24 hours.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
