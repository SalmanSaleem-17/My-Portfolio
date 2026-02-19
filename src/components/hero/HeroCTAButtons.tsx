'use client'

import React from 'react';
import { Mail, Download } from 'lucide-react';

interface HeroCTAButtonsProps {
  isMobile?: boolean;
}

const HeroCTAButtons: React.FC<HeroCTAButtonsProps> = ({ isMobile = false }) => {
  return (
    <div className={`flex gap-4 ${isMobile ? 'flex-col sm:flex-row justify-center' : ''}`}>
      {/* Primary — Get In Touch */}
      <a
        href="mailto:shanisaleem17@gmail.com"
        className={`bg-gradient-to-r from-purple-600 to-violet-600 text-white
          rounded-2xl font-bold shadow-xl hover:shadow-2xl
          transition-all duration-300 flex items-center justify-center gap-3
          border border-purple-400
          transform hover:scale-105 hover:-translate-y-1 active:scale-95
          ${isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4'}`}
      >
        <Mail className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
        Get In Touch
        <span className="animate-bounce-x">→</span>
      </a>

      {/* Secondary — Download CV */}
      <a
        href="/CV-SALMAN SALEEM.pdf"
        download
        className={`bg-white text-purple-700 border-2 border-purple-300
          rounded-2xl font-bold shadow-xl hover:shadow-2xl
          transition-all duration-300 flex items-center justify-center gap-3
          hover:bg-purple-50
          transform hover:scale-105 hover:-translate-y-1 active:scale-95
          ${isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4'}`}
      >
        <Download className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
        Download CV
      </a>
    </div>
  );
};

export default HeroCTAButtons;