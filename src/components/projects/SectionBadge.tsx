'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface SectionBadgeProps {
  label: string;
  title: string;
  description: string;
  itemVariants: Variants;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ label, title, description, itemVariants }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setIsVisible(true), 100); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div ref={ref} variants={itemVariants} className="text-center mb-16 space-y-0">

      {/* Badge — matches AboutHeader exactly */}
      <div className="inline-flex items-center gap-2 px-6 py-3
        bg-gradient-to-r from-blue-500/10 to-purple-500/10
        rounded-full border border-blue-200/30 mb-6
        hover:scale-105 hover:from-blue-500/15 hover:to-purple-500/15
        transition-all duration-300 ease-out cursor-pointer">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>

      {/* Title — matches AboutHeader font size + gradient */}
      <h2 className="text-4xl md:text-5xl font-bold mb-6
        bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* Animated expanding lines + spinning star — identical to AboutHeader */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <div
          className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out
            ${isVisible ? 'w-16' : 'w-0'}`}
          style={{ transitionDelay: '300ms' }}
        />
        <div className="animate-spin" style={{ animationDuration: '15s' }}>
          <Star className="w-6 h-6 text-yellow-500 fill-current" />
        </div>
        <div
          className={`h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out
            ${isVisible ? 'w-16' : 'w-0'}`}
          style={{ transitionDelay: '500ms' }}
        />
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light px-4">
        {description}
      </p>

    </motion.div>
  );
};

export default SectionBadge;