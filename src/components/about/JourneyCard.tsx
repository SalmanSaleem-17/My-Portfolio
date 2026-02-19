'use client'

import { memo } from 'react';
import { Code } from 'lucide-react';
import TechStackGrid from './TechStackGrid';

const JourneyCard = memo(() => (
  /*
    hover:scale uses transform so it doesn't trigger layout reflow.
    Removed the absolute -z-10 glow div — blur on a negative-z element
    creates paint layers that bleed outside bounds and cause repaint jitter.
    Replaced with box-shadow ring on the wrapper for the same glow effect.
  */
  <div
    className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl
      transition-all duration-500 ease-out"
    style={{
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2), inset 0 0 80px rgba(139,92,246,0.04)',
      willChange: 'transform',
    }}
    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
  >
    {/* Heading */}
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transition-transform duration-200 hover:scale-110">
        <Code className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">My Journey</h3>
    </div>

    {/* Bio */}
    <p className="text-gray-700 leading-relaxed text-lg mb-6 font-medium">
      I am a dedicated and self-motivated{' '}
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
        Computer Science graduate
      </span>{' '}
      with a strong foundation in full-stack development. As a MERN Stack Developer, I have
      successfully completed my Final Year Project independently, showcasing my expertise in
      modern web technologies.
    </p>
    <p className="text-gray-700 leading-relaxed text-lg font-medium">
      My passion lies in creating{' '}
      <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold">
        elegant, scalable solutions
      </span>{' '}
      that solve real-world problems. I excel at handling both frontend and backend tasks,
      demonstrating strong problem-solving skills and adaptability in software development.
    </p>

    <TechStackGrid />
  </div>
));

JourneyCard.displayName = 'JourneyCard';
export default JourneyCard;