'use client'

import { memo } from 'react';
import { Code } from 'lucide-react';
import TechStackGrid from './TechStackGrid';

const JourneyCard = memo(() => (
  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl
    hover:scale-[1.02] hover:shadow-xl transition-all duration-500 ease-out">

    {/* Glow */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-sm -z-10 animate-pulse" />

    {/* Heading */}
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-110 transition-transform duration-200">
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