'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink, Zap, CheckCircle } from 'lucide-react';
import SectionBadge from '@/components/projects/SectionBadge';
import type { Project } from '@/components/projects/types';

interface ProjectsSectionProps {
  containerVariants: Variants;
  itemVariants:      Variants;
  projects:          Project[];
}

function getSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const slug     = getSlug(project.title);
  const isLive   = project.status === 'Live Production';
  const featured = index % 4 === 0 || index % 4 === 3;
  const num      = String(index + 1).padStart(2, '0');

  return (
    <div className={`proj-${slug} group relative${featured ? ' sm:col-span-2 lg:col-span-2' : ''}`}>

      {/* Ambient bloom — colour-matched to project */}
      <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-[0.13] transition-all duration-700 [background:var(--proj-gradient)] blur-3xl -z-10 pointer-events-none" />

      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'relative overflow-hidden rounded-2xl h-full flex flex-col',
          '[background:var(--card-bg)] backdrop-blur-sm',
          'border border-slate-200/70 dark:border-slate-600/30',
          'group-hover:border-slate-300 dark:group-hover:border-slate-700/80',
          'shadow-sm group-hover:shadow-2xl dark:group-hover:shadow-[0_20px_56px_rgba(0,0,0,0.65)]',
          'group-hover:-translate-y-2 transition-all duration-300 ease-out',
        ].join(' ')}
      >
        {/* Gradient accent bar — top edge */}
        <div className="absolute top-0 left-0 right-0 h-0.5 [background:var(--proj-gradient)] z-30 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* ── Visual panel ──────────────────────────────────────────── */}
        {/* Featured cards get a wide panoramic crop; regular cards get 16:9 */}
        <div className={[
          'relative overflow-hidden shrink-0',
          featured ? 'aspect-16/7' : 'aspect-video',
        ].join(' ')}>

          {/* Full-bleed screenshot */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={featured
              ? '(max-width:640px) 100vw, (max-width:1024px) 100vw, 66vw'
              : '(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'}
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />

          {/* Bottom bleed — screenshot fades into card background */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white dark:from-slate-800 to-transparent pointer-events-none z-1" />

          {/* Top scrim for badge legibility */}
          <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/45 to-transparent pointer-events-none z-1" />

          {/* Status badge — top-left */}
          <div className="absolute top-3 left-3 z-10">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.13em] px-2.5 py-1 rounded-full backdrop-blur-sm bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            ) : (
              <span className="text-[9px] font-black uppercase tracking-[0.13em] px-2.5 py-1 rounded-full backdrop-blur-sm bg-black/30 text-white/60 border border-white/15">
                {project.status}
              </span>
            )}
          </div>

          {/* View button — top-right, appears on hover */}
          <Link
            href={`/projects/${slug}`}
            className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 font-black text-[9px] shadow-md"
          >
            View <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* ── Content panel ─────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0 p-5">

          {/* Title + index watermark */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={[
              'font-extrabold text-slate-900 dark:text-white leading-tight',
              featured ? 'text-lg sm:text-[1.25rem]' : 'text-[1.05rem]',
            ].join(' ')}>
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-[10px] font-bold text-slate-200 dark:text-slate-800 tabular-nums mt-0.5">
              {num}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 leading-snug line-clamp-1">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, featured ? 5 : 4).map((tech) => (
              <span key={tech}
                className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 border border-slate-200/70 dark:border-slate-700/50">
                {tech}
              </span>
            ))}
            {project.technologies.length > (featured ? 5 : 4) && (
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 border border-slate-200/50 dark:border-slate-700/30">
                +{project.technologies.length - (featured ? 5 : 4)}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
              {isLive
                ? <Zap className="w-3 h-3 text-emerald-500" />
                : <CheckCircle className="w-3 h-3 text-blue-400" />
              }
              {project.year}
              <span className="opacity-30 mx-0.5">·</span>
              {project.duration}
            </div>
            <div className="flex items-center gap-2">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                  title="Live Demo"
                  className="p-1.5 rounded-lg text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <Link href={`/projects/${slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-black text-white [background:var(--proj-gradient)] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-sm">
                Case Study <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  containerVariants,
  itemVariants,
  projects,
}) => {
  const liveCount      = projects.filter(p => p.status === 'Live Production').length;
  const completedCount = projects.length - liveCount;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="space-y-12"
      >
        <SectionBadge
          label="Featured Projects"
          title="My Work"
          description="Innovative applications and digital solutions that solve real-world problems through thoughtful design and modern engineering."
          itemVariants={itemVariants}
        />

        {/* Stats pill */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="inline-flex items-stretch rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm">
            {[
              { value: projects.length, label: 'Projects' },
              { value: liveCount,       label: 'Live' },
              { value: completedCount,  label: 'Completed' },
            ].map(({ value, label }, i) => (
              <div key={label}
                className={[
                  'px-8 py-4 text-center',
                  i < 2 ? 'border-r border-slate-200/70 dark:border-slate-800/60' : '',
                ].join(' ')}>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums leading-none">
                  {value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mt-1.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bento grid — every 4th cycle: positions 0,3 are featured (col-span-2 in 3-col) */}
        <motion.div variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
