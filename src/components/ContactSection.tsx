'use client'

import { Mail, Phone, ArrowRight, ExternalLink, MessageCircle, Send, Heart, Sparkles, MapPin, Clock, Linkedin } from "lucide-react";
import { 
  FaWhatsapp, 
  FaGithub, 
  FaDiscord, 
  FaTelegram 
} from "react-icons/fa6";
import { memo, useMemo, useRef, useState, useEffect, useCallback } from 'react';

interface ContactSectionProps {
  // Remove framer-motion props as we're not using them
}

// Optimized contact method card with CSS-only animations
const ContactCard = memo(({ 
  method, 
  index,
  isVisible,
  onVisible
}: {
  method: any;
  index: number;
  isVisible: boolean;
  onVisible: () => void;
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          onVisible();
        }
      },
      { threshold: 0.1, rootMargin: '30px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, onVisible]);

  return (
    <a
      ref={cardRef}
      href={method.href}
      target={method.external ? "_blank" : "_self"}
      rel={method.external ? "noopener noreferrer" : undefined}
      className={`relative group block ${method.bgColor} p-6 rounded-2xl border border-white/40 transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-xl hover:-translate-y-3 ${
        hasAnimated 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${index * 120}ms`,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Animated background glow */}
      <div 
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl ${method.color}`}
      />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon container with elegant hover effect */}
        <div
          className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}
        >
          <method.icon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-slate-900 text-lg group-hover:text-purple-700 transition-colors duration-300">
              {method.label}
            </h4>
            {method.external && (
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors duration-300" />
            )}
          </div>
          <p className="text-slate-700 text-base mb-2 font-medium">{method.value}</p>
          <p className="text-slate-500 text-sm">{method.description}</p>
        </div>
      </div>

      {/* Subtle arrow indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <ArrowRight className="w-5 h-5 text-slate-400" />
      </div>
    </a>
  );
});

ContactCard.displayName = 'ContactCard';

// Quick stats component
const QuickStatsCard = memo(({ 
  stats,
  isVisible 
}: {
  stats: any[];
  isVisible: boolean;
}) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/40 transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`}>
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        Quick Facts
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex items-center gap-3 p-4 bg-slate-50/80 rounded-xl backdrop-blur-sm transition-all duration-500 ease-out hover:bg-slate-100/80 hover:scale-105 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: `${(index * 100) + 200}ms` }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
              <p className="font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

QuickStatsCard.displayName = 'QuickStatsCard';

// CTA Card component
const CTACard = memo(({ isVisible }: { isVisible: boolean }) => {
  const handleEmailClick = useCallback(() => {
    window.open('mailto:shanisaleem17@gmail.com', '_blank');
  }, []);

  return (
    <div className={`relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
    }`} style={{ transitionDelay: '300ms' }}>
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative text-center text-white">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <MessageCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Ready to Collaborate?
        </h3>
        <p className="text-blue-100 text-base mb-6 leading-relaxed">
          Whether you have a project in mind or just want to say hello, I'd love to hear from you!
        </p>
        <button
          onClick={handleEmailClick}
          className="w-full bg-white/95 backdrop-blur-sm text-purple-700 py-4 px-6 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white hover:scale-105 hover:shadow-xl group"
        >
          <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Start a Conversation</span>
        </button>
      </div>
    </div>
  );
});

CTACard.displayName = 'CTACard';

// Social links component
const SocialLinks = memo(({ 
  socialLinks,
  isVisible 
}: {
  socialLinks: any[];
  isVisible: boolean;
}) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/40 transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`} style={{ transitionDelay: '400ms' }}>
      <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Find Me Online</h3>
      <div className="flex justify-center gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-slate-100 hover:scale-110 hover:shadow-lg ${social.color} ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: `${(index * 100) + 600}ms` }}
          >
            <social.icon className="w-6 h-6 text-slate-600 hover:text-slate-800 transition-colors duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
});

SocialLinks.displayName = 'SocialLinks';

export default memo(function ContactSection({ }: ContactSectionProps) {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Header intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sidebar intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSidebarVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardVisible = useCallback((cardId: string) => {
    setVisibleCards(prev => new Set(prev).add(cardId));
  }, []);

  // Memoized data
  const contactMethods = useMemo(() => [
    {
      icon: Mail,
      label: "Email",
      value: "shanisaleem17@gmail.com",
      href: "mailto:shanisaleem17@gmail.com",
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-50/80 to-pink-50/80",
      description: "Drop me a line anytime"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "muhammad-salman-saleem",
      href: "https://www.linkedin.com/in/muhammad-salman-saleem-8a9a96266",
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50/80 to-indigo-50/80",
      description: "Let's connect professionally",
      external: true
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "+92 345-6501771",
      href: "https://wa.me/923456501771",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50/80 to-emerald-50/80",
      description: "Quick chat or call",
      external: true
    },
    {
      icon: Phone,
      label: "Phone",
      value: "0345-6501771",
      href: "tel:+923456501771",
      color: "bg-gradient-to-br from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-50/80 to-violet-50/80",
      description: "Call me directly"
    }
  ], []);

  const quickStats = useMemo(() => [
    { label: "Response Time", value: "< 24hrs", icon: Clock },
    { label: "Location", value: "Lahore, PK", icon: MapPin },
    { label: "Projects Done", value: "5+ Happy Clients", icon: Heart },
    { label: "Coffee Consumed", value: "∞ Cups", icon: Sparkles }
  ], []);

  const socialLinks = useMemo(() => [
    { icon: FaGithub, href: "#", color: "hover:bg-slate-200" },
    { icon: FaDiscord, href: "#", color: "hover:bg-indigo-100" },
    { icon: FaTelegram, href: "#", color: "hover:bg-blue-100" }
  ], []);

  return (
    <div className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-hidden">
      {/* Elegant background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/8 to-green-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header section */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-blue-200/50 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="font-semibold text-slate-700">Get in Touch</span>
          </div>

          {/* Main title */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Let's Connect
          </h2>
          
          {/* Decorative line */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out ${headerVisible ? 'w-16' : 'w-0'}`} style={{ transitionDelay: '500ms' }} />
            <Heart className="w-6 h-6 text-red-500" />
            <div className={`h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out ${headerVisible ? 'w-16' : 'w-0'}`} style={{ transitionDelay: '700ms' }} />
          </div>

          {/* Subtitle */}
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
            I'm always excited to discuss new opportunities, interesting projects, or just have a 
            <span className="text-blue-600 font-semibold"> meaningful conversation</span> about technology and innovation!
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/40">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Choose Your Preferred Way</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <ContactCard
                    key={method.label}
                    method={method}
                    index={index}
                    isVisible={visibleCards.has(method.label)}
                    onVisible={() => handleCardVisible(method.label)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="space-y-6">
            <QuickStatsCard stats={quickStats} isVisible={sidebarVisible} />
            <CTACard isVisible={sidebarVisible} />
            <SocialLinks socialLinks={socialLinks} isVisible={sidebarVisible} />
          </div>
        </div>
      </div>
    </div>
  );
});