// src/utils/seo.ts
// ─────────────────────────────────────────────────────────────────────────────
// Centralised SEO config + Schema.org (JSON-LD) builders.
// Every builder returns a plain object that follows the schema.org spec with all
// Google-required fields populated, so nothing is missing from rich-result tests.
// ─────────────────────────────────────────────────────────────────────────────

import { projects } from '@/utils/data';
import { skills } from '@/utils/skillsData';

// ── Core identity constants ──────────────────────────────────────────────────
export const SITE = {
  url: 'https://salmansaleem.dev',
  name: 'Salman Saleem',
  legalName: 'Muhammad Salman Saleem',
  shortName: 'Salman Saleem',
  jobTitle: 'Full-Stack MERN Developer',
  headline: 'Full-Stack MERN Developer · React.js & Next.js Specialist',
  description:
    'Muhammad Salman Saleem — Full-Stack MERN developer specializing in React.js, Next.js, Node.js and TypeScript. Building production-grade FinTech and e-commerce web applications.',
  email: 'shanisaleem17@gmail.com',
  telephone: '+92-345-6501771',
  // A real head-shot ranks better for Person rich results than a logo.
  image: 'https://salmansaleem.dev/projects/profile-img.jpg',
  logo: 'https://salmansaleem.dev/projects/SS-logo.png',
  locale: 'en_US',
  language: 'en',
  location: {
    city: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
  },
  // Public profiles / authoritative references for sameAs — the entity graph
  // Google uses to resolve and rank "Muhammad Salman Saleem" as one person.
  sameAs: [
    'https://github.com/SalmanSaleem-17',
    'https://www.linkedin.com/in/muhammad-salman-saleem-8a9a96266',
    'https://www.upwork.com/freelancers/salmansaleem17',
    'https://x.com/salmansaleem_17',
    'https://stackoverflow.com/users/32903478/muhammad-salman-saleem',
    'https://dev.to/salmansaleem17',
    'https://www.producthunt.com/@salmansaleem17',
    'https://www.saashub.com/u/salmansaleem17',
    'https://startupbase.io/@salmansaleem17',
    'https://www.instagram.com/salmansaleem.17',
  ],
} as const

// The @id anchors let every schema reference the same canonical entities.
export const PERSON_ID = `${SITE.url}/#person`
export const WEBSITE_ID = `${SITE.url}/#website`
export const ORG_ID = `${SITE.url}/#organization`

// Slug helper — kept identical to the one used by the project route.
export function getSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Distinct list of technologies/skills the developer "knowsAbout".
const knowsAbout = Array.from(
  new Set([
    ...skills.map((s) => s.name),
    'MERN Stack',
    'Full-Stack Web Development',
    'RESTful API Design',
    'Responsive Web Design',
    'Web Performance Optimization',
    'FinTech Applications',
    'E-commerce Development',
  ]),
)

// ── Person schema (the "developer" schema) ───────────────────────────────────
export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.legalName,
    alternateName: SITE.shortName,
    url: SITE.url,
    mainEntityOfPage: SITE.url,
    image: {
      '@type': 'ImageObject',
      url: SITE.image,
      caption: SITE.legalName,
    },
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    disambiguatingDescription:
      'MERN-stack web developer specializing in React.js and Next.js, based in Lahore, Pakistan.',
    email: `mailto:${SITE.email}`,
    telephone: SITE.telephone,
    gender: 'Male',
    nationality: {
      '@type': 'Country',
      name: SITE.location.country,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.countryCode,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'COMSATS University Islamabad',
      sameAs: 'https://www.comsats.edu.pk/',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full-Stack Web Developer',
      occupationalCategory: '15-1254.00', // O*NET: Web Developers
      skills: knowsAbout.join(', '),
    },
    knowsAbout,
    knowsLanguage: ['English', 'Urdu'],
    worksFor: { '@id': ORG_ID },
    sameAs: [...SITE.sameAs],
  }
}

// ── Organization schema (self-employed / personal brand) ─────────────────────
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: SITE.logo,
    },
    founder: { '@id': PERSON_ID },
    sameAs: [...SITE.sameAs],
  }
}

// ── WebSite schema ───────────────────────────────────────────────────────────
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: `${SITE.name} — Portfolio`,
    description: SITE.description,
    inLanguage: SITE.language,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  }
}

// ── Breadcrumbs ──────────────────────────────────────────────────────────────
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ── Home page: ProfilePage graph (Person + WebSite + Organization) ───────────
export function homePageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE.url}/#profilepage`,
        url: SITE.url,
        name: `${SITE.legalName} | ${SITE.jobTitle}`,
        description: SITE.description,
        inLanguage: SITE.language,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: { '@type': 'ImageObject', url: SITE.image },
        // Answer-engine / voice: which parts are worth reading aloud / extracting.
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2'],
        },
      },
      personSchema(),
      organizationSchema(),
      websiteSchema(),
    ],
  }
}

type Project = (typeof projects)[number]

// ── Project detail page: TechArticle (case study) + SoftwareApplication ──────
// Google-required Article fields: headline, image, datePublished, author.
// SoftwareApplication rich-result requires one of offers/aggregateRating/review
// — we supply a free `offers` block.
export function projectGraph(project: Project) {
  const slug = getSlug(project.title)
  const pageUrl = `${SITE.url}/projects/${slug}`
  const datePublished = `${project.year}-01-01`

  const softwareApp = {
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#software`,
    name: project.title,
    alternateName: project.subtitle,
    description: project.description,
    applicationCategory: 'WebApplication',
    applicationSubCategory: project.category,
    operatingSystem: 'Web Browser (Cross-platform)',
    url: project.demoLink || project.link,
    image: project.image,
    screenshot: project.image,
    softwareVersion: project.year,
    datePublished,
    inLanguage: SITE.language,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    keywords: project.technologies.join(', '),
    featureList: project.features.map((f) => f.title),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }

  const article = {
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    headline: `${project.title} — ${project.subtitle}`,
    name: project.title,
    description: project.description,
    articleBody: project.longDescription,
    articleSection: project.category,
    image: [project.image],
    datePublished,
    dateModified: datePublished,
    inLanguage: SITE.language,
    keywords: project.technologies.join(', '),
    wordCount: project.longDescription.split(/\s+/).length,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    about: { '@id': `${pageUrl}#software` },
    isPartOf: { '@id': WEBSITE_ID },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      article,
      softwareApp,
      personSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE.url },
        { name: 'Projects', url: `${SITE.url}/#projects` },
        { name: project.title, url: pageUrl },
      ]),
    ],
  }
}
