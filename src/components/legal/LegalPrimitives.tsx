// src/components/legal/LegalPrimitives.tsx
// Shared building blocks for app legal pages that come in pairs (privacy policy +
// terms of service), so both pages of one app stay visually identical.
// Server components only — no interactivity.

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-linear-to-r from-orange-700 to-orange-500 flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-800 dark:text-white">
          {title}
        </h2>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/70" />
      </div>
      <div className="bg-white dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-slate-200/60 dark:border-slate-700/40 shadow-sm text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 space-y-4">
        {children}
      </div>
    </section>
  )
}

export function Term({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="pl-1">
      <span className="font-bold text-slate-800 dark:text-white">{label}</span>
      {' — '}
      {children}
    </li>
  )
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('mailto')
  const className =
    'font-semibold text-orange-700 dark:text-orange-300 underline decoration-orange-300/60 dark:decoration-orange-500/40 underline-offset-2 hover:decoration-orange-500 transition-colors'
  if (!external) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

export function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-slate-800 dark:text-white">{children}</strong>
}

export const LIST = 'list-disc pl-5 space-y-2 marker:text-orange-500'

/** Page frame: back link, accent header card with an "In short" summary, then sections. */
export function LegalPage({
  app,
  document,
  effective,
  appliesTo,
  summary,
  caption,
  children,
}: {
  app: string
  document: string
  effective: string
  appliesTo: React.ReactNode
  summary: React.ReactNode
  caption: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <header className="relative bg-white dark:bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40 shadow-sm mb-8">
          <div className="h-1.5 bg-linear-to-r from-orange-700 via-orange-500 to-amber-400" />
          <div className="p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-orange-700 dark:text-orange-300 mb-2">
              Android Application
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
              {app}{' '}
              <span className="bg-linear-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">
                {document}
              </span>
            </h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Effective {effective} · Last updated {effective}
            </p>
            <p className="mt-1 text-[13px] font-medium text-slate-400 dark:text-slate-500">{appliesTo}</p>

            <div className="mt-6 rounded-xl border border-orange-200/80 dark:border-orange-800/40 bg-orange-50 dark:bg-orange-950/30 p-5">
              <p className="text-[13px] font-black uppercase tracking-[0.12em] text-orange-800 dark:text-orange-300 mb-2">
                In short
              </p>
              <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{summary}</p>
            </div>
          </div>
        </header>

        {children}

        {/* Site-wide copyright lives in the layout footer; this is just a caption. */}
        <p className="text-center text-[13px] text-slate-400 dark:text-slate-500 mt-10">{caption}</p>
      </div>
    </div>
  )
}
