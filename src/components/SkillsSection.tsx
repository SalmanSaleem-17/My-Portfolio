'use client'

import { memo } from 'react';
import { motion, Variants } from 'framer-motion';

import SkillsBackground from '@/components/skills/SkillsBackground';
import SkillsHeader     from '@/components/skills/SkillsHeader';
import { Skill, SKILL_LEVELS, CATEGORIES } from '@/components/skills/types';

interface SkillsSectionProps {
  containerVariants?: Variants;
  itemVariants?:      Variants;
  skillVariants?:     Variants;
  skills:             Skill[];
}

// Level → terminal colour + a 10-block ASCII proficiency bar.
const LEVEL_COLOR: Record<Skill['level'], string> = {
  Expert:       '#4ade80', // green
  Advanced:     '#38bdf8', // sky
  Intermediate: '#fbbf24', // amber
};

const bar = (level: Skill['level']) => {
  const filled = Math.round(SKILL_LEVELS[level].percentage / 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
};

const fileName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ─────────────────────────────────────────────────────────────────────────────
export default memo(function SkillsSection({ skills }: SkillsSectionProps) {
  const groups = CATEGORIES
    .map((cat) => ({ cat, rows: skills.filter((s) => s.category === cat.filter) }))
    .filter((g) => g.rows.length > 0);

  return (
    <div className="relative py-8">
      <SkillsBackground />

      <div className="relative z-10">
        <SkillsHeader />

        {/* ── Terminal window ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl bg-[#0d1117] ring-1 ring-black/40"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-700/50">
            <span className="w-3 h-3 rounded-full bg-red-400/90" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
            <span className="w-3 h-3 rounded-full bg-green-400/90" />
            <span className="flex-1 text-center text-[11px] sm:text-xs font-mono text-slate-400 truncate">
              salman@portfolio: ~/skills
            </span>
            <span className="w-8 sm:w-12 shrink-0" />
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-6 overflow-x-auto">
            {groups.map(({ cat, rows }) => (
              <div key={cat.filter} className="space-y-2">
                {/* Command prompt */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-sky-400">~/skills</span>
                  <span className="text-slate-100">cat {fileName(cat.filter)}.txt</span>
                  <span className="text-slate-600">{`// ${rows.length} skills`}</span>
                </div>

                {/* Output rows */}
                <div className="space-y-1.5 pl-3 sm:pl-4 border-l border-slate-800">
                  {rows.map((s) => {
                    const c = LEVEL_COLOR[s.level];
                    const Icon = s.icon;
                    return (
                      <div key={s.name} className="flex items-center gap-2 sm:gap-3">
                        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: s.color }} />
                        <span className="text-slate-200 whitespace-nowrap">{s.name}</span>
                        <span className="flex-1 min-w-2 self-center border-b border-dotted border-slate-700/70" />
                        <span className="shrink-0 tracking-tighter" style={{ color: c }}>{bar(s.level)}</span>
                        <span className="shrink-0 w-24 text-right hidden sm:inline text-xs font-semibold" style={{ color: c }}>
                          {s.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Final blinking cursor */}
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-400">~/skills</span>
              <span className="inline-block w-2.5 h-4 sm:h-5 bg-slate-200 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});
