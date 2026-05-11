'use client'

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import SectionBadge   from '@/components/projects/SectionBadge';
import ProjectHeader  from '@/components/projects/ProjectHeader';
import ProjectDetails from '@/components/projects/ProjectDetails';
import type { Project } from '@/components/projects/types';

interface ProjectsSectionProps {
  containerVariants: Variants;
  itemVariants:      Variants;
  projects:          Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  containerVariants,
  itemVariants,
  projects,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction,   setDirection]   = useState<1 | -1>(1);
  const total  = projects.length;
  const active = projects[activeIndex];

  const go = useCallback((target: number, dir: 1 | -1) => {
    setDirection(dir);
    setActiveIndex(((target % total) + total) % total);
  }, [total]);

  const next = useCallback(() => go(activeIndex + 1,  1), [activeIndex, go]);
  const prev = useCallback(() => go(activeIndex - 1, -1), [activeIndex, go]);

  // Keyboard ← / →
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  // Entry / exit for the active card — 3D spring with directional x-offset
  const cardVariants: Variants = {
    enter:  (d: 1 | -1) => ({ opacity: 0, y: 40, scale: 0.95, x: d > 0 ?  80 : -80, rotateX: 6 }),
    center:                  { opacity: 1, y: 0,  scale: 1,    x: 0,                rotateX: 0 },
    exit:   (d: 1 | -1) => ({ opacity: 0, y: -20, scale: 0.95, x: d > 0 ? -80 : 80, rotateX: -6 }),
  };

  return (
    <div className="relative w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="space-y-8 lg:space-y-10"
      >
        <SectionBadge
          label="Featured Projects"
          title="My Work"
          description="Innovative applications and digital solutions that solve real-world problems through thoughtful design and modern engineering."
          itemVariants={itemVariants}
        />

        {/* ── Counter + arrow navigation ──────────────────────────────── */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-end justify-between gap-4 px-1">
            <div className="flex items-baseline gap-3 leading-none">
              <span
                className="font-mono font-black tabular-nums bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-6xl md:text-8xl"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(139,92,246,0.3))' }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-xl md:text-3xl text-slate-400 dark:text-slate-500 tabular-nums font-medium">
                / {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end leading-tight">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {active?.category}
                </div>
                <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  ← → to navigate
                </div>
              </div>
              <NavButton onClick={prev} aria-label="Previous project">
                <ArrowLeft className="w-4 h-4" />
              </NavButton>
              <NavButton onClick={next} aria-label="Next project">
                <ArrowRight className="w-4 h-4" />
              </NavButton>
            </div>
          </div>

          {/* Segmented progress rail */}
          <div className="flex gap-1.5 px-1">
            {projects.map((_, i) => {
              const isActive  = i === activeIndex;
              const isVisited = i < activeIndex;
              return (
                <button
                  key={i}
                  aria-label={`Jump to project ${i + 1}`}
                  onClick={() => go(i, i >= activeIndex ? 1 : -1)}
                  className={`flex-1 h-1 rounded-full transition-all duration-500
                    ${isActive
                      ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 h-1.5'
                      : isVisited
                        ? 'bg-violet-500/40 hover:bg-violet-500/60'
                        : 'bg-slate-200 dark:bg-slate-700/60 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ── Active card with mesh backdrop ─────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="relative"
          style={{ perspective: '1600px' }}
        >
          <AnimatePresence mode="sync">
            <MeshBackdrop key={active.id} project={active} />
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 24,
                mass: 0.9,
                opacity: { duration: 0.3 },
              }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ActiveCard project={active} index={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Filmstrip thumbnail navigator ──────────────────────────── */}
        <motion.div variants={itemVariants}>
          <Filmstrip
            projects={projects}
            activeIndex={activeIndex}
            onSelect={(i) => go(i, i >= activeIndex ? 1 : -1)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};


// ─── Active card (IDE window chrome + rich content) ────────────────────────
function ActiveCard({ project, index }: { project: Project; index: number }) {
  const fileSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const isLive   = project.status === 'Live Production';

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'var(--card-bg-solid)',
        boxShadow: '0 30px 80px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Aurora rotating border */}
      <div
        aria-hidden="true"
        className="absolute -inset-[1.5px] rounded-2xl pointer-events-none z-0"
        style={{
          background:
            'conic-gradient(from var(--angle), rgba(124,58,237,0.55), rgba(236,72,153,0.55), rgba(59,130,246,0.55), rgba(124,58,237,0.55))',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
          animation: 'rotate-angle 10s linear infinite',
        } as React.CSSProperties}
      />

      {/* ── IDE window chrome — title bar ─────────────────────────────── */}
      <div className="relative z-20 flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5
        border-b border-violet-100 dark:border-slate-700/60
        bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-400/90 shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-inner" />
        </div>

        {/* File breadcrumb (center) */}
        <div className="hidden sm:flex items-center gap-0 min-w-0 font-mono text-[11px] tabular-nums">
          <span className="text-violet-500 dark:text-violet-400">~/projects/</span>
          <span className="text-slate-500 dark:text-slate-400">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-slate-400 dark:text-slate-500">-</span>
          <span className="text-slate-900 dark:text-slate-100 truncate font-semibold">{fileSlug}</span>
          <span className="text-violet-500 dark:text-violet-400">.tsx</span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 shrink-0">
          {isLive && (
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
            </span>
          )}
          <span className={`font-mono text-[10px] uppercase tracking-[0.25em]
            ${isLive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400'}`}>
            {isLive ? 'Live' : project.status}
          </span>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="relative flex flex-col lg:flex-row lg:h-170">
        <div className="lg:w-[38%] lg:shrink-0">
          <ProjectHeader project={project} index={index} />
        </div>
        <div className="hidden lg:block w-px shrink-0 self-stretch bg-violet-100 dark:bg-slate-700" />
        <div className="flex-1 min-w-0">
          <ProjectDetails project={project} />
        </div>
      </div>
    </div>
  );
}


// ─── Filmstrip thumbnail navigator ─────────────────────────────────────────
function Filmstrip({
  projects,
  activeIndex,
  onSelect,
}: {
  projects: Project[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative">
      {/* Edge fade masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-8 z-10 bg-gradient-to-r from-[var(--background,transparent)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-8 z-10 bg-gradient-to-l from-[var(--background,transparent)] to-transparent"
      />

      <div
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((p, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={p.id}
              onClick={() => onSelect(i)}
              animate={{ scale: isActive ? 1.03 : 1 }}
              whileHover={{ scale: isActive ? 1.03 : 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className={`relative shrink-0 w-44 sm:w-52 md:w-60 rounded-xl overflow-hidden snap-start
                text-left transition-opacity duration-300
                ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
              style={{
                boxShadow: isActive
                  ? '0 20px 40px rgba(124,58,237,0.35)'
                  : '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              {/* Aurora border (active only) */}
              {isActive && (
                <div
                  aria-hidden="true"
                  className="absolute -inset-[1px] rounded-xl pointer-events-none z-20"
                  style={{
                    background:
                      'conic-gradient(from var(--angle), rgba(124,58,237,0.9), rgba(236,72,153,0.9), rgba(59,130,246,0.9), rgba(124,58,237,0.9))',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1.5px',
                    animation: 'rotate-angle 6s linear infinite',
                  } as React.CSSProperties}
                />
              )}

              {/* Image backdrop */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent" />

                {/* Active index badge */}
                {isActive && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-violet-500/90 backdrop-blur-sm">
                    <span className="font-mono text-[10px] font-bold text-white tracking-widest">
                      NOW PLAYING
                    </span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="relative px-3 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-violet-100/50 dark:border-slate-700/60">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-mono text-[10px] text-violet-500 dark:text-violet-400 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 truncate">
                    {p.category}
                  </span>
                </div>
                <div className="font-bold text-sm text-gray-900 dark:text-slate-100 truncate leading-tight">
                  {p.title}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}


// ─── Mesh backdrop ─────────────────────────────────────────────────────────
// 2 static blobs (no float animations) at blur-2xl — was 3 floating blobs at
// blur-3xl, which forced expensive paint every frame. The starfield + aurora
// border already give the section atmosphere.
function MeshBackdrop({ project }: { project: Project }) {
  const primary = project.colors?.primary ?? '#7c3aed';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
    >
      <div
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-2xl"
        style={{ background: `${primary}3a` }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-2xl"
        style={{ background: 'rgba(236,72,153,0.22)' }}
      />
    </motion.div>
  );
}


// ─── Circular navigation button ────────────────────────────────────────────
function NavButton({
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className="group relative w-11 h-11 rounded-full grid place-items-center
        bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
        border border-violet-200/60 dark:border-slate-700/60
        text-violet-600 dark:text-violet-300
        hover:text-white hover:border-transparent
        transition-colors duration-200
        active:scale-95"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br from-violet-600 to-fuchsia-600"
      />
      <span className="relative">{children}</span>
    </button>
  );
}

export default ProjectsSection;
