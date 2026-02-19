'use client'

import { memo } from 'react';
import { CategoryDef, Skill } from './types';
import { useIntersectionObserver } from './useIntersectionObserver';
import SkillCard from './SkillCard';

interface CategorySectionProps {
  category: CategoryDef;
  skills:   Skill[];
  index:    number;
}

const CategorySection = memo(({ category, skills, index }: CategorySectionProps) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const Icon = category.icon;

  return (
    <div ref={ref} className="space-y-8">
      {/* Category header */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <div className={`p-3 sm:p-4 bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl
          shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center sm:text-left">
          {category.name}
        </h3>

        {/* Expanding accent line */}
        <div
          className={`h-0.5 sm:h-1 bg-gradient-to-r ${category.color} rounded-full
            transition-all duration-700 ease-out order-first sm:order-last`}
          style={{ width: isVisible ? '3rem' : '0rem', transitionDelay: `${index * 120 + 200}ms` }}
        />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
});

CategorySection.displayName = 'CategorySection';
export default CategorySection;