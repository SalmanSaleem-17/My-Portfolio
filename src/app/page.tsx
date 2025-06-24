// src/app/page.tsx
'use client'

import { projects } from "@/utils/data";
import { skills } from "@/utils/skillsData";
import { containerVariants, itemVariants, skillVariants } from "@/utils/animations";

// Import components
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section - Add id="home" */}
      <section id="home" className="min-h-screen">
        <HeroSection 
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
      </section>

      <div className="container mx-auto px-6 space-y-32 pb-20">
        {/* About Section - Add id="about" */}
        <section id="about" className="min-h-screen flex items-center">
          <div className="w-full">
            <AboutSection 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>
        </section>

        {/* Skills Section - Add id="skills" */}
        <section id="skills" className="min-h-screen flex items-center">
          <div className="w-full">
            <SkillsSection 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
              skillVariants={skillVariants}
              skills={skills}
            />
          </div>
        </section>

        {/* Projects Section - Add id="projects" */}
        <section id="projects" className="min-h-screen flex items-center">
          <div className="w-full">
            <ProjectsSection 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
              projects={projects}
            />
          </div>
        </section>

        {/* Contact Section - Add id="contact" */}
        <section id="contact" className="min-h-screen flex items-center">
          <div className="w-full">
            <ContactSection 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>
        </section>
      </div>
    </main>
  );
}