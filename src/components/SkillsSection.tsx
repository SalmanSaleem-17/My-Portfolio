'use client'

import { useMemo, memo } from 'react';
import { Variants } from 'framer-motion';

// ── Sub-components ────────────────────────────────────────────────────────────
import SkillsBackground from '@/components/skills/SkillsBackground';
import SkillsHeader     from '@/components/skills/SkillsHeader';
import CategorySection  from '@/components/skills/CategorySection';

// ── Data & types ──────────────────────────────────────────────────────────────
import { Skill, CATEGORIES } from '@/components/skills/types';

// ─────────────────────────────────────────────────────────────────────────────

interface SkillsSectionProps {
  containerVariants?: Variants;
  itemVariants?:      Variants;
  skillVariants?:     Variants;
  skills:             Skill[];
}

export default memo(function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category — filters against CATEGORIES order so display is always consistent
  const categorizedSkills = useMemo(() =>
    CATEGORIES
      .map(cat => ({ cat, skills: skills.filter(s => s.category === cat.filter) }))
      .filter(({ skills }) => skills.length > 0),
    [skills]
  );

  return (
    <div className="relative py-8">
      {/* ── Ambient blobs ── */}
      <SkillsBackground />

      <div className="relative z-10">
        {/* ── Header ── */}
        <SkillsHeader />

        {/* ── Category sections ── */}
        <div className="space-y-16 sm:space-y-20">
          {categorizedSkills.map(({ cat, skills: catSkills }, i) => (
            <CategorySection
              key={cat.filter}
              category={cat}
              skills={catSkills}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Shimmer keyframe — only needed here since SkillCard uses it */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse, .animate-bounce, .animate-spin { animation: none; }
        }
      `}</style>
    </div>
  );
});