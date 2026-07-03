// src/app/projects/[slug]/page.tsx
// Server component: owns per-project SEO (metadata + JSON-LD) and delegates the
// interactive UI to the client <ProjectView>.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/utils/data'
import { SITE, getSlug, projectGraph } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'
import ProjectView from './ProjectView'

// Pre-render every project page at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: getSlug(p.title) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => getSlug(p.title) === slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  const url = `${SITE.url}/projects/${slug}`
  const title = `${project.title} — ${project.category} Case Study`

  return {
    title,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      ...project.technologies,
      'Salman Saleem',
      'case study',
      'web application',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      url,
      siteName: SITE.name,
      publishedTime: `${project.year}-01-01`,
      authors: [SITE.legalName],
      // OG image supplied by the dynamic per-project opengraph-image.tsx.
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => getSlug(p.title) === slug)
  if (!project) notFound()

  return (
    <>
      {/* TechArticle (case study) + SoftwareApplication + Breadcrumb + Person */}
      <JsonLd data={projectGraph(project)} />
      <ProjectView slug={slug} />
    </>
  )
}
