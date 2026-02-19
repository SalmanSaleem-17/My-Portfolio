'use client'

import { useEffect, useRef, useState } from 'react';
import { Variants } from 'framer-motion';

import AboutBackground from '@/components/about/AboutBackground';
import AboutHeader     from '@/components/about/AboutHeader';
import JourneyCard     from '@/components/about/JourneyCard';
import EducationCard   from '@/components/about/EducationCard';
import StrengthsCard   from '@/components/about/StrengthsCard';

interface AboutSectionProps {
  containerVariants?: Variants;
  itemVariants?: Variants;
}

export default function AboutSection({}: AboutSectionProps) {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headerVisible,  setHeaderVisible]  = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          setTimeout(() => setHeaderVisible(true),  100);
          setTimeout(() => setContentVisible(true), 300);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    /*
      overflow-x: clip on the outer wrapper contains the background blobs
      horizontally WITHOUT creating a scroll container (safe for scrollbar-gutter).
      overflow-y is left untouched so vertical layout flows naturally.
    */
    <div className="relative py-8" style={{ overflowX: 'clip' }}>
      <AboutBackground />

      <section
        ref={sectionRef}
        className={`max-w-6xl mx-auto relative z-10 transition-all duration-700 ease-out
          ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <AboutHeader headerVisible={headerVisible} />

        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out
            ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <JourneyCard />

          <div className="space-y-6">
            <EducationCard />
            <StrengthsCard />
          </div>
        </div>
      </section>
    </div>
  );
}