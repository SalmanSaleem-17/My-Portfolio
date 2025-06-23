'use client'

import { Code2, Zap, Sparkles, Target, FileCode } from "lucide-react";
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
  level: string;
  color: string;
  icon?: any;
  category: string;
}

// Performance optimizations
const ANIMATION_CONFIG = {
  staggerDelay: 50,
  baseDelay: 100,
  duration: 400,
  threshold: 0.15,
  rootMargin: '20px'
};

// Precomputed style classes for better performance
const LEVEL_STYLES = {
  Expert: {
    width: 'w-full',
    gradient: 'bg-gradient-to-r from-emerald-500 to-green-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  Advanced: {
    width: 'w-4/5',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    badge: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  Intermediate: {
    width: 'w-3/5',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    badge: 'bg-amber-50 text-amber-700 border-amber-200'
  }
};

// Optimized skill card with hardware acceleration
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
  const [progressAnimated, setProgressAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const levelStyles = LEVEL_STYLES[skill.level as keyof typeof LEVEL_STYLES] || LEVEL_STYLES.Intermediate;

  // Optimized intersection observer
  useEffect(() => {
    if (!cardRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Use requestAnimationFrame for smooth animation timing
          requestAnimationFrame(() => {
            setIsVisible(true);
            onVisible();
            // Delay progress animation for staggered effect
            setTimeout(() => {
              requestAnimationFrame(() => setProgressAnimated(true));
            }, ANIMATION_CONFIG.baseDelay + (index * ANIMATION_CONFIG.staggerDelay));
          });
        }
      },
      { 
        threshold: ANIMATION_CONFIG.threshold,
        rootMargin: ANIMATION_CONFIG.rootMargin
      }
    );

    observerRef.current.observe(cardRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [index, isVisible, onVisible]);

  // Memoized inline styles for better performance
  const cardStyle = useMemo(() => ({
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: isVisible ? 1 : 0,
    transition: `all ${ANIMATION_CONFIG.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionDelay: `${index * ANIMATION_CONFIG.staggerDelay}ms`,
    willChange: isVisible ? 'auto' : 'transform, opacity'
  }), [isVisible, index]);

  const iconContainerStyle = useMemo(() => ({
    background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
    borderColor: `${skill.color}30`
  }), [skill.color]);

  const progressStyle = useMemo(() => ({
    width: progressAnimated ? '100%' : '0%',
    transition: `width 800ms cubic-bezier(0.4, 0, 0.2, 1) ${ANIMATION_CONFIG.baseDelay + (index * ANIMATION_CONFIG.staggerDelay) + 200}ms`,
    willChange: progressAnimated ? 'auto' : 'width'
  }), [progressAnimated, index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={cardStyle}
    >
      {/* Card background with hardware acceleration */}
      <div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/40 text-center shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:bg-white/95 transform hover:scale-[1.02] hover:-translate-y-1 will-change-transform">
        
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
        />

        <div className="relative z-10">
          {/* Icon with optimized animations */}
          <div className="flex justify-center mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ease-out group-hover:shadow-lg transform group-hover:scale-110 will-change-transform"
              style={iconContainerStyle}
            >
              {skill.icon && (
                <skill.icon 
                  className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" 
                  style={{ color: skill.color }}
                />
              )}
            </div>
          </div>

          {/* Skill name */}
          <h4 className="font-bold text-slate-800 mb-3 text-sm transition-colors duration-300 group-hover:text-purple-600">
            {skill.name}
          </h4>
          
          {/* Level badge and progress */}
          <div className="flex flex-col items-center gap-3">
            <div className={`px-4 py-2 rounded-full text-xs font-semibold border shadow-sm transition-all duration-300 group-hover:scale-105 ${levelStyles.badge}`}>
              {skill.level}
            </div>
            
            {/* Optimized progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner relative">
              <div className="absolute inset-0 bg-slate-100 rounded-full" />
              <div
                className={`relative h-full rounded-full shadow-sm ${levelStyles.gradient}`}
                style={progressStyle}
              >
                <div className={`absolute inset-0 ${levelStyles.gradient} opacity-60 animate-pulse`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

// Optimized category section
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
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isHeaderVisible) {
          requestAnimationFrame(() => {
            setTimeout(() => setIsHeaderVisible(true), categoryIndex * 150);
          });
        }
      },
      { threshold: ANIMATION_CONFIG.threshold }
    );

    observerRef.current.observe(headerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [categoryIndex, isHeaderVisible]);

  const headerStyle = useMemo(() => ({
    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isHeaderVisible ? 1 : 0,
    transition: `all 600ms cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: isHeaderVisible ? 'auto' : 'transform, opacity'
  }), [isHeaderVisible]);

  return (
    <div className="space-y-8">
      <div 
        ref={headerRef}
        className="flex items-center justify-center gap-3 mb-8"
        style={headerStyle}
      >
        <div className={`p-3 bg-gradient-to-r ${categoryColor} rounded-2xl shadow-lg transition-transform duration-300 hover:scale-110 will-change-transform`}>
          <CategoryIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {category}
        </h3>
        <div className={`h-px flex-1 max-w-20 bg-gradient-to-r ${categoryColor} opacity-50 transition-all duration-500`} />
      </div>

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

export default memo(function SkillsSection() {
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Optimized header visibility
  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !headerVisible) {
          requestAnimationFrame(() => setHeaderVisible(true));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [headerVisible]);

  const handleSkillVisible = useCallback((skillName: string) => {
    setVisibleSkills(prev => {
      if (prev.has(skillName)) return prev;
      const newSet = new Set(prev);
      newSet.add(skillName);
      return newSet;
    });
  }, []);

  // Memoized skills data
  const categorizedSkills = useMemo(() => {
    const skillsData = [
      // Frontend
      { name: "React", level: "Expert", color: "#61DAFB", icon: FaReact, category: "Frontend" },
      { name: "Next.js", level: "Advanced", color: "#000000", icon: SiNextdotjs, category: "Frontend" },
      { name: "TypeScript", level: "Intermediate", color: "#3178C6", icon: SiTypescript, category: "Frontend" },
      { name: "JavaScript", level: "Expert", color: "#F7DF1E", icon: FaJs, category: "Frontend" },
      { name: "HTML5", level: "Expert", color: "#E34F26", icon: FaHtml5, category: "Frontend" },
      { name: "CSS3", level: "Advanced", color: "#1572B6", icon: FaCss3Alt, category: "Frontend" },
      { name: "Tailwind CSS", level: "Advanced", color: "#06B6D4", icon: SiTailwindcss, category: "Frontend" },
      { name: "Bootstrap", level: "Advanced", color: "#7952B3", icon: FaBootstrap, category: "Frontend" },

      // Backend
      { name: "Node.js", level: "Advanced", color: "#339933", icon: FaNodeJs, category: "Backend" },
      { name: "Express.js", level: "Advanced", color: "#000000", icon: SiExpress, category: "Backend" },
      { name: "MongoDB", level: "Advanced", color: "#47A248", icon: SiMongodb, category: "Backend" },
      { name: "Socket.IO", level: "Intermediate", color: "#010101", icon: SiSocketdotio, category: "Backend" },
      { name: "REST APIs", level: "Advanced", color: "#FF6B6B", icon: FaDatabase, category: "Backend" },

      // Tools
      { name: "Git", level: "Advanced", color: "#F05032", icon: FaGitAlt, category: "Tools" },
      { name: "GitHub", level: "Advanced", color: "#181717", icon: FaGithub, category: "Tools" },
      { name: "VS Code", level: "Expert", color: "#007ACC", icon: FileCode, category: "Tools" },
      { name: "Postman", level: "Advanced", color: "#FF6C37", icon: SiPostman, category: "Tools" },
      { name: "NPM", level: "Advanced", color: "#CB3837", icon: FaNpm, category: "Tools" }
    ];

    return [
      { 
        name: "Frontend", 
        color: "from-blue-500 to-cyan-500", 
        icon: Code2,
        skills: skillsData.filter(skill => skill.category === "Frontend")
      },
      { 
        name: "Backend", 
        color: "from-emerald-500 to-green-500", 
        icon: Zap,
        skills: skillsData.filter(skill => skill.category === "Backend")
      },
      { 
        name: "Tools", 
        color: "from-purple-500 to-pink-500", 
        icon: Target,
        skills: skillsData.filter(skill => skill.category === "Tools")
      }
    ];
  }, []);

  const headerStyle = useMemo(() => ({
    transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
    opacity: headerVisible ? 1 : 0,
    transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: headerVisible ? 'auto' : 'transform, opacity'
  }), [headerVisible]);

  const titleLineStyle1 = useMemo(() => ({
    width: headerVisible ? '4rem' : '0',
    transition: 'width 1000ms cubic-bezier(0.4, 0, 0.2, 1) 400ms'
  }), [headerVisible]);

  const titleLineStyle2 = useMemo(() => ({
    width: headerVisible ? '4rem' : '0',
    transition: 'width 1000ms cubic-bezier(0.4, 0, 0.2, 1) 600ms'
  }), [headerVisible]);

  return (
    <div className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Optimized background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-cyan-400/8 rounded-full blur-2xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/8 to-green-400/8 rounded-full blur-2xl opacity-60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header section */}
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={headerStyle}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200/50 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 will-change-transform">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-purple-700">My Technical Arsenal</span>
          </div>

          {/* Main title */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-800 to-pink-800 bg-clip-text text-transparent leading-tight">
            Technologies I Master
          </h2>
          
          {/* Decorative line */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={titleLineStyle1} />
            <Code2 className="w-6 h-6 text-purple-500" />
            <div className="h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" style={titleLineStyle2} />
          </div>

          {/* Subtitle */}
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
            A comprehensive toolkit of modern technologies I use to build 
            <span className="text-purple-600 font-semibold"> scalable, efficient applications</span> that make a difference
          </p>
        </div>

        {/* Skills grid */}
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
      </div>
    </div>
  );
});

// 'use client'

// import { Code2, Zap, Sparkles, Target, FileCode } from "lucide-react";
// import { 
//   FaReact, 
//   FaNodeJs, 
//   FaJs, 
//   FaHtml5, 
//   FaCss3Alt, 
//   FaGitAlt, 
//   FaGithub, 
//   FaBootstrap,
//   FaDatabase,
//   FaNpm
// } from "react-icons/fa";
// import { 
//   SiMongodb, 
//   SiExpress, 
//   SiTailwindcss, 
//   SiTypescript,
//   SiNextdotjs,
//   SiPostman,
//   SiSocketdotio
// } from "react-icons/si";
// import { memo, useMemo, useCallback, useRef, useState, useEffect } from "react";

// interface Skill {
//   name: string;
//   level: string;
//   color: string;
//   icon?: any;
//   category: string;
// }

// interface SkillsSectionProps {
//   skills?: Skill[];
// }

// // Optimized skill card with CSS-only animations
// const SkillCard = memo(({ 
//   skill, 
//   index,
//   isVisible,
//   onVisible
// }: {
//   skill: Skill;
//   index: number;
//   isVisible: boolean;
//   onVisible: () => void;
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   // Intersection Observer for performance
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasAnimated) {
//           setHasAnimated(true);
//           onVisible();
//         }
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, [hasAnimated, onVisible]);

//   const levelWidth = useMemo(() => {
//     switch(skill.level) {
//       case "Expert": return "w-full";
//       case "Advanced": return "w-4/5";
//       default: return "w-3/5";
//     }
//   }, [skill.level]);

//   const levelColorClass = useMemo(() => {
//     switch(skill.level) {
//       case "Expert": return "bg-gradient-to-r from-emerald-500 to-green-500";
//       case "Advanced": return "bg-gradient-to-r from-blue-500 to-cyan-500";
//       case "Intermediate": return "bg-gradient-to-r from-amber-500 to-orange-500";
//       default: return "bg-gradient-to-r from-slate-500 to-gray-500";
//     }
//   }, [skill.level]);

//   const levelBadgeClass = useMemo(() => {
//     switch(skill.level) {
//       case "Expert": return "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100";
//       case "Advanced": return "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100";
//       case "Intermediate": return "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100";
//       default: return "bg-slate-50 text-slate-700 border-slate-200 shadow-slate-100";
//     }
//   }, [skill.level]);

//   return (
//     <div
//       ref={cardRef}
//       className={`group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/40 text-center shadow-lg transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-xl hover:-translate-y-2 hover:bg-white/90 ${
//         hasAnimated 
//           ? 'opacity-100 translate-y-0' 
//           : 'opacity-0 translate-y-8'
//       }`}
//       style={{ 
//         transitionDelay: `${index * 80}ms`,
//         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
//       }}
//     >
//       {/* Animated background glow */}
//       <div 
//         className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
//         style={{ background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)` }}
//       />

//       <div className="relative z-10">
//         {/* Icon container with elegant hover effect */}
//         <div className="flex justify-center mb-4">
//           <div
//             className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
//             style={{ 
//               background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
//               border: `2px solid ${skill.color}30`
//             }}
//           >
//             {skill.icon && (
//               <skill.icon 
//                 className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" 
//                 style={{ color: skill.color }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Skill name with gradient hover effect */}
//         <h4 className="font-bold text-slate-800 mb-3 text-sm group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
//           {skill.name}
//         </h4>
        
//         {/* Level badge and progress */}
//         <div className="flex flex-col items-center gap-3">
//           <div className={`px-4 py-2 rounded-full text-xs font-semibold border shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${levelBadgeClass}`}>
//             {skill.level}
//           </div>
          
//           {/* Elegant progress bar */}
//           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
//             <div
//               className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${levelColorClass} ${
//                 hasAnimated ? levelWidth : 'w-0'
//               }`}
//               style={{ transitionDelay: `${(index * 100) + 300}ms` }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// SkillCard.displayName = 'SkillCard';

// // Category section with staggered animations
// const CategorySection = memo(({ 
//   category, 
//   categoryIndex, 
//   categorySkills, 
//   categoryColor,
//   CategoryIcon,
//   visibleSkills,
//   onSkillVisible
// }: {
//   category: string;
//   categoryIndex: number;
//   categorySkills: Skill[];
//   categoryColor: string;
//   CategoryIcon: any;
//   visibleSkills: Set<string>;
//   onSkillVisible: (skillName: string) => void;
// }) => {
//   const [isHeaderVisible, setIsHeaderVisible] = useState(false);
//   const headerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => setIsHeaderVisible(true), categoryIndex * 200);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (headerRef.current) {
//       observer.observe(headerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [categoryIndex]);

//   return (
//     <div className="space-y-6">
//       <div 
//         ref={headerRef}
//         className={`flex items-center justify-center gap-3 mb-8 transition-all duration-700 ease-out ${
//           isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//         }`}
//       >
//         <div className={`p-3 bg-gradient-to-r ${categoryColor} rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3`}>
//           <CategoryIcon className="w-6 h-6 text-white" />
//         </div>
//         <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//           {category}
//         </h3>
//         <div className={`h-px flex-1 max-w-20 bg-gradient-to-r ${categoryColor} opacity-50`} />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//         {categorySkills.map((skill, index) => (
//           <SkillCard
//             key={skill.name}
//             skill={skill}
//             index={index}
//             isVisible={visibleSkills.has(skill.name)}
//             onVisible={() => onSkillVisible(skill.name)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// });

// CategorySection.displayName = 'CategorySection';

// export default memo(function SkillsSection({ skills }: SkillsSectionProps) {
//   const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
//   const [headerVisible, setHeaderVisible] = useState(false);
//   const headerRef = useRef<HTMLDivElement>(null);

//   // Header intersection observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setHeaderVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (headerRef.current) {
//       observer.observe(headerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleSkillVisible = useCallback((skillName: string) => {
//     setVisibleSkills(prev => new Set(prev).add(skillName));
//   }, []);

//   // Memoized skills data
//   const { enhancedSkills, categorizedSkills } = useMemo(() => {
//     const skillsData = [
//       // Frontend
//       { name: "React", level: "Expert", color: "#61DAFB", icon: FaReact, category: "Frontend" },
//       { name: "Next.js", level: "Advanced", color: "#000000", icon: SiNextdotjs, category: "Frontend" },
//       { name: "TypeScript", level: "Intermediate", color: "#3178C6", icon: SiTypescript, category: "Frontend" },
//       { name: "JavaScript", level: "Expert", color: "#F7DF1E", icon: FaJs, category: "Frontend" },
//       { name: "HTML5", level: "Expert", color: "#E34F26", icon: FaHtml5, category: "Frontend" },
//       { name: "CSS3", level: "Advanced", color: "#1572B6", icon: FaCss3Alt, category: "Frontend" },
//       { name: "Tailwind CSS", level: "Advanced", color: "#06B6D4", icon: SiTailwindcss, category: "Frontend" },
//       { name: "Bootstrap", level: "Advanced", color: "#7952B3", icon: FaBootstrap, category: "Frontend" },

//       // Backend
//       { name: "Node.js", level: "Advanced", color: "#339933", icon: FaNodeJs, category: "Backend" },
//       { name: "Express.js", level: "Advanced", color: "#000000", icon: SiExpress, category: "Backend" },
//       { name: "MongoDB", level: "Advanced", color: "#47A248", icon: SiMongodb, category: "Backend" },
//       { name: "Socket.IO", level: "Intermediate", color: "#010101", icon: SiSocketdotio, category: "Backend" },
//       { name: "REST APIs", level: "Advanced", color: "#FF6B6B", icon: FaDatabase, category: "Backend" },

//       // Tools
//       { name: "Git", level: "Advanced", color: "#F05032", icon: FaGitAlt, category: "Tools" },
//       { name: "GitHub", level: "Advanced", color: "#181717", icon: FaGithub, category: "Tools" },
//       { name: "VS Code", level: "Expert", color: "#007ACC", icon: FileCode, category: "Tools" },
//       { name: "Postman", level: "Advanced", color: "#FF6C37", icon: SiPostman, category: "Tools" },
//       { name: "NPM", level: "Advanced", color: "#CB3837", icon: FaNpm, category: "Tools" }
//     ];

//     const categories = [
//       { 
//         name: "Frontend", 
//         color: "from-blue-500 to-cyan-500", 
//         icon: Code2,
//         skills: skillsData.filter(skill => skill.category === "Frontend")
//       },
//       { 
//         name: "Backend", 
//         color: "from-emerald-500 to-green-500", 
//         icon: Zap,
//         skills: skillsData.filter(skill => skill.category === "Backend")
//       },
//       { 
//         name: "Tools", 
//         color: "from-purple-500 to-pink-500", 
//         icon: Target,
//         skills: skillsData.filter(skill => skill.category === "Tools")
//       }
//     ];

//     return {
//       enhancedSkills: skillsData,
//       categorizedSkills: categories
//     };
//   }, []);

//   return (
//     <div className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
//       {/* Elegant background decorations */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
//         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 container mx-auto px-4">
//         {/* Header section */}
//         <div 
//           ref={headerRef}
//           className={`text-center mb-16 transition-all duration-1000 ease-out ${
//             headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-purple-200/50 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
//             <span className="font-semibold text-purple-700">My Technical Arsenal</span>
//           </div>

//           {/* Main title */}
//           <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-800 to-pink-800 bg-clip-text text-transparent leading-tight">
//             Technologies I Master
//           </h2>
          
//           {/* Decorative line */}
//           <div className="flex justify-center items-center gap-4 mb-6">
//             <div className={`h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out ${headerVisible ? 'w-16' : 'w-0'}`} style={{ transitionDelay: '500ms' }} />
//             <Code2 className="w-6 h-6 text-purple-500" />
//             <div className={`h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full transition-all duration-1000 ease-out ${headerVisible ? 'w-16' : 'w-0'}`} style={{ transitionDelay: '700ms' }} />
//           </div>

//           {/* Subtitle */}
//           <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
//             A comprehensive toolkit of modern technologies I use to build 
//             <span className="text-purple-600 font-semibold"> scalable, efficient applications</span> that make a difference
//           </p>
//         </div>

//         {/* Skills grid */}
//         <div className="space-y-16">
//           {categorizedSkills.map((category, categoryIndex) => (
//             <CategorySection
//               key={category.name}
//               category={category.name}
//               categoryIndex={categoryIndex}
//               categorySkills={category.skills}
//               categoryColor={category.color}
//               CategoryIcon={category.icon}
//               visibleSkills={visibleSkills}
//               onSkillVisible={handleSkillVisible}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });