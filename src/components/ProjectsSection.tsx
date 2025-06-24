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