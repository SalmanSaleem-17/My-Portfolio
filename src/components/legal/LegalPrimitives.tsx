// src/components/legal/LegalPrimitives.tsx
// Shared building blocks for app legal pages that come in pairs (privacy policy +
// terms of service), so both pages of one app stay visually identical.
// Server components only — no interactivity.
//
// Each app has its own accent colour. `makeLegal(accent)` returns the full set of
// building blocks in that colour; the default exports below are the orange set
// (Sudoku Vault), and other apps export their own set beside it.
//
// Every class name is written out in full in the ACCENTS table: Tailwind only
// generates the classes it can find as complete strings in the source.

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Accent = {
  /** The square behind a section's icon. */
  tile: string
  /** Inline links. */
  link: string
  /** List bullets. */
  list: string
  /** The strip along the top of the header card. */
  bar: string
  /** "Android Application", above the title. */
  eyebrow: string
  /** The coloured half of the title. */
  title: string
  /** The "In short" box and its label. */
  summaryBox: string
  summaryLabel: string
}

const ACCENTS = {
  orange: {
    tile: 'bg-linear-to-r from-orange-700 to-orange-500',
    link: 'font-semibold text-orange-700 dark:text-orange-300 underline decoration-orange-300/60 dark:decoration-orange-500/40 underline-offset-2 hover:decoration-orange-500 transition-colors',
    list: 'list-disc pl-5 space-y-2 marker:text-orange-500',
    bar: 'h-1.5 bg-linear-to-r from-orange-700 via-orange-500 to-amber-400',
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.14em] text-orange-700 dark:text-orange-300 mb-2',
    title: 'bg-linear-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent',
    summaryBox: 'mt-6 rounded-xl border border-orange-200/80 dark:border-orange-800/40 bg-orange-50 dark:bg-orange-950/30 p-5',
    summaryLabel: 'text-[13px] font-black uppercase tracking-[0.12em] text-orange-800 dark:text-orange-300 mb-2',
  },
  amber: {
    tile: 'bg-linear-to-r from-amber-600 to-yellow-500',
    link: 'font-semibold text-amber-700 dark:text-amber-300 underline decoration-amber-300/60 dark:decoration-amber-500/40 underline-offset-2 hover:decoration-amber-500 transition-colors',
    list: 'list-disc pl-5 space-y-2 marker:text-amber-500',
    bar: 'h-1.5 bg-linear-to-r from-amber-600 via-yellow-500 to-amber-400',
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300 mb-2',
    title: 'bg-linear-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent',
    summaryBox: 'mt-6 rounded-xl border border-amber-200/80 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/30 p-5',
    summaryLabel: 'text-[13px] font-black uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300 mb-2',
  },
} satisfies Record<string, Accent>

function makeLegal(accent: Accent) {
  function Section({
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
          <div className={`w-8 h-8 rounded-lg ${accent.tile} flex items-center justify-center shrink-0 shadow-sm`}>
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

  function Term({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <li className="pl-1">
        <span className="font-bold text-slate-800 dark:text-white">{label}</span>
        {' — '}
        {children}
      </li>
    )
  }

  function A({ href, children }: { href: string; children: React.ReactNode }) {
    const external = href.startsWith('http') || href.startsWith('mailto')
    if (!external) {
      return (
        <Link href={href} className={accent.link}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={accent.link}>
        {children}
      </a>
    )
  }

  function B({ children }: { children: React.ReactNode }) {
    return <strong className="text-slate-800 dark:text-white">{children}</strong>
  }

  /** Page frame: back link, accent header card with an "In short" summary, then sections. */
  function LegalPage({
    app,
    document,
    effective,
    updated,
    appliesTo,
    summary,
    caption,
    children,
  }: {
    app: string
    document: string
    effective: string
    /** Date of the latest revision; defaults to the effective date. */
    updated?: string
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
            <div className={accent.bar} />
            <div className="p-8">
              <p className={accent.eyebrow}>Android Application</p>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
                {app}{' '}
                <span className={accent.title}>{document}</span>
              </h1>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Effective {effective} · Last updated {updated ?? effective}
              </p>
              <p className="mt-1 text-[13px] font-medium text-slate-400 dark:text-slate-500">{appliesTo}</p>

              <div className={accent.summaryBox}>
                <p className={accent.summaryLabel}>In short</p>
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

  return { Section, Term, A, B, LegalPage, LIST: accent.list }
}

// Orange: Sudoku Vault. These are the default set this module exports.
export const { Section, Term, A, B, LegalPage, LIST } = makeLegal(ACCENTS.orange)

// Amber: Checkers Master. Import `amber` and take the blocks from it.
export const amber = makeLegal(ACCENTS.amber)
