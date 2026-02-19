'use client'

import { memo, useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';
import { STRENGTHS } from './types';

const StrengthItem = memo(({ item, index }: { item: typeof STRENGTHS[0]; index: number }) => {
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
      className={`flex items-center gap-3 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-white/30
        hover:translate-x-1 transition-all duration-300 ease-out cursor-pointer
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms' }}
    >
      <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg hover:scale-110 transition-transform duration-200`}>
        <item.icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-gray-700 font-medium">{item.text}</span>
    </div>
  );
});
StrengthItem.displayName = 'StrengthItem';

const StrengthsCard = memo(() => (
  <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 rounded-3xl
    border border-green-200/50 shadow-xl overflow-hidden
    hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer group">

    {/* Ambient orb */}
    <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-green-400/15 to-emerald-400/15
      rounded-full blur-xl group-hover:w-28 group-hover:h-28 transition-all duration-500" />

    {/* Header */}
    <div className="flex items-center gap-4 mb-6 relative z-10">
      <div className="animate-bounce p-3 bg-white rounded-2xl shadow-lg"
        style={{ animationDuration: '4s', animationDelay: '1000ms' }}>
        <Trophy className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-bold text-xl text-gray-900 group-hover:text-green-800 transition-colors duration-300">
        Key Strengths
      </h3>
    </div>

    {/* Strength items */}
    <div className="grid grid-cols-1 gap-3 relative z-10">
      {STRENGTHS.map((item, i) => (
        <StrengthItem key={i} item={item} index={i} />
      ))}
    </div>
  </div>
));

StrengthsCard.displayName = 'StrengthsCard';
export default StrengthsCard;