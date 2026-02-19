'use client'

import React from 'react';
import { PARTICLE_POSITIONS } from './types';

interface HeroBackgroundProps {
  isVisible: boolean;
  isMounted: boolean;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ isVisible, isMounted }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob top-right */}
      <div
        className={`absolute -top-40 -right-40 w-96 h-96
          bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200
          rounded-full mix-blend-multiply filter blur-xl
          transform transition-all duration-1000 ease-out animate-float-slow
          ${isVisible ? 'translate-y-0 opacity-40' : 'translate-y-10 opacity-0'}`}
      />

      {/* Blob bottom-left */}
      <div
        className={`absolute -bottom-40 -left-40 w-96 h-96
          bg-gradient-to-tr from-purple-300 via-pink-200 to-rose-200
          rounded-full mix-blend-multiply filter blur-xl
          transform transition-all duration-1000 ease-out animate-float-reverse
          ${isVisible ? 'translate-y-0 opacity-40' : '-translate-y-10 opacity-0'}`}
      />

      {/* Centre pulse */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-80 h-80 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200
          rounded-full mix-blend-multiply filter blur-2xl
          transition-all duration-1000 ease-out animate-pulse-slow
          ${isVisible ? 'scale-100 opacity-20' : 'scale-75 opacity-0'}`}
      />

      {/* Floating particles — client-only to avoid hydration mismatch */}
      {isMounted && PARTICLE_POSITIONS.map((p, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400
            rounded-full animate-float transform transition-all duration-500 ease-out
            ${isVisible ? 'opacity-40' : 'opacity-0'}`}
          style={{
            left:              `${p.left}%`,
            top:               `${p.top}%`,
            animationDelay:    `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transitionDelay:   `${i * 200}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroBackground;