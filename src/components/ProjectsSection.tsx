'use client'

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ExternalLink, 
  Github, 
  Smartphone, 
  Monitor, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight, 
  Zap,
  Code,
  Palette,
  Globe,
  Play
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  platform: string;
  deviceTargets: string[];
  image: string;
  screenshots: string[];
  mockupType: string;
  link: string;
  demoLink?: string;
  playStoreLink?: string;
  appStoreLink?: string;
  category: string;
  status: string;
  year: string;
  duration: string;
  technologies: string[];
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  problemStatement: string;
  solution: string;
  achievements: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    gradient: string;
  };
  keyScreens?: string[];
  appInfo?: {
    category: string;
    size: string;
    compatibility: string;
    languages: string[];
    version: string;
  };
  roadmap?: string[];
}

interface ProjectsSectionProps {
  containerVariants: Variants;
  itemVariants: Variants;
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  containerVariants,
  itemVariants,
  projects
}) => {
  const categoryColors = {
    'E-commerce': 'bg-gradient-to-r from-purple-500 to-pink-500',
    'Productivity': 'bg-gradient-to-r from-blue-500 to-cyan-500',
    'Healthcare': 'bg-gradient-to-r from-green-500 to-teal-500',
    'Education': 'bg-gradient-to-r from-orange-500 to-red-500',
    'Finance': 'bg-gradient-to-r from-yellow-500 to-orange-500',
  };

  const statusColors = {
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Active Development': 'bg-blue-100 text-blue-800 border-blue-200',
    'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Planning': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const ExpandedProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-blue-50 rounded-3xl shadow-2xl overflow-hidden border-[2px] border-blue-100 mb-12"
      >
        {/* Mobile Header */}
        <div className="lg:hidden p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-100 via-yellow-100 to-blue-100">
          <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">{project.subtitle}</p>
        </div>

        {/* Main Layout */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-0 lg:h-[640px]">
          {/* Left Section - Project Image and Key Info */}
          <div className="lg:col-span-2 relative">
            <div 
              className="relative h-80 sm:h-96 lg:h-full sm:p-8 text-white flex flex-col justify-between"
              style={{ background: project.colors.gradient }}
            >
              {/* Project Image */}
              <div className="flex-1 flex items-center justify-center my-4">
                <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Project Basic Info */}
              <div className="space-y-3 lg:space-y-4">
                <div className="hidden lg:block">
                  <h2 className="text-2xl xl:text-4xl font-bold mb-2">{project.title}</h2>
                  <p className="text-white/90 text-base lg:text-lg">{project.subtitle}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
                    {project.category}
                  </span>
                  <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
                    {project.status}
                  </span>
                  <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
                    {project.year}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4 pt-3 lg:pt-4">
                  <div className="text-center p-2 lg:p-3 bg-black/10 backdrop-blur-sm rounded-xl">
                    <Calendar size={16} className="mx-auto mb-1" />
                    <p className="text-xs opacity-90">Duration</p>
                    <p className="font-semibold text-xs lg:text-sm">{project.duration}</p>
                  </div>
                  <div className="text-center p-2 lg:p-3 bg-black/10 backdrop-blur-sm rounded-xl">
                    <Monitor size={16} className="mx-auto mb-1" />
                    <p className="text-xs opacity-90">Platform</p>
                    <p className="font-semibold text-xs">{project.platform}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Complete Project Details with Scrolling */}
          <div className="lg:col-span-3 lg:h-[640px] lg:overflow-hidden relative">
            <div className="lg:h-full lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-gray-300 lg:scrollbar-track-gray-100 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 xl:px-10 xl:pt-10">
              <div className="space-y-8 lg:space-y-10">
                
                {/* Project Overview Section */}
                <div>
                  <div className="flex items-center space-x-3 mt-8">
                    <Globe className="text-blue-600" size={20} />
                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Project Overview</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
                    {project.longDescription}
                  </p>

                  {/* Problem & Solution Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
                    <div className="p-4 lg:p-6 bg-red-50 rounded-xl lg:rounded-2xl">
                      <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        Problem Statement
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{project.problemStatement}</p>
                    </div>
                    <div className="p-4 lg:p-6 bg-green-50 rounded-xl lg:rounded-2xl">
                      <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        Solution
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{project.solution}</p>
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Key Achievements</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                      {project.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start space-x-3 p-3 lg:p-4 bg-yellow-50 rounded-lg lg:rounded-xl hover:bg-yellow-100 transition-colors">
                          <Star className="text-yellow-500 mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-gray-800 text-xs sm:text-sm lg:text-base">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div>
                  <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                    <Zap className="text-purple-600" size={20} />
                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Key Features</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="p-4 lg:p-6 bg-gray-50 rounded-xl lg:rounded-2xl hover:bg-gray-100 transition-colors group">
                        <div className="flex items-start space-x-3 lg:space-x-4">
                          <div className="flex-shrink-0 text-xl lg:text-2xl xl:text-3xl group-hover:scale-110 transition-transform">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base xl:text-lg">{feature.title}</h4>
                            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack Section */}
                <div>
                  <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                    <Code className="text-green-600" size={20} />
                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Technology Stack</h3>
                  </div>
                  
                  {/* Technologies Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-[1px] border-gray-300 rounded-lg lg:rounded-xl text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-105"
                      >
                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{tech}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    <div className="p-4 lg:p-6 bg-blue-50 rounded-xl border-[1px] border-blue-300 lg:rounded-2xl">
                      <Monitor className="text-blue-500 mb-3" size={20} />
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Platform</h4>
                      <p className="text-gray-700 text-xs lg:text-sm">{project.platform}</p>
                    </div>
                    
                    <div className="p-4 lg:p-6 bg-green-50 rounded-xl border-[1px] border-green-300 lg:rounded-2xl">
                      <Users className="text-green-500 mb-3" size={20} />
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Target Devices</h4>
                      <p className="text-gray-700 text-xs lg:text-sm">{project.deviceTargets.join(', ')}</p>
                    </div>
                    
                    <div className="p-4 lg:p-6 bg-purple-50 rounded-xl border-[1px] border-purple-300 lg:rounded-2xl">
                      <Calendar className="text-purple-500 mb-3" size={20} />
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Development</h4>
                      <p className="text-gray-700 text-xs lg:text-sm">{project.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 p-6 lg:p-8 bg-white border-1 border-gray-200 rounded-2xl sticky bottom-0">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2 group text-sm lg:text-base"
                  >
                    <Github size={16} />
                    <span>View Source Code</span>
                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
                    <Link
                      href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group text-sm lg:text-base"
                      style={{ 
                        background: project.colors.gradient,
                      }}
                    >
                      {project.demoLink ? <ExternalLink size={16} /> : <Play size={16} />}
                      <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
              .scrollbar-thin::-webkit-scrollbar {
                width: 6px;
              }
              .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
                background-color: #d1d5db;
                border-radius: 3px;
              }
              .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
                background-color: #9ca3af;
              }
              .scrollbar-track-gray-100::-webkit-scrollbar-track {
                background-color: #f3f4f6;
              }
            `}</style>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-12 lg:space-y-16"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4 lg:space-y-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 lg:px-6 py-2 lg:py-3 rounded-full">
          <Palette className="text-blue-600" size={16} />
          <span className="text-blue-800 font-medium text-sm lg:text-base">Featured Projects</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          My Work
        </h2>
        
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
          Explore my portfolio of innovative applications and solutions that solve real-world problems 
          through elegant design and cutting-edge technology.
        </p>
      </motion.div>

      {/* Expanded Projects List */}
      <motion.div 
        variants={containerVariants}
        className="space-y-8 lg:space-y-12"
      >
        {projects.map((project, index) => (
          <ExpandedProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection;

// 'use client'

// import React, { useState } from 'react';
// import { motion, Variants } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { 
//   ExternalLink, 
//   Github, 
//   Smartphone, 
//   Monitor, 
//   Calendar, 
//   Users, 
//   Star, 
//   ArrowRight, 
//   Zap,
//   Code,
//   Palette,
//   Globe,
//   Play
// } from 'lucide-react';

// interface Project {
//   id: number;
//   title: string;
//   subtitle: string;
//   description: string;
//   longDescription: string;
//   platform: string;
//   deviceTargets: string[];
//   image: string;
//   screenshots: string[];
//   mockupType: string;
//   link: string;
//   demoLink?: string;
//   playStoreLink?: string;
//   appStoreLink?: string;
//   category: string;
//   status: string;
//   year: string;
//   duration: string;
//   technologies: string[];
//   features: Array<{
//     icon: string;
//     title: string;
//     description: string;
//   }>;
//   problemStatement: string;
//   solution: string;
//   achievements: string[];
//   colors: {
//     primary: string;
//     secondary: string;
//     accent: string;
//     background: string;
//     gradient: string;
//   };
//   keyScreens?: string[];
//   appInfo?: {
//     category: string;
//     size: string;
//     compatibility: string;
//     languages: string[];
//     version: string;
//   };
//   roadmap?: string[];
// }

// interface ProjectsSectionProps {
//   containerVariants: Variants;
//   itemVariants: Variants;
//   projects: Project[];
// }

// const ProjectsSection: React.FC<ProjectsSectionProps> = ({
//   containerVariants,
//   itemVariants,
//   projects
// }) => {
//   const categoryColors = {
//     'E-commerce': 'bg-gradient-to-r from-purple-500 to-pink-500',
//     'Productivity': 'bg-gradient-to-r from-blue-500 to-cyan-500',
//     'Healthcare': 'bg-gradient-to-r from-green-500 to-teal-500',
//     'Education': 'bg-gradient-to-r from-orange-500 to-red-500',
//     'Finance': 'bg-gradient-to-r from-yellow-500 to-orange-500',
//   };

//   const statusColors = {
//     'Completed': 'bg-green-100 text-green-800 border-green-200',
//     'Active Development': 'bg-blue-100 text-blue-800 border-blue-200',
//     'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     'Planning': 'bg-gray-100 text-gray-800 border-gray-200',
//   };

//   const ExpandedProjectCard = ({ project, index }: { project: Project; index: number }) => {
//     return (
//       <motion.div
//         variants={itemVariants}
//         className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12"
//       >
//         {/* Mobile Header */}
//         <div className="lg:hidden p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{project.title}</h2>
//           <p className="text-gray-600 mt-1 text-sm sm:text-base">{project.subtitle}</p>
//         </div>

//         {/* Main Layout */}
//         <div className="lg:grid lg:grid-cols-5 lg:gap-0">
//           {/* Left Section - Project Image and Key Info */}
//           <div className="lg:col-span-2 relative">
//             <div 
//               className="relative h-80 sm:h-96 lg:h-full p-6 sm:p-8 text-white flex flex-col justify-between lg:min-h-[640px]"
//               style={{ background: project.colors.gradient }}
//             >
//               {/* Project Image */}
//               <div className="flex-1 flex items-center justify-center my-4 lg:my-8">
//                 <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover rounded-2xl"
//                     priority
//                   />
//                 </div>
//               </div>

//               {/* Project Basic Info */}
//               <div className="space-y-3 lg:space-y-4">
//                 <div className="hidden lg:block">
//                   <h2 className="text-2xl xl:text-4xl font-bold mb-2">{project.title}</h2>
//                   <p className="text-white/90 text-base lg:text-lg">{project.subtitle}</p>
//                 </div>
                
//                 <div className="flex flex-wrap gap-2">
//                   <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
//                     {project.category}
//                   </span>
//                   <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
//                     {project.status}
//                   </span>
//                   <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
//                     {project.year}
//                   </span>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-2 gap-3 lg:gap-4 pt-3 lg:pt-4">
//                   <div className="text-center p-2 lg:p-3 bg-white/10 backdrop-blur-sm rounded-xl">
//                     <Calendar size={16} className="mx-auto mb-1" />
//                     <p className="text-xs opacity-90">Duration</p>
//                     <p className="font-semibold text-xs lg:text-sm">{project.duration}</p>
//                   </div>
//                   <div className="text-center p-2 lg:p-3 bg-white/10 backdrop-blur-sm rounded-xl">
//                     <Monitor size={16} className="mx-auto mb-1" />
//                     <p className="text-xs opacity-90">Platform</p>
//                     <p className="font-semibold text-xs">{project.platform}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Complete Project Details */}
//           <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8 xl:p-10">
//             <div className="space-y-8 lg:space-y-10">
              
//               {/* Project Overview Section */}
//               <div>
//                 <div className="flex items-center space-x-3 mb-4 lg:mb-6">
//                   <Globe className="text-blue-600" size={20} />
//                   <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Project Overview</h3>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
//                   {project.longDescription}
//                 </p>

//                 {/* Problem & Solution Grid */}
//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
//                   <div className="p-4 lg:p-6 bg-red-50 rounded-xl lg:rounded-2xl">
//                     <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
//                       <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
//                       Problem Statement
//                     </h4>
//                     <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{project.problemStatement}</p>
//                   </div>
//                   <div className="p-4 lg:p-6 bg-green-50 rounded-xl lg:rounded-2xl">
//                     <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
//                       <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
//                       Solution
//                     </h4>
//                     <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{project.solution}</p>
//                   </div>
//                 </div>

//                 {/* Key Achievements */}
//                 <div>
//                   <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Key Achievements</h4>
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
//                     {project.achievements.map((achievement, achievementIndex) => (
//                       <div key={achievementIndex} className="flex items-start space-x-3 p-3 lg:p-4 bg-yellow-50 rounded-lg lg:rounded-xl hover:bg-yellow-100 transition-colors">
//                         <Star className="text-yellow-500 mt-0.5 flex-shrink-0" size={14} />
//                         <span className="text-gray-800 text-xs sm:text-sm lg:text-base">{achievement}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Features Section */}
//               <div>
//                 <div className="flex items-center space-x-3 mb-4 lg:mb-6">
//                   <Zap className="text-purple-600" size={20} />
//                   <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Key Features</h3>
//                 </div>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
//                   {project.features.map((feature, featureIndex) => (
//                     <div key={featureIndex} className="p-4 lg:p-6 bg-gray-50 rounded-xl lg:rounded-2xl hover:bg-gray-100 transition-colors group">
//                       <div className="flex items-start space-x-3 lg:space-x-4">
//                         <div className="flex-shrink-0 text-xl lg:text-2xl xl:text-3xl group-hover:scale-110 transition-transform">
//                           {feature.icon}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base xl:text-lg">{feature.title}</h4>
//                           <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">{feature.description}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Technology Stack Section */}
//               <div>
//                 <div className="flex items-center space-x-3 mb-4 lg:mb-6">
//                   <Code className="text-green-600" size={20} />
//                   <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Technology Stack</h3>
//                 </div>
                
//                 {/* Technologies Grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
//                   {project.technologies.map((tech, techIndex) => (
//                     <div
//                       key={techIndex}
//                       className="p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg lg:rounded-xl text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-105"
//                     >
//                       <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{tech}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Technical Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
//                   <div className="p-4 lg:p-6 bg-blue-50 rounded-xl lg:rounded-2xl">
//                     <Monitor className="text-blue-500 mb-3" size={20} />
//                     <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Platform</h4>
//                     <p className="text-gray-700 text-xs lg:text-sm">{project.platform}</p>
//                   </div>
                  
//                   <div className="p-4 lg:p-6 bg-green-50 rounded-xl lg:rounded-2xl">
//                     <Users className="text-green-500 mb-3" size={20} />
//                     <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Target Devices</h4>
//                     <p className="text-gray-700 text-xs lg:text-sm">{project.deviceTargets.join(', ')}</p>
//                   </div>
                  
//                   <div className="p-4 lg:p-6 bg-purple-50 rounded-xl lg:rounded-2xl">
//                     <Calendar className="text-purple-500 mb-3" size={20} />
//                     <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Development</h4>
//                     <p className="text-gray-700 text-xs lg:text-sm">{project.duration}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 lg:pt-8 border-t border-gray-200">
//                 <Link
//                   href={project.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 bg-gray-900 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2 group text-sm lg:text-base"
//                 >
//                   <Github size={16} />
//                   <span>View Source Code</span>
//                   <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
//                 </Link>
                
//                 {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
//                   <Link
//                     href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group text-sm lg:text-base"
//                     style={{ 
//                       background: project.colors.gradient,
//                     }}
//                   >
//                     {project.demoLink ? <ExternalLink size={16} /> : <Play size={16} />}
//                     <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
//                     <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       className="space-y-12 lg:space-y-16"
//     >
//       {/* Section Header */}
//       <motion.div variants={itemVariants} className="text-center space-y-4 lg:space-y-6">
//         <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 lg:px-6 py-2 lg:py-3 rounded-full">
//           <Palette className="text-blue-600" size={16} />
//           <span className="text-blue-800 font-medium text-sm lg:text-base">Featured Projects</span>
//         </div>
        
//         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
//           My Work
//         </h2>
        
//         <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
//           Explore my portfolio of innovative applications and solutions that solve real-world problems 
//           through elegant design and cutting-edge technology.
//         </p>
//       </motion.div>

//       {/* Expanded Projects List */}
//       <motion.div 
//         variants={containerVariants}
//         className="space-y-8 lg:space-y-12"
//       >
//         {projects.map((project, index) => (
//           <ExpandedProjectCard key={project.id} project={project} index={index} />
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProjectsSection;

// // 'use client'

// // import React, { useState } from 'react';
// // import { motion, Variants } from 'framer-motion';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { 
// //   ExternalLink, 
// //   Github, 
// //   Smartphone, 
// //   Monitor, 
// //   Calendar, 
// //   Users, 
// //   Star, 
// //   ArrowRight, 
// //   Zap,
// //   Code,
// //   Palette,
// //   Globe,
// //   Play
// // } from 'lucide-react';

// // interface Project {
// //   id: number;
// //   title: string;
// //   subtitle: string;
// //   description: string;
// //   longDescription: string;
// //   platform: string;
// //   deviceTargets: string[];
// //   image: string;
// //   screenshots: string[];
// //   mockupType: string;
// //   link: string;
// //   demoLink?: string;
// //   playStoreLink?: string;
// //   appStoreLink?: string;
// //   category: string;
// //   status: string;
// //   year: string;
// //   duration: string;
// //   technologies: string[];
// //   features: Array<{
// //     icon: string;
// //     title: string;
// //     description: string;
// //   }>;
// //   problemStatement: string;
// //   solution: string;
// //   achievements: string[];
// //   colors: {
// //     primary: string;
// //     secondary: string;
// //     accent: string;
// //     background: string;
// //     gradient: string;
// //   };
// //   keyScreens?: string[];
// //   appInfo?: {
// //     category: string;
// //     size: string;
// //     compatibility: string;
// //     languages: string[];
// //     version: string;
// //   };
// //   roadmap?: string[];
// // }

// // interface ProjectsSectionProps {
// //   containerVariants: Variants;
// //   itemVariants: Variants;
// //   projects: Project[];
// // }

// // const ProjectsSection: React.FC<ProjectsSectionProps> = ({
// //   containerVariants,
// //   itemVariants,
// //   projects
// // }) => {
// //   const [activeTab, setActiveTab] = useState<{[key: number]: 'overview' | 'features' | 'tech'}>({});

// //   const categoryColors = {
// //     'E-commerce': 'bg-gradient-to-r from-purple-500 to-pink-500',
// //     'Productivity': 'bg-gradient-to-r from-blue-500 to-cyan-500',
// //     'Healthcare': 'bg-gradient-to-r from-green-500 to-teal-500',
// //     'Education': 'bg-gradient-to-r from-orange-500 to-red-500',
// //     'Finance': 'bg-gradient-to-r from-yellow-500 to-orange-500',
// //   };

// //   const statusColors = {
// //     'Completed': 'bg-green-100 text-green-800 border-green-200',
// //     'Active Development': 'bg-blue-100 text-blue-800 border-blue-200',
// //     'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
// //     'Planning': 'bg-gray-100 text-gray-800 border-gray-200',
// //   };

// //   const getActiveTab = (projectId: number) => {
// //     return activeTab[projectId] || 'overview';
// //   };

// //   const setProjectTab = (projectId: number, tab: 'overview' | 'features' | 'tech') => {
// //     setActiveTab(prev => ({ ...prev, [projectId]: tab }));
// //   };

// //   const ExpandedProjectCard = ({ project, index }: { project: Project; index: number }) => {
// //     const currentTab = getActiveTab(project.id);

// //     return (
// //       <motion.div
// //         variants={itemVariants}
// //         className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12"
// //       >
// //         {/* Mobile Header */}
// //         <div className="lg:hidden p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
// //           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{project.title}</h2>
// //           <p className="text-gray-600 mt-1 text-sm sm:text-base">{project.subtitle}</p>
// //         </div>

// //         {/* Main Layout */}
// //         <div className="lg:grid lg:grid-cols-5 lg:gap-0 min-h-[640px] lg:min-h-[80vh]">
// //           {/* Left Section - Project Image and Key Info */}
// //           <div className="lg:col-span-2 relative">
// //             <div 
// //               className="relative h-80 sm:h-96 lg:h-full p-6 sm:p-8 text-white flex flex-col justify-between"
// //               style={{ background: project.colors.gradient }}
// //             >
// //               {/* Project Image */}
// //               <div className="flex-1 flex items-center justify-center my-4 lg:my-8">
// //                 <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
// //                   <Image
// //                     src={project.image}
// //                     alt={project.title}
// //                     fill
// //                     className="object-cover rounded-2xl"
// //                     priority
// //                   />
// //                 </div>
// //               </div>

// //               {/* Project Basic Info */}
// //               <div className="space-y-3 lg:space-y-4">
// //                 <div className="hidden lg:block">
// //                   <h2 className="text-2xl xl:text-4xl font-bold mb-2">{project.title}</h2>
// //                   <p className="text-white/90 text-base lg:text-lg">{project.subtitle}</p>
// //                 </div>
                
// //                 <div className="flex flex-wrap gap-2">
// //                   <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
// //                     {project.category}
// //                   </span>
// //                   <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
// //                     {project.status}
// //                   </span>
// //                   <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm">
// //                     {project.year}
// //                   </span>
// //                 </div>

// //                 {/* Quick Stats */}
// //                 <div className="grid grid-cols-2 gap-3 lg:gap-4 pt-3 lg:pt-4">
// //                   <div className="text-center p-2 lg:p-3 bg-white/10 backdrop-blur-sm rounded-xl">
// //                     <Calendar size={16} className="mx-auto mb-1" />
// //                     <p className="text-xs opacity-90">Duration</p>
// //                     <p className="font-semibold text-xs lg:text-sm">{project.duration}</p>
// //                   </div>
// //                   <div className="text-center p-2 lg:p-3 bg-white/10 backdrop-blur-sm rounded-xl">
// //                     <Monitor size={16} className="mx-auto mb-1" />
// //                     <p className="text-xs opacity-90">Platform</p>
// //                     <p className="font-semibold text-xs">{project.platform}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Section - Detailed Content */}
// //           <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8 xl:p-12 overflow-y-auto max-h-none lg:max-h-[80vh]">
// //             {/* Tab Navigation */}
// //             <div className="flex space-x-1 mb-6 lg:mb-8 bg-gray-100 p-1 rounded-xl lg:rounded-2xl sticky top-0 z-10">
// //               {(['overview', 'features', 'tech'] as const).map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setProjectTab(project.id, tab)}
// //                   className={`flex-1 py-2 lg:py-3 px-2 sm:px-4 lg:px-6 rounded-lg lg:rounded-xl font-medium transition-all duration-300 capitalize text-xs sm:text-sm lg:text-base ${
// //                     currentTab === tab
// //                       ? 'bg-white text-gray-900 shadow-sm'
// //                       : 'text-gray-600 hover:text-gray-900'
// //                   }`}
// //                 >
// //                   {tab === 'overview' && <Globe size={14} className="inline mr-1 lg:mr-2" />}
// //                   {tab === 'features' && <Zap size={14} className="inline mr-1 lg:mr-2" />}
// //                   {tab === 'tech' && <Code size={14} className="inline mr-1 lg:mr-2" />}
// //                   <span className="hidden sm:inline">{tab}</span>
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Tab Content */}
// //             <div className="space-y-6 lg:space-y-8">
// //               {currentTab === 'overview' && (
// //                 <>
// //                   <div>
// //                     <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6 text-gray-900">Project Overview</h3>
// //                     <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{project.longDescription}</p>
// //                   </div>

// //                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8">
// //                     <div className="p-4 lg:p-6 bg-red-50 rounded-xl lg:rounded-2xl">
// //                       <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
// //                         <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
// //                         Problem Statement
// //                       </h4>
// //                       <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{project.problemStatement}</p>
// //                     </div>
// //                     <div className="p-4 lg:p-6 bg-green-50 rounded-xl lg:rounded-2xl">
// //                       <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
// //                         <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
// //                         Solution
// //                       </h4>
// //                       <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{project.solution}</p>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Key Achievements</h4>
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
// //                       {project.achievements.map((achievement, achievementIndex) => (
// //                         <div key={achievementIndex} className="flex items-start space-x-3 p-3 lg:p-4 bg-yellow-50 rounded-lg lg:rounded-xl hover:bg-yellow-100 transition-colors">
// //                           <Star className="text-yellow-500 mt-0.5 flex-shrink-0" size={14} />
// //                           <span className="text-gray-800 text-xs sm:text-sm">{achievement}</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               )}

// //               {currentTab === 'features' && (
// //                 <>
// //                   <div>
// //                     <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6 text-gray-900">Key Features</h3>
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
// //                       {project.features.map((feature, featureIndex) => (
// //                         <div key={featureIndex} className="p-4 lg:p-6 bg-gray-50 rounded-xl lg:rounded-2xl hover:bg-gray-100 transition-colors group">
// //                           <div className="flex items-start space-x-3 lg:space-x-4">
// //                             <div className="flex-shrink-0 text-xl lg:text-2xl xl:text-3xl group-hover:scale-110 transition-transform">
// //                               {feature.icon}
// //                             </div>
// //                             <div>
// //                               <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base xl:text-lg">{feature.title}</h4>
// //                               <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">{feature.description}</p>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               )}

// //               {currentTab === 'tech' && (
// //                 <>
// //                   <div>
// //                     <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6 text-gray-900">Technology Stack</h3>
// //                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
// //                       {project.technologies.map((tech, techIndex) => (
// //                         <div
// //                           key={techIndex}
// //                           className="p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg lg:rounded-xl text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-105"
// //                         >
// //                           <div className="font-medium text-gray-900 text-xs sm:text-sm">{tech}</div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
// //                     <div className="p-4 lg:p-6 bg-blue-50 rounded-xl lg:rounded-2xl">
// //                       <Monitor className="text-blue-500 mb-3" size={20} />
// //                       <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Platform</h4>
// //                       <p className="text-gray-700 text-xs lg:text-sm">{project.platform}</p>
// //                     </div>
                    
// //                     <div className="p-4 lg:p-6 bg-green-50 rounded-xl lg:rounded-2xl">
// //                       <Users className="text-green-500 mb-3" size={20} />
// //                       <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Target Devices</h4>
// //                       <p className="text-gray-700 text-xs lg:text-sm">{project.deviceTargets.join(', ')}</p>
// //                     </div>
                    
// //                     <div className="p-4 lg:p-6 bg-purple-50 rounded-xl lg:rounded-2xl">
// //                       <Calendar className="text-purple-500 mb-3" size={20} />
// //                       <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Development</h4>
// //                       <p className="text-gray-700 text-xs lg:text-sm">{project.duration}</p>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 lg:pt-8 border-t border-gray-200 mt-6 lg:mt-8 sticky bottom-0 bg-white">
// //               <Link
// //                 href={project.link}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex-1 bg-gray-900 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2 group text-sm lg:text-base"
// //               >
// //                 <Github size={16} />
// //                 <span>View Source Code</span>
// //                 <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
// //               </Link>
              
// //               {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
// //                 <Link
// //                   href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="flex-1 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group text-sm lg:text-base"
// //                   style={{ 
// //                     background: project.colors.gradient,
// //                   }}
// //                 >
// //                   {project.demoLink ? <ExternalLink size={16} /> : <Play size={16} />}
// //                   <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
// //                   <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
// //                 </Link>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     );
// //   };

// //   return (
// //     <motion.div
// //       variants={containerVariants}
// //       initial="hidden"
// //       whileInView="visible"
// //       viewport={{ once: true, margin: "-100px" }}
// //       className="space-y-12 lg:space-y-16"
// //     >
// //       {/* Section Header */}
// //       <motion.div variants={itemVariants} className="text-center space-y-4 lg:space-y-6">
// //         <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 lg:px-6 py-2 lg:py-3 rounded-full">
// //           <Palette className="text-blue-600" size={16} />
// //           <span className="text-blue-800 font-medium text-sm lg:text-base">Featured Projects</span>
// //         </div>
        
// //         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
// //           My Work
// //         </h2>
        
// //         <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
// //           Explore my portfolio of innovative applications and solutions that solve real-world problems 
// //           through elegant design and cutting-edge technology.
// //         </p>
// //       </motion.div>

// //       {/* Expanded Projects List */}
// //       <motion.div 
// //         variants={containerVariants}
// //         className="space-y-8 lg:space-y-12"
// //       >
// //         {projects.map((project, index) => (
// //           <ExpandedProjectCard key={project.id} project={project} index={index} />
// //         ))}
// //       </motion.div>
// //     </motion.div>
// //   );
// // };

// // export default ProjectsSection;

// // // 'use client'

// // // import React, { useState } from 'react';
// // // import { motion, Variants } from 'framer-motion';
// // // import Image from 'next/image';
// // // import Link from 'next/link';
// // // import { 
// // //   ExternalLink, 
// // //   Github, 
// // //   Smartphone, 
// // //   Monitor, 
// // //   Calendar, 
// // //   Users, 
// // //   Star, 
// // //   ArrowRight, 
// // //   Zap,
// // //   Code,
// // //   Palette,
// // //   Globe,
// // //   Play,
// // //   X
// // // } from 'lucide-react';

// // // interface Project {
// // //   id: number;
// // //   title: string;
// // //   subtitle: string;
// // //   description: string;
// // //   longDescription: string;
// // //   platform: string;
// // //   deviceTargets: string[];
// // //   image: string;
// // //   screenshots: string[];
// // //   mockupType: string;
// // //   link: string;
// // //   demoLink?: string;
// // //   playStoreLink?: string;
// // //   appStoreLink?: string;
// // //   category: string;
// // //   status: string;
// // //   year: string;
// // //   duration: string;
// // //   technologies: string[];
// // //   features: Array<{
// // //     icon: string;
// // //     title: string;
// // //     description: string;
// // //   }>;
// // //   problemStatement: string;
// // //   solution: string;
// // //   achievements: string[];
// // //   colors: {
// // //     primary: string;
// // //     secondary: string;
// // //     accent: string;
// // //     background: string;
// // //     gradient: string;
// // //   };
// // //   keyScreens?: string[];
// // //   appInfo?: {
// // //     category: string;
// // //     size: string;
// // //     compatibility: string;
// // //     languages: string[];
// // //     version: string;
// // //   };
// // //   roadmap?: string[];
// // // }

// // // interface ProjectsSectionProps {
// // //   containerVariants: Variants;
// // //   itemVariants: Variants;
// // //   projects: Project[];
// // // }

// // // const ProjectsSection: React.FC<ProjectsSectionProps> = ({
// // //   containerVariants,
// // //   itemVariants,
// // //   projects
// // // }) => {
// // //   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
// // //   const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech'>('overview');

// // //   const categoryColors = {
// // //     'E-commerce': 'bg-gradient-to-r from-purple-500 to-pink-500',
// // //     'Productivity': 'bg-gradient-to-r from-blue-500 to-cyan-500',
// // //     'Healthcare': 'bg-gradient-to-r from-green-500 to-teal-500',
// // //     'Education': 'bg-gradient-to-r from-orange-500 to-red-500',
// // //     'Finance': 'bg-gradient-to-r from-yellow-500 to-orange-500',
// // //   };

// // //   const statusColors = {
// // //     'Completed': 'bg-green-100 text-green-800 border-green-200',
// // //     'Active Development': 'bg-blue-100 text-blue-800 border-blue-200',
// // //     'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
// // //     'Planning': 'bg-gray-100 text-gray-800 border-gray-200',
// // //   };

// // //   const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
// // //     <motion.div
// // //       variants={itemVariants}
// // //       whileHover={{ y: -8, scale: 1.02 }}
// // //       className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
// // //       style={{ 
// // //         background: `linear-gradient(135deg, ${project.colors.background} 0%, ${project.colors.background}f0 100%)`,
// // //         border: `1px solid ${project.colors.primary}20`
// // //       }}
// // //     >
// // //       {/* Project Header Image */}
// // //       <div className="relative h-64 overflow-hidden rounded-t-3xl">
// // //         <div 
// // //           className="absolute inset-0 opacity-10"
// // //           style={{ background: project.colors.gradient }}
// // //         />
// // //         <Image
// // //           src={project.image}
// // //           alt={project.title}
// // //           fill
// // //           className="object-cover group-hover:scale-110 transition-transform duration-700"
// // //         />
        
// // //         {/* Overlay with Category and Status */}
// // //         <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
// // //           <span 
// // //             className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
// // //               categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-500'
// // //             }`}
// // //           >
// // //             {project.category}
// // //           </span>
// // //           <span 
// // //             className={`px-3 py-1 rounded-full text-xs font-medium border ${
// // //               statusColors[project.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
// // //             }`}
// // //           >
// // //             {project.status}
// // //           </span>
// // //         </div>

// // //         {/* Platform Icons */}
// // //         <div className="absolute bottom-4 right-4 flex space-x-2">
// // //           {project.platform.includes('Web') && (
// // //             <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
// // //               <Monitor size={16} className="text-gray-700" />
// // //             </div>
// // //           )}
// // //           {(project.platform.includes('Mobile') || project.platform.includes('React Native')) && (
// // //             <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
// // //               <Smartphone size={16} className="text-gray-700" />
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Project Content */}
// // //       <div className="p-8">
// // //         {/* Title and Subtitle */}
// // //         <div className="mb-4">
// // //           <h3 
// // //             className="text-2xl font-bold mb-2 group-hover:text-opacity-80 transition-colors"
// // //             style={{ color: project.colors.primary }}
// // //           >
// // //             {project.title}
// // //           </h3>
// // //           <p className="text-gray-600 text-sm font-medium">{project.subtitle}</p>
// // //         </div>

// // //         {/* Description */}
// // //         <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
// // //           {project.description}
// // //         </p>

// // //         {/* Tech Stack Preview */}
// // //         <div className="mb-6">
// // //           <div className="flex flex-wrap gap-2">
// // //             {project.technologies.slice(0, 4).map((tech, techIndex) => (
// // //               <span
// // //                 key={techIndex}
// // //                 className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
// // //               >
// // //                 {tech}
// // //               </span>
// // //             ))}
// // //             {project.technologies.length > 4 && (
// // //               <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
// // //                 +{project.technologies.length - 4} more
// // //               </span>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Project Stats */}
// // //         <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
// // //           <div className="text-center">
// // //             <Calendar size={16} className="mx-auto mb-1 text-gray-500" />
// // //             <p className="text-xs text-gray-500">Duration</p>
// // //             <p className="font-semibold text-gray-800">{project.duration}</p>
// // //           </div>
// // //           <div className="text-center">
// // //             <Star size={16} className="mx-auto mb-1 text-gray-500" />
// // //             <p className="text-xs text-gray-500">Year</p>
// // //             <p className="font-semibold text-gray-800">{project.year}</p>
// // //           </div>
// // //         </div>

// // //         {/* Action Buttons */}
// // //         <div className="flex flex-col space-y-3">
// // //           <button
// // //             onClick={() => setSelectedProject(project)}
// // //             className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-2xl font-medium hover:from-gray-900 hover:to-black transition-all duration-300 flex items-center justify-center space-x-2 group"
// // //           >
// // //             <span>View Details</span>
// // //             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
// // //           </button>
          
// // //           <div className="flex space-x-2">
// // //             <Link
// // //               href={project.link}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               className="flex-1 bg-white border-2 border-gray-200 text-gray-800 py-2 px-4 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
// // //             >
// // //               <Github size={16} />
// // //               <span>Code</span>
// // //             </Link>
            
// // //             {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
// // //               <Link
// // //                 href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="flex-1 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
// // //                 style={{ 
// // //                   background: project.colors.gradient,
// // //                 }}
// // //               >
// // //                 {project.demoLink ? <ExternalLink size={16} /> : <Play size={16} />}
// // //                 <span>{project.demoLink ? 'Demo' : 'Store'}</span>
// // //               </Link>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );

// // //   const ProjectModal = ({ project }: { project: Project }) => (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       exit={{ opacity: 0 }}
// // //       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// // //       onClick={() => setSelectedProject(null)}
// // //     >
// // //       <motion.div
// // //         initial={{ scale: 0.9, opacity: 0 }}
// // //         animate={{ scale: 1, opacity: 1 }}
// // //         exit={{ scale: 0.9, opacity: 0 }}
// // //         className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
// // //         onClick={(e) => e.stopPropagation()}
// // //       >
// // //         {/* Modal Header */}
// // //         <div 
// // //           className="relative p-8 text-white"
// // //           style={{ background: project.colors.gradient }}
// // //         >
// // //           {/* Fixed Close Button */}
// // //           <button
// // //             onClick={() => setSelectedProject(null)}
// // //             className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 group z-10"
// // //           >
// // //             <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
// // //           </button>
          
// // //           {/* Header Content with Fixed Layout */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
// // //             {/* Project Info */}
// // //             <div className="order-2 lg:order-1">
// // //               <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
// // //               <p className="text-white/90 text-lg mb-4">{project.subtitle}</p>
// // //               <div className="flex flex-wrap gap-2 mb-4">
// // //                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
// // //                   {project.category}
// // //                 </span>
// // //                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
// // //                   {project.status}
// // //                 </span>
// // //                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
// // //                   {project.year}
// // //                 </span>
// // //               </div>
// // //             </div>
            
// // //             {/* Project Image - Fixed Display */}
// // //             <div className="order-1 lg:order-2 relative">
// // //               <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl">
// // //                 <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
// // //                 <Image
// // //                   src={project.image}
// // //                   alt={project.title}
// // //                   fill
// // //                   className="object-cover rounded-2xl"
// // //                   priority
// // //                 />
// // //                 {/* Image Overlay for Better Contrast */}
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Modal Content */}
// // //         <div className="p-8 max-h-[60vh] overflow-y-auto">
// // //           {/* Tab Navigation */}
// // //           <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-2xl">
// // //             {(['overview', 'features', 'tech'] as const).map((tab) => (
// // //               <button
// // //                 key={tab}
// // //                 onClick={() => setActiveTab(tab)}
// // //                 className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 capitalize ${
// // //                   activeTab === tab
// // //                     ? 'bg-white text-gray-900 shadow-sm'
// // //                     : 'text-gray-600 hover:text-gray-900'
// // //                 }`}
// // //               >
// // //                 {tab === 'overview' && <Globe size={16} className="inline mr-2" />}
// // //                 {tab === 'features' && <Zap size={16} className="inline mr-2" />}
// // //                 {tab === 'tech' && <Code size={16} className="inline mr-2" />}
// // //                 {tab}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Tab Content */}
// // //           {activeTab === 'overview' && (
// // //             <div className="space-y-8">
// // //               <div>
// // //                 <h3 className="text-2xl font-bold mb-4 text-gray-900">Project Overview</h3>
// // //                 <p className="text-gray-700 leading-relaxed text-lg">{project.longDescription}</p>
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //                 <div>
// // //                   <h4 className="text-xl font-semibold mb-4 text-gray-900">Problem Statement</h4>
// // //                   <p className="text-gray-700 leading-relaxed">{project.problemStatement}</p>
// // //                 </div>
// // //                 <div>
// // //                   <h4 className="text-xl font-semibold mb-4 text-gray-900">Solution</h4>
// // //                   <p className="text-gray-700 leading-relaxed">{project.solution}</p>
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <h4 className="text-xl font-semibold mb-4 text-gray-900">Key Achievements</h4>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// // //                   {project.achievements.map((achievement, index) => (
// // //                     <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
// // //                       <Star className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
// // //                       <span className="text-gray-800">{achievement}</span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {activeTab === 'features' && (
// // //             <div>
// // //               <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h3>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 {project.features.map((feature, index) => (
// // //                   <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
// // //                     <div className="flex items-start space-x-4">
// // //                       <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
// // //                       <div>
// // //                         <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
// // //                         <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {activeTab === 'tech' && (
// // //             <div className="space-y-8">
// // //               <div>
// // //                 <h3 className="text-2xl font-bold mb-6 text-gray-900">Technology Stack</h3>
// // //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// // //                   {project.technologies.map((tech, index) => (
// // //                     <div
// // //                       key={index}
// // //                       className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
// // //                     >
// // //                       <div className="font-medium text-gray-900 text-sm">{tech}</div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                 <div className="p-6 bg-blue-50 rounded-2xl">
// // //                   <Monitor className="text-blue-500 mb-3" size={24} />
// // //                   <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
// // //                   <p className="text-gray-700 text-sm">{project.platform}</p>
// // //                 </div>
                
// // //                 <div className="p-6 bg-green-50 rounded-2xl">
// // //                   <Users className="text-green-500 mb-3" size={24} />
// // //                   <h4 className="font-semibold text-gray-900 mb-2">Target Devices</h4>
// // //                   <p className="text-gray-700 text-sm">{project.deviceTargets.join(', ')}</p>
// // //                 </div>
                
// // //                 <div className="p-6 bg-purple-50 rounded-2xl">
// // //                   <Calendar className="text-purple-500 mb-3" size={24} />
// // //                   <h4 className="font-semibold text-gray-900 mb-2">Development</h4>
// // //                   <p className="text-gray-700 text-sm">{project.duration}</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Action Buttons */}
// // //           <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 mt-8">
// // //             <Link
// // //               href={project.link}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2"
// // //             >
// // //               <Github size={20} />
// // //               <span>View Source Code</span>
// // //             </Link>
            
// // //             {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
// // //               <Link
// // //                 href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="flex-1 text-white py-4 px-6 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
// // //                 style={{ 
// // //                   background: project.colors.gradient,
// // //                 }}
// // //               >
// // //                 {project.demoLink ? <ExternalLink size={20} /> : <Play size={20} />}
// // //                 <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
// // //               </Link>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </motion.div>
// // //     </motion.div>
// // //   );

// // //   return (
// // //     <>
// // //       <motion.div
// // //         variants={containerVariants}
// // //         initial="hidden"
// // //         whileInView="visible"
// // //         viewport={{ once: true, margin: "-100px" }}
// // //         className="space-y-16"
// // //       >
// // //         {/* Section Header */}
// // //         <motion.div variants={itemVariants} className="text-center space-y-6">
// // //           <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full">
// // //             <Palette className="text-blue-600" size={20} />
// // //             <span className="text-blue-800 font-medium">Featured Projects</span>
// // //           </div>
          
// // //           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
// // //             My Work
// // //           </h2>
          
// // //           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
// // //             Explore my portfolio of innovative applications and solutions that solve real-world problems 
// // //             through elegant design and cutting-edge technology.
// // //           </p>
// // //         </motion.div>

// // //         {/* Projects Grid */}
// // //         <motion.div 
// // //           variants={containerVariants}
// // //           className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
// // //         >
// // //           {projects.map((project, index) => (
// // //             <ProjectCard key={project.id} project={project} index={index} />
// // //           ))}
// // //         </motion.div>
// // //       </motion.div>

// // //       {/* Project Modal */}
// // //       {selectedProject && <ProjectModal project={selectedProject} />}
// // //     </>
// // //   );
// // // };

// // // export default ProjectsSection;