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