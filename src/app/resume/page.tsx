// src/app/resume/page.tsx
// Server component: owns the resume page's SEO metadata + structured data and
// renders the interactive client resume.

import type { Metadata } from 'next'
import { SITE, personSchema } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'
import ResumeView from './ResumeView'

const url = `${SITE.url}/resume`

export const metadata: Metadata = {
  title: 'Resume — Full-Stack MERN Developer',
  description: `Resume of ${SITE.legalName}, a Full-Stack MERN developer specializing in React.js, Next.js, Node.js and TypeScript. View experience, skills, education and featured projects.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${SITE.legalName} — Resume`,
    description: `Resume & CV of ${SITE.legalName}, Full-Stack MERN Developer.`,
    url,
    siteName: SITE.name,
    type: 'profile',
    images: [{ url: '/projects/profile-img.jpg', alt: SITE.legalName }],
  },
}

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              '@id': `${url}/#resume`,
              url,
              name: `${SITE.legalName} — Resume`,
              description: `Resume & CV of ${SITE.legalName}, Full-Stack MERN Developer.`,
              inLanguage: SITE.language,
              about: { '@id': `${SITE.url}/#person` },
              mainEntity: { '@id': `${SITE.url}/#person` },
              // The downloadable CV as an associated media object.
              primaryImageOfPage: {
                '@type': 'ImageObject',
                url: SITE.image,
              },
            },
            personSchema(),
          ],
        }}
      />
      <ResumeView />
    </>
  )
}
