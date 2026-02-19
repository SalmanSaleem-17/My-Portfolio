'use client'

import { memo, useState, useCallback } from 'react';
import { Skill, SKILL_LEVELS, hexToRgba } from './types';
import { useIntersectionObserver } from './useIntersectionObserver';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, isVisible] = useIntersectionObserver(0.1);
  const level = SKILL_LEVELS[skill.level];

  const onEnter = useCallback(() => setIsHovered(true),  []);
  const onLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
      style={{ transitionDelay: `${index * 40}ms` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className="relative h-full bg-white/90 backdrop-blur-sm border border-white/30
          rounded-2xl sm:rounded-3xl p-4 sm:p-6
          transition-all duration-300 ease-out
          hover:bg-white/95 hover:-translate-y-2 hover:scale-[1.02]"
        style={{
          boxShadow: isHovered
            ? `0 12px 32px ${hexToRgba(skill.color, 0.3)}, 0 4px 16px ${hexToRgba(skill.color, 0.2)}`
            : '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none" />

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center
              shadow-lg transition-all duration-300 ease-out
              ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
            style={{
              background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}35)`,
              boxShadow: isHovered
                ? `0 12px 24px ${hexToRgba(skill.color, 0.3)}, 0 0 0 1px ${hexToRgba(skill.color, 0.2)}`
                : `0 6px 20px ${hexToRgba(skill.color, 0.15)}`,
            }}
          >
            <skill.icon
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
              style={{
                color:   skill.color,
                filter:  isHovered ? 'brightness(1.2) saturate(1.2)' : 'brightness(1)',
              }}
            />
            {/* Pulse ring */}
            {isHovered && (
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl animate-pulse"
                style={{ boxShadow: `0 0 0 3px ${hexToRgba(skill.color, 0.2)}` }}
              />
            )}
          </div>
        </div>

        {/* Name */}
        <h4 className={`font-bold text-gray-800 text-center mb-3 text-sm sm:text-base leading-tight
          transition-all duration-300 ${isHovered ? 'text-gray-900 scale-105' : ''}`}>
          {skill.name}
        </h4>

        {/* Level badge */}
        <div className="flex justify-center mb-3">
          <span
            className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold border-2
              transition-all duration-300
              ${level.textColor} ${level.bgColor} ${level.borderColor}
              ${isHovered ? 'scale-105 shadow-lg' : ''}`}
            style={{ boxShadow: isHovered ? `0 6px 20px ${hexToRgba(skill.color, 0.25)}` : 'none' }}
          >
            {level.label}
          </span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-500">Expertise</span>
            <span className={`text-xs font-bold ${level.textColor}`}>{level.percentage}%</span>
          </div>
          <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${level.barColor} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{
                width:           isVisible ? `${level.percentage}%` : '0%',
                transitionDelay: `${index * 40 + 300}ms`,
              }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* Card glow on hover */}
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: `radial-gradient(circle at center, ${hexToRgba(skill.color, 0.08)}, transparent 70%)` }}
        />
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';
export default SkillCard;