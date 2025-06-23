'use client'

import React, { useState, useCallback, useMemo, memo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Tag, 
  Star, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Code2,
  Palette,
  Database,
  Globe,
  Smartphone,
  Users,
  Award,
  Target,
  TrendingUp,
  Play,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Lightbulb,
  Rocket,
  Shield,
  Cpu,
  Cloud,
  Timer,
  Layers,
  Monitor,
  Download,
  Settings,
  BarChart3,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    subtitle: string
    description: string
    longDescription: string
    
    // Platform Information
    platform: 'Website' | 'Mobile App'
    platformType: string
    deviceTargets: string[]
    screenSize: string
    
    // Media Assets
    image: string
    screenshots?: string[]
    mockupType: 'laptop' | 'mobile'
    
    // Links
    link: string
    demoLink?: string
    playStoreLink?: string
    appStoreLink?: string
    
    // Project Details
    category: string
    status: string
    year: string
    duration: string
    
    // Technical Stack
    technologies: string[]
    
    // Features
    features: Array<{
      icon: string
      title: string
      description: string
    }>
    
    // Enhanced Data
    userRoles?: Array<{
      role: string
      permissions: string[]
    }>
    screens?: Array<{
      name: string
      description: string
      icon?: string
    }>
    achievements: string[]
    problemStatement?: string
    solution?: string
    
    // Enhanced Color Scheme
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      surface?: string
      text: string
      textLight?: string
      success?: string
      warning?: string
      error?: string
      gradient?: {
        primary: string
        secondary: string
        surface?: string
      }
      shadow?: string
    }
    
    // Metrics
    metrics?: {
      [key: string]: any
    }
    
    // App-specific information
    appInfo?: {
      category: string
      size: string
      compatibility: string
      languages: string[]
      lastUpdate: string
      version: string
    }
    
    // Architecture details
    architecture?: {
      [key: string]: string
    }
    
    // Roadmap
    roadmap?: string[]
  }
}

// Enhanced icon mapping
const iconMap = {
  'Zap': Zap,
  'Code2': Code2,
  'Palette': Palette,
  'Database': Database,
  'Globe': Globe,
  'Smartphone': Smartphone,
  'Users': Users,
  'Award': Award,
  'Target': Target,
  'Shield': Shield,
  'Cpu': Cpu,
  'Cloud': Cloud,
  'Lightbulb': Lightbulb,
  'Rocket': Rocket,
  'Timer': Timer,
  'Layers': Layers,
  'Monitor': Monitor,
  'Download': Download,
  'Settings': Settings,
  'BarChart3': BarChart3,
  'CheckCircle': CheckCircle,
  'AlertCircle': AlertCircle
} as const

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Platform-specific badge component
const PlatformBadge = memo(({ platform, deviceTargets }: { platform: string; deviceTargets: string[] }) => {
  const PlatformIcon = platform === 'Website' ? Globe : Smartphone
  const bgColor = platform === 'Website' ? 'bg-blue-500/15 border-blue-500/25' : 'bg-emerald-500/15 border-emerald-500/25'
  const textColor = platform === 'Website' ? 'text-blue-400' : 'text-emerald-400'
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${bgColor} ${textColor}`}>
      <PlatformIcon size={12} />
      <span>{platform}</span>
      {deviceTargets.length > 1 && (
        <span className="text-slate-400">• {deviceTargets.length} platforms</span>
      )}
    </div>
  )
})

// Enhanced status badge
const StatusBadge = memo(({ status }: { status: string }) => {
  const statusConfig = useMemo(() => ({
    'Completed': { 
      bg: 'bg-emerald-500/15', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/25',
      dot: 'bg-emerald-500',
      icon: CheckCircle
    },
    'Active Development': { 
      bg: 'bg-blue-500/15', 
      text: 'text-blue-400', 
      border: 'border-blue-500/25',
      dot: 'bg-blue-500',
      icon: Code2
    },
    'In Progress': { 
      bg: 'bg-blue-500/15', 
      text: 'text-blue-400', 
      border: 'border-blue-500/25',
      dot: 'bg-blue-500',
      icon: Code2
    },
    'Planning': { 
      bg: 'bg-amber-500/15', 
      text: 'text-amber-400', 
      border: 'border-amber-500/25',
      dot: 'bg-amber-500',
      icon: AlertCircle
    }
  }), [])

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Planning']
  const StatusIcon = config.icon

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${config.bg} ${config.text} ${config.border}`}>
      <StatusIcon size={12} />
      {status}
    </div>
  )
})

const CategoryBadge = memo(({ category }: { category: string }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm text-slate-200 rounded-full text-xs font-medium border border-slate-700/50">
    <Tag size={12} />
    {category}
  </div>
))

// Dynamic tech badge with project colors
const TechBadge = memo(({ tech, index, colors }: { tech: string; index: number; colors: any }) => (
  <motion.span
    key={tech}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.02, duration: 0.2 }}
    className="px-2.5 py-1 text-white rounded-md text-xs font-medium border backdrop-blur-sm hover:border-opacity-60 transition-colors"
    style={{
      background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
      borderColor: `${colors.primary}25`
    }}
  >
    {tech}
  </motion.span>
))

// Enhanced action button with project colors
const ActionButton = memo(({ 
  href, 
  children, 
  variant = 'primary',
  onClick,
  colors
}: { 
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  colors: any
}) => {
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
  
  const Component = href ? 'a' : 'button'
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

  const style = variant === 'primary' 
    ? {
        background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
        boxShadow: `0 10px 25px ${colors.shadow || colors.primary + '25'}`,
        color: 'white'
      }
    : {
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderColor: 'rgba(71, 85, 105, 0.5)',
        color: 'rgb(226, 232, 240)'
      }

  return (
    <Component
      className={`${baseClasses} ${variant === 'secondary' ? 'border backdrop-blur-sm hover:bg-slate-700/80' : ''}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
})

// Enhanced tab button with project colors
const TabButton = memo(({ 
  tab, 
  isActive, 
  onClick,
  colors
}: { 
  tab: { id: string; label: string; icon: any }
  isActive: boolean
  onClick: () => void
  colors: any
}) => {
  const Icon = tab.icon
  
  const style = isActive 
    ? {
        background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
        color: 'white'
      }
    : {}

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
        isActive
          ? 'shadow-md'
          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-700/50'
      }`}
      style={style}
    >
      <Icon size={16} />
      <span>{tab.label}</span>
    </button>
  )
})

const ProjectStats = memo(({ project }: { project: ProjectCardProps['project'] }) => {
  const stats = useMemo(() => {
    const baseStats = [
      { value: project.duration, label: 'Duration', color: 'text-violet-400' },
      { value: project.technologies.length.toString(), label: 'Technologies', color: 'text-blue-400' },
      { value: project.features.length.toString(), label: 'Features', color: 'text-emerald-400' }
    ]

    // Add platform-specific stats
    if (project.platform === 'Mobile App') {
      if (project.screens) {
        baseStats.push({ value: project.screens.length.toString(), label: 'Screens', color: 'text-purple-400' })
      }
      if (project.metrics?.downloadCount) {
        baseStats[2] = { value: project.metrics.downloadCount, label: 'Downloads', color: 'text-emerald-400' }
      }
    } else if (project.platform === 'Website') {
      if (project.userRoles) {
        baseStats.push({ value: project.userRoles.length.toString(), label: 'User Roles', color: 'text-orange-400' })
      }
    }

    return baseStats.slice(0, 4) // Limit to 4 stats for grid layout
  }, [project])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="text-center"
        >
          <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-slate-400 text-xs">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
})

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  // Dynamic tabs based on project data
  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'overview', label: 'Overview', icon: Eye },
      { id: 'features', label: 'Features', icon: Star },
      { id: 'tech', label: 'Technology', icon: Code2 }
    ]

    // Add platform-specific tabs
    if (project.platform === 'Mobile App' && project.screens) {
      baseTabs.splice(2, 0, { id: 'screens', label: 'Screens', icon: Smartphone })
    }

    if (project.achievements.length > 0) {
      baseTabs.push({ id: 'achievements', label: 'Results', icon: TrendingUp })
    }

    if (project.roadmap) {
      baseTabs.push({ id: 'roadmap', label: 'Roadmap', icon: Rocket })
    }

    return baseTabs
  }, [project])

  const visibleTechs = useMemo(() => project.technologies.slice(0, 6), [project.technologies])
  const remainingTechsCount = project.technologies.length - 6

  // Platform-specific action buttons
  const actionButtons = useMemo(() => {
    const buttons = []
    
    if (project.demoLink) {
      buttons.push({
        href: project.demoLink,
        label: project.platform === 'Website' ? 'Live Demo' : 'Try Demo',
        icon: project.platform === 'Website' ? ExternalLink : PlayCircle,
        variant: 'primary' as const
      })
    }

    if (project.platform === 'Mobile App') {
      if (project.playStoreLink) {
        buttons.push({
          href: project.playStoreLink,
          label: 'Play Store',
          icon: Download,
          variant: 'secondary' as const
        })
      }
      if (project.appStoreLink) {
        buttons.push({
          href: project.appStoreLink,
          label: 'App Store',
          icon: Download,
          variant: 'secondary' as const
        })
      }
    }

    if (project.link) {
      buttons.push({
        href: project.link,
        label: 'Source Code',
        icon: Github,
        variant: 'secondary' as const
      })
    }

    return buttons
  }, [project])

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full mb-6"
    >
      <div 
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl"
        style={{
          boxShadow: `0 25px 50px ${project.colors.shadow || project.colors.primary + '15'}`
        }}
      >
        {/* Dynamic background pattern with project colors */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--color-1),transparent_70%)]"
            style={{ '--color-1': project.colors.primary + '25' } as React.CSSProperties}
          />
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--color-2),transparent_70%)]"
            style={{ '--color-2': project.colors.accent + '25' } as React.CSSProperties}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Image section with platform-specific styling */}
          <div className={`${project.platform === 'Website' ? 'lg:w-3/5' : 'lg:w-2/5'} relative`}>
            <div className={`relative ${project.platform === 'Website' ? 'h-64 lg:h-96' : 'h-64 lg:h-80'}`}>
              <div className="relative w-full h-full group">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.platform} Screenshot`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  } ${project.mockupType === 'mobile' ? 'object-contain bg-slate-800' : 'object-cover'}`}
                  sizes={project.platform === 'Website' ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 40vw"}
                  priority={false}
                  onLoad={handleImageLoad}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
                    {project.platform === 'Website' ? 
                      <Monitor className="w-12 h-12 text-slate-600" /> : 
                      <Smartphone className="w-12 h-12 text-slate-600" />
                    }
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Floating action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
                  >
                    <Github size={18} />
                  </a>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 backdrop-blur-sm rounded-full border text-white transition-all duration-200"
                      style={{
                        backgroundColor: project.colors.primary + '80',
                        borderColor: project.colors.primary + '50'
                      }}
                    >
                      <Play size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Enhanced badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <StatusBadge status={project.status} />
                <PlatformBadge platform={project.platform} deviceTargets={project.deviceTargets} />
                <CategoryBadge category={project.category} />
              </div>

              {/* Bottom stats with platform-specific info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-slate-300 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      <span>{project.features.length}</span>
                    </div>
                    {project.appInfo?.version && (
                      <div className="flex items-center gap-1">
                        <Settings size={14} />
                        <span>v{project.appInfo.version}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-red-400" />
                    <MessageCircle size={14} className="text-blue-400" />
                    <Share2 size={14} className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <motion.div 
            className={`${project.platform === 'Website' ? 'lg:w-2/5' : 'lg:w-3/5'} p-6 lg:p-8`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-6">
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.accent})`
                }}
              >
                {project.title}
              </h2>
              <p className="text-lg text-slate-300 mb-3">{project.subtitle}</p>
              <p className="text-slate-400 leading-relaxed">{project.description}</p>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {visibleTechs.map((tech, index) => (
                  <TechBadge key={tech} tech={tech} index={index} colors={project.colors} />
                ))}
                {remainingTechsCount > 0 && (
                  <span className="px-2.5 py-1 text-slate-400 text-xs">
                    +{remainingTechsCount} more
                  </span>
                )}
              </div>
            </motion.div>

            {/* Enhanced action buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
              <ActionButton onClick={handleToggleExpanded} colors={project.colors}>
                <BookOpen size={16} />
                <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </ActionButton>

              {actionButtons.map((button, index) => (
                <ActionButton 
                  key={index}
                  href={button.href} 
                  variant={button.variant}
                  colors={project.colors}
                >
                  <button.icon size={16} />
                  <span>{button.label}</span>
                </ActionButton>
              ))}
            </motion.div>

            {/* Enhanced project stats */}
            <motion.div variants={itemVariants}>
              <ProjectStats project={project} />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border-t border-slate-700/50 overflow-hidden"
            >
              <div className="p-6 lg:p-8 bg-slate-900/50 backdrop-blur-sm">
                {/* Enhanced tab navigation */}
                <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-700/50">
                  {tabs.map((tab) => (
                    <TabButton
                      key={tab.id}
                      tab={tab}
                      isActive={activeTab === tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      colors={project.colors}
                    />
                  ))}
                </div>

                {/* Enhanced tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Project Overview</h3>
                          <p className="text-slate-300 leading-relaxed mb-4">{project.longDescription}</p>
                        </div>

                        {project.problemStatement && (
                          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                              <Target size={16} />
                              Problem Statement
                            </h4>
                            <p className="text-slate-300 text-sm">{project.problemStatement}</p>
                          </div>
                        )}

                        {project.solution && (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                              <Lightbulb size={16} />
                              Solution
                            </h4>
                            <p className="text-slate-300 text-sm">{project.solution}</p>
                          </div>
                        )}

                        {/* Platform-specific overview content */}
                        {project.platform === 'Mobile App' && project.appInfo && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                              <Download className="text-violet-400 mb-2" size={20} />
                              <h4 className="text-white font-semibold mb-1 text-sm">App Information</h4>
                              <p className="text-slate-400 text-xs">
                                {project.appInfo.category} • {project.appInfo.size} • {project.appInfo.compatibility}
                              </p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                              <Globe className="text-blue-400 mb-2" size={20} />
                              <h4 className="text-white font-semibold mb-1 text-sm">Languages</h4>
                              <p className="text-slate-400 text-xs">{project.appInfo.languages.join(', ')}</p>
                            </div>
                          </div>
                        )}

                        {project.platform === 'Website' && project.userRoles && (
                          <div>
                            <h4 className="text-white font-semibold mb-3">User Roles</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {project.userRoles.map((role, index) => (
                                <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                  <Users className="text-blue-400 mb-2" size={16} />
                                  <h5 className="text-white font-medium text-sm mb-1">{role.role}</h5>
                                  <p className="text-slate-400 text-xs">
                                    {role.permissions.length} permissions
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.features.map((feature, index) => {
                            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <div 
                                    className="flex items-center justify-center w-10 h-10 rounded-lg text-xl"
                                    style={{
                                      background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
                                      border: `1px solid ${project.colors.primary}25`
                                    }}
                                  >
                                    <IconComponent className="text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                                    <p className="text-slate-400 text-sm">{feature.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {activeTab === 'tech' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <TechBadge key={tech} tech={tech} index={index} colors={project.colors} />
                            ))}
                          </div>
                        </div>

                        {project.architecture && (
                          <div>
                            <h4 className="text-white font-semibold mb-3">Architecture</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {Object.entries(project.architecture).map(([key, value], index) => (
                                <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                  <h5 className="text-slate-400 text-xs uppercase font-semibold mb-1">{key}</h5>
                                  <p className="text-white text-sm">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'screens' && project.screens && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">App Screens</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {project.screens.map((screen, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="group relative aspect-[9/16] bg-slate-800 rounded-lg border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-colors"
                            >
                              <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="text-center">
                                  <div className="text-2xl mb-2">{screen.icon || '📱'}</div>
                                  <h4 className="text-white text-xs font-medium line-clamp-2">{screen.name.replace('Screen', '')}</h4>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <p className="text-slate-300 text-xs">{screen.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'achievements' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Key Achievements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <Award 
                                  size={20} 
                                  className="flex-shrink-0 mt-0.5" 
                                  style={{ color: project.colors.primary }}
                                />
                                <p className="text-slate-300">{achievement}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {project.metrics && (
                          <div className="mt-6">
                            <h4 className="text-white font-semibold mb-3">Metrics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {Object.entries(project.metrics).map(([key, value], index) => (
                                <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                  <h5 className="text-slate-400 text-xs uppercase font-semibold mb-1">{key}</h5>
                                  <p className="text-white text-sm">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'roadmap' && project.roadmap && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Future Plans</h3>
                        <div className="space-y-3">
                          {project.roadmap.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div 
                                className="flex items-center justify-center w-6 h-6 rounded-full mt-0.5 flex-shrink-0"
                                style={{
                                  background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
                                  border: `1px solid ${project.colors.primary}25`
                                }}
                              >
                                <Rocket size={12} style={{ color: project.colors.primary }} />
                              </div>
                              <p className="text-slate-300">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Screenshots gallery */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
                    <div className={`grid gap-4 ${project.mockupType === 'mobile' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                      {project.screenshots.map((screenshot, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative group overflow-hidden rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors ${
                            project.mockupType === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'
                          }`}
                        >
                          <Image
                            src={screenshot}
                            alt={`${project.title} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <p className="text-white text-sm">
                              {project.mockupType === 'mobile' 
                                ? `Mobile Screen ${index + 1}` 
                                : `Desktop View ${index + 1}`}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

// 'use client'

// import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from 'react'
// import Image from 'next/image'
// import { motion, AnimatePresence, useInView } from 'framer-motion'
// import { 
//   ExternalLink, 
//   Github, 
//   Calendar, 
//   Tag, 
//   Star, 
//   ArrowRight,
//   ChevronDown,
//   ChevronUp,
//   Zap,
//   Code2,
//   Palette,
//   Database,
//   Globe,
//   Smartphone,
//   Users,
//   Award,
//   Target,
//   TrendingUp,
//   Play,
//   Eye,
//   Heart,
//   MessageCircle,
//   Share2,
//   BookOpen,
//   Lightbulb,
//   Rocket,
//   Shield,
//   Cpu,
//   Cloud,
//   Timer,
//   Layers,
//   Monitor,
//   Download,
//   Settings,
//   BarChart3,
//   MapPin,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   PlayCircle,
//   Grid,
//   Layout
// } from 'lucide-react'

// interface ProjectCardProps {
//   project: {
//     id: number
//     title: string
//     subtitle: string
//     description: string
//     longDescription: string
    
//     // Platform Information
//     platform: 'Website' | 'Mobile App'
//     platformType: string
//     deviceTargets: string[]
//     screenSize: string
    
//     // Media Assets
//     image: string
//     screenshots?: string[]
//     mockupType: 'laptop' | 'mobile'
//     imageLayout?: 'default' | 'showcase' | 'minimal' | 'gallery' | 'hero'
    
//     // Links
//     link: string
//     demoLink?: string
//     playStoreLink?: string
//     appStoreLink?: string
    
//     // Project Details
//     category: string
//     status: string
//     year: string
//     duration: string
    
//     // Technical Stack
//     technologies: string[]
    
//     // Features
//     features: Array<{
//       icon: string
//       title: string
//       description: string
//     }>
    
//     // Enhanced Data
//     userRoles?: Array<{
//       role: string
//       permissions: string[]
//     }>
//     screens?: Array<{
//       name: string
//       description: string
//       icon?: string
//     }>
//     achievements: string[]
//     problemStatement?: string
//     solution?: string
    
//     // Enhanced Color Scheme
//     colors: {
//       primary: string
//       secondary: string
//       accent: string
//       background: string
//       surface?: string
//       text: string
//       textLight?: string
//       success?: string
//       warning?: string
//       error?: string
//       gradient?: {
//         primary: string
//         secondary: string
//         surface?: string
//       }
//       shadow?: string
//     }
    
//     // Metrics
//     metrics?: {
//       [key: string]: any
//     }
    
//     // App-specific information
//     appInfo?: {
//       category: string
//       size: string
//       compatibility: string
//       languages: string[]
//       lastUpdate: string
//       version: string
//     }
    
//     // Architecture details
//     architecture?: {
//       [key: string]: string
//     }
    
//     // Roadmap
//     roadmap?: string[]
//   }
// }

// // Enhanced icon mapping with better performance
// const iconMap = {
//   'Zap': Zap,
//   'Code2': Code2,
//   'Palette': Palette,
//   'Database': Database,
//   'Globe': Globe,
//   'Smartphone': Smartphone,
//   'Users': Users,
//   'Award': Award,
//   'Target': Target,
//   'Shield': Shield,
//   'Cpu': Cpu,
//   'Cloud': Cloud,
//   'Lightbulb': Lightbulb,
//   'Rocket': Rocket,
//   'Timer': Timer,
//   'Layers': Layers,
//   'Monitor': Monitor,
//   'Download': Download,
//   'Settings': Settings,
//   'BarChart3': BarChart3,
//   'CheckCircle': CheckCircle,
//   'AlertCircle': AlertCircle
// } as const

// // Optimized animation variants with reduced motion
// const cardVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.2, ease: "easeOut" }
//   }
// }

// const contentVariants = {
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1,
//     transition: { 
//       staggerChildren: 0.02,
//       delayChildren: 0.05
//     }
//   }
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 8 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.15, ease: "easeOut" }
//   }
// }

// // Memoized components for better performance
// const PlatformBadge = memo(({ platform, deviceTargets }: { platform: string; deviceTargets: string[] }) => {
//   const PlatformIcon = platform === 'Website' ? Globe : Smartphone
//   const bgColor = platform === 'Website' ? 'bg-blue-500/15 border-blue-500/25' : 'bg-emerald-500/15 border-emerald-500/25'
//   const textColor = platform === 'Website' ? 'text-blue-400' : 'text-emerald-400'
  
//   return (
//     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${bgColor} ${textColor}`}>
//       <PlatformIcon size={12} />
//       <span>{platform}</span>
//       {deviceTargets.length > 1 && (
//         <span className="text-slate-400">• {deviceTargets.length} platforms</span>
//       )}
//     </div>
//   )
// })

// const StatusBadge = memo(({ status }: { status: string }) => {
//   const statusConfig = useMemo(() => ({
//     'Completed': { 
//       bg: 'bg-emerald-500/15', 
//       text: 'text-emerald-400', 
//       border: 'border-emerald-500/25',
//       icon: CheckCircle
//     },
//     'Active Development': { 
//       bg: 'bg-blue-500/15', 
//       text: 'text-blue-400', 
//       border: 'border-blue-500/25',
//       icon: Code2
//     },
//     'In Progress': { 
//       bg: 'bg-blue-500/15', 
//       text: 'text-blue-400', 
//       border: 'border-blue-500/25',
//       icon: Code2
//     },
//     'Planning': { 
//       bg: 'bg-amber-500/15', 
//       text: 'text-amber-400', 
//       border: 'border-amber-500/25',
//       icon: AlertCircle
//     }
//   }), [])

//   const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Planning']
//   const StatusIcon = config.icon

//   return (
//     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${config.bg} ${config.text} ${config.border}`}>
//       <StatusIcon size={12} />
//       {status}
//     </div>
//   )
// })

// const CategoryBadge = memo(({ category }: { category: string }) => (
//   <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm text-slate-200 rounded-full text-xs font-medium border border-slate-700/50">
//     <Tag size={12} />
//     {category}
//   </div>
// ))

// const TechBadge = memo(({ tech, colors }: { tech: string; colors: any }) => (
//   <span
//     className="px-2.5 py-1 text-white rounded-md text-xs font-medium border backdrop-blur-sm hover:border-opacity-60 transition-colors"
//     style={{
//       background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
//       borderColor: `${colors.primary}25`
//     }}
//   >
//     {tech}
//   </span>
// ))

// const ActionButton = memo(({ 
//   href, 
//   children, 
//   variant = 'primary',
//   onClick,
//   colors
// }: { 
//   href?: string
//   children: React.ReactNode
//   variant?: 'primary' | 'secondary'
//   onClick?: () => void
//   colors: any
// }) => {
//   const baseClasses = "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
  
//   const Component = href ? 'a' : 'button'
//   const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

//   const style = variant === 'primary' 
//     ? {
//         background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
//         boxShadow: `0 10px 25px ${colors.shadow || colors.primary + '25'}`,
//         color: 'white'
//       }
//     : {
//         backgroundColor: 'rgba(30, 41, 59, 0.8)',
//         borderColor: 'rgba(71, 85, 105, 0.5)',
//         color: 'rgb(226, 232, 240)'
//       }

//   return (
//     <Component
//       className={`${baseClasses} ${variant === 'secondary' ? 'border backdrop-blur-sm hover:bg-slate-700/80' : ''}`}
//       style={style}
//       {...props}
//     >
//       {children}
//     </Component>
//   )
// })

// const TabButton = memo(({ 
//   tab, 
//   isActive, 
//   onClick,
//   colors
// }: { 
//   tab: { id: string; label: string; icon: any }
//   isActive: boolean
//   onClick: () => void
//   colors: any
// }) => {
//   const Icon = tab.icon
  
//   const style = isActive 
//     ? {
//         background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
//         color: 'white'
//       }
//     : {}

//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
//         isActive
//           ? 'shadow-md'
//           : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-700/50'
//       }`}
//       style={style}
//     >
//       <Icon size={16} />
//       <span>{tab.label}</span>
//     </button>
//   )
// })

// // Optimized image component with better loading
// const OptimizedImage = memo(({ 
//   src, 
//   alt, 
//   className, 
//   sizes, 
//   priority = false,
//   onLoad,
//   style
// }: {
//   src: string
//   alt: string
//   className?: string
//   sizes?: string
//   priority?: boolean
//   onLoad?: () => void
//   style?: React.CSSProperties
// }) => {
//   const [isLoaded, setIsLoaded] = useState(false)
  
//   const handleLoad = useCallback(() => {
//     setIsLoaded(true)
//     onLoad?.()
//   }, [onLoad])

//   return (
//     <div className="relative w-full h-full">
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
//         sizes={sizes}
//         priority={priority}
//         onLoad={handleLoad}
//         style={style}
//       />
//       {!isLoaded && (
//         <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
//           <div className="w-12 h-12 text-slate-600">
//             <Monitor className="w-full h-full" />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// })

// // Different image layout components
// const DefaultImageLayout = memo(({ project, imageLoaded, onImageLoad }: { project: ProjectCardProps['project'], imageLoaded: boolean, onImageLoad: () => void }) => (
//   <div className="lg:w-3/5 relative">
//     <div className="relative h-64 lg:h-96">
//       <OptimizedImage
//         src={project.image}
//         alt={`${project.title} - ${project.platform} Screenshot`}
//         className="object-cover"
//         sizes="(max-width: 1024px) 100vw, 60vw"
//         onLoad={onImageLoad}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
//       <ProjectImageOverlay project={project} />
//       <ProjectImageBadges project={project} />
//     </div>
//   </div>
// ))

// const ShowcaseImageLayout = memo(({ project, imageLoaded, onImageLoad }: { project: ProjectCardProps['project'], imageLoaded: boolean, onImageLoad: () => void }) => (
//   <div className="w-full">
//     <div className="relative h-80 lg:h-96 mb-6">
//       <OptimizedImage
//         src={project.image}
//         alt={`${project.title} - ${project.platform} Screenshot`}
//         className="object-cover rounded-2xl"
//         sizes="100vw"
//         onLoad={onImageLoad}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl" />
//       <ProjectImageOverlay project={project} />
//       <ProjectImageBadges project={project} />
//     </div>
//   </div>
// ))

// const MinimalImageLayout = memo(({ project, imageLoaded, onImageLoad }: { project: ProjectCardProps['project'], imageLoaded: boolean, onImageLoad: () => void }) => (
//   <div className="lg:w-2/5 relative">
//     <div className="relative h-48 lg:h-64">
//       <OptimizedImage
//         src={project.image}
//         alt={`${project.title} - ${project.platform} Screenshot`}
//         className="object-cover rounded-xl"
//         sizes="(max-width: 1024px) 100vw, 40vw"
//         onLoad={onImageLoad}
//       />
//       <div className="absolute top-4 left-4 flex flex-col gap-2">
//         <StatusBadge status={project.status} />
//       </div>
//     </div>
//   </div>
// ))

// const GalleryImageLayout = memo(({ project, imageLoaded, onImageLoad }: { project: ProjectCardProps['project'], imageLoaded: boolean, onImageLoad: () => void }) => (
//   <div className="w-full">
//     <div className="grid grid-cols-2 gap-4 mb-6">
//       <div className="relative aspect-video">
//         <OptimizedImage
//           src={project.image}
//           alt={`${project.title} - Main Screenshot`}
//           className="object-cover rounded-xl"
//           sizes="(max-width: 1024px) 50vw, 50vw"
//           onLoad={onImageLoad}
//         />
//       </div>
//       {project.screenshots && project.screenshots.slice(0, 3).map((screenshot, index) => (
//         <div key={index} className="relative aspect-video">
//           <OptimizedImage
//             src={screenshot}
//             alt={`${project.title} - Screenshot ${index + 1}`}
//             className="object-cover rounded-xl"
//             sizes="(max-width: 1024px) 50vw, 25vw"
//           />
//         </div>
//       ))}
//     </div>
//     <div className="flex flex-wrap gap-2 mb-4">
//       <StatusBadge status={project.status} />
//       <PlatformBadge platform={project.platform} deviceTargets={project.deviceTargets} />
//       <CategoryBadge category={project.category} />
//     </div>
//   </div>
// ))

// const HeroImageLayout = memo(({ project, imageLoaded, onImageLoad }: { project: ProjectCardProps['project'], imageLoaded: boolean, onImageLoad: () => void }) => (
//   <div className="w-full">
//     <div className="relative h-96 lg:h-[32rem] mb-8">
//       <OptimizedImage
//         src={project.image}
//         alt={`${project.title} - Hero Screenshot`}
//         className="object-cover rounded-3xl"
//         sizes="100vw"
//         priority
//         onLoad={onImageLoad}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent rounded-3xl" />
      
//       {/* Hero content overlay */}
//       <div className="absolute bottom-0 left-0 right-0 p-8">
//         <div className="flex flex-wrap gap-3 mb-4">
//           <StatusBadge status={project.status} />
//           <PlatformBadge platform={project.platform} deviceTargets={project.deviceTargets} />
//           <CategoryBadge category={project.category} />
//         </div>
        
//         <h2 
//           className="text-4xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent"
//           style={{
//             backgroundImage: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.accent})`
//           }}
//         >
//           {project.title}
//         </h2>
        
//         <p className="text-xl text-slate-300 mb-6 max-w-2xl">{project.subtitle}</p>
        
//         <div className="flex gap-4">
//           {project.demoLink && (
//             <ActionButton href={project.demoLink} colors={project.colors}>
//               <Play size={16} />
//               <span>Live Demo</span>
//             </ActionButton>
//           )}
//           <ActionButton href={project.link} variant="secondary" colors={project.colors}>
//             <Github size={16} />
//             <span>Source Code</span>
//           </ActionButton>
//         </div>
//       </div>
      
//       <ProjectImageOverlay project={project} />
//     </div>
//   </div>
// ))

// // Shared overlay components
// const ProjectImageOverlay = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//     <a
//       href={project.link}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="p-2.5 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
//     >
//       <Github size={18} />
//     </a>
//     {project.demoLink && (
//       <a
//         href={project.demoLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="p-2.5 backdrop-blur-sm rounded-full border text-white transition-all duration-200"
//         style={{
//           backgroundColor: project.colors.primary + '80',
//           borderColor: project.colors.primary + '50'
//         }}
//       >
//         <Play size={18} />
//       </a>
//     )}
//   </div>
// ))

// const ProjectImageBadges = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="absolute top-4 left-4 flex flex-col gap-2">
//     <StatusBadge status={project.status} />
//     <PlatformBadge platform={project.platform} deviceTargets={project.deviceTargets} />
//     <CategoryBadge category={project.category} />
//   </div>
// ))

// const ProjectStats = memo(({ project }: { project: ProjectCardProps['project'] }) => {
//   const stats = useMemo(() => {
//     const baseStats = [
//       { value: project.duration, label: 'Duration', color: 'text-violet-400' },
//       { value: project.technologies.length.toString(), label: 'Technologies', color: 'text-blue-400' },
//       { value: project.features.length.toString(), label: 'Features', color: 'text-emerald-400' }
//     ]

//     if (project.platform === 'Mobile App') {
//       if (project.screens) {
//         baseStats.push({ value: project.screens.length.toString(), label: 'Screens', color: 'text-purple-400' })
//       }
//     } else if (project.platform === 'Website') {
//       if (project.userRoles) {
//         baseStats.push({ value: project.userRoles.length.toString(), label: 'User Roles', color: 'text-orange-400' })
//       }
//     }

//     return baseStats.slice(0, 4)
//   }, [project])

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {stats.map((stat, index) => (
//         <div key={stat.label} className="text-center">
//           <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
//             {stat.value}
//           </div>
//           <div className="text-slate-400 text-xs">
//             {stat.label}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// })

// export default function ProjectCard({ project }: ProjectCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false)  
//   const [activeTab, setActiveTab] = useState('overview')
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [isClient, setIsClient] = useState(false)
  
//   const cardRef = useRef<HTMLElement>(null)
//   const isInView = useInView(cardRef, { once: true, amount: 0.1 })

//   // Fix hydration mismatch
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   const handleToggleExpanded = useCallback(() => {
//     setIsExpanded(prev => !prev)
//   }, [])

//   const handleTabChange = useCallback((tabId: string) => {
//     setActiveTab(tabId)
//   }, [])

//   const handleImageLoad = useCallback(() => {
//     setImageLoaded(true)
//   }, [])

//   const tabs = useMemo(() => {
//     const baseTabs = [
//       { id: 'overview', label: 'Overview', icon: Eye },
//       { id: 'features', label: 'Features', icon: Star },
//       { id: 'tech', label: 'Technology', icon: Code2 }
//     ]

//     if (project.platform === 'Mobile App' && project.screens) {
//       baseTabs.splice(2, 0, { id: 'screens', label: 'Screens', icon: Smartphone })
//     }

//     if (project.achievements.length > 0) {
//       baseTabs.push({ id: 'achievements', label: 'Results', icon: TrendingUp })
//     }

//     if (project.roadmap) {
//       baseTabs.push({ id: 'roadmap', label: 'Roadmap', icon: Rocket })
//     }

//     return baseTabs
//   }, [project])

//   const visibleTechs = useMemo(() => project.technologies.slice(0, 8), [project.technologies])
//   const remainingTechsCount = project.technologies.length - 8

//   const imageLayout = project.imageLayout || 'default'

//   const actionButtons = useMemo(() => {
//     const buttons = []
    
//     if (project.demoLink) {
//       buttons.push({
//         href: project.demoLink,
//         label: project.platform === 'Website' ? 'Live Demo' : 'Try Demo',
//         icon: project.platform === 'Website' ? ExternalLink : PlayCircle,
//         variant: 'primary' as const
//       })
//     }

//     if (project.platform === 'Mobile App') {
//       if (project.playStoreLink) {
//         buttons.push({
//           href: project.playStoreLink,
//           label: 'Play Store',
//           icon: Download,
//           variant: 'secondary' as const
//         })
//       }
//       if (project.appStoreLink) {
//         buttons.push({
//           href: project.appStoreLink,
//           label: 'App Store',
//           icon: Download,
//           variant: 'secondary' as const
//         })
//       }
//     }

//     if (project.link) {
//       buttons.push({
//         href: project.link,
//         label: 'Source Code',
//         icon: Github,
//         variant: 'secondary' as const
//       })
//     }

//     return buttons
//   }, [project])

//   // Render image layout based on imageLayout prop
//   const renderImageLayout = () => {
//     if (!isClient) return null

//     const props = { project, imageLoaded, onImageLoad: handleImageLoad }
    
//     switch (imageLayout) {
//       case 'showcase':
//         return <ShowcaseImageLayout {...props} />
//       case 'minimal':
//         return <MinimalImageLayout {...props} />
//       case 'gallery':
//         return <GalleryImageLayout {...props} />
//       case 'hero':
//         return <HeroImageLayout {...props} />
//       default:
//         return <DefaultImageLayout {...props} />
//     }
//   }

//   if (!isClient) {
//     return (
//       <article className="w-full mb-6">
//         <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
//           <div className="h-64 lg:h-96 bg-slate-800 animate-pulse" />
//         </div>
//       </article>
//     )
//   }

//   return (
//     <motion.article
//       ref={cardRef}
//       variants={cardVariants}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       className="w-full mb-6 group"
//     >
//       <div 
//         className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl"
//         style={{
//           boxShadow: `0 25px 50px ${project.colors.shadow || project.colors.primary + '15'}`
//         }}
//       >
//         {/* Optimized background pattern */}
//         <div className="absolute inset-0 opacity-20 pointer-events-none">
//           <div 
//             className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--color-1),transparent_70%)]"
//             style={{ '--color-1': project.colors.primary + '25' } as React.CSSProperties}
//           />
//           <div 
//             className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--color-2),transparent_70%)]"
//             style={{ '--color-2': project.colors.accent + '25' } as React.CSSProperties}
//           />
//         </div>

//         {/* Main content */}
//         <div className="relative z-10">
//           {imageLayout === 'hero' ? (
//             <div className="p-6 lg:p-8">
//               {renderImageLayout()}
//             </div>
//           ) : imageLayout === 'showcase' || imageLayout === 'gallery' ? (
//             <div className="p-6 lg:p-8">
//               {renderImageLayout()}
//               <motion.div 
//                 className="mt-6"
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <ProjectContent 
//                   project={project}
//                   visibleTechs={visibleTechs}
//                   remainingTechsCount={remainingTechsCount}
//                   actionButtons={actionButtons}
//                   handleToggleExpanded={handleToggleExpanded}
//                   isExpanded={isExpanded}
//                 />
//               </motion.div>
//             </div>
//           ) : (
//             <div className="flex flex-col lg:flex-row">
//               {renderImageLayout()}
//               <motion.div 
//                 className={`${imageLayout === 'minimal' ? 'lg:w-3/5' : 'lg:w-2/5'} p-6 lg:p-8`}
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <ProjectContent 
//                   project={project}
//                   visibleTechs={visibleTechs}
//                   remainingTechsCount={remainingTechsCount}
//                   actionButtons={actionButtons}
//                   handleToggleExpanded={handleToggleExpanded}
//                   isExpanded={isExpanded}
//                 />
//               </motion.div>
//             </div>
//           )}
//         </div>

//         {/* Enhanced expandable details */}
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="border-t border-slate-700/50 overflow-hidden"
//             >
//               <div className="p-6 lg:p-8 bg-slate-900/50 backdrop-blur-sm">
//                 <TabNavigation 
//                   tabs={tabs}
//                   activeTab={activeTab}
//                   onTabChange={handleTabChange}
//                   colors={project.colors}
//                 />
                
//                 <TabContent 
//                   activeTab={activeTab}
//                   project={project}
//                 />
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.article>
//   )
// }

// const ProjectContent = memo(({ 
//   project, 
//   visibleTechs, 
//   remainingTechsCount, 
//   actionButtons, 
//   handleToggleExpanded, 
//   isExpanded 
// }: {
//   project: ProjectCardProps['project']
//   visibleTechs: string[]
//   remainingTechsCount: number
//   actionButtons: any[]
//   handleToggleExpanded: () => void
//   isExpanded: boolean
// }) => (
//   <>
//     {/* Header */}
//     <motion.div variants={itemVariants} className="mb-6">
//       <h2 
//         className="text-3xl lg:text-4xl font-bold mb-2 bg-clip-text text-transparent"
//         style={{
//           backgroundImage: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.accent})`
//         }}
//       >
//         {project.title}
//       </h2>
//       <p className="text-lg text-slate-300 mb-3">{project.subtitle}</p>
//       <p className="text-slate-400 leading-relaxed">{project.description}</p>
//     </motion.div>

//     {/* Tech stack */}
//     <motion.div variants={itemVariants} className="mb-6">
//       <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tech Stack</h3>
//       <div className="flex flex-wrap gap-2">
//         {visibleTechs.map((tech, index) => (
//           <TechBadge key={tech} tech={tech} colors={project.colors} />
//         ))}
//         {remainingTechsCount > 0 && (
//           <span className="px-2.5 py-1 text-slate-400 text-xs">
//             +{remainingTechsCount} more
//           </span>
//         )}
//       </div>
//     </motion.div>

//     {/* Action buttons */}
//     <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
//       <ActionButton onClick={handleToggleExpanded} colors={project.colors}>
//         <BookOpen size={16} />
//         <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
//         {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//       </ActionButton>

//       {actionButtons.map((button, index) => (
//         <ActionButton 
//           key={index}
//           href={button.href} 
//           variant={button.variant}
//           colors={project.colors}
//         >
//           <button.icon size={16} />
//           <span>{button.label}</span>
//         </ActionButton>
//       ))}
//     </motion.div>

//     {/* Project stats */}
//     <motion.div variants={itemVariants}>
//       <ProjectStats project={project} />
//     </motion.div>
//   </>
// ))

// const TabNavigation = memo(({ 
//   tabs, 
//   activeTab, 
//   onTabChange,
//   colors
// }: {
//   tabs: any[]
//   activeTab: string
//   onTabChange: (tabId: string) => void
//   colors: any
// }) => (
//   <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-700/50">
//     {tabs.map((tab) => (
//       <TabButton
//         key={tab.id}
//         tab={tab}
//         isActive={activeTab === tab.id}
//         onClick={() => onTabChange(tab.id)}
//         colors={colors}
//       />
//     ))}
//   </div>
// ))

// const TabContent = memo(({ 
//   activeTab, 
//   project 
// }: {
//   activeTab: string
//   project: ProjectCardProps['project']
// }) => (
//   <AnimatePresence mode="wait">
//     <motion.div
//       key={activeTab}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.2 }}
//     >
//       {activeTab === 'overview' && <OverviewTab project={project} />}
//       {activeTab === 'features' && <FeaturesTab project={project} />}
//       {activeTab === 'tech' && <TechTab project={project} />}
//       {activeTab === 'screens' && <ScreensTab project={project} />}
//       {activeTab === 'achievements' && <AchievementsTab project={project} />}
//       {activeTab === 'roadmap' && <RoadmapTab project={project} />}
//     </motion.div>
//   </AnimatePresence>
// ))

// const OverviewTab = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="space-y-6">
//     <div>
//       <h3 className="text-xl font-bold text-white mb-3">Project Overview</h3>
//       <p className="text-slate-300 leading-relaxed mb-4">{project.longDescription}</p>
//     </div>

//     {project.problemStatement && (
//       <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
//         <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
//           <Target size={16} />
//           Problem Statement
//         </h4>
//         <p className="text-slate-300 text-sm">{project.problemStatement}</p>
//       </div>
//     )}

//     {project.solution && (
//       <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
//         <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
//           <Lightbulb size={16} />
//           Solution
//         </h4>
//         <p className="text-slate-300 text-sm">{project.solution}</p>
//       </div>
//     )}

//     {project.platform === 'Mobile App' && project.appInfo && (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
//           <Download className="text-violet-400 mb-2" size={20} />
//           <h4 className="text-white font-semibold mb-1 text-sm">App Information</h4>
//           <p className="text-slate-400 text-xs">
//             {project.appInfo.category} • {project.appInfo.size} • {project.appInfo.compatibility}
//           </p>
//         </div>
//         <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
//           <Globe className="text-blue-400 mb-2" size={20} />
//           <h4 className="text-white font-semibold mb-1 text-sm">Languages</h4>
//           <p className="text-slate-400 text-xs">{project.appInfo.languages.join(', ')}</p>
//         </div>
//       </div>
//     )}

//     {project.platform === 'Website' && project.userRoles && (
//       <div>
//         <h4 className="text-white font-semibold mb-3">User Roles</h4>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           {project.userRoles.map((role, index) => (
//             <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
//               <Users className="text-blue-400 mb-2" size={16} />
//               <h5 className="text-white font-medium text-sm mb-1">{role.role}</h5>
//               <p className="text-slate-400 text-xs">
//                 {role.permissions.length} permissions
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// ))

// const FeaturesTab = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="space-y-4">
//     <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//       {project.features.map((feature, index) => {
//         const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb
//         return (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
//           >
//             <div className="flex items-start gap-3">
//               <div 
//                 className="flex items-center justify-center w-10 h-10 rounded-lg text-xl"
//                 style={{
//                   background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
//                   border: `1px solid ${project.colors.primary}25`
//                 }}
//               >
//                 <IconComponent className="text-xl" />
//               </div>
//               <div>
//                 <h4 className="text-white font-medium mb-1">{feature.title}</h4>
//                 <p className="text-slate-400 text-sm">{feature.description}</p>
//               </div>
//             </div>
//           </motion.div>
//         )
//       })}
//     </div>
//   </div>
// ))

// const TechTab = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="space-y-6">
//     <div>
//       <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
//       <div className="flex flex-wrap gap-2">
//         {project.technologies.map((tech, index) => (
//           <TechBadge key={tech} tech={tech} colors={project.colors} />
//         ))}
//       </div>
//     </div>

//     {project.architecture && (
//       <div>
//         <h4 className="text-white font-semibold mb-3">Architecture</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//           {Object.entries(project.architecture).map(([key, value], index) => (
//             <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
//               <h5 className="text-slate-400 text-xs uppercase font-semibold mb-1">{key}</h5>
//               <p className="text-white text-sm">{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// ))

// const ScreensTab = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="space-y-4">
//     <h3 className="text-xl font-bold text-white mb-4">App Screens</h3>
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//       {project.screens?.map((screen, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.05 }}
//           className="group relative aspect-[9/16] bg-slate-800 rounded-lg border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-colors"
//         >
//           <div className="absolute inset-0 flex items-center justify-center p-4">
//             <div className="text-center">
//               <div className="text-2xl mb-2">{screen.icon || '📱'}</div>
//               <h4 className="text-white text-xs font-medium line-clamp-2">{screen.name.replace('Screen', '')}</h4>
//             </div>
//           </div>
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
//             <p className="text-slate-300 text-xs">{screen.description}</p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// ))

// const AchievementsTab = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="space-y-4">
//     <h3 className="text-xl font-bold text-white mb-4">Key Achievements</h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//       {project.achievements.map((achievement, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.05 }}
//           className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
//         >
//           <div className="flex items-start gap-3">
//             <Award 
//               size={20} 
//               className="flex-shrink-0 mt-0.5" 
//               style={{ color: project.colors.primary }}
//             />
//             <p className="text-slate-300">{achievement}</p>
//           </div>
//         </motion.div>
//       ))}
//     </div>

//     {project.metrics && (
//       <div className="mt-6">
//         <h4 className="text-white font-semibold mb-3">Metrics</h4>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {Object.entries(project.metrics).map(([key, value], index) => (
//             <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
//               <h5 className="text-slate-400 text-xs uppercase font-semibold mb-1">{key}</h5>
//               <p className="text-white text-sm">{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// ))

// const RoadmapTab = memo(({ project }: { project: ProjectCardProps['project'] }) => (
//   <div className="space-y-4">
//     <h3 className="text-xl font-bold text-white mb-4">Future Plans</h3>
//     <div className="space-y-3">
//       {project.roadmap?.map((item, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: index * 0.05 }}
//           className="flex items-start gap-3"
//         >
//           <div 
//             className="flex items-center justify-center w-6 h-6 rounded-full mt-0.5 flex-shrink-0"
//             style={{
//               background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
//               border: `1px solid ${project.colors.primary}25`
//             }}
//           >
//             <Rocket size={12} style={{ color: project.colors.primary }} />
//           </div>
//           <p className="text-slate-300">{item}</p>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// ))

// const ScreenshotsGallery = memo(({ project }: { project: ProjectCardProps['project'] }) => {
//   if (!project.screenshots || project.screenshots.length === 0) return null

//   return (
//     <div className="mt-10 pt-6 border-t border-slate-700/50">
//       <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
//       <div className={`grid gap-4 ${project.mockupType === 'mobile' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
//         {project.screenshots.map((screenshot, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1 }}
//             className={`relative group overflow-hidden rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors ${
//               project.mockupType === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'
//             }`}
//           >
//             <OptimizedImage
//               src={screenshot}
//               alt={`${project.title} screenshot ${index + 1}`}
//               className="object-cover"
//               sizes={project.mockupType === 'mobile' ? "(max-width: 768px) 50vw, 33vw" : "100vw"}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
//               <p className="text-white text-sm">
//                 {project.mockupType === 'mobile' 
//                   ? `Mobile Screen ${index + 1}` 
//                   : `Desktop View ${index + 1}`}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// })

// // 'use client'

// // import React, { useState, useCallback, useMemo, memo } from 'react'
// // import Image from 'next/image'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import { 
// //   ExternalLink, 
// //   Github, 
// //   Calendar, 
// //   Tag, 
// //   Star, 
// //   ArrowRight,
// //   ChevronDown,
// //   ChevronUp,
// //   Zap,
// //   Code2,
// //   Palette,
// //   Database,
// //   Globe,
// //   Smartphone,
// //   Users,
// //   Award,
// //   Target,
// //   TrendingUp,
// //   Play,
// //   Eye,
// //   Heart,
// //   MessageCircle,
// //   Share2,
// //   BookOpen,
// //   Lightbulb,
// //   Rocket,
// //   Shield,
// //   Cpu,
// //   Cloud,
// //   Timer,
// //   Layers
// // } from 'lucide-react'

// // interface ProjectCardProps {
// //   project: {
// //     id: number
// //     title: string
// //     subtitle: string
// //     description: string
// //     longDescription: string
// //     image: string
// //     link: string
// //     demoLink?: string
// //     category: string
// //     status: string
// //     year: string
// //     duration: string
// //     technologies: string[]
// //     features: Array<{
// //       icon: string
// //       title: string
// //       description: string
// //     }>
// //     achievements: string[]
// //     colors: {
// //       primary: string
// //       secondary: string
// //       accent: string
// //       background: string
// //       text: string
// //     }
// //   }
// // }

// // // Memoized icon mapping for better performance
// // const iconMap = {
// //   'Zap': Zap,
// //   'Code2': Code2,
// //   'Palette': Palette,
// //   'Database': Database,
// //   'Globe': Globe,
// //   'Smartphone': Smartphone,
// //   'Users': Users,
// //   'Award': Award,
// //   'Target': Target,
// //   'Shield': Shield,
// //   'Cpu': Cpu,
// //   'Cloud': Cloud,
// //   'Lightbulb': Lightbulb,
// //   'Rocket': Rocket,
// //   'Timer': Timer,
// //   'Layers': Layers
// // } as const

// // // Optimized animation variants
// // const cardVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { 
// //     opacity: 1, 
// //     y: 0,
// //     transition: { duration: 0.4, ease: "easeOut" }
// //   }
// // }

// // const contentVariants = {
// //   hidden: { opacity: 0 },
// //   visible: { 
// //     opacity: 1,
// //     transition: { 
// //       staggerChildren: 0.05,
// //       delayChildren: 0.1
// //     }
// //   }
// // }

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 15 },
// //   visible: { 
// //     opacity: 1, 
// //     y: 0,
// //     transition: { duration: 0.3, ease: "easeOut" }
// //   }
// // }

// // // Memoized components for better performance
// // const StatusBadge = memo(({ status }: { status: string }) => {
// //   const statusConfig = useMemo(() => ({
// //     'Completed': { 
// //       bg: 'bg-emerald-500/15', 
// //       text: 'text-emerald-400', 
// //       border: 'border-emerald-500/25',
// //       dot: 'bg-emerald-500'
// //     },
// //     'In Progress': { 
// //       bg: 'bg-blue-500/15', 
// //       text: 'text-blue-400', 
// //       border: 'border-blue-500/25',
// //       dot: 'bg-blue-500'
// //     },
// //     'Planning': { 
// //       bg: 'bg-amber-500/15', 
// //       text: 'text-amber-400', 
// //       border: 'border-amber-500/25',
// //       dot: 'bg-amber-500'
// //     }
// //   }), [])

// //   const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Planning']

// //   return (
// //     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${config.bg} ${config.text} ${config.border}`}>
// //       <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
// //       {status}
// //     </div>
// //   )
// // })

// // const CategoryBadge = memo(({ category }: { category: string }) => (
// //   <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm text-slate-200 rounded-full text-xs font-medium border border-slate-700/50">
// //     <Tag size={12} />
// //     {category}
// //   </div>
// // ))

// // const TechBadge = memo(({ tech, index }: { tech: string; index: number }) => (
// //   <motion.span
// //     key={tech}
// //     initial={{ opacity: 0, scale: 0.8 }}
// //     animate={{ opacity: 1, scale: 1 }}
// //     transition={{ delay: index * 0.02, duration: 0.2 }}
// //     className="px-2.5 py-1 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 text-white rounded-md text-xs font-medium border border-violet-500/25 backdrop-blur-sm hover:border-violet-400/40 transition-colors"
// //   >
// //     {tech}
// //   </motion.span>
// // ))

// // const ActionButton = memo(({ 
// //   href, 
// //   children, 
// //   variant = 'primary',
// //   onClick 
// // }: { 
// //   href?: string
// //   children: React.ReactNode
// //   variant?: 'primary' | 'secondary'
// //   onClick?: () => void
// // }) => {
// //   const baseClasses = "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
  
// //   const variantClasses = variant === 'primary' 
// //     ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 focus:ring-violet-500"
// //     : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm focus:ring-slate-500"

// //   const Component = href ? 'a' : 'button'
// //   const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

// //   return (
// //     <Component
// //       className={`${baseClasses} ${variantClasses}`}
// //       {...props}
// //     >
// //       {children}
// //     </Component>
// //   )
// // })

// // const TabButton = memo(({ 
// //   tab, 
// //   isActive, 
// //   onClick 
// // }: { 
// //   tab: { id: string; label: string; icon: any }
// //   isActive: boolean
// //   onClick: () => void
// // }) => {
// //   const Icon = tab.icon
// //   return (
// //     <button
// //       onClick={onClick}
// //       className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
// //         isActive
// //           ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
// //           : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-700/50'
// //       }`}
// //     >
// //       <Icon size={16} />
// //       <span>{tab.label}</span>
// //     </button>
// //   )
// // })

// // const ProjectStats = memo(({ stats }: { stats: Array<{ value: string; label: string; color: string }> }) => (
// //   <div className="grid grid-cols-3 gap-4">
// //     {stats.map((stat, index) => (
// //       <motion.div
// //         key={stat.label}
// //         initial={{ opacity: 0, scale: 0.8 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ delay: index * 0.1, duration: 0.3 }}
// //         className="text-center"
// //       >
// //         <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
// //           {stat.value}
// //         </div>
// //         <div className="text-slate-400 text-xs">
// //           {stat.label}
// //         </div>
// //       </motion.div>
// //     ))}
// //   </div>
// // ))

// // export default function ProjectCard({ project }: ProjectCardProps) {
// //   const [isExpanded, setIsExpanded] = useState(false)
// //   const [activeTab, setActiveTab] = useState('overview')
// //   const [imageLoaded, setImageLoaded] = useState(false)

// //   const handleToggleExpanded = useCallback(() => {
// //     setIsExpanded(prev => !prev)
// //   }, [])

// //   const handleTabChange = useCallback((tabId: string) => {
// //     setActiveTab(tabId)
// //   }, [])

// //   const handleImageLoad = useCallback(() => {
// //     setImageLoaded(true)
// //   }, [])

// //   // Memoized data
// //   const tabs = useMemo(() => [
// //     { id: 'overview', label: 'Overview', icon: Eye },
// //     { id: 'features', label: 'Features', icon: Star },
// //     { id: 'tech', label: 'Technology', icon: Code2 },
// //     { id: 'achievements', label: 'Results', icon: TrendingUp }
// //   ], [])

// //   const projectStats = useMemo(() => [
// //     { value: project.duration, label: 'Duration', color: 'text-violet-400' },
// //     { value: project.technologies.length.toString(), label: 'Technologies', color: 'text-blue-400' },
// //     { value: project.features.length.toString(), label: 'Features', color: 'text-emerald-400' }
// //   ], [project])

// //   const visibleTechs = useMemo(() => project.technologies.slice(0, 6), [project.technologies])
// //   const remainingTechsCount = project.technologies.length - 6

// //   return (
// //     <motion.article
// //       variants={cardVariants}
// //       initial="hidden"
// //       whileInView="visible"
// //       viewport={{ once: true, amount: 0.2 }}
// //       className="w-full mb-6"
// //     >
// //       <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
// //         {/* Optimized background pattern */}
// //         <div className="absolute inset-0 opacity-30">
// //           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_70%)]" />
// //           <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_70%)]" />
// //         </div>

// //         {/* Main content */}
// //         <div className="relative z-10 flex flex-col lg:flex-row">
// //           {/* Image section */}
// //           <div className="lg:w-2/5 relative">
// //             <div className="relative h-64 lg:h-80">
// //               <div className="relative w-full h-full group">
// //                 <Image
// //                   src="/projects/heroImage.jpg"
// //                   alt={`${project.title} - Project Screenshot`}
// //                   fill
// //                   className={`object-cover transition-all duration-500 ${
// //                     imageLoaded ? 'opacity-100' : 'opacity-0'
// //                   }`}
// //                   sizes="(max-width: 1024px) 100vw, 40vw"
// //                   priority={false}
// //                   onLoad={handleImageLoad}
// //                 />
// //                 {!imageLoaded && (
// //                   <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
// //                     <Layers className="w-12 h-12 text-slate-600" />
// //                   </div>
// //                 )}
// //                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
// //                 {/* Floating action buttons */}
// //                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                   <a
// //                     href={project.link}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="p-2.5 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
// //                   >
// //                     <Github size={18} />
// //                   </a>
// //                   {project.demoLink && (
// //                     <a
// //                       href={project.demoLink}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="p-2.5 bg-violet-600/80 backdrop-blur-sm rounded-full border border-violet-500/50 text-white hover:bg-violet-700/80 transition-all duration-200"
// //                     >
// //                       <Play size={18} />
// //                     </a>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Status and category badges */}
// //               <div className="absolute top-4 left-4 flex flex-col gap-2">
// //                 <StatusBadge status={project.status} />
// //                 <CategoryBadge category={project.category} />
// //               </div>

// //               {/* Bottom stats */}
// //               <div className="absolute bottom-4 left-4 right-4">
// //                 <div className="flex items-center justify-between text-slate-300 text-sm">
// //                   <div className="flex items-center gap-3">
// //                     <div className="flex items-center gap-1">
// //                       <Calendar size={14} />
// //                       <span>{project.year}</span>
// //                     </div>
// //                     <div className="flex items-center gap-1">
// //                       <Star size={14} />
// //                       <span>{project.achievements.length}</span>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Heart size={14} className="text-red-400" />
// //                     <MessageCircle size={14} className="text-blue-400" />
// //                     <Share2 size={14} className="text-emerald-400" />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Content section */}
// //           <motion.div 
// //             className="lg:w-3/5 p-6 lg:p-8"
// //             variants={contentVariants}
// //             initial="hidden"
// //             animate="visible"
// //           >
// //             {/* Header */}
// //             <motion.div variants={itemVariants} className="mb-6">
// //               <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
// //                 {project.title}
// //               </h2>
// //               <p className="text-lg text-slate-300 mb-3">{project.subtitle}</p>
// //               <p className="text-slate-400 leading-relaxed">{project.description}</p>
// //             </motion.div>

// //             {/* Tech stack */}
// //             <motion.div variants={itemVariants} className="mb-6">
// //               <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tech Stack</h3>
// //               <div className="flex flex-wrap gap-2">
// //                 {visibleTechs.map((tech, index) => (
// //                   <TechBadge key={tech} tech={tech} index={index} />
// //                 ))}
// //                 {remainingTechsCount > 0 && (
// //                   <span className="px-2.5 py-1 text-slate-400 text-xs">
// //                     +{remainingTechsCount} more
// //                   </span>
// //                 )}
// //               </div>
// //             </motion.div>

// //             {/* Action buttons */}
// //             <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
// //               <ActionButton onClick={handleToggleExpanded}>
// //                 <BookOpen size={16} />
// //                 <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
// //                 {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// //               </ActionButton>

// //               <ActionButton href={project.demoLink || project.link} variant="secondary">
// //                 <ExternalLink size={16} />
// //                 <span>Live Demo</span>
// //               </ActionButton>
// //             </motion.div>

// //             {/* Project stats */}
// //             <motion.div variants={itemVariants}>
// //               <ProjectStats stats={projectStats} />
// //             </motion.div>
// //           </motion.div>
// //         </div>

// //         {/* Expandable details */}
// //         <AnimatePresence>
// //           {isExpanded && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.3, ease: "easeOut" }}
// //               className="border-t border-slate-700/50 overflow-hidden"
// //             >
// //               <div className="p-6 lg:p-8 bg-slate-900/50 backdrop-blur-sm">
// //                 {/* Tab navigation */}
// //                 <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-700/50">
// //                   {tabs.map((tab) => (
// //                     <TabButton
// //                       key={tab.id}
// //                       tab={tab}
// //                       isActive={activeTab === tab.id}
// //                       onClick={() => handleTabChange(tab.id)}
// //                     />
// //                   ))}
// //                 </div>

// //                 {/* Tab content */}
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={activeTab}
// //                     initial={{ opacity: 0, y: 10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: -10 }}
// //                     transition={{ duration: 0.2 }}
// //                   >
// //                     {activeTab === 'overview' && (
// //                       <div className="space-y-4">
// //                         <h3 className="text-xl font-bold text-white mb-3">Project Overview</h3>
// //                         <p className="text-slate-300 leading-relaxed">{project.longDescription}</p>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
// //                           <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
// //                             <Target className="text-violet-400 mb-2" size={20} />
// //                             <h4 className="text-white font-semibold mb-1 text-sm">Project Goals</h4>
// //                             <p className="text-slate-400 text-xs">Creating innovative solutions with modern technology</p>
// //                           </div>
// //                           <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
// //                             <Users className="text-blue-400 mb-2" size={20} />
// //                             <h4 className="text-white font-semibold mb-1 text-sm">Target Audience</h4>
// //                             <p className="text-slate-400 text-xs">Developers, designers, and tech enthusiasts</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {activeTab === 'features' && (
// //                       <div className="space-y-4">
// //                         <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                           {project.features.map((feature, index) => {
// //                             const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb
// //                             return (
// //                               <div
// //                                 key={index}
// //                                 className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"
// //                               >
// //                                 <IconComponent className="text-violet-400 mb-2" size={20} />
// //                                 <h4 className="text-white font-semibold mb-1 text-sm">{feature.title}</h4>
// //                                 <p className="text-slate-400 text-xs">{feature.description}</p>
// //                               </div>
// //                             )
// //                           })}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {activeTab === 'tech' && (
// //                       <div className="space-y-4">
// //                         <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
// //                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                           {project.technologies.map((tech, index) => (
// //                             <div
// //                               key={tech}
// //                               className="p-3 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-500/20 text-center"
// //                             >
// //                               <Code2 className="text-violet-400 mx-auto mb-2" size={20} />
// //                               <span className="text-white font-medium text-xs">{tech}</span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {activeTab === 'achievements' && (
// //                       <div className="space-y-4">
// //                         <h3 className="text-xl font-bold text-white mb-4">Project Results</h3>
// //                         <div className="space-y-3">
// //                           {project.achievements.map((achievement, index) => (
// //                             <div
// //                               key={index}
// //                               className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
// //                             >
// //                               <Award className="text-amber-400 flex-shrink-0" size={16} />
// //                               <span className="text-slate-300 text-sm">{achievement}</span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </motion.article>
// //   )
// // }

// // // 'use client'

// // // import { useState } from 'react'
// // // import Image from 'next/image'
// // // import { motion, AnimatePresence } from 'framer-motion'
// // // import { 
// // //   ExternalLink, 
// // //   Github, 
// // //   Calendar, 
// // //   Tag, 
// // //   Star, 
// // //   ArrowRight,
// // //   ChevronDown,
// // //   ChevronUp,
// // //   Zap,
// // //   Code2,
// // //   Palette,
// // //   Database,
// // //   Globe,
// // //   Smartphone,
// // //   Users,
// // //   Award,
// // //   Target,
// // //   TrendingUp,
// // //   Play,
// // //   Eye,
// // //   Heart,
// // //   MessageCircle,
// // //   Share2,
// // //   BookOpen,
// // //   Lightbulb,
// // //   Rocket,
// // //   Shield,
// // //   Cpu,
// // //   Cloud
// // // } from 'lucide-react'

// // // interface ProjectCardProps {
// // //   project: {
// // //     id: number
// // //     title: string
// // //     subtitle: string
// // //     description: string
// // //     longDescription: string
// // //     image: string
// // //     link: string
// // //     demoLink?: string
// // //     category: string
// // //     status: string
// // //     year: string
// // //     duration: string
// // //     technologies: string[]
// // //     features: Array<{
// // //       icon: string
// // //       title: string
// // //       description: string
// // //     }>
// // //     achievements: string[]
// // //     colors: {
// // //       primary: string
// // //       secondary: string
// // //       accent: string
// // //       background: string
// // //       text: string
// // //     }
// // //   }
// // // }

// // // const iconMap = {
// // //   'Zap': Zap,
// // //   'Code2': Code2,
// // //   'Palette': Palette,
// // //   'Database': Database,
// // //   'Globe': Globe,
// // //   'Smartphone': Smartphone,
// // //   'Users': Users,
// // //   'Award': Award,
// // //   'Target': Target,
// // //   'Shield': Shield,
// // //   'Cpu': Cpu,
// // //   'Cloud': Cloud,
// // //   'Lightbulb': Lightbulb,
// // //   'Rocket': Rocket
// // // }

// // // export default function ProjectCard({ project }: ProjectCardProps) {
// // //   const [isExpanded, setIsExpanded] = useState(false)
// // //   const [activeTab, setActiveTab] = useState('overview')

// // //   const statusColors = {
// // //     'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
// // //     'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
// // //     'Planning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
// // //   }

// // //   const tabs = [
// // //     { id: 'overview', label: 'Overview', icon: Eye },
// // //     { id: 'features', label: 'Features', icon: Star },
// // //     { id: 'tech', label: 'Technology', icon: Code2 },
// // //     { id: 'achievements', label: 'Results', icon: TrendingUp }
// // //   ]

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 50 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
// // //       className="w-full mb-8"
// // //     >
// // //       {/* Main Card Container */}
// // //       <motion.div
// // //         className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl"
// // //         whileHover={{ scale: 1.01 }}
// // //         transition={{ duration: 0.3 }}
// // //       >
// // //         {/* Background Pattern */}
// // //         <div className="absolute inset-0 opacity-5">
// // //           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
// // //           <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.3),transparent_50%)]" />
// // //         </div>

// // //         {/* Tree Branch Connector */}
// // //         <div className="absolute -left-8 top-1/2 w-8 h-px bg-gradient-to-r from-transparent to-purple-500/50 transform -translate-y-1/2" />
// // //         <div className="absolute -left-2 top-1/2 w-4 h-4 border-2 border-purple-500/50 bg-purple-500/20 rounded-full transform -translate-y-1/2" />

// // //         <div className="relative z-10 flex flex-col lg:flex-row">
// // //           {/* Left Section - Image & Quick Info */}
// // //           <div className="lg:w-2/5 relative">
// // //             <div className="relative h-80 lg:h-full">
// // //               <motion.div
// // //                 whileHover={{ scale: 1.05 }}
// // //                 transition={{ duration: 0.4 }}
// // //                 className="w-full h-full relative"
// // //               >
// // //                 <Image
// // //                   src="/projects/heroImage.jpg"
// // //                   alt={project.title}
// // //                   fill
// // //                   className="object-cover"
// // //                   sizes="(max-width: 1024px) 100vw, 40vw"
// // //                 />
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
// // //               </motion.div>

// // //               {/* Floating Action Buttons */}
// // //               <div className="absolute top-6 right-6 flex gap-3">
// // //                 <motion.a
// // //                   href={project.link}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   whileHover={{ scale: 1.1, rotate: 5 }}
// // //                   whileTap={{ scale: 0.9 }}
// // //                   className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
// // //                 >
// // //                   <Github size={20} />
// // //                 </motion.a>
// // //                 {project.demoLink && (
// // //                   <motion.a
// // //                     href={project.demoLink}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     whileHover={{ scale: 1.1, rotate: -5 }}
// // //                     whileTap={{ scale: 0.9 }}
// // //                     className="p-3 bg-purple-500/20 backdrop-blur-md rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 transition-all duration-300"
// // //                   >
// // //                     <Play size={20} />
// // //                   </motion.a>
// // //                 )}
// // //               </div>

// // //               {/* Status & Category Badges */}
// // //               <div className="absolute top-6 left-6 flex flex-col gap-2">
// // //                 <motion.span
// // //                   initial={{ opacity: 0, x: -20 }}
// // //                   animate={{ opacity: 1, x: 0 }}
// // //                   transition={{ delay: 0.3 }}
// // //                   className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${statusColors[project.status as keyof typeof statusColors]}`}
// // //                 >
// // //                   {project.status}
// // //                 </motion.span>
// // //                 <motion.span
// // //                   initial={{ opacity: 0, x: -20 }}
// // //                   animate={{ opacity: 1, x: 0 }}
// // //                   transition={{ delay: 0.4 }}
// // //                   className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/20"
// // //                 >
// // //                   <Tag size={14} className="inline mr-2" />
// // //                   {project.category}
// // //                 </motion.span>
// // //               </div>

// // //               {/* Stats Overlay */}
// // //               <div className="absolute bottom-6 left-6 right-6">
// // //                 <div className="flex items-center justify-between text-white/80 text-sm">
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="flex items-center gap-1">
// // //                       <Calendar size={16} />
// // //                       <span>{project.year}</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-1">
// // //                       <Star size={16} />
// // //                       <span>{project.achievements.length}</span>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center gap-3">
// // //                     <Heart size={16} className="text-red-400" />
// // //                     <MessageCircle size={16} className="text-blue-400" />
// // //                     <Share2 size={16} className="text-green-400" />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Right Section - Content */}
// // //           <div className="lg:w-3/5 p-8 lg:p-12">
// // //             {/* Header */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: 0.2 }}
// // //               className="mb-8"
// // //             >
// // //               <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
// // //                 {project.title}
// // //               </h2>
// // //               <p className="text-xl text-gray-300 mb-4">{project.subtitle}</p>
// // //               <p className="text-gray-400 leading-relaxed text-lg">{project.description}</p>
// // //             </motion.div>

// // //             {/* Quick Tech Stack */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: 0.4 }}
// // //               className="mb-8"
// // //             >
// // //               <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
// // //               <div className="flex flex-wrap gap-3">
// // //                 {project.technologies.slice(0, 6).map((tech, index) => (
// // //                   <motion.span
// // //                     key={tech}
// // //                     initial={{ opacity: 0, scale: 0.8 }}
// // //                     animate={{ opacity: 1, scale: 1 }}
// // //                     transition={{ delay: 0.1 * index }}
// // //                     whileHover={{ scale: 1.1, y: -2 }}
// // //                     className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white rounded-full text-sm font-medium border border-purple-500/30 backdrop-blur-sm"
// // //                   >
// // //                     {tech}
// // //                   </motion.span>
// // //                 ))}
// // //                 {project.technologies.length > 6 && (
// // //                   <span className="px-4 py-2 text-gray-400 text-sm">
// // //                     +{project.technologies.length - 6} more
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </motion.div>

// // //             {/* Action Buttons */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: 0.6 }}
// // //               className="flex flex-wrap gap-4 mb-8"
// // //             >
// // //               <motion.button
// // //                 onClick={() => setIsExpanded(!isExpanded)}
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/25"
// // //               >
// // //                 <BookOpen size={20} />
// // //                 <span>{isExpanded ? 'Show Less' : 'Explore Details'}</span>
// // //                 {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
// // //               </motion.button>

// // //               <motion.a
// // //                 href={project.demoLink || project.link}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-lg border border-white/20 backdrop-blur-sm transition-all duration-300"
// // //               >
// // //                 <ExternalLink size={20} />
// // //                 <span>Live Demo</span>
// // //               </motion.a>
// // //             </motion.div>

// // //             {/* Project Metrics */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: 0.8 }}
// // //               className="grid grid-cols-3 gap-6"
// // //             >
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold text-purple-400 mb-1">{project.duration}</div>
// // //                 <div className="text-gray-400 text-sm">Duration</div>
// // //               </div>
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold text-blue-400 mb-1">{project.technologies.length}</div>
// // //                 <div className="text-gray-400 text-sm">Technologies</div>
// // //               </div>
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold text-green-400 mb-1">{project.features.length}</div>
// // //                 <div className="text-gray-400 text-sm">Features</div>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         </div>
// // //               {/* Expandable Details Section */}
// // //       <AnimatePresence>
// // //         {isExpanded && (
// // //           <motion.div
// // //             initial={{ opacity: 0, height: 0 }}
// // //             animate={{ opacity: 1, height: 'auto' }}
// // //             exit={{ opacity: 0, height: 0 }}
// // //             transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
// // //             className="mt-6 overflow-hidden"
// // //           >
// // //             <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95 backdrop-blur-lg rounded-3xl border border-gray-700/50 p-8 lg:p-12">
// // //               {/* Tab Navigation */}
// // //               <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-700/50 pb-6">
// // //                 {tabs.map((tab) => {
// // //                   const Icon = tab.icon
// // //                   return (
// // //                     <motion.button
// // //                       key={tab.id}
// // //                       onClick={() => setActiveTab(tab.id)}
// // //                       whileHover={{ scale: 1.05 }}
// // //                       whileTap={{ scale: 0.95 }}
// // //                       className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
// // //                         activeTab === tab.id
// // //                           ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
// // //                           : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
// // //                       }`}
// // //                     >
// // //                       <Icon size={18} />
// // //                       <span>{tab.label}</span>
// // //                     </motion.button>
// // //                   )
// // //                 })}
// // //               </div>

// // //               {/* Tab Content */}
// // //               <AnimatePresence mode="wait">
// // //                 <motion.div
// // //                   key={activeTab}
// // //                   initial={{ opacity: 0, x: 20 }}
// // //                   animate={{ opacity: 1, x: 0 }}
// // //                   exit={{ opacity: 0, x: -20 }}
// // //                   transition={{ duration: 0.3 }}
// // //                 >
// // //                   {activeTab === 'overview' && (
// // //                     <div className="space-y-6">
// // //                       <h3 className="text-2xl font-bold text-white mb-4">Project Overview</h3>
// // //                       <p className="text-gray-300 text-lg leading-relaxed">{project.longDescription}</p>
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
// // //                         <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
// // //                           <Target className="text-purple-400 mb-3" size={24} />
// // //                           <h4 className="text-white font-semibold mb-2">Project Goals</h4>
// // //                           <p className="text-gray-400 text-sm">Creating innovative solutions with modern technology stack</p>
// // //                         </div>
// // //                         <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
// // //                           <Users className="text-blue-400 mb-3" size={24} />
// // //                           <h4 className="text-white font-semibold mb-2">Target Audience</h4>
// // //                           <p className="text-gray-400 text-sm">Developers, designers, and tech enthusiasts</p>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {activeTab === 'features' && (
// // //                     <div className="space-y-6">
// // //                       <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                         {project.features.map((feature, index) => {
// // //                           const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb
// // //                           return (
// // //                             <motion.div
// // //                               key={index}
// // //                               initial={{ opacity: 0, y: 20 }}
// // //                               animate={{ opacity: 1, y: 0 }}
// // //                               transition={{ delay: index * 0.1 }}
// // //                               className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
// // //                             >
// // //                               <IconComponent className="text-purple-400 mb-4" size={28} />
// // //                               <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
// // //                               <p className="text-gray-400 text-sm">{feature.description}</p>
// // //                             </motion.div>
// // //                           )
// // //                         })}
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {activeTab === 'tech' && (
// // //                     <div className="space-y-6">
// // //                       <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
// // //                       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// // //                         {project.technologies.map((tech, index) => (
// // //                           <motion.div
// // //                             key={tech}
// // //                             initial={{ opacity: 0, scale: 0.8 }}
// // //                             animate={{ opacity: 1, scale: 1 }}
// // //                             transition={{ delay: index * 0.05 }}
// // //                             whileHover={{ scale: 1.05 }}
// // //                             className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20 text-center"
// // //                           >
// // //                             <Code2 className="text-purple-400 mx-auto mb-2" size={24} />
// // //                             <span className="text-white font-medium text-sm">{tech}</span>
// // //                           </motion.div>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {activeTab === 'achievements' && (
// // //                     <div className="space-y-6">
// // //                       <h3 className="text-2xl font-bold text-white mb-6">Project Results</h3>
// // //                       <div className="space-y-4">
// // //                         {project.achievements.map((achievement, index) => (
// // //                           <motion.div
// // //                             key={index}
// // //                             initial={{ opacity: 0, x: -20 }}
// // //                             animate={{ opacity: 1, x: 0 }}
// // //                             transition={{ delay: index * 0.1 }}
// // //                             className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
// // //                           >
// // //                             <Award className="text-yellow-400 flex-shrink-0" size={20} />
// // //                             <span className="text-gray-300">{achievement}</span>
// // //                           </motion.div>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </motion.div>
// // //               </AnimatePresence>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //       </motion.div>


// // //     </motion.div>
// // //   )
// // // }