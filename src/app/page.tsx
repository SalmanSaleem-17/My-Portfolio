// src/app/page.tsx
'use client'

import { projects } from "@/utils/data";
import { skills } from "@/utils/skillsData";
import { containerVariants, itemVariants, skillVariants } from "@/utils/animations";
import { homePageGraph } from "@/utils/seo";

import JsonLd            from "@/components/JsonLd";
import HeroSection       from "@/components/HeroSection";
import StatsSection      from "@/components/StatsSection";
import AboutSection      from "@/components/AboutSection";
import ServicesSection   from "@/components/ServicesSection";
import SkillsSection     from "@/components/SkillsSection";
import TimelineSection   from "@/components/TimelineSection";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import ProjectsSection   from "@/components/ProjectsSection";
import GithubSection     from "@/components/GithubSection";
import FaqSection        from "@/components/FaqSection";
import ContactSection    from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 dark:from-transparent dark:via-transparent dark:to-transparent">

      {/* ProfilePage structured data — Person as the page's main entity */}
      <JsonLd data={homePageGraph()} />

      {/* ── Hero — full bleed; id lives on HeroSection's own <section> ── */}
      <HeroSection />

      <div className="container mx-auto px-6 pb-20 space-y-24">

        <section id="about" aria-label="About">
          <AboutSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </section>

        <section id="services" aria-label="Services">
          <ServicesSection />
        </section>

        <section id="skills" aria-label="Skills">
          <SkillsSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            skillVariants={skillVariants}
            skills={skills}
          />
        </section>

        <section id="experience" aria-label="Experience and Education">
          <TimelineSection />
        </section>

        {/* ── Impact stats — credibility lead-in right before the work ── */}
        <section aria-label="Impact by the numbers">
          <StatsSection />
        </section>

        <section id="projects" aria-label="Projects" className="space-y-16">
          <FeaturedCaseStudy />
          <ProjectsSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            projects={projects}
          />
        </section>

        <section id="github" aria-label="Open Source">
          <GithubSection />
        </section>

        <section id="faq" aria-label="Frequently Asked Questions">
          <FaqSection />
        </section>

        <section id="contact" aria-label="Contact">
          <ContactSection
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </section>

      </div>
    </div>
  );
}