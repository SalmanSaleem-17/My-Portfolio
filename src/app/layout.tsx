import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/context/ThemeContext'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salman Saleem | MERN Developer',
  description: 'Portfolio website showcasing projects and skills of Salman Saleem.',
  icons: {
    icon: "/projects/SS-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Anti-FOUC: reads localStorage before first paint to avoid flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 scroll-smooth transition-colors duration-300">
        <ThemeProvider>
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
