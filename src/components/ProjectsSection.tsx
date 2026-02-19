'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';

// ── Sub-components (all live in src/components/projects/) ─────────────────────
import SectionBadge from '@/components/projects/SectionBadge';
import ProjectCard  from '@/components/projects/ProjectCard';

// ── Shared Project type ────────────────────────────────────────────────────────
import type { Project } from '@/components/projects/types';

// ─────────────────────────────────────────────────────────────────────────────

interface ProjectsSectionProps {
  containerVariants: Variants;
  itemVariants:      Variants;
  projects:          Project[];
}

// ─────────────────────────────────────────────────────────────────────────────

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  containerVariants,
  itemVariants,
  projects,
}) => {
  return (
    <div className="relative w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="space-y-6 lg:space-y-10"
      >
        {/* ── Section heading ───────────────────────────────────────────────── */}
        <SectionBadge
          label="Featured Projects"
          title="My Work"
          description="Innovative applications and digital solutions that solve real-world problems through thoughtful design and modern engineering."
          itemVariants={itemVariants}
        />

        {/* ── One ProjectCard per entry in data.ts ──────────────────────────── */}
        <motion.div variants={containerVariants} className="space-y-8 lg:space-y-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;