'use client'

import { memo } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { useIntersectionObserver } from './useIntersectionObserver';

const SkillsHeader = memo(() => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Badge — identical to AboutHeader */}
      <div className="inline-flex items-center gap-2 px-6 py-3
        bg-gradient-to-r from-blue-500/10 to-purple-500/10
        rounded-full border border-blue-200/30 mb-6
        hover:scale-105 hover:from-blue-500/15 hover:to-purple-500/15
        transition-all duration-300 ease-out cursor-pointer">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Technical Expertise</span>
      </div>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold mb-6
        bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
        Skills &amp; Technologies
      </h2>

      {/* Animated expanding lines + spinning star — same as AboutHeader */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <div
          className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full
            transition-all duration-700 ease-out ${isVisible ? 'w-16' : 'w-0'}`}
          style={{ transitionDelay: '300ms' }}
        />
        <div className="animate-spin" style={{ animationDuration: '15s' }}>
          <Star className="w-6 h-6 text-yellow-500 fill-current" />
        </div>
        <div
          className={`h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
            transition-all duration-700 ease-out ${isVisible ? 'w-16' : 'w-0'}`}
          style={{ transitionDelay: '500ms' }}
        />
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light px-4">
        A curated collection of technologies I've mastered through{' '}
        <span className="text-purple-600 font-semibold">hands-on experience</span>{' '}
        and continuous learning.
      </p>
    </div>
  );
});

SkillsHeader.displayName = 'SkillsHeader';
export default SkillsHeader;