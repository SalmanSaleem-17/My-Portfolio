'use client'

import { Code2, Zap, Target, Sparkles } from "lucide-react";
import { memo, useMemo, useState, useEffect, useRef } from "react";
import { Variants } from "framer-motion";

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  color: string;
  icon: any;
  category: string;
  years?: number;
}
interface SkillsSectionProps {
  containerVariants?: Variants;
  itemVariants?: Variants;
  skillVariants?: Variants;
  skills: Skill[];
}

// Skill level configurations with percentages for bars
const SKILL_LEVELS = {
  Expert: { 
    percentage: 95,
    label: 'Expert',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    barColor: 'bg-gradient-to-r from-emerald-400 to-emerald-600'
  },
  Advanced: { 
    percentage: 80,
    label: 'Advanced',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    barColor: 'bg-gradient-to-r from-blue-400 to-blue-600'
  },
  Intermediate: { 
    percentage: 65,
    label: 'Intermediate',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    barColor: 'bg-gradient-to-r from-amber-400 to-amber-600'
  }
};

// High-performance skill card with aesthetic design
const SkillCard = memo(({ skill, index }: { skill: Skill; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const levelConfig = SKILL_LEVELS[skill.level];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), index * 50);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, isVisible]);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-500 ease-out will-change-transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-6 scale-95'
      }`}
      style={{ 
        transitionDelay: `${index * 50}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card with glass morphism effect */}
      <div className="relative h-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg transition-all duration-300 ease-out hover:bg-white/95 hover:shadow-2xl hover:border-white/40 hover:-translate-y-2 hover:scale-[1.02] group-hover:shadow-xl">
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
        
        {/* Skill icon with animated container */}
        <div className="relative flex justify-center mb-5">
          <div 
            className={`relative w-18 h-18 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out transform ${
              isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
            }`}
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}35)`,
              boxShadow: isHovered 
                ? `0 20px 40px ${skill.color}30, 0 0 0 1px ${skill.color}20` 
                : `0 8px 25px ${skill.color}15`
            }}
          >
            <skill.icon 
              className={`w-9 h-9 transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{ 
                color: skill.color,
                filter: isHovered ? 'brightness(1.2) saturate(1.2)' : 'brightness(1)'
              }}
            />
            
            {/* Animated ring effect */}
            <div 
              className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                isHovered ? 'animate-pulse' : ''
              }`}
              style={{ 
                boxShadow: isHovered ? `0 0 0 4px ${skill.color}20` : 'none'
              }}
            />
          </div>
        </div>

        {/* Skill name with hover effect */}
        <h4 className={`font-bold text-gray-800 text-center mb-4 transition-all duration-300 ${
          isHovered ? 'text-gray-900 scale-105' : ''
        } text-lg`}>
          {skill.name}
        </h4>

        {/* Level badge with enhanced styling */}
        <div className="flex justify-center mb-4">
          <span className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            levelConfig.textColor
          } ${levelConfig.bgColor} ${levelConfig.borderColor} border-2 ${
            isHovered ? 'scale-105 shadow-lg' : ''
          }`}
          style={{
            boxShadow: isHovered ? `0 8px 25px ${skill.color}25` : 'none'
          }}>
            {levelConfig.label}
          </span>
        </div>

        {/* Expertise level bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500">Expertise</span>
            <span className={`text-xs font-bold ${levelConfig.textColor}`}>
              {levelConfig.percentage}%
            </span>
          </div>
          
          {/* Progress bar container */}
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            {/* Animated progress bar */}
            <div 
              className={`h-full ${levelConfig.barColor} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ 
                width: isVisible ? `${levelConfig.percentage}%` : '0%',
                transitionDelay: `${index * 50 + 300}ms`
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite] group-hover:animate-[shimmer_1s_infinite]" />
            </div>
            
            {/* Glow effect on hover */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isHovered ? 'shadow-inner' : ''
              }`}
              style={{ 
                boxShadow: isHovered ? `inset 0 0 10px ${skill.color}20` : 'none'
              }}
            />
          </div>
        </div>

        {/* Floating orbs effect on hover */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-bounce"
              style={{ 
                background: skill.color,
                left: `${25 + i * 25}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>

        {/* Card glow effect */}
        <div 
          className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: `radial-gradient(circle at center, ${skill.color}08, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

// Category section with smooth animations
const CategorySection = memo(({ 
  category, 
  categorySkills, 
  categoryColor,
  CategoryIcon,
  categoryIndex
}: {
  category: string;
  categorySkills: Skill[];
  categoryColor: string;
  CategoryIcon: any;
  categoryIndex: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), categoryIndex * 200);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [categoryIndex, isVisible]);

  return (
    <div ref={sectionRef} className="space-y-10">
      {/* Category header */}
      <div 
        className={`flex items-center justify-center gap-6 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className={`p-4 bg-gradient-to-r ${categoryColor} rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl`}>
          <CategoryIcon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:scale-105">
          {category}
        </h3>
        <div className={`h-1 bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: isVisible ? '4rem' : '0rem'
          }}
        />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {categorySkills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

CategorySection.displayName = 'CategorySection';

export default memo(function SkillsSection({ skills }: SkillsSectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !headerVisible) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, [headerVisible]);

  // Organize skills by category
  const categorizedSkills = useMemo(() => {
    return [
      { 
        name: "Frontend Development", 
        color: "from-blue-500 to-cyan-500", 
        icon: Code2,
        skills: skills.filter(skill => skill.category === "Frontend")
      },
      { 
        name: "Backend Development", 
        color: "from-emerald-500 to-teal-500", 
        icon: Zap,
        skills: skills.filter(skill => skill.category === "Backend")
      },
      { 
        name: "Tools & DevOps", 
        color: "from-purple-500 to-pink-500", 
        icon: Target,
        skills: skills.filter(skill => skill.category === "Tools")
      }
    ];
  }, [skills]);

  return (
    <section className="relative min-h-screen py-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 mb-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white">
            <div className="animate-spin">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Technical Expertise</span>
          </div>

          {/* Title with same color theme */}
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
            Skills & Technologies
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            A curated collection of technologies I've mastered through years of 
            <span className="text-purple-600 font-semibold"> hands-on experience</span> and continuous learning
          </p>
        </div>

        {/* Skills categories */}
        <div className="space-y-20">
          {categorizedSkills.map((category, categoryIndex) => (
            <CategorySection
              key={category.name}
              category={category.name}
              categoryIndex={categoryIndex}
              categorySkills={category.skills}
              categoryColor={category.color}
              CategoryIcon={category.icon}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
});