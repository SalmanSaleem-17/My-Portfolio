'use client'

import React from 'react';
import {
  SiReact, SiNodedotjs, SiMongodb,
  SiExpress, SiNextdotjs, SiJavascript,
} from 'react-icons/si';

const STACK = [
  { name: 'React.js',   category: 'Frontend',  Icon: SiReact,      color: '#61DAFB' },
  { name: 'Node.js',    category: 'Backend',   Icon: SiNodedotjs,  color: '#339933' },
  { name: 'MongoDB',    category: 'Database',  Icon: SiMongodb,    color: '#47A248' },
  { name: 'Express.js', category: 'Backend',   Icon: SiExpress,    color: '#888888' },
  { name: 'Next.js',    category: 'Framework', Icon: SiNextdotjs,  color: '#888888' },
  { name: 'JavaScript', category: 'Language',  Icon: SiJavascript, color: '#F7DF1E' },
];

export default function TechStackBar() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-6">
      <div className="
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-md
        border border-slate-200/80 dark:border-slate-700/50
        rounded-2xl px-8 py-5
        shadow-lg dark:shadow-none
      ">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {STACK.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <item.Icon className="w-9 h-9 shrink-0" color={item.color} />
              <div>
                <p className="text-slate-800 dark:text-white font-semibold text-sm leading-tight">{item.name}</p>
                <p className="text-slate-500 dark:text-gray-400 text-xs leading-tight">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
