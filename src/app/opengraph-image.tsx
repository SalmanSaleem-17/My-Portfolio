// src/app/opengraph-image.tsx
// Dynamically generated 1200×630 social share card for the whole site
// (home + any page without its own opengraph-image). Rendered at build time.

import { ImageResponse } from 'next/og'
import { SITE } from '@/utils/seo'

export const alt = 'Muhammad Salman Saleem — Full-Stack MERN Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TECH = ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS']

export default function Image() {
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
          background: 'linear-gradient(135deg, #0b1020 0%, #1e1b4b 55%, #4c1d95 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              fontWeight: 700,
              color: '#c4b5fd',
              textTransform: 'uppercase',
            }}
          >
            Portfolio
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#a5b4fc' }}>salmansaleem.dev</div>
        </div>

        {/* Middle — name + role */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 82, fontWeight: 800, lineHeight: 1.05 }}>
            {SITE.legalName}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 600,
              marginTop: 18,
              color: '#e9d5ff',
            }}
          >
            {SITE.headline}
          </div>
        </div>

        {/* Bottom — tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {TECH.map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                fontSize: 24,
                fontWeight: 600,
                padding: '10px 22px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#f5f3ff',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
