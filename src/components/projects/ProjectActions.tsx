'use client'

import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Play, ArrowUpRight } from 'lucide-react';
import { Project } from './types';

const ProjectActions: React.FC<{ project: Project }> = ({ project }) => {
  const hasDemo  = !!(project.demoLink || project.playStoreLink || project.appStoreLink);
  const demoHref = project.demoLink || project.playStoreLink || project.appStoreLink || '#';

  return (
    <div className="flex flex-col sm:flex-row gap-2.5">

      {/* ── Source Code — ghost border button ── */}
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-1 flex items-center justify-center gap-2 py-3.5 px-5
                   rounded-xl font-semibold text-[13px]
                   text-gray-700 bg-white border border-gray-200
                   transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                   hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50
                   shadow-sm"
        style={{ minHeight: '48px' }}
      >
        <Github size={15} />
        <span>Source Code</span>
        <ArrowUpRight
          size={13}
          className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </Link>

      {/* ── Live Demo — filled purple button matching hero ── */}
      {hasDemo && (
        <Link
          href={demoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 flex items-center justify-center gap-2 py-3.5 px-5
                     rounded-xl font-bold text-[13px] text-white
                     transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:  'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            boxShadow:   '0 6px 22px rgba(124,58,237,0.30)',
            minHeight:   '48px',
          }}
        >
          {project.demoLink ? <ExternalLink size={15} /> : <Play size={15} />}
          <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
          <ArrowUpRight
            size={13}
            className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      )}

    </div>
  );
};

export default ProjectActions;