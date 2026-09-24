'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight, Sparkles, Store } from 'lucide-react'
import { SiGoogleplay } from 'react-icons/si'
import { containerVariants, itemVariants } from '@/utils/animations'
import SectionBadge from '@/components/projects/SectionBadge'
import cloudinaryLoader, { isCloudinary } from '@/utils/imageLoader'
import { playApps, PLAY_DEVELOPER_URL, type PlayApp } from '@/utils/appsData'

/* ── One app ───────────────────────────────────────────────────────────────── */

function AppCard({ app, index }: { app: PlayApp; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/40 dark:border-slate-700/40
        shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
      style={
        {
          background: 'var(--card-bg)',
          '--app-from': app.accent.from,
          '--app-to': app.accent.to,
        } as React.CSSProperties
      }
    >
      {/* Accent rail */}
      <div className="h-1 shrink-0 bg-linear-to-r from-(--app-from) to-(--app-to)" />

      <div className="p-6 sm:p-7 flex flex-col flex-1">

        {/* ── Identity row ── */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative shrink-0">
            <div
              className="absolute -inset-2 rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition-opacity duration-500
                bg-linear-to-br from-(--app-from) to-(--app-to)"
              aria-hidden="true"
            />
            {/* 22.2% is Android's adaptive-icon corner radius */}
            <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[22.2%] overflow-hidden
              ring-1 ring-black/10 dark:ring-white/10 shadow-md">
              <Image
                src={app.icon}
                alt={`${app.name} app icon`}
                loader={cloudinaryLoader}
                unoptimized={!isCloudinary(app.icon)}
                fill
                sizes="72px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {app.name}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-slate-400 dark:text-slate-500 truncate">
              {app.packageId}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em]
                px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40
                text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live on Play
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full
                bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400
                border border-slate-200/70 dark:border-slate-700/50">
                {app.category}
              </span>
            </div>
          </div>
        </div>

        {/* ── Tagline ── */}
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug mb-2">
          {app.tagline}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
          {app.summary}
        </p>

        {/* ── Screenshot strip — native 9:19.5, scrolls on narrow screens ── */}
        <div className="-mx-1 mb-5 flex gap-3 overflow-x-auto pb-2 snap-x no-scrollbar">
          {app.screenshots.map((s) => (
            <div
              key={s.src}
              className="relative shrink-0 snap-start w-[86px] sm:w-[96px] aspect-[9/19.5] rounded-xl overflow-hidden
                bg-slate-900 border border-slate-200/70 dark:border-slate-700/50 shadow-sm
                hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={s.src}
                alt={s.alt}
                loader={cloudinaryLoader}
                unoptimized={!isCloudinary(s.src)}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* ── Highlights ── */}
        <ul className="space-y-2.5 mb-5">
          {app.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center
                  bg-linear-to-br from-(--app-from) to-(--app-to)"
                aria-hidden="true"
              >
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
              </span>
              <span className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* ── Chips ── */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {app.chips.map((c) => (
            <span
              key={c}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full
                bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300
                border border-slate-200 dark:border-slate-700/60"
            >
              {c}
            </span>
          ))}
        </div>

        {/* ── Actions — pinned to the card bottom so both cards line up ── */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <a
            href={app.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800
              text-white font-bold text-[13px] border border-slate-700/70
              hover:bg-slate-800 dark:hover:bg-slate-700 hover:scale-[1.03] hover:-translate-y-0.5
              transition-all duration-200 shadow-md"
          >
            <SiGoogleplay className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="flex flex-col items-start leading-none">
              <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-slate-400">Get it on</span>
              <span className="text-[13px] font-black">Google Play</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>

          {app.caseStudy && (
            <Link
              href={app.caseStudy}
              className="group/cs inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[13px]
                bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300
                border border-slate-200 dark:border-slate-700
                hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:scale-[1.03] hover:-translate-y-0.5
                transition-all duration-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Case study
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5" />
            </Link>
          )}

          <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500">
            Updated {app.lastUpdated}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Section ───────────────────────────────────────────────────────────────── */

const AppsSection = memo(() => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={containerVariants}
    className="max-w-6xl mx-auto"
  >
    <SectionBadge
      label="On Google Play"
      title="Android Apps"
      description="Apps I've built and published to the Google Play Store under my own developer account — from live FinTech data to offline land-survey tooling."
      itemVariants={itemVariants}
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {playApps.map((app, i) => (
        <AppCard key={app.packageId} app={app} index={i} />
      ))}
    </div>

    {/* Developer account — the credential behind the listings */}
    <motion.div variants={itemVariants} className="mt-8 flex justify-center">
      <a
        href={PLAY_DEVELOPER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl
          bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm
          border border-slate-200/70 dark:border-slate-700/50 shadow-sm
          hover:border-purple-300 dark:hover:border-purple-600/60 hover:shadow-md transition-all"
      >
        <span className="w-9 h-9 rounded-xl bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-sm shrink-0">
          <Store className="w-4.5 h-4.5 text-white" />
        </span>
        <span className="text-left">
          <span className="block text-[13px] font-bold text-slate-800 dark:text-white leading-tight">
            Google Play developer account
          </span>
          <span className="block text-[11px] text-slate-500 dark:text-slate-400">
            Muhammad Salman Saleem — view all published apps
          </span>
        </span>
        <ArrowUpRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.div>
  </motion.div>
))
AppsSection.displayName = 'AppsSection'
export default AppsSection
