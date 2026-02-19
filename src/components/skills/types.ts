import { Code2, Zap, Target, Wrench } from 'lucide-react';

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  color: string;
  icon: any;
  category: string;
  years?: number;
}

export interface CategoryDef {
  name: string;
  color: string;
  icon: any;
  filter: string; // matches skill.category exactly
}

// Maps skill.level → display config
export const SKILL_LEVELS = {
  Expert: {
    percentage:  95,
    label:       'Expert',
    textColor:   'text-emerald-600',
    bgColor:     'bg-emerald-50',
    borderColor: 'border-emerald-200',
    barColor:    'bg-gradient-to-r from-emerald-400 to-emerald-600',
  },
  Advanced: {
    percentage:  80,
    label:       'Advanced',
    textColor:   'text-blue-600',
    bgColor:     'bg-blue-50',
    borderColor: 'border-blue-200',
    barColor:    'bg-gradient-to-r from-blue-400 to-blue-600',
  },
  Intermediate: {
    percentage:  65,
    label:       'Intermediate',
    textColor:   'text-amber-600',
    bgColor:     'bg-amber-50',
    borderColor: 'border-amber-200',
    barColor:    'bg-gradient-to-r from-amber-400 to-amber-600',
  },
} as const;

// Matches every category present in skillsData.ts
export const CATEGORIES: CategoryDef[] = [
  { name: 'Frontend Development', color: 'from-blue-500 to-cyan-500',     icon: Code2,   filter: 'Frontend'       },
  { name: 'Backend Development',  color: 'from-emerald-500 to-teal-500',  icon: Zap,     filter: 'Backend'        },
  { name: 'Cloud & DevOps',       color: 'from-violet-500 to-indigo-500', icon: Target,  filter: 'Cloud & DevOps' },
  { name: 'Tools',                color: 'from-purple-500 to-pink-500',   icon: Wrench,  filter: 'Tools'          },
];

// Utility: hex → rgba
export const hexToRgba = (hex: string, alpha: number): string => {
  const safeHex = hex.replace('#', '');
  const fullHex = safeHex.length === 3
    ? safeHex.split('').map(c => c + c).join('')
    : safeHex;
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};