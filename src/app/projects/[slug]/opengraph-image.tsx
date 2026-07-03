// src/app/projects/[slug]/opengraph-image.tsx
// Per-project 1200×630 social share card — title, subtitle, category, top tech,
// tinted with the project's own accent colour. Prebuilt for every project slug.

import { ImageResponse } from 'next/og'
import { projects } from '@/utils/data'
import { getSlug, SITE } from '@/utils/seo'

export const alt = 'Project case study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: getSlug(p.title) }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => getSlug(p.title) === slug)

  const title = project?.title ?? SITE.legalName
  const subtitle = project?.subtitle ?? SITE.headline
  const category = project?.category ?? 'Project'
  const primary = project?.colors?.primary ?? '#7c3aed'
  const tech = project?.technologies?.slice(0, 5) ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0b1020 0%, #171634 60%, #241f4d 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 12,
            background: primary,
          }}
        />

        {/* Top row — category + author */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: 999,
              background: primary,
              color: '#0b1020',
            }}
          >
            {category}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#a5b4fc' }}>
            {SITE.legalName}
          </div>
        </div>

        {/* Middle — title + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 500,
              marginTop: 20,
              color: '#cbd5e1',
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom — tech chips + domain */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 900 }}>
            {tech.map((t) => (
              <div
                key={t}
                style={{
                  display: 'flex',
                  fontSize: 22,
                  fontWeight: 600,
                  padding: '8px 18px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.22)',
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#a5b4fc' }}>salmansaleem.dev</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
