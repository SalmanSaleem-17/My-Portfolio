'use client'

import React from 'react';
import { Star, Target, Lightbulb } from 'lucide-react';
import ProjectFeatures from './ProjectFeatures';
import ProjectTechStack from './ProjectTechStack';
import ProjectActions from './ProjectActions';
import { Project } from './types';

/* ── Shared section label — exported for sub-components ── */
export const SectionLabel: React.FC<{
  icon: React.ReactNode;
  title: string;
}> = ({ icon, title }) => (
  <div className="flex items-center gap-2.5">
    <div className="p-1.5 rounded-lg flex-shrink-0 bg-violet-100 border border-violet-200">
      {icon}
    </div>
    <span className="text-[15px] font-bold text-gray-900 tracking-tight">{title}</span>
  </div>
);

const ProjectDetails: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="flex flex-col overflow-hidden h-full bg-white">

      {/* ── Scrollable body ── */}
      <div
        className="flex-1 min-h-0 overflow-y-auto px-6 py-6 lg:px-8 lg:py-7 xl:px-10 xl:py-8 space-y-7"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Overview — left violet accent bar */}
        <p
          className="text-[13.5px] text-gray-600 leading-[1.78] pl-4 border-l-2 border-violet-300"
        >
          {project.longDescription}
        </p>

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-red-50 border border-red-100">
            <div className="flex items-center gap-2 mb-2.5">
              <Target size={13} className="text-red-500 flex-shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-500">Problem</span>
            </div>
            <p className="text-[12px] text-gray-600 leading-relaxed">{project.problemStatement}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2.5">
              <Lightbulb size={13} className="text-emerald-600 flex-shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">Solution</span>
            </div>
            <p className="text-[12px] text-gray-600 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Achievements */}
        <section>
          <SectionLabel
            icon={<Star size={14} className="text-violet-600" />}
            title="Achievements"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            {project.achievements.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-violet-50 border border-violet-100"
              >
                <span className="text-[10px] mt-0.5 flex-shrink-0 text-violet-500">◆</span>
                <span className="text-[12px] text-gray-700 leading-relaxed">{a}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <ProjectFeatures project={project} />

        {/* Tech Stack */}
        <ProjectTechStack project={project} />

        {/* Breathing room */}
        <div className="h-4" />
      </div>

      {/* Scroll fade */}
      <div
        className="flex-shrink-0 h-7 pointer-events-none -mt-7"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
      />

      {/* ── Sticky CTA ── */}
      <div className="flex-shrink-0 px-6 pb-5 pt-3 lg:px-8 lg:pb-6 border-t border-gray-100">
        <ProjectActions project={project} />
      </div>
    </div>
  );
};

export default ProjectDetails;