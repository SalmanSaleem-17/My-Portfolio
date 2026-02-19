'use client'

import { memo } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface AboutHeaderProps {
  headerVisible: boolean;
}

const AboutHeader = memo(({ headerVisible }: AboutHeaderProps) => (
  <div className={`text-center mb-12 transition-all duration-700 ease-out
    ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10
      rounded-full border border-blue-200/30 mb-6
      hover:scale-105 hover:from-blue-500/15 hover:to-purple-500/15
      transition-all duration-300 ease-out cursor-pointer">
      <Sparkles className="w-5 h-5 text-blue-500" />
      <span className="text-sm font-medium text-gray-700">Get to know me</span>
    </div>

    {/* Title */}
    <h2 className="text-4xl md:text-5xl font-bold mb-6
      bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
      About Me
    </h2>

    {/* Decorative divider */}
    <div className="flex justify-center items-center gap-2 mb-4">
      <div
        className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out
          ${headerVisible ? 'w-16' : 'w-0'}`}
        style={{ transitionDelay: '300ms' }}
      />
      <div className="animate-spin" style={{ animationDuration: '15s' }}>
        <Star className="w-6 h-6 text-yellow-500 fill-current" />
      </div>
      <div
        className={`h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out
          ${headerVisible ? 'w-16' : 'w-0'}`}
        style={{ transitionDelay: '500ms' }}
      />
    </div>
  </div>
));

AboutHeader.displayName = 'AboutHeader';
export default AboutHeader;