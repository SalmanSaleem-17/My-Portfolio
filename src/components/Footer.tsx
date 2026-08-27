// src/components/Footer.tsx
// Site-wide footer, mounted once in the root layout so it appears on the home
// page and on every sub-route (/resume, /projects/*, /privacy/*).
//
// The Legal column matters beyond design: Google Play and AdMob expect an app's
// privacy policy to be discoverable from the developer site, so the PrintBridge
// policy is linked from here as well as from the store listing.

import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail, ArrowUpRight, Smartphone } from 'lucide-react'
import { SITE } from '@/utils/seo'

const EXPLORE = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Resume', href: '/resume' },
]

// Android apps — the Play listing and its case study, reachable from every page.
const APPS = [
  {
    label: 'Goldify — Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.goldify.pro',
  },
  { label: 'Goldify — Case Study', href: '/projects/goldify-android-app' },
  {
    label: 'All apps by me',
    href: 'https://play.google.com/store/apps/dev?id=4945636568810127963',
  },
]

const LEGAL = [
  { label: 'PrintBridge — Privacy Policy', href: '/privacy/printbridge' },
]

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/SalmanSaleem-17', Icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-salman-saleem-8a9a96266',
    Icon: Linkedin,
  },
  { label: 'Email', href: `mailto:${SITE.email}`, Icon: Mail },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 mb-4">
      {children}
    </h3>
  )
}

const linkClass =
  'text-sm text-slate-600 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors'

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/70 dark:border-slate-700/40 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Identity ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-4">
              <span className="w-9 h-9 rounded-full bg-linear-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-pink-900/40 dark:via-purple-900/40 dark:to-blue-900/40 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                <Image src="/projects/SS-logo.png" alt="" width={22} height={22} />
              </span>
              <span className="text-lg font-bold text-purple-800 dark:text-purple-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {SITE.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
              {SITE.headline}. Building production-grade FinTech, e-commerce and
              SaaS web platforms — plus Android apps published on Google Play —
              from {SITE.location.city}, {SITE.location.country}.
            </p>

            <div className="flex items-center gap-2 mt-5">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-white hover:bg-linear-to-r hover:from-purple-600 hover:to-violet-600 hover:border-transparent transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore ── */}
          <nav aria-label="Footer navigation">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-2.5">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Apps ── */}
          <nav aria-label="Android apps">
            <ColumnHeading>Apps</ColumnHeading>
            <ul className="space-y-2.5">
              {APPS.map((item) => {
                const external = item.href.startsWith('http')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className={`${linkClass} inline-flex items-start gap-1.5 group`}
                    >
                      {external && (
                        <Smartphone className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                      )}
                      {item.label}
                      {external && (
                        <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ── Legal ── */}
          <nav aria-label="Legal">
            <ColumnHeading>Legal</ColumnHeading>
            <ul className="space-y-2.5">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${linkClass} inline-flex items-start gap-1 group`}
                  >
                    {item.label}
                    <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-slate-200/70 dark:border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-[13px] text-slate-400 dark:text-slate-500">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
