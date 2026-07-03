'use client'

import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Lock, GitBranch, Code2, CalendarDays } from 'lucide-react';
import { containerVariants, itemVariants } from '@/utils/animations';
import { skills } from '@/utils/skillsData';
import SectionBadge from '@/components/projects/SectionBadge';

const USER = 'SalmanSaleem-17';

// Curated to reflect the real working stack (most client work is in private
// repos, so this is a truer picture than public-repo language stats).
const LANGUAGES = [
  { name: 'JavaScript',    pct: 34, color: '#f7df1e' },
  { name: 'TypeScript',    pct: 26, color: '#3178c6' },
  { name: 'React / JSX',   pct: 16, color: '#61dafb' },
  { name: 'CSS / Tailwind', pct: 12, color: '#06b6d4' },
  { name: 'Node.js',        pct: 8, color: '#339933' },
  { name: 'Other',          pct: 4, color: '#94a3b8' },
] as const;

// Contribution calendar — renders without the GitHub API, so it's reliable.
const graph = `https://ghchart.rshah.org/7c3aed/${USER}`;

type Stats = { repos: number; years: number };

const GithubSection = memo(() => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Direct to GitHub's public API (CORS-enabled, per-visitor quota). Fails
    // silently — the section still looks complete without it.
    fetch(`https://api.github.com/users/${USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (cancelled) return;
        const created = new Date(d.created_at).getFullYear();
        const years = Math.max(1, new Date().getFullYear() - created);
        setStats({ repos: d.public_repos ?? 0, years });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Technologies count comes from the skills data — always accurate, no API.
  const tiles = [
    ...(stats ? [{ icon: GitBranch, label: 'Public Repos', value: `${stats.repos}` }] : []),
    { icon: Code2, label: 'Technologies', value: `${skills.length}+` },
    ...(stats ? [{ icon: CalendarDays, label: 'Years on GitHub', value: `${stats.years}+` }] : []),
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="max-w-5xl mx-auto"
    >
      <SectionBadge
        label="Open source"
        title="I Ship Code"
        description="A live look at my GitHub activity — languages, stats and contribution history."
        itemVariants={itemVariants}
      />

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-white/40 dark:border-slate-700/40 shadow-xl backdrop-blur-sm p-6 sm:p-8"
        style={{ background: 'var(--card-bg)' }}
      >
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* ── Most used languages ── */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-5">
              Most Used Languages
            </h3>
            <div className="space-y-3.5">
              {LANGUAGES.map((l) => (
                <div key={l.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{l.name}</span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{l.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: l.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Live stats + CTA ── */}
          <div className="flex flex-col justify-between gap-6">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
              {tiles.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="flex lg:items-center gap-3 flex-col lg:flex-row rounded-xl p-3.5
                    border border-slate-200/70 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40">
                    <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-slate-900 dark:text-white leading-none">{t.value}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{t.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href={`https://github.com/${USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm
                bg-linear-to-r from-purple-600 to-violet-600 hover:opacity-95 transition-all hover:scale-[1.02] shadow-lg"
            >
              <Github className="w-4 h-4" /> View GitHub Profile
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* ── Contribution graph ── */}
        <div className="mt-8 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 p-4 sm:p-5 overflow-x-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={graph} alt={`${USER} GitHub contribution graph`} loading="lazy" className="w-full min-w-140 h-auto" />
        </div>

        {/* ── Private-repos note ── */}
        <p className="mt-5 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
          Most client work lives in private repositories, so public repos are only part of the picture — the contribution graph reflects overall activity.
        </p>
      </motion.div>
    </motion.div>
  );
});
GithubSection.displayName = 'GithubSection';
export default GithubSection;
