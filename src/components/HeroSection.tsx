'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Phone, Mail, Smartphone, ExternalLink } from 'lucide-react';

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
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible  = useIntersectionObserver(sectionRef);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pure-CSS entrance: elements carry the `hero-rise` class and are visible by
  // default, animating in on paint — never dependent on JS to become visible.
  const delay = (ms: number): React.CSSProperties => ({ animationDelay: `${ms}ms` });

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
          <div className="mb-5 hero-rise">
            <ProfileImage isMobile />
          </div>

          {/* Contact card */}
          <div className="mb-5 hero-rise" style={delay(100)}>
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
          <div className="mb-3 hero-rise" style={delay(200)}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
              bg-white/80 dark:bg-slate-800/60
              border border-purple-200 dark:border-slate-600/60
              text-slate-700 dark:text-white/90
              shadow-sm text-sm font-medium">
              👋 Hello, I&apos;m
            </span>
          </div>

          {/* Name */}
          <div className="mb-3 hero-rise" style={delay(300)}>
            <h1 className="font-extrabold leading-tight whitespace-nowrap">
              <span className="text-[2.4rem] sm:text-5xl text-gray-900 dark:text-white">Salman </span>
              <span className="text-[2.4rem] sm:text-5xl bg-linear-to-r from-purple-500 via-violet-400 to-purple-400 bg-clip-text text-transparent">Saleem</span>
            </h1>
          </div>

          {/* Role */}
          <div className="flex items-center justify-center gap-2 mb-3 hero-rise" style={delay(400)}>
            <span className="text-gray-400 font-mono">&lt;&gt;</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">Web &amp; Mobile App Developer</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          {/* Google Play badge */}
          <div className="mb-4 hero-rise" style={delay(450)}>
            <a
              href="https://play.google.com/store/apps/details?id=com.goldify.pro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Goldify on Google Play — Gold Rate &amp; Converter Android app"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-white/80 dark:bg-slate-800/60
                border border-emerald-200 dark:border-emerald-500/40
                text-slate-700 dark:text-white/90 shadow-sm text-xs font-medium
                hover:border-emerald-400 dark:hover:border-emerald-400/70 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Goldify — live on Google Play</span>
              <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
            </a>
          </div>

          {/* Bio */}
          <p className="text-base text-gray-600 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed hero-rise" style={delay(500)}>
            Passionate CS graduate building{' '}
            <span className="text-purple-600 dark:text-purple-400 font-medium">MERN Stack web apps</span>{' '}
            and{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Android apps</span>{' '}
            shipped to the Play Store.
          </p>

          {/* CTA buttons */}
          <div className="hero-rise" style={delay(600)}>
            <HeroCTAButtons isMobile />
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP layout (≥ lg)
        ════════════════════════════════════════ */}
        <div className="hidden lg:flex items-center gap-10 xl:gap-16 py-4">

          {/* Left — content */}
          <div className="flex-1 text-left">
            {/* Hello badge */}
            <div className="mb-6 hero-rise" style={delay(100)}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-white/80 dark:bg-slate-800/60
                border border-purple-200 dark:border-slate-600/60
                text-slate-700 dark:text-white/90
                shadow-sm text-sm font-medium">
                👋 Hello, I&apos;m
              </span>
            </div>

            {/* Single-row name */}
            <div className="mb-6 hero-rise" style={delay(200)}>
              <h1 className="font-extrabold leading-tight whitespace-nowrap">
                <span className="text-5xl xl:text-6xl text-gray-900 dark:text-white">Salman </span>
                <span className="text-5xl xl:text-6xl bg-linear-to-r from-purple-500 via-violet-400 to-purple-400 bg-clip-text text-transparent">Saleem</span>
              </h1>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 mb-4 hero-rise" style={delay(300)}>
              <span className="text-gray-400 font-mono text-xl">&lt;&gt;</span>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Web &amp; Mobile App Developer</span>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>

            {/* Google Play badge */}
            <div className="mb-6 hero-rise" style={delay(350)}>
              <a
                href="https://play.google.com/store/apps/details?id=com.goldify.pro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Goldify on Google Play — Gold Rate &amp; Converter Android app"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                  bg-white/80 dark:bg-slate-800/60
                  border border-emerald-200 dark:border-emerald-500/40
                  text-slate-700 dark:text-white/90 shadow-sm text-sm font-medium
                  hover:border-emerald-400 dark:hover:border-emerald-400/70 transition-colors"
              >
                <Smartphone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Goldify — live on Google Play</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
              </a>
            </div>

            {/* Bio */}
            <p className="text-base lg:text-lg xl:text-xl text-gray-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg hero-rise" style={delay(400)}>
              Passionate Computer Science graduate specializing in{' '}
              <span className="text-purple-600 dark:text-purple-400 font-medium">MERN Stack development</span>{' '}
              and{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Android app development</span>.
              I create elegant, scalable solutions with{' '}
              <span className="text-blue-600 dark:text-blue-400 font-medium">React.js, Node.js, and MongoDB</span>{' '}
              — from production e-commerce platforms to published Play Store apps.
            </p>

            {/* CTA */}
            <div className="hero-rise" style={delay(500)}>
              <HeroCTAButtons />
            </div>
          </div>

          {/* Right — profile image */}
          <div className="flex-1 flex justify-center items-center hero-rise" style={delay(200)}>
            <ProfileImage />
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
