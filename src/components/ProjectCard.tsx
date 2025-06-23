'use client'

import React, { useState, useCallback, useMemo, memo } from 'react'
import Image from 'next/image'
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Tag, 
  Star, 
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
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Sparkles
} from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    subtitle: string
    description: string
    longDescription: string
    
    platform: 'Website' | 'Mobile App'
    platformType: string
    deviceTargets: string[]
    screenSize: string
    
    image: string
    screenshots?: string[]
    mockupType: 'laptop' | 'mobile'
    
    link: string
    demoLink?: string
    playStoreLink?: string
    appStoreLink?: string
    
    category: string
    status: string
    year: string
    duration: string
    
    technologies: string[]
    
    features: Array<{
      icon: string
      title: string
      description: string
    }>
    
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
    
    metrics?: {
      [key: string]: any
    }
    
    appInfo?: {
      category: string
      size: string
      compatibility: string
      languages: string[]
      lastUpdate: string
      version: string
    }
    
    architecture?: {
      [key: string]: string
    }
    
    roadmap?: string[]
  }
}

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

const PlatformBadge = memo(({ platform, deviceTargets }: { platform: string; deviceTargets: string[] }) => {
  const PlatformIcon = platform === 'Website' ? Globe : Smartphone
  const isWebsite = platform === 'Website'
  
  return (
    <div className={`
      group inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-sm font-semibold 
      backdrop-blur-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg
      ${isWebsite 
        ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/30 text-blue-300 hover:border-blue-400/50' 
        : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-400/30 text-emerald-300 hover:border-emerald-400/50'
      }
    `}>
      <PlatformIcon size={16} className="transition-transform duration-300 group-hover:rotate-12" />
      <span className="font-medium">{platform}</span>
      {deviceTargets.length > 1 && (
        <>
          <div className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span className="text-xs opacity-75">{deviceTargets.length} platforms</span>
        </>
      )}
    </div>
  )
})

const StatusBadge = memo(({ status }: { status: string }) => {
  const statusConfig = useMemo(() => ({
    'Completed': { 
      bg: 'bg-gradient-to-r from-emerald-500/15 to-green-500/15', 
      text: 'text-emerald-300', 
      border: 'border-emerald-400/30 hover:border-emerald-400/50',
      dot: 'bg-emerald-400',
      icon: CheckCircle,
      glow: 'hover:shadow-emerald-500/25'
    },
    'Active Development': { 
      bg: 'bg-gradient-to-r from-blue-500/15 to-indigo-500/15', 
      text: 'text-blue-300', 
      border: 'border-blue-400/30 hover:border-blue-400/50',
      dot: 'bg-blue-400',
      icon: Code2,
      glow: 'hover:shadow-blue-500/25'
    },
    'In Progress': { 
      bg: 'bg-gradient-to-r from-blue-500/15 to-indigo-500/15', 
      text: 'text-blue-300', 
      border: 'border-blue-400/30 hover:border-blue-400/50',
      dot: 'bg-blue-400',
      icon: Code2,
      glow: 'hover:shadow-blue-500/25'
    },
    'Planning': { 
      bg: 'bg-gradient-to-r from-amber-500/15 to-orange-500/15', 
      text: 'text-amber-300', 
      border: 'border-amber-400/30 hover:border-amber-400/50',
      dot: 'bg-amber-400',
      icon: AlertCircle,
      glow: 'hover:shadow-amber-500/25'
    }
  }), [])

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Planning']
  const StatusIcon = config.icon

  return (
    <div className={`
      group inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-sm font-semibold 
      backdrop-blur-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg
      ${config.bg} ${config.text} ${config.border} ${config.glow}
    `}>
      <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      <StatusIcon size={14} className="transition-transform duration-300 group-hover:rotate-12" />
      <span className="font-medium">{status}</span>
    </div>
  )
})

const CategoryBadge = memo(({ category }: { category: string }) => (
  <div className="group inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl text-slate-200 rounded-2xl text-sm font-semibold border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/10">
    <Tag size={14} className="transition-transform duration-300 group-hover:rotate-12" />
    <span className="font-medium">{category}</span>
  </div>
))

const TechBadge = memo(({ tech, index, colors }: { tech: string; index: number; colors: any }) => (
  <span
    className={`
      inline-block px-3 py-1.5 text-white rounded-xl text-sm font-medium 
      backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-lg
      transform hover:-translate-y-0.5 cursor-default
    `}
    style={{
      background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)`,
      borderColor: `${colors.primary}20`,
      animationDelay: `${index * 50}ms`,
      boxShadow: `0 4px 12px ${colors.shadow || colors.primary + '15'}`
    }}
  >
    {tech}
  </span>
))

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
  const baseClasses = `
    group inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-slate-900 transform hover:scale-105 hover:shadow-xl
    active:scale-95 backdrop-blur-xl
  `
  
  const Component = href ? 'a' : 'button'
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

  const style = variant === 'primary' 
    ? {
        background: colors.gradient?.primary || `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
        boxShadow: `0 12px 32px ${colors.shadow || colors.primary + '25'}`,
        color: 'white'
      }
    : {
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6))',
        borderColor: 'rgba(71, 85, 105, 0.3)',
        color: 'rgb(226, 232, 240)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
      }

  return (
    <Component
      className={`${baseClasses} ${variant === 'secondary' ? 'border hover:border-slate-500/50' : ''}`}
      style={style}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Component>
  )
})

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
        color: 'white',
        boxShadow: `0 8px 24px ${colors.shadow || colors.primary + '25'}`
      }
    : {}

  return (
    <button
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-sm 
        transition-all duration-300 transform hover:scale-105 backdrop-blur-xl
        ${isActive
          ? 'shadow-lg'
          : 'bg-gradient-to-r from-slate-800/60 to-slate-700/60 text-slate-300 hover:text-white border border-slate-600/30 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/10'
        }
      `}
      style={style}
    >
      <Icon size={16} className="transition-transform duration-300 group-hover:rotate-12" />
      <span>{tab.label}</span>
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
      )}
    </button>
  )
})

const ProjectStats = memo(({ project }: { project: ProjectCardProps['project'] }) => {
  const stats = useMemo(() => {
    const baseStats = [
      { value: project.duration, label: 'Duration', color: 'text-violet-400', icon: Timer },
      { value: project.technologies.length.toString(), label: 'Technologies', color: 'text-blue-400', icon: Code2 },
      { value: project.features.length.toString(), label: 'Features', color: 'text-emerald-400', icon: Star }
    ]

    if (project.platform === 'Mobile App') {
      if (project.screens) {
        baseStats.push({ value: project.screens.length.toString(), label: 'Screens', color: 'text-purple-400', icon: Smartphone })
      }
      if (project.metrics?.downloadCount) {
        baseStats[2] = { value: project.metrics.downloadCount, label: 'Downloads', color: 'text-emerald-400', icon: Download }
      }
    } else if (project.platform === 'Website') {
      if (project.userRoles) {
        baseStats.push({ value: project.userRoles.length.toString(), label: 'User Roles', color: 'text-orange-400', icon: Users })
      }
    }

    return baseStats.slice(0, 4)
  }, [project])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`
            group text-center p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 
            backdrop-blur-xl border border-slate-600/20 hover:border-slate-500/30 
            transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/10
            transform hover:-translate-y-1
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-center mb-2">
            <stat.icon className={`w-5 h-5 ${stat.color} transition-transform duration-300 group-hover:scale-110`} />
          </div>
          <div className={`text-2xl font-bold mb-1 ${stat.color} transition-colors duration-300`}>
            {stat.value}
          </div>
          <div className="text-slate-400 text-xs font-medium group-hover:text-slate-300 transition-colors duration-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
})

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'overview', label: 'Overview', icon: Eye },
      { id: 'features', label: 'Features', icon: Star },
      { id: 'tech', label: 'Technology', icon: Code2 }
    ]

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
    <div 
      className={`
        w-full mb-8 transform transition-all duration-700 hover:scale-[1.02] 
        ${isHovered ? 'z-10' : 'z-0'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 
          rounded-3xl overflow-hidden border border-slate-700/30 backdrop-blur-2xl
          transition-all duration-700 hover:border-slate-600/50
          ${isHovered ? 'shadow-2xl' : 'shadow-xl'}
        `}
        style={{
          boxShadow: isHovered 
            ? `0 32px 64px ${project.colors.shadow || project.colors.primary + '20'}, 0 0 0 1px ${project.colors.primary}10`
            : `0 16px 32px ${project.colors.shadow || project.colors.primary + '10'}`
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div 
            className={`
              absolute inset-0 bg-gradient-radial from-transparent via-transparent 
              transition-opacity duration-1000
              ${isHovered ? 'opacity-40' : 'opacity-20'}
            `}
            style={{
              background: `radial-gradient(circle at 30% 40%, ${project.colors.primary}15, transparent 70%)`
            }}
          />
          <div 
            className={`
              absolute inset-0 bg-gradient-radial from-transparent via-transparent 
              transition-opacity duration-1000 delay-200
              ${isHovered ? 'opacity-40' : 'opacity-20'}
            `}
            style={{
              background: `radial-gradient(circle at 70% 80%, ${project.colors.accent}15, transparent 70%)`
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 bg-white/20 rounded-full 
                animate-float transition-opacity duration-1000
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row">
          <div className={`w-2/5 relative group`}>
            <div className={`relative rounded-br-lg border-b-emerald-900 border-r-emerald-900 border-2 ${project.platform === 'Website' ? 'h-72 lg:h-96' : 'h-72 lg:h-80'} overflow-hidden`}>
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.platform} Screenshot`}
                  fill
                  className={`
                    object-cover transition-all duration-700 transform 
                    ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                    ${project.mockupType === 'mobile' ? 'object-contain bg-slate-800' : 'object-cover'}
                    ${isHovered ? 'scale-105' : 'scale-100'}
                  `}
                  sizes={project.platform === 'Website' ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 40vw"}
                  priority={false}
                  onLoad={handleImageLoad}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <div className="animate-spin">
                      {project.platform === 'Website' ? 
                        <Monitor className="w-12 h-12 text-slate-600" /> : 
                        <Smartphone className="w-12 h-12 text-slate-600" />
                      }
                    </div>
                  </div>
                )}
                
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent 
                  transition-opacity duration-500
                  ${isHovered ? 'opacity-60' : 'opacity-80'}
                `} />
                
                <div className={`
                  absolute top-6 right-6 flex gap-3 transition-all duration-500 transform
                  ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn p-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Github size={20} className="transition-transform duration-300 group-hover/btn:rotate-12" />
                  </a>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn p-3 backdrop-blur-xl rounded-2xl border text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        backgroundColor: project.colors.primary + '80',
                        borderColor: project.colors.primary + '50',
                        boxShadow: `0 4px 16px ${project.colors.shadow || project.colors.primary + '25'}`
                      }}
                    >
                      <Play size={20} className="transition-transform duration-300 group-hover/btn:scale-110" />
                    </a>
                  )}
                </div>
              </div>

              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <StatusBadge status={project.status} />
                <PlatformBadge platform={project.platform} deviceTargets={project.deviceTargets} />
                <CategoryBadge category={project.category} />
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-300 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/30">
                      <Calendar size={14} />
                      <span className="font-medium">{project.year}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/30">
                      <Star size={14} />
                      <span className="font-medium">{project.features.length}</span>
                    </div>
                    {project.appInfo?.version && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/30">
                        <Settings size={14} />
                        <span className="font-medium">v{project.appInfo.version}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="group/icon p-2 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/30 hover:border-red-400/50 transition-all duration-300 cursor-pointer">
                      <Heart size={14} className="text-red-400 transition-transform duration-300 group-hover/icon:scale-110" />
                    </div>
                    <div className="group/icon p-2 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer">
                      <MessageCircle size={14} className="text-blue-400 transition-transform duration-300 group-hover/icon:scale-110" />
                    </div>
                    <div className="group/icon p-2 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/30 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer">
                      <Share2 size={14} className="text-emerald-400 transition-transform duration-300 group-hover/icon:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-3/5 p-8 lg:p-10`}>
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <h2 
                    className={`
                      text-4xl lg:text-5xl font-black mb-3 bg-clip-text text-transparent leading-tight
                      transition-all duration-500 hover:scale-105 transform-gpu cursor-default
                    `}
                    style={{
                      backgroundImage: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.accent})`
                    }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-xl text-slate-300 mb-4 font-medium leading-relaxed">{project.subtitle}</p>
                  <p className="text-slate-400 leading-relaxed text-lg">{project.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center backdrop-blur-xl"
                    style={{
                      background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
                      borderColor: project.colors.primary + '30'
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {visibleTechs.map((tech, index) => (
                  <TechBadge key={tech} tech={tech} index={index} colors={project.colors} />
                ))}
                {remainingTechsCount > 0 && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-slate-800/50 backdrop-blur-xl text-slate-400 rounded-xl text-sm font-medium border border-slate-700/30">
                    +{remainingTechsCount} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <ActionButton onClick={handleToggleExpanded} colors={project.colors}>
                <BookOpen size={18} />
                <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </ActionButton>

              {actionButtons.map((button, index) => (
                <ActionButton 
                  key={index}
                  href={button.href} 
                  variant={button.variant}
                  colors={project.colors}
                >
                  <button.icon size={18} />
                  <span>{button.label}</span>
                </ActionButton>
              ))}
            </div>

            <div>
              <ProjectStats project={project} />
            </div>
          </div>
        </div>

        <div 
          className={`
            border-t border-slate-700/30 overflow-hidden transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="p-8 lg:p-10 bg-slate-900/50 backdrop-blur-xl">
            <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-slate-700/30">
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

            <div className="relative">
              <div 
                className={`transition-opacity duration-300 ${activeTab === 'overview' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
                style={{ display: activeTab === 'overview' ? 'block' : 'none' }}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">{project.longDescription}</p>
                  </div>

                  {project.problemStatement && (
                    <div className="p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-xl rounded-2xl border border-red-500/20">
                      <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-3">
                        <Target size={20} />
                        <span className="text-xl">Problem Statement</span>
                      </h4>
                      <p className="text-slate-300">{project.problemStatement}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/20">
                      <h4 className="text-emerald-300 font-semibold mb-3 flex items-center gap-3">
                        <Lightbulb size={20} />
                        <span className="text-xl">Solution</span>
                      </h4>
                      <p className="text-slate-300">{project.solution}</p>
                    </div>
                  )}

                  {project.platform === 'Mobile App' && project.appInfo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl rounded-2xl border border-slate-700/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Download className="text-violet-400" size={24} />
                          <h4 className="text-white font-semibold text-lg">App Information</h4>
                        </div>
                        <p className="text-slate-400">
                          <span className="text-slate-300 font-medium">Category:</span> {project.appInfo.category}<br />
                          <span className="text-slate-300 font-medium">Size:</span> {project.appInfo.size}<br />
                          <span className="text-slate-300 font-medium">Compatibility:</span> {project.appInfo.compatibility}
                        </p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl rounded-2xl border border-slate-700/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Globe className="text-blue-400" size={24} />
                          <h4 className="text-white font-semibold text-lg">Languages</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.appInfo.languages.map((lang) => (
                            <span key={lang} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-xl text-sm">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {project.platform === 'Website' && project.userRoles && (
                    <div>
                      <h4 className="text-white font-semibold text-xl mb-5">User Roles</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.userRoles.map((role, index) => (
                          <div 
                            key={index} 
                            className="p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Users className="text-blue-400" size={20} />
                              <h5 className="text-white font-medium">{role.role}</h5>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {role.permissions.slice(0, 3).map((perm, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs">
                                  {perm}
                                </span>
                              ))}
                              {role.permissions.length > 3 && (
                                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-lg text-xs">
                                  +{role.permissions.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className={`transition-opacity duration-300 ${activeTab === 'features' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
                style={{ display: activeTab === 'features' ? 'block' : 'none' }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {project.features.map((feature, index) => {
                      const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb
                      return (
                        <div
                          key={index}
                          className={`
                            p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl 
                            rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300
                            hover:shadow-lg hover:scale-[1.02] transform-gpu
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <div 
                              className="flex items-center justify-center w-12 h-12 rounded-xl text-xl backdrop-blur-xl"
                              style={{
                                background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
                                border: `1px solid ${project.colors.primary}30`
                              }}
                            >
                              <IconComponent className="text-xl" style={{ color: project.colors.primary }} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-lg mb-2">{feature.title}</h4>
                              <p className="text-slate-400">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div 
                className={`transition-opacity duration-300 ${activeTab === 'tech' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
                style={{ display: activeTab === 'tech' ? 'block' : 'none' }}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <TechBadge key={tech} tech={tech} index={index} colors={project.colors} />
                      ))}
                    </div>
                  </div>

                  {project.architecture && (
                    <div>
                      <h4 className="text-white font-semibold text-xl mb-5">Architecture</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(project.architecture).map(([key, value], index) => (
                          <div 
                            key={index} 
                            className={`
                              p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl 
                              rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300
                              hover:shadow-lg hover:scale-[1.02] transform-gpu
                            `}
                          >
                            <h5 className="text-slate-400 text-sm uppercase font-semibold mb-2 tracking-wider">{key}</h5>
                            <p className="text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className={`transition-opacity duration-300 ${activeTab === 'screens' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
                style={{ display: activeTab === 'screens' ? 'block' : 'none' }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">App Screens</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {project.screens?.map((screen, index) => (
                      <div
                        key={index}
                        className={`
                          group relative aspect-[9/16] bg-slate-800 rounded-2xl border border-slate-700/30 
                          overflow-hidden hover:border-slate-600/50 transition-all duration-300
                          hover:shadow-lg hover:scale-[1.03] transform-gpu
                        `}
                      >
                        <div className="absolute inset-0 flex items-center justify-center p-5">
                          <div className="text-center">
                            <div className="text-3xl mb-3">{screen.icon || '📱'}</div>
                            <h4 className="text-white text-sm font-medium line-clamp-2">{screen.name.replace('Screen', '')}</h4>
                          </div>
                        </div>
                        <div className={`
                          absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5
                        `}>
                          <p className="text-slate-300 text-sm">{screen.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div 
                className={`transition-opacity duration-300 ${activeTab === 'achievements' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
                style={{ display: activeTab === 'achievements' ? 'block' : 'none' }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Key Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {project.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`
                          p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl 
                          rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300
                          hover:shadow-lg hover:scale-[1.02] transform-gpu
                        `}
                      >
                        <div className="flex items-start gap-4">
                          <Award 
                            size={24} 
                            className="flex-shrink-0" 
                            style={{ color: project.colors.primary }}
                          />
                          <p className="text-slate-300">{achievement}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {project.metrics && (
                    <div className="mt-8">
                      <h4 className="text-white font-semibold text-xl mb-5">Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(project.metrics).map(([key, value], index) => (
                          <div 
                            key={index} 
                            className={`
                              p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl 
                              rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300
                              hover:shadow-lg hover:scale-[1.02] transform-gpu
                            `}
                          >
                            <h5 className="text-slate-400 text-sm uppercase font-semibold mb-2 tracking-wider">{key}</h5>
                            <p className="text-white text-xl font-bold">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className={`transition-opacity duration-300 ${activeTab === 'roadmap' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
                style={{ display: activeTab === 'roadmap' ? 'block' : 'none' }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Future Plans</h3>
                  <div className="space-y-4">
                    {project.roadmap?.map((item, index) => (
                      <div
                        key={index}
                        className={`
                          flex items-start gap-4 p-5 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl 
                          rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300
                          hover:shadow-lg hover:scale-[1.02] transform-gpu
                        `}
                      >
                        <div 
                          className="flex items-center justify-center w-8 h-8 rounded-xl mt-0.5 flex-shrink-0"
                          style={{
                            background: project.colors.gradient?.primary || `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.accent}20)`,
                            border: `1px solid ${project.colors.primary}30`
                          }}
                        >
                          <Rocket size={16} style={{ color: project.colors.primary }} />
                        </div>
                        <p className="text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-700/30">
                <h3 className="text-2xl font-bold text-white mb-6">Preview</h3>
                <div className={`grid gap-5 ${project.mockupType === 'mobile' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                  {project.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className={`
                        relative group overflow-hidden rounded-2xl border border-slate-700/30 
                        hover:border-slate-600/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] transform-gpu
                        ${project.mockupType === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'}
                      `}
                    >
                      <Image
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className={`
                        absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5
                      `}>
                        <p className="text-white text-sm">
                          {project.mockupType === 'mobile' 
                            ? `Mobile Screen ${index + 1}` 
                            : `Desktop View ${index + 1}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard