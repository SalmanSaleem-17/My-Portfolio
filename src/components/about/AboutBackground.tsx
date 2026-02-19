'use client'

import { memo } from 'react';

const AboutBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl opacity-60 animate-pulse" />
    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/15 to-orange-400/15 rounded-full blur-xl opacity-60 animate-pulse"
      style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400/8 to-cyan-400/8 rounded-full blur-2xl opacity-60 animate-pulse"
      style={{ animationDelay: '2s' }} />
  </div>
));

AboutBackground.displayName = 'AboutBackground';
export default AboutBackground;