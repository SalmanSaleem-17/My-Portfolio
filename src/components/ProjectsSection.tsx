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
  Play,
  X
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech'>('overview');

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

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
      style={{ 
        background: `linear-gradient(135deg, ${project.colors.background} 0%, ${project.colors.background}f0 100%)`,
        border: `1px solid ${project.colors.primary}20`
      }}
    >
      {/* Project Header Image */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: project.colors.gradient }}
        />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay with Category and Status */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span 
            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
              categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-500'
            }`}
          >
            {project.category}
          </span>
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusColors[project.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Platform Icons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {project.platform.includes('Web') && (
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              <Monitor size={16} className="text-gray-700" />
            </div>
          )}
          {(project.platform.includes('Mobile') || project.platform.includes('React Native')) && (
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              <Smartphone size={16} className="text-gray-700" />
            </div>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-8">
        {/* Title and Subtitle */}
        <div className="mb-4">
          <h3 
            className="text-2xl font-bold mb-2 group-hover:text-opacity-80 transition-colors"
            style={{ color: project.colors.primary }}
          >
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm font-medium">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
          <div className="text-center">
            <Calendar size={16} className="mx-auto mb-1 text-gray-500" />
            <p className="text-xs text-gray-500">Duration</p>
            <p className="font-semibold text-gray-800">{project.duration}</p>
          </div>
          <div className="text-center">
            <Star size={16} className="mx-auto mb-1 text-gray-500" />
            <p className="text-xs text-gray-500">Year</p>
            <p className="font-semibold text-gray-800">{project.year}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => setSelectedProject(project)}
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-2xl font-medium hover:from-gray-900 hover:to-black transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex space-x-2">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-800 py-2 px-4 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Github size={16} />
              <span>Code</span>
            </Link>
            
            {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
              <Link
                href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                style={{ 
                  background: project.colors.gradient,
                }}
              >
                {project.demoLink ? <ExternalLink size={16} /> : <Play size={16} />}
                <span>{project.demoLink ? 'Demo' : 'Store'}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ProjectModal = ({ project }: { project: Project }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedProject(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="relative p-8 text-white"
          style={{ background: project.colors.gradient }}
        >
          {/* Fixed Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 group z-10"
          >
            <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          {/* Header Content with Fixed Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Project Info */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
              <p className="text-white/90 text-lg mb-4">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {project.status}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {project.year}
                </span>
              </div>
            </div>
            
            {/* Project Image - Fixed Display */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                {/* Image Overlay for Better Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-2xl">
            {(['overview', 'features', 'tech'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && <Globe size={16} className="inline mr-2" />}
                {tab === 'features' && <Zap size={16} className="inline mr-2" />}
                {tab === 'tech' && <Code size={16} className="inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Project Overview</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{project.longDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">Problem Statement</h4>
                  <p className="text-gray-700 leading-relaxed">{project.problemStatement}</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">Solution</h4>
                  <p className="text-gray-700 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Key Achievements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                      <Star className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-800">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
                    >
                      <div className="font-medium text-gray-900 text-sm">{tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-2xl">
                  <Monitor className="text-blue-500 mb-3" size={24} />
                  <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
                  <p className="text-gray-700 text-sm">{project.platform}</p>
                </div>
                
                <div className="p-6 bg-green-50 rounded-2xl">
                  <Users className="text-green-500 mb-3" size={24} />
                  <h4 className="font-semibold text-gray-900 mb-2">Target Devices</h4>
                  <p className="text-gray-700 text-sm">{project.deviceTargets.join(', ')}</p>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-2xl">
                  <Calendar className="text-purple-500 mb-3" size={24} />
                  <h4 className="font-semibold text-gray-900 mb-2">Development</h4>
                  <p className="text-gray-700 text-sm">{project.duration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 mt-8">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Github size={20} />
              <span>View Source Code</span>
            </Link>
            
            {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
              <Link
                href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-white py-4 px-6 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                style={{ 
                  background: project.colors.gradient,
                }}
              >
                {project.demoLink ? <ExternalLink size={20} /> : <Play size={20} />}
                <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full">
            <Palette className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Featured Projects</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            My Work
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of innovative applications and solutions that solve real-world problems 
            through elegant design and cutting-edge technology.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} />}
    </>
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
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech'>('overview');

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

//   const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
//     <motion.div
//       variants={itemVariants}
//       whileHover={{ y: -8, scale: 1.02 }}
//       className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
//       style={{ 
//         background: `linear-gradient(135deg, ${project.colors.background} 0%, ${project.colors.background}f0 100%)`,
//         border: `1px solid ${project.colors.primary}20`
//       }}
//     >
//       {/* Project Header Image */}
//       <div className="relative h-64 overflow-hidden rounded-t-3xl">
//         <div 
//           className="absolute inset-0 opacity-10"
//           style={{ background: project.colors.gradient }}
//         />
//         <Image
//           src={project.image}
//           alt={project.title}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-700"
//         />
        
//         {/* Overlay with Category and Status */}
//         <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
//           <span 
//             className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
//               categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-500'
//             }`}
//           >
//             {project.category}
//           </span>
//           <span 
//             className={`px-3 py-1 rounded-full text-xs font-medium border ${
//               statusColors[project.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
//             }`}
//           >
//             {project.status}
//           </span>
//         </div>

//         {/* Platform Icons */}
//         <div className="absolute bottom-4 right-4 flex space-x-2">
//           {project.platform.includes('Web') && (
//             <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
//               <Monitor size={16} className="text-gray-700" />
//             </div>
//           )}
//           {(project.platform.includes('Mobile') || project.platform.includes('React Native')) && (
//             <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
//               <Smartphone size={16} className="text-gray-700" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Project Content */}
//       <div className="p-8">
//         {/* Title and Subtitle */}
//         <div className="mb-4">
//           <h3 
//             className="text-2xl font-bold mb-2 group-hover:text-opacity-80 transition-colors"
//             style={{ color: project.colors.primary }}
//           >
//             {project.title}
//           </h3>
//           <p className="text-gray-600 text-sm font-medium">{project.subtitle}</p>
//         </div>

//         {/* Description */}
//         <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
//           {project.description}
//         </p>

//         {/* Tech Stack Preview */}
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-2">
//             {project.technologies.slice(0, 4).map((tech, techIndex) => (
//               <span
//                 key={techIndex}
//                 className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
//               >
//                 {tech}
//               </span>
//             ))}
//             {project.technologies.length > 4 && (
//               <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
//                 +{project.technologies.length - 4} more
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Project Stats */}
//         <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
//           <div className="text-center">
//             <Calendar size={16} className="mx-auto mb-1 text-gray-500" />
//             <p className="text-xs text-gray-500">Duration</p>
//             <p className="font-semibold text-gray-800">{project.duration}</p>
//           </div>
//           <div className="text-center">
//             <Star size={16} className="mx-auto mb-1 text-gray-500" />
//             <p className="text-xs text-gray-500">Year</p>
//             <p className="font-semibold text-gray-800">{project.year}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col space-y-3">
//           <button
//             onClick={() => setSelectedProject(project)}
//             className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-2xl font-medium hover:from-gray-900 hover:to-black transition-all duration-300 flex items-center justify-center space-x-2 group"
//           >
//             <span>View Details</span>
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </button>
          
//           <div className="flex space-x-2">
//             <Link
//               href={project.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 bg-white border-2 border-gray-200 text-gray-800 py-2 px-4 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
//             >
//               <Github size={16} />
//               <span>Code</span>
//             </Link>
            
//             {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
//               <Link
//                 href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
//                 style={{ 
//                   background: project.colors.gradient,
//                 }}
//               >
//                 {project.demoLink ? <ExternalLink size={16} /> : <Play size={16} />}
//                 <span>{project.demoLink ? 'Demo' : 'Store'}</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );

//   const ProjectModal = ({ project }: { project: Project }) => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={() => setSelectedProject(null)}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Header */}
//         <div 
//           className="relative p-8 text-white"
//           style={{ background: project.colors.gradient }}
//         >
//           <button
//             onClick={() => setSelectedProject(null)}
//             className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
//           >
//             <ArrowRight size={20} className="rotate-45" />
//           </button>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//             <div>
//               <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
//               <p className="text-white/90 text-lg mb-4">{project.subtitle}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
//                   {project.category}
//                 </span>
//                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
//                   {project.status}
//                 </span>
//                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
//                   {project.year}
//                 </span>
//               </div>
//             </div>
            
//             <div className="relative h-64 rounded-2xl overflow-hidden">
//               <Image
//                 src={project.image}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Modal Content */}
//         <div className="p-8 max-h-[60vh] overflow-y-auto">
//           {/* Tab Navigation */}
//           <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-2xl">
//             {(['overview', 'features', 'tech'] as const).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 capitalize ${
//                   activeTab === tab
//                     ? 'bg-white text-gray-900 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 {tab === 'overview' && <Globe size={16} className="inline mr-2" />}
//                 {tab === 'features' && <Zap size={16} className="inline mr-2" />}
//                 {tab === 'tech' && <Code size={16} className="inline mr-2" />}
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           {activeTab === 'overview' && (
//             <div className="space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 text-gray-900">Project Overview</h3>
//                 <p className="text-gray-700 leading-relaxed text-lg">{project.longDescription}</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <h4 className="text-xl font-semibold mb-4 text-gray-900">Problem Statement</h4>
//                   <p className="text-gray-700 leading-relaxed">{project.problemStatement}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold mb-4 text-gray-900">Solution</h4>
//                   <p className="text-gray-700 leading-relaxed">{project.solution}</p>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-xl font-semibold mb-4 text-gray-900">Key Achievements</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {project.achievements.map((achievement, index) => (
//                     <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
//                       <Star className="text-green-500 mt-0.5" size={16} />
//                       <span className="text-gray-800">{achievement}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'features' && (
//             <div>
//               <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {project.features.map((feature, index) => (
//                   <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
//                     <div className="flex items-start space-x-4">
//                       <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
//                         <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'tech' && (
//             <div className="space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-gray-900">Technology Stack</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {project.technologies.map((tech, index) => (
//                     <div
//                       key={index}
//                       className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
//                     >
//                       <div className="font-medium text-gray-900 text-sm">{tech}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="p-6 bg-blue-50 rounded-2xl">
//                   <Monitor className="text-blue-500 mb-3" size={24} />
//                   <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
//                   <p className="text-gray-700 text-sm">{project.platform}</p>
//                 </div>
                
//                 <div className="p-6 bg-green-50 rounded-2xl">
//                   <Users className="text-green-500 mb-3" size={24} />
//                   <h4 className="font-semibold text-gray-900 mb-2">Target Devices</h4>
//                   <p className="text-gray-700 text-sm">{project.deviceTargets.join(', ')}</p>
//                 </div>
                
//                 <div className="p-6 bg-purple-50 rounded-2xl">
//                   <Calendar className="text-purple-500 mb-3" size={24} />
//                   <h4 className="font-semibold text-gray-900 mb-2">Development</h4>
//                   <p className="text-gray-700 text-sm">{project.duration}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 mt-8">
//             <Link
//               href={project.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2"
//             >
//               <Github size={20} />
//               <span>View Source Code</span>
//             </Link>
            
//             {(project.demoLink || project.playStoreLink || project.appStoreLink) && (
//               <Link
//                 href={project.demoLink || project.playStoreLink || project.appStoreLink || '#'}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 text-white py-4 px-6 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
//                 style={{ 
//                   background: project.colors.gradient,
//                 }}
//               >
//                 {project.demoLink ? <ExternalLink size={20} /> : <Play size={20} />}
//                 <span>{project.demoLink ? 'Live Demo' : 'Download App'}</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   return (
//     <>
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="space-y-16"
//       >
//         {/* Section Header */}
//         <motion.div variants={itemVariants} className="text-center space-y-6">
//           <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full">
//             <Palette className="text-blue-600" size={20} />
//             <span className="text-blue-800 font-medium">Featured Projects</span>
//           </div>
          
//           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
//             My Work
//           </h2>
          
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Explore my portfolio of innovative applications and solutions that solve real-world problems 
//             through elegant design and cutting-edge technology.
//           </p>
//         </motion.div>

//         {/* Projects Grid */}
//         <motion.div 
//           variants={containerVariants}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
//         >
//           {projects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* Project Modal */}
//       {selectedProject && <ProjectModal project={selectedProject} />}
//     </>
//   );
// };

// export default ProjectsSection;

// // import React, { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { ExternalLink, Github, Smartphone, Monitor, Calendar, Code, Star, ArrowRight, Play, Download } from 'lucide-react';

// // // Mock data based on your projects
// // const projects = [
// //   {
// //     id: 1,
// //     title: 'Jewel Heaven',
// //     subtitle: 'Premium E-commerce Jewelry Platform',
// //     description: 'A comprehensive digital marketplace revolutionizing the jewelry shopping experience with real-time consultations, custom design capabilities, and seamless user experience.',
// //     longDescription: 'Jewel Heaven transforms traditional jewelry shopping by providing a digital platform where customers can browse vast collections, place orders, and engage in real-time consultations with jewelers. The platform addresses inefficiencies in traditional jewelry shopping by offering intuitive browsing, customization options, and direct communication with craftsmen.',
// //     platform: 'Web Application',
// //     deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
// //     image: '/heroImage.jpg',
// //     screenshots: ['/hero.jpg', '/productDashboard.png', '/OrdersDashboard.png', '/userDashboard.png', '/RateDashboard.png'],
// //     mockupType: 'laptop',
// //     link: 'https://github.com/SalmanSaleem17/jewel-heaven',
// //     demoLink: 'https://jewel-heaven-demo.vercel.app',
// //     category: 'E-commerce',
// //     status: 'Completed',
// //     year: '2024',
// //     duration: '6 months',
// //     technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Stripe API', 'JWT Authentication', 'Cloudinary', 'Redux Toolkit', 'Material-UI'],
// //     features: [
// //       { icon: '👤', title: 'User Authentication', description: 'Secure sign-up, login, email verification, and password reset functionality' },
// //       { icon: '💎', title: 'Jewelry Catalog', description: 'Extensive collection of gold jewelry with detailed design books and specifications' },
// //       { icon: '🔍', title: 'Advanced Search', description: 'Intelligent search and filtering system for finding perfect jewelry pieces' },
// //       { icon: '📅', title: 'Appointment System', description: 'Schedule consultations with jewelers and manage appointments seamlessly' },
// //       { icon: '💬', title: 'Real-time Chat', description: 'Live communication with jewelers for custom design discussions' },
// //       { icon: '🎨', title: 'Custom Design', description: 'Submit and collaborate on custom jewelry designs with expert craftsmen' }
// //     ],
// //     colors: {
// //       primary: '#D4AF37',
// //       secondary: '#1A1A1A',
// //       accent: '#FFE55C',
// //       background: '#FEFEFE',
// //       gradient: 'linear-gradient(135deg, #D4AF37 0%, #FFE55C 100%)'
// //     }
// //   },
// //   {
// //     id: 2,
// //     title: 'AurumLog',
// //     subtitle: 'Comprehensive Gold Conversion & Calculation Toolkit',
// //     description: 'A specialized mobile application for jewelers, gold traders, and enthusiasts providing essential gold conversion tools, purity calculations, and reference materials.',
// //     longDescription: 'AurumLog is a professional-grade mobile toolkit designed to simplify gold-related calculations and conversions. It offers a suite of specialized screens for various gold measurement systems, purity calculations, duty computations, and conversion references.',
// //     platform: 'React Native Application',
// //     deviceTargets: ['iOS', 'Android'],
// //     image: '/AL-splash-one.jpg',
// //     screenshots: ['/AL-splash.jpg', '/AL-home.jpg', '/AL-converters.jpg', '/AL-calculations.jpg', '/AL-Slip.jpg', '/AL-GtT.jpg'],
// //     mockupType: 'mobile',
// //     link: 'https://github.com/SalmanSaleem17/aurumlog',
// //     playStoreLink: 'https://play.google.com/store/apps/details?id=com.aurumlog',
// //     appStoreLink: 'https://apps.apple.com/app/aurumlog/id123456789',
// //     category: 'Productivity',
// //     status: 'Active Development',
// //     year: '2025',
// //     duration: 'Ongoing',
// //     technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'React Navigation', 'AsyncStorage', 'React Hook Form', 'React Native Paper', 'Victory Charts', 'React Native Reanimated'],
// //     features: [
// //       { icon: '🔄', title: 'Gold Conversion', description: 'Convert between different gold measurement systems (grams, TMR, etc.)' },
// //       { icon: '🧮', title: 'Purity Calculations', description: 'Calculate gold purity percentages and impurity levels' },
// //       { icon: '💰', title: 'Value Conversion', description: 'Convert between monetary values and gold weights' },
// //       { icon: '📊', title: 'Reference Tables', description: 'Access comprehensive conversion reference tables' },
// //       { icon: '🧾', title: 'Duty Calculator', description: 'Calculate import/export duties on gold shipments' },
// //       { icon: '📝', title: 'Document Generation', description: 'Generate sale/shipment documents and certificates' }
// //     ],
// //     colors: {
// //       primary: '#FF6B35',
// //       secondary: '#2C3E50',
// //       accent: '#F39C12',
// //       background: '#FFFFFF',
// //       gradient: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)'
// //     }
// //   }
// // ];

// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.2,
// //       delayChildren: 0.1
// //     }
// //   }
// // };

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 30 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       type: "spring",
// //       stiffness: 100,
// //       damping: 12
// //     }
// //   }
// // };

// // const ProjectsSection = () => {
// //   const [selectedProject, setSelectedProject] = useState(null);
// //   const [activeTab, setActiveTab] = useState('overview');

// //   const ProjectCard = ({ project, index }) => (
// //     <motion.div
// //       variants={itemVariants}
// //       className="group relative"
// //       onClick={() => setSelectedProject(project)}
// //     >
// //       <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100">
// //         {/* Project Image/Mockup */}
// //         <div className="relative h-80 overflow-hidden">
// //           <div 
// //             className="absolute inset-0 opacity-10"
// //             style={{ background: project.colors.gradient }}
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent" />
          
// //           {/* Status Badge */}
// //           <div className="absolute top-6 left-6 z-10">
// //             <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
// //               project.status === 'Completed' 
// //                 ? 'bg-green-500/20 text-green-700 border border-green-200' 
// //                 : 'bg-blue-500/20 text-blue-700 border border-blue-200'
// //             }`}>
// //               {project.status}
// //             </span>
// //           </div>

// //           {/* Platform Badge */}
// //           <div className="absolute top-6 right-6 z-10">
// //             <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
// //               {project.mockupType === 'mobile' ? (
// //                 <Smartphone className="w-4 h-4 text-white" />
// //               ) : (
// //                 <Monitor className="w-4 h-4 text-white" />
// //               )}
// //               <span className="text-white text-sm font-medium">{project.platform}</span>
// //             </div>
// //           </div>

// //           {/* Mockup Display */}
// //           <div className="flex items-center justify-center h-full p-8">
// //             <div className={`relative ${project.mockupType === 'mobile' ? 'w-48 h-80' : 'w-full h-64'}`}>
// //               <div 
// //                 className={`relative ${
// //                   project.mockupType === 'mobile' 
// //                     ? 'w-48 h-80 rounded-3xl bg-gradient-to-br shadow-2xl' 
// //                     : 'w-full h-64 rounded-xl bg-gradient-to-br shadow-2xl'
// //                 }`}
// //                 style={{ background: project.colors.gradient }}
// //               >
// //                 <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
// //                   <div className="text-center p-4">
// //                     <div className="text-4xl mb-2">{project.mockupType === 'mobile' ? '📱' : '💻'}</div>
// //                     <h4 className="font-bold text-gray-800 mb-1">{project.title}</h4>
// //                     <p className="text-gray-600 text-sm">{project.subtitle}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Hover Overlay */}
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
// //             <div className="absolute bottom-6 left-6 right-6">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex gap-3">
// //                   {project.link && (
// //                     <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
// //                       <Github className="w-5 h-5 text-white" />
// //                     </button>
// //                   )}
// //                   {project.demoLink && (
// //                     <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
// //                       <ExternalLink className="w-5 h-5 text-white" />
// //                     </button>
// //                   )}
// //                   {project.playStoreLink && (
// //                     <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
// //                       <Download className="w-5 h-5 text-white" />
// //                     </button>
// //                   )}
// //                 </div>
// //                 <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors text-white">
// //                   <span className="text-sm font-medium">View Details</span>
// //                   <ArrowRight className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Project Info */}
// //         <div className="p-8">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-3">
// //               <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
// //               <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
// //                 {project.year}
// //               </span>
// //             </div>
// //             <div className="flex items-center gap-2 text-gray-500">
// //               <Calendar className="w-4 h-4" />
// //               <span className="text-sm">{project.duration}</span>
// //             </div>
// //           </div>

// //           <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

// //           {/* Tech Stack Preview */}
// //           <div className="flex flex-wrap gap-2 mb-6">
// //             {project.technologies.slice(0, 4).map((tech, idx) => (
// //               <span 
// //                 key={idx}
// //                 className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
// //               >
// //                 {tech}
// //               </span>
// //             ))}
// //             {project.technologies.length > 4 && (
// //               <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-sm">
// //                 +{project.technologies.length - 4} more
// //               </span>
// //             )}
// //           </div>

// //           {/* Category & Platform */}
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <span className="flex items-center gap-2 text-gray-600">
// //                 <Code className="w-4 h-4" />
// //                 <span className="text-sm font-medium">{project.category}</span>
// //               </span>
// //             </div>
// //             <div className="flex gap-2">
// //               {project.deviceTargets.map((device, idx) => (
// //                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
// //                   {device}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );

// //   const ProjectModal = ({ project, onClose }) => (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// //       onClick={onClose}
// //     >
// //       <motion.div
// //         initial={{ scale: 0.9, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         exit={{ scale: 0.9, opacity: 0 }}
// //         className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
// //         onClick={e => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div 
// //           className="relative p-8 text-white"
// //           style={{ background: project.colors.gradient }}
// //         >
// //           <button
// //             onClick={onClose}
// //             className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
// //           >
// //             <span className="text-white text-xl">×</span>
// //           </button>
          
// //           <div className="flex items-start justify-between">
// //             <div>
// //               <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
// //               <p className="text-white/90 text-lg mb-4">{project.subtitle}</p>
// //               <div className="flex items-center gap-4">
// //                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
// //                   {project.category}
// //                 </span>
// //                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
// //                   {project.year}
// //                 </span>
// //                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
// //                   {project.duration}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               {project.link && (
// //                 <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
// //                   <Github className="w-5 h-5" />
// //                 </button>
// //               )}
// //               {project.demoLink && (
// //                 <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
// //                   <ExternalLink className="w-5 h-5" />
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="max-h-[60vh] overflow-y-auto">
// //           {/* Navigation Tabs */}
// //           <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
// //             <div className="flex gap-6 px-8 py-4">
// //               {['overview', 'features', 'tech'].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`pb-2 text-sm font-medium border-b-2 transition-colors capitalize ${
// //                     activeTab === tab
// //                       ? 'border-blue-500 text-blue-600'
// //                       : 'border-transparent text-gray-500 hover:text-gray-700'
// //                   }`}
// //                 >
// //                   {tab === 'tech' ? 'Technology' : tab}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="p-8">
// //             {activeTab === 'overview' && (
// //               <div className="space-y-6">
// //                 <div>
// //                   <h3 className="text-xl font-bold text-gray-900 mb-3">Project Overview</h3>
// //                   <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
// //                 </div>
                
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <div>
// //                     <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
// //                     <p className="text-gray-600">{project.platform}</p>
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold text-gray-900 mb-2">Target Devices</h4>
// //                     <div className="flex gap-2">
// //                       {project.deviceTargets.map((device, idx) => (
// //                         <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
// //                           {device}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'features' && (
// //               <div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
// //                 <div className="grid md:grid-cols-2 gap-4">
// //                   {project.features.map((feature, idx) => (
// //                     <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
// //                       <div className="flex items-start gap-3">
// //                         <span className="text-2xl">{feature.icon}</span>
// //                         <div>
// //                           <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
// //                           <p className="text-gray-600 text-sm">{feature.description}</p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'tech' && (
// //               <div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-6">Technology Stack</h3>
// //                 <div className="flex flex-wrap gap-3">
// //                   {project.technologies.map((tech, idx) => (
// //                     <span 
// //                       key={idx}
// //                       className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-medium border border-blue-200 hover:shadow-md transition-shadow"
// //                     >
// //                       {tech}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );

// //   return (
// //     <motion.div
// //       variants={containerVariants}
// //       initial="hidden"
// //       whileInView="visible"
// //       viewport={{ once: true, margin: "-100px" }}
// //       className="relative"
// //     >
// //       {/* Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
// //       </div>

// //       <div className="relative z-10">
// //         {/* Section Header */}
// //         <motion.div variants={itemVariants} className="text-center mb-16">
// //           <motion.div 
// //             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <Star className="w-4 h-4" />
// //             Featured Projects
// //           </motion.div>
          
// //           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
// //             My Recent
// //             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Work</span>
// //           </h2>
          
// //           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
// //             Explore my portfolio of innovative applications and digital solutions that demonstrate 
// //             modern development practices and user-centered design principles.
// //           </p>
// //         </motion.div>

// //         {/* Projects Grid */}
// //         <div className="grid lg:grid-cols-2 gap-12">
// //           {projects.map((project, index) => (
// //             <ProjectCard key={project.id} project={project} index={index} />
// //           ))}
// //         </div>

// //         {/* Call to Action */}
// //         <motion.div 
// //           variants={itemVariants}
// //           className="text-center mt-16"
// //         >
// //           <div className="inline-flex flex-col sm:flex-row items-center gap-4">
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
// //             >
// //               <span>View All Projects</span>
// //               <ArrowRight className="w-5 h-5" />
// //             </motion.button>
            
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 transition-colors flex items-center gap-2"
// //             >
// //               <Github className="w-5 h-5" />
// //               <span>GitHub Profile</span>
// //             </motion.button>
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Project Modal */}
// //       {selectedProject && (
// //         <ProjectModal 
// //           project={selectedProject} 
// //           onClose={() => setSelectedProject(null)} 
// //         />
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default ProjectsSection;

// // // 'use client'

// // // import { Rocket, Star, Code2, Sparkles, Trophy, Zap, FolderOpen } from "lucide-react";
// // // import ProjectCard from "@/components/ProjectCard";
// // // import { memo, useMemo, useRef, useState, useEffect } from "react";
// // // import { projects } from "@/utils/data";

// // // interface ProjectsSectionProps {
// // //   // Remove framer motion props as they're no longer needed
// // // }

// // // // Custom hook for intersection observer
// // // const useIntersectionObserver = (
// // //   elementRef: React.RefObject<Element>,
// // //   options: IntersectionObserverInit = {}
// // // ) => {
// // //   const [isVisible, setIsVisible] = useState(false);

// // //   useEffect(() => {
// // //     const element = elementRef.current;
// // //     if (!element) return;

// // //     const observer = new IntersectionObserver(([entry]) => {
// // //       if (entry.isIntersecting) {
// // //         setIsVisible(true);
// // //         observer.unobserve(element); // Only trigger once
// // //       }
// // //     }, {
// // //       threshold: 0.1,
// // //       rootMargin: '-50px',
// // //       ...options
// // //     });

// // //     observer.observe(element);

// // //     return () => observer.disconnect();
// // //   }, [options]);

// // //   return isVisible;
// // // };

// // // // Optimized stat card component with pure CSS animations
// // // const StatCard = memo(({ 
// // //   stat, 
// // //   index, 
// // //   isVisible 
// // // }: { 
// // //   stat: any; 
// // //   index: number; 
// // //   isVisible: boolean; 
// // // }) => (
// // //   <div
// // //     className={`
// // //       flex items-center gap-2 px-3 py-2 
// // //       bg-white/90 backdrop-blur-sm rounded-xl 
// // //       border border-gray-200 shadow-sm
// // //       transform transition-all duration-500 ease-out
// // //       hover:scale-105 hover:shadow-lg hover:-translate-y-1
// // //       ${isVisible 
// // //         ? 'opacity-100 scale-100 translate-y-0' 
// // //         : 'opacity-0 scale-95 translate-y-4'
// // //       }
// // //     `}
// // //     style={{ 
// // //       transitionDelay: `${index * 100 + 300}ms`,
// // //       willChange: 'transform, opacity'
// // //     }}
// // //   >
// // //     <div className={`
// // //       p-1.5 bg-gradient-to-r ${stat.color} rounded-lg shadow-inner
// // //       transform transition-transform duration-300 ease-out
// // //       group-hover:scale-110
// // //     `}>
// // //       <stat.icon className="w-4 h-4 text-white" />
// // //     </div>
// // //     <div className="text-center">
// // //       <div className="text-sm font-bold text-gray-800 transition-colors duration-200">
// // //         {stat.value}
// // //       </div>
// // //       <div className="text-xs text-gray-600 transition-colors duration-200">
// // //         {stat.label}
// // //       </div>
// // //     </div>
// // //   </div>
// // // ));

// // // StatCard.displayName = 'StatCard';

// // // // Optimized project item component with staggered animations
// // // const ProjectItem = memo(({ 
// // //   project, 
// // //   index, 
// // //   isVisible 
// // // }: { 
// // //   project: any; 
// // //   index: number; 
// // //   isVisible: boolean; 
// // // }) => (
// // //   <div
// // //     className={`
// // //       relative group
// // //       transform transition-all duration-700 ease-out
// // //       ${isVisible 
// // //         ? 'opacity-100 translate-y-0' 
// // //         : 'opacity-0 translate-y-8'
// // //       }
// // //     `}
// // //     style={{ 
// // //       transitionDelay: `${index * 150}ms`,
// // //       willChange: 'transform, opacity'
// // //     }}
// // //   >
// // //     {/* Project highlight indicator */}
// // //     <div className={`
// // //       absolute -left-4 top-1/2 transform -translate-y-1/2 
// // //       w-2 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full
// // //       transition-all duration-500 ease-out
// // //       ${isVisible 
// // //         ? 'opacity-100 scale-y-100' 
// // //         : 'opacity-0 scale-y-0'
// // //       }
// // //     `}
// // //     style={{ 
// // //       transitionDelay: `${index * 150 + 300}ms`,
// // //       transformOrigin: 'center'
// // //     }}
// // //     />
    
// // //     <div className={`
// // //       relative bg-white/90 backdrop-blur-sm rounded-2xl 
// // //       border border-white/30 shadow-lg overflow-hidden
// // //       transform transition-all duration-500 ease-out
// // //       hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
// // //       before:absolute before:inset-0 
// // //       before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-purple-50/20 
// // //       before:pointer-events-none before:transition-opacity before:duration-300
// // //       hover:before:opacity-80
// // //     `}>
// // //       <div className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-[0.99]">
// // //         <ProjectCard project={project} />
// // //       </div>
// // //     </div>
// // //   </div>
// // // ));

// // // ProjectItem.displayName = 'ProjectItem';

// // // export default memo(function ProjectsSection({}: ProjectsSectionProps) {
// // //   const sectionRef = useRef<HTMLElement>(null);
// // //   const headerRef = useRef<HTMLDivElement>(null);
// // //   const projectsRef = useRef<HTMLDivElement>(null);
  
// // //   const isVisible = useIntersectionObserver(sectionRef);
// // //   const headerVisible = useIntersectionObserver(headerRef, { threshold: 0.2 });
// // //   const projectsVisible = useIntersectionObserver(projectsRef, { threshold: 0.1 });

// // //   // Memoize static data to prevent recreation
// // //   const stats = useMemo(() => [
// // //     { 
// // //       icon: FolderOpen, 
// // //       label: "Projects", 
// // //       value: projects.length, 
// // //       color: "from-blue-500 to-cyan-500" 
// // //     },
// // //     { 
// // //       icon: Trophy, 
// // //       label: "Completed", 
// // //       value: projects.filter(p => p.status === 'Completed').length, 
// // //       color: "from-green-500 to-emerald-500" 
// // //     },
// // //     { 
// // //       icon: Zap, 
// // //       label: "Technologies", 
// // //       value: "10+", 
// // //       color: "from-purple-500 to-pink-500" 
// // //     }
// // //   ], []);

// // //   return (
// // //     <div className="relative overflow-hidden">
// // //       {/* Enhanced background elements with CSS animations */}
// // //       <div className="absolute inset-0 pointer-events-none">
// // //         <div className={`
// // //           absolute top-32 left-16 w-28 h-28 
// // //           bg-gradient-to-r from-purple-400/20 to-pink-400/20 
// // //           rounded-full blur-xl
// // //           transform transition-all duration-1000 ease-out
// // //           ${isVisible 
// // //             ? 'opacity-40 scale-100' 
// // //             : 'opacity-0 scale-75'
// // //           }
// // //         `}
// // //         style={{ transitionDelay: '500ms' }}
// // //         />
// // //         <div className={`
// // //           absolute bottom-32 right-16 w-36 h-36 
// // //           bg-gradient-to-r from-blue-400/20 to-cyan-400/20 
// // //           rounded-full blur-xl
// // //           transform transition-all duration-1000 ease-out
// // //           ${isVisible 
// // //             ? 'opacity-40 scale-100' 
// // //             : 'opacity-0 scale-75'
// // //           }
// // //         `}
// // //         style={{ transitionDelay: '700ms' }}
// // //         />
// // //       </div>

// // //       <section 
// // //         ref={sectionRef}
// // //         id="projects"
// // //         className="max-w-6xl mx-auto relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
// // //       >
// // //         <div 
// // //           ref={headerRef}
// // //           className={`
// // //             text-center mb-12
// // //             transform transition-all duration-800 ease-out
// // //             ${headerVisible 
// // //               ? 'opacity-100 translate-y-0' 
// // //               : 'opacity-0 translate-y-6'
// // //             }
// // //           `}
// // //         >
// // //           <div className={`
// // //             inline-flex items-center gap-2 px-4 py-2 
// // //             bg-purple-50 rounded-full border border-purple-200 mb-4 shadow-sm
// // //             transform transition-all duration-500 ease-out
// // //             hover:scale-105 hover:shadow-md active:scale-95
// // //             ${headerVisible 
// // //               ? 'opacity-100 translate-y-0' 
// // //               : 'opacity-0 -translate-y-4'
// // //             }
// // //           `}
// // //           style={{ transitionDelay: '200ms' }}
// // //           >
// // //             <Rocket className="w-4 h-4 text-purple-500 transition-transform duration-300 hover:rotate-12" />
// // //             <span className="text-sm font-medium text-purple-700">My Work</span>
// // //           </div>
          
// // //           <h2 className={`
// // //             text-4xl md:text-5xl font-bold mb-4 
// // //             bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 
// // //             bg-clip-text text-transparent
// // //             transform transition-all duration-600 ease-out
// // //             ${headerVisible 
// // //               ? 'opacity-100 translate-y-0' 
// // //               : 'opacity-0 translate-y-4'
// // //             }
// // //           `}
// // //           style={{ transitionDelay: '300ms' }}
// // //           >
// // //             Featured Projects
// // //           </h2>
          
// // //           <div className={`
// // //             flex justify-center items-center gap-2 mb-6
// // //             transform transition-all duration-500 ease-out
// // //             ${headerVisible 
// // //               ? 'opacity-100' 
// // //               : 'opacity-0'
// // //             }
// // //           `}
// // //           style={{ transitionDelay: '400ms' }}
// // //           >
// // //             <div className={`
// // //               h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
// // //               transition-all duration-800 ease-out
// // //               ${headerVisible ? 'w-12' : 'w-0'}
// // //             `}
// // //             style={{ transitionDelay: '400ms' }}
// // //             />
// // //             <div className={`
// // //               transform transition-all duration-500 ease-out
// // //               ${headerVisible 
// // //                 ? 'scale-100 rotate-0' 
// // //                 : 'scale-0 rotate-180'
// // //               }
// // //             `}
// // //             style={{ transitionDelay: '500ms' }}
// // //             >
// // //               <Star className="w-5 h-5 text-yellow-500 fill-current animate-pulse" />
// // //             </div>
// // //             <div className={`
// // //               h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full
// // //               transition-all duration-800 ease-out
// // //               ${headerVisible ? 'w-12' : 'w-0'}
// // //             `}
// // //             style={{ transitionDelay: '600ms' }}
// // //             />
// // //           </div>

// // //           <div className={`
// // //             relative bg-white/90 backdrop-blur-sm p-5 rounded-2xl 
// // //             border border-white/20 shadow-lg max-w-3xl mx-auto
// // //             transform transition-all duration-700 ease-out
// // //             hover:shadow-xl hover:scale-[1.02]
// // //             ${headerVisible 
// // //               ? 'opacity-100 translate-y-0' 
// // //               : 'opacity-0 translate-y-5'
// // //             }
// // //           `}
// // //           style={{ transitionDelay: '700ms' }}
// // //           >
// // //             <div className="relative flex items-center justify-center gap-3 mb-4">
// // //               <div className={`
// // //                 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md
// // //                 transform transition-all duration-500 ease-out
// // //                 hover:scale-110 hover:rotate-3
// // //                 ${headerVisible 
// // //                   ? 'scale-100' 
// // //                   : 'scale-0'
// // //                 }
// // //               `}
// // //               style={{ transitionDelay: '800ms' }}
// // //               >
// // //                 <Code2 className="w-5 h-5 text-white" />
// // //               </div>
// // //               <p className={`
// // //                 text-gray-700 text-base font-medium
// // //                 transform transition-all duration-500 ease-out
// // //                 ${headerVisible 
// // //                   ? 'opacity-100' 
// // //                   : 'opacity-0'
// // //                 }
// // //               `}
// // //               style={{ transitionDelay: '900ms' }}
// // //               >
// // //                 Showcasing my expertise through <span className="text-purple-600 font-bold">real-world applications</span> that solve complex problems
// // //               </p>
// // //             </div>
            
// // //             {/* Optimized Project Stats */}
// // //             <div className={`
// // //               flex justify-center gap-4 mt-4 flex-wrap
// // //               transform transition-all duration-500 ease-out
// // //               ${headerVisible 
// // //                 ? 'opacity-100' 
// // //                 : 'opacity-0'
// // //               }
// // //             `}
// // //             style={{ transitionDelay: '1000ms' }}
// // //             >
// // //               {stats.map((stat, index) => (
// // //                 <StatCard
// // //                   key={stat.label}
// // //                   stat={stat}
// // //                   index={index}
// // //                   isVisible={headerVisible}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Optimized Projects Grid */}
// // //         <div 
// // //           ref={projectsRef}
// // //           className={`
// // //             grid lg:grid-cols-1 gap-8
// // //             transform transition-all duration-600 ease-out
// // //             ${projectsVisible 
// // //               ? 'opacity-100' 
// // //               : 'opacity-0'
// // //             }
// // //           `}
// // //         >
// // //           {projects.map((project, index) => (
// // //             <ProjectItem
// // //               key={project.id}
// // //               project={project}
// // //               index={index}
// // //               isVisible={projectsVisible}
// // //             />
// // //           ))}
// // //         </div>

// // //         {/* Enhanced bottom decorative element */}
// // //         <div className={`
// // //           flex justify-center mt-16
// // //           transform transition-all duration-600 ease-out
// // //           ${projectsVisible 
// // //             ? 'opacity-100 translate-y-0' 
// // //             : 'opacity-0 translate-y-5'
// // //           }
// // //         `}
// // //         style={{ transitionDelay: '1200ms' }}
// // //         >
// // //           <div className={`
// // //             flex items-center gap-2 px-4 py-2 
// // //             bg-gradient-to-r from-gray-50 to-white rounded-full 
// // //             border border-gray-200/50 shadow-md
// // //             transform transition-all duration-300 ease-out
// // //             hover:scale-105 hover:shadow-lg active:scale-95
// // //             cursor-pointer group
// // //           `}>
// // //             <div className={`
// // //               transform transition-all duration-500 ease-out
// // //               group-hover:rotate-12 group-hover:scale-110
// // //               ${projectsVisible 
// // //                 ? 'scale-100' 
// // //                 : 'scale-0'
// // //               }
// // //             `}
// // //             style={{ transitionDelay: '1300ms' }}
// // //             >
// // //               <Sparkles className="w-4 h-4 text-purple-500" />
// // //             </div>
// // //             <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
// // //               More projects coming soon!
// // //             </span>
// // //             <div className={`
// // //               transform transition-all duration-500 ease-out
// // //               group-hover:-rotate-12 group-hover:scale-110
// // //               ${projectsVisible 
// // //                 ? 'scale-100' 
// // //                 : 'scale-0'
// // //               }
// // //             `}
// // //             style={{ transitionDelay: '1400ms' }}
// // //             >
// // //               <Sparkles className="w-4 h-4 text-pink-500" />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // });

// // // // 'use client'

// // // // import { motion, useInView } from "framer-motion";
// // // // import { Rocket, Star, Code2, Sparkles, Trophy, Zap, FolderOpen } from "lucide-react";
// // // // import ProjectCard from "@/components/ProjectCard";
// // // // import { memo, useMemo, useRef, useState, useEffect, useCallback } from "react";

// // // // interface Project {
// // // //   id: string;
// // // //   // Add other project properties as needed
// // // // }

// // // // interface ProjectsSectionProps {
// // // //   containerVariants: any;
// // // //   itemVariants: any;
// // // //   projects: Project[];
// // // // }

// // // // // Optimized stat card component
// // // // const StatCard = memo(({ 
// // // //   stat, 
// // // //   index, 
// // // //   isVisible 
// // // // }: { 
// // // //   stat: any; 
// // // //   index: number; 
// // // //   isVisible: boolean; 
// // // // }) => (
// // // //   <motion.div
// // // //     className="flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-xl border border-gray-200/50"
// // // //     initial={{ opacity: 0, scale: 0 }}
// // // //     animate={isVisible ? { opacity: 1, scale: 1 } : {}}
// // // //     transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
// // // //     whileHover={{ scale: 1.05 }}
// // // //   >
// // // //     <div className={`p-1.5 bg-gradient-to-r ${stat.color} rounded-lg`}>
// // // //       <stat.icon className="w-3 h-3 text-white" />
// // // //     </div>
// // // //     <div className="text-center">
// // // //       <div className="text-sm font-bold text-gray-800">{stat.value}</div>
// // // //       <div className="text-xs text-gray-600">{stat.label}</div>
// // // //     </div>
// // // //   </motion.div>
// // // // ));

// // // // StatCard.displayName = 'StatCard';

// // // // // Optimized project item component
// // // // const ProjectItem = memo(({ 
// // // //   project, 
// // // //   index, 
// // // //   isVisible 
// // // // }: { 
// // // //   project: Project; 
// // // //   index: number; 
// // // //   isVisible: boolean; 
// // // // }) => (
// // // //   <motion.div
// // // //     initial={{ opacity: 0, y: 30 }}
// // // //     animate={isVisible ? { opacity: 1, y: 0 } : {}}
// // // //     transition={{ 
// // // //       delay: index * 0.15, 
// // // //       duration: 0.5,
// // // //       ease: "easeOut"
// // // //     }}
// // // //     className="relative group"
// // // //   >
// // // //     {/* Project highlight indicator */}
// // // //     <div className={`absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
    
// // // //     <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
// // // //       {/* Subtle gradient overlay */}
// // // //       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-purple-50/20 pointer-events-none" />
      
// // // //       <div className="relative z-10">
// // // //         <ProjectCard project={project} />
// // // //       </div>
// // // //     </div>
// // // //   </motion.div>
// // // // ));

// // // // ProjectItem.displayName = 'ProjectItem';

// // // // export default memo(function ProjectsSection({ 
// // // //   containerVariants, 
// // // //   itemVariants, 
// // // //   projects 
// // // // }: ProjectsSectionProps) {
// // // //   const sectionRef = useRef(null);
// // // //   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
// // // //   const [headerAnimated, setHeaderAnimated] = useState(false);

// // // //   // Memoize static data to prevent recreation
// // // //   const stats = useMemo(() => [
// // // //     { icon: FolderOpen, label: "Projects", value: projects.length, color: "from-blue-500 to-cyan-500" },
// // // //     { icon: Trophy, label: "Completed", value: projects.length, color: "from-green-500 to-emerald-500" },
// // // //     { icon: Zap, label: "Technologies", value: "6+", color: "from-purple-500 to-pink-500" }
// // // //   ], [projects.length]);

// // // //   // Track header animation completion
// // // //   useEffect(() => {
// // // //     if (isInView && !headerAnimated) {
// // // //       const timer = setTimeout(() => {
// // // //         setHeaderAnimated(true);
// // // //       }, 1000);
// // // //       return () => clearTimeout(timer);
// // // //     }
// // // //   }, [isInView, headerAnimated]);

// // // //   const handleHeaderAnimationComplete = useCallback(() => {
// // // //     setHeaderAnimated(true);
// // // //   }, []);

// // // //   return (
// // // //     <div className="relative overflow-hidden">
// // // //       {/* Simplified background elements */}
// // // //       <div className="absolute inset-0 pointer-events-none opacity-40">
// // // //         <div className="absolute top-32 left-16 w-28 h-28 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
// // // //         <div className="absolute bottom-32 right-16 w-36 h-36 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl" />
// // // //       </div>

// // // //       <motion.section 
// // // //         ref={sectionRef}
// // // //         id="projects"
// // // //         initial="hidden"
// // // //         whileInView="visible"
// // // //         viewport={{ once: true, amount: 0.1 }}
// // // //         variants={containerVariants}
// // // //         className="max-w-6xl mx-auto relative z-10"
// // // //       >
// // // //         <motion.div 
// // // //           variants={itemVariants} 
// // // //           className="text-center mb-12"
// // // //         >
// // // //           <motion.div
// // // //             className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200 mb-4"
// // // //             whileHover={{ scale: 1.02 }}
// // // //             transition={{ duration: 0.2 }}
// // // //           >
// // // //             <Rocket className="w-4 h-4 text-purple-500" />
// // // //             <span className="text-sm font-medium text-purple-700">My Work</span>
// // // //           </motion.div>
          
// // // //           <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
// // // //             Featured Projects
// // // //           </h2>
          
// // // //           <div className="flex justify-center items-center gap-2 mb-6">
// // // //             <motion.div 
// // // //               className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
// // // //               initial={{ width: 0 }}
// // // //               animate={isInView ? { width: "3rem" } : {}}
// // // //               transition={{ duration: 0.8, delay: 0.2 }}
// // // //             />
// // // //             <Star className="w-5 h-5 text-yellow-500 fill-current" />
// // // //             <motion.div 
// // // //               className="w-12 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
// // // //               initial={{ width: 0 }}
// // // //               animate={isInView ? { width: "3rem" } : {}}
// // // //               transition={{ duration: 0.8, delay: 0.3 }}
// // // //             />
// // // //           </div>

// // // //           <motion.div
// // // //             className="relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-lg max-w-3xl mx-auto"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={isInView ? { opacity: 1, y: 0 } : {}}
// // // //             transition={{ duration: 0.5, delay: 0.4 }}
// // // //           >
// // // //             <div className="relative flex items-center justify-center gap-3 mb-4">
// // // //               <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
// // // //                 <Code2 className="w-5 h-5 text-white" />
// // // //               </div>
// // // //               <p className="text-gray-700 text-base font-medium">
// // // //                 Showcasing my expertise through <span className="text-purple-600 font-bold">real-world applications</span> that solve complex problems
// // // //               </p>
// // // //             </div>
            
// // // //             {/* Optimized Project Stats */}
// // // //             <div className="flex justify-center gap-4 mt-4">
// // // //               {stats.map((stat, index) => (
// // // //                 <StatCard
// // // //                   key={stat.label}
// // // //                   stat={stat}
// // // //                   index={index}
// // // //                   isVisible={isInView}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //           </motion.div>
// // // //         </motion.div>

// // // //         {/* Optimized Projects Grid */}
// // // //         <motion.div 
// // // //           variants={itemVariants}
// // // //           className="grid lg:grid-cols-1 gap-6"
// // // //         >
// // // //           {projects.map((project, index) => (
// // // //             <ProjectItem
// // // //               key={project.id}
// // // //               project={project}
// // // //               index={index}
// // // //               isVisible={isInView}
// // // //             />
// // // //           ))}
// // // //         </motion.div>

// // // //         {/* Simplified bottom decorative element */}
// // // //         <motion.div
// // // //           className="flex justify-center mt-12"
// // // //           initial={{ opacity: 0 }}
// // // //           animate={isInView ? { opacity: 1 } : {}}
// // // //           transition={{ delay: 0.6, duration: 0.4 }}
// // // //         >
// // // //           <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-white rounded-full border border-gray-200/50 shadow-md">
// // // //             <Sparkles className="w-4 h-4 text-purple-500" />
// // // //             <span className="text-sm font-medium text-gray-600">More projects coming soon!</span>
// // // //             <Sparkles className="w-4 h-4 text-pink-500" />
// // // //           </div>
// // // //         </motion.div>
// // // //       </motion.section>
// // // //     </div>
// // // //   );
// // // // });