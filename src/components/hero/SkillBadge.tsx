'use client'

import React from 'react';
import { Sparkles } from 'lucide-react';
import { SKILLS } from './types';

interface SkillBadgeProps {
  currentIndex: number;
  isMobile?: boolean;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ currentIndex, isMobile = false }) => {
  const skill = SKILLS[currentIndex];
  const Icon  = skill.icon;

  return (
    <div className={`h-16 flex items-center ${isMobile ? 'justify-center' : 'justify-start'}`}>
      <div
        key={currentIndex}
        className={`rounded-2xl font-bold
          bg-linear-to-r ${skill.bg} dark:from-slate-700/90 dark:to-slate-800/90
          border border-white/20 dark:border-slate-600/60 shadow-lg backdrop-blur-sm
          transform transition-all duration-500 ease-out animate-skill-fade
          ${isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'}`}
      >
        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
          <Icon
            className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} transition-transform duration-300 hover:scale-110`}
            style={{ color: skill.color }}
          />
          <span className="text-gray-800 dark:text-slate-100">{skill.name}</span>
          <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-purple-600 dark:text-purple-400`} />
        </div>
      </div>
    </div>
  );
};

export default SkillBadge;