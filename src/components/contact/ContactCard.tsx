'use client'

import { memo, useRef, useState, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ContactMethod } from './types';

interface ContactCardProps {
  method: ContactMethod;
  index:  number;
}

const ContactCard = memo(({ method, index }: ContactCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '30px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={method.href}
      target={method.external ? '_blank' : '_self'}
      rel={method.external ? 'noopener noreferrer' : undefined}
      className={`relative group block ${method.bgColor} p-4 sm:p-6 rounded-xl sm:rounded-2xl
        border border-white/40
        transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-3
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30
        transition-opacity duration-300 blur-xl ${method.color}`} />

      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 sm:w-14 sm:h-14 ${method.color} rounded-xl sm:rounded-2xl
          flex items-center justify-center shadow-lg flex-shrink-0
          transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}>
          <method.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <h4 className="font-bold text-slate-900 text-base sm:text-lg
              group-hover:text-purple-700 transition-colors duration-300 truncate">
              {method.label}
            </h4>
            {method.external && (
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400
                group-hover:text-purple-500 transition-colors duration-300 flex-shrink-0" />
            )}
          </div>
          <p className="text-slate-700 text-sm sm:text-base mb-1 sm:mb-2 font-medium break-all sm:break-normal">
            {method.value}
          </p>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{method.description}</p>
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4
        opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
        transition-all duration-300">
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
      </div>
    </a>
  );
});

ContactCard.displayName = 'ContactCard';
export default ContactCard;