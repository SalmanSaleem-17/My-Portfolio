'use client'

import React from 'react';

// All CSS keyframe animations used across hero sub-components in one place.
// Import and render once inside HeroSection.
const HeroAnimations: React.FC = () => (
  <style jsx>{`
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%       { transform: translateY(-20px) rotate(180deg); }
    }
    @keyframes float-reverse {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%       { transform: translateY(20px) rotate(-180deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px);  opacity: 0.4; }
      50%       { transform: translateY(-30px); opacity: 0.8; }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      from { transform: rotate(360deg); }
      to   { transform: rotate(0deg); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.2; }
      50%       { opacity: 0.4; }
    }
    @keyframes pulse-gentle {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.6; }
    }
    @keyframes bounce-x {
      0%, 100% { transform: translateX(0px); }
      50%       { transform: translateX(3px); }
    }
    @keyframes skill-fade {
      0%   { opacity: 0; transform: translateY(10px); }
      20%  { opacity: 1; transform: translateY(0px);  }
      80%  { opacity: 1; transform: translateY(0px);  }
      100% { opacity: 0; transform: translateY(-10px); }
    }

    .animate-float-slow    { animation: float-slow    15s ease-in-out infinite; }
    .animate-float-reverse { animation: float-reverse 15s ease-in-out infinite; }
    .animate-float         { animation: float          6s ease-in-out infinite; }
    .animate-spin-slow     { animation: spin-slow     20s linear     infinite; }
    .animate-spin-reverse  { animation: spin-reverse  25s linear     infinite; }
    .animate-pulse-slow    { animation: pulse-slow     6s ease-in-out infinite; }
    .animate-pulse-gentle  { animation: pulse-gentle   4s ease-in-out infinite; }
    .animate-bounce-x      { animation: bounce-x       1.5s ease-in-out infinite; }
    .animate-skill-fade    { animation: skill-fade     2.5s ease-in-out infinite; }
  `}</style>
);

export default HeroAnimations;