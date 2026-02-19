// src/app/page.tsx
'use client'

import { projects } from "@/utils/data";
import { skills } from "@/utils/skillsData";
import { containerVariants, itemVariants, skillVariants } from "@/utils/animations";

import HeroSection     from "@/components/HeroSection";
import AboutSection    from "@/components/AboutSection";
import SkillsSection   from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection  from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* ── Hero — full bleed ── */}
      <section id="home">
        <HeroSection
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
      </section>

      <div className="container mx-auto px-6 pb-20 space-y-24">

        <section id="about">
          <AboutSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </section>

        <section id="skills">
          <SkillsSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            skillVariants={skillVariants}
            skills={skills}
          />
        </section>

        <section id="projects">
          <ProjectsSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            projects={projects}
          />
        </section>

        <section id="contact">
          <ContactSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </section>

      </div>
    </div>
  );
}