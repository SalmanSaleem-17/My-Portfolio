'use client'

import React from 'react';
import Link from 'next/link';
import { Mail, FileText } from 'lucide-react';

interface HeroCTAButtonsProps {
  isMobile?: boolean;
}

const HeroCTAButtons: React.FC<HeroCTAButtonsProps> = ({ isMobile = false }) => {
  return (
    <div className={`flex gap-3 ${isMobile ? 'justify-center' : 'gap-4'}`}>
      {/* Primary — Get In Touch */}
      <a
        href="mailto:contact@salmansaleem.dev"
        className={`bg-linear-to-r from-purple-600 to-violet-600 text-white
          rounded-2xl font-bold shadow-xl hover:shadow-2xl
          transition-all duration-300 flex items-center justify-center gap-2
          border border-purple-400
          transform hover:scale-105 hover:-translate-y-1 active:scale-95
          ${isMobile ? 'px-4 py-2.5 text-sm flex-1 min-w-0' : 'px-8 py-4 gap-3'}`}
      >
        <Mail className="w-4 h-4 shrink-0" />
        <span className="truncate">Get In Touch</span>
        {!isMobile && <span className="animate-bounce-x">→</span>}
      </a>

      {/* Secondary — View Resume */}
      <Link
        href="/resume"
        className={`bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-2 border-purple-300 dark:border-purple-500
          rounded-2xl font-bold shadow-xl hover:shadow-2xl
          transition-all duration-300 flex items-center justify-center gap-2
          hover:bg-purple-50 dark:hover:bg-purple-900/30
          transform hover:scale-105 hover:-translate-y-1 active:scale-95
          ${isMobile ? 'px-4 py-2.5 text-sm flex-1 min-w-0' : 'px-8 py-4 gap-3'}`}
      >
        <FileText className="w-4 h-4 shrink-0" />
        <span className="truncate">View Resume</span>
      </Link>
    </div>
  );
};

export default HeroCTAButtons;