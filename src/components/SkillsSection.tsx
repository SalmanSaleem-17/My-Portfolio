'use client'

import { Code2, Zap, Target, Sparkles, Star } from "lucide-react";
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaGithub, 
  FaBootstrap,
  FaDatabase,
  FaNpm
} from "react-icons/fa";
import { 
  SiMongodb, 
  SiExpress, 
  SiTailwindcss, 
  SiTypescript,
  SiNextdotjs,
  SiPostman,
  SiSocketdotio
} from "react-icons/si";
import { memo, useMemo, useCallback, useRef, useState, useEffect } from "react";

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  color: string;
  icon: any;
  category: string;
  years?: number;
}

// Optimized animation config
const ANIMATION_CONFIG = {
  staggerDelay: 40,
  baseDelay: 80,
  duration: 300,
  threshold: 0.1
};

// Elegant level configurations
const SKILL_LEVELS = {
  Expert: { 
    percentage: 95, 
    stars: 5, 
    label: 'Expert',
    gradient: 'from-emerald-400 to-emerald-600',
    glow: 'emerald-400/20',
    text: 'text-emerald-600'
  },
  Advanced: { 
    percentage: 80, 
    stars: 4, 
    label: 'Advanced',
    gradient: 'from-blue-400 to-blue-600',
    glow: 'blue-400/20',
    text: 'text-blue-600'
  },
  Intermediate: { 
    percentage: 65, 
    stars: 3, 
    label: 'Intermediate',
    gradient: 'from-amber-400 to-amber-600',
    glow: 'amber-400/20',
    text: 'text-amber-600'
  }
};

// Optimized skill card with elegant design
const SkillCard = memo(({ 
  skill, 
  index,
  onVisible
}: {
  skill: Skill;
  index: number;
  onVisible: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const levelConfig = SKILL_LEVELS[skill.level];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          const timeout = setTimeout(() => {
            setIsVisible(true);
            onVisible();
          }, index * ANIMATION_CONFIG.staggerDelay);
          
          return () => clearTimeout(timeout);
        }
      },
      { threshold: ANIMATION_CONFIG.threshold }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, isVisible, onVisible]);

  // Render star rating
  const renderStars = useCallback(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 transition-all duration-200 ${
          i < levelConfig.stars 
            ? `text-yellow-400 fill-yellow-400 ${isHovered ? 'scale-110' : ''}` 
            : 'text-gray-200'
        }`}
      />
    ));
  }, [levelConfig.stars, isHovered]);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95'
      }`}
      style={{ 
        transitionDelay: `${index * ANIMATION_CONFIG.staggerDelay}ms`,
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card */}
      <div className="relative h-full bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/90 hover:border-gray-300/50 hover:shadow-lg hover:-translate-y-1">
        
        {/* Skill icon */}
        <div className="flex justify-center mb-4">
          <div 
            className={`relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${isHovered ? 'shadow-xl scale-105' : ''}`}
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
              boxShadow: isHovered ? `0 10px 25px ${skill.color}20` : undefined
            }}
          >
            <skill.icon 
              className="w-8 h-8 transition-transform duration-300"
              style={{ color: skill.color }}
            />
          </div>
        </div>

        {/* Skill name */}
        <h4 className="font-semibold text-gray-800 text-center mb-3 transition-colors duration-300 group-hover:text-gray-900">
          {skill.name}
        </h4>

        {/* Star rating */}
        <div className="flex justify-center gap-1 mb-4">
          {renderStars()}
        </div>

        {/* Level badge */}
        <div className="flex justify-center mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${levelConfig.text} bg-white/80 border border-current/20 ${isHovered ? 'scale-105' : ''}`}>
            {levelConfig.label}
          </span>
        </div>

        {/* Elegant progress indicator */}
        <div className="relative">
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${levelConfig.gradient} rounded-full transition-all duration-700 ease-out`}
              style={{ 
                width: isVisible ? `${levelConfig.percentage}%` : '0%',
                transitionDelay: `${index * ANIMATION_CONFIG.staggerDelay + 200}ms`
              }}
            />
          </div>
          
          {/* Percentage indicator */}
          <div className="flex justify-end mt-2">
            <span className={`text-xs font-medium transition-all duration-300 ${levelConfig.text} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {levelConfig.percentage}%
            </span>
          </div>
        </div>

        {/* Hover glow effect */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
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

// Category section with elegant design
const CategorySection = memo(({ 
  category, 
  categoryIndex, 
  categorySkills, 
  categoryColor,
  CategoryIcon,
  onSkillVisible
}: {
  category: string;
  categoryIndex: number;
  categorySkills: Skill[];
  categoryColor: string;
  CategoryIcon: any;
  onSkillVisible: (skillName: string) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), categoryIndex * 150);
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
    <div ref={sectionRef} className="space-y-8">
      {/* Category header */}
      <div 
        className={`flex items-center justify-center gap-4 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className={`p-3 bg-gradient-to-r ${categoryColor} rounded-xl shadow-lg`}>
          <CategoryIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          {category}
        </h3>
        <div className={`h-0.5 w-16 bg-gradient-to-r ${categoryColor} rounded-full`} />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categorySkills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
            onVisible={() => onSkillVisible(skill.name)}
          />
        ))}
      </div>
    </div>
  );
});

CategorySection.displayName = 'CategorySection';

export default memo(function ElegantSkillsSection() {
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
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

  const handleSkillVisible = useCallback((skillName: string) => {
    setVisibleSkills(prev => new Set([...prev, skillName]));
  }, []);

  // Skills data with better organization
  const categorizedSkills = useMemo(() => {
    const skillsData: Skill[] = [
      // Frontend
      { name: "React", level: "Expert", color: "#61DAFB", icon: FaReact, category: "Frontend", years: 3 },
      { name: "Next.js", level: "Advanced", color: "#000000", icon: SiNextdotjs, category: "Frontend", years: 2 },
      { name: "TypeScript", level: "Advanced", color: "#3178C6", icon: SiTypescript, category: "Frontend", years: 2 },
      { name: "JavaScript", level: "Expert", color: "#F7DF1E", icon: FaJs, category: "Frontend", years: 4 },
      { name: "HTML5", level: "Expert", color: "#E34F26", icon: FaHtml5, category: "Frontend", years: 5 },
      { name: "CSS3", level: "Advanced", color: "#1572B6", icon: FaCss3Alt, category: "Frontend", years: 4 },
      { name: "Tailwind", level: "Advanced", color: "#06B6D4", icon: SiTailwindcss, category: "Frontend", years: 2 },
      { name: "Bootstrap", level: "Advanced", color: "#7952B3", icon: FaBootstrap, category: "Frontend", years: 3 },

      // Backend
      { name: "Node.js", level: "Advanced", color: "#339933", icon: FaNodeJs, category: "Backend", years: 3 },
      { name: "Express.js", level: "Advanced", color: "#000000", icon: SiExpress, category: "Backend", years: 3 },
      { name: "MongoDB", level: "Advanced", color: "#47A248", icon: SiMongodb, category: "Backend", years: 2 },
      { name: "Socket.IO", level: "Intermediate", color: "#010101", icon: SiSocketdotio, category: "Backend", years: 1 },
      { name: "REST APIs", level: "Advanced", color: "#FF6B6B", icon: FaDatabase, category: "Backend", years: 3 },

      // Tools & DevOps
      { name: "Git", level: "Advanced", color: "#F05032", icon: FaGitAlt, category: "Tools", years: 4 },
      { name: "GitHub", level: "Advanced", color: "#181717", icon: FaGithub, category: "Tools", years: 4 },
      { name: "Postman", level: "Advanced", color: "#FF6C37", icon: SiPostman, category: "Tools", years: 3 },
      { name: "NPM", level: "Advanced", color: "#CB3837", icon: FaNpm, category: "Tools", years: 4 }
    ];

    return [
      { 
        name: "Frontend Development", 
        color: "from-blue-500 to-cyan-500", 
        icon: Code2,
        skills: skillsData.filter(skill => skill.category === "Frontend")
      },
      { 
        name: "Backend Development", 
        color: "from-emerald-500 to-teal-500", 
        icon: Zap,
        skills: skillsData.filter(skill => skill.category === "Backend")
      },
      { 
        name: "Tools & DevOps", 
        color: "from-purple-500 to-pink-500", 
        icon: Target,
        skills: skillsData.filter(skill => skill.category === "Tools")
      }
    ];
  }, []);

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-emerald-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Technical Expertise</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            A curated collection of technologies I've mastered through years of 
            <span className="text-purple-600 font-medium"> hands-on experience</span> and continuous learning
          </p>
        </div>

        {/* Skills categories */}
        <div className="space-y-16">
          {categorizedSkills.map((category, categoryIndex) => (
            <CategorySection
              key={category.name}
              category={category.name}
              categoryIndex={categoryIndex}
              categorySkills={category.skills}
              categoryColor={category.color}
              CategoryIcon={category.icon}
              onSkillVisible={handleSkillVisible}
            />
          ))}
        </div>

        {/* Stats summary */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{categorizedSkills.reduce((acc, cat) => acc + cat.skills.length, 0)}+</div>
              <div className="text-sm text-gray-600">Technologies</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{categorizedSkills.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">4+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});