'use client'

import { memo, useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import { TECH_STACK } from './types';

const TechPill = memo(({ tech, index }: { tech: typeof TECH_STACK[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setIsVisible(true), index * 50); },
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
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms' }}
    >
      <tech.icon className={`w-5 h-5 ${tech.color}`} />
      <span className="text-sm font-medium text-gray-700">{tech.name}</span>
    </div>
  );
});
TechPill.displayName = 'TechPill';

const TechStackGrid = memo(() => (
  <div className="mt-8">
    <p className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
      <Zap className="w-4 h-4 text-yellow-500" />
      Technologies I work with
    </p>
    <div className="flex flex-wrap gap-3">
      {TECH_STACK.map((tech, i) => (
        <TechPill key={tech.name} tech={tech} index={i} />
      ))}
    </div>
  </div>
));
TechStackGrid.displayName = 'TechStackGrid';

export default TechStackGrid;