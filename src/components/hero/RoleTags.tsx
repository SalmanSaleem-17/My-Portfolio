'use client'

import React from 'react';
import { ROLE_TAGS } from './types';

interface RoleTagsProps {
  isMobile?: boolean;
}

const RoleTags: React.FC<RoleTagsProps> = ({ isMobile = false }) => {
  return (
    <div className={`flex flex-wrap gap-3 ${isMobile ? 'justify-center' : ''} mb-8`}>
      {ROLE_TAGS.map((tag, i) => (
        <span
          key={i}
          className={`bg-gradient-to-r ${tag.color} rounded-full font-semibold shadow-md
            transform transition-all duration-300 ease-out
            hover:scale-105 hover:-translate-y-1 cursor-default border
            ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm'}`}
        >
          <tag.icon className={`inline ${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`} />
          {isMobile ? tag.text.replace(' Developer', '').replace(' Expert', '') : tag.text}
        </span>
      ))}
    </div>
  );
};

export default RoleTags;