'use client'

import React from 'react';
import Image from 'next/image';
import { Calendar, Globe, Clock } from 'lucide-react';
import { Project } from './types';

const ProjectHeader: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const stats = [
    { icon: Calendar, label: 'Year',     value: project.year },
    { icon: Globe,    label: 'Platform', value: project.mockupType === 'mobile' ? 'Mobile' : 'Web' },
    { icon: Clock,    label: 'Duration', value: project.duration },
  ];

  const shape = project.imageConfig?.shape ?? 'landscape';

  // Strategy per shape:
  // landscape → full-width container, 16/10 ratio   — image fills width naturally
  // square    → full-width container, 1/1 ratio,
  //             BUT capped at max-h so it doesn't tower on mobile.
  //             We achieve this by capping width via max-w on the wrapper so the
  //             resulting height (= width) stays sane on every breakpoint:
  //             mobile: max-w ~55vw centering in full-width panel
  //             desktop: panel is ~38% of viewport, so max-w-[70%] of that ≈ fine
  // portrait  → 60% width centered, 3/4 ratio

  const containerClass: Record<string, string> = {
    landscape: 'w-full',
    square:    'w-[55%] sm:w-[45%] lg:w-[70%] mx-auto',
    portrait:  'w-[55%] sm:w-[50%] lg:w-[60%] mx-auto',
  };

  const ratioMap: Record<string, string> = {
    landscape: '16 / 10',
    square:    '1 / 1',
    portrait:  '3 / 4',
  };

  return (
    <div
      className="relative flex flex-col overflow-hidden h-full"
      style={{ background: 'linear-gradient(160deg, #faf9ff 0%, #f3f0ff 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 inset-x-0 h-56 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(167,139,250,0.18) 0%, transparent 100%)',
        }}
      />

      {/* Watermark */}
      <span
        className="absolute bottom-3 right-4 text-[6.5rem] font-black leading-none select-none pointer-events-none"
        aria-hidden="true"
        style={{ color: '#7c3aed', opacity: 0.05 }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10 flex flex-col h-full p-6 lg:p-7 xl:p-8 gap-4">

        {/* ── Badges ── */}
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full
                           text-violet-700 bg-violet-100 border border-violet-200">
            {project.category}
          </span>
          <span
            className={[
              'text-[10px] font-semibold px-3 py-1.5 rounded-full border',
              project.status === 'Live Production'
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : project.status === 'Completed'
                ? 'text-sky-700 bg-sky-50 border-sky-200'
                : 'text-amber-700 bg-amber-50 border-amber-200',
            ].join(' ')}
          >
            {project.status === 'Live Production' ? '● Live'
              : project.status === 'Completed'    ? '✓ Completed'
              : '◌ ' + project.status}
          </span>
        </div>

        {/* ── Image ── grows to fill available vertical space on desktop ── */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className={`${containerClass[shape]} flex-shrink-0`}>
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: ratioMap[shape],
                background:  project.imageConfig?.bgColor ?? 'transparent',
                padding:     project.imageConfig?.padding  ?? '0px',
                boxShadow:   '0 12px 36px rgba(124,58,237,0.14), 0 0 0 1px rgba(124,58,237,0.09)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width:640px) 60vw, (max-width:1024px) 50vw, 25vw"
              />
              {/* Violet wash */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ background: 'linear-gradient(130deg, rgba(124,58,237,0.06) 0%, transparent 55%)' }}
              />
            </div>
          </div>
        </div>

        {/* ── Title + subtitle ── */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl xl:text-[1.75rem] font-black text-gray-900 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-[13px] text-gray-500 mt-1 leading-snug line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        {/* ── Stat pills ── */}
        <div className="grid grid-cols-3 gap-2 flex-shrink-0">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl py-3 px-1
                         bg-white border border-violet-100 shadow-sm"
            >
              <Icon size={12} className="text-violet-500" />
              <span className="text-[9px] text-gray-500 uppercase tracking-wider leading-none">
                {label}
              </span>
              <span className="text-[11px] text-gray-800 font-bold leading-none text-center w-full px-1 truncate">
                {value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectHeader;