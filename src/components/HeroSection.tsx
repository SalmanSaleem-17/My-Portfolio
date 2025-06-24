// src/components/HeroSection.tsx
'use client'

import React from 'react'; 
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { 
  Mail, 
  Download, 
  MapPin, 
  Phone, 
  Code, 
  Briefcase, 
  GraduationCap,
  Database,
  Server,
  Palette,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Star,
  Sparkles
} from "lucide-react";
import { Variants } from "framer-motion";

interface HeroSectionProps {
  containerVariants?: Variants;
  itemVariants?: Variants;
}

// Custom hook for intersection observer
const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return isVisible;
};

export default function HeroSection({}: HeroSectionProps) {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  // Fix hydration mismatch by ensuring client-side only rendering for random elements
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoize skills data to prevent re-renders
  const skillsWithIcons = useMemo(() => [
    { name: "React.js Developer", icon: Code, color: "#61DAFB", bg: "from-cyan-100 to-blue-100" },
    { name: "Full-Stack MERN", icon: Server, color: "#47A248", bg: "from-green-100 to-emerald-100" },
    { name: "Node.js & Express", icon: Database, color: "#339933", bg: "from-green-100 to-lime-100" },
    { name: "MongoDB Expert", icon: Database, color: "#47A248", bg: "from-emerald-100 to-teal-100" },
    { name: "React Native", icon: Smartphone, color: "#61DAFB", bg: "from-blue-100 to-indigo-100" },
    { name: "JWT Authentication", icon: Shield, color: "#000000", bg: "from-gray-100 to-slate-100" },
    { name: "Socket.io Real-time", icon: Zap, color: "#010101", bg: "from-yellow-100 to-orange-100" },
    { name: "UI/UX Design", icon: Palette, color: "#06B6D4", bg: "from-purple-100 to-pink-100" },
    { name: "REST API Development", icon: Globe, color: "#FF6C37", bg: "from-orange-100 to-red-100" },
    { name: "Data Warehousing", icon: Database, color: "#4F46E5", bg: "from-indigo-100 to-purple-100" }
  ], []);

  // Memoize floating icons data
  const floatingIcons = useMemo(() => [Code, Database, Globe, Shield, Smartphone, Zap], []);

  // Generate deterministic positions for floating particles to avoid hydration mismatch
  const particlePositions = useMemo(() => [
    { left: 22.6, top: 70.2, delay: 0, duration: 7.8 },
    { left: 37.7, top: 59.8, delay: 2, duration: 8.6 },
    { left: 32.5, top: 39.4, delay: 4, duration: 7.2 }
  ], []);

  // Optimize skill rotation with useCallback
  const rotateSkill = useCallback(() => {
    setCurrentSkillIndex((prev) => (prev + 1) % skillsWithIcons.length);
  }, [skillsWithIcons.length]);

  useEffect(() => {
    const interval = setInterval(rotateSkill, 2500);
    return () => clearInterval(interval);
  }, [rotateSkill]);

  return (
    <>
      <section 
        ref={sectionRef}
        id="home" 
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden pt-28"
      >
        {/* Enhanced Background Elements with CSS animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`
            absolute -top-40 -right-40 w-96 h-96 
            bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200 
            rounded-full mix-blend-multiply filter blur-xl opacity-40
            transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-40' : 'translate-y-10 opacity-0'}
            animate-float-slow
          `} />
          <div className={`
            absolute -bottom-40 -left-40 w-96 h-96 
            bg-gradient-to-tr from-purple-300 via-pink-200 to-rose-200 
            rounded-full mix-blend-multiply filter blur-xl opacity-40
            transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-40' : '-translate-y-10 opacity-0'}
            animate-float-reverse
          `} />
          <div className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-80 h-80 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 
            rounded-full mix-blend-multiply filter blur-2xl opacity-20
            transition-all duration-1000 ease-out
            ${isVisible ? 'scale-100 opacity-20' : 'scale-75 opacity-0'}
            animate-pulse-slow
          `} />

          {/* Fixed floating particles - only render after mount to avoid hydration mismatch */}
          {isMounted && particlePositions.map((particle, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 
                rounded-full opacity-40 animate-float
                transform transition-all duration-500 ease-out
                ${isVisible ? 'opacity-40' : 'opacity-0'}
              `}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                transitionDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Mobile Layout (Centered) */}
          <div className="block lg:hidden text-center">
            <div className={`
              mb-12 transform transition-all duration-800 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <div className="relative inline-block">
                <div className={`
                  relative transform transition-all duration-600 ease-out
                  ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                `}>
                  {/* Aesthetic background design for mobile */}
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-violet-400 opacity-20 animate-spin-slow" />
                  <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-spin-reverse" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 rounded-full opacity-40 blur-sm animate-pulse-gentle" />

                  <div className="relative w-48 h-48 mx-auto">
                    <Image
                      src="/images/profile.jpg"
                      alt="Muhammad Salman Saleem"
                      fill
                      className="rounded-full border-4 border-white shadow-2xl object-cover relative z-10"
                      priority
                      sizes="(max-width: 768px) 192px, 256px"
                    />
                  </div>

                  {/* Floating skill icons */}
                  {floatingIcons.slice(0, 4).map((Icon, i) => {
                    const positions = [
                      { left: '10%', top: '20%' },
                      { right: '10%', top: '20%' },
                      { left: '10%', bottom: '20%' },
                      { right: '10%', bottom: '20%' }
                    ];
                    
                    return (
                      <div
                        key={i}
                        className={`
                          absolute w-8 h-8 bg-white rounded-full shadow-lg 
                          flex items-center justify-center
                          transform transition-all duration-500 ease-out
                          hover:scale-110 cursor-pointer
                          ${isLoaded 
                            ? 'scale-100 opacity-100' 
                            : 'scale-0 opacity-0'
                          }
                        `}
                        style={{
                          ...positions[i],
                          transitionDelay: `${500 + i * 100}ms`
                        }}
                      >
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Content */}
            <div className={`
              transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent whitespace-nowrap">
                Salman Saleem
              </h1>
            </div>

            {/* Skills transition */}
            <div className={`
              mb-8 transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '400ms' }}
            >
              <div className="h-16 flex items-center justify-center">
                <div
                  key={currentSkillIndex}
                  className={`
                    px-6 py-3 rounded-2xl text-base font-bold 
                    bg-gradient-to-r ${skillsWithIcons[currentSkillIndex].bg} 
                    border border-white/20 shadow-lg backdrop-blur-sm
                    transform transition-all duration-500 ease-out
                    animate-skill-fade
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {React.createElement(skillsWithIcons[currentSkillIndex].icon, {
                        className: "w-5 h-5 transition-transform duration-300 hover:scale-110",
                        style: { color: skillsWithIcons[currentSkillIndex].color }
                      })}
                    </div>
                    <span className="text-gray-800">
                      {skillsWithIcons[currentSkillIndex].name}
                    </span>
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile role tags */}
            <div className={`
              transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '500ms' }}
            >
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  { icon: Briefcase, text: "MERN Stack", color: "from-blue-100 to-cyan-100 text-blue-800 border-blue-200" },
                  { icon: GraduationCap, text: "CS Graduate", color: "from-purple-100 to-violet-100 text-purple-800 border-purple-200" },
                  { icon: Star, text: "Full-Stack", color: "from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200" }
                ].map((tag, i) => (
                  <span 
                    key={i}
                    className={`
                      px-4 py-2 bg-gradient-to-r ${tag.color} rounded-full text-sm font-semibold shadow-md
                      transform transition-all duration-300 ease-out
                      hover:scale-105 hover:-translate-y-1 cursor-default
                    `}
                  >
                    <tag.icon className="inline w-3 h-3 mr-1" />
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>

            <p className={`
              text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-medium
              transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '600ms' }}
            >
              Passionate Computer Science graduate specializing in{" "}
              <span className="text-purple-700 font-semibold">MERN Stack development</span>.
              I create elegant, scalable solutions with expertise in{" "}
              <span className="text-blue-700 font-semibold">React.js, Node.js, and MongoDB</span>.
            </p>

            <div className={`
              flex flex-wrap justify-center gap-4 mb-8
              transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '700ms' }}
            >
              {[
                { icon: MapPin, text: "Lahore, Pakistan" },
                { icon: Phone, text: "0345-6501771" }
              ].map((contact, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 text-gray-700 bg-white/80 px-3 py-2 rounded-full shadow-md backdrop-blur-sm text-sm transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                >
                  <contact.icon className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">{contact.text}</span>
                </div>
              ))}
            </div>

            <div className={`
              flex flex-col sm:flex-row justify-center gap-4
              transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '800ms' }}
            >
              <a
                href="mailto:shanisaleem17@gmail.com"
                className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-purple-400 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
                <span className="animate-bounce-x">→</span>
              </a>
              <a
                href="/cv-salman-saleem.pdf"
                download
                className="bg-white text-purple-700 border-2 border-purple-300 px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-purple-50 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Desktop Layout (Left-Right) */}
          <div className="hidden lg:flex items-center gap-16 xl:gap-24">
            {/* Left Side - Image */}
            <div className={`
              flex-1 flex justify-center
              transform transition-all duration-800 ease-out
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}>
              <div className="relative">
                <div className={`
                  relative transform transition-all duration-600 ease-out
                  ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                `}>
                  {/* Enhanced Aesthetic Background Design */}
                  <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-violet-300 opacity-15 animate-spin-slow" />
                  <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-20 animate-spin-reverse" />
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-bl from-violet-300 via-purple-300 to-indigo-300 opacity-25 animate-float-slow" />
                  <div className="absolute -inset-6 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 rounded-full opacity-30 blur-md animate-pulse-gentle" />
                  
                  {/* Geometric shapes */}
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg opacity-20 animate-float rotate-45" />
                  <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-tr from-blue-400 to-violet-400 rounded-full opacity-25 animate-float-reverse" />
                  <div className="absolute top-1/2 -left-12 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-30 animate-pulse-slow" />
                  <div className="absolute top-1/4 -right-12 w-10 h-10 bg-gradient-to-l from-violet-400 to-blue-400 rounded-lg opacity-20 animate-float rotate-12" />

                  <div className="relative w-64 h-64 xl:w-80 xl:h-80">
                    <Image
                      src="/images/profile.jpg"
                      alt="Muhammad Salman Saleem"
                      fill
                      className="rounded-full border-6 border-white shadow-2xl object-cover relative z-10"
                      priority
                      sizes="(max-width: 1280px) 256px, 320px"
                    />
                  </div>

                  {/* Enhanced floating skill icons */}
                  {floatingIcons.map((Icon, i) => {
                    const positions = [
                      { left: '-5%', top: '15%' },
                      { right: '-5%', top: '15%' },
                      { left: '-5%', bottom: '15%' },
                      { right: '-5%', bottom: '15%' },
                      { left: '50%', top: '-5%', transform: 'translateX(-50%)' },
                      { left: '50%', bottom: '-5%', transform: 'translateX(-50%)' }
                    ];
                    
                    return (
                      <div
                        key={i}
                        className={`
                          absolute w-12 h-12 bg-white rounded-full shadow-lg 
                          flex items-center justify-center border-2 border-purple-100
                          transform transition-all duration-500 ease-out
                          hover:scale-125 hover:rotate-12 cursor-pointer
                          ${isLoaded 
                            ? 'scale-100 opacity-100' 
                            : 'scale-0 opacity-0'
                          }
                        `}
                        style={{
                          ...positions[i],
                          transitionDelay: `${800 + i * 100}ms`
                        }}
                      >
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`
              flex-1 text-left
              transform transition-all duration-800 ease-out
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
              <div className={`
                transform transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '400ms' }}
              >
                <h1 className="text-6xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent whitespace-nowrap">
                  Salman Saleem
                </h1>
              </div>

              {/* Skills Transition */}
              <div className={`
                mb-8 transform transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '500ms' }}
              >
                <div className="h-16 flex items-center">
                  <div
                    key={currentSkillIndex}
                    className={`
                      px-8 py-4 rounded-2xl text-lg font-bold 
                      bg-gradient-to-r ${skillsWithIcons[currentSkillIndex].bg} 
                      border border-white/20 shadow-lg backdrop-blur-sm
                      transform transition-all duration-500 ease-out
                      animate-skill-fade
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {React.createElement(skillsWithIcons[currentSkillIndex].icon, {
                          className: "w-6 h-6 transition-transform duration-300 hover:scale-110",
                          style: { color: skillsWithIcons[currentSkillIndex].color }
                        })}
                      </div>
                      <span className="text-gray-800">
                        {skillsWithIcons[currentSkillIndex].name}
                      </span>
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Tags */}
              <div className={`
                transform transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '600ms' }}
              >
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { icon: Briefcase, text: "MERN Stack Developer", color: "from-blue-100 to-cyan-100 text-blue-800 border-blue-200" },
                    { icon: GraduationCap, text: "CS Graduate", color: "from-purple-100 to-violet-100 text-purple-800 border-purple-200" },
                    { icon: Star, text: "Full-Stack Expert", color: "from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200" }
                  ].map((tag, i) => (
                    <span 
                      key={i}
                      className={`
                        px-6 py-3 bg-gradient-to-r ${tag.color} rounded-full text-sm font-semibold shadow-md
                        transform transition-all duration-300 ease-out
                        hover:scale-105 hover:-translate-y-1 cursor-default
                      `}
                    >
                      <tag.icon className="inline w-4 h-4 mr-2" />
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>

              <p className={`
                text-xl text-gray-700 mb-10 leading-relaxed font-medium
                transform transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '700ms' }}
              >
                Passionate Computer Science graduate specializing in{" "}
                <span className="text-purple-700 font-semibold">MERN Stack development</span>.
                I create elegant, scalable solutions with expertise in{" "}
                <span className="text-blue-700 font-semibold">React.js, Node.js, and MongoDB</span>.
                Successfully built production-grade applications including e-commerce platforms.
              </p>

              <div className={`
                flex flex-wrap gap-6 mb-10
                transform transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '800ms' }}
              >
                {[
                  { icon: MapPin, text: "Lahore, Punjab, Pakistan" },
                  { icon: Phone, text: "0345-6501771" }
                ].map((contact, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 text-gray-700 bg-white/80 px-4 py-2 rounded-full shadow-md backdrop-blur-sm transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                  >
                    <contact.icon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{contact.text}</span>
                  </div>
                ))}
              </div>

              <div className={`
                flex gap-6
                transform transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '900ms' }}
              >
                <a
                  href="mailto:shanisaleem17@gmail.com"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 border border-purple-400 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                  <span className="animate-bounce-x">→</span>
                </a>
                <a
                  href="/cv-salman-saleem.pdf"
                  download
                  className="bg-white text-purple-700 border-2 border-purple-300 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 hover:bg-purple-50 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-30px); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(3px); }
        }
        @keyframes skill-fade {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0px); }
          80% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 15s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .animate-bounce-x {
          animation: bounce-x 1.5s ease-in-out infinite;
        }
        
        .animate-skill-fade {
          animation: skill-fade 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}