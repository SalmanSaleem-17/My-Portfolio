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
                       transition-all duration-200 bg-gray-50 border border-gray-100
                       hover:bg-violet-50 hover:border-violet-200"
          >
            <span className="text-lg flex-shrink-0 leading-none mt-0.5 group-hover:scale-110 transition-transform">
              {feature.icon}
            </span>
            <div>
              <p className="text-[12.5px] font-semibold text-gray-900 mb-0.5 leading-tight">
                {feature.title}
              </p>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
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