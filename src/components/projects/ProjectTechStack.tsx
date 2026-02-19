'use client'

import React from 'react';
import { Code2 } from 'lucide-react';
import { SectionLabel } from './ProjectDetails';
import { Project } from './types';

const ProjectTechStack: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <section>
      <SectionLabel
        icon={<Code2 size={14} className="text-violet-600" />}
        title="Tech Stack"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="text-[11.5px] font-medium px-3 py-1.5 rounded-full cursor-default
                       transition-all duration-200 hover:scale-105
                       text-gray-700 bg-gray-100 border border-gray-200
                       hover:bg-violet-100 hover:border-violet-300 hover:text-violet-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ProjectTechStack;