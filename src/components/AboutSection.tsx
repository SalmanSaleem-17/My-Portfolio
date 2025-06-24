'use client'

import { GraduationCap, Star, Code, Sparkles, Trophy, Zap } from "lucide-react";
import { FaReact, FaNodeJs, FaDatabase, FaJs } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";
import { memo, useMemo, useEffect, useRef, useState } from "react";
import { Variants } from "framer-motion";

interface AboutSectionProps {
  containerVariants?: Variants;
  itemVariants?: Variants;
}

// Memoized tech stack component
const TechStackItem = memo(({ tech, index, itemVariants }: { tech: any, index: number, itemVariants?: Variants }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 50);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 
        hover:border-gray-300 hover:scale-105 hover:-translate-y-0.5 
        transition-all duration-300 ease-out cursor-pointer
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        transform-gpu will-change-transform`}
      style={{ 
        transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
        transform: isVisible ? 'scale(1)' : 'scale(0.9)' 
      }}
    >
      <tech.icon className={`w-5 h-5 ${tech.color} transition-colors duration-200`} />
      <span className="text-sm font-medium text-gray-700">{tech.name}</span>
    </div>
  );
});

// Memoized strength item component
const StrengthItem = memo(({ item, index, itemVariants }: { item: any, index: number, itemVariants?: Variants }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 50);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-white/30
        hover:translate-x-1 transition-all duration-300 ease-out cursor-pointer
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
        transform-gpu will-change-transform`}
      style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms' }}
    >
      <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg transition-transform duration-200 hover:scale-110`}>
        <item.icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-gray-700 font-medium">{item.text}</span>
    </div>
  );
});

// Memoized background component
const AnimatedBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl opacity-60 animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/15 to-orange-400/15 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400/8 to-cyan-400/8 rounded-full blur-2xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
  </div>
));

// Floating animation component
const FloatingElement = memo(({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <div 
    className="animate-bounce transform-gpu will-change-transform"
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: '4s',
      animationIterationCount: 'infinite'
    }}
  >
    {children}
  </div>
));

// Glow effect component
const GlowCard = memo(({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-sm -z-10 
      animate-pulse"></div>
    {children}
  </div>
));

export default function AboutSection({ containerVariants, itemVariants }: AboutSectionProps) {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Memoize tech stack to prevent recreation
  const techStack = useMemo(() => [
    { icon: FaReact, color: "text-cyan-500", name: "React" },
    { icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
    { icon: SiExpress, color: "text-gray-600", name: "Express" },
    { icon: SiMongodb, color: "text-green-600", name: "MongoDB" },
    { icon: FaJs, color: "text-yellow-500", name: "JavaScript" },
    { icon: SiTailwindcss, color: "text-teal-500", name: "Tailwind" }
  ], []);

  // Memoize strengths array
  const strengths = useMemo(() => [
    { icon: FaReact, text: "Full-Stack MERN Development", color: "from-cyan-500 to-blue-500" },
    { icon: Trophy, text: "Independent Project Completion", color: "from-yellow-500 to-orange-500" },
    { icon: Zap, text: "Problem-Solving & Adaptability", color: "from-purple-500 to-pink-500" },
    { icon: Star, text: "Modern Web Technologies", color: "from-green-500 to-emerald-500" }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          setTimeout(() => setHeaderVisible(true), 100);
          setTimeout(() => setContentVisible(true), 300);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden pb-10">
      <AnimatedBackground />

      <section 
        ref={sectionRef}
        id="about"
        className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ease-out transform-gpu will-change-transform
          ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-800 ease-out transform-gpu will-change-transform
          ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/30 mb-6 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-purple-500/15 transition-all duration-300 ease-out cursor-pointer transform-gpu will-change-transform">
            <Sparkles className="w-5 h-5 text-blue-500 transition-transform duration-200 hover:rotate-12" />
            <span className="text-sm font-medium text-gray-700">Get to know me</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent
            hover:bg-gradient-to-r hover:from-blue-900 hover:via-purple-800 hover:to-pink-800 transition-all duration-500">
            About Me
          </h2>
          
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-800 ease-out
              ${headerVisible ? 'w-16' : 'w-0'}`} 
              style={{ transitionDelay: '300ms' }} />
            
            <div className="animate-spin transform-gpu will-change-transform" style={{ animationDuration: '15s' }}>
              <Star className="w-6 h-6 text-yellow-500 fill-current transition-transform duration-200 hover:scale-125" />
            </div>
            
            <div className={`h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-800 ease-out
              ${headerVisible ? 'w-16' : 'w-0'}`}
              style={{ transitionDelay: '500ms' }} />
          </div>
        </div>

        {/* Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out transform-gpu will-change-transform
          ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Column - Main Content */}
          <div>
            <GlowCard className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl hover:scale-105 hover:shadow-xl transition-all duration-500 ease-out transform-gpu will-change-transform">
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg 
                    hover:scale-110 transition-transform duration-200 ease-out">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">My Journey</h3>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg mb-6 font-medium hover:text-gray-800 transition-colors duration-300">
                  I am a dedicated and self-motivated <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold
                    hover:from-purple-600 hover:to-pink-600 transition-all duration-300">Computer Science graduate</span> with a strong foundation in full-stack development. As a MERN Stack Developer, I have successfully completed my Final Year Project independently, showcasing my expertise in modern web technologies.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg font-medium hover:text-gray-800 transition-colors duration-300">
                  My passion lies in creating <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold
                    hover:from-blue-600 hover:to-purple-600 transition-all duration-300">elegant, scalable solutions</span> that solve real-world problems. I excel at handling both frontend and backend tasks, demonstrating strong problem-solving skills and adaptability in software development.
                </p>

                <div className="mt-8">
                  <p className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 hover:scale-125 transition-transform duration-200" />
                    Technologies I work with
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech, index) => (
                      <TechStackItem key={tech.name} tech={tech} index={index} itemVariants={itemVariants} />
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column - Education & Strengths */}
          <div>
            <div className="space-y-6">
              
              {/* Education Card */}
              <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl border border-blue-200/50 shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer transform-gpu will-change-transform group">
                
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-xl 
                  group-hover:w-24 group-hover:h-24 transition-all duration-500" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <FloatingElement delay={0}>
                    <div className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <GraduationCap className="w-8 h-8 text-blue-600 hover:scale-110 transition-transform duration-200" />
                    </div>
                  </FloatingElement>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2 group-hover:text-blue-800 transition-colors duration-300">
                      Education
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </h3>
                  </div>
                </div>
                
                <div className="relative z-10 space-y-2">
                  <p className="text-gray-800 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300">
                    Bachelor of Science in Computer Science
                  </p>
                  <p className="text-blue-700 font-medium group-hover:text-blue-800 transition-colors duration-300">
                    COMSATS University Islamabad
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform duration-200" />
                    <p className="text-sm text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                      February 2020 – January 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths Card */}
              <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 rounded-3xl border border-green-200/50 shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer transform-gpu will-change-transform group">
                
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-green-400/15 to-emerald-400/15 rounded-full blur-xl
                  group-hover:w-28 group-hover:h-28 transition-all duration-500" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <FloatingElement delay={1000}>
                    <div className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Trophy className="w-8 h-8 text-green-600 hover:scale-110 transition-transform duration-200" />
                    </div>
                  </FloatingElement>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-green-800 transition-colors duration-300">
                    Key Strengths
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-3 relative z-10">
                  {strengths.map((item, index) => (
                    <StrengthItem key={index} item={item} index={index} itemVariants={itemVariants} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// 'use client'

// import { motion } from "framer-motion";
// import { GraduationCap, Star, Code, Sparkles, Trophy, Zap } from "lucide-react";
// import { FaReact, FaNodeJs, FaDatabase, FaJs } from "react-icons/fa";
// import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";
// import { memo, useMemo } from "react";

// // Memoized animation variants to prevent recreation on each render
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1, // Reduced from 0.15
//       delayChildren: 0.1    // Reduced from 0.2
//     }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30, scale: 0.98 }, // Reduced animation distance
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.5, // Reduced from 0.8
//       ease: "easeOut" // Simplified easing
//     }
//   }
// };

// // Reduced animation complexity for background elements
// const floatingVariants = {
//   animate: {
//     y: [-5, 5, -5], // Reduced range
//     transition: {
//       duration: 4, // Reduced from 6
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   }
// };

// // Simplified glow animation
// const glowVariants = {
//   animate: {
//     boxShadow: [
//       "0 0 15px rgba(59, 130, 246, 0.2)",
//       "0 0 25px rgba(147, 51, 234, 0.3)",
//       "0 0 15px rgba(59, 130, 246, 0.2)"
//     ],
//     transition: {
//       duration: 4, // Increased duration for smoother animation
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   }
// };

// // Memoized tech stack component
// const TechStackItem = memo(({ tech, index }) => (
//   <motion.div
//     className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
//     whileHover={{ scale: 1.05, y: -1 }} // Reduced animation
//     initial={{ opacity: 0, scale: 0.9 }}
//     whileInView={{ opacity: 1, scale: 1 }}
//     viewport={{ once: true }}
//     transition={{ delay: index * 0.05, duration: 0.3 }} // Faster, shorter delays
//   >
//     <tech.icon className={`w-5 h-5 ${tech.color}`} />
//     <span className="text-sm font-medium text-gray-700">{tech.name}</span>
//   </motion.div>
// ));

// // Memoized strength item component
// const StrengthItem = memo(({ item, index }) => (
//   <motion.div
//     className="flex items-center gap-3 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-white/30"
//     initial={{ opacity: 0, x: -15 }}
//     whileInView={{ opacity: 1, x: 0 }}
//     viewport={{ once: true }}
//     transition={{ delay: index * 0.05, duration: 0.3 }}
//     whileHover={{ x: 3 }} // Reduced hover effect
//   >
//     <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg`}>
//       <item.icon className="w-4 h-4 text-white" />
//     </div>
//     <span className="text-gray-700 font-medium">{item.text}</span>
//   </motion.div>
// ));

// // Memoized background component to prevent unnecessary re-renders
// const AnimatedBackground = memo(() => (
//   <div className="absolute inset-0 pointer-events-none">
//     <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl opacity-60"></div>
//     <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/15 to-orange-400/15 rounded-full blur-xl opacity-60" style={{ animationDelay: '1s' }}></div>
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400/8 to-cyan-400/8 rounded-full blur-2xl opacity-60" style={{ animationDelay: '2s' }}></div>
//   </div>
// ));

// export default function AboutSection() {
//   // Memoize tech stack to prevent recreation
//   const techStack = useMemo(() => [
//     { icon: FaReact, color: "text-cyan-500", name: "React" },
//     { icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
//     { icon: SiExpress, color: "text-gray-600", name: "Express" },
//     { icon: SiMongodb, color: "text-green-600", name: "MongoDB" },
//     { icon: FaJs, color: "text-yellow-500", name: "JavaScript" },
//     { icon: SiTailwindcss, color: "text-teal-500", name: "Tailwind" }
//   ], []);

//   // Memoize strengths array
//   const strengths = useMemo(() => [
//     { icon: FaReact, text: "Full-Stack MERN Development", color: "from-cyan-500 to-blue-500" },
//     { icon: Trophy, text: "Independent Project Completion", color: "from-yellow-500 to-orange-500" },
//     { icon: Zap, text: "Problem-Solving & Adaptability", color: "from-purple-500 to-pink-500" },
//     { icon: Star, text: "Modern Web Technologies", color: "from-green-500 to-emerald-500" }
//   ], []);

//   return (
//     <div className="relative overflow-hidden">
//       <AnimatedBackground />

//       <motion.section 
//         id="about"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }} // Reduced threshold
//         variants={containerVariants}
//         className="max-w-6xl mx-auto relative z-10"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12"> {/* Reduced margin */}
//           <motion.div
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/30 mb-6"
//             whileHover={{ scale: 1.02 }} // Reduced scale
//             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//           >
//             <Sparkles className="w-5 h-5 text-blue-500" />
//             <span className="text-sm font-medium text-gray-700">Get to know me</span>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
//             About Me
//           </h2>
//           <div className="flex justify-center items-center gap-2 mb-4">
//             <motion.div 
//               className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
//               initial={{ width: 0 }}
//               whileInView={{ width: "4rem" }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//             />
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 15, repeat: Infinity, ease: "linear" }} // Slower rotation
//             >
//               <Star className="w-6 h-6 text-yellow-500 fill-current" />
//             </motion.div>
//             <motion.div 
//               className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
//               initial={{ width: 0 }}
//               whileInView={{ width: "4rem" }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             />
//           </div>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 items-center"> {/* Reduced gap */}
//           <motion.div variants={itemVariants}>
//             <motion.div 
//               className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl"
//               variants={glowVariants}
//               animate="animate"
//             >
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 blur-sm -z-10" />
              
//               <div className="relative">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
//                     <Code className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800">My Journey</h3>
//                 </div>
                
//                 <p className="text-gray-700 leading-relaxed text-lg mb-6 font-medium">
//                   I am a dedicated and self-motivated <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Computer Science graduate</span> with a strong foundation in full-stack development. As a MERN Stack Developer, I have successfully completed my Final Year Project independently, showcasing my expertise in modern web technologies.
//                 </p>
//                 <p className="text-gray-700 leading-relaxed text-lg font-medium">
//                   My passion lies in creating <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold">elegant, scalable solutions</span> that solve real-world problems. I excel at handling both frontend and backend tasks, demonstrating strong problem-solving skills and adaptability in software development.
//                 </p>

//                 <div className="mt-8">
//                   <p className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
//                     <Zap className="w-4 h-4 text-yellow-500" />
//                     Technologies I work with
//                   </p>
//                   <div className="flex flex-wrap gap-3"> {/* Reduced gap */}
//                     {techStack.map((tech, index) => (
//                       <TechStackItem key={tech.name} tech={tech} index={index} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <div className="space-y-6"> {/* Reduced spacing */}
//               <motion.div 
//                 className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl border border-blue-200/50 shadow-xl overflow-hidden"
//                 whileHover={{ scale: 1.01 }} // Reduced scale
//                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
//               >
//                 <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-xl" />
                
//                 <div className="flex items-center gap-4 mb-6 relative z-10">
//                   <motion.div 
//                     className="p-3 bg-white rounded-2xl shadow-lg"
//                     variants={floatingVariants}
//                     animate="animate"
//                   >
//                     <GraduationCap className="w-8 h-8 text-blue-600" />
//                   </motion.div>
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
//                       Education
//                       <GraduationCap className="w-5 h-5 text-blue-600" />
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="relative z-10 space-y-2">
//                   <p className="text-gray-800 font-semibold text-lg">Bachelor of Science in Computer Science</p>
//                   <p className="text-blue-700 font-medium">COMSATS University Islamabad</p>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full" /> {/* Removed animate-pulse */}
//                     <p className="text-sm text-gray-600 font-medium">February 2020 – January 2025</p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div 
//                 className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 rounded-3xl border border-green-200/50 shadow-xl overflow-hidden"
//                 whileHover={{ scale: 1.01 }} // Reduced scale
//                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
//               >
//                 <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-green-400/15 to-emerald-400/15 rounded-full blur-xl" />
                
//                 <div className="flex items-center gap-4 mb-6 relative z-10">
//                   <motion.div 
//                     className="p-3 bg-white rounded-2xl shadow-lg"
//                     variants={floatingVariants}
//                     animate="animate"
//                   >
//                     <Trophy className="w-8 h-8 text-green-600" />
//                   </motion.div>
//                   <h3 className="font-bold text-xl text-gray-900">Key Strengths</h3>
//                 </div>
                
//                 <div className="grid grid-cols-1 gap-3 relative z-10"> {/* Reduced gap */}
//                   {strengths.map((item, index) => (
//                     <StrengthItem key={index} item={item} index={index} />
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.section>
//     </div>
//   );
// }

// // 'use client'

// // import { motion } from "framer-motion";
// // import { GraduationCap, Star, Code, Sparkles, Trophy, Zap } from "lucide-react";
// // import { FaReact, FaNodeJs, FaDatabase, FaJs } from "react-icons/fa";
// // import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";

// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.15,
// //       delayChildren: 0.2
// //     }
// //   }
// // };

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 50, scale: 0.95 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     scale: 1,
// //     transition: {
// //       duration: 0.8,
// //       ease: [0.25, 0.46, 0.45, 0.94]
// //     }
// //   }
// // };

// // const floatingVariants = {
// //   animate: {
// //     y: [-10, 10, -10],
// //     rotate: [0, 5, -5, 0],
// //     transition: {
// //       duration: 6,
// //       repeat: Infinity,
// //       ease: "easeInOut"
// //     }
// //   }
// // };

// // const glowVariants = {
// //   animate: {
// //     boxShadow: [
// //       "0 0 20px rgba(59, 130, 246, 0.3)",
// //       "0 0 40px rgba(147, 51, 234, 0.4)",
// //       "0 0 20px rgba(59, 130, 246, 0.3)"
// //     ],
// //     transition: {
// //       duration: 3,
// //       repeat: Infinity,
// //       ease: "easeInOut"
// //     }
// //   }
// // };

// // export default function AboutSection() {
// //   const techStack = [
// //     { icon: FaReact, color: "text-cyan-500", name: "React" },
// //     { icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
// //     { icon: SiExpress, color: "text-gray-600", name: "Express" },
// //     { icon: SiMongodb, color: "text-green-600", name: "MongoDB" },
// //     { icon: FaJs, color: "text-yellow-500", name: "JavaScript" },
// //     { icon: SiTailwindcss, color: "text-teal-500", name: "Tailwind" }
// //   ];

// //   return (
// //     <div className="relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
// //         <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
// //       </div>

// //       <motion.section 
// //         id="about"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true, amount: 0.3 }}
// //         variants={containerVariants}
// //         className="max-w-6xl mx-auto relative z-10"
// //       >
// //         <motion.div variants={itemVariants} className="text-center mb-16">
// //           <motion.div
// //             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/30 mb-6"
// //             whileHover={{ scale: 1.05 }}
// //             transition={{ type: "spring", stiffness: 300 }}
// //           >
// //             <Sparkles className="w-5 h-5 text-blue-500" />
// //             <span className="text-sm font-medium text-gray-700">Get to know me</span>
// //           </motion.div>
          
// //           <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
// //             About Me
// //           </h2>
// //           <div className="flex justify-center items-center gap-2 mb-4">
// //             <motion.div 
// //               className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
// //               initial={{ width: 0 }}
// //               whileInView={{ width: "4rem" }}
// //               transition={{ duration: 1, delay: 0.5 }}
// //             ></motion.div>
// //             <motion.div
// //               animate={{ rotate: 360 }}
// //               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //             >
// //               <Star className="w-6 h-6 text-yellow-500 fill-current" />
// //             </motion.div>
// //             <motion.div 
// //               className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
// //               initial={{ width: 0 }}
// //               whileInView={{ width: "4rem" }}
// //               transition={{ duration: 1, delay: 0.7 }}
// //             ></motion.div>
// //           </div>
// //         </motion.div>

// //         <div className="grid lg:grid-cols-2 gap-16 items-center">
// //           <motion.div variants={itemVariants}>
// //             <motion.div 
// //               className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl"
// //               variants={glowVariants}
// //               animate="animate"
// //             >
// //               {/* Gradient border effect */}
// //               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm -z-10"></div>
              
// //               <div className="relative">
// //                 <div className="flex items-center gap-3 mb-6">
// //                   <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //                     <Code className="w-6 h-6 text-white" />
// //                   </div>
// //                   <h3 className="text-xl font-bold text-gray-800">My Journey</h3>
// //                 </div>
                
// //                 <p className="text-gray-700 leading-relaxed text-lg mb-6 font-medium">
// //                   I am a dedicated and self-motivated <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Computer Science graduate</span> with a strong foundation in full-stack development. As a MERN Stack Developer, I have successfully completed my Final Year Project independently, showcasing my expertise in modern web technologies.
// //                 </p>
// //                 <p className="text-gray-700 leading-relaxed text-lg font-medium">
// //                   My passion lies in creating <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold">elegant, scalable solutions</span> that solve real-world problems. I excel at handling both frontend and backend tasks, demonstrating strong problem-solving skills and adaptability in software development.
// //                 </p>

// //                 {/* Tech Stack Icons */}
// //                 <div className="mt-8">
// //                   <p className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
// //                     <Zap className="w-4 h-4 text-yellow-500" />
// //                     Technologies I work with
// //                   </p>
// //                   <div className="flex flex-wrap gap-4">
// //                     {techStack.map((tech, index) => (
// //                       <motion.div
// //                         key={tech.name}
// //                         className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
// //                         whileHover={{ scale: 1.1, y: -2 }}
// //                         initial={{ opacity: 0, scale: 0 }}
// //                         whileInView={{ opacity: 1, scale: 1 }}
// //                         transition={{ delay: index * 0.1 }}
// //                       >
// //                         <tech.icon className={`w-5 h-5 ${tech.color}`} />
// //                         <span className="text-sm font-medium text-gray-700">{tech.name}</span>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>

// //           <motion.div variants={itemVariants}>
// //             <div className="space-y-8">
// //               <motion.div 
// //                 className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl border border-blue-200/50 shadow-xl overflow-hidden"
// //                 whileHover={{ scale: 1.02 }}
// //                 transition={{ type: "spring", stiffness: 300 }}
// //               >
// //                 <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                
// //                 <div className="flex items-center gap-4 mb-6 relative z-10">
// //                   <motion.div 
// //                     className="p-3 bg-white rounded-2xl shadow-lg"
// //                     variants={floatingVariants}
// //                     animate="animate"
// //                   >
// //                     <img 
// //                       src="/images/comsats.png" 
// //                       alt="COMSATS Logo" 
// //                       className="w-8 h-8 object-contain"
// //                     />
// //                   </motion.div>
// //                   <div>
// //                     <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
// //                       Education
// //                       <GraduationCap className="w-5 h-5 text-blue-600" />
// //                     </h3>
// //                   </div>
// //                 </div>
                
// //                 <div className="relative z-10 space-y-2">
// //                   <p className="text-gray-800 font-semibold text-lg">Bachelor of Science in Computer Science</p>
// //                   <p className="text-blue-700 font-medium">COMSATS University Islamabad</p>
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
// //                     <p className="text-sm text-gray-600 font-medium">February 2020 – January 2025</p>
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               <motion.div 
// //                 className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 rounded-3xl border border-green-200/50 shadow-xl overflow-hidden"
// //                 whileHover={{ scale: 1.02 }}
// //                 transition={{ type: "spring", stiffness: 300 }}
// //               >
// //                 <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
                
// //                 <div className="flex items-center gap-4 mb-6 relative z-10">
// //                   <motion.div 
// //                     className="p-3 bg-white rounded-2xl shadow-lg"
// //                     variants={floatingVariants}
// //                     animate="animate"
// //                   >
// //                     <Trophy className="w-8 h-8 text-green-600" />
// //                   </motion.div>
// //                   <h3 className="font-bold text-xl text-gray-900">Key Strengths</h3>
// //                 </div>
                
// //                 <div className="grid grid-cols-1 gap-4 relative z-10">
// //                   {[
// //                     { icon: FaReact, text: "Full-Stack MERN Development", color: "from-cyan-500 to-blue-500" },
// //                     { icon: Trophy, text: "Independent Project Completion", color: "from-yellow-500 to-orange-500" },
// //                     { icon: Zap, text: "Problem-Solving & Adaptability", color: "from-purple-500 to-pink-500" },
// //                     { icon: Star, text: "Modern Web Technologies", color: "from-green-500 to-emerald-500" }
// //                   ].map((item, index) => (
// //                     <motion.div
// //                       key={index}
// //                       className="flex items-center gap-3 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-white/30"
// //                       initial={{ opacity: 0, x: -20 }}
// //                       whileInView={{ opacity: 1, x: 0 }}
// //                       transition={{ delay: index * 0.1 }}
// //                       whileHover={{ x: 5 }}
// //                     >
// //                       <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg`}>
// //                         <item.icon className="w-4 h-4 text-white" />
// //                       </div>
// //                       <span className="text-gray-700 font-medium">{item.text}</span>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </motion.section>
// //     </div>
// //   );
// // }