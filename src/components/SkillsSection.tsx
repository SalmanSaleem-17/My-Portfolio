'use client'

import { Code2, Zap, Target, Sparkles } from "lucide-react";
import { memo, useMemo, useState, useEffect, useRef, useCallback } from "react";
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

// Convert hex color to rgba for shadows
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Optimized intersection observer hook
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

// High-performance skill card with enhanced responsive design
const SkillCard = memo(({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, isVisible] = useIntersectionObserver(0.1);
  const levelConfig = SKILL_LEVELS[skill.level];

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const cardShadow = useMemo(() => 
    isHovered 
      ? `0 12px 32px ${hexToRgba(skill.color, 0.3)}, 0 4px 16px ${hexToRgba(skill.color, 0.2)}`
      : '0 4px 20px rgba(0, 0, 0, 0.08)'
  , [isHovered, skill.color]);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-500 ease-out will-change-transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-6 scale-95'
      }`}
      style={{ 
        transitionDelay: `${index * 40}ms`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main card with glass morphism effect */}
      <div 
        className="relative h-full bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 ease-out hover:bg-white/95 hover:-translate-y-2 hover:scale-[1.02]"
        style={{ boxShadow: cardShadow }}
      >
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none" />
        
        {/* Skill icon with animated container */}
        <div className="relative flex justify-center mb-3 sm:mb-5">
          <div 
            className={`relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out transform ${
              isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
            }`}
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}35)`,
              boxShadow: isHovered 
                ? `0 12px 24px ${hexToRgba(skill.color, 0.3)}, 0 0 0 1px ${hexToRgba(skill.color, 0.2)}` 
                : `0 6px 20px ${hexToRgba(skill.color, 0.15)}`
            }}
          >
            <skill.icon 
              className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{ 
                color: skill.color,
                filter: isHovered ? 'brightness(1.2) saturate(1.2)' : 'brightness(1)'
              }}
            />
            
            {/* Animated ring effect */}
            <div 
              className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                isHovered ? 'animate-pulse' : ''
              }`}
              style={{ 
                boxShadow: isHovered ? `0 0 0 3px ${hexToRgba(skill.color, 0.2)}` : 'none'
              }}
            />
          </div>
        </div>

        {/* Skill name with hover effect */}
        <h4 className={`font-bold text-gray-800 text-center mb-3 sm:mb-4 transition-all duration-300 ${
          isHovered ? 'text-gray-900 scale-105' : ''
        } text-sm sm:text-base lg:text-lg leading-tight`}>
          {skill.name}
        </h4>

        {/* Level badge with enhanced styling */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
            levelConfig.textColor
          } ${levelConfig.bgColor} ${levelConfig.borderColor} border-2 ${
            isHovered ? 'scale-105 shadow-lg' : ''
          }`}
          style={{
            boxShadow: isHovered ? `0 6px 20px ${hexToRgba(skill.color, 0.25)}` : 'none'
          }}>
            {levelConfig.label}
          </span>
        </div>

        {/* Expertise level bar */}
        <div className="mb-2 sm:mb-4">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs font-medium text-gray-500">Expertise</span>
            <span className={`text-xs font-bold ${levelConfig.textColor}`}>
              {levelConfig.percentage}%
            </span>
          </div>
          
          {/* Progress bar container */}
          <div className="relative w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
            {/* Animated progress bar */}
            <div 
              className={`h-full ${levelConfig.barColor} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ 
                width: isVisible ? `${levelConfig.percentage}%` : '0%',
                transitionDelay: `${index * 40 + 300}ms`
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
                boxShadow: isHovered ? `inset 0 0 8px ${hexToRgba(skill.color, 0.2)}` : 'none'
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
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: `radial-gradient(circle at center, ${hexToRgba(skill.color, 0.08)}, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

// Category section with smooth animations and responsive design
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
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <div ref={sectionRef} className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Category header */}
      <div 
        className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${categoryIndex * 150}ms` }}
      >
        <div className={`p-3 sm:p-4 bg-gradient-to-r ${categoryColor} rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl`}>
          <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center sm:text-left transition-all duration-300 hover:scale-105">
          {category}
        </h3>
        <div className={`h-0.5 sm:h-1 bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-1000 ease-out order-first sm:order-last`}
          style={{
            width: isVisible ? '3rem' : '0rem'
          }}
        />
      </div>

      {/* Skills grid with better responsive breakpoints */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
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
  const [headerRef, headerVisible] = useIntersectionObserver(0.1);

  // Organize skills by category with performance optimization
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
    ].filter(category => category.skills.length > 0);
  }, [skills]);

  return (
    <section className="relative min-h-screen py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Animated background elements - optimized for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-3/4 w-40 sm:w-56 lg:w-64 h-40 sm:h-56 lg:h-64 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced responsive design */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 mb-6 sm:mb-8 shadow-lg sm:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white">
            <div className="animate-spin">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Technical Expertise</span>
          </div>

          {/* Enhanced title with improved gradient and hover effects */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-blue-900 hover:via-purple-800 hover:to-pink-800 transition-all duration-500 cursor-default leading-tight">
            Skills & Technologies
          </h2>
          
          {/* Subtitle with better responsive typography */}
          <p className="text-gray-600 max-w-2xl sm:max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed px-4 sm:px-0">
            A curated collection of technologies I've mastered through years of 
            <span className="text-purple-600 font-semibold"> hands-on experience</span> and continuous learning
          </p>
        </div>

        {/* Skills categories with optimized spacing */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
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

      {/* Optimized CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce,
          .animate-spin {
            animation: none;
          }
          
          .transition-all {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
});

// 'use client'

// import { Code2, Zap, Target, Sparkles } from "lucide-react";
// import { memo, useMemo, useState, useEffect, useRef } from "react";
// import { Variants } from "framer-motion";

// interface Skill {
//   name: string;
//   level: 'Expert' | 'Advanced' | 'Intermediate';
//   color: string;
//   icon: any;
//   category: string;
//   years?: number;
// }
// interface SkillsSectionProps {
//   containerVariants?: Variants;
//   itemVariants?: Variants;
//   skillVariants?: Variants;
//   skills: Skill[];
// }

// // Skill level configurations with percentages for bars
// const SKILL_LEVELS = {
//   Expert: { 
//     percentage: 95,
//     label: 'Expert',
//     textColor: 'text-emerald-600',
//     bgColor: 'bg-emerald-50',
//     borderColor: 'border-emerald-200',
//     barColor: 'bg-gradient-to-r from-emerald-400 to-emerald-600'
//   },
//   Advanced: { 
//     percentage: 80,
//     label: 'Advanced',
//     textColor: 'text-blue-600',
//     bgColor: 'bg-blue-50',
//     borderColor: 'border-blue-200',
//     barColor: 'bg-gradient-to-r from-blue-400 to-blue-600'
//   },
//   Intermediate: { 
//     percentage: 65,
//     label: 'Intermediate',
//     textColor: 'text-amber-600',
//     bgColor: 'bg-amber-50',
//     borderColor: 'border-amber-200',
//     barColor: 'bg-gradient-to-r from-amber-400 to-amber-600'
//   }
// };

// // High-performance skill card with aesthetic design
// const SkillCard = memo(({ skill, index }: { skill: Skill; index: number }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const levelConfig = SKILL_LEVELS[skill.level];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isVisible) {
//           setTimeout(() => setIsVisible(true), index * 50);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, [index, isVisible]);

//   return (
//     <div
//       ref={cardRef}
//       className={`group relative transition-all duration-500 ease-out will-change-transform ${
//         isVisible 
//           ? 'opacity-100 translate-y-0 scale-100' 
//           : 'opacity-0 translate-y-6 scale-95'
//       }`}
//       style={{ 
//         transitionDelay: `${index * 50}ms`
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Main card with glass morphism effect */}
//       <div className="relative h-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg transition-all duration-300 ease-out hover:bg-white/95 hover:shadow-2xl hover:border-white/40 hover:-translate-y-2 hover:scale-[1.02] group-hover:shadow-xl">
        
//         {/* Gradient overlay for depth */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
        
//         {/* Skill icon with animated container */}
//         <div className="relative flex justify-center mb-5">
//           <div 
//             className={`relative w-18 h-18 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out transform ${
//               isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
//             }`}
//             style={{ 
//               background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}35)`,
//               boxShadow: isHovered 
//                 ? `0 20px 40px ${skill.color}30, 0 0 0 1px ${skill.color}20` 
//                 : `0 8px 25px ${skill.color}15`
//             }}
//           >
//             <skill.icon 
//               className={`w-9 h-9 transition-all duration-300 ${
//                 isHovered ? 'scale-110' : 'scale-100'
//               }`}
//               style={{ 
//                 color: skill.color,
//                 filter: isHovered ? 'brightness(1.2) saturate(1.2)' : 'brightness(1)'
//               }}
//             />
            
//             {/* Animated ring effect */}
//             <div 
//               className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
//                 isHovered ? 'animate-pulse' : ''
//               }`}
//               style={{ 
//                 boxShadow: isHovered ? `0 0 0 4px ${skill.color}20` : 'none'
//               }}
//             />
//           </div>
//         </div>

//         {/* Skill name with hover effect */}
//         <h4 className={`font-bold text-gray-800 text-center mb-4 transition-all duration-300 ${
//           isHovered ? 'text-gray-900 scale-105' : ''
//         } text-lg`}>
//           {skill.name}
//         </h4>

//         {/* Level badge with enhanced styling */}
//         <div className="flex justify-center mb-4">
//           <span className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
//             levelConfig.textColor
//           } ${levelConfig.bgColor} ${levelConfig.borderColor} border-2 ${
//             isHovered ? 'scale-105 shadow-lg' : ''
//           }`}
//           style={{
//             boxShadow: isHovered ? `0 8px 25px ${skill.color}25` : 'none'
//           }}>
//             {levelConfig.label}
//           </span>
//         </div>

//         {/* Expertise level bar */}
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-xs font-medium text-gray-500">Expertise</span>
//             <span className={`text-xs font-bold ${levelConfig.textColor}`}>
//               {levelConfig.percentage}%
//             </span>
//           </div>
          
//           {/* Progress bar container */}
//           <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//             {/* Animated progress bar */}
//             <div 
//               className={`h-full ${levelConfig.barColor} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
//               style={{ 
//                 width: isVisible ? `${levelConfig.percentage}%` : '0%',
//                 transitionDelay: `${index * 50 + 300}ms`
//               }}
//             >
//               {/* Shimmer effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite] group-hover:animate-[shimmer_1s_infinite]" />
//             </div>
            
//             {/* Glow effect on hover */}
//             <div 
//               className={`absolute inset-0 rounded-full transition-all duration-300 ${
//                 isHovered ? 'shadow-inner' : ''
//               }`}
//               style={{ 
//                 boxShadow: isHovered ? `inset 0 0 10px ${skill.color}20` : 'none'
//               }}
//             />
//           </div>
//         </div>

//         {/* Floating orbs effect on hover */}
//         <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
//           isHovered ? 'opacity-100' : 'opacity-0'
//         }`}>
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 rounded-full animate-bounce"
//               style={{ 
//                 background: skill.color,
//                 left: `${25 + i * 25}%`,
//                 top: `${20 + i * 15}%`,
//                 animationDelay: `${i * 0.2}s`,
//                 animationDuration: '1.5s'
//               }}
//             />
//           ))}
//         </div>

//         {/* Card glow effect */}
//         <div 
//           className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300 ${
//             isHovered ? 'opacity-100' : 'opacity-0'
//           }`}
//           style={{ 
//             background: `radial-gradient(circle at center, ${skill.color}08, transparent 70%)`
//           }}
//         />
//       </div>
//     </div>
//   );
// });

// SkillCard.displayName = 'SkillCard';

// // Category section with smooth animations
// const CategorySection = memo(({ 
//   category, 
//   categorySkills, 
//   categoryColor,
//   CategoryIcon,
//   categoryIndex
// }: {
//   category: string;
//   categorySkills: Skill[];
//   categoryColor: string;
//   CategoryIcon: any;
//   categoryIndex: number;
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isVisible) {
//           setTimeout(() => setIsVisible(true), categoryIndex * 200);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, [categoryIndex, isVisible]);

//   return (
//     <div ref={sectionRef} className="space-y-10">
//       {/* Category header */}
//       <div 
//         className={`flex items-center justify-center gap-6 transition-all duration-700 ease-out ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//         }`}
//       >
//         <div className={`p-4 bg-gradient-to-r ${categoryColor} rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl`}>
//           <CategoryIcon className="w-7 h-7 text-white" />
//         </div>
//         <h3 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:scale-105">
//           {category}
//         </h3>
//         <div className={`h-1 bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-1000 ease-out`}
//           style={{
//             width: isVisible ? '4rem' : '0rem'
//           }}
//         />
//       </div>

//       {/* Skills grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//         {categorySkills.map((skill, index) => (
//           <SkillCard
//             key={skill.name}
//             skill={skill}
//             index={index}
//           />
//         ))}
//       </div>
//     </div>
//   );
// });

// CategorySection.displayName = 'CategorySection';

// export default memo(function SkillsSection({ skills }: SkillsSectionProps) {
//   const [headerVisible, setHeaderVisible] = useState(false);
//   const headerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !headerVisible) {
//           setHeaderVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (headerRef.current) {
//       observer.observe(headerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [headerVisible]);

//   // Organize skills by category
//   const categorizedSkills = useMemo(() => {
//     return [
//       { 
//         name: "Frontend Development", 
//         color: "from-blue-500 to-cyan-500", 
//         icon: Code2,
//         skills: skills.filter(skill => skill.category === "Frontend")
//       },
//       { 
//         name: "Backend Development", 
//         color: "from-emerald-500 to-teal-500", 
//         icon: Zap,
//         skills: skills.filter(skill => skill.category === "Backend")
//       },
//       { 
//         name: "Tools & DevOps", 
//         color: "from-purple-500 to-pink-500", 
//         icon: Target,
//         skills: skills.filter(skill => skill.category === "Tools")
//       }
//     ];
//   }, [skills]);

//   return (
//     <section className="relative min-h-screen py-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//         <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
//       </div>

//       <div className="relative z-10 container mx-auto px-6">
//         {/* Header */}
//         <div 
//           ref={headerRef}
//           className={`text-center mb-20 transition-all duration-1000 ease-out ${
//             headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 mb-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white">
//             <div className="animate-spin">
//               <Sparkles className="w-5 h-5 text-purple-500" />
//             </div>
//             <span className="text-sm font-semibold text-gray-700">Technical Expertise</span>
//           </div>

//           {/* Title with same color theme */}
//           <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
//             Skills & Technologies
//           </h2>
          
//           {/* Subtitle */}
//           <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
//             A curated collection of technologies I've mastered through years of 
//             <span className="text-purple-600 font-semibold"> hands-on experience</span> and continuous learning
//           </p>
//         </div>

//         {/* Skills categories */}
//         <div className="space-y-20">
//           {categorizedSkills.map((category, categoryIndex) => (
//             <CategorySection
//               key={category.name}
//               category={category.name}
//               categoryIndex={categoryIndex}
//               categorySkills={category.skills}
//               categoryColor={category.color}
//               CategoryIcon={category.icon}
//             />
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//       `}</style>
//     </section>
//   );
// });