'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Variants } from 'framer-motion';

// ── Sub-components ────────────────────────────────────────────────────────────
import HeroBackground  from '@/components/hero/HeroBackground';
import ProfileImage    from '@/components/hero/ProfileImage';
import SkillBadge      from '@/components/hero/SkillBadge';
import RoleTags        from '@/components/hero/RoleTags';
import ContactInfo     from '@/components/hero/ContactInfo';
import HeroCTAButtons  from '@/components/hero/HeroCTAButtons';
// ── Data ──────────────────────────────────────────────────────────────────────
import { SKILLS } from '@/components/hero/types';

// ─────────────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  containerVariants?: Variants;
  itemVariants?: Variants;
}

// Custom intersection-observer hook
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return isVisible;
};

// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection({}: HeroSectionProps) {
  const [skillIndex, setSkillIndex] = useState(0);
  const [isLoaded,   setIsLoaded]   = useState(false);
  const [isMounted,  setIsMounted]  = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible  = useIntersectionObserver(sectionRef);

  // Mount + load flags
  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Rotate skill badge
  const rotateSkill = useCallback(() => {
    setSkillIndex(prev => (prev + 1) % SKILLS.length);
  }, []);
  useEffect(() => {
    const id = setInterval(rotateSkill, 2500);
    return () => clearInterval(id);
  }, [rotateSkill]);

  // Reusable fade-in class helper
  const fadeIn = (loaded: boolean, delay = '0ms') =>
    `transform transition-all duration-700 ease-out
     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <>
      <section
        ref={sectionRef}

        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden pt-28"
      >
        {/* ── Background blobs + particles ── */}
        <HeroBackground isVisible={isVisible} isMounted={isMounted} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* ════════════════════════════════════════
              MOBILE layout (< lg)
          ════════════════════════════════════════ */}
          <div className="block lg:hidden text-center">

            {/* Profile image */}
            <div
              className={`mb-12 ${fadeIn(isLoaded)}`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="relative inline-block">
                <ProfileImage isLoaded={isLoaded} isMobile />
              </div>
            </div>

            {/* Name */}
            <div className={fadeIn(isLoaded, '300ms')} style={{ transitionDelay: '300ms' }}>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent whitespace-nowrap">
                Salman Saleem
              </h1>
            </div>

            {/* Rotating skill badge */}
            <div className={`mb-8 ${fadeIn(isLoaded, '400ms')}`} style={{ transitionDelay: '400ms' }}>
              <SkillBadge currentIndex={skillIndex} isMobile />
            </div>

            {/* Role tags */}
            <div className={fadeIn(isLoaded, '500ms')} style={{ transitionDelay: '500ms' }}>
              <RoleTags isMobile />
            </div>

            {/* Bio */}
            <p
              className={`text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-medium ${fadeIn(isLoaded, '600ms')}`}
              style={{ transitionDelay: '600ms' }}
            >
              Passionate Computer Science graduate specializing in{' '}
              <span className="text-purple-700 font-semibold">MERN Stack development</span>.
              I create elegant, scalable solutions with expertise in{' '}
              <span className="text-blue-700 font-semibold">React.js, Node.js, and MongoDB</span>.
            </p>

            {/* Contact pills */}
            <div className={fadeIn(isLoaded, '700ms')} style={{ transitionDelay: '700ms' }}>
              <ContactInfo isMobile />
            </div>

            {/* CTA buttons */}
            <div className={fadeIn(isLoaded, '800ms')} style={{ transitionDelay: '800ms' }}>
              <HeroCTAButtons isMobile />
            </div>
          </div>

          {/* ════════════════════════════════════════
              DESKTOP layout (≥ lg)
          ════════════════════════════════════════ */}
          <div className="hidden lg:flex items-center gap-16 xl:gap-24">

            {/* Left — profile image */}
            <div
              className={`flex-1 flex justify-center
                transform transition-all duration-800 ease-out
                ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
              <ProfileImage isLoaded={isLoaded} />
            </div>

            {/* Right — content */}
            <div
              className={`flex-1 text-left
                transform transition-all duration-800 ease-out
                ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Name */}
              <div className={fadeIn(isLoaded, '400ms')} style={{ transitionDelay: '400ms' }}>
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent whitespace-nowrap">
                  Salman Saleem
                </h1>
              </div>

              {/* Rotating skill badge */}
              <div className={`mb-8 ${fadeIn(isLoaded, '500ms')}`} style={{ transitionDelay: '500ms' }}>
                <SkillBadge currentIndex={skillIndex} />
              </div>

              {/* Role tags */}
              <div className={fadeIn(isLoaded, '600ms')} style={{ transitionDelay: '600ms' }}>
                <RoleTags />
              </div>

              {/* Bio */}
              <p
                className={`text-xl text-gray-700 mb-10 leading-relaxed font-medium ${fadeIn(isLoaded, '700ms')}`}
                style={{ transitionDelay: '700ms' }}
              >
                Passionate Computer Science graduate specializing in{' '}
                <span className="text-purple-700 font-semibold">MERN Stack development</span>.
                I create elegant, scalable solutions with expertise in{' '}
                <span className="text-blue-700 font-semibold">React.js, Node.js, and MongoDB</span>.
                Successfully built production-grade applications including e-commerce platforms.
              </p>

              {/* Contact pills */}
              <div className={fadeIn(isLoaded, '800ms')} style={{ transitionDelay: '800ms' }}>
                <ContactInfo />
              </div>

              {/* CTA buttons */}
              <div className={fadeIn(isLoaded, '900ms')} style={{ transitionDelay: '900ms' }}>
                <HeroCTAButtons />
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}