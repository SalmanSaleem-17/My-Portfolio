'use client'

import { memo, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import SkillsBackground from '@/components/skills/SkillsBackground';
import SkillsHeader     from '@/components/skills/SkillsHeader';

import { Skill, SKILL_LEVELS, CATEGORIES, hexToRgba } from '@/components/skills/types';

interface SkillsSectionProps {
  containerVariants?: Variants;
  itemVariants?:      Variants;
  skillVariants?:     Variants;
  skills:             Skill[];
}

const ROTATE_MS = 2000;

// ─── Section ─────────────────────────────────────────────────────────────────
export default memo(function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [featuredIndex,  setFeaturedIndex]  = useState(0);
  const [paused,         setPaused]         = useState(false);

  const filtered = useMemo(
    () => activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory),
    [skills, activeCategory],
  );

  // Reset featured index when filter changes
  useEffect(() => { setFeaturedIndex(0); }, [activeCategory]);

  // Auto-rotate featured skill
  useEffect(() => {
    if (paused || filtered.length <= 1) return;
    const id = setInterval(
      () => setFeaturedIndex(p => (p + 1) % filtered.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [paused, filtered.length]);

  const featured = filtered[featuredIndex] ?? filtered[0];

  // One marquee row per category — Frontend / Backend / Cloud & DevOps / Tools
  const rows = useMemo(
    () => CATEGORIES
      .map(cat => ({ category: cat, skills: filtered.filter(s => s.category === cat.filter) }))
      .filter(r => r.skills.length > 0),
    [filtered],
  );

  const categoryOptions = [
    { label: 'All',         filter: 'all' },
    ...CATEGORIES.map(c => ({ label: c.name, filter: c.filter })),
  ];

  return (
    <div className="relative py-8">
      <SkillsBackground />

      <div className="relative z-10">
        <SkillsHeader />

        {/* ── Category filter pills (layoutId-sliding active indicator) ───── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
          {categoryOptions.map(c => {
            const active = c.filter === activeCategory;
            return (
              <button
                key={c.filter}
                onClick={() => setActiveCategory(c.filter)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                  ${active
                    ? 'text-white'
                    : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-slate-700/50'}`}
              >
                {active && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Featured Tech Console ──────────────────────────────────────── */}
        {featured && (
          <FeaturedShowcase
            featured={featured}
            total={filtered.length}
            activeIndex={featuredIndex}
            onSelect={setFeaturedIndex}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
          />
        )}

        {/* ── Infinite Stack Ticker — one row per category ───────────────── */}
        <div className="mt-14 space-y-4">
          {rows.map(({ category, skills: rowSkills }, i) => (
            <MarqueeRow
              key={category.filter}
              skills={rowSkills}
              direction={i % 2 === 0 ? 'left' : 'right'}
              speed={38 + i * 12}
            />
          ))}
        </div>
      </div>
    </div>
  );
});


// ─── Featured showcase (hero panel) ─────────────────────────────────────────
interface FeaturedProps {
  featured: Skill;
  total: number;
  activeIndex: number;
  onSelect: (i: number) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function FeaturedShowcase({ featured, total, activeIndex, onSelect, onHoverStart, onHoverEnd }: FeaturedProps) {
  const level = SKILL_LEVELS[featured.level];
  const dotCount = Math.min(total, 10);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className="relative rounded-3xl overflow-hidden p-8 md:p-14 min-h-[340px]
          border border-slate-800/60"
        style={{
          background: `
            radial-gradient(circle at 10% 10%, ${hexToRgba(featured.color, 0.18)}, transparent 50%),
            radial-gradient(circle at 90% 90%, rgba(124,58,237,0.18), transparent 45%),
            linear-gradient(140deg, #0b1222 0%, #111827 50%, #0b1222 100%)
          `,
          boxShadow: `0 30px 80px ${hexToRgba(featured.color, 0.22)}, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Scan line sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${hexToRgba(featured.color, 0.12)}, transparent)` }}
        />

        {/* Grid lines overlay (terminal vibe) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Tiny corner ID */}
        <div className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.3em] uppercase text-violet-300/70 z-10">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
          Featured Tech
        </div>
        <div className="absolute top-5 right-6 font-mono text-[11px] tabular-nums text-slate-500 z-10">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={featured.name}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            exit   ={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="relative grid md:grid-cols-[auto_1fr] gap-10 items-center mt-8 md:mt-4"
          >
            {/* ── Icon orb with orbit rings ── */}
            <div className="relative flex justify-center mx-auto">
              <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
                {/* Outer dashed orbit */}
                <div
                  className="absolute inset-0 rounded-full border border-dashed animate-spin-slow"
                  style={{ borderColor: hexToRgba(featured.color, 0.35) }}
                />
                {/* Inner thin orbit (counter-rotating) */}
                <div
                  className="absolute inset-6 rounded-full border animate-spin-reverse"
                  style={{ borderColor: hexToRgba(featured.color, 0.18) }}
                />
                {/* Orbit dot */}
                <div
                  className="absolute w-3 h-3 rounded-full top-0 left-1/2 -translate-x-1/2 animate-spin-slow"
                  style={{
                    background: featured.color,
                    boxShadow: `0 0 16px ${hexToRgba(featured.color, 0.9)}`,
                    transformOrigin: '50% 96px',
                  }}
                />
                {/* Glow halo */}
                <div
                  className="absolute inset-4 rounded-full blur-2xl"
                  style={{ background: hexToRgba(featured.color, 0.35) }}
                />
                {/* Icon */}
                <featured.icon
                  className="relative w-24 h-24 md:w-32 md:h-32"
                  style={{
                    color: featured.color,
                    filter: `drop-shadow(0 0 24px ${hexToRgba(featured.color, 0.75)})`,
                  }}
                />
              </div>
            </div>

            {/* ── Info ── */}
            <div className="text-center md:text-left">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-3">
                {featured.category}
              </div>
              <h3
                className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4"
                style={{ textShadow: `0 0 40px ${hexToRgba(featured.color, 0.45)}` }}
              >
                {featured.name}
              </h3>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    color: featured.color,
                    borderColor: hexToRgba(featured.color, 0.35),
                    background: hexToRgba(featured.color, 0.1),
                  }}
                >
                  {level.label}
                </span>
                {featured.years && (
                  <span className="text-slate-400 text-xs font-mono">
                    {featured.years}+ yrs
                  </span>
                )}
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-slate-400 text-xs font-mono tabular-nums">{level.percentage}%</span>
              </div>

              {/* Proficiency bar */}
              <div className="max-w-md mx-auto md:mx-0">
                <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                  <motion.div
                    key={featured.name + '-bar'}
                    initial={{ width: 0 }}
                    animate={{ width: `${level.percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${featured.color}, ${hexToRgba(featured.color, 0.6)})`,
                      boxShadow: `0 0 12px ${hexToRgba(featured.color, 0.6)}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {Array.from({ length: dotCount }).map((_, i) => {
            const active = i === (activeIndex % dotCount);
            return (
              <button
                key={i}
                aria-label={`Show skill ${i + 1}`}
                onClick={() => onSelect(i)}
                className={`h-1 rounded-full transition-all duration-300
                  ${active ? 'w-8 bg-violet-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ─── Marquee row ────────────────────────────────────────────────────────────
interface MarqueeRowProps {
  skills: Skill[];
  direction: 'left' | 'right';
  speed: number; // seconds per full loop
}

function MarqueeRow({ skills, direction, speed }: MarqueeRowProps) {
  if (!skills.length) return null;
  // Repeat skills enough times so each half of the track is wider than the
  // container — guarantees a seamless circular loop even with few items.
  const MIN_UNIT = 16;
  const repeats = Math.max(2, Math.ceil(MIN_UNIT / skills.length));
  const unit = Array.from({ length: repeats }, () => skills).flat();
  const track = [...unit, ...unit];

  return (
    <div className="marquee-row relative overflow-hidden">
      {/* Edge fade mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: 'linear-gradient(90deg, var(--background, rgba(255,255,255,0)), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: 'linear-gradient(270deg, var(--background, rgba(255,255,255,0)), transparent)' }}
      />

      <div
        className="marquee-track flex gap-3 w-max py-2"
        style={{
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`,
        }}
      >
        {track.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// Opaque fill — backdrop-blur on hundreds of duplicated pills tanks GPU.
function SkillPill({ skill }: { skill: Skill }) {
  return (
    <div
      className="shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full
        bg-white/90 dark:bg-slate-800/90
        border border-white/60 dark:border-slate-700/60
        transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.06]"
      style={{ boxShadow: `0 4px 14px ${hexToRgba(skill.color, 0.15)}` }}
    >
      <skill.icon className="w-5 h-5 shrink-0" style={{ color: skill.color }} />
      <span className="font-semibold text-sm text-gray-800 dark:text-slate-100 whitespace-nowrap">
        {skill.name}
      </span>
      <span
        className="text-[10px] font-mono uppercase tracking-wider"
        style={{ color: hexToRgba(skill.color, 0.9) }}
      >
        {skill.level.slice(0, 3)}
      </span>
    </div>
  );
}
