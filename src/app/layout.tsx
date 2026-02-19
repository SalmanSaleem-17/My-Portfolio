import './globals.css'
import Navbar from '@/components/Navbar'
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
    <html lang="en">
      <body className="bg-white text-gray-900 scroll-smooth">
        {/*
          clip-x uses overflow-x: clip (NOT hidden).
          "clip" prevents horizontal overflow WITHOUT creating a scroll container,
          so it does NOT cancel the scrollbar-gutter reservation on <html>.
          This is the key difference from overflow-x: hidden.
        */}
        <div className="clip-x">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}