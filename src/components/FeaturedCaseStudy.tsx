'use client'

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { projects } from '@/utils/data';
import { getSlug } from '@/utils/seo';
import cloudinaryLoader from '@/utils/imageLoader';

// Spotlight the strongest project (Goldify Pro). Metrics come straight from its
// documented achievements.
const project = projects[0];
const METRICS = [
  { value: '90%',    label: 'workflows automated' },
  { value: '~85%',   label: 'fewer valuation errors' },
  { value: '<500ms', label: 'API response time' },
] as const;

const FeaturedCaseStudy = memo(() => {
  const slug = getSlug(project.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto"
    >
      <div className="relative rounded-3xl border border-white/40 dark:border-slate-700/40 shadow-xl overflow-hidden backdrop-blur-sm"
        style={{ background: 'var(--card-bg)' }}>
        {/* Accent wash */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/[0.07] via-transparent to-violet-500/[0.07] pointer-events-none" />

        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-10">
          {/* ── Left: copy ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5
              bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50">
              <Star className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-purple-600 dark:text-purple-300">
                Featured Project
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-xl">
              {project.subtitle}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-xl p-3 text-center border border-slate-200/70 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40">
                  <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-purple-600 to-violet-500 dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-7">
              {project.technologies.slice(0, 6).map((t) => (
                <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full
                  bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href={`/projects/${slug}`}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm
                  bg-linear-to-r from-purple-600 to-violet-600 hover:opacity-95 transition-all hover:scale-[1.03] shadow-lg">
                <Sparkles className="w-4 h-4" /> View Case Study
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm
                    bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700
                    hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-[1.03] shadow-sm">
                  <Globe className="w-4 h-4" /> Visit Live
                </a>
              )}
            </div>
          </div>

          {/* ── Right: screenshot ── */}
          <div className="relative">
            <div className="absolute -inset-6 bg-linear-to-br from-purple-500/20 to-violet-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">
              <div className="relative aspect-video bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  loader={cloudinaryLoader}
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
FeaturedCaseStudy.displayName = 'FeaturedCaseStudy';
export default FeaturedCaseStudy;
