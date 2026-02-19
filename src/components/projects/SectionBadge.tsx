'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionBadgeProps {
  label: string;
  title: string;
  description: string;
  itemVariants: Variants;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ label, title, description, itemVariants }) => {
  const words     = title.trim().split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <motion.div variants={itemVariants} className="text-center space-y-5 mb-16">

      {/* Pill badge — violet tint matching hero */}
      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                      border border-violet-400/30 bg-violet-50 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-violet-600 font-semibold text-[11px] tracking-[0.18em] uppercase">
          {label}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
      </div>

      {/* Main title */}
      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
        <span className="text-gray-900">{firstWord}</span>
        {restWords && (
          <>
            {' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {restWords}
            </span>
          </>
        )}
      </h2>

      {/* Decorative rule — violet */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-violet-400/60" />
        <div className="w-2 h-2 rotate-45 bg-violet-400/80" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-violet-400/60" />
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light px-4">
        {description}
      </p>

    </motion.div>
  );
};

export default SectionBadge;