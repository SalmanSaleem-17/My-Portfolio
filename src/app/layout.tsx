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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

// // src/app/layout.tsx
// import './globals.css'
// import Navbar from '@/components/Navbar'

// export const metadata = {
//   title: 'Salman Saleem | MERN Developer',
//   description: 'Portfolio website showcasing projects and skills of Salman Saleem.',
//     icons: {
//     icon: "/SS-logo.png",
//   },
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-white text-gray-900 scroll-smooth">
//         <Navbar />
//         {children}
//       </body>
//     </html>
//   )
// }
