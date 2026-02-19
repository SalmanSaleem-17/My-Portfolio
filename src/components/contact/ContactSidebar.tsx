'use client'

import { memo, useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles, MessageCircle, Send } from 'lucide-react';
import { QUICK_STATS, SOCIAL_LINKS } from './types';

// ── Quick Stats ───────────────────────────────────────────────────────────────
const QuickStatsCard = memo(({ isVisible }: { isVisible: boolean }) => (
  <div className={`bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl
    shadow-lg border border-white/40 transition-all duration-700 ease-out
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
      Quick Facts
    </h3>

    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      {QUICK_STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex items-center gap-3 p-3 sm:p-4 bg-slate-50/80 rounded-lg sm:rounded-xl
            backdrop-blur-sm transition-all duration-500 ease-out
            hover:bg-slate-100/80 hover:scale-105
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
          style={{ transitionDelay: `${i * 100 + 200}ms` }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500
            rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</p>
            <p className="font-bold text-slate-900 text-sm sm:text-base truncate">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
));
QuickStatsCard.displayName = 'QuickStatsCard';

// ── CTA Card ──────────────────────────────────────────────────────────────────
const CTACard = memo(({ isVisible }: { isVisible: boolean }) => {
  const handleClick = useCallback(() => {
    window.open('mailto:shanisaleem17@gmail.com', '_blank');
  }, []);

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600
        p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
      style={{ transitionDelay: '300ms' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative text-center text-white">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm
          rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4
          bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Ready to Collaborate?
        </h3>
        <p className="text-blue-100 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed px-2">
          Whether you have a project in mind or just want to say hello, I'd love to hear from you!
        </p>
        <button
          onClick={handleClick}
          className="w-full bg-white/95 backdrop-blur-sm text-purple-700 py-3 sm:py-4 px-4 sm:px-6
            rounded-lg sm:rounded-xl font-bold shadow-lg text-sm sm:text-base
            flex items-center justify-center gap-2 sm:gap-3
            transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-xl group"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
          Start a Conversation
        </button>
      </div>
    </div>
  );
});
CTACard.displayName = 'CTACard';

// ── Social Links ──────────────────────────────────────────────────────────────
const SocialLinks = memo(({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl
      shadow-lg border border-white/40 transition-all duration-700 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    style={{ transitionDelay: '400ms' }}
  >
    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6 text-center">
      Find Me Online
    </h3>
    <div className="flex justify-center gap-3 sm:gap-4">
      {SOCIAL_LINKS.map((social, i) => (
        <a
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-lg sm:rounded-xl
            flex items-center justify-center
            transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{ transitionDelay: `${i * 100 + 600}ms` }}
        >
          <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 hover:text-slate-800 transition-colors duration-300" />
        </a>
      ))}
    </div>
  </div>
));
SocialLinks.displayName = 'SocialLinks';

// ── Sidebar wrapper ───────────────────────────────────────────────────────────
const ContactSidebar = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4 sm:space-y-6">
      <QuickStatsCard isVisible={isVisible} />
      <CTACard        isVisible={isVisible} />
      <SocialLinks    isVisible={isVisible} />
    </div>
  );
});

ContactSidebar.displayName = 'ContactSidebar';
export default ContactSidebar;