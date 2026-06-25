import './globals.css'
import Navbar from '@/components/Navbar'
import ThreeBackground from '@/components/ThreeBackground'
import { ThemeProvider } from '@/context/ThemeContext'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://salmansaleem.dev'),
  title: 'Salman Saleem | MERN Developer',
  description: 'Portfolio website showcasing projects and skills of Salman Saleem.',
  icons: {
    icon: "/projects/SS-logo.png",
  },
  openGraph: {
    url: 'https://salmansaleem.dev',
    siteName: 'Salman Saleem',
    type: 'website',
  },
  alternates: {
    canonical: 'https://salmansaleem.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: reads localStorage before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/* Google Fonts — loaded by the browser at runtime (no server-side download) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
