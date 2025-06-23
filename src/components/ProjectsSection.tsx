'use client'

import { Rocket, Star, Code2, Sparkles, Trophy, Zap, FolderOpen } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { memo, useMemo, useRef, useState, useEffect, useCallback } from "react";
import { projects } from "@/utils/data";

interface ProjectsSectionProps {
  // Remove framer motion props as they're no longer needed
}

// Optimized intersection observer hook with cleanup and performance improvements
const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return; // Don't observe if already visible

    // Use a single observer instance
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect immediately after first intersection
          observerRef.current?.disconnect();
        }
      }, {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options
      });
    }

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [isVisible, options]);

  return isVisible;
};

// Highly optimized stat card with CSS containment and will-change optimization
const StatCard = memo(({ 
  stat, 
  index, 
  isVisible 
}: { 
  stat: any; 
  index: number; 
  isVisible: boolean; 
}) => {
  // Pre-calculate style object to avoid recreation
  const animationStyle = useMemo(() => ({
    transitionDelay: `${index * 50 + 150}ms`, // Reduced delay for faster animations
    contain: 'layout style paint',
    willChange: isVisible ? 'auto' : 'transform, opacity'
  }), [index, isVisible]);

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-2 
        bg-white/90 backdrop-blur-sm rounded-xl 
        border border-gray-200 shadow-sm
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg hover:-translate-y-1
        ${isVisible 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-4'
        }
      `}
      style={animationStyle}
    >
      <div className={`
        p-1.5 bg-gradient-to-r ${stat.color} rounded-lg shadow-inner
        transform transition-transform duration-200 ease-out
        group-hover:scale-110
      `}>
        <stat.icon className="w-4 h-4 text-white" />
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-gray-800 transition-colors duration-150">
          {stat.value}
        </div>
        <div className="text-xs text-gray-600 transition-colors duration-150">
          {stat.label}
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// Highly optimized project item with lazy loading and performance improvements
const ProjectItem = memo(({ 
  project, 
  index, 
  isVisible 
}: { 
  project: any; 
  index: number; 
  isVisible: boolean; 
}) => {
  // Pre-calculate styles to prevent recalculation
  const containerStyle = useMemo(() => ({
    transitionDelay: `${Math.min(index * 75, 300)}ms`, // Cap delay to prevent too long delays
    contain: 'layout style',
    willChange: isVisible ? 'auto' : 'transform, opacity'
  }), [index, isVisible]);

  const indicatorStyle = useMemo(() => ({
    transitionDelay: `${Math.min(index * 75 + 150, 450)}ms`,
    transformOrigin: 'center',
    contain: 'layout style paint'
  }), [index]);

  return (
    <div
      className={`
        relative group
        transform transition-all duration-500 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-6'
        }
      `}
      style={containerStyle}
    >
      {/* Optimized project highlight indicator */}
      <div 
        className={`
          absolute -left-4 top-1/2 transform -translate-y-1/2 
          w-2 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full
          transition-all duration-400 ease-out
          ${isVisible 
            ? 'opacity-100 scale-y-100' 
            : 'opacity-0 scale-y-0'
          }
        `}
        style={indicatorStyle}
      />
      
      <div className={`
        relative bg-white/90 backdrop-blur-sm rounded-2xl 
        border border-white/30 shadow-lg overflow-hidden
        transform transition-all duration-300 ease-out
        hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-purple-50/20 
        before:pointer-events-none before:transition-opacity before:duration-200
        hover:before:opacity-80
      `}
      style={{ contain: 'layout style' }}
      >
        <div className="relative z-10 transition-transform duration-200 ease-out group-hover:scale-[0.99]">
          <ProjectCard project={project} />
        </div>
      </div>
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

// Main component with extensive performance optimizations
export default memo(function ProjectsSection({}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Use separate observers for different sections to optimize rendering
  const isVisible = useIntersectionObserver(sectionRef, { rootMargin: '100px' });
  const headerVisible = useIntersectionObserver(headerRef, { threshold: 0.1 });
  const projectsVisible = useIntersectionObserver(projectsRef, { threshold: 0.05 });

  // Memoize static data with dependency array for better caching
  const stats = useMemo(() => [
    { 
      icon: FolderOpen, 
      label: "Projects", 
      value: projects.length, 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: Trophy, 
      label: "Completed", 
      value: projects.filter(p => p.status === 'Completed').length, 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: Zap, 
      label: "Technologies", 
      value: "10+", 
      color: "from-purple-500 to-pink-500" 
    }
  ], []);

  // Memoize background elements to prevent unnecessary re-renders
  const backgroundElements = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className={`
          absolute top-32 left-16 w-28 h-28 
          bg-gradient-to-r from-purple-400/20 to-pink-400/20 
          rounded-full blur-xl
          transform transition-all duration-800 ease-out
          ${isVisible 
            ? 'opacity-40 scale-100' 
            : 'opacity-0 scale-75'
          }
        `}
        style={{ 
          transitionDelay: '300ms',
          contain: 'layout style paint',
          willChange: isVisible ? 'auto' : 'transform, opacity'
        }}
      />
      <div 
        className={`
          absolute bottom-32 right-16 w-36 h-36 
          bg-gradient-to-r from-blue-400/20 to-cyan-400/20 
          rounded-full blur-xl
          transform transition-all duration-800 ease-out
          ${isVisible 
            ? 'opacity-40 scale-100' 
            : 'opacity-0 scale-75'
          }
        `}
        style={{ 
          transitionDelay: '400ms',
          contain: 'layout style paint',
          willChange: isVisible ? 'auto' : 'transform, opacity'
        }}
      />
    </div>
  ), [isVisible]);

  // Pre-calculate header styles
  const headerStyles = useMemo(() => ({
    badgeStyle: {
      transitionDelay: '100ms',
      contain: 'layout style paint' as const,
      willChange: headerVisible ? 'auto' : 'transform, opacity'
    },
    titleStyle: {
      transitionDelay: '150ms',
      contain: 'layout style paint' as const,
      willChange: headerVisible ? 'auto' : 'transform, opacity'
    },
    decoratorStyle: {
      transitionDelay: '200ms',
      contain: 'layout style paint' as const
    }
  }), [headerVisible]);

  return (
    <div className="relative overflow-hidden" style={{ contain: 'layout' }}>
      {backgroundElements}

      <section 
        ref={sectionRef}
        id="projects"
        className="max-w-6xl mx-auto relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        style={{ contain: 'layout style' }}
      >
        <div 
          ref={headerRef}
          className={`
            text-center mb-12
            transform transition-all duration-600 ease-out
            ${headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{ contain: 'layout style' }}
        >
          <div 
            className={`
              inline-flex items-center gap-2 px-4 py-2 
              bg-purple-50 rounded-full border border-purple-200 mb-4 shadow-sm
              transform transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-md active:scale-95
              ${headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-4'
              }
            `}
            style={headerStyles.badgeStyle}
          >
            <Rocket className="w-4 h-4 text-purple-500 transition-transform duration-200 hover:rotate-12" />
            <span className="text-sm font-medium text-purple-700">My Work</span>
          </div>
          
          <h2 
            className={`
              text-4xl md:text-5xl font-bold mb-4 
              bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 
              bg-clip-text text-transparent
              transform transition-all duration-400 ease-out
              ${headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
              }
            `}
            style={headerStyles.titleStyle}
          >
            Featured Projects
          </h2>
          
          <div 
            className={`
              flex justify-center items-center gap-2 mb-6
              transform transition-all duration-300 ease-out
              ${headerVisible 
                ? 'opacity-100' 
                : 'opacity-0'
              }
            `}
            style={headerStyles.decoratorStyle}
          >
            <div className={`
              h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
              transition-all duration-500 ease-out
              ${headerVisible ? 'w-12' : 'w-0'}
            `} />
            <div className={`
              transform transition-all duration-300 ease-out
              ${headerVisible 
                ? 'scale-100 rotate-0' 
                : 'scale-0 rotate-180'
              }
            `}>
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </div>
            <div className={`
              h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full
              transition-all duration-500 ease-out
              ${headerVisible ? 'w-12' : 'w-0'}
            `} />
          </div>

          <div 
            className={`
              relative bg-white/90 backdrop-blur-sm p-5 rounded-2xl 
              border border-white/20 shadow-lg max-w-3xl mx-auto
              transform transition-all duration-500 ease-out
              hover:shadow-xl hover:scale-[1.01]
              ${headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
              }
            `}
            style={{ 
              transitionDelay: '300ms',
              contain: 'layout style'
            }}
          >
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <div className={`
                p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md
                transform transition-all duration-300 ease-out
                hover:scale-110 hover:rotate-3
                ${headerVisible 
                  ? 'scale-100' 
                  : 'scale-0'
                }
              `}
              style={{ transitionDelay: '400ms' }}
              >
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <p className={`
                text-gray-700 text-base font-medium
                transform transition-all duration-300 ease-out
                ${headerVisible 
                  ? 'opacity-100' 
                  : 'opacity-0'
                }
              `}
              style={{ transitionDelay: '450ms' }}
              >
                Showcasing my expertise through <span className="text-purple-600 font-bold">real-world applications</span> that solve complex problems
              </p>
            </div>
            
            {/* Optimized Project Stats */}
            <div className={`
              flex justify-center gap-4 mt-4 flex-wrap
              transform transition-all duration-300 ease-out
              ${headerVisible 
                ? 'opacity-100' 
                : 'opacity-0'
              }
            `}
            style={{ transitionDelay: '500ms' }}
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={index}
                  isVisible={headerVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Highly optimized Projects Grid with virtual scrolling consideration */}
        <div 
          ref={projectsRef}
          className={`
            grid lg:grid-cols-1 gap-8
            transform transition-all duration-400 ease-out
            ${projectsVisible 
              ? 'opacity-100' 
              : 'opacity-0'
            }
          `}
          style={{ contain: 'layout style' }}
        >
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              isVisible={projectsVisible}
            />
          ))}
        </div>

        {/* Optimized bottom decorative element */}
        <div 
          className={`
            flex justify-center mt-16
            transform transition-all duration-400 ease-out
            ${projectsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{ 
            transitionDelay: '600ms',
            contain: 'layout style paint'
          }}
        >
          <div className={`
            flex items-center gap-2 px-4 py-2 
            bg-gradient-to-r from-gray-50 to-white rounded-full 
            border border-gray-200/50 shadow-md
            transform transition-all duration-200 ease-out
            hover:scale-105 hover:shadow-lg active:scale-95
            cursor-pointer group
          `}>
            <div className={`
              transform transition-all duration-300 ease-out
              group-hover:rotate-12 group-hover:scale-110
              ${projectsVisible 
                ? 'scale-100' 
                : 'scale-0'
              }
            `}
            style={{ transitionDelay: '650ms' }}
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-150">
              More projects coming soon!
            </span>
            <div className={`
              transform transition-all duration-300 ease-out
              group-hover:-rotate-12 group-hover:scale-110
              ${projectsVisible 
                ? 'scale-100' 
                : 'scale-0'
              }
            `}
            style={{ transitionDelay: '700ms' }}
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

// 'use client'

// import { Rocket, Star, Code2, Sparkles, Trophy, Zap, FolderOpen } from "lucide-react";
// import ProjectCard from "@/components/ProjectCard";
// import { memo, useMemo, useRef, useState, useEffect } from "react";
// import { projects } from "@/utils/data";

// interface ProjectsSectionProps {
//   // Remove framer motion props as they're no longer needed
// }

// // Custom hook for intersection observer
// const useIntersectionObserver = (
//   elementRef: React.RefObject<Element>,
//   options: IntersectionObserverInit = {}
// ) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsVisible(true);
//         observer.unobserve(element); // Only trigger once
//       }
//     }, {
//       threshold: 0.1,
//       rootMargin: '-50px',
//       ...options
//     });

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, [options]);

//   return isVisible;
// };

// // Optimized stat card component with pure CSS animations
// const StatCard = memo(({ 
//   stat, 
//   index, 
//   isVisible 
// }: { 
//   stat: any; 
//   index: number; 
//   isVisible: boolean; 
// }) => (
//   <div
//     className={`
//       flex items-center gap-2 px-3 py-2 
//       bg-white/90 backdrop-blur-sm rounded-xl 
//       border border-gray-200 shadow-sm
//       transform transition-all duration-500 ease-out
//       hover:scale-105 hover:shadow-lg hover:-translate-y-1
//       ${isVisible 
//         ? 'opacity-100 scale-100 translate-y-0' 
//         : 'opacity-0 scale-95 translate-y-4'
//       }
//     `}
//     style={{ 
//       transitionDelay: `${index * 100 + 300}ms`,
//       willChange: 'transform, opacity'
//     }}
//   >
//     <div className={`
//       p-1.5 bg-gradient-to-r ${stat.color} rounded-lg shadow-inner
//       transform transition-transform duration-300 ease-out
//       group-hover:scale-110
//     `}>
//       <stat.icon className="w-4 h-4 text-white" />
//     </div>
//     <div className="text-center">
//       <div className="text-sm font-bold text-gray-800 transition-colors duration-200">
//         {stat.value}
//       </div>
//       <div className="text-xs text-gray-600 transition-colors duration-200">
//         {stat.label}
//       </div>
//     </div>
//   </div>
// ));

// StatCard.displayName = 'StatCard';

// // Optimized project item component with staggered animations
// const ProjectItem = memo(({ 
//   project, 
//   index, 
//   isVisible 
// }: { 
//   project: any; 
//   index: number; 
//   isVisible: boolean; 
// }) => (
//   <div
//     className={`
//       relative group
//       transform transition-all duration-700 ease-out
//       ${isVisible 
//         ? 'opacity-100 translate-y-0' 
//         : 'opacity-0 translate-y-8'
//       }
//     `}
//     style={{ 
//       transitionDelay: `${index * 150}ms`,
//       willChange: 'transform, opacity'
//     }}
//   >
//     {/* Project highlight indicator */}
//     <div className={`
//       absolute -left-4 top-1/2 transform -translate-y-1/2 
//       w-2 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full
//       transition-all duration-500 ease-out
//       ${isVisible 
//         ? 'opacity-100 scale-y-100' 
//         : 'opacity-0 scale-y-0'
//       }
//     `}
//     style={{ 
//       transitionDelay: `${index * 150 + 300}ms`,
//       transformOrigin: 'center'
//     }}
//     />
    
//     <div className={`
//       relative bg-white/90 backdrop-blur-sm rounded-2xl 
//       border border-white/30 shadow-lg overflow-hidden
//       transform transition-all duration-500 ease-out
//       hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
//       before:absolute before:inset-0 
//       before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-purple-50/20 
//       before:pointer-events-none before:transition-opacity before:duration-300
//       hover:before:opacity-80
//     `}>
//       <div className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-[0.99]">
//         <ProjectCard project={project} />
//       </div>
//     </div>
//   </div>
// ));

// ProjectItem.displayName = 'ProjectItem';

// export default memo(function ProjectsSection({}: ProjectsSectionProps) {
//   const sectionRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const projectsRef = useRef<HTMLDivElement>(null);
  
//   const isVisible = useIntersectionObserver(sectionRef);
//   const headerVisible = useIntersectionObserver(headerRef, { threshold: 0.2 });
//   const projectsVisible = useIntersectionObserver(projectsRef, { threshold: 0.1 });

//   // Memoize static data to prevent recreation
//   const stats = useMemo(() => [
//     { 
//       icon: FolderOpen, 
//       label: "Projects", 
//       value: projects.length, 
//       color: "from-blue-500 to-cyan-500" 
//     },
//     { 
//       icon: Trophy, 
//       label: "Completed", 
//       value: projects.filter(p => p.status === 'Completed').length, 
//       color: "from-green-500 to-emerald-500" 
//     },
//     { 
//       icon: Zap, 
//       label: "Technologies", 
//       value: "10+", 
//       color: "from-purple-500 to-pink-500" 
//     }
//   ], []);

//   return (
//     <div className="relative overflow-hidden">
//       {/* Enhanced background elements with CSS animations */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className={`
//           absolute top-32 left-16 w-28 h-28 
//           bg-gradient-to-r from-purple-400/20 to-pink-400/20 
//           rounded-full blur-xl
//           transform transition-all duration-1000 ease-out
//           ${isVisible 
//             ? 'opacity-40 scale-100' 
//             : 'opacity-0 scale-75'
//           }
//         `}
//         style={{ transitionDelay: '500ms' }}
//         />
//         <div className={`
//           absolute bottom-32 right-16 w-36 h-36 
//           bg-gradient-to-r from-blue-400/20 to-cyan-400/20 
//           rounded-full blur-xl
//           transform transition-all duration-1000 ease-out
//           ${isVisible 
//             ? 'opacity-40 scale-100' 
//             : 'opacity-0 scale-75'
//           }
//         `}
//         style={{ transitionDelay: '700ms' }}
//         />
//       </div>

//       <section 
//         ref={sectionRef}
//         id="projects"
//         className="max-w-6xl mx-auto relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
//       >
//         <div 
//           ref={headerRef}
//           className={`
//             text-center mb-12
//             transform transition-all duration-800 ease-out
//             ${headerVisible 
//               ? 'opacity-100 translate-y-0' 
//               : 'opacity-0 translate-y-6'
//             }
//           `}
//         >
//           <div className={`
//             inline-flex items-center gap-2 px-4 py-2 
//             bg-purple-50 rounded-full border border-purple-200 mb-4 shadow-sm
//             transform transition-all duration-500 ease-out
//             hover:scale-105 hover:shadow-md active:scale-95
//             ${headerVisible 
//               ? 'opacity-100 translate-y-0' 
//               : 'opacity-0 -translate-y-4'
//             }
//           `}
//           style={{ transitionDelay: '200ms' }}
//           >
//             <Rocket className="w-4 h-4 text-purple-500 transition-transform duration-300 hover:rotate-12" />
//             <span className="text-sm font-medium text-purple-700">My Work</span>
//           </div>
          
//           <h2 className={`
//             text-4xl md:text-5xl font-bold mb-4 
//             bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 
//             bg-clip-text text-transparent
//             transform transition-all duration-600 ease-out
//             ${headerVisible 
//               ? 'opacity-100 translate-y-0' 
//               : 'opacity-0 translate-y-4'
//             }
//           `}
//           style={{ transitionDelay: '300ms' }}
//           >
//             Featured Projects
//           </h2>
          
//           <div className={`
//             flex justify-center items-center gap-2 mb-6
//             transform transition-all duration-500 ease-out
//             ${headerVisible 
//               ? 'opacity-100' 
//               : 'opacity-0'
//             }
//           `}
//           style={{ transitionDelay: '400ms' }}
//           >
//             <div className={`
//               h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
//               transition-all duration-800 ease-out
//               ${headerVisible ? 'w-12' : 'w-0'}
//             `}
//             style={{ transitionDelay: '400ms' }}
//             />
//             <div className={`
//               transform transition-all duration-500 ease-out
//               ${headerVisible 
//                 ? 'scale-100 rotate-0' 
//                 : 'scale-0 rotate-180'
//               }
//             `}
//             style={{ transitionDelay: '500ms' }}
//             >
//               <Star className="w-5 h-5 text-yellow-500 fill-current animate-pulse" />
//             </div>
//             <div className={`
//               h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full
//               transition-all duration-800 ease-out
//               ${headerVisible ? 'w-12' : 'w-0'}
//             `}
//             style={{ transitionDelay: '600ms' }}
//             />
//           </div>

//           <div className={`
//             relative bg-white/90 backdrop-blur-sm p-5 rounded-2xl 
//             border border-white/20 shadow-lg max-w-3xl mx-auto
//             transform transition-all duration-700 ease-out
//             hover:shadow-xl hover:scale-[1.02]
//             ${headerVisible 
//               ? 'opacity-100 translate-y-0' 
//               : 'opacity-0 translate-y-5'
//             }
//           `}
//           style={{ transitionDelay: '700ms' }}
//           >
//             <div className="relative flex items-center justify-center gap-3 mb-4">
//               <div className={`
//                 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md
//                 transform transition-all duration-500 ease-out
//                 hover:scale-110 hover:rotate-3
//                 ${headerVisible 
//                   ? 'scale-100' 
//                   : 'scale-0'
//                 }
//               `}
//               style={{ transitionDelay: '800ms' }}
//               >
//                 <Code2 className="w-5 h-5 text-white" />
//               </div>
//               <p className={`
//                 text-gray-700 text-base font-medium
//                 transform transition-all duration-500 ease-out
//                 ${headerVisible 
//                   ? 'opacity-100' 
//                   : 'opacity-0'
//                 }
//               `}
//               style={{ transitionDelay: '900ms' }}
//               >
//                 Showcasing my expertise through <span className="text-purple-600 font-bold">real-world applications</span> that solve complex problems
//               </p>
//             </div>
            
//             {/* Optimized Project Stats */}
//             <div className={`
//               flex justify-center gap-4 mt-4 flex-wrap
//               transform transition-all duration-500 ease-out
//               ${headerVisible 
//                 ? 'opacity-100' 
//                 : 'opacity-0'
//               }
//             `}
//             style={{ transitionDelay: '1000ms' }}
//             >
//               {stats.map((stat, index) => (
//                 <StatCard
//                   key={stat.label}
//                   stat={stat}
//                   index={index}
//                   isVisible={headerVisible}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Optimized Projects Grid */}
//         <div 
//           ref={projectsRef}
//           className={`
//             grid lg:grid-cols-1 gap-8
//             transform transition-all duration-600 ease-out
//             ${projectsVisible 
//               ? 'opacity-100' 
//               : 'opacity-0'
//             }
//           `}
//         >
//           {projects.map((project, index) => (
//             <ProjectItem
//               key={project.id}
//               project={project}
//               index={index}
//               isVisible={projectsVisible}
//             />
//           ))}
//         </div>

//         {/* Enhanced bottom decorative element */}
//         <div className={`
//           flex justify-center mt-16
//           transform transition-all duration-600 ease-out
//           ${projectsVisible 
//             ? 'opacity-100 translate-y-0' 
//             : 'opacity-0 translate-y-5'
//           }
//         `}
//         style={{ transitionDelay: '1200ms' }}
//         >
//           <div className={`
//             flex items-center gap-2 px-4 py-2 
//             bg-gradient-to-r from-gray-50 to-white rounded-full 
//             border border-gray-200/50 shadow-md
//             transform transition-all duration-300 ease-out
//             hover:scale-105 hover:shadow-lg active:scale-95
//             cursor-pointer group
//           `}>
//             <div className={`
//               transform transition-all duration-500 ease-out
//               group-hover:rotate-12 group-hover:scale-110
//               ${projectsVisible 
//                 ? 'scale-100' 
//                 : 'scale-0'
//               }
//             `}
//             style={{ transitionDelay: '1300ms' }}
//             >
//               <Sparkles className="w-4 h-4 text-purple-500" />
//             </div>
//             <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
//               More projects coming soon!
//             </span>
//             <div className={`
//               transform transition-all duration-500 ease-out
//               group-hover:-rotate-12 group-hover:scale-110
//               ${projectsVisible 
//                 ? 'scale-100' 
//                 : 'scale-0'
//               }
//             `}
//             style={{ transitionDelay: '1400ms' }}
//             >
//               <Sparkles className="w-4 h-4 text-pink-500" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// });

// // 'use client'

// // import { motion, useInView } from "framer-motion";
// // import { Rocket, Star, Code2, Sparkles, Trophy, Zap, FolderOpen } from "lucide-react";
// // import ProjectCard from "@/components/ProjectCard";
// // import { memo, useMemo, useRef, useState, useEffect, useCallback } from "react";

// // interface Project {
// //   id: string;
// //   // Add other project properties as needed
// // }

// // interface ProjectsSectionProps {
// //   containerVariants: any;
// //   itemVariants: any;
// //   projects: Project[];
// // }

// // // Optimized stat card component
// // const StatCard = memo(({ 
// //   stat, 
// //   index, 
// //   isVisible 
// // }: { 
// //   stat: any; 
// //   index: number; 
// //   isVisible: boolean; 
// // }) => (
// //   <motion.div
// //     className="flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-xl border border-gray-200/50"
// //     initial={{ opacity: 0, scale: 0 }}
// //     animate={isVisible ? { opacity: 1, scale: 1 } : {}}
// //     transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
// //     whileHover={{ scale: 1.05 }}
// //   >
// //     <div className={`p-1.5 bg-gradient-to-r ${stat.color} rounded-lg`}>
// //       <stat.icon className="w-3 h-3 text-white" />
// //     </div>
// //     <div className="text-center">
// //       <div className="text-sm font-bold text-gray-800">{stat.value}</div>
// //       <div className="text-xs text-gray-600">{stat.label}</div>
// //     </div>
// //   </motion.div>
// // ));

// // StatCard.displayName = 'StatCard';

// // // Optimized project item component
// // const ProjectItem = memo(({ 
// //   project, 
// //   index, 
// //   isVisible 
// // }: { 
// //   project: Project; 
// //   index: number; 
// //   isVisible: boolean; 
// // }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 30 }}
// //     animate={isVisible ? { opacity: 1, y: 0 } : {}}
// //     transition={{ 
// //       delay: index * 0.15, 
// //       duration: 0.5,
// //       ease: "easeOut"
// //     }}
// //     className="relative group"
// //   >
// //     {/* Project highlight indicator */}
// //     <div className={`absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
    
// //     <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
// //       {/* Subtle gradient overlay */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-purple-50/20 pointer-events-none" />
      
// //       <div className="relative z-10">
// //         <ProjectCard project={project} />
// //       </div>
// //     </div>
// //   </motion.div>
// // ));

// // ProjectItem.displayName = 'ProjectItem';

// // export default memo(function ProjectsSection({ 
// //   containerVariants, 
// //   itemVariants, 
// //   projects 
// // }: ProjectsSectionProps) {
// //   const sectionRef = useRef(null);
// //   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
// //   const [headerAnimated, setHeaderAnimated] = useState(false);

// //   // Memoize static data to prevent recreation
// //   const stats = useMemo(() => [
// //     { icon: FolderOpen, label: "Projects", value: projects.length, color: "from-blue-500 to-cyan-500" },
// //     { icon: Trophy, label: "Completed", value: projects.length, color: "from-green-500 to-emerald-500" },
// //     { icon: Zap, label: "Technologies", value: "6+", color: "from-purple-500 to-pink-500" }
// //   ], [projects.length]);

// //   // Track header animation completion
// //   useEffect(() => {
// //     if (isInView && !headerAnimated) {
// //       const timer = setTimeout(() => {
// //         setHeaderAnimated(true);
// //       }, 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [isInView, headerAnimated]);

// //   const handleHeaderAnimationComplete = useCallback(() => {
// //     setHeaderAnimated(true);
// //   }, []);

// //   return (
// //     <div className="relative overflow-hidden">
// //       {/* Simplified background elements */}
// //       <div className="absolute inset-0 pointer-events-none opacity-40">
// //         <div className="absolute top-32 left-16 w-28 h-28 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
// //         <div className="absolute bottom-32 right-16 w-36 h-36 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl" />
// //       </div>

// //       <motion.section 
// //         ref={sectionRef}
// //         id="projects"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true, amount: 0.1 }}
// //         variants={containerVariants}
// //         className="max-w-6xl mx-auto relative z-10"
// //       >
// //         <motion.div 
// //           variants={itemVariants} 
// //           className="text-center mb-12"
// //         >
// //           <motion.div
// //             className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200 mb-4"
// //             whileHover={{ scale: 1.02 }}
// //             transition={{ duration: 0.2 }}
// //           >
// //             <Rocket className="w-4 h-4 text-purple-500" />
// //             <span className="text-sm font-medium text-purple-700">My Work</span>
// //           </motion.div>
          
// //           <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
// //             Featured Projects
// //           </h2>
          
// //           <div className="flex justify-center items-center gap-2 mb-6">
// //             <motion.div 
// //               className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
// //               initial={{ width: 0 }}
// //               animate={isInView ? { width: "3rem" } : {}}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             />
// //             <Star className="w-5 h-5 text-yellow-500 fill-current" />
// //             <motion.div 
// //               className="w-12 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
// //               initial={{ width: 0 }}
// //               animate={isInView ? { width: "3rem" } : {}}
// //               transition={{ duration: 0.8, delay: 0.3 }}
// //             />
// //           </div>

// //           <motion.div
// //             className="relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-lg max-w-3xl mx-auto"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={isInView ? { opacity: 1, y: 0 } : {}}
// //             transition={{ duration: 0.5, delay: 0.4 }}
// //           >
// //             <div className="relative flex items-center justify-center gap-3 mb-4">
// //               <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
// //                 <Code2 className="w-5 h-5 text-white" />
// //               </div>
// //               <p className="text-gray-700 text-base font-medium">
// //                 Showcasing my expertise through <span className="text-purple-600 font-bold">real-world applications</span> that solve complex problems
// //               </p>
// //             </div>
            
// //             {/* Optimized Project Stats */}
// //             <div className="flex justify-center gap-4 mt-4">
// //               {stats.map((stat, index) => (
// //                 <StatCard
// //                   key={stat.label}
// //                   stat={stat}
// //                   index={index}
// //                   isVisible={isInView}
// //                 />
// //               ))}
// //             </div>
// //           </motion.div>
// //         </motion.div>

// //         {/* Optimized Projects Grid */}
// //         <motion.div 
// //           variants={itemVariants}
// //           className="grid lg:grid-cols-1 gap-6"
// //         >
// //           {projects.map((project, index) => (
// //             <ProjectItem
// //               key={project.id}
// //               project={project}
// //               index={index}
// //               isVisible={isInView}
// //             />
// //           ))}
// //         </motion.div>

// //         {/* Simplified bottom decorative element */}
// //         <motion.div
// //           className="flex justify-center mt-12"
// //           initial={{ opacity: 0 }}
// //           animate={isInView ? { opacity: 1 } : {}}
// //           transition={{ delay: 0.6, duration: 0.4 }}
// //         >
// //           <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-white rounded-full border border-gray-200/50 shadow-md">
// //             <Sparkles className="w-4 h-4 text-purple-500" />
// //             <span className="text-sm font-medium text-gray-600">More projects coming soon!</span>
// //             <Sparkles className="w-4 h-4 text-pink-500" />
// //           </div>
// //         </motion.div>
// //       </motion.section>
// //     </div>
// //   );
// // });