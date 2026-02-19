'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';
import ProjectHeader from './ProjectHeader';
import ProjectDetails from './ProjectDetails';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
  index:   number;
  itemVariants: Variants;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: '#ffffff',
        border:     '1px solid rgba(124,58,237,0.12)',
        boxShadow:  '0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.06)',
      }}
      whileHover={{
        boxShadow: '0 8px 48px rgba(124,58,237,0.15), 0 0 0 1.5px rgba(124,58,237,0.25)',
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Top hairline — purple gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px z-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.55) 45%, rgba(168,85,247,0.55) 55%, transparent 100%)',
        }}
      />

      {/* Mobile → stacked | Desktop → side-by-side, fixed 680px */}
      <div className="flex flex-col lg:flex-row lg:h-[680px]">

        {/* Left panel — 38% */}
        <div className="lg:w-[38%] lg:flex-shrink-0">
          <ProjectHeader project={project} index={index} />
        </div>

        {/* Divider — desktop only */}
        <div className="hidden lg:block w-px flex-shrink-0 self-stretch bg-violet-100" />

        {/* Right panel */}
        <div className="flex-1 min-w-0">
          <ProjectDetails project={project} />
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;