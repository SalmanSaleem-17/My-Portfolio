'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, ExternalLink, Github, CheckCircle2,
  Calendar, Clock, Monitor, Layers, Globe,
  Code2, Cpu, Database, Shield, Puzzle, ArrowUpRight, Sparkles,
} from 'lucide-react';
import { projects } from '@/utils/data';

function getSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const archIcon: Record<string, React.ReactNode> = {
  frontend:       <Code2    className="w-4 h-4" />,
  backend:        <Cpu      className="w-4 h-4" />,
  database:       <Database className="w-4 h-4" />,
  authentication: <Shield   className="w-4 h-4" />,
  deployment:     <Globe    className="w-4 h-4" />,
  apiIntegration: <Puzzle   className="w-4 h-4" />,
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }  = React.use(params);
  const project   = projects.find(p => getSlug(p.title) === slug);
  if (!project) notFound();

  const isLive    = project.status === 'Live Production';
  const isGithub  = project.link?.includes('github');
  const arch      = project.architecture;
  const urlLabel  = (project.demoLink || project.link || '').replace(/https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className={`proj-${slug} min-h-screen bg-slate-50 dark:bg-transparent`}>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 overflow-hidden">

        {/* Gradient wash — subtle tint matching project colour */}
        <div className="absolute inset-0 [background:var(--proj-gradient)] opacity-[0.07] dark:opacity-[0.10] pointer-events-none" />
        <div className="proj-grid-texture absolute inset-0 opacity-[0.035] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-16">

          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group mb-10"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Two-column hero grid */}
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 xl:gap-20 items-center">

            {/* ── Left: project meta ── */}
            <div>
              {/* Badge row */}
              <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1 rounded-full text-white [background:var(--proj-gradient)] shadow-sm">
                  {project.category}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/50">
                  {project.year}
                </span>
                {isLive ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                ) : (
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/50">
                    {project.status}
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                {...fadeUp(0.10)}
                className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white mb-4"
              >
                {project.title}
              </motion.h1>

              {/* Project-colour underline accent */}
              <motion.div
                {...fadeUp(0.14)}
                className="h-0.75 w-16 [background:var(--proj-gradient)] rounded-full mb-5"
              />

              {/* Subtitle */}
              <motion.p
                {...fadeUp(0.18)}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl"
              >
                {project.subtitle}
              </motion.p>

              {/* CTA buttons */}
              <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-3 mb-8">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-bold text-sm [background:var(--proj-gradient)] hover:opacity-95 transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-xl ring-1 ring-white/20"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {isGithub && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800/80 text-white font-bold text-sm border border-slate-700/80 hover:bg-slate-800 dark:hover:bg-slate-700/80 transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-md backdrop-blur-sm"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {!isGithub && project.link && project.link !== project.demoLink && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/10 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold text-sm border border-slate-200/80 dark:border-slate-700/60 hover:bg-white/20 dark:hover:bg-slate-700/60 transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-sm backdrop-blur-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    Learn More
                  </a>
                )}
              </motion.div>

              {/* Stat pills */}
              <motion.div {...fadeUp(0.26)} className="flex flex-wrap gap-2">
                {([
                  { icon: Calendar, label: 'Year',     value: project.year },
                  { icon: Clock,    label: 'Duration', value: project.duration },
                  { icon: Monitor,  label: 'Platform', value: project.platform.split('(')[0].trim() },
                  { icon: Layers,   label: 'Devices',  value: project.deviceTargets.join(' · ') },
                ] as const).map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/40 shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-(--proj-primary)" />
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{label}:</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: browser mockup ── */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow halo */}
              <div className="absolute -inset-10 [background:var(--proj-gradient)] opacity-[0.18] dark:opacity-[0.22] blur-3xl rounded-3xl pointer-events-none" />

              {/* Browser chrome + screenshot */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/8 ring-1 ring-black/5 dark:ring-white/5">

                {/* Top chrome bar */}
                <div className="bg-slate-100 dark:bg-[#1c2035] px-4 py-2.5 flex items-center gap-3 border-b border-slate-200/60 dark:border-white/6">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-md px-3 py-1 text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate border border-slate-200/60 dark:border-slate-600/30">
                    {urlLabel}
                  </div>
                  <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                </div>

                {/* Screenshot */}
                <div className="relative aspect-video bg-slate-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 55vw"
                    className="object-cover object-top"
                  />
                </div>

                {/* Bottom status bar */}
                <div className="bg-slate-100 dark:bg-[#1c2035] px-4 py-1.5 flex items-center justify-between border-t border-slate-200/60 dark:border-white/4">
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600">
                    {isLive ? '● Connected' : '○ Demo'}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600">{project.year}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section divider */}
        <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700/50 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BODY
      ══════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

        {/* ── Overview ── */}
        <Section title="Overview" emoji="📋">
          <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/70 dark:border-slate-800/50 shadow-sm overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-0.75 [background:var(--proj-gradient)] rounded-r-full" />
            <p className="pl-7 text-slate-600 dark:text-slate-300 leading-[1.9] text-[15px]">
              {project.longDescription}
            </p>
          </div>
        </Section>

        {/* ── Problem & Solution ── */}
        <Section title="Problem & Solution" emoji="⚡">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative bg-red-50/70 dark:bg-red-950/10 rounded-2xl p-6 border border-red-200/60 dark:border-red-900/25 overflow-hidden hover:border-red-300 dark:hover:border-red-800/40 transition-colors">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-400 to-rose-400" />
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm">⚠️</div>
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-red-500 dark:text-red-400">The Problem</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{project.problemStatement}</p>
            </div>
            <div className="relative bg-emerald-50/70 dark:bg-emerald-950/10 rounded-2xl p-6 border border-emerald-200/60 dark:border-emerald-900/25 overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-800/40 transition-colors">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400 to-teal-400" />
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm">✅</div>
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">The Solution</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </Section>

        {/* ── Core Features ── */}
        <Section title="Core Features" emoji="✨">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-800/50 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300/80 dark:hover:border-slate-700 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 [background:var(--proj-gradient)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 leading-snug">{f.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Achievements ── */}
        <Section title="Key Achievements" emoji="🏆">
          <div className="grid sm:grid-cols-2 gap-3">
            {project.achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 bg-white dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200/70 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-5 h-5 rounded-full [background:var(--proj-gradient)] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{a}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Tech Stack ── */}
        <Section title="Tech Stack" emoji="🛠️">
          <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/50 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:border-(--proj-primary) hover:text-slate-900 dark:hover:text-white hover:shadow-sm transition-all cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full [background:var(--proj-primary)] opacity-60 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Architecture ── */}
        {arch && (
          <Section title="Architecture" emoji="🏗️">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(arch).map(([key, value], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg [background:var(--proj-gradient)] flex items-center justify-center text-white shrink-0">
                      {archIcon[key] ?? <Layers className="w-4 h-4" />}
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Bottom CTAs ── */}
        <div className="flex flex-wrap gap-4 justify-center pt-10 border-t border-slate-200/60 dark:border-slate-800/60">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Projects
          </Link>
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-bold text-sm hover:opacity-95 transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-xl ring-1 ring-white/20 [background:var(--proj-gradient)]"
            >
              <Globe className="w-4 h-4" />
              Visit Website
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {isGithub && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 hover:bg-slate-800 dark:hover:bg-slate-700 transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-md"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl [background:var(--proj-gradient)] flex items-center justify-center text-lg shadow-sm shrink-0">
          {emoji}
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
        <div className="flex-1 h-px bg-slate-200/70 dark:bg-slate-800/60" />
      </div>
      {children}
    </section>
  );
}
