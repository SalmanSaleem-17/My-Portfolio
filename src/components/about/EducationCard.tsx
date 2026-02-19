'use client'

import { memo } from 'react';
import { GraduationCap } from 'lucide-react';

const EducationCard = memo(() => (
  <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl
    border border-blue-200/50 shadow-xl overflow-hidden
    hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer group">

    {/* Ambient orb */}
    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/15 to-purple-400/15
      rounded-full blur-xl group-hover:w-24 group-hover:h-24 transition-all duration-500" />

    {/* Header */}
    <div className="flex items-center gap-4 mb-6 relative z-10">
      <div className="animate-bounce p-3 bg-white rounded-2xl shadow-lg"
        style={{ animationDuration: '4s' }}>
        <GraduationCap className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2 group-hover:text-blue-800 transition-colors duration-300">
        Education
        <GraduationCap className="w-5 h-5 text-blue-600" />
      </h3>
    </div>

    {/* Details */}
    <div className="relative z-10 space-y-2">
      <p className="text-gray-800 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300">
        Bachelor of Science in Computer Science
      </p>
      <p className="text-blue-700 font-medium group-hover:text-blue-800 transition-colors duration-300">
        COMSATS University Islamabad
      </p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform duration-200" />
        <p className="text-sm text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
          February 2020 – January 2025
        </p>
      </div>
    </div>
  </div>
));

EducationCard.displayName = 'EducationCard';
export default EducationCard;