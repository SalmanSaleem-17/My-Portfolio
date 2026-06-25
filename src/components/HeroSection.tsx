'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Phone, Mail } from 'lucide-react';

import HeroBackground  from '@/components/hero/HeroBackground';
import ProfileImage    from '@/components/hero/ProfileImage';
import HeroCTAButtons  from '@/components/hero/HeroCTAButtons';
import TechStackBar    from '@/components/hero/TechStackBar';

// ─────────────────────────────────────────────────────────────────────────────

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

export default function HeroSection() {
  const [isLoaded,  setIsLoaded]  = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible  = useIntersectionObserver(sectionRef);

  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (loaded: boolean) =>
    `transform transition-all duration-700 ease-out ${
      loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`;

  return (
    <section
      id="home"
      aria-label="Home"
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen flex flex-col lg:justify-center px-6 pt-24 pb-8 lg:pb-36 overflow-hidden"
    >
      <HeroBackground isVisible={isVisible} isMounted={isMounted} />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">

        {/* ════════════════════════════════════════
            MOBILE layout (< lg)
        ════════════════════════════════════════ */}
        <div className="block lg:hidden text-center py-6">

          {/* Profile image */}
          <div className={`mb-5 ${fadeIn(isLoaded)}`}>
            <ProfileImage isLoaded={isLoaded} isMobile />
          </div>

          {/* Contact card */}
          <div className={`mb-5 delay-100 ${fadeIn(isLoaded)}`}>
            <div className="pf-mobile-card inline-flex flex-col gap-2 px-5 py-3 rounded-2xl border border-slate-700/60 backdrop-blur-md shadow-xl text-left">
              <a href="https://maps.app.goo.gl/7MJA2pzditj94aek6" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:opacity-75 transition-opacity">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-sm text-white/90">Lahore, Punjab, Pakistan</span>
              </a>
              <a href="tel:+923456501771" className="flex items-center gap-2.5 hover:opacity-75 transition-opacity">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-sm text-white/90">0345-6501771</span>
              </a>
              <a href="mailto:contact@salmansaleem.dev" className="flex items-center gap-2.5 hover:opacity-75 transition-opacity">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-sm text-white/90">contact@salmansaleem.dev</span>
              </a>
            </div>
          </div>

          {/* Hello badge */}
          <div className={`mb-3 delay-200 ${fadeIn(isLoaded)}`}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
              bg-white/80 dark:bg-slate-800/60
              border border-purple-200 dark:border-slate-600/60
              text-slate-700 dark:text-white/90
              shadow-sm text-sm font-medium">
              👋 Hello, I&apos;m
            </span>
          </div>

          {/* Name */}
          <div className={`mb-3 delay-300 ${fadeIn(isLoaded)}`}>
            <h1 className="font-extrabold leading-tight whitespace-nowrap">
              <span className="text-[2.4rem] sm:text-5xl text-gray-900 dark:text-white">Salman </span>
              <span className="text-[2.4rem] sm:text-5xl bg-linear-to-r from-purple-500 via-violet-400 to-purple-400 bg-clip-text text-transparent">Saleem</span>
            </h1>
          </div>

          {/* Role */}
          <div className={`flex items-center justify-center gap-2 mb-4 delay-400 ${fadeIn(isLoaded)}`}>
            <span className="text-gray-400 font-mono">&lt;&gt;</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">React.js Developer</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          {/* Bio */}
          <p className={`text-base text-gray-600 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed delay-500 ${fadeIn(isLoaded)}`}>
            Passionate CS graduate specializing in{' '}
            <span className="text-purple-600 dark:text-purple-400 font-medium">MERN Stack development</span>.
            Expertise in{' '}
            <span className="text-blue-600 dark:text-blue-400 font-medium">React.js, Node.js &amp; MongoDB</span>.
          </p>

          {/* CTA buttons */}
          <div className={`delay-600 ${fadeIn(isLoaded)}`}>
            <HeroCTAButtons isMobile />
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP layout (≥ lg)
        ════════════════════════════════════════ */}
        <div className="hidden lg:flex items-center gap-10 xl:gap-16 py-4">

          {/* Left — content */}
          <div
            className={`flex-1 text-left transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            {/* Hello badge */}
            <div className={`mb-6 delay-100 ${fadeIn(isLoaded)}`}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-white/80 dark:bg-slate-800/60
                border border-purple-200 dark:border-slate-600/60
                text-slate-700 dark:text-white/90
                shadow-sm text-sm font-medium">
                👋 Hello, I&apos;m
              </span>
            </div>

            {/* Single-row name */}
            <div className={`mb-6 delay-200 ${fadeIn(isLoaded)}`}>
              <h1 className="font-extrabold leading-tight whitespace-nowrap">
                <span className="text-5xl xl:text-6xl text-gray-900 dark:text-white">Salman </span>
                <span className="text-5xl xl:text-6xl bg-linear-to-r from-purple-500 via-violet-400 to-purple-400 bg-clip-text text-transparent">Saleem</span>
              </h1>
            </div>

            {/* Role */}
            <div className={`flex items-center gap-3 mb-6 delay-300 ${fadeIn(isLoaded)}`}>
              <span className="text-gray-400 font-mono text-xl">&lt;&gt;</span>
              <span className="text-xl font-bold text-gray-800 dark:text-white">React.js Developer</span>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>

            {/* Bio */}
            <p className={`text-base lg:text-lg xl:text-xl text-gray-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg delay-400 ${fadeIn(isLoaded)}`}>
              Passionate Computer Science graduate specializing in{' '}
              <span className="text-purple-600 dark:text-purple-400 font-medium">MERN Stack development</span>.
              I create elegant, scalable solutions with expertise in{' '}
              <span className="text-blue-600 dark:text-blue-400 font-medium">React.js, Node.js, and MongoDB</span>.
              Successfully built production-grade applications including e-commerce platforms.
            </p>

            {/* CTA */}
            <div className={`delay-500 ${fadeIn(isLoaded)}`}>
              <HeroCTAButtons />
            </div>
          </div>

          {/* Right — profile image */}
          <div
            className={`flex-1 flex justify-center items-center delay-200
              transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <ProfileImage isLoaded={isLoaded} />
          </div>
        </div>
      </div>

      {/* Tech stack bar — desktop only, pinned to section bottom */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-10">
        <TechStackBar />
      </div>
    </section>
  );
}
