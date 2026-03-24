'use client'

import React from 'react';
import { Zap } from 'lucide-react';
import { SectionLabel } from './ProjectDetails';
import { Project } from './types';

const ProjectFeatures: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <section>
      <SectionLabel
        icon={<Zap size={14} className="text-violet-600" />}
        title="Key Features"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
        {project.features.map((feature, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 p-3.5 rounded-xl cursor-default
                       transition-all duration-200 bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600
                       hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:border-violet-200 dark:hover:border-violet-700"
          >
            <span className="text-lg shrink-0 leading-none mt-0.5 group-hover:scale-110 transition-transform">
              {feature.icon}
            </span>
            <div>
              <p className="text-[12.5px] font-semibold text-gray-900 dark:text-slate-100 mb-0.5 leading-tight">
                {feature.title}
              </p>
              <p className="text-[11.5px] text-gray-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectFeatures;