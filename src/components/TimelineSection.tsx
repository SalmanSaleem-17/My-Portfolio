'use client'

import { memo } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket } from 'lucide-react';
import { containerVariants, itemVariants } from '@/utils/animations';
import SectionBadge from '@/components/projects/SectionBadge';

const TYPE_STYLE: Record<string, string> = {
  Education:  'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800/40',
  Experience: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
  Milestone:  'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800/40',
};

const TIMELINE = [
  { period: '2020 – 2025',   title: 'BS Computer Science',                              org: 'COMSATS University Islamabad',                         type: 'Education',  icon: GraduationCap },
  { period: '2023 – Present', title: 'Freelance Full-Stack Developer',                   org: 'Self-employed · Remote',                                type: 'Experience', icon: Briefcase },
  { period: '2024',          title: 'Shipped Jewel Heaven',                             org: 'Premium e-commerce jewelry platform',                  type: 'Milestone',  icon: Rocket },
  { period: '2025',          title: 'Launched Goldify Pro & GoldPrice Converter',       org: 'Production FinTech platforms serving 100+ countries',   type: 'Milestone',  icon: Rocket },
  { period: '2026',          title: 'Released ScaleRecipe & Premium Converters',        org: '159+ tools across finance, health & everyday utilities', type: 'Milestone', icon: Rocket },
] as const;

const TimelineSection = memo(() => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={containerVariants}
    className="max-w-4xl mx-auto"
  >
    <SectionBadge
      label="My journey"
      title="Experience & Education"
      description="A snapshot of how I've grown — from Computer Science studies to shipping production apps used across 100+ countries."
      itemVariants={itemVariants}
    />

    <div className="relative">
      {/* Vertical spine */}
      <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-linear-to-b from-purple-400 via-violet-400 to-transparent dark:from-purple-500 dark:via-violet-500 dark:to-transparent" />

      <div className="space-y-6">
        {TIMELINE.map(({ period, title, org, type, icon: Icon }) => (
          <motion.div key={title} variants={itemVariants} className="relative pl-11">
            {/* Node */}
            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-linear-to-br from-purple-500 to-violet-600
              flex items-center justify-center shadow-md ring-4 ring-white/70 dark:ring-slate-900/50">
              <Icon className="w-3 h-3 text-white" />
            </div>

            {/* Card */}
            <div className="rounded-2xl p-5 border border-white/40 dark:border-slate-700/40 shadow-md backdrop-blur-sm
              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'var(--card-bg)' }}>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/60">
                  {period}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${TYPE_STYLE[type]}`}>
                  {type}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
));
TimelineSection.displayName = 'TimelineSection';
export default TimelineSection;
