import './globals.css'
import { Sora, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThreeBackground from '@/components/ThreeBackground'
import JsonLd from '@/components/JsonLd'
import { ThemeProvider } from '@/context/ThemeContext'
import { SITE, personSchema, websiteSchema, organizationSchema } from '@/utils/seo'
import type { Metadata } from 'next'

// Self-hosted, render-blocking-free fonts. Exposed as CSS variables consumed by
// globals.css (--font-sora on headings, --font-manrope on body).
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Salman Saleem | Full-Stack Web & Android App Developer',
    template: '%s | Salman Saleem',
  },
  description: SITE.description,
  applicationName: `${SITE.name} — Portfolio`,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  keywords: [
    'Salman Saleem',
    'Muhammad Salman Saleem',
    'Salman Saleem developer',
    'MERN Developer',
    'MERN Stack Developer',
    'Full-Stack Developer',
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'Hire MERN Developer',
    'Hire React Developer',
    'Freelance Full-Stack Developer',
    'Next.js Developer for hire',
    'Remote React Developer',
    'FinTech Developer',
    'E-commerce Developer',
    'Web Developer Pakistan',
    'Web Developer Lahore',
    'Frontend Developer',
    'Android App Developer',
    'Mobile App Developer',
    'React Native Developer',
    'Hire Android Developer',
    'App Developer Pakistan',
    'App Developer Lahore',
    'Google Play Developer',
    'Goldify app',
    'Portfolio',
  ],
  category: 'technology',
  icons: {
    icon: '/projects/SS-logo.png',
    shortcut: '/projects/SS-logo.png',
    apple: '/projects/SS-logo.png',
  },
  openGraph: {
    title: 'Salman Saleem | Full-Stack Web & Android App Developer',
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
    // OG image supplied by the dynamic app/opengraph-image.tsx (1200×630).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salman Saleem | Full-Stack Web & Android App Developer',
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  // Google Search Console verification (meta-tag method).
  verification: {
    google: 'JwCJAp7qu-PcdigS515lihzw6ConKWHXqwrb_VHDEDg',
  },
  // Pinterest domain verification.
  other: {
    'p:domain_verify': '53c5ed9dfe508ee1632e9fa4adabf627',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: reads localStorage before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/* Sitewide identity graph — Person (developer), Organization & WebSite */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [personSchema(), organizationSchema(), websiteSchema()],
          }}
        />
      </head>
      <body className="bg-white dark:bg-transparent text-gray-900 dark:text-slate-100 scroll-smooth transition-colors duration-300">
        <ThemeProvider>
          <ThreeBackground />
          {/*
            clip-x uses overflow-x: clip (NOT hidden).
            "clip" prevents horizontal overflow WITHOUT creating a scroll container,
            so it does NOT cancel the scrollbar-gutter reservation on <html>.
          */}
          <div className="clip-x">
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
