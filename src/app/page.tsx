'use client'

import { projects } from "@/utils/data";
import { skills } from "@/utils/skillsData";
import { containerVariants, itemVariants, skillVariants } from "@/utils/animations";

// Import new components
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <HeroSection 
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <div className="container mx-auto px-6 space-y-32 pb-20">
        {/* About Section */}
        <AboutSection 
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        {/* Skills Section */}
        <SkillsSection 
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          skillVariants={skillVariants}
          skills={skills}
        />

        {/* Projects Section */}
        <ProjectsSection 
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          projects={projects}
        />

        {/* Contact Section */}
        <ContactSection 
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
      </div>
    </main>
  );
}